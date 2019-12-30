import React, { ReactElement, useState, CSSProperties } from 'react';
import '../styles.css';

interface Props {
  name: string;
  active: Boolean;
  selectionHandler: (newSelection: string) => void;
}

function DrawingListItem({
  name,
  active,
  selectionHandler,
}: Props): ReactElement {
  return (
    <li
      className={`drawingItem ${active ? 'active' : ''}`}
      onClick={() => selectionHandler(name)}
    >
      {name}
    </li>
  );
}

export default DrawingListItem;
