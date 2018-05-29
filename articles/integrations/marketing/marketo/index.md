---
title: Marketo Integration
description: Learn how to import your Auth0 user data into Marketo.
toc: true
tags:
    - marketing
    - marketo
---

# Marketo Integration

## Import Users to Marketo

To import your Auth0 users into Marketo:

- Export your user data as a CSV file with the [User Import / Export Extension](/extensions/user-import-export).
- Import the file into Marketo using the [Bulk Leads endpoint](http://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Bulk_Leads) of the Marketo REST API.

### Create a User Data File

Start by navigating to the [Extensions](${manage_url}/#/extensions) section of the Dashboard and open the **User Import / Export Extension**. On the extension page, select **Export** from the menu.

Next, set the **Export Format** to the required file format. Marketo accepts file imports in CSV format so choose the `Tab Separated Value file (*.csv)` option.

![User Import/Export Extension Format](/media/articles/integrations/marketing/import-export-set-format.png)

At the top in the **Fields** section, provide a **User Field** and **Column Name** for each user attribute to include in the export. For example:

User Field | Column Name
-----------|------------
`email` | Email Address
`created_at` | Created At
`given_name` | First Name
`family_name` | Last Name

![User Import/Export Extension Fields](/media/articles/integrations/marketing/import-export-fields.png)

After adding the user fields, click on the **Export Users** button to start the export. Once the export is complete, download the CSV file to use in the following section.

### Import a User Data File

::: note
[Marketo Documentation: Bulk Lead Import](http://developers.marketo.com/rest-api/bulk-import/bulk-lead-import/)
:::

To import the user data file to Marketo, perform a POST request to the [Bulk Leads endpoint](http://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Bulk_Leads). Set the content-type header of the request to `multipart/form-data` and include a `file` parameter with your exported CSV file as well as format parameter set to `csv`. For example:

```har
{
    "method": "POST",
    "url": "https://MARKETO_REST_API_BASE_URL/bulk/v1/leads.json",
    "headers": [
        {
            "name": "Authorization",
            "value": "Bearer {MARKETO_ACCESS_TOKEN}"
        }
    ],
    "postData": {
        "mimeType": "multipart/form-data",
        "params": [
            {
                "name": "file",
                "fileName": "auth0_users.csv",
                "contentType": "text/csv"
            },
            {
                "name": "format",
                "value": "csv",
                "contentType": "text/plan"
            }
        ]
    }
}
```

The response should look something like this:

```json
{
    "requestId": "e42b#14272d07d78",
    "success": true,
    "result": [{
        "batchId": 1234,
        "status": "Importing"
    }]
}
```

You can check the status of your import using the [Get Import Lead Status API]() and your import job's `batchId`. For example:

```har
{
    "method": "GET",
    "url": "https://MARKETO_REST_API_BASE_URL/bulk/v1/leads/batch/BATCH_ID.json",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Authorization", "value": "Bearer {MARKETO_ACCESS_TOKEN}" }
    ],
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

And the response:

```json
{
    "requestId": "8136#146daebc2ed",
    "success": true,
    "result": [{
        "batchId": 1234,
        "status": "Complete",
        "numOfLeadsProcessed": 123,
        "numOfRowsFailed": 0,
        "numOfRowsWithWarning": 0
    }]
}
```

That's it! You successfully imported your Auth0 users into Marketo.
