import React, { ReactElement, useRef, useEffect, MouseEvent } from 'react';

interface Props {
  imageDataToLoad: ImageData | null;
  saveHelper: {
    addSaveHandle: (handler: () => ImageData) => void;
    removeSaveHandle: (handler: () => ImageData) => void;
  };
  size: number;
}

function DrawingCanvas({
  size,
  imageDataToLoad,
  saveHelper,
}: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mouseDown = false;
  let canvasContext: CanvasRenderingContext2D; // placeholder
  const brushSize = size / 128;

  useEffect(() => {
    // update the canvas context
    if (canvasRef.current) canvasContext = canvasRef.current.getContext('2d')!;

    //  Make sure canvas is blank
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, size, size);

    // check if there's image data to load, if so place that on the canvas
    if (imageDataToLoad !== null)
      canvasContext.putImageData(imageDataToLoad, 0, 0);

    // create the save callback and push it up to the app
    const saveHandler = () => canvasContext.getImageData(0, 0, size, size);
    saveHelper.addSaveHandle(saveHandler);

    // add call back to remove handler on dismount
    return () => saveHelper.removeSaveHandle(saveHandler);
  });

  // start drawing a line
  const startDrawing = (e: MouseEvent) => {
    e.preventDefault();

    // get current mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // set line style
    canvasContext.fillStyle = 'black';

    // and draw an ellipse to start
    canvasContext.beginPath();
    canvasContext.ellipse(
      mouseX,
      mouseY,
      brushSize,
      brushSize,
      0,
      0,
      2 * Math.PI
    );
    canvasContext.fill();

    // set the mouseDown flag to true
    mouseDown = true;
  };
  const drawWhileMouseDown = (e: MouseEvent) => {
    // Check if mouse down flag is true
    if (mouseDown) {
      e.preventDefault();
      // get current and previous mouse position
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const prevMouseX = mouseX - e.movementX;
      const prevMouseY = mouseY - e.movementY;

      // set line style
      canvasContext.strokeStyle = 'black';
      canvasContext.lineWidth = brushSize * 2;
      canvasContext.lineCap = 'round';

      // draw a line from the previous mouse position to the current one
      canvasContext.beginPath();
      canvasContext.moveTo(prevMouseX, prevMouseY);
      canvasContext.lineTo(mouseX, mouseY);
      canvasContext.stroke();
    }
  };

  return (
    <canvas
      style={{ gridArea: 'canvas' }}
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={startDrawing}
      onMouseMove={drawWhileMouseDown}
      onMouseUp={() => (mouseDown = false)} // set mouse flag again on mouse button release
      onMouseLeave={() => (mouseDown = false)} // disable drawing when mouse leaves canvas
    ></canvas>
  );
}

export default DrawingCanvas;
