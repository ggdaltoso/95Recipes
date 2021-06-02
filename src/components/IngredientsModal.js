import React from 'react';
import { Modal, Fieldset, Checkbox } from '@react95/core';
import { BatExec } from '@react95/icons';

const IngredientsModal = ({
  allIngredients,
  toggleFilterModal,
  setAllIngredients,
  isMobile,
}) => {
  const boxProps = {
    width: isMobile ? window.innerWidth : 500,
    height: window.innerHeight - (isMobile ? 30 : 130),
  };

  return (
    <Modal
      {...boxProps}
      style={{ top: 0 }}
      icon={<BatExec />}
      title="Filter"
      closeModal={() => toggleFilterModal(false)}
      buttons={[{ value: 'Filter', onClick: () => toggleFilterModal(false) }]}
    >
      <Fieldset
        legend="Ingredients"
        style={{
          height: 1,
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
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
                onChange={() => {
                  const changedIngredients = allIngredients.map((i) =>
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
  );
};

export default IngredientsModal;
