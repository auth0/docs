# Source Control with GitHub

You can maintain the source code of the rules through the Auth0 dashboard or integrate a GitHub repository with your Auth0 account. If you choose the GitHub integration route, the rules in your Auth0 account will be automatically updated whenever a change is submitted to the GitHub repository.

The GitHub repository must follow a prescriptive pattern of storing and naming your rules:

    /rules/{rule_name}.js

All rules must be stored as individual `*.js` files in the `/rules` directory. The name of the file excluding the extension corresponds to the name of the Auth0 rule.

To enable automatic integration of the GitHub repository with the configuration of your Auth0 account, you must add a [GitHub webhook](https://developer.github.com/webhooks/) to your repository. The webhook URL must be specified as follows:

    https://sandbox.it.auth0.com/auth0-webhook?webtask_no_cache&key=eyJhbGciOiJIUzI1NiIsImtpZCI6IjEifQ.eyJqdGkiOiIyZTMxN2NmMjMwZjg0YzIzYTJjMDRkODA4Zjg2MTQ4ZSIsImlhdCI6MTQyNTU4NDc5MiwidXJsIjoiaHR0cDovL2JpdC5seS8xQTF3a0MzIiwidGVuIjoiYXV0aDAtd2ViaG9vayJ9.0-q71r2-RizjCRqNJpU3mWVG_SrN52FJiXHYhTyHHCA&auth0_account={auth0_account}&auth0_client_id={auth0_client_id}&auth0_client_secret={auth0_client_secret}&branch={branch_name}

Take note you need to customize the value of the following URL query parameters:

* `auth0_account` (required) must specify your Auth0 account name
* `auth0_client_id` (required) must specify the Auth0 client ID
* `auth0_client_secret` (required) must specify the Auth0 client secret
* `branch` (optional) may specify the branch of the GitHub repository to integrate with Auth0 configuration; if not specified, `master` is assumed.

Currently only public repositories are supported.

Once the webhook is configured in your GitHub repository, this is what you can expect:

* any deleted `/rules/*.js` file will result in deletion of the corresponding Auth0 rule,
* any added or modified `/rules/*.js` file will result in adding or modifying of the corresponding Auth0 rule,
* all added or modified rules are automatically enabled.
