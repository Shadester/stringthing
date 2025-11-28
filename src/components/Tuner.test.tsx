import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tuner from './Tuner'

// Mock the hooks
vi.mock('../hooks/usePitchDetection', () => ({
  usePitchDetection: vi.fn(() => ({
    pitchData: {
      frequency: 0,
      note: '-',
      octave: 0,
      cents: 0,
      isPlaying: false
    },
    isListening: false,
    error: null,
    startListening: vi.fn(),
    stopListening: vi.fn()
  }))
}))

vi.mock('../hooks/useToneGenerator', () => ({
  useToneGenerator: vi.fn(() => ({
    playTone: vi.fn(),
    playingFrequency: null
  }))
}))

import { usePitchDetection } from '../hooks/usePitchDetection'
import { useToneGenerator } from '../hooks/useToneGenerator'

describe('Tuner component', () => {
  beforeEach(() => {
    // Reset to default mocks before each test
    vi.mocked(usePitchDetection).mockReturnValue({
      pitchData: {
        frequency: 0,
        note: '-',
        octave: 0,
        cents: 0,
        isPlaying: false
      },
      isListening: false,
      error: null,
      startListening: vi.fn(),
      stopListening: vi.fn()
    })

    vi.mocked(useToneGenerator).mockReturnValue({
      playTone: vi.fn(),
      playingFrequency: null
    })
  })

  describe('getCentsIndicator logic', () => {
    it('should position indicator at 0% for -50 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 415.3,
          note: 'G#',
          octave: 4,
          cents: -50,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      const indicator = document.querySelector('.cents-indicator')
      expect(indicator).toHaveStyle({ left: '0%' })
    })

    it('should position indicator at 50% for 0 cents (in tune)', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 440,
          note: 'A',
          octave: 4,
          cents: 0,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      const indicator = document.querySelector('.cents-indicator')
      expect(indicator).toHaveStyle({ left: '50%' })
    })

    it('should position indicator at 100% for +50 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 466.2,
          note: 'A#',
          octave: 4,
          cents: 50,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      const indicator = document.querySelector('.cents-indicator')
      expect(indicator).toHaveStyle({ left: '100%' })
    })

    it('should clamp values beyond ±50 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 523.25,
          note: 'C',
          octave: 5,
          cents: 75,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      const indicator = document.querySelector('.cents-indicator')
      expect(indicator).toHaveStyle({ left: '100%' })
    })

    it('should clamp negative values beyond -50 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 392,
          note: 'G',
          octave: 4,
          cents: -80,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      const indicator = document.querySelector('.cents-indicator')
      expect(indicator).toHaveStyle({ left: '0%' })
    })
  })

  describe('getTuningStatus logic', () => {
    it('should return "in-tune" for cents within ±5', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 440,
          note: 'A',
          octave: 4,
          cents: 3,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('✓ In Tune')).toBeInTheDocument()
      const indicator = document.querySelector('.cents-indicator.in-tune')
      expect(indicator).toBeInTheDocument()
    })

    it('should return "in-tune" for exactly 5 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 440,
          note: 'A',
          octave: 4,
          cents: 5,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('✓ In Tune')).toBeInTheDocument()
    })

    it('should return "in-tune" for exactly -5 cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 440,
          note: 'A',
          octave: 4,
          cents: -5,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('✓ In Tune')).toBeInTheDocument()
    })

    it('should return "flat" for cents less than -5', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 437,
          note: 'A',
          octave: 4,
          cents: -12,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('↓ Flat')).toBeInTheDocument()
      const indicator = document.querySelector('.cents-indicator.flat')
      expect(indicator).toBeInTheDocument()
    })

    it('should return "sharp" for cents greater than 5', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 445,
          note: 'A',
          octave: 4,
          cents: 20,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('↑ Sharp')).toBeInTheDocument()
      const indicator = document.querySelector('.cents-indicator.sharp')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('Display behavior', () => {
    it('should show placeholder when not playing', () => {
      render(<Tuner />)

      expect(screen.getByText('Play a note...')).toBeInTheDocument()
      expect(screen.getByText('-')).toBeInTheDocument()
    })

    it('should display note and octave when playing', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 440,
          note: 'A',
          octave: 4,
          cents: 0,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      // Note display should show A
      const noteDisplay = document.querySelector('.note-display .note')
      expect(noteDisplay).toHaveTextContent('A')

      // Octave display should show 4
      const octaveDisplay = document.querySelector('.note-display .octave')
      expect(octaveDisplay).toHaveTextContent('4')

      expect(screen.getByText('440 Hz')).toBeInTheDocument()
    })

    it('should hide octave when octave is 0', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 30.87,
          note: 'B',
          octave: 0,
          cents: 0,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('B')).toBeInTheDocument()
      // Octave should not be displayed for octave 0
      const octaveDisplay = document.querySelector('.octave')
      expect(octaveDisplay?.textContent).toBe('')
    })

    it('should display frequency with correct precision', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 329.6,
          note: 'E',
          octave: 4,
          cents: 0,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('329.6 Hz')).toBeInTheDocument()
    })

    it('should show cents with proper sign', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 445,
          note: 'A',
          octave: 4,
          cents: 20,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText(/\+20 cents/)).toBeInTheDocument()
    })

    it('should not show + sign for negative cents', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 437,
          note: 'A',
          octave: 4,
          cents: -12,
          isPlaying: true
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText(/-12 cents/)).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('should display error message when present', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 0,
          note: '-',
          octave: 0,
          cents: 0,
          isPlaying: false
        },
        isListening: false,
        error: 'Microphone access denied',
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('Microphone access denied')).toBeInTheDocument()
    })
  })

  describe('Start/Stop button', () => {
    it('should show "Start Tuner" when not listening', () => {
      render(<Tuner />)

      expect(screen.getByText('Start Tuner')).toBeInTheDocument()
    })

    it('should show "Stop" when listening', () => {
      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 0,
          note: '-',
          octave: 0,
          cents: 0,
          isPlaying: false
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening: vi.fn()
      })

      render(<Tuner />)

      expect(screen.getByText('Stop')).toBeInTheDocument()
    })

    it('should call startListening when clicked while not listening', async () => {
      const user = userEvent.setup()
      const startListening = vi.fn()

      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 0,
          note: '-',
          octave: 0,
          cents: 0,
          isPlaying: false
        },
        isListening: false,
        error: null,
        startListening,
        stopListening: vi.fn()
      })

      render(<Tuner />)

      await user.click(screen.getByText('Start Tuner'))
      expect(startListening).toHaveBeenCalled()
    })

    it('should call stopListening when clicked while listening', async () => {
      const user = userEvent.setup()
      const stopListening = vi.fn()

      vi.mocked(usePitchDetection).mockReturnValue({
        pitchData: {
          frequency: 0,
          note: '-',
          octave: 0,
          cents: 0,
          isPlaying: false
        },
        isListening: true,
        error: null,
        startListening: vi.fn(),
        stopListening
      })

      render(<Tuner />)

      await user.click(screen.getByText('Stop'))
      expect(stopListening).toHaveBeenCalled()
    })
  })

  describe('Reference tones', () => {
    it('should display all guitar standard tuning notes', () => {
      render(<Tuner />)

      expect(screen.getByText('Guitar (Standard)')).toBeInTheDocument()
      expect(screen.getByText('E2')).toBeInTheDocument()
      expect(screen.getByText('A2')).toBeInTheDocument()
      expect(screen.getByText('D3')).toBeInTheDocument()
      expect(screen.getByText('G3')).toBeInTheDocument()
      expect(screen.getByText('B3')).toBeInTheDocument()
      expect(screen.getByText('E4')).toBeInTheDocument()
    })

    it('should display all bass 4-string tuning notes', () => {
      render(<Tuner />)

      expect(screen.getByText('Bass 4-String')).toBeInTheDocument()
      // Notes may appear multiple times (bass4 and bass5 share notes)
      const e1Notes = screen.getAllByText('E1')
      const a1Notes = screen.getAllByText('A1')
      const d2Notes = screen.getAllByText('D2')
      const g2Notes = screen.getAllByText('G2')

      expect(e1Notes.length).toBeGreaterThan(0)
      expect(a1Notes.length).toBeGreaterThan(0)
      expect(d2Notes.length).toBeGreaterThan(0)
      expect(g2Notes.length).toBeGreaterThan(0)
    })

    it('should display all bass 5-string tuning notes', () => {
      render(<Tuner />)

      expect(screen.getByText('Bass 5-String')).toBeInTheDocument()
      expect(screen.getByText('B0')).toBeInTheDocument()
    })

    it('should call playTone with correct frequency when reference note is clicked', async () => {
      const user = userEvent.setup()
      const playTone = vi.fn()

      vi.mocked(useToneGenerator).mockReturnValue({
        playTone,
        playingFrequency: null
      })

      render(<Tuner />)

      // Click the A2 string button (110 Hz)
      const a2Buttons = screen.getAllByText('A2')
      await user.click(a2Buttons[0])

      expect(playTone).toHaveBeenCalledWith(110.0, false)
    })

    it('should call playTone with bass flag for bass notes', async () => {
      const user = userEvent.setup()
      const playTone = vi.fn()

      vi.mocked(useToneGenerator).mockReturnValue({
        playTone,
        playingFrequency: null
      })

      render(<Tuner />)

      // Click a bass note
      const e1Buttons = screen.getAllByText('E1')
      await user.click(e1Buttons[0])

      expect(playTone).toHaveBeenCalledWith(41.2, true)
    })

    it('should show playing icon on active reference tone', () => {
      vi.mocked(useToneGenerator).mockReturnValue({
        playTone: vi.fn(),
        playingFrequency: 82.41
      })

      render(<Tuner />)

      const playingIcons = screen.getAllByText('♪')
      expect(playingIcons.length).toBeGreaterThan(0)
    })

    it('should apply playing class to active reference button', () => {
      vi.mocked(useToneGenerator).mockReturnValue({
        playTone: vi.fn(),
        playingFrequency: 110.0
      })

      render(<Tuner />)

      const playingButtons = document.querySelectorAll('.string-note.playing')
      expect(playingButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Standard tuning frequencies', () => {
    it('should have correct guitar tuning frequencies', () => {
      render(<Tuner />)

      // Verify frequencies are displayed
      expect(screen.getByText('82.41Hz')).toBeInTheDocument()
      expect(screen.getByText('110Hz')).toBeInTheDocument()
      expect(screen.getByText('146.83Hz')).toBeInTheDocument()
      expect(screen.getByText('196Hz')).toBeInTheDocument()
      expect(screen.getByText('246.94Hz')).toBeInTheDocument()
      expect(screen.getByText('329.63Hz')).toBeInTheDocument()
    })

    it('should have correct bass 4-string tuning frequencies', () => {
      render(<Tuner />)

      // The frequencies are shown in two places (bass4 and bass5 sections)
      const freq412 = screen.getAllByText('41.2Hz')
      const freq55 = screen.getAllByText('55Hz')
      const freq7342 = screen.getAllByText('73.42Hz')
      const freq98 = screen.getAllByText('98Hz')

      expect(freq412.length).toBeGreaterThan(0)
      expect(freq55.length).toBeGreaterThan(0)
      expect(freq7342.length).toBeGreaterThan(0)
      expect(freq98.length).toBeGreaterThan(0)
    })

    it('should have correct bass 5-string tuning frequencies', () => {
      render(<Tuner />)

      expect(screen.getByText('30.87Hz')).toBeInTheDocument()
    })
  })
})
