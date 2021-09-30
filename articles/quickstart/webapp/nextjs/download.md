<!-- markdownlint-disable MD031 MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
http://localhost:3000/api/auth/callback
```

2) Set **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
http://localhost:3000
```

3) Create a `.env.local` file under your root project directory that defines the necessary Auth0 configuration values:
```sh
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://${account.namespace}'
AUTH0_CLIENT_ID='${account.clientId}'
AUTH0_CLIENT_SECRET='${account.clientSecret}'
```

4) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the root directory:
```bash
npm install && npm run dev
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh

# In Windows' Powershell
./exec.ps1
```
