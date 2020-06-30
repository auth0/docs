```
# mods-available/auth_openidc.conf

OIDCProviderMetadataURL https://${account.namespace}/.well-known/openid-configuration
OIDCClientID ${account.clientId}
OIDCClientSecret 'YOUR_CLIENT_SECRET'

OIDCScope "openid name email"
OIDCRedirectURI https://your_apache_server/your_path/redirect_uri/
OIDCCryptoPassphrase <passwordToEncryptTheSessionInformationOnTheCookie>

<Location /your_path>
   AuthType openid-connect
   Require valid-user
   LogLevel debug
</Location>
```
