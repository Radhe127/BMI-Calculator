import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Activity } from 'lucide-react';
import BMICalculator from './components/BMICalculator';
import HistoryList from './components/HistoryList';
import ResultModal from './components/ResultModal';
import './App.css'; // This might be empty or standard, but we use Tailwind mostly.

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Theme & History
  useEffect(() => {
    // Theme
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    // History
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Use useEffect to update root element class on theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleCalculate = (data) => {
    setCurrentResult(data);
    setIsModalOpen(true);
    const newHistory = [data, ...history].slice(0, 10); // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmiHistory');
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 pb-12">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        BMI Tracker
                    </h1>
                </div>
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>

        <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl h-[calc(100vh-100px)]">
            {/* Left Column: Calculator */}
            <div className="w-full h-full flex flex-col justify-center">
                 <BMICalculator onCalculate={handleCalculate} />
            </div>

            {/* Right Column: History */}
            <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                             <Activity className="w-5 h-5 text-blue-500" />
                             Calculation History
                        </h2>
                    </div>
                    <HistoryList history={history} onClear={clearHistory} />
                </div>
            </div>
        </main>

        <ResultModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            result={currentResult} 
        />
    </div>
  );
}

export default App;
