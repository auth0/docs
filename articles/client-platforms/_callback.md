---
public: false
---

### Before Starting

<div class="setup-callback">
<% if (account.userName && hasCallback) { %>
<p>Please remember that for security purposes, you have to register the URL of your app in the <a href="<%= uiAppSettingsURL %>">Application Settings</a> section as the callbackURL.</p>
<p>Right now, that callback is set to the following:
<pre><code><%= account.callback %></code></pre>
</p>
<% } else { %>
<p>Please remember that for security purposes, you have to register the URL of your app in the <a href="${uiURL}/#/applications">Application Settings</a> section as the callbackURL.</p>
<% } %>

</div>
