---
  description: How to transition your Clients to non-legacy Authorization flows
  toc: true
---

# Adoption Guide: Client Grant Types

Beginning TBD, Auth0 is restricting use of legacy authorization flows. To manage this, we have implemented a new property on all Auth0 Clients called `grant_types`. Because the `client_grants` property is required, this guide provides suggestions on how to adapt your existing Clients to this change.

### Who is this guide for?

This guide is meant for developers and IT administrators who manage their applications' Auth0 integrations.

### Concepts and Terminology

* [Auth0 Clients](/clients)
* Authorization
  * [API](/api-auth)
  * [Client](/client-auth)
* [Multifactor Authentication](/multifactor-authentication)

### Do I need to implement these changes?

All new customers as of TBD must use a non-legacy authorization flow.

If you are an existing customer as of TBD **and** your Client is:

* An existing Auth0 client: You can enable a legacy flow by making the appropriate PATCH command to the Update a Client endpoint of the Management API;
* A newly-created Auth0 client: You must use a non-legacy authorization flow.

### When is the deadline to adopt these changes?

TBD
