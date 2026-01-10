

# Theme Usage Guide

This guide explains how to use the prebuilt CSS themes provided by **CSS Utilities** in your project.

Each theme is distributed as a **minified CSS file** that includes:
- Base theme variables
- All utility components
- Optimized, production-ready styles

---

## 📦 Available Themes

You can include **any one theme** directly via a `<link>` tag.

### Example Theme Files

```text
theme-default.min.css
theme-glass.min.css
theme-all.min.css
````

---

## 🚀 Using a Single Theme (Recommended)

Include **one theme file** in the `<head>` of your HTML.

### Default Theme

```html
<link rel="stylesheet" href="https://your-site.com/theme-default.min.css">
```

### Glass Theme

```html
<link rel="stylesheet" href="https://your-site.com/theme-glass.min.css">
```

✅ Best for:

* Simple projects
* No runtime theme switching
* Smaller CSS size

---

## 🎨 Using All Themes (Theme Switching)

If you want to switch themes dynamically, use the **all-in-one bundle**.

### Include the Bundle

```html
<link rel="stylesheet" href="https://your-site.com/theme-all.min.css">
```

### Activate a Theme

Add a `data-theme` attribute to your root element:

```html
<body data-theme="default">
```

Switch theme dynamically:

```js
document.body.setAttribute('data-theme', 'glass');
```

Available values depend on the generated theme names.

---

## 🧩 Folder Structure Example

```text
build/
├── theme-default.min.css
├── theme-glass.min.css
├── theme-all.min.css
```

---

## ⚠️ Important Notes

* Do **not** include multiple single-theme files together
* Use **only one** of:

  * a single theme file
  * OR `theme-all.min.css`
* Theme files already include all components — no extra imports needed

---

## 🛠 Local Development

When running locally:

```html
<link rel="stylesheet" href="/theme-default.min.css">
```

Make sure your dev server is serving the `/build` directory.

---

## 📌 Best Practices

* Use **single theme files** for production when possible
* Use **theme-all** only when theme switching is required
* Keep theme selection at the `<body>` or `<html>` level

---

## ✨ Example Full HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Utilities</title>
    <link rel="stylesheet" href="/theme-default.min.css" />
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

---
