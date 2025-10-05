# 🌍 Farm Navigators - Angelus Novus

> A strategic decision-making card game about balancing global agriculture, sustainability, and social impact. Inspired by **Reigns** and **Beecarbonize**, powered by real NASA satellite data.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)](https://vitejs.dev/)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Game Concept](#game-concept)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Game Mechanics](#game-mechanics)
- [NASA Data Integration](#nasa-data-integration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎮 About the Project

**Farm Navigators: Angelus Novus** is a turn-based strategy and management game that puts you in the shoes of a global decision-maker. Every choice is a moral and economic dilemma where you must balance four critical pillars that shape our world's future.

The game combines the swipe-based decision mechanics of **Reigns** with the environmental depth of **Beecarbonize**, applied to one of humanity's most urgent challenges: sustainable agriculture and its global impact.

### 🌟 Core Philosophy

> **"There is no perfect choice - only trade-offs."**

In Farm Navigators, every decision impacts multiple areas of society. Boost the economy? Sustainability suffers. Focus on technology? People might be left behind. Your role is to navigate these disproportionate trade-offs and guide humanity toward a sustainable future.

---

## 🎯 Game Concept

### The Four Pillars of Impact

Players must balance four interconnected systems:

| Pillar | Description | Range |
|--------|-------------|-------|
| 💰 **Economy** | Production, revenue, and resources for other pillars | -20 to +20 |
| 🌱 **Sustainability** | Environmental protection and long-term planetary health | -20 to +20 |
| 🔧 **Technology** | Innovation, research, and technological advancement | -20 to +20 |
| 👥 **People** | Social wellbeing, health, employment, and equity | -20 to +20 |

### 🌍 Earth Index System

The game tracks humanity's resource consumption through the **Earth Index**:
- **1.0 Earth** = Sustainable consumption
- **1.75 Earths** = Current global average (2025)
- **4.0+ Earths** = Critical overconsumption

Your decisions directly impact this index, calculated based on sustainability choices. The Earth Index affects your final score and determines when Earth Overshoot Day occurs.

### 🎲 The Core Mechanic: Disproportionate Trade-offs

**Example Decision:**
```
Card: "Drought Alert - SMAP shows critical soil moisture levels"

Option A (Save Water):
  Economy: -1
  Sustainability: +2
  Technology: 0
  People: -1
  
Option B (Use Reserves):
  Economy: +1
  Sustainability: -2
  Technology: 0
  People: +1
```

No choice is purely good or bad - you must decide which pillar to prioritize and which to sacrifice.

---

## ✨ Features

### 🎴 Card-Based Gameplay
- **13+ Decision Cards** based on real NASA satellite data (SMAP, MODIS, GPM)
- Each card presents a dilemma with **left/right swipe mechanics**
- Educational information about NASA data sources
- Dynamic card deck with reshuffle mechanics

### 📊 Dynamic Scoring System
```typescript
finalScore = 
  (turns × 100) +              // Base: turns survived
  (pillarSum × 50) +           // Positive pillar values
  (pillarBalance × 100) +      // Bonus for keeping pillars balanced
  (winBonus ? 1000 : 0) -      // Victory bonus
  (earthIndexPenalty)          // Penalty for overconsumption
```

### 🏆 Game Endings
- **Victory**: Survive 25 turns with all pillars above -15, or achieve all pillars ≥ 15
- **Defeat**: Any pillar drops to -15 or below
- **Leaderboard**: Save your score with name and nation flag 🇧🇷🇺🇸🇯🇵

### 🌐 Internationalization
- Full support for **English** and **Portuguese**
- i18next integration for easy language switching
- Localized game content and UI

### 💾 Save System
- Auto-save progress after each decision
- Continue from where you left off
- Persistent leaderboard across sessions

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Shadcn/ui component library
- Smooth animations and transitions
- Dark/light theme support

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18+** - UI library
- **TypeScript 5+** - Type safety
- **Vite** - Build tool and dev server

### UI Components & Styling
- **Shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

### State Management & Data
- **React Context API** - Game state management
- **LocalStorage** - Save game persistence
- **i18next** - Internationalization

### Additional Libraries
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **date-fns** - Date utilities
- **class-variance-authority** - Component variants

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Install with nvm](https://github.com/nvm-sh/nvm))
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/VictorTeixeiraS/AngelusNovus.git
cd AngelusNovus
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
```
http://localhost:5173
```

### Build for Production

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

---

## ⚙️ Environment Setup

### Environment Variables (Optional - Future Langflow Integration)

Create a `.env` file in the root directory for AI assistant integration:

```env
# Langflow Configuration (Optional)
VITE_LANGFLOW_API_URL=https://your-langflow-instance.com
VITE_LANGFLOW_API_KEY=your-api-key-here
VITE_LANGFLOW_FLOW_ID=your-flow-id

# Application Settings
VITE_APP_NAME="Farm Navigators"
VITE_APP_VERSION="1.0.0"
```

### Langflow Integration Setup

Farm Navigators is designed to support an AI virtual assistant powered by Langflow for enhanced gameplay guidance.

#### What is Langflow?

[Langflow](https://www.langflow.org/) is a UI for building and deploying LangChain workflows. It allows you to create conversational AI assistants without coding.

#### Setup Steps:

1. **Create a Langflow Account**
   - Visit [Langflow](https://www.langflow.org/)
   - Sign up for a free account
   - Create a new flow

2. **Configure Your Flow**
   - Design a conversational flow for game guidance
   - Set up context about the four pillars system
   - Add decision analysis capabilities
   - Configure NASA data interpretation

3. **Get Your API Credentials**
   - Navigate to your flow settings
   - Copy your API URL
   - Generate an API key
   - Copy your Flow ID

4. **Update Environment Variables**
   ```env
   VITE_LANGFLOW_API_URL=https://api.langflow.astra.datastax.com
   VITE_LANGFLOW_API_KEY=AstraCS:abc123...
   VITE_LANGFLOW_FLOW_ID=your-flow-uuid
   ```

5. **Restart Development Server**
   ```bash
   npm run dev
   ```

#### Virtual Assistant Features:

When Langflow is configured, players get:
- 🤖 Real-time decision analysis
- 📚 NASA data explanations
- 💡 Strategic suggestions
- 📊 Pillar balance recommendations
- 🌍 Earth Index insights

**Note**: The game works perfectly without Langflow - it's an optional enhancement!

---

## 🎲 Game Mechanics

### Turn System

1. **Start Game** - All pillars begin at 0, Earth Index at 1.75
2. **Draw Card** - Receive a decision card with NASA data context
3. **Make Choice** - Swipe left or right to decide
4. **Apply Impact** - Pillars adjust based on your choice
5. **Update Earth Index** - Changes based on sustainability impact
6. **Check Win/Loss** - Game evaluates if you can continue
7. **Next Turn** - Draw a new card and repeat

### Win Conditions

- ✅ **Survive 25 turns** with all pillars above -15
- ✅ **Achieve balance**: All pillars reach +15 or higher
- ✅ **Maximize score** by balancing all four pillars

### Loss Conditions

- ❌ **Pillar Collapse**: Any pillar drops to -15 or below
- ❌ **Example**: Economy at -15 means economic collapse

### Pillar Impact Mechanics

```typescript
// Pillar values are clamped between -20 and +20
const clampPillar = (value: number) => 
  Math.max(-20, Math.min(20, value));

// Earth Index calculation
const earthIndexChange = 
  sustainabilityImpact < 0 
    ? Math.abs(sustainabilityImpact) × 0.03  // Negative = increase consumption
    : -sustainabilityImpact × 0.01;          // Positive = decrease consumption

// Final Earth Index (clamped 1.0 to 5.0)
earthIndex = clamp(earthIndex + earthIndexChange, 1.0, 5.0);
```

---

## 🛰️ NASA Data Integration

### Data Sources

The game uses real NASA satellite missions:

| Mission | Purpose | In-Game Use |
|---------|---------|-------------|
| **SMAP** | Soil Moisture Active Passive | Irrigation decisions, drought alerts |
| **MODIS** | Moderate Resolution Imaging Spectroradiometer | Crop health, vegetation monitoring |
| **GPM** | Global Precipitation Measurement | Rainfall patterns, flood warnings |
| **Landsat** | Land imaging | Land use changes, deforestation |

### Example Card Based on SMAP Data

```typescript
{
  id: 'card-001',
  title: 'Survival Irrigation',
  description: 'SMAP data shows extremely low soil moisture in your region',
  dataSource: 'SMAP',
  question: 'Use emergency water reserves for immediate irrigation?',
  options: [
    {
      label: 'Save Water',
      resultText: 'Conserved water but crops suffered short-term stress'
    },
    {
      label: 'Use Reserves',
      resultText: 'Crops survived but water reserves depleted'
    }
  ],
  impacts: {
    left: { economy: -1, sustainability: 2, technology: 0, people: -1 },
    right: { economy: 1, sustainability: -2, technology: 0, people: 1 }
  },
  education: 'SMAP satellites monitor soil moisture globally, helping farmers make informed irrigation decisions.'
}
```

### Educational Component

Each card includes:
- 📡 **Data Source**: Which NASA mission provided the data
- 📊 **Context**: What the data means in real-world terms
- 🎓 **Education**: Learn about NASA's Earth observation capabilities

---

## 📁 Project Structure

```
AngelusNovus/
├── public/
│   ├── locales/           # i18n translation files
│   │   ├── en.json        # English translations
│   │   └── pt.json        # Portuguese translations
│   └── placeholder.svg
├── src/
│   ├── assets/            # Game assets
│   │   ├── cards.ts       # Card definitions with NASA data
│   │   └── little-eliot.png
│   ├── components/        # React components
│   │   ├── card/          # Card display components
│   │   ├── screens/       # Game screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── GameScreen.tsx
│   │   │   ├── GameOverScreen.tsx
│   │   │   ├── ScoreboardScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── ui/            # Shadcn/ui components
│   │   │   ├── StatBar.tsx    # Pillar visualization
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── Character.tsx
│   │   ├── Chat.tsx       # AI assistant (Langflow)
│   │   └── VirtualAssistant.tsx
│   ├── game/              # Game logic
│   │   ├── GameContext.tsx     # State management
│   │   ├── TurnManager.ts      # Turn processing
│   │   └── DeckManager.ts      # Card management
│   ├── hooks/             # Custom React hooks
│   │   ├── useGameLogic.ts
│   │   ├── useSwipe.ts
│   │   └── use-mobile.tsx
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── pages/             # Route pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── services/          # External services
│   │   ├── LocalizationService.ts
│   │   ├── SaveGameService.ts
│   │   └── NASADataAdapter.ts
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── .gitignore
├── components.json        # Shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite config
```

### Key Files Explained

#### `src/assets/cards.ts`
Contains all decision cards with:
- NASA data context
- Dilemma questions
- Two choice options
- Impact values for each pillar
- Educational content

#### `src/game/GameContext.tsx`
Central game state manager:
- Current game state
- Turn progression
- Decision processing
- Save/load functionality
- Earth Index calculation

#### `src/game/TurnManager.ts`
Handles turn logic:
- Apply pillar impacts
- Check win/loss conditions
- Clamp pillar values
- Track game history

#### `src/game/DeckManager.ts`
Manages card deck:
- Card shuffling
- Drawing cards
- Discard pile
- Deck reshuffling

#### `src/types/index.ts`
TypeScript type definitions:
- `GameState` - Complete game state
- `Card` - Card structure
- `PillarImpact` - Pillar changes
- `TurnHistory` - Decision history
- `ScoreboardEntry` - Leaderboard entries

---

## 🎨 UI/UX Design

### Design System

- **Color Palette**
  - Economy: Gold/Yellow tones
  - Sustainability: Green tones
  - Technology: Blue/Cyan tones
  - People: Purple/Pink tones

- **Typography**
  - Primary Font: System UI fonts
  - Monospace: For stats and numbers

- **Responsive Breakpoints**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Component Library

Built with **Shadcn/ui** for:
- Consistent design language
- Accessibility (ARIA compliant)
- Customizable theming
- Dark mode support

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build
npm run build        # Production build
npm run build:dev    # Development build

# Quality
npm run lint         # ESLint code quality check

# Preview
npm run preview      # Preview production build locally
```

### Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting (recommended)

### Adding New Cards

1. Open `src/assets/cards.ts`
2. Add new card object following the `Card` type
3. Include NASA data source and educational content
4. Define impact values for both choices
5. Test in-game to ensure balance

Example:
```typescript
{
  id: 'card-XXX',
  title: 'Your Card Title',
  description: 'NASA data context',
  dataSource: 'NASA_MISSION',
  question: 'What will you do?',
  options: [
    {
      id: 'opt-XXX-left',
      label: 'Choice A',
      resultText: 'Result of Choice A'
    },
    {
      id: 'opt-XXX-right',
      label: 'Choice B',
      resultText: 'Result of Choice B'
    }
  ],
  impacts: {
    left: { economy: 0, sustainability: 0, technology: 0, people: 0 },
    right: { economy: 0, sustainability: 0, technology: 0, people: 0 }
  },
  education: 'Educational content about the NASA mission',
  metadata: {
    probability: 0.5,
    region: 'Global'
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Add New Cards** - Create more NASA data-based scenarios
2. **Improve Balance** - Suggest pillar impact adjustments
3. **Translations** - Add new languages
4. **Bug Reports** - Report issues on GitHub
5. **Feature Requests** - Suggest new gameplay mechanics
6. **Documentation** - Improve README and code comments

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code structure
- Add JSDoc comments for complex functions
- Write meaningful commit messages
- Test your changes before submitting

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Credits

### Development Team
- **Concept**: Nishida's Vision (Reigns + Beecarbonize mechanics)
- **Implementation**: Angelus Novus Team
- **NASA Data**: Earth Observation Missions

### Inspirations
- **Reigns** (Devolver Digital) - Swipe-based decision mechanics
- **Beecarbonize** - Environmental impact gameplay
- **Papers, Please** - Moral dilemma systems

### NASA Missions
- **SMAP** - Soil Moisture Active Passive
- **MODIS** - Terra and Aqua satellites
- **GPM** - Global Precipitation Measurement
- **Landsat** - Land observation program

### Open Source Libraries
- React, TypeScript, Vite
- Shadcn/ui, Radix UI, Tailwind CSS
- And all other amazing open source projects we depend on

---

## 📞 Support & Contact

### Having Issues?

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/VictorTeixeiraS/AngelusNovus/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/VictorTeixeiraS/AngelusNovus/discussions)
- 📖 **Documentation**: This README and code comments

### Learn More

- 🌐 **NASA Earth Observatory**: https://earthobservatory.nasa.gov/
- 🛰️ **NASA Satellites**: https://www.nasa.gov/mission_pages/satellites/
- 🌍 **Earth Overshoot Day**: https://www.overshootday.org/

---

## 🌟 Acknowledgments

Special thanks to:
- NASA for providing free, open Earth observation data
- The open source community for amazing tools and libraries
- All contributors who help improve this project
- Players who care about sustainable futures

---

<div align="center">

**Made with ❤️ for a sustainable future**

[⬆ Back to Top](#-farm-navigators---angelus-novus)

</div>
