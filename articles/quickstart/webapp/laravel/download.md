To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
http://localhost:3000/auth0/callback
```

2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
http://localhost:3000
```

3) Make sure [PHP](http://php.net/downloads.php) and [Composer](https://getcomposer.org/download/) are installed and execute the following commands in the sample's directory:

```bash
composer install
php artisan migrate
php artisan key:generate
php artisan serve --port=3000
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```