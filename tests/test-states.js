angular.module('test-states', [
    'ui.router',
    'ui-router-errors'
])
    .config(['$stateProvider', '$qProvider', '$errorsProvider', '$urlRouterProvider', function ($stateProvider, $qProvider, $errorsProvider, $urlRouterProvider) {
        // Angular 1.6 unhandled rejections bs
        // This is to suppres angular errors on unhandled errors
        $qProvider.errorOnUnhandledRejections(false);

        // Set error state
        // $errorsProvider.setDefaults({
        //     state: 'error'
        // });
        // $urlRouterProvider.otherwise(function ($injector, $location) {
        //     var url = $location.url(), 
        //     $rootScope = $injector.get('$rootScope'),
        //     $errors = $injector.get('$errors');
        //     console.log($injector.get('$state').current);
        //     console.log(url, 'This is a url');
        //     console.log('url was not found');
        //     console.log($errors.getState());
        //     $rootScope.$emit('$urlNotFound', 'Url not found');
        //     return url;
        // });
        // Sample states
        $stateProvider
            .state({
                name: 'main',
                url: '/main',
                params: {
                    param1: false
                }
            })
            .state({
                name: 'errors',
                template: 'Error page',
                // url: '*path'
            })
            .state({
                name: '500',
                url: '/500',
                resolve: {
                    error: function(){
                        throw 'I\ll cause an error';
                    }
                }
            });
    }]);