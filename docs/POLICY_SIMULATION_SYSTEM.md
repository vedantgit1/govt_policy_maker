# Policy Simulation System — Data & Process Overview

## 🎯 Goal
Transform policy inputs into real economic impact decisions using structured economic datasets and current economy indicators.

## 🗂 Data Sources (Google Sheets as Database)
The system uses six structured data tables:

### 1️⃣ sector_multipliers — Sector economic behavior
| Column | Meaning |
|---|---|
| `sector` | Policy area (Infrastructure, MSME, etc.) |
| `gdp_multiplier` | Output boost per ₹ spent |
| `job_cost_cr` | Cost to generate one job |
| `inflation_sensitivity` | Price pressure factor |
| `notes` | Reference info |
**📌 Defines how each sector impacts growth and jobs.**

### 2️⃣ regional_productivity — Regional efficiency
| Column | Meaning |
|---|---|
| `region` | State or country |
| `productivity_factor` | Economic output efficiency |
| `base_gsdp_cr` | Current economic size |
| `population_m` | Population |
**📌 Adjusts policy impact by region.**

### 3️⃣ tax_ratios — Fiscal return
| Column | Meaning |
|---|---|
| `region` | State/country |
| `effective_tax_rate` | Avg tax capture rate |
**📌 Converts growth into government revenue.**

### 4️⃣ inflation_capacity — Supply strength
| Column | Meaning |
|---|---|
| `region` | State/country |
| `supply_capacity_index` | Ability to absorb demand |
**📌 Controls inflation response.**

### 5️⃣ inflation_data — Current economy snapshot
| Column | Meaning |
|---|---|
| `date` | Release date |
| `inflation_rate` | Latest CPI |
**📌 Represents current price pressure in economy.**

### 6️⃣ gdp_data — Current economy size
| Column | Meaning |
|---|---|
| `date` | Period |
| `gdp_current` | Latest GDP/GSDP |
**📌 Represents real baseline economy.**

## ⚙️ System Process Flow

### Step 1 — Receive policy proposal
**From UI:**
```json
{
  "sector": "Infrastructure",
  "region": "Maharashtra",
  "budget_cr": 50000,
  "beneficiaries_lakh": 40,
  "time_horizon_years": 5
}
```
*(Note: Beneficiaries and Time Horizon included for future logic extensions)*

### Step 2 — Load economic reference parameters
**System reads:**
• `sector_multipliers` (Behavior)
• `regional_productivity` (Efficiency)
• `tax_ratios` (Fiscal return)
• `inflation_capacity` (Absorption)

### Step 3 — Load current economy conditions
**System reads latest values from:**
• `inflation_data`
• `gdp_data`

### Step 4 — Perform real economic calculations
1.  **Growth Impact:** `budget × multiplier × productivity`
2.  **Relative Growth:** `impact ÷ current GDP`
3.  **Jobs Created:** `budget ÷ job cost`
4.  **Tax Return:** `impact × tax rate`
5.  **Inflation Pressure:** `base effect × current inflation`

### Step 5 — Risk evaluation
Uses `current inflation` + `added inflation pressure` to classify **Low / Medium / High** risk.

### Step 6 — Send results to dashboard
**Includes:**
• GDP impact
• Jobs created
• Tax return
• Inflation impact
• Risk level
• Current economy snapshot

## 🎯 Why This Structure Works
✔ **Clear data ownership**
✔ **Easy updates**
✔ **Real-time context**
✔ **Scalable modeling**
✔ **Transparent economics**

## ✅ One-Line System Summary
The policy simulation system ingests policy parameters, references structured sector and regional economic datasets, incorporates current inflation and GDP baselines, applies macroeconomic impact formulas, evaluates risk, and returns real-time decision insights.
