module.exports = function(name, value) {

  if (!this.valueCache) {
    this.valueCache = {};
  }

  var exists = this.valueCache[name];

  this.valueCache[name] = value;

  if (!exists) {
    this.ANGULAR_MODULE.value(name, this.valueCache[name]);
  }

  if (exists) {
    this.valueInject = this.valueCache[name];

    this.bootstrapElement.injector().invoke([name, function(value) {
      console.log(value, this.valueInject);
      value = this.valueInject;
      this.reloadState();
    }], this);
  }

  return this;

};
