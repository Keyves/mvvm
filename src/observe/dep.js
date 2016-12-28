class Dep {
	constructor() {
		this.watchers = []
	}

	addWatcher(watcher) {
		this.watchers.push(watcher)
	}

	notify() {
		this.watchers.forEach(watcher => {
			watcher.update()
		})
	}
}

Dep.target = null
export default Dep
