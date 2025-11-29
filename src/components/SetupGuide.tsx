import { useState } from 'react'
import './SetupGuide.css'

type GuideType = 'action' | 'intonation'
type InstrumentType = 'guitar' | 'bass'

export default function SetupGuide() {
  const [guideType, setGuideType] = useState<GuideType>('action')
  const [instrument, setInstrument] = useState<InstrumentType>('guitar')

  return (
    <div className="setup-guide">
      <div className="guide-header">
        <h2>Setup Adjustment Guide</h2>
        <p>Step-by-step instructions for adjusting your instrument's action and intonation</p>
      </div>

      <div className="guide-controls">
        <div className="control-section">
          <h3>Instrument</h3>
          <div className="button-group">
            <button
              className={instrument === 'guitar' ? 'active' : ''}
              onClick={() => setInstrument('guitar')}
            >
              Guitar
            </button>
            <button
              className={instrument === 'bass' ? 'active' : ''}
              onClick={() => setInstrument('bass')}
            >
              Bass
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Adjustment Type</h3>
          <div className="button-group">
            <button
              className={guideType === 'action' ? 'active' : ''}
              onClick={() => setGuideType('action')}
            >
              Action Height
            </button>
            <button
              className={guideType === 'intonation' ? 'active' : ''}
              onClick={() => setGuideType('intonation')}
            >
              Intonation
            </button>
          </div>
        </div>
      </div>

      {guideType === 'action' ? (
        <ActionGuide instrument={instrument} />
      ) : (
        <IntonationGuide instrument={instrument} />
      )}
    </div>
  )
}

function ActionGuide({ instrument }: { instrument: InstrumentType }) {
  const guitarSpecs = {
    trebleLow: '1.0mm',
    trebleHigh: '1.5mm',
    bassLow: '1.5mm',
    bassHigh: '2.0mm'
  }

  const bassSpecs = {
    trebleLow: '1.5mm',
    trebleHigh: '2.0mm',
    bassLow: '2.0mm',
    bassHigh: '2.5mm'
  }

  const specs = instrument === 'guitar' ? guitarSpecs : bassSpecs

  return (
    <div className="action-guide">
      <div className="specs-box">
        <h3>Recommended Action Heights (at 12th fret)</h3>
        <div className="specs-grid">
          <div className="spec-item">
            <div className="spec-label">Treble Side (high E / G string)</div>
            <div className="spec-value">{specs.trebleLow} - {specs.trebleHigh}</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Bass Side (low E string)</div>
            <div className="spec-value">{specs.bassLow} - {specs.bassHigh}</div>
          </div>
        </div>
        <p className="specs-note">
          Lower = easier to play but more buzz risk. Higher = harder to play but cleaner tone.
        </p>
      </div>

      <div className="step-section">
        <h3>Tools Needed</h3>
        <ul className="tools-list">
          <li>Precision ruler or action gauge</li>
          <li>Appropriate hex keys or screwdrivers for bridge saddles</li>
          <li>Capo (optional, helps with measurements)</li>
          <li>Fresh, tuned strings</li>
        </ul>
      </div>

      <div className="step-section">
        <h3>Step-by-Step Instructions</h3>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Tune to Pitch</h4>
              <p>
                Make sure all strings are tuned to your desired tuning. String tension affects action measurements, so this is critical.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Measure Current Action</h4>
              <p>
                At the 12th fret, measure the distance from the top of the fret to the bottom of each string. Use a precision ruler or action gauge.
              </p>
              <div className="step-tip">
                <strong>Tip:</strong> Place the ruler on the fret, perpendicular to the neck, and measure the gap under the string.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Locate Bridge Saddle Adjustments</h4>
              <p>
                Find the height adjustment screws on each bridge saddle. These are usually hex screws or Phillips screws on either side of each saddle.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Adjust Saddle Height</h4>
              <p>
                Turn adjustment screws clockwise to raise action, counterclockwise to lower it. Adjust both sides of each saddle evenly to keep it level.
              </p>
              <div className="step-warning">
                <strong>⚠️ Important:</strong> Make small adjustments (1/4 turn at a time) and re-measure. Don't go too low or you'll get fret buzz.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Retune and Test</h4>
              <p>
                After adjusting, retune all strings and play across the entire neck. Check for:
              </p>
              <ul>
                <li>Fret buzz (action too low)</li>
                <li>Difficult to press (action too high)</li>
                <li>Even feel across all strings</li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-number">6</div>
            <div className="step-content">
              <h4>Fine-Tune to Your Preference</h4>
              <p>
                The specs above are guidelines. Adjust to your playing style:
              </p>
              <ul>
                <li><strong>Light touch players:</strong> Can go lower</li>
                <li><strong>Aggressive players:</strong> May need higher action</li>
                <li><strong>Slide players:</strong> Typically want higher action</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h4>Common Issues</h4>
        <ul>
          <li>
            <strong>Buzz only on certain strings:</strong> Those strings may need higher action than others.
          </li>
          <li>
            <strong>Can't get low enough:</strong> Check nut height and neck relief first.
          </li>
          <li>
            <strong>Bridge won't adjust low enough:</strong> May need bridge replacement or shim removal.
          </li>
          <li>
            <strong>After adjusting action, intonation is off:</strong> You'll need to adjust intonation next (see Intonation tab).
          </li>
        </ul>
      </div>
    </div>
  )
}

function IntonationGuide({ instrument }: { instrument: InstrumentType }) {
  return (
    <div className="intonation-guide">
      <div className="intro-box">
        <h3>What is Intonation?</h3>
        <p>
          Intonation ensures your {instrument} plays in tune across the entire fretboard. Proper intonation means the 12th fret harmonic and the fretted 12th fret note are the same pitch.
        </p>
      </div>

      <div className="step-section">
        <h3>Tools Needed</h3>
        <ul className="tools-list">
          <li>Electronic tuner (clip-on or pedal)</li>
          <li>Appropriate screwdriver for bridge saddles (usually Phillips or small flathead)</li>
          <li>Fresh, properly stretched strings</li>
        </ul>
      </div>

      <div className="step-section">
        <h3>Step-by-Step Instructions</h3>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Prepare Your {instrument === 'guitar' ? 'Guitar' : 'Bass'}</h4>
              <p>
                Install fresh strings and stretch them thoroughly. Let the instrument settle for 15-30 minutes. Tune to your desired tuning.
              </p>
              <div className="step-warning">
                <strong>⚠️ Important:</strong> Intonation must be set AFTER action and neck relief are correct. Adjust those first if needed.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Tune the Open String</h4>
              <p>
                Using your tuner, tune the open string perfectly to pitch. This is your reference point.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Check the 12th Fret</h4>
              <p>
                Fret the string at the 12th fret and check the tuner. Compare it to the open string pitch.
              </p>
              <ul>
                <li><strong>Sharp:</strong> The fretted note is higher than it should be</li>
                <li><strong>Flat:</strong> The fretted note is lower than it should be</li>
                <li><strong>In tune:</strong> Perfect! Move to next string</li>
              </ul>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Adjust Saddle Position</h4>
              <p>
                Locate the intonation adjustment screw at the back of the bridge saddle:
              </p>
              <ul>
                <li>
                  <strong>If SHARP:</strong> Lengthen the string by moving the saddle BACK (away from neck). Turn screw counterclockwise.
                </li>
                <li>
                  <strong>If FLAT:</strong> Shorten the string by moving the saddle FORWARD (toward neck). Turn screw clockwise.
                </li>
              </ul>
              <div className="step-tip">
                <strong>Memory Aid:</strong> "Sharp = Saddle Back, Flat = Forward"
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Retune and Recheck</h4>
              <p>
                After adjusting the saddle, the open string will have gone out of tune. Retune the open string, then check the 12th fret again.
              </p>
              <div className="step-tip">
                <strong>Tip:</strong> Make small adjustments. It may take several iterations of adjust → retune → check.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">6</div>
            <div className="step-content">
              <h4>Repeat for All Strings</h4>
              <p>
                Go through each string individually. Start with the thickest string and work your way to the thinnest.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">7</div>
            <div className="step-content">
              <h4>Final Check</h4>
              <p>
                Play some chords across different fret positions. Everything should sound in tune. If certain chords still sound off, you may need to compromise on intonation slightly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h4>Troubleshooting</h4>
        <ul>
          <li>
            <strong>Can't get a string to intonate:</strong> Check for worn frets, old strings, or improper neck relief.
          </li>
          <li>
            <strong>Saddle has reached its adjustment limit:</strong> Bridge may be installed in wrong position, or you may need a different bridge.
          </li>
          <li>
            <strong>Lower strings won't intonate:</strong> In drop tunings, heavier gauge strings may be needed.
          </li>
          <li>
            <strong>Perfect intonation impossible:</strong> Guitars/basses have "compromise" tuning systems. Very slight imperfection is normal.
          </li>
        </ul>
      </div>

      <div className="reference-box">
        <h4>Quick Reference: String Scale Length Positions</h4>
        <p>After intonation, your saddles should roughly follow this pattern (from bridge perspective):</p>
        <ul>
          <li><strong>Thickest strings (low E, A):</strong> Farthest back</li>
          <li><strong>Middle strings:</strong> Middle position</li>
          <li><strong>Thinnest strings (high E, B):</strong> More forward</li>
        </ul>
        <p className="reference-note">
          If your saddles are drastically different from this pattern, something else may be wrong (bridge position, neck angle, etc.).
        </p>
      </div>
    </div>
  )
}
