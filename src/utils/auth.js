// Authentication utilities
export const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const isAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';
};

export const login = async (email, password) => {
    // In a real app, this would call your authentication API
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check credentials (in a real app, this would be done on the server)
        if (email === 'admin@ibscience.com' && password === 'admin123') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            return { success: true, isAdmin: true };
        } else if (email === 'user@ibscience.com' && password === 'user123') {
            localStorage.setItem('isLoggedIn', 'true');
            return { success: true, isAdmin: false };
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
};

export const checkAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
};

export const checkAdminAuth = () => {
    if (!isAdmin()) {
        window.location.href = '../index.html';
    }
};