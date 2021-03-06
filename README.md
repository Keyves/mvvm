# 如何实现一个MVVM

## 样本

![vue](./asset/vue.png)

## [DEMO](./index.js)

```javascript
import MVVM from './src/core'

const data = {
    a: 1
}

const template = `
    <div>
        <input bind:value="a" on:input="onInput"/>
        <div>{{a}}</div>
        <div>{{b}}</div>
    </div>
`

const mv = new MVVM({
    selector: 'body',
    data,
    computed: {
        b() {
            return 'b:' + this.a
        }
    },
    methods: {
        onInput(e) {
            this.a = e.target.value
        }
    },
    template
})

mv.$watch('a', (newValue, oldValue) => {
    console.log('callback', newValue, oldValue)
})

console.log(data.a, mv.a)
data.a = 2
console.log(data.a, mv.a)

global.data = data
```



## 演示图

![mvvm2](./asset/mvvm2.png)

![mvvm1](./asset/mvvm1.png)

## 结构

- Observer
- Watcher
- Compiler
- Parser


##  详细

### Observer

数据监听器


#### [dep](./src/observe/dep.js)

管理订阅队列

```javascript
let uuid = 0

class Dep {
    constructor() {
        this.id = uuid++
        this.watchers = []
    }

    addWatcher(watcher) {
        this.watchers.push(watcher)
    }

    depend() {
        Dep.target.addDep(this)
    }

    notify() {
        this.watchers.forEach(watcher => {
            watcher.update()
        })
    }
}

Dep.target = null
export default Dep
```

#### [observe](./src/observe/index.js)

拦截数据属性的setter和getter，通过getter将订阅者添加至队列，而setter触发时更新队列。

```js
import Dep from './dep'

export default function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, value) {
    const dep = new Dep()

    observe(value)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            const target = Dep.target
            if (target) {
                dep.depend()
            }
            return value
        },
        set(newValue) {
            if (newValue === value) {
                return
            }
            value = newValue
            observe(newValue)
            dep.notify()
        }
    })
}
```


### [Watcher](./src/watcher.js)

根据传入的属性表达式订阅getter，并将新值传递至回调

```javascript
import Dep from './observe/dep'
import { parsePath } from './utils/lang'

function noop() {}
export default class Watcher {
    constructor(m, expOrFn, cb) {
        Object.assign(this, {
            m,
            expOrFn,
            cb,
            depIds: new Set()
        })

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            this.getter = this.getter || noop
        }
        this.value = this.get()
    }

    addDep(dep) {
        if (!this.depIds.has(dep.id)) {
            this.depIds.add(dep.id)
            dep.addWatcher(this)
        }
    }

    update() {
        let oldValue
        const value = this.get()
        if (value !== this.value) {
            oldValue = this.value
            this.value = value
            this.cb.call(this.m, value, oldValue)
        }
    }
    get() {
        Dep.target = this
        const value = this.getter.call(this.m, this.m)
        Dep.target = null
        return value
    }
}
```

## [Compiler](./src/compile/index.js)

编译自定义模版文件至DOM结构，根据不同的节点类型，调用不同的Parser，最后将解析结果插入到实例元素中

```javascript
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
    }

    else if (isTextNode(node)) {
        parseTextNode(node, m)
    }
}
```

### [Parser](./src/compile/index.js)

不同的解析器调用不同的解析规则对节点的attributes进行解析，并根据解析结果调用相应的指令

```javascript
const attrRE = /^(bind|on):(\w+)$/
const textRE = /\{\{((?:.|\s)*?)\}\}/g

function parseElementNode(node, m) {
    const attrs = toArray(node.attributes), tokens = []
    let name, expValue, result

    attrs.forEach(attr => {
        name = attr.name
        expValue = attr.value
        if (result = attrRE.exec(name)) {
            directives[result[1]](node, m, result[2], expValue)
        }
    })
}

function parseTextNode(node, m) {
    let result
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
```



- https://github.com/Keyves/mvvm
- https://github.com/vuejs/vue
- https://www.kancloud.cn/zmwtp/vue2/149485
- http://jiongks.name/blog/vue-code-review/
