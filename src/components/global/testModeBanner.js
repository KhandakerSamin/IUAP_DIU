import { isTestMode } from "@/lib/pricing";

export default function TestModeBanner() {
  if (!isTestMode()) return null;

  const amount = process.env.NEXT_PUBLIC_IAUP_FLAT_FEE_USD;

  return (
    <div className="sticky top-0 z-50 w-full bg-amber-500 text-amber-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-xs font-semibold sm:flex-row sm:gap-3 sm:text-sm">
        <span className="rounded-full bg-amber-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-100 sm:text-xs">
          Test Mode
        </span>
        <span>
          Registration is currently set to a flat <strong>USD {amount}</strong> for stakeholder testing. Do not use for real sign-ups.
        </span>
      </div>
    </div>
  );
}
