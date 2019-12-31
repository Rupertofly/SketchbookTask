import React, { ReactElement, CSSProperties, useState } from 'react';
import SideBar from './SideBar';
import DrawingCanvas from './DrawingCanvas';
type Drawing = {
  name: string;
  data: ImageData;
};
interface Props {}
function MainApp({}: Props): ReactElement {
  const [images, setImages] = useState([
    { name: 'Drawing 1', data: new ImageData(1, 1) },
  ] as Drawing[]);
  const defaultDrawingName = 'Drawing 1';
  const [selectedDrawing, selectDrawing] = useState(defaultDrawingName);
  let imageSize = 512;

  const selectDrawingHandler = (newSelection: string) => {
    save();
    selectDrawing(newSelection);
  };

  let saveHandlers: (() => ImageData)[] = [];
  const addSaveHandle = (handle: () => ImageData) => {
    saveHandlers = [...saveHandlers, handle];
  };
  const removeSaveHandle = (handle: () => ImageData) => {
    saveHandlers = saveHandlers.filter(
      handleElement => handleElement !== handle
    );
  };
  const save = () => {
    const canvasImageData = saveHandlers.map(handler => handler()).pop();
    if (!canvasImageData) throw new Error(`canvas provided no data`);
    const newImages: Drawing[] = images.map(drawing => {
      if (drawing.name === selectedDrawing) {
        console.log(`saved`);

        return { name: drawing.name, data: canvasImageData };
      } else {
        return { name: drawing.name, data: drawing.data };
      }
    });
    setImages(newImages);
    return canvasImageData;
  };

  const newDrawing = (name: string) => {
    if (images.find(drawing => drawing.name === name)) {
      alert(`There is already a drawing named ${name}`);
      return;
    }
    const canvasImageData = saveHandlers.map(handler => handler()).pop();
    if (!canvasImageData) throw new Error(`canvas provided no data`);
    const newImages: Drawing[] = images.map(drawing => {
      if (drawing.name === selectedDrawing) {
        return { name: drawing.name, data: canvasImageData };
      } else {
        return { name: drawing.name, data: drawing.data };
      }
    });
    setImages([...newImages, { name, data: new ImageData(1, 1) }]);
    selectDrawing(name);
  };

  const maximumCanvasSize = Math.min(
    window.innerHeight,
    2 * (window.innerWidth / 3)
  );
  imageSize = 52 * Math.floor(maximumCanvasSize / 64);
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
          save();
          console.log(images[0].data.data);
        }}
      >
        Sketching App by Ruby Quail
      </h1>
      <div style={{ ...appStyling }}>
        <SideBar
          images={images}
          selectedImage={selectedDrawing}
          selectionHandler={selectDrawingHandler}
          newDrawingHandler={newDrawing}
        />
        <DrawingCanvas
          size={imageSize}
          saveHandlerCallback={{ addSaveHandle, removeSaveHandle }}
          loadImageData={
            images.find(item => item.name === selectedDrawing)?.data ?? null
          }
        />
      </div>
    </>
  );
}

export default MainApp;
