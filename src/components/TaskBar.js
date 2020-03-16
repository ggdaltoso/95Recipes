import React from 'react';
import { List } from '@react95/core/dist';
import styled from '@xstyled/styled-components';

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  flex-grow: 1;
  height: 30;
  padding-top: 9;
  text-decoration: none;
  color: inherit;
`;

const TaskBar = ({ spreadsheetID }) => {
  return (
    <List style={{ position: 'absolute', bottom: 28 }}>
      <List.Item icon="file_find">Update</List.Item>
      <List.Item icon="folder_file">
        <Link
          href={`https://docs.google.com/spreadsheets/d/${spreadsheetID}/edit?usp=sharing`}
        >
          Spreadsheet
        </Link>
      </List.Item>
      <List.Divider />
      <List.Item icon="computer_3">
        <Link href="https://github.com/ggdaltoso/95Recipes">Github</Link>
      </List.Item>
    </List>
  );
};

export default TaskBar;
