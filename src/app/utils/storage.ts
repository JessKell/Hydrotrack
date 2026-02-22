export interface Drink {
  type: "tea" | "coffee" | "water";
  amount: number;
  timestamp: number;
}

export interface DrinkValues {
  tea: number;
  coffee: number;
  water: number;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  drinks: Drink[];
  totalMl: number;
}

const STORAGE_KEYS = {
  DRINKS: "hydration_drinks",
  SETTINGS: "hydration_settings",
};

export const DEFAULT_DRINK_VALUES: DrinkValues = {
  tea: 250,
  coffee: 250,
  water: 350,
};

export const DAILY_GOAL = 2000; // 2000ml daily goal

// Get drink values from settings
export function getDrinkValues(): DrinkValues {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_DRINK_VALUES;
    }
  }
  return DEFAULT_DRINK_VALUES;
}

// Save drink values to settings
export function saveDrinkValues(values: DrinkValues): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(values));
}

// Get all drinks
export function getAllDrinks(): Drink[] {
  const stored = localStorage.getItem(STORAGE_KEYS.DRINKS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save all drinks
export function saveAllDrinks(drinks: Drink[]): void {
  localStorage.setItem(STORAGE_KEYS.DRINKS, JSON.stringify(drinks));
}

// Add a new drink
export function addDrink(type: "tea" | "coffee" | "water", amount: number): void {
  const drinks = getAllDrinks();
  drinks.push({
    type,
    amount,
    timestamp: Date.now(),
  });
  saveAllDrinks(drinks);
}

// Get drinks for today
export function getTodayDrinks(): Drink[] {
  const drinks = getAllDrinks();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  return drinks.filter((drink) => drink.timestamp >= todayTimestamp);
}

// Get drinks grouped by day for the past month
export function getMonthlyData(): DayData[] {
  const drinks = getAllDrinks();
  const drinkValues = getDrinkValues();
  const dayMap = new Map<string, Drink[]>();
  
  // Get date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);
  
  // Group drinks by day
  drinks.forEach((drink) => {
    if (drink.timestamp >= thirtyDaysAgo.getTime()) {
      const date = new Date(drink.timestamp);
      const dateKey = date.toISOString().split("T")[0];
      
      if (!dayMap.has(dateKey)) {
        dayMap.set(dateKey, []);
      }
      dayMap.get(dateKey)!.push(drink);
    }
  });
  
  // Convert to array and calculate totals
  const result: DayData[] = [];
  dayMap.forEach((drinks, date) => {
    const totalMl = drinks.reduce((total, drink) => {
      return total + drinkValues[drink.type] * drink.amount;
    }, 0);
    
    result.push({
      date,
      drinks,
      totalMl,
    });
  });
  
  // Sort by date descending
  result.sort((a, b) => b.date.localeCompare(a.date));
  
  return result;
}

// Calculate total ml for drinks
export function calculateTotalMl(drinks: Drink[]): number {
  const drinkValues = getDrinkValues();
  return drinks.reduce((total, drink) => {
    return total + drinkValues[drink.type] * drink.amount;
  }, 0);
}
