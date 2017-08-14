As a security measure, it is recommended that the lifetime of a user's `access_token` be kept short. When you create an API in the Auth0 dashboard, the default lifetime for browser flows is 7200 seconds (2 hours).

This short lifetime is good for security, but it isn't great for user experience. You will likely want to provide a way for your users to automatically get a new `access_token` so that their client-side session can be kept alive. This can be done with **Silent Authentication**.

::: note
The `access_token` lifetime is controlled from the [APIs section](${manage_url}/#/apis), while the `id_token` lifetime is controlled from the [Clients section](${manage_url}/#/clients). These two settings are independent of one another.
:::