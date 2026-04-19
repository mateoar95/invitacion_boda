const { useState, useEffect, useRef, useCallback } = React;

/* ============================================
   DATA
   ============================================ */
const WEDDING = {
  date: new Date('2026-11-28T16:00:00-05:00'),
  names: { her: 'Camila', him: 'Mateo', short: 'C & M', hashtag: '#CAM&MAT' },
  ceremony: {
    day: 'Sábado 28 de noviembre',
    year: '2026',
    time: '3:30 PM',
    arrive: '',
    venue: 'Casa Kapikua',
    address: 'Km 20 vía Santa Marta — Ciénaga',
    city: 'Santa Marta, Magdalena',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Kapikua+Santa+Marta',
    mapsEmbed: 'https://maps.google.com/maps?q=Casa%20Kapikua%20Santa%20Marta&t=m&z=15&output=embed&iwloc=near',
    coords: '11.0910° N  74.2185° W',
  },
  preboda: {
    day: 'Viernes 27 de noviembre',
    year: '2026',
    time: '5:00 PM',
    venue: 'BK Restobar',
    address: 'Cra 1 # 1 - 104, Edificio Cascadas del Rodadero',
    city: 'Rodadero, Santa Marta, Magdalena',
    note: 'Entrada por el edificio Cascadas del Rodadero',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=BK+Restobar+Rodadero+Santa+Marta',
    mapsEmbed: 'https://maps.google.com/maps?q=BK%20Restobar%20Rodadero%20Santa%20Marta&t=m&z=16&output=embed&iwloc=near',
    coords: '11.2000° N  74.2280° W',
    pinterestUrl: 'https://co.pinterest.com/tenoriocamila1/outfit-preboda/?invite_code=6efaf7edaee2413b8157842303891da9&sender=734227682908225709',
  },
  spotify: {
    playlistUrl: 'https://open.spotify.com/playlist/4I081EXqNbXUrCdQdMiKuZ?si=ovrocmreQyq1JB2K2Q2NDQ&pt=af3ada4b9d60635ca334a2a35e53a7d4&pi=pT-BUTeiQl-vS',
    embedUrl: 'https://open.spotify.com/embed/playlist/4I081EXqNbXUrCdQdMiKuZ?utm_source=generator&theme=0',
    uri: 'spotify:playlist:4I081EXqNbXUrCdQdMiKuZ',
  },
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbzaBZLJr3AoCFxUyeeI-yExHvYqDBvYK6CFvJqLcjDQ9LgNFRldtMKzaTGjlTIB0uvPJQ/exec',
  rsvpSheetUrl: 'https://docs.google.com/spreadsheets/d/1-dwnS65m2dm5lLe1KW1gZBi3TIH3hwvVQdeHTnN1mWw/edit',
  pinterest: {
    ellos: 'https://co.pinterest.com/tenoriocamila1/outfits-ellos/',
    ellas: 'https://co.pinterest.com/tenoriocamila1/outfit-ellas/?invite_code=7d83154532bf4237807b99041fd2aee5&sender=734227682908225709',
  },
  dresscode: {
    title: 'Playa Elegante',
    subtitle: 'Celebramos bajo el sol y las estrellas del Caribe. Ponte lindo, como siempre.',
    colors: [
      { name: 'Blanco', hex: '#f3efe6' },
      { name: 'Beige', hex: '#d8c9a8' },
      { name: 'Arena', hex: '#c2a878' },
    ],
  },
  gallery: [
    { src: 'photos/gallery-15.jpg', caption: 'Juntos mirando el horizonte', code: 'R001' },
    { src: 'photos/gallery-100.jpg', caption: 'Beso entre jardines', code: 'R002' },
    { src: 'photos/gallery-35.jpg', caption: 'Poniendo el anillo', code: 'R003' },
    { src: 'photos/gallery-160.jpg', caption: 'Sonriendo frente al mar', code: 'R004' },
    { src: 'photos/gallery-180.jpg', caption: 'Paseando juntos', code: 'R005' },
    { src: 'photos/gallery-240.jpg', caption: 'Beso al atardecer', code: 'R006' },
    { src: 'photos/gallery-120.jpg', caption: 'La propuesta', code: 'R007' },
    { src: 'photos/foto3.jpg', caption: 'Luz dorada', code: 'R008' },
    { src: 'photos/foto5.jpg', caption: 'Entre cipreses', code: 'R009' },
    { src: 'photos/foto7.jpg', caption: 'De la mano', code: 'R010' },
  ],
  polaroids: [
    { src: 'photos/couple-hero.jpg', caption: 'el día que dijimos sí' },
    { src: 'photos/foto4.jpg', caption: 'nuestro rincón' },
    { src: 'photos/foto6.jpg', caption: 'bajo la luz dorada' },
    { src: 'photos/foto8.jpg', caption: 'atardecer eterno' },
    { src: 'photos/gallery-35.jpg', caption: 'el sí' },
  ],
  hotels: [
    { tag: 'Recomendado', name: 'Irotama Resort', meta: 'Santa Marta · 5★\nPlaya privada · 15 min al venue', url: '#', img: 'photos/breaker-10.jpg' },
    { tag: 'Céntrico', name: 'Hotel Catalina', meta: 'Rodadero · 4★\nRestaurantes a pie · 20 min al venue', url: '#', img: 'photos/breaker-60.jpg' },
    { tag: 'Boutique', name: 'Casa Carolina', meta: 'Taganga · 4★\nVista al mar · 25 min al venue', url: '#', img: 'photos/breaker-90.jpg' },
  ],
  gifts: {
    cop: {
      titular: 'Mateo Arturo Rojas Guzman',
      tipoId: 'CC', nroId: '1020804682',
      banco: 'Global66', tipo: 'Depósito Electrónico',
      cuenta: '1020804682',
    },
    usd: {
      titular: 'Mateo Arturo Rojas Guzman',
      cuenta: '8335822818', accountType: 'Checking',
      routing: '026073150', swift: 'CMFGUS33',
      banco: 'Community Federal Savings Bank',
      address: '5 Penn Plaza, 14th Floor, New York, NY 10001, US',
    },
  },
  initialPlaylist: [
    { song: 'Crazy in Love', artist: 'Beyoncé', by: 'MARÍA P.' },
    { song: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', by: 'JUAN M.' },
    { song: 'La Bicicleta', artist: 'Shakira & Carlos Vives', by: 'LA MAMÁ' },
  ],
};

/* ============================================
   PARALLAX — wraps an image, translates it on scroll
   ============================================ */
function Parallax({ src, alt = '', speed = 0.12, className = '', style = {}, children, scale = 1.18 }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // how far the element's center is from viewport center, in px
      const off = (rect.top + rect.height / 2) - vh / 2;
      // Cap the translate to at most (scale-1)/2 * rect.height so the image never leaves its container
      const maxY = Math.max(0, (scale - 1) / 2 * rect.height - 2);
      const y = Math.max(-maxY, Math.min(maxY, -off * speed));
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale})`;
    };
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; update(); }); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [speed, scale]);
  return (
    <div ref={wrapRef} className={`parallax ${className}`} style={style}>
      <img ref={imgRef} src={src} alt={alt} className="parallax-img"/>
      {children}
    </div>
  );
}

/* ============================================
   PINTEREST ICON (small red logo)
   ============================================ */
function PinterestBadge({ url, label = 'Inspiración', size = 12 }) {
  return (
    <a className="pinterest-badge" href={url} target="_blank" rel="noopener" aria-label={`Pinterest · ${label}`} style={{'--pin-size': size + 'px'}}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.739.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.042-1.002 2.349-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    </a>
  );
}

/* ============================================
   SPOTIFY LOGO
   ============================================ */
function SpotifyLogo({ size = 28, color = '#1DB954' }) {
  return (
    <svg className="spotify-logo" viewBox="0 0 168 168" width={size} height={size} aria-hidden="true">
      <circle cx="84" cy="84" r="84" fill={color}/>
      <path fill="#000" d="M122.7 121.7c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.5-3 .7-6-.9-6.7-3.9-.7-3 .9-6 3.9-6.7 33.7-7.7 62.8-4.4 86.2 10 2.5 1.5 3.4 4.8 1.8 7.4zm10.3-22.9c-2 3.2-6.2 4.2-9.4 2.2-23.8-14.6-60.1-18.9-88.3-10.4-3.6 1.1-7.4-.9-8.5-4.5-1.1-3.6.9-7.4 4.5-8.5 32.2-9.8 72.3-5 99.6 11.8 3.2 2 4.2 6.2 2.1 9.4zm.9-23.9c-28.6-17-75.7-18.5-103-10.2-4.3 1.3-8.9-1.1-10.2-5.4-1.3-4.3 1.1-8.9 5.4-10.2 31.4-9.5 83.4-7.7 116.3 11.8 3.9 2.3 5.1 7.3 2.8 11.2-2.3 3.9-7.3 5.1-11.3 2.8z"/>
    </svg>
  );
}

/* ============================================
   BACKGROUND MUSIC — autoplays on envelope open, persistent mute toggle
   ============================================ */
function AudioPlayer({ active }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.6;
    a.loop = true;
    const tryPlay = () => a.play().catch(() => { /* autoplay blocked — will resume on first interaction */ });
    tryPlay();
    const resume = () => { tryPlay(); window.removeEventListener('pointerdown', resume); window.removeEventListener('keydown', resume); };
    window.addEventListener('pointerdown', resume, { once: true });
    window.addEventListener('keydown', resume, { once: true });
    return () => { window.removeEventListener('pointerdown', resume); window.removeEventListener('keydown', resume); };
  }, [active]);

  // Auto-mute when Spotify plays, unmute when it pauses
  useEffect(() => {
    if (!active) return;
    const onSpotify = (e) => {
      const playing = !!e.detail?.playing;
      const a = audioRef.current;
      if (!a) return;
      a.muted = playing;
      setMuted(playing);
    };
    window.addEventListener('spotify-playback', onSpotify);
    return () => window.removeEventListener('spotify-playback', onSpotify);
  }, [active]);

  const toggle = () => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  };

  if (!active) return null;
  return (
    <>
      <audio ref={audioRef} src="audio/patadas-de-ahogado.m4a" preload="auto" playsInline/>
      <button
        className="audio-toggle"
        onClick={toggle}
        aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4z"/>
            <line x1="22" y1="9" x2="16" y2="15"/>
            <line x1="16" y1="9" x2="22" y2="15"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4z"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>
    </>
  );
}

/* ============================================
   CURSOR
   ============================================ */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e) => { tx = e.clientX; ty = e.clientY; if (dotRef.current) { dotRef.current.style.transform = `translate(${tx}px, ${ty}px)`; } };
    const loop = () => {
      x += (tx - x) * 0.15; y += (ty - y) * 0.15;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    const over = (e) => {
      const tgt = e.target.closest('a, button, .polaroid, .gift-card, .rsvp-choice, .rsvp-chip, .tweak-option, .tweak-palette, .event-map-btn, .event-map-open, .playlist-vinyl, .playlist-cta, .pinterest-badge, input, textarea');
      if (tgt && cursorRef.current) cursorRef.current.classList.add('hover');
    };
    const out = () => cursorRef.current && cursorRef.current.classList.remove('hover');
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    requestAnimationFrame(loop);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}

/* ============================================
   ENVELOPE INTRO
   ============================================ */
function EnvelopeIntro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);
  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => { setClosed(true); onOpen(); }, 2400);
  };
  return (
    <div className={`envelope-screen${closed ? ' open' : ''}`}>
      <div className="envelope-bg-texture"></div>
      <div className="envelope-corner-tl"></div>
      <div className="envelope-corner-tr"></div>
      <div className="envelope-corner-bl"></div>
      <div className="envelope-corner-br"></div>
      <div className="envelope-meta">SANTA MARTA · 28 . 11 . 2026</div>
      <div className={`envelope${opening ? ' opening' : ''}`}>
        <div className="envelope-body"></div>
        <div className="envelope-letter">
          <div className="envelope-letter-inner">
            <div className="names">Camila <span className="amp">&</span> Mateo</div>
            <div className="date">28 . 11 . 2026</div>
          </div>
        </div>
        <div className="envelope-flap"></div>
        <div className="envelope-seal" onClick={handleOpen}>
          <span className="envelope-seal-monogram">C&M</span>
        </div>
      </div>
      <div className="envelope-instruction">Toca el sello para abrir</div>
    </div>
  );
}

/* ============================================
   NAV
   ============================================ */
function Nav({ chapter, theme, onToggleTheme, onOpenTweaks }) {
  return (
    <nav className="nav">
      <div className="nav-logo">Camila & Mateo</div>
      <div className="nav-center">
        <span className="nav-chapter">{chapter}</span>
      </div>
      <button className="nav-toggle" onClick={onToggleTheme}>
        {theme === 'day' ? '☼ Día' : '☾ Noche'}
      </button>
    </nav>
  );
}

/* ============================================
   HERO
   ============================================ */
function HeroCountdown() {
  const [t, setT] = useState(() => computeDiff());
  function computeDiff() {
    const now = new Date();
    const diff = Math.max(0, WEDDING.date - now);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }
  useEffect(() => { const i = setInterval(() => setT(computeDiff()), 1000); return () => clearInterval(i); }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="hero-countdown">
      <div className="hero-countdown-label">— El tiempo corre —</div>
      <div className="hero-countdown-row">
        {[['Días', t.d], ['Horas', pad(t.h)], ['Min', pad(t.m)], ['Seg', pad(t.s)]].map(([label, val]) => (
          <div key={label} className="hero-countdown-unit">
            <div className="hero-countdown-value">{val}</div>
            <div className="hero-countdown-unitlabel">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ heroStyle }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  if (heroStyle === 'centered') {
    return (
      <section className={`hero${loaded ? ' loaded' : ''}`}>
        <Parallax className="hero-bg" src="photos/hero-dance.jpg" speed={0.15} scale={1.2}/>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-topline">
            <span>EL COMIENZO</span>
            <span>SANTA MARTA <span className="sep">·</span> COL</span>
          </div>
          <div className="hero-names">
            <div className="nos-casamos">Nos Casamos</div>
            <h1>
              <span className="name">Camila</span>
              <span className="amp">&</span>
              <span className="name">Mateo</span>
            </h1>
          </div>
          <div className="hero-date">
            <div className="date-label">— Save the date —</div>
            <div className="date-value">Veintiocho de Noviembre</div>
            <div className="date-mono">28 . 11 . 2026</div>
            <HeroCountdown/>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Desliza</span>
        </div>
      </section>
    );
  }

  if (heroStyle === 'editorial') {
    return (
      <section className={`hero${loaded ? ' loaded' : ''}`} style={{background:'var(--cream)'}}>
        <div className="hero-overlay" style={{background:'transparent'}}></div>
        <div className="hero-content" style={{color:'var(--forest-deep)', gridTemplateRows:'auto 1fr auto', gap:'20px'}}>
          <div className="hero-topline" style={{opacity:0.8}}>
            <span>SANTA MARTA <span className="sep">·</span> 2026</span>
            <span>INVITACIÓN N° 001</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr', placeItems:'center', gap:'30px'}}>
            <div style={{width:'min(70vw, 280px)', aspectRatio:'3/4', overflow:'hidden', border:'1px solid var(--line)'}}>
              <img src="photos/hero-dance.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'saturate(0.85) contrast(1.05)'}}/>
            </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.5em', textTransform:'uppercase', marginBottom:'1rem', color:'var(--moss)'}}>Nos Casamos</div>
              <h1 style={{fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight:300, fontSize:'clamp(3rem, 13vw, 9rem)', lineHeight:0.9, letterSpacing:'-0.03em'}}>
                Camila
                <br/>
                <span style={{color:'#c4574a'}}>&</span>
                <br/>
                Mateo
              </h1>
              <HeroCountdown/>
            </div>
          </div>
          <div className="hero-topline" style={{opacity:0.8}}>
            <span>28 . 11 . 2026</span>
            <span>SÁBADO · 4PM</span>
          </div>
        </div>
        <div className="hero-scroll" style={{color:'var(--forest-deep)'}}>
          <div className="scroll-line"></div>
          <span>Desliza</span>
        </div>
      </section>
    );
  }

  // Default: fullbleed split
  return (
    <section className={`hero${loaded ? ' loaded' : ''}`}>
      <Parallax className="hero-bg" src="photos/hero-dance.jpg" speed={0.15} scale={1.2}/>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-topline">
          <span>EST. 2026 <span className="sep">·</span> SANTA MARTA</span>
          <span></span>
        </div>
        <div className="hero-names">
          <div className="nos-casamos">Nos Casamos</div>
          <h1>
            <span className="name">Camila</span>
            <span className="amp">&</span>
            <span className="name">Mateo</span>
          </h1>
        </div>
        <div className="hero-date">
          <div className="date-label">— Save the date —</div>
          <div className="date-value">Veintiocho de Noviembre</div>
          <div className="date-mono">28 . 11 . 2026</div>
          <HeroCountdown/>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Desliza</span>
      </div>
    </section>
  );
}

/* ============================================
   COUNTDOWN
   ============================================ */
function Countdown() {
  const [t, setT] = useState(computeDiff());
  function computeDiff() {
    const now = new Date();
    const diff = Math.max(0, WEDDING.date - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  }
  useEffect(() => { const i = setInterval(() => setT(computeDiff()), 1000); return () => clearInterval(i); }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <section className="countdown-section">
      <div className="section-chapter"><span className="bullet"></span>I · LA CUENTA</div>
      <div className="countdown-wrap">
        <div className="countdown-label" data-reveal>· El tiempo corre ·</div>
        <div className="countdown-title" data-reveal data-reveal-delay="1">
          Nos vemos<br/>
          <em style={{color:'#c4574a'}}>en&nbsp;muy&nbsp;poco</em>
        </div>
        <div className="countdown-grid" data-reveal data-reveal-delay="2">
          {[['Días', t.d], ['Horas', pad(t.h)], ['Min', pad(t.m)], ['Seg', pad(t.s)]].map(([label, val]) => (
            <div key={label} className="countdown-unit">
              <div className="countdown-value">{val}</div>
              <div className="countdown-unit-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MARQUEE
   ============================================ */
function Marquee() {
  const text = (
    <span>
      Camila <span className="dot">✦</span> Mateo <span className="dot">✦</span> 28.11.2026 <span className="dot">✦</span> Santa Marta <span className="dot">✦</span> Playa Elegante <span className="dot">✦</span>
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {text}{text}{text}{text}
      </div>
    </div>
  );
}

/* ============================================
   EVENTS (Ceremonia + Preboda)
   ============================================ */
function Events() {
  return (
    <section className="event-section">
      <div className="section-chapter" style={{position:'absolute'}}><span className="bullet"></span>I · EL DÍA</div>
      <div className="event-grid">
        <div className="event-card" data-reveal>
          <div className="event-card-image">
            <Parallax src="photos/preboda-bk.png" alt="Preboda — Terraza Puerto Luz BK" speed={0.18} scale={1.3}/>
          </div>
          <div className="event-card-meta">
            <span>LA VÍSPERA</span>
          </div>
          <h3 className="event-card-title-row">
            Preboda
            <PinterestBadge url={WEDDING.preboda.pinterestUrl} label="Inspiración preboda" size={24}/>
          </h3>
          <div className="event-detail-row">
            <span className="label">Fecha</span>
            <span className="value">{WEDDING.preboda.day}<small>{WEDDING.preboda.year}</small></span>
          </div>
          <div className="event-detail-row">
            <span className="label">Hora</span>
            <span className="value">{WEDDING.preboda.time}</span>
          </div>
          <div className="event-detail-row">
            <span className="label">Lugar</span>
            <span className="value">{WEDDING.preboda.venue}<small>{WEDDING.preboda.address}</small></span>
          </div>
          <div className="event-detail-row">
            <span className="label">Ciudad</span>
            <span className="value">{WEDDING.preboda.city}</span>
          </div>
          <div className="event-map-embed">
            <div className="event-map-header">
              <span className="event-map-kicker">— Cómo llegar —</span>
              <a href={WEDDING.preboda.mapsUrl} target="_blank" rel="noopener" className="event-map-open">
                Abrir en Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
              </a>
            </div>
            <div className="event-map-frame">
              <iframe
                src={WEDDING.preboda.mapsEmbed}
                title="Ubicación de la preboda"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="event-card" data-reveal data-reveal-delay="2">
          <div className="event-card-image">
            <Parallax src="photos/section-ceremonia.jpg" alt="Ceremonia y Recepción" speed={0.18} scale={1.3}/>
          </div>
          <div className="event-card-meta">
            <span>ACTO PRINCIPAL</span>
          </div>
          <h3>Ceremonia y Recepción</h3>
          <div className="event-detail-row">
            <span className="label">Fecha</span>
            <span className="value">{WEDDING.ceremony.day}<small>{WEDDING.ceremony.year}</small></span>
          </div>
          <div className="event-detail-row">
            <span className="label">Hora</span>
            <span className="value">{WEDDING.ceremony.time}<small>{WEDDING.ceremony.arrive}</small></span>
          </div>
          <div className="event-detail-row">
            <span className="label">Lugar</span>
            <span className="value">{WEDDING.ceremony.venue}<small>{WEDDING.ceremony.address}</small></span>
          </div>
          <div className="event-detail-row">
            <span className="label">Ciudad</span>
            <span className="value">{WEDDING.ceremony.city}</span>
          </div>
          <div className="event-map-embed">
            <div className="event-map-header">
              <span className="event-map-kicker">— Cómo llegar —</span>
              <a href={WEDDING.ceremony.mapsUrl} target="_blank" rel="noopener" className="event-map-open">
                Abrir en Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
              </a>
            </div>
            <div className="event-map-frame">
              <iframe
                src={WEDDING.ceremony.mapsEmbed}
                title="Ubicación de la ceremonia y recepción"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DRESSCODE
   ============================================ */
function DressCode() {
  return (
    <section className="dresscode-section">
      <div className="section-chapter"><span className="bullet"></span>II · CÓMO VESTIR</div>
      <div className="dresscode-layout">
        <div className="dresscode-hero">
          <div className="dresscode-label" data-reveal>— Dress Code —</div>
          <h2 className="dresscode-title" data-reveal data-reveal-delay="1">
            Playa <em style={{color:'#c4574a'}}>Elegante</em>
          </h2>
          <p className="dresscode-subtitle" data-reveal data-reveal-delay="2">
            {WEDDING.dresscode.subtitle}
          </p>
        </div>
        <div className="dresscode-pair">
          <div className="dresscode-card" data-reveal>
            <span className="big-symbol">H</span>
            <h4>Ellos</h4>
            <ul>
              <li><span className="k">Camisa</span><span className="v">Lino, manga larga</span></li>
              <li><span className="k">Pantalón</span><span className="v">Lino fresco</span></li>
              <li><span className="k">Colores</span><span className="v">Blanco, beige, arena</span></li>
              <li><span className="k">Calzado</span><span className="v">Mocasín o alpargata</span></li>
            </ul>
            <div className="dresscode-card-pin">
              <PinterestBadge url={WEDDING.pinterest.ellos} label="Inspiración ellos" size={24}/>
            </div>
          </div>
          <div className="dresscode-card" data-reveal data-reveal-delay="1">
            <span className="big-symbol">M</span>
            <h4>Ellas</h4>
            <ul>
              <li><span className="k">Vestido</span><span className="v">Fluido, largo</span></li>
              <li><span className="k">Calzado</span><span className="v">Sandalia plana o tacón corrido</span></li>
              <li><span className="k">Colores</span><span className="v">Sólidos o estampados</span></li>
              <li><span className="k">Accesorios</span><span className="v">Ligeros, naturales</span></li>
            </ul>
            <div className="dresscode-card-pin">
              <PinterestBadge url={WEDDING.pinterest.ellas} label="Inspiración ellas" size={24}/>
            </div>
          </div>
        </div>
        <div className="dresscode-note" data-reveal data-reveal-delay="2">
          <span className="note-label">— Nota importante —</span>
          Chicas, les pedimos evitar el color <strong>blanco</strong> y los <strong>tonos pastel</strong>, ya que están reservados para la novia.
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BREAKER (cinematic full-bleed)
   ============================================ */
function Breaker({ src, topLeft, topRight, quote, bottomLeft, bottomRight, objectPosition }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && el.classList.add('in')), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const el = ref.current, img = imgRef.current;
    if (!el || !img) return;
    let raf = 0;
    const scale = 1.35;
    const speed = 0.18;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const off = (rect.top + rect.height / 2) - vh / 2;
      const maxY = Math.max(0, (scale - 1) / 2 * rect.height - 2);
      const y = Math.max(-maxY, Math.min(maxY, -off * speed));
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale})`;
    };
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; update(); }); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="breaker">
      <div className="breaker-img"><img ref={imgRef} src={src} alt="" style={objectPosition ? {objectPosition} : undefined}/></div>
      <div className="breaker-overlay"></div>
      <div className="breaker-content">
        <div className="breaker-topline">
          <span>{topLeft}</span>
          <span>{topRight}</span>
        </div>
        <div className="breaker-quote">{quote}</div>
        <div className="breaker-bottomline">
          <span>{bottomLeft}</span>
          <span>{bottomRight}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   GALLERY (film strip)
   ============================================ */
function Gallery({ galleryStyle }) {
  const trackRef = useRef(null);
  const [pos, setPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startPos: 0 });

  const clamp = (p) => {
    if (!trackRef.current) return p;
    const max = trackRef.current.scrollWidth - trackRef.current.parentElement.clientWidth;
    return Math.max(-max, Math.min(0, p));
  };

  const onDown = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    dragState.current = { startX: x, startPos: pos };
  };
  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - dragState.current.startX;
    setPos(clamp(dragState.current.startPos + dx));
  };
  const onUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onUp);
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
      };
    }
  }, [isDragging, pos]);

  const nudge = (dir) => setPos((p) => clamp(p + dir * 300));

  if (galleryStyle === 'grid') {
    return (
      <section className="gallery-section">
        <div className="gallery-header">
          <div>
            <div className="section-kicker">III · La historia en cuadros</div>
            <h2 className="section-title">Galería de Fotos</h2>
          </div>
          <div className="gallery-count">{WEDDING.gallery.length.toString().padStart(2,'0')} momentos</div>
        </div>
        <div style={{maxWidth:'1400px', margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px'}}>
          {WEDDING.gallery.map((g, i) => (
            <div key={i} style={{aspectRatio: i % 3 === 0 ? '3/4' : '1', overflow:'hidden', background:'#2a2819', position:'relative'}}>
              <img src={g.src} alt={g.caption} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default: film strip
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div>
          <div className="section-kicker" data-reveal>III · La historia en cuadros</div>
          <h2 className="section-title" data-reveal data-reveal-delay="1">
            Galería de<br/><em style={{color:'#c4574a'}}>Fotos</em>
          </h2>
        </div>
        <div className="gallery-count" data-reveal data-reveal-delay="2">
          ARRASTRA PARA VER →
        </div>
      </div>
      <div
        className="gallery-film"
        onMouseDown={onDown}
        onTouchStart={onDown}
      >
        <div ref={trackRef} className="film-track" style={{transform: `translateX(${pos}px)`, transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.16,1,0.3,1)'}}>
          {WEDDING.gallery.map((g, i) => (
            <div key={i} className="film-frame">
              {g.src ? (
                <img src={g.src} alt={g.caption} draggable={false}/>
              ) : (
                <div className="placeholder-img">
                  <div className="placeholder-label">{g.code}<br/><span style={{opacity:0.6}}>{g.caption}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="gallery-controls">
        <button onClick={() => nudge(1)}>←</button>
        <span>DESLIZA O USA LAS FLECHAS</span>
        <button onClick={() => nudge(-1)}>→</button>
      </div>
    </section>
  );
}

/* ============================================
   POLAROIDS (draggable)
   ============================================ */
function Polaroids() {
  const stageRef = useRef(null);
  const [pols, setPols] = useState(() =>
    WEDDING.polaroids.map((p, i) => ({
      ...p,
      id: i,
      x: 50 + i * 60,
      y: 40 + (i % 2) * 50,
      rot: -8 + i * 4,
      z: i + 1,
    }))
  );
  const [dragging, setDragging] = useState(null);
  const dragRef = useRef({});
  const maxZ = useRef(pols.length);

  // Arrange initial spread based on stage size
  useEffect(() => {
    const arrange = () => {
      if (!stageRef.current) return;
      const w = stageRef.current.clientWidth;
      const h = stageRef.current.clientHeight;
      const pw = Math.min(220, w / 3);
      setPols((cur) => cur.map((p, i) => {
        const cols = 3;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gapX = (w - pw * cols) / (cols + 1);
        const x = gapX + col * (pw + gapX);
        const y = 20 + row * 200 + (col % 2) * 30;
        return { ...p, x: Math.max(10, Math.min(w - pw - 10, x)), y };
      }));
    };
    arrange();
    window.addEventListener('resize', arrange);
    return () => window.removeEventListener('resize', arrange);
  }, []);

  const onDown = (e, id) => {
    const pt = e.touches ? e.touches[0] : e;
    const pol = pols.find((p) => p.id === id);
    dragRef.current = { id, startX: pt.clientX, startY: pt.clientY, origX: pol.x, origY: pol.y };
    maxZ.current += 1;
    setPols((cur) => cur.map((p) => p.id === id ? { ...p, z: maxZ.current } : p));
    setDragging(id);
  };
  const onMove = (e) => {
    if (dragging == null) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - dragRef.current.startX;
    const dy = pt.clientY - dragRef.current.startY;
    setPols((cur) => cur.map((p) => {
      if (p.id !== dragging) return p;
      const stage = stageRef.current;
      const pw = 220;
      const newX = Math.max(-30, Math.min((stage?.clientWidth ?? 800) - pw + 30, dragRef.current.origX + dx));
      const newY = Math.max(-20, Math.min((stage?.clientHeight ?? 500) - 100, dragRef.current.origY + dy));
      return { ...p, x: newX, y: newY };
    }));
  };
  const onUp = () => setDragging(null);

  useEffect(() => {
    if (dragging != null) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
      };
    }
  }, [dragging]);

  return (
    <section className="polaroid-section">
      <div className="section-chapter"><span className="bullet"></span>IV · RECUERDOS</div>
      <div className="polaroid-intro">
        <h2 data-reveal>Nuestros pequeños<br/><em style={{color:'#c4574a'}}>momentos</em></h2>
        <p data-reveal data-reveal-delay="1">— arrastra las fotos —</p>
      </div>
      <div ref={stageRef} className="polaroid-stage">
        {pols.map((p) => (
          <div
            key={p.id}
            className={`polaroid${dragging === p.id ? ' dragging' : ''}`}
            style={{
              left: p.x,
              top: p.y,
              transform: `rotate(${dragging === p.id ? 0 : p.rot}deg)`,
              zIndex: p.z,
              transition: dragging === p.id ? 'none' : 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseDown={(e) => onDown(e, p.id)}
            onTouchStart={(e) => onDown(e, p.id)}
          >
            <div className="polaroid-photo">
              {p.src ? (
                <img src={p.src} alt={p.caption} draggable={false}/>
              ) : (
                <div className="placeholder-img">
                  <div className="placeholder-label">{p.caption}</div>
                </div>
              )}
            </div>
            <div className="polaroid-caption">{p.caption}</div>
          </div>
        ))}
        <div className="polaroid-drag-hint">— arrástralas a tu gusto —</div>
      </div>
    </section>
  );
}

/* ============================================
   RSVP (multi-step)
   ============================================ */
function Rsvp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name1: '',
    name2: '',
    events: { preboda: false, ceremonia: false },
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleEvent = (key) => setData((d) => ({ ...d, events: { ...d.events, [key]: !d.events[key] } }));

  const canNext = [
    data.name1.trim().length > 1 || data.name2.trim().length > 1,
    data.events.preboda || data.events.ceremonia,
    true,
  ][step];

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const payload = {
      timestamp: new Date().toISOString(),
      name1: data.name1.trim(),
      name2: data.name2.trim(),
      preboda: data.events.preboda,
      ceremonia: data.events.ceremonia,
      message: data.message.trim(),
    };
    try {
      if (WEDDING.rsvpEndpoint) {
        await fetch(WEDDING.rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } else {
        console.log('[RSVP] endpoint no configurado — payload:', payload);
      }
      setStep(3);
    } catch (err) {
      setSubmitError('No pudimos registrar tu respuesta. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const onPrimary = () => {
    if (step === 2) submit();
    else if (canNext) setStep((s) => Math.min(3, s + 1));
  };

  const firstName = (data.name1.trim() || data.name2.trim()).split(' ')[0] || '';
  const attendingBoth = data.events.preboda && data.events.ceremonia;
  const successLine = attendingBoth
    ? 'Nos vemos en la preboda y en la ceremonia.'
    : data.events.preboda
      ? 'Nos vemos en la preboda.'
      : 'Nos vemos en la ceremonia & recepción.';

  return (
    <section className="rsvp-section">
      <div className="section-chapter"><span className="bullet"></span>IV · CONFIRMA</div>
      <div className="rsvp-wrap">
        <h2 className="rsvp-title" data-reveal>
          Confirma tu<br/><em style={{color:'#c4574a'}}>asistencia</em>
        </h2>
        <div className="rsvp-subtitle" data-reveal data-reveal-delay="1">— Tu presencia es el mejor regalo —</div>

        <div className="rsvp-steps">
          {['Quién', 'Asistencia', 'Detalles', 'Listo'].map((s, i) => (
            <div key={s} className={`rsvp-step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
              <span className="num">{i < step ? '✓' : i + 1}</span>
              <span className="rsvp-step-text">{s}</span>
            </div>
          ))}
        </div>

        <div className="rsvp-form-stage">
          {/* Step 0: Names */}
          <div className={`rsvp-step-panel${step === 0 ? ' active' : ''}`}>
            <div className="rsvp-field">
              <label>Invitado 1 — Nombre completo</label>
              <input
                type="text"
                value={data.name1}
                onChange={(e) => set('name1', e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </div>
            <div className="rsvp-field">
              <label>Invitado 2 — Nombre completo <span style={{opacity:0.7, letterSpacing:0, textTransform:'none', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'1.1em'}}>(Si aplica)</span></label>
              <input
                type="text"
                value={data.name2}
                onChange={(e) => set('name2', e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </div>
          </div>

          {/* Step 1: Events */}
          <div className={`rsvp-step-panel${step === 1 ? ' active' : ''}`}>
            <div className="rsvp-field">
              <label>¿A cuáles eventos nos acompañas? <span style={{opacity:0.5, letterSpacing:0, textTransform:'none', fontFamily:'var(--font-display)', fontStyle:'italic'}}>(uno o ambos)</span></label>
              <div className="rsvp-choice-grid">
                <button
                  className={`rsvp-choice${data.events.preboda ? ' selected' : ''}`}
                  onClick={() => toggleEvent('preboda')}
                >
                  <span className="icon" style={{fontSize:'1.6rem'}}>✦</span>
                  <span className="label">Preboda</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.3em', opacity:0.55, marginTop:6}}>VIE 27 · BK RESTOBAR</span>
                </button>
                <button
                  className={`rsvp-choice${data.events.ceremonia ? ' selected' : ''}`}
                  onClick={() => toggleEvent('ceremonia')}
                >
                  <span className="icon" style={{fontSize:'1.6rem'}}>✦</span>
                  <span className="label">Ceremonia & Recepción</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.3em', opacity:0.55, marginTop:6}}>SÁB 28 · CASA KAPIKUA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Message */}
          <div className={`rsvp-step-panel${step === 2 ? ' active' : ''}`}>
            <div className="rsvp-field">
              <label>Un mensaje para los novios <span style={{opacity:0.5, letterSpacing:0, textTransform:'none', fontFamily:'var(--font-display)', fontStyle:'italic'}}>(opcional)</span></label>
              <textarea
                value={data.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Escribe lo que quieras decirles..."
              />
            </div>
            {submitError && (
              <div style={{color:'#c4574a', fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.2em', marginTop:16}}>
                {submitError}
              </div>
            )}
          </div>

          {/* Step 3: Success */}
          <div className={`rsvp-step-panel${step === 3 ? ' active' : ''}`}>
            <div className="rsvp-success">
              <div className="rsvp-success-title">¡Nos vemos pronto!</div>
              <div className="rsvp-success-text">
                {firstName ? `Gracias ${firstName}. ` : 'Gracias. '}{successLine}
              </div>
            </div>
          </div>
        </div>

        <div className="rsvp-nav" style={{visibility: step === 3 ? 'hidden' : 'visible'}}>
          <button className="rsvp-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || submitting}>
            ← Atrás
          </button>
          <button
            className="rsvp-btn primary"
            onClick={onPrimary}
            disabled={!canNext || submitting}
          >
            {submitting ? 'Enviando...' : step === 2 ? 'Confirmar' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   GIFTS
   ============================================ */
function Gifts() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (k) => setExpanded((cur) => cur === k ? null : k);
  return (
    <section className="gifts-section">
      <div className="section-chapter"><span className="bullet"></span>V · DETALLES</div>
      <div className="gifts-grid">
        <div className="gifts-intro">
          <div className="section-kicker" data-reveal>— Sugerencia de regalo —</div>
          <h2 data-reveal data-reveal-delay="1">Un<br/><em style={{color:'#c4574a'}}>detalle</em></h2>
          <p data-reveal data-reveal-delay="2">
            El mejor regalo es tu presencia. Pero si deseas tener un detalle con nosotros para esta nueva etapa, te compartimos estas opciones.
          </p>
        </div>
        <div className="gifts-cards">
          <div className={`gift-card${expanded === 'cop' ? ' expanded' : ''}`} onClick={() => toggle('cop')}>
            <div className="gift-card-head">
              <div className="gift-card-currency">
                <span className="flag-mini" aria-hidden="true">
                  <svg viewBox="0 0 9 6"><rect width="9" height="3" fill="#FCD116"/><rect y="3" width="9" height="1.5" fill="#003893"/><rect y="4.5" width="9" height="1.5" fill="#CE1126"/></svg>
                </span>
                COP
              </div>
              <div className="gift-card-bank">{WEDDING.gifts.cop.banco} · Colombia</div>
            </div>
            <div style={{fontSize:'0.85rem', opacity:0.7, marginBottom:'4px'}}>Consignación en pesos colombianos</div>
            <div className="gift-card-details">
              <div className="gift-detail-row"><span className="k">Titular</span><span className="v">{WEDDING.gifts.cop.titular}</span></div>
              <div className="gift-detail-row"><span className="k">Tipo ID</span><span className="v">{WEDDING.gifts.cop.tipoId}</span></div>
              <div className="gift-detail-row"><span className="k">Nº ID</span><span className="v">{WEDDING.gifts.cop.nroId}</span></div>
              <div className="gift-detail-row"><span className="k">Banco</span><span className="v">{WEDDING.gifts.cop.banco}</span></div>
              <div className="gift-detail-row"><span className="k">Tipo</span><span className="v">{WEDDING.gifts.cop.tipo}</span></div>
              <div className="gift-detail-row"><span className="k">Nº Cuenta</span><span className="v">{WEDDING.gifts.cop.cuenta}</span></div>
            </div>
          </div>
          <div className={`gift-card${expanded === 'usd' ? ' expanded' : ''}`} onClick={() => toggle('usd')}>
            <div className="gift-card-head">
              <div className="gift-card-currency">
                <span className="flag-mini" aria-hidden="true">
                  <svg viewBox="0 0 19 10">
                    <rect width="19" height="10" fill="#fff"/>
                    {[0,2,4,6,8,10,12].map(i => <rect key={i} y={i*(10/13)} width="19" height={10/13} fill="#B22234"/>)}
                    <rect width="7.6" height="5.38" fill="#3C3B6E"/>
                  </svg>
                </span>
                USD
              </div>
              <div className="gift-card-bank">Int'l · United States</div>
            </div>
            <div style={{fontSize:'0.85rem', opacity:0.7, marginBottom:'4px'}}>Consignación en dólares americanos</div>
            <div className="gift-card-details">
              <div className="gift-detail-row"><span className="k">Titular</span><span className="v">{WEDDING.gifts.usd.titular}</span></div>
              <div className="gift-detail-row"><span className="k">Account</span><span className="v">{WEDDING.gifts.usd.cuenta}</span></div>
              <div className="gift-detail-row"><span className="k">Type</span><span className="v">{WEDDING.gifts.usd.accountType}</span></div>
              <div className="gift-detail-row"><span className="k">Routing</span><span className="v">{WEDDING.gifts.usd.routing}</span></div>
              <div className="gift-detail-row"><span className="k">Swift</span><span className="v">{WEDDING.gifts.usd.swift}</span></div>
              <div className="gift-detail-row"><span className="k">Banco</span><span className="v">{WEDDING.gifts.usd.banco}</span></div>
              <div className="gift-detail-row"><span className="k">Address</span><span className="v">{WEDDING.gifts.usd.address}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   HOTELS
   ============================================ */
function Hotels() {
  return (
    <section className="hotels-section">
      <div className="section-chapter"><span className="bullet"></span>VIII · DÓNDE QUEDARSE</div>
      <div className="hotels-header">
        <div>
          <div className="section-kicker" data-reveal>— Hospedaje recomendado —</div>
          <h2 className="hotels-title" data-reveal data-reveal-delay="1">
            Dónde<br/><em style={{color:'#e8d9b8'}}>quedarse</em>
          </h2>
        </div>
        <div style={{fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.7, maxWidth:'280px', lineHeight:1.6}}>
          Santa Marta tiene opciones para todos los estilos. Estas son nuestras recomendaciones.
        </div>
      </div>
      <div className="hotels-grid">
        {WEDDING.hotels.map((h, i) => (
          <div key={h.name} className="hotel-card" data-reveal data-reveal-delay={i+1}>
            <div className="hotel-tag">— {h.tag} —</div>
            <div className="hotel-image"><img src={h.img} alt={h.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
            <div className="hotel-name">{h.name}</div>
            <div className="hotel-meta" style={{whiteSpace:'pre-line'}}>{h.meta}</div>
            <a className="hotel-link" href={h.url}>Reservar →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================
   PLAYLIST
   ============================================ */
/* ============================================
   PLAYLIST (Spotify embed)
   ============================================ */
function Playlist() {
  const [spinning, setSpinning] = useState(true);
  const embedRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const init = (IFrameAPI) => {
      if (cancelled || !embedRef.current) return;
      const options = {
        uri: WEDDING.spotify.uri,
        width: '100%',
        height: 420,
        theme: 0,
      };
      IFrameAPI.createController(embedRef.current, options, (EmbedController) => {
        controllerRef.current = EmbedController;
        EmbedController.addListener('playback_update', (e) => {
          const d = e.data || {};
          const playing = !d.isPaused && !d.isBuffering && typeof d.position === 'number' && d.position > 0;
          window.dispatchEvent(new CustomEvent('spotify-playback', { detail: { playing } }));
        });
      });
    };
    if (window.SpotifyIframeApi || window.onSpotifyIframeApiReadyInvoked) {
      init(window.SpotifyIframeApi);
    } else {
      const prev = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.SpotifyIframeApi = IFrameAPI;
        window.onSpotifyIframeApiReadyInvoked = true;
        if (typeof prev === 'function') prev(IFrameAPI);
        init(IFrameAPI);
      };
    }
    return () => {
      cancelled = true;
      try { controllerRef.current?.destroy?.(); } catch (_) {}
      controllerRef.current = null;
    };
  }, []);

  return (
    <section className="playlist-section">
      <div className="section-chapter"><span className="bullet"></span>VI · LA MÚSICA</div>
      <div className="playlist-wrap">
        <div className="playlist-brand" data-reveal>
          <SpotifyLogo size={34}/>
          <span>Spotify</span>
          <span className="playlist-brand-sep">·</span>
          <span className="playlist-brand-meta">Playlist colaborativa</span>
        </div>
        <h2 className="playlist-title" data-reveal data-reveal-delay="1">
          Pon el<br/><em style={{color:'#c4574a'}}>soundtrack</em>
        </h2>
        <div className="playlist-sub" data-reveal data-reveal-delay="2">— Escucha, sigue y sugiere canciones en Spotify —</div>

        <div className="playlist-stage" data-reveal data-reveal-delay="3">
          <div
            className={`playlist-vinyl${!spinning ? ' paused' : ''}`}
            onClick={() => setSpinning((s) => !s)}
            aria-label="Pausar/reanudar vinilo"
          >
            <div className="playlist-vinyl-center"></div>
          </div>
          <div className="playlist-embed">
            <div ref={embedRef}></div>
          </div>
        </div>

        <div className="playlist-cta-row" data-reveal data-reveal-delay="4">
          <a className="playlist-cta" href={WEDDING.spotify.playlistUrl} target="_blank" rel="noopener">
            <SpotifyLogo size={22}/>
            <span>Abrir en Spotify</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H9M17 7V15"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg"><img src="photos/footer-bg.jpg" alt=""/></div>
      <div className="footer-overlay"></div>
      <div className="footer-inner">
        <div className="footer-huge">
          Camila<br/>
          <span className="amp">&</span><br/>
          Mateo
        </div>
        <div className="footer-phrase">
          Con todo nuestro amor,<br/>los esperamos para celebrar juntos.
        </div>
        <div className="footer-meta">
          <span>28 . 11 . 2026</span>
          <span>·</span>
          <span>{WEDDING.names.hashtag}</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   TWEAKS PANEL
   ============================================ */
const PALETTES = {
  musgo: { pearl:'#CDCECB', sage:'#B1B1A2', moss:'#828367', taupe:'#8C7E6A', forest:'#4F4D32', accent:'#c4574a' },
  arena: { pearl:'#e8dcc8', sage:'#d4c4a8', moss:'#b8956a', taupe:'#8a7560', forest:'#5a4a3a', accent:'#c4574a' },
  noche: { pearl:'#3a3a2e', sage:'#4a4a3c', moss:'#6b6b55', taupe:'#7a7260', forest:'#0f0e08', accent:'#e8d9b8' },
  coral: { pearl:'#f2e6dc', sage:'#dfc5b5', moss:'#a87560', taupe:'#8c5a46', forest:'#4a2a20', accent:'#d88a80' },
};
const FONTS = {
  cormorant: { display: "'Cormorant Garamond', serif", sans: "'Inter Tight', sans-serif" },
  playfair:  { display: "'Playfair Display', serif", sans: "'DM Sans', sans-serif" },
  fraunces:  { display: "'Fraunces', serif", sans: "'Manrope', sans-serif" },
};

function TweaksPanel({ open, onClose, state, setState }) {
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));
  return (
    <div className={`tweaks-panel${open ? ' open' : ''}`}>
      <div className="tweaks-panel-head">
        <span>⚙ Tweaks</span>
        <button onClick={onClose} style={{background:'none',border:'none',cursor:'none',color:'inherit',font:'inherit'}}>✕</button>
      </div>
      <div className="tweaks-panel-body">
        <div className="tweak-group">
          <div className="tweak-label">Paleta</div>
          <div className="tweak-palette-grid">
            {Object.entries(PALETTES).map(([name, p]) => (
              <div key={name} className={`tweak-palette${state.palette === name ? ' active' : ''}`} onClick={() => set('palette', name)}>
                <div className="tweak-palette-strip">
                  <div style={{background:p.pearl}}></div>
                  <div style={{background:p.sage}}></div>
                  <div style={{background:p.moss}}></div>
                  <div style={{background:p.forest}}></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px', marginTop:'6px'}}>
            {Object.keys(PALETTES).map((n) => (
              <div key={n} style={{fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', color: state.palette === n ? 'var(--forest)' : 'var(--muted)'}}>{n}</div>
            ))}
          </div>
        </div>
        <div className="tweak-group">
          <div className="tweak-label">Tipografía</div>
          <div className="tweak-options">
            {Object.keys(FONTS).map((f) => (
              <button key={f} className={`tweak-option${state.font === f ? ' active' : ''}`} onClick={() => set('font', f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="tweak-group">
          <div className="tweak-label">Estilo del hero</div>
          <div className="tweak-options">
            {['fullbleed','centered','editorial'].map((h) => (
              <button key={h} className={`tweak-option${state.heroStyle === h ? ' active' : ''}`} onClick={() => set('heroStyle', h)}>{h}</button>
            ))}
          </div>
        </div>
        <div className="tweak-group">
          <div className="tweak-label">Galería</div>
          <div className="tweak-options">
            {['film','grid'].map((g) => (
              <button key={g} className={`tweak-option${state.galleryStyle === g ? ' active' : ''}`} onClick={() => set('galleryStyle', g)}>{g}</button>
            ))}
          </div>
        </div>
        <div className="tweak-group">
          <div className="tweak-label">Animaciones</div>
          <div className="tweak-options">
            <button className={`tweak-option${state.anim ? ' active' : ''}`} onClick={() => set('anim', true)}>On</button>
            <button className={`tweak-option${!state.anim ? ' active' : ''}`} onClick={() => set('anim', false)}>Off</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   APP
   ============================================ */
function App() {
  const [entered, setEntered] = useState(false);
  const [chapter, setChapter] = useState('I · EL DÍA');
  const [theme, setTheme] = useState(() => {
    const h = new Date().getHours();
    return (h >= 19 || h < 7) ? 'night' : 'day';
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(/*EDITMODE-BEGIN*/{
    "palette": "musgo",
    "font": "cormorant",
    "heroStyle": "fullbleed",
    "galleryStyle": "film",
    "anim": true
  }/*EDITMODE-END*/);

  // Apply palette
  useEffect(() => {
    const p = PALETTES[tweaks.palette] || PALETTES.musgo;
    const r = document.documentElement;
    r.style.setProperty('--pearl', p.pearl);
    r.style.setProperty('--sage', p.sage);
    r.style.setProperty('--moss', p.moss);
    r.style.setProperty('--taupe', p.taupe);
    r.style.setProperty('--forest', p.forest);
  }, [tweaks.palette]);

  // Apply font
  useEffect(() => {
    const f = FONTS[tweaks.font] || FONTS.cormorant;
    const r = document.documentElement;
    r.style.setProperty('--font-display', f.display);
    r.style.setProperty('--font-sans', f.sans);
  }, [tweaks.font]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply anim
  useEffect(() => {
    document.body.classList.toggle('no-anim', !tweaks.anim);
  }, [tweaks.anim]);

  // Reveal observer
  useEffect(() => {
    if (!entered) return;
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [entered, tweaks.heroStyle, tweaks.galleryStyle]);

  // Chapter tracker
  useEffect(() => {
    if (!entered) return;
    const sections = [
      { sel: '.event-section', name: 'I · EL DÍA' },
      { sel: '.dresscode-section', name: 'II · CÓMO VESTIR' },
      { sel: '.gallery-section', name: 'III · GALERÍA' },
      { sel: '.rsvp-section', name: 'IV · CONFIRMA' },
      { sel: '.gifts-section', name: 'V · DETALLES' },
      { sel: '.playlist-section', name: 'VI · LA MÚSICA' },
    ];
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const match = sections.find((s) => e.target.matches(s.sel));
          if (match) setChapter(match.name);
        }
      });
    }, { threshold: 0.3 });
    sections.forEach((s) => { const el = document.querySelector(s.sel); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [entered]);

  // Edit mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Persist tweaks
  const setTweaksAndPersist = (updater) => {
    setTweaks((cur) => {
      const next = typeof updater === 'function' ? updater(cur) : updater;
      window.parent.postMessage({type:'__edit_mode_set_keys', edits: next}, '*');
      return next;
    });
  };

  return (
    <>
      <div className="grain"></div>
      <CustomCursor />
      <AudioPlayer active={entered} />
      {!entered && <EnvelopeIntro onOpen={() => setEntered(true)} />}
      {entered && (
        <>
          <Nav chapter={chapter} theme={theme} onToggleTheme={() => setTheme((t) => t === 'day' ? 'night' : 'day')} onOpenTweaks={() => setTweaksOpen(true)} />
          <Hero heroStyle={tweaks.heroStyle} />
          <Breaker
            src="photos/breaker-140.jpg"
            topLeft=""
            topRight="SANTA MARTA"
            quote={<>« Es increíble, pero una vez<br/>descubres <span className="accent">la magia</span>, ya no puedes dejarla ir. »</>}
            bottomLeft=""
            bottomRight="SCROLL ↓"
          />
          <Events />
          <Breaker
            src="photos/section-dresscode.jpg"
            objectPosition="center 10%"
            topLeft=""
            topRight="EL CARIBE NOS ESPERA"
            quote={<>« Quererte <span className="accent">por siempre</span><br/>es la idea más grande que he tenido en mi vida. »</>}
            bottomLeft=""
            bottomRight=""
          />
          <DressCode />
          <Gallery galleryStyle={tweaks.galleryStyle} />
          <Breaker
            src="photos/breaker-rsvp-156.jpg"
            objectPosition="45% 28%"
            topLeft=""
            topRight="TU LUGAR TE ESPERA"
            quote={<>« Voy a darle <span className="accent">la vuelta al mundo</span><br/>para abrazarte por la espalda. »</>}
            bottomLeft=""
            bottomRight="— RSVP —"
          />
          <Rsvp />
          <Gifts />
          <Playlist />
          <Footer />
          <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} state={tweaks} setState={setTweaksAndPersist} />
        </>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
