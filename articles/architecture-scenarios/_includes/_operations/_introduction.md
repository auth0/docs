Operationalization requires configuring or setting up infrastructure to support the scalable, measurable, and quantifiable operation that’s necessary for business continuity. In Auth0, this includes configuring supporting services (such as email providers), monitoring services for your deployment, detecting anomalous situations, and making preparations to recover quickly and smoothly when something goes wrong in a production environment.

Establishing effective operational behaviors is something that successful customers have found pays dividends, and there are a number of things you will want to consider when looking at your workflow:

*	What should you do to proactively detect failures?
*	How can you obtain data on Auth0’s operational status?
*	What should you do about Auth0 security bulletins related to the Auth0 service?
*	Does Auth0 provide information regarding impending changes in the Auth0 service?
*   How can you check for important notices from Auth0?
*	What should you do with Auth0 log data so that you can analyze it and keep it for longer than Auth0’s limited data retention period?
*	How can you scan Auth0 logs to determine if peak loads in your application trigger any rate limits or other errors?
*	What email services should you use to support production volumes of email messages to users? Can I use Auth0's out-of-box email provider in my production environment?
*	Do you need to configure your firewall and what firewall ports will you need to open for internal services that need to receive communications from Auth0 (such as custom databases, web services, and email servers)?
<% if (platform === "b2b") { %>
* How will you provision new organizations?
* Do you need to provide self-service provisioning for your customer so that they can configure their own organizational IdPs?
<%  } %>

Auth0 supports functionality for [monitoring](#monitoring) Auth0 service operation as well as providing information regarding Auth0 [service status](#service-status). In addition, Auth0 makes security-related bulletins as well as information regarding upcoming changes to the Auth0 service available via various [notifications](#notifications). Auth0 [logging](#logging) services also provide extensive functionality for tracing and identifying operational anomalies, including restrictions encountered due to rate limiting and/or excessive loading.

Out-of-box, Auth0 provides email delivery services to help you accelerate your integration. These services, however, are not meant for scale-of-use in production environments, and do not provide for any specific service level or guarantee when it comes to email delivery. Our best practice recommendation, which customers typically follow, involves configuring your own [email service provider](#email-provider-setup).

You may also need to make changes to [infrastructure](#infrastructure) configuration in order to support integration with Auth0 and to support use of Auth0 extensibility. For example, if you need to provide callbacks to your internal or even external infrastructure (e.g., if you need to make external API calls in Rules or Hooks, or via custom database scripts if you need to leverage existing legacy identity storage), then you may need to configure your Firewall settings.

<% if (platform === "b2b") { %>
Once you know how you want organizations to be represented in your system, you will want too consider how you are going to provision the organization itself.  See [Provisioning organizations](#provisioning-organizations) for more information.

In addition, many of our customers have developed one or more self-service portals for use by their customers' organization admins to provide self-service capabilities for configuring their own [IdPs](#self-service-idp-provisioning).
<%  } %>
