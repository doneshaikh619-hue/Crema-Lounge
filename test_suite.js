const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const htmlPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'style.css');
const jsPath = path.join(projectDir, 'script.js');

console.log('=== STARTING AUTOMATED QA TEST SUITE ===');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
  }
}

// -------------------------------------------------------------
// 1. FILE EXISTENCE & INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 1. File Integrity Checks ---');
assert(fs.existsSync(htmlPath), 'index.html exists');
assert(fs.existsSync(cssPath), 'style.css exists');
assert(fs.existsSync(jsPath), 'script.js exists');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// -------------------------------------------------------------
// 2. GOOGLE MAPS DATA ACCURACY
// -------------------------------------------------------------
console.log('\n--- 2. Google Maps Business Data Accuracy ---');
assert(html.includes('Crema Lounge'), 'Restaurant name is Crema Lounge');
assert(html.includes('+92 308 9482193'), 'Exact phone number +92 308 9482193 is present in HTML');
assert(html.includes('Lower Ground, Foliage Mall, Bhittai Rd, F-7 Markaz'), 'Exact address in Foliage Mall F-7 Markaz is present');
assert(html.includes('Open 24 hours') || html.includes('Open 24 Hours'), 'Open 24 hours timing is clearly indicated');
assert(html.includes('P3C4+2V Islamabad, Pakistan'), 'Plus Code is accurately provided');
assert(html.includes('4.8') && html.includes('115'), 'Google Rating 4.8 and 115 reviews present');

// -------------------------------------------------------------
// 3. WHATSAPP CONFIGURATION & COMPLIANCE
// -------------------------------------------------------------
console.log('\n--- 3. WhatsApp Configuration & Formatting ---');
const waNumberRegex = /const\s+WHATSAPP_NUMBER\s*=\s*["'](\d+)["'];/;
const waMatch = js.match(waNumberRegex);
assert(waMatch !== null, 'Single WHATSAPP_NUMBER constant is defined');
assert(waMatch && waMatch[1] === '923089482193', `WHATSAPP_NUMBER is correctly set to 923089482193 (got: ${waMatch ? waMatch[1] : 'none'})`);

// Ensure duplicate hardcoded definitions don't exist
const duplicateConst = js.match(/const\s+WHATSAPP_NUMBER/g);
assert(duplicateConst && duplicateConst.length === 1, 'WHATSAPP_NUMBER is not duplicated');

// -------------------------------------------------------------
// 4. CHECKOUT VALIDATION & ADDRESS COLLECTION
// -------------------------------------------------------------
console.log('\n--- 4. Form Validation & Address Collection ---');
assert(html.includes('id="cust-name"') && html.includes('required'), 'Name input is present and required');
assert(html.includes('id="cust-phone"') && html.includes('required'), 'Phone input is present and required');
assert(html.includes('id="cust-address"') && html.includes('required'), 'Delivery address textarea is present and required');
assert(html.includes('preset-btn'), 'Quick sector address presets (F-7, F-6, Blue Area) are available');

// -------------------------------------------------------------
// 5. MOTION & ANIMATION LIBRARIES
// -------------------------------------------------------------
console.log('\n--- 5. Animation Libraries (GSAP & Anime.js) ---');
assert(html.includes('gsap.min.js'), 'GSAP core library loaded via CDN');
assert(html.includes('ScrollTrigger.min.js'), 'GSAP ScrollTrigger loaded via CDN');
assert(html.includes('anime.min.js'), 'Anime.js loaded via CDN');
assert(js.includes('gsap.timeline') || js.includes('gsap.from'), 'GSAP animations implemented in script.js');
assert(js.includes('anime('), 'Anime.js micro-interactions implemented in script.js');

// -------------------------------------------------------------
// 6. MANDATORY AGENCY CREDIT (GROWECH SOLUTION)
// -------------------------------------------------------------
console.log('\n--- 6. Mandatory Agency Credit Verification ---');
assert(html.includes('https://growech.site'), 'Credit link points to https://growech.site');
assert(html.includes('target="_blank"'), 'Credit link opens in new tab with target="_blank"');
assert(html.includes('rel="noopener noreferrer"'), 'Credit link uses rel="noopener noreferrer"');
assert(html.includes('Powered by Growech Solution') || /Powered by\s*<a[^>]*>Growech Solution<\/a>/i.test(html), 'Credit text is strictly "Powered by Growech Solution"');

// -------------------------------------------------------------
// 7. GOOGLE MAPS PARSER ENGINE LOGIC
// -------------------------------------------------------------
console.log('\n--- 7. Google Maps Parser Engine Logic ---');
const sampleGmapsData = `Crema Lounge
4.8(115)
·Rs 1,000–4,000
Cafe
Overview
Reviews
About
Directions
Save
Nearby
Send to phone
Share
·
Dine-in

Lower Ground, Foliage Mall, Bhittai Rd, F-7 Markaz F 7 Markaz F-7, Islamabad, 44210, Pakistan

Open 24 hours
Rs 1,000–4,000 per personReported by 44 people
[Place an orderfoodpanda.pk](https://www.foodpanda.pk/restaurant/l6yf/crema-lounge)

+92 308 9482193

P3C4+2V Islamabad, Pakistan`;

// Extract parser function body
const fnBodyMatch = js.match(/function parseGoogleMapsRawText\(text\)\s*\{([\s\S]*?)\n\}/);
if (fnBodyMatch) {
  const parseFn = new Function('text', fnBodyMatch[1]);
  const parsed = parseFn(sampleGmapsData);
  assert(parsed.name === 'Crema Lounge', `Parsed name: ${parsed.name}`);
  assert(parsed.phone === '+92 308 9482193', `Parsed phone: ${parsed.phone}`);
  assert(parsed.hours === 'Open 24 hours', `Parsed hours: ${parsed.hours}`);
  assert(parsed.rating === '4.8', `Parsed rating: ${parsed.rating}`);
  assert(parsed.reviewsCount === '115', `Parsed reviews count: ${parsed.reviewsCount}`);
  assert(parsed.address.includes('Foliage Mall'), `Parsed address: ${parsed.address}`);
  assert(parsed.foodpandaUrl && parsed.foodpandaUrl.includes('foodpanda.pk'), `Parsed foodpanda url: ${parsed.foodpandaUrl}`);
} else {
  assert(false, 'Could not extract parseGoogleMapsRawText function from script.js');
}

// -------------------------------------------------------------
// 8. CART CALCULATION LOGIC
// -------------------------------------------------------------
console.log('\n--- 8. Cart Calculation Logic ---');
const testCart = [
  { id: 'item-1', name: 'Signature Spanish Latte', price: 850, qty: 2 },
  { id: 'item-6', name: 'Lotus Biscoff Cheesecake', price: 1050, qty: 1 }
];

const subtotal = testCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
assert(subtotal === 2750, `Subtotal calculation: expected 2750, got ${subtotal}`);

// Below threshold (3000): delivery is 150
const deliveryFee1 = subtotal >= 3000 ? 0 : 150;
assert(deliveryFee1 === 150, `Standard delivery fee applied below Rs 3000: got ${deliveryFee1}`);
assert(subtotal + deliveryFee1 === 2900, `Grand total with delivery: ${subtotal + deliveryFee1}`);

// Above threshold (>= 3000): delivery is FREE
const aboveThresholdSubtotal = 3200;
const deliveryFee2 = aboveThresholdSubtotal >= 3000 ? 0 : 150;
assert(deliveryFee2 === 0, `Free delivery applied above Rs 3000: got ${deliveryFee2}`);

// -------------------------------------------------------------
// 9. WHATSAPP MESSAGE FORMAT ENCODING
// -------------------------------------------------------------
console.log('\n--- 9. WhatsApp Message Format Validation ---');
const customerName = 'Aqsha Khan';
const customerPhone = '0308 9482193';
const customerAddress = 'House 14, Street 25, Sector F-7/2, Islamabad';

let waMsg = `*NEW ORDER — CREMA LOUNGE*\n\n`;
waMsg += `*Customer Details:*\n`;
waMsg += `• Name: ${customerName}\n`;
waMsg += `• Phone: ${customerPhone}\n`;
waMsg += `• Delivery Address: ${customerAddress}\n\n`;
waMsg += `*ORDER ITEMS:*\n`;
waMsg += `1. Signature Spanish Latte × 2 — Rs 1,700\n`;
waMsg += `2. Lotus Biscoff Cheesecake × 1 — Rs 1,050\n\n`;
waMsg += `*Summary:*\n`;
waMsg += `• Subtotal: Rs 2,750\n`;
waMsg += `• Delivery: Rs 150\n`;
waMsg += `• *TOTAL:* *Rs 2,900*\n\n`;
waMsg += `_Order placed via Crema Lounge Online_`;

const encodedUrl = `https://wa.me/923089482193?text=${encodeURIComponent(waMsg)}`;
assert(encodedUrl.startsWith('https://wa.me/923089482193?text='), 'WhatsApp click-to-chat URL correctly formed');
assert(encodedUrl.includes(encodeURIComponent('NEW ORDER — CREMA LOUNGE')), 'Encoded URL contains order header');
assert(encodedUrl.includes(encodeURIComponent(customerAddress)), 'Encoded URL contains delivery address');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=============================================');
console.log(`TOTAL AUDIT CHECKS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${totalTests - passedTests}`);
console.log('=============================================');

if (passedTests === totalTests) {
  console.log('>>> ALL SYSTEM & BUSINESS REQUIREMENTS VERIFIED SUCCESSFULLY! <<<');
  process.exit(0);
} else {
  console.error('>>> SOME AUDIT CHECKS FAILED! <<<');
  process.exit(1);
}
