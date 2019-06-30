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
        to:   '/guides-tutorials/configure/tenants/settings-dashboard', 
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