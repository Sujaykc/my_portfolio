// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Use requestAnimationFrame for smoother performance even at high speeds
  requestAnimationFrame(() => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
  });
});

// Interaction states
document.querySelectorAll('a, button, .skill-tag, .project-card, .stat-card, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    ring.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    ring.classList.remove('active');
  });
});

// ===== NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Background effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// ===== MOBILE MENU (Overlay) =====
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// ===== TYPING EFFECT =====
const roles = [
  'Backend Developer', 
  'Node.js Architect', 
  'API Specialist', 
  'System Engineer',
  'Problem Solver'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = roles[roleIdx];
  const displayed = deleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
  typingEl.innerHTML = `I'm a <span class="accent-line" style="display:inline;">${displayed}</span><span class="cursor-blink">|</span>`;

  if (!deleting && charIdx > current.length) {
    deleting = true;
    setTimeout(type, 2000);
    return;
  }
  if (deleting && charIdx < 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(type, 500);
    return;
  }
  setTimeout(type, deleting ? 50 : 100);
}
setTimeout(type, 800);

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});