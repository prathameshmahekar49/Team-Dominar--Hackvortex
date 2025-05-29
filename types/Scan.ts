export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  saturatedFat: number;
  salt: number;
}

export interface Ingredient {
  name: string;
  description?: string;
  isAdditive: boolean;
}

export interface Additive {
  name: string;
  code?: string;
  riskLevel: 'No Risk' | 'Good' | 'Risky' | 'Hazardous';
  purpose?: string;
  description?: string;
  potentialEffects?: string;
}

export interface Scan {
  id: string;
  productName: string;
  brand: string;
  weight: string;
  scanDate: string;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  additives: Additive[];
  positives: string[];
  negatives: string[];
  cautions: string[];
  fullIngredientsList: string;
}