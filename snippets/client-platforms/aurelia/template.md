```html
<!-- app.html -->
<template>
  <button click.delegate="login()" if.bind="!isAuthenticate">Log In</button>
  <button click.delegate="logout()" if.bind="isAuthenticated">Log Out</button>
  <hr>
  <button click.delegate="getSecretThing()" if.bind="isAuthenticated">Get Secret Thing</button>
  <h3><%= '${secretThing}' %></h3>
</template>
```