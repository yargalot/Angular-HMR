module.exports = function(configFunction) {

  var _that = this;
  var name;

  console.log('CONFIG', configFunction);

  this.ANGULAR_MODULE.config(configFunction);

  return this;
};
