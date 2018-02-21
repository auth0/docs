## Get Your Application Keys

<% if (!account.userName) { %>

  The first step for integrating Auth0 in your app is to create an [account](${manage_url}/login). When you sign up for Auth0, you will be invited to create a new client.

<% } else { %>
  When you signed up for Auth0, you created a new client.

<% } %>
  Your application needs some details about this client to communicate with Auth0. You can get these details from the **Settings** section for your client in the [Auth0 dashboard](${manage_url}/#/).

  You need the following information:
  * **Client ID**
  * **Domain**

  ::: note
<% if (!account.userName) { %>
  You are not logged in into Auth0. If you log in, these details will be filled out for you. If not, you will need to fill them after downloading the sample, following the instructions in the sample's README.MD file.
<% } else { %>
  If you download the sample from the top of this page, these details are filled out for you. If you have more than one client in your account, the sample comes with the values for your **Default App**.
<% } %>
  :::

  ![App Dashboard](/media/articles/dashboard/client_settings.png)