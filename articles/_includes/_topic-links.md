<ul class="topic-links">
<% var findByHash = articles.findByHash; %>
<% _.forEach(links, function(hash) { %>
  <% var article = findByHash(hash); %>
  <% if (!article) { throw new Error('Invalid hash: ' + hash); } %>
  <li>
    <i class="icon icon-budicon-715"></i><a href="${article.url}">${article.title}</a>
    <p>
      ${article.description}
    </p>
  </li>
<% }) %>
</ul>
