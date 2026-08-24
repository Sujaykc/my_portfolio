import { useEffect, useState } from 'react';

const roles = ['Backend Developer', 'Node.js Architect', 'API Specialist', 'System Engineer', 'Problem Solver'];
const navItems = ['about', 'skills', 'projects', 'experience', 'contact'];
const projects = [
  { icon: 'fas fa-om', title: 'Wavezz - AI Meditation', points: ['Built multi-provider JWT and OTP authentication.', 'Created AI meditation scripts and FFmpeg audio mixing.', 'Handled iOS and Android subscription validation.', 'Added Firebase notifications and AWS S3 storage.'], badges: ['Node.js', 'FFmpeg', 'MongoDB', 'AWS S3'] },
  { icon: 'fab fa-linkedin', title: 'LinkedIn Catch Up', points: ['Automated personalized daily wishes with Playwright.', 'Implemented session persistence and human-like delays.', 'Deployed autonomous weekday runs with GitHub Actions.', 'Added environment configuration and retry logic.'], badges: ['Playwright', 'GitHub Actions', 'Node.js'] },
  { icon: 'fas fa-bell', title: 'Emergency Alarm App', points: ['Built SOS alerts with WebSocket support and cancellation.', 'Used MongoDB geospatial queries for proximity alerts.', 'Added Email, Phone, Google, and Apple authentication.', 'Notified trusted contacts and nearby public users.'], badges: ['Node.js', 'MongoDB', 'Redis', 'WebSockets'] }
];

function Reveal({ children, className = '' }) {
  return <div className={`fade-in ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [roleText, setRoleText] = useState('');

  useEffect(() => {
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;
    const type = () => {
      const role = roles[roleIndex];
      const nextText = deleting ? role.slice(0, characterIndex - 1) : role.slice(0, characterIndex + 1);
      characterIndex += deleting ? -1 : 1;
      setRoleText(nextText);
      if (!deleting && characterIndex > role.length) {
        deleting = true;
        timeoutId = setTimeout(type, 2000);
      } else if (deleting && characterIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        characterIndex = 0;
        timeoutId = setTimeout(type, 500);
      } else {
        timeoutId = setTimeout(type, deleting ? 50 : 100);
      }
    };
    timeoutId = setTimeout(type, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = [...document.querySelectorAll('section')]
        .filter(section => window.scrollY >= section.offsetTop - 150)
        .pop();
      setActiveSection(current?.id || 'hero');
      document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 50);
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.15 });
    document.querySelectorAll('.fade-in').forEach(element => observer.observe(element));
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    const move = event => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
    };
    const activate = () => { cursor.classList.add('active'); ring.classList.add('active'); };
    const deactivate = () => { cursor.classList.remove('active'); ring.classList.remove('active'); };
    document.addEventListener('mousemove', move);
    const interactive = document.querySelectorAll('a, button, .skill-tag, .project-card, .stat-box, .social-btn');
    interactive.forEach(element => { element.addEventListener('mouseenter', activate); element.addEventListener('mouseleave', deactivate); });
    return () => {
      document.removeEventListener('mousemove', move);
      interactive.forEach(element => { element.removeEventListener('mouseenter', activate); element.removeEventListener('mouseleave', deactivate); });
    };
  }, []);

  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = 'auto'; };
  const toggleMenu = () => { setMenuOpen(open => { document.body.style.overflow = open ? 'auto' : 'hidden'; return !open; }); };

  return <>
    <div className="cursor" id="cursor" />
    <div className="cursor-ring" id="cursorRing" />
    <div className="aurora-container"><div className="aurora-orb orb-1" /><div className="aurora-orb orb-2" /><div className="aurora-orb orb-3" /></div>

    <nav id="navbar">
      <a href="#hero" className="nav-logo">SUJAY<span>.</span></a>
      <ul className="nav-links">{navItems.map(item => <li key={item}><a className={activeSection === item ? 'active' : ''} href={`#${item}`}>{item[0].toUpperCase() + item.slice(1)}</a></li>)}</ul>
      <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu"><span /><span /><span /></button>
    </nav>

    <section id="hero">
      <div className="hero-content"><div className="hero-badge"><i className="fas fa-bolt" /> Available for Backend Roles</div><h1 className="hero-name">Sujay K C.</h1><div className="hero-typing">I'm a <span className="accent-line">{roleText}</span><span className="cursor-blink">|</span></div><p className="hero-desc">Building scalable backends that power real products. Based in Bengaluru, crafting APIs, audio pipelines, and automation systems that actually work in production.</p><div className="hero-cta"><a href="#projects" className="btn-primary">View My Work <i className="fas fa-arrow-right" /></a><a href="assets/resume.pdf" className="btn-resume glass-panel" target="_blank" rel="noreferrer"><i className="fas fa-file-alt" /> Resume</a></div></div>
      <Reveal className="hero-visual"><div className="hero-photo-container"><img src="assets/sujayphoto3.jpg" alt="Sujay K C" className="hero-photo" /></div></Reveal>
    </section>

    <section id="about"><span className="section-tag">About Me</span><h2 className="section-title fade-in">Engineering scalable solutions</h2><div className="about-bento"><div className="bento-item main-bio glass-panel fade-in"><div className="bio-header"><span className="status-badge"><span className="pulse" /> Open for Opportunities</span></div><div className="bio-content"><p>I'm a <strong>Junior Backend Developer</strong> at Applaunch, Bengaluru. I specialize in building the hidden machinery that makes modern applications work, from robust <strong>Node.js</strong> APIs to complex <strong>audio processing</strong> pipelines.</p><p>I don't just write code; I architect systems that handle the heavy lifting. My focus is always on <strong>performance, security, and scalability</strong>.</p></div></div>{[['fas fa-history', '1+', 'Years Experience'], ['fas fa-cloud-upload-alt', '5+', 'Production Apps'], ['fas fa-code-branch', '100+', 'Scalable APIs'], ['fas fa-terminal', '∞', 'Bugs Squashed']].map(([icon, value, label]) => <div className="bento-item stat-box glass-panel fade-in" key={label}><i className={icon} /><div className="stat-content"><span className="stat-val">{value}</span><span className="stat-lab">{label}</span></div></div>)}<div className="bento-item philosophy glass-panel fade-in"><h3 className="bento-subtitle"><i className="fas fa-quote-left" /> Philosophy</h3><p>"Build it once, build it right. Backend engineering is about foundations that never shake."</p></div></div></section>

    <section id="skills"><span className="section-tag">What I use</span><h2 className="section-title fade-in">Tech Stack</h2><div className="skills-container">{[['fas fa-server', 'Backend', ['Node.js', 'Express.js', 'NestJS', 'TypeScript', 'REST APIs']], ['fas fa-database', 'Databases & Cache', ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']], ['fas fa-tools', 'Tools & DevOps', ['Docker', 'Git / Bitbucket', 'AWS (SES)', 'Postman', 'FFmpeg', 'Playwright']]].map(([icon, title, skills]) => <div className="skill-category fade-in" key={title}><h3 className="skill-cat-title"><i className={icon} /> {title}</h3><div className="skill-tags">{skills.map(skill => <span className="skill-tag glass-panel" key={skill}>{skill}</span>)}</div></div>)}</div></section>

    <section id="projects"><span className="section-tag">What I've built</span><h2 className="section-title fade-in">Projects</h2><div className="projects-grid">{projects.map(project => <div className="project-card glass-panel fade-in" key={project.title}><div className="project-top"><div className="project-icon"><i className={project.icon} /></div><div className="project-title">{project.title}</div></div><div className="project-desc"><ul className="exp-list project-list">{project.points.map(point => <li key={point}>{point}</li>)}</ul></div><div className="project-badges">{project.badges.map(badge => <span className="badge" key={badge}>{badge}</span>)}</div></div>)}</div></section>

    <section id="experience"><span className="section-tag">My Journey</span><h2 className="section-title fade-in">Experience</h2><div className="timeline">{[['Junior Backend Developer', 'Applaunch Bengaluru Pvt. Ltd.', 'May 2025 – Present', ['Developing scalable APIs with Node.js, Express.js, TypeScript, and NestJS.', 'Designing MongoDB schemas for high-performance data access.', 'Implementing secure authentication, authorization, and business logic.']], ['Web Developer Intern', 'WayEva Innovations Pvt. Ltd.', 'Jan 2025 – Mar 2025', ['Built an educational platform with authentication and course subscriptions.', 'Integrated payment gateways and designed MySQL databases.', 'Developed backend services using JavaScript and Express.js.']]].map(([role, company, date, points]) => <div className="timeline-item fade-in" key={role}><div className="timeline-dot" /><div className="timeline-content glass-panel"><div className="timeline-header"><div><h3 className="exp-role">{role}</h3><h4 className="exp-company">{company}</h4></div><span className="exp-date">{date}</span></div><ul className="exp-list">{points.map(point => <li key={point}>{point}</li>)}</ul></div></div>)}</div></section>

    <section id="contact"><h2 className="contact-heading fade-in">Let's build something <span className="accent-line">extraordinary.</span></h2><a href="mailto:sujaykc596@gmail.com" className="contact-email glass-panel fade-in">sujaykc596@gmail.com</a><div className="contact-socials fade-in"><a href="https://github.com/Sujaykc" target="_blank" rel="noreferrer" className="social-btn github glass-panel" aria-label="GitHub"><i className="fab fa-github" /></a><a href="https://www.linkedin.com/in/sujaykc" target="_blank" rel="noreferrer" className="social-btn linkedin glass-panel" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a><a href="mailto:sujaykc596@gmail.com" className="social-btn email glass-panel" aria-label="Email"><i className="fas fa-envelope" /></a></div></section>

    <div className={`menu-overlay ${menuOpen ? 'active' : ''}`}><div className="menu-content"><ul className="menu-links">{navItems.map(item => <li key={item}><a href={`#${item}`} className="menu-link" onClick={closeMenu}>{item[0].toUpperCase() + item.slice(1)}</a></li>)}</ul></div></div>
    <footer><span>© 2026 Sujay K C.</span><span>Bengaluru, India</span></footer>
  </>;
}

export default App;
