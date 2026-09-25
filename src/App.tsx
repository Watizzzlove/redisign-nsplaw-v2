import { useState } from 'react'
import { SmoothCursor } from './components/SmoothCursor'
import { FemidaPreloader } from './components/FemidaPreloader'
import { InteractiveHero } from './components/InteractiveHero'
import { ServicesAndNewsSection } from './components/ServicesAndNewsSection'
import { PhilosophySection } from './components/PhilosophySection'
import { InsightsSection } from './components/InsightsSection'
import { PeopleRoster } from './components/PeopleRoster'
import { Footer } from './components/Footer'
import { ConsultationModal } from './components/ConsultationModal'

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans relative selection:bg-[#5F1358] selection:text-white">
      {/* 1. Unusual Femida Preloader with silhouette fill */}
      <FemidaPreloader />

      {/* 2. Signature noth.in physics smooth cursor */}
      <SmoothCursor />

      {/* 3. Main Page Content */}
      <main className="relative z-10">
        <InteractiveHero onOpenConsultation={() => setIsModalOpen(true)} />
        <ServicesAndNewsSection onOpenConsultation={() => setIsModalOpen(true)} />
        <PhilosophySection />
        <InsightsSection />
        <PeopleRoster />
      </main>

      {/* 4. Creative Dark Footer */}
      <Footer onOpenConsultation={() => setIsModalOpen(true)} />

      {/* 5. Confidential Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default App
