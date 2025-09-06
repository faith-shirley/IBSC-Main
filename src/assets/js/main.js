// Main Application Script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
    
    // Load featured resources
    loadFeaturedResources();
    
    // Load testimonials
    loadTestimonials();
    
    // Initialize cart functionality
    initCart();
});

function initApp() {
    // Check authentication status
    checkAuthStatus();
    
    // Set up event listeners
    setupEventListeners();
}

function checkAuthStatus() {
    // Check if user is logged in (simplified for this example)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Update UI for logged in user
        const userLinks = document.querySelectorAll('.user-link');
        userLinks.forEach(link => {
            link.style.display = 'inline-block';
        });
    }
}

function setupEventListeners() {
    // Close modal when clicking outside content
    document.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function loadFeaturedResources() {
    // Simulated API call to get featured resources
    const featuredResources = [
        {
            id: 1,
            title: 'IB Biology Topic 1 Complete Bundle',
            description: 'Comprehensive resources for Cell Biology including lesson plans, activities, and assessments.',
            price: 24.99,
            previewImage: './public/images/resource-preview-1.jpg',
            type: 'bundle',
            subject: 'Biology',
            level: 'HL/SL'
        },
        {
            id: 2,
            title: 'Chemistry IA Guide & Examples',
            description: 'Step-by-step guide to scoring well on your Chemistry Internal Assessment with annotated examples.',
            price: 14.99,
            previewImage: './public/images/resource-preview-2.jpg',
            type: 'guide',
            subject: 'Chemistry',
            level: 'HL/SL'
        },
        {
            id: 3,
            title: 'Physics Option C: Energy Complete Unit',
            description: 'Everything you need to teach the Energy option, including presentations, worksheets, and labs.',
            price: 19.99,
            previewImage: './public/images/resource-preview-3.jpg',
            type: 'unit',
            subject: 'Physics',
            level: 'HL'
        }
    ];
    
    const resourceGrid = document.getElementById('featured-resources');
    if (resourceGrid) {
        resourceGrid.innerHTML = featuredResources.map(resource => `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-image">
                    <img src="${resource.previewImage}" alt="${resource.title}">
                    <div class="resource-overlay">
                        <button class="btn-preview" data-id="${resource.id}">Preview</button>
                    </div>
                </div>
                <div class="resource-details">
                    <h3>${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-meta">
                        <span class="resource-subject">${resource.subject}</span>
                        <span class="resource-level">${resource.level}</span>
                    </div>
                    <div class="resource-footer">
                        <span class="resource-price">$${resource.price.toFixed(2)}</span>
                        <button class="btn-add-to-cart" data-id="${resource.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function loadTestimonials() {
    // Simulated testimonials
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'IB Biology Teacher',
            school: 'International School of Geneva',
            quote: 'These resources have transformed my teaching. The ready-to-use materials save me hours of preparation time each week.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'DP Coordinator',
            school: 'United World College Singapore',
            quote: 'The quality of the materials is exceptional. They align perfectly with the IB curriculum and engage students effectively.',
            rating: 5
        },
        {
            name: 'Amina Diallo',
            role: 'Chemistry Teacher',
            school: 'African Leadership Academy',
            quote: 'My students\' IA scores improved significantly after using the guides from IB Science Classroom.',
            rating: 4
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>"${testimonial.quote}"</p>
                    <div class="testimonial-rating">
                        ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                    </div>
                </div>
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}, ${testimonial.school}</p>
                </div>
            </div>
        `).join('');
    }
}

function initCart() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count display
    updateCartCount(cart.length);
    
    // Set up event listeners for add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const resourceId = parseInt(e.target.getAttribute('data-id'));
            addToCart(resourceId);
        }
    });
}

function addToCart(resourceId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already in cart
    if (!cart.includes(resourceId)) {
        cart.push(resourceId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(cart.length);
        
        // Show confirmation
        alert('Item added to cart!');
    } else {
        alert('This item is already in your cart.');
    }
}

function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}