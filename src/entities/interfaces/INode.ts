

interface INode {
	url: string,
	completedPoint: number
	isFinal: boolean
	getNextNodes(): Array<INode>
	addNextNode(node: INode): void
}

export default INode;