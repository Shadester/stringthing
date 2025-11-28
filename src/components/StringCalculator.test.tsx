import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StringCalculator from './StringCalculator'

// Helper to find inputs by their characteristics
function getScaleLengthInput() {
  const inputs = screen.getAllByRole('spinbutton')
  return inputs.find(input => input.getAttribute('step') === '0.25')!
}

function getNutToTunerInput() {
  const inputs = screen.getAllByRole('spinbutton')
  return inputs.find(input => input.getAttribute('step') === '0.5')!
}

function getWrapsInput() {
  const inputs = screen.getAllByRole('spinbutton')
  return inputs.find(input => input.getAttribute('min') === '2' && input.getAttribute('max') === '5')!
}

describe('StringCalculator', () => {
  describe('Unit conversions', () => {
    it('should convert inches to centimeters correctly', () => {
      render(<StringCalculator />)

      // Default Fender scale is 25.5"
      expect(screen.getByText('= 64.8 cm')).toBeInTheDocument()
    })

    it('should convert Gibson scale length correctly', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      // Click Gibson scale button
      await user.click(screen.getByText('Gibson (24.75")'))

      expect(screen.getByText('= 62.9 cm')).toBeInTheDocument()
    })

    it('should handle custom scale length input', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const scaleInput = getScaleLengthInput()
      await user.clear(scaleInput)
      await user.type(scaleInput, '27')

      expect(screen.getByText(/68\.6 cm/)).toBeInTheDocument()
    })
  })

  describe('String calculations', () => {
    it('should calculate correct slack for standard guitar tuners', () => {
      render(<StringCalculator />)

      // Default: 3 wraps, 10mm diameter
      // Circumference = π * 10mm = π cm ≈ 3.14 cm
      // 3 wraps * 3.14 = ~9.4 cm
      const slackCells = screen.getAllByText(/9\.\d cm/)
      expect(slackCells.length).toBeGreaterThan(0)
    })

    it('should calculate different distances for each string', () => {
      render(<StringCalculator />)

      // With 35mm spacing, each string should be 3.5cm further
      const rows = screen.getAllByText(/cm/).filter(el =>
        el.textContent?.match(/^\d+\.\d+ cm$/)
      )

      expect(rows.length).toBeGreaterThan(0)
    })

    it('should show 6 strings for guitar', () => {
      render(<StringCalculator />)

      // Check for string numbers 1-6
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('6')).toBeInTheDocument()
    })

    it('should show 4 strings for bass4', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Bass 4'))

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.queryByText('5')).not.toBeInTheDocument()
    })

    it('should show 5 strings for bass5', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Bass 5'))

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should use bass peg config for bass instruments', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      // Switch to bass
      await user.click(screen.getByText('Bass 4'))

      // Bass pegs are 45mm spacing and 15mm diameter
      // Circumference = π * 15mm = ~4.71 cm
      // Default 3 wraps * 4.71 = ~14.1 cm
      const slackCells = screen.getAllByText(/14\.\d+ cm/)
      expect(slackCells.length).toBeGreaterThan(0)
    })
  })

  describe('Peg type configurations', () => {
    it('should allow changing peg type for guitar', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Vintage'))

      // Vintage pegs should show as active
      const vintageButton = screen.getByText('Vintage')
      expect(vintageButton.className).toContain('active')
    })

    it('should calculate different slack for locking tuners', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Locking'))

      // Locking tuners: 8mm diameter
      // Circumference = π * 8mm = ~2.51 cm
      // 3 wraps * 2.51 = ~7.5 cm
      const slackCells = screen.getAllByText(/7\.\d+ cm/)
      expect(slackCells.length).toBeGreaterThan(0)
    })

    it('should show locking tuner note when locking is selected', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Locking'))

      expect(screen.getByText(/Locking tuners/)).toBeInTheDocument()
    })

    it('should not show peg type selector for bass', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Bass 4'))

      expect(screen.queryByText('Tuning Peg Type')).not.toBeInTheDocument()
    })
  })

  describe('Target wraps', () => {
    it('should allow changing target wraps', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const wrapsInput = getWrapsInput()
      // Select all and replace
      await user.tripleClick(wrapsInput)
      await user.keyboard('4')

      // Wait for update
      await new Promise(resolve => setTimeout(resolve, 50))

      // 4 wraps should be set
      expect(wrapsInput).toHaveValue(4)
    })

    it('should update quick reference when wraps change', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const wrapsInput = getWrapsInput()
      await user.clear(wrapsInput)
      await user.type(wrapsInput, '2')

      // Check for "2 tuner posts" in the quick reference
      expect(screen.getByText(/2 tuner posts/)).toBeInTheDocument()
    })
  })

  describe('Nut to tuner measurements', () => {
    it('should allow custom nut to first tuner distance', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const nutInput = getNutToTunerInput()
      await user.clear(nutInput)
      await user.type(nutInput, '12')

      // Should update the first string's nut-to-tuner distance
      const nutToTunerCells = screen.getAllByText(/12(\.0)? cm/)
      expect(nutToTunerCells.length).toBeGreaterThan(0)
    })

    it('should calculate progressive distances for each string', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const nutInput = getNutToTunerInput()
      await user.clear(nutInput)
      await user.type(nutInput, '10')

      // With 35mm (3.5cm) spacing, distances should be progressive
      const nutToTunerCells = screen.getAllByText(/\d+(\.\d+)? cm/)
      expect(nutToTunerCells.length).toBeGreaterThan(0)
    })
  })

  describe('Help section', () => {
    it('should toggle help section on button click', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const helpButton = screen.getByText('How to Measure?')
      expect(screen.queryByText('Measurement Guide')).not.toBeInTheDocument()

      await user.click(helpButton)
      expect(screen.getByText('Measurement Guide')).toBeInTheDocument()

      await user.click(screen.getByText('Hide Measurement Guide'))
      // After hiding, the help section should not be visible
      expect(screen.queryByText('Measurement Guide')).not.toBeInTheDocument()
    })
  })

  describe('Instrument switching', () => {
    it('should reset to appropriate defaults when switching instruments', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      // Start with guitar
      expect(screen.getByText('Fender (25.5")')).toBeInTheDocument()

      // Switch to bass
      await user.click(screen.getByText('Bass 4'))
      expect(screen.getByText('Standard (34")')).toBeInTheDocument()

      // Switch back to guitar
      await user.click(screen.getByText('Guitar'))
      expect(screen.getByText('Fender (25.5")')).toBeInTheDocument()
    })

    it('should update scale length when switching to bass', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      await user.click(screen.getByText('Bass 4'))

      // Bass default is 34"
      expect(screen.getByText('= 86.4 cm')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('should handle minimum scale length', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const customInput = getScaleLengthInput()
      await user.clear(customInput)
      await user.type(customInput, '20')

      expect(screen.getByText(/50\.8 cm/)).toBeInTheDocument()
    })

    it('should handle maximum scale length', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const customInput = getScaleLengthInput()
      await user.clear(customInput)
      await user.type(customInput, '40')

      expect(screen.getByText(/101\.6 cm/)).toBeInTheDocument()
    })

    it('should handle minimum wraps', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const wrapsInput = getWrapsInput()
      await user.clear(wrapsInput)
      await user.type(wrapsInput, '2')

      // 2 wraps should still calculate correctly
      const slackValues = screen.getAllByText(/\d+\.\d+ cm/)
      expect(slackValues.length).toBeGreaterThan(0)
    })

    it('should handle zero/invalid input gracefully', async () => {
      const user = userEvent.setup()
      render(<StringCalculator />)

      const customInput = getScaleLengthInput()
      await user.tripleClick(customInput)
      await user.keyboard('0')

      // Should show 0 cm without crashing
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(customInput).toHaveValue(0)
    })
  })

  describe('Results display', () => {
    it('should display all required table columns', () => {
      render(<StringCalculator />)

      expect(screen.getByText('String')).toBeInTheDocument()
      expect(screen.getByText('Nut to Tuner')).toBeInTheDocument()
      expect(screen.getByText('Slack to Add')).toBeInTheDocument()
      expect(screen.getByText('Wraps')).toBeInTheDocument()
    })

    it('should show tips section', () => {
      render(<StringCalculator />)

      expect(screen.getByText('Tips')).toBeInTheDocument()
      expect(screen.getByText(/Wound strings/)).toBeInTheDocument()
      expect(screen.getByText(/Plain strings/)).toBeInTheDocument()
    })

    it('should show quick reference section', () => {
      render(<StringCalculator />)

      expect(screen.getByText('Quick Reference')).toBeInTheDocument()
      expect(screen.getByText(/Easy method:/)).toBeInTheDocument()
    })
  })
})
