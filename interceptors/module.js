module.exports = function(moduleName, injectorArray) {

  this.strapped = false;

  if (this.strapped) {
    return this;
  }

  if (injectorArray) {
    injectorArray.push(require('../module').name);
    this.ANGULAR_MODULE = angular.module(moduleName, injectorArray);
  } else {
    angular.module(moduleName);
  }

  console.log(this.webpackModule);

  this.cache[moduleName] = this.cache[moduleName] || {};
  this.MODULE_CACHE = this.cache[moduleName];

  this.name = this.ANGULAR_MODULE.name;

  var element = document.querySelector('[ng-app]');
  this.bootstrapElement = angular.element(element);

  this.strapped = true;

  return this;
};
