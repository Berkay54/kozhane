# Közhane — Ocakbaşı Kebap

Közhane adında hayali bir ocakbaşı için hazırlanmış konsept web sitesi. React + Vite ile geliştirildi.

## Bölümler

- **Hero:** Malzemelerin tabağa düştüğü tam ekran video; sol tarafta Anton, Fraunces Italic ve DM Mono'yu bir arada kullanan başlık.
- **İskender:** Krem rengi zemin, kemer biçiminde çerçevelenmiş video ve İskender'i oluşturan beş katmanı (pide, döner, sos, tereyağı, yoğurt) sırayla gösteren liste.
- **Beyti:** Sayfa kaydırıldıkça açılan 21:9 sinematik video, üç hazırlık adımı ve rezervasyon çağrısı.

Videolar yalnızca ekranda görünürken oynar. Sistemde hareketi azaltma tercihi açıksa animasyonlar kapanır. Tasarım mobil uyumludur.

## Çalıştırma

```bash
npm install
npm run dev
```

Production derlemesi için:

```bash
npm run build
```

## Yapı

```
src/
  components/
    Hero.jsx / Hero.css
    Iskender.jsx / Iskender.css
    Beyti.jsx / Beyti.css
  App.jsx
  index.css        # renk ve yazı tipi değişkenleri
public/
  video/           # hero.mp4, iskender.mp4, beyti.mp4
```
