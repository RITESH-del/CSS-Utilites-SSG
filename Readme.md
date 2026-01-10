# Themed CSS Component Library 🎨

A modern, themeable CSS component library with static site generation using HTML, CSS, JavaScript, Node.js, EJS, and Express.js.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Documentation](#documentation)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🎨 **Multiple Themes** - Switch between different pre-built themes (Default, Glass, etc.)
- 🧩 **Component Library** - Reusable button components (extensible to more)
- 📦 **Static Site Generation** - Build-time generation of documentation
- 🔄 **Live Preview** - Interactive component previews with code examples
- 📱 **Responsive Design** - Mobile-friendly components and documentation
- ⚡ **Fast & Lightweight** - Optimized CSS output
- 🔗 **CDN Links** - Combined CSS files for easy integration
- 🛠️ **Easy Customization** - CSS variables for theme customization

## 📂 Project Structure

```
themed-css-kit/
├── build/                      # Build output directory
├── content/                    # Content files
├── docs/                      # Documentation site
│   ├── scripts/               # Client-side JavaScript
│   │   └── main.js           # Documentation interactions
│   ├── styles/               # Documentation styles
│   │   └── main.css          # Documentation CSS
│   └── templates/            # EJS templates
│       └── index.ejs         # Main documentation template
├── public/                   # Static assets (served as-is)
├── src/                      # Source files
│   ├── components/           # Component CSS files
│   │   └── button.css       # Button component styles
│   └── themes/              # Theme variable files
│       ├── default.css      # Default theme
│       └── glass.css        # Glass theme
├── config.js                # Configuration file
├── generate.js              # Static site generator
├── package-lock.json        # Dependency lock file
├── package.json             # Project dependencies & scripts
├── README.md               # This file
└── server.js               # Development server
```

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. **Clone or download the repository**
   ```bash
   git clone <your-repo-url>
   cd themed-css-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🎯 Quick Start

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

Then open your browser to `http://localhost:3000`

### Build for Production

Generate static documentation and minified CSS:

```bash
npm run build
```

Built files will be in the `build/` directory.

### Generate Documentation

Generate static documentation site:

```bash
npm run generate
```

## 📖 Usage

### Including in Your Project

#### Option 1: Single Theme

Include one theme with all components:

```html
<!-- Default Theme -->
<link rel="stylesheet" href="path/to/theme-default.min.css">

<!-- Glass Theme -->
<link rel="stylesheet" href="path/to/theme-glass.min.css">
```

#### Option 2: All Themes with Theme Switching

Include all themes and switch using data attributes:

```html
<link rel="stylesheet" href="path/to/theme-all.min.css">

<!-- Set theme on html element -->
<html data-theme="default">
  <!-- Your content -->
</html>
```

Switch themes dynamically with JavaScript:

```javascript
// Change theme
document.documentElement.setAttribute('data-theme', 'glass');
```

### Using Components

#### Buttons

```html
<!-- Basic button -->
<button class="btn">Button</button>

<!-- Primary button -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Button sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>

<!-- Disabled button -->
<button class="btn" disabled>Disabled</button>
```

## 🛠️ Development

### File Organization

#### Adding a New Theme

1. Create a new CSS file in `src/themes/`:

```css
/* src/themes/ocean.css */
:root {
  --primary: #0066cc;
  --secondary: #00ccff;
  --background: #f0f8ff;
  --text: #1a1a1a;
  --border: #ccddee;
  /* Add more variables as needed */
}
```

2. Run the build:

```bash
npm run build
```

3. Your theme will be available as `build/theme-ocean.min.css`

#### Adding a New Component

1. Create a new CSS file in `src/components/`:

```css
/* src/components/card.css */
.card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.card-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}
```

2. Run the build:

```bash
npm run build
```

3. The component will be included in all theme files

### Configuration

Edit `config.js` to customize build settings:

```javascript
module.exports = {
  input: {
    themes: 'src/themes',
    components: 'src/components'
  },
  output: {
    directory: 'build',
    minify: true
  },
  server: {
    port: 3000,
    host: 'localhost'
  }
};
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build production files
npm run build

# Generate static documentation
npm run generate

# Clean build directory
npm run clean

# Run all (clean + build + generate)
npm run all
```

## 🏗️ Building for Production

The build process:

1. **Reads** all theme files from `src/themes/`
2. **Reads** all component files from `src/components/`
3. **Combines** each theme with all components
4. **Minifies** the combined CSS
5. **Outputs** individual theme files (`theme-{name}.min.css`)
6. **Creates** a combined file (`theme-all.min.css`) with all themes
7. **Generates** metadata JSON with build information

### Build Output

After running `npm run build`, you'll get:

```
build/
├── theme-default.min.css    # Default theme + all components
├── theme-glass.min.css      # Glass theme + all components
├── theme-all.min.css        # All themes combined
└── metadata.json           # Build metadata
```

### CDN Links

After building, you can reference the files:

```html
<!-- Single theme -->
<link rel="stylesheet" href="https://your-cdn.com/theme-default.min.css">

<!-- All themes -->
<link rel="stylesheet" href="https://your-cdn.com/theme-all.min.css">
<html data-theme="default">
```

## 📚 Documentation

The documentation site is automatically generated and includes:

- **Interactive Theme Switcher** - Preview components in different themes
- **Live Code Examples** - Copy-paste ready code snippets
- **Component Preview** - See components in action
- **API Reference** - CSS class documentation
- **CDN Links** - Ready-to-use links for each theme

### Documentation Structure

```
docs/
├── templates/
│   └── index.ejs          # Main documentation template
├── styles/
│   └── main.css           # Documentation-specific styles
└── scripts/
    └── main.js            # Interactive features (theme switch, copy, etc.)
```

### Customizing Documentation

Edit the templates in `docs/templates/` to customize the documentation site. The templates use EJS syntax:

```ejs
<h1><%= title %></h1>

<% themes.forEach(theme => { %>
  <div class="theme-card">
    <h3><%= theme.name %></h3>
    <p>Size: <%= theme.size %> KB</p>
  </div>
<% }); %>
```

## 🎨 Customization

### CSS Variables

All themes use CSS variables for easy customization. You can override these in your own CSS:

```css
:root {
  /* Colors */
  --primary: #your-color;
  --secondary: #your-color;
  --success: #your-color;
  --warning: #your-color;
  --error: #your-color;
  
  /* Backgrounds */
  --background: #your-color;
  --surface: #your-color;
  --border: #your-color;
  
  /* Text */
  --text-primary: #your-color;
  --text-secondary: #your-color;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
}
```

### Creating Custom Component Variants

You can extend existing components by adding modifier classes:

```css
/* Custom button variant */
.btn-custom {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
}

.btn-custom:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}
```

## 🔧 Advanced Configuration

### Server Configuration

Edit `server.js` to customize the development server:

```javascript
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Add custom middleware
app.use((req, res, next) => {
  // Your custom logic
  next();
});
```

### Build Configuration

Customize the build process in your build script:

```javascript
// Custom minification options
const minifyOptions = {
  level: 2,
  compatibility: '*'
};

// Custom file naming
const outputFile = `theme-${themeName}-v${version}.min.css`;
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Test with all themes before submitting
- Keep components modular and reusable

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by modern CSS frameworks like Tailwind CSS and Bootstrap
- Built with love for the developer community
- Special thanks to all contributors

## 📞 Support

If you have questions or need help:

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

## 🗺️ Roadmap

- [ ] Add more components (Cards, Forms, Modals, etc.)
- [ ] More theme options (Dark, Light, High Contrast)
- [ ] Accessibility improvements
- [ ] TypeScript definitions
- [ ] React/Vue component wrappers
- [ ] Interactive theme builder
- [ ] Plugin system for extensions

---

Built with ❤️ using HTML, CSS, JavaScript, Node.js, EJS, and Express.js