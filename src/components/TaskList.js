import React from "react";
import { List } from "@react95/core";
import styled from "@xstyled/styled-components";

const ListItem = styled(List.Item)`
  ${({ smallIcon }) =>
    smallIcon
      ? `
  i {
    padding: 4px;
    background-origin: content-box;
  }
  `
      : ""}
`;

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  flex-grow: 1;
  height: 30;
  padding-top: 9;
  text-decoration: none;
  color: inherit;
`;

const TaskList = ({ spreadsheetID, onUpdate }) => (
  <List>
    <ListItem icon="file_find" onClick={onUpdate}>
      Update
    </ListItem>
    <ListItem icon="folder_file">
      <Link
        href={`https://docs.google.com/spreadsheets/d/${spreadsheetID}/edit?usp=sharing`}
      >
        Spreadsheet
      </Link>
    </ListItem>
    <List.Divider />
    <ListItem smallIcon icon="file_pen" onClick={onUpdate}>
      <Link href="https://ggdaltoso.dev">My Blog</Link>
    </ListItem>
    <ListItem icon="computer_3">
      <Link href="https://github.com/ggdaltoso/95Recipes">Github</Link>
    </ListItem>
  </List>
);

export default TaskList;
