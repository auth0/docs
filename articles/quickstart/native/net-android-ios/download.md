To run the sample first set the **Allowed Callback URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a> so it works for both Android and iOS apps:

  ```text
com.auth0.quickstart://${account.namespace}/android/com.auth0.quickstart/callback com.auth0.iossample://${account.namespace}/ios/com.auth0.iossample/callback
  ```

Set the **Allowed Logout URLs** in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a> so it works for both Android and iOS apps:

  ```text
com.auth0.quickstart://${account.namespace}/android/com.auth0.quickstart/callback com.auth0.iossample://${account.namespace}/ios/com.auth0.iossample/callback
  ```

Then, to run it **on Windows**:

1) Open the AndroidSample.sln or iOSSample.sln solution in <a href="https://www.visualstudio.com/vs/" target="_blank" rel="noreferrer">Visual Studio 2017</a>.
2) Click the **Start** button (the green play button), optionally selecting your target device. 
You can also start the application using the **Debug | Start Debugging** option from the main menu.

To run it on **macOS**:

1) Open the AndroidSample.sln or iOSSample.sln solution in <a href="https://visualstudio.microsoft.com/vs/mac/" target="_blank" rel="noreferrer">Visual Studio for Mac</a>.
2) Click the **Start** button (the play button), optionally selecting your target device. You can also start the application using the **Run | Start Debugging** option from the application menu
