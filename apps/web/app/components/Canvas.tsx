import React, { useEffect, useRef, useState } from "react";

interface CanvasProps {
  mode: string;
}

const CanvasComponent: React.FC<CanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputX, setInputX] = useState<number>(0);
  const [inputY, setInputY] = useState<number>(0);

  console.log("inputX: ", inputX);
  console.log("inputY: ", inputY);
  console.log("inputValue: ", inputValue);
  console.log("isTyping: ", isTyping);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth + window.scrollX;
    canvas.height = window.innerHeight + window.scrollY;

    contextRef.current = context;

    const ctx = contextRef.current;

    if (ctx && isTyping) {
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(inputValue, inputX, inputY);
    }

    const handleCanvasClick = (event: MouseEvent) => {
      // console.log("hello from handleCanvasClick");
      if (mode === "text") {
        setIsTyping(true);
        setInputX(event.clientX + window.scrollX);
        // console.log(event.clientX + window.scrollX);
        setInputY(event.clientY + window.scrollY);
        // console.log(event.clientY + window.scrollY);
      }
    };

    const handleTextInput = (event: KeyboardEvent) => {
      // console.log("hello from handleTextInput: ", event.key);
      if (isTyping) {
        const key = event.key;
        // console.log("key from if statement: ", event.key);
        if (key === "Enter") {
          setIsTyping(false);
          const ctx = contextRef.current;
          if (ctx) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(inputValue, inputX, inputY);
          }
          setInputValue("");
        } else if (key === "Backspace") {
          setInputValue(inputValue.slice(0, -1));
        } else {
          setInputValue(inputValue + key);
        }
      }
    };

    const handleStartDrawing = (event: MouseEvent) => {
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

    const handleDrawing = (event: MouseEvent) => {
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

    const handleStopDrawing = () => {
      isDrawing.current = false;
      const ctx = contextRef.current;
      if (ctx) {
        ctx.closePath();
      }
    };

    window.addEventListener("keydown", handleTextInput);
    canvas.addEventListener("click", handleCanvasClick);

    canvas.addEventListener("mousedown", handleStartDrawing);
    canvas.addEventListener("mousemove", handleDrawing);
    canvas.addEventListener("mouseup", handleStopDrawing);
    canvas.addEventListener("mouseout", handleStopDrawing);

    return () => {
      window.removeEventListener("keydown", handleTextInput);
      canvas.removeEventListener("click", handleCanvasClick);

      canvas.removeEventListener("mousedown", handleStartDrawing);
      canvas.removeEventListener("mousemove", handleDrawing);
      canvas.removeEventListener("mouseup", handleStopDrawing);
      canvas.removeEventListener("mouseout", handleStopDrawing);
    };
  }, [mode, isTyping, inputValue, inputX, inputY]);

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
