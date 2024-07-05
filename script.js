document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.7 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const navbarLinks = document.querySelectorAll('.desktop-links a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' 
                });
            }
        });
    });

    const toggleBtn = document.getElementById('toggle-btn');
    const mobileLinks = document.getElementById('mobile-links');
    const menuToggle = document.querySelector('.menu-toggle');

    toggleBtn.addEventListener('click', function() {
        mobileLinks.classList.toggle('active');
        menuToggle.classList.toggle('change');
    });

    function updateBackground(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const gradient = activeSlide.dataset.gradient;
        document.querySelector('.best-sellers').style.background = gradient;
    }

    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                updateBackground(this);
            }
        }
    });

    updateBackground(swiper); // Set the initial background
});
