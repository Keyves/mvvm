import observe from '../observe'

export default function initState(m) {
	initData(m, m.$options.data)
}

function initData(m, data) {
	observe(data)
	proxy(m, data)
}

export function proxy(target, source) {
	Object.keys(source).forEach(key => {
		Object.defineProperty(target, key, {
			enumerable: true,
			configurable: true,
			get() {
				return source[key]
			},
			set(newValue) {
				source[key] = newValue
			}
		})
	})
}
