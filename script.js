/* ══════════════════════════════════════════════════════════
   Portfolio JavaScript
   - Navbar scroll effect
   - Mobile menu toggle
   - Scroll-in animations (cards only, never hides text)
   ══════════════════════════════════════════════════════════ */

// ── 1. NAVBAR scrolled class ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── 2. MOBILE MENU ───────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is tapped on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── 3. SCROLL ANIMATIONS ─────────────────────────────────
// Only cards and grouped blocks get the animation.
// Plain text paragraphs and headings are ALWAYS visible.
const animTargets = [
  '.stat-card',
  '.timeline-card',
  '.research-card',
  '.project-card',
  '.skill-group',
  '.cert-card',
  '.interest-item'
];

// Add .anim class to every target element
document.querySelectorAll(animTargets.join(',')).forEach(el => {
  el.classList.add('anim');
});

// IntersectionObserver reveals them as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly for a cascade effect
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

// ── 4. SMOOTH SCROLL for anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 5. ACTIVE NAV HIGHLIGHT ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  },
  { threshold: 0.45 }
).observe !== undefined && sections.forEach(s =>
  new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--gold)' : '';
      });
    }), { threshold: 0.45 }
  ).observe(s)
);