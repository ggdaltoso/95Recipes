import React from 'react';
import styled from '@xstyled/styled-components';
import { Frame, Modal, List } from '@react95/core/dist';

import Recipe from './Recipe';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const Recipes = ({ recipes, setSelectedRecipe, openModal }) => (
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
            <List.Item>Filter</List.Item>
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
        {Object.values(recipes).map(recipe => (
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
  </Modal>
);

export default Recipes;
