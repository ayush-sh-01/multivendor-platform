/**
 * DEZEL Luxury Platform - Frontend Application Logic
 * Integrates with Spring Boot 3 REST Backend & JWT Authentication
 */

const API_BASE = '/api';

// --- State Management ---
let state = {
    user: null,         // { token, userId, name, email, role }
    token: null,
    products: [],
    categories: [],
    currentCart: null,
    selectedCategory: null,
    searchQuery: ''
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadUserFromStorage();
    initScrollEffects();
    loadCategories();
    loadProducts();
});

function loadUserFromStorage() {
    const savedUser = localStorage.getItem('dezel_user');
    const savedToken = localStorage.getItem('dezel_token');

    if (savedUser && savedToken) {
        try {
            state.user = JSON.parse(savedUser);
            state.token = savedToken;
            updateNavbarUserUI();
            if (state.user.role === 'CUSTOMER') {
                loadCart();
            }
        } catch (e) {
            logout();
        }
    } else {
        updateNavbarUserUI();
    }
}

// --- Dynamic Catalog & Categories ---

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        if (response.ok) {
            state.categories = await response.json();
            renderCategoryPills(state.categories);
        }
    } catch (error) {
        console.warn("Could not load categories yet (backend starting up).", error);
    }
}

function renderCategoryPills(categories) {
    const filterContainer = document.getElementById('filter-pills');
    if (!filterContainer) return;

    let html = `
        <button onclick="filterByCategory(null)" class="cat-pill ${state.selectedCategory === null ? 'bg-primary text-surface font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'} px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all border border-white/10" data-id="all">
            All Pieces
        </button>
    `;

    categories.forEach(cat => {
        const isActive = state.selectedCategory === cat.id;
        html += `
            <button onclick="filterByCategory(${cat.id})" class="cat-pill ${isActive ? 'bg-primary text-surface font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'} px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all border border-white/10" data-id="${cat.id}">
                ${cat.name}
            </button>
        `;
    });

    filterContainer.innerHTML = html;
}

async function loadProducts(categoryId = null) {
    const loadingEl = document.getElementById('products-loading');
    const container = document.getElementById('products-container');
    const noProductsEl = document.getElementById('no-products-msg');

    if (loadingEl) loadingEl.classList.remove('hidden');
    if (container) container.innerHTML = '';
    if (noProductsEl) noProductsEl.classList.add('hidden');

    try {
        let url = `${API_BASE}/products?page=0&size=50`;
        if (categoryId) {
            url = `${API_BASE}/products/category/${categoryId}`;
        }

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            // Handle both Page object (data.content) and plain List (data)
            state.products = Array.isArray(data) ? data : (data.content || []);
            renderProducts(state.products);
        } else {
            showToast('Unable to fetch catalog. Please ensure backend is running.', 'error');
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        showToast('Backend server connection pending.', 'info');
    } finally {
        if (loadingEl) loadingEl.classList.add('hidden');
    }
}

function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    const noProductsEl = document.getElementById('no-products-msg');

    if (!container) return;

    // Filter by live search query if present
    let filtered = productsToRender;
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            (p.description && p.description.toLowerCase().includes(query)) ||
            (p.vendorName && p.vendorName.toLowerCase().includes(query)) ||
            (p.categoryName && p.categoryName.toLowerCase().includes(query))
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (noProductsEl) noProductsEl.classList.remove('hidden');
        return;
    }

    if (noProductsEl) noProductsEl.classList.add('hidden');

    // Diverse luxury arch shapes from the design
    const frameStyles = [
        'arch-frame h-[400px]',
        'rounded-t-full rounded-b-[4rem] h-[440px]',
        'arch-frame h-[380px]',
        'rounded-t-[4rem] rounded-b-full h-[420px]',
        'arch-frame h-[440px]',
        'rounded-[3rem] h-[390px]'
    ];

    container.innerHTML = filtered.map((prod, index) => {
        const frameClass = frameStyles[index % frameStyles.length];
        const defaultImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCWv4QgXZm4vD3awPH0mrUNbMwUwaiRpFAldrL4GtDVmfPchKVyxs5gRlv1ioD-27sIHxrdj59Sh4X237LL-OG1_wMtB2mzEb55Xdir__xUQHC6SjR1p6Z7pWDIDjNQxs5-QLpGChqhGWhLSbfmbplvqtJ-IFCHTAIbSH7Qo60WTwZOTP1rK2NLY6cTvT_BkQztJh_b3iIrP78r2GMNmNZTyMvjr44S0XaR_Y4rOX96o16IAOFbZdm7AMXJ9samEUSCzQ";
        const imgUrl = prod.imageUrl || defaultImg;
        const inStock = prod.stock > 0;

        return `
            <div class="flex flex-col group card-container reveal-item is-visible">
                <div class="relative overflow-hidden mb-6 ${frameClass} border border-white/10 ambient-shadow bg-surface-container">
                    <img class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[1px]" 
                         src="${imgUrl}" 
                         alt="${prod.name}"
                         loading="lazy"
                         onerror="this.src='${defaultImg}'"/>
                    <div class="absolute top-4 left-4">
                        <span class="text-[10px] uppercase font-semibold px-3 py-1 rounded-full bg-surface/80 text-primary border border-primary/20 backdrop-blur-md">
                            ${prod.categoryName || 'Luxe'}
                        </span>
                    </div>
                    ${!inStock ? `
                        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <span class="text-xs uppercase tracking-widest text-error font-bold px-4 py-2 border border-error/30 rounded-full bg-surface/90">Out of Stock</span>
                        </div>
                    ` : ''}
                </div>
                <div class="flex flex-col items-center text-center px-4">
                    <h3 class="font-display text-2xl text-on-surface mb-1">${prod.name}</h3>
                    <p class="text-xs text-outline uppercase tracking-widest mb-1">Maker: ${prod.vendorName || 'Artisan House'}</p>
                    <p class="text-xs text-on-surface-variant line-clamp-2 max-w-xs mb-3 italic">${prod.description || ''}</p>
                    <p class="font-display text-xl text-primary mb-5 font-semibold">$${prod.price.toFixed(2)}</p>
                    <button onclick="handleAddToCart(${prod.id}, '${prod.name.replace(/'/g, "\\'")}')" 
                            ${!inStock ? 'disabled' : ''}
                            class="px-8 py-3 rounded-full border border-primary-container text-primary-container font-medium text-xs uppercase tracking-widest hover:bg-primary-container hover:text-surface hover:tracking-[0.2em] transition-all duration-500 disabled:opacity-30 disabled:pointer-events-none">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterByCategory(catId) {
    state.selectedCategory = catId;
    renderCategoryPills(state.categories);

    // Update nav links
    document.querySelectorAll('.cat-link').forEach(link => {
        const linkCat = link.getAttribute('data-cat');
        if ((catId === null && linkCat === 'all') || (catId && linkCat == catId)) {
            link.classList.add('text-primary', 'border-primary');
            link.classList.remove('text-on-surface-variant', 'border-transparent');
        } else {
            link.classList.remove('text-primary', 'border-primary');
            link.classList.add('text-on-surface-variant', 'border-transparent');
        }
    });

    const heading = document.getElementById('gallery-heading');
    if (catId && heading) {
        const cat = state.categories.find(c => c.id === catId);
        if (cat) heading.innerText = cat.name;
    } else if (heading) {
        heading.innerText = 'The Collection';
    }

    loadProducts(catId);
}

// --- Live Search ---

function toggleSearchBar() {
    const bar = document.getElementById('search-bar-container');
    if (bar) {
        bar.classList.toggle('hidden');
        if (!bar.classList.contains('hidden')) {
            document.getElementById('search-input').focus();
        }
    }
}

function handleSearch(query) {
    state.searchQuery = query;
    renderProducts(state.products);
}

function clearSearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    state.searchQuery = '';
    renderProducts(state.products);
}

// --- Cart Operations ---

async function loadCart() {
    if (!state.user || state.user.role !== 'CUSTOMER') return;

    try {
        const res = await fetch(`${API_BASE}/cart/${state.user.userId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });

        if (res.ok) {
            state.currentCart = await res.json();
            updateCartUI();
        }
    } catch (err) {
        console.error('Error loading cart:', err);
    }
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');

    if (!state.currentCart || !state.currentCart.products || state.currentCart.products.length === 0) {
        if (badge) badge.classList.add('hidden');
        if (totalPriceEl) totalPriceEl.innerText = '$0.00';
        if (container) {
            container.innerHTML = `
                <div class="text-center py-16 text-outline flex flex-col items-center">
                    <span class="material-symbols-outlined text-4xl mb-2">shopping_bag</span>
                    <p class="font-display text-lg text-on-surface">Your bag is empty</p>
                    <p class="text-xs text-on-surface-variant mt-1">Explore the collection and select your fragrance.</p>
                </div>
            `;
        }
        return;
    }

    const count = state.currentCart.products.length;
    if (badge) {
        badge.innerText = count;
        badge.classList.remove('hidden');
    }

    if (totalPriceEl) {
        totalPriceEl.innerText = `$${(state.currentCart.totalPrice || 0).toFixed(2)}`;
    }

    if (container) {
        container.innerHTML = state.currentCart.products.map(prod => `
            <div class="flex items-center justify-between p-3 rounded-2xl bg-surface-container border border-white/5 gap-3">
                <img src="${prod.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWv4QgXZm4vD3awPH0mrUNbMwUwaiRpFAldrL4GtDVmfPchKVyxs5gRlv1ioD-27sIHxrdj59Sh4X237LL-OG1_wMtB2mzEb55Xdir__xUQHC6SjR1p6Z7pWDIDjNQxs5-QLpGChqhGWhLSbfmbplvqtJ-IFCHTAIbSH7Qo60WTwZOTP1rK2NLY6cTvT_BkQztJh_b3iIrP78r2GMNmNZTyMvjr44S0XaR_Y4rOX96o16IAOFbZdm7AMXJ9samEUSCzQ'}" 
                     class="w-14 h-14 object-cover rounded-xl border border-white/10" alt="${prod.name}"/>
                <div class="flex-grow">
                    <h4 class="text-sm font-semibold text-on-surface line-clamp-1">${prod.name}</h4>
                    <p class="text-[11px] text-outline">${prod.vendorName || 'Artisan'}</p>
                    <p class="text-xs font-semibold text-primary mt-0.5">$${prod.price.toFixed(2)}</p>
                </div>
                <button onclick="handleRemoveFromCart(${prod.id})" class="text-outline hover:text-error p-1 transition-colors" title="Remove">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </div>
        `).join('');
    }
}

async function handleAddToCart(productId, productName) {
    if (!state.user) {
        showToast('Please sign in as a Customer to add items to your shopping bag.', 'info');
        openAuthModal();
        return;
    }

    if (state.user.role !== 'CUSTOMER') {
        showToast(`Signed in as ${state.user.role}. Please sign in as a Customer to purchase items.`, 'error');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/cart/${state.user.userId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ productId: productId })
        });

        if (res.ok) {
            state.currentCart = await res.json();
            updateCartUI();
            showToast(`Added "${productName}" to shopping bag!`, 'success');
        } else {
            const err = await res.json();
            showToast(err.message || 'Could not add product to cart', 'error');
        }
    } catch (e) {
        console.error('Error adding to cart:', e);
        showToast('Network error adding to cart', 'error');
    }
}

async function handleRemoveFromCart(productId) {
    if (!state.user) return;

    try {
        const res = await fetch(`${API_BASE}/cart/${state.user.userId}/items/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });

        if (res.ok) {
            state.currentCart = await res.json();
            updateCartUI();
            showToast('Item removed from bag.', 'info');
        }
    } catch (e) {
        console.error('Error removing item:', e);
    }
}

async function clearCartAction() {
    if (!state.user || !state.currentCart || state.currentCart.products.length === 0) return;

    try {
        const res = await fetch(`${API_BASE}/cart/${state.user.userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });

        if (res.ok) {
            state.currentCart = await res.json();
            updateCartUI();
            showToast('Shopping bag cleared.', 'info');
        }
    } catch (e) {
        console.error('Error clearing cart:', e);
    }
}

async function handleCheckout() {
    if (!state.user || state.user.role !== 'CUSTOMER') {
        showToast('Please sign in as a Customer to place orders.', 'error');
        return;
    }

    if (!state.currentCart || state.currentCart.products.length === 0) {
        showToast('Your shopping bag is empty.', 'error');
        return;
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ customerId: state.user.userId })
        });

        if (res.ok) {
            const order = await res.json();
            showToast(`Order #${order.id} placed successfully for $${order.totalAmount.toFixed(2)}!`, 'success');
            toggleCartDrawer(); // Close cart drawer
            loadCart(); // Refresh (now empty) cart
            loadProducts(); // Refresh stock counts in UI
            openOrdersModal(); // Open order receipt
        } else {
            const err = await res.json();
            showToast(err.message || 'Checkout failed.', 'error');
        }
    } catch (e) {
        console.error('Checkout error:', e);
        showToast('Error placing order.', 'error');
    } finally {
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
}

function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');

    if (drawer && overlay) {
        const isOpen = !drawer.classList.contains('translate-x-full');
        if (isOpen) {
            drawer.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        } else {
            drawer.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            if (state.user && state.user.role === 'CUSTOMER') {
                loadCart();
            }
        }
    }
}

// --- Customer Order History ---

async function openOrdersModal() {
    if (!state.user) {
        showToast('Please sign in to view your orders.', 'info');
        openAuthModal();
        return;
    }

    const modal = document.getElementById('orders-modal');
    const container = document.getElementById('orders-list-container');
    if (modal) modal.classList.remove('hidden');

    if (container) {
        container.innerHTML = `<div class="text-center py-8 text-outline">Loading orders...</div>`;
    }

    try {
        const res = await fetch(`${API_BASE}/orders/customer/${state.user.userId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });

        if (res.ok) {
            const orders = await res.json();
            if (orders.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 text-outline">
                        <span class="material-symbols-outlined text-4xl mb-2">receipt</span>
                        <p class="font-display text-lg text-on-surface">No Orders Yet</p>
                        <p class="text-xs mt-1">Your placed order history and invoices will appear here.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = orders.map(ord => `
                <div class="p-4 rounded-2xl bg-surface-container border border-white/5 flex flex-col gap-3">
                    <div class="flex justify-between items-center border-b border-white/5 pb-2">
                        <div>
                            <span class="font-display text-base text-on-surface">Order #${ord.id}</span>
                            <p class="text-[10px] text-outline">${new Date(ord.createdAt).toLocaleString()}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs uppercase px-2.5 py-0.5 rounded-full font-semibold ${ord.status === 'CONFIRMED' || ord.status === 'DELIVERED' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/10 text-on-surface'}">
                                ${ord.status}
                            </span>
                            <p class="font-display text-primary text-sm font-semibold mt-1">$${ord.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        ${ord.items.map(item => `
                            <div class="flex justify-between text-xs text-on-surface-variant">
                                <span>${item.quantity}x ${item.productName}</span>
                                <span>$${item.subTotal.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    } catch (e) {
        console.error('Error fetching customer orders:', e);
    }
}

function closeOrdersModal() {
    const modal = document.getElementById('orders-modal');
    if (modal) modal.classList.add('hidden');
}

// --- Auth Modal & Flow ---

function openAuthModal() {
    if (state.user) {
        // If already logged in, show user menu or prompt logout
        if (confirm(`Currently signed in as ${state.user.name} (${state.user.role}). Do you want to sign out?`)) {
            logout();
        }
        return;
    }
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('tab-login-btn');
    const regBtn = document.getElementById('tab-register-btn');
    const title = document.getElementById('auth-title');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('text-primary', 'border-primary');
        loginBtn.classList.remove('text-outline', 'border-transparent');
        regBtn.classList.remove('text-primary', 'border-primary');
        regBtn.classList.add('text-outline', 'border-transparent');
        title.innerText = 'Welcome to DEZEL';
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        regBtn.classList.add('text-primary', 'border-primary');
        regBtn.classList.remove('text-outline', 'border-transparent');
        loginBtn.classList.remove('text-primary', 'border-primary');
        loginBtn.classList.add('text-outline', 'border-transparent');
        title.innerText = 'Join the Guild';
    }
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    await executeLogin(email, password);
}

async function quickLogin(email, password) {
    await executeLogin(email, password);
}

async function executeLogin(email, password) {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const authData = await res.json();
            setAuthenticatedUser(authData);
            closeAuthModal();
            showToast(`Welcome back, ${authData.name}!`, 'success');
        } else {
            const err = await res.json();
            showToast(err.message || 'Invalid login credentials.', 'error');
        }
    } catch (e) {
        console.error('Login error:', e);
        showToast('Login request failed. Ensure server is online.', 'error');
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        if (res.ok) {
            const authData = await res.json();
            setAuthenticatedUser(authData);
            closeAuthModal();
            showToast(`Account created successfully! Welcome, ${authData.name}.`, 'success');
        } else {
            const err = await res.json();
            showToast(err.message || 'Registration failed.', 'error');
        }
    } catch (e) {
        console.error('Register error:', e);
        showToast('Registration request failed.', 'error');
    }
}

function setAuthenticatedUser(authData) {
    state.user = authData;
    state.token = authData.token;
    localStorage.setItem('dezel_user', JSON.stringify(authData));
    localStorage.setItem('dezel_token', authData.token);

    updateNavbarUserUI();
    if (authData.role === 'CUSTOMER') {
        loadCart();
    }
}

function logout() {
    state.user = null;
    state.token = null;
    state.currentCart = null;
    localStorage.removeItem('dezel_user');
    localStorage.removeItem('dezel_token');

    updateNavbarUserUI();
    updateCartUI();
    showToast('Signed out successfully.', 'info');
}

function updateNavbarUserUI() {
    const userDisplayName = document.getElementById('user-display-name');
    const vendorAddBtn = document.getElementById('vendor-add-btn');
    const ordersBtn = document.getElementById('orders-btn');

    if (state.user) {
        if (userDisplayName) {
            userDisplayName.innerText = `${state.user.name.split(' ')[0]} (${state.user.role})`;
        }
        if (vendorAddBtn) {
            if (state.user.role === 'VENDOR' || state.user.role === 'ADMIN') {
                vendorAddBtn.classList.remove('hidden');
                vendorAddBtn.classList.add('flex');
            } else {
                vendorAddBtn.classList.add('hidden');
                vendorAddBtn.classList.remove('flex');
            }
        }
        if (ordersBtn) {
            if (state.user.role === 'CUSTOMER') {
                ordersBtn.classList.remove('hidden');
            } else {
                ordersBtn.classList.add('hidden');
            }
        }
    } else {
        if (userDisplayName) userDisplayName.innerText = 'Sign In';
        if (vendorAddBtn) {
            vendorAddBtn.classList.add('hidden');
            vendorAddBtn.classList.remove('flex');
        }
        if (ordersBtn) ordersBtn.classList.add('hidden');
    }
}

// --- Vendor Product Creation ---

function openAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    if (modal) modal.classList.add('hidden');
}

async function handleCreateProductSubmit(event) {
    event.preventDefault();
    if (!state.user || (state.user.role !== 'VENDOR' && state.user.role !== 'ADMIN')) {
        showToast('Only vendors can publish pieces.', 'error');
        return;
    }

    const name = document.getElementById('prod-name').value.trim();
    const description = document.getElementById('prod-description').value.trim();
    const price = parseFloat(document.getElementById('prod-price').value);
    const stock = parseInt(document.getElementById('prod-stock').value, 10);
    const categoryId = parseInt(document.getElementById('prod-category').value, 10);
    const imageUrl = document.getElementById('prod-image').value.trim();

    // Default vendorId fallback
    const vendorId = 1;

    try {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                name,
                description,
                price,
                stock,
                imageUrl,
                categoryId,
                vendorId
            })
        });

        if (res.ok) {
            const newProd = await res.json();
            showToast(`Piece "${newProd.name}" published live!`, 'success');
            closeAddProductModal();
            document.getElementById('add-product-form').reset();
            loadProducts(state.selectedCategory);
        } else {
            const err = await res.json();
            showToast(err.message || 'Could not publish product.', 'error');
        }
    } catch (e) {
        console.error('Error creating product:', e);
        showToast('Error publishing product.', 'error');
    }
}

// --- Luxury Toast Notification Utility ---

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-3.5 px-5 rounded-2xl glass-panel text-xs tracking-wide text-on-surface shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto border ${
        type === 'success' ? 'border-primary/50 text-primary' :
        type === 'error' ? 'border-error/50 text-error' :
        'border-white/20 text-on-surface'
    }`;

    const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';

    toast.innerHTML = `
        <span class="material-symbols-outlined text-lg">${iconName}</span>
        <span class="font-sans font-medium">${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    // Auto remove after 4.5s
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// --- Scroll and Parallax UI Effects ---

function initScrollEffects() {
    const navbar = document.getElementById('main-nav');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar blur on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('bg-surface-container-lowest/90', 'backdrop-blur-xl', 'border-white/10');
            } else {
                navbar.classList.remove('bg-surface-container-lowest/90', 'backdrop-blur-xl', 'border-white/10');
            }
        }

        // Scroll Progress Bar
        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });
}
