To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
http://localhost:5000/callback
```
2) Make sure [.NET Core 1.x](https://www.microsoft.com/net/download) is installed, and run the following commands:

```bash
dotnet restore
dotnet run
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```