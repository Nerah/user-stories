import React from 'react';
import {CardComponent} from "./CardComponent";
import {CardButton} from "./CardButton";
import {CardTextArea} from "./CardTextArea";
import {CardInput} from "./CardInput";

export default function StaticCard(props) {

  const handleChange = (e) => {
    e.persist();
    props.edit(e);
  }

  return (
      <CardComponent ref={props.getRef}
                     x={props.x}
                     y={props.y}
                     size={props.size}
                     dragState={props.dragState}>
        {props.editState ?
            <>
              <CardInput type="text" name="name" value={props.name} onChange={handleChange}/>
              <CardTextArea name="description" value={props.description} onChange={handleChange}/>
              <CardButton onClick={props.editQuit}>Edit</CardButton>
            </> :
            <>
              <h2>{props.name}</h2>
              <p>{props.description}</p>
            </>
        }
      </CardComponent>
  );
}
