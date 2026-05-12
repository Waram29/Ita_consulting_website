/**
 * ITA Consulting - Structure & Navigation
 */

// Sélection des éléments
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const menuIcon = hamburger?.querySelector("i");
const backToTopBtn = document.getElementById('back-to-top');
const siteName = "ITA Consulting";

// --- MENU MOBILE ---
const toggleMenu = () => {
    if (!navMenu || !menuIcon) return;
    const isActive = navMenu.classList.toggle("active");
    if (isActive) {
        menuIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }
};

if (hamburger) hamburger.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu?.classList.remove("active");
        menuIcon?.classList.replace("fa-xmark", "fa-bars");
        // Mise à jour Titre
        const sectionName = link.textContent.trim();
        document.title = `${sectionName} | ${siteName}`;
    });
});

document.addEventListener("click", (e) => {
    if (hamburger && !hamburger.contains(e.target) && navMenu && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        menuIcon?.classList.replace("fa-xmark", "fa-bars");
    }
});

// --- BOUTON BACK TO TOP & TITRE LOGO ---
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        backToTopBtn.classList.toggle('show', scrollY > 300);
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.title = `Accueil | ${siteName}`;
    });
}

const logoHome = document.querySelector(".brand");
if (logoHome) {
    logoHome.addEventListener("click", () => {
        document.title = `Accueil | ${siteName}`;
    });
}

// --- TABS & FAQ ---
window.openTab = function(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    const tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName)?.classList.add("active");
    evt.currentTarget.classList.add("active");
};

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// --- FORMULAIRE ---
document.getElementById("contactForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("formStatus");
    const btnText = document.getElementById("btnText");
    const data = new FormData(form);

    btnText.innerText = "Envoi en cours...";
    form.querySelector('button').disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            status.style.display = "block";
            status.style.color = "#28a745";
            status.innerText = "Merci ! Votre demande a été envoyée avec succès.";
            form.reset();
        } else { throw new Error(); }
    } catch (error) {
        status.style.display = "block";
        status.style.color = "#dc3545";
        status.innerText = "Oups ! Une erreur est survenue.";
    } finally {
        btnText.innerText = "Envoyer ma demande";
        form.querySelector('button').disabled = false;
        setTimeout(() => { if(status) status.style.display = "none"; }, 5000);
    }
});