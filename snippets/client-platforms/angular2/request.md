```js
// app.ts

...

constructor(public authHttp:AuthHttp) {}

getSecretThing() {
  this.authHttp.get('http://example.com/api/secretthing')
    .subscribe(
      data => console.log(data.json()),
      err => console.log(err),
      () => console.log('Complete')
    );
  );
}


...

bootstrap(AuthApp, [
  HTTP_PROVIDERS,
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp();
  }})
])
```
