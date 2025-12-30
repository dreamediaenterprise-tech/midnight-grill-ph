// Midnight Grill PH — Premium Upgrade (Frontend + Formspree only)
// - Better UX: sticky mobile total bar, top total pill, success modal
// - Safer submit: loading state + prevent empty cart submit
// - Same menu logic + real-time total updates

const menuData = {
  best: [
    { name: "Grilled Chicken Rice Bowl", price: 189, img: "https://i.pinimg.com/1200x/85/cf/96/85cf962958f31b9fb023933352f9f86e.jpg", desc: "Smoky grilled chicken + rice", best: true },
    { name: "Crispy Fried Chicken Meal", price: 199, img: "https://i.pinimg.com/736x/56/9e/a5/569ea58daee1a54a60e37545afc9310f.jpg", desc: "Crunchy & juicy, sulit", best: true },
    { name: "Beef Burger + Fries", price: 229, img: "https://i.pinimg.com/736x/2d/c8/b5/2dc8b56f3c06f6201cc118d95cce56cd.jpg", desc: "Classic burger combo", best: true },
    { name: "Creamy Carbonara Pasta", price: 199, img: "https://i.pinimg.com/1200x/c6/3b/66/c63b6642e17c6febb23f74a5106dd4b6.jpg", desc: "Rich, creamy, comfort", best: true },
    { name: "Iced Lemon Tea", price: 79, img: "https://i.pinimg.com/736x/b8/e4/b2/b8e4b236b8913c5539203f1c19b10b69.jpg", desc: "Fresh & citrusy", best: true }
  ],

  rice: [
    { name: "Chicken Teriyaki Rice Bowl", price: 189, img: "https://i.pinimg.com/1200x/5e/d1/9a/5ed19ac6f9c2f8f7e0c73a4d3c4c0190.jpg", desc: "Sweet-savory teriyaki" },
    { name: "BBQ Pork Rice Bowl", price: 185, img: "https://i.pinimg.com/736x/3c/2e/5b/3c2e5bc368b56263685a1b013fd1e5b4.jpg", desc: "BBQ glaze + tender pork" },
    { name: "Korean Beef Bulgogi Bowl", price: 209, img: "https://i.pinimg.com/736x/93/f0/05/93f005ff44921458c1df6593750123f5.jpg", desc: "Bulgogi beef + rice" },
    { name: "Fried Chicken Rice Meal", price: 199, img: "https://i.pinimg.com/736x/2b/9d/0c/2b9d0c5087133e6b186ec31e06787c0f.jpg", desc: "Crispy chicken + rice" }
  ],

  pasta: [
    { name: "Carbonara Pasta", price: 199, img: "https://i.pinimg.com/1200x/c6/3b/66/c63b6642e17c6febb23f74a5106dd4b6.jpg", desc: "Creamy & cheesy" },
    { name: "Spaghetti Bolognese", price: 189, img: "https://i.pinimg.com/736x/7a/79/c7/7a79c74783e27aacc6ab82c65a59b660.jpg", desc: "Meaty tomato sauce" },
    { name: "Chicken Alfredo Pasta", price: 209, img: "https://i.pinimg.com/1200x/62/0f/c8/620fc8a1152eaba4d4b4f79b57a33214.jpg", desc: "Creamy alfredo + chicken" }
  ],

  burgers: [
    { name: "Classic Cheeseburger", price: 179, img: "https://i.pinimg.com/736x/37/9a/37/379a37ab764e49105b8d4f7bae887fb6.jpg", desc: "Cheesy & classic" },
    { name: "Crispy Chicken Burger", price: 189, img: "https://i.pinimg.com/736x/38/4d/91/384d91f7eb1df4994485cb9563abdae4.jpg", desc: "Crispy chicken patty" },
    { name: "Double Patty Burger", price: 239, img: "https://i.pinimg.com/736x/fe/45/81/fe4581fddcc5dde4a18d991a0b4af9a8.jpg", desc: "Extra beef, extra sulit" }
  ],

  sides: [
    { name: "French Fries", price: 79, img: "https://i.pinimg.com/736x/92/f5/10/92f510339bd2850379e78743089abe80.jpg", desc: "Crispy fries" },
    { name: "Onion Rings", price: 99, img: "https://i.pinimg.com/1200x/64/1f/e3/641fe39f462c4cc035a3fd9a908ff3f2.jpg", desc: "Golden rings" },
    { name: "Garlic Bread", price: 89, img: "https://i.pinimg.com/736x/29/8d/e8/298de8877795007ccb124b17cd085e9a.jpg", desc: "Buttery & garlicky" }
  ],

  drinks: [
    { name: "Iced Lemon Tea", price: 79, img: "https://i.pinimg.com/736x/b8/e4/b2/b8e4b236b8913c5539203f1c19b10b69.jpg", desc: "Fresh & citrusy", best: true },
    { name: "Iced Coffee", price: 89, img: "https://i.pinimg.com/736x/40/76/c4/4076c43c5c501fa89830b44301eaeef9.jpg", desc: "Cold & energizing" },
    { name: "Strawberry Smoothie", price: 99, img: "https://i.pinimg.com/736x/92/c5/08/92c5088c582833ec6f36609337b71eee.jpg", desc: "Sweet & creamy" }
  ]
};

// CART: { name: { price, qty } }
const cart = {};

const menuGrid = document.getElementById("menuGrid");
const itemsEl = document.getElementById("items");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("emptyMsg");

const topTotalBtn = document.getElementById("topTotalBtn");
const topTotal = document.getElementById("topTotal");
const topCount = document.getElementById("topCount");

const paymentEl = document.getElementById("payment");
const gcashBox = document.getElementById("gcashBox");

const orderSummaryField = document.getElementById("orderSummaryField");
const orderTotalField = document.getElementById("orderTotalField");

const successBox = document.getElementById("successBox");
const errorBox = document.getElementById("errorBox");

const mobileTotal = document.getElementById("mobileTotal");
const mobileCount = document.getElementById("mobileCount");
const mobileGoOrder = document.getElementById("mobileGoOrder");

const submitBtn = document.getElementById("submitBtn");

const successModal = document.getElementById("successModal");
const modalSummary = document.getElementById("modalSummary");
const modalTotal = document.getElementById("modalTotal");
const modalBrowse = document.getElementById("modalBrowse");
const modalClose = document.getElementById("modalClose");

let activeTab = "best";

// ---------- helpers ----------
function cssSafe(str){ return str.replace(/[^a-z0-9]/gi,'_'); }

function peso(n){
  const num = Number(n) || 0;
  return num.toLocaleString("en-PH");
}

function allItemsFlat(){
  const all = [];
  Object.keys(menuData).forEach(k => menuData[k].forEach(x => all.push(x)));
  return all;
}

function findItemByName(name){
  return allItemsFlat().find(x => x.name === name);
}

function addItem(item){
  if(!cart[item.name]) cart[item.name] = { price: item.price, qty: 0 };
  cart[item.name].qty += 1;
}

function removeItem(item){
  if(!cart[item.name]) return;
  cart[item.name].qty -= 1;
  if(cart[item.name].qty <= 0) delete cart[item.name];
}

function calcTotal(){
  let total = 0;
  for(const name in cart){
    total += cart[name].price * cart[name].qty;
  }
  return total;
}

function calcCount(){
  let c = 0;
  for(const name in cart) c += cart[name].qty;
  return c;
}

function buildOrderSummary(){
  const names = Object.keys(cart);
  if(names.length === 0) return "";
  return names
    .map(n => `${cart[n].qty}x ${n} (₱${cart[n].price})`)
    .join(" | ");
}

// ---------- render cards ----------
function makeCard(item){
  const qty = cart[item.name]?.qty || 0;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.img}" alt="${item.name}" loading="lazy">
    <div class="card-body">
      <div class="card-name">${item.name}</div>
      <div class="card-sub">${item.desc || ""}</div>
      <div class="card-price">₱${peso(item.price)}</div>

      ${item.best ? `<div class="badge">⭐ Best Seller</div>` : ``}

      <div class="card-qty">
        <button class="qtybtn" data-action="minus" data-name="${item.name}">−</button>
        <div class="qtycount" id="qty-${cssSafe(item.name)}">${qty}</div>
        <button class="qtybtn" data-action="plus" data-name="${item.name}">+</button>
      </div>
    </div>
  `;
  return card;
}

function renderMenu(){
  menuGrid.innerHTML = "";

  const list = menuData[activeTab] || [];
  list.forEach(item => menuGrid.appendChild(makeCard(item)));

  // attach listeners
  document.querySelectorAll(".qtybtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const action = btn.dataset.action;
      const item = findItemByName(name);
      if(!item) return;

      if(action === "plus") addItem(item);
      if(action === "minus") removeItem(item);

      updateUI();
      renderMenu(); // refresh disabled states
    });
  });

  // disable minus if qty 0
  list.forEach(item => {
    const qty = cart[item.name]?.qty || 0;
    const minusBtn = document.querySelector(`.qtybtn[data-action="minus"][data-name="${CSS.escape(item.name)}"]`);
    if(minusBtn) minusBtn.disabled = qty === 0;
  });
}

// ---------- order panel ----------
function updateOrderPanel(){
  itemsEl.innerHTML = "";
  const names = Object.keys(cart);

  if(names.length === 0){
    itemsEl.appendChild(emptyMsg);
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;

    names.forEach(name => {
      const price = cart[name].price;
      const qty = cart[name].qty;
      const subtotal = price * qty;

      const line = document.createElement("div");
      line.className = "line-item";

      line.innerHTML = `
        <div class="line-left">
          <div class="line-name">${name}</div>
          <div class="line-sub">₱${peso(price)} × ${qty} = <b>₱${peso(subtotal)}</b></div>
        </div>

        <div class="pill-qty">
          <button type="button" data-line="minus" data-name="${name}">−</button>
          <div class="qtynum">${qty}</div>
          <button type="button" data-line="plus" data-name="${name}">+</button>
        </div>
      `;

      itemsEl.appendChild(line);
    });

    // plus/minus in order panel
    itemsEl.querySelectorAll("button[data-line]").forEach(b => {
      b.addEventListener("click", () => {
        const name = b.dataset.name;
        const item = findItemByName(name);
        if(!item) return;

        if(b.dataset.line === "plus") addItem(item);
        if(b.dataset.line === "minus") removeItem(item);

        updateUI();
        renderMenu();
      });
    });

    // disable minus where needed
    itemsEl.querySelectorAll("button[data-line='minus']").forEach(b => {
      const name = b.dataset.name;
      const qty = cart[name]?.qty || 0;
      b.disabled = qty === 0;
    });
  }
}

function updateTotalsUI(){
  const total = calcTotal();
  const count = calcCount();

  totalEl.textContent = peso(total);

  topTotal.textContent = peso(total);
  topCount.textContent = String(count);

  mobileTotal.textContent = peso(total);
  mobileCount.textContent = String(count);

  orderSummaryField.value = buildOrderSummary();
  orderTotalField.value = `₱${peso(total)}`;
}

function updateUI(){
  updateTotalsUI();
  updateOrderPanel();
}

// ---------- Tabs ----------
document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if(!btn) return;

  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected","false");
  });

  btn.classList.add("active");
  btn.setAttribute("aria-selected","true");

  activeTab = btn.dataset.tab;
  renderMenu();
});

// ---------- Payment ----------
paymentEl.addEventListener("change", () => {
  gcashBox.hidden = paymentEl.value !== "GCash";
});

// ---------- Scroll helpers ----------
function goToOrder(){
  document.querySelector("#order")?.scrollIntoView({ behavior:"smooth", block:"start" });
}
function goToMenu(){
  document.querySelector("#menu")?.scrollIntoView({ behavior:"smooth", block:"start" });
}

topTotalBtn?.addEventListener("click", goToOrder);
mobileGoOrder?.addEventListener("click", goToOrder);

// ---------- Modal ----------
function openModal(summary, total){
  modalSummary.textContent = summary || "—";
  modalTotal.textContent = `₱${peso(total)}`;

  successModal.hidden = false;
  successModal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  successModal.hidden = true;
  successModal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
successModal?.addEventListener("click", (e) => {
  const close = e.target?.getAttribute?.("data-close");
  if(close) closeModal();
});
modalClose?.addEventListener("click", closeModal);
modalBrowse?.addEventListener("click", () => {
  closeModal();
  goToMenu();
});

// ---------- Submit (Formspree AJAX) ----------
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();

  successBox.hidden = true;
  errorBox.hidden = true;

  const names = Object.keys(cart);
  if(names.length === 0){
    alert("Add at least 1 item first 🍽️");
    goToMenu();
    return;
  }

  // ensure hidden fields updated
  updateUI();

  // loading state
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  })
  .then(res => {
    if(res.ok){
      successBox.hidden = false;

      const total = calcTotal();
      const summary = buildOrderSummary();

      // clear cart
      for(const k in cart) delete cart[k];

      form.reset();
      gcashBox.hidden = true;

      updateUI();
      renderMenu();

      // modal (premium)
      openModal(summary, total);

      setTimeout(() => { successBox.hidden = true; }, 2200);
    } else {
      errorBox.hidden = false;
    }
  })
  .catch(() => {
    errorBox.hidden = false;
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  });
});

// init
updateUI();
renderMenu();
