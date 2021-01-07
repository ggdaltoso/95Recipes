import React from 'react';
import { Icon } from '@react95/core';
import styled from '@xstyled/styled-components';
import { useHistory } from 'react-router-dom';

const StyledRecipe = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;

  width: 25%;
  margin-bottom: 4px;

  text-decoration: none;
  color: inherit;
`;

const Name = styled.span`
  word-break: break-word;
`;

const Recipe = ({ name, slug, ...rest }) => {
  const history = useHistory();

  return (
    <StyledRecipe
      onClick={() => history.push(`${process.env.PUBLIC_URL}/${slug}`)}
      {...rest}
    >
      <Icon name="file_text_32x32_4bit" style={{ marginBottom: 4 }} />
      <Name>{`${name}.txt`}</Name>
    </StyledRecipe>
  );
};

export default Recipe;
