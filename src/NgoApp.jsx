import { useState, useEffect } from "react";
import "./NgoApp.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const causes = [
  {
    id: 1,
    title: "Mountain School Program",
    region: "Solukhumbu District",
    desc: "Building and supplying classrooms in remote Himalayan villages where children walk 3+ hours daily just to reach school.",
    raised: 1240000,
    goal: 2000000,
    category: "Education",
    icon: "📚",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    color: "#2E7D32",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    region: "Dolakha & Sindhupalchok",
    desc: "Installing gravity-fed water systems in earthquake-affected villages still relying on contaminated river water for drinking.",
    raised: 870000,
    goal: 1500000,
    category: "Clean Water",
    icon: "💧",
    img: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=600&q=80",
    color: "#1565C0",
  },
  {
    id: 3,
    title: "Women's Livelihood Fund",
    region: "Rukum & Rolpa",
    desc: "Providing micro-loans and vocational training to widows and single mothers in post-conflict western Nepal communities.",
    raised: 560000,
    goal: 1000000,
    category: "Women Empowerment",
    icon: "🌸",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    color: "#AD1457",
  },
  {
    id: 4,
    title: "Earthquake Relief & Rebuild",
    region: "Jajarkot & West Rukum",
    desc: "Emergency shelter kits and permanent housing reconstruction for families displaced by the 2023 Jajarkot earthquake.",
    raised: 2100000,
    goal: 3000000,
    category: "Disaster Relief",
    icon: "🏠",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    color: "#E65100",
  },
  {
    id: 5,
    title: "Child Nutrition Program",
    region: "Karnali Province",
    desc: "Daily nutritious meals and health check-ups for malnourished children under 5 in Nepal's most food-insecure province.",
    raised: 430000,
    goal: 800000,
    category: "Health",
    icon: "🥗",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    color: "#F9A825",
  },
  {
    id: 6,
    title: "Digital Literacy for Youth",
    region: "Terai Region",
    desc: "Setting up computer labs and coding bootcamps in Madhesh Province schools to bridge Nepal's digital divide.",
    raised: 320000,
    goal: 600000,
    category: "Education",
    icon: "💻",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    color: "#6A1B9A",
  },
];

const causeCategories = ["All", "Education", "Clean Water", "Women Empowerment", "Disaster Relief", "Health"];

const impactStats = [
  { value: "48,000+", label: "Lives Impacted",      icon: "❤️" },
  { value: "312",     label: "Villages Reached",    icon: "🏘️" },
  { value: "17",      label: "Districts Covered",   icon: "🗺️" },
  { value: "₨ 2.4Cr", label: "Funds Distributed",  icon: "💰" },
];

const team = [
  {
    name: "Dr. Sushila Tamang",
    role: "Executive Director",
    bio: "Former UNICEF Nepal coordinator with 18 years in rural development across the Himalayas.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
  },
  {
    name: "Bikram Rai",
    role: "Field Operations Head",
    bio: "Born in Taplejung, Bikram leads our ground teams across 17 districts with deep community trust.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Anita Gurung",
    role: "Programs Director",
    bio: "Rights activist and gender equality champion driving our women empowerment initiatives since 2014.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
];

const testimonials = [
  {
    quote: "Before Sewa Nepal came to our village, my daughters had never held a book. Today my eldest is studying in Kathmandu on a scholarship. I have no words for this gratitude.",
    name: "Devi Maya Shrestha",
    location: "Solukhumbu",
    avatar: "DS",
    color: "#2E7D32",
  },
  {
    quote: "The clean water pipe changed everything. No more waterborne disease. No more children missing school because they are sick. It is a miracle of a pipe.",
    name: "Ram Bahadur Magar",
    location: "Dolakha",
    avatar: "RM",
    color: "#1565C0",
  },
  {
    quote: "With the micro-loan, I started my weaving business. Now I employ three other women from my village. We are no longer waiting for help — we are building our own future.",
    name: "Sarita Budha",
    location: "Rukum",
    avatar: "SB",
    color: "#AD1457",
  },
];

const partners = [
  "UN Nepal", "ADB", "Save the Children", "UNICEF Nepal",
  "GIZ Nepal", "World Food Programme", "ActionAid", "Oxfam",
];

const navLinks = ["About", "Causes", "Impact", "Team", "Contact"];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function formatNPR(n) {
  if (n >= 1000000) return `₨ ${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `₨ ${(n / 1000).toFixed(0)}K`;
  return `₨ ${n}`;
}

function ProgressBar({ raised, goal, color }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="progress-labels">
        <span className="progress-raised" style={{ color }}>{formatNPR(raised)} raised</span>
        <span className="progress-pct">{pct}%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function NgoApp() {
  const [activeCategory, setActiveCategory]       = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [navScrolled, setNavScrolled]             = useState(false);
  const [menuOpen, setMenuOpen]                   = useState(false);
  const [donateOpen, setDonateOpen]               = useState(false);
  const [donateAmount, setDonateAmount]           = useState("1000");

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filtered = activeCategory === "All"
    ? causes
    : causes.filter(c => c.category === activeCategory);

  return (
    <div className="ngo-root">

      {/* ── DONATE MODAL ── */}
      {donateOpen && (
        <div className="modal-overlay" onClick={() => setDonateOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDonateOpen(false)}>✕</button>
            <div className="modal-header">
              <span className="modal-icon">❤️</span>
              <h3 className="modal-title">Make a Difference Today</h3>
              <p className="modal-sub">100% of your donation reaches the communities we serve.</p>
            </div>
            <div className="modal-amounts">
              {["500", "1000", "2500", "5000", "10000"].map(amt => (
                <button
                  key={amt}
                  className={`amount-btn ${donateAmount === amt ? "active" : ""}`}
                  onClick={() => setDonateAmount(amt)}
                >
                  ₨ {parseInt(amt).toLocaleString()}
                </button>
              ))}
            </div>
            <div className="modal-custom">
              <label className="custom-label">Or enter custom amount (NPR)</label>
              <input
                className="custom-input"
                type="number"
                value={donateAmount}
                onChange={e => setDonateAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="modal-impact">
              <p className="impact-note">
                ₨ 1,000 feeds a child for a month &nbsp;·&nbsp;
                ₨ 5,000 builds a school desk &nbsp;·&nbsp;
                ₨ 25,000 installs a water tap
              </p>
            </div>
            <button className="modal-donate-btn">
              Donate ₨ {parseInt(donateAmount || 0).toLocaleString()} Now →
            </button>
            <p className="modal-secure">🔒 Secure payment · Tax deductible under Section 80G</p>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <div className="logo-mark-ngo">
            <span className="logo-heart">🙏</span>
          </div>
          <div>
            <span className="logo-name">SEWA NEPAL</span>
            <span className="logo-tagline-sm">Serving Communities Since 2007</span>
          </div>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <button className="nav-donate-btn" onClick={() => setDonateOpen(true)}>
            ❤️ Donate Now
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="h-line" />
          <span className="h-line" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="h-line" />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="about">
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-eyebrow-wrap">
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow">Registered NGO · Est. 2007 · Kathmandu, Nepal</span>
          </div>
          <h1 className="hero-title">
            Changing Lives<br />
            Across the<br />
            <span className="hero-accent">Himalayas</span>
          </h1>
          <p className="hero-sub">
            Sewa Nepal is a grassroots non-profit working in Nepal's most remote and
            underserved communities — bringing education, clean water, healthcare,
            and hope to those who need it most.
          </p>
          <div className="hero-actions">
            <button className="btn-donate" onClick={() => setDonateOpen(true)}>
              ❤️ Donate Now
            </button>
            <button className="btn-learn">Our Work ↓</button>
          </div>
        </div>

        <div className="hero-stats-row">
          {impactStats.map(s => (
            <div key={s.label} className="hero-stat">
              <span className="hero-stat-icon">{s.icon}</span>
              <span className="hero-stat-val">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...Array(3)].flatMap((_, ri) =>
            ["Education", "Clean Water", "Women Empowerment", "Disaster Relief", "Child Health", "Digital Literacy", "Food Security", "Community Building"].map(
              t => <span key={`${ri}-${t}`} className="marquee-item">{t} <span className="msep">✦</span></span>
            )
          )}
        </div>
      </div>

      {/* ── MISSION STRIP ── */}
      <section className="mission-strip">
        <div className="mission-inner">
          <div className="mission-text">
            <p className="eyebrow">— Our Mission</p>
            <h2 className="mission-title">
              "सेवा नै धर्म हो"<br />
              <span className="mission-translate">Service is our highest calling</span>
            </h2>
            <p className="mission-body">
              Founded after the 2006 peace accords by a group of local activists,
              Sewa Nepal has grown from a single classroom project in Kalikot to a
              nationally recognised NGO operating across 17 districts. We believe
              lasting change only comes from within communities — so we hire locally,
              train locally, and build solutions that communities own and sustain themselves.
            </p>
            <div className="mission-pillars">
              {[
                { icon: "📖", label: "Education" },
                { icon: "💧", label: "Clean Water" },
                { icon: "🌿", label: "Livelihoods" },
                { icon: "🏥", label: "Healthcare" },
              ].map(p => (
                <div key={p.label} className="pillar">
                  <span className="pillar-icon">{p.icon}</span>
                  <span className="pillar-label">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mission-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80"
              alt="Community"
              className="mission-img"
            />
            <div className="mission-img-badge">
              <span className="badge-year">17</span>
              <span className="badge-label">Years of<br />Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAUSES ── */}
      <section className="section causes-section" id="causes">
        <div className="section-header">
          <p className="eyebrow">— Active Campaigns</p>
          <h2 className="section-title">
            Where Your Support<br />
            <em className="accent-em">Makes an Impact</em>
          </h2>
          <p className="section-sub">
            Every rupee you donate goes directly to verified on-ground projects.
            Track our progress in real time and choose the cause closest to your heart.
          </p>
        </div>

        <div className="filter-row">
          {causeCategories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="causes-grid">
          {filtered.map((cause, i) => (
            <div key={cause.id} className="cause-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="cause-img-wrap">
                <img src={cause.img} alt={cause.title} className="cause-img" />
                <span className="cause-category-tag" style={{ background: cause.color }}>
                  {cause.icon} {cause.category}
                </span>
              </div>
              <div className="cause-body">
                <p className="cause-region">📍 {cause.region}</p>
                <h3 className="cause-title">{cause.title}</h3>
                <p className="cause-desc">{cause.desc}</p>
                <ProgressBar raised={cause.raised} goal={cause.goal} color={cause.color} />
                <div className="cause-footer">
                  <span className="cause-goal">Goal: {formatNPR(cause.goal)}</span>
                  <button
                    className="cause-donate-btn"
                    style={{ background: cause.color }}
                    onClick={() => setDonateOpen(true)}
                  >
                    Donate →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT NUMBERS ── */}
      <section className="impact-section" id="impact">
        <div className="impact-bg" />
        <div className="impact-content">
          <p className="eyebrow eyebrow-light">— Our Impact</p>
          <h2 className="impact-title">
            Numbers That<br />
            <em className="accent-em">Tell a Story</em>
          </h2>
          <div className="impact-grid">
            {[
              { num: "312", unit: "Villages", desc: "directly reached with services" },
              { num: "48,000+", unit: "Beneficiaries", desc: "whose lives are measurably better" },
              { num: "2,400+", unit: "Students", desc: "now in school who weren't before" },
              { num: "89", unit: "Water Systems", desc: "built serving 30,000+ people" },
              { num: "1,200+", unit: "Women", desc: "gained financial independence" },
              { num: "17", unit: "Districts", desc: "across all 7 provinces of Nepal" },
            ].map(item => (
              <div key={item.unit} className="impact-card">
                <span className="impact-num">{item.num}</span>
                <span className="impact-unit">{item.unit}</span>
                <span className="impact-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonial-section">
        <div className="section-header">
          <p className="eyebrow">— Community Voices</p>
          <h2 className="section-title">
            Stories from<br />
            <em className="accent-em">The Field</em>
          </h2>
        </div>
        <div className="testimonial-wrap">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testimonial-card ${i === activeTestimonial ? "visible" : "hidden"}`}>
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="t-avatar" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-location">📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="t-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === activeTestimonial ? "active" : ""}`} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team-section" id="team">
        <div className="section-header">
          <p className="eyebrow">— The People</p>
          <h2 className="section-title">
            Meet Our<br />
            <em className="accent-em">Leadership Team</em>
          </h2>
        </div>
        <div className="team-grid">
          {team.map(member => (
            <div key={member.name} className="team-card">
              <div className="team-img-wrap">
                <img src={member.img} alt={member.name} className="team-img" />
              </div>
              <div className="team-body">
                <h4 className="team-name">{member.name}</h4>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <div className="partners-strip">
        <p className="partners-label">Our Partners & Supporters</p>
        <div className="partners-row">
          {partners.map(p => (
            <span key={p} className="partner-badge">{p}</span>
          ))}
        </div>
      </div>

      {/* ── CONTACT / CTA ── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-text">
            <p className="eyebrow">— Get Involved</p>
            <h2 className="contact-title">
              Join Us in<br />
              <em className="accent-em">Serving Nepal</em>
            </h2>
            <p className="contact-body">
              Whether you want to donate, volunteer, partner, or simply learn more —
              we'd love to hear from you. Every act of sewa (service) matters.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="ci-icon">📍</span>
                <span>Thamel, Kathmandu, Nepal (44600)</span>
              </div>
              <div className="contact-item">
                <span className="ci-icon">📞</span>
                <span>+977-1-4XXXXXX</span>
              </div>
              <div className="contact-item">
                <span className="ci-icon">📧</span>
                <span>info@sewanepal.org.np</span>
              </div>
              <div className="contact-item">
                <span className="ci-icon">🌐</span>
                <span>www.sewanepal.org.np</span>
              </div>
            </div>
            <button className="btn-donate contact-donate" onClick={() => setDonateOpen(true)}>
              ❤️ Donate Now
            </button>
          </div>
          <div className="contact-form-wrap">
            <h3 className="form-title">Send Us a Message</h3>
            <div className="form-grid">
              <input className="form-input" placeholder="Your Name" />
              <input className="form-input" placeholder="Email Address" />
            </div>
            <input className="form-input full" placeholder="Subject" />
            <textarea className="form-textarea" placeholder="Your message..." rows={5} />
            <button className="form-submit">Send Message →</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-mark-ngo sm"><span className="logo-heart">🙏</span></div>
              <div>
                <span className="logo-name sm">SEWA NEPAL</span>
                <span className="logo-tagline-sm ft">Serving Communities Since 2007</span>
              </div>
            </div>
            <p className="footer-tagline">
              A registered NGO working to lift Nepal's most<br />vulnerable communities out of poverty.
            </p>
            <div className="footer-reg">
              <span className="reg-badge">🏛 SWC Registered</span>
              <span className="reg-badge">✅ NGO Federation Member</span>
            </div>
          </div>
          <div className="footer-col">
            <h5 className="footer-col-head">Our Work</h5>
            {["Education", "Clean Water", "Women Empowerment", "Disaster Relief", "Child Health"].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <h5 className="footer-col-head">Get Involved</h5>
            {["Donate", "Volunteer", "Corporate CSR", "Partner With Us", "Spread the Word"].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <h5 className="footer-col-head">Resources</h5>
            {["Annual Reports", "Financials", "News & Blog", "Media Kit", "Contact"].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Sewa Nepal Pvt. Ltd. · Kathmandu, Nepal · All rights reserved · 80G Tax Exempt
          </p>
        </div>
      </footer>

    </div>
  );
}