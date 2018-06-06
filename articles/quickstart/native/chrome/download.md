
To run the example you need [Node.JS LTS](https://nodejs.org/en/download/) installed, and follow these steps:

- Open a command prompt.
- Go to the directory where the quickstart was downloaded.
- Execute the following command:
```bash
npm install
```
- Open the **Chrome Extension Management** page by navigating to chrome://extensions.
- **Enable Developer Mode** by clicking the toggle switch next to Developer mode.
- Click the **LOAD UNPACKED** button and select the quickstart directory.
- After the extension is added, it will get an extension id displayed that will be visible in the Extension Management page.

- Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
https://<YOUR_EXTENSION_ID>.chromiumapp.org/auth0
```

- Also set the **Allowed Origins (CORS)** in [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) setting to:
```bash
chrome-extension://<YOUR_EXTENSION_ID>
```

The extension can be executed by clicking the icon with an [A] in the Chrome toolbar.








