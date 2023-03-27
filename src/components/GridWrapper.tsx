import { Text, Line, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AlgorithmsController } from "../data/algorithms-controller";
import { TreeNode } from "../models/tree-node";
import { Vector2 } from "three";
import { useState } from "react";

const size = 3.2;

const BoxNode = (node: TreeNode<string>) => {
  return (
    <>
      {node.left && (
        <Line
          points={[
            new Vector2(node.position!.x, node.position!.y),
            new Vector2(node.left.position!.x, node.left.position!.y),
          ]}
          color="#094F6D"
          lineWidth={5}
        />
      )}
      <RoundedBox
        key={node.column}
        args={[size, size, 0]}
        radius={0.2}
        position={[node.position!.x, node.position!.y, 0]}
      >
        <meshBasicMaterial color="#094F6D" />
        <Text color="#E4F5FF" fontSize={2} textAlign="center" anchorY="middle">
          {node.value}
        </Text>
      </RoundedBox>
      {node.right && (
        <Line
          points={[
            new Vector2(node.position!.x, node.position!.y),
            new Vector2(node.right.position!.x, node.right.position!.y),
          ]}
          color="#094F6D"
          lineWidth={5}
        />
      )}
    </>
  );
};

const boxNodeTraversal = (node: TreeNode<string>): JSX.Element[] => {
  const sequence: TreeNode<string>[] = [];
  const inOrderTraversal = (current: TreeNode<string>) => {
    if (current == undefined) return;
    inOrderTraversal(current.left!);
    sequence.push(current);
    inOrderTraversal(current.right!);
  };
  inOrderTraversal(node);
  return sequence.map((node) => BoxNode(node));
};

const canvasZoom = (length: number): number => {
  const zoomDefault = 75;
  const zoom: number = (length / (zoomDefault * 1.3)) * 100;
  return zoom < zoomDefault ? zoomDefault : zoom;
};

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
            const exp = new RegExp(/(\(|\))/g);
            const parenthesis = expression.match(exp);

            if (
              expression.length >= 3 ||
              (parenthesis != null && parenthesis.length % 2 == 0)
            ) {
              const elements = expression.replace(exp, "");
              setZoom(canvasZoom(elements.length));
              const node = AlgorithmsController.gridGeneration(
                expression,
                elements.length
              );
              setNodes(boxNodeTraversal(node));
            }
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
          👾 <span className="font-bold cursor-pointer hover:bg-alice-blue hover:text-cerulean p-1 rounded">skdv</span> 👾
        </a>
      </div>
    </div>
  );
};
