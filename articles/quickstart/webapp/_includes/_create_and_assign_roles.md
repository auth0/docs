## Create and Assign Roles

Before you can add Role Based Access Control, you will need to ensure the required roles are created and assigned to the corresponding user(s).
Follow the guidance explained in <a href="/users/assign-roles-to-users" target="_blank" rel="noreferrer">assign-roles-to-users</a> to ensure your user gets assigned the `admin` role.

Once the role is created and assigned to the required user(s), you will need to create a <a href="/rules/current" target="_blank" rel="noreferrer">rule</a> that adds the role(s) to the Id Token so that it is available to your backend. To do so, go to the <a href="$manage_url/#/rules/new" target="_blank" rel="noreferrer">new rule page</a> and create an empty rule. Then, use the following code for your rule:

<% if (typeof(rolesClaimType) !== "undefined") { %>
``` js
function (user, context, callback) {
  const assignedRoles = (context.authorization || {}).roles;
  const idTokenClaims = context.idToken || {};

  idTokenClaims['${rolesClaimType}'] = assignedRoles;

  callback(null, user, context);
}
```
<% } %>

<% if (typeof(rolesClaimType) === "undefined") { %>
``` js
function (user, context, callback) {
  const assignedRoles = (context.authorization || {}).roles;
  const idTokenClaims = context.idToken || {};
  
  idTokenClaims['https://schemas.quickstarts.com/roles'] = assignedRoles;

  callback(null, user, context);
}
```
<% } %>

<% if (typeof(rolesClaimType) !== "undefined") { %>
The role information is expected to exist in the `${rolesClaimType}` claim, be sure to use that when adding the roles to the ID Token in the Auth0 rule.
<% } %>

<% if (typeof(rolesClaimType) === "undefined") { %>
  This quickstart uses `https://schemas.quickstarts.com/roles` for the claim <a href="/tokens/guides/create-namespaced-custom-claims" target="_blank" rel="noreferrer">namespace</a>, but it is suggested that you use a namespace related to your own Auth0 tenant for your claims, e.g. `https://schemas.YOUR_TENANT_NAME.com/roles`.
<% } %>

::: note
For more information on custom claims, read <a href="/api-auth/tutorials/adoption/scope-custom-claims" target="_blank" rel="noreferrer">User profile claims and scope</a>.
:::