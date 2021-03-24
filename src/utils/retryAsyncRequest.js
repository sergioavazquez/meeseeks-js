const { mPromise } = require('./mPromise');

const retryAsyncRequest = async (
  fn,
  maxAttempts,
  options = { backoff: 2000, backoffPower: 1.25 }
) => {
  const execute = async (attempt) => {
    try {
      return await fn();
    } catch (err) {
      if (attempt <= maxAttempts) {
        const nextAttempt = attempt + 1;
        const delayInSeconds = Math.round(
          (options.backoff * nextAttempt ** options.backoffPower) / 1000
        );
        console.warn(`Retrying after ${delayInSeconds} seconds due to:`, err);
        return mPromise(delayInSeconds * 1000, () => execute(nextAttempt));
      }
      throw err;
    }
  };
  return execute(1);
};

module.exports.retryAsyncRequest = retryAsyncRequest;
