
/* Angular Hor Module Replacement */
var HotAngular = function() {
  this.ANGULAR_MODULE;
  this.MODULE_CACHE;

  this.cache = {};
  this.templateCache = {};
  this.controllerCache = {};
};

HotAngular.prototype.reloadState = function() {
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

HotAngular.prototype.directive = function(name, d) {
    var obj = d();
    var exists = this.MODULE_CACHE[name];
    var _that = this;

    var transform = function(n, obj) {

        if (obj.template) {
            obj.template = function() {
                console.info('TEMPLATE CACHE REFRESH');
                return _that.templateCache[n];
            };
        }

        // console.log('TypeOf function', typeof obj.controller === 'function')
        if (obj.controller && typeof obj.controller === 'function') {
            obj.controller = function($injector, $scope) {
                return $injector.invoke(_that.controllerCache[n], this, {
                    '$scope': $scope
                });
            };
        }

        return obj;
    };

    console.log('DIRECTIVE', name, obj);

    var changes = false;

    changes = changes || JSON.stringify(obj.template) != JSON.stringify(this.templateCache[name]);
    if (obj.template) {
        this.templateCache[name] = obj.template;
    }

    changes = changes || obj.controller + '' != this.controllerCache[name] + '';
    if (obj.controller) {
        this.controllerCache[name] = obj.controller;
    }

    if (changes && exists) {
      this.reloadState();
    }

    if (!exists) {

        this.ANGULAR_MODULE.directive(name, function() {
            return transform(name, obj);
        });

        this.MODULE_CACHE[name] = true;

    }

    return this;
};


HotAngular.prototype.controller = function(name, thing) {

  var _that = this;
  var exists = this.MODULE_CACHE[name];
  this.controllerCache[name] = thing;

  console.log('CONTROLLER', name, thing);

  if (!exists) {
    this.MODULE_CACHE[name] = true;
    console.log('Exists', this.MODULE_CACHE[name]);

    this.ANGULAR_MODULE.controller(name, function($injector, $scope) {

        console.log('CONTROLLER CACHE');
        console.log(_that.controllerCache[name], this);

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

HotAngular.prototype.factory = function(name, thing) {

  console.log('FACTORY', name, thing);

  this.ANGULAR_MODULE.factory(name, thing);

  return this;

};

HotAngular.prototype.config = function(thing) {

  console.log('CONFIG', thing);

  this.ANGULAR_MODULE.config(thing);

  return this;
};

HotAngular.prototype.module = function(identifier) {
  this.ANGULAR_MODULE = angular.module(identifier);

  if (!this.cache[identifier]) {
      this.cache[identifier] = {};
  } else {
      this.cache[identifier] = this.cache[identifier];
  }

  this.MODULE_CACHE = this.cache[identifier];

  return this;
};

module.exports = new HotAngular();
