## Configure Auth0
### Get Your Application Keys

When you signed up for Auth0, a new application was created for you, or you could have created a new one.

You will need some details about that application to communicate with Auth0. You can get these details from the [Application Settings](${manage_url}/#/applications) section in the Auth0 dashboard.

You need the following information:

* **Domain**
* **Client ID**
<% if(typeof showClientSecret !== 'undefined' && showClientSecret === true) { %>
* **Client Secret**
<% } %>

<% if(typeof hideDownloadSample === 'undefined' || hideDownloadSample !== true) { %>
::: note
If you download the sample from the top of this page these details are filled out for you.

If you have more than one application in your account, the sample comes with the values for your **Default App**.
:::
<% } %>

<% if(typeof hideDashboardScreenshot === 'undefined' || hideDashboardScreenshot !== true) { %>
![App Dashboard](/media/articles/dashboard/client_settings.png)
<% } %>
