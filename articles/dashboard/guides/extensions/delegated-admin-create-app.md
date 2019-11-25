---
description: Learn how to create an application to use with the Delegated Admin Extension, which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard. 
topics:
  - extensions
  - delegated-admin
  - dae
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - create-delegated-admin-application
---
# Create Delegated Admin Applications

Use the [Delegated Admin Extension](/extensions/delegated-admin), which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.

Before you [add the Delegated Admin extension](/dashboard/guides/extensions/delegated-admin-install-extension), you need to create the Delegated Admin application in Auth0. 

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click **+Create Application**. 

2. Enter a descriptive name for your Application (for example, *Users Dashboard*), select an application type of **Single-Page Web Application**, and click **Create**.

3. On the **Settings** tab, set the **Allowed Callback URLs** and **Allowed Logout URLs** based on your location, and click **Save Changes**:

    | Location  | Allowed Callback URL |
    | --------- | -------------------- |
    | USA       | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin/login` |
    | Europe    | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin/login` |
    | Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin/login` |

    | Location  | Allowed Logout URL |
    | --------- | ------------------ |
    | USA       | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin` |
    | Europe    | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin` |
    | Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin` |

Next, you will need to [install the Delegated Admin Extension](/dashboard/guides/extensions/delegated-admin-install-extension).

## Keep reading

- [Troubleshoot Extensions](/extensions/troubleshoot)
