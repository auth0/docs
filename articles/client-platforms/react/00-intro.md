---
title: Introduction
description: This tutorial will show you how to setup and run the ReactJS Seed project provided by Auth0 as integration sample.
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your ReactJS apps with Auth0. For that, you have to include the [Lock Widget](/libraries/lock) as a dependency in your project.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-react-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-react-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

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

All the project dependencies are managed by `npm` and listed in the `package.json` file. Webpack is responsible to compile and bundle everything in a single javascript file for all the environments: for __development__ with code hot reload active, for __testing__ when karma is running and even when creating a __production__ release.

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
