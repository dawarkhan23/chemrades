"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, FlaskConical, Leaf, Menu, Search, ShieldCheck, X } from "lucide-react";

const products = [
  { name: "UV Absorbers", code: "UVA Series", use: "Long-lasting protection from UV degradation", tags: ["Plastics", "Coatings"] },
  { name: "Light Stabilizers", code: "HALS Series", use: "Preserves strength, colour and surface quality", tags: ["Films", "Automotive"] },
  { name: "Optical Brighteners", code: "OB Series", use: "High-brilliance whitening and colour correction", tags: ["Polymers", "Textiles"] },
  { name: "Antioxidants", code: "AO Series", use: "Processing and long-term thermal stability", tags: ["Compounding", "Packaging"] },
  { name: "Flame Retardants", code: "FR Series", use: "Performance-focused fire protection solutions", tags: ["Construction", "Electronics"] },
  { name: "Polymer Additives", code: "PA Series", use: "Targeted improvements for modern formulations", tags: ["Masterbatch", "Resins"] },
];

const industries = ["Automotive", "Printing & packaging", "Agriculture & food", "Electronics", "Personal & home care", "Adhesives & sealants", "Paints & coatings", "Building & construction"];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const filtered = useMemo(() => products.filter((p) => `${p.name} ${p.code} ${p.use} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);

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
      <div className="section-head"><div><p className="section-label light">Product portfolio</p><h2>The right additive.<br/>The right outcome.</h2></div><p>Explore our core performance chemical families. Contact us for grades, technical data and application support.</p></div>
      <label className="search"><Search size={20}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or applications"/><span>{filtered.length} results</span></label>
      <div className="product-grid">{filtered.map((p, i) => <article className="product" key={p.name}><div className="product-top"><span>{String(i + 1).padStart(2,"0")}</span><ArrowRight/></div><small>{p.code}</small><h3>{p.name}</h3><p>{p.use}</p><div>{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div></article>)}</div>
    </div></section>

    <section className="industries shell" id="industries">
      <div><p className="section-label">Across industries</p><h2>One portfolio.<br/>Many possibilities.</h2><p>From product durability to processing efficiency, our solutions help manufacturers raise performance where it matters.</p><a href="#contact" className="inline-link">Discuss your application <ArrowRight size={16}/></a></div>
      <div className="industry-list">{industries.map((industry, i) => <div key={industry}><span>{String(i + 1).padStart(2,"0")}</span><strong>{industry}</strong><ChevronDown/></div>)}</div>
    </section>

    <section className="contact" id="contact"><div className="shell contact-grid">
      <div><p className="section-label light">Start a conversation</p><h2>What can we help you formulate?</h2><p>Tell us what you are developing, improving or sourcing. Our team will connect you with the right solution.</p><div className="company"><strong>CHEMRADES FZE LLC</strong><span>United Arab Emirates</span><small>An ICG Chemicals company</small></div></div>
      <form onSubmit={submitInquiry}><div className="field-row"><label>Name<input name="name" required placeholder="Your name"/></label><label>Work email<input type="email" name="email" required placeholder="you@company.com"/></label></div><label>Company<input name="company" placeholder="Company name"/></label><label>What do you need?<select name="interest" defaultValue=""><option value="" disabled>Select a product family</option>{products.map(p => <option key={p.name}>{p.name}</option>)}<option>Other / not sure</option></select></label><label>Message<textarea name="message" required placeholder="Tell us about your application, volume or required grade..." rows={4}/></label><button className="button submit" type="submit">Send inquiry <ArrowRight size={17}/></button>{sent && <p className="success"><Check/> Thank you—your inquiry has been received.</p>}</form>
    </div></section>

    <footer className="shell"><a className="brand" href="#top"><span className="brand-mark"><FlaskConical size={19}/></span><span>CHEMRADES<small>FZE LLC</small></span></a><p>Specialty chemistry. Reliably delivered.</p><span>© {new Date().getFullYear()} CHEMRADES FZE LLC</span></footer>
  </main>;
}

