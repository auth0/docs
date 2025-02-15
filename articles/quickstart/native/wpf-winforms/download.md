To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:

```text
https://${account.namespace}/mobile
```
2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:
```text
https://${account.namespace}/mobile
```
3) Open the WPFSample.sln or WindowsFormsSample.sln solution in <a href="https://www.visualstudio.com/vs/" target="_blank">Visual Studio 2017</a>.
4) Click the **Start** button (the green play button), or select the **Debug | Start Debugging** option from the main menu.
