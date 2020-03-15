import React from 'react';
import styled from '@xstyled/styled-components';
import { Frame, Modal, List } from '@react95/core/dist';

import Recipe from './Recipe';

const Wrapper = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
`;

const FilterResult = styled.span`
  margin-bottom: -10px;
  margin-top: 5px;
`;

const Recipes = ({
  recipes,
  setSelectedRecipe,
  openModal,
  openFilterModal,
  filter,
}) => {
  const filteredRecipes =
    filter.length > 0
      ? recipes.filter(r =>
          r.ingredients.some(i => filter.includes(i.Ingredientes)),
        )
      : recipes;

  return (
    <Modal
      title={`${Object.keys(recipes).length} recipes`}
      icon="windows_explorer"
      defaultPosition={{ x: 0, y: 50 }}
      style={{
        marginLeft: 20,
        height: 'auto',
      }}
      width={window.innerWidth - 40}
      menu={[
        {
          name: 'File',
          list: (
            <List>
              <List.Item onClick={() => openFilterModal(true)}>
                Filter
              </List.Item>
            </List>
          ),
        },
      ]}
    >
      <Frame
        bg="white"
        boxShadow="in"
        height="100%"
        style={{
          overflowY: 'auto',
          maxHeight: '60vh',
        }}
      >
        <Wrapper>
          {Object.values(filteredRecipes).map(recipe => (
            <Recipe
              key={recipe.name}
              onClick={() => {
                setSelectedRecipe(recipe);
                openModal();
              }}
              name={recipe.name}
            />
          ))}
        </Wrapper>
      </Frame>
      {filter.length > 0 && (
        <FilterResult>Filter: {filter.join(', ')}</FilterResult>
      )}
    </Modal>
  );
};

export default Recipes;
