The Auth0 PHP SDK requires [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos), a tool for dependency management in PHP. Composer allows you to declare the dependent libraries your project needs and installs them for you. Please ensure Composer is installed and accessible from your shell before continuing.

Run the following shell command within your project directory to install the Auth0 PHP SDK:

```sh
composer require auth0/auth0-php
```

This will create a `vendor` folder within your project and download all the dependencies needed to use the Auth0 PHP SDK. This will also create a `vendor/autoload.php` file used in the sample to load all necessary classes for your application to function. It's important you require this autoload file in your project for the SDK to work.
