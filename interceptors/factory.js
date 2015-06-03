module.exports = function(name, factoryFunction) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.factoryCache[name] = factoryFunction;

  console.log('FACTORY', name, factoryFunction);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.factory(name, factoryFunction);
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
