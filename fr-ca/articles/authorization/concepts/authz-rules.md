---
description: Understand how rules apply to authorization policies and Auth0's role-based access system (RBAC).
toc: true
topics:
  - authorization
  - rbac
  - roles
  - permissions
  - policies
  - rules
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Rules for Authorization Policies

You can append [Rules](/rules) to the pre-configured authorization policy to exercise additional control over permitting or denying user access. A rule contains custom code that makes an authorization decision based on appropriate logic. When combined with other rules, it helps define what happens in different contexts.

Rules can restrict access based on any combination of attributes you store for users, such as user department, time of day, location, or any other user or API attribute (like username, security clearance, or API name).

For example, if you were using rules to provide finely-grained access control at a non-profit organization, you could give only W2 employees working in the Research and Development department in the New Delhi office access to an application.

For samples of rule implementations with authorization policies, see [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules).

## Rules in the authorization process

Based on the order in which they run, rules can change the outcome of the authorization decision prior to the permissions being added to the <dfn data-key="access-token">Access Token</dfn>. The basic process with rules injected is as follows:

1. The user tries to authenticate with the application.
2. Auth0 brings the request to the selected identity provider.
3. Once the identity provider confirms that user credentials are valid, all created rules run in the order in which they are configured in the Dashboard.
4. Assuming no rule has restricted the user's access, the user is authorized to access the application.

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Authorization Policies](/authorization/concepts/policies)
- [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)