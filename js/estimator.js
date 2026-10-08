/**
 * M90 TECHNOLOGIES — Project Scope & Scope Estimator
 * Allows government & enterprise clients to interactively size and scope infrastructure / IT projects.
 */

const ESTIMATOR_PROFILES = {
  'gis-tax': {
    title: 'GIS Property Tax & Municipal Cadastral Survey',
    unitName: 'Properties / Parcels',
    min: 5000,
    max: 250000,
    step: 5000,
    defaultVal: 25000,
    phases: '3 Phases (Drone/Satellite Base, Door-to-Door Geotagging, Web GIS Portal)',
    deliverables: ['Cadastral GIS Map', 'E-Assessment Notices', 'Revenue Dashboard', 'Mobile Collector App'],
    calcTime: (val) => `${Math.max(2, Math.round(val / 15000))} - ${Math.max(4, Math.round(val / 10000))} Months`,
    calcImpact: (val) => `+${Math.round(val * 0.35).toLocaleString()} Potential Unassessed Properties Identified`
  },
  'civil-infra': {
    title: 'Civil Infrastructure, Roads & Urban Works',
    unitName: 'Kilometers / Urban Road Stretch',
    min: 5,
    max: 120,
    step: 5,
    defaultVal: 20,
    phases: '4 Phases (Soil Testing & DPR, Foundation & Earthwork, Pavement Laying, QA & Safety Audit)',
    deliverables: ['DPR & Structural Analysis', 'As-Built CAD Models', 'Drainage & Culvert Networks', 'Traffic Safety Audit'],
    calcTime: (val) => `${Math.max(3, Math.round(val * 0.4))} - ${Math.max(6, Math.round(val * 0.7))} Months`,
    calcImpact: (val) => `~${(val * 12500).toLocaleString()} Commuters daily transit capacity`
  },
  'water-stp': {
    title: 'Water Supply, Filtration & Sewage Treatment (STP)',
    unitName: 'MLD (Million Litres / Day) Capacity',
    min: 2,
    max: 50,
    step: 2,
    defaultVal: 10,
    phases: '4 Phases (Hydraulic Survey, ESR/Reservoir Construction, Pipeline Distribution, SCADA Integration)',
    deliverables: ['Hydraulic Network Model', 'Filtration/STP Units', 'Automated Metering Grid', 'Water Quality Sensor Suite'],
    calcTime: (val) => `${Math.max(4, Math.round(val * 0.8))} - ${Math.max(8, Math.round(val * 1.2))} Months`,
    calcImpact: (val) => `Supplies ~${(val * 8500).toLocaleString()} Households with clean potable water`
  },
  'solar-energy': {
    title: 'Solar Power, HT/ET Substations & Grid Works',
    unitName: 'kW / MW Clean Power Capacity',
    min: 50,
    max: 5000,
    step: 50,
    defaultVal: 500,
    phases: '3 Phases (Irradiance & Structural Study, Panel & Inverter Installation, Grid Synchronization & Net Metering)',
    deliverables: ['Tier-1 Solar Arrays', 'MSEDCL Compliance Package', 'Power Inverter & SCADA Monitoring', 'Lightning & Surge Protection'],
    calcTime: (val) => `${Math.max(1, Math.round(val / 300))} - ${Math.max(2, Math.round(val / 150))} Months`,
    calcImpact: (val) => `Offsets ~${Math.round(val * 1.3).toLocaleString()} Metric Tons CO2 / year`
  },
  'env-census': {
    title: 'Tree Census, Biodiversity Register & Bio-mining',
    unitName: 'Trees / Parcels Geo-tagged',
    min: 2000,
    max: 100000,
    step: 2000,
    defaultVal: 15000,
    phases: '2 Phases (Botanical Identification & GPS Tagging, PBR Registry & Green Cover Analytics)',
    deliverables: ['Digital Tree Census Portal', 'Botanical Health Dossier', 'QR-code Tree Plates', 'Municipal PBR Document'],
    calcTime: (val) => `${Math.max(1, Math.round(val / 10000))} - ${Math.max(3, Math.round(val / 6000))} Months`,
    calcImpact: (val) => `Protects biodiversity across ${Math.round(val / 80)} Sq. Kilometers`
  }
};

let currentEstimatorProfile = 'gis-tax';

document.addEventListener('DOMContentLoaded', () => {
  initEstimator();
});

function initEstimator() {
  const chipButtons = document.querySelectorAll('.estimator-chip');
  const slider = document.getElementById('estimator-scale-slider');
  const scaleDisplay = document.getElementById('estimator-scale-val');
  const unitLabel = document.getElementById('estimator-unit-label');

  if (!chipButtons.length || !slider) return;

  // Chip selection
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      chipButtons.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const profileKey = chip.getAttribute('data-profile');
      currentEstimatorProfile = profileKey;
      updateSliderBounds();
      renderEstimatorSummary();
    });
  });

  // Slider change
  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const profile = ESTIMATOR_PROFILES[currentEstimatorProfile];
    if (scaleDisplay) scaleDisplay.textContent = `${val.toLocaleString()} ${profile.unitName}`;
    renderEstimatorSummary(val);
  });

  updateSliderBounds();
  renderEstimatorSummary();
}

function updateSliderBounds() {
  const profile = ESTIMATOR_PROFILES[currentEstimatorProfile];
  const slider = document.getElementById('estimator-scale-slider');
  const scaleDisplay = document.getElementById('estimator-scale-val');
  const unitLabel = document.getElementById('estimator-unit-label');
  const titleDisplay = document.getElementById('estimator-domain-title');

  if (!profile || !slider) return;

  slider.min = profile.min;
  slider.max = profile.max;
  slider.step = profile.step;
  slider.value = profile.defaultVal;

  if (scaleDisplay) scaleDisplay.textContent = `${profile.defaultVal.toLocaleString()} ${profile.unitName}`;
  if (unitLabel) unitLabel.textContent = profile.unitName;
  if (titleDisplay) titleDisplay.textContent = profile.title;
}

function renderEstimatorSummary(overrideVal) {
  const profile = ESTIMATOR_PROFILES[currentEstimatorProfile];
  const slider = document.getElementById('estimator-scale-slider');
  const val = overrideVal || (slider ? parseInt(slider.value, 10) : profile.defaultVal);

  const timeEl = document.getElementById('est-time');
  const impactEl = document.getElementById('est-impact');
  const phasesEl = document.getElementById('est-phases');
  const deliverablesEl = document.getElementById('est-deliverables');

  if (timeEl) timeEl.textContent = profile.calcTime(val);
  if (impactEl) impactEl.textContent = profile.calcImpact(val);
  if (phasesEl) phasesEl.textContent = profile.phases;

  if (deliverablesEl) {
    deliverablesEl.innerHTML = profile.deliverables
      .map(item => `<span class="tag-pill">${item}</span>`)
      .join(' ');
  }
}
