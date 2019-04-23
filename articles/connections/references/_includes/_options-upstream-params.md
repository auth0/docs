Allows you to pass static provider-specific parameters to an [Identity Provider](/connections) for this connection. Not all Identity Providers support upstream parameters, so you will need to check with the Identity Provider before using this element.

Properties include:

- Parameter (object): The name of the parameter accepted by the Identity Provider. Will contain one of the following two properties, depening on how you are using the upstream parameters.
    - `alias` (string): The existing accepted OAuth 2.0/OIDC parameter, which maps to the parameter accepted by the Identity Provider. Used when passing dynamic upstream parameters per user. Allowed values include: `acr_values`, `audience`, `client_id`, `display`, `id_token_hint`, `login_hint`, `max_age`, `prompt`, `resource`, `response_mode`, `response_type`, and `ui_locales`.
    - `value` (string): The value of the parameter. Used when passing static upstream parameters per connection.

For more information and examples of how to use upstream parameters, see [Pass Parameters to Identity Providers](/connections/pass-parameters-to-idps).