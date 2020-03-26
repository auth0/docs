---
description: Rules use cases for Auth0
title: Rules Use Cases
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
  <h1>Rules Use Cases</h1>
  <p>The following is a list of Rules for implementing a variety of functionality in Auth0.</p>
  <p>Before proceeding, please review our <a href="/best-practices/rules">best practice</a> recommendations for working with Rules. See also our <a href="/security/bulletins/2019-01-10_rules">security bulletin</a> regarding vulnerable patterns when working with custom rules code.</p>
</div>

<h2>API Authorization</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/flows/guides/auth-code/includes/sample-use-cases-call-api#customize-tokens">Change the returned scopes of the Access Token and/or add claims to it (and the ID Token)</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/api-auth/blacklists-vs-grants#blacklists">Set the JWT ID (JTI) of an Access Token</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/api-auth/restrict-access-api">Restrict users from calling an API or accessing an application</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/api-auth/tutorials/adoption/scope-custom-claims#custom-claims">Define a non-standard ID Token claim</a>
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
        <i class="icon icon-budicon-715"></i><a href="/email/custom#verification-email">Send a verification email</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/email/custom#welcome-email">Send a welcome email</a>
    </li>
</ul>

<h2>Extensions</h2>

<ul class="topic-links">
    <li>
        <i class="icon icon-budicon-715"></i><a href="/extensions/authorization-extension/v2/rules">Rules for use with the Authorization Extension</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/extensions/delegated-admin/v3#set-user-roles-via-rules">Set user roles using the Delegated Administration extension</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i> The version control deployment extensions offer deploy rules:
        <ul>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/bitbucket-deploy#deploy-rules">Bitbucket</a>
            </li>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/github-deploy#deploy-rules">GitHub</a>
            </li>
            <li>
                <i class="icon icon-budicon-695"></i><a href="/extensions/gitlab-deploy#deploy-rules">Gitlab</a>
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
        <i class="icon icon-budicon-715"></i><a href="/integrations/aws/sso#map-the-aws-role-to-a-user"> Map an AWS role to an IAM policy that enforces access rules for AWS resources</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/integrations/office-365-custom-provisioning#azure-ad-provisioning-rule">Provision/Log In Users from Azure Active Directory</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/integrations/sharepoint#authorization">Modify the SAML configuration to store the user's group memberships in their profile's groups attribute</a>
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
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-keenio#record-a-sign-up-event-in-keen">Record sign up events for your Auth0 apps in Keen</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-segmentio#2-record-sign-up-and-log-in-events-in-segment">Record signup and login events for your Auth0 apps in Segment</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/send-events-to-splunk#record-sign-up-or-log-in-event-in-splunk">Record signup and login events for your Auth0 apps in Splunk</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/track-leads-salesforce">Track new leads in Salesforce by gathering TowerData information and adding it to user profiles, then recording the sign up as a new lead in Salesforce</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/monitoring/guides/track-signups-salesforce">Track new sign ups in Salesforce by recording a sign up event in MixPanel, augmenting user profiles with information from FullContact, and recording the sign up as a new lead in Salesforce</a>.
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
        <i class="icon icon-budicon-715"></i><a href="/users/guides/link-user-accounts#add-missing-information-from-rules">Add missing user profile information from secondary identities</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/users/guides/change-user-pictures">Update a user profile metadata data field with information available via the ID Token</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/users/references/user-data-storage-scenario#user-metadata">Update user metadata</a>
    </li>
    <li>
        <i class="icon icon-budicon-715"></i><a href="/users/references/user-data-storage-scenario#user-data-permission-rules">Update user permissions</a>
    </li>
</ul>
