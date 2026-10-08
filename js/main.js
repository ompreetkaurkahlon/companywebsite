/**
 * M90 TECHNOLOGIES — Core Application JavaScript
 * Theme management, scroll animations, mobile navigation, and stats counter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveal();
  initStatCounters();
  initDomainTabs();
  initHeroDualSwitch();
  initCardSpotlight();
  initCardSlider();
});

/* --------------------------------------------------------------------------
   Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.removeItem('m90_theme');
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      drawer.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close when clicking links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('[data-counter-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out exponential
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * target);

          const shouldFormat = el.getAttribute('data-format') !== 'false';
          const displayVal = shouldFormat ? currentVal.toLocaleString() : currentVal;
          el.textContent = `${prefix}${displayVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            const finalVal = shouldFormat ? target.toLocaleString() : target;
            el.textContent = `${prefix}${finalVal}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7 Domains Interactive Tab Switcher
   -------------------------------------------------------------------------- */
function initDomainTabs() {
  const tabBtns = document.querySelectorAll('.domain-tab-btn');
  const panes = document.querySelectorAll('.domain-detail-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Hero Section Dual Switcher (Software vs Infrastructure Blueprint)
   -------------------------------------------------------------------------- */
function initHeroDualSwitch() {
  const switchBtns = document.querySelectorAll('.hero-switch-btn');
  const blueprintView = document.getElementById('hero-blueprint-content');

  if (!switchBtns.length || !blueprintView) return;

  const views = {
    software: `
      <div class="blueprint-header">
        <span class="blueprint-tag">// CURRENTLY_ACTIVE_PROJECTS</span>
        <span class="layer-status">SYSTEM ACTIVE</span>
      </div>
      <div class="blueprint-layers">
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> WhatsApp Chatbot</div>
          <span class="layer-status">Active Bot</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Library Management System</div>
          <span class="layer-status">Deployed</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Record Room Digitization</div>
          <span class="layer-status">Secure Vault</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Stock Management System</div>
          <span class="layer-status">Real-Time</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Nagar Sewak Takrar Nivaran Kendra</div>
          <span class="layer-status">Grievance Portal</span>
        </div>
        <div class="layer-bar" style="border-style: dashed; opacity: 0.85;">
          <div class="layer-title"><span class="layer-icon" style="color: var(--brand-amber-500);">&bull;</span> And Many More Solutions...</div>
          <span class="layer-status" style="color: var(--brand-amber-500);">Expanding</span>
        </div>
      </div>
      <div class="blueprint-footer text-muted" style="font-size: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem;">
        &gt; Latency: 12ms | Encryption: AES-256 | High Availability
      </div>
    `,
    infra: `
      <div class="blueprint-header">
        <span class="blueprint-tag">// CIVIL_ENERGY_GRID_v8.0</span>
        <span class="layer-status" style="color: var(--brand-cyan-400)">LIVE MONITORING</span>
      </div>
      <div class="blueprint-layers">
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Urban Roads & Bridge Networks</div>
          <span class="layer-status" style="color: #60A5FA;">Engineered</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Solar & Substation Power Grids</div>
          <span class="layer-status" style="color: #FBBF24;">11kV / 33kV</span>
        </div>
        <div class="layer-bar">
          <div class="layer-title"><span class="layer-icon">&bull;</span> Water Filtration & STPs</div>
          <span class="layer-status" style="color: #34D399;">Active Flow</span>
        </div>
      </div>
      <div class="blueprint-footer text-muted" style="font-size: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem;">
        &gt; Standards: IS/IRC Compliant | Structural Integrity Certified
      </div>
    `
  };

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      if (views[mode]) {
        blueprintView.innerHTML = views[mode];
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Card Cursor Spotlight & Micro-Interactions
   -------------------------------------------------------------------------- */
function initCardSpotlight() {
  const cards = document.querySelectorAll(
    '.card, .project-card, .service-card, .stat-card, .domain-card, .feature-card, .value-card, .domain-detail-pane, .blueprint-terminal, .project-slider-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* --------------------------------------------------------------------------
   Auto-Sliding Project Cards Showcase (3s Interval)
   -------------------------------------------------------------------------- */
function initCardSlider() {
  const track = document.getElementById('project-slider-track');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dotsContainer = document.getElementById('slider-dots-nav');
  const currentNumEl = document.getElementById('current-slide-num');
  const totalNumEl = document.getElementById('total-slide-num');
  const viewport = document.getElementById('project-slider-viewport');

  if (!track || !viewport) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;

  function getVisibleSlidesCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  function getMaxIndex() {
    const visibleCount = getVisibleSlidesCount();
    return Math.max(0, slides.length - visibleCount);
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  if (totalNumEl) {
    totalNumEl.textContent = slides.length;
  }

  function updateSlider() {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    if (currentIndex < 0) currentIndex = 0;

    const visibleCount = getVisibleSlidesCount();
    const slidePercentage = 100 / visibleCount;
    track.style.transform = `translateX(-${currentIndex * slidePercentage}%)`;

    if (currentNumEl) {
      currentNumEl.textContent = currentIndex + 1;
    }

    renderDots();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetTimer();
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex--;
    }
    updateSlider();
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, 3000);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

  viewport.addEventListener('mouseenter', stopTimer);
  viewport.addEventListener('mouseleave', startTimer);

  window.addEventListener('resize', () => {
    updateSlider();
  });

  updateSlider();
  startTimer();
}
