---
title: Introduction
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Angular2 JS apps with Auth0. For that, you have to include
[Lock Widget](https://github.com/auth0/lock) and [angular2-jwt](https://github.com/auth0/angular2-jwt) as dependencies to your project.

## Seed & Samples

There are two options to following along these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample). The seed is a regular angular2 (based on https://github.com/angular/quickstart) app with nothing on Auth0 in it except for the dependencies included in the HTML. It just serves as a starting point as well building blocks for this quickstart. The samples are included in each step and contains the example for each of the step.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)


## 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

## 3. Structure
Throughout the steps, the seed and samples will have the following directory structure:

```bash
├── app
│   ├── app.component.ts
│   ├── app.routes.ts
│   ├── app.template.html
│   ├── home.component.ts
│   └── main.ts
├── index.html
├── package.json
├── styles.css
├── systemjs.config.js
├── tsconfig.json
├── tslint.json
└── typings.json
```

## 4. Dependencies
To integrate your Angular2 application with Auth0 you need to add the following dependencies:

- [Lock Widget](https://github.com/auth0/lock): is the default authentication widget provided by Auth0.

    From [npm](https://npmjs.org):

    ```sh
    npm install --save auth0-lock@rc
    ```

    From [bower](http://bower.io):

    ```sh
    bower install auth0-lock#10.0.0-rc.2
    ```

    Or our CDN:

    ```html
    <script src="http://cdn.auth0.com/js/lock/10.0.0-rc.2/lock.min.js"></script>
    ```

- [angular2-jwt](https://github.com/auth0/angular2-jwt): is a helper library for working with [JWTs](http://jwt.io/introduction) in your Angular 2 applications.

    From [npm](https://npmjs.org):

    ```sh
    npm install --save angular2-jwt
    ```

## 5. Viewport

If you are targeting mobile audiences, it's recommended that you add in `<head>` element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## Done!

That's all you need to start working with Auth0!  
Please continue with [login](/quickstart/spa/angular2/01-login) tutorial to know how to implement basic login.
