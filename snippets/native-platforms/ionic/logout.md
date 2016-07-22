```js
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$state', 'auth', 'store'];

    function HomeController($state, auth, store) {
        var vm = this;

        vm.auth = auth;

        vm.login = login;
        vm.logout = logout;

        function login() {
            $state.go("login");
        }

        function logout() {
            auth.signout();

            store.remove('profile');
            store.remove('token');
            store.remove('accessToken');
            store.remove('refreshToken');
        }

    }

} ());
```