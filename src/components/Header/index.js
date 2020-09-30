import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ConfigModal from "../ConfigModal";
import {API} from "../../api";

const InteractiveIcon = styled.span.attrs(props => ({
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
const Hamburger = styled(InteractiveIcon)`
  left: 0.3em;
  top: 0.3em;
`;
const Configuration = styled(InteractiveIcon)`
  right: 0.3em;
  top: 0.3em;
`;
const SynchronizeAPI = styled(InteractiveIcon)`
  right: calc(0.3em + 1em);
  top: 0.3em;
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
  justify-content: flex-end;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
  transition: margin 0.3s;
  user-select: none;
`;

export default function Header({ activation,
                                 user = {key: "", token: ""},
                                 board = "", list = "",
                                 itsRainingCards}) {
  const [active, setActive] = useState(true);
  const [configState, setConfigState] = useState(false);
  const [config, setConfig] = useState({
    key: user.key,
    token: user.token,
    board: board,
    list: list
  });
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const APIRequestUserBoards = () => {
      // error
      if (config.key === "" || config.token === "") {
        setBoards([]);
      } else {
        API
            .getUserBoards(config.key, config.token)
            .then(data => setBoards(data))
            .catch(err => {
              setBoards([]);
              console.error(err);
            });
      }
    }

    const APIRequestBoardLists = () => {
      // error
      if (config.key === "" || config.token === "" || config.board === "") {
        setLists([]);
      } else {
        API
            .getBoardLists(config.board, config.key, config.token)
            .then(data => setLists(data))
            .catch(err => {
              setLists([]);
              console.error(err);
            });
      }
    }

    const APIRequestListCards = () => {
      // error
      if (config.key === "" || config.token === "" || config.board === "" || config.list === "") {
        setLists([]);
      } else {
        API
            .getListCards(config.list, config.key, config.token)
            .then(data => setCards(data))
            .catch(err => {
              setCards([]);
              console.error(err);
            });
      }
    }

    const callAPI = async() => {
      await APIRequestUserBoards();
      await APIRequestBoardLists();
      await APIRequestListCards();
    }

    callAPI().then(() => console.log("callAPI : over"));
  }, [config]);

  const changeActiveState = () => {
    setActive(!active);
    activation(active);
  }

  const toggleConfig = () => {
    setConfigState(!configState);
  }

  const synchronizeAPI = () => {
    itsRainingCards(cards);
  }

  const hideConfig = () => {
    setConfigState(false);
  }

  const handleChange = async (e) => {
    e.persist();
    const idTarget = e.target.id;
    if (idTarget === "key" || idTarget === "token") {
      setConfig(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value,
        board: "",
        list: ""
      }));
    } else if (idTarget === "board") {
      setConfig(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value,
        list: ""
      }));
    } else if (idTarget === "list") {
      setConfig(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
      }));
    }
  }

  return (
      <>
        <Hamburger role="img" aria-label="hamburger" active={active} onClick={changeActiveState}>&#9776;</Hamburger>
        <Configuration role="img" aria-label="config" active={active} onClick={toggleConfig}>&#9881;</Configuration>
        <SynchronizeAPI role="img" aria-label="synchronizeAPI" active={active} onClick={synchronizeAPI}>&#128472;</SynchronizeAPI>
        <HeaderWrapper active={active}>
          <h1>User Stories</h1>
        </HeaderWrapper>

        <ConfigModal show={configState} handleClose={hideConfig}>
          <label htmlFor="key">User key</label>
          <input type="text" id="key" value={config.key} onChange={handleChange}/>
          <label htmlFor="token">User token</label>
          <input type="text" id="token" value={config.token} onChange={handleChange}/>

          {
            boards.length <= 0 ?
                <div>
                  It seems your key or your token is not working, or you don't have any board in your account. <br/>
                  You can get your key and your token by following the steps once connected here: <br/>
                  <a href="https://trello.com/app-key">https://trello.com/app-key</a>
                </div>
                :
                <>
                  <label htmlFor="board">Select the board you want</label>
                  <select id="board" onChange={handleChange} value={config.board}>
                    <option key="" value=""/>
                    {boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
                  </select>
                  {
                    lists.length > 0 &&
                    <>
                      <label htmlFor="list">Select the list you want</label>
                      <select id="list" onChange={handleChange} value={config.list}>
                        <option key="" value=""/>
                        {lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                      </select>
                      {
                        config.list !== "" &&
                        <div>
                          This list contains {cards.length} card{cards.length > 1 && 's'}.<br/>
                          If you want to refresh the view, click on the synchronous icon,
                          right next to the configuration button.
                        </div>
                      }
                    </>
                  }
                </>
          }
        </ConfigModal>
      </>
  );
}
