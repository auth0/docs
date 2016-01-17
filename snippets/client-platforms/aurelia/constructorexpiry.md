```js
// app.js

import {tokenIsExpired} from './utils/tokenUtils';

constructor(http) {
  this.http = http;
  
  ...
  
  if(tokenIsExpired())  {
    this.isAuthenticated = false;
  }
  else {
    this.isAuthenticated = true;
  }
}
```