<!-- markdownlint-disable MD031 MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
http://localhost:3000
```
2) Set **Allowed Web Origins** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
http://localhost:3000
```
3) Set **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
http://localhost:3000
```
4) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample's directory:
```bash
npm install && npm start
```
You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```