/**
 * Created by @murwa on 5/10/2017
 * 
 * @copyright @murwa
 */
angular.module('ui-router-errors.controller', [
    'ui-router-errors.service'
])
.controller('ErrorsController', ['ErrorService', function(ErrorService){
    // Init
    var self = this;
    // Mixin service
    angular.extend(self, ErrorService);
}]);