const { mPromise } = require('./mPromise');

describe('mPromise', ()=>{

  test('Should resolve promise succesfully.', () => {
    return new Promise( done => {
      // test
      const expected = 100;
      mPromise(100).then((result)=>{
        expect(result).toEqual(expected);
        done();
      })
      // end test
    })
  });

  test('Should resolve default promise of 50ms.', () => {
    return new Promise( done => {
      // test
      const expected = 50;
      mPromise().then((result)=>{
        expect(result).toEqual(expected);
        done();
      })
      // end test
    })
  });

  test('Should resolve promise function', () => {
    return new Promise( done => {
      // test
      const expected = 'function result';
      const fun = ()=>{return expected};
      mPromise(25, fun).then((result)=>{
        expect(result).toEqual(expected);
        done();
      })
      // end test
    })
  });

  test('Should reject promise in 50ms.', () => {
    return new Promise( done => {
      // test
      const expected = 'fail';
      mPromise(50, 'fail', true).then(()=>{
        // should fail
      }).catch(e => {
        expect(e).toEqual(expected);
        done();
      })
      // end test
    })
  });

  test('Should reject promise with function', () => {
    return new Promise( done => {
      // test
      const expected = 'function failed result';
      const fun = ()=>{return expected};
      mPromise(20, fun, true).then(()=>{
        // should fail
      }).catch(e => {
        expect(e).toEqual(expected);
        done();
      })
      // end test
    })
  });
});