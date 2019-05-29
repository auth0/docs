To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
${account.callback}
```

2) Make sure [PHP](http://php.net/downloads.php) and [Composer](https://getcomposer.org/download/) are installed and execute the following commands in the sample's directory:

```bash
composer install
php -S localhost:3000
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```
