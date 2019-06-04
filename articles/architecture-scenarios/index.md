---
title: Architecture Scenarios
classes: topic-page
description: Learn about the common architecture scenarios that you will use to solve the authorization and authentication needs of your application.
topics:
    - architecture
    - api-auth
    - authorization-code
contentType: 
    - index
    - concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---
# Architecture Scenarios

This page describes the typical architecture scenarios we have identified when working with customers on implementing Auth0. We have also included [implementation checklists](/architecture-scenarios/checklists) that you can use to plan your implementation. 

## Application configurations

These scenarios describe the different type of technology architectures your application may use, and how Auth0 can help for each of those. Each scenario comes with:

* A sample business case
* The goals and requirements that the implementation must meet
* Detailed explanations of the architectural solutions
* A sample implementation

The goal of these scenarios is to walk you through the implementation process from beginning to end.

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/web-app-sso">Single Sign-On for Regular Web Apps</a>
    <p>Traditional web application which needs to authenticate users using OpenID Connect.</p>
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
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2b">Business to Business Identity Scenarios</a>
    <p>SaaS applications with users associated with third-party companies registered as tenants of the SaaS app.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2c">Business to Consumer Identity Scenarios</a>
    <p>SaaS/eCommerce apps with customers as end users using the OpenID Connect protocol.</p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/b2e">Business to Employees Identity Scenarios</a>
    <p>Enterprise directory services using federation to allow employees to log in to applications using their existing enterprise credentials.</p>
  </li>
</ul>

## Implementation resources

You can find many [helpful resources](/architecture-scenarios/implementation-resources) to help you learn about Auth0, get started quickly, test sample code, and try out APIs. 

We also provide an Auth0 Community forum and Blog that provides you with ways to connect with the world of Auth0. 

The Support Center helps you with issues and to manage your subscription. We also have a feedback portal.

Our Professional Services team is also available to help you with your architecture needs including pre-launch advice, production checklists, and operational policies. 

We've made it easy to use our Status Dashboard and we also provide ways to monitor endpoints and log data. 

Our Announcements pages keep you up to date with happenings at Auth0 and we also have many ways to you to stay up to date with all the privacy, security, and compliance information that you need. 