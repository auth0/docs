## Get Your Application Keys

<% if (!account.userName) { %>

  The first step for integrating Auth0 in your app is to create an [account](${manage_url}/login). When you sign up for Auth0, you will be invited to create a new application (client).

<% } else { %>
  When you signed up for Auth0, you created a new application (client).

<% } %>
  Your application needs some details about this client application to communicate with Auth0. You can get these details from the **Settings** section for your application in the [Auth0 dashboard](${manage_url}/#/).

  You need the following information:
  * **Client ID**
  * **Domain**

  ::: note
  If you download the sample from the top of this page, these details are filled out for you. If you have more than one application in your account, the sample comes with the values for your **Default App**.
  :::

  ![App Dashboard](/media/articles/dashboard/client_settings.png)