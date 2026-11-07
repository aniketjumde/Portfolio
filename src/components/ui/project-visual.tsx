import type { Project } from "@/data/work";
import {
  ExamDashboardMock,
  ExamResultMock,
  StudentFormMock,
  StudentRecordsMock,
} from "@/components/ui/project-mocks";

const SCREENS = {
  form: StudentFormMock,
  records: StudentRecordsMock,
  dashboard: ExamDashboardMock,
  result: ExamResultMock,
} as const;

/**
 * A project "screenshot" in a browser chrome frame.
 *
 * The screen is a hand-built vector mockup of the real application (see
 * project-mocks), so it stays sharp at any DPI and ships no image bytes. The
 * frame fades the artwork into the card rather than boxing it in a hard edge.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const Screen = SCREENS[project.mock];
  const { art } = project;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[hsl(0_0%_100%/0.1)]"
      style={{
        background: `linear-gradient(150deg, ${art.from} 0%, ${art.to} 100%)`,
      }}
    >
      {/* ambient glow in the project's own accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[60px]"
        style={{ background: art.accent, opacity: 0.3 }}
      />

      {/* browser chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-3 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/12" />
        <span className="ml-2 flex-1 truncate rounded bg-black/30 px-2 py-[2px] font-mono text-[0.55rem] tracking-[0.04em] text-white/50">
          {art.label}
        </span>
      </div>

      {/* screen */}
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Screen className="absolute inset-0 h-full w-full" />
      </div>

      {/* fade so it melts into the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
      />
    </div>
  );
}
