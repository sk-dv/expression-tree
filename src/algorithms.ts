import { TreeNode } from "./models/tree-node";

export const inOrderWalk = <T>(node: TreeNode<T>): T[] => {
    const sequence: T[] = []

    const inOrder = (current: TreeNode<T> | undefined) => {
        if (current == undefined) return;
        inOrder(current!.left)
        sequence.push(current!.value)
        inOrder(current!.right)
    };

    inOrder(node);
    return sequence
}

/**
 * 
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
 * 
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

export const postfixToTree = (postfix: string): TreeNode<string> | undefined => {
    let nodes: TreeNode<string>[] = []

    for (let idx = 0; idx < postfix.length; idx++) {
        if (postfix[idx].match(RegExp('^[a-z0-9]'))?.length == 1) {
            nodes.push(new TreeNode<string>(postfix[idx]))
            continue
        }

        const node = new TreeNode<string>(postfix[idx])
        const right = nodes.pop()!.value
        const left = nodes.pop()!.value
        node.right = new TreeNode<string>(right)
        node.left = new TreeNode<string>(left)
        nodes.push(node)

    }

    const root = nodes.pop()
    return root
}