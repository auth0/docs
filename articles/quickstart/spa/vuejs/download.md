To run the example you need [Node.JS LTS](https://nodejs.org/en/download/) installed, and follow these steps:

- Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
http://localhost:3000/callback
```
- Set **Allowed Web Origins** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
http://localhost:3000
```
- Uncompress the downloaded .zip file.
- Open a command prompt window.
- Change the directory to where the quickstart was uncompressed.
- Execute the following commands:
```bash
npm install
npm start
```
- You can also run it as a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / OSX
sh exec.sh

# In Windows' Powershell
./exec.ps1
```