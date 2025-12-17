document.addEventListener("DOMContentLoaded", function() {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            renderHomepage(data);
        })
        .catch(error => console.error('Error loading news:', error));
});

function renderHomepage(articles) {
    const heroContainer = document.getElementById('hero-container');
    const feedContainer = document.getElementById('feed-container');

    // 1. Find the Featured Article
    const featured = articles.find(article => article.isFeatured === true);
    
    // 2. DEFINE THE GRID LIST
    // CHANGE: We simply say the grid list equals ALL articles. 
    // We do NOT filter the featured one out anymore.
    const gridArticles = articles; 

    // --- HERO SECTION LOGIC ---
    if (featured) {
        heroContainer.style.display = 'block'; 
        heroContainer.innerHTML = `
            <div class="hero-headline" onclick="window.location.href='${featured.link}'" style="cursor: pointer;">
                <h1 style="margin-top: 15px; font-size: 2rem; text-transform: uppercase;">${featured.title}</h1>
            </div>
        `;
    } else {
        heroContainer.style.display = 'none';
    }

    // 3. RENDER THE GRID
    feedContainer.innerHTML = gridArticles.map(article => `
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