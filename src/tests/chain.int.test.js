const { chain } = require('../../lib/meeseeks');

const tPromise = (time, fail = false)=>{
	return new Promise((resolve, reject) =>{
		setTimeout(()=>{
      if(fail){
        reject('fail');
      }
      resolve(time);
    }, time);
  })
}

describe('chain', ()=>{

  test('Should resolve promises in order.', () => {
    return new Promise( done => {
      // test
      const tasks = [tPromise(150), tPromise(700), tPromise(100), tPromise(50)];
      const expected = [150, 700, 100, 50];
      chain(tasks).then(result => {
        expect(result).toEqual(expected);
        done();
      });
      // end test
    })
  })

  test('Should fail if one promise fails.', () => {
    return new Promise( done => {
      // test
      const tasks = [tPromise(150), tPromise(300, true), tPromise(500)];
      chain(tasks).then(result => {
        // not executed
      }).catch(e => {
        expect(e).toEqual('fail');
        done();
      });
      // end test
    })
  })

});
