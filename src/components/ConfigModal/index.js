import React from 'react';
import styled from 'styled-components';

const CloseIcon = styled.span`
  position: fixed;
  top: 16vh;
  right: 16vw;
  font-size: 2em;
  cursor: pointer;
`;

const ModalContainer = styled.div.attrs(props => ({
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
`;
const ModalSection = styled.section`
  position: fixed;
  background: white;
  width: 70vw;
  height: 70vh;
  top: 15vh;
  left: 15vw;
`;
const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 100px 10px 30px;
`;

export default function ConfigModal({ handleClose, show, children }) {
  return (
      <ModalContainer show={show}>
        <ModalSection>
          <CloseIcon role="img" aria-label="close_config" onClick={handleClose}>&#9587;</CloseIcon>
          <ModalContent>
            {children}
          </ModalContent>
        </ModalSection>
      </ModalContainer>
  );
}
