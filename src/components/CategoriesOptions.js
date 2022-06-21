import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategories } from '../services/api';

function CategoriesOptions() {
  const [categories, setCategories] = useState([]);
  const { pathname } = useLocation();

  const MAX_ITEMS_DISPLAY = 5;

  useEffect(() => {
    const categoriesList = async () => {
      const categoriesResult = await getCategories(pathname);
      setCategories(categoriesResult);
    };
    categoriesList();
  }, []);

  return (
    <section>
      { categories.slice(0, MAX_ITEMS_DISPLAY).map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
        >
          {category.strCategory}
        </button>
      ))}
    </section>
  );
}

export default CategoriesOptions;
