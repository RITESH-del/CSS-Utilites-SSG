---
title: Grid Layouts
---

## 1️⃣ Basic Grid (Equal Columns)

**Use case:** Cards, image galleries, feature sections

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

**Visual**

```
[ 1 ][ 2 ][ 3 ]
[ 4 ][ 5 ][ 6 ]
```

---

## 2️⃣ Responsive Auto-Fit Grid ⭐ (Most Important)

**Use case:** Responsive cards without media queries
**This is industry standard**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

**Why it’s powerful**

* Automatically adjusts columns
* Works on mobile → desktop
* Used in dashboards, blogs, product grids

---

## 3️⃣ Holy Grail Layout (Header–Sidebar–Content–Footer)

**Use case:** Dashboards, admin panels, blogs

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

**Visual**

```
[ Header       ]
[ Sidebar | Main ]
[ Footer       ]
```

---

## 4️⃣ Centered Content (Perfect Center)

**Use case:** Login pages, modals, hero text

```css
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
```

📌 `place-items` = `align-items + justify-items`

---

## 5️⃣ Masonry-like Grid (Pinterest Style)

**Use case:** Blogs, image-heavy layouts
*(True masonry needs JS, but this is a good CSS-only approach)*

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
}

.item {
  grid-row: span 20;
}
```

---

## 6️⃣ Asymmetric Layout (Modern Landing Pages)

**Use case:** Hero sections, marketing pages

```css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
```

**Visual**

```
[  Main Content  ][ Side ]
```

---

## 7️⃣ Card with Header, Body, Footer

**Use case:** UI components, pricing cards

```css
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

**Visual**

```
[ Header ]
[ Body   ]
[ Footer ]
```

---

## 8️⃣ Overlapping Elements (Image + Text)

**Use case:** Hero banners, image captions

```css
.hero {
  display: grid;
}

.hero > * {
  grid-area: 1 / 1;
}
```

Allows elements to **stack on top of each other**.

---

## 9️⃣ Sidebar That Collapses Easily

**Use case:** Responsive dashboards

```css
.container {
  display: grid;
  grid-template-columns: minmax(200px, 25%) 1fr;
}
```

---

## 🔟 Full Page Layout (Simple Version)

```css
body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

---

## 🔑 Grid Properties You SHOULD Remember

```css
display: grid;
grid-template-columns
grid-template-rows
grid-template-areas
gap
place-items
auto-fit / auto-fill
minmax()
```

---

