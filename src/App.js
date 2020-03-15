import React, { useEffect, useState } from 'react';
import Tabletop from 'tabletop';
import styled from '@xstyled/styled-components';
import {
  ThemeProvider,
  GlobalStyle,
  Frame,
  Modal,
  Button,
  Icon,
  Fieldset,
  Checkbox,
} from '@react95/core/dist';

import localforage from 'localforage';

import { Recipes } from './components';

const recipesDB = localforage.createInstance({
  name: ' recipes',
});

const ingredientsDB = localforage.createInstance({
  name: 'ingredients',
});

const Hero = styled.h1`
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

function formatQtd(ingredient) {
  if (!ingredient.Quantidade && !ingredient.Medida) {
    return '';
  } else if (ingredient.Medida === 'Inteiros') {
    return ingredient.Quantidade;
  } else if (ingredient.Quantidade && ingredient.Medida) {
    return `${ingredient.Quantidade} ${ingredient.Medida}`;
  }
}

function App() {
  const [recipes, setRecipes] = useState({});
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [showModal, toggleModal] = useState(false);
  const [showFilterModal, toggleFilterModal] = useState(true);

  function openModal() {
    toggleModal(true);
  }

  function closeModal() {
    toggleModal(false);
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await recipesDB.getItem('recipes');
      const ingredients = await ingredientsDB.getItem('ingredients');

      if (!recipes) {
        Tabletop.init({
          key: '1Uou8R5Bgrdl9M8ykKZeSj5MAl_huugiG3rRIQyMtxvI',
          callback: (_, data) => {
            const allRecipes = Object.values(data.models).map(m => {
              const pIndex = m.elements.findIndex(e =>
                e.Ingredientes.toLowerCase().includes('preparo'),
              );

              const ingredients = m.elements.slice(0, pIndex);
              const preparation = m.elements.slice(
                pIndex + 1,
                m.elements.length,
              );

              return { name: m.name, ingredients, preparation };
            });

            const allIngredients = Array.from(
              new Set(
                allRecipes
                  .map(r => r.ingredients.map(i => i.Ingredientes))
                  .flat()
                  .sort(),
              ),
            ).map(i => ({
              name: i,
              checked: false,
            }));

            recipesDB.setItem('recipes', allRecipes);
            ingredientsDB.setItem('ingredients', allIngredients);

            setRecipes(allRecipes);
            setAllIngredients(allIngredients);
          },
          simpleSheet: true,
        });
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
      <Hero>95 Recipes </Hero>

      {Object.keys(recipes).length > 0 && (
        <Recipes
          recipes={recipes}
          openModal={openModal}
          setSelectedRecipe={setSelectedRecipe}
          openFilterModal={toggleFilterModal}
          filter={filter}
        />
      )}

      {showModal && (
        <Modal
          width={window.innerWidth}
          height={window.innerHeight - 30}
          style={{ top: 0 }}
          icon="bat_exec"
          title={selectedRecipe.name}
          closeModal={closeModal}
          buttons={[{ value: 'Close', onClick: closeModal }]}
        >
          <Fieldset legend="Ingredients">
            {selectedRecipe.ingredients.map(i => {
              const measure = formatQtd(i);
              return (
                <div key={i.Ingredientes}>
                  <strong>{`${measure} ${i.Ingredientes}`}</strong>
                  {!measure ? ' a gosto' : ''}
                  {i['Observação'] && ` - (${i['Observação'].toLowerCase()})`}
                </div>
              );
            })}
          </Fieldset>

          {selectedRecipe.preparation.length > 0 && (
            <Fieldset legend="How to prepare" style={{ marginTop: 8 }}>
              <ol style={{ margin: 0, padding: '0 0 0 12px' }}>
                {selectedRecipe.preparation.map(i => (
                  <li key={i.Ingredientes}>{i.Ingredientes}</li>
                ))}
              </ol>
            </Fieldset>
          )}
        </Modal>
      )}

      {showFilterModal && (
        <Modal
          width={window.innerWidth}
          height={window.innerHeight - 30}
          style={{ top: 0 }}
          icon="bat_exec"
          title="Filter"
          closeModal={() => toggleFilterModal(false)}
          buttons={[
            { value: 'Filter', onClick: () => toggleFilterModal(false) },
          ]}
        >
          <Fieldset legend="Ingredients">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {allIngredients.map(({ name, checked }) => (
                <div
                  key={name}
                  style={{
                    width: '50%',
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onClick={() => {
                      const changedIngredients = allIngredients.map(i =>
                        i.name === name ? { name, checked: !i.checked } : i,
                      );
                      setAllIngredients(changedIngredients);
                    }}
                  >
                    {name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Fieldset>
        </Modal>
      )}

      <Frame
        style={{ position: ' fixed', bottom: 0, left: 0, right: 0 }}
        width="100%"
        p={2}
      >
        <Button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px 3px',
          }}
        >
          <Icon name="logo" style={{ marginRight: 4 }} width={20} height={20} />
          Start
        </Button>
      </Frame>
    </ThemeProvider>
  );
}

export default App;
