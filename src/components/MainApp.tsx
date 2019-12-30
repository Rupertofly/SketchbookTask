import React, {
  ReactElement,
  CSSProperties,
  useState,
  useEffect,
} from 'react';
import SideBar from './SideBar';
import DrawingCanvas from './DrawingCanvas';

interface Props {}
function MainApp({}: Props): ReactElement {
  const saveFunction = (dataUrl: string) => {};
  const handleLoad = () => {};
  let imageSize = 512;
  let [selectedDrawing, selectDrawing] = useState(
    'Drawing 1'
  );
  const maximumCanvasSize = Math.min(
    window.innerHeight,
    2 * (window.innerWidth / 3)
  );
  imageSize = 52 * Math.floor(maximumCanvasSize / 64);
  const appStyling: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateAreas: 'sidebar canvas',
  };

  return (
    <>
      <h1>App {imageSize}</h1>
      <div style={{ ...appStyling }}>
        <SideBar />
        <DrawingCanvas size={imageSize} />
      </div>
    </>
  );
}

export default MainApp;
