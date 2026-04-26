import RecipeCard from './RecipeCard';
import styles from './SavedTab.module.css';

export default function SavedTab({ saved, onSave, onRemove, onOpenModal }) {
  if (saved.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>♡</div>
        <h2 className={styles.emptyTitle}>No saved recipes yet</h2>
        <p className={styles.emptySub}>
          Hit the heart icon on any recipe to save it here for later.
        </p>
      </div>
    );
  }

  const savedIds = new Set(saved.map(m => m.idMeal));

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Saved Recipes</h2>
        <span className={styles.count}>{saved.length} recipe{saved.length !== 1 ? 's' : ''}</span>
      </div>
      <div className={styles.grid}>
        {saved.map((meal, i) => (
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
    </div>
  );
}
