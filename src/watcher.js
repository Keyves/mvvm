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
