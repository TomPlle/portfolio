/**
 * GESTION DU LOADER ET INITIALISATION DU SITE
 */
const loader = document.querySelector('.loader');
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('load', () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) progressBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('fondu-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                    // --- ON LANCE LES ANIMATIONS DU LOGO ICI ---
                    initLogoAnimations();
                }, 400);
            }, 200);
        }
    }, 20);
});

/**
 * ANIMATIONS DU LOGO (Démarrées après le loader)
 */
function initLogoAnimations() {
    const logo = document.getElementById('main-logo');
    if (!logo) return;

    const logoDot = logo.querySelector('.logo-dot');
    const logoType = document.getElementById('logo-type');
    const finalWord = "Dev";
    let isTyping = false;

    // --- FONCTION DE FRAPPE ---
    function typeEffect() {
        if (isTyping) return;
        isTyping = true;
        
        // RENDRE LE LOGO VISIBLE juste avant de commencer à taper
        logo.style.opacity = "1";
        
        logo.classList.add('typing');
        logoType.textContent = "";
        let i = 0;

        function type() {
            if (i < finalWord.length) {
                logoType.textContent += finalWord.charAt(i);
                i++;
                setTimeout(type, Math.random() * 100 + 100);
            } else {
                setTimeout(() => {
                    logo.classList.remove('typing');
                    isTyping = false;
                }, 1000);
            }
        }
        type();
    }

    // 1. DÉCLENCHEMENT AUTOMATIQUE
    // On garde le petit délai de 100ms pour être sûr que le loader est bien parti
    setTimeout(typeEffect, 100);

    // 2. Point rebondissant
    setInterval(() => {
        if (!isTyping && logoDot) {
            logoDot.classList.add('bounce');
            setTimeout(() => logoDot.classList.remove('bounce'), 500);
        }
    }, 4000);

    // 3. Réactivation au survol
    logo.addEventListener('mouseenter', typeEffect);
}

/**
 * INITIALISATION AOS
 */
AOS.init({
    duration: 1000,
    once: true
});

/**
 * NAVIGATION & NAVBAR
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 50px';
        nav.style.background = 'rgba(15, 12, 41, 0.95)';
    } else {
        nav.style.padding = '20px 50px';
        nav.style.background = 'rgba(15, 12, 41, 0.8)';
    }
});

/**
 * GESTION DES PROJETS (OVERLAYS)
 */
const viewer = document.getElementById('project-viewer');
const iframe = document.getElementById('project-iframe');
const closeBtn = document.querySelector('.close-project');




// Projet 3 (SAE 105 - Site Web)
const projet3 = document.querySelector('.projects-grid .project-card:nth-child(3)');
projet3.addEventListener('click', () => {
    iframe.src = "./SAE105/index_projet2.html";
    viewer.style.display = "block";
    setTimeout(() => {
        viewer.classList.add('active');
        document.body.style.overflow = "hidden";
    }, 10);
});

// Projet 2 (SAE 104 - Vidéo YouTube)
const projetSAE104 = document.querySelector('.project-card:nth-child(2)');
projetSAE104.addEventListener('click', () => {
    iframe.src = "https://www.youtube.com/embed/nyDvvBLnuYA?autoplay=1";
    viewer.style.display = "block";
    setTimeout(() => {
        viewer.classList.add('active');
        document.body.style.overflow = "hidden";
    }, 10);
});

// Projet 1 (SAE 103 - PDF)
const projet1 = document.querySelector('.project-card:nth-child(1)');
const pdfViewer = document.getElementById('pdf-viewer');
const pdfIframe = document.getElementById('pdf-iframe');
const closePdfBtn = document.querySelector('.close-pdf');

projet1.addEventListener('click', () => {
    pdfIframe.src = "./SAE103/Pelloile_Tom_Article.pdf";
    pdfViewer.style.display = "block";
    setTimeout(() => {
        pdfViewer.classList.add('active');
        document.body.style.overflow = "hidden";
    }, 10);
});

// Fermetures des overlays
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        viewer.classList.remove('active');
        setTimeout(() => {
            viewer.style.display = "none";
            iframe.src = "";
            document.body.style.overflow = "auto";
        }, 500);
    });
}

if (closePdfBtn) {
    closePdfBtn.addEventListener('click', () => {
        pdfViewer.classList.remove('active');
        setTimeout(() => {
            pdfViewer.style.display = "none";
            pdfIframe.src = "";
            document.body.style.overflow = "auto";
        }, 500);
    });
}

/**
 * BOUTON VOIR PLUS
 */
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const hiddenCards = document.querySelectorAll('.project-card.hidden');
        hiddenCards.forEach((card) => {
            card.classList.remove('hidden');
            const delay = card.getAttribute('data-delay') || "0";
            card.setAttribute('data-aos', 'flip-left');
            card.setAttribute('data-aos-delay', delay);
            card.style.opacity = "1";
        });
        AOS.refreshHard();
        loadMoreBtn.style.display = 'none';
    });
}


//ANIMATION BACKGROUND
const canvas = document.getElementById('neon-bg');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Taille variée
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1; // Poids pour le mouvement
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Effet Néon
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = "#6c5ce7";
        ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset pour la perf
    }

    update() {
        // Mouvement de flottement de base
        this.baseY -= 0.2; 
        if (this.baseY < -10) this.baseY = canvas.height + 10;

        // Interaction avec la souris (Effet Magnétique)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
            this.opacity = 0.8; // S'illumine au contact
        } else {
            // Revient doucement à sa position d'origine
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
            this.opacity = Math.max(this.opacity - 0.01, 0.3);
        }
    }
}

function init() {
    particles = [];
    // Nombre de particules adapté à la taille de l'écran
    const numberOfParticles = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

