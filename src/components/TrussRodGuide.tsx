import { useState } from 'react'
import './TrussRodGuide.css'

type ReliefIssue = 'tooMuch' | 'backBow' | 'checking' | 'good'

export default function TrussRodGuide() {
  const [reliefMeasurement, setReliefMeasurement] = useState<number>(0.25)
  const [issue, setIssue] = useState<ReliefIssue>('checking')

  const determineIssue = (relief: number): ReliefIssue => {
    if (relief < 0) return 'backBow'
    if (relief > 0.5) return 'tooMuch'
    if (relief >= 0.15 && relief <= 0.4) return 'good'
    return 'checking'
  }

  const handleCalculate = () => {
    setIssue(determineIssue(reliefMeasurement))
  }

  return (
    <div className="truss-rod-guide">
      <div className="warning-header">
        <div className="warning-icon">⚠️</div>
        <div className="warning-content">
          <h2>Truss Rod Adjustment - Read Before Proceeding</h2>
          <p>
            Truss rod adjustments can permanently damage your instrument if done incorrectly. If you're uncomfortable or the rod feels stuck, <strong>stop and consult a professional</strong>. This guide is for educational purposes only.
          </p>
        </div>
      </div>

      <div className="what-is-section">
        <h3>What is Neck Relief?</h3>
        <p>
          Neck relief is the slight forward bow in the neck. A small amount of relief (0.15-0.4mm at the 7th-9th fret) is normal and necessary to prevent fret buzz, especially in the middle of the neck where string vibration is greatest.
        </p>
        <div className="relief-visual">
          <div className="visual-item">
            <div className="visual-label">Correct Relief</div>
            <div className="visual-diagram correct">
              <div className="neck">
                <div className="string correct-bow"></div>
              </div>
            </div>
            <div className="visual-desc">Slight forward bow (0.15-0.4mm)</div>
          </div>
          <div className="visual-item">
            <div className="visual-label">Too Much Relief</div>
            <div className="visual-diagram too-much">
              <div className="neck">
                <div className="string too-much-bow"></div>
              </div>
            </div>
            <div className="visual-desc">Excessive bow (&gt;0.5mm)</div>
          </div>
          <div className="visual-item">
            <div className="visual-label">Back Bow</div>
            <div className="visual-diagram back-bow">
              <div className="neck">
                <div className="string back-bow-curve"></div>
              </div>
            </div>
            <div className="visual-desc">Bowing backward (&lt;0mm)</div>
          </div>
        </div>
      </div>

      <div className="measurement-section">
        <h3>How to Measure Neck Relief</h3>
        <div className="measurement-steps">
          <div className="measure-step">
            <span className="measure-num">1</span>
            <p>Tune your instrument to pitch</p>
          </div>
          <div className="measure-step">
            <span className="measure-num">2</span>
            <p>Press down the 6th (low E) string at the 1st fret and the last fret (usually 20-22)</p>
          </div>
          <div className="measure-step">
            <span className="measure-num">3</span>
            <p>While holding both ends, look at the gap between the string and the 7th-9th fret</p>
          </div>
          <div className="measure-step">
            <span className="measure-num">4</span>
            <p>Measure this gap with a feeler gauge, or use a thin pick as reference (~0.25mm)</p>
          </div>
        </div>

        <div className="measurement-input">
          <h4>Enter Your Measurement</h4>
          <div className="input-group">
            <input
              type="number"
              value={reliefMeasurement}
              onChange={e => setReliefMeasurement(parseFloat(e.target.value) || 0)}
              step="0.05"
              min="-0.5"
              max="2"
            />
            <span className="unit">mm</span>
          </div>
          <div className="reference-items">
            <button onClick={() => setReliefMeasurement(0.10)} className="ref-button">
              Business Card (~0.10mm)
            </button>
            <button onClick={() => setReliefMeasurement(0.25)} className="ref-button">
              Thin Pick (~0.25mm)
            </button>
            <button onClick={() => setReliefMeasurement(0.50)} className="ref-button">
              Medium Pick (~0.50mm)
            </button>
          </div>
          <button className="calculate-button" onClick={handleCalculate}>
            Analyze Relief
          </button>
        </div>
      </div>

      {issue !== 'checking' && (
        <div className={`diagnosis-result ${issue}`}>
          {issue === 'good' && (
            <>
              <div className="result-icon">✓</div>
              <div className="result-content">
                <h3>Relief is Good</h3>
                <p>
                  Your neck relief of <strong>{reliefMeasurement}mm</strong> is within the ideal range (0.15-0.4mm). No truss rod adjustment needed unless you're experiencing specific issues.
                </p>
                <div className="good-note">
                  <strong>Note:</strong> If you have fret buzz or high action despite good relief, the issue may be elsewhere (action height, nut, frets, playing technique).
                </div>
              </div>
            </>
          )}

          {issue === 'tooMuch' && (
            <>
              <div className="result-icon">⚡</div>
              <div className="result-content">
                <h3>Too Much Relief (Excessive Bow)</h3>
                <p>
                  Your neck relief of <strong>{reliefMeasurement}mm</strong> is higher than ideal. This can cause high action and make the instrument harder to play.
                </p>

                <div className="adjustment-box">
                  <h4>Adjustment Needed: Tighten Truss Rod (Clockwise)</h4>
                  <ul>
                    <li>Tightening straightens the neck and reduces relief</li>
                    <li>Turn clockwise (righty-tighty) in <strong>1/4 turn increments</strong></li>
                    <li>After each adjustment, retune and wait 5-10 minutes for neck to settle</li>
                    <li>Re-measure and repeat if needed</li>
                  </ul>
                </div>

                <div className="symptoms">
                  <strong>Symptoms you might have noticed:</strong>
                  <ul>
                    <li>High action, especially in the middle of the neck</li>
                    <li>Strings feel stiff and hard to press</li>
                    <li>Notes feel "dead" or lack sustain</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {issue === 'backBow' && (
            <>
              <div className="result-icon warning-icon-result">⚠️</div>
              <div className="result-content">
                <h3>Back Bow (Negative Relief)</h3>
                <p>
                  Your neck is bowing backward. This causes fret buzz in the middle of the neck and poor playability.
                </p>

                <div className="adjustment-box">
                  <h4>Adjustment Needed: Loosen Truss Rod (Counterclockwise)</h4>
                  <ul>
                    <li>Loosening allows the neck to bow forward naturally</li>
                    <li>Turn counterclockwise (lefty-loosey) in <strong>1/4 turn increments</strong></li>
                    <li>After each adjustment, retune and wait 5-10 minutes</li>
                    <li>Re-measure and repeat if needed</li>
                  </ul>
                </div>

                <div className="symptoms">
                  <strong>Symptoms you might have noticed:</strong>
                  <ul>
                    <li>Buzzing in the middle frets (5-12)</li>
                    <li>Strings feel too close to the frets</li>
                    <li>Difficulty getting clean notes in the middle register</li>
                  </ul>
                </div>

                <div className="back-bow-warning">
                  <strong>Important:</strong> If back bow appeared suddenly or the truss rod has been over-tightened, be very careful. Do not force it. Consult a professional if uncertain.
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="adjustment-guide">
        <h3>Truss Rod Adjustment Safety Guide</h3>

        <div className="safety-grid">
          <div className="safety-item do">
            <h4>✓ DO</h4>
            <ul>
              <li>Use the correct size tool (hex key or wrench)</li>
              <li>Make small adjustments (1/4 turn maximum)</li>
              <li>Wait 5-10 minutes between adjustments</li>
              <li>Keep the instrument tuned during adjustments</li>
              <li>Write down your adjustments</li>
              <li>Stop if you feel significant resistance</li>
            </ul>
          </div>

          <div className="safety-item dont">
            <h4>✗ DON'T</h4>
            <ul>
              <li>Force a stuck or resistant truss rod</li>
              <li>Make large adjustments (more than 1/2 turn total)</li>
              <li>Adjust while strings are detuned</li>
              <li>Use the wrong size tool</li>
              <li>Expect immediate results (wood needs time)</li>
              <li>Adjust if you're not confident</li>
            </ul>
          </div>
        </div>

        <div className="tool-info">
          <h4>Locating the Truss Rod Nut</h4>
          <p>The truss rod adjustment nut is typically located at:</p>
          <ul>
            <li><strong>Headstock:</strong> Under a small cover plate between the nut and tuning pegs (most common on guitars)</li>
            <li><strong>Soundhole:</strong> Inside the soundhole on acoustic guitars</li>
            <li><strong>Neck heel:</strong> Where the neck meets the body (some basses and acoustics)</li>
          </ul>
          <p className="tool-note">
            Most require a 4mm or 5mm hex key. Some use a 1/4" or 5/16" wrench. Check your instrument's manual.
          </p>
        </div>
      </div>

      <div className="when-professional">
        <h3>When to See a Professional</h3>
        <ul>
          <li>The truss rod feels stuck or won't turn smoothly</li>
          <li>You've made adjustments but see no change in relief</li>
          <li>You're uncomfortable making adjustments yourself</li>
          <li>The neck has a twist or irregular bow (not just forward/back)</li>
          <li>The instrument has significant structural damage</li>
          <li>You've reached the end of the truss rod's adjustment range</li>
        </ul>
        <p className="professional-note">
          A professional setup typically costs $50-100 and includes truss rod, action, intonation, and nut adjustments. It's worth it for peace of mind!
        </p>
      </div>
    </div>
  )
}
