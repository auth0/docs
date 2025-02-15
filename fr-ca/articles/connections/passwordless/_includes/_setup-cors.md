### Configure Cross-Origin Resource Sharing (CORS)

For security purposes, your app's origin URL must be listed as an approved URL. If you have not already added it to the <dfn data-key="callback">**Allowed Callback URLS**</dfn> for your application, you will need to add it to the list of **Allowed Origins (CORS)**. 

1. Navigate to [Auth0 Dashboard > Applications > Applications](${manage_url}/#/applications), and select the name of your application to see its settings.

2. Locate **Allowed Origins (CORS)**, enter your application's [origin URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin), and select **Save Changes**.
