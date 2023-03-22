interface TreeNodeProps<T> {
    value?: T,
    left?: TreeNode<T>,
    right?: TreeNode<T>,
    row?: number,
    column?: number,
    position?: { x: number, y: number }
}

export class TreeNode<T> {
    public value: T | undefined;
    public left: TreeNode<T> | undefined;
    public right: TreeNode<T> | undefined;
    public column: number | undefined;
    public row: number | undefined;
    public position: { x: number, y: number } | undefined;

    constructor(props: TreeNodeProps<T>) {
        this.value = props.value
        this.left = props.left
        this.right = props.right
        this.row = props.row
        this.column = props.column
        this.position = props.position
    }

    copy(props?: TreeNodeProps<T>): TreeNode<T> {
        return new TreeNode({
            value: props?.value ?? this.value,
            left: props?.left ?? this.left,
            right: props?.right ?? this.right,
            row: props?.row ?? this.row,
            column: props?.column ?? this.column,
            position: props?.position ?? this.position,
        });
    }
}