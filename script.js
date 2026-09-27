// ==========================================================================
// JAI VERSE HUB — Main Script
// ==========================================================================

// --- Data ---
const data = {
  projects: [
    { name: "PRABANDH", url: "https://prabandh-jai-verse.vercel.app" },
    { name: "SKILLX", url: "https://skillx-jai-verse.vercel.app" },
    { name: "SENTRIX", url: "https://sentrix-jai-verse.vercel.app" },
    { name: "RITVA", url: "https://ritva-jai-verse.vercel.app" },
    { name: "NEURIX", url: "https://neurix-jai-verse.vercel.app" },
    { name: "NIRNAYA", url: "https://nirnaya-jai-verse.vercel.app" },
    { name: "MADHURAMS", url: "https://madhurams-sweets.vercel.app" }
  ],
  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/jai-manikanta-gudivada/" },
    { name: "GitHub", url: "https://github.com/jaigudivada" },
    { name: "Email", url: "mailto:thejaiverse@gmail.com" }
  ],
  gfgCourses: [
    { name: "GeeksforGeeks × JetBrains Academy", url: "https://gfgcdn.com/tu/11Kx/" },
    { name: "Build with AI agents using Snowflake Cortex AI", url: "https://gfgcdn.com/tu/wD5/" },
    { name: "MongoDB Course", url: "https://gfgcdn.com/tu/10XE/" }
  ],
  unstop: [
    { name: "Check your skill with this game", url: "https://unstop.com/mario_game" },
    { name: "Mock tests", url: "https://unstop.com/practice/mock-test" }
  ]
};

// --- SVG Icons ---
const arrowIconHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <polyline points="12 5 19 12 12 19"></polyline>
</svg>
`;

// --- Popup Management ---
function initPopup() {
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close');
  const dismissBtn = document.getElementById('popup-dismiss');
  const dontShowCheckbox = document.getElementById('popup-dont-show-checkbox');

  // Check if user dismissed before
  const dismissed = localStorage.getItem('popup-dismissed');
  if (dismissed === 'true') {
    return; // Don't show popup
  }

  // Show popup after a brief delay
  setTimeout(() => {
    overlay.classList.add('is-visible');
    // Focus trap for accessibility
    closeBtn.focus();
  }, 800);

  function hidePopup() {
    overlay.classList.remove('is-visible');
    if (dontShowCheckbox.checked) {
      localStorage.setItem('popup-dismissed', 'true');
    }
  }

  closeBtn.addEventListener('click', hidePopup);
  dismissBtn.addEventListener('click', hidePopup);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hidePopup();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
      hidePopup();
    }
  });
}

// --- Theme Management ---
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  html.setAttribute('data-theme', initialTheme);
  toggle.setAttribute('aria-pressed', initialTheme === 'dark');

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.setAttribute('aria-pressed', newTheme === 'dark');
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      toggle.setAttribute('aria-pressed', newTheme === 'dark');
    }
  });
}

// --- Link Rendering ---
function createLinkElement(link, category) {
  const a = document.createElement('a');
  a.href = link.url;
  a.className = 'link-row';
  a.dataset.category = category;
  a.target = link.url.startsWith('mailto:') ? '_self' : '_blank';
  a.rel = link.url.startsWith('mailto:') ? '' : 'noopener noreferrer';
  a.setAttribute('role', 'listitem');

  const spanName = document.createElement('span');
  spanName.className = 'link-name';
  spanName.textContent = link.name;

  const spanIcon = document.createElement('span');
  spanIcon.className = 'link-icon';
  spanIcon.innerHTML = arrowIconHTML;
  spanIcon.setAttribute('aria-hidden', 'true');

  a.appendChild(spanName);
  a.appendChild(spanIcon);

  return a;
}

function initializeLinks() {
  const containers = {
    projects: document.getElementById('projects-container'),
    social: document.getElementById('social-links-container'),
    gfg: document.getElementById('gfg-courses-container'),
    unstop: document.getElementById('unstop-container')
  };

  // Inject Projects
  data.projects.forEach(project => {
    containers.projects.appendChild(createLinkElement(project, 'projects'));
  });

  // Inject Social Links
  data.socialLinks.forEach(socialLink => {
    containers.social.appendChild(createLinkElement(socialLink, 'social'));
  });

  // Inject GFG Courses
  data.gfgCourses.forEach(course => {
    containers.gfg.appendChild(createLinkElement(course, 'gfg'));
  });

  // Inject Unstop
  data.unstop.forEach(link => {
    containers.unstop.appendChild(createLinkElement(link, 'unstop'));
  });
}

// --- Main Initialization ---
function init() {
  initPopup();
  initTheme();
  initializeLinks();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}