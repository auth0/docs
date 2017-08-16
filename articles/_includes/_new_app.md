## Get Your Application Keys

<% if (!account.userName) { %>

  The first step for integrating Auth0 in your app is to create an [account](${manage_url}/login). When you sign up for Auth0, you will be invited to create a new client.

<% } else { %>
  When you signed up for Auth0, you were invited to create a new client.

<% } %>
  Your application needs to know some details about this client to communicate with Auth0. You can get these details from the Settings section for your client in the Auth0 [dashboard](${manage_url}/#/).

  You need the following details:
  * **Client ID**
  * **Domain**

  ::: note
  If you download the samples from the top of this page, these details are pre-populated for you. If you have more than one client in your account, the sample comes with the values for your **Default App**.
  :::

  ![App Dashboard](/media/articles/dashboard/client_settings.png)