import React, { useState, useMemo } from 'react';
import {
  AGRO_CLIMATIC_ZONES,
  AgroClimaticZoneData,
  HEAT_MAP_DISEASES,
} from '../data/regionalDiseaseDistribution';
import {
  INDIA_REGIONS,
  RegionFeature,
} from '../data/indiaMapGeometry';
import {
  ALL_INDIA_POLITICAL_STATES,
  PoliticalStateFeature,
  getPoliticalState,
} from '../data/allIndiaPoliticalMapData';
import {
  MapPin,
  Flame,
  AlertTriangle,
  Calendar,
  Layers,
  Filter,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LanguageCode } from '../types';

interface RegionalDistributionHeatMapProps {
  language?: LanguageCode;
  initialSelectedDisease?: string;
  selectedStateName?: string;
}

const CROP_ICONS: Record<string, string> = {
  Cotton: '🌿',
  Tomato: '🍅',
  Potato: '🥔',
  Rice: '🌾',
  Wheat: '🌾',
  Grape: '🍇',
  Apple: '🍎',
  Corn: '🌽',
  'Pepper bell': '🫑',
  Soybean: '🌱',
};

export const RegionalDistributionHeatMap: React.FC<RegionalDistributionHeatMapProps> = ({
  initialSelectedDisease = 'Potato___Late_blight',
  selectedStateName = 'Gujarat',
}) => {
  const [selectedDiseaseClass, setSelectedDiseaseClass] = useState<string>(initialSelectedDisease);
  const [cropFilter, setCropFilter] = useState<string>('ALL');

  // Find user's active region
  const initialRegion = useMemo(() => {
    return (
      INDIA_REGIONS.find((r) =>
        r.states.some((s) => s.toLowerCase() === selectedStateName.toLowerCase())
      ) || INDIA_REGIONS[1] // Default to West (Gujarat)
    );
  }, [selectedStateName]);

  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialRegion.id);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // Active state selection on the political map
  const [selectedStateCode, setSelectedStateCode] = useState<string>(() => {
    const found = getPoliticalState(selectedStateName);
    return found ? found.code : 'GJ';
  });
  const [hoveredStateCode, setHoveredStateCode] = useState<string | null>(null);

  const activePoliticalState = useMemo(() => {
    return (
      ALL_INDIA_POLITICAL_STATES.find((s) => s.code === (hoveredStateCode || selectedStateCode)) ||
      ALL_INDIA_POLITICAL_STATES[9] // Gujarat
    );
  }, [hoveredStateCode, selectedStateCode]);

  // Current selected disease metadata
  const currentDisease = useMemo(() => {
    return (
      HEAT_MAP_DISEASES.find((d) => d.className === selectedDiseaseClass) ||
      HEAT_MAP_DISEASES[0]
    );
  }, [selectedDiseaseClass]);

  // Unique crops in the catalog
  const uniqueCrops = useMemo(() => {
    const set = new Set<string>();
    HEAT_MAP_DISEASES.forEach((d) => set.add(d.crop));
    return Array.from(set);
  }, []);

  const filteredDiseaseOptions = useMemo(() => {
    if (cropFilter === 'ALL') return HEAT_MAP_DISEASES;
    return HEAT_MAP_DISEASES.filter((d) => d.crop === cropFilter);
  }, [cropFilter]);

  const activeRegion = useMemo(() => {
    return INDIA_REGIONS.find((r) => r.id === selectedRegionId) || INDIA_REGIONS[0];
  }, [selectedRegionId]);

  // Compute representative agro-climatic zone data for selected region
  const matchingZone = useMemo(() => {
    return (
      AGRO_CLIMATIC_ZONES.find((z) =>
        z.majorStates.some((s) => activeRegion.states.includes(s))
      ) || AGRO_CLIMATIC_ZONES[0]
    );
  }, [activeRegion]);

  // Active disease prevalence for matching zone
  const prevalenceData = useMemo(() => {
    return matchingZone.diseasePrevalences[selectedDiseaseClass] || null;
  }, [matchingZone, selectedDiseaseClass]);

  // Helper for color and badge
  const getPrevalenceStyle = (score: number) => {
    if (score >= 80) {
      return {
        tier: 'High Risk',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        badge: 'bg-rose-600 text-white',
        fill: '#f43f5e',
        text: 'text-rose-700',
      };
    }
    if (score >= 50) {
      return {
        tier: 'Moderate Warning',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        badge: 'bg-amber-500 text-white',
        fill: '#f59e0b',
        text: 'text-amber-700',
      };
    }
    return {
      tier: 'Low / Safe',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
      fill: '#10b981',
      text: 'text-emerald-700',
    };
  };

  const currentScore = prevalenceData ? prevalenceData.prevalenceScore : 25;
  const currentStyle = getPrevalenceStyle(currentScore);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header with Title and Disease Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              <Calendar className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Seasonal Crop Disease Forecast
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Expected seasonal risk based on ICAR agricultural climate models
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls: Crop & Disease Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Crop selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold">
            <span className="text-slate-400">Crop:</span>
            <select
              value={cropFilter}
              onChange={(e) => {
                const val = e.target.value;
                setCropFilter(val);
                const firstMatching = HEAT_MAP_DISEASES.find(
                  (d) => val === 'ALL' || d.crop === val
                );
                if (firstMatching) setSelectedDiseaseClass(firstMatching.className);
              }}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Crops</option>
              {uniqueCrops.map((c) => (
                <option key={c} value={c}>
                  {CROP_ICONS[c] || '🌱'} {c}
                </option>
              ))}
            </select>
          </div>

          {/* Disease selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold">
            <span className="text-slate-400">Disease:</span>
            <select
              value={selectedDiseaseClass}
              onChange={(e) => setSelectedDiseaseClass(e.target.value)}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              {filteredDiseaseOptions.map((opt) => (
                <option key={opt.className} value={opt.className}>
                  {opt.disease.split('(')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Accurate India SVG Map on Left, Seasonal Risk Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Political Map with Clear State Boundaries */}
        <div className="lg:col-span-5 bg-slate-50/80 rounded-3xl p-4 sm:p-5 border border-slate-200/80 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs mb-2">
            <span className="font-extrabold text-slate-700">Political Map of India:</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              📍 {activePoliticalState.name} ({activePoliticalState.code})
            </span>
          </div>

          {/* Authentic India Political Map with Clickable State Boundaries & Geographic Backdrop */}
          <div className="w-full max-w-[340px] aspect-[500/560] relative select-none rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner">
            <svg viewBox="0 0 500 560" className="w-full h-full filter drop-shadow-xs">
              <defs>
                <radialGradient id="marineWaterGradient" cx="50%" cy="60%" r="65%">
                  <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#e0f2fe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.6" />
                </radialGradient>
                <pattern id="cartoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.08" />
                </pattern>
              </defs>

              {/* Ocean & Marine Base Layer (No Gray Background) */}
              <rect width="500" height="560" fill="url(#marineWaterGradient)" />
              <rect width="500" height="560" fill="url(#cartoGrid)" />

              {/* Geographic Marine Waterbody Labels */}
              <text x="80" y="440" fontSize="9px" fontWeight="700" fill="#0284c7" fillOpacity="0.45" letterSpacing="1" className="select-none pointer-events-none">
                ARABIAN SEA
              </text>
              <text x="350" y="440" fontSize="9px" fontWeight="700" fill="#0284c7" fillOpacity="0.45" letterSpacing="1" className="select-none pointer-events-none">
                BAY OF BENGAL
              </text>
              <text x="210" y="545" fontSize="8.5px" fontWeight="700" fill="#0284c7" fillOpacity="0.4" letterSpacing="1.5" className="select-none pointer-events-none">
                INDIAN OCEAN
              </text>

              {/* Authentic Political State Boundaries */}
              {ALL_INDIA_POLITICAL_STATES.map((state) => {
                const isSelected = selectedStateCode === state.code;
                const isHovered = hoveredStateCode === state.code;
                const isInSelectedRegion = activeRegion.states.includes(state.name);

                // Find score for this state based on its agro-climatic zone
                const stateZone =
                  AGRO_CLIMATIC_ZONES.find((z) => z.majorStates.includes(state.name)) ||
                  matchingZone;
                const statePrev = stateZone?.diseasePrevalences[selectedDiseaseClass];
                const stateScore = statePrev ? statePrev.prevalenceScore : 25;
                const style = getPrevalenceStyle(stateScore);

                return (
                  <g
                    key={state.code}
                    className="cursor-pointer transition-all duration-150"
                    onClick={() => {
                      setSelectedStateCode(state.code);
                      const matchedReg = INDIA_REGIONS.find((r) => r.states.includes(state.name));
                      if (matchedReg) setSelectedRegionId(matchedReg.id);
                    }}
                    onMouseEnter={() => setHoveredStateCode(state.code)}
                    onMouseLeave={() => setHoveredStateCode(null)}
                  >
                    <path
                      d={state.svgPath}
                      fill={isSelected || isHovered ? style.fill : isInSelectedRegion ? style.fill : '#ffffff'}
                      fillOpacity={isSelected ? 0.8 : isHovered ? 0.65 : isInSelectedRegion ? 0.35 : 0.85}
                      stroke={isSelected ? '#0f172a' : isHovered ? '#1e293b' : '#64748b'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 1}
                      strokeLinejoin="round"
                    />

                    {/* State Code Label on prominent states */}
                    {['GJ', 'MH', 'PB', 'UP', 'RJ', 'KA', 'TN', 'WB', 'MP', 'AS', 'AP', 'BR', 'OR', 'JK', 'HP', 'TS'].includes(
                      state.code
                    ) && (
                      <text
                        x={state.centroidSvg.x}
                        y={state.centroidSvg.y}
                        textAnchor="middle"
                        fontSize="8px"
                        fontWeight="900"
                        fill={isSelected ? '#0f172a' : '#334155'}
                        pointerEvents="none"
                        className="select-none"
                      >
                        {state.code}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive State Hint */}
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Tap any state to view local disease risk & weather forecast
          </p>

          {/* Simple Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-200/80 w-full text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Watch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Low Risk</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Farmer Advisory & Seasonality */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
            {/* Header: Region + Disease */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
              <div>
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Region Overview
                </span>
                <h4 className="text-lg font-black text-slate-900 leading-tight">
                  {activeRegion.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  States: {activeRegion.states.join(', ')}
                </p>
              </div>

              <div className={`px-3 py-1.5 rounded-2xl border text-xs font-black flex items-center gap-1.5 ${currentStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${currentStyle.fill === '#f43f5e' ? 'bg-rose-500' : currentStyle.fill === '#f59e0b' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span>{currentStyle.tier}</span>
              </div>
            </div>

            {/* Disease & Crop Banner */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                {CROP_ICONS[currentDisease.crop] || '🌱'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-500">Target Crop & Disease:</div>
                <div className="text-sm font-black text-slate-900 truncate">
                  {currentDisease.crop} — {currentDisease.disease}
                </div>
              </div>
            </div>

            {/* Peak Season Information */}
            {prevalenceData?.peakSeason && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1">
                <div className="font-black text-amber-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>When does this outbreak usually peak?</span>
                </div>
                <p className="text-amber-950 font-medium leading-relaxed">
                  {prevalenceData.peakSeason}
                </p>
              </div>
            )}

            {/* Driving Weather Trigger */}
            {prevalenceData?.drivingFactors && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <span>🌦️</span>
                  <span>Weather condition that causes it:</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {prevalenceData.drivingFactors}
                </p>
              </div>
            )}

            {/* Government ICAR Advisory */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs space-y-1.5">
              <div className="font-black text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ICAR Expert Farmer Advisory:</span>
              </div>
              <p className="text-emerald-950 font-medium leading-relaxed">
                {prevalenceData?.icarAdvisory ||
                  'Keep field bunds weed-free and conduct weekly scouting during high humidity.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalDistributionHeatMap;
