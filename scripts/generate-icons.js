import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcImg = path.resolve(process.cwd(), 'src/assets/images/cement_app_icon_1790138939418.jpg');
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generate() {
  console.log('Generating PWA icons from:', srcImg);

  // 1. Standard PWA 192x192
  await sharp(srcImg)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 2. Standard PWA 512x512
  await sharp(srcImg)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 3. Apple Touch Icon 180x180
  await sharp(srcImg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 4. Favicons
  await sharp(srcImg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(srcImg)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // 5. Maskable icons (requires 10-15% safe-zone margin around the icon)
  // For 512x512: Inner icon ~410x410 on #1c1917 background
  const inner512 = await sharp(srcImg)
    .resize(410, 410)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 28, g: 25, b: 23, alpha: 1 }, // #1c1917
    },
  })
    .composite([{ input: inner512, top: 51, left: 51 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // For 192x192 maskable
  const inner192 = await sharp(srcImg)
    .resize(154, 154)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 28, g: 25, b: 23, alpha: 1 },
    },
  })
    .composite([{ input: inner192, top: 19, left: 19 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-192x192.png'));
  console.log('Generated pwa-maskable-192x192.png');

  console.log('All icons successfully created in /public');
}

generate().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
