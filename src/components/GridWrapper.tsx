import styled from "@emotion/styled";
import { Html, Line, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AlgorithmsController } from "../data/algorithms-controller";
import { TreeNode } from "../models/tree-node";
import { Vector2 } from "three";

const size = 2;
const node = AlgorithmsController.gridGeneration();

const FixedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Center = styled.div`
  width: 80%;
  height: 80%;
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
  const nodes = boxNodeTraversal(node);

  return (
    <FixedWrapper>
      <Center>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 100]} />
          {nodes}
        </Canvas>
      </Center>
    </FixedWrapper>
  );
};
