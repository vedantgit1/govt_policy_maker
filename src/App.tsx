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
      </div>
    </div>
  </footer>
);

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
