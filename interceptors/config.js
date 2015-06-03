module.exports = function(configFunction) {

  var _that = this;
  var name;

  var functionString = configFunction.toString();

  functionString.replace(/var configName = [\'\"]([\w]+).+?(?=;)/g, function(match, contents) {
    name = contents;
  });

  var exists = this.configCache[name];

  console.log('CONFIG', configFunction);

  this.configCache[name] = configFunction;

  if (!exists) {
    this.ANGULAR_MODULE.config(function($injector) {
        return $injector.invoke(_that.configCache[name], this);
    });
  }

  if (exists) {
    this.reloadState();
  }

  return this;
};
