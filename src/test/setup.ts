import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Web Audio API
class MockAudioContext {
  state = 'running'
  sampleRate = 48000

  createAnalyser() {
    return new MockAnalyser()
  }

  createMediaStreamSource() {
    return {
      connect: vi.fn()
    }
  }

  createOscillator() {
    return new MockOscillator()
  }

  createGain() {
    return new MockGain()
  }

  resume() {
    return Promise.resolve()
  }

  close() {
    return Promise.resolve()
  }
}

class MockAnalyser {
  fftSize = 2048
  smoothingTimeConstant = 0

  getFloatTimeDomainData(array: Float32Array) {
    // Fill with silence by default
    array.fill(0)
  }

  connect() {}
}

class MockOscillator {
  frequency = { value: 440 }
  type = 'sine'

  connect() {
    return this
  }

  start() {}
  stop() {}
}

class MockGain {
  gain = { value: 0 }

  connect() {
    return this
  }
}

class MockMediaStream {
  private tracks: MediaStreamTrack[] = []

  getTracks() {
    return this.tracks
  }

  addTrack(track: MediaStreamTrack) {
    this.tracks.push(track)
  }
}

class MockMediaStreamTrack {
  stop = vi.fn()
}

// Set up global mocks
global.AudioContext = MockAudioContext as any
global.MediaStream = MockMediaStream as any

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: vi.fn(() => {
      const stream = new MockMediaStream()
      stream.addTrack(new MockMediaStreamTrack() as any)
      return Promise.resolve(stream)
    })
  }
})

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 0)
  return 1
})

global.cancelAnimationFrame = vi.fn()
