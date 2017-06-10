angular.module('test-states', [
    'ui.router'
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state({
                name: 'main',
                params: {
                    param1: false
                }
            });
    }]);