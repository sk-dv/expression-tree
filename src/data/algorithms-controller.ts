import { TreeNode } from "../models/tree-node";
import { AlgorithmsRepository } from "./algorithms-repository";

export class AlgorithmsController {
    static gridGeneration = (expression: string, elements: number): TreeNode<string> => {
        const mediumLength = (elements * 2.25) / 2;

        const leftBoundary = -mediumLength;

        const postfix = AlgorithmsRepository.infixToPostfix(expression);
        const tree = AlgorithmsRepository.postfixToTree(postfix);
        return AlgorithmsRepository.inOrderWalk<string>(tree, leftBoundary)
    }
}