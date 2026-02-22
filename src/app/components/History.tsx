import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import Decoration from "../../imports/Decoration";
import { getMonthlyData, DAILY_GOAL, DayData } from "../utils/storage";
import MdiTeaOutline from "../../imports/MdiTeaOutline";
import MaterialSymbolsCoffeeOutline from "../../imports/MaterialSymbolsCoffeeOutline";
import MaterialSymbolsGlassCupOutlineRounded from "../../imports/MaterialSymbolsGlassCupOutlineRounded";

function DayCard({ data }: { data: DayData }) {
  const date = new Date(data.date);
  const isToday = data.date === new Date().toISOString().split("T")[0];
  const percentage = Math.min(100, Math.round((data.totalMl / DAILY_GOAL) * 100));

  // Count drinks by type
  const drinkCounts = data.drinks.reduce(
    (acc, drink) => {
      acc[drink.type] = (acc[drink.type] || 0) + drink.amount;
      return acc;
    },
    { tea: 0, coffee: 0, water: 0 }
  );

  const formatDate = () => {
    if (isToday) return "Today";
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "short", 
      month: "short", 
      day: "numeric" 
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getStatusColor = () => {
    if (percentage >= 100) return "#1275A7";
    if (percentage >= 75) return "#52a8d8";
    if (percentage >= 50) return "#8fc4e8";
    return "#d9d9d9";
  };

  return (
    <div className="bg-white border border-[#d9d9d9] rounded-[8px] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-['Georgia:Regular',sans-serif] text-[18px] text-black">
            {formatDate()}
          </h3>
          <p className={`font-['Satoshi:Regular',sans-serif] text-[12px] ${isToday ? 'text-[#4a4a4a]' : 'text-[#8f8f8f]'}`}>
            {data.totalMl}ml / {DAILY_GOAL}ml
          </p>
        </div>
        <div className="text-right">
          <p
            className="font-['Georgia:Bold',sans-serif] text-[24px]"
            style={{ color: getStatusColor() }}
          >
            {percentage}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#f5f5f5] rounded-full overflow-hidden mb-3">
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: getStatusColor(),
          }}
        />
      </div>

      {/* Drink breakdown */}
      <div className="flex gap-4">
        {drinkCounts.tea > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[16px]">
              <MdiTeaOutline />
            </div>
            <span className={`font-['Satoshi:Regular',sans-serif] text-[12px] ${isToday ? 'text-[#4a4a4a]' : 'text-[#8f8f8f]'}`}>
              {drinkCounts.tea}
            </span>
          </div>
        )}
        {drinkCounts.coffee > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[16px]">
              <MaterialSymbolsCoffeeOutline />
            </div>
            <span className={`font-['Satoshi:Regular',sans-serif] text-[12px] ${isToday ? 'text-[#4a4a4a]' : 'text-[#8f8f8f]'}`}>
              {drinkCounts.coffee}
            </span>
          </div>
        )}
        {drinkCounts.water > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[16px]">
              <MaterialSymbolsGlassCupOutlineRounded />
            </div>
            <span className={`font-['Satoshi:Regular',sans-serif] text-[12px] ${isToday ? 'text-[#4a4a4a]' : 'text-[#8f8f8f]'}`}>
              {drinkCounts.water}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function History() {
  const [monthlyData, setMonthlyData] = useState<DayData[]>([]);

  useEffect(() => {
    setMonthlyData(getMonthlyData());
  }, []);

  // Calculate average
  const avgHydration = monthlyData.length > 0
    ? Math.round(
        monthlyData.reduce((sum, day) => sum + day.totalMl, 0) / monthlyData.length
      )
    : 0;

  const avgPercentage = Math.round((avgHydration / DAILY_GOAL) * 100);

  // Count days that met goal
  const daysMetGoal = monthlyData.filter((day) => day.totalMl >= DAILY_GOAL).length;

  return (
    <div className="bg-white relative w-[393px] min-h-screen mx-auto pb-[100px] overflow-hidden">
      {/* Decoration Background */}
      <div className="absolute left-[80px] top-[30px] w-[400px] h-[390px] pointer-events-none">
        <Decoration />
      </div>

      <div className="pt-[82px] px-[41px] relative z-10">
        <h1 className="font-['Georgia:Regular',sans-serif] text-[32px] text-black mb-2">
          History
        </h1>
        <p className="font-['Satoshi:Regular',sans-serif] text-[16px] text-[#8f8f8f] mb-6">
          Your hydration over the past month
        </p>

        {monthlyData.length > 0 ? (
          <>
            {/* Stats Summary */}
            <div className="bg-[rgba(18,117,167,0.08)] border border-[#1275A7] rounded-[8px] p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f] mb-1">
                    Daily Average
                  </p>
                  <p className="font-['Georgia:Bold',sans-serif] text-[20px] text-[#1275A7]">
                    {avgPercentage}%
                  </p>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f]">
                    {avgHydration}ml
                  </p>
                </div>
                <div>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f] mb-1">
                    Goal Achieved
                  </p>
                  <p className="font-['Georgia:Bold',sans-serif] text-[20px] text-[#1275A7]">
                    {daysMetGoal}
                  </p>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[12px] text-[#8f8f8f]">
                    out of {monthlyData.length} days
                  </p>
                </div>
              </div>
            </div>

            {/* Daily history */}
            <div className="space-y-3">
              {monthlyData.map((data) => (
                <DayCard key={data.date} data={data} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="font-['Georgia:Regular',sans-serif] text-[24px] text-[#8f8f8f] mb-2">
              No history yet
            </p>
            <p className="font-['Satoshi:Regular',sans-serif] text-[14px] text-[#8f8f8f]">
              Start tracking your drinks to see your hydration history here!
            </p>
          </div>
        )}
      </div>

      <BottomNav activePage="history" />
    </div>
  );
}