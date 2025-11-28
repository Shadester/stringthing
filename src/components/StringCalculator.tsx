import { useState, useMemo } from 'react'
import './StringCalculator.css'

type InstrumentType = 'guitar' | 'bass4' | 'bass5'

interface TuningPegConfig {
  pegSpacing: number // mm
  windingDiameter: number // mm
}

const PEG_CONFIGS: Record<string, TuningPegConfig> = {
  standard: { pegSpacing: 35, windingDiameter: 10 },
  vintage: { pegSpacing: 38, windingDiameter: 11 },
  locking: { pegSpacing: 35, windingDiameter: 8 },
  bass: { pegSpacing: 45, windingDiameter: 15 }
}

const SCALE_LENGTHS: Record<InstrumentType, { name: string; length: number }[]> = {
  guitar: [
    { name: 'Fender (25.5")', length: 25.5 },
    { name: 'Gibson (24.75")', length: 24.75 },
    { name: 'PRS (25")', length: 25 },
    { name: 'Baritone (27")', length: 27 }
  ],
  bass4: [
    { name: 'Standard (34")', length: 34 },
    { name: 'Short Scale (30")', length: 30 },
    { name: 'Medium Scale (32")', length: 32 },
    { name: 'Extra Long (35")', length: 35 }
  ],
  bass5: [
    { name: 'Standard (34")', length: 34 },
    { name: 'Extra Long (35")', length: 35 },
    { name: 'Super Long (36")', length: 36 }
  ]
}

// Convert inches to cm
const inchesToCm = (inches: number) => Math.round(inches * 2.54 * 10) / 10

interface StringResult {
  stringNumber: number
  nutToTunerCm: number
  slackNeededCm: number
  windingTurns: number
}

export default function StringCalculator() {
  const [instrument, setInstrument] = useState<InstrumentType>('guitar')
  const [scaleLength, setScaleLength] = useState(25.5)
  const [nutToFirstTunerCm, setNutToFirstTunerCm] = useState(10) // cm
  const [pegType, setPegType] = useState('standard')
  const [targetWraps, setTargetWraps] = useState(3)
  const [showHelp, setShowHelp] = useState(false)

  const stringCount = instrument === 'guitar' ? 6 : instrument === 'bass4' ? 4 : 5
  const pegConfig = instrument.startsWith('bass') ? PEG_CONFIGS.bass : PEG_CONFIGS[pegType]

  const results = useMemo((): StringResult[] => {
    const strings: StringResult[] = []
    const pegSpacingCm = pegConfig.pegSpacing / 10 // mm to cm

    for (let i = 1; i <= stringCount; i++) {
      const nutToTunerCm = nutToFirstTunerCm + (i - 1) * pegSpacingCm
      const windingCircumferenceCm = Math.PI * (pegConfig.windingDiameter / 10) // mm to cm
      const slackNeededCm = targetWraps * windingCircumferenceCm

      strings.push({
        stringNumber: i,
        nutToTunerCm: Math.round(nutToTunerCm * 10) / 10,
        slackNeededCm: Math.round(slackNeededCm * 10) / 10,
        windingTurns: targetWraps
      })
    }

    return strings
  }, [stringCount, nutToFirstTunerCm, pegConfig, targetWraps])

  const slackNeeded = Math.round(results[0]?.slackNeededCm || 0)

  return (
    <div className="string-calculator">
      <button
        className={`help-toggle ${showHelp ? 'active' : ''}`}
        onClick={() => setShowHelp(!showHelp)}
      >
        {showHelp ? 'Hide Measurement Guide' : 'How to Measure?'}
      </button>

      {showHelp && (
        <div className="help-section">
          <h3>Measurement Guide</h3>

          <div className="help-item">
            <h4>Scale Length</h4>
            <p>
              Measure from the <strong>nut</strong> (where the strings leave the headstock) to the
              <strong> bridge saddle</strong> (where strings contact the bridge). Common lengths:
            </p>
            <ul>
              <li>Fender guitars: 25.5"</li>
              <li>Gibson guitars: 24.75"</li>
              <li>Standard bass: 34"</li>
            </ul>
          </div>

          <div className="help-item">
            <h4>Nut to First Tuner</h4>
            <p>
              Measure from the <strong>nut edge</strong> to the <strong>center of the first tuning peg</strong> (the one closest to the nut). This is typically 8-12 cm for guitars and 10-15 cm for bass.
            </p>
          </div>

          <div className="help-item">
            <h4>Target Wraps</h4>
            <p>
              How many times the string winds around the tuning post:
            </p>
            <ul>
              <li><strong>2-3 wraps:</strong> Wound/thicker strings</li>
              <li><strong>3-4 wraps:</strong> Plain/thinner strings</li>
              <li><strong>1-2 wraps:</strong> Locking tuners</li>
            </ul>
          </div>
        </div>
      )}

      <div className="calc-form">
        <div className="form-section">
          <h3>Instrument</h3>
          <div className="button-group">
            <button
              className={instrument === 'guitar' ? 'active' : ''}
              onClick={() => {
                setInstrument('guitar')
                setScaleLength(25.5)
                setPegType('standard')
              }}
            >
              Guitar
            </button>
            <button
              className={instrument === 'bass4' ? 'active' : ''}
              onClick={() => {
                setInstrument('bass4')
                setScaleLength(34)
              }}
            >
              Bass 4
            </button>
            <button
              className={instrument === 'bass5' ? 'active' : ''}
              onClick={() => {
                setInstrument('bass5')
                setScaleLength(34)
              }}
            >
              Bass 5
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Scale Length</h3>
          <div className="scale-options">
            {SCALE_LENGTHS[instrument].map(scale => (
              <button
                key={scale.length}
                className={scaleLength === scale.length ? 'active' : ''}
                onClick={() => setScaleLength(scale.length)}
              >
                {scale.name}
              </button>
            ))}
          </div>
          <div className="custom-input">
            <label>Custom (inches):</label>
            <input
              type="number"
              value={scaleLength}
              onChange={e => setScaleLength(parseFloat(e.target.value) || 0)}
              step="0.25"
              min="20"
              max="40"
            />
            <span className="cm-value">= {inchesToCm(scaleLength)} cm</span>
          </div>
        </div>

        {instrument === 'guitar' && (
          <div className="form-section">
            <h3>Tuning Peg Type</h3>
            <div className="button-group">
              <button
                className={pegType === 'standard' ? 'active' : ''}
                onClick={() => setPegType('standard')}
              >
                Standard
              </button>
              <button
                className={pegType === 'vintage' ? 'active' : ''}
                onClick={() => setPegType('vintage')}
              >
                Vintage
              </button>
              <button
                className={pegType === 'locking' ? 'active' : ''}
                onClick={() => setPegType('locking')}
              >
                Locking
              </button>
            </div>
          </div>
        )}

        <div className="form-section">
          <h3>Measurements</h3>
          <div className="measurements">
            <div className="measurement">
              <label>Nut to 1st Tuner (cm):</label>
              <input
                type="number"
                value={nutToFirstTunerCm}
                onChange={e => setNutToFirstTunerCm(parseFloat(e.target.value) || 0)}
                step="0.5"
                min="5"
                max="25"
              />
            </div>
            <div className="measurement">
              <label>Target Wraps:</label>
              <input
                type="number"
                value={targetWraps}
                onChange={e => setTargetWraps(parseInt(e.target.value) || 2)}
                min="2"
                max="5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="results">
        <h3>String Length Guide</h3>
        <p className="results-intro">
          Pull string taut to tuner, then add the slack shown below before cutting/winding:
        </p>

        <div className="results-table">
          <div className="table-header">
            <span>String</span>
            <span>Nut to Tuner</span>
            <span>Slack to Add</span>
            <span>Wraps</span>
          </div>
          {results.map(result => (
            <div key={result.stringNumber} className="table-row">
              <span className="string-num">{result.stringNumber}</span>
              <span>{result.nutToTunerCm} cm</span>
              <span className="slack-value">{result.slackNeededCm} cm</span>
              <span>{result.windingTurns}</span>
            </div>
          ))}
        </div>

        <div className="quick-ref">
          <h4>Quick Reference</h4>
          <div className="quick-ref-content">
            <p>
              <strong>Easy method:</strong> Pull string taut to target tuner,
              then measure back <strong>{slackNeeded} cm</strong> of
              slack (about {targetWraps} tuner posts) before winding.
            </p>
            {instrument === 'guitar' && pegType === 'locking' && (
              <p className="locking-note">
                <strong>Locking tuners:</strong> You need minimal slack - just enough to
                insert into the peg hole and lock. 1-2 wraps maximum.
              </p>
            )}
          </div>
        </div>

        <div className="tips-section">
          <h4>Tips</h4>
          <ul>
            <li>
              <strong>Wound strings (thicker):</strong> Need fewer wraps (2-3) as they're
              stiffer and hold better.
            </li>
            <li>
              <strong>Plain strings (thinner):</strong> Benefit from more wraps (3-4) for
              tuning stability.
            </li>
            <li>
              <strong>Bass strings:</strong> Usually need only 2-3 wraps due to thickness.
              Cut before winding!
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
