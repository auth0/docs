# Auth0 Logs to Azure Blob Storage

The Auth0 Logs to Azure Blob Storage is a scheduled job takes all of your Auth0 logs and exports them to Azure Blob Storage.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Logs to Azure Blob Storage box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- __Schedule__: The frequency with which logs should be exported;
- __Auth0_Domain__: The domain of your Auth0 app;
- __Auth0_Global_Client_ID__: The Global Client ID of your Auth0 app;
- __Auth0_Global_Client_Secret__: The Global Client Secret of your Auth0 app;
- __Storage_Account_Name__: The name of the Azure storage account you want to export to (this is the DNS prefix you created when setting up your account);
- __Storage_Account_Key__: The access key (either primary or secondary) associated with your storage account;
- __Storage_Container_Name__: The name of the specific container within the storage account you would like to use.

Once you have provided the required pieces of information, click "Install" to finish installing the extension.

## Using Your Installed Extension

 You can view all scheduled jobs by clicking on the Auth0 Logs to Azure Blob Storage line under the "Installed Extensions" tab.
