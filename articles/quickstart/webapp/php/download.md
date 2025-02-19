To run the sample follow these steps:

1. Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:

```text
http://127.0.0.1:3000/callback
```

2. Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:

```text
http://127.0.0.1:3000/logout
```

3. Make sure <a href="http://php.net/downloads.php" target="_blank" rel="noreferrer">PHP</a> and <a href="https://getcomposer.org/download/" target="_blank" rel="noreferrer">Composer</a> are installed and execute the following commands in the sample's directory:

```bash
composer run app
```

You can also run it from <a href="https://www.docker.com" target="_blank" rel="noreferrer">Docker</a> with the following commands:

```bash
composer run docker
```
