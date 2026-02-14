# Editing Guide for Dr. Nuwan Thotawaththa's Website

This guide helps you update the content of your new Apple-style website.

## 1. Updating Text Content
All content is in `index.html`.

### Key Sections:
-   **Hero**: Change the name, role, or buttons inside `<header class="hero">`.
-   **Bio**: Text is inside `<section id="bio">`.
-   **Experience**: Look for `<div class="timeline-item">`.
-   **Collapsible Lists**:
    -   Research, Training, Publications, Media, and Memberships are inside `<details>` tags.
    -   To change the clickable Title, edit the text inside `<summary>`.
    -   To change the list items, edit the `<ul>` or `<p>` tags inside `div.accordion-content`.

## 2. Adding New Items to Lists
To add a new publication or workshop:
1.  Find the relevant `<ul class="list-clean">`.
2.  Add a new list item:
    ```html
    <li><strong>Year/Title:</strong> Description of the item.</li>
    ```

## 3. Changing Images
-   **Profile Photo**: Replace `docs/nuto-pic.jpg`. Ensure it is a square or portrait image for best results.
-   **Book Covers**: Currently, the publications are text-only lists for a cleaner look. If you want to add images back, you will need to create `<img>` tags inside the grid columns.

## 4. Updates to the CV File
-   Replace `docs/Nuwan Thotawaththa - CV.pdf` with your new PDF. Ensure the filename matches exactly.

## 5. Design Adjustments (`css/style.css`)
-   **Colors**: Edit the variables at the top of the file:
    ```css
    :root {
        --accent-color: #0066cc; /* Change the primary blue */
    }
    ```
