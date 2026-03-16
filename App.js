import React, { useState } from "react";

const DEFAULT_WEIGHTS = { flexibility: 30, income: 30, upside: 20, geo: 10, jack: 10 };

const initialCOAs = [
  {
    id: 1, category: "Work · Part-Time", name: "Coronado Sim Instructor",
    status: "Offer in Hand", geo: "Coronado / SD",
    flexScore: 5, incomeScore: 3, upsideScore: 2, geoScore: 5, jackScore: 5,
    incomeNote: "~$80–100/hr est.", flexNote: "High schedule control",
    upsideNote: "Low ceiling — niche role", geoNote: "NAS North Island",
    jackNote: "SAN stays primary — easy pickup trips",
    notes: "Bridge job secured Aug 1. Primary financial buffer while bigger decision resolves. Pairs best with EMBA or a part-time remote role. Not a long-term standalone. Conflicts with OC and FL moves due to commute.",
    synergies: [4, 9, 10, 12], conflicts: [6, 13, 14, 15, 16],
  },
  {
    id: 2, category: "Work · Part-Time", name: "Real Estate Professional Status (REPS)",
    status: "Exploratory", geo: "Anywhere",
    flexScore: 4, incomeScore: 2, upsideScore: 4, geoScore: 5, jackScore: 5,
    incomeNote: "Variable — 1–2 yr ramp", flexNote: "Self-directed",
    upsideNote: "Major W-2 tax offset potential", geoNote: "No constraint",
    jackNote: "No geographic impact",
    notes: "750+ hrs/yr material participation required. Not an income play near-term — a powerful tax play against Jack's W-2. Best layered on top of another COA. Synergizes with FL move (no state income tax + P&T property tax exemption creates ideal REPS scenario).",
    synergies: [1, 14, 15, 16], conflicts: [],
  },
  {
    id: 3, category: "Work · Part-Time", name: "Work with Max & Morgan",
    status: "Exploratory", geo: "TBD",
    flexScore: 3, incomeScore: 3, upsideScore: 4, geoScore: 3, jackScore: 3,
    incomeNote: "Unknown — structure TBD", flexNote: "Depends on arrangement",
    upsideNote: "Relationship-driven upside", geoNote: "TBD",
    jackNote: "TBD",
    notes: "Needs a dedicated conversation before meaningful scoring. Key unknowns: comp structure, time commitment, location, and what role Nikki actually fills. Flag for follow-up.",
    synergies: [], conflicts: [],
  },
  {
    id: 4, category: "Work · Part-Time", name: "Shift 5",
    status: "Exploratory", geo: "Remote-friendly",
    flexScore: 3, incomeScore: 4, upsideScore: 4, geoScore: 4, jackScore: 4,
    incomeNote: "$120–160k+ likely", flexNote: "Startup culture — mixed",
    upsideNote: "Equity if early stage", geoNote: "Remote-friendly",
    jackNote: "Remote = no geographic drag",
    notes: "Avionics/data focus — naval aviation background directly relevant. Part-time would need explicit negotiation. Remote-friendly means it survives most geographic COAs. Worth an exploratory call soon.",
    synergies: [1, 9, 10], conflicts: [],
  },
  {
    id: 5, category: "Work · Full-Time", name: "SD Defense Tech (Shield AI, etc.)",
    status: "Exploratory", geo: "San Diego",
    flexScore: 2, incomeScore: 4, upsideScore: 5, geoScore: 5, jackScore: 5,
    incomeNote: "$130–180k+ base + equity", flexNote: "Startup hours — demanding",
    upsideNote: "High — equity in growth-stage co.", geoNote: "Stay in SD",
    jackNote: "SAN stays primary",
    notes: "Shield AI, Joby, Palantir SD, others. Pilot + highly-ranked officer profile is very attractive to these companies. Full-time = flexibility tradeoff. Conflicts with any grad school — cannot do both.",
    synergies: [11, 12], conflicts: [7, 8, 9, 10],
  },
  {
    id: 6, category: "Work · Full-Time", name: "OC Defense Tech (Anduril, etc.)",
    status: "Exploratory", geo: "Orange County",
    flexScore: 2, incomeScore: 5, upsideScore: 5, geoScore: 3, jackScore: 3,
    incomeNote: "$150–200k+ base + equity", flexNote: "Startup pace — demanding",
    upsideNote: "Very high — Anduril pre-IPO", geoNote: "OC move required",
    jackNote: "Closer to LAX, loses SAN pickup trips",
    notes: "Anduril is the tier-1 target. Pre-IPO equity is meaningful. OC move is required — makes sim commute untenable. Conflicts with all grad school. Jack base shifts toward LAX which improves his commute, but loses SAN trip pickup flexibility.",
    synergies: [13], conflicts: [1, 7, 8, 9, 10],
  },
  {
    id: 7, category: "School · Full-Time", name: "Stanford GSB (Full-Time MBA)",
    status: "Exploratory", geo: "Palo Alto / Bay Area",
    flexScore: 3, incomeScore: 1, upsideScore: 5, geoScore: 3, jackScore: 5,
    incomeNote: "Net negative 2 yrs — GI Bill offsets significantly", flexNote: "Student schedule — flexible but structured",
    upsideNote: "Highest brand ceiling", geoNote: "Requires Bay Area relocation",
    jackNote: "Switch to SFO base — commute actually improves",
    notes: "Biggest brand, biggest opportunity cost, biggest upside. GI Bill covers significant cost. Full-time = no full-time job alongside. Jack switches to SFO base — his commute legitimately improves. Cannot combine with any other school track or full-time work.",
    synergies: [], conflicts: [5, 6, 8, 9, 10],
  },
  {
    id: 8, category: "School · Full-Time", name: "Booth (Full-Time MBA)",
    status: "Exploratory", geo: "Chicago",
    flexScore: 3, incomeScore: 1, upsideScore: 5, geoScore: 2, jackScore: 4,
    incomeNote: "Net negative 2 yrs", flexNote: "Student schedule",
    upsideNote: "Top-3 MBA — finance/consulting powerhouse", geoNote: "Chicago move required — far from SoCal network",
    jackNote: "Switch to ORD base — operationally viable",
    notes: "Exceptional school. Jack switches to ORD — works operationally. No CA or IL state income tax (IL flat ~4.95% — still better than CA). Less SoCal network vs Stanford/UCLA. Full-time = no full-time work. Cannot combine with other school tracks.",
    synergies: [], conflicts: [5, 6, 7, 9, 10],
  },
  {
    id: 9, category: "School · Part-Time", name: "UCLA Anderson EMBA",
    status: "Applied — Decision Pending", geo: "Los Angeles",
    flexScore: 4, incomeScore: 3, upsideScore: 4, geoScore: 4, jackScore: 3,
    incomeNote: "Maintain income source alongside", flexNote: "Weekend cohort — manageable",
    upsideNote: "Strong SoCal brand + network", geoNote: "SoCal — LA-adjacent",
    jackNote: "Shifts toward LAX — SAN pickup harder",
    notes: "Best flexibility/brand combo in SoCal. Can run alongside sim job or a part-time role. GI Bill applies. Decision pending — likely admitted. Conflicts with any full-time job. Compare format and schedule vs Michigan side by side when decisions arrive.",
    synergies: [1, 4], conflicts: [5, 6, 7, 8, 10],
  },
  {
    id: 10, category: "School · Part-Time", name: "Michigan Ross EMBA",
    status: "Applied — Decision Pending", geo: "Ann Arbor / Hybrid",
    flexScore: 4, incomeScore: 3, upsideScore: 4, geoScore: 2, jackScore: 3,
    incomeNote: "Maintain income source alongside", flexNote: "Hybrid — some Ann Arbor residency",
    upsideNote: "Top EMBA — strong ops/strategy network", geoNote: "Hybrid — periodic Michigan travel",
    jackNote: "Some AA trips but base stays flexible",
    notes: "Strong national brand. No full relocation required — hybrid format with AA residency stints. Compare cohort quality, cost, and format vs UCLA side by side. Michigan network is national vs UCLA's SoCal strength.",
    synergies: [1, 4], conflicts: [5, 6, 7, 8, 9],
  },
  {
    id: 11, category: "Geography", name: "Stay in San Diego (92115)",
    status: "Current", geo: "San Diego",
    flexScore: 4, incomeScore: 3, upsideScore: 3, geoScore: 5, jackScore: 5,
    incomeNote: "CA tax: ~9.3–10.3% state drag", flexNote: "Known city — no transition cost",
    upsideNote: "Strong defense/tech market", geoNote: "Home base",
    jackNote: "SAN primary — max pickup trip flexibility",
    notes: "Baseline. Highest geo comfort, lowest transition friction. CA tax drag is real — roughly $15–25k/yr more than Florida at current income. 2.25% mortgage stays as rental asset if you ever leave. Best paired with SD defense tech or EMBA tracks.",
    synergies: [1, 2, 5, 12], conflicts: [],
  },
  {
    id: 12, category: "Geography", name: "Coronado / North County SD",
    status: "Exploratory", geo: "Coronado / Encinitas / Carlsbad",
    flexScore: 4, incomeScore: 3, upsideScore: 3, geoScore: 5, jackScore: 5,
    incomeNote: "CA tax still applies", flexNote: "Quality of life upgrade",
    upsideNote: "Same SD market access", geoNote: "NAS proximity — sim job ideal",
    jackNote: "SAN remains easy",
    notes: "Natural upgrade if sim job continues long-term. Coronado is expensive but perfectly positioned for NAS North Island. North County (Encinitas, Carlsbad) more affordable, still easy SAN/commute access. Still CA taxes.",
    synergies: [1, 2, 11], conflicts: [],
  },
  {
    id: 13, category: "Geography", name: "Orange County",
    status: "Exploratory", geo: "Orange County",
    flexScore: 3, incomeScore: 4, upsideScore: 4, geoScore: 4, jackScore: 3,
    incomeNote: "CA tax still applies", flexNote: "New city — transition cost",
    upsideNote: "Anduril + defense tech ecosystem", geoNote: "SoCal — strong quality of life",
    jackNote: "LAX improves, SAN pickup trips harder",
    notes: "Only makes sense if OC defense tech is the work COA. Coronado sim commute is untenable from OC — that conflict is real. Jack base shifts toward LAX which actually helps his commute. CA taxes remain the drag.",
    synergies: [6], conflicts: [1],
  },
  {
    id: 14, category: "Geography", name: "Jacksonville, FL",
    status: "Exploratory", geo: "Jacksonville, FL",
    flexScore: 3, incomeScore: 5, upsideScore: 3, geoScore: 2, jackScore: 2,
    incomeNote: "No FL income tax + $0 property tax (Jack P&T)", flexNote: "New city — build from scratch",
    upsideNote: "NAS Jax sim gig possible", geoNote: "Far from SoCal network",
    jackNote: "JIA → LAX commute is the hardest FL option",
    notes: "Strongest financial COA: no FL state income tax (~$15–25k/yr savings), Jack's P&T = full FL homestead property tax exemption. Rent SD home (positive cash flow at 2.25%) + rent in FL first then buy = dual-asset position. NAS Jax could open a sim gig. Jack commute is the real friction — JIA to LAX is a grind.",
    synergies: [2], conflicts: [1, 5, 6, 9],
  },
  {
    id: 15, category: "Geography", name: "Tampa / St. Pete, FL",
    status: "Exploratory", geo: "Tampa / St. Pete, FL",
    flexScore: 3, incomeScore: 5, upsideScore: 4, geoScore: 3, jackScore: 5,
    incomeNote: "No FL income tax + $0 property tax (Jack P&T)", flexNote: "New city — vibrant, growing",
    upsideNote: "MacDill AFB contractor angle — SOCOM/CENTCOM/SOUTHCOM", geoNote: "Great lifestyle, far from SoCal",
    jackNote: "TPA-MCO co-base — home airport options + LAX commute solved",
    notes: "Same FL tax advantages as Jax but Jack's ops actually work cleanly here — TPA-MCO co-base means two home airport options, solid LAX direct service from both, and genuine scheduling flexibility. Best FL option for Jack operationally. MacDill = SOCOM, CENTCOM, SOUTHCOM — aviation/acquisitions background fits contractor work. Rent SD + rent FL first then buy = strong dual-asset play.",
    synergies: [2], conflicts: [1, 9],
  },
  {
    id: 16, category: "Geography", name: "Space Coast, FL",
    status: "Exploratory", geo: "Brevard County / Melbourne, FL",
    flexScore: 3, incomeScore: 5, upsideScore: 4, geoScore: 2, jackScore: 2,
    incomeNote: "No FL income tax + $0 property tax (Jack P&T)", flexNote: "Smaller market — fewer options",
    upsideNote: "L3Harris, SpaceX, Patrick SFB ecosystem", geoNote: "Remote feel — smaller city",
    jackNote: "Melbourne/Orlando → LAX is longest FL commute",
    notes: "FL tax benefits apply. L3Harris HQ, SpaceX, Patrick SFB = real aerospace/defense market — aviation background fits. Lifestyle is smaller city vs Tampa. Jack commute is the hardest of all FL options. Worth exploring only if a specific employer drives it.",
    synergies: [2], conflicts: [1, 9],
  },
];

const scoreColor = (s) => {
  if (s >= 4.5) return "#4ade80";
  if (s >= 3.5) return "#a3e635";
  if (s >= 2.5) return "#fbbf24";
  if (s >= 1.5) return "#fb923c";
  return "#f87171";
};

const weighted = (coa, w) => {
  const total = Object.values(w).reduce((a, b) => a + b, 0) || 100;
  return (coa.flexScore * w.flexibility + coa.incomeScore * w.income + coa.upsideScore * w.upside + coa.geoScore * w.geo + coa.jackScore * w.jack) / total;
};

const STATUS_DOT = { "Offer in Hand": "#4ade80", "Applied — Decision Pending": "#fbbf24", "Current": "#60a5fa", "Exploratory": "#475569" };
const CATEGORIES = ["All", "Work · Part-Time", "Work · Full-Time", "School · Full-Time", "School · Part-Time", "Geography"];

const ScoreBar = ({ value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ flex: 1, height: 5, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${(value / 5) * 100}%`, height: "100%", background: scoreColor(value), borderRadius: 3 }} />
    </div>
    <span style={{ fontSize: 11, fontWeight: 700, color: scoreColor(value), minWidth: 14, fontFamily: "monospace" }}>{value}</span>
  </div>
);

function COAMatrix() {
  const [coas, setCoas] = useState(initialCOAs);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [catFilter, setCatFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [showWeights, setShowWeights] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const displayed = coas
    .filter(c => catFilter === "All" || c.category === catFilter)
    .map(c => ({ ...c, composite: weighted(c, weights) }))
    .sort((a, b) => b.composite - a.composite);

  const updateScore = (id, field, delta) =>
    setCoas(prev => prev.map(c => c.id === id ? { ...c, [field]: Math.min(5, Math.max(1, c[field] + delta)) } : c));

  const saveNote = () => { setCoas(prev => prev.map(c => c.id === editingId ? { ...c, notes: editText } : c)); setEditingId(null); };
  const totalW = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#070c14", minHeight: "100vh", color: "#cbd5e1" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #0f2040 100%)", borderBottom: "1px solid #1e3a5f", padding: "36px 40px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 10 }}>NIKKI · POST-MILITARY TRANSITION · SEP OUT JULY 31 2026</div>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 400, letterSpacing: "-0.02em", color: "#f1f5f9" }}>COA Decision Matrix</h1>
              <p style={{ margin: "8px 0 0", color: "#475569", fontSize: 13 }}>Work · School · Geography — scored against your priorities · click any row to expand</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["Bridge Job", "Secured Aug 1 ✓", "#4ade80"], ["UCLA / Ross EMBA", "Decision Pending ⏳", "#fbbf24"], ["Nikki VA Claim", "⚠ NOT YET FILED", "#f87171"]].map(([label, value, color]) => (
                <div key={label} style={{ background: "#0a0f1a", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px 16px" }}>
                  <div style={{ fontSize: 9, color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</div>
                  <div style={{ fontSize: 12, color, fontWeight: 700, marginTop: 3 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 60px" }}>
        {/* FL CALLOUT */}
        <div style={{ background: "linear-gradient(135deg, #0a1f14, #0a1a2e)", border: "1px solid #1a4a30", borderRadius: 10, padding: "16px 24px", marginBottom: 24, display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#4ade80", textTransform: "uppercase", fontFamily: "monospace" }}>🏦 Florida Financial Edge</div>
          {[["CA State Tax Saved", "~$15–25k/yr"], ["FL Property Tax (Jack P&T)", "$0 — full exemption"], ["SD Home (2.25%)", "Rent out → cash flow positive"], ["Strategy", "Rent FL first → then buy"]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 9, color: "#334155", fontFamily: "monospace" }}>{k}</div>
              <div style={{ fontSize: 14, color: "#4ade80", fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCatFilter(cat)} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid", fontSize: 11, cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.05em", background: catFilter === cat ? "#3b82f6" : "transparent", borderColor: catFilter === cat ? "#3b82f6" : "#1e3a5f", color: catFilter === cat ? "#fff" : "#475569" }}>{cat}</button>
          ))}
          <button onClick={() => setShowWeights(!showWeights)} style={{ marginLeft: "auto", padding: "5px 14px", borderRadius: 20, border: `1px solid ${totalW === 100 ? "#1e3a5f" : "#f87171"}`, fontSize: 11, cursor: "pointer", fontFamily: "monospace", background: "transparent", color: totalW === 100 ? "#475569" : "#f87171" }}>
            ⚖ Weights {totalW !== 100 && `(${totalW}% — needs 100)`}
          </button>
        </div>

        {/* WEIGHT PANEL */}
        {showWeights && (
          <div style={{ background: "#0d1625", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 16 }}>SCORING WEIGHTS · MUST TOTAL 100%</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
              {[["flexibility", "Flexibility"], ["income", "Income"], ["upside", "Upside"], ["geo", "Geography (SoCal)"], ["jack", "Jack's Ops"]].map(([key, label]) => (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{label}</span>
                    <span style={{ fontSize: 11, color: "#3b82f6", fontFamily: "monospace" }}>{weights[key]}%</span>
                  </div>
                  <input type="range" min={0} max={60} value={weights[key]} onChange={e => setWeights(p => ({ ...p, [key]: parseInt(e.target.value) }))} style={{ width: "100%", accentColor: "#3b82f6" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABLE HEADER */}
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr 80px", background: "#0d1625", padding: "10px 20px", borderRadius: "10px 10px 0 0", border: "1px solid #1e3a5f", borderBottom: "none" }}>
          {["COA / Option", "Flexibility", "Income", "Upside", "Geography", "Jack's Ops", "Score"].map(h => (
            <div key={h} style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#334155", fontFamily: "monospace" }}>{h}</div>
          ))}
        </div>

        {/* ROWS */}
        <div style={{ border: "1px solid #1e3a5f", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          {displayed.map((coa, idx) => {
            const isOpen = expanded === coa.id;
            const synergyNames = coa.synergies.map(id => initialCOAs.find(c => c.id === id)?.name).filter(Boolean);
            const conflictNames = coa.conflicts.map(id => initialCOAs.find(c => c.id === id)?.name).filter(Boolean);
            return (
              <div key={coa.id} style={{ borderBottom: idx < displayed.length - 1 ? "1px solid #111c2d" : "none" }}>
                <div onClick={() => setExpanded(isOpen ? null : coa.id)}
                  style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "14px 20px", cursor: "pointer", background: isOpen ? "#0f1f38" : idx % 2 === 0 ? "#090e18" : "#070c14", transition: "background 0.1s" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 9, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, background: "#111c2d", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>{coa.category}</span>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATUS_DOT[coa.status] || "#475569", flexShrink: 0 }} />
                      <span style={{ fontSize: 9, color: STATUS_DOT[coa.status] || "#475569", fontFamily: "monospace" }}>{coa.status}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{coa.name}</div>
                    <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>📍 {coa.geo}</div>
                  </div>
                  {[[coa.flexScore, coa.flexNote], [coa.incomeScore, coa.incomeNote], [coa.upsideScore, coa.upsideNote], [coa.geoScore, coa.geoNote], [coa.jackScore, coa.jackNote]].map(([score, note], i) => (
                    <div key={i} style={{ paddingRight: 10 }}>
                      <ScoreBar value={score} />
                      {note && <div style={{ fontSize: 10, color: "#334155", marginTop: 3, lineHeight: 1.4 }}>{note}</div>}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 2 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: scoreColor(coa.composite), fontFamily: "monospace", lineHeight: 1 }}>{coa.composite.toFixed(1)}</span>
                    <span style={{ fontSize: 10, color: "#334155", marginTop: 7, marginLeft: 2 }}>/5</span>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ background: "#0b1628", borderTop: "1px solid #1e3a5f", padding: "20px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#3b82f6", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Analysis & Notes</div>
                        {editingId === coa.id ? (
                          <div>
                            <textarea value={editText} onChange={e => setEditText(e.target.value)} style={{ width: "100%", minHeight: 90, background: "#1e293b", border: "1px solid #3b82f6", borderRadius: 8, padding: 12, color: "#e2e8f0", fontSize: 13, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box" }} />
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button onClick={saveNote} style={{ padding: "5px 14px", background: "#3b82f6", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}>Save</button>
                              <button onClick={() => setEditingId(null)} style={{ padding: "5px 14px", background: "transparent", border: "1px solid #1e3a5f", borderRadius: 6, color: "#475569", cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>{coa.notes}</p>
                            <button onClick={() => { setEditingId(coa.id); setEditText(coa.notes); }} style={{ marginTop: 10, padding: "3px 12px", background: "transparent", border: "1px solid #1e3a5f", borderRadius: 6, color: "#475569", cursor: "pointer", fontSize: 10, fontFamily: "monospace" }}>✏ Edit notes</button>
                          </div>
                        )}
                        {(synergyNames.length > 0 || conflictNames.length > 0) && (
                          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 5 }}>
                            {synergyNames.length > 0 && <div style={{ fontSize: 11 }}><span style={{ color: "#4ade80" }}>✓ Synergies: </span><span style={{ color: "#475569" }}>{synergyNames.join(" · ")}</span></div>}
                            {conflictNames.length > 0 && <div style={{ fontSize: 11 }}><span style={{ color: "#f87171" }}>✗ Conflicts: </span><span style={{ color: "#475569" }}>{conflictNames.join(" · ")}</span></div>}
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#3b82f6", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>Adjust Scores</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          {[["Flexibility", "flexScore"], ["Income", "incomeScore"], ["Upside", "upsideScore"], ["Geography", "geoScore"], ["Jack's Ops", "jackScore"]].map(([label, field]) => (
                            <div key={field} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0d1625", borderRadius: 8, padding: "8px 12px" }}>
                              <span style={{ fontSize: 11, color: "#475569" }}>{label}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <button onClick={(e) => { e.stopPropagation(); updateScore(coa.id, field, -1); }} style={{ width: 20, height: 20, background: "#1e293b", border: "none", borderRadius: 4, color: "#94a3b8", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                                <span style={{ color: scoreColor(coa[field]), fontWeight: 700, fontFamily: "monospace", minWidth: 14, textAlign: "center" }}>{coa[field]}</span>
                                <button onClick={(e) => { e.stopPropagation(); updateScore(coa.id, field, 1); }} style={{ width: 20, height: 20, background: "#1e293b", border: "none", borderRadius: 4, color: "#94a3b8", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 24 }}>
          {[
            ["Top Composite COA", (d) => { const t = [...d].sort((a,b)=>b.composite-a.composite)[0]; return t ? `${t.name} · ${t.composite.toFixed(1)}/5` : "—"; }, "#4ade80"],
            ["Most Flexible", (d) => { const t = [...d].sort((a,b)=>b.flexScore-a.flexScore)[0]; return t ? `${t.name} · ${t.flexScore}/5` : "—"; }, "#60a5fa"],
            ["Highest Income", (d) => { const t = [...d].sort((a,b)=>b.incomeScore-a.incomeScore)[0]; return t ? `${t.name} · ${t.incomeScore}/5` : "—"; }, "#fbbf24"],
            ["Best for Jack", (d) => { const t = [...d].sort((a,b)=>b.jackScore-a.jackScore)[0]; return t ? `${t.name} · ${t.jackScore}/5` : "—"; }, "#a78bfa"],
          ].map(([label, fn, color]) => (
            <div key={label} style={{ background: "#0d1625", border: "1px solid #1e3a5f", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#334155", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 13, color, fontWeight: 600 }}>{fn(displayed)}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, fontSize: 10, color: "#1e3a5f", fontFamily: "monospace", textAlign: "center" }}>
          Scores &amp; notes editable in-session · Weights adjustable via ⚖ · Export to Notion or Google Sheets to persist
        </div>
      </div>
    </div>
  );
}


const MONTHS = [
  { id: "now",    label: "NOW",     sub: "Mar 2026",  x: 60  },
  { id: "apr2",   label: "APR 2",   sub: "Apr 2",    x: 148 },
  { id: "apr",    label: "APR",     sub: "Apr 2026",  x: 248 },
  { id: "may",    label: "MAY",     sub: "May 2026",  x: 340 },
  { id: "jun",    label: "JUN",     sub: "Jun 2026",  x: 480 },
  { id: "jul",    label: "SEP OUT", sub: "Jul 31",    x: 620 },
  { id: "aug",    label: "AUG",     sub: "Aug 2026",  x: 760 },
  { id: "fall",   label: "FALL",    sub: "Sep–Dec",   x: 900 },
  { id: "future", label: "2027+",   sub: "Ongoing",   x: 1040 },
];

const TRACKS = [
  { id: "urgent",  label: "🔴 URGENT",       color: "#ef4444", y: 90  },
  { id: "school_ft", label: "🎓 SCHOOL (FT)", color: "#7c3aed", y: 175 },
  { id: "emba",    label: "🎓 SCHOOL (PT)",   color: "#3b82f6", y: 265 },
  { id: "work",    label: "💼 WORK",          color: "#f59e0b", y: 360 },
  { id: "geo",     label: "📍 GEOGRAPHY",     color: "#a78bfa", y: 455 },
  { id: "finance", label: "🏦 FINANCE",       color: "#4ade80", y: 550 },
];

const NODES = [
  // URGENT
  {
    id: "va",
    track: "urgent",
    monthId: "now",
    label: "File Nikki's\nVA Claim",
    sublabel: "Backdated to filing date\nEvery month = lost $$$",
    color: "#ef4444",
    border: "#fca5a5",
    urgent: true,
    width: 120,
  },

  // SCHOOL
  {
    id: "stanford_decision",
    track: "school_ft",
    monthId: "apr2",
    label: "Stanford GSB\nDecision",
    sublabel: "Apr 2 — hear back\nFull-time MBA",
    color: "#7c3aed",
    border: "#c4b5fd",
    width: 120,
  },
  {
    id: "booth_decision",
    track: "school_ft",
    monthId: "apr",
    label: "Booth\nDecision",
    sublabel: "Apr 2 — hear back\nFull-time MBA",
    color: "#6d28d9",
    border: "#ddd6fe",
    width: 110,
  },
  {
    id: "emba_decision",
    track: "emba",
    monthId: "apr",
    label: "UCLA / Ross\nDecision Arrives",
    sublabel: "Likely admitted to both",
    color: "#1d4ed8",
    border: "#60a5fa",
    width: 130,
  },
  {
    id: "emba_choose",
    track: "emba",
    monthId: "may",
    label: "Choose:\nUCLA vs Michigan",
    sublabel: "Compare format, cohort,\ncost, network",
    color: "#1e40af",
    border: "#93c5fd",
    width: 130,
    decision: true,
  },
  {
    id: "emba_start",
    track: "emba",
    monthId: "fall",
    label: "EMBA\nProgram Starts",
    sublabel: "Alongside sim job\nor part-time work",
    color: "#1d4ed8",
    border: "#60a5fa",
    width: 120,
  },

  // WORK
  {
    id: "shift5_call",
    track: "work",
    monthId: "apr",
    label: "Shift 5\nExploratory Call",
    sublabel: "Can part-time work?",
    color: "#92400e",
    border: "#fbbf24",
    width: 120,
  },
  {
    id: "maxmorgan",
    track: "work",
    monthId: "may",
    label: "Max & Morgan\nConversation",
    sublabel: "Define comp,\nrole, location",
    color: "#92400e",
    border: "#fbbf24",
    width: 120,
  },
  {
    id: "sim_start",
    track: "work",
    monthId: "aug",
    label: "Sim Job\nStarts Aug 1",
    sublabel: "Bridge secured ✓\nBuys decision time",
    color: "#065f46",
    border: "#4ade80",
    width: 120,
  },
  {
    id: "work_decide",
    track: "work",
    monthId: "fall",
    label: "Work Path\nDecision",
    sublabel: "Sim only? Add Shift 5?\nFull-time pivot?",
    color: "#92400e",
    border: "#fbbf24",
    width: 120,
    decision: true,
  },

  // GEO
  {
    id: "geo_research",
    track: "geo",
    monthId: "apr",
    label: "Tampa / FL\nResearch",
    sublabel: "MacDill contractors,\nneighborhoods, schools",
    color: "#4c1d95",
    border: "#a78bfa",
    width: 120,
  },
  {
    id: "sd_rental",
    track: "geo",
    monthId: "may",
    label: "Model SD\nRental Cash Flow",
    sublabel: "Confirm + numbers\nat 2.25% rate",
    color: "#4c1d95",
    border: "#a78bfa",
    width: 120,
  },
  {
    id: "geo_decision",
    track: "geo",
    monthId: "jul",
    label: "Geography\nDecision Gate",
    sublabel: "Stay SD / OC / Tampa?\nDriven by work + school",
    color: "#3b0764",
    border: "#c084fc",
    width: 130,
    decision: true,
  },
  {
    id: "move",
    track: "geo",
    monthId: "fall",
    label: "Move (if FL)\nRent FL First",
    sublabel: "SD home → rental\nFL → rent then buy",
    color: "#4c1d95",
    border: "#a78bfa",
    width: 120,
  },

  // FINANCE
  {
    id: "reps_eval",
    track: "finance",
    monthId: "now",
    label: "Evaluate\nREPS Strategy",
    sublabel: "750 hrs, STR, W-2 offset",
    color: "#14532d",
    border: "#4ade80",
    width: 120,
  },
  {
    id: "tax_model",
    track: "finance",
    monthId: "may",
    label: "Model July\nIncome Cliff",
    sublabel: "Wife pay + BAH gone\nOptimize contributions",
    color: "#14532d",
    border: "#4ade80",
    width: 120,
  },
  {
    id: "hsa",
    track: "finance",
    monthId: "jul",
    label: "HSA Open\nEnrollment",
    sublabel: "Switch to HDHP?\nTriple tax advantage",
    color: "#14532d",
    border: "#4ade80",
    width: 120,
  },
  {
    id: "fl_finance",
    track: "finance",
    monthId: "fall",
    label: "FL Tax Benefits\nActivate",
    sublabel: "No state tax\n$0 property tax (P&T)",
    color: "#14532d",
    border: "#4ade80",
    width: 120,
  },
];

// arrows: [fromId, toId, label?]
const ARROWS = [
  ["stanford_decision", "emba_choose"],
  ["booth_decision", "emba_choose"],
  ["emba_decision", "emba_choose"],
  ["emba_choose", "emba_start"],
  ["emba_choose", "work_decide"],   // school choice affects work path
  ["sim_start", "work_decide"],
  ["shift5_call", "work_decide"],
  ["work_decide", "geo_decision"],  // work path affects geography
  ["emba_choose", "geo_decision"],  // school choice affects geography
  ["geo_decision", "move"],
  ["geo_decision", "fl_finance"],
  ["tax_model", "hsa"],
];

const W = 1150;
const H = 640;
const NODE_H = 64;

function getNodeX(node) {
  const month = MONTHS.find(m => m.id === node.monthId);
  return month ? month.x : 60;
}
function getTrackY(node) {
  const track = TRACKS.find(t => t.id === node.track);
  return track ? track.y : 100;
}

function COATimeline() {
  const [hovered, setHovered] = useState(null);

  const hoveredNode = hovered ? NODES.find(n => n.id === hovered) : null;

  // Build a map for arrow drawing
  const nodeMap = {};
  NODES.forEach(n => { nodeMap[n.id] = n; });

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#070c14", minHeight: "100vh", color: "#cbd5e1", padding: "32px 40px" }}>
      {/* Header */}
      <div style={{ maxWidth: W, margin: "0 auto" }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
          NIKKI · POST-MILITARY TRANSITION · DECISION TIMELINE
        </div>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 400, letterSpacing: "-0.02em", color: "#f1f5f9" }}>When Decisions Must Be Made</h1>
        <p style={{ margin: "0 0 24px", color: "#475569", fontSize: 13 }}>Hover any node for detail · Arrows show forcing functions · Diamond = decision gate</p>

        {/* Track legend */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
          {TRACKS.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: t.color, opacity: 0.8 }} />
              <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{t.label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, background: "transparent", border: "2px solid #94a3b8", transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>Decision gate</span>
          </div>
        </div>

        {/* SVG Canvas */}
        <div style={{ background: "#0a0f1a", border: "1px solid #1e3a5f", borderRadius: 12, overflow: "hidden" }}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
            {/* Month columns */}
            {MONTHS.map((m, i) => (
              <g key={m.id}>
                <line x1={m.x} y1={40} x2={m.x} y2={H - 20} stroke="#1e293b" strokeWidth={1} strokeDasharray="4 4" />
                <text x={m.x} y={28} textAnchor="middle" fill="#3b82f6" fontSize={10} fontFamily="monospace" fontWeight="700" letterSpacing="1">{m.label}</text>
                <text x={m.x} y={40} textAnchor="middle" fill="#334155" fontSize={9} fontFamily="monospace">{m.sub}</text>
              </g>
            ))}

            {/* Track labels + lines */}
            {TRACKS.map(t => (
              <g key={t.id}>
                <line x1={20} y1={t.y} x2={W - 20} y2={t.y} stroke={t.color} strokeWidth={0.5} opacity={0.15} />
              </g>
            ))}

            {/* Arrows */}
            {ARROWS.map(([fromId, toId, label], i) => {
              const from = nodeMap[fromId];
              const to = nodeMap[toId];
              if (!from || !to) return null;
              const fx = getNodeX(from) + (from.width || 120) / 2;
              const fy = getTrackY(from);
              const tx = getNodeX(to) - (to.width || 120) / 2;
              const ty = getTrackY(to);
              const mx = (fx + tx) / 2;
              const sameTrack = from.track === to.track;
              const path = sameTrack
                ? `M${fx},${fy} L${tx},${ty}`
                : `M${fx},${fy} C${mx},${fy} ${mx},${ty} ${tx},${ty}`;
              return (
                <g key={i}>
                  <path d={path} stroke="#1e3a5f" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" opacity={0.7} />
                </g>
              );
            })}

            {/* Arrow marker */}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#334155" />
              </marker>
            </defs>

            {/* Nodes */}
            {NODES.map(node => {
              const cx = getNodeX(node);
              const cy = getTrackY(node);
              const w = node.width || 120;
              const h = NODE_H;
              const isHov = hovered === node.id;
              const isDecision = node.decision;
              const isUrgent = node.urgent;

              if (isDecision) {
                // Diamond shape
                const dw = w * 0.52;
                const dh = h * 0.58;
                return (
                  <g key={node.id} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                    <polygon
                      points={`${cx},${cy - dh} ${cx + dw},${cy} ${cx},${cy + dh} ${cx - dw},${cy}`}
                      fill={isHov ? node.color : "#0f1c30"}
                      stroke={node.border}
                      strokeWidth={isHov ? 2 : 1.5}
                      opacity={isHov ? 1 : 0.95}
                    />
                    {node.label.split("\n").map((line, i) => (
                      <text key={i} x={cx} y={cy - 6 + i * 13} textAnchor="middle" fill={isHov ? "#fff" : node.border} fontSize={10} fontFamily="monospace" fontWeight="700">{line}</text>
                    ))}
                  </g>
                );
              }

              return (
                <g key={node.id} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                  {isUrgent && (
                    <rect x={cx - w / 2 - 3} y={cy - h / 2 - 3} width={w + 6} height={h + 6} rx={8} fill="#ef4444" opacity={0.2} />
                  )}
                  <rect
                    x={cx - w / 2} y={cy - h / 2}
                    width={w} height={h} rx={6}
                    fill={isHov ? node.color : "#0d1625"}
                    stroke={node.border}
                    strokeWidth={isHov ? 2 : 1}
                  />
                  {node.label.split("\n").map((line, i) => (
                    <text key={i} x={cx} y={cy - 10 + i * 14} textAnchor="middle" fill={isHov ? "#fff" : node.border} fontSize={11} fontFamily="monospace" fontWeight="700">{line}</text>
                  ))}
                </g>
              );
            })}

            {/* Sep out marker */}
            <line x1={620} y1={50} x2={620} y2={H - 20} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 3" opacity={0.5} />
            <rect x={590} y={50} width={62} height={18} rx={4} fill="#f59e0b" opacity={0.15} />
            <text x={621} y={62} textAnchor="middle" fill="#f59e0b" fontSize={9} fontFamily="monospace" fontWeight="700">SEP OUT</text>
          </svg>
        </div>

        {/* Hover detail panel */}
        <div style={{ minHeight: 90, marginTop: 16, background: "#0d1625", border: `1px solid ${hoveredNode ? hoveredNode.border : "#1e3a5f"}`, borderRadius: 10, padding: "16px 20px", transition: "border-color 0.2s" }}>
          {hoveredNode ? (
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", color: hoveredNode.border, textTransform: "uppercase", marginBottom: 6 }}>
                {TRACKS.find(t => t.id === hoveredNode.track)?.label} · {MONTHS.find(m => m.id === hoveredNode.monthId)?.label} {MONTHS.find(m => m.id === hoveredNode.monthId)?.sub}
              </div>
              <div style={{ fontSize: 16, color: "#f1f5f9", fontWeight: 600, marginBottom: 4 }}>{hoveredNode.label.replace("\n", " ")}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{hoveredNode.sublabel?.replace("\n", " · ")}</div>
              {hoveredNode.decision && <div style={{ marginTop: 8, fontSize: 11, color: "#f59e0b", fontFamily: "monospace" }}>⬥ DECISION GATE — outcome here changes downstream COAs</div>}
              {hoveredNode.urgent && <div style={{ marginTop: 8, fontSize: 11, color: "#ef4444", fontFamily: "monospace" }}>⚠ DO THIS NOW — financial backdating means every day of delay costs money</div>}
            </div>
          ) : (
            <div style={{ color: "#334155", fontSize: 13, fontFamily: "monospace", paddingTop: 8 }}>← Hover any node to see detail</div>
          )}
        </div>

        {/* Key forcing functions */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#475569", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>Key Forcing Functions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            {[
              { trigger: "EMBA decision arrives (~Apr)", consequence: "Unlocks school path → gates geography and work decisions", color: "#3b82f6" },
              { trigger: "Geography decision (~Jul 31)", consequence: "FL move conflicts with sim job and UCLA EMBA — must be resolved at sep-out", color: "#a78bfa" },
              { trigger: "Work path decision (~Fall)", consequence: "Full-time job closes all school COAs. Part-time keeps options open.", color: "#f59e0b" },
              { trigger: "VA claim filing (NOW)", consequence: "Backdated to filing date — literally the highest-ROI action on the board", color: "#ef4444" },
            ].map(f => (
              <div key={f.trigger} style={{ background: "#0a0f1a", border: `1px solid #1e3a5f`, borderLeft: `3px solid ${f.color}`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: f.color, fontFamily: "monospace", fontWeight: 700, marginBottom: 4 }}>{f.trigger}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{f.consequence}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("matrix");
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#070c14", minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1e3a5f", background: "#0d1625", padding: "0 40px" }}>
        {[["matrix", "📊 COA Matrix"], ["timeline", "📅 Decision Timeline"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: "14px 24px",
              background: "transparent",
              border: "none",
              borderBottom: tab === id ? "2px solid #3b82f6" : "2px solid transparent",
              color: tab === id ? "#f1f5f9" : "#475569",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "-1px",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "matrix" ? <COAMatrix /> : <COATimeline />}
    </div>
  );
}
