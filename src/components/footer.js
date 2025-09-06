class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="footer-logo">
                        <div class="logo">
                            <img src="/public/images/logo.png" alt="IB Science Classroom Logo">
                            <div class="logo-text">
                                <h1>IB Science Classroom</h1>
                                <p>Inquire. Teach. Empower.</p>
                            </div>
                        </div>
                        <p>Providing high-quality resources for IB educators worldwide.</p>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="resources.html">Resources</a></li>
                            <li><a href="pricing.html">Pricing</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="admin/index.html">Educator Portal</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-contact">
                        <h3>Contact Us</h3>
                        <p><i class="fas fa-envelope"></i> info@ibscienceclassroom.com</p>
                        <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
                        <p><i class="fas fa-map-marker-alt"></i> 123 Education St, Knowledge City</p>
                    </div>
                    
                    <div class="footer-social">
                        <h3>Connect & Share</h3>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-pinterest"></i></a>
                        </div>
                        <div class="share-resources">
                            <h4>Share Resources</h4>
                            <div class="social-icons">
                                <a href="#"><i class="fab fa-facebook"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-whatsapp"></i></a>
                                <a href="#"><i class="fas fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} IB Science Classroom. All rights reserved.</p>
                    <p>Registered Business Name: IB Science Classroom Ltd.</p>
                    <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);

// Inject footer into the container
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = '<footer-component></footer-component>';
    }
});