const fs = require('fs');
const path = require('path');

const LOGO_PATHS = `<path d="M72.6592 181.016C81.3073 181.016 88.3184 188.027 88.3184 196.675C88.3183 205.323 81.3073 212.334 72.6592 212.334C64.011 212.334 57 205.323 57 196.675C57 188.027 64.011 181.016 72.6592 181.016Z" fill="#8CC73A"/>
<path d="M72.6592 94.8916C80.7513 94.8917 87.4087 101.03 88.2314 108.904L177.243 181.841C178.821 181.306 180.513 181.016 182.271 181.016C190.92 181.016 197.931 188.027 197.931 196.675C197.931 205.323 190.92 212.334 182.271 212.334C173.623 212.334 166.612 205.323 166.612 196.675C166.612 196.365 166.622 196.057 166.64 195.751L79.7207 124.528C77.5988 125.602 75.2001 126.21 72.6592 126.21C64.0111 126.21 57.0001 119.199 57 110.551C57 101.903 64.011 94.8916 72.6592 94.8916Z" fill="#8CC73A"/>
<path d="M72.6592 141.868C79.145 141.868 84.4031 147.126 84.4033 153.612C84.4033 155.242 84.0707 156.794 83.4707 158.205L103.036 174.237C104.516 173.564 106.16 173.187 107.892 173.187C114.378 173.187 119.636 178.445 119.636 184.931C119.636 191.417 114.378 196.675 107.892 196.675C101.406 196.675 96.1475 191.417 96.1475 184.931C96.1475 182.703 96.7668 180.62 97.8438 178.846L79.0615 163.455C77.2196 164.656 75.0219 165.356 72.6592 165.356C66.173 165.356 60.9141 160.098 60.9141 153.612C60.9143 147.126 66.1732 141.868 72.6592 141.868Z" fill="#8CC73A"/>
<path d="M72.6592 44C81.3073 44.0001 88.3184 51.0111 88.3184 59.6592C88.3183 60.6273 88.2287 61.5746 88.0605 62.4941L176.644 135.081C178.39 134.408 180.288 134.039 182.271 134.039C190.92 134.039 197.931 141.05 197.931 149.698C197.931 158.346 190.92 165.356 182.271 165.356C173.623 165.356 166.612 158.346 166.612 149.698C166.612 149.619 166.613 149.539 166.614 149.46L75.7568 75.0107C74.7555 75.2117 73.7197 75.3183 72.6592 75.3184C64.0111 75.3184 57.0001 68.3073 57 59.6592C57 51.011 64.011 44 72.6592 44Z" fill="#8CC73A"/>
<path d="M139.209 59.6592C145.695 59.6592 150.953 64.9172 150.953 71.4033C150.953 72.3015 150.848 73.1752 150.657 74.0156L177.417 95.9424C178.897 95.2694 180.54 94.8916 182.271 94.8916C188.758 94.8916 194.016 100.15 194.016 106.636C194.016 113.122 188.758 118.38 182.271 118.38C175.785 118.38 170.527 113.122 170.527 106.636C170.527 104.408 171.148 102.325 172.225 100.551L147.178 80.0273C145.084 81.9629 142.285 83.1475 139.209 83.1475C132.723 83.1474 127.465 77.8893 127.465 71.4033C127.465 64.9172 132.723 59.6593 139.209 59.6592Z" fill="#8CC73A"/>
<path d="M182.271 44C190.92 44 197.931 51.011 197.931 59.6592C197.931 68.3073 190.92 75.3183 182.271 75.3184C173.623 75.3184 166.612 68.3073 166.612 59.6592C166.612 51.011 173.623 44 182.271 44Z" fill="#8CC73A"/>
<path d="M240 127.5C240 65.368 189.632 15 127.5 15C65.368 15 15 65.368 15 127.5C15 189.632 65.368 240 127.5 240V255C57.0837 255 0 197.916 0 127.5C0 57.0837 57.0837 0 127.5 0C197.916 0 255 57.0837 255 127.5C255 197.916 197.916 255 127.5 255V240C189.632 240 240 189.632 240 127.5Z" fill="#8CC73A"/>`;

function makeIcon(size, rx, fillPercent) {
  fillPercent = fillPercent || 0.78;
  const s = (size * fillPercent) / 255;
  const offset = (size - 255 * s) / 2;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'">\n' +
    '  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f3460"/></linearGradient></defs>\n' +
    '  <rect width="'+size+'" height="'+size+'" rx="'+rx+'" fill="url(#bg)"/>\n' +
    '  <g transform="translate('+offset.toFixed(2)+', '+offset.toFixed(2)+') scale('+s.toFixed(4)+')">\n' +
    LOGO_PATHS + '\n  </g>\n</svg>';
}

function makeMaskable(size) {
  const s = (size * 0.6) / 255;
  const offset = (size - 255 * s) / 2;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'">\n' +
    '  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f3460"/></linearGradient></defs>\n' +
    '  <rect width="'+size+'" height="'+size+'" fill="url(#bg)"/>\n' +
    '  <g transform="translate('+offset.toFixed(2)+', '+offset.toFixed(2)+') scale('+s.toFixed(4)+')">\n' +
    LOGO_PATHS + '\n  </g>\n</svg>';
}

function makeSocial(w, h, logoSize, logoX, logoY, textX, textY, tagY) {
  const s = logoSize / 255;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'">\n' +
    '  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f3460"/></linearGradient></defs>\n' +
    '  <rect width="'+w+'" height="'+h+'" fill="url(#bg)"/>\n' +
    '  <g transform="translate('+logoX+', '+logoY+') scale('+s.toFixed(4)+')">\n' +
    LOGO_PATHS + '\n  </g>\n' +
    '  <text x="'+textX+'" y="'+textY+'" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="64" fill="#ffffff" letter-spacing="3">NODE</text>\n' +
    '  <text x="'+(textX+280)+'" y="'+textY+'" font-family="Poppins, Arial, sans-serif" font-weight="800" font-size="64" fill="#8CC73A" letter-spacing="4">509</text>\n' +
    '  <text x="'+textX+'" y="'+tagY+'" font-family="Poppins, Arial, sans-serif" font-weight="400" font-size="22" fill="rgba(255,255,255,0.55)">Platfom Evenman #1 an Ayiti</text>\n' +
    '</svg>';
}

function makeSplash(w, h, logoSize) {
  const s = logoSize / 255;
  const lx = (w - logoSize) / 2;
  const ly = h * 0.3;
  const tx = w / 2;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'">\n' +
    '  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0b0b14"/><stop offset="50%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f3460"/></linearGradient></defs>\n' +
    '  <rect width="'+w+'" height="'+h+'" fill="url(#bg)"/>\n' +
    '  <g transform="translate('+lx.toFixed(0)+', '+ly.toFixed(0)+') scale('+s.toFixed(4)+')">\n' +
    LOGO_PATHS + '\n  </g>\n' +
    '  <text x="'+tx+'" y="'+(ly+logoSize+60).toFixed(0)+'" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="36" fill="#ffffff" letter-spacing="3">NODE<tspan fill="#8CC73A" font-weight="800">509</tspan></text>\n' +
    '  <text x="'+tx+'" y="'+(h*0.9).toFixed(0)+'" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="400" font-size="16" fill="rgba(255,255,255,0.4)">Platfom Evenman #1 an Ayiti</text>\n' +
    '</svg>';
}

var dir = __dirname;

// PWA Icons
[16,32,48,72,96,128,144,152,192,384,512].forEach(function(s) {
  var rx = Math.round(s / 8);
  fs.writeFileSync(path.join(dir, 'icons/pwa/icon-'+s+'x'+s+'.svg'), makeIcon(s, rx));
  console.log('icons/pwa/icon-'+s+'x'+s+'.svg');
});
[192, 512].forEach(function(s) {
  fs.writeFileSync(path.join(dir, 'icons/pwa/icon-maskable-'+s+'x'+s+'.svg'), makeMaskable(s));
  console.log('icons/pwa/icon-maskable-'+s+'x'+s+'.svg');
});

// Favicons
[16, 32].forEach(function(s) {
  fs.writeFileSync(path.join(dir, 'icons/favicon/favicon-'+s+'x'+s+'.svg'), makeIcon(s, Math.round(s/8)));
  console.log('icons/favicon/favicon-'+s+'x'+s+'.svg');
});
fs.writeFileSync(path.join(dir, 'icons/favicon/favicon.svg'), makeIcon(32, 4));
console.log('icons/favicon/favicon.svg');

// Apple Touch
[[120,27],[152,34],[180,40]].forEach(function(pair) {
  fs.writeFileSync(path.join(dir, 'icons/apple-touch/apple-touch-icon-'+pair[0]+'x'+pair[0]+'.svg'), makeIcon(pair[0], pair[1], 0.82));
  console.log('icons/apple-touch/apple-touch-icon-'+pair[0]+'x'+pair[0]+'.svg');
});
fs.writeFileSync(path.join(dir, 'icons/apple-touch/apple-touch-icon.svg'), makeIcon(180, 40, 0.82));
console.log('icons/apple-touch/apple-touch-icon.svg');

// Social
fs.writeFileSync(path.join(dir, 'social/og-image.svg'), makeSocial(1200, 630, 260, 120, 185, 480, 350, 400));
fs.writeFileSync(path.join(dir, 'social/twitter-card.svg'), makeSocial(1200, 600, 240, 120, 180, 460, 340, 385));
fs.writeFileSync(path.join(dir, 'social/facebook-cover.svg'), makeSocial(820, 312, 160, 60, 76, 280, 200, 240));

var igS = 240 / 255;
var igOff = (320 - 240) / 2;
fs.writeFileSync(path.join(dir, 'social/instagram-profile.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">\n' +
  '  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f3460"/></linearGradient></defs>\n' +
  '  <rect width="320" height="320" rx="40" fill="url(#bg)"/>\n' +
  '  <g transform="translate('+igOff+', '+igOff+') scale('+igS.toFixed(4)+')">\n' +
  LOGO_PATHS + '\n  </g>\n</svg>');
console.log('social/ (4 files)');

// Splash screens
[[640,1136,200],[750,1334,220],[1125,2436,300],[1242,2688,320],[1536,2048,350],[2048,2732,400]].forEach(function(t) {
  fs.writeFileSync(path.join(dir, 'splash-screens/splash-'+t[0]+'x'+t[1]+'.svg'), makeSplash(t[0], t[1], t[2]));
  console.log('splash-screens/splash-'+t[0]+'x'+t[1]+'.svg');
});

console.log('\nAll 35 branding SVGs updated with real Node509 logo!');
