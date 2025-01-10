## Request Device Activation

Once you have received a `device_code` and `user_code`, you must ask the user to go to the `verification_uri` on their laptop or smartphone and enter the `user_code`:

![Request Device Activation](/media/articles/flows/guides/device-auth/request-device-activation.png)

The `device_code` is not intended for the user directly and should not be displayed during the interaction to avoid confusing the user.

::: note
When building a CLI, you could skip this step and immediately open the browser with `verification_uri_complete`. 
:::
