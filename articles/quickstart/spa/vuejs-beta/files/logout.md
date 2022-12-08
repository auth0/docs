---
name: logout.js
language: html
---

```html
<template>
  <div>
    <button @click="logout">Log out</button>
  </div>
</template>
<script>
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const auth0 = useAuth0();

      return {
        logout() {
          auth0.logout({ 
            logoutParams: { 
              returnTo: window.location.origin 
            } 
          });
        }
      };
    }
  };

  // Options API
  export default {
    methods: {
      logout() {
        this.$auth0.logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      }
    }
  };
</script>
```