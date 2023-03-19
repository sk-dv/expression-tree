import "./App.css";
import { infixToPostfix, inOrderWalk, postfixToTree } from "./algorithms";
import { TreeNode } from "./models/tree-node";
import styled from "@emotion/styled";

const node = TreeNode.definedNode<number>(1);
node.left = TreeNode.definedNode<number>(2);
node.right = TreeNode.definedNode<number>(3);
node.left.left = TreeNode.definedNode<number>(4);
node.left.right = TreeNode.definedNode<number>(5);

const postfix = infixToPostfix("a+b*(c^d-e)^(f+g*h)-i");

const tree = postfixToTree(postfix);

if (tree.root != undefined) {
  console.log(inOrderWalk(tree.root), tree.height);
}

type BranchProps = {
  level: number;
};

const LeftBranch = styled.div<BranchProps>`
  position: absolute;
  background-color: #676f9d;
  width: ${(props) => props.level * 45}px;
  height: 10px;
  bottom: -${(props) => props.level * 5}px;
  left: -${(props) => props.level * 40}px;
  transform: rotate(-20deg);
`;

const RightBranch = styled.div<BranchProps>`
  position: absolute;
  background-color: #676f9d;
  width: ${(props) => props.level * 45}px;
  height: 10px;
  bottom: -${(props) => props.level * 5}px;
  right: -${(props) => props.level * 40}px;
  transform: rotate(20deg);
`;

type NodePlotProps<T> = {
  node: TreeNode<T>;
  className: string;
  level: number;
};

const NodePlot = ({ node, className, level }: NodePlotProps<string>) => {
  const nextLevel = (level -= 1);

  return (
    <div className={className}>
      {node.value}
      {node.left && (
        <LeftBranch level={level}>
          <div className="left-branch-wrapper">
            <NodePlot
              node={node.left}
              className="sub-left-node-wrapper"
              level={nextLevel}
            />
          </div>
        </LeftBranch>
      )}
      {node.right && (
        <RightBranch level={level}>
          <div className="right-branch-wrapper">
            <NodePlot
              node={node.right}
              className="sub-right-node-wrapper"
              level={nextLevel}
            />
          </div>
        </RightBranch>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app-wrapper">
      {tree.root != undefined && (
        <NodePlot
          node={tree.root}
          className="node-wrapper"
          level={tree.height + 1}
        />
      )}
    </div>
  );
};

export default App;
