# <%= meta.name %> API

Please follow the steps below to configure your Auth0 account to work with <%= meta.name %>.

### 1. Activate the add-on.

<% if (account.clientId) { %>
Go to <a href="${manage_url}/#/applications/${account.clientId}/addons">Application Add-ons</a> page and activate the <%= meta.name %> add-on.
<% } else { %>
Go to <a href="${manage_url}/#/applications/">Application Add-ons</a> page and activate the <%= meta.name %> add-on.
<% } %>


![](/media/articles/server-apis/addons.png)

Each integration is different and requires different parameters and configuration. Once the add-on is activated, you will see tailored instructions with details on how to get this done.

### 2. Use it

The key to this integration is the Delegation endpoint in Auth0. Check the documentation of any of our FrontEnd or Mobile SDKs to learn how to call [this endpoint](/auth-api#delegated). You can download your favorite library from any of the [Quickstarts](/).

### 3. You are done!

Congrats! You've implemented Delegation for the <%= meta.name %> API
