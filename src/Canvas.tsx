import React, { useEffect, useRef, useState } from "react";

const Canvas: React.FC<React.PropsWithChildren> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Set interval
    const interval = setInterval(() => {
      setCounter(counter + 1);
      console.log(counter);
    }, 1000);
    // Set canvas
    if (canvasRef.current == null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    const center = { x: 400, y: 400 };
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
      ctx.arc(center.x, center.y, radius * i * step, rand - Math.PI + open, rand+Math.PI - open);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    for (let i = 0; i <180; i++) {
        ctx.beginPath();
        ctx.moveTo(0,0)
        ctx.lineTo(400,400)
        ctx.stroke()
        ctx.closePath();
      }
    


    return () => {
      clearInterval(interval);
    };
  }, [counter]);
  return <canvas ref={canvasRef} height={800} width={800}></canvas>;
};

export default Canvas;
