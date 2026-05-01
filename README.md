# What's Cooking?

A recipe finder web app built with **React + Vite** that lets you discover, save, and organise recipes from around the world — powered by the free [TheMealDB API](https://www.themealdb.com/api.php).

\---

## Features

* 🔍 **Search** recipes by keyword in real time
* 🗂️ **Browse by category** — Beef, Chicken, Seafood, Pasta, and more
* 🎲 **Random recipes** displayed on every load
* ♥ **Save favourites** that persist across browser sessions
* 🛒 **Shopping list** auto-generated from your saved recipes
* ✅ **Check off ingredients** as you cook
* 📋 **Full recipe modal** with ingredients, step-by-step instructions, and YouTube link
* 💀 **Skeleton loading** animations while fetching data

\---

## Tech Stack

|Layer|Technology|
|-|-|
|Framework|React 18 (functional components)|
|Build Tool|Vite 5|
|Styling|CSS Modules + CSS Custom Properties|
|API|TheMealDB (free, no key needed)|
|Storage|localStorage via custom hook|
|Fonts|Playfair Display + DM Sans|

\---

## Project Structure

```
src/
├── App.jsx                  # Root component — manages all state
├── App.module.css
├── index.css                # Global styles, CSS variables, fonts
├── main.jsx                 # Entry point
├── api.js                   # All TheMealDB API calls
├── hooks/
│   └── useLocalStorage.js   # Custom hook for persistent state
└── components/
    ├── SearchTab.jsx         # Search, category filters, recipe grid
    ├── SavedTab.jsx          # Saved recipes grid
    ├── ShoppingTab.jsx       # Ingredient checklist
    ├── RecipeCard.jsx        # Individual recipe card
    └── RecipeModal.jsx       # Full recipe detail overlay
```

\---

## Getting Started

### Prerequisites

* Node.js v18 or higher
* npm

### Installation

```bash
# 1. Unzip the project
unzip recipe-finder.zip
cd recipe-finder

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to Vercel or Netlify.

\---

## 🔌 API Reference

This app uses the **TheMealDB v1 API** — completely free, no API key required.

|Endpoint|Used For|
|-|-|
|`/search.php?s=query`|Keyword search|
|`/filter.php?c=category`|Category filter|
|`/random.php`|Random meal|
|`/lookup.php?i=id`|Full meal details|
|`/categories.php`|Category list|

\---

## 💡 Key Concepts Demonstrated

* `useState` and `useEffect` hooks
* Custom hooks (`useLocalStorage`)
* `fetch` API with `async/await`
* `Promise.all` for parallel requests
* CSS Modules for scoped styles
* CSS keyframe animations (shimmer, fadeUp, spin)
* `localStorage` for data persistence
* Conditional rendering and component composition

\---

## 🗺️ Future Improvements

* \[ ] Search by ingredient
* \[ ] Filter by dietary preference (vegetarian, vegan)
* \[ ] Meal planner / calendar view
* \[ ] Share recipe links
* \[ ] User accounts with cloud sync

\---

## 📄 License

This project was built for educational purposes as part of a Web Programming course.  
Recipe data provided by [TheMealDB](https://www.themealdb.com) under their free tier.

\---

> Built by \\\*\\\*Rohan\\\*\\\* · VIT Vellore · 24BCE2121



