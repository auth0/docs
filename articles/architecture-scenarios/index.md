---
url: /architecture-scenarios
classes: topic-page
title: Architecture Scenarios
description: Learn about the common architecture scenarios that you will use to solve the authorization and authentication needs of your application.
topics:
    - architecture
    - api-auth
    - authorization-code
    - b2c
    - b2b
    - ciam
contentType: index
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
  - implementation
---
<!-- markdownlint-disable MD041 MD002 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Architecture Scenarios</h1>
  <p>
  This page describes the typical architecture scenarios we have identified when working with customers on implementing Auth0. 
  </p>
</div>

## Application configurations

These scenarios describe the different type of technology architectures your application may use, and how Auth0 can help for each of those. 

The goal of these scenarios is to walk you through the implementation process from beginning to end.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2b">Business to Business Identity and Access Management</a>
    <p>SaaS applications with users associated with third-party companies registered as tenants of the SaaS app.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2c">Business to Consumer Identity and Access Management</a>
    <p>SaaS/eCommerce apps with customers as end users using the OpenID Connect protocol.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2e">Business to Employee Identity Scenarios</a>
    <p>Enterprise directory services using federation to allow employees to log in to applications using their existing enterprise credentials.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/web-app-sso">Single Sign-On for Regular Web Apps</a>
    <p>Traditional web application which needs to authenticate users using <dfn data-key="openid">OpenID Connect (OIDC)</dfn>.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/server-api">Server Application + API</a>
    <p>Server to server communication where a server needs to make secure calls to an API.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/spa-api">SPA + API</a>
    <p>Single-Page Web Application which talks to an API. The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/mobile-api">Mobile + API</a>
    <p>Mobile Application which talks to an API. The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.</p>
  </li>
</ul>

## Implementation checklists

<%= include('./_includes/_implementation-checklists.md') %>

## Implementation resources

Auth0 provides many [resources](/architecture-scenarios/implementation-resources) to help you learn about Auth0, get started quickly, test sample code, and try out APIs.

The Auth0 [Community](https://community.auth0.com) forum and [Blog](https://auth0.com/blog) connect you with the world of Auth0, while our [Support Center](https://support.auth0.com) helps you report issues and manage your subscription. Additionally, you can submit suggested product enhancements through our feedback portal.

We've also made it easy to use our [Status Dashboard](https://status.auth0.com), monitor endpoints, and log data. Notifications keep you up-to-date with Auth0 announcements, and we provide a variety of methods to stay informed about privacy, security, and compliance.

In addition, our [Professional Services](/services) team is available to help you with any architecture needs, including pre-launch advice, production checklists, and operational policies.
