---
title: Introduction
description: Short Introduction to the Auth0 Java Spring Quickstarts.
budicon: 715
---

This multistep quickstart guide will walk you through managing authentication in your Java Spring MVC Application with Auth0.

## Sample Projects

Each tutorial in the series includes a link to its corresponding sample project. You can find all the samples [here](https://github.com/auth0-samples/auth0-spring-mvc-sample).

## Dependencies

Each tutorial will require you to use the [java-mvc-commons](https://github.com/auth0/auth0-java-mvc-common) library. This is a toolkit that lets you authenticate with the [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

## Create a Client

If you haven't already done so, create a new client application in your [Auth0 dashboard](${manage_url}/#/applications/${account.clientId}/settings) and choose **Regular Web Application** for the Type and **POST** for the Token Endpoint Authentication Method.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_setup') %>
