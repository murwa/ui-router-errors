/**
 * Created by @murwa on 5/10/2017
 * 
 * @copyright @murwa
 */
angular.module('ui-router-errors.service', [])
    .service('ErrorService', [function () {
        // Init
        var self = this,
            code = null,
            title = null,
            icon = null,
            message = null;
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
            return icon || 'icon-404-2';
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
            return message || 'An error occurred';
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
    }]);