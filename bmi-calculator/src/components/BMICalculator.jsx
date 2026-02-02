import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, RefreshCw, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BMICalculator = ({ onCalculate }) => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();
        setError('');

        if (!age || !feet || !inches || !weight) {
            setError('Please fill in all fields');
            return;
        }

        // Height: Feet/Inches to Meters
        // 1 foot = 12 inches
        // 1 inch = 0.0254 meters
        const totalInches = (parseFloat(feet) * 12) + parseFloat(inches);
        const heightInMeters = totalInches * 0.0254;
        
        // Weight is already in KG
        const weightInKg = parseFloat(weight);

        if (heightInMeters <= 0 || weightInKg <= 0) {
            setError('Please enter valid positive numbers');
            return;
        }

        const bmi = weightInKg / (heightInMeters * heightInMeters);
        
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        const resultData = {
            bmi: bmi.toFixed(2),
            category,
            weight: weightInKg,
            height: `${feet}'${inches}"`,
            gender,
            age,
            date: new Date().toLocaleDateString()
        };

        onCalculate(resultData);
    };

    const resetForm = () => {
        setAge('');
        setFeet('');
        setInches('');
        setWeight('');
        setError('');
        setGender('male');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col"
        >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Calculator className="w-6 h-6" />
                    BMI Calculator
                </h2>
                <p className="text-blue-100 text-sm mt-1">Check your body mass index</p>
            </div>

            <form onSubmit={calculateBMI} className="p-6 space-y-4">
                {/* Gender */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setGender('male')}
                            className={cn(
                                "py-2 rounded-lg border-2 transition-all font-medium",
                                gender === 'male' 
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-gray-600"
                            )}
                        >
                            Male
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('female')}
                            className={cn(
                                "py-2 rounded-lg border-2 transition-all font-medium",
                                gender === 'female' 
                                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                                    : "border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600"
                            )}
                        >
                            Female
                        </button>
                    </div>
                </div>

                {/* Age */}
                <div className="space-y-1">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Height */}
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height</label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Feet"
                            value={feet}
                            onChange={(e) => setFeet(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <input
                            type="number"
                            placeholder="Inches"
                            value={inches}
                            onChange={(e) => setInches(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Weight */}
                <div className="space-y-1">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (KG)</label>
                    <input
                        id="weight"
                        type="number"
                        placeholder="Enter Weight in KGs"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {error && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="p-3 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <RefreshCw className="w-6 h-6" />
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        Calculate BMI <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default BMICalculator;
