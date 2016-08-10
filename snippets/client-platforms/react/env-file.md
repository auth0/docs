Note that you are creating `auth` as an `AuthService` instance and passing it your Auth0 credentials. The variables `__AUTH0_CLIENT_ID__` and `__AUTH0_DOMAIN__` will be replaced by webpack using the content of the `.env` file.

<% if (account.userName) { %>
If you do not have that file, you can create your own with the following command:

```bash
$ echo "AUTH0_CLIENT_ID='${account.clientId}\nAUTH0_DOMAIN='${account.namespace}'" > .env
```
<% } else { %>
If you do not have that file, you can create your own based on the `.env.example` provided with the sample project. Copy this file and modify it, adding your own credentials.

```bash
$ cp .env.example .env
```
<% } %>
