import { insertSpeakerProposal } from "@/lib/db";
import { CV_MIME, saveUpload } from "@/lib/fileStorage";
import { PANELS } from "@/lib/panels";

export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = ["fullName", "designation", "institution", "country", "email", "panel"];
const MAX_TEXT = 6000;

function pickText(form, name) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function buildProposalId() {
  return `spk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
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

  const panel = pickText(form, "panel");
  if (!PANELS.includes(panel)) {
    return Response.json({ error: "Please select one of the listed panels." }, { status: 400 });
  }

  const cvFile = form.get("cv");
  if (!cvFile || typeof cvFile !== "object" || typeof cvFile.arrayBuffer !== "function" || (cvFile.size ?? 0) === 0) {
    return Response.json({ error: "A CV file is required." }, { status: 400 });
  }

  const proposalId = buildProposalId();

  let cvPath;
  try {
    cvPath = await saveUpload({
      file: cvFile,
      kind: "cv",
      slug: `${proposalId}-cv`,
      allowed: CV_MIME,
    });
  } catch (err) {
    return Response.json({ error: err?.message || "Could not save the CV." }, { status: 400 });
  }

  try {
    insertSpeakerProposal({
      proposal_id: proposalId,
      full_name: pickText(form, "fullName"),
      designation: pickText(form, "designation"),
      institution: pickText(form, "institution"),
      country: pickText(form, "country"),
      email,
      panel,
      abstract: pickText(form, "abstract").slice(0, MAX_TEXT) || null,
      bio: pickText(form, "bio").slice(0, MAX_TEXT) || null,
      cv_path: cvPath,
    });
  } catch (err) {
    console.error("[speakers] insert failed", proposalId, err);
    return Response.json({ error: "Could not save your proposal. Please try again." }, { status: 500 });
  }

  return Response.json({ proposal_id: proposalId });
}
