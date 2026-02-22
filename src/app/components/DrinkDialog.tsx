import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MdiTeaOutline from "../../imports/MdiTeaOutline";
import MaterialSymbolsCoffeeOutline from "../../imports/MaterialSymbolsCoffeeOutline";
import MaterialSymbolsGlassCupOutlineRounded from "../../imports/MaterialSymbolsGlassCupOutlineRounded";

interface DrinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDrink: (type: "tea" | "coffee" | "water", amount: number) => void;
}

export function DrinkDialog({ isOpen, onClose, onAddDrink }: DrinkDialogProps) {
  const [selectedType, setSelectedType] = useState<"tea" | "coffee" | "water" | null>(null);
  const [amount, setAmount] = useState(1);

  const handleSubmit = () => {
    if (selectedType) {
      onAddDrink(selectedType, amount);
      setSelectedType(null);
      setAmount(1);
      onClose();
    }
  };

  const drinkOptions = [
    { type: "tea" as const, label: "Tea", unit: "cup", icon: MdiTeaOutline },
    { type: "coffee" as const, label: "Coffee", unit: "cup", icon: MaterialSymbolsCoffeeOutline },
    { type: "water" as const, label: "Water", unit: "glass", icon: MaterialSymbolsGlassCupOutlineRounded },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 z-50 max-w-[393px] mx-auto"
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            
            <h2 className="font-['Georgia:Regular',sans-serif] text-[24px] text-black mb-2">
              Add a Drink
            </h2>
            <p className="font-['Satoshi:Regular',sans-serif] text-[14px] text-[#8f8f8f] mb-6">
              Select what you drank
            </p>

            {/* Drink Type Selection */}
            <div className="space-y-3 mb-6">
              {drinkOptions.map((drink) => {
                const IconComponent = drink.icon;
                return (
                  <button
                    key={drink.type}
                    onClick={() => setSelectedType(drink.type)}
                    className={`w-full flex items-center justify-between p-4 rounded-[4px] border-2 transition-all ${
                      selectedType === drink.type
                        ? "border-[#1275A7] bg-[rgba(18,117,167,0.08)]"
                        : "border-[#d9d9d9] bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[25px] h-[25px]">
                        <IconComponent />
                      </div>
                      <span className="font-['Satoshi:Regular',sans-serif] text-[16px] text-black">
                        {drink.label}
                      </span>
                    </div>
                    {selectedType === drink.type && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#1275A7] flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeWidth={2}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Amount Selection */}
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6"
              >
                <p className="font-['Satoshi:Regular',sans-serif] text-[14px] text-[#8f8f8f] mb-3">
                  How many {drinkOptions.find((d) => d.type === selectedType)?.unit}s?
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                    className="w-12 h-12 text-[#1275A7] text-2xl flex items-center justify-center active:scale-95 transition-transform bg-transparent border-0"
                  >
                    −
                  </button>
                  <span className="font-['Georgia:Bold',sans-serif] text-[32px] text-black min-w-[60px] text-center">
                    {amount}
                  </span>
                  <button
                    onClick={() => setAmount(amount + 1)}
                    className="w-12 h-12 text-[#1275A7] text-2xl flex items-center justify-center active:scale-95 transition-transform bg-transparent border-0"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-[4px] border-2 border-[#1275A7] font-['Satoshi:Regular',sans-serif] text-[16px] text-[#1275A7] active:scale-95 transition-transform bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedType}
                className={`flex-1 py-3 rounded-[4px] font-['Satoshi:Regular',sans-serif] text-[16px] text-white active:scale-95 transition-transform ${
                  selectedType
                    ? "bg-[#1275A7]"
                    : "bg-[#d9d9d9] cursor-not-allowed"
                }`}
              >
                Add Drink
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}