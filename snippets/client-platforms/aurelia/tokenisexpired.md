```js
// utils/tokenUtils.js

export function tokenIsExpired() {
  let jwt = localStorage.getItem('id_token')
  if(jwt) {
    let jwtExp = jwt_decode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);
    
    if(expiryDate < new Date()) {
      return true;
    }
  }

  else {
    return false;
  }
}
```