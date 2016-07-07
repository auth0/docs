---
title: Introduction
description: This tutorial will show you how to setup and run the ReactJS Seed project provided by Auth0 as integration sample.
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your ReactJS apps with Auth0. For that, you have to include [Lock Widget](https://github.com/auth0/lock) as a dependency in your project.

## Seed &amp; Samples

There are two options to following along these steps. You can either download the [seed project](https://github.com/auth0-samples/auth0-react-sample/tree/master/00-Starter-Seed) or the samples. The seed is a modern ReactJS application with some packages already setup:

* [webpack](https://webpack.github.io) for assets building and hot code reloading
* [babel](https://babeljs.io) to allow ES2015 Javascript syntax
* [postcss](http://postcss.org) and [cssloader](https://github.com/webpack/css-loader) to allow css modules loading inside JS files
* [react-router](https://github.com/reactjs/react-router)
* [react-bootstrap](https://react-bootstrap.github.io/) for easy integration with [Bootstrap framework](http://getbootstrap.com/)
* [karma](https://karma-runner.github.io), [enzyme](https://github.com/airbnb/enzyme) and [chai](http://chaijs.com) for unit testing
* [auth0-lock](https://github.com/auth0/lock) for user authentication

Auth0 Lock widget is included in `package.json` but it's not being used yet. The entire project just serves as a starting point for this quickstart. The samples are included in each step and contains the example for each of the step.

## Prerequisites
Before we embark on this journey of ours, it is important to setup our application buy following these process:

::: panel-info Can I Skip?
You can skip this step if you think you can find your way around or just looking for something specific in the quickstart.
:::

### 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

### 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

### 3. Structure
Throughout the steps, the seed and samples will have the following directory structure:
```bash
├── karma.conf.js
├── package.json
├── src
│   ├── app.css
│   ├── app.js
│   ├── components
│   ├── containers
│   │   └── App
│   │       ├── App.js
│   │       ├── App.spec.js
│   │       └── styles.module.css
│   ├── routes.js
│   ├── styles
│   │   ├── base.css
│   │   ├── colors.css
│   │   └── queries.css
│   ├── utils
│   └── views
│       └── Main
│           ├── Container.js
│           ├── Home
│           │   ├── Home.js
│           │   └── styles.module.css
│           ├── routes.js
│           └── styles.module.css
├── tests.webpack.js
└── webpack.config.js
```

### 4. Dependencies

All the project dependencies are managed by `npm` and listed in `package.json` file. Webpack is responsible to compile and bundle everything in a single javascript file for all the environments: for __development__ with code hot reload active, for __testing__ when karma is running and even when creating a __production__ release.

To install everything required to run the application, inside the project folder run:

```bash
$ npm install
```

### 5. Run in Development Mode
Right after installing the required dependencies, you'll be able to start a local server in development mode with:

```bash
$ npm start
```

With everything set, you are now able to open your browser, navigate to `localhost:3000` and see the welcome page:

![Starter](/media/articles/reactjs/starter_running.png)
