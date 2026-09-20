import {
  IndianCalculationResult,
  IndianRates,
  IndianUnit,
  ConcreteGrade,
  MortarRatio,
  WallThickness,
  PlasterThickness,
} from '../types';

export const DEFAULT_INDIAN_RATES: IndianRates = {
  cementPerBag: 380, // Average ₹380 per 50kg bag (UltraTech, Ambuja, ACC, Shree)
  sandPerCft: 55,    // Average ₹55 per CFT
  aggregatePerCft: 48, // Average ₹48 per CFT
  brickPerUnit: 9,   // Average ₹9 per 1st-class red brick
};

// Conversions
export const M_TO_FT = 3.28084;
export const FT_TO_M = 0.3048;
export const M3_TO_CFT = 35.3147;
export const CFT_TO_M3 = 0.0283168;
export const CEMENT_BAG_VOL_CFT = 1.226; // 50kg bag = 1.226 CFT
export const CEMENT_BAG_VOL_M3 = 0.0347; // 50kg bag = 0.0347 m3

/**
 * 1. Calculate Roof Slab / Chhat Dhalai (Concrete)
 */
export function calculateSlab({
  length,
  width,
  thicknessInches,
  thicknessCm,
  grade,
  unit,
  rates,
}: {
  length: number;
  width: number;
  thicknessInches: number;
  thicknessCm: number;
  grade: ConcreteGrade;
  unit: IndianUnit;
  rates: IndianRates;
}): IndianCalculationResult {
  let wetVolumeCft = 0;
  let areaSqFt = 0;

  if (unit === 'feet') {
    areaSqFt = length * width;
    const thicknessFeet = thicknessInches / 12;
    wetVolumeCft = areaSqFt * thicknessFeet;
  } else {
    // Meters
    const areaSqM = length * width;
    areaSqFt = areaSqM * 10.7639;
    const thicknessM = thicknessCm / 100;
    const wetM3 = areaSqM * thicknessM;
    wetVolumeCft = wetM3 * M3_TO_CFT;
  }

  const wetVolumeM3 = wetVolumeCft * CFT_TO_M3;
  const areaSqM = areaSqFt * 0.092903;

  // Concrete dry volume factor = 1.54 + 5% site wastage = 1.54 * 1.05 ≈ 1.60
  const dryVolumeCft = wetVolumeCft * 1.54 * 1.05;

  // Ratio parts
  let c = 1;
  let s = 1.5;
  let a = 3;
  let gradeName = 'M20 (1 : 1.5 : 3)';

  if (grade === 'M15') {
    c = 1;
    s = 2;
    a = 4;
    gradeName = 'M15 (1 : 2 : 4)';
  } else if (grade === 'M25') {
    c = 1;
    s = 1;
    a = 2;
    gradeName = 'M25 (1 : 1 : 2)';
  } else if (grade === 'M10') {
    c = 1;
    s = 3;
    a = 6;
    gradeName = 'M10 (1 : 3 : 6)';
  }

  const totalParts = c + s + a;
  const cementVolCft = (dryVolumeCft * c) / totalParts;
  const sandCft = (dryVolumeCft * s) / totalParts;
  const aggregateCft = (dryVolumeCft * a) / totalParts;

  // 1 bag = 1.226 CFT
  const cementBagsExact = cementVolCft / CEMENT_BAG_VOL_CFT;
  const cementBags = Math.ceil(cementBagsExact);
  const cementWeightKg = cementBags * 50;

  const sandBrass = sandCft / 100;
  const sandTrolleys = sandCft / 100; // 1 tractor trolley ≈ 100 CFT

  const aggregateBrass = aggregateCft / 100;
  const aggregateTrolleys = aggregateCft / 100;

  const waterLiters = cementBags * 28; // ~28 L per bag for W/C ~0.50
  const waterBuckets = Math.round(waterLiters / 20); // 20L per bucket

  // Costs
  const cementCost = cementBags * rates.cementPerBag;
  const sandCost = Math.round(sandCft * rates.sandPerCft);
  const aggregateCost = Math.round(aggregateCft * rates.aggregatePerCft);
  const brickCost = 0;
  const totalCost = cementCost + sandCost + aggregateCost;

  const dimText =
    unit === 'feet'
      ? `${length} ft × ${width} ft (${thicknessInches} inch मोटा)`
      : `${length} m × ${width} m (${thicknessCm} cm मोटा)`;

  return {
    title: 'छत ढलाई (Roof Slab)',
    subtitle: `${gradeName} कंक्रीट मिक्स`,
    dimensionsSummary: dimText,
    areaSqFt,
    areaSqM,
    wetVolumeCft,
    wetVolumeM3,
    cementBags,
    cementBagsExact,
    cementWeightKg,
    sandCft: Math.round(sandCft),
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTrolleys: Number(sandTrolleys.toFixed(1)),
    aggregateCft: Math.round(aggregateCft),
    aggregateBrass: Number(aggregateBrass.toFixed(2)),
    aggregateTrolleys: Number(aggregateTrolleys.toFixed(1)),
    waterLiters: Math.round(waterLiters),
    waterBuckets,
    cementCost,
    sandCost,
    aggregateCost,
    brickCost,
    totalCost,
  };
}

/**
 * 2. Calculate Brickwork / Deewar Chunai
 */
export function calculateBrickwork({
  wallLength,
  wallHeight,
  thickness,
  doorCount,
  windowCount,
  mortarRatio,
  unit,
  rates,
}: {
  wallLength: number;
  wallHeight: number;
  thickness: WallThickness; // '9inch' or '4.5inch'
  doorCount: number;
  windowCount: number;
  mortarRatio: MortarRatio; // '1:4', '1:5', '1:6'
  unit: IndianUnit;
  rates: IndianRates;
}): IndianCalculationResult {
  let grossAreaSqFt = 0;

  if (unit === 'feet') {
    grossAreaSqFt = wallLength * wallHeight;
  } else {
    grossAreaSqFt = wallLength * wallHeight * 10.7639;
  }

  // Deduct standard Indian openings
  // Standard Door: 3 ft x 7 ft = 21 sq.ft
  // Standard Window: 4 ft x 4 ft = 16 sq.ft
  const doorArea = doorCount * 21;
  const windowArea = windowCount * 16;
  const netAreaSqFt = Math.max(0, grossAreaSqFt - (doorArea + windowArea));

  const is9Inch = thickness === '9inch';
  const thicknessFt = is9Inch ? 9 / 12 : 4.5 / 12; // 0.75 ft or 0.375 ft
  const wetVolumeCft = netAreaSqFt * thicknessFt;
  const wetVolumeM3 = wetVolumeCft * CFT_TO_M3;
  const areaSqM = netAreaSqFt * 0.092903;

  // Bricks Calculation (Standard Indian red clay brick: 9" x 4.25" x 2.75")
  // In 100 CFT of 9" brickwork: ~1350 bricks. With 5% breakage: ~1420 bricks.
  // In 100 Sq.Ft of 4.5" brickwork: ~450 bricks. With 5% breakage: ~475 bricks.
  let brickCount = 0;
  if (is9Inch) {
    brickCount = Math.ceil((wetVolumeCft * 13.5) * 1.05); // 13.5 bricks/cft + 5% breakage
  } else {
    brickCount = Math.ceil((netAreaSqFt * 4.5) * 1.05); // 4.5 bricks/sq.ft + 5% breakage
  }

  // Mortar calculation:
  // In brickwork, mortar occupies about 25% - 30% of total wall volume.
  // Wet mortar vol = 0.28 * wetVolumeCft
  // Dry mortar factor = 1.33 + 10% wastage
  const wetMortarCft = wetVolumeCft * 0.28;
  const dryMortarCft = wetMortarCft * 1.33 * 1.10;

  // Ratio
  let c = 1;
  let s = 6;
  if (mortarRatio === '1:4') {
    c = 1;
    s = 4;
  } else if (mortarRatio === '1:5') {
    c = 1;
    s = 5;
  }

  const totalParts = c + s;
  const cementVolCft = (dryMortarCft * c) / totalParts;
  const sandCft = (dryMortarCft * s) / totalParts;

  const cementBagsExact = cementVolCft / CEMENT_BAG_VOL_CFT;
  const cementBags = Math.ceil(cementBagsExact);
  const cementWeightKg = cementBags * 50;

  const sandBrass = sandCft / 100;
  const sandTrolleys = sandCft / 100;

  const waterLiters = cementBags * 30;
  const waterBuckets = Math.round(waterLiters / 20);

  // Costs
  const cementCost = cementBags * rates.cementPerBag;
  const sandCost = Math.round(sandCft * rates.sandPerCft);
  const aggregateCost = 0; // No coarse aggregate in brick mortar
  const brickCost = brickCount * rates.brickPerUnit;
  const totalCost = cementCost + sandCost + brickCost;

  const dimText =
    unit === 'feet'
      ? `${wallLength} ft × ${wallHeight} ft (${is9Inch ? '9 इंच - 1 ईंट दीवार' : '4.5 इंच - आधा ईंट दीवार'})`
      : `${wallLength} m × ${wallHeight} m (${is9Inch ? '230 mm दीवार' : '115 mm दीवार'})`;

  return {
    title: 'दीवार चिनाई (Brickwork)',
    subtitle: `${is9Inch ? '9 इंच (पूरा ईंट)' : '4.5 इंच (पार्टीशन)'} • मसाला ${mortarRatio}`,
    dimensionsSummary: dimText,
    areaSqFt: netAreaSqFt,
    areaSqM,
    wetVolumeCft,
    wetVolumeM3,
    cementBags,
    cementBagsExact,
    cementWeightKg,
    sandCft: Math.round(sandCft),
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTrolleys: Number(sandTrolleys.toFixed(1)),
    aggregateCft: 0,
    aggregateBrass: 0,
    aggregateTrolleys: 0,
    brickCount,
    waterLiters: Math.round(waterLiters),
    waterBuckets,
    cementCost,
    sandCost,
    aggregateCost,
    brickCost,
    totalCost,
  };
}

/**
 * 3. Calculate Plaster (प्लास्टर)
 */
export function calculatePlaster({
  length,
  height,
  thickness,
  mortarRatio,
  sidesCount, // 1 for single side, 2 for both sides
  unit,
  rates,
}: {
  length: number;
  height: number;
  thickness: PlasterThickness; // '12mm' | '15mm' | '20mm'
  mortarRatio: MortarRatio; // '1:4' or '1:6'
  sidesCount: number;
  unit: IndianUnit;
  rates: IndianRates;
}): IndianCalculationResult {
  let areaSqFtSingle = 0;
  if (unit === 'feet') {
    areaSqFtSingle = length * height;
  } else {
    areaSqFtSingle = length * height * 10.7639;
  }

  const totalAreaSqFt = areaSqFtSingle * sidesCount;
  const totalAreaSqM = totalAreaSqFt * 0.092903;

  // Thickness in meters
  let thicknessMm = 12;
  if (thickness === '15mm') thicknessMm = 15;
  if (thickness === '20mm') thicknessMm = 20;

  const thicknessM = thicknessMm / 1000;
  const wetVolumeM3 = totalAreaSqM * thicknessM;
  const wetVolumeCft = wetVolumeM3 * M3_TO_CFT;

  // Dry volume for plaster: factor 1.33 + 15% joint filling and wastage = 1.33 * 1.15 ≈ 1.53
  const dryVolumeCft = wetVolumeCft * 1.33 * 1.15;

  let c = 1;
  let s = 4;
  if (mortarRatio === '1:6') {
    c = 1;
    s = 6;
  } else if (mortarRatio === '1:5') {
    c = 1;
    s = 5;
  } else if (mortarRatio === '1:3') {
    c = 1;
    s = 3;
  }

  const totalParts = c + s;
  const cementVolCft = (dryVolumeCft * c) / totalParts;
  const sandCft = (dryVolumeCft * s) / totalParts;

  const cementBagsExact = cementVolCft / CEMENT_BAG_VOL_CFT;
  const cementBags = Math.ceil(cementBagsExact);
  const cementWeightKg = cementBags * 50;

  const sandBrass = sandCft / 100;
  const sandTrolleys = sandCft / 100;

  const waterLiters = cementBags * 28;
  const waterBuckets = Math.round(waterLiters / 20);

  const cementCost = cementBags * rates.cementPerBag;
  const sandCost = Math.round(sandCft * rates.sandPerCft);
  const aggregateCost = 0;
  const brickCost = 0;
  const totalCost = cementCost + sandCost;

  const dimText =
    unit === 'feet'
      ? `${length} ft × ${height} ft (${thicknessMm}mm प्लास्टर ${sidesCount === 2 ? '• दोनों तरफ' : ''})`
      : `${length} m × ${height} m (${thicknessMm}mm प्लास्टर)`;

  return {
    title: 'प्लास्टर (Plastering)',
    subtitle: `${thicknessMm} mm मोटाई • मसाला अनुपात ${mortarRatio}`,
    dimensionsSummary: dimText,
    areaSqFt: totalAreaSqFt,
    areaSqM: totalAreaSqM,
    wetVolumeCft,
    wetVolumeM3,
    cementBags,
    cementBagsExact,
    cementWeightKg,
    sandCft: Math.round(sandCft),
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTrolleys: Number(sandTrolleys.toFixed(1)),
    aggregateCft: 0,
    aggregateBrass: 0,
    aggregateTrolleys: 0,
    waterLiters: Math.round(waterLiters),
    waterBuckets,
    cementCost,
    sandCost,
    aggregateCost,
    brickCost,
    totalCost,
  };
}

/**
 * 4. Calculate Column & Beam (कॉलम और बीम)
 */
export function calculateColumnBeam({
  widthInches,
  depthInches,
  heightFeet,
  count,
  grade,
  rates,
}: {
  widthInches: number;
  depthInches: number;
  heightFeet: number;
  count: number;
  grade: ConcreteGrade;
  rates: IndianRates;
}): IndianCalculationResult {
  const singleVolCft = (widthInches / 12) * (depthInches / 12) * heightFeet;
  const totalWetVolumeCft = singleVolCft * count;
  const wetVolumeM3 = totalWetVolumeCft * CFT_TO_M3;

  // Dry factor 1.54 + 5% wastage
  const dryVolumeCft = totalWetVolumeCft * 1.54 * 1.05;

  let c = 1;
  let s = 1.5;
  let a = 3;
  let gradeName = 'M20 (1 : 1.5 : 3)';

  if (grade === 'M25') {
    c = 1;
    s = 1;
    a = 2;
    gradeName = 'M25 (1 : 1 : 2)';
  } else if (grade === 'M15') {
    c = 1;
    s = 2;
    a = 4;
    gradeName = 'M15 (1 : 2 : 4)';
  }

  const totalParts = c + s + a;
  const cementVolCft = (dryVolumeCft * c) / totalParts;
  const sandCft = (dryVolumeCft * s) / totalParts;
  const aggregateCft = (dryVolumeCft * a) / totalParts;

  const cementBagsExact = cementVolCft / CEMENT_BAG_VOL_CFT;
  const cementBags = Math.ceil(cementBagsExact);
  const cementWeightKg = cementBags * 50;

  const sandBrass = sandCft / 100;
  const sandTrolleys = sandCft / 100;

  const aggregateBrass = aggregateCft / 100;
  const aggregateTrolleys = aggregateCft / 100;

  const waterLiters = cementBags * 28;
  const waterBuckets = Math.round(waterLiters / 20);

  const cementCost = cementBags * rates.cementPerBag;
  const sandCost = Math.round(sandCft * rates.sandPerCft);
  const aggregateCost = Math.round(aggregateCft * rates.aggregatePerCft);
  const totalCost = cementCost + sandCost + aggregateCost;

  return {
    title: 'कॉलम / बीम (Column & Beam)',
    subtitle: `${count} नग कॉलम (${widthInches}″ × ${depthInches}″) • ${gradeName}`,
    dimensionsSummary: `${count} कॉलम • ${widthInches}″ × ${depthInches}″ × ${heightFeet} ft`,
    areaSqFt: 0,
    areaSqM: 0,
    wetVolumeCft: totalWetVolumeCft,
    wetVolumeM3,
    cementBags,
    cementBagsExact,
    cementWeightKg,
    sandCft: Math.round(sandCft),
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTrolleys: Number(sandTrolleys.toFixed(1)),
    aggregateCft: Math.round(aggregateCft),
    aggregateBrass: Number(aggregateBrass.toFixed(2)),
    aggregateTrolleys: Number(aggregateTrolleys.toFixed(1)),
    waterLiters: Math.round(waterLiters),
    waterBuckets,
    cementCost,
    sandCost,
    aggregateCost,
    brickCost: 0,
    totalCost,
  };
}

/**
 * 5. Calculate Flooring / PCC (फर्श / पीसीसी)
 */
export function calculateFlooring({
  length,
  width,
  thicknessInches,
  thicknessCm,
  unit,
  rates,
}: {
  length: number;
  width: number;
  thicknessInches: number;
  thicknessCm: number;
  unit: IndianUnit;
  rates: IndianRates;
}): IndianCalculationResult {
  let wetVolumeCft = 0;
  let areaSqFt = 0;

  if (unit === 'feet') {
    areaSqFt = length * width;
    wetVolumeCft = areaSqFt * (thicknessInches / 12);
  } else {
    const areaM = length * width;
    areaSqFt = areaM * 10.7639;
    const wetM3 = areaM * (thicknessCm / 100);
    wetVolumeCft = wetM3 * M3_TO_CFT;
  }

  const wetVolumeM3 = wetVolumeCft * CFT_TO_M3;
  const areaSqM = areaSqFt * 0.092903;

  // PCC Flooring typically M15 (1:2:4) or M10 (1:3:6)
  // Dry volume factor: 1.54 * 1.05 = 1.61
  const dryVolumeCft = wetVolumeCft * 1.54 * 1.05;

  const c = 1;
  const s = 2;
  const a = 4;
  const totalParts = 1 + 2 + 4; // 7

  const cementVolCft = (dryVolumeCft * c) / totalParts;
  const sandCft = (dryVolumeCft * s) / totalParts;
  const aggregateCft = (dryVolumeCft * a) / totalParts;

  const cementBagsExact = cementVolCft / CEMENT_BAG_VOL_CFT;
  const cementBags = Math.ceil(cementBagsExact);
  const cementWeightKg = cementBags * 50;

  const sandBrass = sandCft / 100;
  const sandTrolleys = sandCft / 100;

  const aggregateBrass = aggregateCft / 100;
  const aggregateTrolleys = aggregateCft / 100;

  const waterLiters = cementBags * 28;
  const waterBuckets = Math.round(waterLiters / 20);

  const cementCost = cementBags * rates.cementPerBag;
  const sandCost = Math.round(sandCft * rates.sandPerCft);
  const aggregateCost = Math.round(aggregateCft * rates.aggregatePerCft);
  const totalCost = cementCost + sandCost + aggregateCost;

  const dimText =
    unit === 'feet'
      ? `${length} ft × ${width} ft (${thicknessInches} inch मोटा फर्श)`
      : `${length} m × ${width} m (${thicknessCm} cm मोटा फर्श)`;

  return {
    title: 'फर्श / पीसीसी (Flooring & PCC)',
    subtitle: 'M15 (1 : 2 : 4) फ्लोर कंक्रीट',
    dimensionsSummary: dimText,
    areaSqFt,
    areaSqM,
    wetVolumeCft,
    wetVolumeM3,
    cementBags,
    cementBagsExact,
    cementWeightKg,
    sandCft: Math.round(sandCft),
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTrolleys: Number(sandTrolleys.toFixed(1)),
    aggregateCft: Math.round(aggregateCft),
    aggregateBrass: Number(aggregateBrass.toFixed(2)),
    aggregateTrolleys: Number(aggregateTrolleys.toFixed(1)),
    waterLiters: Math.round(waterLiters),
    waterBuckets,
    cementCost,
    sandCost,
    aggregateCost,
    brickCost: 0,
    totalCost,
  };
}

/**
 * Format Indian Currency (e.g. ₹ 1,45,000)
 */
export function formatIndianRupees(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
