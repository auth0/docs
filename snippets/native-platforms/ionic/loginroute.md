```js
function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('home', {
    url: '/',
    templateUrl: 'components/home/home.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'components/login/login.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  // Code omitted for brevity
}
```  