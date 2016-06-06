---
url: /videos
title: Auth0 Developer Videos
description: A selection of videos showing developers how to perform common tasks with Auth0.
---


# Developer Videos
Below you will find a selection of videos that will introduce you to various topics in the Auth0 platform.

<div style="margin-top: 30px; margin-bottom: 50px;">
<% _.forEach(_.sortBy(articles.findByHash('videos').items, 'order'), function(article) { %>
  <% if (article.id) { %>
  <div class="media">
    <div class="media-left">
      <a href="<%- '/docs' + article.url %>"> <img style="max-width: 128px;" class="media-object" src="https://embed-ssl.wistia.com/deliveries/${article.asset_id}.jpg?image_crop_resized=640x360"> </a>
    </div>
    <div class="media-body">
    <h4 class="media-heading"><a href="<%- '/docs' + article.url %>">${article.short_title}</a></h4>
      <p>${article.description}</p>
    </div>
  </div>
  <% } %>
<% }); %>
</div>
