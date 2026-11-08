import { useEffect, useRef, useState } from 'react'
import './Iskender.css'

const LAYERS = [
  { no: '01', name: 'Tırnaklı pide', note: 'Küp küp doğranır, tabağın tabanına serilir.' },
  { no: '02', name: 'Yaprak döner', note: 'Odun ateşinde, dikine; bıçak sırtı inceliğinde.' },
  { no: '03', name: 'Domates sosu', note: 'Közlenmiş domatesle, ağır ateşte kıvam alır.' },
  { no: '04', name: 'Kızgın tereyağı', note: 'Masada, cızırdayarak gezdirilir.' },
  { no: '05', name: 'Süzme yoğurt', note: 'Yanında; serin, ekşimsi, dengeleyici.' },
]

export default function Iskender() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Bölüm ekrana girince göster ve videoyu oynat; çıkınca durdur
  useEffect(() => {
    const el = sectionRef.current
    const video = videoRef.current
    if (!el || !video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (!reduce) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="iskender"
      ref={sectionRef}
      className={`isk ${visible ? 'is-visible' : ''}`}
      aria-labelledby="isk-title"
    >
      {/* Arka plandaki dev yazı */}
      <p className="isk__ghost" aria-hidden="true">
        İskender
      </p>

      <div className="isk__inner">
        {/* Video kartı */}
        <figure className="isk__media">
          <div className="isk__frame">
            <video
              ref={videoRef}
              className="isk__video"
              src="/video/iskender.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>

          {/* Dönen rozet */}
          <div className="isk__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="isk-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#isk-circle">Bursa usulü · Est. 1867 · Bursa usulü · Est. 1867 ·</textPath>
              </text>
            </svg>
            <span className="isk__badge-core">
              <svg viewBox="0 0 32 32">
                <path d="M16 3c1.7 5 7.3 7.3 7.3 14a7.3 7.3 0 0 1-14.6 0c0-3.4 1.8-5.4 3.4-7 .3 2.2 1.3 3.6 2.7 4.1C14 10 14.4 6.4 16 3z" />
              </svg>
            </span>
          </div>

          <figcaption className="isk__caption">
            <span>Ustanın tezgâhından</span>
            <span>— canlı hazırlanış</span>
          </figcaption>
        </figure>

        {/* Metin */}
        <div className="isk__content">
          <p className="isk__eyebrow">
            <span className="isk__eyebrow-line" /> Ustanın imzası · No. 02
          </p>

          <h2 id="isk-title" className="isk__title">
            <span className="isk__title-serif">Bursa'dan sofranıza,</span>
            <span className="isk__title-display">İskender</span>
            <span className="isk__title-serif isk__title-serif--small">
              beş katmanda bir <em>ritüel.</em>
            </span>
          </h2>

          <ol className="isk__layers">
            {LAYERS.map((l, i) => (
              <li key={l.no} style={{ '--i': i }}>
                <span className="isk__layer-no">{l.no}</span>
                <span className="isk__layer-name">{l.name}</span>
                <span className="isk__layer-note">{l.note}</span>
              </li>
            ))}
          </ol>

          <div className="isk__footer">
            <a href="#menu" className="isk__btn">
              İskender'i Sipariş Et
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <p className="isk__tip">
              <span>Püf noktası</span>
              Tereyağı dökülürken <em>“yeter”</em> deme.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
