# Meeseeks-js
[![npm version](https://badge.fury.io/js/meeseeks-js.svg)](https://badge.fury.io/js/meeseeks-js)

[![Coverage Status](https://coveralls.io/repos/github/sergioavazquez/meeseeks-js/badge.svg?branch=master)](https://coveralls.io/github/sergioavazquez/meeseeks-js?branch=master)


Simple helper methods for `javaScript` projects.

## Installation

Using npm:
```
$ npm i --save meeseeks-js
```

In Node.js:

```
// Load entire build
const meeseeks = require('meeseeks-js');
// Load by method
const { to, mPromise } = require('meeseeks-js');
```

## to

`to` is used to simplify asynchronous requests.

Normally you would have to use a try/catch block to handle errors:

```
try{
  const result = await(asyncMethod());
}catch(err){
  return errorResponse('Method failed', err)
}
return successResponse(result);
```

Using `to` makes it more readable.

```
const { to } = require('meeseeks-js');

const [err, result] = await to(asyncMethod());
if (err) return errorResponse(err, 'An error occured...');

return successResponse(result);
```

## mPromise

`mPromise` stands for mock promise. Useful for testing asynchronus functions.

`mPromise(time, response, fail)`

- `time` < number > is the time in [ms] that the function will take to resolve or reject. (defaults to 50ms)

- `response` < string > or < function > to resolve/reject when time elapses. If not specified `time` will be resolved or `'fail'` will be used if rejected.

- `fail` < boolean > wether promise is resolved or rejected.


Successfully resolved promise:
```
  const { mPromise } = require('meeseeks-js');

  const expected = 100;
  const result = await mPromise(100);
  expect(result).toEqual(expected);
```

Rejected promise:
```
  const expected = 'rejected';

  mPromise(50, 'rejected', true).then(()=>{
    // should fail
  }).catch(error => {
    expect(error).toEqual(expected);
  })
```

## chain

`chain` resolves promises in a sequential order.

`chain(promises)`

- `promises` < promise array >

```
const expected = [150, 700, 100, 50];
const promises = [mPromise(150), mPromise(700), mPromise(100), mPromise(50)];
const result = await chain(promises);
expect(result).toEqual(expected);
```

## Store

`Store` is a helper method I use to share information accross integration tests. If set up as a sinlgeton it can share information across different files.

`Store` is a class that's why it starts with uppercase.

```
  const { Store } = require('meeseeks-js');
  const storage = new Store();
  const response = await logUserIn();
  storage.setByKey('token', extractToken(response));
```
...
```
 const response = await request(app)
      .get('/some/resource/')
      .set('Accept', 'application/json')
      .set('Authorization', storage.getByKey('token'))
```

It has three methods:

`setByKey(key, value)`
 - `key` < string >
 - `value` Anything.

`getByKey(key)` Gets stored value by key.

`clear()` Clears storage.

## Development

`clone or fork repository`
```
npm install

npm run test:unit // Runs unit tests and generates coverage report.
npm run test:int // Runs integration tests against built library.
npm run test:dev // Runs tests while allowing attaching an inspector for debugging.
npm run build // Compiles librabry.
npm run lint // Lints code.
```