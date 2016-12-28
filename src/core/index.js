import initState from './initState'
import Watcher from '../watcher'
import compile from '../compile'

export default class MVVM {
	constructor(opts) {
		this._data = opts.data
		this._opts = opts
		this.$el = document.querySelector(opts.selector)
		this.$fragment = null

		initState(this)
		compile(this, opts.template)
	}
	$watch(exp, cb) {
		return new Watcher(this, exp, cb)
	}
}
