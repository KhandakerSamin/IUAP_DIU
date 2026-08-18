import fs from "node:fs/promises";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { collectCvPathsForProposalIds, dataDir, deleteSpeakerProposalsByIds } from "@/lib/db";

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
