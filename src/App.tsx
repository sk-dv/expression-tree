import "./App.css";
import { infixToPostfix, inOrderWalk, postfixToTree } from "./algorithms";
import { TreeNode } from "./models/tree-node";

const NodePlot = ({ node, className }: any) => {
  return (
    <div className={className}>
      {node.value}
      {node.left && (
        <div className="left-branch">
          <div className="left-branch-wrapper">
            <NodePlot node={node.left} className="sub-left-node-wrapper" />
          </div>
        </div>
      )}
      {node.right && (
        <div className="right-branch">
          <div className="right-branch-wrapper">
            <NodePlot node={node.right} className="sub-right-node-wrapper" />
          </div>
        </div>
      )}
    </div>
  );
};

const node = TreeNode.definedNode<number>(1);
node.left = TreeNode.definedNode<number>(2);
node.right = TreeNode.definedNode<number>(3);
node.left.left = TreeNode.definedNode<number>(4);
node.left.right = TreeNode.definedNode<number>(5);

const postfix = infixToPostfix('(5+2)*(3-1)')

const tree = postfixToTree(postfix)

if (tree != undefined) {
  console.log(inOrderWalk(tree))
}

const App = () => {
  return (
    <div className="app-wrapper">
      <NodePlot node={tree} className='node-wrapper' />
    </div>
  );
};

export default App;
