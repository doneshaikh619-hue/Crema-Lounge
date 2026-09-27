/**
 * CREMA LOUNGE — OFFICIAL JAVASCRIPT CONTROLLER
 * Architecture: Clean Vanilla JS, GSAP 3.12, Anime.js 3.2
 * Features: Menu Rendering, Cart Drawer, Checkout Validation, WhatsApp Click-to-Chat,
 *           Google Maps Live Data Parser, and Smooth Responsive Animations.
 */

// ==========================================================================
// 1. CENTRALIZED CONFIGURATION (Single Source of Truth)
// ==========================================================================
// IMPORTANT: Single configuration variable for the WhatsApp number as required by spec
const WHATSAPP_NUMBER = "923089482193"; // Format: Country code + number without '+' or special chars

const DEFAULT_CONFIG = {
  restaurantName: "Crema Lounge",
  whatsappNumber: WHATSAPP_NUMBER,
  phone: "+92 308 9482193",
  address: "Lower Ground, Foliage Mall, Bhittai Rd, F-7 Markaz, Islamabad, 44210, Pakistan",
  plusCode: "P3C4+2V Islamabad, Pakistan",
  hours: "Open 24 hours",
  category: "Cafe & Lounge • Dine-in & 24/7 Delivery",
  rating: "4.8",
  reviewsCount: "115",
  priceRange: "Rs 1,000–4,000",
  googleMapsUrl: "https://maps.google.com/?q=Crema+Lounge+Foliage+Mall+Bhittai+Rd+F-7+Markaz+Islamabad",
  foodpandaUrl: "https://www.foodpanda.pk/restaurant/l6yf/crema-lounge",
  currency: "Rs ",
  deliveryFee: 150,
  freeDeliveryThreshold: 3000
};

// Load saved config from localStorage if available, or fall back to DEFAULT_CONFIG
let CONFIG = (() => {
  try {
    const saved = localStorage.getItem("crema_config");
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : { ...DEFAULT_CONFIG };
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
})();

// ==========================================================================
// 2. AUTHENTIC MENU DATA (Tailored to Crema Lounge Google Maps Details)
// ==========================================================================
const MENU_ITEMS = [
  // --- SPECIALTY COFFEE ---
  {
    id: "item-1",
    name: "Signature Spanish Latte",
    desc: "Double espresso poured over silky condensed milk and steamed whole milk. Smooth, rich, and sweet.",
    price: 850,
    category: "coffee",
    popular: true,
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-2",
    name: "Iced Caramel Macchiato",
    desc: "Chilled rich espresso, vanilla syrup, cold milk, and artisan buttery caramel drizzle.",
    price: 890,
    category: "coffee",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-3",
    name: "Classic Cortado",
    desc: "Equal parts intense Spanish espresso and velvety warm milk. Balanced, bold, and pure.",
    price: 680,
    category: "coffee",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-4",
    name: "Vanilla Cold Brew",
    desc: "Steeped slowly for 18 hours for maximum smoothness, served over rock ice with vanilla sweet cream.",
    price: 790,
    category: "coffee",
    popular: false,
    badge: "Barista Pick",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
  },

  // --- HANDCRAFTED CHEESECAKES ---
  {
    id: "item-5",
    name: "New York Classic Cheesecake",
    desc: "Authentic dense and velvety cream cheese on a golden graham cracker crust with strawberry puree.",
    price: 950,
    category: "cheesecake",
    popular: true,
    badge: "Customer Favorite",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-6",
    name: "Lotus Biscoff Cheesecake",
    desc: "Infused with Lotus speculoos spread, crunchy biscuit layer, and melted biscoff glaze on top.",
    price: 1050,
    category: "cheesecake",
    popular: true,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-7",
    name: "San Sebastian Burnt Cheesecake",
    desc: "Basque-style caramelized crust with a molten, ultra-creamy custard center. Unforgettable.",
    price: 1100,
    category: "cheesecake",
    popular: false,
    badge: "Chef's Special",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-8",
    name: "Molten Chocolate Lava Cake",
    desc: "Warm Belgian chocolate cake with a flowing molten truffle center, served with French vanilla bean gelato.",
    price: 890,
    category: "cheesecake",
    popular: true,
    badge: "Must Try",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },

  // --- PASTAS & STEAKS ---
  {
    id: "item-9",
    name: "Creamy Fettuccine Alfredo",
    desc: "Al dente fettuccine tossed in rich garlic parmesan cream sauce, grilled chicken fillet, and fresh herbs.",
    price: 1450,
    category: "mains",
    popular: true,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-10",
    name: "Grilled Chicken Steak",
    desc: "Tender flame-grilled chicken breast served with creamy wild mushroom sauce, sautéed veggies & french fries.",
    price: 1750,
    category: "mains",
    popular: true,
    badge: "House Specialty",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-11",
    name: "Penne Spicy Arrabiata",
    desc: "Penne pasta cooked in spicy San Marzano tomato sauce with garlic, chili flakes, black olives, and basil.",
    price: 1350,
    category: "mains",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-12",
    name: "Artisan Margherita Pizza",
    desc: "Hand-stretched sourdough crust, sweet Italian marinara, melted mozzarella fior di latte, and fresh basil.",
    price: 1390,
    category: "mains",
    popular: true,
    badge: "Classic",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },

  // --- BURGERS & SANDWICHES ---
  {
    id: "item-13",
    name: "Truffle Smash Beef Burger",
    desc: "Twin crispy smashed Angus beef patties, melted sharp cheddar, caramelized onions, and black truffle mayo.",
    price: 1290,
    category: "burgers",
    popular: true,
    badge: "Top Pick",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-14",
    name: "Crispy Buttermilk Chicken Burger",
    desc: "Southern fried crunchy chicken thigh, creamy jalapeno coleslaw, house pickle chips, toasted brioche bun.",
    price: 1190,
    category: "burgers",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-15",
    name: "Crema Supreme Club Sandwich",
    desc: "Triple-decker toasted bread filled with roasted chicken breast, fried egg, cheese slice, lettuce, and fries.",
    price: 1050,
    category: "burgers",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },

  // --- REFRESHERS & SHAKES ---
  {
    id: "item-16",
    name: "Fresh Mint Lemonade",
    desc: "Blended fresh mountain mint, freshly squeezed lemons, crushed ice, and a dash of rock salt. Refreshing.",
    price: 550,
    category: "beverages",
    popular: false,
    badge: "Cooling",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-17",
    name: "Thick Lotus Biscoff Shake",
    desc: "Creamy vanilla ice cream blended with crushed Lotus biscuits, biscoff spread, topped with chantilly cream.",
    price: 850,
    category: "beverages",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-18",
    name: "Wild Berry Iced Tea",
    desc: "Chilled Ceylon black tea infused with natural raspberry, strawberry, and blueberry puree over mint ice.",
    price: 620,
    category: "beverages",
    popular: false,
    badge: null,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
  }
];

// ==========================================================================
// 3. SHOPPING CART STATE
// ==========================================================================
let cartState = (() => {
  try {
    const saved = localStorage.getItem("crema_cart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
})();

function saveCart() {
  try {
    localStorage.setItem("crema_cart", JSON.stringify(cartState));
  } catch (e) {
    console.error("Cart save error", e);
  }
}

// ==========================================================================
// 4. DOM ELEMENTS CACHE
// ==========================================================================
const DOM = {
  header: document.getElementById("site-header"),
  brandNames: document.querySelectorAll("#brand-name, #footer-brand-name"),
  cartToggleBtn: document.getElementById("cart-toggle-btn"),
  cartCounter: document.getElementById("cart-counter"),
  headerCartTotal: document.getElementById("header-cart-total"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartDrawerOverlay: document.getElementById("cart-drawer-overlay"),
  cartDrawerClose: document.getElementById("cart-drawer-close"),
  cartItemsContainer: document.getElementById("cart-items-container"),
  drawerItemCount: document.getElementById("drawer-item-count"),
  cartSubtotalVal: document.getElementById("cart-subtotal-val"),
  cartDeliveryVal: document.getElementById("cart-delivery-val"),
  cartGrandtotalVal: document.getElementById("cart-grandtotal-val"),
  thresholdMessage: document.getElementById("threshold-message"),
  thresholdPercent: document.getElementById("threshold-percent"),
  thresholdProgress: document.getElementById("threshold-progress"),
  btnClearCart: document.getElementById("btn-clear-cart"),
  btnProceedCheckout: document.getElementById("btn-proceed-checkout"),
  
  // Checkout Modal
  checkoutModalOverlay: document.getElementById("checkout-modal-overlay"),
  checkoutModalClose: document.getElementById("checkout-modal-close"),
  checkoutForm: document.getElementById("checkout-form"),
  custName: document.getElementById("cust-name"),
  custPhone: document.getElementById("cust-phone"),
  custAddress: document.getElementById("cust-address"),
  custNotes: document.getElementById("cust-notes"),
  custNameError: document.getElementById("cust-name-error"),
  custPhoneError: document.getElementById("cust-phone-error"),
  custAddressError: document.getElementById("cust-address-error"),
  modalSummaryItemcount: document.getElementById("modal-summary-itemcount"),
  modalSummaryTotal: document.getElementById("modal-summary-total"),
  modalItemsPreview: document.getElementById("modal-items-preview"),
  addressPresetBtns: document.querySelectorAll(".preset-btn"),
  
  // Menu & Popular Dishes
  popularDishesTrack: document.getElementById("popular-dishes-track"),
  popPrevBtn: document.getElementById("pop-prev-btn"),
  popNextBtn: document.getElementById("pop-next-btn"),
  menuItemsGrid: document.getElementById("menu-items-grid"),
  menuSearchInput: document.getElementById("menu-search-input"),
  clearSearchBtn: document.getElementById("clear-search-btn"),
  categoryPills: document.querySelectorAll(".category-pill"),
  menuEmptyState: document.getElementById("menu-empty-state"),
  btnResetFilters: document.getElementById("btn-reset-filters"),

  // Mobile Nav
  mobileMenuBtn: document.getElementById("mobile-menu-btn"),
  mobileNavDrawer: document.getElementById("mobile-nav-drawer"),
  mobileBackdrop: document.getElementById("mobile-backdrop"),
  mobileCloseBtn: document.getElementById("mobile-close-btn"),
  mobileLinks: document.querySelectorAll(".mobile-link, .mobile-drawer-order-btn"),

  // Google Maps Sync Modal
  btnOpenSyncModal: document.getElementById("btn-open-sync-modal"),
  btnFooterSync: document.getElementById("btn-footer-sync"),
  syncModalOverlay: document.getElementById("sync-modal-overlay"),
  syncModalClose: document.getElementById("sync-modal-close"),
  gmapsPasteTextarea: document.getElementById("gmaps-paste-textarea"),
  btnRunAnalysis: document.getElementById("btn-run-analysis"),
  btnLoadCremaSample: document.getElementById("btn-load-crema-sample"),
  parsedName: document.getElementById("parsed-name"),
  parsedPhone: document.getElementById("parsed-phone"),
  parsedHours: document.getElementById("parsed-hours"),
  parsedAddress: document.getElementById("parsed-address"),
  parsedRating: document.getElementById("parsed-rating"),
  parsedCategory: document.getElementById("parsed-category"),

  // Floating & Misc
  scrollTopBtn: document.getElementById("scroll-top-btn"),
  toastHub: document.getElementById("toast-hub"),
  currentYear: document.getElementById("current-year")
};

// ==========================================================================
// 5. INITIALIZATION & DATA BINDING
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Update year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }

  // Apply Config Data to DOM
  applyConfigToUI();

  // Render Popular Dishes Carousel (Reference Match)
  renderPopularDishes();

  // Render Digital Menu Grid
  renderMenuGrid(MENU_ITEMS);

  // Render initial Cart State
  updateCartUI();

  // Bind Event Listeners
  initEventListeners();

  // Initialize GSAP & Anime.js Animations
  initMotionAndScroll();
});

// ==========================================================================
// 6. APPLY CONFIGURATION TO UI (Google Maps Data Bind)
// ==========================================================================
function applyConfigToUI() {
  // Topbar
  const topHours = document.getElementById("topbar-hours");
  if (topHours) topHours.textContent = CONFIG.hours;
  const topPhone = document.getElementById("topbar-phone");
  if (topPhone) {
    topPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${CONFIG.phone}`;
    topPhone.href = `tel:${CONFIG.phone.replace(/[^0-9+]/g, "")}`;
  }

  // Location section elements
  const locAddress = document.getElementById("loc-address");
  if (locAddress) locAddress.textContent = CONFIG.address;
  const locPlusCode = document.getElementById("loc-pluscode");
  if (locPlusCode) locPlusCode.textContent = CONFIG.plusCode;
  const locHours = document.getElementById("loc-hours");
  if (locHours) locHours.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> ${CONFIG.hours} (Monday through Sunday)`;
  const locPhone = document.getElementById("loc-phone");
  if (locPhone) {
    locPhone.textContent = CONFIG.phone;
    locPhone.href = `tel:${CONFIG.phone.replace(/[^0-9+]/g, "")}`;
  }
  const locPrice = document.getElementById("loc-price");
  if (locPrice) locPrice.textContent = CONFIG.priceRange;

  // Directions & Foodpanda
  const btnDirections = document.getElementById("btn-directions");
  if (btnDirections && CONFIG.googleMapsUrl) btnDirections.href = CONFIG.googleMapsUrl;
  const btnFoodpanda = document.getElementById("btn-foodpanda");
  if (btnFoodpanda && CONFIG.foodpandaUrl) btnFoodpanda.href = CONFIG.foodpandaUrl;

  // Footer elements
  const footerHours = document.getElementById("footer-hours");
  if (footerHours) footerHours.textContent = CONFIG.hours;
  const footerPhone = document.getElementById("footer-phone");
  if (footerPhone) {
    footerPhone.textContent = CONFIG.phone;
    footerPhone.href = `tel:${CONFIG.phone.replace(/[^0-9+]/g, "")}`;
  }
  const footerAddress = document.getElementById("footer-address");
  if (footerAddress) footerAddress.textContent = CONFIG.address;

  // Floating WhatsApp button
  const floatingWaBtn = document.getElementById("floating-wa-btn");
  if (floatingWaBtn) {
    floatingWaBtn.href = `https://wa.me/${CONFIG.whatsappNumber}`;
  }
}

// ==========================================================================
// 7. MENU & POPULAR DISHES RENDERING
// ==========================================================================
function renderPopularDishes() {
  if (!DOM.popularDishesTrack) return;
  const populars = MENU_ITEMS.filter(item => item.popular);
  
  DOM.popularDishesTrack.innerHTML = populars.map(item => `
    <article class="food-card" data-id="${item.id}">
      <div class="card-image-wrap">
        <img src="${item.image}" alt="${item.name}" class="card-food-img" loading="lazy">
        ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ""}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span class="card-price">${CONFIG.currency}${item.price.toLocaleString()}</span>
          <button class="btn-add-cart-circle js-add-to-cart" data-id="${item.id}" aria-label="Add ${item.name} to Cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderMenuGrid(items) {
  if (!DOM.menuItemsGrid) return;

  if (items.length === 0) {
    DOM.menuItemsGrid.innerHTML = "";
    if (DOM.menuEmptyState) DOM.menuEmptyState.classList.remove("hidden");
    return;
  }

  if (DOM.menuEmptyState) DOM.menuEmptyState.classList.add("hidden");

  DOM.menuItemsGrid.innerHTML = items.map(item => `
    <article class="food-card" data-id="${item.id}">
      <div class="card-image-wrap">
        <img src="${item.image}" alt="${item.name}" class="card-food-img" loading="lazy">
        ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ""}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span class="card-price">${CONFIG.currency}${item.price.toLocaleString()}</span>
          <button class="btn-add-cart-circle js-add-to-cart" data-id="${item.id}" aria-label="Add ${item.name} to Cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// ==========================================================================
// 8. SHOPPING CART FUNCTIONALITY
// ==========================================================================
function addToCart(itemId, targetBtn = null) {
  const product = MENU_ITEMS.find(i => i.id === itemId);
  if (!product) return;

  const existing = cartState.find(i => i.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartState.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();

  // Anime.js Micro-interaction: Cart Badge Pulse
  if (typeof anime !== "undefined" && DOM.cartCounter) {
    anime({
      targets: DOM.cartCounter,
      scale: [1, 1.45, 1],
      duration: 350,
      easing: "easeOutElastic(1, .6)"
    });
  }

  // Micro-interaction on clicked button
  if (targetBtn && typeof anime !== "undefined") {
    anime({
      targets: targetBtn,
      scale: [1, 1.25, 1],
      rotate: '+=90deg',
      duration: 300,
      easing: "easeOutBack"
    });
  }

  showToast(`Added <strong>${product.name}</strong> to your order!`, "success");
}

function updateQty(itemId, delta) {
  const itemIndex = cartState.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return;

  cartState[itemIndex].qty += delta;

  if (cartState[itemIndex].qty <= 0) {
    cartState.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(itemId) {
  const item = cartState.find(i => i.id === itemId);
  cartState = cartState.filter(i => i.id !== itemId);
  saveCart();
  updateCartUI();
  if (item) {
    showToast(`Removed <strong>${item.name}</strong> from order`, "info");
  }
}

function clearCart() {
  if (cartState.length === 0) return;
  cartState = [];
  saveCart();
  updateCartUI();
  showToast("Your cart has been cleared", "info");
}

function calculateCartTotals() {
  const subtotal = cartState.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cartState.reduce((sum, item) => sum + item.qty, 0);

  // Delivery calculation: FREE if subtotal >= freeDeliveryThreshold or 0 if empty
  let deliveryFee = 0;
  if (subtotal > 0) {
    deliveryFee = subtotal >= CONFIG.freeDeliveryThreshold ? 0 : CONFIG.deliveryFee;
  }

  const grandTotal = subtotal + deliveryFee;

  return { subtotal, deliveryFee, grandTotal, totalItems };
}

function updateCartUI() {
  const { subtotal, deliveryFee, grandTotal, totalItems } = calculateCartTotals();

  // Header & Trigger
  if (DOM.cartCounter) DOM.cartCounter.textContent = totalItems;
  if (DOM.headerCartTotal) DOM.headerCartTotal.textContent = `${CONFIG.currency}${subtotal.toLocaleString()}`;
  if (DOM.drawerItemCount) DOM.drawerItemCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

  // Free delivery progress calculation
  if (DOM.thresholdProgress && DOM.thresholdMessage && DOM.thresholdPercent) {
    if (subtotal === 0) {
      DOM.thresholdProgress.style.width = "0%";
      DOM.thresholdPercent.textContent = "0%";
      DOM.thresholdMessage.innerHTML = `Add ${CONFIG.currency}${CONFIG.freeDeliveryThreshold.toLocaleString()} for <strong>FREE Delivery</strong>`;
    } else if (subtotal >= CONFIG.freeDeliveryThreshold) {
      DOM.thresholdProgress.style.width = "100%";
      DOM.thresholdPercent.textContent = "100%";
      DOM.thresholdMessage.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> You have unlocked <strong>FREE Delivery!</strong>`;
    } else {
      const remaining = CONFIG.freeDeliveryThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / CONFIG.freeDeliveryThreshold) * 100));
      DOM.thresholdProgress.style.width = `${pct}%`;
      DOM.thresholdPercent.textContent = `${pct}%`;
      DOM.thresholdMessage.innerHTML = `Add ${CONFIG.currency}${remaining.toLocaleString()} more for <strong>FREE Delivery</strong>`;
    }
  }

  // Cart Drawer Calculation Summary
  if (DOM.cartSubtotalVal) DOM.cartSubtotalVal.textContent = `${CONFIG.currency}${subtotal.toLocaleString()}`;
  if (DOM.cartDeliveryVal) {
    DOM.cartDeliveryVal.textContent = deliveryFee === 0 && subtotal > 0 ? "FREE" : `${CONFIG.currency}${deliveryFee}`;
    if (deliveryFee === 0 && subtotal > 0) {
      DOM.cartDeliveryVal.style.color = "#00E676";
      DOM.cartDeliveryVal.style.fontWeight = "700";
    } else {
      DOM.cartDeliveryVal.style.color = "";
      DOM.cartDeliveryVal.style.fontWeight = "";
    }
  }
  if (DOM.cartGrandtotalVal) DOM.cartGrandtotalVal.textContent = `${CONFIG.currency}${grandTotal.toLocaleString()}`;

  // Render items in drawer
  if (DOM.cartItemsContainer) {
    if (cartState.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <i class="fa-solid fa-basket-shopping cart-empty-icon"></i>
          <h4>Your Cart is Empty</h4>
          <p>Add some delicious Spanish lattes, cheesecakes, or gourmet plates to get started!</p>
          <button class="btn btn-outline" onclick="closeCartDrawer(); window.location.href='#menu';">
            <i class="fa-solid fa-utensils"></i> Browse Menu
          </button>
        </div>
      `;
      if (DOM.btnProceedCheckout) DOM.btnProceedCheckout.disabled = true;
    } else {
      if (DOM.btnProceedCheckout) DOM.btnProceedCheckout.disabled = false;
      DOM.cartItemsContainer.innerHTML = cartState.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price-unit">${CONFIG.currency}${item.price.toLocaleString()} each</span>
            <div class="cart-item-stepper-row">
              <div class="qty-stepper">
                <button class="qty-btn js-qty-minus" data-id="${item.id}" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn js-qty-plus" data-id="${item.id}" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
              </div>
              <span class="item-line-total">${CONFIG.currency}${(item.price * item.qty).toLocaleString()}</span>
              <button class="cart-item-remove-btn js-remove-item" data-id="${item.id}" aria-label="Remove item">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  // Update checkout modal summary preview if open
  updateCheckoutSummaryPreview();
}

function updateCheckoutSummaryPreview() {
  const { subtotal, deliveryFee, grandTotal, totalItems } = calculateCartTotals();
  if (DOM.modalSummaryItemcount) DOM.modalSummaryItemcount.textContent = `${totalItems} items`;
  if (DOM.modalSummaryTotal) DOM.modalSummaryTotal.textContent = `${CONFIG.currency}${grandTotal.toLocaleString()}`;

  if (DOM.modalItemsPreview) {
    if (cartState.length === 0) {
      DOM.modalItemsPreview.innerHTML = `<em>No items in cart</em>`;
    } else {
      DOM.modalItemsPreview.innerHTML = cartState.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>${idx + 1}. ${item.name} × ${item.qty}</span>
          <strong>${CONFIG.currency}${(item.price * item.qty).toLocaleString()}</strong>
        </div>
      `).join("") + `
        <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px dashed rgba(255,255,255,0.1);">
          <span>Delivery Fee:</span>
          <span>${deliveryFee === 0 ? '<strong style="color:#00E676;">FREE</strong>' : CONFIG.currency + deliveryFee}</span>
        </div>
      `;
    }
  }
}

// ==========================================================================
// 9. DRAWER & MODAL TOGGLE HANDLERS
// ==========================================================================
function openCartDrawer() {
  if (!DOM.cartDrawer) return;
  DOM.cartDrawer.classList.add("active");
  if (DOM.cartDrawerOverlay) DOM.cartDrawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  if (!DOM.cartDrawer) return;
  DOM.cartDrawer.classList.remove("active");
  if (DOM.cartDrawerOverlay) DOM.cartDrawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function openCheckoutModal() {
  if (cartState.length === 0) {
    showToast("Please add at least one item to your cart before checkout.", "error");
    return;
  }
  closeCartDrawer();
  if (DOM.checkoutModalOverlay) {
    DOM.checkoutModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    updateCheckoutSummaryPreview();
  }
}

function closeCheckoutModal() {
  if (DOM.checkoutModalOverlay) {
    DOM.checkoutModalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function openSyncModal() {
  if (DOM.syncModalOverlay) {
    DOM.syncModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeSyncModal() {
  if (DOM.syncModalOverlay) {
    DOM.syncModalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function toggleMobileNav(forceState = null) {
  if (!DOM.mobileNavDrawer) return;
  const isActive = forceState !== null ? forceState : !DOM.mobileNavDrawer.classList.contains("active");
  if (isActive) {
    DOM.mobileNavDrawer.classList.add("active");
    if (DOM.mobileBackdrop) DOM.mobileBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    DOM.mobileNavDrawer.classList.remove("active");
    if (DOM.mobileBackdrop) DOM.mobileBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// 10. CHECKOUT VALIDATION & WHATSAPP ORDER GENERATION
// ==========================================================================
function validateAndSubmitOrder(e) {
  e.preventDefault();

  if (cartState.length === 0) {
    showToast("Your cart is empty! Please add items before placing an order.", "error");
    return;
  }

  const nameVal = DOM.custName ? DOM.custName.value.trim() : "";
  const phoneVal = DOM.custPhone ? DOM.custPhone.value.trim() : "";
  const addressVal = DOM.custAddress ? DOM.custAddress.value.trim() : "";
  const notesVal = DOM.custNotes ? DOM.custNotes.value.trim() : "";

  let isValid = true;

  // 1. Validate Name
  if (!nameVal || nameVal.length < 2) {
    if (DOM.custName) DOM.custName.classList.add("is-invalid");
    if (DOM.custNameError) DOM.custNameError.classList.add("visible");
    isValid = false;
  } else {
    if (DOM.custName) DOM.custName.classList.remove("is-invalid");
    if (DOM.custNameError) DOM.custNameError.classList.remove("visible");
  }

  // 2. Validate Phone (supports Pakistani mobile or international formats)
  const phoneClean = phoneVal.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(\+92|92|0)?3[0-9]{9}$|^[0-9]{7,15}$/;
  if (!phoneVal || !phoneRegex.test(phoneClean)) {
    if (DOM.custPhone) DOM.custPhone.classList.add("is-invalid");
    if (DOM.custPhoneError) DOM.custPhoneError.classList.add("visible");
    isValid = false;
  } else {
    if (DOM.custPhone) DOM.custPhone.classList.remove("is-invalid");
    if (DOM.custPhoneError) DOM.custPhoneError.classList.remove("visible");
  }

  // 3. Validate Address
  if (!addressVal || addressVal.length < 4) {
    if (DOM.custAddress) DOM.custAddress.classList.add("is-invalid");
    if (DOM.custAddressError) DOM.custAddressError.classList.add("visible");
    isValid = false;
  } else {
    if (DOM.custAddress) DOM.custAddress.classList.remove("is-invalid");
    if (DOM.custAddressError) DOM.custAddressError.classList.remove("visible");
  }

  if (!isValid) {
    showToast("Please complete all required fields correctly.", "error");
    return;
  }

  // Order Calculations
  const { subtotal, deliveryFee, grandTotal } = calculateCartTotals();

  // Format Items List according to specification
  const itemsText = cartState.map((item, index) => {
    return `${index + 1}. ${item.name} × ${item.qty} — ${CONFIG.currency}${(item.price * item.qty).toLocaleString()}`;
  }).join("\n");

  const deliveryText = deliveryFee === 0 ? "FREE" : `${CONFIG.currency}${deliveryFee.toLocaleString()}`;

  // Assemble WhatsApp message exactly matching the prompt specification
  let message = `*NEW ORDER — ${CONFIG.restaurantName.toUpperCase()}*\n\n`;
  message += `*Customer Details:*\n`;
  message += `• Name: ${nameVal}\n`;
  message += `• Phone: ${phoneVal}\n`;
  message += `• Delivery Address: ${addressVal}\n\n`;
  message += `*ORDER ITEMS:*\n`;
  message += `${itemsText}\n\n`;
  message += `*Summary:*\n`;
  message += `• Subtotal: ${CONFIG.currency}${subtotal.toLocaleString()}\n`;
  message += `• Delivery: ${deliveryText}\n`;
  message += `• *TOTAL:* *${CONFIG.currency}${grandTotal.toLocaleString()}*\n\n`;
  if (notesVal) {
    message += `*Additional Notes:*\n${notesVal}\n\n`;
  }
  message += `_Order placed via ${CONFIG.restaurantName} Online_`;

  // Encode for WhatsApp click-to-chat URL
  const waTarget = CONFIG.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${waTarget}?text=${encodeURIComponent(message)}`;

  // Provide immediate celebratory visual feedback
  showToast("Opening WhatsApp with your complete order...", "success");

  // Open WhatsApp in a new tab
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
    closeCheckoutModal();
    // Optional: clear cart after successful order initialization
    clearCart();
  }, 600);
}

// ==========================================================================
// 11. GOOGLE MAPS BUSINESS DETAILS PASTE & ANALYSIS ENGINE
// ==========================================================================
function runGoogleMapsAnalysis() {
  const rawText = DOM.gmapsPasteTextarea ? DOM.gmapsPasteTextarea.value.trim() : "";
  if (!rawText) {
    showToast("Please paste Google Maps raw data first", "error");
    return;
  }

  const extracted = parseGoogleMapsRawText(rawText);

  // Update CONFIG
  if (extracted.name) CONFIG.restaurantName = extracted.name;
  if (extracted.phone) {
    CONFIG.phone = extracted.phone;
    // Normalize whatsapp number
    const cleanDigits = extracted.phone.replace(/[^0-9]/g, "");
    if (cleanDigits.length >= 10) {
      CONFIG.whatsappNumber = cleanDigits;
    }
  }
  if (extracted.address) CONFIG.address = extracted.address;
  if (extracted.hours) CONFIG.hours = extracted.hours;
  if (extracted.rating) CONFIG.rating = extracted.rating;
  if (extracted.reviewsCount) CONFIG.reviewsCount = extracted.reviewsCount;
  if (extracted.category) CONFIG.category = extracted.category;
  if (extracted.plusCode) CONFIG.plusCode = extracted.plusCode;
  if (extracted.foodpandaUrl) CONFIG.foodpandaUrl = extracted.foodpandaUrl;

  // Persist updated config in localStorage
  try {
    localStorage.setItem("crema_config", JSON.stringify(CONFIG));
  } catch (e) {
    console.error("Config save failed", e);
  }

  // Update extraction feedback box
  if (DOM.parsedName) DOM.parsedName.textContent = CONFIG.restaurantName;
  if (DOM.parsedPhone) DOM.parsedPhone.textContent = `${CONFIG.phone} (WhatsApp: ${CONFIG.whatsappNumber})`;
  if (DOM.parsedHours) DOM.parsedHours.textContent = CONFIG.hours;
  if (DOM.parsedAddress) DOM.parsedAddress.textContent = CONFIG.address;
  if (DOM.parsedRating) DOM.parsedRating.textContent = `${CONFIG.rating} (${CONFIG.reviewsCount} reviews)`;
  if (DOM.parsedCategory) DOM.parsedCategory.textContent = CONFIG.category;

  // Re-apply to entire website DOM
  applyConfigToUI();
  showToast("Google Maps Business Data parsed & applied successfully!", "success");
}

function parseGoogleMapsRawText(text) {
  const result = {};

  // 1. Phone Extraction
  const phoneMatch = text.match(/(\+92\s*[0-9]{3}\s*[0-9]{7}|03[0-9]{2}\s*[0-9]{7}|\+?[0-9]{1,4}[\s\-]?[0-9]{3,4}[\s\-]?[0-9]{6,8})/);
  if (phoneMatch) {
    result.phone = phoneMatch[0].trim();
  }

  // 2. Rating & Reviews Extraction (e.g. 4.8(115) or 4.8\n115 reviews)
  const ratingMatch = text.match(/(\d\.\d)\s*\(([0-9,]+)\)/) || text.match(/(\d\.\d)[\s\S]*?([0-9,]+)\s*reviews/i);
  if (ratingMatch) {
    result.rating = ratingMatch[1];
    result.reviewsCount = ratingMatch[2].replace(/,/g, "");
  }

  // 3. Opening Hours Extraction (e.g. Open 24 hours)
  if (/Open 24 hours/i.test(text)) {
    result.hours = "Open 24 hours";
  } else {
    const hoursMatch = text.match(/(Open\s*[·•]?\s*Closes[^\n]+|[0-9]{1,2}(?::[0-9]{2})?\s*(?:AM|PM)\s*–\s*[0-9]{1,2}(?::[0-9]{2})?\s*(?:AM|PM))/i);
    if (hoursMatch) result.hours = hoursMatch[0].trim();
  }

  // 4. Plus Code Extraction (e.g. P3C4+2V Islamabad, Pakistan)
  const plusMatch = text.match(/[A-Z0-9]{4}\+[A-Z0-9]{2,3}[\s\S]*?(?:Islamabad|Pakistan|[A-Za-z\s]+)/i);
  if (plusMatch) {
    result.plusCode = plusMatch[0].split("\n")[0].trim();
  }

  // 5. Foodpanda / Delivery link extraction
  const foodpandaMatch = text.match(/(https?:\/\/[^\s\)]+foodpanda[^\s\)]+)/i);
  if (foodpandaMatch) {
    result.foodpandaUrl = foodpandaMatch[1];
  }

  // 6. Address Heuristic: look for lines containing Mall, Rd, Markaz, Sector, Islamabad, or postal codes
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  for (let line of lines) {
    if (/Mall|Bhittai|Markaz|Islamabad|Street|Floor|Lower Ground/i.test(line) && line.length > 20) {
      result.address = line;
      break;
    }
  }

  // 7. Business Name Heuristic (usually first significant line)
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.length < 40 && !/^\d/.test(firstLine) && !/overview|reviews|about/i.test(firstLine)) {
      result.name = firstLine;
    }
  }

  // 8. Category
  if (/Cafe/i.test(text)) {
    result.category = "Cafe & Lounge";
  }

  return result;
}

function loadSampleCremaData() {
  const sample = `Crema Lounge
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

  if (DOM.gmapsPasteTextarea) {
    DOM.gmapsPasteTextarea.value = sample;
    runGoogleMapsAnalysis();
  }
}

// ==========================================================================
// 12. EVENT LISTENERS
// ==========================================================================
function initEventListeners() {
  // Sticky Header Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      DOM.header?.classList.add("header-scrolled");
      DOM.scrollTopBtn?.classList.add("visible");
    } else {
      DOM.header?.classList.remove("header-scrolled");
      DOM.scrollTopBtn?.classList.remove("visible");
    }
  }, { passive: true });

  // Scroll to top
  DOM.scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Cart Drawer open / close
  DOM.cartToggleBtn?.addEventListener("click", openCartDrawer);
  DOM.cartDrawerClose?.addEventListener("click", closeCartDrawer);
  DOM.cartDrawerOverlay?.addEventListener("click", closeCartDrawer);
  DOM.btnClearCart?.addEventListener("click", clearCart);
  DOM.btnProceedCheckout?.addEventListener("click", openCheckoutModal);

  // Checkout Modal open / close
  DOM.checkoutModalClose?.addEventListener("click", closeCheckoutModal);
  DOM.checkoutModalOverlay?.addEventListener("click", (e) => {
    if (e.target === DOM.checkoutModalOverlay) closeCheckoutModal();
  });
  DOM.checkoutForm?.addEventListener("submit", validateAndSubmitOrder);

  // Address preset buttons
  DOM.addressPresetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const preset = btn.getAttribute("data-preset");
      if (DOM.custAddress) {
        DOM.custAddress.value = preset;
        DOM.custAddress.classList.remove("is-invalid");
        if (DOM.custAddressError) DOM.custAddressError.classList.remove("visible");
        DOM.custAddress.focus();
      }
    });
  });

  // Sync Modal open / close
  DOM.btnOpenSyncModal?.addEventListener("click", openSyncModal);
  DOM.btnFooterSync?.addEventListener("click", openSyncModal);
  DOM.syncModalClose?.addEventListener("click", closeSyncModal);
  DOM.syncModalOverlay?.addEventListener("click", (e) => {
    if (e.target === DOM.syncModalOverlay) closeSyncModal();
  });
  DOM.btnRunAnalysis?.addEventListener("click", runGoogleMapsAnalysis);
  DOM.btnLoadCremaSample?.addEventListener("click", loadSampleCremaData);

  // Mobile Nav Drawer
  DOM.mobileMenuBtn?.addEventListener("click", () => toggleMobileNav(true));
  DOM.mobileCloseBtn?.addEventListener("click", () => toggleMobileNav(false));
  DOM.mobileBackdrop?.addEventListener("click", () => toggleMobileNav(false));
  DOM.mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMobileNav(false));
  });

  // Delegated Clicks: Add to Cart, Increment, Decrement, Remove
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".js-add-to-cart");
    if (addBtn) {
      const id = addBtn.getAttribute("data-id");
      addToCart(id, addBtn);
      return;
    }

    const plusBtn = e.target.closest(".js-qty-plus");
    if (plusBtn) {
      const id = plusBtn.getAttribute("data-id");
      updateQty(id, 1);
      return;
    }

    const minusBtn = e.target.closest(".js-qty-minus");
    if (minusBtn) {
      const id = minusBtn.getAttribute("data-id");
      updateQty(id, -1);
      return;
    }

    const removeBtn = e.target.closest(".js-remove-item");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-id");
      removeFromCart(id);
      return;
    }
  });

  // Category Filtering
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      applyMenuFilters();
    });
  });

  // Menu Search
  DOM.menuSearchInput?.addEventListener("input", () => {
    if (DOM.clearSearchBtn) {
      if (DOM.menuSearchInput.value.length > 0) {
        DOM.clearSearchBtn.classList.add("show");
      } else {
        DOM.clearSearchBtn.classList.remove("show");
      }
    }
    applyMenuFilters();
  });

  DOM.clearSearchBtn?.addEventListener("click", () => {
    if (DOM.menuSearchInput) {
      DOM.menuSearchInput.value = "";
      DOM.clearSearchBtn.classList.remove("show");
      applyMenuFilters();
    }
  });

  DOM.btnResetFilters?.addEventListener("click", () => {
    if (DOM.menuSearchInput) DOM.menuSearchInput.value = "";
    if (DOM.clearSearchBtn) DOM.clearSearchBtn.classList.remove("show");
    DOM.categoryPills.forEach(p => p.classList.remove("active"));
    const allPill = document.querySelector(".category-pill[data-category='all']");
    if (allPill) allPill.classList.add("active");
    applyMenuFilters();
  });

  // Popular Dishes Carousel navigation (< > arrows)
  if (DOM.popPrevBtn && DOM.popularDishesTrack) {
    DOM.popPrevBtn.addEventListener("click", () => {
      DOM.popularDishesTrack.parentElement.scrollBy({ left: -300, behavior: "smooth" });
    });
  }
  if (DOM.popNextBtn && DOM.popularDishesTrack) {
    DOM.popNextBtn.addEventListener("click", () => {
      DOM.popularDishesTrack.parentElement.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  // Keyboard accessibility: ESC to close any modal or drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeCheckoutModal();
      closeSyncModal();
      toggleMobileNav(false);
    }
  });
}

function applyMenuFilters() {
  const activePill = document.querySelector(".category-pill.active");
  const selectedCat = activePill ? activePill.getAttribute("data-category") : "all";
  const query = DOM.menuSearchInput ? DOM.menuSearchInput.value.trim().toLowerCase() : "";

  const filtered = MENU_ITEMS.filter(item => {
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  renderMenuGrid(filtered);
}

// ==========================================================================
// 13. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = "info") {
  if (!DOM.toastHub) return;

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-circle-exclamation";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  DOM.toastHub.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, 3200);
}

// ==========================================================================
// 14. GSAP & ANIME.JS MOTION SUITE
// ==========================================================================
function initMotionAndScroll() {
  if (typeof gsap === "undefined") return;

  // Register ScrollTrigger plugin if available
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Reveal Timeline
  const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTL
    .from(".hero-script-tag", { y: -20, opacity: 0, duration: 0.7, delay: 0.2 })
    .from(".hero-title", { y: 30, opacity: 0, duration: 0.9 }, "-=0.4")
    .from(".hero-description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".hero-button-group .btn", { scale: 0.9, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.5")
    .from(".hero-features-row .feature-item", { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 }, "-=0.4")
    .from(".hero-visual", { scale: 0.9, opacity: 0, duration: 1.1, ease: "back.out(1.2)" }, "-=0.8")
    .from(".floating-badge-round", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
    .from(".floating-pill-tag", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");

  // 2. ScrollTrigger Section Entrances
  if (typeof ScrollTrigger !== "undefined") {
    // About section columns
    gsap.from(".about-story-col", {
      scrollTrigger: { trigger: ".about-section", start: "top 80%" },
      x: -40,
      opacity: 0,
      duration: 0.85,
      ease: "power2.out"
    });

    gsap.from(".interior-card-wrapper", {
      scrollTrigger: { trigger: ".about-section", start: "top 80%" },
      scale: 0.9,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out"
    });

    gsap.from(".four-grid-feature-card", {
      scrollTrigger: { trigger: ".about-section", start: "top 80%" },
      x: 40,
      opacity: 0,
      duration: 0.85,
      ease: "power2.out"
    });

    // Popular dishes cards stagger
    gsap.from(".popular-dishes-section .food-card", {
      scrollTrigger: { trigger: ".popular-dishes-section", start: "top 80%" },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out"
    });

    // Ambience cards stagger
    gsap.from(".vibe-card", {
      scrollTrigger: { trigger: ".ambience-section", start: "top 80%" },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    });

    // Reviews cards stagger
    gsap.from(".review-card", {
      scrollTrigger: { trigger: ".reviews-section", start: "top 80%" },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.75,
      ease: "power2.out"
    });

    // Location section cards
    gsap.from(".location-info-card", {
      scrollTrigger: { trigger: ".location-section", start: "top 80%" },
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".location-map-wrap", {
      scrollTrigger: { trigger: ".location-section", start: "top 80%" },
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  }
}
