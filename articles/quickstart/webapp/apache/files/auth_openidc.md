---
name: auth_openidc.conf
language: 
---
    
```
OIDCProviderMetadataURL https://${account.namespace}/.well-known/openid-configuration OIDCClientID ${account.clientId} 
OIDCClientSecret ${account.clientSecret}
OIDCScope "openid name email" 
OIDCRedirectURI https://your_apache_server/your_path/redirect_uri/ OIDCCryptoPassphrase <passwordToEncryptTheSessionInformationOnTheCookie> 

<Location /your_path> 
   AuthType openid-connect 
   Require valid-user 
   LogLevel debug 
</Location>

<Location /admin> 
   AuthType openid-connect 
   #Require valid-user 
   Require claim folder:admin 
</Location>
```
