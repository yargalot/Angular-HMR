module.exports = function(name, constant) {

  if (!this.constantCache) {
    this.constantCache = {};
  }

  var exists = this.constantCache[name];

  this.constantCache[name] = constant;

  if (!exists) {
    this.ANGULAR_MODULE.constant(name, this.constantCache[name]);
  }

  if (exists) {
    this.constantInject = this.constantCache[name];

    this.bootstrapElement.injector().invoke([name, function(constant) {
      console.log(constant, this.constantInject);
      constant = this.constantInject;
      this.reloadState();
    }], this);
  }

  return this;

};
