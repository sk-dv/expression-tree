import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AlgorithmsController } from "../data/algorithms-controller";
import { useState } from "react";

export const GridWrapper = () => {
  const [nodes, setNodes] = useState<JSX.Element[]>([]);
  const [expression, setExpression] = useState<string>("");
  const [zoom, setZoom] = useState<number>();

  return (
    <div className="bg-white h-screen">
      <div className="h-2/6 flex flex-col justify-center items-center">
        <p className="text-indigo-dye mb-8 text-2xl">Árbol de expresión</p>
        <input
          type="text"
          placeholder="Ej. (a+b)-c"
          className="border border-slate-300 rounded-md p-2 shadow-md focus:outline-none border-gunmetal focus:ring-gunmetal focus:ring-1"
          onChange={(e) => setExpression(e.target.value)}
        />
        <button
          className="bg-indigo-dye hover:bg-gunmetal text-alice-blue px-4 py-2 rounded-lg mt-4 cursor-pointer"
          onClick={() => {
            const controller = new AlgorithmsController(expression);
            const { zoom, elements } = controller.drawTree();
            setZoom(zoom);
            setNodes(elements);
          }}
        >
          Dibujar
        </button>
      </div>

      <div className="h-3/6">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, zoom!]} />
          {nodes}
        </Canvas>
      </div>

      <div className="h-1/6 flex justify-center items-center">
        <a href="https://github.com/sk-dv">
          <span className="font-bold cursor-pointer hover:bg-alice-blue hover:text-cerulean p-1 rounded">
            skdv 👾
          </span>
        </a>
      </div>
    </div>
  );
};
