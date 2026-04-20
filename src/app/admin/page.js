import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const ok = await isAdminAuthenticated();
  redirect(ok ? "/admin/registrations" : "/admin/login");
}
