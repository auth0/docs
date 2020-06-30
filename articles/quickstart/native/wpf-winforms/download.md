To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
https://${account.namespace}/mobile
```
2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
https://${account.namespace}/mobile
```
3) Open the WPFSample.sln or WindowsFormsSample.sln solution in [Visual Studio 2017](https://www.visualstudio.com/vs/).
4) Click the **Start** button (the green play button), or select the **Debug | Start Debugging** option from the main menu.
