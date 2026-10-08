/**
 * M90 TECHNOLOGIES — GIS & Urban Infrastructure Interactive Simulation
 * Showcases M90's flagship GIS Property Tax & Municipal Infrastructure workflow.
 */

const PARCEL_DATA = [
  {
    id: 'M90-GIS-0104',
    name: 'Freedom Commercial Complex',
    type: 'Commercial',
    category: 'commercial',
    landArea: '14,200 sq.ft',
    builtUpArea: '38,500 sq.ft',
    floors: 'G + 4 Floors',
    taxAssessed: '₹ 4,82,000 / yr',
    status: 'Assessed & Verified',
    statusClass: 'status-assessed',
    leakageSaved: '₹ 1,12,000 (Added Unassessed 3rd Floor)',
    utilities: '11kV Dedicated Line, STP Connected',
    treesGeoTagged: '18 Native Trees'
  },
  {
    id: 'M90-GIS-0208',
    name: 'Akashwani Residential Enclave',
    type: 'Residential High-Rise',
    category: 'residential',
    landArea: '22,000 sq.ft',
    builtUpArea: '56,000 sq.ft',
    floors: 'Stilt + 7 Floors',
    taxAssessed: '₹ 3,45,000 / yr',
    status: 'Assessed & Verified',
    statusClass: 'status-assessed',
    leakageSaved: '₹ 45,000 (Corrected Carpet Ratio)',
    utilities: 'Municipal Faucet Grid, ESR Linked',
    treesGeoTagged: '32 Canopy Trees'
  },
  {
    id: 'M90-GIS-0312',
    name: 'MIDC Precision Tech Park',
    type: 'Industrial / Tech',
    category: 'commercial',
    landArea: '45,000 sq.ft',
    builtUpArea: '42,000 sq.ft',
    floors: 'G + 2 Floors',
    taxAssessed: '₹ 8,90,000 / yr',
    status: 'Assessed & Verified',
    statusClass: 'status-assessed',
    leakageSaved: '₹ 2,40,000 (Commercial Tariff Regularized)',
    utilities: '33kV Substation Line, Rainwater Harvesting',
    treesGeoTagged: '45 Geo-tagged Species'
  },
  {
    id: 'M90-GIS-0420',
    name: 'Civic Central Hospital & Clinic',
    type: 'Institutional',
    category: 'infrastructure',
    landArea: '18,500 sq.ft',
    builtUpArea: '28,000 sq.ft',
    floors: 'G + 3 Floors',
    taxAssessed: '₹ 1,20,000 / yr (Exempt Rate)',
    status: 'Verified Institutional',
    statusClass: 'status-assessed',
    leakageSaved: 'Zero Dispute Record',
    utilities: 'Dual Power Feed, Water Recycling Plant',
    treesGeoTagged: '14 Geo-tagged Trees'
  },
  {
    id: 'M90-GIS-0518',
    name: 'Urban Green Belt & Bio-Zone',
    type: 'Public Environmental Asset',
    category: 'environment',
    landArea: '85,000 sq.ft',
    builtUpArea: '1,200 sq.ft (Pavilion)',
    floors: 'Ground Only',
    taxAssessed: 'Public Green Commons',
    status: 'Biodiversity Registered',
    statusClass: 'status-assessed',
    leakageSaved: 'Carbon Sequestration: 42 Tons/yr',
    utilities: 'Micro-Drip Irrigation, Solar Lighting',
    treesGeoTagged: '184 Trees Tagged in PBR'
  },
  {
    id: 'M90-GIS-0699',
    name: 'Phase-2 Sub-Station & Water ESR',
    type: 'Public Infrastructure',
    category: 'infrastructure',
    landArea: '12,000 sq.ft',
    builtUpArea: '4,500 sq.ft',
    floors: 'Elevated Tank Structure',
    taxAssessed: 'Municipal Utility Asset',
    status: 'SCADA Integrated',
    statusClass: 'status-assessed',
    leakageSaved: 'Water Pressure Loss Reduced 28%',
    utilities: 'High Capacity Feeder, Filtration Plant',
    treesGeoTagged: '8 Buffer Trees'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initGisSimulator();
});

function initGisSimulator() {
  const parcelCells = document.querySelectorAll('.gis-parcel-cell');
  const filterBtns = document.querySelectorAll('.gis-filter-btn');

  if (!parcelCells.length) return;

  // Parcel selection handler
  parcelCells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      parcelCells.forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      const dataIndex = cell.getAttribute('data-parcel-index') || index;
      renderInspector(PARCEL_DATA[dataIndex]);
    });
  });

  // Filter handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      parcelCells.forEach((cell, index) => {
        const cat = cell.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          cell.style.display = 'block';
        } else {
          cell.style.display = 'none';
        }
      });
    });
  });

  // Load first parcel by default
  renderInspector(PARCEL_DATA[0]);
}

function renderInspector(parcel) {
  if (!parcel) return;

  const idEl = document.getElementById('inspect-id');
  const nameEl = document.getElementById('inspect-name');
  const typeEl = document.getElementById('inspect-type');
  const landEl = document.getElementById('inspect-land');
  const builtEl = document.getElementById('inspect-built');
  const taxEl = document.getElementById('inspect-tax');
  const savedEl = document.getElementById('inspect-leakage');
  const utilEl = document.getElementById('inspect-util');
  const treeEl = document.getElementById('inspect-trees');

  if (idEl) idEl.textContent = parcel.id;
  if (nameEl) nameEl.textContent = parcel.name;
  if (typeEl) typeEl.textContent = `${parcel.type} (${parcel.floors})`;
  if (landEl) landEl.textContent = parcel.landArea;
  if (builtEl) builtEl.textContent = parcel.builtUpArea;
  if (taxEl) taxEl.textContent = parcel.taxAssessed;
  if (savedEl) savedEl.textContent = parcel.leakageSaved;
  if (utilEl) utilEl.textContent = parcel.utilities;
  if (treeEl) treeEl.textContent = parcel.treesGeoTagged;
}
