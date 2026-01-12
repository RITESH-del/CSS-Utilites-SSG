const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { minify: minifyHTML } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");

const BUILD_DIR = "build";

(async () => {
  console.log("⚡ Minifying build folder...\n");

  // ---------- HTML ----------
  const htmlFiles = glob.sync(`${BUILD_DIR}/**/*.html`);
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, "utf8");
    const minified = await minifyHTML(content, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    });
    fs.writeFileSync(file, minified);
    console.log("✓ HTML:", file);
  }

  // ---------- CSS ----------
  const cssFiles = glob.sync(`${BUILD_DIR}/**/*.css`);
  for (const file of cssFiles) {
    const content = fs.readFileSync(file, "utf8");
    const output = new CleanCSS({ level: 2 }).minify(content);
    fs.writeFileSync(file, output.styles);
    console.log("✓ CSS :", file);
  }

  // ---------- JS ----------
  const jsFiles = glob.sync(`${BUILD_DIR}/**/*.js`);
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const result = await terser.minify(content);
    fs.writeFileSync(file, result.code);
    console.log("✓ JS  :", file);
  }

  console.log("\n✨ Build folder fully minified!");
})();
