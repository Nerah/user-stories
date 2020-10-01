import React from 'react';
import {CloseIcon} from "../Icons";
import {ModalContainer} from "./ModalContainer";
import {ModalSection} from "./ModalSection";
import {ModalContent} from "./ModalContent";

export default function ConfigModal({ handleClose, show, children }) {
  return (
      <ModalContainer show={show}>
        <ModalSection>
          <CloseIcon handleClose={handleClose}/>
          <ModalContent>
            {children}
          </ModalContent>
        </ModalSection>
      </ModalContainer>
  );
}
