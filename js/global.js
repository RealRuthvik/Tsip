document.addEventListener("DOMContentLoaded", function() {
    loadComponent('header-placeholder', '/components/header.html');
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

    // --- SMART SEARCH LOGIC ---
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.id === 'search-form') {
            e.preventDefault(); 

            const input = document.getElementById('search-input');
            const query = input.value.trim().toLowerCase();

            if (!query) return;

            // Fetch data to check existence
            fetch('/data/articles.json')
                .then(response => response.json())
                .then(articles => {
                    const matchFound = articles.some(article => {
                        const content = (
                            article.title + " " + 
                            article.excerpt + " " + 
                            article.category
                        ).toLowerCase();
                        return content.includes(query);
                    });

                    if (matchFound) {
                        // Success: Go to search page
                        window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                    } else {
                        // Fail: UI Feedback inside the input box
                        triggerSearchError(input);
                    }
                })
                .catch(err => console.error("Error checking search:", err));
        }
    });
});

// Helper function to handle the error UI
function triggerSearchError(inputElement) {
    const originalPlaceholder = inputElement.getAttribute('placeholder');
    
    // 1. Clear the typed text
    inputElement.value = '';
    
    // 2. Change placeholder to error message
    inputElement.setAttribute('placeholder', 'No tea found! 💅');

    // 4. Reset after 2 seconds
    setTimeout(() => {
        inputElement.setAttribute('placeholder', originalPlaceholder);
        inputElement.style.borderColor = ''; // Resets to CSS default
    }, 2000);
}

function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Component not found");
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}