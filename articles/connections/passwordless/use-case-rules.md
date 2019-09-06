---
title: Use Case for Rules with Passwordless Authentication
topics:
    - connections
    - passwordless
contentType: reference
useCase: customize-connections
---
# Use Case for Rules with Passwordless Authentication

There are many scenarios in which rules can be used with authentication. In this particular scenario, you may be using [passwordless connection(s)](/connections/passwordless) in your application, but wish to add extra precautions or security to the process. 

These added steps can be done with [rules](/rules), which can be created in the [Dashboard > Rules](${manage_url}/#/rules). The below is an example of such a rule. 

This rule can be used to prompt a user for multifactor authentication if they use a passwordless (`sms` or `email`) authentication method when their session IP falls outside of the designated corporate network. This is particularly useful when trying to limit the use of passwordless connections to more secure locations.

```js
function (user, context, callback) {
  const ipaddr = require('ipaddr.js');
  const corp_network = "192.168.1.134/26";
  const current_ip = ipaddr.parse(context.request.ip);

  // Is auth method a passwordless one while also being outside corp network?
  const passwordlessOutside = context.authentication.methods.find(
    (method) => (
      ((method.name === 'sms') || (method.name === 'email')) && 
      (!current_ip.match(ipaddr.parseCIDR(corp_network)))
    )
  );
 
  // If passwordless auth outside of network, then require MFA
  if (passwordlessOutside) {
    context.multifactor = {
      provider: 'any',
      allowRememberBrowser: false
    };
  }

  callback(null, user, context);
}
```

This rule can also be easily adapted to trigger on other criteria, such as if the current IP does not match any in the user's IP whitelist, or if geolocating the user reveals that they are not in the same country as the country listed in their profile (if the user profile has that information). 

The ability to add these extra precautions to the process of authenticating via passwordless connections can help to alleviate security concerns about factors such as the possession of devices. At the same time, those rules can allow users to use Passwordless to more easily authenticate under the right circumstances.
