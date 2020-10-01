import React from 'react';

export default function ListSelection({config, lists, handleChange}) {
  return (
      <>
        <label htmlFor="list">Select the list you want</label>
        <select id="list" onChange={handleChange} value={config.list}>
          <option key="" value=""/>
          {lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
        </select>
      </>
  );
}
