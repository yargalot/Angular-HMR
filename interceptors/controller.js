module.exports = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = thing;

  console.log('CONTROLLER', name, thing);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    console.log('Exists', this.MODULE_CACHE[name]);

    this.ANGULAR_MODULE.controller(name, function($injector, $scope) {

        // console.log('CONTROLLER CACHE');
        // console.log(_that.controllerCache[name], this);

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
