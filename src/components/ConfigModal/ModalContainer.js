import styled from "styled-components";

export const ModalContainer = styled.div.attrs(props => ({
  style: {
    display: props.show ? 'block' : 'none'
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2147483647; /* max possible value */
`;
