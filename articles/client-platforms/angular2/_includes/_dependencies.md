## Add the Dependencies

To integrate your Angular 2 application with Auth0, you will need to add the following two dependencies:

- [Lock Widget](https://github.com/auth0/lock) is the default authentication widget provided by Auth0.

  From [npm](https://npmjs.org):

  `npm install --save auth0-lock`

  Or the Auth0 CDN:

  `<script src="https://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>`

- [angular2-jwt](https://github.com/auth0/angular2-jwt) is a helper library for working with [JWTs](http://jwt.io/introduction) in your Angular 2 applications.

  From [npm](https://npmjs.org):

  `npm install --save angular2-jwt`