const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputImage = path.join(__dirname, '../public/muhammad-ali.png');
const outputFavicon = path.join(__dirname, '../public/favicon.png');
const outputIcon = path.join(__dirname, '../app/icon.png');

async function createCircularFavicon() {
  try {
    // Read the input image
    const image = sharp(inputImage);
    const metadata = await image.metadata();
    
    // Get the smaller dimension to ensure it's square
    const size = Math.min(metadata.width, metadata.height);
    
    // Create a circular mask
    const svgMask = `
      <svg width="${size}" height="${size}">
        <defs>
          <clipPath id="circle">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/>
          </clipPath>
        </defs>
        <rect width="${size}" height="${size}" fill="black" clip-path="url(#circle)"/>
      </svg>
    `;
    
    // Process the image: resize to square, apply circular mask, and convert to PNG
    const circularImage = await image
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .composite([
        {
          input: Buffer.from(svgMask),
          blend: 'dest-in'
        }
      ])
      .png()
      .toBuffer();
    
    // Save to public folder
    fs.writeFileSync(outputFavicon, circularImage);
    console.log(`✅ Created circular favicon: ${outputFavicon}`);
    
    // Also save to app folder for Next.js automatic icon detection
    // Create app directory if it doesn't exist
    const appDir = path.dirname(outputIcon);
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }
    
    // Generate multiple sizes for better browser support
    const sizes = [32, 64, 128, 256, 512];
    
    for (const faviconSize of sizes) {
      const resized = await sharp(circularImage)
        .resize(faviconSize, faviconSize)
        .png()
        .toBuffer();
      
      if (faviconSize === 32) {
        // Save 32x32 as the main favicon
        fs.writeFileSync(outputFavicon, resized);
      }
    }
    
    // Save 512x512 as app/icon.png (Next.js will use this automatically)
    const icon512 = await sharp(circularImage)
      .resize(512, 512)
      .png()
      .toBuffer();
    
    fs.writeFileSync(outputIcon, icon512);
    console.log(`✅ Created app icon: ${outputIcon}`);
    console.log('✅ Circular favicon generation complete!');
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

createCircularFavicon();


