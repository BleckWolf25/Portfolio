// Project data structure
const projects = [
    {
        title: "The Modder",
        description: "A modding shell-script & swift based app for MacOs users that changes how MacOs behaves without risky commands nor breaking SIP.",
        technologies: ["Swift", "Shell Script"],
        github: "https://github.com/JotaRYT/TheModderBase"
    }
];

// Error handling utility
function handleError(error) {
    console.error('Error:', error);
    return `<div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        Failed to load content. Please try again later.
    </div>`;
}

class PortfolioManager {
    constructor() {
        this.initializePortfolio();
        this.setupEventListeners();
    }

    initializePortfolio() {
        this.setupTheme();
        this.loadProjects();
        this.setupMobileMenu();
        this.setupCursorEffect();
        this.setupScrollAnimations();
    }

    loadProjects() {
        const projectGrid = document.querySelector('.project-grid');
        if (!projectGrid) return;

        try {
            projectGrid.innerHTML = ''; // Clear existing content
            projects.forEach((project, index) => {
                const projectCard = this.createProjectCard(project);
                projectCard.style.setProperty('--delay', index);
                projectGrid.appendChild(projectCard);
            });
        } catch (error) {
            projectGrid.innerHTML = handleError(error);
        }
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">
                    <i class="fab fa-github"></i> Code
                </a>
            </div>
        `;
        
        return card;
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links a');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuBtn.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }

    setupCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', e => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });

        document.querySelectorAll('a, button').forEach(elem => {
            elem.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            elem.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.project-card, .about-content, .skill-category')
            .forEach(element => observer.observe(element));
    }

    setupEventListeners() {
        // Smooth scroll handling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: 'power3.inOut'
                    });
                }
            });
        });

        // Handle navigation active states
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize portfolio
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});
