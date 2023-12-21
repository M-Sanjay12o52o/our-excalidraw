"use client";

import React, { useEffect, useRef } from "react";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  let isDrawing = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth + window.scrollX;
    canvas.height = window.innerHeight + window.scrollY;

    contextRef.current = context;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth + window.scrollX;
      canvas.height = window.innerHeight + window.scrollY;
    };

    const startDrawing = (event: MouseEvent) => {
      isDrawing = true;
      draw(event);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(
          event.clientX + window.scrollX,
          event.clientY + window.scrollY
        );
      }
    };

    const stopDrawing = () => {
      isDrawing = false;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.beginPath();
      }
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleScroll = () => {
      canvas.width += window.scrollX;
      canvas.height += window.scrollY;

      resizeCanvas();
      redraw();
    };

    const redraw = () => {
      const ctx = contextRef.current;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const visibleRect = {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);

      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="backgroundCanvas"
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
