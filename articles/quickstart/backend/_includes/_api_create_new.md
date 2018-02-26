## Configure Auth0 APIs
### Create an API

<<<<<<< HEAD
In the [APIs](${manage_url}/#/apis) section of the Auth0 dashboard, click **Create API**. Provide a name and an identifier for your API. You will use the identifier as an `audience` later, when you are configuring the Access Token verification. For **Signing Algorithm**, select **RS256**.
=======
In the [APIs](${manage_url}/#/apis) section of the Auth0 dashboard, click **Create API**. Provide a name and an identifier for your API, for example `https://quickstarts/api`. You will use the identifier as an `audience` later, when you are configuring the access token verification. For **Signing Algorithm**, select **RS256**.
>>>>>>> Improved API QS structure

![Create API](/media/articles/server-apis/create-api.png)

<% if (typeof sampleLink == 'string') { %>
<%= include('../_includes/_api_jwks_description', { sampleLink: sampleLink }) %>
<% } else { %>
<%= include('../_includes/_api_jwks_description') %>
<% }  %>
### Define Scopes
<%= include('../_includes/_api_scopes_access_resources') %>
