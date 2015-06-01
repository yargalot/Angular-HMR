module.exports = function(moduleName, injectorArray) {
  this.ANGULAR_MODULE = angular.module(moduleName, injectorArray);

  if (!this.cache[moduleName]) {
      this.cache[moduleName] = {};
  } else {
      this.cache[moduleName] = this.cache[moduleName];
  }

  this.MODULE_CACHE = this.cache[moduleName];

  this.name = this.ANGULAR_MODULE.name;

  return this;
};
