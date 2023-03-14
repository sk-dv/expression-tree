export class TreeNode<T> {
    left?: TreeNode<T>;
    right?: TreeNode<T>;

    constructor(public value: T) { console.log(value) }

    public copyWith<T>(modifyObject: { [P in keyof TreeNode<T>]?: TreeNode<T>[P] }): TreeNode<T> {
        return Object.assign(Object.create(TreeNode.prototype), { ...this, ...modifyObject });
    }
}