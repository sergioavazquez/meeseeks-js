require("regenerator-runtime/runtime");
const { mAsyncRequestFactory } = require("../../lib/meeseeks");

describe('mAsyncRequestFactory', ()=>{

  test('Should work without failing', async () => {
    const countdownToSuccess = 0;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    let result = await mockedAR();
    expect(result).toEqual(onSuccess);
  });

  test('Should work without failing by default', async () => {
    const onSuccess = 'success response'; // Default
    const mockedAR = mAsyncRequestFactory();

    let result = await mockedAR();
    expect(result).toEqual(onSuccess);
  });

  test('Should fail', async () => {
    const countdownToSuccess = 1;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    let result = onSuccess;
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    try{
      await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onFailure);
  });

  test('Should work without failing with success function', async () => {
    const countdownToSuccess = 0;
    const onSuccess = ()=>'ok';
    const onFailure = ()=>'failed';
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    let result = await mockedAR();
    expect(result).toEqual(onSuccess());
  });

  test('Should fail with fail funtion', async () => {
    const countdownToSuccess = 1;
    const onSuccess = ()=>'ok';
    const onFailure = ()=>'failed';
    let result = onSuccess;
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    try{
      await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onFailure());
  });

  test('Should fail once then succeed', async () => {
    const countdownToSuccess = 1;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    let result = onSuccess;
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    try{
      await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onFailure);

    try{
      result = await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onSuccess);
  });

  test('Should fail twice and succeed', async () => {
    const countdownToSuccess = 2;
    const onSuccess = 'onSuccess';
    const onFailure = 'onFailure';
    let result = onSuccess;
    const mockedAR = mAsyncRequestFactory(onSuccess, onFailure, countdownToSuccess);

    try{
      await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onFailure);

    try{
      await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onFailure);

    try{
      result = await mockedAR();
    }catch(e){
      result = e;
    }
    expect(result).toEqual(onSuccess);
  });
})