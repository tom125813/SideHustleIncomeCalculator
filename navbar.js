document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navOptions = document.querySelector('.nav-options');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to the document
        hamburger.classList.toggle('cross');
        navOptions.classList.toggle('active');
    });

    // Close menu when clicking anywhere on the page
    document.addEventListener('click', (e) => {
        if (!navOptions.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('cross');
            navOptions.classList.remove('active');
        }
    });

    // Close menu when a link is clicked on mobile
    document.querySelectorAll('.nav-options a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('cross');
                navOptions.classList.remove('active');
            }
        });
    });
});
