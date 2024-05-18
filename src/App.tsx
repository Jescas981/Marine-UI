import React from "react";
import Canvas from "./Canvas";

const App: React.FC<React.PropsWithChildren> = () => {
  return <div className="">
    <h1 className="font-bold text-4xl text-center py-8">Navegacion Asistida</h1>
    <Canvas>
    </Canvas>
    <div className="mx-auto rounded-md shadow-md bg-gray-100 p-4 w-72">
        <h1 className="font-bold">Coordinates</h1>
        <p>Orientation: 45.123° West</p>
        <p>Longitude: -75.015152</p>
        <p>Latitude: -9.189967</p>
        <p>Velocity: 10.0512 m/s</p>
    </div>
  </div>;
};

export default App;
