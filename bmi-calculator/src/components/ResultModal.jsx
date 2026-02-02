import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity } from 'lucide-react';

const ResultModal = ({ isOpen, onClose, result }) => {
    if (!result) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
                                <h2 className="text-3xl font-bold mb-2">BMI Result</h2>
                                <p className="opacity-90">Here is your health analysis</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="text-center">
                                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Your BMI Score
                                    </div>
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                                        {result.bmi}
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-lg font-bold ${
                                        result.category === 'Underweight' ? 'bg-yellow-100 text-yellow-800' :
                                        result.category === 'Normal' ? 'bg-green-100 text-green-800' :
                                        result.category === 'Overweight' ? 'bg-orange-100 text-orange-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {result.category}
                                    </span>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Height</div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{result.height}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight</div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{result.weight} kg</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Age</div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{result.age}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                        <Activity className="w-5 h-5 text-blue-500" />
                                        Health Recommendation
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {result.category === 'Normal' 
                                            ? "Great job! You have a healthy body weight. Maintain a balanced diet and regular exercise."
                                            : result.category === 'Underweight'
                                            ? "You are underweight. Consider consulting a nutritionist to gain weight in a healthy way."
                                            : "You are above the ideal weight range. A balanced diet and regular physical activity can help you reach a healthy weight."}
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResultModal;
