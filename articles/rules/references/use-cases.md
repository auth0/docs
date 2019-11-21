# Rules Use Cases

The following is a list of Rules for implementing a variety of functionality in Auth0.

Before proceeding, please review our [best practice](/best-practices/rules) recommendations for working with Rules. See also our [security bulletin](/security/bulletins/2019-01-10_rules) regarding vulnerable patterns when working with custom rules code.

## API Authorization

* [Change the returned scopes of the Access Token and/or add claims to it (and the ID Token)](/flows/guides/auth-code/includes/sample-use-cases-call-api#customize-tokens)

* [Set the JWT ID (JTI) of an Access Token](articles/api-auth/blacklists-vs-grants#blacklists)

* Restrict users from [calling an API or accessing an application](/api-auth/restrict-access-api)

* Define a [non-standard ID Token claim](/api-auth/tutorials/adoption/scope-custom-claims#custom-claims)

## Authorization

* [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)

* [Sample Use Cases - Scopes and Claims](/scopes/current/sample-use-cases)

## Compliance

* [Update user profile metadata with user consent choice](/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock#option-1-display-terms-conditions-link) and [redirect users to a consent page hosted by a third party](/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock#option-3-redirect-to-another-page)

## Connections

* [Sample Use Cases - Rules with Passwordless Authentication](/connections/passwordless/concepts/sample-use-cases-rules)

## Email

* Send an email to users that prompts them to [verify the provided email](/email/custom#verification-email)

* [Send a welcome email](/email/custom#welcome-email)

## Extensions

* [Rules](/extensions/authorization-extension/v2/rules) for use with the Authorization Extension

* [Set user roles](/extensions/delegated-admin/v3#set-user-roles-via-rules) using the Delegated Administration extension

* The version control deployment extensions offer deploy rules:

  * [Bitbucket](/extensions/bitbucket-deploy#deploy-rules)
  * [GitHub](/extensions/github-deploy#deploy-rules)
  * [GitLab](/extensions/gitlab-deploy#deploy-rules)
  * [Visual Studio Team Services](/extensions/visual-studio-team-services-deploy#deploy-rules)

## Integrations

* Map an [AWS role to an IAM policy that enforces access rules](/integrations/aws/sso#map-the-aws-role-to-a-user) for AWS resources

* [Provision/Log In Users from Azure Active Directory](/integrations/office-365-custom-provisioning#azure-ad-provisioning-rule)

* Modify the SAML configuration to [store the user's group memberships](/integrations/sharepoint#authorization) in their profile's groups attribute

## Login

* [Disable login for flagged users](/compliance/gdpr/features-aiding-compliance/user-consent#step-2-disable-login-for-flagged-users)

## Monitoring

* [Record `signup` events for your Auth0 apps in Keen](/monitoring/guides/send-events-to-keenio#record-a-sign-up-event-in-keen)

* [Record `signup` and `login` events for your Auth0 apps in Segment](/monitoring/guides/send-events-to-segmentio#2-record-sign-up-and-log-in-events-in-segment)

* [Record `signup` and `login` events for your Auth0 apps in Splunk](/monitoring/guides/send-events-to-splunk#record-sign-up-or-log-in-event-in-splunk)

* Track new leads in Salesforce by gathering TowerData information and [adding it to user profiles](/monitoring/guides/track-leads-salesforce#1-enrich-user-profile-with-towerdata), then [recording the sign up as a new lead in Salesforce](/monitoring/guides/track-leads-salesforce#2-create-new-lead-in-salesforce)

* Track new sign ups in Salesforce by [recording a sign up event in MixPanel](/monitoring/guides/track-signups-salesforce#1-record-sign-up-event-in-mixpanel), [augmenting user profiles with information from FullContact](/monitoring/guides/track-signups-salesforce#2-enrich-user-profile-with-fullcontact), and [recording the sign up as a new lead in Salesforce](/monitoring/guides/track-signups-salesforce#3-create-new-lead-in-salesforce).

## Multi-Factor Authentication

* [Define the conditions that trigger additional authentication challenges when users log in](/multifactor-authentication/custom)

* [Require users to log in with Duo every time](/multifactor-authentication/factors/duo#mfa-sessions)

* [Require users to authenticate with MFA whenever a specific scope is requested](/multifactor-authentication/step-up-authentication/step-up-for-apis#sample-scenario)

* [Require users to authenticate with MFA whenever requested by the web app](/multifactor-authentication/step-up-authentication/step-up-for-web-apps#sample-scenario)

## SAML

* [Customize your SAML responses](/protocols/saml/saml-configuration/saml-assertions#use-rules)

* [Change the signing key for SAML responses](/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests#change-the-signing-key-for-saml-responses)

## Tokens

* [Add user's email address to the Access Token](/architecture-scenarios/mobile-api/api-implementation-nodejs#4-determine-the-user-identity)

* [Validate token scopes](/architecture-scenarios/mobile-api/part-2#create-a-rule-to-validate-token-scopes)

## User Management

* [Add missing user profile information from secondary identities](/link-accounts#properties-from-secondary-identities)

* [Update a user profile metadata data field](/users/guides/change-user-pictures) with information available via the ID Token (you can also do this for [multiple users](/users/guides/change-user-pictures#change-the-default-picture-for-all-users) simultaneously)

* [Update user metadata](/users/references/user-data-storage-scenario#user-metadata)

* [Update user permissions](/users/references/user-data-storage-scenario#user-data-permission-rules)