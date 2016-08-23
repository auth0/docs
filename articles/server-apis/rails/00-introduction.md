---
title: Introduction
name: This tutorial will show you how to use Auth0-issued JSON Web Tokens in your Rails API to add authentication and authorization.
---

## Introduction

This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your rails API.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rails-api-sample/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-rails-api-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'server'
}) %>_

### Seed & Samples

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-rails-api-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-rubyonrails-api-sample) provided at each page of this quickstart.

The seed is a basic RoR API, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-rubyonrails-api-sample/tree/master/00-Starter-Seed) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the seed project as a starting point and applies to it the configuration of each step, so for example the Authentication sample would be the seed project plus the configuration required to implement authentication functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

Be sure to update the `appsettings.json` file in the seed project with the correct values for your application.

## Dependencies

To use Auth0 JSON Web Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.Jwt` package to your application.

```bash
Install-Package Microsoft.AspNetCore.Authentication.Jwt
```

This was already done for you in the seed project, so no need to add it if you are using the seed project as a starting point.

That's all you need to start working with Auth0 in your Web API!

Please continue with the [Authentication](/quickstart/backend/aspnet-core-webapi/01-authentication-rs256) tutorial to secure your Web API.
