---
title: Bulk User Exports
description: Learn how to export lists of users and user metadata.
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Bulk User Exports

You can use the [`POST /api/v2/jobs/users-exports`](/api/management/v2#!/Jobs/post_users_exports) endpoint to create a job that exports all users associated with a [connection](/identityproviders).

When you create your job, you'll need to provide:

* ID for the connection whose users you want exported
* Format of the export file (CSV or JSON)
* Maximum number of user records to be exported
* User-related fields (such as user ID or name) that you want included in the export

<%= include('../search/v3/_valid-access-token') %>

## Syntax

*Required Scopes*: `read:users`

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/api/v2/jobs/users-exports",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
    "queryString": [],
    "postData": {
        "mimeType": "application/json",
        "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"csv\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, { \"name\": \"identities[0].connection\", \"export_as\": \"provider\" }]}" 
    },
    "headersSize": -1,
    "bodySize": -1,
    "comment": ""
}
```

### Sample results

```json
{
  "type": "users_export",
  "status": "pending",
  "connection_id": "con_0000000000000001",
  "format": "csv",
  "limit": 5,
  "fields": [
    {
      "name": "user_id"
    },
    {
      "name": "name"
    },
    {
      "name": "email"
    },
    {
      "name": "identities[0].connection",
      "export_as": "provider"
    }
  ],
  "connection": "Username-Password-Authentication",
  "created_at": "2017-11-02T23:34:03.803Z",
  "id": "job_coRQCC3MHztpuTlo"
}
```

## Include user metadata

### CSV format

If you export user data in CSV format and want to include metadata information, specify each [metadata field](/users/references/metadata-field-name-rules) that you want to include. 

For example, for metadata structured like this:

```json
{
  "consent": {
      "given": true,
      "date": "01/23/2019",
      "text_details": "some-url"
  }
}
```

The export request (for all three fields) will looks like this:


```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/jobs/users-exports",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"csv\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, {\"name\": \"user_metadata.consent.given\"}, {\"name\": \"user_metadata.consent.date\"}, {\"name\": \"user_metadata.consent.text_details\"}]}" 
    },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```
### JSON format

If you export the data in JSON, you only need to provide the root property; you do not need to name each individual inner property since they will be included automatically.

In this case, for the same example we used before, the request will look like this:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/jobs/users-exports",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"json\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, {\"name\": \"user_metadata.consent\"}]}" 
    },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

## Check export status

Once you've created your job to export your users, you can check on its status using the [Get a Job endpoint](/api/management/v2#!/Jobs/get_jobs_by_id). 

Provide the ID of the job (which you received in the response when creating the job). If you're using the sample request below, replace the placeholder `YOUR_JOB_ID` with the value of the ID.

*Require Scopes*: `create:users`, `read:users`, `create:passwords_checking_job`

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/jobs/YOUR_JOB_ID",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  }]
}
```

### Sample results

```json
{
  "type": "users_export",
  "status": "completed",
  "connection_id": "con_lCvO...a",
  "format": "csv",
  "limit": 5,
  "fields": [
    {
      "name": "user_id"
    },
    {
      "name": "name"
    },
    {
      "name": "email"
    },
    {
      "name": "identities[0].connection",
      "export_as": "provider"
    }
  ],
  "location": "https://user-exports.auth0.com/job_coRQCC3MHztpuTlo/auth0docs2.csv.gz?Expires=1509725589&Key-Pair-Id=APKAJPL62IJALBDMSSCA&Signature=l2JaFXP~BATnfagb64PK-qbX9QaZREDYNW0q5QeHuV-MaDpZjpABDXfHHLh2SsCMQz~UO-QsCSfI81l0lvCKzZPZL6cZHK7f~ixlZOK~MHKJuvMqsUZMbNluNAwhFmgb2fZ86yrB1c-l2--H3lMELAk7hKUwwSrNBlsfbMgQ-i41nMNnsYdy3AVlNVQkwZyx~w-IEHfJDHsqyjia-jfDbIOLQvr8~D9PwZ-xOzROxDwgxrt3undtz80bkgP5hRKOAbHC7Y-iKWa2bzNZYHqzowTrlh7Ta60cblJR46NfF9cNqn9jqRGVv-lsvUD9FxnImCCk~DL6npJnzNLjHvn4-CaWq6KdQnwWgCnZ3LZkxXDVWLLIQQaoc6i~xbuGnnbtKRePFSnpqbt2mAUYasdxTOWuUVK8wHhtfZmRYtCpwZcElXFO9Qs~PTroYZEiS~UHH5byMLt2x4ChkHnTG7pIhLAHN~bCOLk8BN2lOkDBUASEVtuJ-1i6cKCDqI2Ro9YaKZcCYzeQvKwziX6cgnMchmaZW77~RMOGloi2EffYE31OJHKiSVRK7RGTykaYN5S2Sg7W0ZOlLPKBtCGRvGb8rJ6n3oPUiOC3lSp7v0~dkx1rm-jO8mKWZwVtC0~4DVaXsn8KXNbj0LB4mjKaDHwXs16uH1-aCfFnMK7sZC2VyCU_",
  "connection": "Username-Password-Authentication",
  "created_at": "2017-11-02T23:34:03.803Z",
  "id": "job_coRQCC3MHztpuTlo"
}
```

## Find export data

You can access your export files using the URL provided as the value for the **location** parameter. The name of your tenant is also the name of your file. For example, if your tenant name is `auth0docs`, then your file will be `auth0docs.csv` or `auth0docs.json`. When you navigate to the URL, you will automatically begin downloading the file. 

::: note
The download link is valid for 60 seconds. If this time period expires, you will need to initiate a new job.
:::

![Exported user data](/media/articles/users/data.png)

## Keep reading

* [User Metadata](/users/concepts/overview-user-metadata)
* [Sort Search Results](/users/search/v3/sort-search-results)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema)
* [Management API Explorer](/api/management/v2#!/users/get_users)
