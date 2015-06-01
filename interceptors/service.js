module.exports = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.serviceCache[name] = thing;

  console.log('SERVICE', name, thing);

  var intercept = function($provide) {
    $provide.decorator(name, function($delegate) {

      $delegate.updateService = function() {
        // Lets see if we can pull in the values from the update
      };

      return $delegate;
    });
  };

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.service(name, thing);
    this.ANGULAR_MODULE.config(intercept);
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
