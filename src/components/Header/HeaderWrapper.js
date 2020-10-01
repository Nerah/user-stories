import styled from "styled-components";

export const HeaderWrapper = styled.div.attrs(props => ({
  style: {
    marginTop: props.active ? 0 : "-25vh"
  }
}))`
  background-color: #282c34;
  height: 25vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
  transition: margin 0.3s;
  user-select: none;
`;
