---
title: Forthcoming Architecture Scenarios
tags:
    - architecture-scenarios
---
# Forthcoming Architecture Scenarios

These following architecture scenarios are under construction and will soon be updated.

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
