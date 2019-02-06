const { to } = require('../../lib/meeseeks');

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

describe('to', ()=>{

  test('Should resolve promise succesfully.', () => {
    return new Promise( done => {
      // test
      const expected = [null, 50];
      to(tPromise(50)).then((result)=>{
        expect(result).toEqual(expected);
        done();
      })
      // end test
    })
  })

  test('Should fail and throw error', () => {
    return new Promise( done => {
      // test
      const expected = ['fail'];
      to(tPromise(50, true)).then((result)=>{
        expect(result).toEqual(expected);
        done();
      })
      // end test
    })
  })
});