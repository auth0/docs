# Updating the AD/LDAP Connector

These are the steps to update the AD/LDAP Connector to the latest version:

1.  Before updating the connector backup these files from `%Program Files(x86)%\Auth0\AD LDAP Connector\`:
  -  `config.json`
  -  `certs`
  -  `lib\profileMapper.js`

> The PATH above works for Windows based machines. Installations in other platforms will be located somewhere else, but contain the same assets. 

2.  Download the latest version of the connector from [https://cdn.auth0.com/adldap.msi](https://cdn.auth0.com/adldap.msi).

3.  Start the installer and follow the instructions.

4.  Copy all the files from __Step 1__ into `%Program Files(x86)%\Auth0\AD LDAP Connector\`.

5.  Restart the **"Auth0 AD LDAP"** service from the service console.