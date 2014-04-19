# Auth0 with AngularJS

## Tutorial

For a complete tutorial on how to integrate Auth0 with your AngularJS app, see this: <a target="_new" href="https://github.com/auth0/auth0-angular">https://github.com/auth0/auth0-angular</a>.

Please take note of the following settings:

* __Domain__: `@@account.namespace@@`
* __ClientID__: `@@account.clientId@@`
* __Callback URL__: `@@account.callback@@`

## Examples

The following [examples](https://github.com/auth0/auth0-angular/tree/master/examples) offer a good starting point for including Auth0 in your AngularJS application:

 * [Widget](https://github.com/auth0/auth0-angular/tree/master/examples/widget): A simple angular app doing auth with social and username/password using the Login Widget.
 * [Custom Login](https://github.com/auth0/auth0-angular/tree/master/examples/custom-login): Custom login form that uses Auth0 to authenticate.
 * [Custom Signup](https://github.com/auth0/auth0-angular/tree/master/examples/custom-signup): Custom signup plus extra fields added to the user profile on creation.
 * [Delegation Token](https://github.com/auth0/auth0-angular/tree/master/examples/delegation-token): How to get a token for a secondary API and call it.
 * [API Authentication](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication): Call your protected API using Auth0 generated tokens in the technology you want:
    * [Java](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/java)
    * [.NET OWIN](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/aspnet-owin)
    * [Node.js](https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/nodejs)
    * Also, but not included in examples, we support these technologies: [PHP](phpapi-tutorial), [ASP.NET WebAPI](aspnetwebapi-tutorial), [Ruby](rubyapi-tutorial) among others.
 * [UI Router](https://github.com/auth0/auth0-angular/tree/master/examples/ui-router): Managing routes using ui-router.
 * [Require JS](https://github.com/auth0/auth0-angular/tree/master/examples/ui-router): Using RequireJS to include dependencies.
