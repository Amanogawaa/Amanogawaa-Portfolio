const fs = require('fs');
const path = require('path');

function getJpegSize(data) {
  let i = 2; // skip SOI
  while (i < data.length) {
    if (data[i] !== 0xFF) {
      i++;
      continue;
    }
    const marker = data[i + 1];
    if (marker === 0xFF) {
      i++;
      continue;
    }
    if (marker === 0xD9 || marker === 0xDA) break; // EOI or SOS
    
    if (marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) {
      i += 2;
      continue;
    }

    const length = data.readUInt16BE(i + 2);
    if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
      const height = data.readUInt16BE(i + 5);
      const width = data.readUInt16BE(i + 7);
      return { width, height };
    }
    i += 2 + length;
  }
  return null;
}

function getPngSize(data) {
  // Check PNG signature
  if (data.readUInt32BE(0) !== 0x89504E47 || data.readUInt32BE(4) !== 0x0D0A1A0A) {
    return null; // Not a PNG
  }
  // IHDR chunk is always the first chunk
  const chunkType = data.toString('ascii', 12, 16);
  if (chunkType === 'IHDR') {
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

function getImageSize(filePath) {
  const data = fs.readFileSync(filePath);
  if (data.readUInt32BE(0) === 0x89504E47) {
    return getPngSize(data);
  } else if (data[0] === 0xFF && data[1] === 0xD8) {
    return getJpegSize(data);
  }
  return null;
}

const publicDir = process.argv[2] || path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
console.log('Image Dimension Audit:');
console.log('======================');
files.forEach(file => {
  const ext = file.toLowerCase();
  if (ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png')) {
    try {
      const size = getImageSize(path.join(publicDir, file));
      if (size) {
        console.log(`${file}: ${size.width}x${size.height}px (Aspect Ratio: ${(size.width/size.height).toFixed(3)})`);
      } else {
        console.log(`${file}: Could not parse dimensions`);
      }
    } catch (err) {
      console.log(`${file}: Error reading file (${err.message})`);
    }
  }
});
