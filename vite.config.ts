import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const mockPolicyEnginePlugin = () => ({
  name: 'mock-policy-engine',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === '/api/n8n/webhook/policy-simulate-live' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const payload = JSON.parse(body || '{}');
            const { sector, region, budget_cr, beneficiaries_lakh, time_horizon_years, rural_pct } = payload;
            
            // Replicating macroeconomic formulas natively without an external backend
            const sectorData: any = {
              'Infrastructure': { gdpMult: 3.2, jobMult: 12, infl: 0.15, tax: 0.18, conf: 92 },
              'Direct Welfare': { gdpMult: 0.9, jobMult: 0, infl: 0.55, tax: 0.05, conf: 88 },
              'Manufacturing (PLI)': { gdpMult: 2.8, jobMult: 25, infl: 0.25, tax: 0.22, conf: 85 },
              'Agri-Tech Modernization': { gdpMult: 1.6, jobMult: 35, infl: 0.12, tax: 0.10, conf: 75 },
              'Defence Indigenization': { gdpMult: 1.4, jobMult: 8, infl: 0.08, tax: 0.15, conf: 90 }
            };
            
            const regionData: any = {
              'Pan India': { mult: 1.0 },
              'Maharashtra': { mult: 1.25 },
              'Bihar': { mult: 0.8 },
              'Karnataka': { mult: 1.15 },
              'North East': { mult: 0.9 }
            };
            
            const s = sectorData[sector] || sectorData['Infrastructure'];
            const r = regionData[region] || regionData['Pan India'];
            const budget = Number(budget_cr) || 50000;
            const ben = Number(beneficiaries_lakh) || 50;
            const time = Number(time_horizon_years) || 5;
            
            // ==========================================
            // SOVEREIGN ECONOMIC ENGINE (GOI)
            // ==========================================

            // 1. Capital Density & Saturation Effect
            // Spreading budget across beneficiaries creates a distribution curve. 
            // A median ratio of 1000 Cr per Lakh beneficiaries is baseline 1.0.
            const ratio = budget / ben; 
            const optimal_ratio = 1000;
            const distribution_efficiency = 0.8 + (0.4 * (ratio / (ratio + optimal_ratio))); 
            
            // 2. Time Horizon Compounding
            // Longer policy durations yield higher cumulative GSDP due to economic velocity
            const time_multiplier = 0.5 + (0.1 * time);

            // 3. Rural vs Urban Shift Add-on
            // Rural shifts create more jobs, while urban shifts generate more GDP output & slightly higher inflation
            const rural_factor = rural_pct !== undefined ? (Number(rural_pct) / 100) : 0.5;
            const gdp_rural_adjustment = 0.8 + ((1 - rural_factor) * 0.4); 
            const job_rural_adjustment = 0.8 + (rural_factor * 0.4); 

            // 4. Macroeconomic Value Add
            const gdp_increase_cr = budget * s.gdpMult * r.mult * distribution_efficiency * time_multiplier * gdp_rural_adjustment;

            // 5. Job Creation Velocity
            // Wider beneficiary net = more labor-intensive decentralized administration
            const job_spread_multiplier = 0.8 + (0.4 * (ben / 100));
            const jobs_created = budget * s.jobMult * r.mult * job_spread_multiplier * job_rural_adjustment;

            // 6. Fiscal Return
            const tax_return_cr = gdp_increase_cr * s.tax;

            // 7. Demand-Pull Inflationary Pressure
            // High burn rate (large budget / short time) causes supply constraints -> inflation
            // Wide beneficiary base causes high consumer demand velocity -> inflation
            const annual_burn_rate = budget / time; 
            const baseline_burn_rate = 50000 / 5; // 10,000 Cr/year
            const velocity_factor = 0.8 + (0.4 * (ben / 100));
            const inflation_pct = s.infl * r.mult * (annual_burn_rate / baseline_burn_rate) * velocity_factor * gdp_rural_adjustment;
            
            const efficiency = (gdp_increase_cr / budget).toFixed(2);
            
            let risk = 'Low';
            if (inflation_pct > 0.6) risk = 'High';
            else if (inflation_pct > 0.3) risk = 'Medium';
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              gdp_increase_cr: Math.round(gdp_increase_cr),
              jobs_created: Math.round(jobs_created),
              tax_return_cr: Math.round(tax_return_cr),
              inflation_pct: inflation_pct.toFixed(2),
              efficiency,
              risk,
              confidence_pct: s.conf
            }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockPolicyEnginePlugin()],
})
