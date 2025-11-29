import { useState } from 'react'
import './FretBuzzDiagnostic.css'

type BuzzLocation = 'all' | 'low' | 'middle' | 'high' | 'specific'
type BuzzSeverity = 'slight' | 'moderate' | 'severe'

interface DiagnosticResult {
  title: string
  causes: string[]
  solutions: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

const getDiagnostic = (location: BuzzLocation, severity: BuzzSeverity): DiagnosticResult => {
  if (location === 'low') {
    return {
      title: 'Buzz on Low Frets (1-5)',
      causes: [
        'Nut slots cut too low',
        'Nut worn down from use',
        'Strings sitting too low at the nut',
        'Neck has too much relief (bowing up)'
      ],
      solutions: [
        'Check nut height: strings should clear 1st fret by ~0.5mm',
        'Replace nut if slots are too deep or worn',
        'Add shims under nut if slightly low',
        'Adjust truss rod to reduce relief (tighten 1/4 turn)',
        'Have a luthier file a new nut if needed'
      ],
      difficulty: 'medium'
    }
  }

  if (location === 'middle') {
    return {
      title: 'Buzz in Middle Frets (5-12)',
      causes: [
        'Neck has back-bow (bowing backward)',
        'Frets are uneven or worn in this area',
        'Action is too low overall',
        'String tension too low for playing style'
      ],
      solutions: [
        'Check neck relief: should have slight forward bow (~0.25mm at 7th fret)',
        'Adjust truss rod to add relief (loosen 1/4 turn)',
        'Raise action at bridge saddles',
        'Consider heavier gauge strings',
        'Have frets leveled if they\'re uneven (professional work)'
      ],
      difficulty: 'medium'
    }
  }

  if (location === 'high') {
    return {
      title: 'Buzz on High Frets (12+)',
      causes: [
        'Action too low at bridge',
        'Neck has too much relief (forward bow)',
        'High frets are uneven or popped up',
        'Bridge saddles too low',
        'Playing technique (fretting too hard)'
      ],
      solutions: [
        'Raise bridge saddles/action height',
        'Adjust truss rod to reduce relief (tighten 1/4 turn)',
        'Check that all high frets are level',
        'Consider lighter touch when fretting',
        'Have frets leveled and crowned if needed'
      ],
      difficulty: 'easy'
    }
  }

  if (location === 'specific') {
    return {
      title: 'Buzz on Specific Frets Only',
      causes: [
        'Individual fret is too high',
        'Fret has popped up from fingerboard',
        'Fret is worn/grooved from heavy use',
        'Fingerboard has a dead spot',
        'Seasonal wood movement'
      ],
      solutions: [
        'Identify exactly which fret(s) buzz',
        'Check if fret is visibly higher than neighbors',
        'Tap down slightly raised fret (gentle!)',
        'Have individual fret(s) leveled or replaced',
        'May need partial or full fret level and crown',
        'Wait if recently humidity changed - may settle'
      ],
      difficulty: 'hard'
    }
  }

  // location === 'all'
  return {
    title: 'Buzz Across All Frets',
    causes: [
      'Action is too low everywhere',
      'Strings are too light for tuning',
      'Neck relief is incorrect',
      'Multiple frets are uneven',
      'Playing style too aggressive for setup',
      'Recent string gauge or tuning change'
    ],
    solutions: [
      'Raise action at bridge saddles',
      'Check neck relief and adjust truss rod if needed',
      'Try heavier gauge strings',
      'Adjust playing technique (lighter touch)',
      'Full setup may be needed (nut, truss rod, action, intonation)',
      'Consider professional fret level if frets are worn'
    ],
    difficulty: 'easy'
  }
}

export default function FretBuzzDiagnostic() {
  const [buzzLocation, setBuzzLocation] = useState<BuzzLocation>('all')
  const [buzzSeverity, setBuzzSeverity] = useState<BuzzSeverity>('moderate')
  const [showResult, setShowResult] = useState(false)

  const diagnostic = getDiagnostic(buzzLocation, buzzSeverity)

  const handleDiagnose = () => {
    setShowResult(true)
  }

  return (
    <div className="fret-buzz-diagnostic">
      <div className="diagnostic-intro">
        <h2>Fret Buzz Diagnostic</h2>
        <p>
          Answer the questions below to diagnose your fret buzz issue and get recommended solutions.
        </p>
      </div>

      <div className="diagnostic-form">
        <div className="form-section">
          <h3>Where does the buzz occur?</h3>
          <div className="location-grid">
            <button
              className={buzzLocation === 'low' ? 'active' : ''}
              onClick={() => setBuzzLocation('low')}
            >
              <div className="button-title">Low Frets</div>
              <div className="button-subtitle">Frets 1-5</div>
            </button>
            <button
              className={buzzLocation === 'middle' ? 'active' : ''}
              onClick={() => setBuzzLocation('middle')}
            >
              <div className="button-title">Middle Frets</div>
              <div className="button-subtitle">Frets 5-12</div>
            </button>
            <button
              className={buzzLocation === 'high' ? 'active' : ''}
              onClick={() => setBuzzLocation('high')}
            >
              <div className="button-title">High Frets</div>
              <div className="button-subtitle">Frets 12+</div>
            </button>
            <button
              className={buzzLocation === 'specific' ? 'active' : ''}
              onClick={() => setBuzzLocation('specific')}
            >
              <div className="button-title">Specific Fret(s)</div>
              <div className="button-subtitle">One or two frets</div>
            </button>
            <button
              className={buzzLocation === 'all' ? 'active' : ''}
              onClick={() => setBuzzLocation('all')}
            >
              <div className="button-title">All Over</div>
              <div className="button-subtitle">Multiple areas</div>
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>How severe is the buzz?</h3>
          <div className="severity-buttons">
            <button
              className={buzzSeverity === 'slight' ? 'active' : ''}
              onClick={() => setBuzzSeverity('slight')}
            >
              <div className="button-title">Slight</div>
              <div className="button-subtitle">Can hear it, doesn't come through amp</div>
            </button>
            <button
              className={buzzSeverity === 'moderate' ? 'active' : ''}
              onClick={() => setBuzzSeverity('moderate')}
            >
              <div className="button-title">Moderate</div>
              <div className="button-subtitle">Noticeable, affects tone slightly</div>
            </button>
            <button
              className={buzzSeverity === 'severe' ? 'active' : ''}
              onClick={() => setBuzzSeverity('severe')}
            >
              <div className="button-title">Severe</div>
              <div className="button-subtitle">Very loud, kills sustain</div>
            </button>
          </div>
        </div>

        <button className="diagnose-button" onClick={handleDiagnose}>
          Get Diagnosis
        </button>
      </div>

      {showResult && (
        <div className="diagnostic-result">
          <div className="result-header">
            <h3>{diagnostic.title}</h3>
            <div className={`difficulty-badge difficulty-${diagnostic.difficulty}`}>
              {diagnostic.difficulty === 'easy' && 'Easy Fix'}
              {diagnostic.difficulty === 'medium' && 'Moderate - May Need Tools'}
              {diagnostic.difficulty === 'hard' && 'Difficult - Consider Professional Help'}
            </div>
          </div>

          <div className="result-section">
            <h4>Likely Causes</h4>
            <ul className="causes-list">
              {diagnostic.causes.map((cause, idx) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h4>Recommended Solutions</h4>
            <ol className="solutions-list">
              {diagnostic.solutions.map((solution, idx) => (
                <li key={idx}>{solution}</li>
              ))}
            </ol>
          </div>

          <div className="general-tips">
            <h4>General Tips</h4>
            <ul>
              <li>
                <strong>Start small:</strong> Make adjustments in small increments (1/4 turn at a time).
              </li>
              <li>
                <strong>One change at a time:</strong> Adjust one thing, test, then move to the next.
              </li>
              <li>
                <strong>String height check:</strong> Measure action at 12th fret. Typical: Guitar 1.5-2mm (bass side), 1-1.5mm (treble). Bass: 2-2.5mm.
              </li>
              <li>
                <strong>Relief check:</strong> Fret string at 1st and last fret, check gap at 7th-9th fret. Should be ~0.25mm (thickness of thin pick).
              </li>
              <li>
                <strong>When in doubt:</strong> Take to a professional. A full setup costs less than fixing mistakes!
              </li>
            </ul>
          </div>

          <div className="warning-box">
            <strong>⚠️ Warning:</strong> Truss rod adjustments should be done carefully. If you're unsure or the rod feels stuck, stop and consult a professional. Over-tightening can damage the neck.
          </div>
        </div>
      )}

      <div className="quick-checks">
        <h3>Quick Checks Before Diagnosing</h3>
        <div className="checks-grid">
          <div className="check-item">
            <h4>1. Check Your Strings</h4>
            <p>Old, worn, or incorrect gauge strings can cause buzz. Try fresh strings first!</p>
          </div>
          <div className="check-item">
            <h4>2. Playing Technique</h4>
            <p>Fretting too hard or picking too aggressively can cause buzzing even on a perfect setup.</p>
          </div>
          <div className="check-item">
            <h4>3. Humidity Changes</h4>
            <p>Seasonal changes affect wood. Buzz that appears suddenly may be weather-related.</p>
          </div>
          <div className="check-item">
            <h4>4. Recent Changes</h4>
            <p>Changed string gauge or tuning recently? Your setup may need adjustment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
