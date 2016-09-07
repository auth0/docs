---
title: Introduction
description: This tutorial will show you how to setup and run the nodejs webapp sample project provided by Auth0.
---

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your express apps with Auth0.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgType: 'server'
}) %>

### 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

### 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

### 3. Structure
Throughout the steps, the seed and samples will have the following directory structure:
```bash
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   └── stylesheets
│       └── style.css
├── README.md
├── routes
│   ├── index.js
│   └── ...
└── views
    ├── index.jade
    └── ...
```

### 4. Dependencies

All the project dependencies are managed by `npm` and listed in the `package.json` file.

Run the following command to install the required packages.

```bash
$ npm install
```

### 5. Running the application.

Right after installing the dependencies, you'll be able to start a local server with:

```bash
$ npm start
```

With everything set, you are now able to open your browser, navigate to `localhost:3000` and see the welcome page
