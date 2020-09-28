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
        <Card name={"Default name"} description={"Default description that is way too long, because I'm talking about anything, everytime, everywhere. I can talk like that for hours. I always think I haven't talk since it's been years."}/>
      </Zone>
    </div>
  );
}

export default App;
