## Application Keys

<% if (!account.userName) { %>

  The first step for integrating Auth0 in your app is to create an [account](${manage_url}/login). When you sign up for Auth0, you will be invited to create a new client.

<% } else { %>
  When you signed up for Auth0, you were invited to create a new client.

<% } %>
  There are some details about this client that your application needs to know about to properly communicate with Auth0. These include your **Client ID**, **Domain**, and **Client Secret**. You can retrieve these values from the settings area for your client in the Auth0 [dashboard](${manage_url}/#/).

  Please note that if you download the samples available for this tutorial, these keys will be pre-populated for you. If you have created more than one client in your account, the sample will come with the values for your **Default App**.

  ![App Dashboard](/media/articles/dashboard/client_settings.png)