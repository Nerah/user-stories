import React, {useState} from 'react';
import {createGlobalStyle} from "styled-components";

import Header from "./components/Header";
import Zone from "./containers/Zone";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }
`;

function App() {
  const [headerHere, setHeaderHere] = useState(true);
  const [cards, setCards] = useState([]);
  const [config, setConfig] = useState({
    key: '',
    token: '',
    board: '',
    list: ''
  })
  const [synchronized, setSynchronized] = useState(false);

  const itsRainingCards = (cards) => {
    setCards(cards);
  }

  return (
    <div className="App">
      <GlobalStyle/>
      <Header activation={() => setHeaderHere(!headerHere)}
              config={config} setConfig={setConfig}
              setSynchronized={setSynchronized}
              itsRainingCards={itsRainingCards}/>
      <Zone height={headerHere ? '75vh' : '100vh'}
            config={config}
            zoneCards={cards}
            synchronized={synchronized}/>
    </div>
  );
}

export default App;
