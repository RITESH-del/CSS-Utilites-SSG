const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const config = require('./config');

// Initialize Markdown with config settings
const md = new MarkdownIt({
  html: config.markdown.html,
  linkify: config.markdown.linkify,
  typographer: config.markdown.typographer,
  breaks: config.markdown.breaks,
});

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around colons, semicolons, braces
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*,\s*/g, ',')
    // Remove last semicolon
    .replace(/;}/g, '}')
    .trim();
}

//minifying and bundling css
const COMPONENTS_DIR = path.join(__dirname, config.paths.components);
const THEMES_DIR = path.join(__dirname, config.paths.themes);

const CONTENT_DIR = path.join(__dirname, config.paths.content);
const TEMPLATES_DIR = path.join(__dirname, config.paths.templates);
const BUILD_DIR = path.join(__dirname, config.paths.build);
const PUBLIC_DIR = path.join(__dirname, config.paths.public);


function buildCSS() {
  let ThemesFiles = fs.readdirSync(THEMES_DIR).filter((file) => file.endsWith('.css'));

  let ComponentFiles = fs.readdirSync(COMPONENTS_DIR).filter((file)=> file.endsWith('.css'));

  //combine all the components
  let componentsCSS = '';
  ComponentFiles.forEach(file =>{
    const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8');
    componentsCSS += `\n/* ${file} */\n${content}\n`;
  });

  // Process each theme
  const themes = [];
  ThemesFiles.forEach(file => {
    const themeName = path.basename(file, '.css');
    const themeCSS = fs.readFileSync(path.join(THEMES_DIR, file), 'utf8');
    
    // Combine theme + components
    const combinedCSS = themeCSS + '\n' + componentsCSS;
    
    // Minify
    const minified = minifyCSS(combinedCSS);
    
    // Write to dist
    const outputFile = `theme-${themeName}.min.css`;
    fs.writeFileSync(
      path.join(BUILD_DIR, outputFile),
      minified,
      'utf8'
    );
    
    themes.push({
      name: themeName,
      file: outputFile,
      size: (minified.length / 1024).toFixed(2)
    });
    
    console.log(`✓ Built ${outputFile} (${(minified.length / 1024).toFixed(2)} KB)`);
  });

  // Create theme-all.min.css (all themes combined with data attributes)
  let allThemesCSS = '';
  ThemesFiles.forEach(file => {
    const themeName = path.basename(file, '.css');
    const themeCSS = fs.readFileSync(path.join(THEMES_DIR, file), 'utf8');
    
    // Wrap in data attribute selector
    const wrappedCSS = `[data-theme="${themeName}"] { ${themeCSS} }\n`;
    allThemesCSS += wrappedCSS;
  });

  allThemesCSS += componentsCSS;

  const allMinified = minifyCSS(allThemesCSS);
  fs.writeFileSync(
    path.join(BUILD_DIR, 'theme-all.min.css'),
    allMinified,
    'utf8'
  );
  console.log(`✓ Built theme-all.min.css (${(allMinified.length / 1024).toFixed(2)} KB)`);
  
  return [{name: 'allThemesCSS', file: 'theme-all.min.css'}, ...themes];
}


// Helper function to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read all documention
function getDocs() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('⚠️ Content directory not found:', CONTENT_DIR);
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md'));

  const docs = files.map(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { data, content: markdown } = matter(fileContent);

    return {
      slug: file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      date: data.date || null,
      description: data.description || '',
      author: data.author || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: md.render(markdown),
      rawContent: markdown
    };
  });



  // Sort by date (newest first), undated last
  return docs.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });
}

// write docs pages
function generateDocsPages(docs){
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'docs.ejs'), 'utf-8');

  docs.forEach((doc)=>{
    const html = ejs.render(template, { docs, doc, config });
    const docsDir = path.join(BUILD_DIR, 'docs', doc.slug);
    ensureDir(docsDir);
    fs.writeFileSync(path.join(docsDir, 'index.html'), html);
    if (config.build.verbose) {
      console.log(`✓ Generated: docs/${doc.slug}/index.html`);
    }
  })
}

// Generate HomePage
function generateHomePage(docs, themes){
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'index.ejs'), 'utf-8');
  const html = ejs.render(template, {config, docs, themes});
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
  if (config.build.verbose) {
    console.log('✓ Generated: index.html');
  }
}

//copy static assets
function copyAssets(){

  // copy css
  const cssDir = path.join(BUILD_DIR, 'styles');
  ensureDir(cssDir);
  
  const docsStylesDir = path.join(__dirname, config.paths.styles);
  if (fs.existsSync(docsStylesDir)) {
    const cssFiles = fs.readdirSync(docsStylesDir);
    cssFiles.forEach(file => {
      fs.copyFileSync(
        path.join(docsStylesDir, file),
        path.join(cssDir, file)
      );
    });
    if (config.build.verbose) {
      console.log('✓ Copied CSS files');
    }
  }

   // Copy JS
  const jsDir = path.join(BUILD_DIR, 'scripts');
  ensureDir(jsDir);
  
  const docsScriptsDir = path.join(__dirname, config.paths.scripts);
  if (fs.existsSync(docsScriptsDir)) {
    const jsFiles = fs.readdirSync(docsScriptsDir);
    jsFiles.forEach(file => {
      fs.copyFileSync(
        path.join(docsScriptsDir, file),
        path.join(jsDir, file)
      );
    });
    if (config.build.verbose) {
      console.log('✓ Copied JS files');
    }
  }

   // Copy public assets if they exist
  if (fs.existsSync(PUBLIC_DIR)) {
    const publicFiles = fs.readdirSync(PUBLIC_DIR);
    publicFiles.forEach(file => {
      const srcPath = path.join(PUBLIC_DIR, file);
      const destPath = path.join(BUILD_DIR, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        ensureDir(destPath);
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    if (config.build.verbose) {
      console.log('✓ Copied public assets');
    }
  }

}


// Clean build directory
function cleanBuild() {
  if (config.build.cleanBuild && fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }
  ensureDir(BUILD_DIR);
  if (config.build.verbose) {
    console.log('✓ Cleaned build directory');
  }
}

// Main build function
function build() {
  console.log('🚀 Starting build...\n');
  console.log(`📝 Site: ${config.site.title}`);
  console.log(`🌐 URL: ${config.site.url}\n`);
  
  cleanBuild();

  const themes = buildCSS();

  const docs = getDocs();
  
  console.log(`Found ${docs.length} posts\n`);
  
  generateHomePage(docs, themes);
  generateDocsPages(docs);
  // generateAboutPage(posts);
  copyAssets();
  
  console.log('\n✨ Build complete! Files are in the /build directory');
  console.log(`📦 Ready to deploy to ${config.site.url}`);
}

// Run build
build();
