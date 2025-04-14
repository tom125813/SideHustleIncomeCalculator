const articles = [
    {
        id: "uber",
        title: "How to Maximize Uber Earnings in 2025",
        description: "Boost your Uber earnings with expert tips for 2025, including peak hours, high-demand areas, and tip strategies.",
        summary: "Tips to boost your income as an Uber driver in 2025.",
        url: "/blog/uber.html",
        calculatorUrl: "/calculator.html?hustle=uber",
        image: "https://placehold.co/280x150?text=Uber+Guide",
        datePublished: "2025-01-15",
        dateModified: "2025-04-14"
    },
    {
        id: "lyft",
        title: "How to Earn More with Lyft in 2025",
        description: "Discover strategies to maximize your Lyft earnings in 2025 with peak hours, rider tips, and bonus opportunities.",
        summary: "Top tips for Lyft drivers in 2025.",
        url: "/blog/lyft.html",
        calculatorUrl: "/calculator.html?hustle=lyft",
        image: "https://placehold.co/280x150?text=Lyft+Guide",
        datePublished: "2025-01-20",
        dateModified: "2025-04-14"
    },
    {
        id: "fiverr",
        title: "Starting a Fiverr Side Hustle in 2025",
        description: "Learn how to land high-paying gigs on Fiverr and build a thriving freelance side hustle in 2025.",
        summary: "Learn how to land high-paying gigs on Fiverr.",
        url: "/blog/fiverr.html",
        calculatorUrl: "/calculator.html?hustle=fiverr",
        image: "https://placehold.co/280x150?text=Fiverr+Guide",
        datePublished: "2025-02-01",
        dateModified: "2025-04-14"
    },
    {
        id: "doordash",
        title: "Mastering DoorDash Deliveries in 2025",
        description: "Boost your DoorDash income with strategies for faster deliveries, better tips, and peak hours in 2025.",
        summary: "Boost your DoorDash income with these strategies.",
        url: "/blog/doordash.html",
        calculatorUrl: "/calculator.html?hustle=doordash",
        image: "https://placehold.co/280x150?text=DoorDash+Guide",
        datePublished: "2025-02-10",
        dateModified: "2025-04-14"
    }
];

function getRandomArticles(currentId, count = 3) {
    try {
        const filteredArticles = articles.filter(article => article.id !== currentId);
        if (filteredArticles.length === 0) return [];
        const shuffled = filteredArticles.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, filteredArticles.length));
    } catch (error) {
        console.error('Error in getRandomArticles:', error);
        return [];
    }
}

function generateRelatedArticles(currentId) {
    try {
        const relatedSection = document.querySelector('.related-articles');
        if (!relatedSection) {
            console.warn('Related articles section not found.');
            return;
        }

        let relatedGrid = relatedSection.querySelector('.related-grid');
        if (!relatedGrid) {
            relatedGrid = document.createElement('div');
            relatedGrid.className = 'related-grid';
            relatedSection.appendChild(relatedGrid);
        }
        relatedGrid.innerHTML = '';

        const relatedArticles = getRandomArticles(currentId);
        if (relatedArticles.length === 0) {
            relatedGrid.innerHTML = '<p>No related articles available.</p>';
            return;
        }

        relatedArticles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'related-card';
            card.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="related-image">
                <div class="related-card-content">
                    <h4><a href="${article.url}">${article.title}</a></h4>
                    <p>${article.summary}</p>
                    <a href="${article.calculatorUrl}" class="cta-button">Calculate Earnings</a>
                </div>
            `;
            relatedGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error in generateRelatedArticles:', error);
    }
}

function updateMetadata(article) {
    try {
        if (!article) return;

        document.title = `${article.title} - SideHustleCalc`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', article.description);
        }
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', `${article.id} earnings, ${article.id} tips, side hustle 2025, ${article.id} calculator`);
        }
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', article.title);
        }
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', article.description);
        }
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', `https://sidehustlecalculator.com${article.url}`);
        }
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', article.image.replace('280x150', '1200x630'));
        }
        const schema = document.querySelector('script[type="application/ld+json"]');
        if (schema) {
            schema.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.description,
                "image": article.image.replace('280x150', '1200x630'),
                "author": {
                    "@type": "Organization",
                    "name": "SideHustleCalc"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "SideHustleCalc",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://placehold.co/100x100?text=SHC"
                    }
                },
                "datePublished": article.datePublished,
                "dateModified": article.dateModified,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://sidehustlecalculator.com${article.url}`
                }
            }, null, 2);
        }
    } catch (error) {
        console.error('Error in updateMetadata:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        let currentPath = window.location.pathname;
        // Normalize path to handle relative URLs or trailing slashes
        if (!currentPath.startsWith('/')) {
            currentPath = '/' + currentPath;
        }
        currentPath = currentPath.replace(/\/$/, ''); // Remove trailing slash

        const currentArticle = articles.find(article => {
            let articleUrl = article.url.replace(/\/$/, '');
            return articleUrl === currentPath || articleUrl === currentPath + '.html';
        });

        if (currentArticle) {
            generateRelatedArticles(currentArticle.id);
            updateMetadata(currentArticle);
        } else {
            console.warn('No matching article found for path:', currentPath);
        }
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
    }
});
