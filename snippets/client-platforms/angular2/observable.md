```js
// app.ts

tokenSubscription() {
  this.auth.token.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
}
```