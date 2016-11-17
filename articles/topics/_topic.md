<div class="topic-list">
<% _.forEach(meta.articles, function(path) {
  var article = cache.get('articles/' + path); %>
  <div class="topic">
    <h2 class="topic-title"><a href="${article.url}">${article.title}</a></h2>
    <p>${article.description}</p>
  </div>
<% }); %>
</div>
