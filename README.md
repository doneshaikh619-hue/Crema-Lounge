# Crema Lounge — Premium Restaurant & Cafe Website
> **F-7 Markaz, Islamabad • Open 24 Hours**  
> Built with HTML5, CSS3, Vanilla JavaScript, GSAP, Anime.js, and Direct WhatsApp Ordering.

![Crema Lounge Preview](https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Overview & Architectural Philosophy

This project is a high-performance, conversion-engineered, production-ready restaurant website built from two primary sources:
1. **Google Maps Business Details (Factual Content Source)**:
   - **Business Name**: Crema Lounge
   - **Category**: Cafe & Restaurant / Dine-in
   - **Location**: Lower Ground, Foliage Mall, Bhittai Rd, F-7 Markaz, Islamabad, 44210, Pakistan
   - **Plus Code**: P3C4+2V Islamabad, Pakistan
   - **Hours**: Open 24 hours daily (Monday through Sunday)
   - **Phone & WhatsApp**: `+92 308 9482193` (`923089482193`)
   - **Verified Google Rating**: 4.8 ★ (115 Verified Reviews)
   - **Real Customer Highlights**: Spanish Latte, Handcrafted Cheesecakes, Board Games, Kind Hospitality, Late-Night Ambience.

2. **Design Language & Reference Aesthetics (Visual UI/UX Source)**:
   - Deep cinematic charcoal/dark slate theme accented by radiant warm amber orange (`#FF8A00`).
   - Seamless torn paper/organic grunge transition dividing the dark hero from the warm cream body (`#FBF8F3`).
   - Asymmetric 3-column "About Us" layout with floating 24/7 badge and 4-grid feature box.
   - Popular Dishes carousel with navigation arrows, "Best Seller" badges, and interactive "+" add-to-cart controls.
   - Elegant dark reservation banner and authentic reviews showcase.
   - Slide-in shopping cart drawer with free delivery progress calculation.
   - Streamlined checkout modal with address validation and direct WhatsApp click-to-chat order generation.

---

## 🚀 Key Features

### 🛒 1. Dynamic Shopping Cart & Drawer
- **Persistent State**: Cart is preserved across browser refreshes using `localStorage`.
- **Instant Quantity Stepper**: Smooth item increment (`+`), decrement (`-`), and item removal.
- **Calculations**: Accurate subtotal, dynamic delivery fee calculation (`Rs 150` standard delivery; **FREE Delivery** automatically unlocked on orders over `Rs 3,000`), and grand total.
- **Anime.js Micro-Interactions**: Elastic bump on cart badge counter and button pulses upon adding items.

### 📱 2. Seamless WhatsApp Ordering Flow
- **Single Source of Truth**: Configured via a single variable `const WHATSAPP_NUMBER = "923089482193";`.
- **Validation**: Strict validation for customer name, phone number, and delivery address before checkout.
- **Instant Address Presets**: Quick one-click sector buttons for Islamabad (`F-7`, `F-6`, `F-8`, `Blue Area`, `Dine-in Table`).
- **Clean Message Generation**:
  Formats order data into a clean WhatsApp template:
  ```
  *NEW ORDER — CREMA LOUNGE*

  *Customer Details:*
  • Name: John Doe
  • Phone: 0300 1234567
  • Delivery Address: House 12, Street 45, Sector F-7/2, Islamabad

  *ORDER ITEMS:*
  1. Signature Spanish Latte × 2 — Rs 1,700
  2. Lotus Biscoff Cheesecake × 1 — Rs 1,050
  3. Creamy Fettuccine Alfredo × 1 — Rs 1,450

  *Summary:*
  • Subtotal: Rs 4,200
  • Delivery: FREE
  • *TOTAL:* *Rs 4,200*

  *Additional Notes:*
  Please send extra napkins and sugar.

  _Order placed via Crema Lounge Online_
  ```

### 🛰️ 3. Google Maps Live Data Parser & Setup Tool
- Includes an interactive **Google Maps Business Data Parser** modal (accessible from the top bar or footer "Update Business Info" button).
- Enables the restaurant owner or agency to paste raw Google Maps text dumps.
- Automatically regex-parses restaurant name, phone, address, operating hours, ratings, plus code, and delivery links, instantly updating the site DOM and WhatsApp destination without touching code.

### 🎬 4. High-Performance Motion Design (GSAP + Anime.js)
- **GSAP 3.12 + ScrollTrigger**:
  - Choreographed hero section entrance.
  - Scroll-triggered staggered reveal of food cards, feature boxes, and customer testimonials.
  - Sticky glassmorphic navbar elevation.
- **Anime.js 3.2**:
  - Tactile micro-interactions for buttons and cart icon.
  - Smooth spring modals and drawer slides.

---

## 📂 Project Structure

```
crema-lounge-islamabad/
├── index.html       # Semantic HTML5 layout, Schema.org JSON-LD, Open Graph SEO
├── style.css        # Responsive design system, reference-matching color palette
├── script.js        # Cart logic, WhatsApp message generator, Google Maps parser, GSAP & Anime.js
├── assets/
│   └── images/      # Local media directory
└── README.md        # Documentation and deployment guide
```

---

## ⚡ How to Run Locally

You can preview the project using any standard HTTP server or opening directly in your browser:

### Option A: Using Python (Built-in)
```bash
cd "crema-lounge-islamabad"
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option B: Using Node.js (npx serve)
```bash
cd "crema-lounge-islamabad"
npx serve .
```

### Option C: Direct File Opening
Double-click `index.html` to open in Google Chrome, Microsoft Edge, Safari, or Firefox.

---

## 🏷️ Credits & Agency Attribution

- **Client**: Crema Lounge (Foliage Mall, F-7 Markaz, Islamabad, Pakistan)
- **Agency Attribution**:
  Powered by [Growech Solution](https://growech.site)
