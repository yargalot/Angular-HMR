module.exports = function(name, thing) {

  console.log('FACTORY', name, thing);

  this.ANGULAR_MODULE.factory(name, thing);

  return this;

};
