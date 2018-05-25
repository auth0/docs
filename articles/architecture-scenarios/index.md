---
url: /architecture-scenarios
title: Architecture Scenarios
description: Learn about the common architecture scenarios that you will use to solve the authorization and authentication needs of your application.
---
# Architecture Scenarios

This page describes the typical architecture scenarios we have identified when working with customers on implementing Auth0.

Click on any scenario to get more information.

## Application Configurations

These scenarios describe the different type of technology architectures your application may use, and how Auth0 can help for each of those.

<div class="architecture-scenarios-container">
  <a href="/architecture-scenarios/web-app-sso" class="architecture-scenarios-card">
    <article>
      <img src="/media/articles/architecture-scenarios/web-oidc.png" alt="Architecture Diagram">
      <div class="architecture-scenarios-card-content">
        <h3>Single Sign-On for Regular Web Apps</h3>
        <p>Traditional web application which needs to authenticate users using OpenID Connect.</p>
      </div>
    </article>
  </a>
  <a href="/architecture-scenarios/server-api" class="architecture-scenarios-card">
    <article>
      <img src="/media/articles/architecture-scenarios/server-api.png" alt="Architecture Diagram">
      <div class="architecture-scenarios-card-content">
        <h3>Server Application + API</h3>
        <p>Server to server communication where a server needs to make secure calls to an API.</p>
      </div>
    </article>
  </a>
  <a href="/architecture-scenarios/spa-api" class="architecture-scenarios-card">
    <article>
      <img src="/media/articles/architecture-scenarios/spa-api.png" alt="Architecture Diagram">
      <div class="architecture-scenarios-card-content">
        <h3>SPA + API</h3>
        <p>Single Page Web Application which talks to an API. The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.</p>
      </div>
    </article>
  </a>
  <a href="/architecture-scenarios/mobile-api" class="architecture-scenarios-card">
    <article>
      <img src="/media/articles/architecture-scenarios/mobile-api.png" alt="Architecture Diagram">
      <div class="architecture-scenarios-card-content">
        <h3>Mobile + API</h3>
        <p>Mobile Application which talks to an API. The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.</p>
      </div>
    </article>
  </a>
</div>

## Under Construction

These scenarios are under construction and will soon be updated. Some describe the different type of technology architectures your application may use, while others describe the architecture depending on the type of businesses (B2C, B2B, B2E), and how Auth0 can help in each of these scenarios.

<div class="architecture-scenarios-container">
  <a href="/architecture-scenarios/web-saml" class="architecture-scenarios-card">
    <article>
      <img src="/media/articles/architecture-scenarios/web-saml.png" alt="Architecture Diagram">
      <div class="architecture-scenarios-card-content">
        <h3>Regular Web App (using SAML)</h3>
        <p>Traditional web application which needs to authenticate users using SAML2.</p>
      </div>
    </article>
  </a>
  <% cache.find('articles/architecture-scenarios/under-construction', {sort: 'order'}).forEach(article => { %>
    <a href="<%- article.url %>" class="architecture-scenarios-card">
      <article>
        <img src="<%- article.image %>" alt="Architecture Diagram">
        <div class="architecture-scenarios-card-content">
          <h3><%- article.title %></h3>
          <p><%- article.extract %></p>
        </div>
      </article>
    </a>
  <% }); %>
</div>
