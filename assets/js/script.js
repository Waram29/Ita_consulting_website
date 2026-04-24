// Script de base pour le site
console.log('JS chargé avec succès !');

// Sélection des éléments
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const topBar = document.querySelector(".top-bar");
const scrollProgress = document.getElementById("scrollProgress");
const stats = document.querySelectorAll('.stat-number');

let lastScrollTop = 0;

// Click hamburger
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Scroll detection pour cacher le top-bar
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        topBar.classList.add("hidden");
    } else {
        topBar.classList.remove("hidden");
    }
});

// ===== HERO SLIDER =====

const slides = document.querySelector(".slides");
let slideIndex = 0;

function showSlides() {
  slideIndex++;
  if (slideIndex > 1) {
    slideIndex = 0;
  }
  slides.style.transform = "translateX(-" + (slideIndex * 100) + "%)";
}

// Fonction pour passer au slide suivant
function nextSlide() {
  slideIndex++;
  if (slideIndex > 1) {
    slideIndex = 0;
  }
  slides.style.transform = "translateX(-" + (slideIndex * 100) + "%)";
}

// Fonction pour passer au slide précédent
function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = 1;
  }
  slides.style.transform = "translateX(-" + (slideIndex * 100) + "%)";
}

// Défilement automatique toutes les 7 secondes
setInterval(showSlides, 7000);

// ===== ANIMATION DES CHIFFRES =====

const speed = 200;

const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const isPercent = stat.innerText.includes('%');
        
        const updateCount = () => {
            const currentText = stat.innerText.replace('+', '').replace('%', '');
            const count = +currentText;
            const inc = Math.ceil(target / speed);

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

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-section'));

// ===== TABS Services =====
function openTab(evt, tabName) {
    // 1. Déclarer les variables
    var i, tabcontent, tablinks;

    // 2. Masquer tous les éléments avec la classe "tab-content"
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // 3. Supprimer la classe "active" de tous les boutons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 4. Afficher l'onglet actuel et ajouter la classe "active" au bouton cliqué
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// ===== ANIMATION PROCESSUS =====
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.process-step');
    const lineFill = document.querySelector('.line-fill');
    const triggerBottom = window.innerHeight * 0.8; // Se déclenche à 80% de la vue

    let activeSteps = 0;

    steps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top;

        if (stepTop < triggerBottom) {
            step.classList.add('reveal');
            activeSteps = index + 1;
        }
    });

    // Calcul de la hauteur de la ligne verte
    // (Nombre d'étapes actives - 0.5 pour ne pas dépasser la dernière bulle)
    const progress = ((activeSteps - 1) / (steps.length - 1)) * 100;
    lineFill.style.height = Math.max(0, progress) + "%";
});

//  ==== SLIDER TESTIMONIALS =====
// ==== SLIDER TESTIMONIALS (CORRIGÉ) =====
const trackTesti = document.getElementById('sliderTrack');
const slidesTesti = document.querySelectorAll('.slide-3d'); // Renommé ici
let currentIndex = Math.min(1, slidesTesti.length - 1);

function updateSlider() {
    slidesTesti.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentIndex) {
            slide.classList.add('active');
        }
    });

    // Vérification de sécurité pour éviter les erreurs si l'élément n'existe pas encore
    if (slidesTesti.length > 0) {
        const slideWidth = slidesTesti[0].offsetWidth;
        const containerWidth = document.querySelector('.slider-3d-wrapper').offsetWidth;
        
        // Calcul précis pour centrer
        const offset = (containerWidth / 2) - (slideWidth * currentIndex) - (slideWidth / 2);
        trackTesti.style.transform = `translateX(${offset}px)`;
    }
}

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= slidesTesti.length) currentIndex = slidesTesti.length - 1;
    updateSlider();
}

// Initialisation et adaptation au redimensionnement
window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

// Petit délai pour s'assurer que le DOM est bien calculé avant le premier rendu
setTimeout(updateSlider, 100);