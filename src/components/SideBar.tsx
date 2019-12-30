import React, { ReactElement, useState } from 'react';
import DrawingListItem from './DrawingListItem';
import NewDrawing from './NewDrawing';

interface Props {
  images: { name: string; data: ImageData }[];
  selectedImage: string;
  selectionHandler: (newSelection: string) => void;
}

function SideBar({
  images,
  selectedImage,
  selectionHandler,
}: Props): ReactElement {
  return (
    <div style={{ gridArea: 'sidebar / span 1' }}>
      <NewDrawing />
      <hr />
      <ul>
        {images.map((image, index) => {
          return (
            <DrawingListItem
              active={image.name === selectedImage}
              key={index}
              name={image.name}
              selectionHandler={selectionHandler}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
