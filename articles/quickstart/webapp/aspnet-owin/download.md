To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a> to:
```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a> to:
```text
http://localhost:3000
```

3) Open the project in <a href="https://visualstudio.microsoft.com/vs/" target="_blank" rel="noreferrer">Visual Studio</a>.

4) Click the `Start` button or select the menu option `Debug | Start Debugging` or use the keyboard shortcut `F5`.