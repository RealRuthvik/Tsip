document.addEventListener("DOMContentLoaded", function() {
    // 1. Determine which header to load based on the current page
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const headerPath = isHomePage ? '/components/header.html' : '/components/header-articles.html';

    // 2. Load the specific components
    loadComponent('header-placeholder', headerPath);
    loadComponent('footer-placeholder', '/components/footer.html');

    // --- Mobile Menu Logic ---
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('#mobile-menu-btn');
        if (btn) {
            const nav = document.getElementById('main-nav');
            if (nav) {
                nav.classList.toggle('active');
            }
        }
    });

    // Note: The Search Logic remains removed from global.js 
    // because it is now handled specifically in home.js
});

function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Component not found: " + filePath);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading component:', error));
}