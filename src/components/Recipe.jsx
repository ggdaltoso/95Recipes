import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Fieldset, Frame } from '@react95/core';

const RecipeWrapper = styled(Frame)`
  overflow-y: auto;

  p,
  ol {
    margin-top: 6px;
  }

  p,
  li:not(:last-child) {
    margin-bottom: 6px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const Value = styled(Frame).attrs({
  as: 'span',
  boxShadow: 'none',
  width: 25,
  display: 'inline-block',
  marginRight: 4,
})`
  text-align: right;
`;

const Measure = ({ unit, value }) => (
  <>
    <Value>{value}</Value>
    <span>{unit}</span>
  </>
);

const Recipe = ({ ingredients = [], preparation = [] }) => {
  const ref = useRef(null);
  console.log(ingredients);

  useEffect(() => {
    // I'm not proud of this
    ref.current.parentElement.style.overflow = 'auto';
  }, [ref.current]);

  return (
    <RecipeWrapper ref={ref} boxShadow="none">
      {ingredients.length > 0 && (
        <Fieldset legend="Ingredientes">
          {ingredients.map(({ measure, ingredient, observation }) => (
            <p key={ingredient}>
              {measure && <Measure {...measure} />}
              <span> {ingredient}</span>
              {observation && <small> - ({observation})</small>}
            </p>
          ))}
        </Fieldset>
      )}

      <br />

      {preparation.length > 0 && (
        <Fieldset legend="Modo de preparo">
          <ol
            style={{
              marginBottom: 0,
              paddingLeft: 18,
            }}
          >
            {preparation.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Fieldset>
      )}
    </RecipeWrapper>
  );
};

export default Recipe;
