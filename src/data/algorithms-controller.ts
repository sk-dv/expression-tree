import { BoxNode } from "../components/BoxNode";
import { Traversal } from "../components/GridWrapper";
import { TreeNode } from "../models/tree-node";
import { AlgorithmsRepository } from "./algorithms-repository";

export class AlgorithmsController {
  private readonly repository: AlgorithmsRepository
  private readonly expression: string
  private readonly parenthesesMatch: RegExpMatchArray | null

  constructor(private readonly rawExpression: string) {
    const parenthesesRegex = new RegExp(/(\(|\))/g);
    this.parenthesesMatch = this.rawExpression.match(parenthesesRegex);
    this.expression = this.rawExpression.replace(parenthesesRegex, "");

    const mediumLength = (this.expression.length * 3.25) / 2;
    const leftBoundary = -mediumLength;

    this.repository = new AlgorithmsRepository(leftBoundary);
  }

  private canvasZoom = (): number => {
    const zoomDefault = 75;
    const zoom: number = (length / (zoomDefault * 1.3)) * 100;
    return zoom < zoomDefault ? zoomDefault : zoom;
  };

  drawTree = (): { zoom: number, elements: JSX.Element[], traversal: Traversal | null } => {
    const parenthesesValidation = this.parenthesesMatch != null && this.parenthesesMatch.length % 2 == 0

    if (this.rawExpression.length >= 3 || parenthesesValidation) {
      const node = this.gridGeneration();
      const traversal = this.traversals(node)
      return { zoom: this.canvasZoom(), elements: this.drawBoxNodes(node, BoxNode), traversal }
    }

    return { zoom: 0, elements: [], traversal: null }
  }

  private traversals = (node: TreeNode<string>): Traversal => {
    const preOrder: string[] = []
    const inOrder: string[] = []
    const postOrder: string[] = []

    this.repository.preOrderTraversal(node, (current) => preOrder.push(current.value!))
    this.repository.inOrderTraversal(node, (current) => inOrder.push(current.value!))
    this.repository.postOrderTraversal(node, (current) => postOrder.push(current.value!))

    return { preOrder, inOrder, postOrder }
  }

  private drawBoxNodes = (
    root: TreeNode<string>,
    callback: (current: TreeNode<string>) => JSX.Element
  ): JSX.Element[] => {
    const sequence: TreeNode<string>[] = [];
    this.repository.inOrderTraversal(root, (node) => sequence.push(node))
    return sequence.map(callback);
  };

  private gridGeneration = (): TreeNode<string> => {
    const postfix = this.repository.infixToPostfix(this.rawExpression);
    const tree = this.repository.postfixToTree(postfix);
    return this.repository.inOrderPositionUpdating<string>(tree)
  }
}