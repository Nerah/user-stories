import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
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
`;

export default function Header() {
  return (
      <HeaderWrapper>
        <h1>User Stories</h1>
      </HeaderWrapper>
  );
}
