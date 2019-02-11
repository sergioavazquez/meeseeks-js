const { Watchdog } = require('./watchdog');

describe('Watchdog', ()=>{

  test('should elapse time and call trigger function', ()=>{
    let flag = 'value';
    const expected = 'Updated';
    const triggerFcn = ()=>{flag = expected};
    const wd = new Watchdog(50, triggerFcn);
    wd.start();
    return new Promise( done => {
      // test
      setTimeout(()=>{
        console.log(flag, expected);
        expect(flag).toEqual(expected);
        done();
      }, 110)
      // end test
    })
  })

  test('should cancel watchdog before triggering it', ()=>{
    let flag = 'value';
    const expected = 'value';
    const triggerFcn = ()=>{flag = 'Updated'};
    const wd = new Watchdog(70, triggerFcn);
    wd.start();
    setTimeout(()=>{
      wd.cancel();
    }, 25)
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(flag).toEqual(expected);
        done();
      }, 100)
      // end test
    })
  })

  test('should set default values', ()=>{
    const wd = new Watchdog();
    expect(typeof wd.triggerFcn).toEqual('function');
    expect(typeof wd.timer).toEqual('number');
    wd.cancel();
  })

  test('should be able to extend timer by reseting', ()=>{
    let flag = 'value';
    const expected = 'value';
    const triggerFcn = ()=>{flag = 'Updated'};
    const wd = new Watchdog(70, triggerFcn);
    wd.start();
    setTimeout(()=>{
      wd.reset(200);
    }, 10)
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(flag).toEqual(expected);
        wd.cancel();
        done();
      }, 50)
      // end test
    })
  })

  test('reset timer should eventually be triggered', ()=>{
    let flag = 'value';
    const expected = 'Updated';
    const triggerFcn = ()=>{flag = expected};
    const wd = new Watchdog(70, triggerFcn);
    wd.start();
    setTimeout(()=>{
      wd.reset();
    }, 10)
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(flag).toEqual(expected);
        wd.cancel();
        done();
      }, 110)
      // end test
    })
  })

  test('if no triggerFcn is provided, it should not fail', ()=>{
    const wd = new Watchdog(50);
    wd.start();
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(wd.failed).toEqual(true);
        wd.cancel();
        done();
      }, 75)
      // end test
    })
  })

  test('should only be executed once if property once is true.', ()=>{
    let flag = 0;
    const expected = 1;
    const triggerFcn = ()=>{flag += 1};
    const wd = new Watchdog(10, triggerFcn, {once: true});
    wd.start();
    setTimeout(()=>{
      wd.reset(10);
    }, 20)
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(flag).toEqual(expected);
        expect(wd.triggerCount).toEqual(1);
        expect(wd.once).toEqual(true);
        wd.cancel();
        done();
      }, 110)
      // end test
    })
  })

  test('should be executed more than once if once is false.', ()=>{
    let flag = 0;
    const expected = 3;
    const triggerFcn = ()=>{flag += 1};
    const wd = new Watchdog(10, triggerFcn, {once: false});
    wd.start();
    setTimeout(()=>{
      wd.reset(10);
    }, 20)
    setTimeout(()=>{
      wd.reset(10);
    }, 50)
    return new Promise( done => {
      // test
      setTimeout(()=>{
        expect(flag).toEqual(expected);
        expect(wd.triggerCount).toEqual(3);
        expect(wd.once).toEqual(false);
        wd.cancel();
        done();
      }, 110)
      // end test
    })
  })
});