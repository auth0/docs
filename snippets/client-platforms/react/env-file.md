Notice you're creating the `auth` as an `AuthService` instance and sending your auth0 credentials. The variables `__AUTH0_CLIENT_ID__` and `__AUTH0_DOMAIN__` will be replaced by webpack using the content of `.env` file.

<% if (account.userName) { %>
If you don't have that file you can create your own using the following command:

```bash
$ echo "AUTH0_CLIENT_ID='${account.clientId}\nAUTH0_DOMAIN='${account.namespace}'" > .env
```
<% } else { %>
If you don't have that file you can create your own based on `.env.example` provided with the sample project. Copy that and edit the file adding your own credentials.

```bash
$ cp .env.example .env
```
<% } %>
