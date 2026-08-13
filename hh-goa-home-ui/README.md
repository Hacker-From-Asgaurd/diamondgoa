# HH Goa 2026 — Home UI

This implementation uses the supplied HH Goa artwork as the exact visual layer.
That is intentional: if the goal is pixel-level visual matching, rebuilding the
illustration manually in CSS would make it less accurate.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Identity button

The visible button is part of the artwork. A transparent, accessible HTML button
is positioned over it so it remains clickable.

Change this line in `src/App.jsx`:

```js
window.location.href = '/identity'
```

to your real route, for example:

```js
window.location.href = '/builder'
```

or use React Router later if the identity generator becomes a multi-page app.

## Important

For the exact same appearance, keep the supplied `hh-goa-home.png` in
`src/assets/`.
