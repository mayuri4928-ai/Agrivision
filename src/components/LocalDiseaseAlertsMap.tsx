import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  RegionalDiseaseAlert,
  CachedAlertsData,
} from '../types/regionalAlerts';
import {
  getCachedAlertsData,
  refreshRegionalAlertCache,
  formatSyncTimestamp,
} from '../services/regionalAlertService';
import {
  OFFICIAL_KISAN_HELPLINE,
  STATE_CENTROIDS,
} from '../data/indiaMapGeometry';
import {
  getStateBoundaryConfig,
  StateBoundaryConfig,
  DistrictOutbreakNode,
  GUJARAT_BOUNDARY,
  MAHARASHTRA_BOUNDARY,
  PUNJAB_BOUNDARY,
  UTTAR_PRADESH_BOUNDARY,
} from '../data/stateBoundariesData';
import {
  ALL_INDIA_POLITICAL_STATES,
  getPoliticalState,
} from '../data/allIndiaPoliticalMapData';
import { INDIAN_STATES } from '../data/states';
import { LanguageCode } from '../types';
import { useApp } from '../context/AppContext';
import {
  getCropWarningUI,
  getLocalizedDiseaseWarning,
} from '../data/localizedCropWarnings';
import { getLocalizedCropName } from '../data/localizedCropsAndDiseases';
import { getLocalizedOutbreakUI } from '../data/localizedOutbreakAndAlerts';
import { speechService } from '../services/speechService';
import { GovtDiseaseOutbreakAlerts } from './GovtDiseaseOutbreakAlerts';
import {
  MapPin,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Search,
  Layers,
  Compass,
  Globe2,
  Crosshair,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Radio,
  FileText,
  Clock,
  Sparkles,
  Flame,
} from 'lucide-react';

interface LocalDiseaseAlertsMapProps {
  selectedStateName: string;
  language?: LanguageCode;
  onNavigateToDisease?: (className: string) => void;
  onSelectState?: (stateName: string) => void;
  className?: string;
  initialScope?: 'LOCAL_STATE' | 'ALL_INDIA';
  compactMode?: boolean;
}

// Friendly crop icons mapping
const CROP_ICONS: Record<string, string> = {
  Cotton: '🌿',
  Tomato: '🍅',
  Potato: '🥔',
  Rice: '🌾',
  Wheat: '🌾',
  Grape: '🍇',
  Apple: '🍎',
  Corn: '🌽',
  'Corn / Maize': '🌽',
  Sugarcane: '🎋',
  Soybean: '🌱',
  Orange: '🍊',
  'Orange / Citrus': '🍊',
  Pepper: '🫑',
  'Pepper bell': '🫑',
};

// Popular states for quick 1-click switcher
const POPULAR_STATES = [
  { name: 'Gujarat', icon: '🌾', code: 'GJ' },
  { name: 'Maharashtra', icon: '🍇', code: 'MH' },
  { name: 'Punjab', icon: '🥔', code: 'PB' },
  { name: 'Uttar Pradesh', icon: '🎋', code: 'UP' },
  { name: 'Rajasthan', icon: '🌾', code: 'RJ' },
  { name: 'Karnataka', icon: '☕', code: 'KA' },
  { name: 'Madhya Pradesh', icon: '🌱', code: 'MP' },
  { name: 'West Bengal', icon: '🌾', code: 'WB' },
];

// Open tile layers for online mode
const TILE_LAYERS = {
  political: {
    name: 'Political Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Street & Political Map',
    maxZoom: 19,
  },
  satellite: {
    name: 'Satellite View',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics, Maxar',
    maxZoom: 18,
  },
  topo: {
    name: 'Topographic Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; USGS, FAO, NPS, EPA',
    maxZoom: 19,
  },
};

export const LocalDiseaseAlertsMap: React.FC<LocalDiseaseAlertsMapProps> = ({
  selectedStateName = 'Gujarat',
  language,
  onNavigateToDisease,
  onSelectState,
  className = '',
  initialScope = 'LOCAL_STATE',
  compactMode = false,
}) => {
  const { language: contextLang, isOnline } = useApp();
  const currentLang: LanguageCode = language || contextLang || 'en';

  const ui = useMemo(() => getCropWarningUI(currentLang), [currentLang]);
  const outbreakUI = useMemo(() => getLocalizedOutbreakUI(currentLang), [currentLang]);

  // Active State: defaults to user's selected state
  const [activeStateName, setActiveStateName] = useState<string>(selectedStateName);

  useEffect(() => {
    setActiveStateName(selectedStateName);
  }, [selectedStateName]);

  // Offline cached alert data
  const [cacheData, setCacheData] = useState<CachedAlertsData>(() =>
    getCachedAlertsData(activeStateName)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccessMessage, setRefreshSuccessMessage] = useState<string | null>(null);

  // Scope: local state vs all India
  const [scope, setScope] = useState<'LOCAL_STATE' | 'ALL_INDIA'>(initialScope);

  // Selected crop filter
  const [selectedCrop, setSelectedCrop] = useState<string>('ALL');

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected district / alert
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  // Map Mode: 'vector_offline' (100% SVG, Zero Network) vs 'political' | 'satellite' | 'topo'
  const [mapMode, setMapMode] = useState<'vector_offline' | 'political' | 'satellite' | 'topo'>(() => {
    return typeof navigator !== 'undefined' && !navigator.onLine ? 'vector_offline' : 'political';
  });

  // Toggle for Emergency Outbreak Directives banner
  const [showGovtDirectives, setShowGovtDirectives] = useState<boolean>(true);

  // Voice playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Fullscreen expanded toggle state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Leaflet map DOM reference & instance
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonLayersRef = useRef<L.Polygon[]>([]);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Auto-switch to vector offline mode if network disconnects
  useEffect(() => {
    if (!isOnline && mapMode !== 'vector_offline') {
      setMapMode('vector_offline');
    }
  }, [isOnline]);

  // Track speech service
  useEffect(() => {
    const unsub = speechService.subscribe((s) => {
      setIsPlayingAudio(s.isPlaying);
    });
    return () => unsub();
  }, []);

  // Refresh cache when active state changes
  useEffect(() => {
    setCacheData(getCachedAlertsData(activeStateName));
  }, [activeStateName]);

  // Retrieve state boundary configuration
  const stateBoundaryConfig = useMemo<StateBoundaryConfig | null>(() => {
    return getStateBoundaryConfig(activeStateName);
  }, [activeStateName]);

  // ALL live diseases reported for this particular state from the government dataset
  const liveStateDiseases = useMemo(() => {
    const activeLower = activeStateName.toLowerCase();
    return cacheData.alerts.filter((a) => {
      const stateLower = a.stateName.toLowerCase();
      return (
        stateLower === activeLower ||
        stateLower.includes(activeLower) ||
        activeLower.includes(stateLower) ||
        (a.stateCode && activeStateName.toLowerCase() === a.stateCode.toLowerCase())
      );
    });
  }, [cacheData.alerts, activeStateName]);

  // Filtered districts/cities in state boundary mode
  const filteredDistrictNodes = useMemo(() => {
    if (!stateBoundaryConfig) return [];
    return stateBoundaryConfig.districts.filter((node) => {
      if (selectedCrop !== 'ALL' && node.crop.toLowerCase() !== selectedCrop.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const localized = getLocalizedDiseaseWarning(node, currentLang);
        const localizedCrop = getLocalizedCropName(node.crop, currentLang).toLowerCase();
        const matchName = node.name.toLowerCase().includes(q);
        const matchCity = node.city.toLowerCase().includes(q);
        const matchDistrict = node.district.toLowerCase().includes(q);
        const matchDisease =
          node.diseaseName.toLowerCase().includes(q) ||
          localized.diseaseName.toLowerCase().includes(q);
        const matchCrop =
          node.crop.toLowerCase().includes(q) || localizedCrop.includes(q);
        if (!matchName && !matchCity && !matchDistrict && !matchDisease && !matchCrop) {
          return false;
        }
      }
      return true;
    });
  }, [stateBoundaryConfig, selectedCrop, searchQuery, currentLang]);

  // Visible alerts in All-India mode
  const visibleAllIndiaAlerts = useMemo(() => {
    return cacheData.alerts.filter((alert) => {
      if (selectedCrop !== 'ALL' && alert.crop.toLowerCase() !== selectedCrop.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const localized = getLocalizedDiseaseWarning(alert, currentLang);
        const localizedCrop = getLocalizedCropName(alert.crop, currentLang).toLowerCase();
        const matchState = alert.stateName.toLowerCase().includes(q);
        const matchDistrict = alert.district.toLowerCase().includes(q);
        const matchDisease =
          alert.diseaseName.toLowerCase().includes(q) ||
          localized.diseaseName.toLowerCase().includes(q);
        const matchCrop =
          alert.crop.toLowerCase().includes(q) || localizedCrop.includes(q);
        if (!matchState && !matchDistrict && !matchDisease && !matchCrop) {
          return false;
        }
      }
      return true;
    });
  }, [cacheData.alerts, selectedCrop, searchQuery, currentLang]);

  // Currently active district node in state view
  const activeDistrictNode = useMemo<DistrictOutbreakNode | null>(() => {
    if (stateBoundaryConfig && filteredDistrictNodes.length > 0) {
      if (selectedDistrictId) {
        const match = filteredDistrictNodes.find((d) => d.id === selectedDistrictId);
        if (match) return match;
      }
      return filteredDistrictNodes[0];
    }
    return null;
  }, [stateBoundaryConfig, filteredDistrictNodes, selectedDistrictId]);

  // Currently active alert in All-India view
  const activeAllIndiaAlert = useMemo<RegionalDiseaseAlert | null>(() => {
    if (visibleAllIndiaAlerts.length === 0) return null;
    if (selectedDistrictId) {
      const match = visibleAllIndiaAlerts.find((a) => a.id === selectedDistrictId);
      if (match) return match;
    }
    return visibleAllIndiaAlerts[0];
  }, [visibleAllIndiaAlerts, selectedDistrictId]);

  // Localized disease warning details
  const localizedActiveWarning = useMemo(() => {
    if (!activeDistrictNode) return null;
    return getLocalizedDiseaseWarning(activeDistrictNode, currentLang);
  }, [activeDistrictNode, currentLang]);

  const localizedAllIndiaWarning = useMemo(() => {
    if (!activeAllIndiaAlert) return null;
    return getLocalizedDiseaseWarning(activeAllIndiaAlert, currentLang);
  }, [activeAllIndiaAlert, currentLang]);

  // Available crops
  const availableCrops = useMemo(() => {
    const crops = new Set<string>();
    if (scope === 'LOCAL_STATE' && stateBoundaryConfig) {
      stateBoundaryConfig.districts.forEach((d) => crops.add(d.crop));
      liveStateDiseases.forEach((d) => crops.add(d.crop));
    } else {
      cacheData.alerts.forEach((a) => {
        if (a.crop) crops.add(a.crop);
      });
    }
    return Array.from(crops).sort();
  }, [scope, stateBoundaryConfig, liveStateDiseases, cacheData.alerts]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          label: outbreakUI.criticalOutbreakBadge,
          shortLabel: outbreakUI.criticalOutbreakBadge.split(' ')[0] || 'CRITICAL',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          badge: 'bg-rose-600 text-white',
          dot: 'bg-rose-500',
          pin: '#e11d48',
          border: 'border-rose-400',
          ring: 'rgba(225, 29, 72, 0.45)',
        };
      case 'HIGH':
        return {
          label: outbreakUI.highThreatBadge,
          shortLabel: outbreakUI.highThreatBadge.split(' ')[0] || 'HIGH',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          badge: 'bg-amber-500 text-white',
          dot: 'bg-amber-500',
          pin: '#f59e0b',
          border: 'border-amber-400',
          ring: 'rgba(245, 158, 11, 0.4)',
        };
      case 'WATCH':
      case 'MODERATE':
        return {
          label: outbreakUI.watchAdvisoryBadge,
          shortLabel: outbreakUI.watchAdvisoryBadge.split(' ')[0] || 'WATCH',
          bg: 'bg-amber-50/80 text-amber-900 border-amber-200',
          badge: 'bg-amber-500 text-white',
          dot: 'bg-amber-500',
          pin: '#d97706',
          border: 'border-amber-300',
          ring: 'rgba(217, 119, 6, 0.35)',
        };
      default:
        return {
          label: outbreakUI.monitoredBadge,
          shortLabel: outbreakUI.monitoredBadge.split(' ')[0] || 'MONITORED',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          badge: 'bg-emerald-600 text-white',
          dot: 'bg-emerald-500',
          pin: '#10b981',
          border: 'border-emerald-300',
          ring: 'rgba(16, 185, 129, 0.3)',
        };
    }
  };

  const handleSelectState = (stateName: string) => {
    setActiveStateName(stateName);
    setScope('LOCAL_STATE');
    setSelectedDistrictId(null);
    setSearchQuery('');
    if (onSelectState) {
      onSelectState(stateName);
    }
  };

  // Live Update / Sync: Fully operational even in OFFLINE mode!
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, wasOnline } = await refreshRegionalAlertCache(activeStateName);
      setCacheData(data);
      const msg = wasOnline
        ? '✓ Live Outbreak Radar Updated from Government Server'
        : '✓ Live Offline Radar Re-Checked on-device from stored ICAR/DPPQS datasets';
      setRefreshSuccessMessage(msg);
      setTimeout(() => setRefreshSuccessMessage(null), 3500);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Voice Readout for Active Disease Advisory
  const handleSpeakActiveAdvisory = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    if (!activeDistrictNode || !localizedActiveWarning) return;

    let textToSpeak = '';
    if (currentLang === 'hi') {
      textToSpeak = `क्षेत्रीय फसल अलर्ट: राज्य ${activeDistrictNode.stateName}, जिला ${activeDistrictNode.district}। फसल: ${localizedActiveWarning.cropName}। रोग: ${localizedActiveWarning.diseaseName}। लक्षण: ${localizedActiveWarning.symptoms}। तात्कालिक सरकारी उपाय: ${localizedActiveWarning.recommendedAction}। जैविक छिड़काव: ${localizedActiveWarning.organicTreatment}। रासायनिक दवा: ${localizedActiveWarning.chemicalTreatment}। आपातकालीन किसान हेल्पलाइन 1800-180-1551 पर कॉल करें।`;
    } else if (currentLang === 'gu') {
      textToSpeak = `પ્રાદેશિક પાક ચેતવણી: રાજ્ય ${activeDistrictNode.stateName}, જિલ્લો ${activeDistrictNode.district}। પાક: ${localizedActiveWarning.cropName}। રોગ: ${localizedActiveWarning.diseaseName}। લક્ષણો: ${localizedActiveWarning.symptoms}। તાત્કાલિક સરકારી ઉપાય: ${localizedActiveWarning.recommendedAction}। ઓર્ગેનિક છંટકાવ: ${localizedActiveWarning.organicTreatment}। રસાયણ દવા: ${localizedActiveWarning.chemicalTreatment}। કિસાન હેલ્પલાઇન 1800-180-1551 પર સંપર્ક કરો।`;
    } else {
      textToSpeak = `Regional Outbreak Advisory for ${activeDistrictNode.stateName}, District ${activeDistrictNode.district}. Crop: ${localizedActiveWarning.cropName}. Pathology: ${localizedActiveWarning.diseaseName}. Symptoms: ${localizedActiveWarning.symptoms}. Recommended Government Action: ${localizedActiveWarning.recommendedAction}. Organic Protocol: ${localizedActiveWarning.organicTreatment}. Chemical Treatment: ${localizedActiveWarning.chemicalTreatment}. Free Kisan Helpline: 1800-180-1551.`;
    }

    speechService.speakScript(textToSpeak, currentLang, 'all', 0.85);
  };

  // Leaflet Map Initialization & Updates (Used when mapMode !== 'vector_offline')
  useEffect(() => {
    if (mapMode === 'vector_offline') {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.5, 78.5],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      const layerConfig = TILE_LAYERS[mapMode as keyof typeof TILE_LAYERS] || TILE_LAYERS.political;
      const tiles = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        maxZoom: layerConfig.maxZoom,
      }).addTo(map);

      tileLayerRef.current = tiles;
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      leafletMapRef.current = map;
    }

    const currentMap = leafletMapRef.current;
    const timer = setTimeout(() => {
      currentMap?.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [mapMode]);

  // Update Leaflet tile layer style
  useEffect(() => {
    if (mapMode === 'vector_offline') return;
    const map = leafletMapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const layerConfig = TILE_LAYERS[mapMode as keyof typeof TILE_LAYERS] || TILE_LAYERS.political;
    const tiles = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tiles;
    map.invalidateSize();
  }, [mapMode]);

  // Update State Boundary Polygon & Markers in Leaflet
  useEffect(() => {
    if (mapMode === 'vector_offline') return;
    const map = leafletMapRef.current;
    if (!map) return;

    polygonLayersRef.current.forEach((poly) => map.removeLayer(poly));
    polygonLayersRef.current = [];

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    if (scope === 'LOCAL_STATE') {
      const targetPolygon =
        stateBoundaryConfig?.geoPolygon ||
        getPoliticalState(activeStateName)?.geoPolygon;

      if (targetPolygon && targetPolygon.length > 0) {
        const poly = L.polygon(targetPolygon, {
          color: '#059669',
          weight: 2.5,
          opacity: 0.9,
          fillColor: '#10b981',
          fillOpacity: 0.08,
          dashArray: '4, 4',
        }).addTo(map);

        polygonLayersRef.current.push(poly);
        map.fitBounds(poly.getBounds(), { padding: [30, 30], maxZoom: 8 });
      } else {
        const centroid =
          STATE_CENTROIDS[activeStateName] ||
          getPoliticalState(activeStateName)?.center || [22.5, 78.5];
        map.setView(centroid, 6);
      }

      // Add district markers
      filteredDistrictNodes.forEach((node) => {
        const sev = getSeverityBadge(node.severity);
        const cropIcon = CROP_ICONS[node.crop] || '🌱';
        const localized = getLocalizedDiseaseWarning(node, currentLang);
        const localizedCrop = getLocalizedCropName(node.crop, currentLang);

        const customHtml = `
          <div class="custom-district-pulse-wrapper flex flex-col items-center cursor-pointer">
            <div class="relative flex items-center justify-center">
              <span class="absolute w-8 h-8 rounded-full animate-ping opacity-75" style="background-color: ${sev.ring};"></span>
              <div class="w-8 h-8 rounded-full bg-white shadow-md border-2 flex items-center justify-center relative z-10" style="border-color: ${sev.pin}; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
                <span class="text-sm select-none leading-none">${cropIcon}</span>
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white" style="background-color: ${sev.pin};"></span>
              </div>
              <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-[1px] relative z-0" style="border-t-color: ${sev.pin};"></div>
            </div>
            <div class="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white font-extrabold text-[9px] whitespace-nowrap shadow-xs pointer-events-none">
              ${node.name}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-district-marker',
          html: customHtml,
          iconSize: [32, 42],
          iconAnchor: [16, 32],
        });

        const marker = L.marker([node.coordinates.lat, node.coordinates.lng], { icon });
        marker.on('click', () => {
          setSelectedDistrictId(node.id);
        });

        marker.bindPopup(
          `<div style="padding: 6px 8px; font-family: inherit; font-size: 11px; max-width: 220px;">
            <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 2px;">
              📍 ${node.district} (${node.city})
            </div>
            <div style="font-weight: 700; color: #059669; font-size: 12px; margin-bottom: 4px;">
              ${cropIcon} ${localizedCrop}: ${localized.diseaseName}
            </div>
            <div style="display: inline-block; padding: 2px 6px; border-radius: 6px; background-color: ${sev.pin}; color: #ffffff; font-weight: 800; font-size: 9px; text-transform: uppercase;">
              ● ${sev.label}
            </div>
          </div>`,
          { offset: [0, -32], closeButton: true }
        );

        markersLayerRef.current?.addLayer(marker);
      });
    } else {
      // All-India overview
      map.setView([22.5, 78.5], 5);
      visibleAllIndiaAlerts.forEach((alert) => {
        if (!alert.coordinates.lat || !alert.coordinates.lng) return;
        const sev = getSeverityBadge(alert.severity);
        const cropIcon = CROP_ICONS[alert.crop] || '🌱';
        const localized = getLocalizedDiseaseWarning(alert, currentLang);
        const localizedCrop = getLocalizedCropName(alert.crop, currentLang);

        const customHtml = `
          <div class="custom-district-pulse-wrapper flex flex-col items-center cursor-pointer">
            <div class="relative flex items-center justify-center">
              <span class="absolute w-7 h-7 rounded-full animate-ping opacity-75" style="background-color: ${sev.ring};"></span>
              <div class="w-7 h-7 rounded-full bg-white shadow-md border-2 flex items-center justify-center relative z-10" style="border-color: ${sev.pin};">
                <span class="text-xs select-none leading-none">${cropIcon}</span>
                <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white" style="background-color: ${sev.pin};"></span>
              </div>
              <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] -mt-[1px] relative z-0" style="border-t-color: ${sev.pin};"></div>
            </div>
            <div class="mt-0.5 px-1 py-0.2 rounded bg-slate-900/90 text-white font-bold text-[8px] whitespace-nowrap shadow-xs pointer-events-none">
              ${alert.stateCode || alert.stateName}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-all-india-marker',
          html: customHtml,
          iconSize: [28, 36],
          iconAnchor: [14, 28],
        });

        const marker = L.marker([alert.coordinates.lat, alert.coordinates.lng], { icon });
        marker.on('click', () => {
          setSelectedDistrictId(alert.id);
          if (getStateBoundaryConfig(alert.stateName)) {
            handleSelectState(alert.stateName);
          }
        });

        markersLayerRef.current?.addLayer(marker);
      });
    }
  }, [
    mapMode,
    activeStateName,
    scope,
    stateBoundaryConfig,
    filteredDistrictNodes,
    visibleAllIndiaAlerts,
    currentLang,
  ]);

  return (
    <div className={`bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 ${className}`}>
      {/* 1. Official Government Header & Real-Time Sync Engine */}
      <div className="flex flex-col gap-4 pb-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs border border-emerald-200">
              <Globe2 className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-slate-900 leading-tight">
                  {outbreakUI.radarTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>{outbreakUI.govtDatasetBadge}</span>
                </span>
                {!isOnline ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <WifiOff className="w-3 h-3 text-amber-700" />
                    <span>{outbreakUI.offlineModeActiveBadge}</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    <span>{outbreakUI.onlineModeActiveBadge}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span>
                  {outbreakUI.govtCitation}
                </span>
                <span>•</span>
                <span className="text-slate-400">
                  {outbreakUI.lastUpdatedPrefix}: {formatSyncTimestamp(cacheData.lastSyncedAt)}
                </span>
              </p>
            </div>
          </div>

          {/* Sync Button: Fully active both Online & Offline! */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all cursor-pointer text-xs font-black flex items-center gap-2 shadow-2xs"
              title="Refresh / Re-check outbreak surveillance radar"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{isRefreshing ? outbreakUI.recheckingRadar : outbreakUI.liveRecheckBtn}</span>
            </button>
          </div>
        </div>

        {refreshSuccessMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{refreshSuccessMessage}</span>
          </div>
        )}

        {/* 2. Direct State Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{outbreakUI.selectStatePrefix}</span>
            </span>

            {POPULAR_STATES.map((st) => {
              const isSelected =
                scope === 'LOCAL_STATE' &&
                activeStateName.toLowerCase() === st.name.toLowerCase();
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => handleSelectState(st.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                      : 'bg-slate-100 hover:bg-slate-200/90 text-slate-700'
                  }`}
                >
                  <span>{st.icon}</span>
                  <span>{st.name}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setScope('ALL_INDIA');
                setSelectedDistrictId(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                scope === 'ALL_INDIA'
                  ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/30'
                  : 'bg-slate-100 hover:bg-slate-200/90 text-slate-700'
              }`}
            >
              <span>{outbreakUI.allIndiaOverview}</span>
              <span className="text-[10px] font-bold text-slate-300">({cacheData.alerts.length})</span>
            </button>
          </div>

          {/* Quick Dropdown for All 28 States & UTs */}
          <div className="flex items-center gap-1.5 text-xs">
            <label htmlFor="state-select-dropdown" className="text-slate-400 font-medium hidden sm:inline">
              {outbreakUI.otherStatesPrefix}
            </label>
            <select
              id="state-select-dropdown"
              value={activeStateName}
              onChange={(e) => handleSelectState(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer focus:outline-emerald-500"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st.code} value={st.name}>
                  {st.name} ({st.type === 'Union Territory' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Live Govt Disease Outbreak Directives & Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>{outbreakUI.liveEmergencyDirectivesTitle}</span>
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowGovtDirectives(!showGovtDirectives)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            {showGovtDirectives ? outbreakUI.hideDirectivesBtn : outbreakUI.viewDirectivesBtn}
          </button>
        </div>

        {showGovtDirectives && (
          <GovtDiseaseOutbreakAlerts
            selectedStateName={activeStateName}
            language={currentLang}
            onNavigateToDisease={onNavigateToDisease}
          />
        )}
      </div>

      {/* 4. Search & Crop Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70 p-2.5 rounded-2xl border border-slate-200/80">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ui.searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-500 font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-700 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Crop Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-bold shrink-0 mr-1 flex items-center gap-1 text-[11px]">
            <Layers className="w-3 h-3" />
            <span>{ui.cropFilterLabel}</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedCrop('ALL')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all shrink-0 cursor-pointer text-xs ${
              selectedCrop === 'ALL'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
            }`}
          >
            {ui.allCropsBtn}
          </button>
          {availableCrops.map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => setSelectedCrop(crop)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 text-xs ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
              }`}
            >
              <span>{CROP_ICONS[crop] || '🌱'}</span>
              <span>{getLocalizedCropName(crop, currentLang)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. MAIN SPLIT VIEW: Map on Left, Multi-lingual Farmer Advisory on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Map Container with Vector/Satellite/Street Switcher */}
        <div
          className={`bg-slate-50 rounded-3xl p-3 sm:p-4 border border-slate-200 flex flex-col items-center relative overflow-hidden shadow-2xs transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-3 sm:inset-6 z-50 bg-white/95 backdrop-blur-md shadow-2xl flex flex-col justify-between'
              : 'lg:col-span-6'
          }`}
        >
          {/* Map Controls Header */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold text-slate-800">
                {scope === 'LOCAL_STATE' ? `${activeStateName} Outbreak Radar` : 'All-India Surveillance'}
              </span>
            </div>

            {/* Map Mode Selector: Offline Vector SVG vs Online Tiles */}
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setMapMode('vector_offline')}
                className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors flex items-center gap-1 ${
                  mapMode === 'vector_offline'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="100% Offline Vector State Radar (Zero Network Required)"
              >
                <span>🗺️ {outbreakUI.vectorRadarBtn}</span>
                <span className="text-[9px] px-1 rounded bg-black/20 text-white">0 KB</span>
              </button>
              <button
                type="button"
                onClick={() => setMapMode('political')}
                className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                  mapMode === 'political'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Political Street Map"
              >
                Street
              </button>
              <button
                type="button"
                onClick={() => setMapMode('satellite')}
                className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                  mapMode === 'satellite'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Satellite Imagery"
              >
                Satellite
              </button>
            </div>
          </div>

          {/* Map Interactive Viewport */}
          <div
            className={`w-full rounded-2xl overflow-hidden relative border border-slate-200 shadow-inner z-0 bg-slate-100 ${
              isFullscreen ? 'flex-1 min-h-[400px]' : 'h-[440px] sm:h-[490px]'
            }`}
          >
            {mapMode === 'vector_offline' ? (
              /* 100% OFFLINE VECTOR SVG MAP: Zero Tile Requests, Instant Render */
              <div className="w-full h-full relative bg-slate-950 flex items-center justify-center p-3 select-none">
                <svg
                  viewBox={stateBoundaryConfig?.viewBox || '0 0 600 520'}
                  className="w-full h-full max-h-full filter drop-shadow-md"
                >
                  <defs>
                    <radialGradient id="stateRadGrad" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
                    </radialGradient>
                    <filter id="glowFilter">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Base State Boundary Path */}
                  <path
                    d={stateBoundaryConfig?.boundarySvgPath || 'M 100,100 L 500,100 L 500,450 L 100,450 Z'}
                    fill="url(#stateRadGrad)"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {/* Sub-Regions if available */}
                  {stateBoundaryConfig?.subRegions?.map((sr) => (
                    <path
                      key={sr.id}
                      d={sr.svgPath}
                      fill={sr.fillColor}
                      fillOpacity="0.15"
                      stroke={sr.strokeColor}
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                  ))}

                  {/* District Outbreak Hotspots */}
                  {filteredDistrictNodes.map((node) => {
                    const isSelected = activeDistrictNode?.id === node.id;
                    const sev = getSeverityBadge(node.severity);
                    const cropIcon = CROP_ICONS[node.crop] || '🌱';
                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer transition-transform hover:scale-110"
                        onClick={() => setSelectedDistrictId(node.id)}
                      >
                        {/* Animated pulsing risk wave */}
                        <circle
                          cx={node.coordinates.x}
                          cy={node.coordinates.y}
                          r={isSelected ? '26' : '18'}
                          fill={sev.pin}
                          fillOpacity="0.25"
                          className="animate-ping"
                        />
                        <circle
                          cx={node.coordinates.x}
                          cy={node.coordinates.y}
                          r={isSelected ? '16' : '12'}
                          fill="#ffffff"
                          stroke={sev.pin}
                          strokeWidth={isSelected ? '3.5' : '2'}
                          filter="url(#glowFilter)"
                        />
                        <text
                          x={node.coordinates.x}
                          y={node.coordinates.y + 4}
                          fontSize="11"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          {cropIcon}
                        </text>
                        {/* District Name Label */}
                        <rect
                          x={node.coordinates.x - 30}
                          y={node.coordinates.y + 16}
                          width="60"
                          height="14"
                          rx="4"
                          fill="#0f172a"
                          fillOpacity="0.85"
                        />
                        <text
                          x={node.coordinates.x}
                          y={node.coordinates.y + 26}
                          fontSize="8.5"
                          fontWeight="bold"
                          fill="#ffffff"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Offline Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-black backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{outbreakUI.offlineVectorRadarActive}</span>
                </div>
              </div>
            ) : (
              /* ONLINE LEAFLET MAP */
              <div ref={mapContainerRef} className="w-full h-full bg-slate-100" />
            )}

            {/* Fullscreen Expand/Collapse Button */}
            <div className="absolute top-3 right-3 z-400">
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded-xl bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center cursor-pointer transition-all"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-lingual Farmer Advisory & Government Action Plan */}
        <div className="lg:col-span-6 space-y-4">
          {activeDistrictNode && localizedActiveWarning ? (
            <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                        getSeverityBadge(activeDistrictNode.severity).bg
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          getSeverityBadge(activeDistrictNode.severity).dot
                        }`}
                      />
                      {getSeverityBadge(activeDistrictNode.severity).label}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200">
                      <span>{CROP_ICONS[activeDistrictNode.crop] || '🌱'}</span>
                      <span>{localizedActiveWarning.cropName}</span>
                    </span>
                  </div>

                  {/* Voice Readout Button */}
                  <button
                    type="button"
                    onClick={handleSpeakActiveAdvisory}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isPlayingAudio
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>{outbreakUI.stopVoice}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{outbreakUI.listenToAdvisory}</span>
                      </>
                    )}
                  </button>
                </div>

                <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {localizedActiveWarning.diseaseName}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {activeDistrictNode.stateName} • {activeDistrictNode.district} ({activeDistrictNode.city})
                  </span>
                </div>
              </div>

              {/* Weather Trigger */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 text-xs space-y-1.5">
                <div className="font-black text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{outbreakUI.imdAgrometWeatherTrigger}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-slate-600 font-bold">
                  <span>🌡️ {activeDistrictNode.weatherTrigger.tempRange}</span>
                  <span>💧 {activeDistrictNode.weatherTrigger.humidity}</span>
                  <span>🌧️ {activeDistrictNode.weatherTrigger.rainfallStatus}</span>
                </div>
                <p className="text-[11.5px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                  {activeDistrictNode.weatherTrigger.triggerSummary}
                </p>
              </div>

              {/* Visible Symptoms */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 text-xs space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <span>🔍</span>
                  <span>{ui.symptomsTitle}</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {localizedActiveWarning.symptoms}
                </p>
              </div>

              {/* Government Advisory & Treatments */}
              <div className="bg-emerald-50/90 rounded-2xl p-4 border border-emerald-200 text-xs space-y-2.5">
                <div className="font-black text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{ui.immediateActionTitle}</span>
                </div>
                <p className="text-emerald-950 font-medium leading-relaxed">
                  {localizedActiveWarning.recommendedAction}
                </p>

                {localizedActiveWarning.organicTreatment && (
                  <div className="text-[11.5px] text-emerald-950 pt-2 border-t border-emerald-200/80">
                    <span className="font-black text-emerald-800">{ui.organicSprayLabel} </span>
                    <span className="font-medium">{localizedActiveWarning.organicTreatment}</span>
                  </div>
                )}

                {localizedActiveWarning.chemicalTreatment && (
                  <div className="text-[11.5px] text-emerald-950 pt-1.5 border-t border-emerald-200/80">
                    <span className="font-black text-emerald-800">{ui.chemicalMedicineLabel} </span>
                    <span className="font-medium">{localizedActiveWarning.chemicalTreatment}</span>
                  </div>
                )}
              </div>

              {/* Helpline & Disease Guide */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href={`tel:${(activeDistrictNode.kisanHelpline || OFFICIAL_KISAN_HELPLINE).replace(/[^0-9]/g, '')}`}
                  className="flex-1 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{outbreakUI.callHelplineWithNum}</span>
                </a>

                {onNavigateToDisease && activeDistrictNode.className && (
                  <button
                    type="button"
                    onClick={() => onNavigateToDisease(activeDistrictNode.className)}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>{ui.diseaseGuideBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50/80 rounded-3xl border border-dashed border-slate-200 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">{ui.noAlertsFound}</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {outbreakUI.noAlertsFound}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCrop('ALL');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
              >
                <span>{ui.resetFilterBtn}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. ALL DISEASES GOING LIVE IN THIS PARTICULAR STATE (ACCORDING TO GOVT DATASET) */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{outbreakUI.allDiseasesInStateTitle(activeStateName, liveStateDiseases.length)}</span>
            </h4>
            <p className="text-xs text-slate-500">
              {outbreakUI.verifiedEpidemiologicalSub}
            </p>
          </div>

          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 self-start sm:self-auto">
            {outbreakUI.govtDatasetCitationBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveStateDiseases.map((alert) => {
            const sev = getSeverityBadge(alert.severity);
            const cropIcon = CROP_ICONS[alert.crop] || '🌱';
            const isSelected = activeDistrictNode?.id === alert.id || selectedDistrictId === alert.id;

            return (
              <div
                key={alert.id}
                onClick={() => {
                  setSelectedDistrictId(alert.id);
                  if (leafletMapRef.current && alert.coordinates.lat && alert.coordinates.lng) {
                    leafletMapRef.current.panTo([alert.coordinates.lat, alert.coordinates.lng], { animate: true });
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${sev.badge}`}>
                    {sev.shortLabel}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {alert.icarAdvisoryCode}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span>{cropIcon}</span>
                    <span>{alert.crop}:</span>
                    <span className="text-emerald-700">{alert.diseaseName}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{outbreakUI.affectedDistrictsPrefix} {alert.district}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {alert.recommendedAction}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400 font-medium">
                    Acreage: {alert.affectedAcreageEstimate || 'Monitored Zone'}
                  </span>
                  <span className="font-extrabold text-emerald-700 hover:underline">
                    {outbreakUI.inspectPrompt} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocalDiseaseAlertsMap;
