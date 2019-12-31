import React, { ReactElement, CSSProperties, useState } from 'react';
import SideBar from './SideBar';
import DrawingCanvas from './DrawingCanvas';
import '../styles.css';
// Types
interface Drawing {
  name: string;
  data: ImageData;
}
// Defaults
const defaultListOfDrawings = [
  { name: 'Drawing 1', data: new ImageData(1, 1) },
] as Drawing[];
const defaultDrawingName = 'Drawing 1';
const defaultImageSize = 512;

// Helpers
function updateListOfDrawings(
  listOfDrawings: Drawing[],
  selectedDrawing: string,
  currentCanvasImageData: ImageData
) {
  return listOfDrawings.map(drawing => {
    if (drawing.name === selectedDrawing) {
      return { name: drawing.name, data: currentCanvasImageData };
    } else {
      return { name: drawing.name, data: drawing.data };
    }
  });
}

// Main App Component
function MainApp(): ReactElement {
  const [listOfDrawings, setListOfDrawings] = useState(defaultListOfDrawings);
  const [selectedDrawing, setSelectedDrawing] = useState(defaultDrawingName);

  const selectDrawingHandler = (newSelection: string) => {
    saveCurrentDrawing();
    setSelectedDrawing(newSelection);
  };

  let saveHandlers: (() => ImageData)[] = [];
  const saveHandlerHelper = {
    addSaveHandle: (handle: () => ImageData) =>
      (saveHandlers = [...saveHandlers, handle]),
    removeSaveHandle: (handle: () => ImageData) =>
      (saveHandlers = saveHandlers.filter(
        handleElement => handleElement !== handle
      )),
  };
  const saveCurrentDrawing = () => {
    const currentCanvasImageData = saveHandlers.map(handler => handler()).pop();
    if (!currentCanvasImageData) throw new Error(`canvas provided no data`);
    const updatedCanvasImageData: Drawing[] = updateListOfDrawings(
      listOfDrawings,
      selectedDrawing,
      currentCanvasImageData
    );
    setListOfDrawings(updatedCanvasImageData);
    return currentCanvasImageData;
  };
  const newDrawing = (name: string) => {
    if (listOfDrawings.find(drawing => drawing.name === name)) {
      alert(`There is already a drawing named ${name}`);
      return;
    }
    const currentCanvasImageData = saveHandlers.map(handler => handler()).pop();
    if (!currentCanvasImageData) throw new Error(`canvas provided no data`);
    const updatedCanvasImageData = updateListOfDrawings(
      listOfDrawings,
      selectedDrawing,
      currentCanvasImageData
    );
    setListOfDrawings([
      ...updatedCanvasImageData,
      { name, data: new ImageData(1, 1) },
    ]);
    setSelectedDrawing(name);
  };

  const maximumCanvasSize = Math.min(
    window.innerHeight,
    2 * (window.innerWidth / 3)
  );
  const imageSize = 52 * Math.floor(maximumCanvasSize / 64);
  const appStyling: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `1fr 2fr`,
    gridTemplateAreas: `'sidebar canvas'`,
    gridGap: 16,
  };

  return (
    <>
      <h1
        onClick={() => {
          saveCurrentDrawing();
          console.log(listOfDrawings[0].data.data);
        }}
      >
        Sketching App by Ruby Quail
      </h1>
      <div style={{ ...appStyling }}>
        <SideBar
          listOfDrawings={listOfDrawings}
          selectedDrawing={selectedDrawing}
          selectionCallback={selectDrawingHandler}
          newDrawingCallback={newDrawing}
        />
        <DrawingCanvas
          size={defaultImageSize}
          saveHelper={saveHandlerHelper}
          loadImageData={
            listOfDrawings.find(item => item.name === selectedDrawing)?.data ??
            null
          }
        />
      </div>
    </>
  );
}

export default MainApp;
