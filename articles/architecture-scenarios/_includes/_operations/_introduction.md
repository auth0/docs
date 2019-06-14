Operationalization requires configuring or setting up infrastructure to support the scalable, measurable, and quantifiable operation that’s necessary for business continuity. In Auth0, this includes configuring supporting services (such as email providers), monitoring services for your deployment, detecting anomalous situations, and making preparations to recover quickly and smoothly when something goes wrong in a production environment. 

Establishing effective operational behaviors is something that successful customers have found pays dividends, and there are a number of things you will want to consider when looking at your workflow:

*	What should I be doing to proactively detect failures?
*	What do I need to know regarding how to obtain data on Auth0’s operational status?
*	What should I be doing about Auth0 security bulletins related to the Auth0 service?
*	Does Auth0 provide information regarding impending changes in the Auth0 service?
*	How can I check for important notices from Auth0?
*	What should I be doing about Auth0 log data so that I can analyze it and keep it for longer than Auth0’s limited data retention period?
*	Can I scan Auth0 logs to determine if peak loads in my application trigger any rate limits or other errors?
*	What email services should I be using to support production volumes of email messages to users? Why can’t I use Auth0's out-of-box email provider in my production environment?
*	Why would I need to configure my firewall, and what firewall ports will I need to open for internal services that need to receive communications from Auth0 (such as custom databases, web services, and email servers)?

Auth0 supports functionality for [monitoring](#monitoring) Auth0 service operation as well as providing information regarding Auth0 [service status](#service-status). In addition, Auth0 makes security-related bulletins as well as information regarding upcoming changes to the Auth0 service available via various [notifications](#notifications). Auth0 [logging](#logging) services also provide extensive functionality for tracing and identifying operational anomalies, including restrictions encountered due to rate limiting and/or excessive loading.

Out-of-box, Auth0 provides email delivery services to help you accelerate your integration. These services, however, are not meant for scale-of-use in production environments, and do not provide for any specific service level or guarantee when it comes to email delivery. Our best practice recommendation, which customers typically follow, involves configuring your own email service provider as discussed in the guidance provided [here](#email-provider-setup).

You may also need to make changes to [infrastructure](#infrastructure) configuration in order to support integration with Auth0 and to support use of Auth0 extensibility. For example, if you need to provide callbacks to your internal or even external infrastructure (e.g., if you need to make external API calls in Rules or Hooks, or via custom database scripts if you need to leverage existing legacy identity storage), then you may need to configure your Firewall settings.
