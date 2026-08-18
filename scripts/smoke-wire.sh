#!/usr/bin/env bash
# Smoke-check the wire-transfer path against a running dev server:
# registration saved -> priced -> invoice on disk -> invoice downloadable.
# Start the server with `SMTP_HOST= npm run dev` so it does not send a real email.
set -euo pipefail
BASE="${BASE:-http://localhost:3000}"
DB="${IAUP_DATA_DIR:-./data}/iaup.db"
PNG="$(mktemp).png"
printf 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8AAAwAB/AL+g1sAAAAASUVORK5CYII=' | base64 -d > "$PNG"

REG=$(curl -sf -X POST "$BASE/api/registration" \
  -F "givenName=Smoke" -F "surname=Test" -F "email=smoke@example.org" \
  -F "isMemberUniversity=No" -F "hasFamilyMembers=No" -F "paymentMethod=wire-transfer" \
  -F "profilePhoto=@$PNG;type=image/png" -F "passportScan=@$PNG;type=image/png" \
  | sed -E 's/.*"reg_id":"([^"]+)".*/\1/')

AMOUNT=$(sqlite3 "$DB" "select payment_amount from registrations where reg_id='$REG';")
INVOICE=$(sqlite3 "$DB" "select invoice_path from registrations where reg_id='$REG';")
CODE=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/invoice/$REG")

[ -n "$AMOUNT" ] || { echo "FAIL: no amount priced for $REG"; exit 1; }
[ -n "$INVOICE" ] || { echo "FAIL: no invoice generated for $REG"; exit 1; }
[ "$CODE" = "200" ] || { echo "FAIL: invoice download returned $CODE"; exit 1; }

echo "PASS: $REG priced $AMOUNT USD, invoice $INVOICE, download 200"
echo "Clean up with: sqlite3 $DB \"delete from registrations where reg_id='$REG';\""
