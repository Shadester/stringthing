import { useState } from 'react'
import './RestringGuide.css'
import prepareWorkspaceImage from '../assets/guides/restring-prepare.svg'
import removeStringsImage from '../assets/guides/restring-remove.svg'
import threadStringImage from '../assets/guides/restring-thread.svg'
import measureSlackImage from '../assets/guides/restring-slack.svg'
import windStringImage from '../assets/guides/restring-wind.svg'
import stretchStringImage from '../assets/guides/restring-stretch.svg'

type InstrumentType = 'guitar' | 'bass'
type BridgeType = 'hardtail' | 'tremolo' | 'floyd'

interface Step {
  title: string
  description: string
  tip?: string
  image?: string
  imageAlt?: string
}

const GUITAR_STEPS: Step[] = [
  {
    title: '1. Prepare your workspace',
    description: 'Lay the guitar on a stable, padded surface. Have your new strings, wire cutters, string winder, and tuner ready.',
    tip: 'A neck rest or rolled-up towel under the neck prevents it from moving.',
    image: prepareWorkspaceImage,
    imageAlt: 'Guitar resting securely on a padded work surface beside restringing tools'
  },
  {
    title: '2. Loosen and remove old strings',
    description: 'Detune each string completely by turning the tuning pegs. Once slack, unwind from the tuning peg and remove from the bridge.',
    tip: 'Remove strings one at a time to maintain neck tension, or all at once if you want to clean the fretboard.',
    image: removeStringsImage,
    imageAlt: 'Tuning peg turning to loosen a string before it is removed'
  },
  {
    title: '3. Clean the fretboard',
    description: 'With strings off, wipe down the fretboard with a dry cloth. For deeper cleaning, use lemon oil on rosewood/ebony (not maple).',
    tip: 'This is the perfect time to condition the wood and clean hard-to-reach areas.'
  },
  {
    title: '4. Thread the new string',
    description: 'Insert the ball end into the bridge (or through the body for string-through designs). Pull the string up to the tuning peg.',
    tip: 'Make sure the ball end is seated properly in the bridge, not caught under the bridge pin.',
    image: threadStringImage,
    imageAlt: 'New string threaded through the guitar bridge with its ball end seated firmly'
  },
  {
    title: '5. Measure slack for winding',
    description: 'Pull the string taut to the target tuning peg, then add 5-8 cm of slack (about 2-3 tuning posts worth). This gives enough length for proper wraps.',
    tip: 'Too few wraps = string slippage. Too many = tuning instability.',
    image: measureSlackImage,
    imageAlt: 'String pulled past its tuning post to measure two to three tuning-post spaces of slack'
  },
  {
    title: '6. Wind the string',
    description: 'Insert the string through the peg hole. Wind so the string wraps downward on the post, toward the headstock. First wrap goes above the string end, subsequent wraps below.',
    tip: 'Aim for 2-3 wraps on wound strings, 3-4 on plain strings. Keep tension while winding for neat coils.',
    image: windStringImage,
    imageAlt: 'Close-up of neat downward string wraps around a tuning post'
  },
  {
    title: '7. Stretch and tune',
    description: 'Bring the string up to pitch. Gently pull the string away from the fretboard (about 2-3 cm) at various points along its length, then retune. Repeat until stable.',
    tip: 'New strings stretch! Plan to retune several times in the first few hours of playing.',
    image: stretchStringImage,
    imageAlt: 'Hand gently lifting a newly installed string a short distance above the fretboard'
  },
  {
    title: '8. Trim excess',
    description: 'Once the string is stable, trim the excess wire close to the tuning peg with wire cutters.',
    tip: 'Leave a small amount to prevent the string from slipping through.'
  },
  {
    title: '9. Repeat for remaining strings',
    description: 'Follow the same process for each string, working from low to high (or vice versa).',
  },
  {
    title: '10. Final tuning check',
    description: 'After all strings are on, do a complete tuning pass. Check intonation by comparing the 12th fret harmonic to the fretted note.',
    tip: 'Intonation adjustments may be needed after changing string gauge.'
  }
]

const BASS_STEPS: Step[] = [
  {
    title: '1. Prepare your workspace',
    description: 'Place the bass on a stable, padded surface. Bass strings are thicker and under more tension - work carefully.',
    tip: 'A proper bass stand or neck rest is especially important due to the weight.',
    image: prepareWorkspaceImage,
    imageAlt: 'Instrument resting securely on a padded work surface beside restringing tools'
  },
  {
    title: '2. Loosen and remove old strings',
    description: 'Detune each string fully. Bass strings have high tension - release slowly. Unwind from tuners and remove from bridge.',
    tip: 'Bass strings release a lot of tension. Go slowly to avoid sudden snaps.',
    image: removeStringsImage,
    imageAlt: 'Tuning peg turning to loosen a string before it is removed'
  },
  {
    title: '3. Clean the fretboard',
    description: 'Wipe down with a dry cloth. Condition rosewood/ebony with appropriate fretboard oil. Clean the frets with fine steel wool if needed.',
    tip: 'Tape off the pickups when using steel wool to prevent metal particles from sticking to magnets.'
  },
  {
    title: '4. Thread the new string',
    description: 'For through-body: feed from the back. For top-load: insert ball end into bridge. Guide the string up to the tuner.',
    tip: 'Bass strings are thick - make sure they seat properly in the bridge saddle.',
    image: threadStringImage,
    imageAlt: 'New string threaded through the bridge with its ball end seated firmly'
  },
  {
    title: '5. Measure and cut',
    description: 'Extend the string past the target tuning peg, measure 8-10 cm past, and cut. Bass strings must be trimmed before winding due to their thickness.',
    tip: 'Measure carefully before cutting - you can\'t undo this step!',
    image: measureSlackImage,
    imageAlt: 'String extended beyond its tuning post to leave enough length for clean wraps'
  },
  {
    title: '6. Wind the string',
    description: 'Insert the cut end into the tuner post hole. Wind so the string wraps downward toward the headstock. Aim for 2-3 clean wraps.',
    tip: 'Maintain tension while winding to ensure tight, even wraps.',
    image: windStringImage,
    imageAlt: 'Close-up of neat downward string wraps around a tuning post'
  },
  {
    title: '7. Stretch and tune',
    description: 'Tune to pitch, then firmly (but gently) pull the string away from the fretboard at multiple points. Retune and repeat until stable.',
    tip: 'Bass strings take longer to settle - be patient with the stretching process.',
    image: stretchStringImage,
    imageAlt: 'Hand gently lifting a newly installed string a short distance above the fretboard'
  },
  {
    title: '8. Repeat for all strings',
    description: 'Complete the same process for each string. Work methodically from lowest to highest.',
  },
  {
    title: '9. Check setup',
    description: 'After restringing, check action, intonation, and truss rod. New string gauge may require adjustments.',
    tip: 'If changing gauges significantly, give the neck a day to adjust before making truss rod changes.'
  },
  {
    title: '10. Final tuning',
    description: 'Do multiple tuning passes. Play through all positions to ensure strings are settled and stable.',
    tip: 'Fresh bass strings can take a day or two to fully stabilize.'
  }
]

interface FloydStep {
  title: string
  description: string
  tip?: string
}

const FLOYD_ROSE_TIPS: FloydStep[] = [
  {
    title: 'Floyd Rose Special Notes',
    description: 'Floyd Rose and floating tremolo systems require extra care when restringing.',
  },
  {
    title: 'Block the tremolo',
    description: 'Place a block of wood or a tremolo stopper behind the bridge to keep it level while changing strings. This prevents the bridge from diving or rising as you change string tension.',
  },
  {
    title: 'Change one string at a time',
    description: 'Never remove all strings at once on a Floyd Rose. This destabilizes the floating bridge balance and can require a full setup to fix.',
  },
  {
    title: 'Clip the ball end',
    description: 'Cut off the ball end of the string. Insert the plain end into the saddle and tighten the locking screw.',
    tip: 'Don\'t over-tighten the saddle screws - just enough to hold the string firmly.'
  },
  {
    title: 'Lock the nut last',
    description: 'Only lock the nut clamps after all strings are tuned and stretched. Use the fine tuners for final adjustments after locking.',
  }
]

interface RestringGuideProps {
  instrument: InstrumentType
}

export default function RestringGuide({ instrument }: RestringGuideProps) {
  const [bridgeType, setBridgeType] = useState<BridgeType>('hardtail')
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const steps = instrument === 'guitar' ? GUITAR_STEPS : BASS_STEPS

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const resetProgress = () => {
    setCompletedSteps(new Set())
  }

  const progress = (completedSteps.size / steps.length) * 100

  return (
    <div className="component-container restring-guide">
      <div className="guide-options">
        {instrument === 'guitar' && (
          <div className="option-group">
            <label>Bridge Type</label>
            <div className="segmented-buttons">
              <button
                className={bridgeType === 'hardtail' ? 'active' : ''}
                onClick={() => setBridgeType('hardtail')}
              >
                Hardtail
              </button>
              <button
                className={bridgeType === 'tremolo' ? 'active' : ''}
                onClick={() => setBridgeType('tremolo')}
              >
                Tremolo
              </button>
              <button
                className={bridgeType === 'floyd' ? 'active' : ''}
                onClick={() => setBridgeType('floyd')}
              >
                Floyd Rose
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <span className="progress-text">
          {completedSteps.size} / {steps.length} steps complete
        </span>
      </div>

      {instrument === 'guitar' && bridgeType === 'floyd' && (
        <div className="floyd-tips">
          {FLOYD_ROSE_TIPS.map((tip, index) => (
            <div key={index} className="floyd-tip">
              <h4>{tip.title}</h4>
              <p>{tip.description}</p>
              {tip.tip && <p className="tip">{tip.tip}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="steps-list">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${completedSteps.has(index) ? 'completed' : ''}`}
            onClick={() => toggleStep(index)}
          >
            <div className="step-checkbox">
              {completedSteps.has(index) ? '✓' : index + 1}
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              {step.image && (
                <img className="step-image" src={step.image} alt={step.imageAlt ?? ''} />
              )}
              <p>{step.description}</p>
              {step.tip && <p className="tip">{step.tip}</p>}
            </div>
          </div>
        ))}
      </div>

      {completedSteps.size === steps.length && (
        <div className="completion-message">
          All done! Your {instrument} is freshly strung and ready to play!
        </div>
      )}

      <button className="reset-button" onClick={resetProgress}>
        Reset Progress
      </button>
    </div>
  )
}
