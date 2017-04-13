const slice = Array.prototype.slice

export function toArray(arr) {
    return slice.call(arr)
}
