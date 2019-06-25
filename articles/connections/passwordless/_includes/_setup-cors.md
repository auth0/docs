### Configure Cross-Origin Resource Sharing (CORS)

For security purposes, your app's origin URL must be listed as an approved URL. If you have not already added it to the <dfn data-key="callback">**Allowed Callback URLS**</dfn> for your application, you will need to add it to the list of **Allowed Origins (CORS)**. 

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/). 

2. Click the name of your application to see its settings.

![View Application Settings](/media/articles/clients/change-client-secret/clients.png)

3. Scroll to **Allowed Origins (CORS)**, enter your app's origin URL, then click **Save Changes**.

![Enter Allowed Origin URL](/media/articles/clients/change-client-secret/client-settings.png)
