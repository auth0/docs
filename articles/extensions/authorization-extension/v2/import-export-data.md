---
title: Importing Data Into and Exporting Data from the Authorization Extension
description: How to import/export Authorization Extension Data
topics:
  - extensions
  - authorization_v2
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---

# Authorization Extension: Import/Export Data

::: note
<%= include('../../../_includes/_rbac_methods') %>
:::

You can import new data from or export existing authorization data to a JSON file. This can be useful when moving environments. 

::: warning
<dfn data-key="role">Roles</dfn> and permissions are linked to specific applications. If you export your JSON file and import it into a different environment, you will need to change the client ID for these records.
:::

You can get to the **Import/Export** section by clicking **Configuration** on the drop-down menu accessible by clicking on your tenant name at the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

Click **Import/Export**.

![Import/Export Section](/media/articles/extensions/authorization/import-export.png)

Use this form to copy and paste or edit the JSON data. Then, click either the **IMPORT** or **EXPORT** button to begin the import/export process.

A sample JSON file looks like this:

```json
{
  "configuration": [
    {
      "_id": "v1",
      "rolesInToken": true
    }
  ],
  "groups": [
    {
      "name": "Admin",
      "description": "Administrators of the company",
      "_id": "f185e4aa-0c28-4da7-8639-ae998512c838"
    },
    {
      "_id": "5f5371c6-c8ff-4c7c-825e-c5ef8ac51cad",
      "name": "HR",
      "description": "Human Resources",
      "members": [
        "auth0|59c13f5ed6e34e41877c0810"
      ],
      "roles": [
        "6ab494d6-2592-4af0-a62f-2c13646143d0"
      ],
      "nested": [
        "59f2adac-9016-4051-ad02-dd5196b8f99e"
      ]
    },
    {
      "name": "Trainers",
      "description": "HR Trainers for New Employees",
      "_id": "59f2adac-9016-4051-ad02-dd5196b8f99e"
    }
  ],
  "permissions": [
    {
      "applicationType": "client",
      "applicationId": "fhginJh46igC6Rj630UeZBhUyDrgvJ08",
      "description": "approve company expenditures",
      "name": "Approve Expenses",
      "_id": "e61f10f4-837e-4011-a52f-53618bd659e7"
    },
    {
      "applicationType": "client",
      "applicationId": "fhginJh46igC6Rj630UeZBhUyDrgvJ08",
      "description": "approve hiring of employees",
      "name": "Hire employees",
      "_id": "03b94d9b-8893-413d-bdb3-451192264594"
    }
  ],
  "roles": [
    {
      "applicationType": "client",
      "applicationId": "fhginJh46igC6Rj630UeZBhUyDrgvJ08",
      "description": "Control over HR-related tasks",
      "name": "HR Manager",
      "permissions": [
        "e61f10f4-837e-4011-a52f-53618bd659e7",
        "03b94d9b-8893-413d-bdb3-451192264594"
      ],
      "_id": "6ab494d6-2592-4af0-a62f-2c13646143d0"
    }
  ]
}
```

## Keep Reading

::: next-steps
* [Enable API Access to the Extension](/extensions/authorization-extension/v2/api-access)
* [Use the Authorization Extension's Data in Rules](/extensions/authorization-extension/v2/rules)
* [Troubleshoot Errors](/extensions/authorization-extension/v2/troubleshooting)
:::