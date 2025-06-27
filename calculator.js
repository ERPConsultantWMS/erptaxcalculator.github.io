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

  // Collect any reality-check notes
  const notes = [];

  if (L1 === 1000) {
    notes.push(
      `<li><strong>License cost at $1,000/user</strong> is unrealistically low. Industry averages start around $7,200–9,000/user annually.</li>`
    );
  }
  if (M === 0.05) {
    notes.push(
      `<li><strong>Maintenance at 5%</strong> is not feasible—OEM rates start at ~18–22% (SAP/Oracle) and third-party support around 9–11% of list price.</li>`
    );
  }
  if (Tm === 0) {
    notes.push(
      `<li><strong>Zero support tickets/month</strong> is fantasy; even top IT shops log ~0.3 tickets/user/month on average.</li>`
    );
  }
  if (CRn === 0) {
    notes.push(
      `<li><strong>Zero change requests/year</strong> doesn’t reflect reality; expect at least 1–2 tweaks per user annually.</li>`
    );
  }
  if (Ct === 5) {
    notes.push(
      `<li><strong>$5 per ticket</strong> is below benchmarks—the average support ticket costs ~$16 to resolve.</li>`
    );
  }
  if (Cc === 100) {
    notes.push(
      `<li><strong>$100 per change request</strong> is too low; typical ERP consultants bill $150–350/hr, making a single change request cost at least ~$250.</li>`
    );
  }

  // Example max checks
  if (L1 === 20000) {
    notes.push(
      `<li><strong>At $20,000/user</strong>, you’re near the high end of enterprise licenses (e.g., Oracle). Double-check you need that tier.</li>`
    );
  }
  if (M === 0.50) {
    notes.push(
      `<li><strong>50% maintenance</strong> would be crippling—likely a configuration error.</li>`
    );
  }

  // Append notes if any
  if (notes.length) {
    html += `<div class="analysis"><h3>Reality Check:</h3><ul>`;
    html += notes.join("");
    html += `</ul></div>`;
  }

  // Render
  document.getElementById('result').innerHTML = html;
});

