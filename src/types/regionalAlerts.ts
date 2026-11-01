import { LanguageCode } from '../types';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'WATCH' | 'MODERATE' | 'MONITORED';

export interface WeatherTrigger {
  tempRange: string;
  humidity: string;
  rainfallStatus: string;
  triggerSummary: string;
}

export interface RegionalDiseaseAlert {
  id: string;
  stateCode: string;
  stateName: string;
  zoneId: string;
  zoneName: string;
  district: string;
  coordinates: {
    x: number;
    y: number;
    lat?: number;
    lng?: number;
  };
  crop: string;
  cropKey: string;
  diseaseName: string;
  className: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Complex';
  severity: AlertSeverity;
  riskScore: number; // 0 to 100
  reportedDate: string;
  validUntil: string;
  weatherTrigger: WeatherTrigger;
  symptomsPrompt: string;
  symptoms?: string;
  recommendedAction: string;
  organicTreatment: string;
  chemicalTreatment: string;
  icarAdvisoryCode: string;
  govtSource?: string;
  govtBulletinNumber?: string;
  emergencyDirective?: string;
  quarantineProtocol?: string;
  subsidizedTreatment?: string;
  outbreakStatus?: 'OUTBREAK_EPICENTER' | 'RAPID_SPREAD' | 'UNDER_CONTAINMENT' | 'SEASONAL_SURVEILLANCE';
  affectedAcreageEstimate?: string;
  isUserScanCorroborated?: boolean;
  districtNames?: string[];
  kisanHelpline?: string;
}

export interface GovtEmergencyOutbreakAlert {
  id: string;
  bulletinId: string;
  issuingAuthority: string;
  issuingPortalUrl: string;
  issuingDate: string;
  urgencyLevel: 'RED_ALERT' | 'ORANGE_ADVISORY' | 'YELLOW_WATCH';
  stateName: string;
  stateCode: string;
  affectedDistricts: string[];
  crop: string;
  diseaseName: string;
  headline: string;
  officialDirective: string;
  mandatoryActions: string[];
  subsidizedSupplies: string;
  kisanCallCenterNumber: string;
  verifiedOfficial: boolean;
  validThrough: string;
}

export interface CachedAlertsData {
  version: string;
  lastSyncedAt: number;
  isOfflineCache: boolean;
  offlineSyncEngineStatus?: string;
  alerts: RegionalDiseaseAlert[];
  emergencyGovtAlerts?: GovtEmergencyOutbreakAlert[];
  stateSummary: {
    stateName: string;
    totalAlerts: number;
    criticalCount: number;
    highCount: number;
    watchCount: number;
    primaryThreat: string;
  };
}

export interface AlertFilterOptions {
  scope: 'LOCAL_STATE' | 'ALL_INDIA';
  severity: 'ALL' | AlertSeverity;
  crop: string;
  searchQuery: string;
}
