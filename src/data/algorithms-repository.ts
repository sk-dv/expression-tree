import { TreeNode } from "../models/tree-node";

export class AlgorithmsRepository {


    /**
     * @param tree node 
     * @returns generic sequence building by an in order walk
     */
    static inOrderWalk = <T>(node: TreeNode<T>): TreeNode<T> => {
        const leftBoundary = -50;
        const topBoundary = 10;

        const spacedSize = 2.25

        const updatePosition = <T>(root: TreeNode<T>, node: TreeNode<T>): TreeNode<T> => {
            const distance = AlgorithmsRepository.findDistance(root, node.column!.toString())
            return node.copy({
                row: distance,
                position: { x: leftBoundary + node.column! * spacedSize, y: topBoundary - distance * spacedSize }
            })
        }

        const updatePositionInOrder = (current: TreeNode<T> | undefined): void => {
            if (current == undefined) return;

            if (current.left != undefined) current.left = updatePosition(node, current.left)
            updatePositionInOrder(current.left!)

            if (current.right != undefined) current.right = updatePosition(node, current.right)
            updatePositionInOrder(current.right)
        };

        updatePositionInOrder(node)
        node = updatePosition(node, node)

        return node
    }

    /**
     * @param operator character 
     * @returns precedence level
     */
    static precedence = (char: string): number => {
        if (char == '+' || char == '-') return 1
        if (char == '*' || char == '/') return 2
        if (char == '^') return 3
        return 0
    }

    /**
     * @param infix string 
     * @returns postfix string
     */
    static infixToPostfix = (expressions: string): TreeNode<string>[] => {
        const characters = expressions.split('').filter(e => e != ' ')

        let postfix: TreeNode<string>[] = []
        let stack: TreeNode<string>[] = []

        let column = 0
        for (let idx = 0; idx < characters.length; idx++) {
            const char = characters[idx]
            column += 1

            if (char.match(RegExp("[0-9a-z]"))?.length == 1)
                postfix.push(new TreeNode({ value: char, column }))
            else if (char == '(') {
                column -= 1
                stack.push(new TreeNode({ value: char }))
            }
            else if (char == ')') {
                column -= 1
                while (stack[stack.length - 1].value != '(') {
                    postfix.push(stack.pop()!)
                }
                stack.pop()
            } else {
                while (stack.length != 0 && this.precedence(characters[idx]) <= this.precedence(stack[stack.length - 1].value!)) {
                    postfix.push(stack.pop()!)
                }
                stack.push(new TreeNode({ value: char, column }))
            }
        }

        while (stack.length != 0) {
            postfix.push(stack[stack.length - 1])
            stack.pop()
        }

        return postfix
    }

    /**
     * @param postfix string
     * @returns expression tree
     */
    static postfixToTree = (postfix: TreeNode<string>[]): TreeNode<string> => {
        const nodes: TreeNode<string>[] = []

        for (let idx = 0; idx < postfix.length; idx += 1) {
            const node = postfix[idx]

            if (node.value!.match(RegExp('^[a-z0-9]'))?.length == 1) {
                nodes.push(node)
            } else {
                node.right = nodes.pop()
                node.left = nodes.pop()
                nodes.push(node)
            }
        }

        return nodes.pop()!
    }

    /**
     * @param root tree node
     * @param value
     * @returns distance from value to root
     */
    static findDistance = <T>(root: TreeNode<T>, id: string) => {
        if (root == null) return -1;

        let distance = -1;

        if ((root.column!.toString() == id) ||
            (distance = this.findDistance(root.left!, id)) >= 0 ||
            (distance = this.findDistance(root.right!, id)) >= 0)
            return distance + 1;

        return distance;
    }
}

