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
	let dep = new Dep()
		observe(value)
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get() {
			let target = Dep.target
			if (target) {
				dep.addWatcher(target)
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
