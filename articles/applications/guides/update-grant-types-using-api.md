### Use the Management API

In addition to setting the `grant_types` value using the Dashboard, you can make a [`PATCH` call to the Update an Application endpoint](/api/management/v2#!/Clients/patch_applications_by_id) of the Management API to update the `grant_types` field.

### Errors

Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
