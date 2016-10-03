## Configure Callback URLs

<%= include('../../client-platforms/_includes/_callback-url-introduction') %>

> If you wish to only use DB connections, skip this point.

The callback URLs are meant to be used to receive the OAuth response when logging in with social connections or enterprise connections. To set a callback URL, navigate to the [settings](${manage_url}/#/applications/${account.clientId}/settings) for your client application and include the URL in the "Callback URLs" text box.
