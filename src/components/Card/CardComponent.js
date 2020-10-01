import styled from "styled-components";

export const CardComponent = styled.div.attrs(props => ({
  style: {
    left: props.x,
    top: props.y,
    boxShadow: props.dragState && "-7px 7px 23px 0px rgba(0,0,0,0.75)",
    width: props.size,
    height: props.size
  }
}))`
  position: absolute;
  padding: 3px;
  background-color: #e8ad0c;
  border: 1px solid black;
  transition: transform 0.1s;
  transform: scale(1.2);
  touch-action: none;
  
  /* hide too long text */
  overflow: hidden;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;
