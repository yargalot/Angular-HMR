var path = require('path'),
    SourceNode = require('source-map').SourceNode,
    SourceMapConsumer = require('source-map').SourceMapConsumer,
    makeIdentitySourceMap = require('./makeIdentitySourceMap');


var ANGULAR_DIRECTIVE_RE = /angular\.module\(([\"\'\w\.\-]+)\)/g;

module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (!source.match(ANGULAR_DIRECTIVE_RE)) {
    return this.callback(null, source, map);
  }

  console.log('[AMR] Replacement Matched');

  var resourcePath = this.resourcePath,
      filename = path.basename(resourcePath),
      separator = '\n\n',
      prependText,
      processedSource,
      node,
      result;

  prependText = [
    'module.hot.accept();',
    'var hotAngular = require(' + JSON.stringify(require.resolve('./angular-hot-replacement')) + ');'
  ].join(' ');

  var appendText = [
    //'module.hot.dispose(function(data) {console.log(\'[SBOS] Reloaded\')})'
  ].join(' ');

  processedSource = source.replace(ANGULAR_DIRECTIVE_RE, 'hotAngular.module($1)');

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
