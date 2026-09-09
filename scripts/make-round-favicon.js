const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const APP_DIR = path.join(__dirname, '..', 'src', 'app');
const LOGO_PATH = path.join(PUBLIC_DIR, '1.jpg');

// Helper to draw a rounded rectangle path
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

async function generateNavbarStyleFavicons() {
  const img = await loadImage(LOGO_PATH);

  function renderRounded(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Matching navbar logo: 6px radius on 28px width (~21.4% corner radius)
    const radius = Math.max(2, Math.round(size * 0.214));

    // Create rounded rect clip
    drawRoundedRect(ctx, 0, 0, size, size, radius);
    ctx.clip();

    // Draw full 1.jpg image into the rounded rectangle
    ctx.drawImage(img, 0, 0, size, size);

    return canvas.toBuffer('image/png');
  }

  const sizes = [16, 32, 48, 180, 192, 512];
  for (const size of sizes) {
    const buf = renderRounded(size);
    fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}.png`), buf);
    if (size === 180) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), buf);
      fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), buf);
    }
    if (size === 32) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), buf);
    }
    console.log(`Generated rounded-border favicon ${size}x${size} (radius ${Math.round(size * 0.214)}px)`);
  }

  // App directory icon for Next.js App Router
  const appIconBuf = renderRounded(512);
  fs.writeFileSync(path.join(APP_DIR, 'icon.png'), appIconBuf);
  console.log('Generated src/app/icon.png (512x512 with navbar rounded borders)');

  // Ensure no square icon.jpg exists
  const oldIconJpg = path.join(APP_DIR, 'icon.jpg');
  if (fs.existsSync(oldIconJpg)) {
    fs.unlinkSync(oldIconJpg);
  }

  console.log('All rounded-border favicons generated successfully matching navbar logo!');
}

generateNavbarStyleFavicons().catch((err) => {
  console.error('Error generating rounded-border favicons:', err);
  process.exit(1);
});
