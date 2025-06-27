document.getElementById('runCalc').addEventListener('click', () => {
  const L1  = +document.getElementById('L1').value;
  const N1  = +document.getElementById('N1').value;
  const M   = +document.getElementById('M').value / 100;
  const Tm  = +document.getElementById('Tm').value;
  const Ct  = +document.getElementById('Ct').value;
  const CRn = +document.getElementById('CRn').value;
  const Cc  = +document.getElementById('Cc').value;

  const maintenance = L1 * N1 * M;
  const ticketCost  = Tm * Ct * 12 * N1;
  const changeCost  = CRn * Cc;
  const total       = maintenance + ticketCost + changeCost;

  document.getElementById('result').innerHTML = `
    <p>Your annual hidden <strong>ERP Tax</strong> is:</p>
    <p style="font-size: 32px; color: #e35467;">$${total.toLocaleString()}</p>
  `;
});

