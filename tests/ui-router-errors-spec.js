describe('ui-router-errors module', function () {
    var $state, $rootScope, $errors, state;
    beforeEach(module('test-states'));
    beforeEach(inject(function (_$state_, _$rootScope_, _$errors_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $errors = _$errors_;
        state = $errors.getState();
    }));

    describe('ui-router $onStateChangeError', function () {
        it('should redirect to an error state when a state error occurs', function () {
            $state.go('500');
            $rootScope.$digest();
            expect($state.current.name).not.toEqual('500');
            expect($state.current.name).toEqual(state)
        });
    });
});
