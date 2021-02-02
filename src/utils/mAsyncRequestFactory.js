const { mPromise } = require('./mPromise');

const mAsyncRequestFactory = (
  onSuccess = 'success response',
  onFailure = 'error response',
  countdownToSuccess = 0,
  waitTime = 200
) => {
  let reminderTries = countdownToSuccess;
  return () => {
    reminderTries -= 1;
    if (reminderTries + 1 > 0) {
      return mPromise(waitTime, onFailure, true);
    }
    return mPromise(waitTime, onSuccess);
  };
};

module.exports.mAsyncRequestFactory = mAsyncRequestFactory;
