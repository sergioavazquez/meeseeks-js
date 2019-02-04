class Store {
  constructor() {
    this.storage = {};
  }

  getByKey(key) {
    let result;
    // eslint-disable-next-line
    result = this.storage[key];
    if (!result) {
      console.error(`Unable to get [${key}] from store.`);
    }
    return result;
  }

  setByKey(key, value) {
    if (!key || !value) {
      console.error('store:', 'Key or value not set.');
      return;
    }
    // eslint-disable-next-line
    this.storage[key] = value;
  }

  clear() {
    this.storage = {};
  }
}

module.exports.Store = Store;
