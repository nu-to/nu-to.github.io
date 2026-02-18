# Copilot Instructions

## Project Overview

Static personal website for Dr. Nuwan Thotawaththa (Sri Lankan public health specialist and children's author). No build tools, no package manager, no framework — pure HTML/CSS/JS. Deployed via GitHub Pages at [https://nu-to.github.io/](https://nu-to.github.io/).

## Architecture

All three files work together with no compilation step:

- **`index.html`** — Single page containing all content. Every section, every list item, every text string lives here.
- **`css/style.css`** — All styling. CSS custom properties defined in `:root` control theming.
- **`js/main.js`** — Vanilla JS for interactivity: mobile nav, smooth scrolling, IntersectionObserver-based fade-in animations, scroll-linked CSS variable (`--scroll`), and the book carousel.
- **`docs/`** — Static assets: `nuto-pic.jpg` (profile photo), `Nuwan Thotawaththa - CV.pdf` (must match this filename exactly in the CV download link), `nuwan-icon.ico`, and `docs/book-covers/` (book cover images named A.png, B.png … AA.png, BB.png …).

## Key HTML Conventions

**Section structure:** Every content section uses `<section class="section-padding">` (or `bg-light` for alternate background). Inner content wraps in `<div class="container fade-up">`.

**Accordion pattern:** Collapsible content (Research, Training, Publications, Media, Memberships) uses native `<details>`/`<summary>` with class `accordion`:
```html
<details class="accordion">
    <summary><h3>Section Title</h3><span class="icon">+</span></summary>
    <div class="accordion-content">
        <ul class="list-clean">
            <li><strong>Year/Label:</strong> Description.</li>
        </ul>
    </div>
</details>
```

**Timeline items** (Experience section):
```html
<div class="timeline-item">
    <div class="timeline-card">
        <span class="date">YYYY - YYYY</span>
        <h3>Role Title</h3>
        <p class="location">Institution, Place</p>
    </div>
</div>
```

**Education/info cards** (grid layout):
```html
<div class="grid-3">
    <div class="card">...</div>
</div>
```

**Scroll animations:** Add class `fade-up` to any element to have it animate in on scroll (JS adds `visible` class via IntersectionObserver). Each element animates only once.

## Key CSS Conventions

**Theming variables** (top of `style.css`):
```css
:root {
    --accent-color: #0066cc;   /* Primary blue */
    --accent-hover: #004499;
    --text-primary: #1d1d1f;
    --text-secondary: #86868b;
    --card-bg: rgba(255, 255, 255, 0.65);  /* Glassmorphism */
    --font-stack: "Google Sans", ...;
}
```

**Scroll-linked gradient:** `body` carries `style="--scroll: 0;"` and JS updates `--scroll` (0–1) on scroll. The `.dynamic-background` element uses this variable for a shifting gradient effect.

**Design language:** Apple/Google-inspired — glassmorphism cards, subtle shadows, smooth transitions. Maintain this aesthetic when adding new components.

## Adding Content

- **New list item** (publications, awards, etc.): Add `<li><strong>Label:</strong> Text.</li>` inside the relevant `<ul class="list-clean">`.
- **New accordion section**: Copy the `<details class="accordion">` pattern above.
- **New book cover**: Add image to `docs/book-covers/`, then add a `<div class="book-item">` inside `#book-carousel-track`. The carousel JS auto-clones all children for infinite loop — no JS changes needed.
- **Profile photo**: Replace `docs/nuto-pic.jpg` (keep the filename).
- **CV**: Replace `docs/Nuwan Thotawaththa - CV.pdf` (keep the filename exactly).
