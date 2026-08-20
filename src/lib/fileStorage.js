import fs from "node:fs/promises";
import path from "node:path";
import { dataDir } from "@/lib/db";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Map([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["application/pdf", "pdf"],
]);

export const SUPPORTED_ACCEPT = Array.from(ALLOWED_MIME.keys()).join(",");

// Speaker CVs additionally allow Word documents. Kept separate so registration
// photo/passport uploads stay images + PDF only.
const CV_MIME = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);

export { CV_MIME };

function sanitizeSlug(value) {
  return String(value || "").replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 60) || "file";
}

const UPLOAD_KINDS = new Set(["profiles", "passports", "family", "cv"]);

export function uploadKind(kind) {
  if (!UPLOAD_KINDS.has(kind)) {
    throw new Error(`Invalid upload kind: ${kind}`);
  }
  return kind;
}

export async function saveUpload({ file, kind, slug, allowed = ALLOWED_MIME }) {
  if (!file) return null;

  if (typeof file === "object" && file !== null && typeof file.size === "number" && file.size === 0) {
    return null;
  }

  uploadKind(kind);

  if (typeof file.size !== "number" || file.size > MAX_BYTES) {
    throw new Error(`File too large (max ${Math.round(MAX_BYTES / 1024 / 1024)} MB).`);
  }

  const mime = String(file.type || "").toLowerCase();
  const allowedExts = new Set(allowed.values());
  // Some browsers send an empty or generic type for .doc/.docx, so fall back to
  // the filename extension before rejecting.
  const nameExt = String(file.name || "").toLowerCase().split(".").pop();
  const ext = allowed.get(mime) || (allowedExts.has(nameExt) ? nameExt : null);
  if (!ext) {
    throw new Error(
      `Unsupported file type: ${mime || "unknown"}. Allowed: ${Array.from(allowedExts).join(", ").toUpperCase()}.`
    );
  }

  const dir = path.join(dataDir(), kind);
  await fs.mkdir(dir, { recursive: true });

  const fileName = `${sanitizeSlug(slug)}-${Date.now().toString(36)}.${ext}`;
  const absPath = path.join(dir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absPath, buffer, { mode: 0o600 });

  return path.join(kind, fileName);
}

export async function readUploadStream(relativePath) {
  const safeRelative = path.posix.normalize(String(relativePath || "")).replace(/^\/+/, "");
  if (safeRelative.includes("..") || path.isAbsolute(safeRelative)) {
    throw new Error("Invalid file path.");
  }
  const abs = path.join(dataDir(), safeRelative);
  return fs.readFile(abs);
}
