const { debounce, mPromise, chain } = require('../../lib/meeseeks');

describe('debounce', ()=>{

  test('It should execute function just once', () => {
    return new Promise( done => {
      // test
      let flag = 0;
      const expected = 1;
      const fun = ()=>{flag += 1};
      const dFun = debounce(fun, 30);
      const stream = [
        mPromise(10, dFun),
        mPromise(20, dFun),
        mPromise(40, dFun),
        mPromise(50, dFun)
      ];
      chain(stream).then(()=>{
        setTimeout(()=>{
          expect(flag).toEqual(expected);
          done();
        }, 100)
      })
      // end test
    })
  });

  test('It should execute function 3 times', () => {
    return new Promise( done => {
      // test
      let flag = 0;
      const expected = 3;
      const fun = ()=>{flag += 1};
      const dFun = debounce(fun, 25);
      const stream = [
        mPromise(20, dFun),
        mPromise(30, dFun),
        mPromise(45, dFun),
        mPromise(50, dFun),
        mPromise(90, dFun),
        mPromise(120, dFun)
      ];
      chain(stream).then(()=>{
        setTimeout(()=>{
          expect(flag).toEqual(expected);
          done();
        }, 200)
      })
      // end test
    })
  });

  test('It should work with default value', () => {
    return new Promise( done => {
      // test
      let flag = 0;
      const expected = 1;
      const fun = ()=>{flag += 1};
      const dFun = debounce(fun);
      const stream = [
        mPromise(10, dFun),
        mPromise(20, dFun),
        mPromise(40, dFun),
        mPromise(50, dFun)
      ];
      chain(stream).then(()=>{
        setTimeout(()=>{
          expect(flag).toEqual(expected);
          done();
        }, 250)
      })
      // end test
    })
  });

  test('It should work with leading option', () => {
    return new Promise( done => {
      // test
      let flag = 0;
      const expected = 1;
      const fun = ()=>{flag += 1};
      const dFun = debounce(fun, 25,{leading: true});
      const stream = [
        mPromise(10, dFun),
        mPromise(20, dFun),
        mPromise(40, dFun),
        mPromise(50, dFun)
      ];
      chain(stream).then(()=>{
        setTimeout(()=>{
          // verify it executed leading edge
          expect(flag).toEqual(expected);
        }, 10);
        setTimeout(()=>{
          // Verify it was not executed again later
          expect(flag).toEqual(expected);
          done();
        }, 100)
      })
      // end test
    })
  });

  test('It should execute function 3 times with leading edge', () => {
    return new Promise( done => {
      // test
      let flag = 0;
      const expected = 3;
      const fun = ()=>{flag += 1};
      const dFun = debounce(fun, 25, {leading: true});
      const stream = [
        mPromise(20, dFun),
        mPromise(30, dFun),
        mPromise(45, dFun),
        mPromise(50, dFun),
        mPromise(90, dFun),
        mPromise(120, dFun)
      ];
      chain(stream).then(()=>{
        setTimeout(()=>{
          expect(flag).toEqual(expected);
          done();
        }, 10)
      })
      // end test
    })
  });

});