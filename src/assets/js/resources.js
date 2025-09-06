document.addEventListener('DOMContentLoaded', () => {
    // Initialize resources page
    initResourcesPage();
    
    // Load resources
    loadResources();
    
    // Set up event listeners
    setupResourcesEvents();
});

function initResourcesPage() {
    // Initialize filter sidebar
    initFilterSidebar();
    
    // Check if user is logged in
    checkAuthStatus();
}

function loadResources(page = 1, filters = {}) {
    // Simulated API call to get resources
    const allResources = [
        // Biology resources
        {
            id: 1,
            title: 'IB Biology Topic 1: Cell Biology Complete Bundle',
            description: 'Everything you need to teach Cell Biology, including lesson plans, activities, and assessments.',
            price: 24.99,
            previewImage: './public/images/resource-preview-1.jpg',
            type: 'bundle',
            subject: 'biology',
            level: 'hl-sl',
            rating: 4.8,
            downloads: 142,
            fileType: 'pdf'
        },
        {
            id: 2,
            title: 'Biology Internal Assessment Guide',
            description: 'Step-by-step guide to scoring well on your Biology IA with annotated examples.',
            price: 14.99,
            previewImage: './public/images/resource-preview-2.jpg',
            type: 'guide',
            subject: 'biology',
            level: 'hl-sl',
            rating: 4.9,
            downloads: 98,
            fileType: 'pdf'
        },
        // Chemistry resources
        {
            id: 3,
            title: 'Chemistry Topic 2: Atomic Structure Unit',
            description: 'Complete unit for Atomic Structure with presentations, worksheets, and labs.',
            price: 19.99,
            previewImage: './public/images/resource-preview-3.jpg',
            type: 'unit',
            subject: 'chemistry',
            level: 'hl-sl',
            rating: 4.7,
            downloads: 87,
            fileType: 'zip'
        },
        // More resources...
    ];
    
    // Apply filters
    let filteredResources = applyFilters(allResources, filters);
    
    // Pagination
    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedResources = filteredResources.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
    
    // Display resources
    displayResources(paginatedResources);
    
    // Update pagination UI
    updatePaginationUI(page, totalPages);
}

function applyFilters(resources, filters) {
    return resources.filter(resource => {
        // Subject filter
        if (filters.subject && resource.subject !== filters.subject) {
            return false;
        }
        
        // Type filter
        if (filters.type && resource.type !== filters.type) {
            return false;
        }
        
        // Level filter
        if (filters.level && resource.level !== filters.level) {
            return false;
        }
        
        // Price filter
        if (filters.minPrice && resource.price < filters.minPrice) {
            return false;
        }
        if (filters.maxPrice && resource.price > filters.maxPrice) {
            return false;
        }
        
        // Search term
        if (filters.searchTerm && 
            !resource.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
            !resource.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
            return false;
        }
        
        return true;
    });
}

function displayResources(resources) {
    const resourcesGrid = document.getElementById('resources-grid');
    
    if (resources.length === 0) {
        resourcesGrid.innerHTML = '<p class="no-results">No resources found matching your criteria.</p>';
        return;
    }
    
    resourcesGrid.innerHTML = resources.map(resource => `
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
                    <span class="resource-type">${resource.type}</span>
                    <span class="resource-subject">${resource.subject}</span>
                    <span class="resource-level">${resource.level.replace('-', '/').toUpperCase()}</span>
                </div>
                <div class="resource-footer">
                    <div class="resource-rating">
                        ${'★'.repeat(Math.floor(resource.rating))}${'☆'.repeat(5 - Math.floor(resource.rating))}
                        <span>(${resource.downloads})</span>
                    </div>
                    <div class="resource-actions">
                        <span class="resource-price">$${resource.price.toFixed(2)}</span>
                        <button class="btn-add-to-cart" data-id="${resource.id}">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function updatePaginationUI(currentPage, totalPages) {
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Update event listeners
    prevBtn.onclick = () => loadResources(currentPage - 1, getCurrentFilters());
    nextBtn.onclick = () => loadResources(currentPage + 1, getCurrentFilters());
}

function setupResourcesEvents() {
    // Search functionality
    const searchInput = document.getElementById('resource-search');
    searchInput.addEventListener('input', () => {
        loadResources(1, { ...getCurrentFilters(), searchTerm: searchInput.value });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', () => {
        // In a real app, this would sort the resources
        console.log('Sort by:', sortSelect.value);
    });
    
    // Preview button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-preview')) {
            const resourceId = parseInt(e.target.getAttribute('data-id'));
            showPreview(resourceId);
        }
    });
}

function getCurrentFilters() {
    // Get filters from the filter sidebar
    // This would be implemented based on your filter component
    return {
        subject: document.querySelector('input[name="subject"]:checked')?.value,
        type: document.querySelector('input[name="type"]:checked')?.value,
        level: document.querySelector('input[name="level"]:checked')?.value,
        minPrice: document.getElementById('price-min')?.value,
        maxPrice: document.getElementById('price-max')?.value
    };
}

function showPreview(resourceId) {
    // In a real app, this would fetch the preview content
    const previewModal = document.getElementById('preview-modal');
    previewModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Resource Preview</h2>
            <div class="preview-content">
                <p>This would show a preview of the resource (first few pages of PDF or sample images)</p>
                <p>For a real implementation, you would embed a PDF viewer or display sample images.</p>
            </div>
            <div class="preview-actions">
                <button class="btn-primary">Add to Cart</button>
                <button class="btn-secondary">View Full Details</button>
            </div>
        </div>
    `;
    
    previewModal.style.display = 'block';
    
    // Close modal when X is clicked
    previewModal.querySelector('.close-modal').addEventListener('click', () => {
        previewModal.style.display = 'none';
    });
}