module.exports = function(identifier) {
  this.ANGULAR_MODULE = angular.module(identifier);

  if (!this.cache[identifier]) {
      this.cache[identifier] = {};
  } else {
      this.cache[identifier] = this.cache[identifier];
  }

  this.MODULE_CACHE = this.cache[identifier];

  return this;
};
