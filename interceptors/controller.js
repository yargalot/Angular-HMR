module.exports = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = thing;

  console.log('CONTROLLER', name, thing);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    this.ANGULAR_MODULE.controller(name, function($injector, $scope) {
        return $injector.invoke(_that.controllerCache[name], this, {
            '$scope': $scope
        });
    });
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
