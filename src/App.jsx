import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import SearchTab from './components/SearchTab';
import SavedTab from './components/SavedTab';
import ShoppingTab from './components/ShoppingTab';
import RecipeModal from './components/RecipeModal';
import styles from './App.module.css';


const TABS = [
  { id: 'search', label: 'Discover', icon: '⊕' },
  { id: 'saved',  label: 'Saved',    icon: '♥' },
  { id: 'shop',   label: 'Shopping', icon: '⊡' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [saved, setSaved] = useLocalStorage('rf_saved', []);
  const [modalId, setModalId] = useState(null);

  const handleSave = (meal) => {
    setSaved(prev => prev.find(m => m.idMeal === meal.idMeal) ? prev : [meal, ...prev]);
  };

  const handleRemove = (id) => {
    setSaved(prev => prev.filter(m => m.idMeal !== id));
  };

  const savedIds = new Set(saved.map(m => m.idMeal));

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>◈</span>
          <span className={styles.logoText}>What's Cooking?</span>
        </div>
        <nav className={styles.nav}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navBtn} ${activeTab === tab.id ? styles.navActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navLabel}>{tab.label}</span>
              {tab.id === 'saved' && saved.length > 0 && (
                <span className={styles.badge}>{saved.length}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        {activeTab === 'search' && (
          <SearchTab
            saved={saved}
            onSave={handleSave}
            onRemove={handleRemove}
            onOpenModal={setModalId}
          />
        )}
        {activeTab === 'saved' && (
          <SavedTab
            saved={saved}
            onSave={handleSave}
            onRemove={handleRemove}
            onOpenModal={setModalId}
          />
        )}
        {activeTab === 'shop' && (
          <ShoppingTab saved={saved} />
        )}
      </main>

      {modalId && (
        <RecipeModal
          mealId={modalId}
          onClose={() => setModalId(null)}
          isSaved={savedIds.has(modalId)}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
