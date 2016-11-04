```html
  <!-- index.html -->
  
  <button @click="login()" v-show="!authenticated">Login</button>
  <button @click="logout()" v-show="authenticated">Logout</button>  
```