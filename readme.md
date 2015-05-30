# Angular HMR

A (very alpha version) Webpack loader for Hot Module Replacement in Angular applications.

This will only work in Ui Router at the moment with a specific app structure shown below. Will work on it a bit more over the week.

Throwing up a sample app up at https://github.com/yargalot/Angular-HMR-Example

## How it works
This will inject the new controller / template then reload the state in UI Router

Say your structure was all like

```
angular
  .module('app.components')
  .directive('sessionItem',function() {
    return {
        restrict : 'E',
        scope: {
            session: '='
        },
        bindToController: true,
        controllerAs: 'state',
        replace: true,
        controller: 'sessionItemCtrl',
        template: require('./template.html')
    };
  })
  .factory('TestFactory', function() {
    console.log('derp');
  })
  .controller('sessionItemCtrl', require('./sessionItemCtrl'));
```

and you save that the browser should refresh

### NOTE
This is pulled from https://github.com/jeroenverfallie/angular-hmr-loader and https://github.com/bitsoflove/jsconfbe-2015

Just more developing on top of that idea. Would feel bad for not mentioning that
