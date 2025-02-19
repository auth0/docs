<!-- markdownlint-disable MD031 MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to
```text
http://localhost:3000
```
2) Set **Allowed Web Origins** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to
```text
http://localhost:3000
```
3) Set **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to
```text
http://localhost:3000
```
4) Make sure <a href="https://nodejs.org/en/download/" target="_blank" rel="noreferrer">Node.JS LTS</a> is installed and execute the following commands in the sample's directory:
```bash
npm install && npm start
```
You can also run it from a <a href="https://www.docker.com" target="_blank" rel="noreferrer">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```