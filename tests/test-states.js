angular.module('test-states', [
    'ui.router',
    'ui-router-errors'
])
    .config(['$stateProvider', '$qProvider', '$errorsProvider', function ($stateProvider, $qProvider, $errorsProvider) {
        // Angular 1.6 unhandled rejections bs
        // This is to suppres angular errors on unhandled errors
        $qProvider.errorOnUnhandledRejections(false);

        // Set error state
        $errorsProvider.setDefaults({
            state: 'errors'
        });
        // Sample states
        $stateProvider
            .state({
                name: 'main',
                params: {
                    param1: false
                }
            })
            .state({
                name: '500',
                resolve: {
                    error: function(){
                        throw 'I\ll cause an error';
                    }
                }
            })
            .state({
                name: 'errors',
                template: 'Error page',
                url: '*path'
            });
    }]);