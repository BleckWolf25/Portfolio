// -------- IMPORTS -------- \\

import { inView, animate } from '/node_modules/motion';

// -------- FUNCTIONS -------- \\

// Function to handle animations when a section is in view
function setupSectionAnimations(sectionSelector, animationTargets, animationOptions) {
  const section = document.querySelector(sectionSelector);
  
  if (!section) {
    console.error(`Section not found: ${sectionSelector}`);

    return;
  }
  
  const validTargets = [];
  
  animationTargets.forEach((target) => {
    if (target instanceof NodeList) {
      target.forEach((item) => {
        if (item && item.nodeType === Node.ELEMENT_NODE) {
          validTargets.push(item);
        }
      });
    } else if (target && target.nodeType === Node.ELEMENT_NODE) {
      validTargets.push(target);
    } else {
      console.error('Invalid or null target found:', target);
    }
  });
  
  if (validTargets.length === 0) {
    console.warn(`No valid targets for section: ${sectionSelector}`);

    return;
  }
  
  validTargets.forEach((target) => {
    target.style.opacity = 0;
    target.style.transform = `translateY(30px) scale(${animationOptions.scale ? 0.9 : 1})`;
  });
  
  inView(section, () => {
    animate(
      validTargets,
      {
        y: [30, 0],
        opacity: [0, 1],
        scale: animationOptions.scale ? [0.9, 1] : [1, 1],
      },
      {
        duration: animationOptions.duration || 1,
        delay: animationOptions.delay || 0.3,
        ease: 'easeInOut',
      },
    );
  }, {
    amount: animationOptions.threshold || 0.5,
  });
}
// Let the document load before trying to change every element.
document.addEventListener('DOMContentLoaded', () => {

  // -------- HOME ANIMATIONS -------- \\

  // Home Section Animations
  const homeTitle = document.querySelector('.home__title');
  const homeRole = document.querySelector('.home__role');
  const homeDescription = document.querySelector('.home__description');
  const homeGreeting = document.querySelector('.home__greeting');

  setupSectionAnimations(
    '#home',
    [homeTitle, homeRole, homeDescription, homeGreeting],
    {
      threshold: 0.5, // Threshold
      duration: 1.5, // Duration
      delay: 0.75, // Delay
    },
  );

  // -------- ABOUT ANIMATIONS -------- \\

  // About Section Animations
  const aboutTitle = document.querySelector('.about__title');
  const aboutDescription = document.querySelector('.about__description');

  setupSectionAnimations(
    '#about',
    [aboutTitle, aboutDescription],
    {
      threshold: 0.5, // Threshold
      duration: 0.5, // Duration
      delay: 0.25, // Delay
    },
  );

  // -------- TECHS ANIMATIONS -------- \\

  // Techs Section Animations
  const techsTitle = document.querySelector('.techs__title');
  const techsGrid = document.querySelector('.techs__grid');
  const techGroups = document.querySelectorAll('.tech-group');
  const techGroupTitles = document.querySelectorAll('.tech-group__title');
  const techGroupItems = document.querySelectorAll('.tech-group__items');
  const techItems = document.querySelectorAll('.tech-item');
  const techItemIcons = document.querySelectorAll('.tech-item iconify-icon');

  setupSectionAnimations(
    '#tech',
    [
      techsTitle,
      techsGrid,
      ...techGroups,
      ...techGroupTitles,
      ...techGroupItems,
      ...techItems,
      ...techItemIcons,
    ],
    {
      threshold: 0.2, // Threshold
      duration: 1.2, // Duration
      delay: 0.5, // Delay
    },
  );

  // -------- WHAT I DEVELOP ANIMATIONS -------- \\

  // What I Develop Section Animations
  const developTitle = document.querySelector('.develop__title');
  const developGrid = document.querySelector('.develop__grid');
  const developItems = document.querySelectorAll('.develop-item');

  setupSectionAnimations(
    '#develop',
    [developTitle, developGrid, ...developItems],
    {
      threshold: 0.5, // Threshold
      duration: 0.5, // Duration
      delay: 0, // Delay
    },
  );

  // -------- SOFT SKILLS ANIMATIONS -------- \\

  const softSkillsTitle = document.querySelector('.soft_skills__title');
  const softSkillsGrid = document.querySelector('.soft_skills__grid');
  const softSkillsItems = document.querySelectorAll('.soft_skills-item');

  setupSectionAnimations(
    '#soft_skills',
    [softSkillsTitle, softSkillsGrid, ...softSkillsItems],
    {
      threshold: 0.5, // Threshold
      duration: 0.5, // Duration
      delay: 0.25, // Delay
    },
  );

  // -------- PROJECTS ANIMATIONS -------- \\

  const projectsTitle = document.querySelector('.projects__title');
  const projectsGrid = document.querySelector('.projects__grid');
  const projectsCards = document.querySelectorAll('.projects-card');

  setupSectionAnimations(
    '#projects',
    [projectsTitle, projectsGrid, ...projectsCards],
    {
      threshold: 0.2, // Threshold
      duration: 0.5, // Duration
      delay: 0, // Delay
    },
  );


  // -------- CONTACT ANIMATIONS -------- \\

  const contactTitle = document.querySelector('.contact__title');
  const contactIcons = document.querySelector('.contact__icons');

  setupSectionAnimations(
    '#contact',
    [contactTitle, contactIcons],
    {
      threshold: 0.5, // Threshold
      duration: 0.8, // Duration
      delay: 0.2, // Delay
    },
  );
});