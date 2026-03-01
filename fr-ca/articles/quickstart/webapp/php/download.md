To run the sample follow these steps:

1. Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://127.0.0.1:3000/callback
```

2. Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://127.0.0.1:3000/logout
```

3. Make sure [PHP](http://php.net/downloads.php) and [Composer](https://getcomposer.org/download/) are installed and execute the following commands in the sample's directory:

```bash
composer run app
```

You can also run it from [Docker](https://www.docker.com) with the following commands:

```bash
composer run docker
```
