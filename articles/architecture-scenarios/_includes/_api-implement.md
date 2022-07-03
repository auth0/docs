In this section we will see how we can implement an API for our scenario.

::: note
For simplicity reasons we will keep our implementation solely focused on the authentication and authorization part. As you will see in the samples the input timesheet entry will be hard-coded and the API will not persist the timesheet entry, simply echo back some of the info.
:::

## Define the API endpoints

First we need to define the endpoints of our API.

::: panel What is an API endpoint?
An **API endpoint** is a unique URL that represents an object. In order to interact with this object you need to point your application towards that URL. For example, if you had an API that could return either order or customers, you might configure two endpoints: `/orders` and `/customers`. Your client would interact with these endpoints using different HTTP methods, for example `POST /orders` to create a new order, or `GET /orders` to retrieve the dataset of one or more orders.
:::

For this implementation we will only define two endpoints; one for retrieving a list of all timesheets for an employee, and another which will allow an employee to create a new timesheet entry.

An `HTTP GET` request to the `/timesheets` endpoint will allow a user to retrieve their timesheets, and an `HTTP POST` request to the `/timesheets` endpoint will allow a user to add a new timesheet.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#1-define-the-api-endpoints)
:::

### Secure the Endpoints

When an API receives a request with a bearer Access Token as part of the header, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request must be rejected with a `Missing or invalid token` error message to the calling app.

The validations that the API should perform are:

- Check that the JWT is well formed
- Check the signature
- Validate the standard claims

::: note
[JWT.io](https://jwt.io/) provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims.
:::

Part of the validation process is to also check the Client permissions (scopes), but we will address this separately in the next paragraph of this document.

For more information on validating Access Tokens, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#2-secure-the-api-endpoints)
:::

### Check the Client's Permissions

By now we have verified that the JWT is valid. The last step is to verify that the client has the permissions required to access the protected resources.

To do so, the API needs to check the [scopes](/scopes) of the decoded JWT. This claim is part of the payload and it is a space-separated list of strings.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#3-check-the-client-permissions)
:::

### Determine user identity

For both endpoints (retrieving the list of timesheets, and adding a new timesheet) we will need to determine the identity of the user.

For retrieving the list of timesheets this is to ensure that we only return the timesheets belonging to the user making the request, and for adding a new timesheet this is to ensure that the timesheet is associated with the user making the request.

One of the standard JWT claims is the `sub` claim which identifies the principal that is the subject to the claim. In the case of the Implicit Grant flow this claim will contain the user's identity, which will be the unique identifier for the Auth0 user. You can use this to associate any information in external systems with a particular user.

You can also use a custom claim to add another attribute of the user - such as their email address - to the Access Token and use that to uniquely identify the user.

::: note
See the implementation in [Node.js](/architecture-scenarios/application/mobile-api/api-implementation-nodejs#4-determine-the-user-identity)
:::
