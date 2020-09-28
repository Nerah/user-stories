import React from 'react';
import {createGlobalStyle} from "styled-components";

import Header from "./components/Header";
import Card from "./components/Card";
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
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Header/>
      <Zone>
        <Card/>
      </Zone>
    </div>
  );
}

export default App;
