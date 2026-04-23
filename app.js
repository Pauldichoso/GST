// Global State
const state = {
    user: {
        name: "NIKKOKO",
        role: "admin", // Toggle to 'user' to see changes
    },
    currentView: 'analytics'
};

// Component Templates
const Views = {
    analytics: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border">
                <p class="text-sm text-gray-500 font-medium">Total Distance</p>
                <h3 class="text-3xl font-bold">1,240 km</h3>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border">
                <p class="text-sm text-gray-500 font-medium">Gas Expenditure</p>
                <h3 class="text-3xl font-bold">$450.00</h3>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border">
                <p class="text-sm text-gray-500 font-medium">Active Vehicles</p>
                <h3 class="text-3xl font-bold">12</h3>
            </div>
        </div>
        <div class="bg-white p-8 rounded-xl shadow-sm border h-96 flex items-center justify-center">
            <p class="text-gray-400 italic text-lg">[ Chart.js Canvas Placeholder ]</p>
        </div>
    `,
    vehicles: `
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-50 border-b">
                    <tr>
                        <th class="p-4 font-semibold text-gray-600">Model</th>
                        <th class="p-4 font-semibold text-gray-600">Plate Number</th>
                        <th class="p-4 font-semibold text-gray-600">Status</th>
                        <th class="p-4 font-semibold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody id="vehicle-list">
                    <tr class="border-b">
                        <td class="p-4">Toyota Hilux</td>
                        <td class="p-4 font-mono text-sm">ABC-1234</td>
                        <td class="p-4"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Available</span></td>
                        <td class="p-4"><button class="text-blue-600 hover:underline">Request</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    'gas-slip': `
        <div class="max-w-2xl bg-white p-8 rounded-xl shadow-sm border">
            <h3 class="text-lg font-bold mb-4">Upload New Receipt</h3>
            <div class="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-blue-400 transition cursor-pointer">
                <i class="fa-solid fa-cloud-arrow-up text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500">Click to upload photo or drag and drop</p>
            </div>
        </div>
    `,
    settings: `<h3 class="text-lg text-gray-500">Basic System Settings...</h3>`,
    profile: `
        <div class="bg-white p-8 rounded-xl shadow-sm border max-w-md">
            <div class="flex items-center space-x-4 mb-6">
                <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">AD</div>
                <div>
                    <h3 class="text-xl font-bold">${state.user.name}</h3>
                    <p class="text-gray-500 capitalize">${state.user.role}</p>
                </div>
            </div>
            <button onclick="alert('Logging out...')" class="w-full py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100">Logout</button>
        </div>
    `
};

// Router Function
function router(viewKey) {
    const viewport = document.getElementById('main-viewport');
    const title = document.getElementById('view-title');
    const adminActions = document.getElementById('admin-actions');
    
    // Update Title
    title.innerText = viewKey.charAt(0).toUpperCase() + viewKey.slice(1).replace('-', ' ');
    
    // Inject View
    viewport.innerHTML = Views[viewKey] || `<h1>404 Not Found</h1>`;
    
    // Toggle Admin Features
    if (state.user.role === 'admin' && (viewKey === 'vehicles' || viewKey === 'gas-slip')) {
        adminActions.classList.remove('hidden');
    } else {
        adminActions.classList.add('hidden');
    }
}

// Initial Boot
window.onload = () => {
    document.getElementById('user-role-badge').innerText = state.user.role;
    router('analytics'); // Default view
};