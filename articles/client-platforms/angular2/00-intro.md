---
title: Introduction
name: test
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular2 JS apps with Auth0. For that, you have to include
[Lock Widget](https://github.com/auth0/lock) and [angular2-jwt](https://github.com/auth0/angular2-jwt) as dependencies to your project.

## Seed & Samples

There are two options to following along these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample). The seed is a regular angular2 (based on https://github.com/angular/quickstart) app with nothing on Auth0 in it except for the dependencies included in the HTML. It just serves as a starting point as well building blocks for this quickstart. The samples are included in each step and contains the example for each of the step.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)


## Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you will need to add your application's URL in the app's `Allowed Callback URLs`. This will enable Auth0 to recognize the URLs as valid. If omitted, authentication will not be successful for the app instance.

![Callback error](/media/articles/angularjs/callback_error2.png)

#### 1: Dependencies
To integrate your Angular2 application with Auth0 you need to add the following dependencies:

- [Lock Widget](https://github.com/auth0/lock): is the default authentication widget provided by Auth0.


    From [npm](https://npmjs.org):

    ```sh
    npm install auth0-lock
    ```

    From [bower](http://bower.io):

    ```sh
    bower install auth0-lock
    ```

    Or our CDN:

    ```html
    <!-- Latest minor release -->
    <script src="http://cdn.auth0.com/js/lock/10.0.0-beta.4/lock.min.js"></script>

    <!-- Latest patch release (recommended for production) -->
    <script src="http://cdn.auth0.com/js/lock/10.0.0-beta.4/lock.min.js"></script>
    ```

- [angular2-jwt](https://github.com/auth0/angular2-jwt): is a helper library for working with [JWTs](http://jwt.io/introduction) in your Angular 2 applications.

    From [npm](https://npmjs.org):

    ```sh
    npm install angular2-jwt
    ```

#### 2: Viewport

If you are targeting mobile audiences, it's recommended that you add in `<head>` element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

Please continue with next [step](link_to_login) tutorial to know how to implement login using `Auth0`.
