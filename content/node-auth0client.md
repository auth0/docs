# A simple Node module for consuming the Auth0 API

## Installation

	npm install auth0

## Source code
Source is available [here](https://github.com/auth0/node-auth0). Clone it in your system through:

	git clone https://github.com/auth0/node-auth0.git 

## Usage

To initialize the client, you will need the __clientID__, the __clientSecret__ and __domain__ of your Auth0 account. See the [settings section](@@uiURL@@/#/settings) of the dashboard.

	var Auth0 = require('auth0');

	var client = new Auth0({
		domain:       '@@account.namespace@@',
		clientID:     '@@account.clientId@@',
		clientSecret: '@@account.clientSecret@@'
	});

## Operations
Auth0 API supports operations against two resources: ```Users``` and ```Connections```. 

### Getting all Connections
Use this to retrieve all connections defined in your Auth0 account.

	client.getConnections(function (err, connections){
		//.....
	});
	
If successful, ``connections`` will be an array of connection objects. The contents of each will very depending on the type defined (e.g. ADFS, Office 365, Google Apps, etc). See the [API Reference](api-reference) for a detailed description of each of these.

### Getting a specific Connection
Returns a ``connection`` object by name.

	client.getConnection(name, callback)

	client.getConnection('my-connection', function (err, connection){
		//.....
	});

### Creating a new Connection
This is especially useful if you want to automate provisioning and on-boarding of new customers to your app. Let's say one of your customers wants to use its own directory to authenticate to your app. You will have to create a **connection** in Auth0 for this customer and if you want to automate that for N customers, you will want to use the API. Typically, you will ask the customer domain name and depending on the directory you are connecting to, some additional information.

	var myNewConnection =  {
			//a friendly name to identify the connection
			'name': 'thesuperstore-connection',

			//this is the strategy: office365, google-apps, adfs
			'strategy': 'office365', 
			
			'options': {
				
				// depending on the strategy, you will need a set of credentials to authenticate 
				// your app against the directory (office365 and google apps use this)
				// Note: you will use the same values for these fields 
				// for all connections with same strategy (in this case office365)
				'client_id':     'xxx',       
				'client_secret': 'xxx',
				
				// These fields are provided by the user:
				'tenant_domain': 'bigcompany.com or bicompany.onmicrosoft.com',
				
				// attributes:
				'ext_profile':      	true,
				'ext_groups': 	  	true, 
				'ext_assigned_plans': 	true,
				
				// grants:
				'api_enable_users':	true
			};

	client.createConnection(myNewConnection, function (err, connection) {
		//.....
	});

Because this example uses Office 365, the returned connection object will have a ```provisioning_ticket_url``` field to which you have to redirect the client in order to complete the authorization process.

### Deleting a Connection
Use this operation to eliminate a specific connection:

	client.deleteConnection(connection, function (err, result) {
		//.....
	});

If successful, ```result``` will be an object with the ```id``` of the connection that was successfuly removed.  

	{ removed: '50e7c5605022d20560000007' }

### Getting Users

	client.getUsers({[connection: connection], [per_page: 10]}, callback)

This method returns a list of users.

If ```connection``` name is supplied in the options, it will search the users on the directory of that connection. If the connection supports ```graph querying``` like **Windows Azure Active Directory**, then Auth0 will proxy the request to the directory and will fetch all the users from there. If the connection doesn't have a querying capability (e.g. ADFS) or it is a Social connection (e.g. **Google Auth 2**, **Microsoft Accounts**, etc) it will return all the users that have logged in to your application at least once.

The amount of items per page is optional (defaults to 100) and it is not supported for all directories, eg: connections using **Google Apps** ignores this argument and uses 100.

	client.getUsers({connection: 'a-waad-connection'}, function (err, result) {
		//result is an array with the user objects
	});

The callback has the common signature for node.js methods [err, result] where result is an array of users with an special hidden property called ```nextPageLink```. These links are safe to be shared since they will work for a short period of time and have an special signature that make them safe. 

Although you can do a simple GET to that link to fetch the next page, you can use the library as well:

	client.getUsers({connection: 'a-waad-connection'}, function (err, firstPageOfResults) {
		client.getUsers({page: firstPageOfResults.nextPageLink}, function (err, secondPageOfResults) {
		});
	});

### Getting Users with Social Logins

	client.getSocialUsers({[per_page: 10]}, callback)

The same than ```getUsers``` but this method returns users for all social connections as a group. That is, it will return a list of all the users that have logged in to your app and authenticated with any of the supported social identity providers. 

## Authentication

This library is useful to consume Auth0's REST API. To authenticate users you can use the [passport strategy](https://github.com/auth0/passport-auth0). See the [Node.js Tutorial](nodejs-tutorial) for an end to end walkthrough. 

## End to end sample

A complete example of using this library [here](http://github.com/auth0/passport-auth0).