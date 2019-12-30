import React, { ReactElement, CSSProperties, useState } from 'react';
import SideBar from './SideBar';
import DrawingCanvas from './DrawingCanvas';

interface Props {}
function MainApp({}: Props): ReactElement {
  let [images, setImages] = useState<
    Array<{
      name: string;
      data: ImageData;
    }>
  >([
    { name: 'Drawing 1', data: new ImageData(1, 1) },
    { name: 'Drawing 2', data: new ImageData(1, 1) },
  ]);
  const saveFunction = (data: ImageData) => {};
  const handleLoad = () => {};
  let imageSize = 512;
  const defaultDrawingName = 'Drawing 1';
  let [selectedDrawing, selectDrawing] = useState(defaultDrawingName);
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
    setImages(
      images.map(({ name, data }) =>
        name === selectedDrawing
          ? { name, data: canvasImageData }
          : { name, data }
      )
    );
    return canvasImageData;
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
        App {imageSize}
      </h1>
      <div style={{ ...appStyling }}>
        <SideBar
          images={images}
          selectedImage={selectedDrawing}
          selectionHandler={selectDrawingHandler}
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
