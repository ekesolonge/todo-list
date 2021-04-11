import styled from "styled-components";

export const ListBody = styled.div`
  padding: 1rem;
`;

export const ListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListButton = styled.button`
  outline: none;
  border: none;
  background: none;
  color: ${props => (props.delete ? "red" : "black")};
`;
