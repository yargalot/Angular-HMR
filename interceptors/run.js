module.exports = function(runFunction) {

  console.log('RUN', runFunction);

  this.ANGULAR_MODULE.run(runFunction);

  return this;
};
