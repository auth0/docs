## Create an Auth Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application.

At the most basic level, authentication with Auth0's Lock widget requires that the user send their credentials to Auth0 to be verified. If authentication is successful, a [JSON Web Token (JWT)](https://jwt.io/introduction) will be signed and sent back to the user. To do this, you can use Lock's `show` method to open the widget and then listen for a successful authentication transaction when the `authenticated` event fires.

When authentication is successful, three items will be returned which all need to be used in the application: an Access Token, an ID Token, and the number of seconds until the Access Token expires. While all of these items are important, the most useful one is the Access Token. It's this token that can be used in calls to Auth0 to get things like the user's information, and it will also be used later to send authenticated requests to your own backend.
