"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "./components/Nav";

const C = {
  bg: "#0A0A0B", surface: "#101010", card: "#161614",
  border: "#242420", borderHi: "#323230",
  text: "#F2EDE6", text2: "#9C9790", text3: "#4A4742",
  gold: "#C9922A", goldDim: "#7A5518", goldGlow: "rgba(201,146,42,0.10)",
  green: "#4ABA7A", red: "#E06060", blue: "#5B9BD5", purple: "#9B7FD4",
};

const TYPEWRITER_LINES = [
  "compliance-by-architecture",
  "multi-agent orchestration",
  "RAG pipelines in production",
  "governance-by-architecture",
  "LLM evaluation frameworks",
  "0-to-1 enterprise AI platforms",
];

function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");
  const state = useRef({ line: 0, char: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      const s = state.current;
      const line = lines[s.line];
      if (!s.deleting) {
        s.char++;
        setText("> " + line.slice(0, s.char));
        if (s.char === line.length) { s.deleting = true; timer = setTimeout(tick, 1800); return; }
      } else {
        s.char--;
        setText("> " + line.slice(0, s.char));
        if (s.char === 0) { s.deleting = false; s.line = (s.line + 1) % lines.length; }
      }
      timer = setTimeout(tick, s.deleting ? 28 : 52);
    }
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, [lines]);
  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("sr-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Project card with live screenshot ─────────────────────────────────────────

interface Project {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  year: string;
  narrative: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  tagColors: string[];
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    slug: "regulated-ai",
    name: "RegulatedAI",
    tagline: "Financial & Legal Intelligence Platform",
    url: "https://regulated-ai.vercel.app",
    year: "2026",
    narrative: "Compliance-by-architecture: FINRA Rule 2111 and Reg BI gates are structural recommendation delivery is only reachable through compliance, making non-compliant output structurally impossible.",
    metrics: [
      { value: "5", label: "Agents" },
      { value: "<15s", label: "Analysis" },
      { value: "FINRA", label: "Validated" },
      { value: "100%", label: "Audit Trail" },
    ],
    tags: ["5-Agent Pipeline", "FINRA / Reg BI", "RAG", "Human Approval"],
    tagColors: [C.gold, C.red, C.blue, C.green],
    accentColor: C.blue,
  },
  {
    slug: "product-os",
    name: "ProductOS",
    tagline: "AI Operating System for Product Teams",
    url: "https://product-os.vercel.app",
    year: "2026",
    narrative: "6-agent pipeline converting customer interviews, support tickets, and NPS data into RICE-scored roadmaps, PRDs, and A/B test designs. Schema designed before agents output schema first.",
    metrics: [
      { value: "6", label: "Agents" },
      { value: "RICE", label: "Scoring" },
      { value: "PRD", label: "Generation" },
      { value: "<30s", label: "Brief" },
    ],
    tags: ["6-Agent Pipeline", "RICE Scoring", "PRD Generation", "Schema-First"],
    tagColors: [C.gold, C.green, C.blue, C.purple],
    accentColor: C.gold,
  },
  {
    slug: "executive-ai",
    name: "ExecutiveAI",
    tagline: "AI Chief of Staff",
    url: "https://executive-ai.vercel.app",
    year: "2025",
    narrative: "Governance-by-architecture: CRITICAL decisions auto-escalate to an approval queue with impact framing and immutable audit trail. Week-over-week confidence scoring from schedule risk, stakeholder sentiment, and decision velocity.",
    metrics: [
      { value: "5", label: "Agents" },
      { value: "P1/P2/P3", label: "Priority" },
      { value: "Queue", label: "Approval" },
      { value: "4-6h", label: "Saved/wk" },
    ],
    tags: ["5-Agent Pipeline", "Decision Registry", "Approval Workflow", "Audit Trail"],
    tagColors: [C.gold, C.blue, C.green, C.purple],
    accentColor: C.purple,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle`;

  return (
    <div className="sr" style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: "16px", overflow: "hidden",
      transition: "border-color 0.2s",
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHi)}
    onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
    >
      {/* Screenshot */}
      <div style={{
        position: "relative", paddingTop: "56.25%",
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}>
        {/* Accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: project.accentColor, zIndex: 2,
        }} />

        {/* Screenshot TODO: replace with locally hosted PNGs for speed/reliability
            Place files at /public/screenshots/{slug}.png and swap src to `/${project.slug}.png` */}
        {/* Live screenshot via microlink */}
        {!imgError ? (
          <img
            src={screenshotUrl}
            alt={project.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          />
        ) : null}

        {/* Shimmer placeholder */}
        {!imgLoaded && !imgError && (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(90deg, ${C.card} 25%, ${C.surface} 50%, ${C.card} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }} />
        )}

        {/* Fallback stylized mock if screenshot fails */}
        {imgError && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${C.surface} 0%, ${C.card} 100%)`,
            gap: "12px",
          }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "28px", color: project.accentColor }}>{project.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.text3, letterSpacing: "0.1em" }}>LIVE DEMO ↗</div>
          </div>
        )}

        {/* Live badge */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(10,10,11,0.8)", backdropFilter: "blur(8px)",
          border: `1px solid ${C.border}`, borderRadius: "6px",
          padding: "4px 10px",
          fontFamily: "'JetBrains Mono',monospace", fontSize: "10px",
          color: C.green, display: "flex", alignItems: "center", gap: "5px",
          zIndex: 3,
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.green, animation: "blink 2s infinite", display: "inline-block" }} />
          LIVE
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.text3, marginBottom: "8px" }}>
          {project.year}
        </div>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "24px", color: C.text, marginBottom: "4px", lineHeight: 1.2 }}>
          {project.name}
        </div>
        <div style={{ fontSize: "13px", color: project.accentColor, marginBottom: "16px", fontWeight: 500 }}>
          {project.tagline}
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "10px 8px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "15px", color: project.accentColor, fontWeight: 600, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: "10px", color: C.text3, marginTop: "4px", letterSpacing: "0.04em" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "13px", color: C.text2, lineHeight: 1.65, marginBottom: "20px" }}>
          {project.narrative}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {project.tags.map((tag, i) => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: "11px",
              padding: "3px 8px", borderRadius: "4px",
              background: `${project.tagColors[i]}10`,
              border: `1px solid ${project.tagColors[i]}35`,
              color: project.tagColors[i],
            }}>{tag}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "10px" }}>
          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "9px 18px", background: project.accentColor, color: C.bg,
            borderRadius: "6px", fontSize: "13px", fontWeight: 600,
            textDecoration: "none", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Live Demo ↗
          </a>
          <Link href={`/projects/${project.slug}`} style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "9px 18px", background: "transparent", color: C.text2,
            border: `1px solid ${C.borderHi}`, borderRadius: "6px",
            fontSize: "13px", fontWeight: 500, textDecoration: "none",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.text3; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.text2; e.currentTarget.style.borderColor = C.borderHi; }}
          >
            Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Architecture diagram ───────────────────────────────────────────────────────

function ArchDiagram() {
  const nodes = [
    { label: "User Input", sub: "transcripts / tickets / code", color: C.text2 },
    { label: "Agent Layer", sub: "Research → Risk → Strategy → PRD", color: C.gold },
    { label: "Evaluation", sub: "LLM-as-judge / citation verify / RICE", color: C.blue },
    { label: "Governance Gate", sub: "compliance-by-architecture", color: C.purple },
    { label: "Decision", sub: "auditable / traceable / human-in-loop", color: C.green },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0", maxWidth: "440px", margin: "0 auto" }}>
      {nodes.map((n, i) => (
        <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{
            background: C.card, border: `1px solid ${n.color}40`,
            borderRadius: "10px", padding: "16px 24px",
            width: "100%", textAlign: "center",
            boxShadow: `0 0 20px ${n.color}08`,
          }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "18px", color: n.color, marginBottom: "4px" }}>{n.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.text3 }}>{n.sub}</div>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
              <div style={{ width: "1px", height: "20px", background: `linear-gradient(${n.color}, ${nodes[i+1].color})` }} />
              <div style={{ color: C.text3, fontSize: "16px", lineHeight: 1 }}>↓</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Home() {
  const typeText = useTypewriter(TYPEWRITER_LINES);
  useScrollReveal();

  const W = "max(24px, calc((100% - 1040px)/2))";

  const sec = (id: string, children: React.ReactNode, noBorder = false) => (
    <section id={id} style={{
      padding: "100px max(24px, calc((100% - 1040px)/2))",
      borderTop: noBorder ? "none" : `1px solid ${C.border}`,
    }}>
      {children}
    </section>
  );

  return (
    <>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .sr{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease;}
        .sr-visible{opacity:1;transform:translateY(0);}
      `}</style>

      <Nav />

      {/* ── Hero ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: `120px ${W} 80px`,
      }}>
        <div style={{ maxWidth: "700px" }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "12px",
            color: C.gold, letterSpacing: "0.1em", marginBottom: "24px",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: C.gold }} />
            AI PRODUCT MANAGER
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display',serif", fontWeight: 400,
            fontSize: "clamp(44px,7vw,72px)", lineHeight: 1.05,
            letterSpacing: "-0.02em", marginBottom: "28px",
          }}>
            Building AI systems<br />
            that <em style={{ fontStyle: "italic", color: C.gold }}>govern themselves.</em>
          </h1>

          <p style={{ fontSize: "17px", color: C.text2, lineHeight: 1.75, maxWidth: "540px", marginBottom: "16px" }}>
            AI Product Manager with 6+ years shipping LLMs, RAG pipelines, and multi-agent systems in regulated environments. Reduced analyst report time by 50%, scaled compliance monitoring from 1% to 100% of transactions, and eliminated $1M+ in annual software spend at Capital One supporting 800+ users.
          </p>

          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "13px",
            color: C.text3, marginBottom: "48px", minHeight: "22px",
          }}>
            {typeText}
            <span style={{
              display: "inline-block", width: "2px", height: "14px",
              background: C.green, marginLeft: "2px", verticalAlign: "middle",
              animation: "blink 1s infinite",
            }} />
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#projects" style={{
              padding: "12px 26px", background: C.gold, color: C.bg,
              borderRadius: "6px", fontSize: "14px", fontWeight: 600,
              textDecoration: "none", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity="0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity="1")}
            >View Projects</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 26px", background: "transparent", color: C.text2,
              border: `1px solid ${C.borderHi}`, borderRadius: "6px",
              fontSize: "14px", fontWeight: 500, textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor=C.text3; }}
            onMouseLeave={e => { e.currentTarget.style.color=C.text2; e.currentTarget.style.borderColor=C.borderHi; }}
            >Resume ↓</a>
            <a href="https://www.linkedin.com/in/rahulreddypuchakayala/" target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 26px", background: "transparent", color: C.text2,
              border: `1px solid ${C.borderHi}`, borderRadius: "6px",
              fontSize: "14px", fontWeight: 500, textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor=C.text3; }}
            onMouseLeave={e => { e.currentTarget.style.color=C.text2; e.currentTarget.style.borderColor=C.borderHi; }}
            >LinkedIn ↗</a>
            <a href="https://github.com/rahulreddyutd" target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 26px", background: "transparent", color: C.text2,
              border: `1px solid ${C.borderHi}`, borderRadius: "6px",
              fontSize: "14px", fontWeight: 500, textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor=C.text3; }}
            onMouseLeave={e => { e.currentTarget.style.color=C.text2; e.currentTarget.style.borderColor=C.borderHi; }}
            >GitHub ↗</a>
          </div>

          {/* Credibility strip */}
          <div style={{
            marginTop: "56px", paddingTop: "32px",
            borderTop: `1px solid ${C.border}`,
            display: "flex", gap: "0", flexWrap: "wrap", alignItems: "center",
          }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: C.text3, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "20px" }}>Experience</span>
            {[
              "Capital One",
              "Optum (UnitedHealth Group)",
              "Accenture",
            ].map((item, i, arr) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: "0" }}>
                <span style={{ fontSize: "13px", color: C.text2, fontWeight: 500 }}>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ margin: "0 14px", color: C.text3, fontSize: "12px" }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      {sec("impact", (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
          {[
            { n: "800+", l: "Internal developer users on enterprise AI platform" },
            { n: "80+",  l: "AI use cases in production across Lines of Business" },
            { n: "$1M+", l: "Annual third-party software spend eliminated" },
            { n: "6 yrs", l: "Building AI products across fintech and healthcare" },
          ].map(({ n, l }, i) => (
            <div key={n} style={{
              background: C.card, border: `1px solid ${C.border}`,
              padding: "32px 24px",
              borderRadius: i===0 ? "8px 0 0 8px" : i===3 ? "0 8px 8px 0" : "0",
            }}>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "42px", color: C.gold, lineHeight: 1, marginBottom: "8px" }}>{n}</div>
              <div style={{ fontSize: "13px", color: C.text2, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      ))}

      {/* ── Projects ── */}
      {sec("projects", (
        <>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "11px",
            letterSpacing: "0.12em", color: C.gold, textTransform: "uppercase",
            marginBottom: "16px",
          }}>AI Portfolio</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 400, color: C.text, lineHeight: 1.1 }}>
              Three products.<br /><em style={{ fontStyle:"italic", color: C.gold }}>Three decision problems.</em>
            </h2>
            <p style={{ fontSize: "14px", color: C.text2, maxWidth: "320px", textAlign: "right", lineHeight: 1.6 }}>
              RegulatedAI → Trustworthy Decisions<br />
              ExecutiveAI → Executive Decisions<br />
              ProductOS → Product Decisions
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            {PROJECTS.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </>
      ))}

      {/* ── Philosophy ── */}
      {sec("philosophy", (
        <>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"16px" }}>Philosophy</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,4vw,44px)", fontWeight:400, color:C.text, marginBottom:"48px", lineHeight:1.1 }}>
            What makes great<br /><em style={{fontStyle:"italic", color:C.gold}}>AI products?</em>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {[
              { icon:"⚖", title:"Trust", color: C.blue, body:"AI must be governable. Compliance is not a feature added after the agent works it is an architectural constraint that shapes every design decision from the start." },
              { icon:"🧭", title:"Decisions", color: C.gold, body:"AI should improve decisions, not just automate tasks. The measure is not speed or throughput it is whether the human at the end makes a better call than they would have without it." },
              { icon:"📐", title:"Evaluation", color: C.green, body:"AI products need measurable quality. Hallucination rate, compliance pass rate, retrieval precision if you cannot measure it, you cannot improve it and you cannot defend it in a board meeting." },
            ].map(({ icon, title, color, body }) => (
              <div key={title} className="sr" style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: "12px", padding: "32px 28px",
                borderTop: `3px solid ${color}`,
              }}>
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{icon}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"22px", color, marginBottom:"14px" }}>{title}</div>
                <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* ── Why I Build ── */}
      {sec("why", (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"16px" }}>Why I Build AI Products</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:400, color:C.text, marginBottom:"28px", lineHeight:1.1 }}>
              The work that<br /><em style={{fontStyle:"italic", color:C.gold}}>shaped this.</em>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
              <div style={{ borderLeft:`2px solid ${C.gold}`, paddingLeft:"20px" }}>
                <div style={{ fontSize:"13px", fontWeight:600, color:C.text, marginBottom:"8px" }}>Capital One</div>
                <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>
                  Leading AI platforms at Capital One taught me that enterprise AI fails not because the models are wrong, but because the governance structures were not designed for how AI actually behaves. I shipped a VectorDB platform, an LLM fine-tuning service, and human-in-the-loop compliance workflows and the hardest problems were never the models. They were the organizational trust, the audit requirements, and the edge cases no one anticipated.
                </p>
              </div>
              <div style={{ borderLeft:`2px solid ${C.gold}`, paddingLeft:"20px" }}>
                <div style={{ fontSize:"13px", fontWeight:600, color:C.text, marginBottom:"8px" }}>Optum</div>
                <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>
                  At Optum I rebuilt anomaly detection for a platform serving 5,000 healthcare engineers. The original system had high recall and near-zero adoption engineers ignored it because they could not tell which alerts mattered. I added severity ranking and confidence scoring. Adoption went from near-zero to 60% in six weeks. That experience is why I believe explainability is not a feature. It is the entire product.
                </p>
              </div>
              <div style={{ borderLeft:`2px solid ${C.gold}`, paddingLeft:"20px" }}>
                <div style={{ fontSize:"13px", fontWeight:600, color:C.text, marginBottom:"8px" }}>What I am trying to build</div>
                <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75 }}>
                  AI systems that improve decisions, not just generate answers. The three projects in this portfolio are my attempt to demonstrate what that looks like in practice in regulated financial advice, in executive decision-making, and in product strategy. All three share the same architectural principle: governance enforced by structure, not by process.
                </p>
              </div>
            </div>
          </div>
          <div style={{ paddingTop:"48px" }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"28px", marginBottom:"16px" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", color:C.text3, letterSpacing:"0.1em", marginBottom:"12px" }}>CORE BELIEF</div>
              <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:"22px", color:C.text, lineHeight:1.45 }}>
                &ldquo;In high-stakes domains, explainability is not a feature. It is the entire product.&rdquo;
              </p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
              {[
                { n:"5,000+", l:"Healthcare users, Optum" },
                { n:"800+", l:"AI platform users, Capital One" },
                { n:"60%", l:"Adoption in 6 weeks" },
                { n:"$1M+", l:"Software spend eliminated" },
              ].map(({ n, l }) => (
                <div key={n} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:"8px", padding:"16px" }}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"26px", color:C.gold, lineHeight:1, marginBottom:"4px" }}>{n}</div>
                  <div style={{ fontSize:"11px", color:C.text3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── Architecture ── */}
      {sec("architecture", (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"16px" }}>Architecture</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:400, color:C.text, marginBottom:"20px", lineHeight:1.1 }}>
              The pattern behind<br /><em style={{fontStyle:"italic", color:C.gold}}>every project.</em>
            </h2>
            <p style={{ fontSize:"14px", color:C.text2, lineHeight:1.75, marginBottom:"28px" }}>
              Every product I build follows the same principle: governance is structural, not procedural. The agent pipeline cannot produce an output that bypasses evaluation and governance. That is not a compliance checkbox it is an architectural invariant.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {["LangGraph","Claude","GPT-4","RAG","LLM Evaluation","Human-in-the-Loop","RICE","FINRA","Reg BI"].map(t => (
                <span key={t} style={{
                  fontFamily:"'JetBrains Mono',monospace", fontSize:"11px",
                  padding:"4px 10px", borderRadius:"4px",
                  background: C.goldGlow, border:`1px solid ${C.goldDim}`,
                  color:C.text3,
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="sr"><ArchDiagram /></div>
        </div>
      ))}

      {/* ── Experience ── */}
      {sec("experience", (
        <>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"48px" }}>Experience</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
            {[
              {
                co:"Capital One", period:"Jan 2025 – Present",
                role:"Product Manager, AI/ML Products",
                tagline:"Building AI-powered banking platforms reducing analyst report time by 50% and scaling compliance monitoring from 1% to 100% of transactions.",
                bullets:[
                  "Enterprise AI platforms supporting <strong>800+ developers</strong> across 80+ use cases, achieving 89% deployment coverage",
                  "Zero-touch <strong>VectorDB platform</strong> enabling instant RAG deployment, eliminating manual provisioning friction",
                  "Human-in-the-loop validation scaling compliance monitoring from <strong>1% to 100%</strong> of transactions",
                  "<strong>$1M+</strong> in annual third-party software spend eliminated through internally built tools",
                ],
              },
              {
                co:"Optum (UnitedHealth Group)", period:"Aug 2021 – May 2024",
                role:"Product Manager",
                tagline:"Led product strategy for a 5,000+ user healthcare engineering platform, driving adoption from near-zero to 60% in six weeks.",
                bullets:[
                  "<strong>Scale Test Copilot</strong> serving 5,000+ users, reducing testing cycle times by 30%",
                  "Redesigned anomaly prioritization with confidence scoring, adoption from <strong>near-zero to 60%</strong> in six weeks",
                  "Product analytics frameworks tracking 10+ KPIs, improving decision-making speed by 25%",
                ],
              },
              {
                co:"Accenture", period:"Jan 2019 – Jul 2021",
                role:"Data Engineer",
                tagline:"Built enterprise-scale data systems using Kafka and Spark, processing hundreds of millions of records across structured and unstructured sources.",
                bullets:[
                  "Cross-source data integration using <strong>Kafka, Spark, and Hive</strong>, reducing integration times by 30%",
                  "ETL pipelines processing <strong>hundreds of millions of records</strong> with SLA compliance",
                ],
              },
            ].map(({ co, period, role, tagline, bullets }) => (
              <div key={co} className="sr" style={{
                display:"grid", gridTemplateColumns:"200px 1fr",
                gap:"48px", padding:"40px 0",
                borderBottom:`1px solid ${C.border}`,
              }}>
                <div style={{ paddingTop:"4px" }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:C.text, marginBottom:"6px" }}>{co}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.text3, letterSpacing:"0.04em" }}>{period}</div>
                </div>
                <div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"20px", color:C.text, marginBottom:"8px", lineHeight:1.3 }}>{role}</div>
                  <p style={{ fontSize:"13px", color:C.gold, marginBottom:"16px", lineHeight:1.5, fontStyle:"italic" }}>{tagline}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {bullets.map((b, i) => (
                      <li key={i} style={{ fontSize:"14px", color:C.text2, paddingLeft:"18px", position:"relative", lineHeight:1.65 }}>
                        <span style={{ position:"absolute", left:0, color:C.text3, fontSize:"12px" }}> </span>
                        <span dangerouslySetInnerHTML={{ __html: b.replace(/<strong>/g,`<strong style="color:${C.text};font-weight:500">`).replace(/<\/strong>/g,"</strong>") }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* ── Contact ── */}
      {sec("contact", (
        <div style={{ maxWidth:"600px" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"0.12em", color:C.gold, textTransform:"uppercase", marginBottom:"24px" }}>Get in touch</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,52px)", fontWeight:400, color:C.text, marginBottom:"20px", lineHeight:1.1 }}>
            Let&apos;s build something<br /><em style={{fontStyle:"italic", color:C.gold}}>that governs itself.</em>
          </h2>
          <p style={{ fontSize:"15px", color:C.text2, lineHeight:1.75, marginBottom:"36px" }}>
            Open to Senior AI PM roles at companies building AI products in fintech, healthtech, and enterprise SaaS. Currently at Capital One selectively evaluating the right next step.
          </p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href="https://www.linkedin.com/in/rahulreddypuchakayala/" target="_blank" rel="noopener noreferrer" style={{
              padding:"12px 24px", background:C.gold, color:C.bg,
              borderRadius:"6px", fontSize:"14px", fontWeight:600,
              textDecoration:"none", transition:"opacity 0.15s",
            }}
            onMouseEnter={e=>(e.currentTarget.style.opacity="0.85")}
            onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
            >LinkedIn ↗</a>
            <a href="mailto:rahulreddypuch@gmail.com" style={{
              padding:"12px 24px", background:"transparent", color:C.text2,
              border:`1px solid ${C.borderHi}`, borderRadius:"6px",
              fontSize:"14px", fontWeight:500, textDecoration:"none", transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.text3;}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.text2;e.currentTarget.style.borderColor=C.borderHi;}}
            >rahulreddypuch@gmail.com</a>
            <a href="https://github.com/rahulreddyutd" target="_blank" rel="noopener noreferrer" style={{
              padding:"12px 24px", background:"transparent", color:C.text2,
              border:`1px solid ${C.borderHi}`, borderRadius:"6px",
              fontSize:"14px", fontWeight:500, textDecoration:"none", transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.text3;}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.text2;e.currentTarget.style.borderColor=C.borderHi;}}
            >GitHub ↗</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              padding:"12px 24px", background:"transparent", color:C.text2,
              border:`1px solid ${C.borderHi}`, borderRadius:"6px",
              fontSize:"14px", fontWeight:500, textDecoration:"none", transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.text3;}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.text2;e.currentTarget.style.borderColor=C.borderHi;}}
            >Resume ↓</a>
          </div>
        </div>
      ))}

      {/* Footer */}
      <footer style={{
        borderTop:`1px solid ${C.border}`, padding:"28px 24px",
        textAlign:"center",
        fontFamily:"'JetBrains Mono',monospace", fontSize:"11px",
        color:C.text3, letterSpacing:"0.04em",
      }}>
        Rahul Reddy Puchakayala &nbsp;·&nbsp; AI Product Manager &nbsp;·&nbsp; Capital One &nbsp;·&nbsp; UT Dallas MS &apos;26
      </footer>
    </>
  );
}
