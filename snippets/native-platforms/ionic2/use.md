```ts
public isAuthenticated = false;
login() {
  this.lock.show((err: string, profile : Object, id_token: string) => {
    this.zone.run(() => {
      if (err) {
        throw new Error(err);
      }

      //Save the token
      localStorage.setItem('id_token', id_token);
		
	    //Save the profile
	   	this.userProfile = profile;

      this.user_name = profile.name;
      this.user_email = profile.email;
	    this.isAuthenticated = true;

    });

  });
}
```
