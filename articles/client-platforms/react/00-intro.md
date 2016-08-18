---
title: Introduction
description: This tutorial will show you how to setup and run the ReactJS Seed project provided by Auth0 as integration sample.
---

This simple, multi-step quickstart will guide you through setting up and managing authentication in your ReactJS apps using Auth0.

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

<%= include('../../_includes/_signup') %>

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

### 2. Dependencies

All the project dependencies are managed by `npm` and listed in the `package.json` file. Webpack is responsible for compiling and bundling everything into a single javascript file for all environments: for __development__ with code hot reload active, for __testing__ when karma is running and also when creating a __production__ release.

To install everything required to run the application, inside the project folder, run:

`$ npm install`

### 3. Run in Development Mode

After installing the required dependencies, you will be able to start a local server in development mode with:

`$ npm start`

Now you should be able to open your browser and navigate to `localhost:3000` to view the welcome page:

![Starter](/media/articles/reactjs/starter_running.png)
