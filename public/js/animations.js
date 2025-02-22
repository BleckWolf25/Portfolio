// animations.js - Scroll-based animations and effects
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
import { ScrollTrigger } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

class PortfolioAnimations {
    constructor() {
        this.initializeAnimations();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }

    initializeAnimations() {
        // Hero section animations
        gsap.from('.hero-content', {
            duration: 1.2,
            y: 60,
            opacity: 0,
            ease: 'power3.out'
        });

        // Staggered tech stack animation
        gsap.from('.tech-item', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });

        // Nav links animation
        gsap.from('.nav-links a', {
            duration: 0.5,
            y: -20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }

    setupScrollAnimations() {
        // Project cards animation
        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Skill categories animation
        gsap.utils.toArray('.skill-category').forEach(skill => {
            gsap.from(skill, {
                scrollTrigger: {
                    trigger: skill,
                    start: 'top bottom-=50',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.2)'
            });
        });
    }

    setupParallaxEffects() {
        // Subtle parallax effect for background elements
        gsap.utils.toArray('.parallax-bg').forEach(elem => {
            gsap.to(elem, {
                scrollTrigger: {
                    trigger: elem,
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
                ease: 'none'
            });
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});