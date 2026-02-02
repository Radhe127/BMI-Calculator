# 🥗 BMI Calculator - Health Dashboard

A modern, vibrant, and fully responsive Body Mass Index (BMI) calculator built with **React 19** and **Tailwind CSS v4**. This application features a split-screen dashboard layout, dark mode support, history tracking, and smooth animations using Framer Motion.

## ✨ Features

- **🎨 Modern Dashboard Layout**: A split-screen design separating the calculator form from the history log.
- **🌗 Dark/Light Mode**: Fully integrated theme switcher with persistence.
- **📏 Flexible Inputs**: Enter height in Feet/Inches (Imperial) for ease of use.
- **🖥️ Result Modal**: Beautiful pop-up modal displaying your BMI score, category, and health tips with a glassmorphism backdrop.
- **📜 History Tracking**: Automatically saves your recent calculations to LocalStorage.
- **🗑️ History Management**: Option to clear all history records.
- **⚡ Fast & Responsive**: Powered by Vite 7 for instant feedback and mobile responsiveness.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Persistence**: LocalStorage API

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Radhe127/BMI-Calculator.git
    cd BMI-Calculator/bmi-calculator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

## 📂 Project Structure

```
bmi-calculator/
├── src/
│   ├── components/
│   │   ├── BMICalculator.jsx  # Main form logic (Feet/Inches input)
│   │   ├── HistoryList.jsx    # Right-side history panel with animations
│   │   └── ResultModal.jsx    # Pop-up overlay for results
│   ├── App.jsx                # Layout grid and state management
│   └── index.css              # Tailwind v4 imports and custom styles
├── public/
├── package.json
└── vite.config.js
```

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Important**: Set `bmi-calculator` as the **Root Directory** in the Vercel project settings.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [Radhe127](https://github.com/Radhe127)
