function debounce(fn, interval, { leading } = {}) {
  let timeout;
  let leadExecuted = false;
  const timer = typeof interval === 'number' ? interval : 200;
  const lead = typeof leading === 'boolean' ? leading : false;
  return (...args) => {
    const context = this;
    const postponed = () => {
      timeout = null;
      if (lead) {
        leadExecuted = false;
      } else {
        fn.apply(context, args);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(postponed, timer);
    if (lead && !leadExecuted) {
      leadExecuted = true;
      fn.apply(context, args);
    }
  };
}

module.exports.debounce = debounce;
