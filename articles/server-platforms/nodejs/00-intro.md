---
title: Introduction
description: This tutorial will show you how to setup and run the nodejs webapp sample project provided by Auth0.
---

This multistep quickstart guide will walk you through setting up and managing authentication in your Node.js web apps using Auth0. Each step demonstrates how to implement a specific feature of Auth0 and is accompanied by a downloadable sample project showing the complete solution.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

### 1. Create an Application

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

### 2. Configure Callback URLs

<%= include('../_includes/_callback-url-introduction') %>

### 3. Structure

The sample projects which accompany each of these steps will have the following directory structure:

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

All the project dependencies are managed by npm and listed in the `package.json` file for each of the samples.

Run the following command to install the required packages.

```bash
npm install
```

Auth0's Lock widget and `auth0.js` library are used throughout these quickstarts. These scripts can be obtained from the following CDN links:

**Lock**
`https://cdn.auth0.com/js/lock/10.3/lock.min.js`

**auth0.js**
`http://cdn.auth0.com/w2/auth0-7.2.js`

### 5. Running the Sample Applications

After installing the dependencies for each of the samples, start the application:

```bash
npm start
```

With everything set, the app will be available at `localhost:3000`.
