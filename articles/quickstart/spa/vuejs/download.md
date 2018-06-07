To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
http://localhost:3000/callback
```
2) Set **Allowed Web Origins** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
http://localhost:3000
```
3) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample directory:
```bash
npm install
npm start
```
You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / OSX
sh exec.sh
# In Windows' Powershell
./exec.ps1
```