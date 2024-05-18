import React, { useEffect, useRef, useState } from "react";

const Canvas: React.FC<React.PropsWithChildren> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counter, setCounter] = useState(0);
  const [counter100, setCounter100] = useState(0);

  useEffect(() => {
    // Set interval
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 1000);

    // Set canvas
    if (canvasRef.current == null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    const center = { x: 300, y: 300 };
    const radius = 200;
    const circles = 6;
    const open = Math.PI * 0.05;

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    const step = 1 / circles;

    const rand = Math.random() * Math.PI * 2;

    for (let i = circles; i >= 0; i--) {
      ctx.beginPath();
      ctx.arc(
        center.x,
        center.y,
        radius * i * step,
        rand - Math.PI + open,
        rand + Math.PI - open
      );
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    for (let i = 0; i < 180; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(300, 300);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.beginPath();
    const rand2 = (Math.random() * 2 -1) * 50;
    const rand3 = (Math.random() * 2 -1) * 50;
    ctx.arc(center.x + 100 + rand2, center.y + rand3 + 100, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();


    return () => {
      clearInterval(interval);
    };
  }, [counter]);


//   useEffect(()=>{
//     const interval_100 = setInterval(() => {
//       setCounter100(counter100 + 1);
//     }, 200);

//         // Set canvas
//         if (canvasRef.current == null) return;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         if (ctx == null) return;
//         const center = { x: 300, y: 300 };


   

//     return () => {
//       clearInterval(interval_100);
//   }
// },[counter100]);

  return (
    <canvas
      className="mx-auto"
      ref={canvasRef}
      height={600}
      width={600}
    ></canvas>
  );
};

export default Canvas;
