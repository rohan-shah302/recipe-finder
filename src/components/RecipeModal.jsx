import { useEffect, useState } from 'react';
import { getMealById, extractIngredients } from '../api';
import styles from './RecipeModal.module.css';

export default function RecipeModal({ mealId, onClose, isSaved, onSave, onRemove }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    setLoading(true);
    getMealById(mealId).then(data => {
      setMeal(data);
      setLoading(false);
    });
  }, [mealId]);

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const ingredients = meal ? extractIngredients(meal) : [];

  const handleSave = () => {
    if (!meal) return;
    isSaved ? onRemove(meal.idMeal) : onSave(meal);
  };

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
          </div>
        ) : meal ? (
          <>
            <div className={styles.hero}>
              <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.heroImg} />
              <div className={styles.heroOverlay} />
              <div className={styles.heroContent}>
                {meal.strCategory && (
                  <span className={styles.category}>{meal.strCategory}</span>
                )}
                <h2 className={styles.mealTitle}>{meal.strMeal}</h2>
                {meal.strArea && (
                  <p className={styles.area}>{meal.strArea} Cuisine</p>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <button className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`} onClick={handleSave}>
                {isSaved ? '♥ Saved' : '♡ Save Recipe'}
              </button>
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ytBtn}
                >
                  ▶ Watch Video
                </a>
              )}
            </div>

            <div className={styles.tabs}>
              {['ingredients', 'instructions'].map(t => (
                <button
                  key={t}
                  className={`${styles.tab} ${activeTab === t ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.content}>
              {activeTab === 'ingredients' ? (
                <ul className={styles.ingredientList}>
                  {ingredients.map((ing, i) => (
                    <li key={i} className={styles.ingredient}>
                      <span className={styles.ingredientName}>{ing.name}</span>
                      <span className={styles.ingredientMeasure}>{ing.measure}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.instructions}>
                  {meal.strInstructions
                    ?.split(/\r?\n/)
                    .filter(p => p.trim())
                    .map((para, i) => (
                      <p key={i} className={styles.instrPara}>{para}</p>
                    ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.errorWrap}>
            <p>Could not load recipe.</p>
          </div>
        )}
      </div>
    </div>
  );
}
