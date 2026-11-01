import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b, a = 255) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image data with filter byte (0) per row
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // No filter

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Draw a circular badge with dark slate background and green/emerald leaf icon center
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.hypot(x - cx, y - cy);
      const radius = width * 0.45;
      
      // Rounded rect or circle badge
      if (dist < radius * 0.9) {
        // Inner circle icon
        const leafDist = Math.hypot(x - cx, y - (cy + height * 0.05));
        if (leafDist < radius * 0.55) {
          rawData[pxOffset] = 34;      // R: emerald
          rawData[pxOffset + 1] = 197;  // G: emerald
          rawData[pxOffset + 2] = 94;   // B: emerald
          rawData[pxOffset + 3] = 255;
        } else {
          rawData[pxOffset] = 15;     // Slate 900
          rawData[pxOffset + 1] = 23;
          rawData[pxOffset + 2] = 42;
          rawData[pxOffset + 3] = 255;
        }
      } else {
        rawData[pxOffset] = 15;
        rawData[pxOffset + 1] = 23;
        rawData[pxOffset + 2] = 42;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);

  const crcBuf = Buffer.alloc(4);
  const crc = calculateCRC(body);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, body, crcBuf]);
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function calculateCRC(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Generate PWA icons
fs.writeFileSync('public/pwa-192x192.png', createPNG(192, 192, 22, 163, 74));
fs.writeFileSync('public/pwa-512x512.png', createPNG(512, 512, 22, 163, 74));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPNG(512, 512, 22, 163, 74));
fs.writeFileSync('public/apple-touch-icon.png', createPNG(180, 180, 22, 163, 74));
fs.writeFileSync('public/favicon.ico', createPNG(64, 64, 22, 163, 74));
console.log('PNG icons created successfully!');
