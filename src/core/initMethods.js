export default function(m) {
    const methods = m.$options.methods
    let key
    if (methods) {
        for (key of Object.keys(methods)) {
            m[key] = methods[key].bind(m)
        }
    }
}
