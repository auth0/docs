---
title: Login
description: This tutorial demonstrates how to add authentication and authorization to a Vue.js app using Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-vue-samples',
  path: '05-Authorization',
  requirements: [
    'Vue.js 2.2'
  ]
}) %>

${include('../\_callback')}

> **Note:** This tutorial demonstrates integration using Vue.js v2 and Vue components using the Vue CLI.

## Add the Dependencies

The easiest way to get started with authentication is to use Auth0's Lock widget. Along with Vue.js, this is the only dependency required for a basic authentication setup. If you require client-side routing and HTTP calls, install **vue-resource** and **vue-router** as well. The **EventEmitter** module should also installed as it will be useful for communicating data from a service to Vue components.

Install these dependencies with npm.

```bash
npm install --save auth0-lock EventEmitter vue-resource vue-router
```

<%= include('../../_includes/_auth_service_description') %>

There are several methods that must be defined in the service, including:

* `login` - makes a call for the Lock widget to be opened
* `setSession` - sets the `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

Two other methods are provided here, but are optional: `getRole` and `isAdmin`. These are responsible for checking the user's authorization level which will be discussed in more detail below. A method called `getAccessToken` is also provided which returns the user's `access_token`.

This tutorial assumes that you will be using the `access_token` that is returned for the user to make a call to an API. To do this, set up an API in your Auth0 dashboard and use the identifier for it as the `audience` below. If you do not wish to set up or call an API, the `audience` can be set to `https://${account.namespace}/userinfo`.

```js
// src/auth/AuthService.js

import Auth0Lock from 'auth0-lock'
import EventEmitter from 'EventEmitter'
import decode from 'jwt-decode'
import Router from 'vue-router'

export default class AuthService {

  authenticated = this.isAuthenticated()
  admin = this.isAdmin()
  authNotifier = new EventEmitter()
  userProfile;
  router = new Router()

  constructor () {
    // Add callback Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this))
    // Add callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', error => console.log(error))
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getRole = this.getRole.bind(this)
    this.isAdmin = this.isAdmin.bind(this)
  }

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      audience: AUTH_CONFIG.apiUrl,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile read:messages'
      }
    }
  })

  login () {
    // Call the show method to display the widget.
    this.lock.show()
  }

  setSession (authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      this.authNotifier.emit('authChange', { authenticated: true, admin: this.isAdmin() })
      // navigate to the home route
      this.router.push('')
    }
  }

  getAccessToken () {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken
  }

  getProfile (cb) {
    let accessToken = this.getAccessToken()
    let self = this
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile
      }
      cb(err, profile)
    })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    this.router.replace('')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getRole () {
    const namespace = 'https://example.com'
    const idToken = localStorage.getItem('id_token')
    if (idToken) {
      return decode(idToken)[`${namespace}/role`] || null
    }
  }

  isAdmin () {
    return this.getRole() === 'admin'
  }
}
```

<%= include('../../_includes/_auth_service_method_description_no_callback') %>

## Create a Root App Component

Create (or modify) a root `App.vue` component which will hold a template and the logic for a top navbar and `router-view` below.

```html
<!-- src/App.vue -->

<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Auth0 - Vue</a>

          <router-link :to="'/'"
            class="btn btn-primary btn-margin">
              Home
          </router-link>

          <router-link :to="'profile'"
            class="btn btn-primary btn-margin"
            v-if="authenticated">
              Profile
          </router-link>

          <router-link :to="'admin'"
            class="btn btn-primary btn-margin"
            v-if="authenticated && admin">
              Admin Area
          </router-link>

          <router-link :to="'ping'"
            class="btn btn-primary btn-margin">
              Ping
          </router-link>

          <button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

        </div>
      </div>
    </nav>

    <div class="container">
      <router-view 
        :auth="auth" 
        :authenticated="authenticated" 
        :admin="admin">
      </router-view>
    </div>
  </div>
</template>

<script>

import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, admin, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
      this.admin = authState.admin
    })
    return {
      auth,
      authenticated,
      admin
    }
  },
  methods: {
    login,
    logout
  }
}
</script>
```

The navbar in this component has several links to various places in the application. The `AuthService`, which was created previously, is imported and instantiated so that it can be passed down to child components through the `router-view`. 

There are two boolean values that come from the object emitted from the `AuthService` when a user authenticates: one to indicate that the user is authenticated and another to indicate whether the user is an admin. Some of the links in the `App` component should only be shown if the user is authenticated, and others if the user is both authenticated and is an admin user. These conditions are checked in a `v-if` using the above-mentioned values when the user logs in.

## Add a Profile Area

<%= include('../../_includes/_user_profile_preamble') %>

The `AuthService` has a method called `getProfile` which makes a call to Lock's `getUserInfo` method and this can be used to display information for a user in a profile area. Since the `getProfile` method caches the returned profile in the `userProfile` member, there won't be a need to refetch the profile each time the `Profile` component is navigated to.

Create a component called `Profile.vue` and provide a template for the profile. When the component is activated, get the profile either by reading `userProfile` from the `AuthService`, or fetch it using the `getProfile` method.

```html
<!-- src/components/Profile.vue -->

<template>
  <div class="panel panel-default profile-area">
  <div class="panel-heading"><h3>Profile</h3></div>
  <div class="panel-body">
    <img :src="profile.picture" class="avatar" alt="avatar">
    <div>
      <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
      <h3 class="nickname">{{ profile.nickname }}</h3>
    </div>
    <div>
      <label><i class="glyphicon glyphicon-envelope"></i> Email</label>
      <h3 class="email">{{ profile.email }}</h3>
    </div>
    <pre class="full-profile">{{ profile }}</pre>
  </div>
</div>
</template>

<script>
export default {
  props: ['auth'],
  data () {
    if (this.auth.userProfile) {
      this.$nextTick(() => {
        this.profile = this.auth.userProfile
      })
    } else {
      this.auth.getProfile((err, profile) => {
        if (err) return console.log(err)
        this.profile = profile
      })
    }
    return {
      profile: {}
    }
  }
}
</script>
```

## Make Secure Calls to an API

<%= include('../../_includes/_calling_api_preamble') %>

<%= include('../../_includes/_calling_api_access_token') %>

Create a component called `Ping.vue` and provide some controls for calling an API.

```html
<!-- src/components/Ping.vue -->

<template>
  <div>
    <h1>Make a Call to the Server</h1>

    <p v-if="!authenticated">
      Log in to call a private (secured) server endpoint.
    </p>

    <button
      class="btn btn-primary" 
      @click="ping()">
        Call Public
    </button>

    <button 
      class="btn btn-primary"
      @click="securedPing()" 
      >
        Call Private
    </button>

    <button 
      class="btn btn-primary"
      @click="adminPing()" 
      v-if="authenticated && admin">
        Call Admin
    </button>

    <h2>{{ message }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'Ping',
    props: ['auth', 'authenticated', 'admin'],
    data () {
      const accessToken = localStorage.getItem('access_token') || null
      const headers = { Authorization: `Bearer ${accessToken}` }
      return {
        message: '',
        ping () {
          this.$http.get('http://localhost:3001/api/public')
            .then(response => {
              this.message = response.body.message
            }, error => {
              this.message = error.statusText
            })
        },
        securedPing () {
          this.$http.get('http://localhost:3001/api/private', { headers })
            .then(response => {
              this.message = response.body.message
            }, error => {
              this.message = error.statusText
            })
        },
        adminPing () {
          this.$http.get('http://localhost:3001/api/private/admin', { headers })
            .then(response => {
              this.message = response.body.message
            }, error => {
              this.message = error.statusText
            })
        }
      }
    }
  }
</script>
```

In the `data` block for the component, the user's `access_token` is fetched and a `headers` object is created. This object is sent as the `headers` option in the `GET` requests which go to the secured endpoints.

<%= include('../../_calling_api_protect_resources') %>

## Protect Client-Side Routes

Even though your API endpoints might be protected, you'll likely want to protect client-side routes as well. For example, the `/profile` route should only be accessible to authenticated users, and the `admin` route should only be available to those who are both authenticated and who have a scope of `admin`.

To accomplish this, the `beforeEnter` hook can be used in the definition for these routes. Add this hook to the routes you wish to protect.

```js
// src/router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Admin from '@/components/Admin'
import Ping from '@/components/Ping'
import AuthService from './../auth/AuthService'

Vue.use(Router)
Vue.use(VueResource)

const auth = new AuthService()

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated()) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping
    }
  ]
})
```

With this configuration, the user will not be able to access the `/profile` and `/admin` routes unless their authentication state satisfies the conditions in the `if` block.