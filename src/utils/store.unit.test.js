const { Store } = require('./store');

describe('Store', () => {
  let store;

  test('Should instantiate a store', ()=>{
    store = new Store();
    expect(store.storage).toEqual({});
  });

  test('Should store and retrieve a value', () => {
    store.setByKey('key', 'this value');
    expect(store.getByKey('key')).toEqual('this value');
  });

  test('Should clear storage', () => {
    store.clear();
    expect(store.getByKey('key')).toBe(undefined);
  });

  test('Should fail to set value', () => {
    expect(store.setByKey(1)).toBe(undefined);
  });


});
