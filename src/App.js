import React, { useEffect, useState } from 'react';
import Tabletop from 'tabletop';
import styled from '@xstyled/styled-components';
import {
  ThemeProvider,
  GlobalStyle,
  Frame,
  Modal,
  Button,
} from '@react95/core/dist';

import localforage from 'localforage';
import Icon from '@react95/core/dist/Icon';

localforage.config({
  driver: localforage.WEBSQL,
  name: '95Recipes.db',
  version: 1.0,
  size: 4980736,
  storeName: 'recipes',
  description: 'Contains all recipes information',
});

const Hero = styled.h1`
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

const Recipes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 0 20px;
`;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [showModal, toggleModal] = useState(false);

  function openModal() {
    toggleModal(true);
  }

  function closeModal() {
    toggleModal(false);
  }

  useEffect(() => {
    async function fetchData() {
      const recipes = await localforage.getItem('recipes');

      if (!recipes) {
        Tabletop.init({
          key: '1Uou8R5Bgrdl9M8ykKZeSj5MAl_huugiG3rRIQyMtxvI',
          callback: (_, { models }) => {
            Object.values(models).forEach(m => {
              delete m.tabletop;
              delete m.raw;

              const pIndex = m.elements.findIndex(e =>
                e.Ingredientes.toLowerCase().includes('preparo'),
              );

              m.ingredients = m.elements.slice(0, pIndex);
              m.preparation = m.elements.slice(pIndex + 1, m.elements.length);
            });

            console.log(models);

            localforage.setItem('recipes', models);
            setRecipes(models);
          },
          simpleSheet: true,
        });
      } else {
        console.log('Tinha no localStorage', recipes);
        setRecipes(recipes);
      }
    }

    fetchData();
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Hero>95 Receitas</Hero>

      <Recipes>
        {Object.values(recipes).map(({ name }) => (
          <Frame
            key={name}
            onClick={() => {
              setSelectedRecipe(name);
              openModal();
            }}
          >
            {name}
          </Frame>
        ))}
      </Recipes>

      {showModal && (
        <Modal
          width={window.innerWidth}
          height={window.innerHeight - 30}
          style={{ top: 0 }}
          icon="computer"
          title={selectedRecipe}
          closeModal={closeModal}
          buttons={[{ value: 'Close', onClick: closeModal }]}
        >
          {selectedRecipe}
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
