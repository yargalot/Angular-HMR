module.exports = function(moduleName, injectorArray) {

  if (injectorArray) {
    injectorArray.push(require('../module').name)
    this.ANGULAR_MODULE = angular.module(moduleName, injectorArray);
  } else {
    angular.module(moduleName)
  }

  this.cache[moduleName] = this.cache[moduleName] || {};
  this.MODULE_CACHE = this.cache[moduleName];

  this.name = this.ANGULAR_MODULE.name;

  var element = document.querySelector('[ng-app]');
  this.bootstrapElement = angular.element(element);

  return this;
};
