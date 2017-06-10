/**
 * Created by mxgel on 6/10/2017
 */
angular.module('ikoaje.common.errors.main', [])
    .component('ikoajeErrorHandler', {
        template: '<ng-include ng-if="$ctrl.getShow()" src="\'/partials/errors/main\'"></ng-include>',
        controller: 'ErrorHandlerController',
        bindings: {
            //
        }
    })
    .controller('ErrorHandlerController', ['ErrorService', '$rootScope', 'MetadataService', function (ErrorService, $rootScope, MetadataService) {
        // Init
        var self = this;

        // Mixin Service
        angular.extend(self, ErrorService);

        // Make sure we no displaying when page is loading
        $rootScope.$on('$stateChangeStart', function () {
            self.setShow(false);
        });
        // Surely 404
        $rootScope.$on('$stateNotFound', function () {
            ErrorService.setShow(true).setTitle('404').setCode(404);
            return MetadataService.set({title: self.getTitle(), description: self.getMessage()});
        })
        // Something went wrong when loading
        $rootScope.$on('$stateChangeError', function () {
            console.log(arguments);
            self.setShow(true).setCode(500);
            MetadataService.set({title: self.getTitle(), description: self.getMessage()});
        })
    }])
    .service('ErrorService', [function () {
        // Init
        var self = this,
            code = null,
            title = null,
            icon = null,
            message = null,
            show = false,
            icons = {
                404: 'icon-404-2',
                403: 'icon-404-2',
                500: 'icon-404-2'
            },
            messages = {
                404: 'Sorry, but we cannot find what you were looking for',
                403: 'You do not have permission to access this page',
                500: 'Oops! Something went wrong...'
            };

        /**
         * Show?
         *
         * @return {boolean}
         */
        self.getShow = function () {
            return show;
        }

        /**
         * Change visibility
         *
         * @param value
         * @return {self}
         */
        self.setShow = function (value) {
            show = !!value;
            return self;
        }

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
         * @return {*|string}
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
         * @return {*|string}
         */
        self.getIcon = function () {
            return icon || icons[self.getCode()] || 'icon-404-2';
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
         * @return {*}
         */
        self.getMessage = function () {
            return message || messages[self.getCode()] || 'An error occurred';
        }
    }]);