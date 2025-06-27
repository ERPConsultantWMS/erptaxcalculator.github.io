document.getElementById('runCalc').addEventListener('click', () => {
  // Read inputs
  const L1  = +document.getElementById('L1').value;
  const N1  = +document.getElementById('N1').value;
  const M   = +document.getElementById('M').value / 100;
  const Tm  = +document.getElementById('Tm').value;
  const Ct  = +document.getElementById('Ct').value;
  const CRn = +document.getElementById('CRn').value;
  const Cc  = +document.getElementById('Cc').value;

  // Core calculations
  const maintenance = L1 * N1 * M;
  const ticketCost  = Tm * Ct * 12 * N1;
  const changeCost  = CRn * Cc;
  const total       = maintenance + ticketCost + changeCost;

  // Normalize each slider to a 0–1 scale
  const norm = {
    L1:  (L1  - 1000) / (20000 - 1000),
    N1:  (N1  -    1) / (  500 -    1),
    M:  ((M*100) -   5) / (  50 -    5),
    Tm:  (Tm  -    0) / (    5 -    0),
    Ct:  (Ct  -    5) / ( 100 -    5),
    CRn: (CRn -    0) / (   50 -    0),
    Cc:  (Cc  -  100) / (5000 -  100)
  };

  // Compute average severity (0–10)
  const avg = Object.values(norm).reduce((sum, v) => sum + v, 0) / 7;
  const severity = Math.round(avg * 10);

  // Narrative templates 0–10
  const narratives = [
    "You’re at rock-bottom settings—this $50/year scenario is purely hypothetical; real ERPs never operate with such minimal costs.",
    "Barely above zero—your ERP Tax remains toy-like, but even the smallest real environments exceed these figures.",
    "Still negligible—real maintenance and support fees start climbing rapidly in live systems.",
    "Low range—you’re safe for now, but typical costs begin to outpace these values quickly.",
    "Below average—organizations usually see 30–50% higher tax rates than shown here.",
    "Right at industry average—license fees (~$8.9k/user), ~21% maintenance, 0.3 tickets/mo, $16/ticket, 12 changes/yr, $1k/change—this is your true baseline.",
    "Moderately above average—expect to pay measurably more for support and changes once past these mid-tier settings.",
    "High range—you’re inching toward premium tiers; costs accelerate as you approach top market benchmarks.",
    "Very high—your ERP Tax now resembles large-enterprise burdens; extra fees loom large.",
    "Almost maxed out—brace yourself, you’re staring at severe ERP taxation rarely seen outside global deployments.",
    "Max settings—this is the world of Fortune 100 ERP expenditures; maintenance, support, and change costs here are jaw-dropping."
  ];

  // Render result
  document.getElementById('result').innerHTML = `
    <p>Your annual hidden <strong>ERP Tax</strong> is:</p>
    <p style="font-size:32px;color:#e35467;">$${total.toLocaleString()}</p>
    <div class="analysis">
      <h3>Insight (Severity ${severity}/10):</h3>
      <p>${narratives[severity]}</p>
    </div>
  `;
});
