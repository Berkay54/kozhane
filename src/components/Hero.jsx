import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const NAV_LINKS = [
  { label: 'Menü', href: '#menu' },
  { label: 'Hikayemiz', href: '#hikaye' },
  { label: 'Ocakbaşı', href: '#ocakbasi' },
  { label: 'İletişim', href: '#iletisim' },
]

export default function Hero() {
  const videoRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Hareket azaltma tercihi olan kullanıcılar için videoyu durdur
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      const v = videoRef.current
      if (!v) return
      if (mq.matches) v.pause()
      else v.play().catch(() => {})
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <section className="hero" aria-label="Közhane">
      {/* Video katmanı — tabak merkezde kalsın diye sağa yaslı */}
      <div className="hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero__shade" />
        <div className="hero__grain" />
      </div>

      {/* Üst menü */}
      <header className="nav">
        <a href="#" className="nav__logo" aria-label="Közhane ana sayfa">
          <span className="nav__logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M16 3c1.7 5 7.3 7.3 7.3 14a7.3 7.3 0 0 1-14.6 0c0-3.4 1.8-5.4 3.4-7 .3 2.2 1.3 3.6 2.7 4.1C14 10 14.4 6.4 16 3z" />
            </svg>
          </span>
          <span className="nav__logo-text">Közhane</span>
        </a>

        <nav className={`nav__links ${menuOpen ? 'is-open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#rezervasyon" className="nav__cta nav__cta--mobile" onClick={() => setMenuOpen(false)}>
            Masa Ayırt
          </a>
        </nav>

        <a href="#rezervasyon" className="nav__cta">
          Masa Ayırt
        </a>

        <button
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Sol taraftaki metin bloğu */}
      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__dot" /> Ocakbaşı · Est. 1987 · Adana usulü
        </p>

        <h1 className="hero__title">
          <span className="hero__title-serif">Zırhla kıyılmış,</span>
          <span className="hero__title-display">Közde</span>
          <span className="hero__title-display hero__title-outline">pişmiş.</span>
        </h1>

        <p className="hero__lead">
          Kuzu eti, kuyruk yağı ve <em>bol isot</em>. Ustanın elinde, meşe kömürünün
          üstünde tam kıvamında. Sıcak lavaşla, sumaklı soğanla, olması gerektiği gibi.
        </p>

        <div className="hero__actions">
          <a href="#menu" className="btn btn--primary">
            Menüyü Keşfet
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#rezervasyon" className="btn btn--ghost">
            Masa Ayırt
          </a>
        </div>

        <ul className="hero__facts">
          <li>
            <strong>Meşe</strong>
            <span>kömürü</span>
          </li>
          <li>
            <strong>%100</strong>
            <span>zırh kıyma</span>
          </li>
          <li>
            <strong>Günlük</strong>
            <span>taze lavaş</span>
          </li>
        </ul>
      </div>

      {/* Dekoratif dikey yazı */}
      <p className="hero__vertical" aria-hidden="true">
        Adana — Urfa — Beyti — Ali Nazik — Simit Kebabı
      </p>

      <a href="#menu" className="hero__scroll" aria-label="Aşağı kaydır">
        <span>Kaydır</span>
        <i />
      </a>
    </section>
  )
}
