<% _.forEach(links, function(path) {
  var article = cache.get('articles/' + path);
  %>
  <h4>
    <a href="${article.url}">${article.title}</a>
  </h4>
    <p>
      ${article.description}
    </p>
  <hr/>
<% }) %>