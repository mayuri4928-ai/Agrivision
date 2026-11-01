import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PLANT_CLASSES,
  CROPS_LIST,
  TOTAL_CLASSES,
  TOTAL_CROPS,
  TOTAL_DISEASE_CLASSES,
  TOTAL_HEALTHY_CLASSES,
} from '../../data/classes';
import { getLocalizedScience } from '../../data/localizedScienceData';
import { getLocalizedCropName, getLocalizedDiseaseDetail } from '../../data/localizedCropsAndDiseases';
import {
  FlaskConical,
  Cpu,
  Award,
  BookOpen,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Table,
} from 'lucide-react';

export const SciencePage: React.FC = () => {
  const { language, modelStatus } = useApp();
  const [expandedSection, setExpandedSection] = useState<string | null>('arch');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('ALL');

  const sci = getLocalizedScience(language);

  const filteredClasses = PLANT_CLASSES.filter((c) => {
    if (selectedCropFilter === 'ALL') return true;
    return c.crop === selectedCropFilter;
  });

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title & CBSE Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <Award className="w-3.5 h-3.5" />
          <span>{sci.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          {sci.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {sci.subtitle}
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-400 font-medium border-t border-slate-800">
          <span>{sci.metaTags.domain}</span>
          <span>{sci.metaTags.architecture}</span>
          <span>• Classes: {TOTAL_CLASSES} ({TOTAL_DISEASE_CLASSES} Diseases, {TOTAL_HEALTHY_CLASSES} Healthy across {TOTAL_CROPS} Crops)</span>
          <span>• Offline Weights: {modelStatus.hasTrainedWeights ? `Installed (${modelStatus.weightsSource})` : 'Not Installed'}</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{sci.metrics.testAccuracyLabel}</span>
          <div className="text-xl font-black text-emerald-700">{sci.metrics.testAccuracyVal}</div>
          <span className="text-[10px] text-slate-500">{sci.metrics.testAccuracySub}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Taxonomy</span>
          <div className="text-2xl font-black text-blue-700">{TOTAL_CLASSES} Classes</div>
          <span className="text-[10px] text-slate-500">{TOTAL_DISEASE_CLASSES} Diseases • {TOTAL_HEALTHY_CLASSES} Healthy</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{sci.metrics.paramsLabel}</span>
          <div className="text-2xl font-black text-purple-700">{sci.metrics.paramsVal}</div>
          <span className="text-[10px] text-slate-500">{sci.metrics.paramsSub}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Input Tensor</span>
          <div className="text-2xl font-black text-amber-700">224×224</div>
          <span className="text-[10px] text-slate-500">x / 127.5 − 1 Normalized</span>
        </div>
      </div>

      {/* Accordion Sections for Exhibition Panels */}
      <div className="space-y-4">
        {/* Section 1: Problem Statement & Agronomic Need */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('problem')}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span>{sci.section1.title}</span>
            </div>
            {expandedSection === 'problem' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSection === 'problem' && (
            <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>{sci.section1.intro}</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                {sci.section1.hurdles.map((h, idx) => (
                  <li key={idx}>
                    <strong>{h.title} </strong>{h.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 2: MobileNetV2 Architecture & Mathematical Innovation */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('arch')}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <span>{sci.section2.title}</span>
            </div>
            {expandedSection === 'arch' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSection === 'arch' && (
            <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>{sci.section2.intro}</p>

              {/* Architecture comparison table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-2.5 font-bold">{sci.section2.tableHeaders.arch}</th>
                      <th className="p-2.5 font-bold">{sci.section2.tableHeaders.params}</th>
                      <th className="p-2.5 font-bold">{sci.section2.tableHeaders.flops}</th>
                      <th className="p-2.5 font-bold">{sci.section2.tableHeaders.suitability}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sci.section2.tableRows.map((row, idx) => (
                      <tr key={idx} className={row.isHighlighted ? 'bg-emerald-50 font-semibold text-emerald-900' : 'bg-white'}>
                        <td className="p-2.5 font-medium">{row.arch}</td>
                        <td className="p-2.5">{row.params}</td>
                        <td className="p-2.5">{row.flops}</td>
                        <td className={`p-2.5 font-semibold ${row.isHighlighted ? 'text-emerald-700' : idx === 0 ? 'text-red-600' : 'text-amber-600'}`}>{row.suitability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">{sci.section2.principlesHeading}</h4>
                <div className="space-y-2 text-xs">
                  {sci.section2.principles.map((pr, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-emerald-800">{pr.title}</span>
                      <p className="mt-1">{pr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Dataset & Training Pipeline */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('dataset')}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>{sci.section3.title}</span>
            </div>
            {expandedSection === 'dataset' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSection === 'dataset' && (
            <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>{sci.section3.intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {sci.section3.datasets.map((ds, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border ${idx === 0 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-blue-50/70 border-blue-200'}`}>
                    <span className={`font-bold flex items-center gap-1.5 ${idx === 0 ? 'text-emerald-950' : 'text-blue-950'}`}>
                      <span>{ds.title}</span>
                    </span>
                    <p className="mt-1 text-slate-700">{ds.desc}</p>
                    <ul className="list-disc list-inside mt-2 space-y-0.5 text-slate-600 font-medium">
                      {ds.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900">{sci.section3.augmentationTitle}</span>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                    {sci.section3.augmentationItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900">{sci.section3.hyperparametersTitle}</span>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                    {sci.section3.hyperparametersItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: All 60 Classes Interactive Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('classes')}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Table className="w-4 h-4" />
              </div>
              <span>{sci.section4.title}</span>
            </div>
            {expandedSection === 'classes' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSection === 'classes' && (
            <div className="p-5 pt-0 border-t border-slate-100 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-500">{sci.section4.filterLabel}</p>
                <select
                  value={selectedCropFilter}
                  onChange={(e) => setSelectedCropFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ALL">{sci.section4.allCropsOption}</option>
                  {CROPS_LIST.map((c) => (
                    <option key={c.id} value={c.name}>
                      {getLocalizedCropName(c.id, language) || c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="max-h-80 overflow-y-auto overflow-x-auto w-full max-w-full rounded-xl border border-slate-200">
                <table className="min-w-[440px] w-full text-xs text-left">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="p-2.5 font-bold">{sci.section4.tableHeaders.index}</th>
                      <th className="p-2.5 font-bold">{sci.section4.tableHeaders.crop}</th>
                      <th className="p-2.5 font-bold">{sci.section4.tableHeaders.condition}</th>
                      <th className="p-2.5 font-bold">{sci.section4.tableHeaders.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredClasses.map((item, idx) => {
                      const locDetail = getLocalizedDiseaseDetail(item.className, language);
                      const cropName = locDetail?.crop || getLocalizedCropName(item.crop.toLowerCase(), language) || item.crop;
                      const diseaseName = locDetail?.diseaseName || item.disease;

                      return (
                        <tr key={item.className} className="hover:bg-slate-50">
                          <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="p-2.5 font-bold text-slate-900">{cropName}</td>
                          <td className="p-2.5 text-slate-700">{diseaseName}</td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                item.isHealthy
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  : 'bg-amber-100 text-amber-800 border-amber-200'
                              }`}
                            >
                              {item.isHealthy ? sci.section4.statusHealthy : sci.section4.statusDisease}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Environmental & Agricultural Impact */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <button
            onClick={() => toggleSection('impact')}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>{sci.section5.title}</span>
            </div>
            {expandedSection === 'impact' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSection === 'impact' && (
            <div className="p-5 pt-0 border-t border-slate-100 text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>{sci.section5.intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                {sci.section5.cards.map((card, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border space-y-1 ${idx === 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : idx === 1 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-purple-50 border-purple-200 text-purple-900'}`}>
                    <h5 className="font-bold">{card.title}</h5>
                    <p>{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
