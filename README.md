# MathsMaster — ICSE Class 9 Mathematics Practice App

A fast, offline-ready, modern **ICSE Class 9 Mathematics Practice Web App** built strictly aligned with the **CISCE 2026–27 / 2027–28 Syllabus (8 Units, 25 Chapters)**.

Designed for students revising at home on a laptop, tablet, or mobile phone with zero login, zero backend dependency, and full PWA offline support ("Add to Home Screen").

---

## 🚀 Key Features

- **Full 25-Chapter Syllabus Coverage**: All 8 CISCE units and 25 chapters structured with authentic ICSE board-style questions.
- **Procedural Question Generators**: Unlimited practice with dynamically randomized numbers, surds, algebraic expressions, geometric angles, and statistical tables.
- **Curated Exam-Style Questions**: 155+ vetted questions spanning Easy, Standard, and Exam-level difficulty (including MCQs, Assertion–Reason, Numerical/Expression, Multi-part, and Geometry proofs).
- **3-Step Progressive Hint Ladder**: 
  1. *Concept & Formula clue*
  2. *First-step strategy & setup*
  3. *Full computation & final check*
- **Authentic Worked Solutions**: Step-by-step ICSE marking-scheme solutions with explicit mark breakdowns (e.g., `[1 Mark: Method]`, `[1 Mark: Answer]`).
- **Smart Mathematical Answer Evaluation**: Powered by `mathjs` and custom AST/equivalence checkers handling fractions, negative numbers, surds, algebraic equivalences (`(x-3)(x+2)` = `(x+2)(x-3)`), coordinate pairs `(x, y)`, and tolerance rounding.
- **CISCE Mock Exam Simulator (80 Marks, 3 Hours)**:
  - **Section A (40 Marks)**: Compulsory (15 MCQs/Assertion-Reason + short & multi-part questions).
  - **Section B (40 Marks)**: Choose 4 out of 7 questions (10 marks each).
  - Live 180-minute exam timer, section review, time management alerts, and automatic scoring.
- **Chapter Quick Tests & Multi-Chapter Practice**: Fast 10-question sprints for single chapters or custom chapter combinations.
- **"Mistakes to Retry" Smart Tracker**: Automatically tracks errors across practice and mock tests. Allows students to retry mistakes, highlights correct answers, and archives mastered problems with full visual confirmation.
- **Interactive Canvas Scratchpad**: Built-in scratchpad for rough calculations on touch screens, tablets, and mouse input.
- **Formula & Key Rules Drawer**: Slide-out formula sheet for all 25 chapters with essential rules, shortcuts, and exam tips.
- **100% Offline PWA**: KaTeX fonts and styles bundled locally; zero external CDN dependencies.

---

## 📚 Complete 25-Chapter Syllabus Map

| Unit | Chapter No. | Chapter Title |
| :--- | :--- | :--- |
| **Unit 1: Pure Arithmetic** | Chapter 1 | Rational and Irrational Numbers |
| **Unit 2: Commercial Mathematics** | Chapter 2 | Compound Interest (Stage 1) [Basic Concepts] |
| *(Instalments excluded)* | Chapter 3 | Compound Interest (Stage 2) [Applications] |
| **Unit 3: Algebra** | Chapter 4 | Expansions |
| | Chapter 5 | Factorisation |
| | Chapter 6 | Simultaneous (Linear) Equations [Including Problems] |
| | Chapter 7 | Indices (Exponents) |
| | Chapter 8 | Logarithms |
| **Unit 4: Geometry** | Chapter 9 | Triangles [Congruency] |
| | Chapter 10 | Isosceles Triangles & Inequalities |
| | Chapter 11 | Mid-Point Theorem |
| | Chapter 12 | Pythagoras Theorem |
| | Chapter 13 | Rectilinear Figures [Polygons & Quadrilaterals] |
| | Chapter 14 | Construction of Polygons |
| | Chapter 15 | Area Theorems |
| | Chapter 16 | Circle |
| **Unit 5: Statistics** | Chapter 17 | Statistics & Frequency Polygons |
| | Chapter 18 | Mean & Median [Ungrouped & Tabulated Data] |
| **Unit 6: Mensuration** | Chapter 19 | Area and Perimeter of Plane Figures |
| | Chapter 20 | Solids [Cube and Cuboid] |
| **Unit 7: Trigonometry** | Chapter 21 | Trigonometrical Ratios |
| | Chapter 22 | Solution of Right Triangles |
| **Unit 8: Coordinate Geometry** | Chapter 23 | Coordinate Geometry [Cartesian Plane & Coordinates] |
| | Chapter 24 | Graphical Solution of Linear Equations |
| | Chapter 25 | Distance Formula |

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript (`strict: true`)
- **Build Tool**: Vite + Tailwind CSS
- **Math Typesetting**: KaTeX (bundled fonts for complete offline rendering)
- **Math Evaluation**: Math.js + Custom Equivalence Evaluator
- **Icons & Diagrams**: Lucide React + Inline SVG Components
- **Persistence**: Type-safe browser `localStorage`
- **PWA Support**: `vite-plugin-pwa` with Workbox offline precaching
- **Testing**: Vitest (127 automated tests verifying generators, evaluator, and storage)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/harishpanoor/SuretySprint.git

# Navigate into project directory
cd SuretySprint

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open your browser at `http://localhost:5173/`.

### Running Tests
```bash
# Run unit & regression test suite (127 tests)
npm test

# Run TypeScript typecheck
npm run typecheck
```

### Building for Production
```bash
# Compile and build PWA bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
MIT License. Created for ICSE Class 9 students and educators.
