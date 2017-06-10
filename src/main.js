/**
 * UI-router error provider
 * @copyright @murwa 2017
 */

angular.module('ui-router-errors', [
    'ui.router'
])
    .provider('$errors', [function ErrorsProvider() {
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
            state: 'errors'
        };
        // For optional use in config phase
        this.setDefaults = function (values) {
            if (angular.isObject(values)) {
                angular.extend(defaults, values);
                return this;
            }

            throw 'Defaults must be an object';
        }
        this.$get = [function () {
            return new ErrorService(defaults);
        }];

        /**
         * Error service
         * 
         * @param {*} config 
         */
        function ErrorService(config) {
            // Init
            var self = this,
                code = null,
                title = null,
                icon = null,
                message = null,
                error = {};
            /**
             * Get the error code
             *
             * @return {*|number}
             */
            self.getCode = function () {
                return code || 404;
            }
            /**
             * Set error code
             *
             * @param value
             * @return {self}
             */
            self.setCode = function (value) {
                code = value
                return self;
            }
            /**
             * Get error title
             *
             * @return {string}
             */
            self.getTitle = function () {
                return title || 'Error'
            }
            /**
             * Set error title
             *
             * @param value
             * @return {self}
             */
            self.setTitle = function (value) {
                title = value;
                return self;
            }

            /**
             * Get error icon
             *
             * @return {string}
             */
            self.getIcon = function () {
                return icon || self.getIcons(self.getCode());
            }

            /**
             * Set error icon
             *
             * @param value
             * @return {self}
             */
            self.setIcon = function (value) {
                icon = value;
                return self;
            }

            /**
             * Get message
             *
             * @return {string}
             */
            self.getMessage = function () {
                return message || self.getMessages(self.getCode()) || 'An error occurred';
            }

            /**
             * Set error mssage
             *
             * @param value
             * @return {self}
             */
            self.setMessage = function (value) {
                message = value;
                return self;
            }

            /**
             * State
             * @return {string}
             */
            self.getState = function () {
                return config.state;
            }
            /**
             * Get the error icons
             *
             * @return {*}
             */
            self.getIcons = function (key) {
                var icons = config.icons;
                return icons && key ? icons[key] : icons;
            }
            /**
             * Get the error messages
             *
             * @return {*}
             */
            self.getMessages = function (key) {
                var messages = config.messages;
                return messages && key ? messages[key] : messages;
            }

            /**
             * Set error
             * @param {*} value
             * @return {*}
             */
            self.setError = function (value) {
                error = value;
                return self;
            }
            /**
             * Get error
             * @return {*}
             */
            self.getError = function () {
                return error;
            }
        }
    }])
    .run(['$rootScope', '$errors', '$state', function ($rootScope, $errors, $state) {
        var errorState = $errors.getState();
        // Surely 404
        $rootScope.$on('$stateNotFound', function () {
            console.log('State not found')
            $errors.setError(arguments[5]).setCode(500);
            return $state.transitionTo(errorState);
        });
        // Something went wrong when loading
        $rootScope.$on('$stateChangeError', function () {
            console.log('State change error');
            $errors.setError(arguments[5]).setCode(500);
            return $state.transitionTo(errorState);
        });
    }]);