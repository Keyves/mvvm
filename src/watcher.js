import Dep from './observe/dep'

export default class Watcher {
	constructor(m, expOrFn, cb) {
		Object.assign(this, {
			m,
			expOrFn,
			cb
		})
		this.value = this.get()
	}
	update() {
        const value = this.get()
		if (value !== this.value) {
		    this.value = value
		    this.cb.call(this.m, value)
		}
	}
	get() {
		Dep.target = this
		const value = this.m._data[this.expOrFn]
		Dep.target = null
        return value
	}
}
