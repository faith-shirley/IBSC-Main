// Cart functionality
class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(resourceId) {
        if (!this.cart.includes(resourceId)) {
            this.cart.push(resourceId);
            this.save();
            return true;
        }
        return false;
    }

    removeItem(resourceId) {
        this.cart = this.cart.filter(id => id !== resourceId);
        this.save();
        return this.cart;
    }

    clear() {
        this.cart = [];
        this.save();
    }

    getItems() {
        return this.cart;
    }

    getCount() {
        return this.cart.length;
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    updateCartUI() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = this.getCount();
        });
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    cart.updateCartUI();

    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart') || e.target.closest('.btn-add-to-cart')) {
            const button = e.target.classList.contains('btn-add-to-cart') ? e.target : e.target.closest('.btn-add-to-cart');
            const resourceId = parseInt(button.getAttribute('data-id'));
            
            if (cart.addItem(resourceId)) {
                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'cart-confirmation';
                confirmation.innerHTML = `
                    <i class="fas fa-check"></i> Added to cart
                `;
                document.body.appendChild(confirmation);
                
                setTimeout(() => {
                    confirmation.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    confirmation.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(confirmation);
                    }, 300);
                }, 2000);
            }
        }
    });
});

// Add to CSS:
// .cart-confirmation {
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     background-color: var(--mustard-gold);
//     color: var(--oxford-blue);
//     padding: 1rem 1.5rem;
//     border-radius: 4px;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
//     transform: translateY(100px);
//     opacity: 0;
//     transition: all 0.3s ease;
//     z-index: 1000;
// }
// 
// .cart-confirmation.show {
//     transform: translateY(0);
//     opacity: 1;
// }