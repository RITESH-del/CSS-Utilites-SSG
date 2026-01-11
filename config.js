
module.exports = {

      // Site Metadata
  site: {
    title: 'CSS Component Library',
    description: 'A utility first component library with multiple themes',
    author: 'Ritesh Kumar',
    email: 'riteshrishu2005@gmail.com',
    url: 'https://ritesh-del.github.io/CSS-Utilites-SSG', // Your production URL (no trailing slash)
    lang: 'en',
    favicon: '/favicon.ico',
  },

  // Social Media Links
  social: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    facebook: '', // Leave empty to hide
    instagram: '', // Leave empty to hide
  },


  // Navigation Menu
  navigation: [
    { name: 'Home', path: '/', active: true },
    { name: 'About', path: '/about/', active: true },
    // Add more menu items here:
    // { name: 'Contact', path: '/contact/', active: true },
    // { name: 'Projects', path: '/projects/', active: true },
  ],

  // Directory Paths
  paths: {
    content: './content',
    components: './src/components',
    themes: './src/themes',
    font: './src/fonts',
    templates: './docs/templates',
    styles: './docs/styles',
    scripts: './docs/scripts',
    public: './public',
    build: './build',
  },

  basepath:'/CSS-Utilites-SSG',


  // Build Settings
  build: {
    cleanBuild: true, // Clean build directory before building
    verbose: true, // Show detailed build logs
    generateSitemap: true, // Generate sitemap.xml
    generateRSS: true, // Generate RSS feed
  },

  // SEO Settings
  seo: {
    ogImage: '/images/og-image.jpg', // Open Graph default image
    twitterCard: 'summary_large_image',
    keywords: ['blog', 'web development', 'technology'], // Default keywords
  },

    // Theme Customization
  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    codeFont: '"Courier New", monospace',
  },

  // Custom Pages
  customPages: [
    // Add custom pages to generate
    // { template: 'contact.ejs', output: 'contact', data: {} },
    // { template: 'projects.ejs', output: 'projects', data: {} },
  ],

// Markdown Settings
  markdown: {
    html: true, // Allow HTML in markdown
    linkify: true, // Auto-convert URLs to links
    typographer: true, // Enable smart quotes and other typographic replacements
    breaks: false, // Convert \n to <br>
    highlight: null, // Custom syntax highlighting function (optional)
  },

  // Development Server
  dev: {
    port: 3000,
    host: 'localhost',
    openBrowser: false, // Auto-open browser on server start
  },


}