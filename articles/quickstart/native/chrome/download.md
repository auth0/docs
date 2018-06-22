
To run the samples follow these steps:

1) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample directory:
```bash
npm install
```
2) Open the **Chrome Extension Management** page by navigating to chrome://extensions.
3) **Enable Developer Mode** by clicking the toggle switch next to Developer mode.
4) Click the **LOAD UNPACKED** button and select the quickstart directory.
5) After the extension is added, it will get an extension id displayed that will be visible in the Extension Management page.
6) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
https://<YOUR_EXTENSION_ID>.chromiumapp.org/auth0
```
7) Also set the **Allowed Origins (CORS)** in [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) setting to:
```bash
chrome-extension://<YOUR_EXTENSION_ID>
```

The extension can be executed by clicking the icon with an [A] in the Chrome toolbar.