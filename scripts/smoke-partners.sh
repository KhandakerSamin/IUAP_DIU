#!/usr/bin/env bash
# Smoke-check the "Become a Partner" path against a running dev server:
# proposal saved -> deck stored -> bad email rejected.
set -euo pipefail
BASE="${BASE:-http://localhost:3000}"
DATA="${IAUP_DATA_DIR:-./data}"
DB="$DATA/iaup.db"
DECK="$(mktemp).pdf"
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%%%EOF\n' > "$DECK"

ID=$(curl -sf -X POST "$BASE/api/partners" \
  -F "orgName=Smoke Sponsor Ltd" -F "orgType=Corporate" -F "country=Bangladesh" \
  -F "contactPerson=Smoke Contact" -F "designation=Director of Partnerships" \
  -F "email=smoke.partner@example.org" -F "interest=Sponsorship" \
  -F "proposal=@$DECK;type=application/pdf" \
  | sed -E 's/.*"proposal_id":"([^"]+)".*/\1/')

ROW=$(sqlite3 "$DB" "select org_name||'|'||interest||'|'||coalesce(proposal_path,'') from partner_proposals where proposal_id='$ID';")
[ -n "$ROW" ] || { echo "FAIL: no row stored for $ID"; exit 1; }
DECK_PATH="${ROW##*|}"
[ -f "$DATA/$DECK_PATH" ] || { echo "FAIL: proposal file missing at $DECK_PATH"; exit 1; }

# a malformed email must be rejected, not silently stored
BAD=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/api/partners" \
  -F "orgName=X" -F "orgType=Y" -F "country=BD" -F "contactPerson=Z" \
  -F "designation=Head" -F "email=not-an-email" -F "interest=Sponsorship")
[ "$BAD" = "400" ] || { echo "FAIL: bad email returned $BAD, expected 400"; exit 1; }

echo "PASS: $ID stored ($ROW), bad email rejected"
