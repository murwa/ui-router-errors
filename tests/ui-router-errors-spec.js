describe('ui-router-errors module', function () {
    var $state, $rootScope, $errors, $location;
    beforeEach(module('test-states'));
    beforeEach(inject(function (_$state_, _$rootScope_, _$errors_, _$location_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $errors = _$errors_;
        $location = _$location_;
    }));

    describe('ui-router $onStateChangeError', function () {
        it('should show error state content when a state error occurs', function () {
            $state.go('500');
            $rootScope.$digest();
            expect($state.current.name).not.toEqual('500');
            expect($state.current.name).toEqual($errors.getState())
        });
        it('should not change the url when the error happens', function () {
            var url = $location.url();
            $state.go('500');
            $rootScope.$digest();
            expect($location.url()).not.toBe('/500');
            expect($location.url()).toBe(url);
        });
        it('should show error state content when a state is not found', function () {
            try {
                $state.go('non-existent');
            } catch (error) {
                // Shhh....
            }
            $rootScope.$digest();
            expect($state.current.name).toEqual($errors.getState())
        });
        it('should show error state content when a url is not matched', function () {
            $location.path('/non-existent')
            $rootScope.$digest();
            expect($state.current.name).toEqual($errors.getState())
        });
    });
});
