import { IndianState } from '../types';

export const INDIAN_STATES: IndianState[] = [
  // 28 States
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    type: 'State',
    regionalLanguage: 'Telugu',
    agroClimaticZone: 'Southern Coastal & Rayalaseema Agro-Climatic Zone',
    majorCrops: ['Tomato', 'Corn / Maize', 'Bell Pepper', 'Orange', 'Soybean'],
    kisanHelpline: '1800-425-0302 / 1800-180-1551',
    stateAdvisoryNotes: 'High humidity in coastal districts (Krishna, Guntur) increases fungal blights in tomato and corn. Kharif and Rabi scouting recommended.'
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    type: 'State',
    regionalLanguage: 'English / Assamese',
    agroClimaticZone: 'Eastern Himalayan Hill Zone',
    majorCrops: ['Apple', 'Corn / Maize', 'Potato', 'Soybean'],
    kisanHelpline: '1800-180-1551 (State KVK Bomdila & Tawang)',
    stateAdvisoryNotes: 'High altitude temperate zones in Tawang and West Kameng are major apple and potato belts. Watch for apple scab during summer monsoon.'
  },
  {
    code: 'AS',
    name: 'Assam',
    type: 'State',
    regionalLanguage: 'Assamese / Bengali',
    agroClimaticZone: 'Eastern Himalayan & Brahmaputra Valley',
    majorCrops: ['Potato', 'Tomato', 'Corn / Maize', 'Orange'],
    kisanHelpline: '1800-345-3520 / 1800-180-1551',
    stateAdvisoryNotes: 'Heavy rainfall zones require raised-bed cultivation to prevent root rots and late blight in potato and tomato.'
  },
  {
    code: 'BR',
    name: 'Bihar',
    type: 'State',
    regionalLanguage: 'Hindi / Maithili',
    agroClimaticZone: 'Middle Gangetic Plains (North & South Alluvial)',
    majorCrops: ['Corn / Maize', 'Potato', 'Tomato', 'Bell Pepper'],
    kisanHelpline: '1800-180-1551 / 1800-345-6224',
    stateAdvisoryNotes: 'Leading maize and potato producing state (Begusarai, Samastipur, Nalanda). Winter fogs frequently trigger potato late blight.'
  },
  {
    code: 'CG',
    name: 'Chhattisgarh',
    type: 'State',
    regionalLanguage: 'Hindi / Chhattisgarhi',
    agroClimaticZone: 'Eastern Plateau & Hills (Central Narmada & Bastar)',
    majorCrops: ['Soybean', 'Corn / Maize', 'Tomato', 'Potato'],
    kisanHelpline: '1800-233-1551 / 1800-180-1551',
    stateAdvisoryNotes: 'Bastar plateau and Durg plains cultivate extensive vegetable and soybean. Monitor soil drainage during Kharif downpours.'
  },
  {
    code: 'GA',
    name: 'Goa',
    type: 'State',
    regionalLanguage: 'Konkani / Marathi',
    agroClimaticZone: 'West Coast Humid Plains & Ghats',
    majorCrops: ['Tomato', 'Bell Pepper', 'Corn / Maize'],
    kisanHelpline: '1800-180-1551 / ICAR-CCARI Old Goa',
    stateAdvisoryNotes: 'Tropical maritime humidity demands canopy aeration and bio-fungicide protection against downy mildews and bacterial spots.'
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    type: 'State',
    regionalLanguage: 'Gujarati',
    agroClimaticZone: 'Gujarat Plains, Saurashtra & Hills',
    majorCrops: ['Potato', 'Tomato', 'Soybean', 'Corn / Maize', 'Grape'],
    kisanHelpline: '1800-180-1551 / 1800-233-0264',
    stateAdvisoryNotes: 'Deesa and Banaskantha are major potato hubs. In dry winters, drip fertigation prevents early blight and tuber deformities.'
  },
  {
    code: 'HR',
    name: 'Haryana',
    type: 'State',
    regionalLanguage: 'Hindi / Punjabi',
    agroClimaticZone: 'Trans-Gangetic Plains',
    majorCrops: ['Tomato', 'Potato', 'Bell Pepper', 'Corn / Maize'],
    kisanHelpline: '1800-180-2117 / 1800-180-1551',
    stateAdvisoryNotes: 'Extensive polyhouse tomato and bell pepper clusters in Karnal and Sonipat. Maintain strict ventilation to deter leaf mold.'
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    type: 'State',
    regionalLanguage: 'Hindi / Pahari',
    agroClimaticZone: 'Western Himalayan Alpine & Temperate Zone',
    majorCrops: ['Apple', 'Cherry', 'Peach', 'Potato', 'Tomato'],
    kisanHelpline: '1800-180-1551 / 1800-180-8024 (Dr YSP UHF Nauni)',
    stateAdvisoryNotes: 'Apple heartland (Shimla, Kullu, Kinnaur). Monitor leaf wetness sensors for Apple Scab and powdery mildew after rains.'
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    type: 'State',
    regionalLanguage: 'Hindi',
    agroClimaticZone: 'Eastern Plateau & Chota Nagpur Hills',
    majorCrops: ['Tomato', 'Potato', 'Corn / Maize', 'Soybean'],
    kisanHelpline: '1800-180-1551 / BAU Ranchi KVK',
    stateAdvisoryNotes: 'Ranchi district is known for peri-urban round-the-year tomato and vegetable production. Watch for bacterial wilt and leaf curl virus.'
  },
  {
    code: 'KA',
    name: 'Karnataka',
    type: 'State',
    regionalLanguage: 'Kannada',
    agroClimaticZone: 'Southern Plateau & Coastal Karnataka',
    majorCrops: ['Tomato', 'Corn / Maize', 'Grape', 'Soybean', 'Bell Pepper'],
    kisanHelpline: '1800-425-3553 / 1800-180-1551',
    stateAdvisoryNotes: 'Kolar and Chikkaballapur are prime tomato hubs; Bijapur and Bagalkot are grape belts. Control whiteflies to stop leaf curl virus.'
  },
  {
    code: 'KL',
    name: 'Kerala',
    type: 'State',
    regionalLanguage: 'Malayalam',
    agroClimaticZone: 'West Coast & High Ranges (Western Ghats)',
    majorCrops: ['Tomato', 'Bell Pepper', 'Squash', 'Corn / Maize'],
    kisanHelpline: '1800-425-1661 / 1800-180-1551',
    stateAdvisoryNotes: 'High ambient humidity and southwest monsoon require good drainage and copper preventative sprays for vegetable crops.'
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    type: 'State',
    regionalLanguage: 'Hindi',
    agroClimaticZone: 'Central Plateau & Malwa Hills',
    majorCrops: ['Soybean', 'Corn / Maize', 'Tomato', 'Orange', 'Potato'],
    kisanHelpline: '1800-180-1551 / 1800-233-1255',
    stateAdvisoryNotes: 'The "Soybean Bowl of India" (Malwa and Nimar). Monitor soybean for rust and yellow mosaic virus; Vidisha and Chhindwara grow extensive maize.'
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    type: 'State',
    regionalLanguage: 'Marathi',
    agroClimaticZone: 'Western Plateau, Sahyadri & Marathwada',
    majorCrops: ['Grape', 'Soybean', 'Tomato', 'Corn / Maize', 'Orange'],
    kisanHelpline: '1800-233-4000 / 1800-180-1551',
    stateAdvisoryNotes: 'Nashik is India\'s grape capital; Nagpur is famous for Mandarin oranges. Monitor downy mildew in grapes and psyllids in citrus.'
  },
  {
    code: 'MN',
    name: 'Manipur',
    type: 'State',
    regionalLanguage: 'Manipuri (Meitei)',
    agroClimaticZone: 'Eastern Himalayan Sub-Tropical Zone',
    majorCrops: ['Corn / Maize', 'Soybean', 'Potato', 'Tomato'],
    kisanHelpline: '1800-180-1551 / ICAR Lamphelpat',
    stateAdvisoryNotes: 'Organic farming promotion across hill districts. Use neem-based botanical sprays for aphid and fungal leaf spot management.'
  },
  {
    code: 'ML',
    name: 'Meghalaya',
    type: 'State',
    regionalLanguage: 'English / Khasi / Garo',
    agroClimaticZone: 'High Rainfall Eastern Hill Zone',
    majorCrops: ['Potato', 'Corn / Maize', 'Tomato', 'Orange'],
    kisanHelpline: '1800-180-1551 / Central Agricultural University',
    stateAdvisoryNotes: 'Khasi Hills are prime potato and Mandarin orange growers. Late blight surveillance is vital during monsoon season.'
  },
  {
    code: 'MZ',
    name: 'Mizoram',
    type: 'State',
    regionalLanguage: 'Mizo / English',
    agroClimaticZone: 'Eastern Hills Agro-Climatic Zone',
    majorCrops: ['Corn / Maize', 'Soybean', 'Grape', 'Orange'],
    kisanHelpline: '1800-180-1551 / Mizoram Agri Helpline',
    stateAdvisoryNotes: 'Terraced slope cultivation; Champhai grape growers should manage canopy aeration against black rot.'
  },
  {
    code: 'NL',
    name: 'Nagaland',
    type: 'State',
    regionalLanguage: 'English / Nagamese',
    agroClimaticZone: 'Eastern Sub-Himalayan Hill Agro-Ecological Region',
    majorCrops: ['Corn / Maize', 'Soybean', 'Potato', 'Tomato'],
    kisanHelpline: '1800-180-1551 / SASRD Medziphema',
    stateAdvisoryNotes: 'Traditional jhum transitions to settled terrace crops. Organic bio-pesticides (Trichoderma and Pseudomonas) are recommended.'
  },
  {
    code: 'OR',
    name: 'Odisha',
    type: 'State',
    regionalLanguage: 'Odia',
    agroClimaticZone: 'Eastern Coastal Plains & Western Undulating Zones',
    majorCrops: ['Tomato', 'Corn / Maize', 'Bell Pepper', 'Potato'],
    kisanHelpline: '1800-180-1551 / 155333 (Ama Krushi Odisha)',
    stateAdvisoryNotes: 'Keonjhar and Mayurbhanj cultivate high volumes of tomato and maize. Cyclonic depressions warrant preventative fungicide applications.'
  },
  {
    code: 'PB',
    name: 'Punjab',
    type: 'State',
    regionalLanguage: 'Punjabi',
    agroClimaticZone: 'Trans-Gangetic Plains & Malwa',
    majorCrops: ['Potato', 'Corn / Maize', 'Tomato', 'Peach'],
    kisanHelpline: '1800-180-1551 / PAU Ludhiana (0161-2401960)',
    stateAdvisoryNotes: 'Jalandhar and Kapurthala are world-renowned seed potato centers. Cold-wave and aphid vectors must be monitored for seed certification.'
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    type: 'State',
    regionalLanguage: 'Hindi / Rajasthani',
    agroClimaticZone: 'Western Dry Zone & Eastern Plains',
    majorCrops: ['Corn / Maize', 'Soybean', 'Orange', 'Tomato'],
    kisanHelpline: '1800-180-1551 / 1800-180-6127',
    stateAdvisoryNotes: 'Jhalawar is famous for Nagpur-variety Mandarins (Santra). High temperatures and dry winds promote spider mites on tomato and pepper.'
  },
  {
    code: 'SK',
    name: 'Sikkim',
    type: 'State',
    regionalLanguage: 'Nepali / English',
    agroClimaticZone: 'Himalayan Organic Mountain Zone',
    majorCrops: ['Corn / Maize', 'Soybean', 'Potato', 'Orange'],
    kisanHelpline: '1800-180-1551 / KVK ICAR Tadong',
    stateAdvisoryNotes: '100% Certified Organic State. Strictly use organic bio-fungicides, copper oxychloride, and cow-urine botanical extracts for disease management.'
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    type: 'State',
    regionalLanguage: 'Tamil',
    agroClimaticZone: 'Southern Plateau, Cauvery Delta & Western Zone',
    majorCrops: ['Tomato', 'Corn / Maize', 'Bell Pepper', 'Grape'],
    kisanHelpline: '1800-180-1551 / TNAU Agritech Portal (0422-6611200)',
    stateAdvisoryNotes: 'Dharmapuri and Krishnagiri are major tomato and bell pepper tracts; Theni cultivates round-the-year grapes. Watch for leaf curl virus.'
  },
  {
    code: 'TG',
    name: 'Telangana',
    type: 'State',
    regionalLanguage: 'Telugu',
    agroClimaticZone: 'Southern Telangana & Northern Telangana Zone',
    majorCrops: ['Corn / Maize', 'Soybean', 'Tomato', 'Bell Pepper'],
    kisanHelpline: '1800-180-1551 / PJTSAU Rajendranagar',
    stateAdvisoryNotes: 'Nizamabad and Adilabad are major soybean and maize producers. Fall armyworm in maize and bacterial spots in solanaceous crops require scouting.'
  },
  {
    code: 'TR',
    name: 'Tripura',
    type: 'State',
    regionalLanguage: 'Bengali / Kokborok',
    agroClimaticZone: 'Northeastern Hills & Valleys',
    majorCrops: ['Potato', 'Tomato', 'Corn / Maize', 'Orange'],
    kisanHelpline: '1800-180-1551 / Department of Agriculture Agartala',
    stateAdvisoryNotes: 'Jampui Hills cultivate specialty citrus; winter potato in valley plains requires fungicide cover against late blight after heavy morning fog.'
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    type: 'State',
    regionalLanguage: 'Hindi',
    agroClimaticZone: 'Upper, Middle & Eastern Gangetic Plains',
    majorCrops: ['Potato', 'Tomato', 'Corn / Maize', 'Bell Pepper', 'Peach'],
    kisanHelpline: '1800-180-1551 / 1800-200-1050',
    stateAdvisoryNotes: 'India\'s top potato producer (Agra, Farrukhabad, Kannauj). Dense winter fogs (December-January) mandate immediate late blight surveillance.'
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    type: 'State',
    regionalLanguage: 'Hindi / Garhwali / Kumaoni',
    agroClimaticZone: 'Western Himalayan Valley & Foothills',
    majorCrops: ['Apple', 'Peach', 'Potato', 'Tomato', 'Soybean'],
    kisanHelpline: '1800-180-1551 / GBPUAT Pantnagar (1800-180-4050)',
    stateAdvisoryNotes: 'Apple and stone fruits in Ramgarh and Mukteshwar; off-season tomatoes in hill terraces. Watch for apple scab and bacterial spots.'
  },
  {
    code: 'WB',
    name: 'West Bengal',
    type: 'State',
    regionalLanguage: 'Bengali',
    agroClimaticZone: 'Lower Gangetic Plain & Northern Hill Terai',
    majorCrops: ['Potato', 'Tomato', 'Corn / Maize', 'Orange'],
    kisanHelpline: '1800-180-1551 / 1800-103-1000 (Matir Katha)',
    stateAdvisoryNotes: 'Second largest potato producer in India (Hooghly, Bardhaman). High humidity and foggy mornings trigger sudden late blight epidemics.'
  },

  // 8 Union Territories
  {
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    regionalLanguage: 'Hindi / Bengali / English',
    agroClimaticZone: 'Island Coastal Humid Zone',
    majorCrops: ['Corn / Maize', 'Tomato', 'Bell Pepper'],
    kisanHelpline: '1800-180-1551 / ICAR-CIARI Port Blair',
    stateAdvisoryNotes: 'Maritime humidity; sheltered rainout shelters and raised drainage channels protect solanaceous vegetables from rot.'
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    type: 'Union Territory',
    regionalLanguage: 'Hindi / Punjabi',
    agroClimaticZone: 'Sub-Mountainous Shivalik Foothills',
    majorCrops: ['Tomato', 'Bell Pepper', 'Potato'],
    kisanHelpline: '1800-180-1551 / Agri Dept Chandigarh',
    stateAdvisoryNotes: 'Urban and peri-urban horticulture; protected cultivation in net-houses prevents viral vectors.'
  },
  {
    code: 'DH',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    regionalLanguage: 'Gujarati / Hindi / Marathi',
    agroClimaticZone: 'Coastal Saline & Plains',
    majorCrops: ['Tomato', 'Bell Pepper', 'Corn / Maize'],
    kisanHelpline: '1800-180-1551 / Agriculture Department Silvassa',
    stateAdvisoryNotes: 'Monsoon vegetable management requires ridges and furrows to drain excess rain.'
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    type: 'Union Territory',
    regionalLanguage: 'Hindi / Punjabi',
    agroClimaticZone: 'Yamuna Alluvial Plains',
    majorCrops: ['Tomato', 'Bell Pepper', 'Potato', 'Squash'],
    kisanHelpline: '1800-180-1551 / IARI Pusa Toll-Free 011-25841000',
    stateAdvisoryNotes: 'Direct access to ICAR-Indian Agricultural Research Institute (Pusa). Regular diagnostic clinics available at Pusa campus.'
  },
  {
    code: 'JK',
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    regionalLanguage: 'Urdu / Kashmiri / Dogri / Hindi',
    agroClimaticZone: 'Western Himalayan Alpine & Temperate Valley',
    majorCrops: ['Apple', 'Cherry', 'Peach', 'Corn / Maize', 'Potato'],
    kisanHelpline: '1800-180-7111 / SKUAST Kashmir & Jammu',
    stateAdvisoryNotes: 'Kashmir Valley produces over 70% of India\'s apples and cherries (Shopian, Baramulla). Apple scab spray schedule strictly advised.'
  },
  {
    code: 'LA',
    name: 'Ladakh',
    type: 'Union Territory',
    regionalLanguage: 'Ladakhi / Tibetan / Hindi',
    agroClimaticZone: 'Cold Arid Mountain Desert',
    majorCrops: ['Apple', 'Potato', 'Tomato'],
    kisanHelpline: '1800-180-1551 / DIHAR DRDO Leh & KVK Leh',
    stateAdvisoryNotes: 'High altitude intense solar radiation; trench green-houses enable sub-zero winter vegetable growing.'
  },
  {
    code: 'LD',
    name: 'Lakshadweep',
    type: 'Union Territory',
    regionalLanguage: 'Malayalam / Mahl',
    agroClimaticZone: 'Coral Atoll Coastal Tropics',
    majorCrops: ['Tomato', 'Squash'],
    kisanHelpline: '1800-180-1551 / Dept of Agriculture Kavaratti',
    stateAdvisoryNotes: 'Atoll sandy calcareous soil; grow vegetables using organic potting media and grow bags.'
  },
  {
    code: 'PY',
    name: 'Puducherry',
    type: 'Union Territory',
    regionalLanguage: 'Tamil / French / English',
    agroClimaticZone: 'Coromandel Coastal Plain',
    majorCrops: ['Tomato', 'Bell Pepper', 'Corn / Maize'],
    kisanHelpline: '1800-180-1551 / PAJANCOA&RI Karaikal',
    stateAdvisoryNotes: 'Coastal humidity during northeast monsoon (October-December) increases risk of bacterial leaf spots.'
  }
];

export const STATES_MAP = new Map<string, IndianState>(
  INDIAN_STATES.map((s) => [s.name, s])
);

export const DEFAULT_STATE = INDIAN_STATES.find((s) => s.name === 'Gujarat') || INDIAN_STATES[0];
