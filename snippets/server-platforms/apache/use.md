```xml
# mods-available/auth_openidc.conf

<Location /example>
   AuthType openid-connect
   #Require valid-user
   Require claim folder:example
</Location>

<Location /example2>
   AuthType openid-connect
   #Require valid-user
   Require claim folder:example2
</Location>
```
