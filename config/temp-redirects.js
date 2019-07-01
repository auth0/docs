module.exports = [
    // 
    // About Auth0 aliases
    // 
    {
        from: '/getting-started/overview'
        to:   '/guides-tutorials/about-auth0/overview'
    },
    {
        from: '/getting-started/the-basics'
        to:   '/guides-tutorials/about-auth0/the-basics'
    },

    //
    // Getting Started
    //
    {
        from: ['/getting-started/the-basics#account-and-tenants', '/dev-lifecycle/setting-up-env']
        to:   '/guides-tutorials/getting-started/create-tenant'
    },
    {
        from: '/dashboard/guides/applications/register-app-regular-web'
        to:   '/guides-tutorials/getting-started/register-app-rebular-web'
    },
    {
        from: '/dashboard/guides/applications/register-app-native'
        to:   '/guides-tutorials/getting-started/register-app-native'
    },
    {
        from: '/dashboard/guides/applications/register-app-spa'
        to:   '/guides-tutorials/getting-started/register-app-spa'
    },
    {
        from: '/dashboard/guides/applications/register-app-m2m'
        to:   '/guides-tutorials/getting-started/register-app-m2m'
    },
    {
        from: '/apis#how-to-configure-an-api-in-auth0'
        to:   '/guides-tutorials/getting-started/configure-api'
    }
    // 
    // Monitor aliases
    // 
    {
        from: '/monitoring',
        to:   '/guides-tutorials/monitor'
    },
    {
        from: '/monitoring/guides'
        to:   '/guides-tutorials/monitor'
    },
    {
        from: '/logs',
        to:   '/guides-tutorials/monitor/logs'
    },
    {
        from: '/logs/query-syntax',
        to:   '/guides-tutorials/monitor/logs/query-syntax'
    },
    {
        from: '/logs/migrate-logs-v2-v3',
        to:   '/guides-tutorials/monitor/logs/migrate-logs-v2-v3'
    },
    {   
        from: '/monitoring/guides/check-status',
        to:   '/guides-tutorials/monitor/check-auth0-status'
    },
    {   
        from: '/monitoring/guides/test-testall-endpoints',
        to:   '/guides-tutorials/monitor/check-supporting-services'
    },
    {   
        from: '/monitoring/guides/check-external-services',
        to:   '/guides-tutorials/monitor/check-external-services'
    },
    {   
        from: '/monitoring/guides/monitor-applications',
        to:   '/guides-tutorials/monitor/applications'   
    },
    {   
        from: '/monitoring/guides/monitor-using-SCOM',
        to:   '/guides-tutorials/monitor/scom'
    },
    {   
        from: '/extensions/adldap-connector',
        to:   '/guides-tutorials/monitor/adldap-connector'   
    },
    {   
        from: '/connector/scom-monitoring',
        to:   '/guides-tutorials/monitor/scom-adldap-connector'   
    },
    {
        from: '/monitoring/guides/send-events-to-keenio'
        to:   '/guides-tutorials/monitor/send-events-to-keenio'
        
    },
    {
        from: '/monitoring/guides/send-events-to-segmentio'
        to:   '/guides-tutorials/monitor/send-events-to-segmentio'
        
    },
    {
        from: '/monitoring/guides/send-events-to-splunk'
        to:   '/guides-tutorials/monitor/send-events-to-splunk'
        
    },
    {
        from: '/monitoring/guides/track-leads-salesforce'
        to:   '/guides-tutorials/monitor/track-leads-salesforce'
        
    },
    {
        from: '/monitoring/guides/track-signups-salesforce'
        to:   '/guides-tutorials/monitor/track-signups-salesforce'
    },


    // 
    // Troubleshoot aliases 
    // 
    {
        from: '/troubleshoot/basics',
        to: '/guides-tutorials/troubleshoot/basics'
    },
    {
        from: '/troubleshoot/har',
        to: '/guides-tutorials/troubleshoot/har'
    },
    {
        from: '/troubleshoot/issues',
        to: '/guides-tutorials/troubleshoot/issues'
    },
    {
        from: '/libraries/error-messages',
        to: '/guides-tutorials/troubleshoot/error-messages'
    },
    {
        from: '/authorization/concepts/troubleshooting',
        to: '/guides-tutorials/troubleshoot/rbac'
    },
    {
        from: '/extensions/authorization-extension/v2/troubleshooting',
        to: '/guides-tutorials/troubleshoot/auth-extension'
    },
    {
        from: '/multifactor-authentication/troubleshooting',
        to: '/guides-tutorials/troubleshoot/mfa'
    },
    {
        from: '/protocols/saml/saml-configuration/troubleshoot',
        to: '/guides-tutorials/troubleshoot/saml'
    },
    {
        from: '/protocols/saml/saml-configuration/troubleshoot',
        to: '/guides-tutorials/troubleshoot/saml/auth0-as-idp'
    },
    {
        from: '/protocols/saml/saml-configuration/troubleshoot',
        to: '/guides-tutorials/troubleshoot/saml/auth0-as-sp'
    },
    {
        from: '/protocols/saml/saml-configuration/troubleshoot',
        to: '/guides-tutorials/troubleshoot/saml/common-saml-errors'
    },
    {
        from: '/errors/deprecation-errors',
        to: '/guides-tutorials/troubleshoot/deprecation-errors'
    },
    {
        from: '/connections/database/custom-db/error-handling',
        to: '/guides-tutorials/troubleshoot/custom-db'
    },
    {
        from: '/extensions/deploy-cli/references/troubleshooting',
        to: '/guides-tutorials/troubleshoot/deploy-cli'
    },
    {
        from: '/connector/troubleshooting',
        to: '/guides-tutorials/troubleshoot/connector'
    },
    {
        from: '/getting-started/deployment-models',
        to: '/guides-tutorials/deploy/deployment-models'
    },
    {
        from: '/pre-deployment',
        to: '/guides-tutorials/deploy/pre-deployment'
    },
    {
        from: '/pre-deployment/how-to-run-test',
        to: '/guides-tutorials/deploy/pre-deployment/how-to-run-test'
    },
    {
        from: '/pre-deployment/prelaunch-tips',
        to: '/guides-tutorials/deploy/pre-deployment/prelaunch-tips'
    },
    {
        from: '/pre-deployment/tests/best-practice',
        to: '/guides-tutorials/deploy/pre-deployment/tests/best-practice'
    },
    {
        from: '/pre-deployment/tests/recommended',
        to: '/guides-tutorials/deploy/pre-deployment/tests/recommended'
    },
    {
        from: '/pre-deployment/tests/required',
        to: '/guides-tutorials/deploy/pre-deployment/tests/required'
    },
    {
        from: '/extensions/deploy-cli',
        to: '/guides-tutorials/deploy/deploy-cli'
    },

    // 
    // Authorization aliases 
    // 
    {
        from: '/authorization',
        to: '/guides-tutorials/authorization'
    },
    {
        from: '/api-auth/tutorials/nonce',
        to: '/guides-tutorials/flows/mitigate-replay-attacks'
    },
    {
        from: '/authorization/concepts',
        to: '/guides-tutorials/authorization/concepts'
    },
    {
        from: '/authorization/guides',
        to: '/guides-tutorials/authorization/guides'
    },

    // 
    // Extend & Integrate aliases 
    // 
    {
        from: '/addons',
        to: '/guides-tutorials/extend-integrate/addons'
    },
    {
        from: '/hooks',
        to: '/guides-tutorials/extend-integrate/hooks'
    },
    {
        from: '/rules',
        to: '/guides-tutorials/extend-integrate/rules'
    },
    {
        from: '/extensions',
        to: '/guides-tutorials/extend-integrate/extensions'
    },
    {
        from: '/integrations/sso',
        to: '/guides-tutorials/extend-integrate/integrations/sso'
    },
    {
        from: '/integrations/marketing',
        to: '/guides-tutorials/extend-integrate/integrations/marketing'
    },
    {
        from: '/analytics',
        to: '/guides-tutorials/extend-integrate/integrations/analytics'
    },
    {
        from: '/extensions/user-import-export',
        to:   '/guides-tutorials/extend-integrate/extensions/user-import-export'
    },
    {
        from: '/extensions/account-link',
        to:   '/guides-tutorials/extend-integrate/extensions/account-link'
    },

    // 
    // Branding & Customization aliases 
    // 
    {
        from: '/custom-domains',
        to: '/guides-tutorials/branding-customization/custom-domains'
    },
    {
        from: '/email',
        to: '/guides-tutorials/branding-customization/email'
    },
    {
        from: '/i18n',
        to: '/guides-tutorials/branding-customization/i18n'
    },

    // 
    // Connections aliases 
    // 
    {
        from: '/custom-domains',
        to: '/guides-tutorials/branding-customization/custom-domains'
    },
    {
        from: '/email',
        to: '/guides-tutorials/branding-customization/email'
    },
    {
        from: '/multifactor-authentication/sms-templates',
        to: '/guides-tutorials/branding-customization/multifactor-authentication/sms-templates'
    },
    {
        from: '/i18n',
        to: '/guides-tutorials/branding-customization/i18n'
    },

    // 
    // Manage Users Aliases
    // 
    {
        from: '/users',
        to:   '/guides-tutorials/manage-users/overview-manage-users'
    },
    {
        from: '/users/concepts/overview-user-profiles',
        to:   '/guides-tutorials/manage-users/overview-user-profiles'
    },
    {
        from: '/users/concepts/overview-user-metadata',
        to:   '/guides-tutorials/manage-users/overview-user-metadata'
    },
    {
        from: '/users/guides/manage-users-using-the-dashboard',
        to:   '/guides-tutorials/manage-users/manage-users-using-the-dashboard'
    },
    {
        from: '/users/guides/manage-users-using-the-management-api',
        to:   '/guides-tutorials/manage-users/manage-users-using-the-management-api'
    },
    {
        from: '/security/blacklisting-attributes',
        to:   '/guides-tutorials/manage-users/blacklisting-attributes'
    },
    {
        from: '/users/concepts/overview-user-migration',
        to:   '/guides-tutorials/manage-users/overview-user-migration'
    },
    {
        from: '/users/references/bulk-import-database-schema-examples',
        to:   '/guides-tutorials/manage-users/bulk-import-database-schema-examples'
    },
    {
        from: '/users/guides/configure-automatic-migration',
        to:   '/guides-tutorials/manage-users/configure-automatic-migration'
    },
    {
        from: '/users/guides/bulk-user-imports',
        to:   '/guides-tutorials/manage-users/bulk-user-imports'
    },
    {
        from: '/users/guides/bulk-user-exports',
        to:   '/guides-tutorials/manage-users/bulk-user-exports'
    },
    {
        from: '/users/references/user-migration-scenarios',
        to:   '/guides-tutorials/manage-users/user-migration-scenarios'
    },
    {
        from: '/users/search/v3',
        to:   '/guides-tutorials/manage-users/search/v3'
    },

    //
    // Configure Aliases
    //
    {
        from: '/dashboard/dashboard-tenant-settings',
        to:   '/guides-tutorials/configure/tenants/settings', 
    },
    {
        from: '/dashboard/manage-dashboard-admins',
        to:   '/guides-tutorials/configure/tenants/dashboard-admins', 
    },
    {
        from: '/dashboard/guides/tenants/configure-session-lifetime-settings',
        to:   '/guides-tutorials/configure/tenants/session-lifetime', 
    },
    {
        from: '/dashboard/guides/tenants/enable-sso-tenant',
        to:   '/guides-tutorials/configure/tenants/enable-sso', 
    },
    {
        from: '/best-practices/tenant-settings',
        to:   '/guides-tutorials/configure/tenants/recommended-settings',
    },
    {
        from: '/dashboard/guides/tenants/configure-device-user-code-settings',
        to:   '/guides-tutorials/configure/tenants/device-user-code-settings',
    },
    {
        from: '/dashboard/guides/tenants/create-multiple-tenants',
        to:   '/guides-tutorials/configure/tenants/create-multiple-tenants',
    },
    {
        from: '/dashboard/reference/settings-application',
        to:   '/guides-tutorials/configure/applications/settings',
    },
    {
        from: '/dashboard/guides/applications/rotate-client-secret',
        to:   '/guides-tutorials/configure/applications/rotate-client-secret',
    },
    {
        from: '/dashboard/guides/applications/enable-universal-links',
        to:   '/guides-tutorials/configure/applications/enable-universal-links',
    },
    {
        from: '/dashboard/guides/applications/enable-android-app-links',
        to:   '/guides-tutorials/configure/applications/enable-android-app-links',
    },
    {
        from: '/dashboard/guides/applications/enable-sso-app',
        to:   '/guides-tutorials/configure/applications/enable-sso',
    },
    {
        from: '/dashboard/guides/applications/remove-app',
        to:   '/guides-tutorials/configure/applications/remove-app',
    },
    {
        from: '/dashboard/guides/applications/set-up-addons',
        to:   '/guides-tutorials/configure/applications/set-up-addons',
    },
    {
        from: '/dashboard/guides/applications/update-grant-types',
        to:   '/guides-tutorials/configure/applications/update-grant-types',
    },
    {
        from: '/dashboard/guides/applications/view-addons',
        to:   '/guides-tutorials/configure/applications/view-addons',
    },
    {
        from: '/dashboard/guides/applications/view-app-type-confidential-public',
        to:   '/guides-tutorials/configure/applications/view-app-type-confidential-public',
    },
    {
        from: '/best-practices/application-settings',
        to:   '/guides-tutorials/configure/applications/recommended-settings',
    },
    {
        from: '/guides/ip-whitelist',
        to:   '/guides-tutorials/configure/ip-whitelist',
    },
    {
        from: '/dashboard/reference/settings-api',
        to:   '/guides-tutorials/configure/apis/settings',
    },
    {
        from: '/api-auth/tutorials/represent-multiple-apis',
        to:   '/guides-tutorials/configure/apis/represent-multiple-apis',
    },
    {
        from: '/dashboard/guides/apis/add-permissions-apis',
        to:   '/guides-tutorials/configure/apis/add-permissions',
    },
    {
        from: '/dashboard/guides/apis/delete-permissions-apis',
        to:   '/guides-tutorials/configure/apis/delete-permissions',
    },
    {
        from: '/dashboard/guides/apis/enable-rbac',
        to:   '/guides-tutorials/configure/apis/enable-rbac',
    },
    {
        from: '/dashboard/reference/views-api',
        to:   '/guides-tutorials/configure/apis/views-api',
    },
    {
        from: [
                '/sso',
                '/sso/current',
              ],
        to:   '/guides-tutorials/configure/sso',
    },
    {
        from: '/sso/current/sso-auth0',
        to:   '/guides-tutorials/configure/sso/sso-auth0',
    },
    {
        from: '/sso/legacy',
        to:   '/guides-tutorials/configure/sso/legacy',
    },
    {
        from: '/sso/legacy/regular-web-apps-sso',
        to:   '/guides-tutorials/configure/sso/legacy/regular-web-apps-sso',
    },
    {
        from: '/sso/legacy/single-page-apps',
        to:   '/guides-tutorials/configure/sso/legacy/single-page-apps',
    },
    {
        from: '/protocols/saml/saml-apps/cisco-webex',
        to:   '/guides-tutorials/configure/saml/sso-integrations/cisco-webex',
    },
    {
        from: '/protocols/saml/saml-apps/datadog',
        to:   '/guides-tutorials/configure/saml/sso-integrations/datadog',
    },
    {
        from: '/protocols/saml/saml-apps/egencia',
        to:   '/guides-tutorials/configure/saml/sso-integrations/egencia',
    },
    {
        from: '/protocols/saml/saml-apps/eloqua',
        to:   '/guides-tutorials/configure/saml/sso-integrations/eloqua',
    },
    {
        from: '/protocols/saml/saml-apps/freshdesk',
        to:   '/guides-tutorials/configure/saml/sso-integrations/freshdesk',
    },
    {
        from: '/protocols/saml/saml-apps/github-cloud',
        to:   '/guides-tutorials/configure/saml/sso-integrations/github-cloud',
    },
    {
        from: '/protocols/saml/saml-apps/github-server',
        to:   '/guides-tutorials/configure/saml/sso-integrations/github-server',
    },
    {
        from: '/protocols/saml/saml-apps/google-apps',
        to:   '/guides-tutorials/configure/saml/sso-integrations/google-apps',
    },
    {
        from: '/protocols/saml/saml-apps/heroku',
        to:   '/guides-tutorials/configure/saml/sso-integrations/heroku',
    },
    {
        from: '/protocols/saml/saml-apps/hosted-graphite',
        to:   '/guides-tutorials/configure/saml/sso-integrations/hosted-graphite',
    },
    {
        from: '/protocols/saml/saml-apps',
        to:   '/guides-tutorials/configure/saml/sso-integrations/',
    },
    {
        from: '/protocols/saml/saml-apps/litmos',
        to:   '/guides-tutorials/configure/saml/sso-integrations/litmos',
    },
    {
        from: '/protocols/saml/saml-apps/pluralsight',
        to:   '/guides-tutorials/configure/saml/sso-integrations/pluralsight',
    },
    {
        from: '/protocols/saml/saml-apps/sprout-video',
        to:   '/guides-tutorials/configure/saml/sso-integrations/sprout-video',
    },
    {
        from: '/protocols/saml/saml-apps/tableau-online',
        to:   '/guides-tutorials/configure/saml/sso-integrations/tableau-online',
    },
    {
        from: '/protocols/saml/saml-apps/tableau-server',
        to:   '/guides-tutorials/configure/saml/sso-integrations/tableau-server',
    },
    {
        from: '/protocols/saml/saml-apps/workday',
        to:   '/guides-tutorials/configure/saml/sso-integrations/workday',
    },
    {
        from: '/protocols/saml/saml-apps/workpath',
        to:   '/guides-tutorials/configure/saml/sso-integrations/workpath',
    },
    {
        from: '/protocols/saml/saml-configuration/special-configuration-scenarios/idp-initiated-sso',
        to:   '/guides-tutorials/configure/saml/special-scenarios/idp-initiated-sso',
    },
    {
        from: '/protocols/saml/saml-configuration/special-configuration-scenarios/index',
        to:   '/guides-tutorials/configure/saml/special-scenarios/index',
    },
    {
        from: '/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests',
        to:   '/guides-tutorials/configure/saml/special-scenarios/signing-and-encrypting-saml-requests',
    },
    {
        from: '/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider',
        to:   '/guides-tutorials/configure/saml/auth0-as-identity-and-service-provider',
    },
    {
        from: '/protocols/saml/saml-configuration/auth0-as-identity-provider',
        to:   '/guides-tutorials/configure/saml/auth0-as-identity-provider',
    },
    {
        from: '/protocols/saml/saml-configuration/auth0-as-service-provider',
        to:   '/guides-tutorials/configure/saml/auth0-as-service-provider',
    },
    {
        from: '/protocols/saml/saml-configuration/deprovision-users',
        to:   '/guides-tutorials/configure/saml/deprovision-users',
    },
    {
        from: '/protocols/saml/saml-configuration/design-considerations',
        to:   '/guides-tutorials/configure/saml/design-considerations',
    },
    {
        from: '/protocols/saml/saml-configuration',
        to:   '/guides-tutorials/configure/saml/overview',
    },
    {
        from: '/protocols/saml/saml-configuration/logout',
        to:   '/guides-tutorials/configure/saml/logout',
    },
    {
        from: '/protocols/saml/saml-configuration/saml-assertions',
        to:   '/guides-tutorials/configure/saml/saml-assertions',
    },
    {
        from: '/protocols/saml/saml-configuration/supported-options-and-bindings',
        to:   '/guides-tutorials/configure/saml/supported-options-and-bindings',
    },
    {
        from: '/protocols/saml/identity-providers/okta',
        to:   '/connections/saml/okta',
    },
    {
        from: '/protocols/saml/identity-providers/onelogin',
        to:   '/connections/saml/onelogin',
    },
    {
        from: '/protocols/saml/identity-providers/ping7',
        to:   '/connections/saml/ping7',
    },
    {
        from: '/protocols/saml/identity-providers/salesforce',
        to:   '/connections/saml/salesforce',
    },
    {
        from: '/protocols/saml/identity-providers/siteminder',
        to:   '/connections/saml/siteminder',
    },
    {
        from: '/protocols/saml/identity-providers/ssocircle',
        to:   '/connections/saml/ssocircle',
    },
    {
        from: '/protocols/saml/adfs',
        to:   '/guides-tutorials/configure/saml/adfs',
    },
    {
        from: '/protocols/saml/idp-initiated-sso',
        to:   '/guides-tutorials/configure/saml/idp-initiated-sso',
    },
    {
        from: '/protocols/saml',
        to:   '/guides-tutorials/configure/saml',
    },
    {
        from: '/protocols/saml/saml-idp-eloqua',
        to:   '/guides-tutorials/configure/saml/saml-idp-eloqua',
    },
    {
        from: '/protocols/saml/saml-idp-generic',
        to:   '/guides-tutorials/configure/saml/saml-idp-generic',
    },
    {
        from: '/protocols/saml/saml-sp-generic',
        to:   '/guides-tutorials/configure/saml/saml-sp-generic',
    },
    {
        from: '/protocols/saml/saml2webapp-tutorial',
        to:   '/guides-tutorials/configure/saml/saml2webapp-tutorial',
    },
    {
        from: '/protocols/saml/samlp-providers',
        to:   '/guides-tutorials/configure/saml/samlp-providers',
    },
    {
        from: '/protocols/saml/samlp',
        to:   '/guides-tutorials/configure/saml/samlp',
    },
    {
        from: '/protocols/saml/samlsso-auth0-to-auth0',
        to:   '/guides-tutorials/configure/saml/samlsso-auth0-to-auth0',
    },
    {
        from: '/anomaly-detection',
        to:   '/guides-tutorials/configure/anomaly-detection/',
    },
    {
        from: '/anomaly-detection/concepts/breached-passwords',
        to:   '/guides-tutorials/configure/anomaly-detection/breached-passwords',
    },
    {
        from: '/anomaly-detection/guides/customize-blocked-account-emails',
        to:   '/guides-tutorials/configure/anomaly-detection/customize-blocked-account-emails',
    },
    {
        from: '/anomaly-detection/guides/enable-disable-brute-force-protection',
        to:   '/guides-tutorials/configure/anomaly-detection/enable-disable-brute-force-protection',
    },
    {
        from: '/anomaly-detection/guides/set-anomaly-detection-preferences',
        to:   '/guides-tutorials/configure/anomaly-detection/preferences',
    },
    {
        from: '/anomaly-detection/references/anomaly-detection-faqs',
        to:   '/guides-tutorials/configure/anomaly-detection/faqs',
    },
    {
        from: '/anomaly-detection/references/anomaly-detection-restrictions-limitations',
        to:   '/guides-tutorials/configure/anomaly-detection/restrictions-limitations',
    },
    {
        from: '/anomaly-detection/references/breached-password-detection-triggers-actions',
        to:   '/guides-tutorials/configure/anomaly-detection/breached-password-detection-triggers-actions',
    },
    {
        from: '/anomaly-detection/references/brute-force-protection-triggers-actions',
        to:   '/guides-tutorials/configure/anomaly-detection/brute-force-protection-triggers-actions',
    },
    

    // 
    // References: Grant Types
    // 
    {
        from: '/applications/concepts/application-grant-types',
        to:   '/reference/grant-types'
    },
    {
        from: '/applications/reference/grant-types-available',
        to:   '/reference/grant-types/grant-types-available'
    },
    {
        from: '/applications/reference/grant-types-auth0-mapping',
        to:   '/reference/grant-types/grant-types-auth0-mapping'
    },
    {
        from: 'https://auth0.com/docs/applications/concepts/grant-types-legacy',
        to:   '/reference/grant-types/grant-types-legacy'
    }
]