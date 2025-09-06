// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check admin authentication
    checkAdminAuth();
    
    // Initialize admin functionality
    initAdminPanel();
});

function checkAdminAuth() {
    // In a real app, this would verify admin credentials
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
        // Redirect to login or show error
        window.location.href = '../index.html';
        return;
    }
}

function initAdminPanel() {
    // Set up file upload functionality
    setupFileUpload();
    
    // Load existing resources
    loadResources();
    
    // Set up form submission
    setupResourceForm();
}

function setupFileUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('resource-file');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>File selected:</p>
                    <p><strong>${fileName}</strong></p>
                    <p>Click to change</p>
                `;
            }
        });
        
        // Handle drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--sky-blue');
            uploadArea.style.backgroundColor = 'rgba(75, 163, 195, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--slate-gray');
            uploadArea.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--slate-gray');
            uploadArea.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                const fileName = e.dataTransfer.files[0].name;
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>File selected:</p>
                    <p><strong>${fileName}</strong></p>
                    <p>Click to change</p>
                `;
            }
        });
    }
}

function loadResources() {
    // Simulated resources data
    const resources = [
        {
            id: 1,
            title: 'IB Biology Topic 1 Complete Bundle',
            type: 'bundle',
            subject: 'Biology',
            level: 'HL/SL',
            price: 24.99,
            uploadDate: '2023-05-15',
            downloads: 142
        },
        {
            id: 2,
            title: 'Chemistry IA Guide & Examples',
            type: 'guide',
            subject: 'Chemistry',
            level: 'HL/SL',
            price: 14.99,
            uploadDate: '2023-06-02',
            downloads: 87
        },
        {
            id: 3,
            title: 'Physics Option C: Energy Complete Unit',
            type: 'unit',
            subject: 'Physics',
            level: 'HL',
            price: 19.99,
            uploadDate: '2023-04-20',
            downloads: 65
        }
    ];
    
    const resourceList = document.getElementById('resource-list');
    if (resourceList) {
        resourceList.innerHTML = resources.map(resource => `
            <li class="resource-item">
                <div class="resource-info">
                    <h4>${resource.title}</h4>
                    <div class="resource-meta">
                        <span>${resource.type} • ${resource.subject} • ${resource.level}</span>
                        <span>$${resource.price.toFixed(2)}</span>
                    </div>
                    <div class="resource-stats">
                        <small>Uploaded: ${resource.uploadDate} • Downloads: ${resource.downloads}</small>
                    </div>
                </div>
                <div class="resource-actions">
                    <button class="btn-edit" data-id="${resource.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${resource.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </li>
        `).join('');
        
        // Set up edit and delete buttons
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceId = parseInt(e.currentTarget.getAttribute('data-id'));
                editResource(resourceId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceId = parseInt(e.currentTarget.getAttribute('data-id'));
                deleteResource(resourceId);
            });
        });
    }
}

function setupResourceForm() {
    const resourceForm = document.getElementById('resource-form');
    if (resourceForm) {
        resourceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(resourceForm);
            const resourceData = {
                title: formData.get('title'),
                description: formData.get('description'),
                type: formData.get('type'),
                subject: formData.get('subject'),
                level: formData.get('level'),
                price: parseFloat(formData.get('price')),
                file: formData.get('file')
            };
            
            // Validate form
            if (!resourceData.title || !resourceData.type || !resourceData.subject || 
                !resourceData.level || isNaN(resourceData.price)) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real app, this would upload to server
            console.log('Submitting resource:', resourceData);
            alert('Resource submitted successfully!');
            resourceForm.reset();
            
            // Reset upload area display
            const uploadArea = document.getElementById('upload-area');
            if (uploadArea) {
                uploadArea.innerHTML = `
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Drag & drop your file here</p>
                    <p>or</p>
                    <p>Click to browse files</p>
                `;
            }
            
            // Reload resources list
            loadResources();
        });
    }
}

function editResource(resourceId) {
    // In a real app, this would fetch resource data and populate form
    console.log('Editing resource:', resourceId);
    alert('Edit functionality would open the resource in the form for editing.');
}

function deleteResource(resourceId) {
    if (confirm('Are you sure you want to delete this resource?')) {
        // In a real app, this would send delete request to server
        console.log('Deleting resource:', resourceId);
        alert('Resource deleted successfully!');
        
        // Reload resources list
        loadResources();
    }
}