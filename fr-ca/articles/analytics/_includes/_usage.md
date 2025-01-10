## Usage

After installation on your site, you will start collecting data. Auth0 Analytics will immediately begin sending events to <%- name %>.

You will see the following events being logged:

* Auth0 Lock show
* Auth0 Lock hide
* Auth0 Lock unrecoverable_error
* Auth0 Lock authenticated
* Auth0 Lock authorization_error
* Auth0 Lock forgot_password ready
* Auth0 Lock forgot_password submit
* Auth0 Lock signin submit
* Auth0 Lock signup submit
* Auth0 Lock federated login

Note that some events that Lock emits like `hash_parsed` are not used for analytics purposes. Also, be aware that some events are only available in newer versions of Lock. If you are using an older version of Lock you will only see some of these events. We suggest upgrading to the latest version of Lock to get the most of the Auth0 Analytics integration.

For more information on the events that are sent see the [Lock API documentation](/libraries/lock/v11/api#on-).
