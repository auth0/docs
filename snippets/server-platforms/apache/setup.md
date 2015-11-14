```
OIDCProviderIssuer https://${account.namespace}
OIDCProviderAuthorizationEndpoint https://${account.namespace}/authorize
OIDCProviderTokenEndpoint https://${account.namespace}/oauth/token
OIDCProviderTokenEndpointAuth client_secret_post
OIDCProviderUserInfoEndpoint https://${account.namespace}/userinfo

OIDCClientID ${account.clientId}
OIDCClientSecret ${account.clientSecret}

OIDCScope "openid name email"
OIDCRedirectURI https://your_apache_server/your_path/redirect_uri/
OIDCCryptoPassphrase <passwordToEncryptTheSessionInformationOnTheCookie>
OIDCCookiePath /your_path/

SSLEngine on
SSLCertificateFile /home/your_cert.crt
SSLCertificateKeyFile /home/your_key.key

<Location /your_path/>
   AuthType openid-connect
   Require valid-user
   LogLevel debug
</Location>
```
