---
title: Introduction
description: A simple, multi-step quickstart guide to setup and manage authentication in your Angular2 JS app using Auth0.
---

This simple, multi-step quickstart will guide you through setting up and managing authentication in your Angular2 JS apps using Auth0.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/00-Starter-Seed',
}) %>

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## 2. Dependencies

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
