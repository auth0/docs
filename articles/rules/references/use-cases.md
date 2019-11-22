---
description: Rules use cases for Auth0
classes: topic-page
toc: true
topics:
  - rules
  - extensibility
contentType:
  - reference
  - index
useCase: extensibility-rules
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Rules Uses Cases</h1>
  <p>The following is a list of Rules for implementing a variety of functionality in Auth0.</p>
  <p>Before proceeding, please review our [best practice](/best-practices/rules) recommendations for working with Rules. See also our [security bulletin](/security/bulletins/2019-01-10_rules) regarding vulnerable patterns when working with custom rules code.</p>
</div>

<h2>API Authorization</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code/includes/sample-use-cases-call-api#customize-tokens">Change the returned scopes of the Access Token and/or add claims to it (and the ID Token)</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="articles/api-auth/blacklists-vs-grants#blacklists">Set the JWT ID (JTI) of an Access Token</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> Restrict users from <a href="/api-auth/restrict-access-api">calling an API or accessing an application</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> Define a <a href="/api-auth/tutorials/adoption/scope-custom-claims#custom-claims">non-standard ID Token claim</a>
    </li>
</ul>

<h2>Authorization</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/authorization/concepts/sample-use-cases-rules">Sample Use Cases: Rules with Authorization</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/scopes/current/sample-use-cases">Sample Use Cases - Scopes and Claims</a>
    </li>
</ul>

<h2>Compliance</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock#option-1-display-terms-conditions-link">Update user profile metadata with user consent choice</a> and <a href="/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock#option-3-redirect-to-another-page">redirect users to a consent page hosted by a third party</a>
    </li>
</ul>

<h2>Connections</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/connections/passwordless/concepts/sample-use-cases-rules">Sample Use Cases - Rules with Passwordless Authentication</a>
    </li>
</ul>

<h2>Email</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i> Send an email to users that prompts them to <a href="/email/custom#verification-email">verify the provided email</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/email/custom#welcome-email">Send a welcome email</a>
    </li>
</ul>

<h2>Extensions</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/rules">Rules</a> for use with the Authorization Extension
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/extensions/delegated-admin/v3#set-user-roles-via-rules">Set user roles</a> using the Delegated Administration extension
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> The version control deployment extensions offer deploy rules.
        <ul>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/bitbucket-deploy#deploy-rules">Bitbucket</a>
            </li>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/github-deploy#deploy-rules">GitHub</a>
            </li>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/gitlab-deploy#deploy-rules">GitLAB</a>
            </li>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/visual-studio-team-services-deploy#deploy-rules">Visual Studio Team Services</a>
            </li>
        </ul>
    </li>
</ul>

<h2>Integrations</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i> Map an <a href="/integrations/aws/sso#map-the-aws-role-to-a-user">AWS role to an IAM policy that enforces access rules</a> for AWS resources
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/integrations/office-365-custom-provisioning#azure-ad-provisioning-rule">Provision/Log In Users from Azure Active Directory</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> Modify the SAML configuration to <a href="/integrations/sharepoint#authorization">store the user's group memberships</a> in their profile's groups attribute
    </li>
</ul>

<h2>Login</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/compliance/gdpr/features-aiding-compliance/user-consent#step-2-disable-login-for-flagged-users">Disable login for flagged users</a>
    </li>
</ul>

<h2>Monitoring</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/compliance/gdpr/features-aiding-compliance/user-consent#step-2-disable-login-for-flagged-users">Disable login for flagged users</a>
    </li>
</ul>

<h2>Monitoring</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-keenio#record-a-sign-up-event-in-keen">Record <code>signup</code> events for your Auth0 apps in Keen</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-segmentio#2-record-sign-up-and-log-in-events-in-segment">Record <code>signup</code> and <code>login</code> events for your Auth0 apps in Segment</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-splunk#record-sign-up-or-log-in-event-in-splunk">Record <code>signup</code> and <code>login</code> events for your Auth0 apps in Splunk</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> Track new leads in Salesforce by gathering TowerData information and <a href="/monitoring/guides/track-leads-salesforce#1-enrich-user-profile-with-towerdata">adding it to user profiles</a>, then <a href="/monitoring/guides/track-leads-salesforce#2-create-new-lead-in-salesforce">recording the sign up as a new lead in Salesforce</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> Track new sign ups in Salesforce by <a href="/monitoring/guides/track-signups-salesforce#1-record-sign-up-event-in-mixpanel">recording a sign up event in MixPanel</a>, <a href="/monitoring/guides/track-signups-salesforce#2-enrich-user-profile-with-fullcontact">augmenting user profiles with information from FullContact</a>, and <a href="/monitoring/guides/track-signups-salesforce#3-create-new-lead-in-salesforce">recording the sign up as a new lead in Salesforce</a>.
    </li>
</ul>

<h2>Multi-Factor Authentication</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/multifactor-authentication/custom">Define the conditions that trigger additional authentication challenges when users log in</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/multifactor-authentication/factors/duo#mfa-sessions">Require users to log in with Duo every time</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/multifactor-authentication/step-up-authentication/step-up-for-apis#sample-scenario">Require users to authenticate with MFA whenever a specific scope is requested</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/multifactor-authentication/step-up-authentication/step-up-for-web-apps#sample-scenario">Require users to authenticate with MFA whenever requested by the web app</a>
    </li>
</ul>

<h2>SAML</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/protocols/saml/saml-configuration/saml-assertions#use-rules">Customize your SAML responses</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests#change-the-signing-key-for-saml-responses">Change the signing key for SAML responses</a>
    </li>
</ul>

<h2>Tokens</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/mobile-api/api-implementation-nodejs#4-determine-the-user-identity">Add user's email address to the Access Token</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/architecture-scenarios/mobile-api/part-2#create-a-rule-to-validate-token-scopes">Validate token scopes</a>
    </li>
</ul>

<h2>User Management</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/link-accounts#properties-from-secondary-identities">Add missing user profile information from secondary identities</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/users/guides/change-user-pictures">Update a user profile metadata data field</a> with information available via the ID Token (you can also do this for <a href="/users/guides/change-user-pictures#change-the-default-picture-for-all-users">multiple users</a> simultaneously)
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/users/references/user-data-storage-scenario#user-metadata">Update user metadata</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="Update user permissions">/users/references/user-data-storage-scenario#user-data-permission-rules</a>
    </li>
</ul>
