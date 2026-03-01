---
description: Explore the differences between authentication and authorization.
toc: true
topics:
  - authorization
  - authentication
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authentication and Authorization

While often used interchangeably, [authentication](/application-auth/current) and [authorization](/authorization) represent fundamentally different functions. In this article, we compare and contrast the two to show how they protect applications in complementary ways.

In simple terms, authentication is the process of verifying who a user is, while authorization is the process of verifying what they have access to. 

Comparing these processes to a real-world example, when you go through security in an airport, you show your ID to authenticate your identity. Then, when you arrive at the gate, you present your boarding pass to the flight attendant, so they can authorize you to board your flight and allow access to the plane.

Here's a quick overview of the differences between authentication and authorization:

| **Authentication** | **Authorization** |
|--------------------|-------------------|
| Determines whether users are who they claim to be | Determines what users can and cannot access |
| Challenges the user to validate credentials (for example, through passwords, answers to security questions, or facial recognition) | Verifies whether access is allowed through policies and rules |
| Usually done before authorization | Usually done after successful authentication |
| Generally, transmits info through an ID Token | Generally, transmits info through an <dfn data-key="access-token">Access Token</dfn> |
| Generally governed by the <dfn data-key="openid">OpenID Connect (OIDC) protocol</dfn> | Generally governed by the OAuth 2.0 framework |
| Example: Employees in a company are required to authenticate through the network before accessing their company email | Example: After an employee successfully authenticates, the system determines what information the employees are allowed to access |

In short, access to a resource is protected by both authentication and authorization. If you can't prove your identity, you won't be allowed into a resource. And even if you can prove your identity, if you are not authorized for that resource, you will still be denied access.
