import { cn } from "@/lib/utils";

/**
 * Faithful, hand-built screen mockups of the two résumé projects.
 *
 * These are illustrations, not screenshots — but the layouts, labels and field
 * names are transcribed from the actual JSP sources (DisplayStudent.jsp,
 * AddStudent.jsp, Header.jsp), so what a visitor sees matches what the code
 * renders. Vector means they stay sharp at any density and cost no image payload.
 */

const BOOTSTRAP_BLUE = "#0D6EFD";

/* ─────────────────────────────────────────────────────────────
   Student Management System — records table (DisplayStudent.jsp)
   ───────────────────────────────────────────────────────────── */
export function StudentRecordsMock({ className }: { className?: string }) {
  const rows = [
    { rno: "101", name: "Aarav Sharma", per: "87.40" },
    { rno: "102", name: "Diya Patil", per: "91.20" },
    { rno: "103", name: "Rohan Deshmukh", per: "78.60" },
    { rno: "104", name: "Isha Kulkarni", per: "83.10" },
  ];

  return (
    <div className={cn("overflow-hidden bg-[#F5F7FA] font-sans", className)} aria-hidden="true">
      {/* navbar */}
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <span className="text-[0.5rem] font-semibold tracking-tight text-slate-800">
          Student Management System
        </span>
        <div className="flex items-center gap-2 text-[0.34rem] text-slate-500">
          <span>Home</span>
          <span>Students</span>
          <span>Add</span>
        </div>
      </div>

      <div className="p-3">
        {/* page heading */}
        <div className="mb-2 text-center">
          <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full bg-blue-50">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={BOOTSTRAP_BLUE} strokeWidth="2">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="2.6" />
            </svg>
          </div>
          <p className="text-[0.62rem] font-bold leading-tight text-slate-800">Student Information</p>
          <p className="text-[0.34rem] text-slate-500">View and search student records</p>
        </div>

        {/* search card */}
        <div className="mb-2 rounded-sm bg-white p-2 shadow-sm">
          <div className="flex items-end gap-1.5">
            <div className="flex-1">
              <p className="mb-1 text-[0.3rem] font-semibold text-slate-600">Search by Roll Number</p>
              <div className="h-3.5 rounded-[2px] border border-slate-300 bg-white px-1 text-[0.28rem] leading-[0.85rem] text-slate-400">
                Enter roll number to search...
              </div>
            </div>
            <div className="h-3.5 w-9 rounded-[2px] bg-[#198754] text-center text-[0.28rem] leading-[0.85rem] text-white">
              Search
            </div>
          </div>
        </div>

        {/* records table */}
        <div className="overflow-hidden rounded-sm bg-white shadow-sm">
          <div className="grid grid-cols-[0.5fr_1.6fr_0.8fr_0.9fr] bg-slate-800 px-2 py-1 text-[0.28rem] font-semibold uppercase tracking-wide text-white">
            <span>RNo</span>
            <span>Name</span>
            <span>Percentage</span>
            <span>Actions</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.rno}
              className={cn(
                "grid grid-cols-[0.5fr_1.6fr_0.8fr_0.9fr] items-center px-2 py-[0.28rem] text-[0.3rem]",
                i % 2 === 1 && "bg-slate-50",
              )}
            >
              <span className="font-mono text-slate-700">{r.rno}</span>
              <span className="truncate text-slate-800">{r.name}</span>
              <span className="text-slate-600">{r.per}%</span>
              <span className="flex gap-1">
                <span className="rounded-[1px] bg-[#0D6EFD] px-1 py-[1px] text-[0.22rem] text-white">Edit</span>
                <span className="rounded-[1px] bg-[#DC3545] px-1 py-[1px] text-[0.22rem] text-white">Delete</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Student Management System — registration form (AddStudent.jsp)
   ───────────────────────────────────────────────────────────── */
export function StudentFormMock({ className }: { className?: string }) {
  const fields = ["Roll Number", "Full Name", "Percentage"];

  return (
    <div className={cn("overflow-hidden bg-[#F5F7FA] font-sans", className)} aria-hidden="true">
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <span className="text-[0.5rem] font-semibold tracking-tight text-slate-800">
          Student Management System
        </span>
        <div className="flex items-center gap-2 text-[0.34rem] text-slate-500">
          <span>Home</span>
          <span>Students</span>
          <span className="text-[#0D6EFD]">Add</span>
        </div>
      </div>

      <div className="p-3">
        <div className="mx-auto max-w-[72%] overflow-hidden rounded-sm bg-white shadow-sm">
          <div className="bg-[#0D6EFD] px-3 py-2 text-center text-white">
            <p className="text-[0.5rem] font-bold leading-tight">Student Registration</p>
            <p className="text-[0.28rem] opacity-80">Add a new student to the system</p>
          </div>

          <div className="space-y-1.5 p-3">
            {fields.map((f) => (
              <div key={f}>
                <p className="mb-0.5 text-[0.28rem] font-semibold text-slate-600">{f}</p>
                <div className="h-3.5 rounded-[2px] border border-slate-300 bg-white" />
              </div>
            ))}
            <div className="!mt-2.5 flex gap-1.5">
              <div className="h-3.5 flex-1 rounded-[2px] bg-[#0D6EFD] text-center text-[0.28rem] leading-[0.85rem] text-white">
                Save Student
              </div>
              <div className="h-3.5 flex-1 rounded-[2px] border border-slate-300 text-center text-[0.28rem] leading-[0.85rem] text-slate-600">
                Reset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Online Examination System — admin dashboard
   Three roles, question management, evaluation, results.
   ───────────────────────────────────────────────────────────── */
export function ExamDashboardMock({ className }: { className?: string }) {
  const questions = [
    { id: "Q-014", topic: "Core Java", type: "MCQ", marks: 2 },
    { id: "Q-015", topic: "JDBC", type: "MCQ", marks: 2 },
    { id: "Q-016", topic: "SQL Joins", type: "Subjective", marks: 5 },
    { id: "Q-017", topic: "Servlets", type: "MCQ", marks: 2 },
  ];

  return (
    <div className={cn("flex overflow-hidden bg-[#0F1216] font-sans", className)} aria-hidden="true">
      {/* sidebar */}
      <div className="w-[22%] shrink-0 border-r border-white/10 bg-[#14181D] p-2">
        <div className="mb-3 flex items-center gap-1">
          <div className="h-2 w-2 rounded-[1px] bg-[#D4FF38]" />
          <span className="text-[0.32rem] font-semibold text-white/90">Exam Admin</span>
        </div>
        {["Dashboard", "Questions", "Students", "Exams", "Results"].map((item, i) => (
          <div
            key={item}
            className={cn(
              "mb-0.5 rounded-[2px] px-1.5 py-1 text-[0.28rem]",
              i === 1 ? "bg-[#D4FF38]/15 text-[#D4FF38]" : "text-white/45",
            )}
          >
            {item}
          </div>
        ))}
      </div>

      {/* main */}
      <div className="flex-1 p-2.5">
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <p className="text-[0.46rem] font-semibold text-white">Question Bank</p>
            <p className="text-[0.26rem] text-white/40">Manage, tag and publish exam questions</p>
          </div>
          <span className="rounded-[2px] bg-[#D4FF38] px-1.5 py-[2px] text-[0.24rem] font-semibold text-[#0B0B0A]">
            + New
          </span>
        </div>

        {/* role chips */}
        <div className="mb-2 grid grid-cols-3 gap-1">
          {[
            { label: "Admin", value: "Full", tone: "text-[#D4FF38]" },
            { label: "Teacher", value: "Author", tone: "text-sky-300" },
            { label: "Student", value: "Attempt", tone: "text-emerald-300" },
          ].map((r) => (
            <div key={r.label} className="rounded-[2px] border border-white/10 bg-white/[0.03] px-1.5 py-1">
              <p className={cn("text-[0.24rem] font-medium", r.tone)}>{r.label}</p>
              <p className="mt-0.5 text-[0.34rem] font-semibold text-white/85">{r.value}</p>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-[2px] border border-white/10">
          <div className="grid grid-cols-[0.6fr_1fr_0.7fr_0.5fr] border-b border-white/10 bg-white/[0.04] px-1.5 py-1 text-[0.22rem] font-medium uppercase tracking-wider text-white/40">
            <span>ID</span>
            <span>Topic</span>
            <span>Type</span>
            <span>Marks</span>
          </div>
          {questions.map((q) => (
            <div
              key={q.id}
              className="grid grid-cols-[0.6fr_1fr_0.7fr_0.5fr] items-center border-b border-white/[0.06] px-1.5 py-[0.22rem] text-[0.26rem] last:border-0"
            >
              <span className="font-mono text-white/35">{q.id}</span>
              <span className="truncate text-white/80">{q.topic}</span>
              <span
                className={cn(
                  "w-fit rounded-[1px] px-1 py-[0.5px] text-[0.2rem]",
                  q.type === "MCQ"
                    ? "bg-sky-400/15 text-sky-300"
                    : "bg-amber-400/15 text-amber-300",
                )}
              >
                {q.type}
              </span>
              <span className="text-white/50">{q.marks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Online Examination System — student result sheet
   ───────────────────────────────────────────────────────────── */
export function ExamResultMock({ className }: { className?: string }) {
  const scores = [
    { label: "Core Java", got: 18, of: 20 },
    { label: "JDBC", got: 16, of: 20 },
    { label: "SQL", got: 14, of: 20 },
    { label: "Servlets", got: 17, of: 20 },
  ];

  return (
    <div className={cn("overflow-hidden bg-[#0F1216] p-3 font-sans", className)} aria-hidden="true">
      <div className="mb-2.5 flex items-baseline justify-between border-b border-white/10 pb-1.5">
        <div>
          <p className="text-[0.44rem] font-semibold text-white">Result Sheet</p>
          <p className="text-[0.24rem] text-white/40">Online Examination System</p>
        </div>
        <span className="rounded-[2px] border border-[#D4FF38]/40 px-1.5 py-[1px] text-[0.22rem] text-[#D4FF38]">
          PUBLISHED
        </span>
      </div>

      {/* total */}
      <div className="mb-2.5 flex items-end gap-2">
        <p className="font-mono text-[1.1rem] font-semibold leading-none text-[#D4FF38]">65</p>
        <p className="mb-0.5 text-[0.26rem] text-white/40">/ 80 marks</p>
        <span className="mb-0.5 ml-auto text-[0.26rem] font-medium text-emerald-300">PASS · 81.25%</span>
      </div>

      {/* per-topic bars */}
      <div className="space-y-1.5">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="mb-0.5 flex justify-between text-[0.24rem]">
              <span className="text-white/60">{s.label}</span>
              <span className="font-mono text-white/35">
                {s.got}/{s.of}
              </span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#D4FF38]"
                style={{ width: `${(s.got / s.of) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
