<ul class="topic-links">
<% _.forEach(links, function(path) {
  var article = cache.get('articles/' + path);
  %>
  <li>
    <i class="icon icon-budicon-715"></i><a href="${article.url}">${article.title}</a>
    <p>
      ${article.description}
      <% if (article.img) { %>
				<img src='${article.img}' alt='${article.title}'>
      <% } %>
      <% if (article.mobileimg) { %>
        <div class="phone-mockup"><img src='${article.mobileimg}' alt='${article.title}'></div>
      <% } %>
    </p>
  </li>
<% }) %>
</ul>
