---
title: Sample Use Cases - Rules with Passwordless Authentication
description: See examples using rules with passwordless connections.
topics:
    - connections
    - passwordless
    - rules
contentType: concept
useCase: customize-connections
---
# Sample Use Cases: Rules with Passwordless Authentication

With [rules](/rules), you can handle more complicated cases than is possible with [passwordless connections](/connections/passwordless) alone. For instance, you can add extra precautions to further ensure possession of an email address or device. 

## Require Multi-factor Authentication for users who are outside the corporate network

Let's say you want to require [multi-factor authentication (MFA)](/multifactor-authentication) for any users who are accessing the application using a passwordless connection from outside your corporate network. 

Using a rule, you can check whether a user is authenticating using a passwordless method (`sms`, `email`) and if their session IP falls outside of the designated corporate network, prompt them for a second authentication factor.

::: note
You could also trigger this rule based on other criteria, such as whether the current IP matches the user's IP allowlist or whether geolocating the user reveals they are in a different country from the one listed in their user profile. 
:::

To do this, you would [create the following rule](/dashboard/guides/rules/create-rules):

```js
function(user, context, callback) {

  const ipaddr = require('ipaddr.js');
  const corp_network = "192.168.1.134/26";
  const current_ip = ipaddr.parse(context.request.ip);

  // is auth method passwordless and IP outside corp network?
  const passwordlessOutside = context.authentication.methods.find(
    (method) => (
      ((method.name === 'sms') || (method.name === 'email')) && 
      (!current_ip.match(ipaddr.parseCIDR(corp_network)))
    )
  );
 
  // if yes, then require MFA
  if (passwordlessOutside) {
    context.multifactor = {
      provider: 'any',
      allowRememberBrowser: false
    };
  }

  callback(null, user, context);
}
```
