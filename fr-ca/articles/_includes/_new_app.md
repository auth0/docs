## Configure Auth0
### Get Your Application Keys

When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the [Application Settings](${manage_url}/#/applications) section in the Auth0 dashboard.

<% if(typeof hideDashboardScreenshot === 'undefined' || hideDashboardScreenshot !== true) { %>
![App Dashboard](/media/articles/dashboard/client_settings.png)
<% } %>

<% if(typeof isPublicClient === 'undefined' || isPublicClient === true) { %>
::: note
When using the Default App with a Native or Single Page Application, ensure to update the **Token Endpoint Authentication Method** to `None` and set the **Application Type** to either `SPA` or `Native`. 
:::
<% } %>

You need the following information:

* **Domain**
* **Client ID**
<% if(typeof showClientSecret !== 'undefined' && showClientSecret === true) { %>
* **Client Secret**
<% } %>

<% if(typeof hideDownloadSample === 'undefined' || hideDownloadSample !== true) { %>
::: note
If you download the sample from the top of this page, these details are filled out for you.
:::
<% } %>
