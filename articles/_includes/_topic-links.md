<ul class="topic-links">
<% _.forEach(links, function(path) {
  var path = 'articles/' + path;
  var article = cache.get(path);
  if (!article) { throw new Error('Invalid path: ' + path); } %>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/docs${article.url}">${article.title}</a>
    <p>
      ${article.description}
    </p>
  </li>
<% }) %>
</ul>
