The <Navigate/> Component (Used for Render Rules): You use this when React is actively trying to draw a page on the screen. In your App.jsx, React was trying to draw the Resume Builder, but the bouncer stepped in and said, "No, draw a detour to the login page instead." It is a structural rule.

The navigate() Function (Used for Events): You use this when a user does something (like clicking a button, waiting for a timer, or finishing a database fetch). The user isn't just looking at the screen; an event happened, and you need to react to that event by moving them.


The navigate function can do a few really cool extra tricks:

Trick 1: The "No Going Back" Rule (Replace)
Right now, after a user logs in, they get teleported to the builder. If they hit the "Back" arrow on their browser, they will go back to the login screen (which is weird, because they are already logged in!). You can prevent this by replacing the browser history:

JavaScript
navigate('/', { replace: true }); 
This acts like a one-way door. It deletes the login page from the browser's back-button history.

Trick 2: Time Travel
If you ever build a "Go Back" button, you don't need to know the URL of the previous page. You can just pass a number to navigate:

JavaScript
// Go back exactly one page in history
<button onClick={() => navigate(-1)}> Go Back </button>
In short: useNavigate is how you give your JavaScript logic the power to physically move the user around your website!


































# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
