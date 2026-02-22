import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import Decoration from "../../imports/Decoration";
import MdiTeaOutline from "../../imports/MdiTeaOutline";
import MaterialSymbolsCoffeeOutline from "../../imports/MaterialSymbolsCoffeeOutline";
import MaterialSymbolsGlassCupOutlineRounded from "../../imports/MaterialSymbolsGlassCupOutlineRounded";
import { getDrinkValues, saveDrinkValues, DrinkValues } from "../utils/storage";

function SettingItem({
  icon: Icon,
  label,
  unit,
  value,
  onChange,
}: {
  icon: React.ComponentType;
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="bg-white rounded-[8px] p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-[25px] h-[25px]">
          <Icon />
        </div>
        <div>
          <p className="font-['Georgia:Regular',sans-serif] text-[16px] text-black">
            {label}
          </p>
          <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f]">
            per {unit}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(50, value - 50))}
          className="w-8 h-8 text-[#1275A7] text-xl flex items-center justify-center active:scale-95 transition-transform bg-transparent border-0"
        >
          −
        </button>
        <div className="min-w-[80px] text-center">
          <p className="font-['Georgia:Bold',sans-serif] text-[20px] text-black">
            {value}
          </p>
          <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f]">
            ml
          </p>
        </div>
        <button
          onClick={() => onChange(Math.min(1000, value + 50))}
          className="w-8 h-8 text-[#1275A7] text-xl flex items-center justify-center active:scale-95 transition-transform bg-transparent border-0"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const [values, setValues] = useState<DrinkValues>(getDrinkValues());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValues(getDrinkValues());
  }, []);

  const handleChange = (type: keyof DrinkValues, newValue: number) => {
    const newValues = { ...values, [type]: newValue };
    setValues(newValues);
    saveDrinkValues(newValues);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white relative w-[393px] min-h-screen mx-auto pb-[100px] overflow-hidden">
      {/* Decoration Background */}
      <div className="absolute left-[80px] top-[30px] w-[400px] h-[390px] pointer-events-none">
        <Decoration />
      </div>

      <div className="pt-[82px] px-[41px] relative z-10">
        <h1 className="font-['Georgia:Regular',sans-serif] text-[32px] text-black mb-2">
          Settings
        </h1>
        <p className="font-['Satoshi:Regular',sans-serif] text-[16px] text-[#8f8f8f] mb-8">
          Customize drink volumes
        </p>

        <div className="space-y-4">
          <SettingItem
            icon={MdiTeaOutline}
            label="Tea"
            unit="cup"
            value={values.tea}
            onChange={(val) => handleChange("tea", val)}
          />
          <SettingItem
            icon={MaterialSymbolsCoffeeOutline}
            label="Coffee"
            unit="cup"
            value={values.coffee}
            onChange={(val) => handleChange("coffee", val)}
          />
          <SettingItem
            icon={MaterialSymbolsGlassCupOutlineRounded}
            label="Water"
            unit="glass"
            value={values.water}
            onChange={(val) => handleChange("water", val)}
          />
        </div>

        {saved && (
          <div className="mt-6 bg-[rgba(18,117,167,0.12)] border-2 border-[#1275A7] rounded-[4px] p-4 text-center">
            <p className="font-['Satoshi:Regular',sans-serif] text-[14px] text-[#1275A7]">
              ✓ Settings saved successfully
            </p>
          </div>
        )}

        <div className="mt-8 bg-[#f5f5f5] rounded-[8px] p-4">
          <p className="font-['Satoshi:Regular',sans-serif] text-[14px] text-[#8f8f8f]">
            💡 <strong>Tip:</strong> The standard serving sizes are 250ml for tea/coffee and 350ml for water, but you can adjust these based on your actual cup and glass sizes.
          </p>
        </div>
      </div>

      <BottomNav activePage="settings" />
    </div>
  );
}