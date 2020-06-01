import React, { useEffect, useState } from 'react';
import Tabletop from 'tabletop';
import { useSelector } from 'react-redux';
import { Alert } from '@react95/core';
import localforage from 'localforage';

import RecipeContext from './RecipeContext';
import Loading from './Loading';

const SPREADSHEET_ID = '1Uou8R5Bgrdl9M8ykKZeSj5MAl_huugiG3rRIQyMtxvI';

const recipesDB = localforage.createInstance({
  name: ' recipes',
});

const ingredientsDB = localforage.createInstance({
  name: 'ingredients',
});

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState({});
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [loading, toggleLoading] = useState(false);
  const [alertData, setAlertData] = useState(undefined);

  function getDataFromSpreadsheet() {
    toggleLoading(true);
    Tabletop.init({
      key: SPREADSHEET_ID,
      callback: (_, data) => {
        const allRecipes = Object.values(data.models).map((m) => {
          const pIndex = m.elements.findIndex((e) =>
            e.Ingredientes.toLowerCase().includes('preparo'),
          );
          const imgIndex = m.elements.findIndex((e) =>
            e.Ingredientes.toLowerCase().includes('imagens'),
          );

          const hasImgs = imgIndex !== -1;

          const ingredients = m.elements.slice(0, pIndex);
          const preparation = m.elements
            .slice(pIndex + 1, hasImgs ? imgIndex : m.elements.length)
            .map((i) => i.Ingredientes);

          const images = hasImgs
            ? m.elements
                .slice(imgIndex + 1, m.elements.length)
                .map((i) => i.Ingredientes)
            : [];

          return { name: m.name, ingredients, preparation, images };
        });

        const allIngredients = Array.from(
          new Set(
            allRecipes
              .map((r) => r.ingredients.map((i) => i.Ingredientes))
              .flat()
              .sort(),
          ),
        ).map((i) => ({
          name: i,
          checked: false,
        }));

        recipesDB.setItem('recipes', allRecipes);
        ingredientsDB.setItem('ingredients', allIngredients);

        setRecipes(allRecipes);
        setAllIngredients(allIngredients);

        setTimeout(() => toggleLoading(false));
      },
      simpleSheet: true,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await recipesDB.getItem('recipes');
      const ingredients = await ingredientsDB.getItem('ingredients');

      if (!recipes) {
        getDataFromSpreadsheet();
      } else {
        setRecipes(recipes);
        setAllIngredients(ingredients);
      }
    }

    fetchData();
  }, []);

  const isServiceWorkerInitialized = useSelector(
    (state) => state.serviceWorkerInitialized,
  );
  const isServiceWorkerUpdated = useSelector(
    (state) => state.serviceWorkerUpdated,
  );
  const serviceWorkerRegistration = useSelector(
    (state) => state.serviceWorkerRegistration,
  );

  useEffect(() => {
    if (isServiceWorkerInitialized) {
      setAlertData({
        message: '95 Recipes has been saved for offline use.',
        type: 'info',
        title: 'Offile usage',
        closeAlert: () => setAlertData(undefined),
      });
    }
  }, [isServiceWorkerInitialized]);

  useEffect(() => {
    const updateServiceWorker = () => {
      const registrationWaiting = serviceWorkerRegistration.waiting;

      if (registrationWaiting) {
        registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

        registrationWaiting.addEventListener('statechange', (e) => {
          if (e.target.state === 'activated') {
            window.location.reload();
          }
        });
      }
    };

    if (isServiceWorkerUpdated) {
      setAlertData({
        message: 'New version available! Click here to update',
        type: 'warning',
        title: 'Update',
        closeAlert: () => updateServiceWorker(),
      });
    }
  }, [isServiceWorkerUpdated, serviceWorkerRegistration.waiting]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        selectedRecipe,
        setSelectedRecipe,
        allIngredients,
        sheetId: SPREADSHEET_ID,
        updateRecipes: getDataFromSpreadsheet,
      }}
    >
      {children}

      {loading && <Loading />}

      {alertData && <Alert style={{ zIndex: 2 }} {...alertData} />}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
