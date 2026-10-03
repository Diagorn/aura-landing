import { AuroraBackground } from './components/AuroraBackground'
import { CtaSection } from './components/CtaSection'
import { Customization } from './components/Customization'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Insights } from './components/Insights'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg font-sans text-fg antialiased">
      <AuroraBackground />
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Insights />
        <Customization />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
