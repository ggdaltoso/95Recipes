import React, { useEffect, useState } from 'react';
import styled from '@xstyled/styled-components';
import { Frame, Fieldset, Modal } from '@react95/core';
import { useParams, useHistory } from 'react-router-dom';

import { useRecipes } from './RecipeContext';

function formatQtd(ingredient) {
  if (!ingredient.Quantidade && !ingredient.Medida) {
    return '';
  } else if (ingredient.Medida === 'Inteiros') {
    return ingredient.Quantidade;
  } else if (ingredient.Quantidade && ingredient.Medida) {
    return `${ingredient.Quantidade} ${ingredient.Medida}`;
  }
}

async function share({ title, slug }) {
  await navigator.share({
    title: '95Recipes',
    text: `Confira a receita de ${title}\n`,
    url: `https://ggdaltoso.dev/95Recipes/${slug}`,
  });
}

const GridImage = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${({ driveId }) => `
    background-image: url('https://drive.google.com/uc?id=${driveId}');
  `}
`;

const ImgGrid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 1fr 1fr 1fr;

  ${GridImage}::before {
    content: '';
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: top;
  }
`;

const RecipeWrapper = styled.div`
  overflow-y: auto;

  p,
  ol {
    margin-top: 6;
  }

  p,
  li:not(:last-child) {
    margin-bottom: 6;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const ingredientsTitle = 'Ingredientes';
const howToTitle = 'Modo de preparo';

const RecipeModal = ({ isMobile }) => {
  const { recipeSlug } = useParams();
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const { getRecipeFromSlug, recipes } = useRecipes();
  const history = useHistory();

  useEffect(() => {
    if (recipes.length > 0) {
      const recipe = getRecipeFromSlug(recipeSlug);
      setSelectedRecipe(recipe);
    }
  }, [recipeSlug, recipes, getRecipeFromSlug]);

  const boxProps = {
    width: isMobile ? window.innerWidth : undefined,
    height: isMobile ? window.innerHeight - 30 : 'auto',
  };

  function shareClick() {
    share({ title: selectedRecipe.name, slug: selectedRecipe.slug });
  }

  function closeModal() {
    return history.push('/');
  }

  return recipeSlug && Object.keys(selectedRecipe).length > 0 ? (
    <Modal
      {...boxProps}
      style={{ top: 0 }}
      icon="file_text"
      title={selectedRecipe.name}
      closeModal={closeModal}
      buttons={[
        ...(navigator.share !== undefined
          ? [
              {
                value: 'Share',
                onClick: shareClick,
              },
            ]
          : []),
        { value: 'Close', onClick: closeModal },
      ]}
    >
      <RecipeWrapper
        style={{
          height: boxProps.height - 70,
        }}
      >
        <Fieldset legend={ingredientsTitle}>
          {selectedRecipe.ingredients.map((i) => {
            const measure = formatQtd(i);
            return (
              <p key={i.Ingredientes}>
                <span>{measure.toLowerCase()}</span>{' '}
                <span>{i.Ingredientes}</span>
                {!measure ? ' a gosto' : ''}
                {i['Observação'] && (
                  <small> - ({i['Observação'].toLowerCase()})</small>
                )}
              </p>
            );
          })}
        </Fieldset>

        {selectedRecipe.preparation.length > 0 && (
          <Fieldset
            legend={howToTitle}
            style={{
              marginTop: 4,
            }}
          >
            <ol
              style={{
                marginBottom: 0,
                paddingLeft: 18,
              }}
            >
              {selectedRecipe.preparation.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Fieldset>
        )}
        {selectedRecipe.images.length > 0 && (
          <Frame boxShadow="in" p={1} my={8} mx={2} overflowY="auto">
            <ImgGrid>
              {selectedRecipe.images.map((i) => (
                <GridImage driveId={i} key={i} />
              ))}
            </ImgGrid>
          </Frame>
        )}
      </RecipeWrapper>
    </Modal>
  ) : null;
};

export default RecipeModal;
