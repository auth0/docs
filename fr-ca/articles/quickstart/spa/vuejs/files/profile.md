---
name: profile.js
language: html
---

```html
<template>
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <h2>User Profile</h2>
    <button @click="login">Log in</button>
    <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
      </pre>
  </div>
</template>
<script>
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const auth0 = useAuth0();

      return {
        login: () => auth0.loginWithRedirect(),
        user: auth0.user,
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading,
      };
    }
  };

  // Options API
  export default {
    data() {
      return {
        user: this.$auth0.user,
        isAuthenticated: this.$auth0.isAuthenticated,
        isLoading: this.$auth0.isLoading,
      };
    },
    methods: {
      login() {
        this.$auth0.loginWithRedirect();
      }
    }
  };
</script>
```