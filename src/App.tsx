import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Cpu,
  Database,
  Zap,
  Users,
  Lightbulb,
  Rocket,
  Scale
} from 'lucide-react';

// --- Sub-Components ---

const AccessibilityBar = () => (
  <div className="accessibility-bar">
    <div className="container accessibility-content">
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="acc-btn">Screen Reader Access</button>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="acc-btn">A-</button>
          <button className="acc-btn">A</button>
          <button className="acc-btn">A+</button>
        </div>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="acc-btn" style={{ background: '#000', color: '#fff', padding: '0 4px', borderRadius: '2px' }}>C</button>
          <button className="acc-btn" style={{ background: '#fff', color: '#000', border: '1px solid #000', padding: '0 4px', borderRadius: '2px' }}>C</button>
        </div>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <select style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
          <option>English</option>
          <option>हिन्दी</option>
        </select>
      </div>
    </div>
  </div>
);



const Hero = () => (
  <header className="hero-section section-padding">
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'center', gap: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-saffron)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
          <Cpu size={20} /> IndiaAI Mission
        </div>
        <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--primary-blue)' }}>
          Building a World-Class <span style={{ color: 'var(--secondary-blue)' }}>AI Ecosystem</span> for India
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
          Leveraging Artificial Intelligence to transform governance, empower citizens, and drive economic growth for a Viksit Bharat by 2047.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">Decision Support Portal</button>
          <button className="btn btn-outline">Explore AI Pillars</button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative' }}
      >
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0, 47, 108, 0.1)',
          border: '1px solid #edf2f7'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>Predictive Analytics</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 700 }}>LIVE UPDATES</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Budget Utilization', val: '94%', color: '#3b82f6' },
              { label: 'Scheme Efficiency', val: '88%', color: '#22c55e' },
              { label: 'Leakage Prevention', val: '98%', color: '#f97316' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span>{stat.label}</span>
                  <span style={{ fontWeight: 700 }}>{stat.val}</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stat.val }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                    style={{ height: '100%', background: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Decision support for 50+ Ministries</p>
          </div>
        </div>
      </motion.div>
    </div>
  </header>
);

const Pillars = () => {
  const pillars = [
    { title: 'Compute Capacity', desc: 'Building high-performance AI compute infrastructure for R&D.', icon: <Cpu /> },
    { title: 'Datasets Platform', desc: 'Centralized access to non-personal government datasets.', icon: <Database /> },
    { title: 'Application Development', desc: 'Promoting AI solutions for social and economic challenges.', icon: <Zap /> },
    { title: 'FutureSkills', desc: 'Upskilling 10 million citizens in AI technologies.', icon: <Users /> },
    { title: 'Innovation Centre', desc: 'Direct support for AI startups and foundational models.', icon: <Lightbulb /> },
    { title: 'Safe & Trusted AI', desc: 'Ensuring ethical, unbiased, and responsible AI usage.', icon: <Scale /> }
  ];

  return (
    <section id="pillars" className="section-padding" style={{ background: 'var(--bg-tint)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The 7 Pillars of IndiaAI</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            Our comprehensive framework to establish India as a global leader in artificial intelligence.
          </p>
        </div>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="gov-card"
            >
              <div className="pillar-icon">{p.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-blue)' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DecisionSupport = () => {
  const [activeTab, setActiveTab] = useState('Hindi');
  const examples = {
    'Hindi': 'पिछले तीन महीनों में उत्तर प्रदेश में मनरेगा बजट का उपयोग क्या रहा है?',
    'English': 'Show me the anomaly report for PDS scheme distribution in Bihar district-wise.',
    'Tamil': 'தமிழ்நாட்டின் தகவல் தொழில்நுட்பக் கொள்கையின் தாக்கம் என்ன?'
  };

  return (
    <section id="support" className="section-padding">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--accent-saffron)', fontWeight: 700, marginBottom: '1rem' }}>GOVERNANCE SUPPORT</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Multilingual Decision Interface</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Optimized for government officers to query national data stores using Bhashini-powered translation and localized LLMs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Rocket style={{ color: 'var(--secondary-blue)' }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>Predictive Budgeting</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI-driven forecasting for direct benefit transfers.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <ShieldAlert style={{ color: 'var(--accent-saffron)' }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>Leakage Detection</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Real-time fraud monitoring for social welfare schemes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gov-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ background: '#f8fafc', padding: '1rem 2rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0' }}>
              {Object.keys(examples).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === lang ? 'var(--primary-blue)' : 'var(--text-muted)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    paddingBottom: '0.5rem',
                    borderBottom: activeTab === lang ? '2px solid var(--primary-blue)' : 'none'
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>QUERY REPRESENTATION</div>
                <p style={{ fontStyle: 'italic', color: 'var(--primary-blue)' }}>"{examples[activeTab as keyof typeof examples]}"</p>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Ask a policy or analytical question..."
                  style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                />
                <button style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                  Analyze
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioBadge = () => (
  <a
    href="https://www.linkedin.com/in/vedant-joshi-a7b276187/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '20px',
      zIndex: 9999,
      background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
      color: '#fff',
      padding: '0.55rem 1rem',
      borderRadius: '999px',
      fontSize: '0.78rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '0.45rem',
      boxShadow: '0 4px 20px rgba(0,119,181,0.45)',
      textDecoration: 'none',
      letterSpacing: '0.02em',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.2)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(0,119,181,0.55)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(0,119,181,0.45)'; }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    Built by Vedant Joshi
  </a>
);

const Footer = () => (
  <footer>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <h4 style={{ fontSize: '1.4rem' }}>IndiaAI</h4>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.8' }}>
            A joint initiative of Ministry of Electronics and IT (MeitY), National e-Governance Division (NeGD) and NASSCOM.
          </p>
        </div>
        <div>
          <h4>Important Links</h4>
          <ul>
            <li><a href="#">IndiaAI Pillars</a></li>
            <li><a href="#">GPAI Partnership</a></li>
            <li><a href="#">Digital India</a></li>
            <li><a href="#">MyGov.in</a></li>
          </ul>
        </div>
        <div>
          <h4>Policies</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Accessibility Statement</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
            Electronics Niketan, 6, CGO Complex, <br />
            Lodhi Road, New Delhi - 110003
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 National AI Portal of India. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg" alt="GOI" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          <img src="https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg" alt="Digital India" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
        </div>
        <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.7rem' }}>Powered by National e-Governance Division (NeGD)</p>
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <p style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            🎓 Portfolio Project — Not an official government website
          </p>
          <a
            href="https://www.linkedin.com/in/vedant-joshi-a7b276187/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #0077b5, #005885)',
              color: '#fff',
              padding: '0.5rem 1.4rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,119,181,0.4)',
              letterSpacing: '0.02em'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Designed & Built by Vedant Joshi
          </a>
          <p style={{ color: '#475569', fontSize: '0.68rem', fontStyle: 'italic' }}>Crafted to demonstrate AI-powered policy intelligence systems</p>
        </div>
      </div>
    </div>
  </footer>
);

const AboutDeveloper = () => {
  const stats = [
    { value: '1.4 Yrs', label: 'Industry Experience' },
    { value: '5+', label: 'Live AI Projects' },
    { value: 'UPSC', label: 'Civil Services Prep' },
    { value: '2 MNCs', label: 'Global Employers' },
  ];

  const experience = [
    {
      role: 'AI Data Specialist',
      org: 'Innodata',
      period: 'Nov 2025 – Present',
      color: '#3b82f6',
      desc: 'Auditing and repairing broken training datasets at scale — stopping AI models from learning on corrupted pipelines before training runs begin.',
    },
    {
      role: 'AI Data Specialist',
      org: 'RWS Group',
      period: 'Sept – Nov 2025',
      color: '#8b5cf6',
      desc: 'Quality gatekeeper for enterprise AI training workflows — transforming raw, multi-source documents into clean, structured training data.',
    },
    {
      role: 'City Operations Lead',
      org: 'Zepto',
      period: 'Oct 2024 – Jan 2025',
      color: '#f97316',
      desc: 'Built and ran floor logistics systems for a high-velocity dark store. Maintained sub-5-minute delivery SLA during extreme peak-hour traffic.',
    },
    {
      role: 'Logistics Supervisor',
      org: 'Schnellecke Jeena Logistics',
      period: 'Feb – June 2024',
      color: '#22c55e',
      desc: 'Supervised automotive supply chain on the production floor — tightened sequencing processes to eliminate bottlenecks and hit delivery precision targets.',
    },
  ];

  const projects = [
    {
      name: 'AI Policy Maker Dashboard',
      stack: 'React · Node.js · Automated API Workflows',
      url: 'govt-policy-maker.vercel.app',
      desc: 'Live policy-making dashboard that bypasses manual legislative research via real-time government data extraction and strategic AI analysis.',
      tag: 'LIVE',
    },
    {
      name: 'Jal Jeevan Mission Audit Dashboard',
      stack: 'D3.js · Data Viz · Policy Analysis',
      url: '',
      desc: 'Interactive visualization tracking the Implementation Gap between allocated funds and actual water project utilization across Maharashtra districts.',
      tag: 'IN DEV',
    },
    {
      name: 'Valkoma AI / NeuraMinds AI',
      stack: 'Cursor · n8n · Make.com · Low-Code',
      url: '',
      desc: 'Founded and built an automation agency prototype deploying AI workflows to eliminate operational bottlenecks for businesses.',
      tag: 'PROTOTYPE',
    },
    {
      name: 'Titan Compressor',
      stack: 'React · Vercel · Single-Page Architecture',
      url: '',
      desc: 'Enterprise-grade video compression tool capable of handling heavy media files at scale in a clean single-page deployment.',
      tag: 'DEPLOYED',
    },
  ];

  return (
    <section id="about" style={{ background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)', padding: '6rem 0' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,47,108,0.08)', borderRadius: '999px', padding: '0.4rem 1.2rem', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>🏗 The Architect Behind This System</span>
          </div>
          <h2 style={{ fontSize: '2.8rem', color: 'var(--primary-blue)', marginBottom: '1rem', lineHeight: 1.15 }}>
            Vedant Joshi
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            Systems Architect & Data Operations Lead — bridging Indian public policy, AI engineering, and real-world execution. Not just research. Not just code. <strong>Both.</strong>
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a
              href="https://www.linkedin.com/in/vedant-joshi-a7b276187/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #0077b5, #005885)', color: '#fff', padding: '0.65rem 1.6rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,119,181,0.3)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ background: 'white', borderRadius: '16px', padding: '1.8rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,47,108,0.08)', border: '1px solid #e8edf8' }}
            >
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-blue)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Two-column: Profile + Experience */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', marginBottom: '4rem', alignItems: 'start' }}>

          {/* Left: Profile */}
          <div>
            <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,47,108,0.08)', border: '1px solid #e8edf8' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '1.2rem' }}>Profile</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                I operate at the intersection of <strong>Indian governance</strong> and <strong>AI systems engineering</strong>. My civil services preparation gave me structural fluency in public policy, regional economics, and state finance. My professional career has been about building the automated pipelines and data systems that make policy strategies measurable and deployable on the ground.
              </p>
              <div style={{ marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Education</h4>
                {[
                  { title: 'Public Policy & Political Consulting', org: 'Rebounce Policy Lab · 2026–Present' },
                  { title: 'Civil Services Preparation', org: 'UPSC · NABARD · SEBI' },
                  { title: 'B.Tech Mechanical Engineering', org: 'Bajaj Institute of Technology, Wardha' },
                ].map((e, i) => (
                  <div key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-blue)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{e.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{e.org}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Core Competencies</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['AI Data Engineering', 'Policy Analysis', 'React / Node.js', 'Pipeline Automation', 'UPSC Polity & Finance', 'D3.js Visualization', 'n8n / Make.com', 'Logistics Systems', 'Cold-chain Ops', 'Political Consulting'].map((skill, i) => (
                    <span key={i} style={{ background: 'rgba(0,47,108,0.07)', color: 'var(--primary-blue)', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Experience Timeline */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Professional Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 1.8rem', boxShadow: '0 2px 16px rgba(0,47,108,0.07)', border: '1px solid #e8edf8', borderLeft: `4px solid ${exp.color}` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>{exp.role}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: exp.color }}>{exp.org}</div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem', textAlign: 'center' }}>Applied AI & Data Architecture Projects</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{ background: 'white', borderRadius: '18px', padding: '2rem', boxShadow: '0 4px 24px rgba(0,47,108,0.08)', border: '1px solid #e8edf8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: p.tag === 'LIVE' ? '#22c55e' : p.tag === 'IN DEV' ? '#f97316' : '#6366f1', background: p.tag === 'LIVE' ? 'rgba(34,197,94,0.1)' : p.tag === 'IN DEV' ? 'rgba(249,115,22,0.1)' : 'rgba(99,102,241,0.1)', padding: '0.2rem 0.7rem', borderRadius: '999px', letterSpacing: '0.08em' }}>{p.tag}</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-blue)', margin: 0 }}>{p.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, fontFamily: 'monospace', background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>{p.stack}</div>
                {p.url && <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: 'var(--secondary-blue)', fontWeight: 700, textDecoration: 'none' }}>↗ {p.url}</a>}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import { Dashboard } from './components/Dashboard';

function App() {
  const [view, setView] = useState('landing');

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="app">
      <AccessibilityBar />
      <nav>
        <div className="container nav-content">
          <div className="logo-group">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg" alt="GOI" style={{ height: '50px' }} />
            <div className="logo-divider"></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', letterSpacing: '-0.5px' }}>IndiaAI</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '-4px' }}>National AI Portal of India</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#pillars">Pillars</a>
            <a href="#support">Decision Support</a>
            <a href="#news">News</a>
            <a href="#resources">Resources</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg" alt="Digital India" style={{ height: '40px' }} />
            <button onClick={() => setView('dashboard')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Officer Login</button>
          </div>
        </div>
      </nav>
      <main>
        <Hero />
        <Pillars />
        <DecisionSupport />
        <AboutDeveloper />
      </main>
      <Footer />
      <PortfolioBadge />
    </div>
  );
}

export default App;
