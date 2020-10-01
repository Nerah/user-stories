import React, {useEffect, useState} from 'react';
import ConfigModal from "../ConfigModal";
import {API} from "../../api";
import {Configuration, Hamburger, SynchronizeAPI} from "../Icons";
import {HeaderWrapper} from "./HeaderWrapper";
import ListCardIndication from "./ListCardIndication";
import ListSelection from "./ListSelection";
import BoardSelection from "./BoardSelection";
import UserKeysInformation from "./UserKeysInformation";
import UserKeysInputs from "./UserKeysInputs";

export default function Header({ activation, config, setConfig, itsRainingCards, setSynchronized}) {
  const [active, setActive] = useState(true);
  const [readyToSynchronize, setReadyToSynchronize] = useState(false);
  const [configState, setConfigState] = useState(false);
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
            .catch(() => setBoards([]));
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
            .catch(() => setLists([]));
      }
    }

    const APIRequestListCards = () => {
      // error
      if (config.key === "" || config.token === "" || config.board === "" || config.list === "") {
        setLists([]);
      } else {
        API
            .getListCards(config.list, config.key, config.token)
            .then(data => {
              setCards(data);
              setReadyToSynchronize(true);
            })
            .catch(() => setCards([]));
      }
    }

    const callAPI = async() => {
      setSynchronized(false);
      setReadyToSynchronize(false);
      await APIRequestUserBoards();
      await APIRequestBoardLists();
      await APIRequestListCards();
    }

    callAPI().then(() => null);
  }, [config, setReadyToSynchronize, setSynchronized]);

  const changeActiveState = () => {
    setActive(!active);
    activation(active);
  }

  const toggleConfig = () => {
    setConfigState(!configState);
  }

  const synchronizeAPI = () => {
    if (readyToSynchronize) {
      itsRainingCards(cards);
      setSynchronized(true);
      setReadyToSynchronize(false);
    }

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
        <Hamburger active={active} setActive={changeActiveState}/>
        <Configuration active={active} toggleConfig={toggleConfig}/>
        <SynchronizeAPI active={active} readyToSynchronize={readyToSynchronize} synchronizeAPI={synchronizeAPI}/>
        <HeaderWrapper active={active}>
          <h1>User Stories</h1>
        </HeaderWrapper>

        <ConfigModal show={configState} handleClose={hideConfig}>
          <UserKeysInputs config={config} handleChange={handleChange}/>
          {
            boards.length <= 0 ?
                <UserKeysInformation/>
                :
                <>
                  <BoardSelection config={config} boards={boards} handleChange={handleChange}/>
                  {
                    lists.length > 0 &&
                    <>
                      <ListSelection config={config} lists={lists} handleChange={handleChange}/>
                      {
                        config.list !== "" &&
                        <ListCardIndication cards={cards}/>
                      }
                    </>
                  }
                </>
          }
        </ConfigModal>
      </>
  );
}
