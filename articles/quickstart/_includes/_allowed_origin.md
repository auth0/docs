## Specify an Allowed Origin

Auth0 needs to know which URL origins should be allowed to make requests for authentication against your client application. In your [client settings](${manage_url}/#/clients/${account.clientId}/settings), list any URLs that should be allowed to make these requests. If you are following along with this tutorial directly, the origin should be:

```bash
${callback}
```