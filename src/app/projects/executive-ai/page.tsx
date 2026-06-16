"use client";
import Link from "next/link";

const C = {
  bg:"#0A0A0B", surface:"#101010", card:"#161614",
  border:"#242420", borderHi:"#323230",
  text:"#F2EDE6", text2:"#9C9790", text3:"#4A4742",
  gold:"#C9922A", goldDim:"#7A5518", goldGlow:"rgba(201,146,42,0.10)",
  green:"#4ABA7A", red:"#E06060", blue:"#5B9BD5", purple:"#9B7FD4",
};

function Section({ title, color, children }: { title: string; color?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:"72px" }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color: color ?? C.purple, textTransform:"uppercase", marginBottom:"20px" }}>{title}</div>
      {children}
    </div>
  );
}

function MetricCard({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px", textAlign:"center" }}>
      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"32px", color: color ?? C.purple, lineHeight:1, marginBottom:"6px" }}>{value}</div>
      <div style={{ fontSize:"12px", color:C.text2 }}>{label}</div>
    </div>
  );
}

export default function ExecutiveAICaseStudy() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{background:#0A0A0B;color:#F2EDE6;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;}`}</style>

      <div style={{ padding:"20px max(24px,calc((100% - 760px)/2))", borderBottom:`1px solid ${C.border}` }}>
        <Link href="/" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:C.text3, textDecoration:"none" }}
        onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color=C.text2)}
        onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color=C.text3)}
        >← Back to Portfolio</Link>
      </div>

      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"64px 24px" }}>

        <div style={{ marginBottom:"56px" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.text3, marginBottom:"12px" }}>2025 · Executive Intelligence</div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,52px)", fontWeight:400, color:C.text, lineHeight:1.1, marginBottom:"16px" }}>
            ExecutiveAI<br /><em style={{ fontStyle:"italic", color:C.purple }}>Governance by architecture.</em>
          </h1>
          <p style={{ fontSize:"16px", color:C.text2, lineHeight:1.75, maxWidth:"580px", marginBottom:"28px" }}>
            An AI Chief of Staff that converts meeting transcripts and Slack threads into structured decision registries — with accountability structurally enforced rather than process-dependent.
          </p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="https://executive-ai-indol.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:C.purple, color:C.bg, borderRadius:"6px", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Live Demo ↗</a>
            <a href="https://github.com/rahulreddyutd/executive-ai" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:"transparent", color:C.text2, border:`1px solid ${C.borderHi}`, borderRadius:"6px", fontSize:"13px", textDecoration:"none" }}>GitHub →</a>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"72px" }}>
          <MetricCard value="5" label="Agents" />
          <MetricCard value="4-6h" label="Saved per Week" />
          <MetricCard value="100%" label="CRITICAL Escalated" />
          <MetricCard value="5wk" label="Timeline History" />
        </div>

        <Section title="Problem">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"16px" }}>
            Executives spend 4-6 hours per week reading meeting summaries, chasing action items, and trying to synthesize signals from across their organization. The failure mode is not missing information — it is the inability to separate signal from noise at the moment a decision needs to be made.
          </p>
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8 }}>
            More specifically: CRITICAL decisions get buried in status reports and missed until the damage is done. Risk signals that were visible two weeks ago disappear into the archive before anyone acts on them. Accountability for decisions made in meetings evaporates because no one wrote them down in a format that persists.
          </p>
        </Section>

        <Section title="Architecture">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"24px" }}>
            Five agents in a Chain-of-Agents pattern. Risk and Stakeholder agents run in parallel — both depend only on Meeting Agent output, not on each other — reducing end-to-end latency by 40% vs sequential execution.
          </p>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"28px", fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", color:C.text3, lineHeight:2 }}>
            <div style={{ color:C.text2 }}>5-Agent Pipeline</div>
            <br />
            <div style={{ color:C.text }}>Meeting Agent &nbsp;<span style={{ color:C.text3 }}>(decisions, action items, blockers, open questions)</span></div>
            <div style={{ paddingLeft:"20px" }}>↓</div>
            <div style={{ display:"flex", gap:"40px", paddingLeft:"20px" }}>
              <div>
                <div style={{ color:C.red }}>Risk Agent &nbsp;<span style={{ color:C.text3 }}>(severity + delta)</span></div>
              </div>
              <div style={{ color:C.text3 }}>← parallel →</div>
              <div>
                <div style={{ color:C.blue }}>Stakeholder Agent &nbsp;<span style={{ color:C.text3 }}>(sentiment + escalation)</span></div>
              </div>
            </div>
            <div style={{ paddingLeft:"20px" }}>↓</div>
            <div style={{ color:C.text, paddingLeft:"20px" }}>Decision Agent &nbsp;<span style={{ color:C.text3 }}>(priority, owner, recommendation)</span></div>
            <div style={{ paddingLeft:"20px" }}>↓</div>
            <div style={{ color:C.purple, paddingLeft:"20px", fontWeight:600 }}>Executive Briefing Agent &nbsp;<span style={{ color:C.text3, fontWeight:400 }}>(one-page synthesis)</span></div>
            <br />
            <div style={{ color:C.text3 }}>CRITICAL decisions → Approval Queue → Immutable Audit Trail</div>
          </div>
        </Section>

        <Section title="Key Design Decisions">
          {[
            { title:"Schema-first design", body:"The canonical executive briefing schema was designed before writing a single agent. The delta field on risks surfaces not just what the risk is, but how it has changed since last week. A risk at the same level is monitoring. A risk that has escalated is a conversation the exec needs to have today." },
            { title:"Governance-by-architecture", body:"CRITICAL decisions cannot reach the delivery layer without passing through the Approval Queue. This is not a workflow rule or a process checklist — it is a structural constraint. The accountability exists in the architecture, not in people remembering to follow a process." },
            { title:"Parallel execution for Risk and Stakeholder agents", body:"Both depend only on Meeting Agent output. Running them with Promise.all reduces total latency without any architectural tradeoff. This is the same principle behind all multi-agent orchestration: identify the dependency graph first, parallelize where it allows." },
            { title:"globalThis singleton store", body:"Vercel serverless runs each API route in an isolated module instance. A naive module-level variable creates separate store objects per route, so approvals in /api/approval never reach /api/dashboard. globalThis.__executiveAiStore ensures all routes share the same object." },
          ].map(({ title, body }) => (
            <div key={title} style={{ borderLeft:`2px solid ${C.purple}`, paddingLeft:"20px", marginBottom:"28px" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"18px", color:C.text, marginBottom:"8px" }}>{title}</div>
              <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>{body}</p>
            </div>
          ))}
        </Section>

        <Section title="Three Demo Scenarios">
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {[
              { label:"Q3 Launch at Risk", tag:"Risk Agent showcase", body:"Stripe dependency slip could push launch 2 weeks and expose $80K in media spend. Watch the Risk Agent surface the delta signal and the Decision Agent frame three calls leadership needs by EOD Thursday." },
              { label:"Roadmap Prioritization Conflict", tag:"Stakeholder Agent showcase", body:"Three teams pulling the roadmap in different directions. Sales committed $2.1M in pipeline to features Engineering has not agreed to build. Stakeholder Agent maps the misalignment. Decision Agent frames the CEO escalation." },
              { label:"Board Prep Sprint", tag:"Briefing Agent showcase", body:"Four simultaneous workstreams, two weeks to board. Key Insight surfaces the P0 pattern as the board-level risk — not the individual incidents, the pattern they reveal." },
            ].map(({ label, tag, body }) => (
              <div key={label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:"16px", color:C.text }}>{label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", padding:"3px 8px", background:`${C.purple}15`, border:`1px solid ${C.purple}35`, color:C.purple, borderRadius:"4px" }}>{tag}</span>
                </div>
                <p style={{ fontSize:"13px", color:C.text2, lineHeight:1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Link href="/projects/regulated-ai" style={{ fontSize:"13px", color:C.text3, textDecoration:"none" }}>← RegulatedAI</Link>
          <Link href="/projects/product-os" style={{ fontSize:"13px", color:C.text2, textDecoration:"none" }}>ProductOS →</Link>
        </div>

      </div>
    </>
  );
}
