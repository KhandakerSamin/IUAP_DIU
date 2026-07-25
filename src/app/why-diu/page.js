import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";

export const metadata = {
  title: "Why DIU | IAUP Semi-Annual Meeting 2026",
  description: "Learn why Daffodil International University is hosting the IAUP Semi-Annual Meeting 2026.",
};

export default function WhyDiuPage() {
  return (
    <>
      <Nev />
      <main className="min-h-screen pt-24 pb-16">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Why DIU</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">Why DIU</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Placeholder content for the Why DIU page. Add your final copy, highlights, and supporting details here.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
