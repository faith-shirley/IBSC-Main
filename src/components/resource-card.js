class ResourceCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const resource = {
            id: this.getAttribute('data-id') || 1,
            title: this.getAttribute('title') || 'Resource Title',
            description: this.getAttribute('description') || 'Resource description',
            price: this.getAttribute('price') || '0.00',
            previewImage: this.getAttribute('preview-image') || './public/images/resource-preview-1.jpg',
            type: this.getAttribute('type') || 'resource',
            subject: this.getAttribute('subject') || 'subject',
            level: this.getAttribute('level') || 'level',
            rating: this.getAttribute('rating') || 0,
            downloads: this.getAttribute('downloads') || 0
        };

        this.innerHTML = `
            <div class="resource-card">
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
                            <span class="resource-price">$${parseFloat(resource.price).toFixed(2)}</span>
                            <button class="btn-add-to-cart" data-id="${resource.id}">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('resource-card', ResourceCard);