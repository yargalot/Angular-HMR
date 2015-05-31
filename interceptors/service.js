module.exports = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.factoryCache[name] = thing;

  console.log('FACTORY', name, thing);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.factory(name, function($injector) {

        console.log('Factory CACHE');
        console.log(_that.factoryCache[name], this);

        return $injector.invoke(_that.factoryCache[name], this, {});
    });
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
