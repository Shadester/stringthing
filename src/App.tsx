import { useState } from 'react'
import './App.css'
import Tuner from './components/Tuner'
import RestringGuide from './components/RestringGuide'
import StringCalculator from './components/StringCalculator'
import StringGaugeRecommender from './components/StringGaugeRecommender'
import FretBuzzDiagnostic from './components/FretBuzzDiagnostic'
import SetupGuide from './components/SetupGuide'
import TrussRodGuide from './components/TrussRodGuide'

type Tab = 'tuner' | 'guide' | 'calculator' | 'gauges' | 'buzz' | 'setup' | 'trussrod'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tuner')

  return (
    <div className="app">
      <header>
        <h1>StringThing</h1>
        <p className="subtitle">Bass & Guitar Restringing Assistant</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'tuner' ? 'active' : ''}
          onClick={() => setActiveTab('tuner')}
        >
          Tuner
        </button>
        <button
          className={activeTab === 'guide' ? 'active' : ''}
          onClick={() => setActiveTab('guide')}
        >
          Restring Guide
        </button>
        <button
          className={activeTab === 'gauges' ? 'active' : ''}
          onClick={() => setActiveTab('gauges')}
        >
          Gauge Recommender
        </button>
        <button
          className={activeTab === 'buzz' ? 'active' : ''}
          onClick={() => setActiveTab('buzz')}
        >
          Fret Buzz Fix
        </button>
        <button
          className={activeTab === 'calculator' ? 'active' : ''}
          onClick={() => setActiveTab('calculator')}
        >
          String Calculator
        </button>
        <button
          className={activeTab === 'setup' ? 'active' : ''}
          onClick={() => setActiveTab('setup')}
        >
          Action & Intonation
        </button>
        <button
          className={activeTab === 'trussrod' ? 'active' : ''}
          onClick={() => setActiveTab('trussrod')}
        >
          Truss Rod
        </button>
      </nav>

      <main>
        {activeTab === 'tuner' && <Tuner />}
        {activeTab === 'guide' && <RestringGuide />}
        {activeTab === 'calculator' && <StringCalculator />}
        {activeTab === 'gauges' && <StringGaugeRecommender />}
        {activeTab === 'buzz' && <FretBuzzDiagnostic />}
        {activeTab === 'setup' && <SetupGuide />}
        {activeTab === 'trussrod' && <TrussRodGuide />}
      </main>
    </div>
  )
}

export default App
