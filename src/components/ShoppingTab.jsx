import { useState } from 'react';
import { extractIngredients } from '../api';
import styles from './ShoppingTab.module.css';

export default function ShoppingTab({ saved }) {
  const [checked, setChecked] = useState(new Set());
  const [selectedMeals, setSelectedMeals] = useState(new Set());

  if (saved.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2 className={styles.emptyTitle}>Shopping list is empty</h2>
        <p className={styles.emptySub}>Save some recipes first and their ingredients will appear here.</p>
      </div>
    );
  }

  const toggleMeal = (id) => {
    setSelectedMeals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setChecked(new Set());
  };

  const activeMeals = selectedMeals.size === 0
    ? saved
    : saved.filter(m => selectedMeals.has(m.idMeal));

  const allIngredients = activeMeals.flatMap(meal => {
    return extractIngredients(meal).map(ing => ({
      ...ing,
      fromMeal: meal.strMeal,
    }));
  });

  const grouped = allIngredients.reduce((acc, ing) => {
    const key = ing.name.toLowerCase();
    if (!acc[key]) acc[key] = { name: ing.name, measures: [] };
    if (ing.measure) acc[key].measures.push(ing.measure);
    return acc;
  }, {});

  const items = Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
  const checkedCount = checked.size;

  const toggleItem = (name) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const clearChecked = () => setChecked(new Set());

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Shopping List</h2>
          <p className={styles.sub}>{items.length} ingredients · {checkedCount} checked</p>
        </div>
        {checkedCount > 0 && (
          <button className={styles.clearBtn} onClick={clearChecked}>
            Clear checked
          </button>
        )}
      </div>

      <div className={styles.mealFilter}>
        <p className={styles.filterLabel}>Filter by recipe:</p>
        <div className={styles.mealChips}>
          {saved.map(meal => (
            <button
              key={meal.idMeal}
              className={`${styles.chip} ${selectedMeals.has(meal.idMeal) ? styles.chipActive : ''}`}
              onClick={() => toggleMeal(meal.idMeal)}
            >
              <img src={meal.strMealThumb} className={styles.chipImg} alt="" />
              {meal.strMeal.length > 24 ? meal.strMeal.slice(0, 24) + '…' : meal.strMeal}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {items.map(item => (
          <div
            key={item.name}
            className={`${styles.item} ${checked.has(item.name) ? styles.itemChecked : ''}`}
            onClick={() => toggleItem(item.name)}
          >
            <div className={`${styles.checkbox} ${checked.has(item.name) ? styles.checkboxChecked : ''}`}>
              {checked.has(item.name) && <span>✓</span>}
            </div>
            <span className={styles.itemName}>{item.name}</span>
            {item.measures.length > 0 && (
              <span className={styles.itemMeasure}>
                {item.measures.slice(0, 2).join(', ')}
                {item.measures.length > 2 ? ` +${item.measures.length - 2}` : ''}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
