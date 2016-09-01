# Lock Android: Password Reset

You can allow users to reset their password for any database connections. 

> Passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those platforms.

## Using Lock

If you are **using the Lock UI**, you can  show or hide a "Reset password" button by setting the `allowForgotPassword` property from your `Lock` instance to `true / false` . Since its actual default value is `true`, **you have to do nothing** in order to get a password reset feature in your app.

## Using Your Own UI

However, if you are **implementing your own UI**, you need to send a password reset email to the user through an `AuthenticationAPIClient` instance, like this:

```java
Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
client.requestChangePassword(email).start(new BaseCallback<Void, AuthenticationException>() {
	@Override
	public void onSuccess(Void payload) {
		// Notify user to check his email
	}

	@Override
	public void onFailure(AuthenticationException error){
		// Manage failure scenario
	}
});
```

> **NOTE**: Please, take a look at [Password Strength in Auth0 Database Connections](/connections/database/password-strength) before implementing password reset.