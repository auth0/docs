# A very simple Node module for consuming the Auth0 API

### auth0client.js

	var request = require('request');
	var oauthServerBaseUrl = 'https://{tenant}.auth0.com/';

	function Auth0Client(tenant, clientId, clientSecret)
	{
	  this.tenant = tenant;
	  this.clientId = clientId;
	  this.clientSecret = clientSecret;
	  this.baseUrl = oauthServerBaseUrl.replace('{tenant}', this.tenant);
	}

	Auth0Client.prototype.getToken = function( callback )
	{
	  var body = {
	      'client_id':     this.clientId,
	      'client_secret': this.clientSecret,
	      'type':          'web_server',
	      'grant_type':    'client_credentials'
	  };

	  var serverUrl = this.baseUrl + 'oauth/token';

	  request.post({
	    url: serverUrl,
	    form: body
	    }, function(err, resp, body) {
	          if(err)
	          {
	             callback( err, null );
	          }
	          token = JSON.parse(body)['access_token'];
	          callback(null, token);
	        });
	}

	Auth0Client.prototype.deleteConnection = function(id, callback)
	{
	  var serverUrl = this.baseUrl + 'api/connections/' + id;
	  
	  this.getToken(function(err,token)
	  {
	    request.del({
	          url: serverUrl, 
	          qs: {
	            access_token: token
	          },
	        }, function(err, resp, body)
	            {
	                if( err )
	                {
	                  callback(err, null);
	                }
	                else
	                {
	                  callback(null, JSON.parse(body));
	                }
	            });
	  });
	}

	Auth0Client.prototype.getConnections = function( callback )
	{
	  var serverUrl = this.baseUrl + 'api/connections';

	  this.getToken(function(err,token)
	          {
	            if( err )
	            {
	              callback(err,null);
	              return;
	            }

	            request.get({
	                  url: serverUrl,
	                  qs: {
	                    access_token: token
	                  },
	                  headers: {
	                    'Accept':'application/json'
	                  },
	                }, function(err, resp, body)
	                    {
	                        if(err)
	                        {
	                          callback(err, body);
	                        }
	                        else
	                        {
	                          callback(null, JSON.parse(body));
	                        }
	                    });
	          });
	}

	Auth0Client.prototype.getConnection = function( id, callback )
	{
	  var serverUrl = this.baseUrl + 'api/connections/' + id;p

	  this.getToken(function(err,token)
	          {
	            if( err )
	            {
	              callback(err,null);
	              return;
	            }

	            request.get({
	                  url: serverUrl,
	                  qs: {
	                    access_token: token
	                  },
	                  headers: {
	                    'Accept':'application/json'
	                  },
	                }, function(err, resp, body)
	                    {
	                        if(err)
	                        {
	                          callback(err, body);
	                        }
	                        else
	                        {
	                          callback(null, JSON.parse(body));
	                        }
	                    });
	          });
	}


	module.exports = Auth0Client;


Example of use:

	var Auth0Client = require('./auth0Client');

	var tenant = A TENANT;
	var clientId = YOUR CLIENT ID;
	var clientSecret = YOUR CLIENT SECRET;

	var client = new Auth0Client(tenant, clientId, clientSecret);

	var connection = {
	    "name":"MyGoogleAppConnection",
	    "options":
	    {
	      "client_id":"A CLIENT ID",
	      "client_secret":"A CLIENT SECRET",
	      "tenant_domain":"MYDOMAIN.COM",
	      "ext_groups":true
	    },
	    "strategy": "google-apps"
	};

	client.createConnection(connection, function(err,result)
	{
	  client.getConnections(function(err, connections)
	    {
	      console.log("Got " + connections.length + " connections");
	      console.log(JSON.stringify(connections));
	    });
	})