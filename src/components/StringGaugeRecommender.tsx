import { useState } from 'react'
import './StringGaugeRecommender.css'

type InstrumentType = 'guitar' | 'bass'
type PlayingStyle = 'light' | 'medium' | 'heavy'
type TuningType = 'standard' | 'halfStep' | 'dropD' | 'dropC' | 'dropB' | 'dropA'

interface GaugeSet {
  name: string
  gauges: number[]
  description: string
}

const GUITAR_GAUGE_SETS: Record<string, GaugeSet[]> = {
  standard: [
    { name: 'Super Light', gauges: [9, 11, 16, 24, 32, 42], description: 'Easy bending, bright tone. Great for beginners and lead players.' },
    { name: 'Light', gauges: [10, 13, 17, 26, 36, 46], description: 'Most popular. Balanced playability and tone.' },
    { name: 'Medium', gauges: [11, 14, 18, 28, 38, 49], description: 'Fuller tone, more tension. Good for rhythm playing.' },
    { name: 'Heavy', gauges: [12, 16, 20, 32, 42, 54], description: 'Maximum tone and sustain. Requires stronger fingers.' }
  ],
  halfStep: [
    { name: 'Light', gauges: [10, 13, 17, 26, 36, 46], description: 'Standard light gauge works well tuned down half step.' },
    { name: 'Medium', gauges: [11, 14, 18, 28, 38, 49], description: 'Better tension when tuned down. Recommended.' }
  ],
  dropD: [
    { name: 'Light (Balanced)', gauges: [10, 13, 17, 26, 36, 46], description: 'Works, but low E may feel loose.' },
    { name: 'Medium', gauges: [11, 14, 18, 28, 38, 49], description: 'Better tension on dropped string.' },
    { name: 'Heavy Bottom', gauges: [10, 13, 17, 30, 42, 52], description: 'Optimized for drop tuning. Thicker bass strings.' }
  ],
  dropC: [
    { name: 'Medium Heavy', gauges: [11, 15, 19, 32, 44, 56], description: 'Good tension for drop C.' },
    { name: 'Heavy', gauges: [12, 16, 20, 36, 48, 60], description: 'Preferred for drop C. Better clarity and tension.' }
  ],
  dropB: [
    { name: 'Heavy', gauges: [12, 16, 20, 36, 48, 62], description: 'Minimum for drop B.' },
    { name: 'Baritone', gauges: [13, 17, 26, 38, 50, 68], description: 'Best for drop B. May require setup adjustments.' }
  ],
  dropA: [
    { name: 'Baritone Light', gauges: [13, 17, 26, 38, 50, 68], description: 'Requires longer scale length (26.5-27").' },
    { name: 'Baritone Heavy', gauges: [14, 18, 28, 42, 56, 72], description: 'Maximum clarity for drop A.' }
  ]
}

const BASS_GAUGE_SETS: Record<string, GaugeSet[]> = {
  standard: [
    { name: 'Light', gauges: [40, 60, 80, 100], description: 'Easy on fingers, bright tone. Good for slap/funk.' },
    { name: 'Medium', gauges: [45, 65, 85, 105], description: 'Most common. Balanced tone and feel.' },
    { name: 'Heavy', gauges: [50, 70, 90, 110], description: 'Full tone, more tension. Rock and metal.' }
  ],
  halfStep: [
    { name: 'Medium', gauges: [45, 65, 85, 105], description: 'Standard medium gauge works well.' },
    { name: 'Heavy', gauges: [50, 70, 90, 110], description: 'Better tension when tuned down.' }
  ],
  dropD: [
    { name: 'Medium', gauges: [45, 65, 85, 105], description: 'Works, but E string may feel loose.' },
    { name: 'Heavy Bottom', gauges: [45, 65, 85, 110], description: 'Optimized for drop tuning.' },
    { name: 'Heavy', gauges: [50, 70, 90, 110], description: 'Best tension for drop D.' }
  ],
  dropC: [
    { name: 'Heavy', gauges: [50, 70, 95, 115], description: 'Good for drop C.' },
    { name: 'Extra Heavy', gauges: [55, 75, 95, 120], description: 'Preferred for drop C. Better clarity.' }
  ],
  dropB: [
    { name: 'Extra Heavy', gauges: [55, 75, 100, 125], description: 'Minimum for drop B on 34" scale.' },
    { name: '5-String Medium (BEAD)', gauges: [65, 85, 105, 130], description: 'Use 5-string set without high G. Best option.' }
  ],
  dropA: [
    { name: '5-String Heavy (BEAD)', gauges: [70, 90, 110, 135], description: 'Requires longer scale (35"+) or special setup.' }
  ]
}

export default function StringGaugeRecommender() {
  const [instrument, setInstrument] = useState<InstrumentType>('guitar')
  const [tuning, setTuning] = useState<TuningType>('standard')
  const [playingStyle, setPlayingStyle] = useState<PlayingStyle>('medium')

  const gaugeSets = instrument === 'guitar' ? GUITAR_GAUGE_SETS[tuning] : BASS_GAUGE_SETS[tuning]

  const getRecommendation = () => {
    if (playingStyle === 'light') {
      return gaugeSets[0]
    } else if (playingStyle === 'heavy') {
      return gaugeSets[gaugeSets.length - 1]
    } else {
      return gaugeSets[Math.floor(gaugeSets.length / 2)]
    }
  }

  const recommended = getRecommendation()

  return (
    <div className="string-gauge-recommender">
      <div className="gauge-form">
        <div className="form-section">
          <h3>Instrument</h3>
          <div className="button-group">
            <button
              className={instrument === 'guitar' ? 'active' : ''}
              onClick={() => {
                setInstrument('guitar')
                setTuning('standard')
              }}
            >
              Guitar
            </button>
            <button
              className={instrument === 'bass' ? 'active' : ''}
              onClick={() => {
                setInstrument('bass')
                setTuning('standard')
              }}
            >
              Bass
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Tuning</h3>
          <div className="tuning-grid">
            <button
              className={tuning === 'standard' ? 'active' : ''}
              onClick={() => setTuning('standard')}
            >
              Standard {instrument === 'guitar' ? '(E)' : '(E-A-D-G)'}
            </button>
            <button
              className={tuning === 'halfStep' ? 'active' : ''}
              onClick={() => setTuning('halfStep')}
            >
              Half Step Down {instrument === 'guitar' ? '(Eb)' : ''}
            </button>
            <button
              className={tuning === 'dropD' ? 'active' : ''}
              onClick={() => setTuning('dropD')}
            >
              Drop D
            </button>
            <button
              className={tuning === 'dropC' ? 'active' : ''}
              onClick={() => setTuning('dropC')}
            >
              Drop C
            </button>
            <button
              className={tuning === 'dropB' ? 'active' : ''}
              onClick={() => setTuning('dropB')}
            >
              Drop B
            </button>
            {instrument === 'guitar' && (
              <button
                className={tuning === 'dropA' ? 'active' : ''}
                onClick={() => setTuning('dropA')}
              >
                Drop A
              </button>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Playing Style</h3>
          <div className="button-group">
            <button
              className={playingStyle === 'light' ? 'active' : ''}
              onClick={() => setPlayingStyle('light')}
            >
              Light Touch
            </button>
            <button
              className={playingStyle === 'medium' ? 'active' : ''}
              onClick={() => setPlayingStyle('medium')}
            >
              Medium
            </button>
            <button
              className={playingStyle === 'heavy' ? 'active' : ''}
              onClick={() => setPlayingStyle('heavy')}
            >
              Heavy/Aggressive
            </button>
          </div>
        </div>
      </div>

      <div className="recommendation">
        <h3>Recommended Gauge Set</h3>
        <div className="recommended-set">
          <div className="set-name">{recommended.name}</div>
          <div className="gauges">
            {recommended.gauges.map((gauge, idx) => (
              <span key={idx} className="gauge">
                .{gauge.toString().padStart(3, '0')}
              </span>
            ))}
          </div>
          <p className="set-description">{recommended.description}</p>
        </div>

        <div className="all-options">
          <h4>All Options for This Tuning</h4>
          <div className="options-list">
            {gaugeSets.map((set, idx) => (
              <div
                key={idx}
                className={`option ${set.name === recommended.name ? 'recommended' : ''}`}
              >
                <div className="option-header">
                  <strong>{set.name}</strong>
                  {set.name === recommended.name && <span className="badge">Recommended</span>}
                </div>
                <div className="option-gauges">
                  {set.gauges.map((gauge, gIdx) => (
                    <span key={gIdx}>.{gauge.toString().padStart(3, '0')}</span>
                  ))}
                </div>
                <p className="option-desc">{set.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tips-section">
          <h4>Tips</h4>
          <ul>
            <li>
              <strong>Lower tunings need heavier gauges</strong> to maintain proper tension and clarity.
            </li>
            <li>
              <strong>Changing gauge significantly?</strong> You may need a setup adjustment (truss rod, intonation).
            </li>
            <li>
              <strong>Longer scale = more tension</strong> at the same pitch, so you can use slightly lighter gauges.
            </li>
            {instrument === 'guitar' && tuning !== 'standard' && (
              <li>
                <strong>Drop tunings:</strong> "Heavy bottom" sets have thicker low strings for better tension on dropped notes.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
