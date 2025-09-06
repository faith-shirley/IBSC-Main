class CartModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div id="cart-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Your Shopping Cart</h2>
                    <div class="cart-items" id="cart-items">
                        <!-- Cart items will be loaded here -->
                    </div>
                    <div class="cart-summary">
                        <div class="cart-total">
                            <span>Total:</span>
                            <span id="cart-total-amount">$0.00</span>
                        </div>
                        <button class="btn-checkout">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        `;
        
        // Close modal when X is clicked
        this.querySelector('.close-modal').addEventListener('click', () => {
            this.querySelector('.modal').style.display = 'none';
        });
        
        // Load cart items
        this.loadCartItems();
    }
    
    loadCartItems() {
        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Simulated resource data (in a real app, this would come from an API)
        const resources = {
            1: { title: 'IB Biology Topic 1 Complete Bundle', price: 24.99 },
            2: { title: 'Chemistry IA Guide & Examples', price: 14.99 },
            3: { title: 'Physics Option C: Energy Complete Unit', price: 19.99 }
        };
        
        const cartItemsContainer = this.querySelector('#cart-items');
        const cartTotalAmount = this.querySelector('#cart-total-amount');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalAmount.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        let itemsHTML = '';
        
        cart.forEach(resourceId => {
            const resource = resources[resourceId];
            if (resource) {
                total += resource.price;
                itemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <h4>${resource.title}</h4>
                            <span class="cart-item-price">$${resource.price.toFixed(2)}</span>
                        </div>
                        <button class="btn-remove-item" data-id="${resourceId}">Remove</button>
                    </div>
                `;
            }
        });
        
        cartItemsContainer.innerHTML = itemsHTML;
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Set up remove item buttons
        this.querySelectorAll('.btn-remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceId = parseInt(e.target.getAttribute('data-id'));
                this.removeFromCart(resourceId);
            });
        });
        
        // Set up checkout button
        this.querySelector('.btn-checkout').addEventListener('click', () => {
            this.proceedToCheckout();
        });
    }
    
    removeFromCart(resourceId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(id => id !== resourceId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reload cart items
        this.loadCartItems();
        
        // Update cart count in header
        updateCartCount(cart.length);
    }
    
    proceedToCheckout() {
        // In a real app, this would redirect to checkout page
        alert('Proceeding to checkout...');
        this.querySelector('.modal').style.display = 'none';
    }
}

customElements.define('cart-modal', CartModal);

// Helper function to update cart count (also used in main.js)
function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Initialize cart modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cartModalContainer = document.getElementById('cart-modal');
    if (cartModalContainer) {
        cartModalContainer.innerHTML = '<cart-modal></cart-modal>';
    }
});