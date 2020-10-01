import React from 'react';

export default function BoardSelection({config, boards, handleChange}) {
  return (
      <>
        <label htmlFor="board">Select the board you want</label>
        <select id="board" onChange={handleChange} value={config.board}>
          <option key="" value=""/>
          {boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
        </select>
      </>
  );
}
