---
url: /addons
description: 
---

<style>
.addon {
  padding: 15px;
  /*border: 1px solid $gray-lighter;*/
}
.addon-content {
  text-align: center;
  min-height: 150px;
}
.addon-content:before {
  content: ' ';
  display: inline-block;
  vertical-align: middle;
  height: 90px;
}
.addon-image-wrap {
  display: inline-block;
  vertical-align: middle;
}
.addon-image-wrap img {
  max-height: 80px;
  max-width: 120px;
}
</style>

# Addons Supported by Auth0

<% var clientAddons = cache.find('articles/addons/client-addons', {sort: 'index'}); %>
<%= include('./_addons', { addons: clientAddons }) %>

