import path from "node:path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { readUploadStream } from "@/lib/fileStorage";

export const dynamic = "force-dynamic";

const EXT_MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

export async function GET(_request, ctx) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return new Response("Forbidden", { status: 403 });
  }

  const params = await ctx.params;
  const parts = Array.isArray(params?.path) ? params.path : [];
  const relative = parts.join("/");
  if (!relative) {
    return new Response("Not found", { status: 404 });
  }

  let buffer;
  try {
    buffer = await readUploadStream(relative);
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const ext = path.extname(relative).toLowerCase();
  const mime = EXT_MIME[ext] || "application/octet-stream";

  return new Response(buffer, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
