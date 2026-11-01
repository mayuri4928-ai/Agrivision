/**
 * India Geographic Boundary & Projection Helper
 * Calibrated for accurate geographic positioning of crop disease alerts
 * across Indian states and agricultural zones.
 */

// Normalized SVG dimensions: viewBox="0 0 500 560"
export const MAP_WIDTH = 500;
export const MAP_HEIGHT = 560;

/**
 * Calibrated projection mapping real-world (lat, lng) to the India SVG viewBox (500 x 560).
 * India bounding box:
 *   Longitude: ~68.0°E (Gujarat western tip) to ~97.5°E (Arunachal eastern tip)
 *   Latitude:  ~8.0°N (Kanyakumari) to ~37.4°N (Northern Ladakh)
 */
export function projectLatLng(lat: number, lng: number): { x: number; y: number } {
  const minLng = 68.0;
  const maxLng = 97.5;
  const minLat = 8.0;
  const maxLat = 37.4;

  // Clamping to India's bounds
  const clampedLat = Math.max(minLat, Math.min(maxLat, lat));
  const clampedLng = Math.max(minLng, Math.min(maxLng, lng));

  // Normalized (0 to 1)
  const normX = (clampedLng - minLng) / (maxLng - minLng);
  // Lat decreases as y increases in SVG (North at top)
  const normY = (maxLat - clampedLat) / (maxLat - minLat);

  // Calibrated projection offset matching the India SVG geometry
  const x = 75 + normX * 380;
  const y = 35 + normY * 490;

  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
  };
}

/**
 * Approximate geographical center for each Indian State / UT for map focus
 */
export const STATE_CENTROIDS: Record<string, { lat: number; lng: number; region: string }> = {
  'Andhra Pradesh': { lat: 15.91, lng: 79.74, region: 'South' },
  'Arunachal Pradesh': { lat: 28.21, lng: 94.72, region: 'North-East' },
  'Assam': { lat: 26.20, lng: 92.93, region: 'North-East' },
  'Bihar': { lat: 25.09, lng: 85.31, region: 'East' },
  'Chhattisgarh': { lat: 21.27, lng: 81.86, region: 'Central' },
  'Goa': { lat: 15.29, lng: 74.12, region: 'South' },
  'Gujarat': { lat: 22.25, lng: 71.19, region: 'West' },
  'Haryana': { lat: 29.05, lng: 76.08, region: 'North' },
  'Himachal Pradesh': { lat: 31.74, lng: 77.10, region: 'North' },
  'Jharkhand': { lat: 23.61, lng: 85.27, region: 'East' },
  'Karnataka': { lat: 15.31, lng: 75.71, region: 'South' },
  'Kerala': { lat: 10.85, lng: 76.27, region: 'South' },
  'Madhya Pradesh': { lat: 22.97, lng: 78.65, region: 'Central' },
  'Maharashtra': { lat: 19.75, lng: 75.71, region: 'West' },
  'Manipur': { lat: 24.66, lng: 93.90, region: 'North-East' },
  'Meghalaya': { lat: 25.46, lng: 91.36, region: 'North-East' },
  'Mizoram': { lat: 23.16, lng: 92.93, region: 'North-East' },
  'Nagaland': { lat: 26.15, lng: 94.56, region: 'North-East' },
  'Odisha': { lat: 20.95, lng: 85.09, region: 'East' },
  'Punjab': { lat: 31.14, lng: 75.34, region: 'North' },
  'Rajasthan': { lat: 27.02, lng: 74.21, region: 'West' },
  'Sikkim': { lat: 27.53, lng: 88.51, region: 'North-East' },
  'Tamil Nadu': { lat: 11.12, lng: 78.65, region: 'South' },
  'Telangana': { lat: 18.11, lng: 79.01, region: 'South' },
  'Tripura': { lat: 23.94, lng: 91.98, region: 'North-East' },
  'Uttar Pradesh': { lat: 26.84, lng: 80.94, region: 'Central' },
  'Uttarakhand': { lat: 30.06, lng: 79.01, region: 'North' },
  'West Bengal': { lat: 22.98, lng: 87.85, region: 'East' },
  'Jammu & Kashmir': { lat: 33.77, lng: 76.57, region: 'North' },
  'Delhi': { lat: 28.70, lng: 77.10, region: 'North' },
};

/**
 * Authentic, recognizable silhouette path of India
 * Calibrated within 500 x 560 coordinate space
 */
export const INDIA_MAP_SILHOUETTE = `
  M 205,62
  C 212,42 228,36 248,38
  C 264,40 274,52 276,68
  C 278,82 268,98 258,110
  C 270,118 290,132 312,145
  C 330,156 352,162 372,165
  C 382,166 388,160 392,154
  C 400,154 416,150 430,156
  C 445,162 462,176 460,198
  C 458,212 444,222 448,238
  C 450,252 442,268 430,268
  C 420,268 414,256 410,244
  C 402,235 390,232 380,236
  C 370,240 367,252 365,268
  C 360,278 370,292 360,306
  C 346,326 326,346 312,374
  C 298,404 282,442 270,480
  C 262,502 254,522 246,525
  C 240,525 235,510 230,490
  C 220,458 208,424 196,390
  C 184,360 174,338 168,324
  C 162,324 148,334 132,334
  C 114,334 104,320 106,306
  C 110,294 122,288 134,284
  C 126,278 116,274 114,260
  C 112,244 126,230 136,216
  C 146,202 150,178 160,158
  C 170,138 180,114 182,90
  C 184,76 195,67 205,62 Z
`;

/**
 * Regional zones for contextual highlight when a state is selected
 */
export interface RegionFeature {
  id: string;
  name: string;
  shortName: string;
  states: string[];
  centroid: { x: number; y: number };
  svgPath: string;
}

export const INDIA_REGIONS: RegionFeature[] = [
  {
    id: 'north',
    name: 'Northern Agricultural Basin',
    shortName: 'North',
    states: ['Punjab', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand', 'Delhi'],
    centroid: { x: 215, y: 110 },
    svgPath: 'M 205,62 C 228,36 264,40 276,68 C 278,82 268,98 258,110 C 270,118 290,132 312,145 L 290,195 L 210,180 L 165,165 C 170,138 180,114 182,90 Z',
  },
  {
    id: 'west',
    name: 'Western Zone (Gujarat & Rajasthan)',
    shortName: 'West',
    states: ['Gujarat', 'Rajasthan'],
    centroid: { x: 155, y: 260 },
    svgPath: 'M 165,165 L 210,180 L 230,230 L 220,300 L 168,324 C 162,324 148,334 132,334 C 114,334 104,320 106,306 C 110,294 122,288 134,284 C 126,278 116,274 114,260 C 112,244 126,230 136,216 Z',
  },
  {
    id: 'central',
    name: 'Central Belt (MP, UP & Bihar)',
    shortName: 'Central',
    states: ['Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'Chhattisgarh'],
    centroid: { x: 275, y: 235 },
    svgPath: 'M 210,180 L 312,145 C 330,156 352,162 372,165 L 365,268 L 290,295 L 220,300 L 230,230 Z',
  },
  {
    id: 'east',
    name: 'Eastern Delta (Bengal & Odisha)',
    shortName: 'East',
    states: ['West Bengal', 'Odisha', 'Jharkhand'],
    centroid: { x: 335, y: 310 },
    svgPath: 'M 365,268 C 360,278 370,292 360,306 C 346,326 326,346 312,374 L 275,340 L 290,295 Z',
  },
  {
    id: 'south',
    name: 'Southern Peninsula (MH, KA, AP, TS, TN, KL)',
    shortName: 'South',
    states: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Kerala', 'Goa'],
    centroid: { x: 230, y: 430 },
    svgPath: 'M 220,300 L 290,295 L 275,340 L 312,374 C 298,404 282,442 270,480 C 262,502 254,522 246,525 C 240,525 235,510 230,490 C 220,458 208,424 196,390 C 184,360 174,338 168,324 Z',
  },
  {
    id: 'northeast',
    name: 'North-East Hill Valleys',
    shortName: 'North-East',
    states: ['Assam', 'Meghalaya', 'Arunachal Pradesh', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura', 'Sikkim'],
    centroid: { x: 425, y: 215 },
    svgPath: 'M 372,165 C 382,166 388,160 392,154 C 400,154 416,150 430,156 C 445,162 462,176 460,198 C 458,212 444,222 448,238 C 450,252 442,268 430,268 C 420,268 414,256 410,244 C 402,235 390,232 380,236 C 370,240 367,252 365,268 Z',
  },
];

/**
 * Official Kisan Call Centre Toll-Free Number
 */
export const OFFICIAL_KISAN_HELPLINE = '1800-180-1551';
