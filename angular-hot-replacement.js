
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

  this.name;
  this.bootstrapElement;
  ///fix the position of the script, could be before ng-app, so wait to window.load
	window.onload = function() {
		this.element = document.querySelector('[ng-app]');
		this.originalContent = this.element.innerHTML;
	}
};

// Angular functions to replace
HotAngular.prototype.run = require('./interceptors/run');
HotAngular.prototype.value = require('./interceptors/value');
HotAngular.prototype.module = require('./interceptors/module');
HotAngular.prototype.config = require('./interceptors/config');
HotAngular.prototype.filter = require('./interceptors/filter');
HotAngular.prototype.factory = require('./interceptors/factory');
HotAngular.prototype.service = require('./interceptors/service');
HotAngular.prototype.constant = require('./interceptors/constant');
HotAngular.prototype.provider = require('./interceptors/provider');
HotAngular.prototype.animation = require('./interceptors/animation');
HotAngular.prototype.directive = require('./interceptors/directive');
HotAngular.prototype.controller = require('./interceptors/controller');


HotAngular.prototype.reloadState = function() {
  var elm = this.bootstrapElement;

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

HotAngular.prototype.recompile = function() {
  var elm = this.bootstrapElement;

  console.log('Recompile App');

  //elm.injector().get('$compile')(this.originalContent)(elm.scope());

  window.location.reload();
};


HotAngular.prototype.test = function(webpackModule) {

  console.log(webpackModule);

  this.webpackModule = webpackModule;

  return this;
}

module.exports = new HotAngular();
