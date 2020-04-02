import React, { useEffect, useState } from "react";
import Tabletop from "tabletop";
import styled, { createGlobalStyle } from "@xstyled/styled-components";
import { ThemeProvider, GlobalStyle, TaskBar } from "@react95/core";

import localforage from "localforage";

import {
  Recipes,
  Loading,
  IngredientsModal,
  RecipeModal,
  TaskList
} from "./components";

const SPREADSHEET_ID = "1Uou8R5Bgrdl9M8ykKZeSj5MAl_huugiG3rRIQyMtxvI";

const recipesDB = localforage.createInstance({
  name: " recipes"
});

const ingredientsDB = localforage.createInstance({
  name: "ingredients"
});

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

const Hero = styled.h1`
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

const Style = createGlobalStyle`
  body {
    font-size: 12px;
  }
`;

function App() {
  const [recipes, setRecipes] = useState({});
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [showModal, toggleModal] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [showFilterModal, toggleFilterModal] = useState(false);

  function openModal() {
    toggleModal(true);
  }

  function closeModal() {
    toggleModal(false);
  }

  function getDataFromSpreadsheet() {
    toggleLoading(true);
    Tabletop.init({
      key: SPREADSHEET_ID,
      callback: (_, data) => {
        const allRecipes = Object.values(data.models).map(m => {
          const pIndex = m.elements.findIndex(e =>
            e.Ingredientes.toLowerCase().includes("preparo")
          );

          const ingredients = m.elements.slice(0, pIndex);
          const preparation = m.elements.slice(pIndex + 1, m.elements.length);

          return { name: m.name, ingredients, preparation };
        });

        const allIngredients = Array.from(
          new Set(
            allRecipes
              .map(r => r.ingredients.map(i => i.Ingredientes))
              .flat()
              .sort()
          )
        ).map(i => ({
          name: i,
          checked: false
        }));

        recipesDB.setItem("recipes", allRecipes);
        ingredientsDB.setItem("ingredients", allIngredients);

        setRecipes(allRecipes);
        setAllIngredients(allIngredients);

        setTimeout(() => toggleLoading(false));
      },
      simpleSheet: true
    });
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await recipesDB.getItem("recipes");
      const ingredients = await ingredientsDB.getItem("ingredients");

      if (!recipes) {
        getDataFromSpreadsheet();
      } else {
        setRecipes(recipes);
        setAllIngredients(ingredients);
      }
    }

    fetchData();
  }, []);

  const filter = allIngredients.filter(t => t.checked).map(i => i.name);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Style />
      <Hero>95 Recipes </Hero>

      {Object.keys(recipes).length > 0 && (
        <Recipes
          recipes={recipes}
          openModal={openModal}
          setSelectedRecipe={setSelectedRecipe}
          openFilterModal={toggleFilterModal}
          filter={filter}
          isMobile={isMobile}
        />
      )}

      {showModal && (
        <RecipeModal
          selectedRecipe={selectedRecipe}
          closeModal={closeModal}
          isMobile={isMobile}
        />
      )}

      {showFilterModal && (
        <IngredientsModal
          allIngredients={allIngredients}
          toggleFilterModal={toggleFilterModal}
          setAllIngredients={setAllIngredients}
          isMobile={isMobile}
        />
      )}

      <TaskBar
        list={
          <TaskList
            spreadsheetID={SPREADSHEET_ID}
            onUpdate={() => {
              getDataFromSpreadsheet();
            }}
          />
        }
      />

      {loading && <Loading />}
    </ThemeProvider>
  );
}

export default App;
