```html
<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="padding">
      <div class="list list-inset">
          <label class="item item-input">
              <input type="text" placeholder="Username" ng-model="vm.username">
          </label>
          <label class="item item-input">
              <input type="password" placeholder="Password" ng-model="vm.password">
          </label>
      </div>
      <button class="button button-block button-calm" ng-click="vm.login()">Login</button>
      <button class="button button-block button-google icon ion-social-googleplus-outline" ng-click="vm.loginWithGoogle()">
        Login with Google
      </button>
  </ion-content>
</ion-view>
```