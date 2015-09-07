---
public: false
---

<%
  var absoluteUrl = env.DOMAIN_URL_DOCS;
  if (env.BASE_URL && env.BASE_URL !== '') {
    absoluteUrl += '/' + env.BASE_URL;
  }
%>


<div id="package" class="package">
  <div class="row">
    <div class="info">
      <i class="icon-budicon-715"></i>
    <% if (account.userName) { %>
      <p class="configured">Download a sample project configured with your Auth0 API Keys.</p>
    <% } else { %>
      <p>Download a sample project.</p>
    <% } %>
    </div>
    <div class="button-area">
      <a href="${env.DOMAIN_URL_DOCS}/${pkgRepo}/${pkgBranch}/create-package?path=${pkgPath}&filePath=${pkgFilePath}&type=${pkgType}" class="btn btn-sm btn-success" rel="nofollow">Get Seed Project</a>
    </div>
  </div>
</div>
