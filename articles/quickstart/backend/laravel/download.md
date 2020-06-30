To run it from the command line:

```bash
composer install
php artisan key:generate
php artisan serve --port=3010
```

The sample includes a [Docker](https://www.docker.com) image ready to run with the following command:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```