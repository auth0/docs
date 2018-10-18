## Limit API scopes being issued

An application can request any scope and the user will be prompted to approve those scopes during the authorization flow. This may not be a desirable situation, as you may want to limit the scopes based on, for example, the permissions (or role) of a user.

You can make use of the [Authorization Extension](/extensions/authorization-extension) in conjunction with a custom [Rule](/rules) to ensure that scopes are granted based on the permissions of a user.

This approach is discussed in more depth in some of our [Architecture Scenarios](/architecture-scenarios). Specifically, you can review the entire [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section of our SPA+API Architecture Scenario which demonstrates how to configure the Authorization Extension, and also create a custom Rule which will ensure scopes are granted based on the permissions of a user.
