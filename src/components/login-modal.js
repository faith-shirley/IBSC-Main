class LoginModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div id="login-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Educator Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <button type="submit" class="btn-primary">Login</button>
                    </form>
                    <div class="login-options">
                        <p>Don't have an account? <a href="#" id="show-register">Register</a></p>
                        <p><a href="#">Forgot password?</a></p>
                    </div>
                    <div class="social-login">
                        <p>Or login with:</p>
                        <div class="social-buttons">
                            <button class="btn-social google">
                                <i class="fab fa-google"></i> Google
                            </button>
                            <button class="btn-social microsoft">
                                <i class="fab fa-microsoft"></i> Microsoft
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close modal when X is clicked
        this.querySelector('.close-modal').addEventListener('click', () => {
            this.style.display = 'none';
        });
        
        // Form submission
        this.querySelector('#login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Show register link
        this.querySelector('#show-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegister();
        });
    }
    
    handleLogin() {
        const email = this.querySelector('#login-email').value;
        const password = this.querySelector('#login-password').value;
        
        // In a real app, this would authenticate with your backend
        console.log('Logging in with:', email, password);
        
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        this.style.display = 'none';
        
        // Update UI
        document.dispatchEvent(new Event('authChange'));
    }
    
    showRegister() {
        // In a real app, this would show the registration form
        console.log('Showing registration form');
        alert('Registration form would appear here');
    }
}

customElements.define('login-modal', LoginModal);

// Initialize login modal
document.addEventListener('DOMContentLoaded', () => {
    const loginModalContainer = document.getElementById('login-modal');
    if (loginModalContainer) {
        loginModalContainer.innerHTML = '<login-modal></login-modal>';
    }
});

// Global function to show login modal
function showLoginModal() {
    document.querySelector('login-modal').style.display = 'block';
}