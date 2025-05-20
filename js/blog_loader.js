document.addEventListener("DOMContentLoaded", function() {
    const postsListContainer = document.getElementById("dynamic-blog-posts-list");
    const recentPostsContainer = document.getElementById("dynamic-recent-posts-list");
    const categoriesContainer = document.getElementById("dynamic-categories-list");
    const placeholderImage = "img/blog/placeholder_blog_post.png"; // Default placeholder

    if (!postsListContainer) {
        console.error("Error: Blog posts container (dynamic-blog-posts-list) not found.");
        if (document.getElementById("blog-posts")) { // Check if the main section exists
             document.getElementById("blog-posts").innerHTML = "<p style='color:white; text-align:center;'>Erro ao carregar a lista de posts. O contêiner não foi encontrado.</p>";
        }
        return;
    }

    fetch("js/news_data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            postsListContainer.innerHTML = ""; // Clear loading message
            if (data && data.length > 0) {
                const categories = {};
                data.forEach((post, index) => {
                    const postCard = document.createElement("article");
                    postCard.className = "blog-post-card";

                    const postLink = document.createElement("a");
                    postLink.href = post.link;
                    postLink.className = "blog-post-card-link";
                    postLink.target = "_blank"; // Open in new tab
                    postLink.rel = "noopener noreferrer";

                    const imageContainer = document.createElement("div");
                    imageContainer.className = "blog-post-card-image-container";
                    const image = document.createElement("img");
                    image.src = post.image_url ? post.image_url : placeholderImage;
                    image.alt = post.title;
                    image.className = "blog-post-card-image";
                    image.onerror = function() { // Fallback if loaded image fails
                        this.onerror=null; this.src=placeholderImage;
                    };
                    imageContainer.appendChild(image);

                    const contentContainer = document.createElement("div");
                    contentContainer.className = "blog-post-card-content";

                    const title = document.createElement("h3");
                    title.className = "blog-post-card-title";
                    title.textContent = post.title;

                    const excerpt = document.createElement("p");
                    excerpt.className = "blog-post-card-excerpt";
                    excerpt.textContent = post.description || "Leia mais...";

                    const metaContainer = document.createElement("div");
                    metaContainer.className = "blog-post-card-meta";
                    
                    const dateSpan = document.createElement("span");
                    dateSpan.className = "blog-post-card-date";
                    let formattedDate = "Data não disponível";
                    if (post.date) {
                        try {
                            const d = new Date(post.date);
                            formattedDate = d.toLocaleDateString("pt-BR", { day: 'numeric', month: 'long', year: 'numeric' });
                        } catch (e) { /* Keep default if date is invalid */ }
                    }
                    dateSpan.textContent = formattedDate;

                    const categorySpan = document.createElement("span");
                    categorySpan.className = "blog-post-card-category";
                    categorySpan.textContent = post.source; // Using source as category for now

                    // Update categories count
                    if (categories[post.source]) {
                        categories[post.source]++;
                    } else {
                        categories[post.source] = 1;
                    }

                    metaContainer.appendChild(dateSpan);
                    metaContainer.appendChild(categorySpan);

                    contentContainer.appendChild(title);
                    contentContainer.appendChild(excerpt);
                    contentContainer.appendChild(metaContainer);

                    postLink.appendChild(imageContainer);
                    postLink.appendChild(contentContainer);
                    postCard.appendChild(postLink);
                    postsListContainer.appendChild(postCard);

                    // Add to recent posts (first 5)
                    if (index < 5 && recentPostsContainer) {
                        const recentPostLi = document.createElement("li");
                        const recentPostLink = document.createElement("a");
                        recentPostLink.href = post.link;
                        recentPostLink.textContent = post.title;
                        recentPostLink.target = "_blank";
                        recentPostLink.rel = "noopener noreferrer";
                        recentPostLi.appendChild(recentPostLink);
                        recentPostsContainer.appendChild(recentPostLi);
                    }
                });

                // Populate categories
                if (categoriesContainer) {
                    categoriesContainer.innerHTML = ""; // Clear existing categories
                    for (const category in categories) {
                        const categoryLi = document.createElement("li");
                        const categoryLink = document.createElement("a");
                        categoryLink.href = "#"; // Placeholder link for category filtering
                        categoryLink.textContent = `${category} (${categories[category]})`;
                        categoryLi.appendChild(categoryLink);
                        categoriesContainer.appendChild(categoryLi);
                    }
                }

            } else {
                postsListContainer.innerHTML = "<p style='color:white; text-align:center;'>Nenhuma notícia encontrada.</p>";
            }
        })
        .catch(error => {
            console.error("Error loading or parsing news data:", error);
            postsListContainer.innerHTML = `<p style='color:white; text-align:center;'>Ocorreu um erro ao carregar as notícias. Tente novamente mais tarde. Detalhes: ${error.message}</p>`;
        });
});
