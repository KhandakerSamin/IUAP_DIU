import fs from "node:fs/promises";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  collectCvPathsForProposalIds,
  dataDir,
  deleteSpeakerProposalsByIds,
  updateSpeakerProposalById,
} from "@/lib/db";
import { PANELS } from "@/lib/panels";

export const dynamic = "force-dynamic";

function normalizeIds(value) {
  if (!Array.isArray(value)) return [];
  const out = [];
  for (const v of value) {
    if (typeof v === "string" && v.trim()) out.push(v.trim());
  }
  return out;
}

async function safeDeleteFiles(relPaths) {
  const base = dataDir();
  for (const rel of relPaths) {
    try {
      const safe = path.posix.normalize(String(rel || "")).replace(/^\/+/, "");
      if (!safe || safe.includes("..") || path.isAbsolute(safe)) continue;
      const abs = path.join(base, safe);
      if (!abs.startsWith(base + path.sep) && abs !== base) continue;
      await fs.unlink(abs);
    } catch (err) {
      const code = err && err.code;
      if (code !== "ENOENT") {
        console.warn("[admin/speakers] file cleanup skipped", rel, code);
      }
    }
  }
}

export async function DELETE(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const proposalIds = normalizeIds(body?.proposal_ids);
  if (proposalIds.length === 0) {
    return Response.json({ error: "No proposals selected." }, { status: 400 });
  }

  const cvPaths = collectCvPathsForProposalIds(proposalIds);
  const result = deleteSpeakerProposalsByIds(proposalIds);
  await safeDeleteFiles(cvPaths);

  return Response.json({ deleted: result.changes || 0 });
}

export async function PATCH(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const proposalId = typeof body?.proposal_id === "string" ? body.proposal_id.trim() : "";
  if (!proposalId) {
    return Response.json({ error: "Missing proposal_id." }, { status: 400 });
  }

  const updates = body?.updates;
  if (!updates || typeof updates !== "object") {
    return Response.json({ error: "No updates provided." }, { status: 400 });
  }

  const cleaned = {};
  for (const [k, v] of Object.entries(updates)) {
    if (typeof v === "string") {
      cleaned[k] = v.trim();
    } else if (v === null || typeof v === "number" || typeof v === "boolean") {
      cleaned[k] = v;
    }
  }

  if (!cleaned.full_name) {
    return Response.json({ error: "Full name cannot be empty." }, { status: 400 });
  }

  if (!cleaned.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
    return Response.json({ error: "Invalid email." }, { status: 400 });
  }
  cleaned.email = cleaned.email.toLowerCase();

  if (cleaned.panel && !PANELS.includes(cleaned.panel)) {
    return Response.json({ error: "Invalid panel." }, { status: 400 });
  }

  const result = updateSpeakerProposalById(proposalId, cleaned);
  if (!result.changes) {
    return Response.json(
      { error: "No changes applied (proposal not found or no editable fields)." },
      { status: 404 }
    );
  }

  return Response.json({ updated: result.changes });
}
