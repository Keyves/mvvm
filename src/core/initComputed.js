function noop() {}

export default function(m) {
    const computed = m.$options.computed
    let key, userDef, def

    for (key of Object.keys(computed)) {
        userDef = computed[key]
        def = {
            enumerable: true,
            configurable: true
        }
        if (typeof userDef === 'function') {
            def.get = userDef.bind(m)
            def.set = noop
        } else {
            def.get = userDef.get
                ? userDef.get.bind(m)
                : noop
            def.set = userDef.set
                ? userDef.set.bind(m)
                : noop
        }
        Object.defineProperty(m, key, def)
    }
}
