/**
 * ITA Consulting - Animations & Sliders
 */

// --- NAVIGATION ACTIVE AU SCROLL ---
const navLinksAnim = document.querySelectorAll(".nav-menu a");
const observerActive = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksAnim.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

document.querySelectorAll('section[id]').forEach(section => observerActive.observe(section));

window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
        navLinksAnim.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-menu a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
    
    // Top Bar & Process line
    const topBar = document.querySelector(".top-bar");
    if (topBar) topBar.classList.toggle("hidden", window.scrollY > 50);

    const steps = document.querySelectorAll('.process-step');
    const lineFill = document.querySelector('.line-fill');
    if (lineFill) {
        let activeSteps = 0;
        steps.forEach((step, index) => {
            if (step.getBoundingClientRect().top < window.innerHeight * 0.8) {
                step.classList.add('reveal');
                activeSteps = index + 1;
            }
        });
        const progress = ((activeSteps - 1) / (steps.length - 1)) * 100;
        lineFill.style.height = Math.max(0, progress) + "%";
    }
});

// --- ANIMATION DES CHIFFRES ---
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const isPercent = stat.innerText.includes('%');
        const updateCount = () => {
            const count = +stat.innerText.replace('+', '').replace('%', '');
            const inc = Math.ceil(target / 200);
            if (count < target) {
                const nextVal = count + inc > target ? target : count + inc;
                stat.innerText = isPercent ? nextVal + '%' : '+' + nextVal;
                setTimeout(updateCount, 15);
            } else {
                stat.innerText = isPercent ? target + '%' : '+' + target;
            }
        };
        updateCount();
    });
};

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const obsStats = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animateStats(); obsStats.disconnect(); }
    }, { threshold: 0.5 });
    obsStats.observe(statsSection);
}

// --- SLIDERS (Hero & Testimonials) ---
document.addEventListener("DOMContentLoaded", () => {
    // Hero Slider
    const slidesContainer = document.querySelector(".slides");
    const allSlides = document.querySelectorAll(".slide");
    if (slidesContainer && allSlides.length > 0) {
        let slideIndex = 0;
        setInterval(() => {
            slideIndex = (slideIndex + 1) % allSlides.length;
            slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        }, 7000);
    }

    // Slider Témoignages
    const trackTesti = document.getElementById('sliderTrack');
    const slidesTesti = document.querySelectorAll('.slide-3d');
    if (trackTesti && slidesTesti.length > 0) {
        let currentIndex = Math.min(1, slidesTesti.length - 1);
        const updateTesti = () => {
            slidesTesti.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
            const offset = (document.querySelector('.slider-3d-wrapper').offsetWidth / 2) - (slidesTesti[0].offsetWidth * currentIndex) - (slidesTesti[0].offsetWidth / 2);
            trackTesti.style.transform = `translateX(${offset}px)`;
        };
        window.moveSlide = (dir) => {
            currentIndex = Math.max(0, Math.min(slidesTesti.length - 1, currentIndex + dir));
            updateTesti();
        };
        window.addEventListener('resize', updateTesti);
        setTimeout(updateTesti, 100);
    }
});