import { usePitchDetection } from '../hooks/usePitchDetection'
import { useToneGenerator } from '../hooks/useToneGenerator'
import './Tuner.css'

const STANDARD_TUNINGS = {
  guitar: [
    { note: 'E', octave: 2, freq: 82.41, string: 6 },
    { note: 'A', octave: 2, freq: 110.0, string: 5 },
    { note: 'D', octave: 3, freq: 146.83, string: 4 },
    { note: 'G', octave: 3, freq: 196.0, string: 3 },
    { note: 'B', octave: 3, freq: 246.94, string: 2 },
    { note: 'E', octave: 4, freq: 329.63, string: 1 }
  ],
  bass4: [
    { note: 'E', octave: 1, freq: 41.2, string: 4 },
    { note: 'A', octave: 1, freq: 55.0, string: 3 },
    { note: 'D', octave: 2, freq: 73.42, string: 2 },
    { note: 'G', octave: 2, freq: 98.0, string: 1 }
  ],
  bass5: [
    { note: 'B', octave: 0, freq: 30.87, string: 5 },
    { note: 'E', octave: 1, freq: 41.2, string: 4 },
    { note: 'A', octave: 1, freq: 55.0, string: 3 },
    { note: 'D', octave: 2, freq: 73.42, string: 2 },
    { note: 'G', octave: 2, freq: 98.0, string: 1 }
  ]
}

export default function Tuner() {
  const { pitchData, isListening, error, startListening, stopListening } = usePitchDetection()
  const { playTone, playingFrequency } = useToneGenerator()

  const getCentsIndicator = (cents: number) => {
    const position = Math.max(-50, Math.min(50, cents))
    const percentage = ((position + 50) / 100) * 100
    return percentage
  }

  const getTuningStatus = (cents: number) => {
    if (Math.abs(cents) <= 5) return 'in-tune'
    if (cents < 0) return 'flat'
    return 'sharp'
  }

  return (
    <div className="tuner">
      {error && <div className="error">{error}</div>}

      <div className="tuner-display">
        <div className={`note-display ${pitchData.isPlaying ? 'active' : pitchData.note !== '-' ? 'faded' : ''}`}>
          <span className="note">{pitchData.note}</span>
          <span className="octave">{pitchData.octave > 0 ? pitchData.octave : ''}</span>
        </div>

        <div className="frequency">
          {pitchData.isPlaying
            ? `${pitchData.frequency} Hz`
            : pitchData.note !== '-'
              ? `${pitchData.frequency} Hz`
              : 'Play a note...'}
        </div>

        <div className="cents-meter">
          <div className="cents-scale">
            <span>-50</span>
            <span>0</span>
            <span>+50</span>
          </div>
          <div className="cents-bar">
            <div className="cents-center" />
            <div
              className={`cents-indicator ${pitchData.isPlaying ? getTuningStatus(pitchData.cents) : ''}`}
              style={{ left: `${getCentsIndicator(pitchData.cents)}%` }}
            />
          </div>
          <div className="cents-value">
            {(pitchData.isPlaying || pitchData.note !== '-') && (
              <>
                {pitchData.cents > 0 ? '+' : ''}{pitchData.cents} cents
                <span className={`status ${pitchData.isPlaying ? getTuningStatus(pitchData.cents) : 'faded'}`}>
                  {getTuningStatus(pitchData.cents) === 'in-tune' ? '✓ In Tune' :
                   getTuningStatus(pitchData.cents) === 'flat' ? '↓ Flat' : '↑ Sharp'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        className={`listen-button ${isListening ? 'listening' : ''}`}
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? 'Stop' : 'Start Tuner'}
      </button>

      <div className="reference-tunings">
        <h3>Reference Notes</h3>
        <p className="reference-hint">Click a note to play the reference tone</p>
        <div className="tuning-sections">
          <div className="tuning-section">
            <h4>Guitar (Standard)</h4>
            <div className="string-notes">
              {STANDARD_TUNINGS.guitar.map((s, i) => (
                <button
                  key={i}
                  className={`string-note ${playingFrequency === s.freq ? 'playing' : ''}`}
                  onClick={() => playTone(s.freq, false)}
                >
                  <span className="string-number">{s.string}</span>
                  <span className="note-name">{s.note}{s.octave}</span>
                  <small>{s.freq}Hz</small>
                  {playingFrequency === s.freq && <span className="playing-icon">♪</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="tuning-section">
            <h4>Bass 4-String</h4>
            <div className="string-notes">
              {STANDARD_TUNINGS.bass4.map((s, i) => (
                <button
                  key={i}
                  className={`string-note ${playingFrequency === s.freq ? 'playing' : ''}`}
                  onClick={() => playTone(s.freq, true)}
                >
                  <span className="string-number">{s.string}</span>
                  <span className="note-name">{s.note}{s.octave}</span>
                  <small>{s.freq}Hz</small>
                  {playingFrequency === s.freq && <span className="playing-icon">♪</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="tuning-section">
            <h4>Bass 5-String</h4>
            <div className="string-notes">
              {STANDARD_TUNINGS.bass5.map((s, i) => (
                <button
                  key={i}
                  className={`string-note ${playingFrequency === s.freq ? 'playing' : ''}`}
                  onClick={() => playTone(s.freq, true)}
                >
                  <span className="string-number">{s.string}</span>
                  <span className="note-name">{s.note}{s.octave}</span>
                  <small>{s.freq}Hz</small>
                  {playingFrequency === s.freq && <span className="playing-icon">♪</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
