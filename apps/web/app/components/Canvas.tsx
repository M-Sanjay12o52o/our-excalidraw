import React, { useEffect, useRef } from "react";

interface ModeProps {
  mode: string;
}

const CanvasComponent: React.FC<ModeProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth + window.scrollX;
    canvas.height = window.innerHeight + window.scrollY;

    contextRef.current = context;

    const startDrawing = (event: MouseEvent) => {
      isDrawing.current = true;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
      }
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing.current) return;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.lineTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
        ctx.stroke();
      }
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.closePath();
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth + window.scrollX;
      canvas.height = window.innerHeight + window.scrollY;
    };

    window.addEventListener("resize", handleResize);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      window.removeEventListener("resize", handleResize);

      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "auto",
      }}
    ></canvas>
  );
};

export default CanvasComponent;
