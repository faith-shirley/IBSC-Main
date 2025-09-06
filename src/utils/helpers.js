// Helper functions
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const getFileIcon = (fileType) => {
    const icons = {
        pdf: 'file-pdf',
        doc: 'file-word',
        docx: 'file-word',
        ppt: 'file-powerpoint',
        pptx: 'file-powerpoint',
        xls: 'file-excel',
        xlsx: 'file-excel',
        zip: 'file-archive',
        jpg: 'file-image',
        jpeg: 'file-image',
        png: 'file-image',
        gif: 'file-image',
        mp4: 'file-video',
        mov: 'file-video'
    };
    
    const extension = fileType.toLowerCase();
    return icons[extension] || 'file';
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};