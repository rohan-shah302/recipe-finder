import { useState } from 'react';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ meal, onOpen, isSaved, onSave, onRemove }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    isSaved ? onRemove(meal.idMeal) : onSave(meal);
  };

  return (
    <div className={styles.card} onClick={() => onOpen(meal.idMeal)}>
      <div className={styles.imageWrap}>
        {!imgLoaded && <div className={`${styles.imgSkeleton} skeleton`} />}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.image}
          style={{ opacity: imgLoaded ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
        />
        <div className={styles.overlay} />
        <button
          className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
          onClick={handleSaveClick}
          title={isSaved ? 'Remove from saved' : 'Save recipe'}
        >
          {isSaved ? '♥' : '♡'}
        </button>
        {meal.strCategory && (
          <span className={styles.categoryBadge}>{meal.strCategory}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{meal.strMeal}</h3>
        {meal.strArea && <p className={styles.area}>{meal.strArea} cuisine</p>}
      </div>
    </div>
  );
}
