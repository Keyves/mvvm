import Watcher from '../watcher'
import {nodeToFragment, stringToFragment, isElementNode, isTextNode, toArray} from '../utils'

const attrRE = /^(bind|on):(\w+)$/
const textRE = /\{\{((?:.|\s)*?)\}\}/g

export default function compile(m, template) {
    m.$fragment = stringToFragment(template)
    parseChildNodes(m.$fragment, m)
    m.$el.appendChild(m.$fragment)
}

function parseChildNodes(node, m) {
    node.childNodes.forEach(child => {
        parseNode(child, m)
        child.childNodes && child.childNodes.length && parseChildNodes(child, m)
    })
}

function parseNode(node, m) {
    if (isElementNode(node)) {
        parseElementNode(node, m)
    } else if (isTextNode(node)) {
        parseTextNode(node, m)
    }
}
function parseElementNode(node, m) {
    var attrs = toArray(node.attributes),
        tokens = [],
        name,
        expValue,
        result

    attrs.forEach(attr => {
        name = attr.name
        expValue = attr.value
        if (result = attrRE.exec(name)) {
            directives[result[1]](node, m, result[2], expValue)
        }
    })
}

function parseTextNode(node, m) {
    var result
    while (result = textRE.exec(node.textContent)) {
        directives.text(node, m, result[1])
    }
}

const directives = {
    text(node, m, expValue) {
        node.textContent = m[expValue]
        new Watcher(m, expValue, function(value) {
            node.textContent = value
        })
    },
    bind(node, m, realAttr, expValue) {
        node.setAttribute(realAttr, m[expValue])
        new Watcher(m, expValue, function(value) {
            node.setAttribute(realAttr, value)
        })
    },
    on(node, m, realAttr, expValue) {
        let fn = m[expValue]
        node.addEventListener(realAttr, fn)
        new Watcher(m, expValue, function(value) {
            node.removeEventListener(realAttr, fn)
            fn = m[value]
            node.addEventListener(realAttr, fn)
        })
    }
}
