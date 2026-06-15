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
        description: "Depending on the bottle (Silver is fresh/citrus, Black is intensely smoky leather/oud, Classic Gold is fruity/woody), the classic Maahir is a rich, regal blend of peach, bergamot, smoke, and smooth amber woods.",
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

// Current filter
let currentFilter = 'all';

// Render Products
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredFragrances = filter === 'all' 
        ? fragrances 
        : fragrances.filter(f => f.category === filter);
    
    filteredFragrances.forEach(fragrance => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const categoryLabel = fragrance.category.charAt(0).toUpperCase() + fragrance.category.slice(1);
        productCard.innerHTML = `
            <div class="product-image">🌹</div>
            <div class="product-content">
                <div class="product-category">${categoryLabel}</div>
                <div class="product-name">${fragrance.name}</div>
                <div class="product-arabic">${fragrance.arabic}</div>
                <div class="product-price">\$${fragrance.price}</div>
                <div class="product-description">${fragrance.description}</div>
                <div class="product-season"><strong>Season:</strong> ${fragrance.season}</div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Tab button event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            const category = button.getAttribute('data-category');
            currentFilter = category;
            renderProducts(category);
        });
    });
});

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