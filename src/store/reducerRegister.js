class ReducerRegistry {
  constructor() {
    this.reducers = {}
    this.emitChange = null
  }

  register(name, reducer) {
    this.reducers = {
      ...this.reducers,
      [name]: reducer,
    }
    if (this.emitChange) {
      this.emitChange(this.reducers)
    }
  }
  setChangeListener(listener) {
    this.emitChange = listener
  }
}

export default new ReducerRegistry()
