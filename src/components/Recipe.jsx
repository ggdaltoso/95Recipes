import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Fieldset, Frame } from '@react95/core';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImgGrid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 1fr 1fr 1fr;

  img {
    max-width: 100%;
    min-height: 100%;
    display: block;
    object-position: center;
    object-fit: cover;
  }
`;

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
  width: 26,
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

const Recipe = ({ ingredients = [], preparation = [], images = [] }) => {
  const ref = useRef(null);

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
              <Measure {...measure} />
              <span> {ingredient}</span>
              {observation && <small> - ({observation})</small>}
              {!measure && <small> - (a gosto)</small>}
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
              paddingLeft: 28,
            }}
          >
            {preparation.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Fieldset>
      )}

      {images.length > 0 && (
        <Frame boxShadow="in" p={1} my={8} mx={2}>
          <ImgGrid>
            {images.map((i, index) => (
              <Zoom key={i} zoomMargin={10}>
                <img src={i} alt={`Zoomed image ${index}`} width="100%" />
              </Zoom>
            ))}
          </ImgGrid>
        </Frame>
      )}
    </RecipeWrapper>
  );
};

export default Recipe;
