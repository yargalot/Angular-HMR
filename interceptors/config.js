module.exports = function(thing) {

  var _that = this;
  var name;

  var functionString = thing.toString();

  functionString.replace(/var configName = [\'\"]([\w]+).+?(?=;)/g, function(match, contents) {
    name = contents || new Date.getSeconds();
  });

  var exists = this.configCache[name];

  console.log('CONFIG', thing);

  this.configCache[name] = thing;

  if (!exists) {
    this.ANGULAR_MODULE.config(function($injector) {

        console.log('CONFIG Reloading');
        //console.log(_that.configCache[name].toString());

        return $injector.invoke(_that.configCache[name], this);
    });

    var configLength = this.ANGULAR_MODULE._configBlocks.length;

    this.ANGULAR_MODULE._configBlocks[configLength -1].AngId = name;
  }

  if (exists) {
    this.reloadState();
  }

  console.log(this.ANGULAR_MODULE._configBlocks);

  return this;
};
