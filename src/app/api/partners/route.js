import { insertPartnerProposal } from "@/lib/db";
import { CV_MIME, saveUpload } from "@/lib/fileStorage";

export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = ["orgName", "orgType", "country", "contactPerson", "designation", "email", "interest"];
const MAX_TEXT = 300;

function pickText(form, name) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";
}

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!pickText(form, field)) {
      return Response.json({ error: `${field} is required.` }, { status: 400 });
    }
  }

  const email = pickText(form, "email").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const proposalId = `ptn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // Proposal deck is optional here even though the form asks for it — a blocked
  // upload should not lose the enquiry. Same MIME set as speaker CVs (PDF/Word).
  let proposalPath = null;
  try {
    proposalPath = await saveUpload({
      file: form.get("proposal"),
      kind: "cv",
      slug: `${proposalId}-proposal`,
      allowed: CV_MIME,
    });
  } catch (err) {
    return Response.json({ error: err?.message || "Could not save the proposal file." }, { status: 400 });
  }

  try {
    insertPartnerProposal({
      proposal_id: proposalId,
      org_name: pickText(form, "orgName"),
      org_type: pickText(form, "orgType"),
      country: pickText(form, "country"),
      contact_person: pickText(form, "contactPerson"),
      designation: pickText(form, "designation"),
      email,
      interest: pickText(form, "interest"),
      proposal_path: proposalPath,
    });
  } catch (err) {
    console.error("[partners] insert failed", proposalId, err);
    return Response.json({ error: "Could not save your proposal. Please try again." }, { status: 500 });
  }

  return Response.json({ proposal_id: proposalId });
}
