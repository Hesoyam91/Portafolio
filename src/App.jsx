import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Matrix characters
    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 1, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(48, 128, 255, 0.35)'; // Faint technical blue
      ctx.font = fontSize + 'px "Space Mono", monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

// Typewriter hook matching ZoneShuffle awaiting typing
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

function App() {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState('');
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

  // Custom refs for auto-carousel
  const carouselRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);

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

  // Automatic scrolling logic
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimeoutRef.current = setInterval(() => {
      if (carouselRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
         if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Reset
         } else {
            scrollRight();
         }
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimeoutRef.current) clearInterval(autoScrollTimeoutRef.current);
  };

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -405, behavior: 'smooth' });
    startAutoScroll(); // restart timer
  };

  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 405, behavior: 'smooth' });
    startAutoScroll(); // restart timer
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const mainProjects = [
    { title: t('p1'), desc: t('p1d'), url: 'https://zoneshuffle.onrender.com/' },
    { title: t('p2'), desc: t('p2d'), url: 'https://github.com/Hesoyam91/YTAgent' },
    { title: t('p3'), desc: t('p3d'), url: 'https://github.com/Hesoyam91/ArchiveRewritter' },
  ];

  // Manga Platform removed
  const freelanceProjects = [
    { title: "tudominio.cl", desc: "Desarrollo frontend, UI/UX reactivo, mejora gráfica.", url: "https://tudominio.cl" },
    { title: "Lago Chapo 3D / WebGL", desc: t('p5d'), url: "https://lagochapolibre.cl" }
  ];

  return (
    <>
      <MatrixRain />
      <div className="ambient" />

      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="timestamp">{time}</div>
        <button onClick={toggleLanguage} className="lang-btn">
          {t('changeLang')}
        </button>
      </nav>

      <div className="container">
        {/* Massive Hero Section */}
        <section className="hero">
          <h1 
            className={`hero-title ${isNameTyped ? 'zone-glitch' : ''}`} 
            style={{ whiteSpace: 'pre-line' }}
            data-text={fullName}
          >
            {typedName}
            {!isNameTyped && <span className="typing-cursor">_</span>}
          </h1>
          
          <div className="hero-meta">
            <div className="hero-role zone-glitch" data-text="Desarrollador Full-Stack">
              Desarrollador Full-Stack
            </div>
            <div className="contact-links">
              <a href="mailto:gervasio_H@proton.me">
                <svg className="svg-icon" viewBox="0 0 24 24" style={{marginRight: '8px'}}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="zone-glitch" data-text="gervasio_H@proton.me">gervasio_H@proton.me</span>
              </a>
              <a href="https://github.com/Hesoyam91" target="_blank" rel="noreferrer">
                <svg className="svg-icon" viewBox="0 0 24 24" style={{marginRight: '8px'}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                <span className="zone-glitch" data-text="github.com/Hesoyam91">github.com/Hesoyam91</span>
              </a>
            </div>
          </div>
        </section>

        {/* Statement / Summary Monologue */}
        <section className="statement">
          <div className="statement-text">
            {hlIndex > -1 ? (
              <>
                <span>{p1Str}</span>
                {hlStr && (
                  <span 
                    className={`bright-hl ${typedSummary.length >= hlEnd ? 'zone-glitch' : ''}`}
                    data-text={summaryHL}
                  >
                    {hlStr}
                  </span>
                )}
                <span>{p3Str}</span>
                {typedSummary.length < summaryFull.length && <span className="typing-cursor">_</span>}
              </>
            ) : (
              <span>{typedSummary}</span>
            )}
          </div>
        </section>

        {/* Dynamic Horizontal Carousel for Main Projects */}
        <section className="carousel-section">
          <div className="carousel-header">
            <div className="section-label">
              <span className="blue-dot"></span>
              <span className="zone-glitch" data-text={t('projectsTitle')}>{t('projectsTitle')}</span>
            </div>
            <div className="carousel-nav">
               <button className="nav-arr" onClick={scrollLeft}>←</button>
               <button className="nav-arr" onClick={scrollRight}>→</button>
            </div>
          </div>
          
          <div className="carousel-wrapper">
            <div 
               className="carousel" 
               ref={carouselRef}
               onMouseEnter={stopAutoScroll}
               onMouseLeave={startAutoScroll}
               onTouchStart={stopAutoScroll}
               onTouchEnd={startAutoScroll}
            >
              {mainProjects.map((proj, i) => (
                <a 
                  href={proj.url || '#'} 
                  target={proj.url ? "_blank" : "_self"} 
                  rel="noreferrer" 
                  className="card" 
                  key={i}
                >
                  <div className="card-num">0{i + 1}</div>
                  <div className="card-top">
                    <h2 className="card-title">{proj.title}</h2>
                    <p className="card-desc">{proj.desc}</p>
                  </div>
                  <div className="btn-arrow">
                    [ {proj.url.includes('github') ? t('repoBtn') : 'Live Site'} ] →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Freelance & External Projects */}
        <section className="freelance-section">
           <div className="section-label" style={{ marginBottom: '40px' }}>
              <span className="blue-dot"></span>
              <span className="zone-glitch" data-text={t('pArea')}>{t('pArea')}</span>
           </div>
           <div className="freelance-grid">
               {freelanceProjects.map((f, i) => (
                 <a 
                   href={f.url || '#'} 
                   target={f.url ? "_blank" : "_self"} 
                   rel="noreferrer" 
                   className="freelance-card"
                   key={i}
                 >
                   <div className="freelance-info">
                     <h3>{f.title}</h3>
                     <p>{f.desc}</p>
                   </div>
                   {f.url && <div className="nav-arr" style={{border: 'none', background: 'transparent'}}>↗</div>}
                 </a>
               ))}
           </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="stack-section">
           <div className="section-label" style={{ marginBottom: '40px' }}>
              <span className="blue-dot"></span>
              <span className="zone-glitch" data-text={t('techStack')}>{t('techStack')}</span>
           </div>
           
           <div className="pills-container">
             <div>
                <div className="pill-group-title">{t('tech1')}</div>
                <div className="pills-row">
                  <div className="pill">LangChain</div>
                  <div className="pill">Llama 3</div>
                  <div className="pill">FastAPI</div>
                  <div className="pill">Python</div>
                  <div className="pill">Node.js</div>
                  <div className="pill">C#</div>
                  <div className="pill">SQL</div>
                </div>
             </div>
             <div>
                <div className="pill-group-title">{t('tech2')}</div>
                <div className="pills-row">
                  <div className="pill">React 18</div>
                  <div className="pill">Vite</div>
                  <div className="pill">Tailwind CSS v4</div>
                  <div className="pill">Ionic</div>
                  <div className="pill">HTML5 / CSS3</div>
                </div>
             </div>
             <div>
                <div className="pill-group-title">{t('tech3')}</div>
                <div className="pills-row">
                  <div className="pill">Azure Cloud</div>
                  <div className="pill">SQL Server</div>
                  <div className="pill">Git / GitHub</div>
                </div>
             </div>
           </div>
        </section>

        {/* Contact Footer */}
        <section className="freelance-section contact-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
           <div className="section-label" style={{ marginBottom: '30px' }}>
              <span className="blue-dot"></span>
              <span className="zone-glitch" data-text={t('contactMe')}>{t('contactMe')}</span>
           </div>
           <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--fg-mute)', marginBottom: '40px', marginTop: 0 }}>
              {t('contactSub')}
           </h2>
           <div>
              <a href="mailto:gervasio_H@proton.me" className="contact-mail">
                <svg className="svg-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span className="zone-glitch" data-text="gervasio_H@proton.me">gervasio_H@proton.me</span>
              </a>
           </div>
        </section>

      </div>
    </>
  );
}

export default App;
