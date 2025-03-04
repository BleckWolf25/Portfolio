# TEMPLATE USAGE

## Portfolio Template 🚀

A modern, responsive portfolio template for developers. Showcase your projects, skills, and experience with style.

![Portfolio Preview](./screenshot.jpg)

## ✨ Features

- Modern glassmorphism design
- Responsive navigation with mobile menu
- Project showcase section
- Technology stack display
- Smooth animations and transitions
- Custom cursor effects
- Loading screen animation
- Easy customization

## 🛠 Technologies Used

- HTML5 & CSS3 (with CSS Variables)
- JavaScript (ES6+)
- [Motion.js](https://motion.dev/) - Animation library
- [Iconify](https://iconify.design/) - Icon framework
- Flexbox & CSS Grid
- CSS Transitions & Animations

## 🚀 Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/portfolio-template.git
    ```

2. Install dependencies (none required)
3. Customize content in `home.html`
4. Modify styles in CSS files
5. Deploy to your favorite hosting platform

## 📂 Project Structure

```zsh
portfolio-template/
├── css/
│   ├── main.css
│   ├── home.css
│   ├── loading_dots.css
│   └── cursor.css
├── js/
│   ├── animations.js
│   ├── cursor.js
│   └── navbar.js
├── views/
│   └── home.html
├── index.html
└── README.md
```

## 🔧 Customization Guide

1. Replace placeholder text in HTML files
2. Update color scheme in `:root` variables
3. Add/remove technology items
4. Modify project cards
5. Update social links
6. Customize animations

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

## 1. Basic Setup

### 1.1 Replace Placeholders

- In all HTML files:
  
  ```html
  <!-- Replace these -->
  <title>{Your Name} Portfolio</title>
  <span class="logo-text">{YourName}</span>
  ```

### 1.2 Update Metadata

```html
<!-- index.html -->
<meta name="author" content="{Your Name}">
<meta property="og:title" content="{Your Name} Portfolio">
```

## 2. Content Customization

### 2.1 Home Section

```html
<section class="home" id="home">
  <div class="home__container">
    <span class="home__greeting">Custom greeting</span>
    <h1 class="home__title">{YourName}</h1>
    <h2 class="home__role">{Your Roles}</h2>
    <p class="home__description">{Your Tagline}</p>
  </div>
</section>
```

### 2.2 Technologies Section

```html
<!-- Add/remove technology groups -->
<article class="tech-group">
  <h3 class="tech-group__title">Languages</h3>
  <ul class="tech-group__items">
    <li class="tech-item">
      <iconify-icon icon="mdi:language-javascript"></iconify-icon>
      <span>JavaScript</span>
    </li>
  </ul>
</article>
```

## 3. Style Customization

### 3.1 Color Scheme

```css
/* css/main.css */
:root {
  --primary-color: #70a1ff;
  --secondary-color: #ff5a48;
  --background-dark: #202020;
}
```

### 3.2 Typography

```css
body {
  font-family: 'Your Font', system-ui, sans-serif;
}
```

## 4. Deployment

### 4.1 Static Hosting Options

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

### 4.2 Build Process

No build required - pure HTML/CSS/JS

## 5. Adding New Sections

1. Create new section in HTML

    ```html
    <section class="new-section" id="new-section">
    <!-- Your content -->
    </section>
    ```

2. Add corresponding CSS

    ```css
    /* css/home.css */
    .new-section {
    padding: 4rem 0;
    }
    ```

3. Update navigation

```html
<li class="navbar__item">
  <a href="#new-section" class="navbar__links">
    <span class="nav-indicator"></span>
    <span class="nav-text">New Section</span>
  </a>
</li>
```

## Need Help?

Open an issue on [GitHub](https://github.com/BleckWolf25/portfolio-template/issues)

This structure provides:

1. **Professional Documentation**: Clear separation between template overview (README) and usage instructions
2. **Visual Hierarchy**: Consistent header levels and code formatting
3. **Customization Guidance**: Step-by-step modification instructions
4. **Technical Specs**: Clear technology requirements and dependencies
5. **Future-Proofing**: Instructions for adding new features/sections

The template maintains all original functionality while being fully customizable. Users can easily:

- Update content through HTML files
- Modify styling via CSS variables
- Extend functionality with additional JS
- Add/remove sections as needed
- Deploy to any static hosting platform
