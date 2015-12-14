```js
lock.show({}, (err, profile, token) => {
  if (err) {
    console.log(err);
    return;
  }
  // Authentication worked!
  console.log('Logged in with Auth0!');
});
```
