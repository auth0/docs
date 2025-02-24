To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:

```text
http://localhost:3000/auth/auth0/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:

 ```text
http://localhost:3000
```

3) Make sure <a href="http://installrails.com/" target="_blank" rel="noreferrer">Rails</a> is installed and execute the following commands in the sample's directory:

```bash
bundle install
rails s --port 3000
```

You can also run it from a <a href="https://www.docker.com" target="_blank" rel="noreferrer">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```