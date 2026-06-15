// Fragrances Data
const fragrances = [
    {
        id: 1,
        name: "Khamrah",
        arabic: "خمرة",
        price: 30,
        category: "unisex",
        description: "A rich, ultra-sweet gourmand scent featuring heavy notes of cinnamon, dates, praline, and warm amber vanilla. Extremely popular and high-performing.",
        season: "Winter / Autumn"
    },
    {
        id: 2,
        name: "Khamrah Qahwa",
        arabic: "خمرة قهوة",
        price: 30,
        category: "unisex",
        description: "A twist on the original Khamrah, adding a distinct, slightly bitter note of roasted Arabic coffee bean and cardamom to balance out the dense sweetness.",
        season: "Winter / Autumn"
    },
    {
        id: 3,
        name: "Ana Abiyedh Rouge",
        arabic: "أنا الأبيض حمراء",
        price: 15,
        category: "unisex",
        description: "A woody-spicy, sophisticated blend of saffron, bitter almond, jasmine, and ambergris. It gives off a very luxurious, slightly sweet, and airy vibe.",
        season: "All Seasons"
    },
    {
        id: 4,
        name: "Ana Abiyedh",
        arabic: "أنا الأبيض",
        price: 15,
        category: "unisex",
        description: "A very clean, fresh, and powdery white musk fragrance mixed with light fruits like pear and bergamot. It smells like high-end luxury soap or fresh laundry.",
        season: "Summer / Spring"
    },
    {
        id: 5,
        name: "Amira Al Arab",
        arabic: "أميرة العرب",
        price: 18,
        category: "women",
        description: "A highly feminine, elegant scent dominated by sweet white florals like jasmine and honeysuckle, grounded by a clean musk and a touch of light spice.",
        season: "Spring / Summer"
    },
    {
        id: 6,
        name: "Eijazi Silver",
        arabic: "إعجازي فضي",
        price: 20,
        category: "men",
        description: "A sharp, refreshing, and deeply masculine fragrance. It features clean citrus, marine/aquatic notes, and a strong, fresh-spicy cedarwood base.",
        season: "Summer / Spring"
    },
    {
        id: 7,
        name: "Bade'e Al Oud / Oud Glory",
        arabic: "بديع العود",
        price: 28,
        category: "unisex",
        description: "A bold, dark, and mysterious oriental fragrance. It leads with strong saffron, earthy patchouli, nutmeg, and a deep, luxurious oud base.",
        season: "Winter / Autumn"
    },
    {
        id: 8,
        name: "Yara",
        arabic: "يارا",
        price: 20,
        category: "women",
        description: "An incredibly popular feminine scent that smells like a creamy, fluffy strawberry milkshake. It features soft heliotrope, tropical fruits, vanilla, and musk.",
        season: "All Seasons"
    },
    {
        id: 9,
        name: "Asad",
        arabic: "أسد",
        price: 22,
        category: "men",
        description: "A powerful, deeply masculine, and spicy fragrance. It features a heavy punch of black pepper, cloves, dark amber, vanilla, and a rich woody undertone.",
        season: "Winter / Autumn"
    },
    {
        id: 10,
        name: "Maahir",
        arabic: "ماهر",
        price: 30,
        category: "unisex",
        description: "Depending on the bottle (Silver is fresh/citrus, Black is intensely smoky leather/oud, Classic Gold is fruity/woody), the classic Maahir is a rich, regal blend of peach, bergamot, and amber.",
        season: "Autumn / Winter"
    },
    {
        id: 11,
        name: "Qaed Al Fursan",
        arabic: "قائد الفرسان",
        price: 18,
        category: "unisex",
        description: "A massive burst of juicy, bright, realistic pineapple mixed with a smoky, woody oakmoss and amber base. Very energetic and addictive.",
        season: "Summer / Spring"
    },
    {
        id: 12,
        name: "Eclaire",
        arabic: "اكلير",
        price: 30,
        category: "women",
        description: "A hyper-gourmand, mouth-watering dessert fragrance. It smells like warm caramel, liquid vanilla, milk, and honey, creating a super-soft, sweet, and comforting trail.",
        season: "Winter / Autumn"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(fragranceId) {
    const fragrance = fragrances.find(f => f.id === fragranceId);
    if (!fragrance) return;

    const existingItem = cart.find(item => item.id === fragranceId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...fragrance, quantity: 1 });
    }
    
    saveCart();
    updateCartIcon();
    showNotification(`✅ ${fragrance.name} added to cart!`);
}

function removeFromCart(fragranceId) {
    cart = cart.filter(item => item.id !== fragranceId);
    saveCart();
    renderCart();
    updateCartIcon();
}

function updateQuantity(fragranceId, quantity) {
    const item = cart.find(item => item.id === fragranceId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        renderCart();
        updateCartIcon();
    }
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        if (cartTotal) cartTotal.innerHTML = '<strong>Total: $0.00</strong>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.arabic}</p>
                <p class="price">$${item.price}</p>
            </div>
            <div class="cart-item-controls">
                <input type="number" min="1" value="${item.quantity}" 
                    onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})" class="btn-remove">Remove</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    }
}

function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        renderCart();
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const cartData = {
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Option 1: Send to backend (you'll need a server)
    // Option 2: Redirect to Stripe Checkout (requires backend setup)
    
    // For now, show a message and email instruction
    const total = cartData.total.toFixed(2);
    const itemsList = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    
    const mailtoLink = `mailto:fragnarity@gmail.com?subject=Order from Fragnarity - $${total}&body=I would like to order:%0A%0A${encodeURIComponent(itemsList)}%0A%0ATotal: $${total}%0A%0APlease confirm my order and provide payment instructions.`;
    
    window.location.href = mailtoLink;
}

// Render Products
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.log('productsGrid not found');
        return;
    }
    
    productsGrid.innerHTML = '';
    
    const filteredFragrances = filter === 'all' 
        ? fragrances 
        : fragrances.filter(f => f.category === filter);
    
    console.log('Rendering ' + filteredFragrances.length + ' fragrances');
    
    filteredFragrances.forEach(fragrance => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const categoryLabel = fragrance.category === 'unisex' ? 'Unisex' : (fragrance.category === 'men' ? 'Men' : 'Women');
        productCard.innerHTML = `
            <div class="product-image">🌹</div>
            <div class="product-content">
                <div class="product-category">${categoryLabel}</div>
                <div class="product-name">${fragrance.name}</div>
                <div class="product-arabic">${fragrance.arabic}</div>
                <div class="product-price">$${fragrance.price}</div>
                <div class="product-description">${fragrance.description}</div>
                <div class="product-season"><strong>Season:</strong> ${fragrance.season}</div>
                <button onclick="addToCart(${fragrance.id})" class="btn-add-to-cart">🛒 Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('Initializing app...');
    renderProducts('all');
    updateCartIcon();
    
    const tabButtons = document.querySelectorAll('.tab-button');
    console.log('Found ' + tabButtons.length + ' tab buttons');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.getAttribute('data-category'));
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter products
            const category = this.getAttribute('data-category');
            renderProducts(category);
        });
    });

    // Cart modal close on outside click
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cartModal');
        if (modal && event.target == modal) {
            closeCart();
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
