import { useState } from 'react'
import { usePitchDetection } from '../hooks/usePitchDetection'
import { useToneGenerator } from '../hooks/useToneGenerator'
import './Tuner.css'

interface StringNote {
  note: string
  octave: number
  freq: number
  string: number
}

interface Tuning {
  name: string
  strings: StringNote[]
}

const GUITAR_TUNINGS: Tuning[] = [
  {
    name: 'Standard (E A D G B E)',
    strings: [
      { note: 'E', octave: 2, freq: 82.41, string: 6 },
      { note: 'A', octave: 2, freq: 110.0, string: 5 },
      { note: 'D', octave: 3, freq: 146.83, string: 4 },
      { note: 'G', octave: 3, freq: 196.0, string: 3 },
      { note: 'B', octave: 3, freq: 246.94, string: 2 },
      { note: 'E', octave: 4, freq: 329.63, string: 1 }
    ]
  },
  {
    name: 'Drop D (D A D G B E)',
    strings: [
      { note: 'D', octave: 2, freq: 73.42, string: 6 },
      { note: 'A', octave: 2, freq: 110.0, string: 5 },
      { note: 'D', octave: 3, freq: 146.83, string: 4 },
      { note: 'G', octave: 3, freq: 196.0, string: 3 },
      { note: 'B', octave: 3, freq: 246.94, string: 2 },
      { note: 'E', octave: 4, freq: 329.63, string: 1 }
    ]
  },
  {
    name: 'Half Step Down (Eb Ab Db Gb Bb Eb)',
    strings: [
      { note: 'Eb', octave: 2, freq: 77.78, string: 6 },
      { note: 'Ab', octave: 2, freq: 103.83, string: 5 },
      { note: 'Db', octave: 3, freq: 138.59, string: 4 },
      { note: 'Gb', octave: 3, freq: 185.0, string: 3 },
      { note: 'Bb', octave: 3, freq: 233.08, string: 2 },
      { note: 'Eb', octave: 4, freq: 311.13, string: 1 }
    ]
  },
  {
    name: 'Whole Step Down (D G C F A D)',
    strings: [
      { note: 'D', octave: 2, freq: 73.42, string: 6 },
      { note: 'G', octave: 2, freq: 98.0, string: 5 },
      { note: 'C', octave: 3, freq: 130.81, string: 4 },
      { note: 'F', octave: 3, freq: 174.61, string: 3 },
      { note: 'A', octave: 3, freq: 220.0, string: 2 },
      { note: 'D', octave: 4, freq: 293.66, string: 1 }
    ]
  },
  {
    name: 'DADGAD',
    strings: [
      { note: 'D', octave: 2, freq: 73.42, string: 6 },
      { note: 'A', octave: 2, freq: 110.0, string: 5 },
      { note: 'D', octave: 3, freq: 146.83, string: 4 },
      { note: 'G', octave: 3, freq: 196.0, string: 3 },
      { note: 'A', octave: 3, freq: 220.0, string: 2 },
      { note: 'D', octave: 4, freq: 293.66, string: 1 }
    ]
  },
  {
    name: 'Open G (D G D G B D)',
    strings: [
      { note: 'D', octave: 2, freq: 73.42, string: 6 },
      { note: 'G', octave: 2, freq: 98.0, string: 5 },
      { note: 'D', octave: 3, freq: 146.83, string: 4 },
      { note: 'G', octave: 3, freq: 196.0, string: 3 },
      { note: 'B', octave: 3, freq: 246.94, string: 2 },
      { note: 'D', octave: 4, freq: 293.66, string: 1 }
    ]
  }
]

const BASS_TUNINGS: Record<string, Tuning[]> = {
  bass4: [
    {
      name: 'Standard (E A D G)',
      strings: [
        { note: 'E', octave: 1, freq: 41.2, string: 4 },
        { note: 'A', octave: 1, freq: 55.0, string: 3 },
        { note: 'D', octave: 2, freq: 73.42, string: 2 },
        { note: 'G', octave: 2, freq: 98.0, string: 1 }
      ]
    },
    {
      name: 'Drop D (D A D G)',
      strings: [
        { note: 'D', octave: 1, freq: 36.71, string: 4 },
        { note: 'A', octave: 1, freq: 55.0, string: 3 },
        { note: 'D', octave: 2, freq: 73.42, string: 2 },
        { note: 'G', octave: 2, freq: 98.0, string: 1 }
      ]
    },
    {
      name: 'Half Step Down (Eb Ab Db Gb)',
      strings: [
        { note: 'Eb', octave: 1, freq: 38.89, string: 4 },
        { note: 'Ab', octave: 1, freq: 51.91, string: 3 },
        { note: 'Db', octave: 2, freq: 69.30, string: 2 },
        { note: 'Gb', octave: 2, freq: 92.50, string: 1 }
      ]
    }
  ],
  bass5: [
    {
      name: 'Standard (B E A D G)',
      strings: [
        { note: 'B', octave: 0, freq: 30.87, string: 5 },
        { note: 'E', octave: 1, freq: 41.2, string: 4 },
        { note: 'A', octave: 1, freq: 55.0, string: 3 },
        { note: 'D', octave: 2, freq: 73.42, string: 2 },
        { note: 'G', octave: 2, freq: 98.0, string: 1 }
      ]
    },
    {
      name: 'Half Step Down (Bb Eb Ab Db Gb)',
      strings: [
        { note: 'Bb', octave: 0, freq: 29.14, string: 5 },
        { note: 'Eb', octave: 1, freq: 38.89, string: 4 },
        { note: 'Ab', octave: 1, freq: 51.91, string: 3 },
        { note: 'Db', octave: 2, freq: 69.30, string: 2 },
        { note: 'Gb', octave: 2, freq: 92.50, string: 1 }
      ]
    }
  ]
}

export default function Tuner() {
  const { pitchData, isListening, error, startListening, stopListening } = usePitchDetection()
  const { playTone, playingFrequency } = useToneGenerator()
  const [guitarTuning, setGuitarTuning] = useState(0)
  const [bass4Tuning, setBass4Tuning] = useState(0)
  const [bass5Tuning, setBass5Tuning] = useState(0)

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
            <div className="tuning-header">
              <h4>Guitar</h4>
              <select
                className="tuning-selector"
                value={guitarTuning}
                onChange={(e) => setGuitarTuning(Number(e.target.value))}
              >
                {GUITAR_TUNINGS.map((tuning, i) => (
                  <option key={i} value={i}>{tuning.name}</option>
                ))}
              </select>
            </div>
            <div className="string-notes">
              {GUITAR_TUNINGS[guitarTuning].strings.map((s, i) => (
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
            <div className="tuning-header">
              <h4>Bass 4-String</h4>
              <select
                className="tuning-selector"
                value={bass4Tuning}
                onChange={(e) => setBass4Tuning(Number(e.target.value))}
              >
                {BASS_TUNINGS.bass4.map((tuning, i) => (
                  <option key={i} value={i}>{tuning.name}</option>
                ))}
              </select>
            </div>
            <div className="string-notes">
              {BASS_TUNINGS.bass4[bass4Tuning].strings.map((s, i) => (
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
            <div className="tuning-header">
              <h4>Bass 5-String</h4>
              <select
                className="tuning-selector"
                value={bass5Tuning}
                onChange={(e) => setBass5Tuning(Number(e.target.value))}
              >
                {BASS_TUNINGS.bass5.map((tuning, i) => (
                  <option key={i} value={i}>{tuning.name}</option>
                ))}
              </select>
            </div>
            <div className="string-notes">
              {BASS_TUNINGS.bass5[bass5Tuning].strings.map((s, i) => (
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
