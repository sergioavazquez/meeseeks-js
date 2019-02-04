function chain(promises) {
  return promises
    .reduce((promiseChain, currentTask) => {
      return promiseChain.then(chainResults =>
        currentTask
          .then(currentResult => [...chainResults, currentResult])
          .catch(e => {
            throw e;
          })
      );
    }, Promise.resolve([]))
    .then(arrayOfResults => {
      return arrayOfResults;
    });
}

module.exports.chain = chain;
