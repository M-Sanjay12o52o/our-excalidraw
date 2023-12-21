// import React, { useEffect, useRef, useState } from "react";

// interface CanvasProps {
//   mode: string;
// }

// const CanvasComponent: React.FC<CanvasProps> = ({ mode }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);
//   const isDrawing = useRef<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [inputX, setInputX] = useState<number>(0);
//   const [inputY, setInputY] = useState<number>(0);
//   const [setshapeDrawing, setSetshapeDrawing] = useState<boolean>(false);
//   const [startX, setStartX] = useState<number>(0);
//   const [startY, setStartY] = useState<number>(0);
//   const [recordedActions, setRecordedActions] = useState<any[]>([]);

//   // state to store the text position
//   const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({
//     x: 0,
//     y: 0,
//   });

//   console.log("currentMode: ", mode);

//   // const recordCanvas = () => {};

//   // const replayCanvas = () => {};

//   // const undoCanvas = () => {};

//   // useEffect(() => {
//   //   const recordingInterval = setInterval(recordCanvas, intervalTime);
//   //   return () => clearInterval(recordingInterval);
//   // });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     // console.log("canvas from useEffect: ", canvas);
//     if (!canvas) return;

//     const context = canvas.getContext("2d");
//     // console.log("context from useEffect: ", context);
//     if (!context) return;

//     canvas.width = window.innerWidth + window.scrollX;
//     canvas.height = window.innerHeight + window.scrollY;

//     contextRef.current = context;

//     const ctx = contextRef.current;
//     // console.log("ctx from useEffect: ", ctx);

//     if (ctx && isTyping) {
//       if (isTyping) {
//         ctx.font = "48px serif";
//         ctx.fillStyle = "black";
//         ctx.fillText(inputValue, textPosition.x, textPosition.y);
//       }

//       // ctx.font = "48px serif";
//       // ctx.fillStyle = "black";
//       // // ctx.clearRect(0, 0, canvas.width, canvas.height);
//       // ctx.fillText(inputValue, inputX, inputY);
//     }

//     const handleCanvasClick = (event: MouseEvent) => {
//       if (mode === "text") {
//         setIsTyping(true);

//         // Update text position only when entering text
//         if (!isTyping) {
//           setTextPosition({
//             x: event.clientX + window.scrollX,
//             y: event.clientY + window.scrollY,
//           });
//         }

//         setInputX(event.clientX + window.scrollX);
//         setInputY(event.clientY + window.scrollY);
//       } else if (mode !== "drawing") {
//         // setSetshapeDrawing(true);
//         setStartX(event.clientX + window.scrollX);
//         setStartY(event.clientY + window.scrollY);
//       }
//     };

//     const handleTextInput = (event: KeyboardEvent) => {
//       if (isTyping) {
//         const key = event.key;
//         if (key === "Enter") {
//           setIsTyping(false);
//           const ctx = contextRef.current;
//           if (ctx) {
//             ctx.font = "16px Arial";
//             ctx.fillStyle = "black";
//             ctx.fillText(inputValue, inputX, inputY);
//           }
//           setInputValue("");
//         } else if (key === "Backspace") {
//           setInputValue(inputValue.slice(0, -1));
//         } else {
//           setInputValue(inputValue + key);
//         }
//       }
//     };

//     const handleDrawingShapes = (event: MouseEvent) => {
//       if (!setshapeDrawing || !contextRef.current) return;

//       const ctx = contextRef.current;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       switch (mode) {
//         case "straight-line":
//           ctx.beginPath();
//           ctx.moveTo(startX, startY);
//           ctx.lineTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );
//           ctx.stroke();
//           break;
//         case "rectangle":
//           const rectWidth = event.clientX + window.scrollX - startX;
//           const rectHeight = event.clientY + window.scrollY - startY;
//           ctx.strokeRect(startX, startY, rectWidth, rectHeight);
//           break;
//         case "square":
//           const squareWidth = event.clientX + window.scrollX - startX;
//           const squareHeight = event.clientY + window.scrollY - startY;
//           const minSize = Math.min(
//             Math.abs(squareWidth),
//             Math.abs(squareHeight)
//           );
//           if (squareWidth >= 0 && squareHeight >= 0) {
//             ctx.strokeRect(startX, startY, minSize, minSize);
//           } else if (squareWidth < 0 && squareHeight >= 0) {
//             ctx.strokeRect(startX - minSize, startY, minSize, minSize);
//           } else if (squareWidth >= 0 && squareHeight < 0) {
//             ctx.strokeRect(startX, startY - minSize, minSize, minSize);
//           } else {
//             ctx.strokeRect(
//               startX - minSize,
//               startY - minSize,
//               minSize,
//               minSize
//             );
//           }
//           break;
//         case "arrow":
//           const arrowWidth = event.clientX + window.scrollX - startX;
//           const arrowHeight = event.clientY + window.scrollY - startY;
//           const arrowBase = Math.abs(arrowWidth);
//           const arrowHead = Math.abs(arrowHeight);
//           const arrowLength = Math.sqrt(arrowBase ** 2 + arrowHead ** 2);
//           const arrowAngle = Math.atan2(arrowHead, arrowBase);

//           ctx.beginPath();
//           ctx.moveTo(startX, startY);
//           ctx.lineTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );

//           ctx.moveTo(
//             startX + arrowLength * Math.cos(arrowAngle - Math.PI / 6),
//             startY + arrowLength * Math.sin(arrowAngle - Math.PI / 6)
//           );
//           ctx.lineTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );

//           ctx.moveTo(
//             startX + arrowLength * Math.cos(arrowAngle + Math.PI / 6),
//             startY + arrowLength * Math.sin(arrowAngle + Math.PI / 6)
//           );
//           ctx.lineTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );

//           ctx.stroke();
//           break;
//         default:
//           break;
//       }
//     };

//     const handleDrawing = (event: MouseEvent) => {
//       if (!isDrawing.current && !setshapeDrawing) return;

//       if (setshapeDrawing) {
//         handleDrawingShapes(event);
//       } else {
//         const ctx = contextRef.current;
//         if (ctx) {
//           ctx.lineTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );
//           ctx.stroke();
//         }
//       }
//     };

//     const handleStartDrawing = (event: MouseEvent) => {
//       if (mode === "drawing") {
//         isDrawing.current = true;
//         const ctx = contextRef.current;
//         if (ctx) {
//           ctx.beginPath();
//           ctx.moveTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );
//         }
//       } else {
//         handleCanvasClick(event);
//       }
//     };

//     const handleStopDrawing = () => {
//       isDrawing.current = false;
//       setSetshapeDrawing(false);

//       const ctx = contextRef.current;
//       if (ctx) {
//         ctx.closePath();
//       }
//     };

//     window.addEventListener("keydown", handleTextInput);
//     canvas.addEventListener("click", handleCanvasClick);

//     canvas.addEventListener("mousedown", (event: MouseEvent) => {
//       if (mode === "drawing") {
//         isDrawing.current = true;
//         const ctx = contextRef.current;
//         if (ctx) {
//           ctx.beginPath();
//           ctx.moveTo(
//             event.clientX + window.scrollX,
//             event.clientY + window.scrollY
//           );
//         }
//       } else {
//         handleCanvasClick(event);
//       }
//     });

//     canvas.addEventListener("mousemove", handleDrawing);
//     canvas.addEventListener("mousedown", handleStartDrawing);
//     canvas.addEventListener("mouseup", handleStopDrawing);

//     return () => {
//       window.removeEventListener("keydown", handleTextInput);
//       canvas.removeEventListener("click", handleCanvasClick);

//       canvas.removeEventListener("mousedown", (event) => {
//         if (mode === "drawing") {
//           isDrawing.current = true;
//           const ctx = contextRef.current;
//           if (ctx) {
//             ctx.beginPath();
//             ctx.moveTo(
//               event.clientX + window.scrollX,
//               event.clientY + window.scrollY
//             );
//           }
//         } else {
//           handleCanvasClick(event);
//         }
//       });

//       canvas.removeEventListener("mousemove", handleDrawing);
//       canvas.removeEventListener("mouseup", handleStopDrawing);
//       canvas.removeEventListener("mouseout", handleStopDrawing);
//     };
//   }, [mode, isTyping, inputValue, inputX, inputY]);

//   return (
//     <canvas
//       ref={canvasRef}
//       id="canvas"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: -1,
//         pointerEvents: "auto",
//       }}
//     ></canvas>
//   );
// };

// export default CanvasComponent;
