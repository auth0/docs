---
title: Rules
description: This tutorial demonstrates how to use Auth0 rules
budicon: 173
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '06-Rules',
  requirements: [
    'NodeJS 4.3 or superior',
    'Express 4.11'
  ]
}) %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test the Rule Result

The following sample is based on the `01-Login` source code. Add the following to the `views/user.jade` template to display the new `country` field:

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
