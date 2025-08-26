// menu.js - Gestion du menu dynamique pour le Château du Vivier

document.addEventListener('DOMContentLoaded', function() {
    // Structure du menu avec sous-menus
    const menuStructure = `
        <div class="nav-container">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">Accueil</a>
                </li>
                <li class="nav-item">
                    <a href="chateau.html" class="nav-link">Le Château</a>
                    <div class="dropdown">
                        <a href="histoire.html" class="dropdown-link">L'histoire du château</a>
                        <a href="valeurs.html" class="dropdown-link">Nos valeurs</a>
                        <a href="espaces.html" class="dropdown-link">Les espaces</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="mariages.html" class="nav-link">Mariages</a>
                    <div class="dropdown">
                        <a href="ceremonie-laique.html" class="dropdown-link">Cérémonie laïque</a>
                        <a href="vins-honneur.html" class="dropdown-link">Vins d'honneur</a>
                        <a href="seances-photos.html" class="dropdown-link">Séances photos</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="entreprise.html" class="nav-link">Entreprise</a>
                    <div class="dropdown">
                        <a href="seminaire.html" class="dropdown-link">Séminaire</a>
                        <a href="journee-etude.html" class="dropdown-link">Journée d'étude</a>
                        <a href="team-building.html" class="dropdown-link">Team Building</a>
                        <a href="soiree-gala.html" class="dropdown-link">Soirée de Gala</a>
                        <a href="lancement-produits.html" class="dropdown-link">Lancement de produits</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="galerie.html" class="nav-link">Galerie</a>
                </li>
                <li class="nav-item">
                    <a href="partenaires.html" class="nav-link">Partenaires</a>
                </li>
                <li class="nav-item">
                    <a href="temoignages.html" class="nav-link">Témoignages</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">Contact</a>
                </li>
            </ul>
        </div>
    `;

    // Injecter le menu dans la navigation
    const nav = document.getElementById('main-nav');
    if (nav) {
        nav.innerHTML = menuStructure;
    }

    // Gestion du menu mobile
    const createMobileMenu = () => {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.style.cssText = `
            display: none;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 10px 15px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 4px;
        `;

        nav.appendChild(mobileToggle);

        // Media query pour mobile
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                mobileToggle.style.display = 'block';
            } else {
                mobileToggle.style.display = 'none';
                nav.classList.remove('mobile-open');
            }
        });

        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            mobileToggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
    };

    createMobileMenu();

    // Highlight current page in menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--color-primary)';
            link.style.fontWeight = '600';
        }
    });

    // Smooth dropdown animations
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown) {
            item.addEventListener('mouseenter', () => {
                dropdown.style.animation = 'slideDown 0.3s ease forwards';
            });
            
            item.addEventListener('mouseleave', () => {
                dropdown.style.animation = 'slideUp 0.3s ease forwards';
            });
        }
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        .mobile-open .nav-container {
            display: block !important;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            padding-top: 80px;
            overflow-y: auto;
        }
        
        .mobile-open .nav-menu {
            flex-direction: column;
        }
        
        .mobile-open .dropdown {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            margin-left: 20px;
            background: transparent;
        }
    `;
    document.head.appendChild(style);
});

// Fonction pour la galerie d'images
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Créer le modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
        <div class="modal-caption" id="caption"></div>
    `;
    document.body.appendChild(modal);
    
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    const closeBtn = modal.querySelector('.close');
    
    // Ouvrir le modal au clic sur une image
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
            caption.textContent = img.alt || 'Château du Vivier';
            
            // Animation d'ouverture
            setTimeout(() => {
                modalImg.style.transform = 'scale(1)';
                modalImg.style.opacity = '1';
            }, 10);
        });
    });
    
    // Fermer le modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.style.transform = 'scale(0.8)';
        modalImg.style.opacity = '0';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.style.transform = 'scale(0.8)';
            modalImg.style.opacity = '0';
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Initialiser la galerie si sur la page galerie
if (window.location.pathname.includes('galerie')) {
    document.addEventListener('DOMContentLoaded', initGallery);
}

// Fonction pour gérer le formulaire de contact
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simulation d'envoi
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Message de succès
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.cssText = `
                background: #4caf50;
                color: white;
                padding: 15px;
                border-radius: 4px;
                margin-top: 20px;
                animation: fadeIn 0.5s ease;
            `;
            successMsg.textContent = 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.';
            
            form.appendChild(successMsg);
            form.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
}

// Initialiser le formulaire si sur la page contact
if (window.location.pathname.includes('contact')) {
    document.addEventListener('DOMContentLoaded', initContactForm);
}
