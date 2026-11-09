import Hero from './components/Hero.jsx'
import Iskender from './components/Iskender.jsx'
import Beyti from './components/Beyti.jsx'

export default function App() {
  return (
    <main>
      <Hero />
      <Iskender />
      <Beyti />
      <footer className="site-credit">
        Közhane hayali bir markadır, konsept çalışmadır. Tasarım ve geliştirme: <a href="https://dablabs.net/" target="_blank" rel="noopener">DAB Labs</a>
      </footer>
    </main>
  )
}
