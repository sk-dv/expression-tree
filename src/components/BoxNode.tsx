import { Text, Line, RoundedBox } from "@react-three/drei";
import { TreeNode } from "../models/tree-node";
import { Vector2 } from "three";
import React from "react";

export const BoxNode = (node: TreeNode<string>) => {
  const size = 3.2;

  return (
    <React.Fragment key={`${node.position!.x}${node.position!.y}`}>
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
    </React.Fragment>
  );
};
