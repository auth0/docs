## Specify Allowed Origins

Auth0 needs to know where authentication requests should be allowed to originate from for your app. In the [settings](${manage_url}/#/clients/${account.clientId}/settings) for your client, list any URL origins that should be allowed to send requests to Auth0. If you are following along with this tutorial directly, the origin should be:

```bash
${callback}
```