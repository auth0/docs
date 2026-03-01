To run the sample first set the **Allowed Callback URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a>:

  ```text
myapp://callback
  ```

Set the **Allowed Logout URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a>:

  ```text
myapp://callback
  ```

Then, to run it **on Windows**:

1) Open the Auth0MauiApp.sln in <a href="https://www.visualstudio.com/vs/" target="_blank" rel="noreferrer">Visual Studio 2022</a>.
2) Click the **Start** button (the green play button), ensure to select your target device. 
You can also start the application using the **Debug | Start Debugging** option from the main menu.

To run it on **macOS**:

1) Open the Auth0MauiApp.sln in <a href="https://visualstudio.microsoft.com/vs/mac/" target="_blank" rel="noreferrer">Visual Studio for Mac</a>.
2) Click the **Start** button (the play button), ensure to select your target device. You can also start the application using the **Run | Start Debugging** option from the application menu
