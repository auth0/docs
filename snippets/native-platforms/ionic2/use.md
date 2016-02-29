```ts

login() {
  this.lock.show((err: string, profile : Object, id_token: string) => {
    this.zone.run(() => {
      if (err) {
        throw new Error(err);
      }

        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);

        this.user_name = profile.name;
        this.user_email = profile.email;

    });

  });
}
```
