To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:

```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:

```text
http://localhost:3000
```

3) Make sure <a href="https://golang.org/dl/" target="_blank">Go</a> is installed and execute the following commands in the sample's directory:

```bash
go mod vendor
go run main.go
```

You can also run it from a <a href="https://www.docker.com" target="_blank">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```
