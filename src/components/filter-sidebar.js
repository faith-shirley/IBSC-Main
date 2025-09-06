class FilterSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="filter-section">
                <h3>Subjects</h3>
                <div class="filter-options">
                    <div class="filter-option">
                        <input type="radio" id="subject-all" name="subject" value="" checked>
                        <label for="subject-all">All Subjects</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="subject-biology" name="subject" value="biology">
                        <label for="subject-biology">Biology</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="subject-chemistry" name="subject" value="chemistry">
                        <label for="subject-chemistry">Chemistry</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="subject-physics" name="subject" value="physics">
                        <label for="subject-physics">Physics</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="subject-environmental" name="subject" value="environmental">
                        <label for="subject-environmental">Environmental Systems</label>
                    </div>
                </div>
            </div>
            
            <div class="filter-section">
                <h3>Resource Type</h3>
                <div class="filter-options">
                    <div class="filter-option">
                        <input type="radio" id="type-all" name="type" value="" checked>
                        <label for="type-all">All Types</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="type-lesson" name="type" value="lesson-plan">
                        <label for="type-lesson">Lesson Plans</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="type-worksheet" name="type" value="worksheet">
                        <label for="type-worksheet">Worksheets</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="type-presentation" name="type" value="presentation">
                        <label for="type-presentation">Presentations</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="type-bundle" name="type" value="bundle">
                        <label for="type-bundle">Bundles</label>
                    </div>
                </div>
            </div>
            
            <div class="filter-section">
                <h3>Level</h3>
                <div class="filter-options">
                    <div class="filter-option">
                        <input type="radio" id="level-all" name="level" value="" checked>
                        <label for="level-all">All Levels</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="level-sl" name="level" value="sl">
                        <label for="level-sl">Standard Level (SL)</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="level-hl" name="level" value="hl">
                        <label for="level-hl">Higher Level (HL)</label>
                    </div>
                    <div class="filter-option">
                        <input type="radio" id="level-both" name="level" value="hl-sl">
                        <label for="level-both">Both SL & HL</label>
                    </div>
                </div>
            </div>
            
            <div class="filter-section">
                <h3>Price Range</h3>
                <div class="price-range">
                    <input type="number" id="price-min" placeholder="Min" min="0">
                    <span>to</span>
                    <input type="number" id="price-max" placeholder="Max" min="0">
                </div>
            </div>
            
            <button class="apply-filters" id="apply-filters">Apply Filters</button>
        `;
        
        // Set up event listeners for filter changes
        this.setupFilterEvents();
    }
    
    setupFilterEvents() {
        // Apply filters button
        this.querySelector('#apply-filters').addEventListener('click', () => {
            const filters = this.getCurrentFilters();
            // Dispatch event or call function to reload resources with filters
            document.dispatchEvent(new CustomEvent('filtersChanged', { detail: filters }));
        });
        
        // Radio button changes
        this.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const filters = this.getCurrentFilters();
                document.dispatchEvent(new CustomEvent('filtersChanged', { detail: filters }));
            });
        });
    }
    
    getCurrentFilters() {
        return {
            subject: this.querySelector('input[name="subject"]:checked')?.value || '',
            type: this.querySelector('input[name="type"]:checked')?.value || '',
            level: this.querySelector('input[name="level"]:checked')?.value || '',
            minPrice: this.querySelector('#price-min')?.value || 0,
            maxPrice: this.querySelector('#price-max')?.value || 1000
        };
    }
}

customElements.define('filter-sidebar', FilterSidebar);

// Initialize filter sidebar
function initFilterSidebar() {
    const filterSidebarContainer = document.getElementById('filter-sidebar');
    if (filterSidebarContainer) {
        filterSidebarContainer.innerHTML = '<filter-sidebar></filter-sidebar>';
    }
    
    // Listen for filter changes
    document.addEventListener('filtersChanged', (e) => {
        loadResources(1, e.detail);
    });
}