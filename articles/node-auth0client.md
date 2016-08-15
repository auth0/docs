# Node.js client library for the [Auth0](https://auth0.com) platform.

## Installation
```
npm install auth0
```

## Full documentation and source code

Source is available [here](https://github.com/auth0/node-auth0). Clone it in your system through:
```
git clone https://github.com/auth0/node-auth0.git
```

For more information about how to use this library, you must build the docs. For that, run`npm run docs-build` on the root of the repository you just cloned. After it's built, go to the `docs` folder and open `docs/index.html` in any browser to see all the documentation. __Note:__ You need to have `jsdoc` and `latodoc` installed, so run `npm install jsdoc` and `npm install latodoc` if you don't have them.

## Management API Client

The Auth0 Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API. 

Initialize your client class with an API v2 token (you can generate one [here](/api/v2)) and your Auth0 domain.

```js
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: '{YOUR_API_V2_TOKEN}',
  domain: '${account.namespace}'
});
```
## Authentication API Client

This client must be used to access Auth0's [Authentication API](/auth-api).

The `AuthenticationClient` constructor takes an optional client ID, if specified it will be used as the default value for all endpoints that accept a client ID.

```js
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: '${account.namespace}',
  clientId: '{OPTIONAL_CLIENT_ID}'
});
```

### Example operations with the Authentication API Client

These are some of the operations you can make with this client. For more information, please review [this section](#full-documentation-and-source-code).

#### Getting Profile
Get the user information based on the Auth0 access token (obtained during login). 

```js
auth0.getProfile(data, function (err, userInfo) {
  if (err) {
    // Handle error.
  }

  console.log(userInfo);
});
```
#### Changing Password

Change password using a database or active directory service. 

```js
var data = {
  email: '{EMAIL}',
  password: '{PASSWORD}',
  connection: 'Username-Password-Authentication'
};

auth0.changePassword(data, function (err, message) {
  if (err) {
    // Handle error.
  }

  console.log(message);
});
```

### Example operations with the Management API Client

These are some of the operations you can make with this client. For more information, please review [this section](#full-documentation-and-source-code).

#### Getting all Connections

Use this to retrieve all connections defined in your Auth0 account.

```js
management.getConnections(function (err, connections) {
  console.log(connections.length);
});
```

If successful, ``connections`` will be an array of connection objects. The contents of each will very depending on the type defined (e.g. ADFS, Office 365, Google Apps, etc).

#### Getting a specific Connection

Returns a ``connection`` object.

```js
management.getConnection({ id: CONNECTION_ID }, function (err, connection) {
  if (err) {
    // Handle error.
  }

  console.log(connection);
});
```

#### Creating a new Connection

Use this operation to create a new connection:

```js
management.createConnection(data, function (err) {
  if (err) {
    // Handle error.
  }

  // Conection created.
});
```

#### Deleting a Connection

Use this operation to eliminate a specific connection:

```js
management.deleteConnection({ id: CONNECTION_ID }, function (err) {
  if (err) {
    // Handle error.
  }

  // Conection deleted.
});
```


#### Getting Users

The pagination settings, such as amount of users per page and page number, can be established in the (optional) first argument of this method.

```js

// Pagination settings.
var params = {
  per_page: 10,
  page: 2
};

management.getUsers(params, function (err, users) {
  console.log(users.length);
});
```
#### Getting a specific user

Gets a user for its ID.

```js
management.getUser({ id: USER_ID }, function (err, user) {
  console.log(user);
});
```

### Authentication

This library is useful to consume Auth0's REST API. To authenticate users you can use the [passport strategy](https://github.com/auth0/passport-auth0). See the [Node.js Tutorial](/server-platforms/nodejs) for an end to end walkthrough.

