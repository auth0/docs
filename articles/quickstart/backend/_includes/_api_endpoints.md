The routes shown below are available for the following requests:

- `GET /api/public`: available for non-authenticated requests
- `GET /api/private`: available for authenticated requests containing an Access Token with no additional scopes
- `GET /api/private-scoped`: available for authenticated requests containing an Access Token with the `read:messages` scope granted 
