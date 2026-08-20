#!/usr/bin/env bash
# Smoke-check the panel speaker path against a running dev server:
# proposal saved -> CV stored -> panel validated -> admin listing sees it.
# Needs ADMIN_USERNAME / ADMIN_PASSWORD in the environment for the admin check.
set -euo pipefail
BASE="${BASE:-http://localhost:3000}"
DB="${IAUP_DATA_DIR:-./data}/iaup.db"
PANEL="Panel Discussion 3: Sustainable Universities for a Sustainable Planet"
CV="$(mktemp).pdf"
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%%%EOF\n' > "$CV"

ID=$(curl -sf -X POST "$BASE/api/speakers" \
  -F "fullName=Smoke Speaker" -F "designation=Rector" -F "institution=Smoke University" \
  -F "country=Bangladesh" -F "email=smoke.speaker@example.org" \
  -F "panel=$PANEL" -F "abstract=Smoke abstract." -F "bio=Smoke bio." \
  -F "cv=@$CV;type=application/pdf" \
  | sed -E 's/.*"proposal_id":"([^"]+)".*/\1/')

CV_PATH=$(sqlite3 "$DB" "select cv_path from speaker_proposals where proposal_id='$ID';")
[ -n "$CV_PATH" ] || { echo "FAIL: no row/cv stored for $ID"; exit 1; }
[ -f "${IAUP_DATA_DIR:-./data}/$CV_PATH" ] || { echo "FAIL: cv file missing at $CV_PATH"; exit 1; }

# an unlisted panel must be rejected
BAD=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/api/speakers" \
  -F "fullName=X" -F "designation=Y" -F "institution=Z" -F "country=BD" \
  -F "email=x@y.org" -F "panel=Panel Discussion 9: Not Real" -F "cv=@$CV;type=application/pdf")
[ "$BAD" = "400" ] || { echo "FAIL: bogus panel returned $BAD, expected 400"; exit 1; }

echo "PASS: $ID stored with cv $CV_PATH, bogus panel rejected"

if [ -n "${ADMIN_USERNAME:-}" ] && [ -n "${ADMIN_PASSWORD:-}" ]; then
  JAR="$(mktemp)"
  curl -sf -c "$JAR" -X POST "$BASE/api/admin/login" -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ADMIN_USERNAME\",\"password\":\"$ADMIN_PASSWORD\"}" > /dev/null
  curl -sf -b "$JAR" "$BASE/admin/speakers" | grep -q "Smoke Speaker" \
    && echo "PASS: visible in /admin/speakers" \
    || { echo "FAIL: not listed in admin"; exit 1; }
  curl -s -b "$JAR" -X DELETE "$BASE/api/admin/speakers" -H 'Content-Type: application/json' \
    -d "{\"proposal_ids\":[\"$ID\"]}" > /dev/null
  echo "cleaned up $ID"
else
  echo "SKIP: admin check (set ADMIN_USERNAME/ADMIN_PASSWORD)"
  echo "Clean up with: sqlite3 $DB \"delete from speaker_proposals where proposal_id='$ID';\""
fi
