const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}

export async function getMealsByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  return data.meals || [];
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories.php`);
  const data = await res.json();
  return data.categories || [];
}

export async function getRandomMeals(count = 8) {
  const promises = Array.from({ length: count }, () =>
    fetch(`${BASE}/random.php`).then(r => r.json()).then(d => d.meals?.[0])
  );
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  return ingredients;
}
