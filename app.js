// Global State
const UI = {
    // LOGIN PAGE
    login: `
        <div class="flex items-center justify-center h-full bg-slate-900">
            <div class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-slate-900">FleetMS</h1>
                    <p class="text-slate-500 mt-2">Sign in to manage your fleet</p>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Username</label>
                        <input id="login-user" type="text" class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter username">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Access Level</label>
                        <select id="login-role" class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="user">Standard User</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <button onclick="handleLogin()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200">
                        Login
                    </button>
                </div>
            </div>
        </div>
    `,

    // ADMIN USER MANAGEMENT (To be injected into the Settings view)
    userManagement: `
        <div class="mt-8">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">User Accounts</h3>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                    <i class="fa-solid fa-plus mr-2"></i>Create New User
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Username</th>
                            <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                            <th class="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr>
                            <td class="p-4 text-gray-700">admin_office</td>
                            <td class="p-4"><span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold uppercase">Admin</span></td>
                            <td class="p-4 text-right">
                                <button class="text-blue-600 hover:text-blue-800 mr-3 text-sm">Edit</button>
                                <button class="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
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
let currentUser = null;

function handleLogin() {
    const user = document.getElementById('login-user').value;
    const role = document.getElementById('login-role').value;

    if (!user) return alert("Please enter a username");

    // Set Session
    currentUser = { name: user, role: role };
    
    // Render the Dashboard Structure (from Phase 1)
    renderDashboard();
    
    // Default to Analytics
    router('analytics');
}

function logout() {
    currentUser = null;
    document.getElementById('root').innerHTML = UI.login;
}

function renderDashboard() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="flex h-full overflow-hidden">
            <aside class="w-64 bg-slate-900 text-white flex flex-col">
                <div class="p-6">
                    <h1 class="text-2xl font-bold text-blue-400">FLEET<span class="text-white">MS</span></h1>
                    <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">${currentUser.role} Mode</p>
                </div>
                <nav class="flex-1 px-4 space-y-2" id="nav-links"></nav>
                <div class="p-4 border-t border-slate-800">
                    <button onclick="logout()" class="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-900/30 text-red-400 transition">
                        <i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 flex flex-col bg-gray-50">
                <header class="h-16 bg-white border-b px-8 flex items-center justify-between">
                    <h2 id="view-title" class="text-xl font-bold text-gray-800 uppercase tracking-tight"></h2>
                    <div id="user-display" class="flex items-center space-x-3">
                        <span class="text-sm font-medium text-gray-600">${currentUser.name}</span>
                        <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                            ${currentUser.name[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <div id="main-viewport" class="p-8 overflow-y-auto"></div>
            </main>
        </div>
    `;
    // Re-initialize dynamic nav links based on role if needed
}

// Update the router to check for admin-only sections
function router(viewKey) {
    const viewport = document.getElementById('main-viewport');
    document.getElementById('view-title').innerText = viewKey.replace('-', ' ');

    if (viewKey === 'settings') {
        let content = `<h2 class="text-2xl font-bold">General Settings</h2>`;
        // Only show User Management if Admin
        if (currentUser.role === 'admin') {
            content += UI.userManagement;
        }
        viewport.innerHTML = content;
    } else {
        // Load other views (analytics, vehicles, etc.)
        viewport.innerHTML = Views[viewKey];
    }
}

// Start with Login
window.onload = () => {
    document.getElementById('root').innerHTML = UI.login;
};
