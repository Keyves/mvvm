
export function nodeToFragment(node) {
	var frag = document.createDocumentFragment(),
		child
	while (child = node.firstChild) {
		frag.appendChild(child)
	}
	return frag
}

export function stringToFragment(string) {
	let fragment;

	// 存在标签
	if (/<[^>]+>/g.test(string)) {
		let div = document.createElement('div');
		div.innerHTML = string;
		fragment = nodeToFragment(div);
	}
	// 纯文本节点
	else {
		fragment = document.createDocumentFragment();
		fragment.appendChild(document.createTextNode(string));
	}

	return fragment;
}

export function isElementNode(node) {
	return node.nodeType === 1
}

export function isTextNode(node) {
	return node.nodeType === 3
}
