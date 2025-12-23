# ProjNavigator: Your Guided Academic Project Builder

## 🚀 Overview
ProjNavigator is an interactive, mentor-guided platform that helps engineering students systematically discover real-world problems, design structured solutions, and build meaningful projects with clear roadmaps, integrated tools, and confidence-building presentation training.

Unlike generic AI idea generators, ProjNavigator focuses on problem-first thinking, incremental development, and practical understanding.

> **Note:** The current version operates in a **Frontend-Only Demo Mode**. It uses robust mock data to simulate AI generation, database interactions, and authentication. This allows you to explore the full user journey—from onboarding to project roadmap creation—without needing to configure a backend server or MySQL database.

## 🎯 Core Features

### 1. Problem Discovery Engine
- **Real-World Problem Bank**: Curated list of unsolved/under-solved problems.
- **Problem–Solution Fit Quiz**: Aligns student interests/skills with meaningful problems.
- **Trend Analysis**: Insights into overdone vs. underexplored domains.

### 2. Structured Project Builder
- **Roadmap Generator**: Breaks down projects into Planning, Development, Testing, and Documentation phases.
- **Gantt Chart & Progress Tracker**: Visual timeline to manage deadlines.

### 3. AI-Assisted, Not AI-Dependent
- **Code Structuring Assistant**: Teaches code organization (modular design, APIs, DB schema).
- **"Explain This Code" Tool**: Helps understand AI-generated snippets.
- **Error Resolution Guide**: Contextual help for integration bugs.

### 4. Mentor Connect
- **Micro-Mentorship Sessions**: Scheduled calls with industry pros.
- **Peer Review Circles**: Group feedback sessions.

### 5. Practical Impact Dashboard
- **"Why It Matters" Builder**: Helps articulate real-world value.
- **Interview Prep Module**: Simulated viva and questions.

### 6. Viva-Ready ie Edge Cases checking
- **Edge Case Analysis**: Ensures the solution handles edge cases effectively, preparing students for deep technical questions during reviews.

## 🛠️ Tech Stack

- **Frontend**: React + TailwindCSS (Vite)
- **Backend**: Node.js + Express (Optional for Demo)
- **Database**: MySQL (Optional for Demo)
- **AI Integration**: GPT-4 API (Simulated in Demo)

## 📦 Project Structure

- `client/`: Frontend React application. Contains all UI logic and `src/data/mockData.js`.
- `server/`: Backend Node.js Express application (Foundation for future full-stack integration).

## 🚀 Getting Started

### Quick Start (Frontend Demo)
To run the interactive demo immediately:

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Full Stack Configuration (For Future Development)
If you wish to enable the backend and database integration:

1. **Backend Setup**
   ```bash
   cd server
   npm install
   # Configure .env with your MySQL credentials
   # Run database initialization
   npm start
   ```

2. **Frontend Connection**
   Currently, the frontend is configured to prioritize mock data for stability. To connect to the real backend, source code modifications in `App.jsx` and API services would be required to switch off the mock mode.

## 📄 License
[MIT](LICENSE)
