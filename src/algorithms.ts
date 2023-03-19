import { TreeNode } from "./models/tree-node";

/**
 * @param tree node 
 * @returns generic sequence building by an in order walk
 */
export const inOrderWalk = <T>(node: TreeNode<T>): T[] => {
    const sequence: T[] = []

    const inOrder = (current: TreeNode<T> | undefined) => {
        if (current == undefined) return;
        inOrder(current!.left)
        sequence.push(current.value)
        inOrder(current!.right)
    };

    inOrder(node);
    return sequence
}

/**
 * @param operator character 
 * @returns precedence level
 */
const precedence = (char: string): number => {
    if (char == '+' || char == '-') return 1
    if (char == '*' || char == '/') return 2
    if (char == '^') return 3
    return 0
}

/**
 * @param infix string 
 * @returns postfix string
 */
export const infixToPostfix = (expressions: string): string => {
    const characters = expressions.split('').filter(e => e != ' ')

    let postfix: string = ''
    let stack: string[] = []

    for (let idx = 0; idx < characters.length; idx++) {
        const char = characters[idx]

        const regex = RegExp("[0-9a-z]")
        if (char.match(regex)?.length == 1) postfix += char
        else if (char == '(') stack.push(char)
        else if (char == ')') {
            while (stack[stack.length - 1] != '(') {
                postfix += stack.pop()
            }
            stack.pop()
        } else {
            while (stack.length != 0 && precedence(characters[idx]) <= precedence(stack[stack.length - 1])) {
                postfix += stack.pop()
            }
            stack.push(char)
        }
    }

    while (stack.length != 0) {
        postfix += stack[stack.length - 1]
        stack.pop()
    }

    return postfix
}

/**
 * @param postfix string
 * @returns expression tree
 */
export const postfixToTree = (postfix: string): { root: TreeNode<string> | undefined, height: number } => {
    const nodes: TreeNode<string>[] = []

    for (let char of postfix) {
        if (char.match(RegExp('^[a-z0-9]'))?.length == 1)
            nodes.push(TreeNode.definedNode<string>(char))
        else {
            let node = TreeNode.definedNode<string>(char)
            node.right = nodes.pop()
            node.left = nodes.pop()
            nodes.push(node)
        }
    }

    let root = nodes.pop()
    return { root, height: parseInt(Math.log2(postfix.length).toString()) + 1 }
}