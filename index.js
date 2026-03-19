// ============================================================
// PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// ============================================================
// NAV SHRINK
// ============================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ============================================================
// INTERSECTION OBSERVER — reveal
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// HERO INSTALL TABS
// ============================================================
document.querySelectorAll('.install-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    document.querySelectorAll('.install-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.install-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(target).classList.add('active');
  });
});

// ============================================================
// PLUGIN TABS
// ============================================================
document.querySelectorAll('.plugin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.ptarget;
    document.querySelectorAll('.plugin-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.plugin-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(target).classList.add('active');
  });
});

// ============================================================
// ACCORDION
// ============================================================
function toggleAccordion(header) {
  const item = header.closest('.accordion-item');
  const isOpen = item.classList.contains('open');
  item.classList.toggle('open', !isOpen);
  header.setAttribute('aria-expanded', !isOpen);
}

// ============================================================
// COPY BUTTONS
// ============================================================
function setupCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const orig = btn.textContent;
        btn.textContent = btn.classList.contains('copy-btn') ? '✓ copied!' : 'copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 2000);
      } catch {}
    });
  });
}
setupCopyButtons();
