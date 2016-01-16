module.exports = function(name, controllerFunction) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = controllerFunction;

  console.log('CONTROLLER', name, controllerFunction);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    ///to fix stricti-mode $injector:strictdi
    this.ANGULAR_MODULE.controller(name,['$injector', '$scope', function($injector, $scope) {
        return $injector.invoke(_that.controllerCache[name], this, {
            '$scope': $scope
        });
    }]);
  }

  if (exists) {
    this.reloadState();
  }

  return this;

};
