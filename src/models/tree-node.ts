export class TreeNode<T> {
    public left: TreeNode<T> | undefined;
    public right: TreeNode<T> | undefined;

    private constructor(public value: T, left?: TreeNode<T>, right?: TreeNode<T>) { 
        this.left = left
        this.right = right
    }

    static definedNode = <T>(value: T, left?: TreeNode<T>, right?: TreeNode<T>) => {
        return JSON.parse(JSON.stringify(new TreeNode(value, left, right)))
    }
}