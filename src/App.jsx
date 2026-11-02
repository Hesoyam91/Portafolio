import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { STACK_GROUPS } from './stackData';
import { INTERESTS, InterestIcon } from './interests';
import Ouroboros from './Ouroboros';

// Subtle typewriter hook used for the hero name and summary text
function useTypewriter(text, speed = 45) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const timer = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

const SLIDE_IDS = ['hero', 'projects', 'profile', 'experience', 'stack', 'faq', 'contact'];
const HIDDEN_PROJECTS = [
  { n: 1, img: '/screenshots/hidden-game.jpg', tags: ["Ren'Py", 'Python'] },
  { n: 2, img: '/screenshots/hidden-web.jpg', tags: ['React', 'FastAPI', 'SQL', 'Cloudflare', 'Cloudflare R2'] },
];
const NAV_LINKS = [
  { key: 'navHome', slide: 0 },
  { key: 'navProjects', slide: 1 },
  { key: 'navExperience', slide: 3 },
  { key: 'navStack', slide: 4 },
  { key: 'navFaq', slide: 5 },
  { key: 'navContact', slide: 6 },
];

function App() {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const fullName = "Gervasio\nHerrera";
  const typedName = useTypewriter(fullName, 60);
  const isNameTyped = typedName.length >= fullName.length;

  // Resume typewriter logic
  const summaryFull = t('resumeText');
  const summaryHL = t('resumeHighlight');
  const typedSummary = useTypewriter(summaryFull, 18);

  let p1Str = '', hlStr = '', p3Str = '';
  const hlIndex = summaryFull.indexOf(summaryHL);
  const hlEnd = hlIndex > -1 ? hlIndex + summaryHL.length : 0;

  if (hlIndex > -1) {
    if (typedSummary.length <= hlIndex) {
       p1Str = typedSummary;
    } else if (typedSummary.length <= hlEnd) {
       p1Str = summaryFull.substring(0, hlIndex);
       hlStr = typedSummary.substring(hlIndex);
    } else {
       p1Str = summaryFull.substring(0, hlIndex);
       hlStr = summaryFull.substring(hlIndex, hlEnd);
       p3Str = typedSummary.substring(hlEnd);
    }
  } else {
     p1Str = typedSummary;
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `0x${now.getTime().toString(16).toUpperCase()} // ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.setAttribute('href', theme === 'dark' ? '/favicon.svg' : '/favicon-light.svg');
  }, [theme]);

  const [flipped, setFlipped] = useState({});
  const toggleFlip = (key) => setFlipped((cur) => ({ ...cur, [key]: !cur[key] }));
  const [openInterest, setOpenInterest] = useState(null);

  // Hidden projects: null -> 'chaos' (page elements scatter) -> 'off' (CRT power-off) -> 'glitch' (red error messages)
  // -> 'open' (red page) -> 'reboot' (red page glitches out) -> 'rebootBoot' (blue messages + progress bar, back to
  // slide 0) -> 'closing' -> null
  const [crashPhase, setCrashPhase] = useState(null);
  const [mysteryGone, setMysteryGone] = useState(false);
  const crashTimers = useRef([]);
  const chaosEls = useRef([]);
  useEffect(() => () => crashTimers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => { crashTimers.current.push(setTimeout(fn, ms)); };

  const startCrash = () => {
    if (crashPhase) return;
    setCrashPhase('chaos');
    later(() => setCrashPhase('off'), 1800);
    later(() => setCrashPhase('glitch'), 2800);
    later(() => setCrashPhase('open'), 5500);
  };
  const leaveCrash = useCallback(() => {
    setCrashPhase('reboot');
    crashTimers.current.push(setTimeout(() => {
      setCrashPhase('rebootBoot');
      setActiveSlide(0);
      setMysteryGone(true);
    }, 900));
    crashTimers.current.push(setTimeout(() => setCrashPhase("closing"), 6600));
    crashTimers.current.push(setTimeout(() => setCrashPhase(null), 7400));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const live = ['chaos', 'off', 'glitch', 'open', 'reboot'].includes(crashPhase);
    root.classList.toggle('is-crashing', crashPhase === 'chaos');
    root.classList.toggle('is-poweroff', ['off', 'glitch', 'open', 'reboot'].includes(crashPhase));
    if (live) root.setAttribute('data-crash', '1');
    else root.removeAttribute('data-crash');
    if (!live) {
      root.classList.remove('is-chaos');
      chaosEls.current.forEach((el) => ['--cx', '--cy', '--cr', '--csk', '--cs'].forEach((p) => el.style.removeProperty(p)));
      chaosEls.current = [];
    }
  }, [crashPhase]);

  // Chaos: every element of the page is thrown around at random, re-scattered every few frames
  useEffect(() => {
    if (crashPhase !== 'chaos') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = Array.from(document.querySelectorAll(
      '#root :is(h1,h2,h3,h4,p,a,button,span,div,section,li,dt,dd,dl,img,svg,summary,details,figure,ol,footer):not(.slide-track):not(.slide):not(.container):not(.ambient)'
    ));
    chaosEls.current = els;
    const rnd = (n) => (Math.random() * 2 - 1) * n;
    const scatter = () => els.forEach((el) => {
      el.style.setProperty('--cx', rnd(340) + 'px');
      el.style.setProperty('--cy', rnd(260) + 'px');
      el.style.setProperty('--cr', rnd(55) + 'deg');
      el.style.setProperty('--csk', rnd(28) + 'deg');
      el.style.setProperty('--cs', String(0.5 + Math.random() * 1.3));
    });
    document.documentElement.classList.add('is-chaos');
    scatter();
    const id = setInterval(scatter, 200);
    return () => clearInterval(id);
  }, [crashPhase]);

  useEffect(() => {
    if (crashPhase !== 'open') return undefined;
    const onKey = (e) => { if (e.key === 'Escape') leaveCrash(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [crashPhase, leaveCrash]);

  useEffect(() => {
    if (!openInterest) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpenInterest(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openInterest]);

  const shotSrc = (img) => (typeof img === 'string' ? img : img[theme]);
  const stop = (e) => e.stopPropagation();

  const toggleTheme = () => setTheme((cur) => (cur === 'dark' ? 'light' : 'dark'));

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  // Slide navigation: keyboard arrows + explicit "next" controls
  const goToSlide = useCallback((index) => {
    const clamped = Math.max(0, Math.min(SLIDE_IDS.length - 1, index));
    setActiveSlide(clamped);
  }, []);

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        goNext();
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev]);

  const FLOW_IMG = { light: '/screenshots/flow-sunset.png', dark: '/screenshots/flow-night.png' };

  const featuredProjects = [
    { title: t('p7'), desc: t('p7d'), status: 'statusProd', tags: ['Electron', 'React', 'React Flow', 'TipTap', 'Vitest'], url: 'https://github.com/Hesoyam91/Flow', img: FLOW_IMG },
    { title: t('p1'), desc: t('p1d'), status: 'statusDev', tags: ['Node.js', 'SSE', 'Web Audio'], url: 'https://zoneshuffle.onrender.com/', img: '/screenshots/zoneshuffle.png' },
    { title: t('p3'), desc: t('p3d'), status: 'statusProd', tags: ['Electron', 'electron-vite', 'GitHub Actions'], url: 'https://github.com/Hesoyam91/ArchiveRewritter' },
    { title: t('p2'), desc: t('p2d'), status: 'statusDev', tags: ['Python', 'LangChain', 'Grok', 'Vite'], url: 'https://github.com/Hesoyam91/YTAgent' },
  ];

  const moreProjects = [
    { type: t('typeAI'), title: t('p5'), desc: t('p5d'), status: 'statusDev', tags: ['Chrome Ext.', 'Llama 3.1', 'Node.js'], url: 'https://github.com/Hesoyam91/LinkePost' },
    { type: t('typeData'), title: t('p4'), desc: t('p4d'), status: 'statusDev', tags: ['React', 'TypeScript', 'Recharts'], url: 'https://github.com/Hesoyam91/DashboardEjecutivo' },
    { type: t('typeFreelance'), title: 'tudominio.cl', desc: t('p8d'), status: 'statusDone', tags: ['React', 'UI/UX'], url: 'https://tudominio.cl' },
    { type: t('typeFreelance'), title: 'Lago Chapo 3D', desc: t('p6d'), status: 'statusDone', tags: ['WebGL', 'Three.js'], url: 'https://lagochapolibre.cl' },
  ];

  const profileRows = [
    ['profClass', t('heroRole')],
    ['profBase', 'Santiago, Chile'],
    ['profEdu', t('edu1')],
    ['profLang', t('profLangVal')],
    ['profCert', 'Azure Fundamentals (AZ-900) · EF SET C1'],
  ];

  const timeline = [
    { when: t('xp3When'), title: t('xp3'), org: 'Entel Connect Center', desc: t('xp3d') },
    { when: t('xp1When'), title: t('xp1'), org: 'Freelance · lagochapolibre.cl', desc: t('xp1d') },
    { when: t('xp2When'), title: t('xp2'), org: 'Freelance · tudominio.cl', desc: t('xp2d') },
    { when: t('xp4When'), title: t('xp4'), org: 'AFP Hábitat', desc: t('xp4d') },
    { when: t('xp5When'), title: t('xp5'), org: 'Duoc UC', desc: t('xp5d') },
    { when: '2021 – 2024', title: t('xp6'), org: 'Duoc UC', desc: t('xp6d') },
  ];

  const faqs = [1, 2, 3, 4].map((n) => ({ q: t('faq' + n + 'q'), a: t('faq' + n + 'a') }));

  return (
    <>
      <div className="ambient" />

      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="timestamp">{time}</div>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.key}
              className={'nav-link ' + (activeSlide === l.slide ? 'active' : '')}
              onClick={() => goToSlide(l.slide)}
            >
              {t(l.key)}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="lang-btn" aria-label={t('themeToggle')} title={t('themeToggle')}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={toggleLanguage} className="lang-btn">
            {t('changeLang')}
          </button>
        </div>
      </nav>

      {/* Slide progress dots */}
      <div className="slide-dots">
        {SLIDE_IDS.map((id, i) => (
          <button
            key={id}
            className={`slide-dot ${i === activeSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div
        className="slide-track"
        style={{ transform: `translateX(-${activeSlide * 100}vw)` }}
      >
        {/* Massive Hero Section */}
        <section className="slide hero">
          <div className="container">
            <h1
              className="hero-title"
              style={{ whiteSpace: 'pre-line' }}
            >
              {typedName}
              {!isNameTyped && <span className="typing-cursor">_</span>}
            </h1>

            <div className="hero-meta">
              <div className="hero-role">
                {t('heroRole')}
              </div>
              <div className="contact-links">
                <a href="mailto:gervasio_H@proton.me">
                  <svg className="svg-icon" viewBox="0 0 24 24" style={{marginRight: '8px'}}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <span>gervasio_H@proton.me</span>
                </a>
                <a href="https://github.com/Hesoyam91" target="_blank" rel="noreferrer">
                  <svg className="svg-icon" viewBox="0 0 24 24" style={{marginRight: '8px'}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <span>github.com/Hesoyam91</span>
                </a>
              </div>
            </div>

            <div className="statement statement--inline">
              <div className="statement-text-wrap">
                {/* Invisible full-length copy reserves layout space so the visible text never shifts the page while typing */}
                <div className="statement-text statement-text--ghost" aria-hidden="true">
                  {summaryFull}
                </div>
                <div className="statement-text statement-text--visible">
                  {hlIndex > -1 ? (
                    <>
                      <span>{p1Str}</span>
                      {hlStr && <span className="bright-hl">{hlStr}</span>}
                      <span>{p3Str}</span>
                      {typedSummary.length < summaryFull.length && <span className="typing-cursor">_</span>}
                    </>
                  ) : (
                    <span>{typedSummary}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects: featured + more */}
        <section className="slide projects-section">
          <div className="container">
            <div className="section-label" style={{ marginBottom: '28px' }}>
              <span className="blue-dot"></span>
              <span>{t('projectsTitle')}</span>
            </div>

            <div className="featured-grid">
              {featuredProjects.map((p, i) => (
                <div
                  className={'flip-card' + (p.img ? ' flippable' : '') + (flipped[p.title] ? ' flipped' : '')}
                  key={p.title}
                  {...(p.img ? {
                    role: 'button',
                    tabIndex: 0,
                    'aria-pressed': !!flipped[p.title],
                    onClick: () => toggleFlip(p.title),
                    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(p.title); } },
                  } : {})}
                >
                  <div className="flip-inner">
                    <div className="flip-face feature-card">
                      {p.img && (
                        <div className="tv-screen">
                          <span className="tv-label">▶ {t('seeShot')}</span>
                        </div>
                      )}
                      <div className="feature-head">
                        <span className={'status-badge ' + p.status}>{t(p.status)}</span>
                        <span className="feature-num">0{i + 1}</span>
                      </div>
                      <h3 className="feature-title">{p.title}</h3>
                      <p className="feature-desc">{p.desc}</p>
                      <div className="tag-row">
                        {p.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                      </div>
                      <a className="btn-arrow" href={p.url} target="_blank" rel="noreferrer" onClick={stop}>
                        [ {p.url.includes('github') ? t('repoBtn') : 'Live Site'} ] →
                      </a>
                    </div>
                    {p.img && (
                      <div className="flip-face flip-back">
                        <img src={shotSrc(p.img)} alt={p.title} />
                        <div className="shot-bar">
                          <span className="shot-title">{p.title}</span>
                          <a className="btn-arrow" href={p.url} target="_blank" rel="noreferrer" onClick={stop}>
                            [ {p.url.includes('github') ? t('repoBtn') : 'Live Site'} ] →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="section-label more-label">
              <span className="blue-dot"></span>
              <span>{t('moreProjects')} · {moreProjects.length}</span>
            </div>
            <div className="more-list">
              {moreProjects.map((p) => (
                <a href={p.url} target="_blank" rel="noreferrer" className="more-card" key={p.title}>
                  <div className="more-meta">
                    <span className="more-type">{p.type}</span>
                    <span className={'status-badge ' + p.status}>{t(p.status)}</span>
                  </div>
                  <div className="more-body">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <div className="tag-row">
                      {p.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <div className="more-arr">↗</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="slide centered-section">
          <div className="container">
            <div className="section-label" style={{ marginBottom: '32px' }}>
              <span className="blue-dot"></span>
              <span>{t('profileTitle')}</span>
            </div>
            <div className="profile-grid">
              <dl className="profile-sheet">
                <div className="profile-avatar-wrap">
                  <div className="profile-avatar"><Ouroboros className="profile-avatar-icon" /></div>
                </div>
                {profileRows.map(([k, v]) => (
                  <div className="profile-row" key={k}>
                    <dt>{t(k)}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="profile-bio">{t('profileBio')}</p>
                <div className="pill-group-title">{t('interestsTitle')}</div>
                <div className="interest-row">
                  {INTERESTS.filter((id) => id !== 'mystery' || !mysteryGone).map((id) => (
                    <button
                      key={id}
                      className={'interest-btn' + (id === 'mystery' ? ' tv-static' : '')}
                      onClick={() => (id === 'mystery' ? startCrash() : setOpenInterest(id))}
                      aria-label={t('interest_' + id)}
                    >
                      <InterestIcon id={id} />
                      {id !== 'mystery' && <span className="interest-name">{t('interest_' + id)}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience timeline */}
        <section className="slide centered-section">
          <div className="container">
            <div className="section-label" style={{ marginBottom: '32px' }}>
              <span className="blue-dot"></span>
              <span>{t('experienceTitle')}</span>
            </div>
            <ol className="timeline">
              {timeline.map((e, i) => (
                <li className="timeline-item" key={i}>
                  <span className="timeline-when">{e.when}</span>
                  <div>
                    <h4>{e.title} <span className="timeline-org">| {e.org}</span></h4>
                    <p>{e.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="slide centered-section">
          <div className="container">
             <div className="section-label" style={{ marginBottom: '40px' }}>
                <span className="blue-dot"></span>
                <span>{t('techStack')}</span>
             </div>

             <div className="stack-groups">
               {STACK_GROUPS.map((g) => (
                 <div key={g.key}>
                   <div className="pill-group-title">{t(g.key)}</div>
                   <div className="stack-grid">
                     {g.items.map((it) => (
                       <div className="stack-tile" key={it.name} title={it.name}>
                         {it.icon ? (
                           <svg className="stack-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={it.icon.path} /></svg>
                         ) : (
                           <span className="stack-mono">{it.mono}</span>
                         )}
                         <span className="stack-name">{it.name}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="slide centered-section">
          <div className="container">
            <div className="section-label" style={{ marginBottom: '32px' }}>
              <span className="blue-dot"></span>
              <span>{t('faqTitle')}</span>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <details className="faq-item" key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section className="slide freelance-section contact-footer">
          <div className="container">
             <div className="section-label" style={{ marginBottom: '30px' }}>
                <span className="blue-dot"></span>
                <span>{t('contactMe')}</span>
             </div>
             <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--fg-mute)', marginBottom: '40px', marginTop: 0 }}>
                {t('contactSub')}
             </h2>
             <div>
                <a href="mailto:gervasio_H@proton.me" className="contact-mail">
                  <svg className="svg-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <span>gervasio_H@proton.me</span>
                </a>
             </div>

             <footer className="site-footer">
               © {new Date().getFullYear()} Gervasio Herrera
             </footer>
          </div>
        </section>
      </div>

      {openInterest && (
        <div className="modal-backdrop" onClick={() => setOpenInterest(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={stop}>
            <button className="modal-close" onClick={() => setOpenInterest(null)} aria-label="Close">×</button>
            <div className="modal-body">
              <div className="modal-icon">
                <InterestIcon id={openInterest} />
              </div>
              <h3>{t('interest_' + openInterest)}</h3>
              {t('interest_' + openInterest + '_body', { returnObjects: true }).map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      )}

      {crashPhase && !['chaos', 'off'].includes(crashPhase) && createPortal(
        <div className={'crash crash--' + crashPhase} role="dialog" aria-modal="true">
          <div className="crash-fx" aria-hidden="true" />
          {crashPhase === 'glitch' && (
            <div className="crash-boot" aria-hidden="true">
              <p>FATAL ERROR 0xDEADC0DE</p>
              <p>MEMORY CORRUPTION DETECTED</p>
              <p>SEGMENTATION FAULT AT 0x00000000</p>
              <p>REBOOTING INTO UNKNOWN SECTOR_</p>
            </div>
          )}
          {crashPhase === 'rebootBoot' && (
            <div className="crash-boot crash-boot--blue" aria-hidden="true">
              <p>SYSTEM REBOOT INITIATED</p>
              <p>FLUSHING CORRUPTED SECTORS</p>
              <p>RESTORING SESSION...</p>
              <p>OK_</p>
              <div className="crash-progress">
                <span>SYSTEM REBOOT</span>
                <div className="crash-progress-bar"><i /></div>
              </div>
            </div>
          )}
          {(crashPhase === 'open' || crashPhase === 'reboot') && (
            <>
              <div className="crash-page">
                <h2 className="crash-title" data-text={t('hiddenTitle')}>{t('hiddenTitle')}</h2>
                {HIDDEN_PROJECTS.map((p, n) => (
                  <section className="crash-block" key={p.n}>
                    <h3>{t('hidden' + p.n + 'Title')}</h3>
                    <p>{t('hidden' + p.n + 'Body')}</p>
                    <div className="crash-tags">
                      {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <figure>
                      <img src={p.img} alt={t('hidden' + p.n + 'Title')} />
                      <figcaption>{t('hidden' + p.n + 'Cap')}</figcaption>
                    </figure>
                  </section>
                ))}
                <svg className="crash-eyes" viewBox="0 0 120 40" aria-hidden="true">
                  <ellipse cx="32" cy="20" rx="24" ry="12" />
                  <ellipse cx="88" cy="20" rx="24" ry="12" />
                  <circle cx="32" cy="20" r="5" />
                  <circle cx="88" cy="20" r="5" />
                </svg>
              </div>
              <button className="crash-back" onClick={leaveCrash} disabled={crashPhase !== 'open'} autoFocus>[ {t('crashBack')} ]</button>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  );
}

export default App;
