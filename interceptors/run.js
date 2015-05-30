module.exports = function(thing) {

  console.log('RUN', thing);

  this.ANGULAR_MODULE.run(thing);

  return this;
};
