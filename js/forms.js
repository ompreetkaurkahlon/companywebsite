/**
 * M90 TECHNOLOGIES — Form Handling & Async Submissions
 * Integrates Web3Forms for contact inquiries & interactive career applications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCareersForm();
  initJobFilters();
});

/* --------------------------------------------------------------------------
   Contact Form Submission (Web3Forms API)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const errorMsg = document.getElementById('contact-error-msg');
  const successMsg = document.getElementById('contact-success-msg');
  const formCard = document.getElementById('contact-form-card');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorMsg) errorMsg.classList.add('hidden');

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="width:18px;height:18px;animation:spin 1s linear infinite;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending Message...
    `;

    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (formCard) formCard.style.display = 'none';
        if (successMsg) successMsg.classList.remove('hidden');
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      if (errorMsg) {
        errorMsg.textContent = 'Unable to send message right now. Please call us at +91 8379997722 or email jobs@m90.in.';
        errorMsg.classList.remove('hidden');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* --------------------------------------------------------------------------
   Careers Application Form & File Dropzone
   -------------------------------------------------------------------------- */
function initCareersForm() {
  const form = document.getElementById('application-form');
  const fileInput = document.getElementById('applicant-resume');
  const dropzone = document.getElementById('file-dropzone');
  const fileNameDisplay = document.getElementById('chosen-file-name');
  const fileError = document.getElementById('resume-file-error');
  const submitBtn = document.getElementById('career-submit-btn');
  const successMsg = document.getElementById('career-success-msg');
  const formCard = document.getElementById('application-form-card');

  if (!form) return;

  // File change handler
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      handleFileSelected(fileInput.files[0]);
    });
  }

  // Dropzone drag-drop handlers
  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) {
        fileInput.files = files;
        handleFileSelected(files[0]);
      }
    });
  }

  function handleFileSelected(file) {
    if (!file) return;

    // Check size <= 5MB
    if (file.size > 5 * 1024 * 1024) {
      if (fileError) fileError.classList.remove('hidden');
      if (fileNameDisplay) fileNameDisplay.textContent = '';
      if (fileInput) fileInput.value = '';
      return;
    }

    if (fileError) fileError.classList.add('hidden');
    if (fileNameDisplay) {
      fileNameDisplay.innerHTML = `<strong>Selected:</strong> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
  }

  // Submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorAlert = document.getElementById('career-error-msg');
    if (errorAlert) errorAlert.classList.add('hidden');

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting Application...';

    // Simulate reliable submission
    setTimeout(() => {
      if (formCard) formCard.style.display = 'none';
      if (successMsg) successMsg.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   Careers Department Filter
   -------------------------------------------------------------------------- */
function initJobFilters() {
  const filterPills = document.querySelectorAll('.job-filter-pill');
  const jobCards = document.querySelectorAll('.job-listing-card');

  if (!filterPills.length || !jobCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const dept = pill.getAttribute('data-dept');

      jobCards.forEach(card => {
        const cardDept = card.getAttribute('data-dept');
        if (dept === 'all' || cardDept === dept) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
