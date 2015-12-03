---
description: "Explore a specific example of a complex, multi-party authentication flow and learn how Auth0 makes it simple."
fourKeyConcepts: 
  - 
    icon: css-class-bud-icon
    text: "The Problem: What Makes Multi-Party App Authentication So Tricky?"
  - 
    icon: css-class-bud-icon
    text: "The Solution: Auth0 Redirect Rules"
  - 
    icon: css-class-bud-icon
    text: "The Details: Walking Through a Specific Multi-Party Example"
  - 
    icon: css-class-bud-icon
    text: "The Result: Fast, Flexible Implementation In Just A Few Dozen Lines Of Code"
hash: multiparty-authentication-flow
longDescription: "The emergence of web APIs for diverse services across the web brings new opportunities to mash-up these services into innovative new applications. But along with these opportunities come some big challenges: how do you implement complex, multi-party authentication flows that can secure applications built on the API Economy? In this Use Case we explore a specific example of Find out how Auth0's developer-centered features make even the most complex authentication flows easy to implement, and get you to market that much faster with your advanced, API-driven appications."
sitemap: false
title: "Multi-Party Authentication Flow"
type: use-case
---
# Use Case: Multi-Party Authentication Flow

* * *


## THE PROBLEM

When your business depends on quickly getting your custom applications into production, you need an IAM platform that is designed by developers, for developers. Let’s look at how Auth0 makes even sophisticated identity workflows easy to implement, getting your applications into production more quickly, more securely, and with less on-going maintenance.

Imagine that you are building "Lodging Picks", a B2B SaaS travel application you will sell to enterprises. You aggregate lodging listings from multiple sources including hotels and RoomSMart, an online marketplace very similar to AirBnB that matches hosts with rooms to rent with travelers looking for cost-effective home-based lodging. The challenge: book RoomSMart properties through their private API<sup><a href="#1" data-note="We could have used AirBnB as our example but we did not want to imply that they’re actually offering such a private API for use by partners. Think of RoomSMart as just like AirBnB, and this use case as illustrating a realistic, multi-party authentication scenario.">1</a></sup> on behalf of your customers’ users, without holding RoomSMart account credentials.

What makes this multi-party authentication flow complex to implement? Let’s look at the concerns of the involved parties in this scenario:

* **The Enterprise** is keen to gain the benefits of Lodging Picks for its business, but must control access to the Lodging Picks application for its employees, and wants to make it simple to use. Accordingly, the company wants to integrate Lodging Picks into their SSO infrastructure, and must be able to provision and deprovision employees for Lodging Picks as they join and leave the company.

* **The Employee** wants to book lodging through the application, including RoomSMart rooms, but must control access to her RoomSMart account by Lodging Picks. In particular, Lodging Picks must have limited access only to book rooms using the default payment method for her account, and not to rate hosts, send messages, or change profile or payment information. In addition, she must be able to revoke access in the event of a problem, and keep her RoomSMart profile private.

* **Lodging Picks** wants to offer a valuable service to their enterprise customers, with a great SSO user experience for enterprise users and a new channel for RoomSMart. But in a world where security breaches are regular front-page news, Lodging Picks must broker these transactions while minimizing the trust demanded of the participating parties. Unless everyone feels secure that their valuable information is safe and under their control, the risks of using this SaaS application might exceed the benefits.

* **RoomSMart** Is eager to add a new B2B channel to their sales. But they have built their business on the basis of trust: hosts are offering up space in their homes to strangers - guests, and guests are booking those rooms on the basis of both descriptions on the site, and ratings and comments by other guests. Both hosts and guests save sensitive information on the service, and RoomSMart must maintain privacy and comply with laws and regulations while delivering a very simple user experience. Accordingly, they likely don’t allow other applications to store login credentials, they tightly control API access, they give the owners of sensitive information full control, and they retain the ability to enforce their terms of service.

If this seems complicated, it is! But it is also typical of modern web and mobile applications built by composing services available in the "API economy" from independent sources. Authentication and authorization are the critical tools that govern how such services can trust each other in an inherently untrustworthy environment.

Today, no solution handles sophisticated, multi-party authentication workflows like this one out of the box. Tools with built-in and simple authentication flows can’t do it. To implement Lodging Picks, you might need to hand-build a custom IAM solution at substantial cost, hire specialized talent, and put in place expensive, on-going maintenance. What you really need is an API-driven identity platform optimized for developer flexibility, that simplifies applications where identity spans organizational boundaries. You need Auth0.

## THE SOLUTION: AUTH0 REDIRECT RULES

What needs to happen here? The user - an employee of your customer - will log in to Lodging Picks using their federated enterprise credentials. Auth0 simplifies this process, making it easy for you to implement SSO for your customers. Once a user is authenticated, you’ll need to execute an on-boarding workflow that allows Lodging Picks to use the RoomSMart API to view and book RoomSMart accommodations on behalf of the user.

Why not just ask the user to log into Lodging Picks with both their enterprise credentials and their RoomSMart credentials, then link the accounts so that the user can use either account to access Lodging Picks? This approach wouldn’t work: the user could access Lodging Picks even after they’re no longer an employee of the enterprise, using their RoomSMart login. Access to the Lodging Picks application must only use the employee’s enterprise account, through SSO.

What if you asked the user to save their RoomSMart name and password in the Lodging Picks application? This might work, but it goes against best practice. It is much less secure for both RoomSMart and the employee, could make Lodging Picks a more attractive hacking target, and accordingly might be disallowed by RoomSMart.

So how can you gain only the access you require to RoomSMart on behalf of the user, without holding their RoomSMart credentials, and while authenticating using only the user’s enterprise account?

![Auth0 Rules Pipeline](/media/articles/email-wall/use-cases/multi-party-auth-flow/Auth0RulesOverview.png) 

**Figure 1: Auth0 Rules Pipeline**

Auth0 includes a powerful feature - authentication pipeline rules - that let you add code that executes after every authentication to add custom processing. Rules can include arbitrary code that could log transactions, tie into analytics platforms, initiate additional authentication such as multi-factor authentication, or call additional APIs to access additional information or perform additional work. Rules can redirect users to external sites or services and upon return, perform additional processing on the result. This ability to add any code to the authentication pipeline is one of Auth0’s most powerful features.

<img alt="Example Grant Page" src="/media/articles/email-wall/use-cases/multi-party-auth-flow/MultiParty_DesktopGrant.png" class="figure-right">With just a few dozen lines of Javascript, you can implement even a complex multi-party, multi-protocol authentication workflow such as the one for Lodging Picks. So, we’ll implement our workflow as a rule (prototype Javascript code is in Appendix A, at the end of this use case). When the rule detects that Auth0 hasn’t yet saved a refresh token for RoomSMart, such as when a user first logs into Lodging Picks, it interrupts the user’s authentication processing and redirects to RoomSMart’s API grant page. The user then grants Auth0 permission on behalf of Lodging Picks, to acquire and securely store a user-specific API refresh token in the user’s profile which can in turn be used to acquire an access token with limited access rights and short expiration. Lodging Picks can call Auth0’s API to retrieve `user.app_metadata_encrypted_roomsmart_refresh_token` and after acquiring the access token, perform RoomSMart lookups and bookings on behalf of the user. The user retains full control and is able to revoke this access at any time by visiting her RoomSMart account. RoomSMart also can revoke the refresh or access token. Another rule could automatically use the refresh token to acquire a new access token before the old one expires.

![Example Multi-Party Authentication Workflow](/media/articles/email-wall/use-cases/multi-party-auth-flow/MultiParty_FlowDiagram.png)

**Figure 2: Example Multi-Party Authentication Workflow**

Auth0’s redirect rules let you interrupt the authentication pipeline to call out to any service. You’re not limited to code you’ve written in your application. With this powerful capability, you can leverage the web API ecosystem, or build custom integrations to enterprise applications. 

Check out Auth0’s comprehensive [documentation and examples](https://auth0.com/docs/rules/redirect) for more on how to implement redirect rules, and take a look at Appendix A to see a prototype of a rule that implements this specific use case.

<img alt="Example Phone Application" src="/media/articles/email-wall/use-cases/multi-party-auth-flow/MultiParty_PhoneGrant.png" class="figure-right">Arbitrary code execution means you have the flexibility to compose complex authentication and authorization workflows, without building and maintaining a custom IAM solution. All using simple hooks and Auth0’s comprehensive front-end and back-end platform support to speed development.

When it comes time to implement your IOS and Android native applications, your developers can leverage this production identity workflow with no extra effort - mobile apps use the same Auth0 APIs. Easy!

## CONCLUSION

Modern web and mobile applications are composed of services called by APIs hosted by independent companies and entities. Security in this API ecosystem depends on authentication - services must know that calls to their API for access to personally-identifiable information and sensitive actions are legitimate, and approved by their account holders. As applications grow in complexity, the usage patterns and access requirements of these independent APIs can’t be predicted in advance and built into rigid design patterns. The API economy demands code-driven flexibility in handling authentication flows. Auth0 authentication pipeline rules makes such custom flows easy for developers to build, and easy for end users to navigate.

Auth0 comes with another unique feature - its lauded Customer Success team. Help is just a Slack chat or email away - to get you past any hurdles quickly and get your business critical applications into production.

For more information, contact the Auth0 sales team, or just try it out! The full capability of the Auth0 platform is always free for development use. Create your free account today at auth0.com and discover the developer-focused difference.

## APPENDIX A: PROTOTYPE CODE

Here is some sample code that implements the rule described in this use case. It gets an authorization code through the RoomSMart consent flow, then exchanges that code for a refresh token. The rule then encrypts that refresh token and saves it as application metadata in the user’s profile.
```javascript
function (user, context, callback) {
  // If we already have the user's refresh token, don't ask for consent again.
  user.user_metadata = user.user_metadata || {};
  if (user.app_metadata.encrypted_roomsmart_refresh_token) {
    return callback(null, user, context);
  }

  var CLIENT_ID = '123456';
  var CLIENT_SECRET = 'ABCDEFG';
  
  // Redirect to the RoomSMart web application to ask for consent.
  if (context.protocol !== 'redirect-callback') {
    var REDIRECT_TO = 'https://roomsmart.com';
    var REDIRECT_PATH = '/oauth2/authorize?client_id=' + CLIENT_ID +
        '&redirect_uri=http://lodgingpicks.auth0.com/continue&response_type=code' +
        '&scope=offline_access%20read_account';
    
    context.redirect = {
      url: REDIRECT_TO + REDIRECT_PATH
    };

    return callback(null, user, context);  
  } 
  // We are redirected back.
  else {
    
    // No consent given.
    if (context.request.query.error) {
       return callback(new UnauthorizedError(context.request.query.error_description)); 
    }
    
    // Consent given, exchange the authorization code for tokens
    var token_request = {
      body: 'grant_type=authorization_code' +
        '&client_id=' + CLIENT_ID +
        '&client_secret=' + CLIENT_SECRET +
        '&redirect_uri=http://lodgingpicks.auth0.com/continue' +
        '&code=' + context.request.query.code
    };
    request.post('https://roomsmart.com/oauth2/token', token_request, function(err, res, body) {
      if (err) { 
        return callback(err);
      }
      
      var token_response = JSON.parse(body);
      if (!token_response.refresh_token) {
        return callback(new UnauthorizedError('Refresh token is missing')); 
      }
      
      // Encrypt the refresh token.
      user.app_metadata.encrypted_roomsmart_refresh_token = encrypt(token_response.refresh_token);

      // Store it in the user's profile.
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
      .then(function() {
        
        // Continue the authentication transaction.
        callback(null, user, context);
      })
      .catch(function(err){
        callback(err);
      });
    });
  }

  // Helper to encrypt sensitive data.
  function encrypt(data) {
    var iv = new Buffer(configuration.ENCRYPT_IV);
    var decodeKey = crypto.createHash('sha256')
      .update(configuration.ENCRYPT_PASSWORD, 'utf-8').digest();
    var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
    return cipher.update(JSON.stringify(data || {}), 'utf8', 'base64') + cipher.final('base64');
  }
}
```

