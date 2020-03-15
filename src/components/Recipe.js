import React from 'react';
import { Icon } from '@react95/core/dist';
import styled from '@xstyled/styled-components';

const StyledRecipe = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;

  width: 25%;
  margin-bottom: 4px;
`;

const Name = styled.span`
  word-break: break-word;
`;

const Recipe = ({ name, ...rest }) => (
  <StyledRecipe {...rest}>
    <Icon name="file_text" style={{ marginBottom: 4 }} />
    <Name>{`${name}.txt`}</Name>
  </StyledRecipe>
);

export default Recipe;
