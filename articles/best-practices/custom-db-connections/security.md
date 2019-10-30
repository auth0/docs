---
description: Best practices for custom database connection security.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Connection Security Best Practices

* We recommend that you implement an API to provide least privilege to your legacy identity storage, rather than simply opening up general access via the internet. 
* Restricting access to the API via Rule will mitigate attack vector scenarios - such as where redirect to /authorize is intercepted and the audience to the API is added - and will ensure that only access using specific client credentials is granted.
* The Auth0 IP address whitelist is shared amongst all Auth0 tenants defined to a region. Never use the whitelist as the sole method of securing access to your legacy identity store; doing so could open up potential security vulnerabilities allowing unauthorized access to your users. 

## Keep reading

* [Security Bulletins](/security/bulletins)
* [Auth0 Security](/security)
* [Where to Store Tokens](/security/store-tokens)
