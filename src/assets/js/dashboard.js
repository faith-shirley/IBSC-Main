document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Load dashboard data
    loadDashboardData();
    
    // Set up event listeners
    setupDashboardEvents();
});

function initDashboard() {
    // Check authentication status
    checkAuthStatus();
    
    // Update active user in header
    updateUserProfile();
}

function loadDashboardData() {
    // Load recent activity
    loadRecentActivity();
    
    // Load top resources
    loadTopResources();
}

function setupDashboardEvents() {
    // Navigation tabs
    document.querySelectorAll('.dashboard-nav a').forEach(tab => {
        if (!tab.id.includes('logout')) {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Set active tab
                document.querySelectorAll('.dashboard-nav a').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show corresponding section
                const sectionId = this.getAttribute('data-section') + '-section';
                showDashboardSection(sectionId);
            });
        }
    });
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });
}

function showDashboardSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
}

function loadRecentActivity() {
    // Simulated data - in a real app, this would come from an API
    const activities = [
        {
            icon: 'download',
            action: 'Downloaded "IB Biology Topic 2 Bundle"',
            time: '2 hours ago'
        },
        {
            icon: 'shopping-cart',
            action: 'Purchased "Chemistry IA Guide"',
            time: '1 day ago'
        },
        {
            icon: 'star',
            action: 'Rated "Physics Option C" 5 stars',
            time: '3 days ago'
        },
        {
            icon: 'book',
            action: 'Viewed "Environmental Systems Case Studies"',
            time: '5 days ago'
        },
        {
            icon: 'share',
            action: 'Shared resource with colleague',
            time: '1 week ago'
        }
    ];
    
    const activityList = document.getElementById('recent-activity');
    
    activities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <p>${activity.action}</p>
                <p class="activity-time">${activity.time}</p>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function loadTopResources() {
    // Simulated data - in a real app, this would come from an API
    const resources = [
        {
            id: 1,
            title: 'Cell Biology Bundle',
            subject: 'Biology',
            downloads: 42,
            image: '../public/images/resource-preview-1.jpg'
        },
        {
            id: 2,
            title: 'Chemistry IA Guide',
            subject: 'Chemistry',
            downloads: 38,
            image: '../public/images/resource-preview-2.jpg'
        },
        {
            id: 3,
            title: 'Energy Unit',
            subject: 'Physics',
            downloads: 29,
            image: '../public/images/resource-preview-3.jpg'
        },
        {
            id: 4,
            title: 'ESS Case Studies',
            subject: 'Environmental',
            downloads: 25,
            image: '../public/images/resource-preview-1.jpg'
        }
    ];
    
    const resourcesGrid = document.getElementById('top-resources');
    
    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-image">
                <img src="${resource.image}" alt="${resource.title}">
            </div>
            <div class="resource-details">
                <h4>${resource.title}</h4>
                <div class="resource-meta">
                    <span>${resource.subject}</span>
                    <span>${resource.downloads} downloads</span>
                </div>
            </div>
        `;
        resourcesGrid.appendChild(resourceCard);
    });
}

function checkAuthStatus() {
    // In a real app, this would check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = '../pages/login.html';
    }
}

function updateUserProfile() {
    // In a real app, this would fetch user data
    const userData = {
        name: 'Dr. Sarah Johnson',
        role: 'IB Biology Teacher',
        email: 'sarah.johnson@example.com',
        avatar: '../public/images/user-avatar.jpg'
    };
    
    // Update profile in sidebar
    const userAvatar = document.querySelector('.user-avatar img');
    const userName = document.querySelector('.user-info h3');
    const userRole = document.querySelector('.user-info p');
    const userEmail = document.querySelector('.user-email');
    
    if (userAvatar) userAvatar.src = userData.avatar;
    if (userName) userName.textContent = userData.name;
    if (userRole) userRole.textContent = userData.role;
    if (userEmail) userEmail.textContent = userData.email;
}

function logoutUser() {
    // In a real app, this would call a logout API
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../pages/admin/index.html';
}