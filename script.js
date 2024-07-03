document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.7 // Trigger when at least 70% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); // Stop observing once the class is added
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling to section when clicking on navbar links
    const navbarLinks = document.querySelectorAll('.desktop-links a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior (e.g., navigating to a new page)

            const targetId = this.getAttribute('href').substring(1); // Get target section id
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate offset to scroll to the section with some padding
                const offsetTop = targetSection.offsetTop - 100; // Adjust as needed

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Smooth scroll behavior
                });
            }
        });
    });
});
