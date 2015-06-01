module.exports = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.serviceCache[name] = thing;

  console.log('SERVICE', name, thing);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.service(name, function($injector) {
      console.log('FIRE');
      return $injector.invoke(_that.serviceCache[name]);
    });
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
