<div align="center">

# 🎸 StringThing

**A modern web app for guitar and bass players**

*Helping you restring your instrument with precision and confidence*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Live Demo](https://stringthing.procrastinator.se) • [Report Bug](https://github.com/Shadester/stringthing/issues) • [Request Feature](https://github.com/Shadester/stringthing/issues)

</div>

---

## 📖 About

StringThing is a comprehensive web-based tool designed to help guitar and bass players with everything from restringing to setup and maintenance. Whether you're a beginner or a seasoned player, StringThing provides practical, hands-on tools for keeping your instrument in top shape.

### Why StringThing?

- 🎯 **Accurate Tuning** — Real-time pitch detection with visual feedback
- 📚 **Guided Process** — Step-by-step instructions prevent mistakes
- 🧮 **Smart Tools** — Calculate string slack, diagnose issues, and optimize setup
- 🔧 **Setup Guides** — Professional-quality adjustment instructions
- 🎨 **Beautiful UI** — Modern, vibrant design that's pleasant to use
- 📱 **Works Everywhere** — Responsive design for desktop, tablet, and mobile

---

## ✨ Features

### 🎵 Chromatic Tuner

<details open>
<summary>Click to expand</summary>

- **Real-time pitch detection** using your device's microphone
- Visual tuning indicator with ±50 cents range
- Shows note name, octave, frequency, and cents deviation
- Color-coded feedback: 🟢 In tune • 🔴 Flat • 🟠 Sharp
- **Playable reference tones** with realistic plucked string sound
- Synthesized tones using harmonics (not simple sine waves)
- Optimized sound profiles for guitar vs. bass

**Supported Tunings:**
- 🎸 **Guitar** — Standard, Drop D, Half Step Down, Whole Step Down, DADGAD, Open G
- 🎸 **Bass 4-string** — Standard, Drop D, Half Step Down
- 🎸 **Bass 5-string** — Standard, Half Step Down

</details>

### 📋 Interactive Restring Guide

<details>
<summary>Click to expand</summary>

- **Step-by-step instructions** tailored for guitar and bass
- Interactive checklist — mark steps complete as you go
- Progress bar to track your workflow
- Expert tips for each step to avoid common pitfalls
- **Special instructions** for Floyd Rose and floating tremolo systems

**Features:**
- Clean the fretboard reminder
- Proper string threading technique
- Correct winding direction guidance
- String stretching best practices

</details>

### 🧮 String Slack Calculator

<details>
<summary>Click to expand</summary>

Calculate the perfect amount of string slack for optimal winding tension.

**Supports:**
- Multiple tuner types (Standard, Vintage, Locking)
- Common scale length presets:
  - 🎸 Guitar: Fender (25.5"), Gibson (24.75"), PRS (25")
  - 🎸 Bass: Standard (34"), Short (30"), Medium (32"), Long (35")
- Custom scale length input
- Automatic calculations for all strings
- Results in centimeters for easy measurement

**Calculates:**
- Nut-to-tuner distance for each string
- Required slack per string
- Number of wraps needed

</details>

### 🎸 String Gauge Recommender

<details>
<summary>Click to expand</summary>

Get personalized string gauge recommendations based on your playing style and tuning.

**Features:**
- Recommendations for guitar and bass
- Multiple tuning support (Standard, Drop D, Drop C, Drop B, etc.)
- Playing style selection (Light touch, Medium, Heavy/Aggressive)
- Comprehensive gauge set database
- Detailed descriptions of each gauge set
- Tips for gauge selection and setup adjustments

</details>

### 🔧 Fret Buzz Diagnostic

<details>
<summary>Click to expand</summary>

Interactive troubleshooting tool to identify and fix fret buzz issues.

**Diagnostic Features:**
- Location-based analysis (low frets, middle, high, specific, or all over)
- Severity assessment (slight, moderate, severe)
- Detailed cause identification
- Step-by-step solutions
- Quick pre-diagnostic checks
- Safety warnings and professional guidance

</details>

### 📏 Action & Intonation Guide

<details>
<summary>Click to expand</summary>

Professional setup instructions for adjusting string height and intonation.

**Action Adjustment:**
- Recommended heights for guitar and bass
- Measurement techniques
- Step-by-step adjustment process
- Troubleshooting common issues
- Tools needed checklist

**Intonation Setup:**
- What intonation is and why it matters
- How to check intonation at the 12th fret
- Saddle adjustment instructions ("Sharp = Saddle Back, Flat = Forward")
- Final verification steps
- Troubleshooting guide

</details>

### 🔩 Truss Rod Adjustment Guide

<details>
<summary>Click to expand</summary>

Safe and effective neck relief measurement and adjustment tool.

**Features:**
- Visual relief diagrams showing correct bow, excessive bow, and back bow
- Measurement calculator with common reference objects
- Analysis of relief measurements
- Direction-specific adjustment instructions
- Comprehensive safety warnings
- DO/DON'T checklist
- Truss rod location guide
- When to see a professional

⚠️ **Safety First:** Includes prominent warnings about potential damage from improper adjustments.

</details>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Shadester/stringthing.git
cd stringthing

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI library with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool and dev server |
| **Web Audio API** | Real-time pitch detection & tone synthesis |
| **CSS3** | Modern styling with gradients and animations |

---

## 🎨 Design Philosophy

StringThing features a **bold and vibrant** design system:

- 🌈 **Gradient backgrounds** — Dynamic cyan-to-teal color schemes
- 💎 **Glass-morphism effects** — Frosted glass UI elements with backdrop blur
- ✨ **Glow effects** — Subtle shadows and lighting for depth
- 🎭 **Smooth animations** — Polished transitions and hover states
- 🌙 **Dark theme** — Optimized for extended use and focus

---

## 📱 Browser Compatibility

StringThing works in all modern browsers that support:

- ✅ Web Audio API (pitch detection & synthesis)
- ✅ MediaDevices API (microphone access)
- ✅ CSS Grid & Flexbox
- ✅ ES2022+ JavaScript features

**Recommended:** Chrome, Firefox, Safari, Edge (latest versions)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Pitch detection algorithm based on autocorrelation method
- Synthesized string sounds use additive synthesis with harmonics
- Built with modern React patterns and hooks

---

<div align="center">

**Made with ❤️ for musicians**

[⬆ Back to Top](#-stringthing)

</div>
