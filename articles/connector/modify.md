---
description: How to modify AD/LDAP Connector settings in the console, Profile Mapper, or config file.
topics:
  - connector
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---

# Modify the AD/LDAP Connector Settings

## AD/LDAP Connector Admin Console

The **Connector Admin** screen can be launched by bringing up a browser on the AD/LDAP connector server and connecting to: `http://localhost:8357`.

### Modify Configuration Settings

Once you have launched the Connector Admin Console, you can modify the LDAP settings:

![](/media/articles/connector/modify/connector-configuration.png)

Click **Save** when you are done modifying the LDAP configuration.

### Connector Test

Once you submit the above information, the connector will perform a series of tests:

![](/media/articles/connector/modify/connector-configuration-saved.png)

Make sure that all tests are green.

::: note
For an explanation of each test, see the [Troubleshooting](/connector/install#troubleshooting) section of the AD/LDAP installation instructions.
:::

Your AD/LDAP Connector will start using the new directory parameters after all changes pass all the tests. If any test fails, the changes will not be saved.

## Profile Mapper

To modify the mapping of profile attributes from AD/LDAP attributes to attributes in the Auth0 user profile, launch the **Connector Admin Console** as [described above](#launch-the-ad-ldap-connector-admin-console) and click on **Profile Mapper**.

**Profile Mapper** displays a code editor screen with a short description at the top. The body of the editor screen shows a javascript function which maps attributes from a source directory service (represented by the `raw_data` variable) into a variable that gets returned to populate the __Auth0 User Profile__.

The first part of the function instantiates a variable called `profile` and has a mapping for the core portion of the Auth0 User Profile.  Additional attributes can be set below that using syntax in the form:

`profile['department'] = raw_data['companydept'];`

In this example, `department` is the name of the attribute in the Auth0 User Profile and `companydept` is the name of the attribute in the source directory service (such as AD).

## Import / Export

The __Import/Export__ feature of the **Connector Admin Console** can be used to export the configuration of the AD/LDAP Connector or import a previously exported configuration.  This is useful for deployments with more than one node of the AD/LDAP connector deployed for high availability. The configuration can be set up and tested on one node, then exported from there, and imported into all subsequent nodes.

## Troubleshooting

The __Troubleshooting__ feature of the **Connector Admin Console** can be used to detect issues with the environment that may prevent the AD/LDAP connector from working properly. It will check for common problems like network connectivity, clock skew, connectivity to LDAP, and so on.

This feature also displays the contents of the AD/LDAP connector log file.

## Search

The __Search__ feature is designed to allow the testing of search queries used by the AD/LDAP connector against the target AD/LDAP directory. This can be an aid in debugging search filters used in the AD/LDAP connector configuration file, `config.json`.

## Update

The __Update__ feature provides a convenient way to update the AD/LDAP connector to a more recent version. Updates are fully automated.

::: note
Internet connectivity is required for an update to work.
:::

## Configuration file

The `config.json` file is the AD/LDAP Connector's main configuration file. You can this to make advanced changes that are not available via the AD/LDAP **Connector Admin Console**. The file is located in the install directory for the AD/LDAP Connector, which (for Windows) is usually found at `C:\Program Files (x86)\Auth0\AD LDAP Connector`. The following settings are supported in this file:

| Setting       | Description | Default  |
|---------------|-------------|----------|
| `AD_HUB` | The Auth0 endpoint to which the connector will connect. This value is maintained by the connector. | |
| `CA_CERT` | An authority certificate or array of authority certificates to check the remote host against. | |
| `CLIENT_CERT_AUTH` | Specifies if **Client Certificate Authentication** is enabled or not. This value is configured in Auth0 and maintained by the connector. | |
| `CONNECTION` | The name of the connection in Auth0 which is linked to this instance of the connector. This value is maintained by the connector. | |
| `CONNECTIONS_API_V2_KEY` | A Management APIv2 token used to call the [Get a connection](/api/management/v2#!/Connections/get_connections_by_id) endpoint. Set this when you need to troubleshoot the connector. This compares the local certificate to the one configured in Auth0 and detects a possible mismatch. | |
| `FIREWALL_RULE_CREATED` | Set to `true` once the Firewall rule has been created for the Kerberos Server (only when Kerberos is enabled). | |
| `GROUPS` | Include the user's groups when enriching the profile. | `true` |
| `GROUP_PROPERTY` | The attribute of the group object used when adding the groups to a user. | `cn` |
| `GROUPS_CACHE_SECONDS` | Total time in seconds to cache a user's groups. | 600 seconds. |
| `GROUPS_TIMEOUT_SECONDS` | The timeout in seconds for searching all groups a user belongs to. | 20 seconds |
| `HTTP_PROXY` | The proxy server URL if one is required to connect from the AD/LDAP Connector to Auth0.
| `KERBEROS_AUTH` | Set if **Kerberos Authentication** is enabled or not. This value is configured in Auth0 and maintained by the connector. | |
| `LAST_SENT_THUMBPRINT` | Thumbprint of the last certificate which was sent to Auth0. | |
| `LDAP_BASE` | Defines the location in the directory where the LDAP search begins. For example: `DC=fabrikam,DC=local`. | |
| `LDAP_BASE_GROUPS` | Defines the location in the directory where the LDAP groups search begins. | |
| `LDAP_BIND_PASSWORD` | The password of the LDAP user. This setting is automatically removed after the connector initializes. | |
| `LDAP_BIND_CREDENTIALS` | The encrypted password of the LDAP user. This setting is automatically added after the connector initializes. | |
| `LDAP_BIND_USER` | The user for binding a connection to LDAP. | |
| `LDAP_HEARTBEAT_SECONDS` | Time in seconds to keep the LDAP connection open. | |
| `LDAP_SEARCH_ALL_QUERY` | The LDAP query used to list all users in the LDAP store. | `(objectCategory=person)` |
| `LDAP_SEARCH_GROUPS` | The LDAP query used to find groups in the LDAP store. For example: `(&(objectCategory=group)(member={0}))` | `(member:1.2.840.113556.1.4.1941:={0})` |
| `LDAP_SEARCH_QUERY` | The LDAP query used to find users in the LDAP store. | `(&(objectCategory=person)(anr={0}))` |
| `LDAP_USER_BY_NAME` | The LDAP query used to find the user during authentication. This setting lets you specify which attribute is considered the user's username. For example, like the common name: the sAMAccountName, UPN, et cetera. This setting also supports multiple values for an OR search, for example: `(|(sAMAccountName={0})(userPrincipalName={0}))` | `(sAMAccountName={0})` |
| `LDAP_URL` | The LDAP connection string. For example: `ldap://fabrikam-dc.fabrikam.local`. | |
| `PORT` | The port the server runs on when Kerberos or Client Certificate Authentication is enabled. | |
| `PROVISIONING_TICKET` | The Auth0 provisioning ticket used to communicate with Auth0. | |
| `REALM` | The Auth0 realm, for example: `urn:auth0:fabrikam`. This value is maintained by the connector. | |
| `SERVER_URL` | The default connector URL will be `server-name:port`, but this setting allows you to overwrite this. For example: `connector.mycompany.com`. | |
| `SESSION_SECRET` | The session secret used to encrypt the session cookie. | |
| `SITE_NAME` | When Client Certificate Authentication is enabled, but not possible the AD Connector will show a fallback login page. This setting allows you to specify the title that will show on top of the page. | Name of the AD connection. |
| `SSL_CA_PATH` | Absolute path to the base directory where the CA certificate file(s) are located. | |
| `SSL_KEY_PASSWORD` | The password for the SSL certificate. | |
| `SSL_PFX` | Base64 encoded certificate to use for SSL. | |
| `TENANT_SIGNING_KEY` | Your Auth0 tenant used to verify JWTs.
| `WSFED_ISSUER` | The issuer being set in the WS-Federation responses. If a connection is configured with email domains, the first email domain configured in Auth0 will be used as issuer. | `urn:auth0` |

This file can be used to determine which tenants are using a particular connector.

For more information on LDAP queries, check out [Active Directory: LDAP Syntax Filters](https://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx).

## Point an AD/LDAP Connector to a new connection

Sometimes you will need to point your AD/LDAP Connector instance to a new connection in Auth0. For instance: If you have migrated to a new Auth0 tenant, or if you changed the name of the Auth0 connection.

Since you cannot rename connections in Auth0, the only option is to create a new Active Directory / LDAP connection and point your existing Connector instances to it. Here's how:

1. Create the new Active Directory / LDAP connection in the Auth0 dashboard and copy the resulting **TICKET URL**. If you are using the [custom-domains](/custom-domains) feature, you will need to replace the `${account.namespace}` part of the **TICKET URL** with your custom domain, such as `identity.fabrikam.com`.
2. On the AD/LDAP Connector host in the Connector Admin app, perform an export of the existing settings via the **Import/Export** tab. This is just a precaution in case something were to happen in the following steps that would accidentally overwrite your custom settings. If you are running the Connector on a host that does not have a web browser to access to the Connector Admin website, simply make a copy of your `config.json` file.
3. On the AD/LDAP Connector host, edit the `config.json` file and change the value of the `PROVISIONING_TICKET` property to the **TICKET URL** you copied in Step 1.
4. If you moved from one Auth0 tenant to another, remove the property in the `config.json` file that has the name `urn:auth0:OLD_AUTH0_TENANT_NAME`. If this is not removed, the Connector will still function but this old configuration data is not needed.
5. Restart the AD/LDAP Connector service (the **Auth0 ADLDAP** service in Windows).
6. Take a look at the Connector logs (**Troubleshooting** tab in the Connector Admin tool or tail the `logs.log` file) and make sure there is a recent entry that looks something like:  

  `2016-03-10T22:47:32.970Z - debug: [2016-03-10 22:47:32] Loading settings from ticket: YOUR_TICKET_URL/info`

7. Make sure the new Active Directory / LDAP connection in the Auth0 dashboard is now showing as connected (the dot to the left of the new connection is green and not red). If not, refer to the [Troubleshooting](/connector/troubleshooting) page.
8. Perform a test authentication through your new connection and make sure you see activity in your Connector logs as well.

If you have multiple AD/LDAP Connector instances that you need to point at the new Auth0 connection, follow the steps in the [High Availability](/connector/high-availability) page to update the remaining instances.
