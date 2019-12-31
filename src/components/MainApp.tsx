import React, { ReactElement, CSSProperties, useState } from 'react';
import SideBar from './SideBar';
import DrawingCanvas from './DrawingCanvas';
import '../styles.css';
// Types
interface Drawing {
  name: string;
  data: ImageData;
}

// App Defaults
const defaultListOfDrawings = [
  { name: 'Drawing 1', data: new ImageData(1, 1) },
] as Drawing[];
const defaultDrawingName = 'Drawing 1';

// Helper function to create updated drawing list
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

function MainApp(): ReactElement {
  // add some state for the list of drawings and which one is currently selected
  const [listOfDrawings, setListOfDrawings] = useState(defaultListOfDrawings);
  const [selectedDrawing, setSelectedDrawing] = useState(defaultDrawingName);

  // create a function to handle selecting a new drawing
  const selectDrawingHandler = (newSelection: string) => {
    saveCurrentDrawing();
    setSelectedDrawing(newSelection);
  };

  // place to store the save callbacks from the canvas
  let saveHandlers: (() => ImageData)[] = [];

  // functions to subscribe and unsubscribe to the save handler
  const saveHandlerHelper = {
    addSaveHandle: (handle: () => ImageData) =>
      (saveHandlers = [...saveHandlers, handle]),
    removeSaveHandle: (handle: () => ImageData) =>
      (saveHandlers = saveHandlers.filter(
        handleElement => handleElement !== handle
      )),
  };
  // function that saves the current drawig when selecting a new drawing
  const saveCurrentDrawing = () => {
    // get canvas image data
    const currentCanvasImageData = saveHandlers.map(handler => handler()).pop();

    if (!currentCanvasImageData) throw new Error(`canvas provided no data`); //check if any data was provided by the canvas

    const updatedCanvasImageData = updateListOfDrawings(
      listOfDrawings,
      selectedDrawing,
      currentCanvasImageData
    );
    // set drawing list state
    setListOfDrawings(updatedCanvasImageData);
    return currentCanvasImageData;
  };

  // function to save current drawing, create a new drawing, and select it
  const newDrawing = (name: string) => {
    if (listOfDrawings.find(drawing => drawing.name === name)) {
      alert(`There is already a drawing named ${name}`);
      return;
    }
    // get canvas image data
    const currentCanvasImageData = saveHandlers.map(handler => handler()).pop();

    if (!currentCanvasImageData) throw new Error(`canvas provided no data`); //check if any data was provided by the canvas

    const updatedCanvasImageData = updateListOfDrawings(
      listOfDrawings,
      selectedDrawing,
      currentCanvasImageData
    );
    // set drawing list state to updated drawings and the new drawing
    setListOfDrawings([
      ...updatedCanvasImageData,
      { name, data: new ImageData(1, 1) },
    ]);
    //select the new drawing
    setSelectedDrawing(name);
  };

  // get a resonable canvas size
  const maximumCanvasSize = Math.min(
    window.innerHeight * 0.8,
    2 * (window.innerWidth / 3)
  );

  // standardise that size a bit
  const imageSize = 64 * Math.floor(maximumCanvasSize / 64);

  // setup CSS Grid
  const appStyling: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `1fr 2fr`,
    gridTemplateAreas: `'sidebar canvas'`,
    gridGap: 16,
  };

  return (
    <>
      {/* Title */}
      <h1
        onClick={() => {
          saveCurrentDrawing();
          console.log(listOfDrawings[0].data.data);
        }}
      >
        Sketching App by Ruby Quail
      </h1>
      {/* Grid Div */}
      <div style={{ ...appStyling }}>
        <SideBar
          listOfDrawings={listOfDrawings}
          selectedDrawing={selectedDrawing}
          selectionCallback={selectDrawingHandler}
          newDrawingCallback={newDrawing}
        />
        <DrawingCanvas
          size={imageSize}
          saveHelper={saveHandlerHelper}
          // Load current drawing's image data
          imageDataToLoad={
            listOfDrawings.find(item => item.name === selectedDrawing)?.data ??
            null
          }
        />
      </div>
    </>
  );
}

export default MainApp;
