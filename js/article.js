document.addEventListener("DOMContentLoaded", function() {
    // 1. Fetch the data
    fetch('/data/articles.json')
        .then(response => response.json())
        .then(articles => {
            loadArticleData(articles);
        })
        .catch(error => console.error('Error loading article data:', error));
});

function loadArticleData(articles) {
    // 2. Figure out which page we are on
    const currentPath = window.location.pathname;

    // 3. Find the article in JSON that matches this URL
    // We check if the JSON link is included in the current browser URL
    const currentArticle = articles.find(article => currentPath.includes(article.link));

    if (currentArticle) {
        // 4. Update the HTML elements
        
        // Update DATE
        const dateElement = document.getElementById('meta-date');
        if (dateElement) dateElement.innerText = `DATE: ${currentArticle.date}`;

        // Update AUTHOR
        const authorElement = document.getElementById('meta-author');
        if (authorElement) authorElement.innerText = `AUTHOR: ${currentArticle.author || 'Staff'}`;

        // Update MOOD (Or Category)
        const moodElement = document.getElementById('meta-mood');
        if (moodElement) moodElement.innerText = `Catagory: ${currentArticle.mood || currentArticle.category}`;
    } else {
        console.warn("Could not find matching article in JSON for this path:", currentPath);
    }
}