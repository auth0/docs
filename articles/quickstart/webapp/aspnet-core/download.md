<!-- markdownlint-disable MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://localhost:3000
```

3) Make sure [.NET Core](https://www.microsoft.com/net/download) is installed, and run the following commands:

```bash
dotnet run
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```
