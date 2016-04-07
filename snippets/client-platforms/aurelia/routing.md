```js
// private-route.js

import {Redirect} from 'aurelia-router';
import {tokenIsExpired} from './utils/tokenUtils';

export class Private {
  message = "Hello from a private route.";
  
  canActivate() {
    if(tokenIsExpired()) {
      return new Redirect('public');
    }
    else {
      return true;
    }
  }
}
```