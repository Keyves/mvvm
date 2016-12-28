import observe from '../observe'

export default function initState(m) {
	var opts = m._opts
	initData(m, opts.data)
}

function initData(m, data) {
	observe(data)
	proxy(m, m._data)
}

function proxy(target, source) {
	Object.keys(source).forEach(key => {
		Object.defineProperty(target, key, {
			enumerable: true,
			configurable: true,
			get() {
				return source[key]
			},
			set(newValue) {
				console.log(source)
				source[key] = newValue
			}
		})
	})
}
