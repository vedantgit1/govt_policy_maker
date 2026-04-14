import { useState, useEffect } from 'react';
import { askIndiaAI } from '../services/ai';
import {
    Bell,
    Menu,
    Search,
    LogOut,
    Cpu,
    FileText,
    TrendingUp,
    AlertTriangle,
    Users,
    Building,
    Send,
    Lightbulb,
    Briefcase,
    PieChart,
    Activity,
    ShieldCheck,
    Landmark,
    Scale,
    History as HistoryIcon
} from 'lucide-react';

// --- Types ---
interface Anomaly {
    id: number;
    district: string;
    scheme: string;
    amount: string;
    risk: 'High' | 'Medium' | 'Low';
    desc: string;
}

// --- Components ---

const Sidebar = ({ active, setActive }: { active: string, setActive: (v: string) => void }) => {
    const menuItems = [
        { id: 'overview', label: 'National Dashboard', icon: <Landmark size={20} /> },
        { id: 'simulator', label: 'Policy Simulator', icon: <Lightbulb size={20} /> },
        { id: 'msme', label: 'MSME Growth AI', icon: <Briefcase size={20} /> },
        { id: 'financial_inclusion', label: 'Credit & Inclusion', icon: <Users size={20} /> },
        { id: 'fraud', label: 'Fraud Elimination', icon: <ShieldCheck size={20} /> },
        { id: 'reports', label: 'Intelligence Reports', icon: <FileText size={20} /> },
    ];

    return (
        <div style={{ width: '260px', background: '#002f6c', color: 'white', height: '100vh', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 100 }}>
            {/* Header */}
            <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg" alt="GOI" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
                <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>IndiaAI</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>Sovereign Intel Cloud</div>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontWeight: 600 }}>Economic Suite</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActive(item.id)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    background: active === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    border: 'none',
                                    color: active === item.id ? '#f97316' : 'rgba(255,255,255,0.7)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>AS</div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Amit Sharma</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Joint Secretary, MeitY</div>
                    </div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <LogOut size={16} /> Secure Logout
                </button>
            </div>
        </div>
    );
};

const Header = () => (
    <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 90 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <Menu size={20} />
            <span style={{ fontSize: '0.9rem' }}>Ministry of Electronics & IT / <span style={{ color: '#002f6c', fontWeight: 600 }}>Economic Dashboard</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                    type="text"
                    placeholder="Search schemes, files, or districts..."
                    style={{ padding: '0.5rem 1rem 0.5rem 2.2rem', borderRadius: '6px', border: '1px solid #e2e8f0', width: '300px', fontSize: '0.9rem' }}
                />
            </div>
            <div style={{ position: 'relative' }}>
                <Bell size={20} style={{ color: '#64748b' }} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
            </div>
        </div>
    </header>
);

const KPICard = ({ title, val, trend, trendUp, icon, color }: any) => (
    <div className="gov-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{title}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b' }}>{val}</div>
            </div>
            <div style={{ padding: '0.75rem', background: `${color}15`, borderRadius: '8px', color: color }}>
                {icon}
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: trendUp ? '#22c55e' : '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span style={{ color: '#94a3b8' }}>vs last month</span>
        </div>
    </div>
);

// --- Reusable Components ---

const GovChatbot = ({ contextStr }: { contextStr: string }) => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Ready to assist. " + (contextStr.includes('GDP') ? "I have the latest Macro-Economic data loaded." : "I am calibrated for Policy Impact Analysis.")
        }
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Real Gemini AI Logic with specific context
        // We pass the page context so it answers correctly (e.g. knowing we are in Simulator)
        const fullContext = {
            page_context: contextStr,
            user_role: "Joint Secretary"
        };

        const botResponse = await askIndiaAI(input, fullContext);

        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
        setIsTyping(false);
    };

    return (
        <div className="gov-card" style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px' }}>
            {/* Chat Header */}
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', padding: '0.5rem', borderRadius: '6px', color: 'white' }}>
                        <Cpu size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem' }}>NITI-AI Policy Advisor</h3>
                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Sovereign Intelligence Engine</p>
                    </div>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', background: '#ecfdf5', color: '#059669', borderRadius: '99px', fontWeight: 600 }}>Online</span>
            </div>

            {/* Chat History */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.5rem' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                        <div style={{
                            width: '28px', height: '28px',
                            background: msg.sender === 'bot' ? '#002f6c' : '#64748b',
                            borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {msg.sender === 'bot' ? <Cpu size={16} color="white" /> : <Users size={16} color="white" />}
                        </div>
                        <div style={{
                            background: msg.sender === 'bot' ? 'white' : '#002f6c',
                            color: msg.sender === 'bot' ? '#334155' : 'white',
                            padding: '1rem',
                            borderRadius: msg.sender === 'bot' ? '0 12px 12px 12px' : '12px 0 12px 12px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            fontSize: '0.9rem', lineHeight: '1.5',
                            border: msg.sender === 'bot' ? '1px solid #f1f5f9' : 'none',
                            maxWidth: '85%'
                        }}>
                            {/* Render simple markdown-like bolding */}
                            {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '28px', height: '28px', background: '#002f6c', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Cpu size={16} color="white" />
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '0 12px 12px 12px', color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            Reasoning...
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type command..."
                    style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
                />
                <button onClick={handleSend} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: '#002f6c', border: 'none', color: 'white', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', display: 'flex' }}><Send size={16} /></button>
            </div>
        </div>
    );
};

// --- 1. National Economic Intelligence Engine ---
const NationalDashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Top KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <KPICard title="Real-time GDP" val="₹296.3L Cr" trend="7.2%" trendUp={true} color="#3b82f6" icon={<Activity size={24} />} />
                <KPICard title="Inflation (CPI)" val="5.1%" trend="0.3%" trendUp={false} color="#f97316" icon={<TrendingUp size={24} />} />
                <KPICard title="Tax Revenue" val="₹18.2L Cr" trend="12.5%" trendUp={true} color="#22c55e" icon={<Landmark size={24} />} />
                <KPICard title="Active MSMEs" val="6.3 Cr" trend="4.8%" trendUp={true} color="#8b5cf6" icon={<Building size={24} />} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Active Leakage Alerts */}
                    <div className="gov-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem' }}>Active Leakage Alerts</h3>
                            <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View All Reports</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>District</th>
                                    <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Scheme</th>
                                    <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Risk Amount</th>
                                    <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1023, district: 'Kishanganj, Bihar', scheme: 'PM Awas Yojana', amount: '₹2.4 Cr', risk: 'High' },
                                    { id: 1024, district: 'Dhule, Maharashtra', scheme: 'MNREGA', amount: '₹85 L', risk: 'Medium' },
                                ].map((row) => (
                                    <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{row.district}</td>
                                        <td style={{ padding: '1rem', color: '#475569' }}>{row.scheme}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{row.amount}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <button style={{ color: '#002f6c', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Investigate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gov-card">
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Crisis Alerts</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <AlertTriangle size={18} color="#ef4444" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Onion Price Spike</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Nashik region supply down 15%. Projected CPI impact +0.2%.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: AI Chatbot */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <GovChatbot contextStr="Macro Economic Dashboard. GDP: 296.3L Cr, Inflation: 5.1%" />
                </div>
            </div>
        </div>
    );
};

// --- 2. Smart Policy Simulator (Enterprise Grade) ---
const PolicySimulator = () => {
    // Core State
    const [sector, setSector] = useState('infra');
    const [region, setRegion] = useState('pan_india');
    const [allocation, setAllocation] = useState(50000);
    const [beneficiaries, setBeneficiaries] = useState(50);
    const [duration, setDuration] = useState(5); // Years
    const [compareMode, setCompareMode] = useState(false);
    const [ruralPct, setRuralPct] = useState<number | null>(null);

    // AI State
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);

    // Configuration
    const SECTORS: any = {
        infra: { label: 'Infrastructure', gdpMult: 3.2, jobMult: 12, inflationBase: 0.15, risk: 'Low', taxRoI: 2.1, history: '2017 Highway Expansion (+1.4% GDP)', rural: 40, urban: 60, color: '#3b82f6' },
        welfare: { label: 'Direct Welfare', gdpMult: 0.9, jobMult: 0, inflationBase: 0.55, risk: 'Low', taxRoI: 0.3, history: '2020 Food Security Act (Poverty -4%)', rural: 70, urban: 30, color: '#22c55e' },
        pli: { label: 'Manufacturing (PLI)', gdpMult: 2.8, jobMult: 25, inflationBase: 0.25, risk: 'Medium', taxRoI: 1.8, history: '2021 Electronics PLI (+4L Jobs)', rural: 20, urban: 80, color: '#f97316' },
        agri: { label: 'Agri-Tech Modernization', gdpMult: 1.6, jobMult: 35, inflationBase: 0.12, risk: 'High', taxRoI: 1.2, history: '2015 Soil Health Mission (Yield +6%)', rural: 95, urban: 5, color: '#8b5cf6' },
        defence: { label: 'Defence Indigenization', gdpMult: 1.4, jobMult: 8, inflationBase: 0.08, risk: 'Low', taxRoI: 0.9, history: '2022 Defence Corridor (Exports +20%)', rural: 30, urban: 70, color: '#ef4444' }
    };

    const REGIONS: any = {
        pan_india: { label: 'Pan India', mult: 1.0 },
        mh: { label: 'Maharashtra', mult: 1.25 },
        br: { label: 'Bihar', mult: 0.8 },
        ka: { label: 'Karnataka', mult: 1.15 },
        ne: { label: 'North East', mult: 0.9 }
    };

    // Derived Calculations (Live Engine)
    const activeSector = SECTORS[sector];
    const activeRegion = REGIONS[region];
    
    // Auto-sync rural split if sector changes
    useEffect(() => setRuralPct(null), [sector]);
    const actualRural = ruralPct !== null ? ruralPct : activeSector.rural;
    const actualUrban = 100 - actualRural;

    const [metrics, setMetrics] = useState({
        gdp: 45000,
        jobs: 320000,
        tax: 8500,
        inf: 0.12,
        roi: 1.8,
        risk: 'Low',
        conf: 85
    });
    const [loadingMetrics, setLoadingMetrics] = useState(false);

    useEffect(() => {
        const fetchMetrics = async () => {
            setLoadingMetrics(true);
            try {
                const res = await fetch("/api/n8n/webhook/policy-simulate-live", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sector: activeSector.label,
                        region: activeRegion.label,
                        budget_cr: allocation,
                        beneficiaries_lakh: beneficiaries,
                        time_horizon_years: duration,
                        rural_pct: actualRural
                    })
                });
                const data = await res.json();
                if (data && typeof data === 'object') {
                    setMetrics({
                        gdp: Number(data.gdp_increase_cr) || 0,
                        jobs: Number(data.jobs_created) || 0,
                        tax: Number(data.tax_return_cr) || 0,
                        inf: Number(data.inflation_pct) || 0,
                        roi: Number(data.efficiency) || 0,
                        risk: data.risk || 'Low',
                        conf: Number(data.confidence_pct) || 0
                    });
                }
            } catch (error) {
                console.error("Webhook Error", error);
            } finally {
                setLoadingMetrics(false);
            }
        };

        const timeout = setTimeout(fetchMetrics, 500);
        return () => clearTimeout(timeout);
    }, [sector, region, allocation, beneficiaries, duration]);

    // Baseline (2024-Q3)
    const baseline = { gdp: 50000, jobs: 300000, tax: 9500, inf: 0.14, roi: 1.8 };

    const runAISimulation = async () => {
        setLoadingAI(true);
        const prompt = `
            Analyze this policy scenario for the Government of India:
            Sector: ${activeSector.label}
            Region: ${activeRegion.label}
            Budget: ₹${allocation} Cr covering ${beneficiaries} Lakh Citizens over ${duration} Years
            
            Simulated Outcomes:
            - GSDP Value Add: ₹${metrics.gdp.toLocaleString()} Cr
            - Jobs Created: ${metrics.jobs.toLocaleString()}
            - Inflation Impact: ${metrics.inf}%
            
            Provide a High-Level Strategic Assessment (3 bullet points) focusing on long-term viability and political risk.
        `;
        const response = await askIndiaAI(prompt, { page: 'simulator' });
        setAiAnalysis(response);
        setLoadingAI(false);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)', gap: '2rem' }}>
            {/* Left Column: Interactive Controls & Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* 1. Control Panel */}
                <div className="gov-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '8px', color: '#1d4ed8' }}>
                                <Scale size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', color: '#1e293b' }}>Policy Lab</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Configure parameters to simulate economic impact.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: compareMode ? '#002f6c' : '#64748b' }}>Comparison Mode</span>
                            <div
                                onClick={() => setCompareMode(!compareMode)}
                                style={{ width: '40px', height: '22px', background: compareMode ? '#002f6c' : '#cbd5e1', borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
                            >
                                <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: compareMode ? '21px' : '3px', transition: '0.3s' }} />
                            </div>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Focus Sector</label>
                            <select
                                value={sector} onChange={(e) => setSector(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#334155' }}
                            >
                                {Object.entries(SECTORS).map(([key, val]: any) => <option key={key} value={key}>{val.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Target Region</label>
                            <select
                                value={region} onChange={(e) => setRegion(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#334155' }}
                            >
                                {Object.entries(REGIONS).map(([key, val]: any) => <option key={key} value={key}>{val.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Time Horizon</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input type="range" min="1" max="10" step="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={{ flex: 1, accentColor: '#475569' }} />
                                <span style={{ fontWeight: 700, minWidth: '30px' }}>{duration}Y</span>
                            </div>
                        </div>
                    </div>

                    {/* Sliders */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: '#334155' }}>Budget Allocation</label>
                                <span style={{ fontWeight: 700, color: '#002f6c' }}>₹{allocation.toLocaleString()} Cr</span>
                            </div>
                            <input type="range" min="1000" max="100000" step="1000" value={allocation} onChange={(e) => setAllocation(Number(e.target.value))} style={{ width: '100%', accentColor: '#002f6c', height: '6px' }} />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: '#334155' }}>Target Beneficiaries</label>
                                <span style={{ fontWeight: 700, color: '#002f6c' }}>{beneficiaries} Lakhs</span>
                            </div>
                            <input type="range" min="1" max="100" step="1" value={beneficiaries} onChange={(e) => setBeneficiaries(Number(e.target.value))} style={{ width: '100%', accentColor: '#002f6c', height: '6px' }} />
                        </div>
                    </div>

                    {/* Smart Suggestion (Dynamic) */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', marginBottom: '1rem' }}>
                        <Lightbulb size={18} color="#16a34a" />
                        <span style={{ fontSize: '0.9rem', color: '#15803d', fontWeight: 500 }}>
                            <strong>Smart Tip:</strong> Based on 2024 trends, increasing allocation to <strong>Agri-Tech</strong> by 15% yields higher rural employment than basic Infra.
                        </span>
                    </div>
                </div>

                {/* 2. Live Impact Preview (The Results) */}
                <div style={{ display: 'grid', gridTemplateColumns: compareMode ? '1fr 1fr' : '1fr', gap: '1rem' }}>

                    {/* Primary Results */}
                    <div className="gov-card" style={{ borderTop: `4px solid ${activeSector.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h4 style={{ textTransform: 'uppercase', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>Projected Impact (Scenario A)</h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>{activeSector.risk} Risk</span>
                                <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#047857', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>{metrics.conf}% Conf</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem', opacity: loadingMetrics ? 0.5 : 1, transition: '0.3s' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>GSDP Value Add</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#334155' }}>₹{(metrics.gdp / 1000).toFixed(1)}K Cr</div>
                                <div style={{ fontSize: '0.8rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><TrendingUp size={14} /> ₹{(metrics.gdp * 1.5).toLocaleString()} ROI</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Jobs Created</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#334155' }}>{metrics.jobs.toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Direct & Indirect</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Tax Return</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>₹{metrics.tax.toLocaleString()} Cr</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Inflation</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: metrics.inf > 1 ? '#ef4444' : '#f59e0b' }}>+{metrics.inf}%</div>
                            </div>
                        </div>

                        {/* Efficiency Meter */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                                <span>Budget Efficiency</span>
                                <span>₹1 invested = ₹{metrics.roi} Return</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${Math.min(100, metrics.roi * 20)}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}></div>
                            </div>
                        </div>

                        {/* Beneficiary Split (Editable Chart) */}
                        <div style={{ position: 'relative', width: '100%', height: '8px', borderRadius: '4px', overflow: 'hidden', background: '#f59e0b', marginBottom: '0.5rem' }}>
                            <div style={{ width: `${actualRural}%`, background: '#22c55e', height: '100%', pointerEvents: 'none' }}></div>
                            <input 
                                type="range" min="0" max="100" value={actualRural} onChange={(e) => setRuralPct(Number(e.target.value))} 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize' }} 
                                title="Drag to adjust Rural vs Urban Split"
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> Rural ({actualRural}%)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} /> Urban ({actualUrban}%)</span>
                        </div>
                    </div>

                    {/* Comparison Baseline (Only visible in Compare Mode) */}
                    {compareMode && (
                        <div className="gov-card" style={{ borderTop: '4px solid #94a3b8', background: '#f8fafc', opacity: 0.9 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>Baseline (Previous Qtr)</h4>
                                <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>Ref: 2024-Q3</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>GSDP</div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#64748b' }}>₹{(baseline.gdp / 1000).toFixed(1)}K Cr</div></div>
                                <div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Jobs</div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#64748b' }}>{baseline.jobs.toLocaleString()}</div></div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                                Comparison shows your new scenario generates <strong>₹{(metrics.gdp - baseline.gdp).toLocaleString()} Cr more value</strong> than the baseline.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: AI Analysis & Chat */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Historical Context Card */}
                <div className="gov-card" style={{ background: '#fff', borderLeft: '4px solid #8b5cf6' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#7c3aed', marginBottom: '0.5rem' }}>
                        <HistoryIcon size={16} /> Historical Reference
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#334155' }}>
                        {activeSector.history}
                    </p>
                </div>

                {/* AI Deep Analysis */}
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                                <Cpu size={18} color="#38bdf8" /> Deep Strategy Analysis
                            </h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '80px' }}>
                            {aiAnalysis || "AI is ready. Adjust parameters or click 'Analyze' to generate a strategic risk assessment report for this specific configuration."}
                        </p>
                        <button
                            onClick={runAISimulation}
                            disabled={loadingAI}
                            style={{ width: '100%', padding: '0.75rem', background: loadingAI ? '#1e293b' : '#38bdf8', color: loadingAI ? '#94a3b8' : '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: '0.2s' }}
                        >
                            {loadingAI ? 'Generating Report...' : 'Analyze Strategic Risk'}
                        </button>
                    </div>
                </div>

                {/* Chatbot (Contextual) */}
                <GovChatbot contextStr={`Simulator: ${activeSector.label} | ₹${allocation}Cr | ${region} | ${duration}Y`} />
            </div>
        </div >
    );
};

// --- 4. MSME & Startup Growth AI ---
const MSMEGrowthAI = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div className="gov-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={20} color="#3b82f6" /> AI CFO for MSMEs
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="btn btn-primary" style={{ justifyContent: 'flex-start', background: '#eff6ff', color: '#1d4ed8' }}>
                        <PieChart size={16} style={{ marginRight: '10px' }} /> Cashflow Forecasting
                    </button>
                    <button className="btn btn-primary" style={{ justifyContent: 'flex-start', background: '#f0fdf4', color: '#15803d' }}>
                        <Activity size={16} style={{ marginRight: '10px' }} /> Loan Readiness Score
                    </button>
                    <button className="btn btn-primary" style={{ justifyContent: 'flex-start', background: '#fffbeb', color: '#b45309' }}>
                        <FileText size={16} style={{ marginRight: '10px' }} /> Automated Tax Filer
                    </button>
                </div>
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                    "Your inventory turnover is low. AI recommends reducing stock by 15% to free up ₹2 Lakhs working capital."
                </div>
            </div>

            <div className="gov-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Credit & Market Opportunities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Recommended Loan</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#002f6c', marginBottom: '0.5rem' }}>₹15 Lakhs</div>
                        <div style={{ fontSize: '0.9rem' }}>Mudra Yojana (Sishu)</div>
                        <div style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600, marginTop: '0.5rem' }}>92% Approval Chance</div>
                    </div>
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Demand Prediction</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#002f6c', marginBottom: '0.5rem' }}>TEXTILES</div>
                        <div style={{ fontSize: '0.9rem' }}>High demand in EU Market</div>
                        <button style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Apply for Export License →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 5. Fraud & Leakage Elimination --- (Reuse existing AnomaliesTable logic)
const FraudElimination = () => {
    // ... logic from previous visual ...
    const data: Anomaly[] = [
        { id: 1023, district: 'Kishanganj, Bihar', scheme: 'PM Awas Yojana', amount: '₹2.4 Cr', risk: 'High', desc: 'Cluster of 400 beneficiaries share same mobile number.' },
        { id: 1024, district: 'Dhule, Maharashtra', scheme: 'MNREGA', amount: '₹85 L', risk: 'Medium', desc: 'Work hours claimed exceed daylight hours.' },
    ];

    return (
        <div className="gov-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} color="#dc2626" /> Zero-Trust Fraud Detection
            </h3>
            {/* Same table structure */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Target</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Scheme</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Leakage Amt</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Flag</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>AI Insight</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '1rem', fontWeight: 600 }}>{row.district}</td>
                            <td style={{ padding: '1rem', color: '#475569' }}>{row.scheme}</td>
                            <td style={{ padding: '1rem', fontWeight: 600 }}>{row.amount}</td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    background: row.risk === 'High' ? '#fef2f2' : '#fffbeb',
                                    color: row.risk === 'High' ? '#ef4444' : '#d97706',
                                    border: row.risk === 'High' ? '1px solid #fecaca' : '1px solid #fde68a'
                                }}>
                                    {row.risk}
                                </span>
                            </td>
                            <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#475569', maxWidth: '250px' }}>{row.desc}</td>
                            <td style={{ padding: '1rem' }}>
                                <button style={{ color: '#002f6c', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Auto-Freeze</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div style={{ background: '#f1f5f9', minHeight: '100vh', paddingLeft: '260px' }}>
            <Sidebar active={activeTab} setActive={setActiveTab} />
            <Header />

            <main style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>
                        {activeTab === 'overview' && 'National Economic Intelligence'}
                        {activeTab === 'simulator' && 'Smart Policy Simulator'}
                        {activeTab === 'msme' && 'MSME & Startup Growth AI'}
                        {activeTab === 'fraud' && 'Fraud Elimination System'}
                    </h1>
                    <p style={{ color: '#64748b' }}>
                        {activeTab === 'overview' ? 'Real-time monitoring of India\'s economic health and sector risks.' : 'Advanced AI tools for governance and financial inclusion.'}
                    </p>
                </div>

                {activeTab === 'overview' && <NationalDashboard />}
                {activeTab === 'simulator' && <PolicySimulator />}
                {activeTab === 'msme' && <MSMEGrowthAI />}
                {activeTab === 'fraud' && <FraudElimination />}

                {/* Placeholder for other tabs */}
                {(activeTab !== 'overview' && activeTab !== 'simulator' && activeTab !== 'msme' && activeTab !== 'fraud') && (
                    <div className="gov-card" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                        <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Module Under Development</h3>
                        <p>This component of the Sovereign Intelligent Cloud is coming in Phase 2.</p>
                    </div>
                )}

            </main>
        </div>
    );
};
