import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Dop0 from "../../imports/Dop0";
import Drop20 from "../../imports/Drop20";
import Drop50 from "../../imports/Drop50";
import Drop85 from "../../imports/Drop85";
import Drop100 from "../../imports/Drop100";
import Decoration from "../../imports/Decoration";
import svgPaths from "../../imports/svg-0rjc0zdhno";
import MdiTeaOutline from "../../imports/MdiTeaOutline";
import MaterialSymbolsCoffeeOutline from "../../imports/MaterialSymbolsCoffeeOutline";
import MaterialSymbolsGlassCupOutlineRounded from "../../imports/MaterialSymbolsGlassCupOutlineRounded";
import { DrinkDialog } from "./DrinkDialog";
import { BottomNav } from "./BottomNav";
import { getTodayDrinks, addDrink, calculateTotalMl, DAILY_GOAL } from "../utils/storage";

function DrinkCard({ type, count }: { type: "tea" | "coffee" | "water"; count: number }) {
  const icons = {
    tea: MdiTeaOutline,
    coffee: MaterialSymbolsCoffeeOutline,
    water: MaterialSymbolsGlassCupOutlineRounded,
  };

  const labels = {
    tea: "Tea",
    coffee: "Coffee",
    water: "Water",
  };

  const units = {
    tea: "cup",
    coffee: "cup",
    water: "glass",
  };

  const IconComponent = icons[type];

  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
        <div className="bg-white border border-[#d9d9d9] border-solid col-1 h-[71px] ml-0 mt-0 rounded-[8px] row-1 w-[129px]" />
        <p className="col-1 font-['Georgia:Regular',sans-serif] leading-[normal] ml-[19.85px] mt-[11px] not-italic relative row-1 text-[#8f8f8f] text-[12px] whitespace-pre-wrap">
          {labels[type]}
        </p>
        <p className="col-1 font-['Satoshi:Regular',sans-serif] leading-[normal] ml-[19.85px] mt-[31px] not-italic relative row-1 text-[16px] text-black whitespace-pre-wrap">
          {count} {units[type]}{count !== 1 ? "s" : ""}
        </p>
        <div className="col-1 ml-[88.84px] mt-[29.4px] relative row-1 size-[25.201px]">
          <IconComponent />
        </div>
      </div>
    </div>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
        <div className="bg-white col-1 h-[71px] ml-0 mt-0 rounded-[8px] row-1 w-[129px]" />
      </div>
      <button
        onClick={onClick}
        className="col-1 ml-[37px] mt-[-2px] relative row-1 size-[56px] cursor-pointer bg-transparent border-0 p-0"
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
          <g id="Group 12">
            <circle cx="28" cy="28" id="Ellipse 1" r="27" stroke="var(--stroke-0, #1275A7)" strokeWidth="2" />
            <g id="material-symbols:add">
              <path d={svgPaths.p113d5b80} fill="var(--fill-0, #1275A7)" id="Vector" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

function getDropComponent(percentage: number) {
  if (percentage >= 100) return Drop100;
  if (percentage >= 75) return Drop85;
  if (percentage >= 40) return Drop50;
  if (percentage >= 10) return Drop20;
  return Dop0;
}

function getMotivationalText(percentage: number) {
  if (percentage >= 100) return "Perfect! Goal achieved!";
  if (percentage >= 75) return "Almost there!";
  if (percentage >= 50) return "Great progress!";
  if (percentage >= 25) return "Keep going!";
  return "Let's start hydrating!";
}

export default function Home() {
  const [drinks, setDrinks] = useState(getTodayDrinks());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Refresh drinks when component mounts or dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setDrinks(getTodayDrinks());
    }
  }, [isDialogOpen]);

  // Calculate totals by drink type
  const drinkCounts = drinks.reduce(
    (acc, drink) => {
      acc[drink.type] = (acc[drink.type] || 0) + drink.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate total hydration in ml
  const totalHydration = calculateTotalMl(drinks);

  // Calculate percentage
  const percentage = Math.min(100, Math.round((totalHydration / DAILY_GOAL) * 100));

  const handleAddDrink = (type: "tea" | "coffee" | "water", amount: number) => {
    addDrink(type, amount);
    setDrinks(getTodayDrinks());
  };

  const DropComponent = getDropComponent(percentage);

  return (
    <div className="bg-white relative w-[393px] h-[852px] mx-auto overflow-hidden" data-name="hydration-tracker">
      {/* Decoration Background */}
      <div className="absolute left-[80px] top-[30px] w-[400px] h-[390px] pointer-events-none">
        <Decoration />
      </div>

      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[normal] left-[41px] not-italic text-[32px] text-black top-[82px] z-10">
        Hydration Level
      </p>
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[normal] left-[41px] not-italic text-[16px] text-black top-[118px] z-10">
        {getMotivationalText(percentage)}
      </p>

      {/* Animated Drop */}
      <div className="absolute left-[calc(20%+3.4px)] top-[212px] w-[230px] h-[316px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={percentage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <DropComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Drink Cards */}
      <div className="absolute content-start flex flex-wrap gap-[16px_54px] items-start justify-center leading-[0] left-0 px-[24px] py-[16px] top-[585px] w-[393px] z-10">
        <DrinkCard type="tea" count={drinkCounts.tea || 0} />
        <DrinkCard type="coffee" count={drinkCounts.coffee || 0} />
        <DrinkCard type="water" count={drinkCounts.water || 0} />
        <AddButton onClick={() => setIsDialogOpen(true)} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav activePage="home" />

      {/* Add Drink Dialog */}
      <DrinkDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddDrink={handleAddDrink}
      />
    </div>
  );
}