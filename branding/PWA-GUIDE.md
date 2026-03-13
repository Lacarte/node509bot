# Node509 PWA Branding & Asset Generation Guide

## Brand Identity

| Property         | Value                                        |
|------------------|----------------------------------------------|
| Name             | Node509                                      |
| Tagline (EN)     | Haiti's Premier Event Platform               |
| Tagline (HT)     | Platfom #1 an Ayiti                          |
| Primary Color    | `#8CC73A` (green)                            |
| Primary Dark     | `#6fa62d`                                    |
| Primary Glow     | `rgba(140, 199, 58, 0.35)`                  |
| Secondary        | `#1a1a2e` (dark navy)                        |
| Secondary Light  | `#16213e` (deep blue)                        |
| Accent           | `#ff6b6b` (coral — CTAs, badges)             |
| Accent Hover     | `#ff5252`                                    |
| Background       | `#0b0b14` (near-black)                       |
| Surface          | `rgba(255, 255, 255, 0.04)`                  |
| Border           | `rgba(255, 255, 255, 0.07)`                  |
| Text Light       | `#ffffff`                                    |
| Text Muted       | `rgba(255, 255, 255, 0.55)`                  |
| Font             | Poppins (Google Fonts) — 300-800 weights      |
| Theme Color      | `#8CC73A`                                    |
| Background Color | `#0b0b14`                                    |

## Logo

The Node509 logo is a **circuit-node network pattern** — interconnected dots and lines forming a diagonal network inside an open circle. The logo represents connectivity and technology.

- **Logo files**: `logo/Vector.svg` / `Vector.png` (full logo with circle)
- **Symbol only**: `logo/Group 10.svg` / `Group 10.png` (network pattern without circle)
- **Logo color**: `#8CC73A` (single-color green on transparent background)
- **Country code**: 509 = Haiti's international dialing code

### Logo Usage Rules
- On dark backgrounds: use the green `#8CC73A` logo as-is
- On light backgrounds: use `#8CC73A` or dark variant `#1a1a2e`
- Minimum clear space: equal to the height of one node dot
- Never stretch, rotate, or recolor outside approved palette

## Typography

| Usage       | Weight | Size (Desktop)    | Size (Mobile)     |
|-------------|--------|-------------------|-------------------|
| H1 Hero     | 800    | clamp(2.6-3.8rem) | clamp(2-2.6rem)   |
| H2 Section  | 700    | clamp(2-2.8rem)   | clamp(1.8-2rem)   |
| H3 Card     | 600    | 1.2rem            | 1.1rem            |
| H4 Feature  | 600    | 1.08rem           | 1rem              |
| Body        | 400    | 0.95rem           | 0.9rem            |
| Small/Label | 500    | 0.82rem           | 0.78rem           |
| Button      | 600    | 0.95rem           | 0.88rem           |

## Spacing & Radius

| Token       | Value  |
|-------------|--------|
| radius-sm   | 8px    |
| radius-md   | 14px   |
| radius-lg   | 20px   |
| radius-xl   | 28px   |
| radius-full | 9999px |
| section-pad | 100px (desktop), 70px (mobile) |
| container   | 1200px max-width, 24px padding |

## Language

Primary: **Haitian Creole (ht)** with French/English mix

| UI Term       | Haitian Creole       |
|---------------|----------------------|
| Buy Tickets   | Achte Tike           |
| Events        | Evenman              |
| Tickets       | Tike                 |
| Search        | Cheche               |
| Subscribe     | Enskri               |
| How It Works  | Kijan Sa Mache       |
| Why Us        | Poukisa Node509      |
| Categories    | Kategori             |
| Upcoming      | Pwochen Evenman      |
| Contact       | Kontakte Nou         |
| About         | Konsenan Nou         |

## Payment Methods

- MonCash (primary - Digicel)
- Natcash (Natcom)
- Visa
- Mastercard

## Chatbot Integration

| Property    | Value |
|-------------|-------|
| Platform    | n8n (self-hosted on Railway) |
| Webhook URL | `https://n8n-production-6197.up.railway.app/webhook/97fe3c8c-bfab-48b1-823a-5f9fa3a8bca4/chat` |
| Method      | POST JSON `{ "message": "..." }` |
| Response    | `{ "output": "..." }` |
| Widget      | Floating FAB, bottom-right |
| Colors      | Match brand theme |

## Social Links

- Instagram
- Facebook
- Twitter/X
- TikTok

---

## Folder Structure

```
branding/
├── logos/
│   ├── logo-primary.svg          # Full logo (icon + text) on dark bg
│   ├── logo-icon.svg             # Icon only on dark bg (square)
│   ├── logo-icon-transparent.svg # Icon only, no background
│   ├── logo-wordmark.svg         # Horizontal logo (light text)
│   └── logo-wordmark-dark.svg    # Horizontal logo (dark text, for light bg)
├── icons/
│   ├── pwa/                      # All PWA icon sizes (SVG placeholders)
│   ├── favicon/                  # Favicon SVGs
│   └── apple-touch/              # Apple touch icon SVGs
├── social/
│   ├── og-image.svg              # Open Graph 1200x630
│   ├── twitter-card.svg          # Twitter Card 1200x600
│   ├── facebook-cover.svg        # Facebook Cover 820x312
│   └── instagram-profile.svg     # Instagram 320x320
├── splash-screens/               # iOS splash screen SVGs
├── manifest.json                 # PWA Web App Manifest
└── PWA-GUIDE.md                  # This file

logo/                             # ACTUAL logo source files
├── Vector.svg                    # Full logo (circle + network)
├── Vector.png                    # Full logo raster
├── Group 10.svg                  # Symbol only (network pattern)
└── Group 10.png                  # Symbol only raster
```

---

## Step 1: Convert SVG Placeholders to Final PNGs

The SVG files in `branding/` are placeholders using the brand color `#8CC73A`. Replace them with final designs based on the actual logo in `logo/`.

### Option A: Node.js + Sharp

```bash
npm install sharp
```

```js
// convert-icons.js
const sharp = require('sharp');
const path = require('path');

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

async function convert() {
  const source = path.join(__dirname, '../logo/Vector.svg');

  for (const size of sizes) {
    await sharp(source)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `icons/pwa/icon-${size}x${size}.png`));
    console.log(`Created icon-${size}x${size}.png`);
  }

  // Maskable icons (full bleed bg, icon in safe zone)
  for (const size of [192, 512]) {
    await sharp(path.join(__dirname, `icons/pwa/icon-maskable-${size}x${size}.svg`))
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `icons/pwa/icon-maskable-${size}x${size}.png`));
  }

  // Favicons
  await sharp(source).resize(16, 16).png().toFile(path.join(__dirname, 'icons/favicon/favicon-16x16.png'));
  await sharp(source).resize(32, 32).png().toFile(path.join(__dirname, 'icons/favicon/favicon-32x32.png'));

  // Apple Touch Icons
  for (const size of [120, 152, 180]) {
    await sharp(source)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `icons/apple-touch/apple-touch-icon-${size}x${size}.png`));
  }
  await sharp(source).resize(180, 180).png().toFile(path.join(__dirname, 'icons/apple-touch/apple-touch-icon.png'));

  // Social images
  await sharp(path.join(__dirname, 'social/og-image.svg')).resize(1200, 630).png().toFile(path.join(__dirname, 'social/og-image.png'));
  await sharp(path.join(__dirname, 'social/twitter-card.svg')).resize(1200, 600).png().toFile(path.join(__dirname, 'social/twitter-card.png'));

  console.log('All icons generated!');
}

convert().catch(console.error);
```

### Option B: Figma / Canva
1. Import `logo/Vector.svg` into Figma
2. Export at each required size as PNG
3. Place files in the corresponding folders

### Option C: Online Tools
- **RealFaviconGenerator** — Upload SVG, get all favicon sizes
- **Maskable.app** — Test maskable icons in safe zone

---

## Step 2: Generate favicon.ico

```bash
# Using ImageMagick
convert icons/favicon/favicon-16x16.png icons/favicon/favicon-32x32.png favicon.ico
```

---

## Step 3: HTML `<head>` Tags

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme Color -->
<meta name="theme-color" content="#8CC73A">
<meta name="msapplication-TileColor" content="#0b0b14">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/icons/logo.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png">

<!-- Apple PWA Settings -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Node509">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Node509 | Platfom Evenman #1 an Ayiti">
<meta property="og:description" content="Dekouvri konse, festival, ak evenman eksklizif nan tout Ayiti.">
<meta property="og:image" content="https://node509.com/social/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Node509 | Platfom Evenman #1 an Ayiti">
<meta name="twitter:description" content="Dekouvri konse, festival, ak evenman eksklizif nan tout Ayiti.">
<meta name="twitter:image" content="https://node509.com/social/twitter-card.png">

<!-- Microsoft Tile -->
<meta name="msapplication-TileImage" content="/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#0b0b14">
```

---

## Step 4: PWA Checklist

### Required for Install Prompt
- [x] `manifest.json` with `name`, `icons` (192+512), `start_url`, `display`
- [x] Service worker (via vite-plugin-pwa in PWA/ folder)
- [ ] Served over HTTPS
- [ ] At least one 192x192 PNG icon
- [ ] At least one 512x512 PNG icon

### Recommended
- [ ] Maskable icon (192+512) for adaptive shapes
- [ ] Apple touch icons for iOS
- [ ] Splash screens for iOS standalone mode
- [x] `theme_color` in manifest and `<meta>` tag
- [x] `background_color` in manifest
- [ ] `og:image` for social sharing
- [ ] `twitter:image` for Twitter cards
- [ ] Offline fallback page

### Testing Tools
- **Chrome DevTools** > Application > Manifest
- **Lighthouse** > PWA audit
- **Maskable.app Editor** > Test safe zone

---

## Quick Reference: All Required Sizes

### PWA Icons (manifest.json)
| Size    | File                          | Purpose            |
|---------|-------------------------------|---------------------|
| 16x16   | icon-16x16.png                | Smallest favicon    |
| 32x32   | icon-32x32.png                | Standard favicon    |
| 48x48   | icon-48x48.png                | Windows taskbar     |
| 72x72   | icon-72x72.png                | Android legacy      |
| 96x96   | icon-96x96.png                | Android legacy      |
| 128x128 | icon-128x128.png              | Chrome Web Store    |
| 144x144 | icon-144x144.png              | MS Tile, Android    |
| 152x152 | icon-152x152.png              | iPad retina         |
| 192x192 | icon-192x192.png              | Android (required)  |
| 384x384 | icon-384x384.png              | Android large       |
| 512x512 | icon-512x512.png              | Splash (required)   |
| 192x192 | icon-maskable-192x192.png     | Maskable            |
| 512x512 | icon-maskable-512x512.png     | Maskable            |

### Apple Touch Icons
| Size    | File                          | Device         |
|---------|-------------------------------|----------------|
| 120x120 | apple-touch-icon-120x120.png  | iPhone retina  |
| 152x152 | apple-touch-icon-152x152.png  | iPad retina    |
| 180x180 | apple-touch-icon-180x180.png  | iPhone 6+      |
| 180x180 | apple-touch-icon.png          | Default        |

### Social / OG Images
| Size     | File                  | Platform    |
|----------|-----------------------|-------------|
| 1200x630 | og-image.png          | Facebook/OG |
| 1200x600 | twitter-card.png      | Twitter     |
| 820x312  | facebook-cover.png    | FB cover    |
| 320x320  | instagram-profile.png | Instagram   |

### Splash Screens (iOS)
| Size       | File                   | Device        |
|------------|------------------------|---------------|
| 640x1136   | splash-640x1136.png    | iPhone SE     |
| 750x1334   | splash-750x1334.png    | iPhone 8      |
| 1125x2436  | splash-1125x2436.png   | iPhone X      |
| 1242x2688  | splash-1242x2688.png   | iPhone XS Max |
| 1536x2048  | splash-1536x2048.png   | iPad          |
| 2048x2732  | splash-2048x2732.png   | iPad Pro      |

---

## Event Data (Sample)

| Event                       | Date        | Venue                  | Price     |
|-----------------------------|-------------|------------------------|-----------|
| KAI Live in Concert         | 6 Fev 2026  | Karibe Hotel, PaP      | 2,500 HTG |
| Rutshelle Valentine Special | 14 Fev 2026 | Royal Oasis, PaP       | 3,000 HTG |
| Carnival Pre-Party          | 20 Fev 2026 | Champ de Mars, PaP     | 1,500 HTG |
| Harmonik Love Edition       | 14 Fev 2026 | NH Hotel, PaP          | 3,500 HTG |
| Kanaval 2026                | 22 Fev 2026 | Jacmel, Ayiti          | 500 HTG   |
| Kompa Night Live            | 28 Fev 2026 | Marriott, PaP          | 2,000 HTG |

## Event Categories

| Icon | Category | Count |
|------|----------|-------|
| 🎤   | Konse    | 120+  |
| 🎪   | Festival | 45+   |
| 🎷   | Jazz     | 30+   |
| 🎭   | Teyat    | 25+   |
| 🏟️   | Espo     | 60+   |
| 🎉   | Nightlife| 80+   |
