To run the sample follow these steps:

1. Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://127.0.0.1:3000/callback
```

2. Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://127.0.0.1:3000/logout
```

3. Create a `.env` file in your project directory with the following content:

```sh
# ---------
# Required:
# ---------

# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=${account.clientId}

# The URL of your Auth0 tenant domain
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=${account.clientSecret}

# A long, secret value used to encrypt the session cookie.
# This can be generated using `openssl rand -hex 32` from your shell.
AUTH0_COOKIE_SECRET={LONG_RANDOM_VALUE}

# -------------------------------------------------------------------------
# Optional: Remove the leading # from the following options to enable them:
# -------------------------------------------------------------------------

# If you're using a Custom Domain, enter it here:
# AUTH0_CUSTOM_DOMAIN=

# How long the cookie session should last on the end-user device. (0 will clear when the browser window closes.)
# AUTH0_COOKIE_EXPIRES=0

# An API Identifier for testing custom APIs.
# AUTH0_AUDIENCE=

# An Organization Id for testing Organizations.
# AUTH0_ORGANIZATION=
```

4. Make sure [PHP](http://php.net/downloads.php) and [Composer](https://getcomposer.org/download/) are installed and execute the following commands in the sample's directory:

```bash
composer run app
```

You can also run it from [Docker](https://www.docker.com) with the following commands:

```bash
composer run docker
```
