document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    
    if (query) {
        performSearch(query.toLowerCase());
    } else {
        // Optional: specific logic if they land here without a query
        // e.g., show all items or nothing.
        // For now, we do nothing or could redirect home.
    }
});

function performSearch(searchTerm) {
    fetch('/data/articles.json')
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(article => {
                const combinedText = (
                    article.title + " " + 
                    article.excerpt + " " + 
                    article.category
                ).toLowerCase();
                
                return combinedText.includes(searchTerm);
            });

            renderResults(filteredArticles);
        })
        .catch(error => console.error('Error loading data:', error));
}

function renderResults(articles) {
    const container = document.getElementById('feed-container');

    if (articles.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center;">
                <p>No tea found matching that description. ☕</p>
                <a href="/index.html" style="color: blue; text-decoration: underline;">Go back home</a>
            </div>
        `;
        return;
    }

    container.innerHTML = articles.map(article => `
        <article class="card">
            <div class="card-image-placeholder">
               [${article.category}]
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="${article.link}">
                <button class="read-more-btn">READ MORE</button>
            </a>
        </article>
    `).join('');
}