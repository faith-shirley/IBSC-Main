// API utilities for making requests to the backend
const API_BASE_URL = 'https://api.ibscienceclassroom.com/v1';

export const fetchResources = async (filters = {}) => {
    try {
        // In a real app, this would make an actual API call
        // const response = await fetch(`${API_BASE_URL}/resources?${new URLSearchParams(filters)}`);
        // const data = await response.json();
        
        // Simulated API response
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const allResources = [
            {
                id: 1,
                title: 'IB Biology Topic 1 Complete Bundle',
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
            // More resources...
        ];
        
        // Apply filters (in a real app, this would be done on the server)
        const filteredResources = allResources.filter(resource => {
            if (filters.subject && resource.subject !== filters.subject) return false;
            if (filters.type && resource.type !== filters.type) return false;
            if (filters.level && resource.level !== filters.level) return false;
            if (filters.minPrice && resource.price < filters.minPrice) return false;
            if (filters.maxPrice && resource.price > filters.maxPrice) return false;
            return true;
        });
        
        return filteredResources;
    } catch (error) {
        console.error('Error fetching resources:', error);
        throw error;
    }
};

export const fetchResourceById = async (id) => {
    try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const resources = [
            {
                id: 1,
                title: 'IB Biology Topic 1 Complete Bundle',
                description: 'Everything you need to teach Cell Biology, including lesson plans, activities, and assessments.',
                price: 24.99,
                previewImage: './public/images/resource-preview-1.jpg',
                previewPdf: './public/samples/sample-preview.pdf',
                type: 'bundle',
                subject: 'biology',
                level: 'hl-sl',
                rating: 4.8,
                downloads: 142,
                fileType: 'pdf',
                createdAt: '2023-05-15T10:30:00Z',
                updatedAt: '2023-06-01T14:15:00Z'
            },
            // More resources...
        ];
        
        const resource = resources.find(r => r.id === id);
        if (!resource) throw new Error('Resource not found');
        return resource;
    } catch (error) {
        console.error('Error fetching resource:', error);
        throw error;
    }
};

export const createPurchase = async (items, paymentMethod) => {
    try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            orderId: `IBSC-${Date.now()}`,
            total: items.reduce((sum, item) => sum + item.price, 0),
            date: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error creating purchase:', error);
        throw error;
    }
};

// More API functions as needed...