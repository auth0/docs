# Rules

Rules are bits of code written in JavaScript that are executed every time a user authenticates to an application. It's that simple and yet very powerful. You could:

* Bring information from your own databases and add it to the user.
* Create authorization rules based on complex logic (anything that can be written with node.js).
* Normalize attributes from different providers.
* Reuse information from existing databases or APIs in migration scenarios.
* Whatever you can imagine (like keep a whitelist of users in a dropbox file and deny access based on email ;)

## Hello World Example

This rule will add a `hello` attribute to all users authenticating trough any provider.

    function (user, context, callback) {
      user.hello = 'world';
      console.log('===> set "hello" for ' + user.name);
      callback(null, user, context)
    }

> **HINT**: You can try the rule while editing and you can see the output and any `console.log` used. Useful for debugging ![](img/rules.png)

The rule takes the following arguments:

* `user`: the user object as it comes from the identity provider.
* `context`: an object containing contextual information.
  * `clientID`: the client id of the application the user is logging in to.
  * `clientName`: the name of the application (set on the dashboard).
  * `connection`: the name of the connection (e.g.: `twitter` or `some-google-apps-domain`)
  * `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints

> It is important to call the `callback` function which takes the `user` and `context` modified, otherwise the script will timeout (this is because of the async nature of node.js).

## Other examples

Here are some other rules that can be used as examples.

### Add roles to the user

Let's say you write this (simple) **rule**:

    function (user, context, callback) {
      user.roles = [];
      // only johnfoo is admin
      if (user.email === 'johnfoo@gmail.com') user.roles.push('admin');
          
      // all users are guest
      user.roles.push('guest');
          
      callback(null, user, context);
    }

When the user authenticates using Google, the rule will be executed with the following input:

`user` object:

      {
        email: "johnfoo@gmail.com",
        family_name: "Foo",
        user_id: "google-oauth2|103547991597142817347"
        ... other props ...
      }

`context` object:

      {
        clientID: "...client_id_of_the_app...",
        clientName: "my app",
        connection: "google-oauth2"
      }

After the rule executes, the output and what the application will receive is the following `user` object:

    {
      email: "johnfoo@gmail.com",
      family_name: "Foo",
      user_id: "google-oauth2|103547991597142817347",
  
      ... other props ...
    
      roles: ["guest", "admin"]  // NEW PROPERTY ADDED BY THE RULE
    }

### Deny access based on a condition

Apart from adding and removing properties from the user, you can return an "access denied" error.

    function (user, context, callback) {
      if (user.roles.indexOf('admin') === -1) {
        return callback(new UnauthorizedError('Only admins can use this'));
      }
    
      callback(null, user, context);
    }


This will cause a redirect to your callback url with an `error` querystring with the message you set here. E.g.: `https://yourapp.com/callback?error=Only%20admins%20can%20use%20this`

> **HINT**: For prototypes and small apps, you could put a file in a cloud storage (e.g. Dropbox), get a share link, make a request from the rule and use the response to let the user enter the app or add some attribute to entitle certain access.

### Enrich user information from a database

Here is another example where we bring roles for a user from a SQL Server database. We use roles as an example, but you can add virtually anything (arrays, complex types, etc.)

    function (user, context, callback) {
      getRoles(user.email, function(err, roles) {
        if (err) return callback(err);
    
        user.roles = roles;
    
        callback(null, user, context);
      });
      
      // Queries a table by e-mail and returns associated 'Roles'
      function getRoles(email, done) {
        var connection = sqlserver.connect(connection_info);
     
        var query = "SELECT Email, Role " + 
                    "FROM dbo.Role WHERE Email = @email";
     
        connection.on('connect', function (err) {
          if (err) return done(new Error(err));
          
          var request = new sqlserver.Request(query, function (err, rowCount, rows) {
            if (err) return done(new Error(err));
    
            var roles = rows.map(function (row) {
              return row[1].value;
            });
    
            done(null, roles);
          });
     
          request.addParameter('email', sqlserver.Types.VarChar, email);
     
          connection.execSql(request);
        });
      }
    }
    
> **HINT**: Make sure when you call an external endpoint to open your firewall/ports to our IP address which you can find it in the rules editor

## Query a Web Service

You can query a SOAP Web Service using `request`, parse the response and add properties to the user.

    function (user, context, callback) {
      getRoles(user.email, function(err, roles) {
        if (err) return callback(err);
    
        user.roles = roles;
    
        callback(null, user, context);
      });

      function getRoles(callback) {
        request.post({
          url:  'https://somedomain.com/RoleService.svc',
          body: '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><GetRolesForCurrentUser xmlns="http://tempuri.org"/></s:Body></s:Envelope>',
          headers: { 'Content-Type': 'text/xml; charset=utf-8', 
                  'SOAPAction': http://tempuri.org/RoleService/GetRolesForCurrentUser' }   
        }, function (err, response, body) {
          if (err) return callback(err);
          
          var parser = new xmldom.DOMParser();
          var doc = parser.parseFromString(body);
          var roles = xpath.select("//*[local-name(.)='string']", doc).map(function(node) { return node.textContent; });
          return callback(null, roles);
        }); 
      }
    }

## SAML Attribute mappings

We also expose the SAML configuration as part of the `context` object. This would allow you to change things on the way SAML Assertions are generated by Auth0. For instance, if you want to change the mappings between the [normalized profile](user-profile) and the SAML Attributes produced, you can modify the `context.samlConfiguration.mappings` property.

    function (user, context, callback) {
      context.samlConfiguration.mappings = {
         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "user_id"
         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":   "email",
         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":           "name"
      };

      callback(null, user, context)
    }

For more information about this, read [SAML Configuration](saml-configuration).

## Available Modules

The script runs in a JavaScript sandbox for security reasons. You can use the full power of the language (ECMAScript 5) and selected libraries. The current sandbox supports:

* [async](https://github.com/caolan/async)
* [request](https://github.com/mikeal/request)
* [sqlserver](https://github.com/pekim/tedious)
* [mongo](https://github.com/mongodb/node-mongodb-native)
* [mysql](https://github.com/felixge/node-mysql)
* [crypto](http://nodejs.org/docs/v0.8.23/api/crypto.html)
* [xmldom](https://github.com/jindw/xmldom)
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
* [xpath](https://github.com/goto100/xpath)
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js)
* [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2)
* [Buffer](http://nodejs.org/api/buffer.html)

> Do you need support for other libraries? Contact us [support@auth0.com](mailto:support@auth0.com)
