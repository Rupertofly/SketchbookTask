import React, {
  ReactElement,
  useRef,
  useEffect,
  MouseEvent,
  DragEvent,
  useState,
} from 'react';

interface Props {
  loadDataUrl?: string;
  size: number;
}
function loadImage(
  canvasContext: CanvasRenderingContext2D,
  url: string
) {
  const img = new Image();
  img.onload = () => canvasContext.drawImage(img, 0, 0);
  img.src = url;
}

function DrawingCanvas({
  size,
  loadDataUrl,
}: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mouseDown = false;
  let canvasContext: CanvasRenderingContext2D;
  useEffect(() => {
    if (canvasRef.current)
      canvasContext = canvasRef.current.getContext('2d')!;
    canvasContext.clearRect(0, 0, size, size);
    if (loadDataUrl?.length)
      loadImage(canvasContext, loadDataUrl);
  });
  const stamp = (e: MouseEvent) => {
    const brushSize = size / 128;
    const rect = e.currentTarget.getBoundingClientRect();
    e.preventDefault();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
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
    mouseDown = true;
  };
  const draw = (e: MouseEvent) => {
    if (mouseDown) {
      const brushSize = size / 128;
      const rect = e.currentTarget.getBoundingClientRect();
      e.preventDefault();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const prevMouseX = mouseX - e.movementX;
      const prevMouseY = mouseY - e.movementY;
      canvasContext.strokeStyle = 'black';
      canvasContext.lineWidth = brushSize * 2;
      canvasContext.lineCap = 'round';
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
      onMouseDown={stamp}
      onMouseMove={draw}
      onMouseUp={() => (mouseDown = false)}
      onMouseLeave={() => (mouseDown = false)}
    ></canvas>
  );
}

export default DrawingCanvas;
