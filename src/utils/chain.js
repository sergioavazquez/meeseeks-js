function chain(promises) {
  return promises
    .reduce(
      (promiseChain, currentTask) =>
        promiseChain.then((chainResults) =>
          currentTask
            .then((currentResult) => [...chainResults, currentResult])
            .catch((e) => {
              throw e;
            })
        ),
      Promise.resolve([])
    )
    .then((arrayOfResults) => arrayOfResults);
}

module.exports.chain = chain;
