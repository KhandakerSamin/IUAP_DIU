"use client";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Mail,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  X,
  ArrowRight,
  Copy,
  Check,
  CalendarDays,
  FileCheck2,
  Info,
  BookMarked,
} from "lucide-react";

const CHAPTERS_DATA = [
  {
    id: "01",
    number: "01",
    title: "AI-Native Universities",
    badge: "Chapter 01",
    titles: [
      "Building the AI-Native University: From Digital Transformation to Intelligent Ecosystems",
      "The Future of AI-Native Higher Education: Institutions, Infrastructures, and Innovation",
      "From Smart Campuses to AI-Native Universities: Reimagining Institutional Transformation",
      "AI-Native Universities: Redesigning Academic, Administrative, and Research Ecosystems",
      "Universities as Intelligent Ecosystems: AI, Automation, and Institutional Innovation",
    ],
  },
  {
    id: "02",
    number: "02",
    title: "Universities After AI",
    badge: "Chapter 02",
    titles: [
      "Reimagining Universities in the Age of Artificial Intelligence",
      "The AI-Transformed University: Rethinking Higher Education for the Next Decade",
      "Beyond the Traditional University: AI, Innovation, and the Future of Higher Education",
      "AI and the New University: Transforming Teaching, Learning, and Institutional Leadership",
      "The University in the Age of AI: From Knowledge Transmission to Intelligent Learning Ecosystems",
    ],
  },
  {
    id: "03",
    number: "03",
    title: "Entrepreneurial Universities & Economic Growth",
    badge: "Chapter 03",
    titles: [
      "The Entrepreneurial University: Driving Innovation, Employment, and Sustainable Economic Growth",
      "From Knowledge to Impact: Building Universities for Entrepreneurship and Economic Transformation",
      "Universities as Engines of Innovation and Sustainable Economic Development",
      "Entrepreneurial Higher Education: Linking Research, Innovation, Industry, and Economic Growth",
      "Building the Future Entrepreneurial University: Innovation, Technology, and Sustainable Development",
    ],
  },
  {
    id: "04",
    number: "04",
    title: "Sustainable Universities",
    badge: "Chapter 04",
    titles: [
      "The Sustainable University: Transforming Campuses for a Resilient Planet",
      "Green and Resilient Universities: Building Sustainable Higher Education Systems",
      "Universities for a Sustainable Planet: Climate Action, Innovation, and Institutional Transformation",
      "Beyond Green Campuses: Reimagining Universities for Sustainability and Climate Resilience",
      "Sustainable Campus to Sustainable Society: The Transformative Role of Universities",
    ],
  },
  {
    id: "05",
    number: "05",
    title: "Open Science, AI & Academic Research",
    badge: "Chapter 05",
    titles: [
      "Open Science in the Age of AI: Reimagining the Future of Academic Research",
      "AI-Powered Open Science: Transforming Research, Knowledge, and Scholarly Communication",
      "The Future of Research: Open Science, Artificial Intelligence, and Global Knowledge",
      "From Closed Knowledge to Open Intelligence: AI and the Transformation of Academic Research",
      "Open, Intelligent, and Collaborative Research: The Next Generation of Academic Science",
    ],
  },
];

const GUIDELINES_PDF_URL =
  "/Submission_Guidelines_AI-Native_Sustainable_University_Framework_.pdf";
const SUBMISSION_EMAIL = "iaup-bd2026@daffodilvarsity.edu.bd";
const EMAIL_SUBJECT_TEMPLATE =
  "Call for Book Chapters – AI-Native Sustainable University Framework – [Author Name]";

function SubmissionGuidelinesModal({ open, onClose }) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!open) return null;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "subject") {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const sections = [
    {
      num: "01",
      title: "Title",
      desc: "A clear, specific, and relevant title aligned with one of the book themes.",
    },
    {
      num: "02",
      title: "Author Information",
      desc: "Author name(s), Affiliation / Institution, and Email address.",
    },
    {
      num: "03",
      title: "Abstract",
      desc: "150–300 words summarizing the chapter's focus, approach, key findings, and contribution.",
    },
    {
      num: "04",
      title: "Keywords",
      desc: "Provide 3–5 keywords relevant to the chapter.",
    },
    {
      num: "05",
      title: "Introduction",
      desc: "Background & context, importance of the topic, current challenges or knowledge gaps, conceptual/theoretical background, and literature review / state of the art.",
    },
    {
      num: "06",
      title: "Methodology / Approach",
      desc: "Where applicable: research or analytical methods, framework or approach used, institutional implementation approach.",
    },
    {
      num: "07",
      title: "Results & Discussion / Case Study / Application",
      desc: "Key findings, institutional case studies or practical applications, tables/figures/diagrams, evidence supporting discussion, practical/theoretical/policy implications, and critical perspectives.",
    },
    {
      num: "08",
      title: "Future Recommendations & Conclusions",
      desc: "Future opportunities, technological or policy developments, remaining challenges, and recommendations for researchers, practitioners, or policymakers.",
    },
    {
      num: "09",
      title: "References",
      desc: "Include key references using a consistent citation style, such as APA.",
    },
    {
      num: "10",
      title: "Acknowledgement",
      desc: "Include acknowledgements where applicable.",
    },
    {
      num: "11",
      title: "Author Biography",
      desc: "Provide a short biography of each author, if required.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto py-6 sm:py-10 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guidelines-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 sm:p-8 bg-slate-50/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              IAUP Semi-Annual Meeting 2026 · Dhaka, Bangladesh
            </div>
            <h2
              id="guidelines-modal-title"
              className="text-2xl sm:text-3xl font-display font-bold text-slate-900"
            >
              Book Chapter <span className="text-primary">Submission Guidelines</span>
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium">
              AI-Native Sustainable University Framework
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
          {/* Quick PDF Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <FileCheck2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                  Official Submission Guidelines PDF
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  You can view the original PDF document or download it for offline reference.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href={GUIDELINES_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primaryDark transition-colors shadow-xs"
              >
                <span>Open PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={GUIDELINES_PDF_URL}
                download
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors shadow-xs"
              >
                <span>Download</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Invitation Scope */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> Scope & Invitation
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              Authors are invited to prepare their chapters based on evidence-based
              practices, successful institutional initiatives, documented outcomes,
              innovations, and real-world implementation experiences. Contributions
              should demonstrate practical lessons, measurable impact, and
              future-oriented recommendations.
            </p>
          </div>

          {/* Manuscript Structure */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" /> Manuscript Structure & Sections
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {sections.map((s) => (
                <div
                  key={s.num}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      {s.num}
                    </span>
                    <h5 className="font-semibold text-slate-900 text-sm">
                      {s.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Length & Submission Process */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-primary block mb-1">
                  Length Specification
                </span>
                <h4 className="font-display font-bold text-slate-900 text-base mb-2">
                  Recommended Length
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">3–5 pages</span>, approximately{" "}
                  <span className="font-semibold text-slate-900">1,500–2,500 words</span>, excluding references.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-primary block mb-1">
                  Submission Mode
                </span>
                <h4 className="font-display font-bold text-slate-900 text-base mb-2">
                  Email Submission
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Submit your chapter proposal or manuscript according to the guidelines as an email attachment.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs">
                  <span className="truncate font-mono text-slate-800">
                    {SUBMISSION_EMAIL}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(SUBMISSION_EMAIL, "email")}
                    className="p-1 text-slate-500 hover:text-primary transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-secondary" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email Subject Format */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-amber-900 block mb-1">
                  Required Email Subject Format
                </span>
                <code className="text-xs sm:text-sm font-mono text-slate-800 break-all select-all">
                  {EMAIL_SUBJECT_TEMPLATE}
                </code>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(EMAIL_SUBJECT_TEMPLATE, "subject")}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {copiedSubject ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-secondary" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Subject</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-200 p-6 sm:p-8 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-sm"
          >
            Close
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(
                "Call for Book Chapters – AI-Native Sustainable University Framework"
              )}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primaryDark transition-colors text-sm shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Submit via Email</span>
            </a>
            <a
              href={GUIDELINES_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookChaptersSection() {
  const [openChapterId, setOpenChapterId] = useState("01");
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);

  const toggleChapter = (id) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

  const expandAll = () => {
    // If not all open, we can expand all or toggle
    setOpenChapterId("ALL");
  };

  const collapseAll = () => {
    setOpenChapterId(null);
  };

  return (
    <>
      <section
        id="call-for-book-chapters"
        className="py-20 lg:py-28 bg-slate-50 relative border-t border-slate-200 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              Call for Participation
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Call for <span className="text-primary">Book Chapters</span>
            </h2>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-base sm:text-lg font-bold text-slate-800">
                AI-Native Sustainable University Framework
              </span>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold ml-2">
                (Edited Volume)
              </span>
            </div>
            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed text-justify sm:text-center max-w-3xl mx-auto">
              <p>
                The IAUP Semi-Annual Meeting 2026 invites university leaders,
                researchers, academics, and higher education professionals to
                contribute chapters to the edited volume{" "}
                <strong className="text-slate-900 font-semibold">
                  AI-Native Sustainable University Framework
                </strong>
                .
              </p>
              <p>
                The book will highlight best practices, successful initiatives,
                practical institutional experiences, innovations, documented
                outcomes, and lessons learned that demonstrate how universities can
                respond to emerging challenges and build future-ready higher
                education systems.
              </p>
            </div>
          </div>

          {/* Main Grid: Chapters Accordion + Guidelines & Submission Card */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Chapters Accordion */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Book Chapters
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Click each Chapter to explore the suggested chapter titles
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              {/* Accordion list */}
              <div className="space-y-3.5 pt-2">
                {CHAPTERS_DATA.map((chapter) => {
                  const isOpen =
                    openChapterId === "ALL" || openChapterId === chapter.id;

                  return (
                    <div
                      key={chapter.id}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                        isOpen
                          ? "bg-white border-primary/40 shadow-md ring-1 ring-primary/20"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleChapter(chapter.id)}
                        aria-expanded={isOpen}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 transition-colors ${
                              isOpen
                                ? "bg-primary text-white shadow-xs"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {chapter.number}
                          </span>
                          <div>
                            <h4
                              className={`font-display text-base sm:text-lg font-bold transition-colors ${
                                isOpen ? "text-primary" : "text-slate-900"
                              }`}
                            >
                              {chapter.title}
                            </h4>
                            <span className="text-xs text-slate-400">
                              {chapter.titles.length} Suggested Titles
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isOpen
                              ? "bg-primary/10 text-primary rotate-180"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-200">
                          <div className="space-y-2.5 mt-2">
                            {chapter.titles.map((title, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary/5 transition-colors border border-slate-100 hover:border-primary/20"
                              >
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                                  {title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Submission Guidelines CTA Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Guidelines Action Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <FileText className="text-primary w-6 h-6" />
                </div>

                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                  Submission Guidelines
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Learn about chapter proposal structure, format requirements,
                  recommended length, keywords, and editorial instructions.
                </p>

                {/* Key Quick Highlights */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">Length:</span>
                    <span className="text-slate-600">3–5 pages (1,500–2,500 words)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">Citation:</span>
                    <span className="text-slate-600">Consistent citation style (APA)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">Deadline:</span>
                    <span className="text-slate-600">15th October 2026</span>
                  </div>
                </div>

                {/* Primary Button requested by user */}
                <button
                  type="button"
                  onClick={() => setGuidelinesModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-primary text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-primaryDark hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span>VIEW SUBMISSION GUIDELINES</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary Direct PDF Open Button */}
                <div className="mt-3 flex items-center justify-center gap-3">
                  <a
                    href={GUIDELINES_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors py-1 px-2"
                  >
                    <span>Open PDF Directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href={GUIDELINES_PDF_URL}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors py-1 px-2"
                  >
                    <span>Download PDF</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Submission Email Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-secondary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-lg">
                      Submit Your Chapter
                    </h4>
                    <span className="text-xs text-slate-500">
                      Send your manuscript or proposal via email
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Please submit your chapter as an email attachment with the following details:
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mb-5">
                  <div className="text-xs">
                    <span className="text-slate-500 block">Recipient Email:</span>
                    <a
                      href={`mailto:${SUBMISSION_EMAIL}`}
                      className="font-mono font-medium text-primary hover:underline break-all"
                    >
                      {SUBMISSION_EMAIL}
                    </a>
                  </div>
                  <div className="text-xs border-t border-slate-200/80 pt-2">
                    <span className="text-slate-500 block mb-0.5">Subject Template:</span>
                    <span className="font-mono text-slate-700 text-[11px] block break-words">
                      {EMAIL_SUBJECT_TEMPLATE}
                    </span>
                  </div>
                </div>

                <a
                  href={`mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(
                    "Call for Book Chapters – AI-Native Sustainable University Framework"
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Send Manuscript via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines Modal */}
      <SubmissionGuidelinesModal
        open={guidelinesModalOpen}
        onClose={() => setGuidelinesModalOpen(false)}
      />
    </>
  );
}
