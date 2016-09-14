---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '06-Rules',
  pkgType: 'server'
}) %>

<%= include('../_includes/_rules-introduction') %>

## 1. Create a Rule

<%= include('../_includes/_rules-create-section') %>

## 2. Test the Rule Result

The following sample is based on the `01-Login` source code.
Add the following to the `views/user.jade` template to display the new `country` field:

```jade
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  p Country (Provided by Rule): <b>#{user._json.country}</b>
  br
  a(href='/logout') Logout
```
