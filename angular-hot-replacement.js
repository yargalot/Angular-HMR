var ANGULAR_MODULE;
var MODULE_CACHE;
var COMPILEPROVIDER;

var _cache = {};
var templateCache = {};
var controllerCache = {};

var transform = function(n, obj) {

    if (obj.template) {
        obj.template = function() {
            console.info('TEMPLATE CACHE REFRESH');
            return templateCache[n];
        };
    }

    // console.log('TypeOf function', typeof obj.controller === 'function')
    if (obj.controller && typeof obj.controller === 'function') {
        obj.controller = function($injector, $scope) {
            return $injector.invoke(controllerCache[n], this, {
                '$scope': $scope
            });
        };
    }

    return obj;
};

function reloadState() {
  var elm = angular.element(document.querySelector('[ng-app]'));
  if (elm) {
      if (elm.injector().has('$state')) {
          var $state = elm.injector().get('$state');

          $state.transitionTo($state.current, $state.params, {
              reload: true,
              inherit: false,
              notify: true
          });
      } else {
          elm.injector().get('$compile')(elm.contents())(elm.scope());
      }
  }
}



var HotAngular = function() {

};

HotAngular.prototype.directive = function(name, d) {
    var obj = d();
    var exists = MODULE_CACHE[name];

    console.log('DIRECTIVE', name, obj);

    var changes = false;

    changes = changes || JSON.stringify(obj.template) != JSON.stringify(templateCache[name]);
    if (obj.template) {
        templateCache[name] = obj.template;
    }

    changes = changes || obj.controller + '' != controllerCache[name] + '';
    if (obj.controller) {
        controllerCache[name] = obj.controller;
    }

    if (changes && exists) {
      reloadState();
    }

    if (!exists) {

        ANGULAR_MODULE.directive(name, function() {
            return transform(name, obj);
        });

        MODULE_CACHE[name] = true;

    }

    return this;
};


HotAngular.prototype.controller = function(name, thing) {

  var exists = MODULE_CACHE[name];
  controllerCache[name] = thing;

  console.log('CONTROLLER', name, thing);

  if (!exists) {
    MODULE_CACHE[name] = true;
    console.log('Exists', MODULE_CACHE[name]);

    ANGULAR_MODULE.controller(name, function($injector, $scope) {

        console.log('CONTROLLER CACHE');
        console.log(controllerCache[name], this);

        return $injector.invoke(controllerCache[name], this, {
            '$scope': $scope
        });
    });
  }

  if (exists) {
    reloadState();
  }

  return this;

};

HotAngular.prototype.factory = function(name, thing) {

  console.log('FACTORY', name, thing);

  ANGULAR_MODULE.factory(name, thing);

  return this;

};

HotAngular.prototype.config = function(thing) {

  console.log('CONFIG', thing);

  ANGULAR_MODULE.config(thing);

  return this;
};

HotAngular.prototype.module = function(identifier) {
  ANGULAR_MODULE = angular.module(identifier);

  if (!_cache[identifier]) {
      _cache[identifier] = {};
  } else {
      _cache[identifier] = _cache[identifier];
  }

  MODULE_CACHE = _cache[identifier];

  return this;
};

module.exports = (function() {
  return new HotAngular;
})();
