<!-- markdownlint-disable MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:

```text
http://localhost:3000/callback,https://localhost:7113/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:

```text
http://localhost:3000,https://localhost:7113
```

3) Make sure <a href="https://www.microsoft.com/net/download" target="_blank">.NET Core</a> is installed, and run the following commands:

```bash
dotnet run
```

You can also run it from a <a href="https://www.docker.com" target="_blank">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```
