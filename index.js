var path = require('path'),
    SourceNode = require('source-map').SourceNode,
    SourceMapConsumer = require('source-map').SourceMapConsumer,
    makeIdentitySourceMap = require('./makeIdentitySourceMap');


var angularModule= /angular[\.\n ]+module\(([\'\"\w\.\/\(\)\n\-\,\[\] ]+)\)/g;

module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (!source.match(angularModule)) {
    return this.callback(null, source, map);
  }

  console.log('[AHMR] Replacement Matched');

  var separator = '\n\n';
  var prependText;
  var processedSource;
  var node;
  var result;

  prependText = [
    'module.hot.accept();',
    'var hotAngular = require(' + JSON.stringify(require.resolve('./angular-hot-replacement')) + ');'
  ].join(' ');

  var appendText = [
    //'module.hot.dispose(function(data) {console.log(\'[SBOS] Reloaded\')})'
  ].join(' ');

  processedSource = source.replace(angularModule, 'hotAngular.test(module).module($1)');

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependText,
      processedSource,
      appendText
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependText),
    SourceNode.fromStringWithSourceMap(processedSource, new SourceMapConsumer(map))
  ]).join(separator);

  result = node.toStringWithSourceMap();

  this.callback(null, result.code, result.map.toString());
};
