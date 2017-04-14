import initState from './initState'
import initComputed from './initComputed'
import initMethods from './initMethods'
import Watcher from '../watcher'
import compile from '../compile'

export default class MVVM {
    constructor(opts) {
        this._data = opts.data
        this.$options = opts
        this.$el = document.querySelector(opts.selector)
        this.$fragment = null

        initState(this)
        initComputed(this)
        initMethods(this)
        
        compile(this)
    }
    $watch(exp, cb) {
        return new Watcher(this, exp, cb)
    }
}
