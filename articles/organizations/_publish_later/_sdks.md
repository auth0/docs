## SDKs

To allow members to self-manage their organizations, you can assign roles to members, and use our API and SDKs to build dashboards in your products. Administrators can configure Single Sign-On (SSO), invite users to organizations, assign members to organizations, assign roles to members, and so on.

Some example tasks you may want to perform with organizations using the SDKs are as follows:

**I want users to log in to a specified organization**

When defining a new client, pass the organization ID into an organization parameter. Then on callback, ensure that the organization returned in the ID token is the same one that was sent in the /authorize request by validating the org_id claim in the same way that other claims like exp and nonce are validated.

**From my application, I want to get the organization to which the authenticated user logged in**

If the user was authenticated using an organization, the organization ID will appear in the `org_id` claim in the ID token. Using the Auth0 SPA SDK, this can be retrieved as follows:

```
const { org_id } = await client.getIdTokenClaims();
```

**From my API, I want to get the organization with which the access token was issued**

If the user was authenticated using an organization and an audience was specified, the access token will be a JWT and will contain the `org_id` claim with the ID of the organization to which the user logged in.

This can be validated along with the other claims on the backend, as in the following example for Ruby:

``` ruby
class JsonWebToken
  def self.verify(token)
    decoded = JWT.decode(token, nil,
               true, # Verify the signature of this token
               algorithms: 'RS256',
               iss: 'https://YOUR_DOMAIN/',
               verify_iss: true,
               aud: Rails.application.secrets.auth0_api_audience,
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
    
    // Retrieve the organization ID value from the decoded token
    org = decoded[0]['org_id']
  end
end
```

<%= include('./_includes/_find_domain') %>