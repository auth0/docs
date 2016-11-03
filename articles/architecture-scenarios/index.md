---
url: /architecture-scenarios
title: Architecture Scenarios
description: Learn about the common architecture scenarios that you will use to solve the authorization and authentication needs of your application.
---

# Architecture Scenarios

This page describes the typical architecture scenarios we have identified when working with customers on implementing Auth0.

The first set, called Application Configurations, describes the typical application implementation patterns.

The second set, called Business Scenarios, describes the architecture depending on the type of businesses, whether that be B2C (Business to Consumer applications), B2B (Business to Business applications), B2E (Enterprise applications), or a combination of B2B and B2E.
Click on any scenario to get more information.

<section class="architecture-scenarios-content">
  <div class="showcase-section clearfix">
    <h5>Application Configurations</h5>
    <p>These scenarios describe the different type of technology architectures you application may use, and how Auth0 can help for each of those</p>
    <% cache.find('articles/architecture-scenarios/application', {sort: 'order'}).forEach(article => { %>
      <a href="<%- '/docs' + article.url %>" class="architecture-scenarios-card">
        <article>
          <header class="architecture-scenarios__img">
              <figure><img src="<%- article.image %>"></figure>
            </header>
            <div class="architecture-scenarios__text">
              <h3><%- article.title %></h3>
              <p><%- article.extract %></p>
            </div>
            <footer class="architecture-scenarios__link">
              <span>Read more</span>
            </footer>
          </article>
      </a>
    <% }); %>
  </div>
  <div class="showcase-section clearfix">
    <h5>Business Scenarios</h5>
    <p>These scenarios describe the type of businesses which implement Auth0, and how Auth0 can help in each of those business scenarios</p>
    <% cache.find('articles/architecture-scenarios/business', {sort: 'order'}).forEach(article => { %>
      <a href="<%- '/docs' + article.url %>" class="architecture-scenarios-card">
        <article>
          <header class="architecture-scenarios__img">
              <figure><img src="<%- article.image %>"></figure>
            </header>
            <div class="architecture-scenarios__text">
              <h3><%- article.title %></h3>
              <p><%- article.extract %></p>
            </div>
            <footer class="architecture-scenarios__link">
              <span>Read more</span>
            </footer>
          </article>
      </a>
    <% }); %>
  </div>
</section>
