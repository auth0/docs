<% var findByHash = articles.findByHash %>
<div class="topic-list">
<% _.forEach(meta.articles, function(hash) { %>
  <% var article = findByHash(hash); %>
  <div class="topic">
    <h2 class="topic-title"><a href="${ '/docs' + article.url}">${article.title}</a></h2>
    <p>${article.description}</p>
  </div>
<% }); %>
</div>
