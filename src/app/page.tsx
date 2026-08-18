"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, FlaskConical, Leaf, Menu, Search, ShieldCheck, X } from "lucide-react";

const products = [
  { grade: "UV 1130", category: "UV Absorbers", chemistry: "Liquid benzotriazole blend", cas: "104810-47-1 / 104810-48-2", applications: "Automotive, industrial & wood coatings" },
  { grade: "UV 1", category: "UV Absorbers", chemistry: "Oxanilide UV absorber", cas: "57834-33-0", applications: "Coatings, adhesives & polymers" },
  { grade: "UV 234", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "70321-86-7", applications: "PC, PET, PA, ABS & high-temperature polymers" },
  { grade: "UV 320", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "3846-71-7", applications: "Plastics, coatings & elastomers" },
  { grade: "UV 326", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "3896-11-5", applications: "Polyolefins, PVC, ABS & coatings" },
  { grade: "UV 327", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "3864-99-1", applications: "Engineering plastics, coatings & rubber" },
  { grade: "UV 328", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "25973-55-1", applications: "Polyolefins, styrenics & coatings" },
  { grade: "UV 360", category: "UV Absorbers", chemistry: "Dimeric benzotriazole", cas: "103597-45-1", applications: "PC, acrylics & high-temperature plastics" },
  { grade: "UV 928", category: "UV Absorbers", chemistry: "Benzotriazole", cas: "73936-91-1", applications: "Powder, automotive & industrial coatings" },
  { grade: "UV 1577", category: "UV Absorbers", chemistry: "Hydroxyphenyl triazine", cas: "147315-50-2", applications: "PET, PC, engineering plastics & coatings" },
  { grade: "UV 1600", category: "UV Absorbers", chemistry: "Hydroxyphenyl triazine", cas: "204583-39-1", applications: "Automotive clear coats & premium finishes" },
  { grade: "UV 1084 NQ", category: "UV Absorbers", chemistry: "Nickel quencher", cas: "14516-71-3", applications: "Agricultural films & polyolefins" },
  { grade: "BP 12", category: "UV Absorbers", chemistry: "Benzophenone", cas: "1843-05-6", applications: "Plastics, coatings & adhesives" },
  { grade: "LS 770", category: "Light Stabilizers", chemistry: "Low molecular weight HALS", cas: "52829-07-9", applications: "PP, PE, PU, styrenics & coatings" },
  { grade: "LS 944", category: "Light Stabilizers", chemistry: "Polymeric HALS", cas: "70624-18-9", applications: "Agricultural films, fibers & outdoor plastics" },
  { grade: "LS 622", category: "Light Stabilizers", chemistry: "Polymeric HALS", cas: "65447-77-0", applications: "Films, tapes, fibers & rotomoulding" },
  { grade: "LS 783", category: "Light Stabilizers", chemistry: "HALS blend", cas: "Blend", applications: "Thick sections, films & long-term outdoor use" },
  { grade: "LS 119", category: "Light Stabilizers", chemistry: "High molecular weight HALS", cas: "106990-43-6", applications: "PP, TPO, automotive & fibers" },
  { grade: "LS 292", category: "Light Stabilizers", chemistry: "Liquid HALS", cas: "41556-26-7 / 82919-37-7", applications: "Coatings, inks, adhesives & sealants" },
  { grade: "LS 123", category: "Light Stabilizers", chemistry: "Amino-ether HALS", cas: "129757-67-1", applications: "Automotive & industrial coatings" },
  { grade: "LS 2020", category: "Light Stabilizers", chemistry: "High-performance polymeric HALS", cas: "192268-64-7", applications: "Films, fibers & demanding polyolefins" },
  { grade: "OB 1", category: "Optical Brighteners", chemistry: "Bis-benzoxazole brightener", cas: "1533-45-5", applications: "Polyester, plastics, fibers & coatings" },
  { grade: "OB", category: "Optical Brighteners", chemistry: "Benzoxazole brightener", cas: "7128-64-5", applications: "PVC, PS, ABS, coatings & inks" },
  { grade: "FP 127", category: "Optical Brighteners", chemistry: "Stilbene brightener", cas: "40470-68-6", applications: "PVC, artificial leather & plastics" },
  { grade: "OB 357", category: "Optical Brighteners", chemistry: "High-temperature brightener", cas: "41098-56-0", applications: "Engineering plastics & synthetic fibers" },
  { grade: "OB KCB", category: "Optical Brighteners", chemistry: "Coumarin brightener", cas: "5089-22-5", applications: "EVA, PE, PVC, rubber & footwear" },
  { grade: "OB CPC / NFW", category: "Optical Brighteners", chemistry: "Disulfonated stilbene", cas: "27344-41-8", applications: "Detergents, paper & textile whitening" },
  { grade: "AO 1010", category: "Antioxidants", chemistry: "Hindered phenolic antioxidant", cas: "6683-19-8", applications: "Polyolefins, engineering plastics & elastomers" },
  { grade: "AO 1076", category: "Antioxidants", chemistry: "Hindered phenolic antioxidant", cas: "2082-79-3", applications: "PE, PP, ABS, adhesives & elastomers" },
  { grade: "AO 168", category: "Antioxidants", chemistry: "Phosphite process stabilizer", cas: "31570-04-4", applications: "Polyolefins, styrenics & engineering plastics" },
  { grade: "AO 1098", category: "Antioxidants", chemistry: "Hindered phenolic antioxidant", cas: "23128-74-7", applications: "Polyamides, fibers & engineering plastics" },
  { grade: "AO 245", category: "Antioxidants", chemistry: "Hindered phenolic antioxidant", cas: "36443-68-2", applications: "POM, PU, hot-melt adhesives & elastomers" },
  { grade: "AO 3114", category: "Antioxidants", chemistry: "Multifunctional phenolic antioxidant", cas: "27676-62-6", applications: "Polyolefins, PA, PET & wire compounds" },
  { grade: "AO B215", category: "Antioxidants", chemistry: "1010 / 168 synergistic blend", cas: "Blend", applications: "Long-term and processing stability" },
  { grade: "AO B225", category: "Antioxidants", chemistry: "1010 / 168 synergistic blend", cas: "Blend", applications: "Polyolefins, films, fibers & moulded parts" },
  { grade: "FR APP", category: "Flame Retardants", chemistry: "Ammonium polyphosphate", cas: "68333-79-9", applications: "Intumescent coatings, PP & construction" },
  { grade: "FR MCA", category: "Flame Retardants", chemistry: "Melamine cyanurate", cas: "37640-57-6", applications: "PA6, PA66, TPU & electrical components" },
  { grade: "FR MPP", category: "Flame Retardants", chemistry: "Melamine polyphosphate", cas: "218768-84-4", applications: "Glass-filled PA & engineering plastics" },
  { grade: "FR BDP", category: "Flame Retardants", chemistry: "Halogen-free phosphate ester", cas: "5945-33-5", applications: "PC/ABS, PPO/HIPS & engineering plastics" },
  { grade: "FR RDP", category: "Flame Retardants", chemistry: "Halogen-free phosphate ester", cas: "57583-54-7", applications: "PC/ABS, PPO & electronic housings" },
  { grade: "FR DBDPE", category: "Flame Retardants", chemistry: "Brominated flame retardant", cas: "84852-53-9", applications: "HIPS, ABS, PP & wire compounds" },
  { grade: "FR ATO", category: "Flame Retardants", chemistry: "Antimony trioxide synergist", cas: "1309-64-4", applications: "Plastics, rubber, textiles & coatings" },
  { grade: "FR DOPO", category: "Flame Retardants", chemistry: "Reactive phosphorus flame retardant", cas: "35948-25-5", applications: "Epoxy, laminates & electronics" },
  { grade: "Nucleating Agent 3988", category: "Polymer Additives", chemistry: "Sorbitol clarifier", cas: "135861-56-2", applications: "Clarified PP packaging & household goods" },
  { grade: "Slip Agent ER", category: "Polymer Additives", chemistry: "Erucamide", cas: "112-84-5", applications: "PE and PP films" },
  { grade: "Slip Agent OA", category: "Polymer Additives", chemistry: "Oleamide", cas: "301-02-0", applications: "Films, caps & moulded polyolefins" },
  { grade: "Antistatic Agent GMS", category: "Polymer Additives", chemistry: "Glycerol monostearate", cas: "31566-31-1", applications: "PE, PP and food-contact packaging" },
  { grade: "Processing Aid PPA", category: "Polymer Additives", chemistry: "Fluoropolymer processing aid", cas: "Proprietary", applications: "Blown film, extrusion & cable compounds" },
];

const categories = ["All products", ...Array.from(new Set(products.map((p) => p.category)))];

const industries = ["Automotive", "Printing & packaging", "Agriculture & food", "Electronics", "Personal & home care", "Adhesives & sealants", "Paints & coatings", "Building & construction"];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [sent, setSent] = useState(false);
  const filtered = useMemo(() => products.filter((p) => (category === "All products" || p.category === category) && `${p.grade} ${p.category} ${p.chemistry} ${p.cas} ${p.applications}`.toLowerCase().includes(query.toLowerCase())), [query, category]);

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (response.ok) { setSent(true); form.reset(); }
  }

  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top" aria-label="CHEMRADES home"><span className="brand-mark"><FlaskConical size={19}/></span><span>CHEMRADES<small>FZE LLC</small></span></a>
      <div className={`nav-links ${menu ? "open" : ""}`}>
        <a href="#products" onClick={() => setMenu(false)}>Products</a><a href="#industries" onClick={() => setMenu(false)}>Industries</a><a href="#about" onClick={() => setMenu(false)}>About</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>Request a quote <ArrowRight size={15}/></a>
      </div>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
    </nav>

    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span/> Specialty chemistry · UAE</p>
        <h1>Chemistry that keeps <em>progress</em> in motion.</h1>
        <p className="lead">Performance additives and specialty chemical solutions, delivered with technical clarity, responsive service and dependable supply.</p>
        <div className="hero-actions"><a className="button primary" href="#products">Explore products <ArrowRight size={17}/></a><a className="button text" href="#contact">Talk to a specialist</a></div>
        <div className="trust"><span><Check/> Reliable supply</span><span><Check/> Technical support</span><span><Check/> Global sourcing</span></div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orb orb-one"/><div className="orb orb-two"/><div className="molecule"><i/><i/><i/><i/><i/></div>
        <div className="art-card"><span>01 / 03</span><strong>Stability,<br/>engineered.</strong><small>For plastics, coatings & more</small></div>
      </div>
    </section>

    <section className="statement shell" id="about">
      <p className="section-label">Built for better formulations</p>
      <h2>We connect industry with chemistry that performs—efficiently, responsibly and consistently.</h2>
      <div className="pillars"><article><ShieldCheck/><h3>Quality assured</h3><p>Products selected around performance, consistency and documentation.</p></article><article><Leaf/><h3>Future conscious</h3><p>Smarter chemistry choices for longer-lasting, more efficient products.</p></article><article><FlaskConical/><h3>Application led</h3><p>Practical product guidance shaped by your process and end use.</p></article></div>
    </section>

    <section className="products" id="products"><div className="shell">
      <div className="section-head"><div><p className="section-label light">Product portfolio</p><h2>Grades for every<br/>formulation.</h2></div><p>Browse individual grades by category, chemistry, CAS number or application. Technical and safety data are available on request.</p></div>
      <div className="category-tabs">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}<span>{item === "All products" ? products.length : products.filter(p => p.category === item).length}</span></button>)}</div>
      <label className="search"><Search size={20}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search grade, CAS, chemistry or application"/><span>{filtered.length} grades</span></label>
      <div className="catalog-head"><span>Grade</span><span>Chemistry / type</span><span>Common applications</span><span>CAS</span></div>
      <div className="product-list">{filtered.map((p) => <article className="product-row" key={`${p.category}-${p.grade}`}><div><small>{p.category}</small><h3>{p.grade}</h3></div><p>{p.chemistry}</p><p>{p.applications}</p><div className="cas"><span>{p.cas}</span><a href="#contact" aria-label={`Enquire about ${p.grade}`}><ArrowRight/></a></div></article>)}</div>
      {filtered.length === 0 && <p className="empty">No matching grades. Contact us and we’ll source the right option.</p>}
    </div></section>

    <section className="industries shell" id="industries">
      <div><p className="section-label">Across industries</p><h2>One portfolio.<br/>Many possibilities.</h2><p>From product durability to processing efficiency, our solutions help manufacturers raise performance where it matters.</p><a href="#contact" className="inline-link">Discuss your application <ArrowRight size={16}/></a></div>
      <div className="industry-list">{industries.map((industry, i) => <div key={industry}><span>{String(i + 1).padStart(2,"0")}</span><strong>{industry}</strong><ChevronDown/></div>)}</div>
    </section>

    <section className="contact" id="contact"><div className="shell contact-grid">
      <div><p className="section-label light">Start a conversation</p><h2>What can we help you formulate?</h2><p>Tell us what you are developing, improving or sourcing. Our team will connect you with the right solution.</p><div className="company"><strong>CHEMRADES FZE LLC</strong><span>United Arab Emirates</span><small>An ICG Chemicals company</small></div></div>
      <form onSubmit={submitInquiry}><div className="field-row"><label>Name<input name="name" required placeholder="Your name"/></label><label>Work email<input type="email" name="email" required placeholder="you@company.com"/></label></div><label>Company<input name="company" placeholder="Company name"/></label><label>What do you need?<select name="interest" defaultValue=""><option value="" disabled>Select a product family</option>{categories.slice(1).map(item => <option key={item}>{item}</option>)}<option>Other / not sure</option></select></label><label>Message<textarea name="message" required placeholder="Tell us the grade, application, volume or performance requirement..." rows={4}/></label><button className="button submit" type="submit">Send inquiry <ArrowRight size={17}/></button>{sent && <p className="success"><Check/> Thank you—your inquiry has been received.</p>}</form>
    </div></section>

    <footer className="shell"><a className="brand" href="#top"><span className="brand-mark"><FlaskConical size={19}/></span><span>CHEMRADES<small>FZE LLC</small></span></a><p>Specialty chemistry. Reliably delivered.</p><span>© {new Date().getFullYear()} CHEMRADES FZE LLC</span></footer>
  </main>;
}

