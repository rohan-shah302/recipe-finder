import { useState, useEffect, useCallback } from 'react';
import { searchMeals, getRandomMeals, getCategories, getMealsByCategory, getMealById } from '../api';
import RecipeCard from './RecipeCard';
import styles from './SearchTab.module.css';

export default function SearchTab({ saved, onSave, onRemove, onOpenModal }) {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    getCategories().then(cats => setCategories(cats.slice(0, 12)));
    loadRandom();
  }, []);

  const loadRandom = async () => {
    setLoading(true);
    const results = await getRandomMeals(8);
    setMeals(results);
    setLoading(false);
    setSearched(false);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setActiveCategory('All');
    const results = await searchMeals(query);
    setMeals(results);
    setLoading(false);
    setSearched(true);
  };

  const handleCategory = async (cat) => {
    setActiveCategory(cat);
    setQuery('');
    if (cat === 'All') { loadRandom(); return; }
    setLoading(true);
    const list = await getMealsByCategory(cat);
    // get full meal details for first 8
    const detailed = await Promise.all(
      list.slice(0, 8).map(m => getMealById(m.idMeal))
    );
    setMeals(detailed.filter(Boolean));
    setLoading(false);
    setSearched(false);
  };

  const savedIds = new Set(saved.map(m => m.idMeal));

  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          What's on your<br /><em>plate tonight?</em>
        </h1>
        <p className={styles.heroSub}>Search millions of recipes from around the world</p>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Try 'chicken', 'pasta', 'tacos'…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
        </form>
      </div>

      <div className={styles.categories}>
        <button
          className={`${styles.catBtn} ${activeCategory === 'All' ? styles.catActive : ''}`}
          onClick={() => handleCategory('All')}
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c.idCategory}
            className={`${styles.catBtn} ${activeCategory === c.strCategory ? styles.catActive : ''}`}
            onClick={() => handleCategory(c.strCategory)}
          >
            {c.strCategory}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={`skeleton ${styles.skeletonImg}`} />
              <div className={styles.skeletonBody}>
                <div className={`skeleton ${styles.skeletonLine}`} />
                <div className={`skeleton ${styles.skeletonLineSm}`} />
              </div>
            </div>
          ))}
        </div>
      ) : meals.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No recipes found</p>
          <p className={styles.emptySub}>Try a different search term</p>
          <button className={styles.resetBtn} onClick={loadRandom}>Show random recipes</button>
        </div>
      ) : (
        <>
          <div className={styles.resultsMeta}>
            <span>{searched ? `${meals.length} results for "${query}"` : activeCategory !== 'All' ? `${activeCategory} recipes` : 'Featured today'}</span>
            {!searched && activeCategory === 'All' && (
              <button className={styles.refreshBtn} onClick={loadRandom}>↻ Refresh</button>
            )}
          </div>
          <div className={styles.grid}>
            {meals.map((meal, i) => (
              <div key={meal.idMeal} style={{ animationDelay: `${i * 0.05}s` }}>
                <RecipeCard
                  meal={meal}
                  onOpen={onOpenModal}
                  isSaved={savedIds.has(meal.idMeal)}
                  onSave={onSave}
                  onRemove={onRemove}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
