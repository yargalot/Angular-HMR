module.exports = function(name, serviceFunction) {

  var exists = this.MODULE_CACHE[name];
  this.serviceCache[name] = serviceFunction;

  console.log('SERVICE', name, serviceFunction);

  var intercept = function($provide) {
    $provide.decorator(name, function($delegate) {
      return $delegate;
    });
  };

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.service(name, this.serviceCache[name]);
    this.ANGULAR_MODULE.config(intercept);
  }

  if (exists) {
    this.serviceInject = serviceFunction;

    this.bootstrapElement.injector().invoke([name, function(service) {
      service = this.serviceInject;
    }], this);

    this.reloadState();
  }

  return this;

};
