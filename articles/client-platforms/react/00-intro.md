---
title: Introduction
description: This tutorial will show you how to set up and run the React seed project provided by Auth0.
budicon: 715
---

This quickstart guide contains individual sections which demonstrate how to use various Auth0 features in your React applications. Each section has its own sample project which can be downloaded directly from the doc or forked on Github. If you are logged in to your Auth0 account, the samples will have your Auth0 credentials pre-populated for you.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## 2. Dependencies

<%= include('_includes/_dependencies') %>

All other dependencies are listed in the `package.json` file of each sample application. Webpack is responsible for compiling and bundling everything into a single JavaScript file for all environments, including __development__ with hot module replacement, __testing__ to have Karma running and __production__.

To install everything required to run the application, inside the project folder, run:

`npm install`

## 3. Run in Development Mode

After installing the required dependencies, you will be able to start a local server in development mode with:

`npm start`

Once you start a sample application, you should be able to access it from `localhost:3000` in your browser.

![Starter](/media/articles/reactjs/starter_running.png)
