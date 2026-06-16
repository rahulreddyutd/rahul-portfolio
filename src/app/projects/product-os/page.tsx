"use client";
import Link from "next/link";

const C = {
  bg:"#0A0A0B", surface:"#101010", card:"#161614",
  border:"#242420", borderHi:"#323230",
  text:"#F2EDE6", text2:"#9C9790", text3:"#4A4742",
  gold:"#C9922A", goldDim:"#7A5518", goldGlow:"rgba(201,146,42,0.10)",
  green:"#4ABA7A", red:"#E06060", blue:"#5B9BD5", purple:"#9B7FD4",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:"72px" }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"20px" }}>{title}</div>
      {children}
    </div>
  );
}

export default function ProductOSCaseStudy() {
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
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.text3, marginBottom:"12px" }}>2026 · Product Intelligence</div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,52px)", fontWeight:400, color:C.text, lineHeight:1.1, marginBottom:"16px" }}>
            ProductOS<br /><em style={{ fontStyle:"italic", color:C.gold }}>Product thinking, automated.</em>
          </h1>
          <p style={{ fontSize:"16px", color:C.text2, lineHeight:1.75, maxWidth:"580px", marginBottom:"28px" }}>
            Most AI tools automate work. ProductOS automates product thinking — converting raw customer signal into RICE-scored roadmaps, PRDs, and A/B test designs in under 30 seconds.
          </p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="https://product-os.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:C.gold, color:C.bg, borderRadius:"6px", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Live Demo ↗</a>
            <a href="https://github.com/rahulreddyutd/product-os" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:"transparent", color:C.text2, border:`1px solid ${C.borderHi}`, borderRadius:"6px", fontSize:"13px", textDecoration:"none" }}>GitHub →</a>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"72px" }}>
          {[
            { v:"6", l:"Specialized Agents", c:C.gold },
            { v:"<30s", l:"Full Product Brief", c:C.gold },
            { v:"RICE", l:"Evidence-Based Scoring", c:C.green },
            { v:"150w", l:"Input Quality Gate", c:C.blue },
          ].map(({ v, l, c }) => (
            <div key={l} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"32px", color:c, lineHeight:1, marginBottom:"6px" }}>{v}</div>
              <div style={{ fontSize:"12px", color:C.text2 }}>{l}</div>
            </div>
          ))}
        </div>

        <Section title="Problem">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"16px" }}>
            PMs spend 60-70% of their time collecting and synthesizing signal: reading interview transcripts, triaging ticket themes, debating priorities with stakeholders, writing PRDs from scratch. The output of all that work is a set of decisions: what to build, in what order, for whom, and why.
          </p>
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8 }}>
            ProductOS compresses the synthesis layer. It does not replace the PM. It removes the part that does not require a PM — pattern recognition across large bodies of unstructured text — so the PM can focus on the part that does: judgment, stakeholder alignment, and tradeoffs.
          </p>
        </Section>

        <Section title="Architecture">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"24px" }}>
            Six agents with two parallel pairs — reducing total latency from ~6 sequential calls to ~4 serial stages.
          </p>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"28px", fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", color:C.text3, lineHeight:2 }}>
            <div style={{ color:C.text }}>Research Agent &nbsp;<span style={{ color:C.text3 }}>(pain points with sourceCount — "8 of 12 interviews")</span></div>
            <div>↓</div>
            <div style={{ display:"flex", gap:"32px" }}>
              <div style={{ color:C.green }}>Opportunity Agent &nbsp;<span style={{ color:C.text3 }}>(revenue impact)</span></div>
              <div style={{ color:C.text3 }}>← parallel →</div>
              <div style={{ color:C.blue }}>Prioritization Agent &nbsp;<span style={{ color:C.text3 }}>(RICE scoring)</span></div>
            </div>
            <div>↓</div>
            <div style={{ color:C.gold }}>Strategy Agent &nbsp;<span style={{ color:C.text3 }}>(roadmap + KPIs + strategic memo)</span></div>
            <div>↓</div>
            <div style={{ display:"flex", gap:"32px" }}>
              <div style={{ color:C.purple }}>PRD Agent &nbsp;<span style={{ color:C.text3 }}>(user stories + acceptance criteria)</span></div>
              <div style={{ color:C.text3 }}>← parallel →</div>
              <div style={{ color:C.red }}>Experiment Agent &nbsp;<span style={{ color:C.text3 }}>(A/B test designs)</span></div>
            </div>
          </div>
        </Section>

        <Section title="Key Design Decisions">
          {[
            { title:"Schema-first output", body:"The canonical Product Brief schema was designed before writing a single agent. Every agent's extraction logic was designed backward from what the dashboard needed to render. This prevents the failure mode where agents produce rich output that does not compose into anything useful downstream." },
            { title:"sourceCount as evidence signal", body:"Every pain point includes a sourceCount field: '8 of 12 interviews mentioned this' rather than 'customers want better reporting.' This single field is what separates evidence-grounded analysis from summarization. The UI renders it as '8 sources' — a signal a PM can act on." },
            { title:"150-word input minimum enforced at button level", body:"Generic input produces generic output. The 150-word minimum is enforced at the button — disabled below threshold, amber warning in real-time. This is a product quality gate built into the UX, not a backend validation that fails silently." },
            { title:"Strategy Agent NOT-building prompt", body:"The Strategy Agent is explicitly prompted to name what the team is NOT building this quarter and why. Most product strategy documents are lists of things to do. The hardest PM skill is saying no with a reason. This single prompt instruction produces strategic memos that read like a CPO wrote them." },
            { title:"RICE over ICE or MoSCoW", body:"RICE (Reach * Impact * Confidence / Effort) creates a numeric output that produces a defensible ranking PMs can show to stakeholders. ICE is faster but less rigorous. MoSCoW is qualitative and harder to defend in a roadmap review." },
          ].map(({ title, body }) => (
            <div key={title} style={{ borderLeft:`2px solid ${C.gold}`, paddingLeft:"20px", marginBottom:"28px" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"18px", color:C.text, marginBottom:"8px" }}>{title}</div>
              <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>{body}</p>
            </div>
          ))}
        </Section>

        <Section title="Three Demo Scenarios">
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {[
              { label:"B2B SaaS Churn Crisis", tag:"Retention play", body:"$2.3M ARR at risk across 14 enterprise accounts. Research Agent surfaces reporting gaps as the real churn driver — not UX, not pricing. RICE board puts reporting dashboard at P0 above all new feature requests." },
              { label:"B2C Consumer App Growth Plateau", tag:"Growth play", body:"D30 retention at 14% vs 22% benchmark. Research Agent identifies social isolation as the root cause (not content quality — users love the workouts). Strategy Agent recommends two bets: social graph and adaptive coaching." },
              { label:"Enterprise Fintech Feature Backlog", tag:"Prioritization challenge", body:"8 competing priorities, finite 22-person engineering team. Prioritization Agent RICE-scores all 8 features. PCI Level 1 certification surfaces as P0 — contractual penalty risk of $2.4M makes it non-negotiable." },
            ].map(({ label, tag, body }) => (
              <div key={label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:"16px", color:C.text }}>{label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", padding:"3px 8px", background:`${C.gold}15`, border:`1px solid ${C.gold}35`, color:C.gold, borderRadius:"4px" }}>{tag}</span>
                </div>
                <p style={{ fontSize:"13px", color:C.text2, lineHeight:1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Link href="/projects/executive-ai" style={{ fontSize:"13px", color:C.text3, textDecoration:"none" }}>← ExecutiveAI</Link>
          <Link href="/" style={{ fontSize:"13px", color:C.text2, textDecoration:"none" }}>Back to Portfolio →</Link>
        </div>

      </div>
    </>
  );
}
