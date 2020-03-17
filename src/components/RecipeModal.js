import React from 'react';
import { Modal, TextArea } from '@react95/core/dist';

function formatQtd(ingredient) {
  if (!ingredient.Quantidade && !ingredient.Medida) {
    return '';
  } else if (ingredient.Medida === 'Inteiros') {
    return ingredient.Quantidade;
  } else if (ingredient.Quantidade && ingredient.Medida) {
    return `${ingredient.Quantidade} ${ingredient.Medida}`;
  }
}

async function share({ title, text }) {
  await navigator.share({
    title,
    text,
    url: 'https://ggdaltoso.dev/95Recipes/',
  });
}

const RecipeModal = ({ selectedRecipe, closeModal }) => {
  const text = `Ingredients:

${selectedRecipe.ingredients
  .map(i => {
    const measure = formatQtd(i);
    return `${measure} ${i.Ingredientes} ${!measure ? ' a gosto' : ''} ${i[
      'Observação'
    ] && ` - (${i['Observação'].toLowerCase()})`}`;
  })
  .join('\n')}


How to prepare:

${selectedRecipe.preparation.length > 0 &&
  selectedRecipe.preparation
    .map((i, index) => `${index + 1}. ${i.Ingredientes}`)
    .join('\n')}
  `;

  let buttons = [{ value: 'Close', onClick: closeModal }];

  if (share in navigator) {
    buttons.push({
      value: 'Share',
      onClick: () => share({ title: selectedRecipe.name, text }),
    });
  }

  return (
    <Modal
      width={window.innerWidth}
      height={window.innerHeight - 30}
      style={{ top: 0 }}
      icon="bat_exec"
      title={selectedRecipe.name}
      closeModal={closeModal}
      buttons={buttons}
    >
      <TextArea legend="Ingredients" value={text} rows={30} readOnly />
    </Modal>
  );
};

export default RecipeModal;
