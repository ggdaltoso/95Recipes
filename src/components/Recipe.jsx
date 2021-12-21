import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Fieldset, Frame, Modal } from '@react95/core';
import { TASKBAR_HEIGHT, IconRenderer } from '../utils';

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

async function share(url) {
  await navigator.share({ url });
}

const Measure = ({ unit, value }) => (
  <>
    <Value>{value}</Value>
    <span>{unit}</span>
  </>
);

const Recipe = ({
  ingredients = [],
  preparation = [],
  images = [],
  frontmatter,
}) => {
  const ref = useRef(null);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // I'm not proud of this
    ref.current.parentElement.style.overflow = 'auto';
  }, [ref.current]);

  // ensure this code run only in browser
  useEffect(() => {
    const {
      location: { href: url },
    } = document;

    if (navigator.canShare({ url })) {
      setButtons([{ value: 'Compartilhar', onClick: () => share(url) }]);
    }
  }, [setButtons]);

  const { title, icon } = frontmatter;

  return (
    <Modal
      title={title}
      icon={<IconRenderer {...icon} />}
      style={{
        top: 0,
        height: `calc(100% - ${TASKBAR_HEIGHT}px)`,
        width: '100%',
      }}
      closeModal={() => navigate('/')}
      buttons={buttons}
    >
      <RecipeWrapper boxShadow="none" ref={ref}>
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
    </Modal>
  );
};

export default Recipe;
