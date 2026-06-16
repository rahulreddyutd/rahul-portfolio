import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RegulatedAI Case Study — Rahul Reddy",
  description: "Financial & Legal Intelligence Platform with compliance-by-architecture. FINRA Rule 2111, Reg BI, citation verification, human approval workflow.",
};

const C = {
  bg:"#0A0A0B", surface:"#101010", card:"#161614",
  border:"#242420", borderHi:"#323230",
  text:"#F2EDE6", text2:"#9C9790", text3:"#4A4742",
  gold:"#C9922A", goldDim:"#7A5518", goldGlow:"rgba(201,146,42,0.10)",
  green:"#4ABA7A", red:"#E06060", blue:"#5B9BD5",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "72px" }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.blue, textTransform:"uppercase", marginBottom:"20px" }}>{title}</div>
      {children}
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px", textAlign:"center" }}>
      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"32px", color:C.blue, lineHeight:1, marginBottom:"6px" }}>{value}</div>
      <div style={{ fontSize:"12px", color:C.text2 }}>{label}</div>
    </div>
  );
}

export default function RegulatedAICaseStudy() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{background:#0A0A0B;color:#F2EDE6;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;}`}</style>

      {/* Back nav */}
      <div style={{ padding:"20px max(24px,calc((100% - 760px)/2))", borderBottom:`1px solid ${C.border}` }}>
        <Link href="/" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:C.text3, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}
        onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color=C.text2)}
        onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color=C.text3)}
        >← Back to Portfolio</Link>
      </div>

      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"64px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom:"56px" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.text3, marginBottom:"12px" }}>2026 · Financial & Legal AI</div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,52px)", fontWeight:400, color:C.text, lineHeight:1.1, marginBottom:"16px" }}>
            RegulatedAI<br /><em style={{ fontStyle:"italic", color:C.blue }}>Compliance by architecture.</em>
          </h1>
          <p style={{ fontSize:"16px", color:C.text2, lineHeight:1.75, maxWidth:"580px", marginBottom:"28px" }}>
            A multi-agent financial advisory and legal intelligence platform where regulatory compliance is structurally enforced — not a post-processing filter, not a disclaimer, not a checkbox.
          </p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="https://regulated-ai.vercel.app" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:C.blue, color:C.bg, borderRadius:"6px", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Live Demo ↗</a>
            <a href="https://github.com/rahulreddyutd/regulated-ai" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 20px", background:"transparent", color:C.text2, border:`1px solid ${C.borderHi}`, borderRadius:"6px", fontSize:"13px", textDecoration:"none" }}>GitHub →</a>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"72px" }}>
          <MetricCard value="5" label="Specialized Agents" />
          <MetricCard value="<15s" label="End-to-end Analysis" />
          <MetricCard value="100%" label="Audit Trail Coverage" />
          <MetricCard value="0" label="Unverified Citations" />
        </div>

        <Section title="Problem">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"16px" }}>
            Financial advisory and legal AI systems fail in regulated industries for the same reason: compliance is treated as a feature — something added after the agent works — rather than an architectural constraint that shapes every design decision from the start.
          </p>
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8 }}>
            A single FINRA suitability failure in a financial recommendation can trigger sanctions. A hallucinated case citation in a legal brief can result in professional discipline. The June 2023 Schwartz case — where an attorney was sanctioned for citing ChatGPT-fabricated precedents — is the canonical example of what happens when AI systems prioritize fluency over verifiability.
          </p>
        </Section>

        <Section title="Architecture">
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.8, marginBottom:"24px" }}>
            The system uses a supervisor-agent pattern where the compliance gate is the only path to recommendation delivery. This is not a post-processing filter — it is a structural invariant.
          </p>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"28px", fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", color:C.text3, lineHeight:2 }}>
            <div style={{ color:C.text2 }}>Financial Advisory Pipeline</div>
            <br />
            <div style={{ color:C.blue }}>Supervisor Agent</div>
            <div>  ↓</div>
            <div style={{ color:C.text }}>Market Data Agent</div>
            <div>  ↓</div>
            <div style={{ color:C.text }}>Risk Assessment Agent &nbsp;<span style={{ color:C.text3 }}>(Vol/VaR/Drawdown + client suitability)</span></div>
            <div>  ↓</div>
            <div style={{ color:C.text }}>Portfolio Construction Agent &nbsp;<span style={{ color:C.text3 }}>(MPT-based allocation)</span></div>
            <div>  ↓</div>
            <div style={{ color:C.red, fontWeight:600 }}>Compliance Gate &nbsp;<span style={{ color:C.text3, fontWeight:400 }}>(FINRA 2111 · Reg BI · Concentration limits)</span></div>
            <div>  ↓ &nbsp;<span style={{ color:C.text3 }}>PASS only</span></div>
            <div style={{ color:C.green }}>Recommendation Delivery</div>
            <br />
            <div style={{ color:C.text3 }}>FAIL → Human Review Queue → Analyst Approval → Audit Trail</div>
          </div>
        </Section>

        <Section title="Key Design Decisions">
          {[
            { title:"Compliance-by-architecture", body:"The compliance node is not a filter at the end of a pipeline — it is the only node connected to the delivery node. It is structurally impossible for a non-compliant recommendation to reach the user. This pattern was the most important design decision in the project." },
            { title:"Risk scoring formula", body:"Composite risk score = (0.4 × annualized volatility) + (0.35 × max drawdown) + (0.25 × 95% VaR). Client tolerance adjustment maps market risk to personalized exposure bands. Conservative + HIGH market risk = UNACCEPTABLE, not just HIGH." },
            { title:"Citation verification gate", body:"Every legal citation is cross-referenced against a verified knowledge base before delivery. Unverified citations are flagged in red and cannot be included in any output. The Schwartz failure mode — fabricated case citations leading to sanctions — is structurally prevented." },
            { title:"Authority-weighted retrieval", body:"Legal RAG uses hybrid semantic + authority ranking: 50% semantic similarity, 30% authority level (SCOTUS=10, Circuit=7-8, District=5), 20% recency. Jurisdictional filtering built in. Authority and recency serve as tiebreakers, not primary signals." },
          ].map(({ title, body }) => (
            <div key={title} style={{ borderLeft:`2px solid ${C.blue}`, paddingLeft:"20px", marginBottom:"28px" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"18px", color:C.text, marginBottom:"8px" }}>{title}</div>
              <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>{body}</p>
            </div>
          ))}
        </Section>

        <Section title="What This Demonstrates">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            {[
              { label:"For AI PM roles", items:["Compliance as architecture, not feature", "Risk-as-product: suitability, concentration, Reg BI", "Human approval workflow design", "Evaluation dashboard with real metrics"] },
              { label:"For AI Eng roles", items:["Multi-agent StateGraph orchestration", "Hybrid RAG with re-ranking", "Structured JSON output at every boundary", "Parallel agent execution"] },
            ].map(({ label, items }) => (
              <div key={label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"20px" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.blue, marginBottom:"14px", letterSpacing:"0.08em" }}>{label}</div>
                {items.map(item => (
                  <div key={item} style={{ fontSize:"13px", color:C.text2, padding:"6px 0", borderBottom:`1px solid ${C.border}`, display:"flex", gap:"8px" }}>
                    <span style={{ color:C.green }}>✓</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <Link href="/" style={{ fontSize:"13px", color:C.text3, textDecoration:"none" }}>← All Projects</Link>
          <Link href="/projects/product-os" style={{ fontSize:"13px", color:C.text2, textDecoration:"none" }}>ProductOS Case Study →</Link>
        </div>

      </div>
    </>
  );
}
