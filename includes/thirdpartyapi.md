# <%= _.capitalize(configuration.thirdParty) %> API

Please follow the steps below to configure your Auth0 account to work with <%= _.capitalize(configuration.thirdParty) %>.

### 1. Activate the add-on.

Go to <a href="<%= uiAppAddonsURL %>" target="_new">Application Add-ons</a> page and activate the <%= _.capitalize(configuration.thirdParty) %> add-on.

<img src="https://cloudup.com/c8xbUL6QbJa+" />

Each integration is different and requires different parameters and configuration. once the add-on is activated, you will see tailored instructions with details on how to get this done.

### 2. Use it

The key to this integration is the Delegation endpoint in Auth0. Check the documentation of any of our FrontEnd or Mobile SDKs to learn how to call the [this endpoint](https://docs.auth0.com/auth-api#delegated). You can download your favorite library from any of the [Quickstarts](https://docs.auth0.com/).

### 3. You are done!

Congrats! You've implemented Delegation for the <%= _.capitalize(configuration.thirdParty) %> API
