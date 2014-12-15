# Updating the connector

These are the steps to update the AD/LDAP connector to the latest version.

1.  Before updating the connector backup these files from `%programfiles(x86)%\Auth0\AD LDAP Connector\`:
  -  `config.json`
  -  `certs`
  -  `lib\profileMapper.js`

2.  Download the latest version of the connector from [https://cdn.auth0.com/adldap.msi](https://cdn.auth0.com/adldap.msi).

3.  Double click the installer and follow the instructions.

4.  Copy the files from step 1 into `%programfiles(x86)%\Auth0\AD LDAP Connector\`.

5.  Restart the **"Auth0 AD LDAP"** service from the service console.