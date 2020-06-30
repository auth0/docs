<!-- markdownlint-disable MD041-->
```js
// src/App.js

var Auth0 = require('auth0-js');
var Auth0Cordova = require('@auth0/cordova');

function getBySelector(arg) {
  return document.querySelector(arg);
}

function getById(id) {
  return document.getElementById(id);
}

function getRedirectUrl() {
  var returnTo = env.PACKAGE_ID + '://${account.namespace}/cordova/' + env.PACKAGE_ID + '/callback';
  var url = 'https://${account.namespace}/v2/logout?client_id=${account.clientId}&returnTo=' + returnTo;
  return url;
}

function openUrl(url) {
  SafariViewController.isAvailable(function (available) {
    if (available) {
      SafariViewController.show({
            url: url
          },
          function(result) {
            if (result.event === 'loaded') {
              SafariViewController.hide();
            }
          },
          function(msg) {
            console.log("KO: " + JSON.stringify(msg));
          })
    } else {
      window.open(url, '_system');
    }
  })
}

function App() {
  this.auth0 = new Auth0.Authentication({
    domain: '${account.namespace}',
    clientID: '${account.clientId}'
  });
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
}

App.prototype.state = {
  authenticated: false,
  accessToken: false,
  currentRoute: '/',
  routes: {
    '/': {
      id: 'loading',
      onMount: function(page) {
        if (this.state.authenticated === true) {
          return this.redirectTo('/home');
        }
        return this.redirectTo('/login');
      }
    },
    '/login': {
      id: 'login',
      onMount: function(page) {
        if (this.state.authenticated === true) {
          return this.redirectTo('/home');
        }
        var loginButton = page.querySelector('.btn-login');
        loginButton.addEventListener('click', this.login);
      }
    },
    '/home': {
      id: 'profile',
      onMount: function(page) {
        if (this.state.authenticated === false) {
          return this.redirectTo('/login');
        }
        var logoutButton = page.querySelector('.btn-logout');
        var avatar = page.querySelector('#avatar');
        var profileCodeContainer = page.querySelector('.profile-json');
        logoutButton.addEventListener('click', this.logout);
        this.loadProfile(function(err, profile) {
          if (err) {
            profileCodeContainer.textContent = 'Error ' + err.message;
          }
          profileCodeContainer.textContent = JSON.stringify(profile, null, 4);
          avatar.src = profile.picture;
        });
      }
    }
  }
};

App.prototype.run = function(id) {
  this.container = getBySelector(id);
  this.resumeApp();
};

App.prototype.loadProfile = function(cb) {
  this.auth0.userInfo(this.state.accessToken, cb);
};

App.prototype.login = function(e) {
  e.target.disabled = true;

  var client = new Auth0Cordova({
    domain: '${account.namespace}',
    clientId: '${account.clientId}',
    packageIdentifier: 'YOUR_PACKAGE_ID' // found in config.xml
  });

  var options = {
    scope: 'openid profile',
    audience: 'https://${account.namespace}/userinfo'
  };
  var self = this;
  client.authorize(options, function(err, authResult) {
    if (err) {
      console.log(err);
      return (e.target.disabled = false);
    }
    localStorage.setItem('access_token', authResult.accessToken);
    self.resumeApp();
  });
};

App.prototype.logout = function(e) {
  localStorage.removeItem('access_token');
  var url = getRedirectUrl();
  openUrl(url);
  this.resumeApp();
};

App.prototype.redirectTo = function(route) {
  if (!this.state.routes[route]) {
    throw new Error('Unknown route ' + route + '.');
  }
  this.state.currentRoute = route;
  this.render();
};

App.prototype.resumeApp = function() {
  var accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    this.state.authenticated = true;
    this.state.accessToken = accessToken;
  } else {
    this.state.authenticated = false;
    this.state.accessToken = null;
  }

  this.render();
};

App.prototype.render = function() {
  var currRoute = this.state.routes[this.state.currentRoute];
  var currRouteEl = getById(currRoute.id);
  var element = document.importNode(currRouteEl.content, true);
  this.container.innerHTML = '';
  this.container.appendChild(element);
  currRoute.onMount.call(this, this.container);
};

module.exports = App;
```
