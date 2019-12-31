import React, { ReactElement, useState } from 'react';
import DrawingListItem from './DrawingListItem';
import NewDrawing from './NewDrawing';

interface Drawing {
  name: string;
  data: ImageData;
}

interface Props {
  listOfDrawings: Drawing[];
  selectedDrawing: string;
  selectionCallback: (newSelection: string) => void;
  newDrawingCallback: (name: string) => void;
}

function SideBar({
  listOfDrawings,
  selectedDrawing,
  selectionCallback,
  newDrawingCallback,
}: Props): ReactElement {
  return (
    <div style={{ gridArea: 'sidebar' }}>
      <NewDrawing callback={newDrawingCallback} />
      <hr />
      <ul>
        {listOfDrawings.map((drawing, index) => {
          return (
            <DrawingListItem
              isActive={drawing.name === selectedDrawing}
              key={index}
              name={drawing.name}
              callback={selectionCallback}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
