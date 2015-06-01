
/* Angular Hor Module Replacement */
var HotAngular = function() {
  this.ANGULAR_MODULE;
  this.MODULE_CACHE;

  this.cache = {};
  this.configCache = {};
  this.factoryCache = {};
  this.serviceCache = {};
  this.templateCache = {};
  this.controllerCache = {};
};

// Angular functions to replace
HotAngular.prototype.run = require('./interceptors/run');
HotAngular.prototype.module = require('./interceptors/module');
HotAngular.prototype.config = require('./interceptors/config');
HotAngular.prototype.factory = require('./interceptors/factory');
HotAngular.prototype.service = require('./interceptors/service');
HotAngular.prototype.directive = require('./interceptors/directive');
HotAngular.prototype.controller = require('./interceptors/controller');

HotAngular.prototype.reloadState = function() {
  var elm = angular.element(document.querySelector('[ng-app]'));
  if (elm) {
      if (elm.injector().has('$state')) {
          console.log('Reloading State');
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
};

module.exports = new HotAngular();
