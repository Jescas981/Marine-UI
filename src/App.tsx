import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import Compass from "./images/compass.svg";

const App: React.FC<React.PropsWithChildren> = () => {
  const [head, setHead] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        setHead((s) => s + Math.PI * 0.5);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Set canvas
    if (canvasRef.current == null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    var transX = canvas.width * 0.5,
      transY = canvas.height * 0.5;
    ctx.translate(transX, transY);

    const step = Math.PI / 4;

    for (let ang = 0.0; ang < 2 * Math.PI; ang += step) {
      const dir = { x: Math.cos(ang), y: Math.sin(ang) };
      ctx.beginPath();
      ctx.moveTo(dir.x * 280, dir.y * 280);
      ctx.lineTo(dir.x * 300, dir.y * 300);
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.save();
      ctx.translate(dir.x * 240, dir.y * 240);
      ctx.rotate(ang);
      ctx.font = "20px Arial";
      ctx.fillText(`${Math.round((ang * 180) / Math.PI)}`, 0, 10);
      ctx.restore();
      ctx.closePath();
    }

    const step2 = 0.01 * Math.PI;

    for (let ang = 0.0; ang <= 2 * Math.PI; ang += step2) {
      const dir = { x: Math.cos(ang), y: Math.sin(ang) };
      ctx.beginPath();
      ctx.moveTo(dir.x * 285, dir.y * 285);
      ctx.lineTo(dir.x * 295, dir.y * 295);
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.closePath();
    }
  }, []);

  return (
    <div className="">
      <h1 className="font-bold text-4xl text-center py-8">
        Navegacion Asistida
      </h1>
      <div
        className="relative mx-auto scale-50"
        style={{ width: 600, height: 600 }}
      >
        <canvas
          className="absolute"
          height={600}
          width={600}
          ref={canvasRef}
          style={{
            transform: `rotate(${head-90}deg)`,
            transition: "transform 150ms ease",
          }}
        ></canvas>
        <i className="absolute left-1/2 transform -translate-x-1/2 h-0 w-0 border-x-[1rem] border-x-transparent border-t-[1rem] border-t-gray-800"></i>
        <img
          src={Compass}
          alt="Compass"
          className="w-full h-full"
          style={{
            transform: `rotate(${head-30}deg)`,
            transition: "transform 150ms ease",
          }}
        />
      </div>
      <div className="mx-auto rounded-md shadow-md bg-gray-100 p-4 w-72">
        <h1 className="font-bold">Coordinates</h1>
        <p>Orientation: {Math.round((head * 180) / Math.PI)}° West</p>
        <p>Longitude: {-75.015152+3*Math.random()}</p>
        <p>Latitude: {-9.1899673+3*Math.random()}</p>
        <p>Velocity: {10.05123+3*Math.random()} m/s</p>
      </div>
    </div>
  );
};

export default App;
