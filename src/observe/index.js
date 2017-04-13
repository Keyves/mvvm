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
