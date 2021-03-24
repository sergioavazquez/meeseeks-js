require("regenerator-runtime/runtime");
const { retryAsyncRequest } = require("./retryAsyncRequest");
const { mAsyncRequestFactory } = require("./mAsyncRequestFactory");

describe('retryAsyncRequest', ()=>{

  test('Should work at first attempt', async () => {
    const onSuccess = 'onSuccess';
    const mockedAR = mAsyncRequestFactory(onSuccess);

    let result = await retryAsyncRequest(mockedAR, 2);
    expect(result).toEqual(onSuccess);
  });


  test('Should succed on second attempt', async () => {
    const retries = 1;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, retries);
    const options = { backoff: 1000, backoffPower: 1 };
    let result;
    try{
      result = await retryAsyncRequest(mockedAR, 1, options);
    }catch(e){
      result = e;
    }

    expect(result).toEqual(onSuccess);
  });

  test('Should fail on second attempt', async () => {
    const retries = 2;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, retries);
    const options = { backoff: 100, backoffPower: 1 };
    let result;
    try{
      result = await retryAsyncRequest(mockedAR, 1, options);
    }catch(e){
      result = e;
    }

    expect(result).toEqual(onFailure);
  });

  test('Should fail on third attempt', async () => {
    const retries = 3;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, retries);
    const options = { backoff: 10, backoffPower: 1 };
    let result;
    try{
      result = await retryAsyncRequest(mockedAR, 2, options);
    }catch(e){
      result = e;
    }

    expect(result).toEqual(onFailure);
  });

  test('Should succeed on third attempt', async () => {
    const retries = 2;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, retries);
    const options = { backoff: 10, backoffPower: 1 };
    let result;
    try{
      result = await retryAsyncRequest(mockedAR, 2, options);
    }catch(e){
      result = e;
    }

    expect(result).toEqual(onSuccess);
  });

})