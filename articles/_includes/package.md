---
public: false
---

<div id="package" class="package">
  <div class="row">
    <div class="col-xs-12 col-md-6 info"><i class="icon-budicon-715"></i>
    <% if (account.userName) { %>
      <p>Download a sample project configured with your Auth0 API Keys.</p>
    <% } else { %>
      <p>Download a sample project.</p>
    <% } %>
    </div>
    <div class="col-xs-12 col-md-6"><a href="/${pkgRepo}/${pkgBranch}/create-package?path=${pkgPath}&filePath=${pkgFilePath}&type=${pkgType}" class="btn btn-sm btn-success">Download Seed Project</a></div>
  </div>
</div>
