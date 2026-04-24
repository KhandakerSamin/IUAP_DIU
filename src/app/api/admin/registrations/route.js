import fs from "node:fs/promises";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  collectFilePathsForRegIds,
  dataDir,
  deleteRegistrationsByRegIds,
  updateRegistrationByRegId,
} from "@/lib/db";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set(["pending", "paid", "failed"]);

async function ensureAuthed() {
  const ok = await isAdminAuthenticated();
  return ok;
}

function normalizeRegIds(value) {
  if (!Array.isArray(value)) return [];
  const out = [];
  for (const v of value) {
    if (typeof v === "string") {
      const trimmed = v.trim();
      if (trimmed) out.push(trimmed);
    }
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
        console.warn("[admin/registrations] file cleanup skipped", rel, code);
      }
    }
  }
}

export async function DELETE(request) {
  if (!(await ensureAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const regIds = normalizeRegIds(body?.reg_ids);
  if (regIds.length === 0) {
    return Response.json({ error: "No registrations selected." }, { status: 400 });
  }

  const filePaths = collectFilePathsForRegIds(regIds);
  const result = deleteRegistrationsByRegIds(regIds);
  await safeDeleteFiles(filePaths);

  return Response.json({ deleted: result.changes || 0 });
}

export async function PATCH(request) {
  if (!(await ensureAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const regId = typeof body?.reg_id === "string" ? body.reg_id.trim() : "";
  if (!regId) {
    return Response.json({ error: "Missing reg_id." }, { status: 400 });
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

  if (cleaned.payment_status && !ALLOWED_STATUSES.has(cleaned.payment_status)) {
    return Response.json({ error: "Invalid payment_status." }, { status: 400 });
  }

  if (cleaned.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
    return Response.json({ error: "Invalid email." }, { status: 400 });
  }

  const result = updateRegistrationByRegId(regId, cleaned);
  if (!result.changes) {
    return Response.json({ error: "No changes applied (row not found or no editable fields)." }, { status: 404 });
  }

  return Response.json({ updated: result.changes });
}
