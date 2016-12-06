---
title: Getting Started
description: Initial steps to integrate Auth0 in a React application.
budicon: 715
---

This quickstart guide contains individual steps which demonstrate how to use various Auth0 features in your React applications. Each step has a dedicated sample project which can be downloaded directly from the doc or forked on Github. If you are logged in to your Auth0 account, the samples will have your Auth0 credentials pre-populated for you.

::: panel-info Using create-react-app?
Auth0 has its own fork of **[react-scripts](https://github.com/auth0-community/auth0-react-scripts)** which means you can install an Auth0-powered React app with a single command:

```bash
create-react-app my-app --scripts-version auth0-react-scripts
```

The `auth0-react-scripts` app demonstrates **login**, **session handling**, and **user profiles**.
:::

<%= include('../../_includes/_new_app') %>

## About the Sample Applications

The code snippets within this quickstart guide are based off of the downloadable samples. Within each of these samples, you will find a very simple React application which utilizes a few views and containers. The samples use **react-router** (with `browserHistory`) and **react-bootstrap**.

It should be noted that a simplistic React application is used in the samples and snippets intentionally. The focus of this quickstart guide is on how to use Auth0 in a React application in general rather than on how to approach various architectural scenarios. However, Auth0 works well in any React setup and can be integrated with Flux, Redux, and other flavors that you may be interested in.

## Auth0 Dependencies

<%= include('_includes/_dependencies') %>
