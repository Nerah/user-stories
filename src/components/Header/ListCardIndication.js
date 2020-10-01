import React from 'react';

export default function ListCardIndication({cards}) {
  return (
      <div>
        This list contains {cards.length} card{cards.length > 1 && 's'}.<br/>
        If you want to refresh the view, click on the synchronous icon,
        right next to the configuration button.
      </div>
  );
}
