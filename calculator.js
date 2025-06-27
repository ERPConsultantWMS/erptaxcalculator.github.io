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

  // Start building result HTML
  let html = `
    <p>Your annual hidden <strong>ERP Tax</strong> is:</p>
    <p style="font-size: 32px; color: #e35467;">$${total.toLocaleString()}</p>
  `;

  // Minimum-value checks
  const notes = [];
  if (L1 === 1000) {
    notes.push(
      `• **License cost at $1 000/user** is unrealistically low. Industry averages start around $7 200–9 000/user annually.`
    );
  }
  if (M === 0.05) {
    notes.push(
      `• **Maintenance at 5%** is not feasible—OEM rates start at ~18–22% (SAP/Oracle) and third-party support around 9–11% of list price.`
    );
  }
  if (Tm === 0) {
    notes.push(
      `• **Zero support tickets/month** is fantasy; even top IT shops log ~0.3 tickets/user/month on average.`
    );
  }
  if (CRn === 0) {
    notes.push(
      `• **Zero change requests/year** doesn’t reflect reality; expect at least 1–2 tweaks per user annually.`
    );
  }
  if (Ct === 5) {
    notes.push(
      `• **$5 per ticket** is below benchmarks—the average support ticket costs ~$16 to resolve.`
    );
  }
  if (Cc === 100) {
    notes.push(
      `• **$100 per change request** is too low; typical ERP consultants bill $150–350/hr, making a single change request cost at least ~$250.`
    );
  }

  // Maximum-value checks (prepare for expansion)
  if (L1 === 20000) {
    notes.push(
      `• At **$20 000/user**, you’re near the high end of enterprise licenses (e.g., Oracle). Double-check you need that tier.`
    );
  }
  if (M === 0.50) {
    notes.push(
      `• **50% maintenance** would be crippling—likely a configuration error.`
    );
  }
  // …you can add more max checks here…

  // Append notes if any
  if (notes.length) {
    html += `<div class="analysis"><h3>Reality Check:</h3><ul>`;
    notes.forEach(n => html += `<li>${n}</li>`);
    html += `</ul></div>`;
  }

  // Render
  document.getElementById('result').innerHTML = html;
});
