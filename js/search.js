document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    
    if (query) {
        // Update header to show search term while loading
        const header = document.querySelector('h1'); 
        if(header) header.innerText = `Search Results for: "${query}"`;
        
        performSearch(query.toLowerCase());
    } else {
        // If they arrive at search.html with NO query, send them home immediately
        window.location.href = 'index.html';
    }
});

function performSearch(searchTerm) {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(article => {
                const combinedText = (
                    article.title + " " + 
                    article.excerpt + " " + 
                    article.category + " " +
                    article.date
                ).toLowerCase();
                
                return combinedText.includes(searchTerm);
            });

            renderResults(filteredArticles);
        })
        .catch(error => console.error('Error loading data:', error));
}

function renderResults(articles) {
    const container = document.getElementById('feed-container');

    // --- REDIRECT LOGIC START ---
    if (articles.length === 0) {
        // Optional: You can uncomment the line below to give them a popup before moving them
        // alert("No results found. Taking you back home!");
        
        window.location.href = 'index.html';
        return;
    }
    // --- REDIRECT LOGIC END ---

    container.innerHTML = articles.map(article => `
        <article class="card">
            <div class="card-image-placeholder" style="aspect-ratio: 16/9; overflow: hidden; border-bottom: 3px solid black;">
                <img src="media/image/${article.image}" 
                     alt="${article.title}" 
                     style="width: 100%; height: 100%; object-fit: cover; display: block;">
            </div>
            
            <div style="padding: 15px;">
            <span class="meta-tag" style="font-size: 0.8rem; background-color: #ffc400; padding: 2px 8px; border: 2px solid black; font-weight: bold;">${article.date}</span>
            <span class="meta-tag" style="font-size: 0.8rem; background-color: #64b5f6; padding: 2px 8px; border: 2px solid black; font-weight: bold;">Author: ${article.author}</span>   
                <span class="meta-tag" style="font-size: 0.8rem; background-color: #ff6b6b; padding: 2px 8px; border: 2px solid black; font-weight: bold;">${article.category}</span>
                        
                <h3 style="margin-top: 10px; margin-bottom: 10px; font-size: 1.2rem;">${article.title}</h3>
                <p style="font-size: 0.9rem; color: #555; margin-bottom: 15px;">${article.excerpt}</p>
                <a href="${article.link}">
                    <button class="read-more-btn">READ MORE</button>
                </a>
            </div>
        </article>
    `).join('');
}