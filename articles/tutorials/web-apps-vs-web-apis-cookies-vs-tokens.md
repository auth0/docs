# Web Apps vs Web APIs / Cookies vs Tokens

* For us **Web Apps** are the traditional server-side applications that use **cookie-based authentication**.

* **Web APIs**, on the other hand, represent for us a new breed of applications, typically single page apps (like Angular, Ember, Backbone, etc.) or native mobile apps (like iOS, Android, etc.) which consume APIs (written in Node, Ruby, ASP.NET or even a mix of those) and will benefit from **token based authentication**.

> Before moving forward, you might want to read these articles for more context: [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/) and  [10 Things You Should Know about Tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/).

* **Cookie-based authentication** is implemented by each web platform differently, but at the end of the day, they all end up setting some cookie (tied to a session on the server) which represents the "authenticated user". On each request, that cookie is sent and the session is deserialized from some store (in memory if it's a single server or some persistent storage if it's a server farm). We provide SDKs for most of the platforms that will tie into the corresponding authentication subsystem (e.g. passport on node, IPrincipal on .NET or Java, etc.).

* **Token-based authentication** is implemented by generating a token when the user authenticates and then setting that token in the `Authorization` header of each subsequent request to your API. You want that token to be something standard, like JSON Web Tokens since you will find libraries in most of the platforms and you don't want to do your own crypto.

* For both approaches you can get the **same amount of information from the user**. That's controlled by the `scope` parameter sent in the login request (either using the [Auth0Lock](/lock), our [JavaScript library](https://github.com/auth0/auth0.js) or a plain link). The `scope` is a parameter of the `.signin({scope: 'openid name email'})` method which ends up being part of the querystring in the login request. You can get more details about this in the [Scopes Documentation](/scopes).

* By default we use `scope=openid` in **token-based authentication** to avoid having a huge token (since the token will be traveling in the `Authorization` header for each request as mentioned above). You can control the attributes that you want to get in the token by doing `scope=openid name email another_attribute`.

* Finally, you can **mix token-based authentication** with **cookie-based authentication**. Take into account that cookies will work just fine if the web app and the API are served from the same domain, so you might not need token based authentication. Now, if you need to, we also return a JWT on the web app flow. Each of our SDK will do it differently. If you want to call your APIs from JavaScript (instead of using the existing cookie) then somehow you have to set the `id_token` in your webpage. One way of doing it is by setting it on your layout/master page something like `window.token = ${"<%= id_token %>;"}` and then you get it from anywhere in your JavaScript code.
