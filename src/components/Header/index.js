import React, {useState} from 'react';
import styled from 'styled-components';
import ConfigModal from "../ConfigModal";

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
  user-select: none;
  
  &:hover {
    color: #ffcf4d !important;
  }
`;

const Configuration = styled.span.attrs(props => ({
  style: {
    color: props.active ? '#fff' : '#000'
  }
}))`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 3em;
  cursor: pointer;
  z-index: 2147483647; /* max possible value */
  user-select: none;
  
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
  user-select: none;
`;

export default function Header({ activation, listId, setListId }) {
  const [active, setActive] = useState(true);
  const [configState, setConfigState] = useState(false);

  const changeActiveState = () => {
    setActive(!active);
    activation(active);
  }

  const toggleConfig = () => {
    setConfigState(!configState);
  }

  const hideConfig = () => {
    setConfigState(false);
  }

  const handleChange = (e) => {
    e.persist();
    setListId(e.target.value);
  }

  return (
      <>
        <Hamburger role="img" aria-label="hamburger" active={active} onClick={changeActiveState}>&#9776;</Hamburger>
        <Configuration role="img" aria-label="config" active={active} onClick={toggleConfig}>&#9881;</Configuration>
        <HeaderWrapper active={active}>
          <h1>User Stories</h1>
        </HeaderWrapper>

        <ConfigModal show={configState} handleClose={hideConfig}>
          <label htmlFor="listId">Identifiant de la liste à synchroniser</label>
          <input type="text" id="listId" value={listId} onChange={handleChange}/>
        </ConfigModal>
      </>
  );
}
