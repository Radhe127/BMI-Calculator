import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';

const HistoryList = ({ history, onClear }) => {
    if (history.length === 0) {
        return (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-8">
                <History className="w-12 h-12 mb-3 opacity-20" />
                <p>No history yet</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 custom-scrollbar relative">
             <div className="absolute top-4 right-4 z-10">
                <button 
                    onClick={onClear}
                    title="Clear History"
                    className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-full transition-colors"
                >
                    <Trash2 className="w-3 h-3" /> Clear All
                </button>
            </div>

            <div className="p-4 space-y-0 divide-y divide-gray-100 dark:divide-gray-700/50">
                <AnimatePresence initial={false}>
                    {history.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                                        ${item.category === 'Normal' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                          item.category === 'Underweight' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                          'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}
                                     `}>
                                         {item.bmi}
                                     </div>
                                     <div>
                                         <div className="font-medium text-gray-900 dark:text-gray-100">{item.category}</div>
                                         <div className="text-xs text-gray-500 flex gap-2">
                                             <span>{item.date}</span>
                                             <span>•</span>
                                             <span>{item.gender}</span>
                                         </div>
                                     </div>
                                </div>
                                <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                                    <div>{item.height}</div>
                                    <div>{item.weight} kg</div>
                                </div>
                            </div>
                        </motion.div>
                ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HistoryList;
