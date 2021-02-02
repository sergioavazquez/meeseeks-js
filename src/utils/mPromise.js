function mPromise(time, response, fail = false) {
  let res;
  const t = typeof time === 'number' ? time : 50;

  if (typeof response !== 'function') {
    const ans = !response ? t : response;
    res = () => ans;
  } else {
    res = response;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(res());
      }
      return resolve(res());
    }, t);
  });
}

module.exports.mPromise = mPromise;
