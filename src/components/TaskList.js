import React from 'react';
import { List } from '@react95/core';
import styled from '@xstyled/styled-components';
import { Computer3, FileFind, FilePen, FolderFile } from '@react95/icons';

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

const TaskList = ({ spreadsheetID, onUpdate }) => (
  <List>
    <List.Item icon={<FileFind variant="32x32_4" />} onClick={onUpdate}>
      Update
    </List.Item>
    <List.Item icon={<FolderFile variant="32x32_4" />}>
      <Link
        href={`https://docs.google.com/spreadsheets/d/${spreadsheetID}/edit?usp=sharing`}
      >
        Spreadsheet
      </Link>
    </List.Item>
    <List.Divider />
    <List.Item
      icon={<FilePen variant="32x32_4" style={{ padding: 4 }} />}
      onClick={onUpdate}
    >
      <Link href="https://ggdaltoso.dev">My Blog</Link>
    </List.Item>
    <List.Item icon={<Computer3 variant="32x32_4" />}>
      <Link href="https://github.com/ggdaltoso/95Recipes">Github</Link>
    </List.Item>
  </List>
);

export default TaskList;
