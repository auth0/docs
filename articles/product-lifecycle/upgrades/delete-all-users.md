---
description: Describes the Delete All User endpoint API changes. 
topics:
  - whitelist
contentType: reference
useCase:
  - customize-connections
---
# Delete All Users Endpoint Change

| Severity | Effective Date |
| --- | --- | --- | --- |
| Low | 2016-09-13 |

The previous endpoint for deleting all users was `DELETE  /api/v2/users`. This is similar to the endpoint to delete _one_ user: [DELETE  /api/v2/users](/api/management/v2#!/Users/delete_users_by_id). To prevent accidental requests to the delete all users endpoint, the url has been changed to `DELETE /api/v2/allusers`. This should ensure that only intentional calls to this endpoint get made.

## Are you affected?

You are affected by the change only if you currently make use of the delete all users endpoint. If so, the only change you need to make is to change the URL as explained above.
