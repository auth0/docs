To run the sample first set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings):

  ```text
myapp://callback
  ```

Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings):

  ```text
myapp://callback
  ```

Then, to run it **on Windows**:

1) Open the Auth0MauiApp.sln in [Visual Studio 2022](https://www.visualstudio.com/vs/).
2) Click the **Start** button (the green play button), ensure to select your target device. 
You can also start the application using the **Debug | Start Debugging** option from the main menu.

To run it on **macOS**:

1) Open the Auth0MauiApp.sln in [Visual Studio for Mac](https://visualstudio.microsoft.com/vs/mac/).
2) Click the **Start** button (the play button), ensure to select your target device. You can also start the application using the **Run | Start Debugging** option from the application menu
