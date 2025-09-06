// Storage utilities for handling resources, cart, etc.
export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

export const addToCart = (resourceId) => {
    const cart = getCart();
    if (!cart.includes(resourceId)) {
        cart.push(resourceId);
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    }
    return false;
};

export const removeFromCart = (resourceId) => {
    let cart = getCart();
    cart = cart.filter(id => id !== resourceId);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};

export const getResources = () => {
    // In a real app, this would fetch from an API
    return [
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
};

export const saveResource = (resource) => {
    // In a real app, this would save to a database
    console.log('Saving resource:', resource);
    return { success: true, id: Date.now() };
};

export const deleteResource = (resourceId) => {
    // In a real app, this would delete from a database
    console.log('Deleting resource:', resourceId);
    return { success: true };
};