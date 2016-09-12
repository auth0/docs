# Auth0 Logs to Azure Blob Storage

The *Auth0 Logs to Azure Blob Storage* is a scheduled job that takes all of your Auth0 logs and exports them to Azure Blob Storage.

Azure Blob storage is a service that stores unstructured object data, such as text or binary data, in the cloud as objects/blobs.

## Configure the Extension

To install and configure this extension, navigate to the [Extensions](${manage_url}/#/extensions) page and click on the __Auth0 Logs to Azure Blob Storage__ box in the list of provided extensions.

The __Install Extension__ window pops open.

![Install Auth0 Logs to Azure Blob Storage Extension](/media/articles/extensions/azure/extension-mgmt-azure.png)

At this point you should set the following configuration variables:

- __Schedule__: The frequency with which logs should be exported.
- __Batch_Size__: The amount of logs to be read on each execution. Maximum is 100.
- __Storage_Account_Name__: The name of the Azure storage account you want to export to.
- __Storage_Account_Key__: The access key associated with your storage account.
- __Storage_Container_Name__: The name of the specific container within the storage account you would like to use.

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Azure Portal

We need the following information: Account Name, Account Key, and Container Name. Let's see how we can retrieve these values from Azure Portal.

We assume that you have an Azure account. If you don’t have one, you can go to [Azure](http://azure.microsoft.com/) and sign up.

Log into your Azure account and click on __Storage accounts__ on the left-hand side. Either select your storage account, or create a new one.

The __Account Name__ is the name of your storage account, the one we created is named `azureauth0logs`.

This value should be set as __Storage_Account_Name__.

![Azure Storage Account Name](/media/articles/extensions/azure/storage-accnt-name.png)

To retrieve the rest of the information, click on the Storage account name. The __Overview__ tab is displayed. Click on the __Containers__ tab.

You can create a new container or use an existing one. The one we created is named `auth0`.

This value should be set as __Storage_Container_Name__.

![Azure Container Name](/media/articles/extensions/azure/storage-container-name.png)

Click on the __Access keys__ tab. Here you can find the value for __Storage_Account_Key__. Use either one of the keys.

![Azure Storage Account Key](/media/articles/extensions/azure/storage-accnt-key.png)

Now that you have retrieved all three values head back to the [Auth0 dashboard](${manage_url}) and set them at the corresponding fields. You 're done!


## Use Your Installed Extension

To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page, click on the __Installed Extensions__ link, and select the __Auth0 Logs to Azure Blob Storage__ line. There you can see the job you just created, modify its state by toggling the __State__ switch, see when the next run is due and what was the result of the last execution.

![View Cron Jobs](/media/articles/extensions/azure/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![View Cron Details](/media/articles/extensions/azure/view-cron-details.png)

That's it, you are done! Your [Auth0 Logs](${manage_url}/#/logs) are now pushed to Azure and stored as objects at your storage account. You can view them by navigating to your [Microsoft Azure Portal](https://portal.azure.com).

![View Auth0 Logs at Azure Portal](/media/articles/extensions/azure/auth0-logs-at-azure.png)
