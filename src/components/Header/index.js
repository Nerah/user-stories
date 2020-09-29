import React, {useState} from 'react';
import styled from 'styled-components';

const Hamburger = styled.span.attrs(props => ({
  style: {
    color: props.active ? '#fff' : '#000'
  }
}))`
  position: absolute;
  left: 30px;
  top: 30px;
  font-size: 3em;
  cursor: pointer;
  z-index: 2147483647; /* max possible value */
  
  &:hover {
    color: #ffcf4d !important;
  }
`;

const HeaderWrapper = styled.div.attrs(props => ({
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
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
  transition: margin 0.3s;
`;

export default function Header({ activation }) {
  const [active, setActive] = useState(true);

  const changeActiveState = () => {
    setActive(!active);
    activation(active);
  }

  return (
      <>
        <Hamburger role="img" aria-label="hamburger" active={active} onClick={changeActiveState}>&#9776;</Hamburger>
        <HeaderWrapper active={active}>
          <h1>User Stories</h1>
        </HeaderWrapper>
      </>
  );
}
