// Wire-transfer beneficiary details: printed on the proforma invoice and
// repeated in the payment-instruction email so delegates have them in both.
// TODO: replace the TODO- placeholders with the values confirmed by DIU finance
// before this goes live — they are what delegates will wire money against.
export const WIRE_DETAILS = [
  ["Beneficiary name", "Daffodil International University"],
  ["Beneficiary address", "Daffodil Smart City, Birulia, Savar, Dhaka 1216, Bangladesh"],
  ["Bank name", "TODO-BANK-NAME"],
  ["Branch", "TODO-BRANCH"],
  ["Account number", "TODO-ACCOUNT-NUMBER"],
  ["SWIFT / BIC", "TODO-SWIFT-CODE"],
];

export const WIRE_CONTACT_EMAIL = "iaup-bd2026@daffodilvarsity.edu.bd";

export const WIRE_NOTE =
  `Quote the invoice number as the transfer reference and email the transfer receipt to ${WIRE_CONTACT_EMAIL}. ` +
  "All bank charges, including intermediary bank fees, are payable by the sender. " +
  "Your registration is confirmed once the transfer is received.";
