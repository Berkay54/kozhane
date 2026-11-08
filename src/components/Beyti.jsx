import { useEffect, useRef } from 'react'
import './Beyti.css'

const STEPS = [
  { no: 'I', title: 'Şişte pişer', text: 'Zırh kıyması geniş şişe sarılır, közün en sakin yerinde ağır ağır kızarır.' },
  { no: 'II', title: 'Lavaşa sarılır', text: 'İnce, sıcak lavaş; kebabı sıkıca kavrar, ateşte bir tur daha çevrilir.' },
  { no: 'III', title: 'Dilimlenip döşenir', text: 'Eğik kesilir; domates sosu, kızgın tereyağı ve yoğurtla tamamlanır.' },
]

export default function Beyti() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!section || !stage || !video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Ekrana girince göster + oynat, çıkınca durdur
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible')
          if (!reduce) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(stage)

    // Kaydırdıkça video çerçevesi açılır (0 → 1)
    if (reduce) {
      stage.style.setProperty('--p', 1)
      return () => io.disconnect()
    }

    let raf = 0
    const update = () => {
      raf = 0
      const r = stage.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)))
      stage.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="beyti" ref={sectionRef} className="bey" aria-labelledby="bey-title">
      {/* Başlık satırı */}
      <header className="bey__head">
        <h2 id="bey-title" className="bey__title">
          <span className="bey__title-display">Beyti</span>
          <span className="bey__title-script">sarma</span>
        </h2>

        <div className="bey__intro">
          <p className="bey__eyebrow">
            <span>No. 03</span>
            <span>Şefin önerisi</span>
          </p>
          <p className="bey__lead">
            Lavaşın içinde saklanan bir Adana. Közün dumanı, tereyağının sesi, yoğurdun
            serinliği; hepsi <em>tek bir dilimde.</em>
          </p>
        </div>
      </header>

      {/* Sinematik video sahnesi */}
      <div className="bey__stage" ref={stageRef}>
        <div className="bey__screen">
          <video
            ref={videoRef}
            className="bey__video"
            src="/video/beyti.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="bey__vignette" aria-hidden="true" />

          <span className="bey__tag bey__tag--tl" aria-hidden="true">
            <i /> Ocakbaşı · canlı
          </span>
          <span className="bey__tag bey__tag--br" aria-hidden="true">
            40° 59′ N — 28° 58′ E
          </span>
        </div>
      </div>

      {/* Adımlar */}
      <ol className="bey__steps">
        {STEPS.map((s, i) => (
          <li key={s.no} style={{ '--i': i }}>
            <span className="bey__step-no">{s.no}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>

      {/* Kapanış / rezervasyon çağrısı */}
      <div id="rezervasyon" className="bey__cta">
        <p className="bey__cta-text">
          Ocak yanıyor.
          <em> Masanız hazır.</em>
        </p>
        <div className="bey__cta-actions">
          <a href="tel:+900000000000" className="bey__btn bey__btn--primary">
            Masa Ayırt
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p className="bey__hours">
            <span>Her gün</span>
            12:00 — 00:00
          </p>
        </div>
      </div>
    </section>
  )
}
