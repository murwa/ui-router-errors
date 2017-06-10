/**
 * UI-router error provider
 * @copyright @murwa 2017
 */

angular.module('ui-router-errors.provider', [
    'ui.router',
    'ui-router-errors.controller'
])
    .provider('$errors', [function () {
        // Define defaults
        var defaults = {
            icons: {
                404: 'icon-404-2',
                403: 'icon-404-2',
                500: 'icon-404-2'
            },
            messages: {
                404: 'Sorry, but we cannot find what you were looking for',
                403: 'You do not have permission to access this page',
                500: 'Oops! Something went wrong...'
            },
            state: {
                name: 'errors',
                templateUrl: '/partials/errors/main',
                url: '*path',
                controller: 'ErrorsController as $ctrl'
            }
        };
        return {
            // For optional use in config phase
            setDefaults: function (values) {
                if (angular.isObject(values)) {
                    angular.extend(defaults, values);
                    return this;
                }

                throw 'Defaults must be an object';
            },
            $get: function () {
                return {
                    /**
                     * Get the error details
                     *
                     * @return {string}
                     */
                    getState: function () {
                        return defaults.state;
                    },
                    /**
                     * Get the error icons
                     *
                     * @return {*}
                     */
                    getIcons: function () {
                        return defaults.icons;
                    },
                    /**
                     * Get the error messages
                     *
                     * @return {*}
                     */
                    getMessages: function () {
                        return defaults.messages;
                    }
                }
            }
        }
    }])
    .config(['$urlRouterProvider', '$stateProvider', '$errorsProvider', function($urlRouterProvider, $stateProvider, $errorsProvider){
        // Define error state
        $stateProvider.state($errorsProvider.$get().getState());
    }]);