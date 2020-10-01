import styled from "styled-components";

export const InteractiveIcon = styled.span.attrs(props => ({
  role: "img",
  style: {
    color: props.active ? '#fff' : '#000'
  }
}))`
  position: absolute;
  font-size: 3em;
  cursor: pointer;
  z-index: 2147483647; /* max possible value */
  user-select: none;
  
  &:hover {
    color: #ffcf4d !important;
  }
`;
