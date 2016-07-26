---
title: Introduction
description: A simple, multi-step quickstart guide to setup and manage authentication in your Angular2 JS app using Auth0.
---

This simple, multi-step quickstart will guide you through setting up and managing authentication in your Angular2 JS apps using Auth0.  

## Seed & Samples

There are two options for following along with this quickstart:

* Download the [seed project](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/00-Starter-Seed). The seed project is a regular Angular2 app (based on [https://github.com/angular/quickstart](https://github.com/angular/quickstart)) containing only the Auth0 dependencies in the HTML that can serve as a starting point for this quickstart.

* Download the [samples](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample) that contain the examples for each step.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)


## 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

## 3. Structure

For each of the steps, the seed and samples will have the following directory structure:

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

To integrate your Angular2 application with Auth0, you will need to add the following two dependencies:

- [Lock Widget](https://github.com/auth0/lock) is the default authentication widget provided by Auth0.

  From [npm](https://npmjs.org):

  `npm install --save auth0-lock`

  From [bower](http://bower.io):

  `bower install auth0-lock`

  Or the Auth0 CDN:

  `<script src="http://cdn.auth0.com/js/lock/10.0.0/lock.min.js"></script>`

- [angular2-jwt](https://github.com/auth0/angular2-jwt) is a helper library for working with [JWTs](http://jwt.io/introduction) in your Angular 2 applications.

  From [npm](https://npmjs.org):

  `npm install --save angular2-jwt`

## 5. Viewport

If you are targeting mobile audiences, it's recommended that you add the following in the `<head>` element:

`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>`

