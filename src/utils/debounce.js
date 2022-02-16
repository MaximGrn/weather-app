const debounce = function (f, ms) {
  let cooldown;

  return function (...args) {
    clearTimeout(cooldown);
    cooldown = setTimeout(() => { f.call(this, ...args); }, ms);
  };
};

export default debounce;
