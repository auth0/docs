---
description: Describes the deprecation of Patch and Post endpoints accepting secret_encoded flag. 
topics: deprecation-notice
contentType: reference
useCase:
  - patch-endpoint
  - post-endpoint
---
# Deprecation Notice: Patch and Post Endpoints No Longer Accept secret_encoded Flag

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-12-06 |

The `jwt_configuration.secret_encoded` configuration is no longer accepted by the PATCH and POST applications endpoints.

In order to further comply with the OIDC specification, Auth0 will no longer generate or accept base64 encoded application secrets for new applications.

Existing applications with encoded secrets stored will remain intact and unchanged, but *new* applications will no longer use base64 encoding. The `secret_encoded` flag is no longer accepted or necessary, as a result.

## Are you affected?

You are affected by this change only if you interact with these endpoints directly.
