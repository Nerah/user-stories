import React from "react";
import styled from "styled-components";

const ZoneWrapper = styled.div`
  width: 100%;
  height: 75vh;
`;

export default function Zone({children}) {
  return (
      <ZoneWrapper>
        {children}
      </ZoneWrapper>
  );
}
