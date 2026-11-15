import fs from "node:fs";
import path from "node:path";
import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import ScheduleView from "@/components/schedule/scheduleView";

export const metadata = {
  title: "Program Schedule | IAUP Semi-Annual Meeting 2026",
  description: "Program schedule for the IAUP Semi-Annual Meeting 2026.",
};

// Source of truth: src/content/schedule.md — wording is rendered verbatim.
const md = fs.readFileSync(path.join(process.cwd(), "src/content/schedule.md"), "utf8");
const cells = (line) => line.trim().replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => c.trim());
const plain = (s) => s.replace(/\*\*/g, "").replace(/\\\|/g, "|").trim();

const [head, ...tables] = md.split(/\n(?=\| DAY )/);
const intro = head.split("\n").filter((l) => l.trim()).map(plain);

const days = tables.map((t) => {
  const lines = t.split("\n").filter((l) => l.startsWith("|"));
  const title = cells(lines[0])[0].trim();
  const [, num, date] = title.match(/^DAY (\d+): (\d+ \w+)/);
  const rows = lines.slice(3).map((l) => {
    const [time, text = ""] = cells(l);
    return !text && time && !/\d:\d\d/.test(time) ? { label: time } : { time, text };
  });
  return { label: `Day ${num}`, date, title, venue: cells(lines[2])[1], rows };
});

export default function ProgramSchedulePage() {
  return (
    <>
      <Nev />
      <ScheduleView intro={intro} days={days} />
      <Footer />
    </>
  );
}
