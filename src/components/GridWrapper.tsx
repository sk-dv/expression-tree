import styled from "@emotion/styled";
import { Html, Line, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AlgorithmsController } from "../data/algorithms-controller";
import { TreeNode } from "../models/tree-node";
import { Vector2 } from "three";
import { useState } from "react";

const size = 2;

const FixedWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Center = styled.div`
  width: 100%;
  height: 80%;
  bottom: 0;
  position: fixed;
`;

const BoxNode = (node: TreeNode<string>) => {
  return (
    <>
      {node.left && (
        <Line
          points={[
            new Vector2(node.position!.x, node.position!.y),
            new Vector2(node.left.position!.x, node.left.position!.y),
          ]}
          color="red"
          lineWidth={3}
        />
      )}
      <RoundedBox
        key={node.column}
        args={[size, size, 0]}
        radius={0.1}
        position={[node.position!.x, node.position!.y, 0]}
      >
        <meshBasicMaterial color="red" />
        <Html>
          <p>{node.value}</p>
        </Html>
      </RoundedBox>
      {node.right && (
        <Line
          points={[
            new Vector2(node.position!.x, node.position!.y),
            new Vector2(node.right.position!.x, node.right.position!.y),
          ]}
          color="red"
          lineWidth={3}
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

export const GridWrapper = () => {
  const [nodes, setNodes] = useState<JSX.Element[]>([]);
  const [expression, setExpression] = useState<string>("");
  const [zoom, setZoom] = useState<number>()

  return (
    <FixedWrapper>
      <input onChange={(e) => setExpression(e.target.value)} />
      <button
        onClick={() => {
          const exp = new RegExp(/(\(|\))/g);
          const parenthesis = expression.match(exp)
  
          if (expression.length >= 3 || (parenthesis != null && parenthesis.length % 2 == 0)) {
            const elements = expression.replace(exp, "");
            setZoom(elements.length <= 3 ? 55 : (elements.length * 100) / 55);
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
      <Center>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, zoom!]} />
          {nodes}
        </Canvas>
      </Center>
    </FixedWrapper>
  );
};
