import React, { ReactElement } from 'react';

interface Props {
  name: string;
  isActive: Boolean;
  callback: (newSelection: string) => void;
}

function DrawingListItem({ name, isActive, callback }: Props): ReactElement {
  return (
    <li
      className={`drawingItem ${isActive ? 'active' : ''}`}
      onClick={() => callback(name)}
    >
      {name}
    </li>
  );
}

export default DrawingListItem;
