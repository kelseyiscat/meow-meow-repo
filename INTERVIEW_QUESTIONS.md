# Frontend Developer Interview Questions: Coliseum Arena Clone

Welcome to the Coliseum Arena Clone frontend interview! This repo features a lightweight HTML/CSS/JS web application (`arena-clone/`) that implements a modern AI interface.

The following questions are designed to test your knowledge of frontend web development (HTML, CSS, JavaScript) using the existing code in this repository as a starting point.

## 1. HTML & Accessibility (a11y)

1. **Semantic HTML**: In `index.html`, the sidebar is enclosed in an `<aside>` tag. What is the semantic purpose of the `<aside>` element, and when should you use it over a generic `<div>`?
2. **Form Accessibility**: Looking at the modal form setup in `index.html` and `app.js`, what attributes and labels would you ensure are present to make the `email` and `password` inputs accessible to screen readers?
3. **Focus Management**: In `app.js`, we use `setTimeout(() => document.getElementById(...).focus(), 50)` when opening the modal. Why might a small timeout be used here, and is there a better or more reliable way to handle focus management for modals?
4. **SVG Icons**: The navigation items use inline `<svg>` elements. What are the performance and styling advantages of using inline SVGs over external image files (like `.png` or `.svg` in an `<img>` tag)?

## 2. CSS & Layout

1. **Flexbox vs. Grid**: The `arena-clone` layout likely utilizes Flexbox or CSS Grid to handle the sidebar and main chat area. Which approach (Flexbox or Grid) would you prefer for an overarching app layout like this, and why?
2. **Responsive Design**: If you were to make the `.app` layout mobile-friendly, how would you handle the `.sidebar` on smaller screens? Explain the CSS concepts and media queries you would use.
3. **CSS Specificity and Classes**: The tabs in the modal use the class `.active` to toggle styles. How does toggling a class compare to directly manipulating inline styles via JavaScript in terms of CSS specificity and performance?
4. **CSS Variables (Custom Properties)**: How would you use CSS variables to implement a "Dark Mode" theme for the arena-clone?

## 3. JavaScript & DOM Manipulation

1. **Event Delegation**: In `app.js`, there's logic to handle tabs and modal buttons. If we had dynamically generated chat message items in the main window with "Like" and "Dislike" buttons, how would you use Event Delegation to handle those clicks efficiently?
2. **State Management**: `app.js` uses a global `let mode = 'signup'` variable to keep track of the modal state. What are the potential drawbacks of using global variables for state management as an application grows, and how might you refactor this?
3. **Form Handling and Validation**: When the user clicks `submitBtn`, how would you prevent the default form submission behavior and implement custom client-side validation for the password field (e.g., ensuring it's at least 8 characters)?
4. **Debouncing / Throttling**: If we added a search input to filter past chats, why might you want to use a debounce function on the input event handler? Can you explain how you would implement it?

## 4. Architecture & Best Practices

1. **Componentization**: This app is currently built with vanilla JS, a single HTML file, and a single CSS file. If you were tasked with migrating this to a framework like React, Vue, or Svelte, what components would you break this interface down into?
2. **Performance**: The app runs locally with no build step. If this were a production application, what build steps or optimizations (e.g., minification, bundling) would you introduce to ensure fast load times?
3. **API Integration**: Currently, "No data leaves your browser." If we were to connect the "Create account" submission to a real backend, describe the process and the web APIs you would use (e.g., `fetch()`, handling promises, error states).

---
*Good luck with your interview! Have fun exploring the code, and don't forget to pet the cats in the repo! 🐾*