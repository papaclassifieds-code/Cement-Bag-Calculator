import React, { useState, useMemo } from 'react';
import {
  IndianUnit,
  IndianWorkType,
  ConcreteGrade,
  MortarRatio,
  WallThickness,
  PlasterThickness,
  IndianRates,
} from './types';
import {
  DEFAULT_INDIAN_RATES,
  calculateSlab,
  calculateBrickwork,
  calculatePlaster,
  calculateColumnBeam,
  calculateFlooring,
} from './utils/indianCalculator';
import { Header } from './components/Header';
import { IndianTabs } from './components/IndianTabs';
import { SlabForm } from './components/SlabForm';
import { BrickworkForm } from './components/BrickworkForm';
import { PlasterForm } from './components/PlasterForm';
import { ColumnForm } from './components/ColumnForm';
import { FlooringForm } from './components/FlooringForm';
import { IndianResultCard } from './components/IndianResultCard';
import { RatesModal } from './components/RatesModal';
import { TrolleyGuideModal } from './components/TrolleyGuideModal';

export default function App() {
  // Navigation & Preferences
  const [activeTab, setActiveTab] = useState<IndianWorkType>('slab');
  const [unit, setUnit] = useState<IndianUnit>('feet'); // Default Feet for Indian construction
  const [rates, setRates] = useState<IndianRates>(() => {
    try {
      const saved = localStorage.getItem('indian_material_rates');
      return saved ? JSON.parse(saved) : DEFAULT_INDIAN_RATES;
    } catch {
      return DEFAULT_INDIAN_RATES;
    }
  });

  // Modals
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Save rates to localStorage
  const handleRatesChange = (newRates: IndianRates) => {
    setRates(newRates);
    try {
      localStorage.setItem('indian_material_rates', JSON.stringify(newRates));
    } catch {
      // ignore
    }
  };

  // 1. Slab State (Default 20 ft x 30 ft x 5 inch slab = 600 sq.ft)
  const [slabLength, setSlabLength] = useState<number>(20);
  const [slabWidth, setSlabWidth] = useState<number>(30);
  const [slabThickInches, setSlabThickInches] = useState<number>(5);
  const [slabThickCm, setSlabThickCm] = useState<number>(12.5);
  const [slabGrade, setSlabGrade] = useState<ConcreteGrade>('M20');

  // 2. Brickwork State (Default 40 ft x 10 ft wall, 9 inch, 1 door, 1 window)
  const [brickLength, setBrickLength] = useState<number>(40);
  const [brickHeight, setBrickHeight] = useState<number>(10);
  const [brickThickness, setBrickThickness] = useState<WallThickness>('9inch');
  const [brickDoorCount, setBrickDoorCount] = useState<number>(1);
  const [brickWindowCount, setBrickWindowCount] = useState<number>(1);
  const [brickMortarRatio, setBrickMortarRatio] = useState<MortarRatio>('1:6');

  // 3. Plaster State (Default 40 ft x 10 ft, 12mm internal plaster)
  const [plasterLength, setPlasterLength] = useState<number>(40);
  const [plasterHeight, setPlasterHeight] = useState<number>(10);
  const [plasterThickness, setPlasterThickness] = useState<PlasterThickness>('12mm');
  const [plasterMortarRatio, setPlasterMortarRatio] = useState<MortarRatio>('1:6');
  const [plasterSides, setPlasterSides] = useState<number>(1);

  // 4. Column State (Default 6 columns of 9" x 12" x 10 ft)
  const [colWidthInches, setColWidthInches] = useState<number>(9);
  const [colDepthInches, setColDepthInches] = useState<number>(12);
  const [colHeightFeet, setColHeightFeet] = useState<number>(10);
  const [colCount, setColCount] = useState<number>(6);
  const [colGrade, setColGrade] = useState<ConcreteGrade>('M20');

  // 5. Flooring State (Default 20 ft x 25 ft x 3 inch floor = 500 sq.ft)
  const [floorLength, setFloorLength] = useState<number>(20);
  const [floorWidth, setFloorWidth] = useState<number>(25);
  const [floorThickInches, setFloorThickInches] = useState<number>(3);
  const [floorThickCm, setFloorThickCm] = useState<number>(7.5);

  // Unit toggle handler with proportional conversion
  const handleUnitToggle = (newUnit: IndianUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);

    if (newUnit === 'meter') {
      // Feet to meter
      setSlabLength((prev) => Number((prev * 0.3048).toFixed(1)));
      setSlabWidth((prev) => Number((prev * 0.3048).toFixed(1)));
      setBrickLength((prev) => Number((prev * 0.3048).toFixed(1)));
      setBrickHeight((prev) => Number((prev * 0.3048).toFixed(1)));
      setPlasterLength((prev) => Number((prev * 0.3048).toFixed(1)));
      setPlasterHeight((prev) => Number((prev * 0.3048).toFixed(1)));
      setFloorLength((prev) => Number((prev * 0.3048).toFixed(1)));
      setFloorWidth((prev) => Number((prev * 0.3048).toFixed(1)));
    } else {
      // Meter to feet
      setSlabLength((prev) => Number((prev / 0.3048).toFixed(1)));
      setSlabWidth((prev) => Number((prev / 0.3048).toFixed(1)));
      setBrickLength((prev) => Number((prev / 0.3048).toFixed(1)));
      setBrickHeight((prev) => Number((prev / 0.3048).toFixed(1)));
      setPlasterLength((prev) => Number((prev / 0.3048).toFixed(1)));
      setPlasterHeight((prev) => Number((prev / 0.3048).toFixed(1)));
      setFloorLength((prev) => Number((prev / 0.3048).toFixed(1)));
      setFloorWidth((prev) => Number((prev / 0.3048).toFixed(1)));
    }
  };

  // Instant calculation based on active tab
  const activeResult = useMemo(() => {
    switch (activeTab) {
      case 'slab':
        return calculateSlab({
          length: slabLength,
          width: slabWidth,
          thicknessInches: slabThickInches,
          thicknessCm: slabThickCm,
          grade: slabGrade,
          unit,
          rates,
        });

      case 'brickwork':
        return calculateBrickwork({
          wallLength: brickLength,
          wallHeight: brickHeight,
          thickness: brickThickness,
          doorCount: brickDoorCount,
          windowCount: brickWindowCount,
          mortarRatio: brickMortarRatio,
          unit,
          rates,
        });

      case 'plaster':
        return calculatePlaster({
          length: plasterLength,
          height: plasterHeight,
          thickness: plasterThickness,
          mortarRatio: plasterMortarRatio,
          sidesCount: plasterSides,
          unit,
          rates,
        });

      case 'column':
        return calculateColumnBeam({
          widthInches: colWidthInches,
          depthInches: colDepthInches,
          heightFeet: colHeightFeet,
          count: colCount,
          grade: colGrade,
          rates,
        });

      case 'flooring':
        return calculateFlooring({
          length: floorLength,
          width: floorWidth,
          thicknessInches: floorThickInches,
          thicknessCm: floorThickCm,
          unit,
          rates,
        });

      default:
        return calculateSlab({
          length: slabLength,
          width: slabWidth,
          thicknessInches: slabThickInches,
          thicknessCm: slabThickCm,
          grade: slabGrade,
          unit,
          rates,
        });
    }
  }, [
    activeTab,
    unit,
    rates,
    slabLength,
    slabWidth,
    slabThickInches,
    slabThickCm,
    slabGrade,
    brickLength,
    brickHeight,
    brickThickness,
    brickDoorCount,
    brickWindowCount,
    brickMortarRatio,
    plasterLength,
    plasterHeight,
    plasterThickness,
    plasterMortarRatio,
    plasterSides,
    colWidthInches,
    colDepthInches,
    colHeightFeet,
    colCount,
    colGrade,
    floorLength,
    floorWidth,
    floorThickInches,
    floorThickCm,
  ]);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col selection:bg-amber-500 selection:text-white font-sans">
      {/* Mobile-First Header */}
      <Header
        unit={unit}
        onUnitChange={handleUnitToggle}
        onOpenRates={() => setIsRatesOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Category Tabs: Slab, Brick, Plaster, Column, Flooring */}
      <IndianTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto p-3 sm:p-4 space-y-4">
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4">
          <div className="mb-3 pb-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
              {activeTab === 'slab' && 'छत का नाप (Slab Dimensions)'}
              {activeTab === 'brickwork' && 'दीवार का नाप (Wall Dimensions)'}
              {activeTab === 'plaster' && 'प्लास्टर का नाप (Plaster Dimensions)'}
              {activeTab === 'column' && 'कॉलम / पिलर का नाप (Column Dimensions)'}
              {activeTab === 'flooring' && 'फर्श का नाप (Flooring Dimensions)'}
            </span>
            <span className="text-[11px] text-amber-700 font-semibold">
              {unit === 'feet' ? 'नाप: फीट में' : 'नाप: मीटर में'}
            </span>
          </div>

          {activeTab === 'slab' && (
            <SlabForm
              length={slabLength}
              setLength={setSlabLength}
              width={slabWidth}
              setWidth={setSlabWidth}
              thicknessInches={slabThickInches}
              setThicknessInches={setSlabThickInches}
              thicknessCm={slabThickCm}
              setThicknessCm={setSlabThickCm}
              grade={slabGrade}
              setGrade={setSlabGrade}
              unit={unit}
            />
          )}

          {activeTab === 'brickwork' && (
            <BrickworkForm
              wallLength={brickLength}
              setWallLength={setBrickLength}
              wallHeight={brickHeight}
              setWallHeight={setBrickHeight}
              thickness={brickThickness}
              setThickness={setBrickThickness}
              doorCount={brickDoorCount}
              setDoorCount={setBrickDoorCount}
              windowCount={brickWindowCount}
              setWindowCount={setBrickWindowCount}
              mortarRatio={brickMortarRatio}
              setMortarRatio={setBrickMortarRatio}
              unit={unit}
            />
          )}

          {activeTab === 'plaster' && (
            <PlasterForm
              length={plasterLength}
              setLength={setPlasterLength}
              height={plasterHeight}
              setHeight={setPlasterHeight}
              thickness={plasterThickness}
              setThickness={setPlasterThickness}
              mortarRatio={plasterMortarRatio}
              setMortarRatio={setPlasterMortarRatio}
              sidesCount={plasterSides}
              setSidesCount={setPlasterSides}
              unit={unit}
            />
          )}

          {activeTab === 'column' && (
            <ColumnForm
              widthInches={colWidthInches}
              setWidthInches={setColWidthInches}
              depthInches={colDepthInches}
              setDepthInches={setColDepthInches}
              heightFeet={colHeightFeet}
              setHeightFeet={setColHeightFeet}
              count={colCount}
              setCount={setColCount}
              grade={colGrade}
              setGrade={setColGrade}
            />
          )}

          {activeTab === 'flooring' && (
            <FlooringForm
              length={floorLength}
              setLength={setFloorLength}
              width={floorWidth}
              setWidth={setFloorWidth}
              thicknessInches={floorThickInches}
              setThicknessInches={setFloorThickInches}
              thicknessCm={floorThickCm}
              setThicknessCm={setFloorThickCm}
              unit={unit}
            />
          )}
        </div>

        {/* Live Material Result Card */}
        <IndianResultCard
          result={activeResult}
          onOpenRates={() => setIsRatesOpen(true)}
        />

      </main>

      {/* Mobile-Friendly Footer */}
      <footer className="py-3 px-4 text-center text-[11px] text-stone-500 border-t border-stone-200 bg-white">
        <p>
          भारतीय निर्माण मानकों के अनुसार (IS 456) • 1 बोरी = 50 kg • 1 ब्रास = 100 CFT
        </p>
      </footer>

      {/* Rates Drawer/Modal */}
      <RatesModal
        isOpen={isRatesOpen}
        onClose={() => setIsRatesOpen(false)}
        rates={rates}
        onChangeRates={handleRatesChange}
      />

      {/* Trolley and Brass Guide Modal */}
      <TrolleyGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
