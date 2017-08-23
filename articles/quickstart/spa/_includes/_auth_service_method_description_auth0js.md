When you set up the `AuthService` service, you create an instance of the `auth0.WebAuth` object. In that instance, you can define the following:
<%= include('_auth_service_configure_client_details') %>

<%= include('_auth_service_hash_fragment_information') %>

<%= include('_auth_service_using_json_web_tokens') %>

<%= include('_auth_service_check_access_token_expiry') %>