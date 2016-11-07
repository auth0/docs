<ul class="topic-links">
<% _.forEach(links, function(path) {
  var article = cache.get('articles/' + path);
  %>
  <li>
    <i class="icon icon-budicon-715"></i><a href="${article.url}">${article.title}</a>
    <p>
      ${article.description}
    </p>
  </li>
<% }) %>
</ul>
