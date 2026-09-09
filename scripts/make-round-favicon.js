const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const APP_DIR = path.join(__dirname, '..', 'src', 'app');
const LOGO_PATH = path.join(PUBLIC_DIR, '1.jpg');

async function generateRoundFavicons() {
  const img = await loadImage(LOGO_PATH);

  // Center and diameter of the circular emblem in 1.jpg
  const srcCenterX = 512.5;
  const srcCenterY = 512;
  const srcRadius = 422; // bounds the circular emblem perfectly
  const srcDiameter = srcRadius * 2;
  const srcX = srcCenterX - srcRadius;
  const srcY = srcCenterY - srcRadius;

  function renderCircle(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Antialiased round circular clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw circular emblem to fill the circle
    ctx.drawImage(
      img,
      srcX, srcY, srcDiameter, srcDiameter,
      0, 0, size, size
    );

    return canvas.toBuffer('image/png');
  }

  const sizes = [16, 32, 48, 180, 192, 512];
  for (const size of sizes) {
    const buf = renderCircle(size);
    fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}.png`), buf);
    if (size === 180) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), buf);
      fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), buf);
    }
    if (size === 32) {
      // favicon.ico as PNG format is widely supported by modern browsers
      fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), buf);
    }
    console.log(`Generated favicon ${size}x${size}`);
  }

  // App directory icon for Next.js App Router
  const appIconBuf = renderCircle(512);
  fs.writeFileSync(path.join(APP_DIR, 'icon.png'), appIconBuf);
  console.log('Generated src/app/icon.png (512x512 round PNG)');

  // Remove square icon.jpg if exists
  const oldIconJpg = path.join(APP_DIR, 'icon.jpg');
  if (fs.existsSync(oldIconJpg)) {
    fs.unlinkSync(oldIconJpg);
    console.log('Removed old square src/app/icon.jpg');
  }

  console.log('All round favicons generated successfully!');
}

generateRoundFavicons().catch((err) => {
  console.error('Error generating round favicons:', err);
  process.exit(1);
});
