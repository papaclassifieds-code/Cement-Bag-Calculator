export type IndianUnit = 'feet' | 'meter';

export type IndianWorkType = 'slab' | 'brickwork' | 'plaster' | 'column' | 'flooring';

export type ConcreteGrade = 'M20' | 'M15' | 'M25' | 'M10';

export type MortarRatio = '1:4' | '1:5' | '1:6' | '1:3';

export type WallThickness = '9inch' | '4.5inch';

export type PlasterThickness = '12mm' | '15mm' | '20mm';

export interface IndianRates {
  cementPerBag: number;    // e.g. 380 (₹ per 50kg bag)
  sandPerCft: number;      // e.g. 55 (₹ per cft)
  aggregatePerCft: number; // e.g. 48 (₹ per cft)
  brickPerUnit: number;    // e.g. 9 (₹ per brick)
}

export interface IndianCalculationResult {
  title: string;
  subtitle: string;
  dimensionsSummary: string;
  
  // Area and Volume
  areaSqFt: number;
  areaSqM: number;
  wetVolumeCft: number;
  wetVolumeM3: number;
  
  // Cement
  cementBags: number;      // 50kg bags
  cementBagsExact: number;
  cementWeightKg: number;
  
  // Sand (रेती / बालू)
  sandCft: number;
  sandBrass: number;       // 1 Brass = 100 CFT
  sandTrolleys: number;    // ~100 CFT per tractor trolley
  
  // Aggregate (गिट्टी / कंक्रीट)
  aggregateCft: number;
  aggregateBrass: number;
  aggregateTrolleys: number;
  
  // Bricks (ईंट)
  brickCount?: number;
  
  // Water (पानी)
  waterLiters: number;
  waterBuckets: number;    // ~20 Liters bucket
  
  // Total Cost Estimate
  cementCost: number;
  sandCost: number;
  aggregateCost: number;
  brickCost: number;
  totalCost: number;
}
