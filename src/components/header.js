class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="logo">
                    <img src="/public/images/logo.png" alt="IB Science Classroom Logo">
                    <div class="logo-text">
                        <h1>IB Science Classroom</h1>
                        <p>Inquire. Teach. Empower.</p>
                    </div>
                </div>
                
                <nav>
                    <ul>
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="../src/pages/resource.html">Resources</a></li>
                        <li><a href="../src/pages/pricing.html">Pricing</a></li>
                        <li><a href="./src/pages/about.html">About</a></li>
                        <li><a href="../src/pages/contact.html">Contact</a></li>
                    </ul>
                </nav>
                
                <div class="header-actions">
                    <a href="../src/pages/dashboard.html" class="btn-icon"><i class="fas fa-user"></i></a>
                    <div class="cart-icon" id="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </div>
                    <a href="../src/pages/admin/index.html" class="btn-icon" id="admin-link"><i class="fas fa-plus-circle"></i></a>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);

// Inject header into the container
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer.querySelector('header-component')) {
        headerContainer.innerHTML = '<header-component></header-component>';
    }
    
    // Initialize cart icon functionality
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            document.getElementById('cart-modal').style.display = 'block';
        });
    }
    
    // Check if user is admin and show/hide admin link
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminLink = document.getElementById('admin-link');
    if (adminLink && !isAdmin) {
        adminLink.style.display = 'none';
    }
});