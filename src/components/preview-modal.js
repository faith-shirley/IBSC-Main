class PreviewModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div id="preview-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="preview-container" id="preview-container">
                        <!-- Preview content will be loaded here -->
                    </div>
                    <div class="preview-actions">
                        <button class="btn-primary" id="add-to-cart-preview">Add to Cart</button>
                        <button class="btn-secondary" id="view-details">View Full Details</button>
                    </div>
                </div>
            </div>
        `;
        
        // Close modal when X is clicked
        this.querySelector('.close-modal').addEventListener('click', () => {
            this.style.display = 'none';
        });
    }
    
    showPreview(resource) {
        const previewContainer = this.querySelector('#preview-container');
        
        if (resource.fileType === 'pdf') {
            previewContainer.innerHTML = `
                <h2>${resource.title}</h2>
                <div class="preview-meta">
                    <span>${resource.type} • ${resource.subject} • ${resource.level.replace('-', '/').toUpperCase()}</span>
                    <span>$${resource.price.toFixed(2)}</span>
                </div>
                <div class="preview-description">
                    <p>${resource.description}</p>
                </div>
                <div class="preview-content">
                    <embed src="${resource.previewUrl || './public/images/pdf-preview.jpg'}" 
                           type="application/pdf" 
                           width="100%" 
                           height="500px">
                    <p class="preview-notice">This is a preview of the first few pages. Purchase to access the full resource.</p>
                </div>
            `;
        } else {
            previewContainer.innerHTML = `
                <h2>${resource.title}</h2>
                <div class="preview-meta">
                    <span>${resource.type} • ${resource.subject} • ${resource.level.replace('-', '/').toUpperCase()}</span>
                    <span>$${resource.price.toFixed(2)}</span>
                </div>
                <div class="preview-description">
                    <p>${resource.description}</p>
                </div>
                <div class="preview-content">
                    <img src="${resource.previewImage}" alt="Preview" style="max-width: 100%;">
                    <p class="preview-notice">This is a sample image from the resource. Purchase to access all content.</p>
                </div>
            `;
        }
        
        // Set up add to cart button
        this.querySelector('#add-to-cart-preview').addEventListener('click', () => {
            addToCart(resource.id);
            this.style.display = 'none';
        });
        
        // Set up view details button
        this.querySelector('#view-details').addEventListener('click', () => {
            // In a real app, this would navigate to the resource detail page
            console.log('Viewing details for resource:', resource.id);
            this.style.display = 'none';
        });
        
        this.style.display = 'block';
    }
}

customElements.define('preview-modal', PreviewModal);

// Initialize preview modal
document.addEventListener('DOMContentLoaded', () => {
    const previewModalContainer = document.getElementById('preview-modal');
    if (previewModalContainer) {
        previewModalContainer.innerHTML = '<preview-modal></preview-modal>';
    }
});

// Global function to show preview (called from resources.js)
function showPreview(resourceId) {
    // In a real app, this would fetch the resource data
    const resource = {
        id: resourceId,
        title: 'Sample Resource',
        description: 'This is a sample resource description.',
        price: 19.99,
        previewImage: './public/images/resource-preview-1.jpg',
        type: 'bundle',
        subject: 'biology',
        level: 'hl-sl',
        fileType: 'pdf'
    };
    
    document.querySelector('preview-modal').showPreview(resource);
}