module.exports = function(thing) {

  console.log('CONFIG', thing);

  this.ANGULAR_MODULE.config(thing);

  return this;
};
