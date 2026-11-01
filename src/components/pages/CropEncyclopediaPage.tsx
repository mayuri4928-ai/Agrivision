import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CROP_PROFILES,
  getEnrichedDiseasesList,
  MULTI_DATABASE_SOURCES,
  EnrichedDiseaseEntry,
  CropProfile,
} from '../../data/cropEncyclopediaData';
import { SAMPLE_LEAVES } from '../../data/sampleLeaves';
import {
  CROP_DIRECTORY_LOCALES,
  getCropDirectoryLocale,
  getLocalizedCropName,
  getLocalizedPathogenType,
} from '../../data/localizedCropsAndDiseases';
import {
  getLocalizedDiseaseName,
  getLocalizedDiseaseDetail,
} from '../../data/localizedDiseasesData';
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  Sprout,
  Bug,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Database,
  MapPin,
  Calendar,
  X,
  ScanLine,
  Leaf,
  Info,
} from 'lucide-react';

export const CropEncyclopediaPage: React.FC = () => {
  const { setActiveTab, setCurrentImage, language } = useApp();
  const dLoc = getCropDirectoryLocale(language);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedPathogenFilter, setSelectedPathogenFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'byCrop' | 'allDiseases'>('byCrop');
  const [expandedCrops, setExpandedCrops] = useState<Record<string, boolean>>({
    tomato: true,
    potato: true,
    apple: true,
    corn: false,
    grape: false,
  });
  const [activeDossier, setActiveDossier] = useState<EnrichedDiseaseEntry | null>(null);

  const enrichedDiseases = useMemo(() => getEnrichedDiseasesList(), []);

  // Filtered diseases
  const filteredDiseases = useMemo(() => {
    return enrichedDiseases.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.crop.toLowerCase().includes(q) ||
        d.disease.toLowerCase().includes(q) ||
        (d.scientificName && d.scientificName.toLowerCase().includes(q)) ||
        d.simpleDescription.toLowerCase().includes(q) ||
        d.visibleSymptoms.some((s) => s.toLowerCase().includes(q)) ||
        d.pathogenType.toLowerCase().includes(q);

      const matchesCrop =
        selectedCropFilter === 'all' ||
        d.crop.toLowerCase().replace(/[^a-z]/g, '').includes(selectedCropFilter) ||
        d.cropId === selectedCropFilter;

      const matchesPathogen =
        selectedPathogenFilter === 'all' ||
        d.pathogenType.toLowerCase() === selectedPathogenFilter.toLowerCase();

      return matchesSearch && matchesCrop && matchesPathogen;
    });
  }, [enrichedDiseases, searchQuery, selectedCropFilter, selectedPathogenFilter]);

  // Group by crop
  const groupedDiseases = useMemo(() => {
    const map = new Map<string, EnrichedDiseaseEntry[]>();
    filteredDiseases.forEach((d) => {
      const key = d.cropId;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(d);
    });
    return map;
  }, [filteredDiseases]);

  const toggleCropExpand = (cropId: string) => {
    setExpandedCrops((prev) => ({
      ...prev,
      [cropId]: !prev[cropId],
    }));
  };

  const handleTestSampleWithAI = (disease: EnrichedDiseaseEntry) => {
    // Find matching sample leaf in SAMPLE_LEAVES if available
    const matchingSample = SAMPLE_LEAVES.find(
      (s) => s.expectedClass === disease.className || s.crop.toLowerCase() === disease.crop.toLowerCase()
    );

    if (matchingSample) {
      setCurrentImage(matchingSample.dataUrl);
    }
    setActiveTab('analyze');
  };

  const getPathogenBadgeColor = (type: string) => {
    switch (type) {
      case 'Healthy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Bacterial':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Viral':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Pest / Physiological':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Fungal':
      default:
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <div className="w-full max-w-full space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{dLoc.heroBadge}</span>
            <span className="bg-emerald-400/30 px-1.5 py-0.5 rounded text-[10px]">{dLoc.badgeSub}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {dLoc.heroTitle}
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {dLoc.heroSubtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-2xl font-black text-white">{CROP_PROFILES.length}</span>
              <span className="block text-xs text-emerald-200">{dLoc.varietiesLabel}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-2xl font-black text-white">{enrichedDiseases.length}</span>
              <span className="block text-xs text-emerald-200">{dLoc.pathologiesLabel}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-2xl font-black text-white">5</span>
              <span className="block text-xs text-emerald-200">{dLoc.databasesLabel}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-2xl font-black text-white">100%</span>
              <span className="block text-xs text-emerald-200">{dLoc.offlineReadyLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Database Grounding Bar */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>{dLoc.dbGroundingTitle}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {dLoc.dbGroundingSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {MULTI_DATABASE_SOURCES.map((src) => (
            <div
              key={src.id}
              className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${src.badgeColor}`}
            >
              <div>
                <span className="font-bold block text-slate-900 leading-tight">{src.name}</span>
                <span className="text-[10px] font-semibold opacity-85 block mt-0.5">{src.type}</span>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-700">{src.contribution}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-black/10 text-[10px] font-medium opacity-80">
                {src.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search, Filter & View Controls */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dLoc.searchPlaceholder}
              className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setViewMode('byCrop')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'byCrop'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{dLoc.byCropMode}</span>
            </button>
            <button
              onClick={() => setViewMode('allDiseases')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'allDiseases'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{dLoc.allDiseasesMode} ({filteredDiseases.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          {/* Pathogen Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pr-6 text-xs w-full max-w-full scrollbar-thin">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> {dLoc.pathogenFilterLabel}:
            </span>
            {['all', 'Fungal', 'Bacterial', 'Viral', 'Pest / Physiological', 'Healthy'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPathogenFilter(type)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all text-xs border shrink-0 ${
                  selectedPathogenFilter === type
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                {type === 'all' ? `${dLoc.allPathogens} (${enrichedDiseases.length})` : getLocalizedPathogenType(type, language)}
              </button>
            ))}
          </div>

          {/* Crop Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pr-6 text-xs w-full max-w-full scrollbar-thin">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap flex items-center gap-1 shrink-0">
              <Sprout className="w-3 h-3" /> {dLoc.cropFilterLabel}:
            </span>
            <button
              onClick={() => setSelectedCropFilter('all')}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all text-xs border shrink-0 ${
                selectedCropFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {dLoc.allCrops} ({CROP_PROFILES.length})
            </button>
            {CROP_PROFILES.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCropFilter(crop.id)}
                className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all text-xs border shrink-0 flex items-center gap-1 ${
                  selectedCropFilter === crop.id
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span>{getLocalizedCropName(crop.id, language)}</span>
                <span className="text-[10px] opacity-75">({crop.totalPathologies})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      {viewMode === 'byCrop' ? (
        /* Grouped by Crop View */
        <div className="space-y-6">
          {CROP_PROFILES.filter((crop) => {
            if (selectedCropFilter !== 'all' && crop.id !== selectedCropFilter) return false;
            // If search query is present, check if crop or its diseases match
            const cropDiseases = groupedDiseases.get(crop.id) || [];
            return cropDiseases.length > 0;
          }).map((crop) => {
            const cropDiseases = groupedDiseases.get(crop.id) || [];
            const isExpanded = expandedCrops[crop.id] ?? true;

            return (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Crop Header Banner */}
                <div
                  onClick={() => toggleCropExpand(crop.id)}
                  className="p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer transition-colors border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-slate-900">
                          {getLocalizedCropName(crop.id, language)} ({crop.name})
                        </h2>
                        <span className="italic text-xs text-slate-500 font-serif">({crop.scientificName})</span>
                        <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {crop.family}
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          {crop.season} {dLoc.seasonLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 line-clamp-1 sm:line-clamp-none">
                        {crop.economicImportanceIndia}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <strong className="text-slate-700">{dLoc.hubsLabel}:</strong> {crop.indianGrowingStates.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                      {cropDiseases.length} {dLoc.conditionsLabel}
                    </span>
                    <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800">
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Crop Disease Grid (Expandable) */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-slate-50/30">
                    {cropDiseases.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        {dLoc.noPathologies}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cropDiseases.map((disease) => (
                          <DiseaseCard
                            key={disease.className}
                            disease={disease}
                            onOpenDossier={() => setActiveDossier(disease)}
                            onTestWithAI={() => handleTestSampleWithAI(disease)}
                            badgeColor={getPathogenBadgeColor(disease.pathogenType)}
                            language={language}
                            dLoc={dLoc}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* All Diseases Flat Grid View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>{dLoc.showing} {filteredDiseases.length} {dLoc.of} {enrichedDiseases.length} {dLoc.pathologiesLabel}</span>
            {searchQuery && <span>Filter: &quot;{searchQuery}&quot;</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.className}
                disease={disease}
                onOpenDossier={() => setActiveDossier(disease)}
                onTestWithAI={() => handleTestSampleWithAI(disease)}
                badgeColor={getPathogenBadgeColor(disease.pathogenType)}
                language={language}
                dLoc={dLoc}
              />
            ))}
          </div>
        </div>
      )}

      {/* In-Depth Disease Dossier Modal */}
      {activeDossier && (() => {
        const locDetail = getLocalizedDiseaseDetail(activeDossier.className, language);
        const locDiseaseName = getLocalizedDiseaseName(activeDossier.className, language) || activeDossier.disease;
        const locDesc = locDetail?.simpleDescription || activeDossier.simpleDescription;
        const locSymptoms = locDetail?.visibleSymptoms || activeDossier.visibleSymptoms;
        const locRemedies = locDetail?.organicRemedies || activeDossier.organicRemedies;
        const locPrev = locDetail?.generalPrevention || activeDossier.generalPrevention;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">
                      {getLocalizedCropName(activeDossier.cropId, language)} ({activeDossier.crop})
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPathogenBadgeColor(activeDossier.pathogenType)}`}>
                      {getLocalizedPathogenType(activeDossier.pathogenType, language)}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/30 text-emerald-300 border border-emerald-500/30">
                      EPPO: {activeDossier.eppoCode}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black">{locDiseaseName}</h3>
                  {activeDossier.scientificName && (
                    <p className="text-xs text-emerald-200 italic mt-0.5 font-serif">
                      {dLoc.causalOrganismLabel}: {activeDossier.scientificName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setActiveDossier(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {dLoc.pathologicalOverview}
                  </h4>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {locDesc}
                  </p>
                </div>

                {/* Visual Symptoms */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    {dLoc.keyVisualSymptoms}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {locSymptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Favorable Environmental Drivers */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    {dLoc.favorableMicroclimate}
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {activeDossier.favorableConditions}
                  </p>
                </div>

                {/* Organic & Biological Remedies vs Chemical Management */}
                {(() => {
                  const isChemicalRemedy = (text: string) => {
                    const t = (text || '').toLowerCase();
                    return (
                      t.includes('captan') ||
                      t.includes('mancozeb') ||
                      t.includes('difenoconazole') ||
                      t.includes('myclobutanil') ||
                      t.includes('propiconazole') ||
                      t.includes('chlorothalonil') ||
                      t.includes('carbendazim') ||
                      t.includes('metalaxyl') ||
                      t.includes('azoxystrobin') ||
                      t.includes('tebuconazole') ||
                      t.includes('imidacloprid') ||
                      t.includes('thiamethoxam') ||
                      t.includes('diafenthiuron') ||
                      t.includes('hexaconazole') ||
                      t.includes('cymoxanil') ||
                      t.includes('dimethomorph') ||
                      t.includes('kasugamycin') ||
                      t.includes('streptocycline') ||
                      t.includes('plantomycin') ||
                      t.includes('pyraclostrobin') ||
                      t.includes('dinocap') ||
                      t.includes('thiophanate') ||
                      t.includes('dodine') ||
                      t.includes('isoprothiolane') ||
                      t.includes('tricyclazole')
                    );
                  };

                  const organicList = locRemedies.filter((r) => !isChemicalRemedy(r));
                  const chemicalList = locRemedies.filter((r) => isChemicalRemedy(r));

                  return (
                    <div className="space-y-3">
                      {organicList.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                            <Leaf className="w-4 h-4 text-emerald-600" />
                            <span>{dLoc.recommendedRemedies} (Organic & Bio-Control)</span>
                          </h4>
                          <div className="space-y-2">
                            {organicList.map((rem, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{rem}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {chemicalList.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                            <span>Chemical Management & Fungicides (Regulated)</span>
                          </h4>
                          <p className="text-[11px] text-amber-800/80 mb-2 font-medium">
                            Follow registered label directions and consult your local KVK extension before spraying.
                          </p>
                          <div className="space-y-2">
                            {chemicalList.map((chem, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                                <span>{chem}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* ICAR Package of Practices */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    {dLoc.icarAdvisory}
                  </h4>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {activeDossier.icarAdvisory}
                  </p>
                </div>

                {/* General Prevention Protocols */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {dLoc.culturalPrevention}
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {locPrev.map((prev, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Multimodal Benchmarks */}
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
                  <span>
                    <strong>Benchmarked Datasets:</strong> {activeDossier.benchmarkDatasets.join(' • ')}
                  </span>
                  <span className="font-mono text-slate-400">Class: {activeDossier.className}</span>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveDossier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  {dLoc.closeDossier}
                </button>
                <button
                  onClick={() => {
                    const d = activeDossier;
                    setActiveDossier(null);
                    handleTestSampleWithAI(d);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm shadow-emerald-700/30 flex items-center gap-2 transition-all"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>{dLoc.testWithAi}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

interface DiseaseCardProps {
  disease: EnrichedDiseaseEntry;
  onOpenDossier: () => void;
  onTestWithAI: () => void;
  badgeColor: string;
  language: any;
  dLoc: any;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({
  disease,
  onOpenDossier,
  onTestWithAI,
  badgeColor,
  language,
  dLoc,
}) => {
  const localizedCrop = getLocalizedCropName(disease.cropId, language);
  const localizedPathogen = getLocalizedPathogenType(disease.pathogenType, language);
  const localizedDetail = getLocalizedDiseaseDetail(disease.className, language);
  const localizedTitle = getLocalizedDiseaseName(disease.className, language) || disease.disease;
  const localizedDesc = localizedDetail?.simpleDescription || disease.simpleDescription;
  const localizedSymptoms = localizedDetail?.visibleSymptoms || disease.visibleSymptoms;

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {localizedCrop}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
            {localizedPathogen}
          </span>
        </div>

        {/* Disease Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
          {localizedTitle}
        </h3>

        {disease.scientificName && (
          <p className="text-[11px] text-slate-500 italic mt-0.5 font-serif line-clamp-1">
            {disease.scientificName}
          </p>
        )}

        {/* Description snippet */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {localizedDesc}
        </p>

        {/* Primary symptom chips */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            {dLoc.primarySymptoms}:
          </span>
          <div className="flex flex-wrap gap-1">
            {localizedSymptoms.slice(0, 2).map((sym, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 truncate max-w-[240px]"
                title={sym}
              >
                {sym}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={onOpenDossier}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{dLoc.fullDossier}</span>
        </button>

        <button
          onClick={onTestWithAI}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1.5"
          title="Load sample and diagnose with AgriVision AI"
        >
          <ScanLine className="w-3.5 h-3.5 text-emerald-600" />
          <span>{dLoc.testAi}</span>
        </button>
      </div>
    </div>
  );
};
