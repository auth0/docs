To run it from the command line:

```bash
composer install
php artisan migrate
php artisan key:generate
php artisan serve --port=3000
```

The example includes a [Docker](https://www.docker.com) image ready to run with the following command:

```bash
# In Linux / OSX
sh exec.sh

# In Windows' Powershell
./exec.ps1
```