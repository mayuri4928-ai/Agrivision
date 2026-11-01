import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { deleteScanRecord, getHistoryAnalytics } from '../../services/storage';
import { ScanRecord, DiagnosisResult } from '../../types';
import { PLANT_CLASSES, CROPS_LIST } from '../../data/classes';
import { DISEASES_DATABASE } from '../../data/diseases';
import { getLocalizedDashboard } from '../../data/localizedDashboard';
import { RegionalDistributionHeatMap } from '../RegionalDistributionHeatMap';
import { LocalDiseaseAlertsMap } from '../LocalDiseaseAlertsMap';
import { getCachedAlertsData } from '../../services/regionalAlertService';
import { INDIAN_STATES } from '../../data/states';
import { getLocalizedStateAdvisory } from '../../data/localizedCropWarnings';
import {
  getLocalizedCropName,
  getLocalizedPathogenType,
  getLocalizedDiseaseName,
  getLocalizedDiseaseDetail,
} from '../../data/localizedCropsAndDiseases';
import {
  Sprout,
  ScanLine,
  Layers,
  Search,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  PhoneCall,
  FileSpreadsheet,
  Cpu,
  FlaskConical,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Flame,
  Calendar,
} from 'lucide-react';

type DashboardTab = 'overview' | 'scans' | 'risk' | 'crops' | 'engine' | 'helpline';

function getLocalizedCropDiseaseComplex(cropName: string, lang: string): string {
  const c = (cropName || '').toLowerCase();
  if (c.includes('tomato')) {
    switch (lang) {
      case 'hi': return 'अगेती व पछेती झुलसा, लीफ कर्ल';
      case 'gu': return 'આગોતરો-પાછોતરો સુકારો, પર્ણ વલન';
      case 'mr': return 'करपा व पर्णगुच्छ विषाणू';
      case 'bn': return 'আগেভাগে ও নাবি ধ্বসা, পাতা কোঁকড়ানো';
      case 'te': return 'ముందస్తు, ఆలస్యపు తెగులు, ఆకు ముడత';
      case 'ta': return 'முன் மற்றும் பின் கருகல், இலைச்சுருள்';
      case 'kn': return 'ಮುಂಚಿನ ಮತ್ತು ತಡವಾದ ಮುರಟು, ಎಲೆ ಸುರುಟು';
      case 'ml': return 'ഏർലി-ലേറ്റ് ബ്ലൈറ്റ്, ഇലച്ചുരുൾ';
      case 'pa': return 'ਅਗੇਤਾ ਤੇ ਪਛੇਤਾ ਝੁਲਸ, ਪੱਤਾ ਮਰੋੜ';
      case 'or': return 'ଆଗୁଆ ଓ ପଛୁଆ ଝାଉଁଳା, ପତ୍ର ମୋଡ଼ା';
      case 'as': return 'আগতীয়া আৰু শেহতীয়া মৰহি যোৱা, পাত কোঁচোৱা';
      default: return 'Early & Late Blight, Leaf Curl';
    }
  }
  if (c.includes('potato')) {
    switch (lang) {
      case 'hi': return 'पछेती झुलसा (फाइटोफ्थोरा)';
      case 'gu': return 'પાછોતરો સુકારો (ફાઇટોફ્થોરા)';
      case 'mr': return 'उशिरा येणारा करपा';
      case 'bn': return 'নাবি ধ্বসা রোগ';
      case 'te': return 'ఆలస్యపు తెగులు (ఫైటోఫ్తోరా)';
      case 'ta': return 'பிற்கால கருகல் நோய்';
      case 'kn': return 'ತಡವಾದ ಕರಕು ರೋಗ';
      case 'ml': return 'ലേറ്റ് ബ്ലൈറ്റ്';
      case 'pa': return 'ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ';
      case 'or': return 'ପଛୁଆ ଝାଉଁଳା ରୋଗ';
      case 'as': return 'শেহতীয়া মৰহি যোৱা বেমাৰ';
      default: return 'Late Blight (Phytophthora)';
    }
  }
  if (c.includes('corn') || c.includes('maize')) {
    switch (lang) {
      case 'hi': return 'पत्ती झुलसा, साधारण रतुआ';
      case 'gu': return 'પાનનો સુકારો, સામાન્ય ગેરુ';
      case 'mr': return 'मका पानांवरील करपा व तांबेरा';
      case 'bn': return 'পাতা ধ্বসা ও সাধারণ মরিচা';
      case 'te': return 'ఆకు మాడు తెగులు, తుప్పు తెగులు';
      case 'ta': return 'இலை கருகல் மற்றும் துரு நோய்';
      case 'kn': return 'ಎಲೆ ಮುರಟು ಮತ್ತು ತುಕ್ಕು ರೋಗ';
      case 'ml': return 'ഇല ബ്ലൈറ്റും തുരുമ്പും';
      case 'pa': return 'ਪੱਤਾ ਝੁਲਸ ਤੇ ਰਤੂਆ';
      case 'or': return 'ପତ୍ର ଝାଉଁଳା ଓ କଳଙ୍କୀ';
      case 'as': return 'পাতৰ মৰহি যোৱা আৰু মামৰে ধৰা';
      default: return 'Northern Leaf Blight, Common Rust';
    }
  }
  if (c.includes('apple')) {
    switch (lang) {
      case 'hi': return 'सेब का स्केब, ब्लैक रॉट';
      case 'gu': return 'સફરજન સ્કેબ, કાળો સડો';
      case 'mr': return 'सफरचंद स्कॅब व काळी सड';
      case 'bn': return 'আপেল স্ক্যাব ও কালো পচন';
      case 'te': return 'ఆపిల్ స్కాబ్, బ్లాక్ రాట్';
      case 'ta': return 'ஆப்பிள் ஸ்கேப், கரு அழுகல்';
      case 'kn': return 'ಸೇಬು ಸ್ಕ್ಯಾಬ್ ಮತ್ತು ಕಪ್ಪು ಕೊಳೆತ';
      case 'ml': return 'ആപ്പിൾ സ്കാബും കറുപ്പ് ചീയലും';
      case 'pa': return 'ਸੇਬ ਦਾ ਸਕੈਬ ਤੇ ਕਾਲੀ ਸੜਨ';
      case 'or': return 'ସେଓ ସ୍କାବ୍ ଓ କଳା ସଢ଼ା';
      case 'as': return 'আপেল স্কেব আৰু ক’লা পচন';
      default: return 'Apple Scab, Black Rot';
    }
  }
  if (c.includes('grape')) {
    switch (lang) {
      case 'hi': return 'ब्लैक रॉट, डाउनी मिल्ड्यू';
      case 'gu': return 'કાળો સડો, તળછારો (ડાઉની મિલ્ડ્યુ)';
      case 'mr': return 'काळी सड व केवडा (डाउनी मिल्ड्यू)';
      case 'bn': return 'কালো পচন ও ডাউনি মিলডিউ';
      case 'te': return 'బ్లాక్ రాట్, బూడిద తెగులు';
      case 'ta': return 'கரு அழுகல், கீழ்நோக்கிய பூஞ்சை';
      case 'kn': return 'ಕಪ್ಪು ಕೊಳೆತ, ಡೌನಿ ಮಿಲ್ಡ್ಯೂ';
      case 'ml': return 'കറുപ്പ് ചീയലും അടി പൂപ്പലും';
      case 'pa': return 'ਕਾਲੀ ਸੜਨ ਤੇ ਉੱਲੀ ਰੋਗ';
      case 'or': return 'କଳା ସଢ଼ା ଓ ଡାଉନି ମିଲ୍‌ଡ୍ୟୁ';
      case 'as': return 'ক’লা পচন আৰু ডাউনি মিলডিউ';
      default: return 'Black Rot, Downy Mildew';
    }
  }
  if (c.includes('rice') || c.includes('paddy')) {
    switch (lang) {
      case 'hi': return 'झुलसा (ब्लास्ट), भूरा धब्बा, जीवाणु झुलसा';
      case 'gu': return 'ધરૂ સુકારો (બ્લાસ્ટ), કથ્થઈ ટપકાં, બેક્ટેરિયલ સુકારો';
      case 'mr': return 'करपा (ब्लास्ट), तपकिरी ठिपके, जिवाणू करपा';
      case 'bn': return 'ধানের ব্লাস্ট, বাদামি দাগ ও ব্যাকটেরিয়াল ব্লাইট';
      case 'te': return 'వరి అగ్గితెగులు, గోధుమ మచ్చ, బాక్టీరియా తెగులు';
      case 'ta': return 'குலை நோய் (பிளாஸ்ட்), பழுப்பு புள்ளி நோய்';
      case 'kn': return 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ, ಕಂದು ಚುಕ್ಕೆ ರೋಗ';
      case 'ml': return 'നെല്ലിന്റെ ബ്ലാസ്റ്റ്, തവിട്ടുപുള്ളി രോഗം';
      case 'pa': return 'ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਤੇ ਭੂਰੇ ਧੱਬੇ';
      case 'or': return 'ଧାନ ବ୍ଲାଷ୍ଟ ଓ ବାଦାମୀ ଦାଗ';
      case 'as': return 'ধানৰ ব্লাষ্ট আৰু মুগা দাগ';
      default: return 'Leaf Blast, Brown Spot, Bacterial Blight';
    }
  }
  if (c.includes('wheat')) {
    switch (lang) {
      case 'hi': return 'पीला रतुआ, भूरा रतुआ, चूर्णिल आसिता';
      case 'gu': return 'પીળો ગેરુ, કથ્થઈ ગેરુ, છારો';
      case 'mr': return 'पिवळा तांबेरा, तांबडा तांबेरा, भुरी';
      case 'bn': return 'হলুদ মরিচা, বাদামি মরিচা ও পাউডারি মিলডিউ';
      case 'te': return 'పసుపు తుప్పు, గోధుమ తుప్పు, బూడిద తెగులు';
      case 'ta': return 'மஞ்சள் துரு, பழுப்பு துரு நோய்';
      case 'kn': return 'ಹಳದಿ ತುಕ್ಕು, ಕಂದು ತುಕ್ಕು ರೋಗ';
      case 'ml': return 'മഞ്ഞ തുരുമ്പ്, തവിട്ട് തുരുമ്പ്';
      case 'pa': return 'ਪੀਲਾ ਰਤੂਆ ਤੇ ਭੂਰਾ ਰਤੂਆ';
      case 'or': return 'ହଳଦିଆ କଳଙ୍କୀ ଓ ବାଦାମୀ କଳଙ୍କୀ';
      case 'as': return 'হালধীয়া মামৰ আৰু মুগা মামৰ';
      default: return 'Yellow Rust, Brown Rust, Powdery Mildew';
    }
  }
  if (c.includes('cotton')) {
    switch (lang) {
      case 'hi': return 'जीवाणु झुलसा, पत्ता मरोड़ विषाणु (CLCuV)';
      case 'gu': return 'બેક્ટેરિયલ સુકારો, પાન વળવાનો વાયરસ';
      case 'mr': return 'जिवाणू करपा, पाने आकसणारा विषाणू';
      case 'bn': return 'জীবাণুজনিত ধ্বসা ও পাতা কোঁকড়ানো ভাইরাস';
      case 'te': return 'బాక్టీరియా మచ్చ తెగులు, ఆకు ముడత వైరస్';
      case 'ta': return 'பாக்டீரியா கருகல், இலைச்சுருள் வைரஸ்';
      case 'kn': return 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕರಕು, ಎಲೆ ಸುರುಟು ವೈರಸ್';
      case 'ml': return 'ബാക്ടീരിയൽ ബ്ലൈറ്റ്, ഇലച്ചുരുൾ വൈറസ്';
      case 'pa': return 'ਜੀਵਾਣੂ ਝੁਲਸ ਤੇ ਪੱਤਾ ਮਰੋੜ ਵਾਇਰਸ';
      case 'or': return 'ଜୀବାଣୁ ଝାଉଁଳା ଓ ପତ୍ର ମୋଡ଼ା ଭୂତାଣୁ';
      case 'as': return 'বেক্টেৰিয়াজনিত মৰহি যোৱা আৰু পাত কোঁচোৱা ভাইৰাছ';
      default: return 'Bacterial Blight, Leaf Curl Virus';
    }
  }
  if (c.includes('sugarcane')) {
    switch (lang) {
      case 'hi': return 'लाल सड़न (रेड रॉट), कंडुआ (स्मट)';
      case 'gu': return 'લાલ સડો (રેડ રોટ), કાજળિયો (સ્મટ)';
      case 'mr': return 'ऊस तांबेरा, काणी (स्मट), लाल सड';
      case 'bn': return 'আখের লাল পচন ও স্মাট';
      case 'te': return 'ఎర్ర కుళ్ళు తెగులు, కాటుక తెగులు';
      case 'ta': return 'செவ்வழுகல் நோய், கரிப்பூட்டை நோய்';
      case 'kn': return 'ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆತ, ಮಸಿ ರೋಗ';
      case 'ml': return 'ചുവപ്പ് ചീയലും കരിമ്പൂപ്പും';
      case 'pa': return 'ਗੰਨੇ ਦੀ ਲਾਲ ਸੜਨ ਤੇ ਕਾਂਗਿਆਰੀ';
      case 'or': return 'ଆଖୁ ନାଲି ସଢ଼ା ଓ କଳା ପୋଡ଼ିଆ';
      case 'as': return 'কুঁহিয়াৰৰ ৰঙা পচন আৰু স্মাট';
      default: return 'Red Rot, Smut';
    }
  }
  switch (lang) {
    case 'hi': return 'पत्ती धब्बा व फफूंद रोग';
    case 'gu': return 'પાનના ટપકાં અને ફૂગ રોગ';
    case 'mr': return 'पानावरील ठिपके व बुरशी रोग';
    case 'bn': return 'পাতার দাগ ও ছত্রাকজনিত রোগ';
    case 'te': return 'ఆకు మచ్చలు, శిలీంధ్ర తెగుళ్లు';
    case 'ta': return 'இலைப்புள்ளி மற்றும் பூஞ்சை நோய்';
    case 'kn': return 'ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗ';
    case 'ml': return 'ഇലപ്പുള്ളിയും ഫംഗസ് ബാധയും';
    case 'pa': return 'ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ ਤੇ ਉੱਲੀ ਰੋਗ';
    case 'or': return 'ପତ୍ର ଦାଗ ଓ କବକ ରୋଗ';
    case 'as': return 'পাতৰ দাগ আৰু ভেঁকুৰজনিত বেমাৰ';
    default: return 'Foliar Spot & Mildew Complex';
  }
}

interface DashboardPageProps {
  onOpenStateModal?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenStateModal }) => {
  const {
    language,
    isOnline,
    setActiveTab,
    history,
    refreshHistory,
    selectedState,
    setSelectedState,
    modelStatus,
    setCurrentResult,
    setCurrentImage,
  } = useApp();

  const [activeTabId, setActiveTabId] = useState<DashboardTab>('overview');

  // Localized dictionary for current language
  const d = useMemo(() => getLocalizedDashboard(language), [language]);

  // Cached regional disease alerts for current state
  const regionalAlertsData = useMemo(
    () => getCachedAlertsData(selectedState.name),
    [selectedState.name]
  );

  // Search and filter states for Scans tab
  const [scanSearch, setScanSearch] = useState('');
  const [scanFilter, setScanFilter] = useState<'ALL' | 'HEALTHY' | 'DISEASED'>('ALL');

  // Search and filter states for Crop & Disease catalog tab
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCropFilter, setCatalogCropFilter] = useState<string>('ALL');
  const [catalogPathogenFilter, setCatalogPathogenFilter] = useState<'ALL' | 'Fungal' | 'Bacterial' | 'Viral' | 'Healthy'>('ALL');

  // Disease radar view mode: live outbreak map vs seasonal forecast
  const [radarViewMode, setRadarViewMode] = useState<'ALERTS_MAP' | 'SEASONAL_FORECAST'>('ALERTS_MAP');

  // Calculated analytics from real user history
  const analytics = useMemo(() => getHistoryAnalytics(), [history]);

  // Percentage of healthy scans
  const healthRate = useMemo(() => {
    if (analytics.total === 0) return 100;
    return Math.round((analytics.healthyCount / analytics.total) * 100);
  }, [analytics]);

  // Filtered scans for My Field Scans tab
  const filteredScans = useMemo(() => {
    return history.filter((item) => {
      const cropLocalized = getLocalizedCropName(item.crop, language).toLowerCase();
      const diseaseLocalized = (getLocalizedDiseaseName(item.className, language) || item.disease).toLowerCase();
      const searchLower = scanSearch.toLowerCase();

      const matchesText =
        item.crop.toLowerCase().includes(searchLower) ||
        cropLocalized.includes(searchLower) ||
        item.disease.toLowerCase().includes(searchLower) ||
        diseaseLocalized.includes(searchLower) ||
        (item.stateName && item.stateName.toLowerCase().includes(searchLower));

      if (!matchesText) return false;

      if (scanFilter === 'HEALTHY') return item.isHealthy;
      if (scanFilter === 'DISEASED') return !item.isHealthy;
      return true;
    });
  }, [history, scanSearch, scanFilter, language]);

  // Filtered diseases for Crop & Disease tab
  const filteredClasses = useMemo(() => {
    return PLANT_CLASSES.filter((cls) => {
      const detail = DISEASES_DATABASE[cls.className];
      const pathogen = detail?.pathogenType || (cls.isHealthy ? 'Healthy' : 'Fungal');
      const cropLocalized = getLocalizedCropName(cls.crop, language).toLowerCase();
      const diseaseLocalized = (getLocalizedDiseaseName(cls.className, language) || cls.disease).toLowerCase();
      const searchLower = catalogSearch.toLowerCase();

      const matchesText =
        cls.crop.toLowerCase().includes(searchLower) ||
        cropLocalized.includes(searchLower) ||
        cls.disease.toLowerCase().includes(searchLower) ||
        diseaseLocalized.includes(searchLower) ||
        (detail?.scientificName && detail.scientificName.toLowerCase().includes(searchLower));

      if (!matchesText) return false;

      if (catalogCropFilter !== 'ALL' && cls.cropId !== catalogCropFilter) return false;

      if (catalogPathogenFilter !== 'ALL') {
        if (catalogPathogenFilter === 'Healthy' && !cls.isHealthy) return false;
        if (catalogPathogenFilter !== 'Healthy' && pathogen !== catalogPathogenFilter) return false;
      }

      return true;
    });
  }, [catalogSearch, catalogCropFilter, catalogPathogenFilter, language]);

  // Open full diagnostic report from a scan record
  const handleOpenScan = (record: ScanRecord) => {
    const diseaseDetail = DISEASES_DATABASE[record.className] || {
      className: record.className,
      crop: record.crop,
      disease: record.disease,
      isHealthy: record.isHealthy,
      simpleDescription: `Foliage condition affecting ${record.crop}: ${record.disease}.`,
      visibleSymptoms: ['Visible discoloration, lesions, or curling on the leaf surface.'],
      generalPrevention: ['Ensure adequate plant spacing and balanced drip irrigation.'],
      recommendedNextSteps: ['Monitor disease progression and follow ICAR state advisory.'],
      expertHelpWarning: 'Consult local Krishi Vigyan Kendra (KVK) if symptoms escalate across >15% of plants.',
    };

    const reconResult: DiagnosisResult = {
      id: record.id,
      timestamp: record.timestamp,
      crop: record.crop,
      disease: record.disease,
      className: record.className,
      isHealthy: record.isHealthy,
      confidence: record.confidence,
      confidenceCategory: record.confidence >= 90 ? 'HIGH' : record.confidence >= 70 ? 'MODERATE' : 'LOW',
      topAlternatives: [],
      diseaseDetail,
      inferenceTimeMs: record.inferenceTimeMs || 34,
      modelArchitecture: 'MobileNetV2 (Inverted Residuals)',
    };

    setCurrentResult(reconResult);
    setCurrentImage(record.thumbnailUrl);
    setActiveTab('results');
  };

  // Delete single scan
  const handleDeleteScan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteScanRecord(id);
    refreshHistory();
  };

  // Export scan history to CSV
  const handleExportCSV = () => {
    if (history.length === 0) {
      return;
    }

    const headers = ['Scan ID', 'Date', 'Time', 'Crop', 'Disease Condition', 'Health Status', 'Confidence (%)', 'State Location', 'Inference Latency (ms)'];
    const rows = history.map((record) => {
      const dateObj = new Date(record.timestamp);
      return [
        `"${record.id}"`,
        `"${dateObj.toLocaleDateString()}"`,
        `"${dateObj.toLocaleTimeString()}"`,
        `"${getLocalizedCropName(record.crop, language)}"`,
        `"${getLocalizedDiseaseName(record.className, language) || record.disease}"`,
        `"${record.isHealthy ? d.statusHealthy : d.statusDiseased}"`,
        record.confidencePercentage || Math.round(record.confidence),
        `"${record.stateName || selectedState.name}"`,
        record.inferenceTimeMs || 34,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent([headers.join(','), ...rows].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `agrivision_field_scans_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export scan history to JSON
  const handleExportJSON = () => {
    if (history.length === 0) {
      return;
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `agrivision_field_scans_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navTabs: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'overview', label: d.tabOverview, icon: Layers },
    { id: 'scans', label: d.tabScans, icon: ScanLine, count: history.length },
    { id: 'risk', label: d.tabRisk, icon: Flame, count: regionalAlertsData.stateSummary.totalAlerts },
    { id: 'crops', label: d.tabCrops, icon: Sprout, count: PLANT_CLASSES.length },
    { id: 'engine', label: d.tabEngine, icon: Cpu },
    { id: 'helpline', label: d.tabHelpline, icon: PhoneCall },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Main Header & Mission Statement */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 shrink-0">
              <Sprout className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {d.title}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {d.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {d.desc}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-slate-800">{selectedState.name}</span>
                  <span className="text-slate-400">({selectedState.agroClimaticZone})</span>
                  {onOpenStateModal && (
                    <button
                      onClick={onOpenStateModal}
                      className="ml-1 text-emerald-700 hover:text-emerald-800 underline font-semibold text-[11px]"
                    >
                      {d.changeState}
                    </button>
                  )}
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 font-bold">
                    {modelStatus.isReady ? d.modelReady : d.modelInit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto shrink-0">
            <button
              id="dashboard-btn-new-scan"
              onClick={() => setActiveTab('analyze')}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <ScanLine className="w-4 h-4" />
              <span>{d.newScan}</span>
            </button>
            <button
              id="dashboard-btn-test-lab"
              onClick={() => setActiveTab('tests')}
              className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>{d.testLab}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              id={`dash-tab-${tab.id}`}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. TAB VIEW: OVERVIEW */}
      {activeTabId === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric KPI Cards Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Total Field Scans */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">{d.kpiScansLogged}</span>
                <ScanLine className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">{analytics.total}</div>
              <p className="text-[11px] text-slate-500 mt-1">
                {analytics.total > 0 ? d.kpiStoredLocally : d.kpiNoScansYet}
              </p>
            </div>

            {/* KPI 2: Foliage Health Rate */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">{d.kpiHealthIndex}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-600">{healthRate}%</div>
              <p className="text-[11px] text-slate-500 mt-1">
                {d.kpiHealthyInfected(analytics.healthyCount, analytics.diseasedCount)}
              </p>
            </div>

            {/* KPI 3: Most Scanned Crop */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">{d.kpiTopCrop}</span>
                <Sprout className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                {analytics.mostScannedCrop !== 'None'
                  ? getLocalizedCropName(analytics.mostScannedCrop, language)
                  : d.kpiNone}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{d.kpiPrimaryCrop}</p>
            </div>

            {/* KPI 4: Primary Threat Condition */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">{d.kpiIdentifiedCondition}</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-700 truncate">
                {analytics.frequentDisease !== 'None'
                  ? (getLocalizedDiseaseName(analytics.frequentDisease, language) || analytics.frequentDisease)
                  : d.kpiNone}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{d.kpiFrequentPathogen}</p>
            </div>
          </div>

          {/* Regional Outbreak Alert & Agro-Climatic Advisory */}
          <div className="bg-gradient-to-r from-amber-50 via-white to-emerald-50 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      {d.advisoryTitle(selectedState.name)}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {d.activeAlert}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-3xl">
                    {getLocalizedStateAdvisory(selectedState.name, selectedState.stateAdvisoryNotes, language)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                    <span className="font-bold text-slate-700">{d.majorCropsMonitored(selectedState.name)}</span>
                    {selectedState.majorCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold"
                      >
                        {getLocalizedCropName(crop, language)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href={`tel:${selectedState.kisanHelpline.split('/')[0].trim()}`}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{d.dialKvk}</span>
                </a>
                <button
                  onClick={() => setActiveTabId('risk')}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{d.viewRadar}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Local Regional Disease Alerts Interactive Map (With Offline Caching) */}
          <LocalDiseaseAlertsMap
            selectedStateName={selectedState.name}
            language={language}
            initialScope="LOCAL_STATE"
            onSelectState={(stateName) => {
              const match = INDIAN_STATES.find(
                (s) => s.name.toLowerCase() === stateName.toLowerCase()
              );
              if (match) setSelectedState(match);
            }}
            onNavigateToDisease={(className) => {
              setCatalogSearch(className);
              setActiveTabId('crops');
            }}
          />

          {/* Recent Scans Table Preview & Quick Tests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Recent Scans */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <ScanLine className="w-4 h-4 text-emerald-600" />
                    <span>{d.recentTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-500">{d.recentSubtitle}</p>
                </div>

                {history.length > 0 && (
                  <button
                    onClick={() => setActiveTabId('scans')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{d.viewAll(history.length)}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{d.noScansTitle}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-sm mx-auto">
                      {d.noScansDesc}
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setActiveTab('analyze')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ScanLine className="w-3.5 h-3.5" />
                      <span>{d.scanNowBtn}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('tests')}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{d.sampleLeavesBtn}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {history.slice(0, 5).map((scan) => (
                    <div
                      key={scan.id}
                      onClick={() => handleOpenScan(scan)}
                      className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={scan.thumbnailUrl}
                          alt={scan.crop}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                              {getLocalizedCropName(scan.crop, language)} — {getLocalizedDiseaseName(scan.className, language) || scan.disease}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                scan.isHealthy
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {scan.isHealthy ? d.statusHealthy : d.statusDiseased}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {new Date(scan.timestamp).toLocaleDateString()} • {scan.stateName || selectedState.name} • {Math.round(scan.confidence)}% {d.confidence}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors hidden sm:flex items-center gap-1"
                        >
                          <span>{d.reviewBtn}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 1 Col: Quick Diagnostics & Helplines */}
            <div className="space-y-4">
              {/* Toll-Free Kisan Helpline Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{d.kisanHelplineTitle}</h4>
                    <p className="text-xs text-slate-500">{d.kisanConsultTime}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
                  <div className="text-xs text-emerald-800 font-semibold">{d.tollFreeIndia}</div>
                  <a
                    href="tel:18001801551"
                    className="text-lg font-black text-emerald-900 hover:underline flex items-center gap-2 mt-0.5"
                  >
                    <span>1800-180-1551</span>
                    <ExternalLink className="w-4 h-4 text-emerald-700" />
                  </a>
                  <p className="text-[11px] text-emerald-700 mt-1">{d.availableLanguages}</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="text-xs text-slate-600 font-semibold">{d.stateLine(selectedState.name)}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedState.kisanHelpline}</div>
                </div>
              </div>

              {/* On-Device Privacy Badge */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{d.edgeBadge}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {d.edgeDesc}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Network: {isOnline ? d.networkOnline : d.networkOffline}</span>
                  <span className="font-bold text-emerald-600">{d.localFirst}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB VIEW: MY FIELD SCANS */}
      {activeTabId === 'scans' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <ScanLine className="w-5 h-5 text-emerald-600" />
                  <span>{d.myScansTitle}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {d.myScansSubtitle(history.length)}
                </p>
              </div>

              {/* Export Actions */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-export-csv"
                  onClick={handleExportCSV}
                  disabled={history.length === 0}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-40 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>{d.exportCsv}</span>
                </button>
                <button
                  id="btn-export-json"
                  onClick={handleExportJSON}
                  disabled={history.length === 0}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-40 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>{d.exportJson}</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={scanSearch}
                  onChange={(e) => setScanSearch(e.target.value)}
                  placeholder={d.searchScansPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Filter segmented buttons */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setScanFilter('ALL')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scanFilter === 'ALL'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.filterAll} ({history.length})
                </button>
                <button
                  onClick={() => setScanFilter('HEALTHY')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scanFilter === 'HEALTHY'
                      ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.filterHealthy} ({analytics.healthyCount})
                </button>
                <button
                  onClick={() => setScanFilter('DISEASED')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scanFilter === 'DISEASED'
                      ? 'bg-white text-amber-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.filterDiseased} ({analytics.diseasedCount})
                </button>
              </div>
            </div>

            {/* List of Scans */}
            {filteredScans.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                <ScanLine className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-600">{d.noMatchingScans}</p>
                <p className="text-[11px] text-slate-400">{d.noMatchingDesc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredScans.map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => handleOpenScan(scan)}
                    className="p-4 bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={scan.thumbnailUrl}
                        alt={scan.crop}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              scan.isHealthy
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {scan.isHealthy ? d.healthyLeaf : d.pathogenDetected}
                          </span>
                          <button
                            onClick={(e) => handleDeleteScan(scan.id, e)}
                            title={d.deleteTitle}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1 truncate">
                          {getLocalizedCropName(scan.crop, language)} — {getLocalizedDiseaseName(scan.className, language) || scan.disease}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {new Date(scan.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{d.confidence}:</span>
                        <span className="font-bold text-slate-800">
                          {Math.round(scan.confidence)}%
                        </span>
                      </div>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{d.viewFullReport}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. TAB VIEW: REGIONAL RISK RADAR */}
      {activeTabId === 'risk' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span>{d.riskTitle}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {d.riskSubtitle(selectedState.name)}
                </p>
              </div>

              {onOpenStateModal && (
                <button
                  onClick={onOpenStateModal}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 border border-slate-200 self-start sm:self-auto cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{d.switchStateBtn}</span>
                </button>
              )}
            </div>

            {/* Outbreak Pathogen Vulnerability Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Fungal Threat Card */}
              <div className="p-5 rounded-2xl border border-red-200 bg-red-50/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-red-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>{d.fungalRisk}</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-200 text-red-900">
                      {d.highRisk}
                    </span>
                  </div>
                  <p className="text-xs text-red-800/90 mt-2 leading-relaxed">
                    {d.fungalDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-red-200/80 text-xs text-red-900 font-medium">
                  {d.fungalPrev}
                </div>
              </div>

              {/* Bacterial Threat Card */}
              <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-amber-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{d.bacterialRisk}</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900">
                      {d.moderateRisk}
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/90 mt-2 leading-relaxed">
                    {d.bacterialDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-amber-200/80 text-xs text-amber-900 font-medium">
                  {d.bacterialPrev}
                </div>
              </div>

              {/* Viral Threat Card */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{d.viralRisk}</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-200 text-emerald-900">
                      {d.monitoredRisk}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-2 leading-relaxed">
                    {d.viralDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-200/80 text-xs text-emerald-900 font-medium">
                  {d.viralPrev}
                </div>
              </div>
            </div>

            {/* Specific Crop Advisory Table for Selected State */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {d.icarTableTitle(selectedState.name)}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">{d.thCrop}</th>
                      <th className="p-3">{d.thDisease}</th>
                      <th className="p-3">{d.thWindow}</th>
                      <th className="p-3">{d.thPractice}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedState.majorCrops.map((cropName, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3 font-bold text-slate-900">
                          {getLocalizedCropName(cropName, language)}
                        </td>
                        <td className="p-3">
                          {getLocalizedCropDiseaseComplex(cropName, language)}
                        </td>
                        <td className="p-3 text-slate-500">{d.windowKharif}</td>
                        <td className="p-3 font-medium text-emerald-800">
                          {d.defaultPractice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radar View Mode Switcher: Live Outbreak Map vs Seasonal Forecast */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="inline-flex p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setRadarViewMode('ALERTS_MAP')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    radarViewMode === 'ALERTS_MAP'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Live Outbreak Map</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRadarViewMode('SEASONAL_FORECAST')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    radarViewMode === 'SEASONAL_FORECAST'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Seasonal Disease Forecast</span>
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium px-2">
                {radarViewMode === 'ALERTS_MAP'
                  ? 'Real-time epidemiological outbreaks with 1-click Kisan Helpline'
                  : 'Agricultural zone forecast models from ICAR research'}
              </span>
            </div>

            {/* Display Either Live Outbreak Map or Seasonal Forecast (Never overwhelming with both at once) */}
            {radarViewMode === 'ALERTS_MAP' ? (
              <LocalDiseaseAlertsMap
                selectedStateName={selectedState.name}
                language={language}
                initialScope="LOCAL_STATE"
                onSelectState={(stateName) => {
                  const match = INDIAN_STATES.find(
                    (s) => s.name.toLowerCase() === stateName.toLowerCase()
                  );
                  if (match) setSelectedState(match);
                }}
                onNavigateToDisease={(className) => {
                  setCatalogSearch(className);
                  setActiveTabId('crops');
                }}
              />
            ) : (
              <RegionalDistributionHeatMap
                language={language}
                selectedStateName={selectedState.name}
              />
            )}
          </div>
        </div>
      )}

      {/* 6. TAB VIEW: DISEASE CATALOG (38 CLASSES) */}
      {activeTabId === 'crops' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <span>{d.catalogTitle}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {d.catalogSubtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('crops')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 border border-emerald-200 self-start sm:self-auto cursor-pointer"
              >
                <span>{d.fullEncyclopediaBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder={d.searchCatalogPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                />
              </div>

              {/* Crop Filter dropdown */}
              <select
                value={catalogCropFilter}
                onChange={(e) => setCatalogCropFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-semibold cursor-pointer"
              >
                <option value="ALL">{d.allCropsOption}</option>
                {CROPS_LIST.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {getLocalizedCropName(crop.name, language)} ({crop.totalClasses})
                  </option>
                ))}
              </select>

              {/* Pathogen Filter dropdown */}
              <select
                value={catalogPathogenFilter}
                onChange={(e) => setCatalogPathogenFilter(e.target.value as any)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-semibold cursor-pointer"
              >
                <option value="ALL">{d.allPathogensOption}</option>
                <option value="Fungal">{d.optFungal}</option>
                <option value="Bacterial">{d.optBacterial}</option>
                <option value="Viral">{d.optViral}</option>
                <option value="Healthy">{d.optHealthy}</option>
              </select>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map((cls) => {
                const verified = getLocalizedDiseaseDetail(cls.className, language);
                const detail = DISEASES_DATABASE[cls.className];
                const rawPathogen = detail?.pathogenType || (cls.isHealthy ? 'Healthy' : 'Fungal');
                const localizedPathogen = getLocalizedPathogenType(rawPathogen, language);
                const diseaseName =
                  verified?.name ||
                  getLocalizedDiseaseName(cls.className, language) ||
                  cls.disease;
                const cropName = verified?.crop || getLocalizedCropName(cls.crop, language);
                const simpleDesc =
                  verified?.simpleDescription ||
                  detail?.simpleDescription ||
                  'Foliage condition documented in PlantVillage dataset.';

                return (
                  <div
                    key={cls.id}
                    className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-emerald-300 transition-colors flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                          {cropName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            cls.isHealthy
                              ? 'bg-emerald-100 text-emerald-800'
                              : rawPathogen === 'Bacterial'
                              ? 'bg-blue-100 text-blue-800'
                              : rawPathogen === 'Viral'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {localizedPathogen}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {diseaseName}
                      </h4>
                      {detail?.scientificName && (
                        <p className="text-[11px] italic text-slate-500 mt-0.5">
                          {detail.scientificName}
                        </p>
                      )}
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {simpleDesc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">{d.classLabel} #{cls.id}</span>
                      <button
                        onClick={() => setActiveTab('crops')}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        {d.studySymptoms} &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB VIEW: AI NEURAL ENGINE TELEMETRY */}
      {activeTabId === 'engine' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span>{d.engineTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {d.engineSubtitle}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">{d.latencyLabel}</div>
                <div className="text-2xl font-black text-slate-900 mt-1">~34 ms</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">{d.latencyDesc}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">{d.footprintLabel}</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">14.2 MB</div>
                <div className="text-[10px] text-slate-500 mt-1">{d.footprintDesc}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">{d.tensorLabel}</div>
                <div className="text-2xl font-black text-slate-900 mt-1">224×224×3</div>
                <div className="text-[10px] text-slate-500 mt-1">{d.tensorDesc}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">{d.benchmarkLabel}</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">97.4%</div>
                <div className="text-[10px] text-slate-500 mt-1">{d.benchmarkDesc}</div>
              </div>
            </div>

            {/* Architecture Flowchart Description */}
            <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl space-y-3 font-mono text-xs">
              <div className="text-emerald-400 font-bold text-sm">
                {d.flowTitle}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-emerald-400 font-bold mb-1">{d.step1Title}</div>
                  <div className="text-[11px] text-slate-300">
                    {d.step1Desc}
                  </div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-emerald-400 font-bold mb-1">{d.step2Title}</div>
                  <div className="text-[11px] text-slate-300">
                    {d.step2Desc}
                  </div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-emerald-400 font-bold mb-1">{d.step3Title}</div>
                  <div className="text-[11px] text-slate-300">
                    {d.step3Desc}
                  </div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-emerald-400 font-bold mb-1">{d.step4Title}</div>
                  <div className="text-[11px] text-slate-300">
                    {d.step4Desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Zero-cloud privacy confirmation */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{d.offlineZeroBytes}</span>
              </div>
              <span className="font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 bg-emerald-200 rounded-full">
                {d.edgeVerified}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 8. TAB VIEW: KISAN SUPPORT & KVK DIRECTORY */}
      {activeTabId === 'helpline' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <span>{d.supportTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {d.supportSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* National Kisan Call Center */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border border-emerald-200 rounded-3xl shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    KCC
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{d.kccTitle}</h3>
                    <p className="text-xs text-slate-500">{d.kccDept}</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-emerald-200 rounded-2xl space-y-1">
                  <div className="text-xs text-emerald-800 font-semibold">{d.kccNumberLabel}</div>
                  <a
                    href="tel:18001801551"
                    className="text-2xl font-black text-emerald-900 hover:underline flex items-center gap-2"
                  >
                    <span>1800-180-1551</span>
                    <ExternalLink className="w-5 h-5 text-emerald-700" />
                  </a>
                  <p className="text-[11px] text-slate-500 mt-1">{d.kccHours}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {d.kccDesc}
                </p>
              </div>

              {/* State Agricultural University & KVK */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black">
                    KVK
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{d.kvkUniversity(selectedState.name)}</h3>
                    <p className="text-xs text-slate-500">{d.kvkDept}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <div className="text-xs text-slate-600 font-semibold">{d.kvkHelplinesLabel}</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{selectedState.kisanHelpline}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{d.agroZoneLabel} {selectedState.agroClimaticZone}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedState.stateAdvisoryNotes}
                </p>
              </div>
            </div>

            {/* Emergency Escalation Advisory */}
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{d.emergencyTitle}</span>
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                {d.emergencyDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
