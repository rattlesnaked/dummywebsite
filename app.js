// Store for managing application state
const store = {
    currentView: 'dashboard',
    schemas: [],
    tables: [],
    currentSchema: null,
    currentTable: null
};

// DOM Elements
const getStartedBtn = document.getElementById('getStarted');
const navButtons = document.querySelectorAll('nav button');

// Navigation handling
navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        navButtons.forEach(btn => {
            btn.classList.remove('bg-blue-50', 'text-blue-600');
            btn.classList.add('text-gray-600');
        });

        // Add active class to clicked button
        e.target.classList.remove('text-gray-600');
        e.target.classList.add('bg-blue-50', 'text-blue-600');

        // Update view based on button text
        const view = e.target.textContent.trim().toLowerCase();
        updateView(view);
    });
});

// Get Started button handling
getStartedBtn?.addEventListener('click', () => {
    // Navigate to schemas view
    updateView('schemas');
    
    // Update navigation active state
    navButtons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'schemas') {
            btn.classList.remove('text-gray-600');
            btn.classList.add('bg-blue-50', 'text-blue-600');
        } else {
            btn.classList.remove('bg-blue-50', 'text-blue-600');
            btn.classList.add('text-gray-600');
        }
    });
});

// View management
function updateView(view) {
    store.currentView = view;
    const mainContent = document.querySelector('main > div');
    
    switch(view) {
        case 'schemas':
            mainContent.innerHTML = generateSchemasView();
            break;
        case 'tables':
            mainContent.innerHTML = generateTablesView();
            break;
        case 'data':
            mainContent.innerHTML = generateDataView();
            break;
        default:
            // Dashboard view (default)
            mainContent.innerHTML = generateDashboardView();
    }

    // Initialize handlers for the new view
    initializeViewHandlers(view);
}

// View generators
function generateSchemasView() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Schemas</h2>
            <p class="text-gray-600 mb-6">Create and manage your data schemas</p>
            
            <button id="createSchemaBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create New Schema
            </button>
        </div>

        <div id="schemasList" class="grid gap-4">
            ${store.schemas.map(schema => `
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">${schema.name}</h3>
                    <p class="text-gray-600 mb-4">${schema.description}</p>
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-700">Edit</button>
                        <button class="text-red-600 hover:text-red-700">Delete</button>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500">No schemas created yet</p>'}
        </div>
    `;
}

function generateTablesView() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tables</h2>
            <p class="text-gray-600 mb-6">View and manage your tables</p>
            
            <button id="createTableBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create New Table
            </button>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Schema</th>
                        <th>Records</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${store.tables.map(table => `
                        <tr>
                            <td>${table.name}</td>
                            <td>${table.schema}</td>
                            <td>${table.recordCount}</td>
                            <td>
                                <button class="text-blue-600 hover:text-blue-700 mr-2">Edit</button>
                                <button class="text-red-600 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    `).join('') || '<tr><td colspan="4" class="text-center text-gray-500">No tables created yet</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
}

function generateDataView() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Data Management</h2>
            <p class="text-gray-600 mb-6">Add and edit data in your tables</p>
            
            <div class="flex space-x-4 mb-6">
                <select class="form-input">
                    <option value="">Select a table</option>
                    ${store.tables.map(table => `
                        <option value="${table.id}">${table.name}</option>
                    `).join('')}
                </select>
                
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Record
                </button>
            </div>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" class="text-center text-gray-500">Select a table to view data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function generateDashboardView() {
    return `
        <div class="text-center mb-12">
            <h1 class="text-3xl font-semibold text-gray-900 mb-4">Welcome to VeoWeb 👋</h1>
            <p class="text-gray-600 mb-8">VeoWeb is a web-based GUI for managing customizable tables and menus. Create schemas, add data, and visualize everything in one place — no code required.</p>
            <button id="getStarted" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Create Schema</h3>
                <p class="text-gray-600">Design your data structure with an intuitive schema builder</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Manage Tables</h3>
                <p class="text-gray-600">View and edit your tables with a powerful table editor</p>
            </div>
        </div>
    `;
}

// Initialize view-specific handlers
function initializeViewHandlers(view) {
    switch(view) {
        case 'schemas':
            const createSchemaBtn = document.getElementById('createSchemaBtn');
            createSchemaBtn?.addEventListener('click', () => {
                // Implement schema creation logic
                console.log('Create schema clicked');
            });
            break;
        case 'tables':
            const createTableBtn = document.getElementById('createTableBtn');
            createTableBtn?.addEventListener('click', () => {
                // Implement table creation logic
                console.log('Create table clicked');
            });
            break;
        case 'data':
            // Implement data view handlers
            break;
    }
}
