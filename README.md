# Tracklist Landing Page

A clean, modern landing page for Tracklist with animated background circles and Space Grotesk typography.

## Features

- **Animated Background**: Smooth-moving circles adapted from React Native to vanilla JavaScript
- **Space Grotesk Font**: Clean, modern typography loaded from Google Fonts
- **Responsive Design**: Mobile-friendly with fluid typography using `clamp()`
- **Accessibility**: Respects `prefers-reduced-motion` settings
- **Custom Branding**: Teal accent squares and Bluesky logo integration

## Files

- `index.html` - Main landing page
- `styles.css` - All styling and layout
- `script.js` - Animated background circles and text rotation
- `Bluesky_Logo.svg` - Bluesky logo asset
- `README.md` - This file

## Running the Landing Page

### Option 1: Simple Python Server (Recommended)

```bash
cd /path/to/tracklist-landingpage
python3 -m http.server 8080
```

Then open: http://localhost:8080

### Option 2: Any Static File Server

Since this is a static site, you can use any web server:

```bash
# Node.js (if you have npx)
npx serve .

# PHP built-in server
php -S localhost:8080

# Live Server (VS Code extension)
# Just right-click index.html > "Open with Live Server"
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --accent: #00D4E6;      /* Main teal color */
  --bg: #000000;          /* Background */
  --text: #ffffff;        /* Text color */
}
```

### Animation Settings
In `script.js`, modify the `AnimatedBackground` constructor:
```javascript
new AnimatedBackground(backgroundContainer, {
  intensity: 'medium',    // 'low', 'medium', 'high'
  colorScheme: 'blue'     // 'blue', 'purple', 'green', 'mixed'
});
```

### Text Rotation
Change the rotating phrases in `script.js`:
```javascript
const phrases = [
  "without limits",
  "unleashed", 
  "for all",
  "on your terms"
];
```

## Design Notes

- The "tr" in "tracklist" has a teal rectangle background with right-aligned text
- D M T footer chips use the same styling pattern as the "tr" square
- Animated circles move slowly (20-35 second transitions) for subtle motion
- All interactive elements have hover states and smooth transitions

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Custom Properties (variables)
- ES6 JavaScript
- SVG

No build process required - just serve the static files!