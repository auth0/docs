

<div class="panel panel-primary">
  <div class="panel-heading">Video Content</div>
  <% var article = _.find(articles.findByHash('videos').items, { hash: hash }); %>
  <div class="panel-body">
    <div class="media">
      <div class="media-left">
        <span class="wistia_embed wistia_async_${article.id} popover=true popoverAnimateThumbnail=true playerPreference=html5" style="display:inline-block;height:84px;width:150px">&nbsp;</span>
        <script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async></script>
      </div>
      <div class="media-body">
        <h4 class="media-heading">${article.short_title}</h4>
        <p>${article.description}</p>
      </div>
    </div>
  </div>
</div>
