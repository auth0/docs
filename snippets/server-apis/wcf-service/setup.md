The NuGet package will create three empty settings under the `<appSettings>` section. Replace them with the following values:

```xml
<appSettings>
  <add key="jwt:SymmetricKey" value="YOUR_CLIENT_SECRET" />
  <add key="jwt:AllowedAudience" value="${account.clientId}" />
  <add key="jwt:AllowedIssuer" value="https://${account.namespace}/" />
</appSettings>
```

Make sure to add the `<serviceAuthorization>` element as well:

```xml
  <serviceAuthorization principalPermissionMode="Custom" serviceAuthorizationManagerType="....ValidateJsonWebToken, ..." />
```
