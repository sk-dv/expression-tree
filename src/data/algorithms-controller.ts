import { TreeNode } from "../models/tree-node";
import { AlgorithmsRepository } from "./algorithms-repository";

export class AlgorithmsController {
    static gridGeneration = (): TreeNode<string> => {
        const postfix = AlgorithmsRepository.infixToPostfix("a+b*(c^d-e)-(i+j)+(7*((5-7)*(6/3)))+(a+b*(c^d-e)-(i+j)+(7*((5-7)*(6/3)))+a+b*(c^d-e)-(i+j)+(7*((5-7)*(6/3))))");
        const tree = AlgorithmsRepository.postfixToTree(postfix);
        return AlgorithmsRepository.inOrderWalk<string>(tree)
    }
}