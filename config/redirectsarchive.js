// This is the list of APIs used in the old two-step quickstarts.
const apiNames = [
  'aspnet-webapi',
  'aws',
  'azure-blob-storage',
  'azure-mobile-services',
  'azure-sb',
  'falcor',
  'firebase',
  'golang',
  'hapi',
  'java-spring-security',
  'java',
  'nginx',
  'nodejs',
  'php-laravel',
  'php-symfony',
  'php',
  'python',
  'rails',
  'ruby',
  'salesforce-sandbox',
  'salesforce',
  'sap-odata',
  'wcf-service',
  'webapi-owin'
];

const apis = `:api(${apiNames.join('|')})`;

module.exports = [

  
  {
    from: '/awsapi-tutorial',
    to: '/integrations/aws'
  },
  
  {
    from: '/firebaseapi-tutorial',
    to: '/applications/addons'
  },
  {
    from: '/applications/addons',
    to: '/addons'
  },
  {
    from: '/mvc-tutorial-enterprise',
    to: '/tutorials/aspnet-mvc4-enterprise-providers'
  },
  {
    from: '/migrations',
    to: '/product-lifecycle/migrations'
  },
  {
    from: '/phonegap-plugin-tutorial',
    to: '/native-platforms/cordova'
  },
  {
    from: '/salesforcesandboxapi-tutorial',
    to: '/applications/addons'
  },
  {
    from: '/salesforceapi-tutorial',
    to: '/applications/addons'
  },
  {
    from: '/sapapi-tutorial',
    to: '/applications/addons'
  },


  /* --- Two-step quickstarts to single-step quickstarts --- */

  {
    from: '/quickstart/webapp/nodejs/02-user-profile',
    to: '/quickstart/webapp/nodejs/01-login'
  },

  {
    from: [
      '/quickstart/hybrid',
      '/quickstart/native-mobile'
    ],
    to: '/quickstart/native'
  },
  {
    from: [
      '/quickstart/hybrid/:platform',
      '/quickstart/native-mobile/:platform',
      `/quickstart/hybrid/:platform/${apis}`,
      `/quickstart/native-mobile/:platform/${apis}`,
      `/quickstart/native/:platform/${apis}`
    ],
    to: '/quickstart/native/:platform'
  },
  {
    from: `/quickstart/spa/:platform/${apis}`,
    to: '/quickstart/spa/:platform'
  },
  {
    from: `/quickstart/backend/:platform/${apis}`,
    to: '/quickstart/backend/:platform'
  },
  {
    from: `/quickstart/spa/emberjs`,
    to: '/quickstart/spa/ember'
  },

  /* --- Removed Quickstarts --- */

  {
    from: [
      '/quickstart/spa/aurelia',
      '/quickstart/spa/ember',
      '/quickstart/spa/jquery'
    ],
    to: '/quickstart/spa'
  },
  
  /* --- Connections --- */

  {
    from: ['/37signals-clientid', '/connections/social/37signals'],
    to: '/connections/social/basecamp'
  },
  {
    from: '/amazon-clientid',
    to: '/connections/social/amazon'
  },
  {
    from: '/aol-clientid',
    to: '/connections/social/aol'
  },
  {
    from: '/connections/enterprise/azure-active-directory',
    to: '/connections/enterprise/azure-active-directory/v2'
  },
  {
    from: '/connections/enterprise/azure-active-directory-classic',
    to: '/connections/enterprise/azure-active-directory/v1'
  },
  {
    from: '/connections/enterprise/samlp',
    to: '/connections/enterprise/saml'
  },
  {
    from: '/dwolla-clientid',
    to: '/connections/social/dwolla'
  },
  {
    from: '/baidu-clientid',
    to: '/connections/social/baidu'
  },
  {
    from: '/box-clientid',
    to: '/connections/social/box'
  },
  {
    from: '/evernote-clientid',
    to: '/connections/social/evernote'
  },
  {
    from: '/exact-clientid',
    to: '/connections/social/exact'
  },
  {
    from: '/facebook-clientid',
    to: '/connections/social/facebook'
  },
  {
    from: '/fitbit-clientid',
    to: '/connections/social/fitbit'
  },
  {
    from: '/github-clientid',
    to: '/connections/social/github'
  },
  {
    from: '/goodreads-clientid',
    to: '/connections/social/goodreads'
  },
  {
    from: '/goog-clientid',
    to: '/connections/social/google'
  },
  {
    from: '/miicard-clientid',
    to: '/connections/social/miicard'
  },
  {
    from: '/ms-account-clientid',
    to: '/connections/social/microsoft-account'
  },
  {
    from: '/oauth2',
    to: '/connections/social/oauth2'
  },
  {
    from: '/connections/social/auth0-oidc',
    to: '/connections/enterprise/oidc'
  },
  {
    from: '/paypal-clientid',
    to: '/connections/social/paypal'
  },
  {
    from: '/planningcenter-clientid',
    to: '/connections/social/planning-center'
  },
  {
    from: ['/salesforce-clientid', '/salesforce-community'],
    to: '/connections/social/salesforce'
  },
  {
    from: '/renren-clientid',
    to: '/connections/social/renren'
  },
  {
    from: '/sharepoint-clientid',
    to: '/connections/enterprise/sharepoint-apps'
  },
  {
    from: '/shopify-clientid',
    to: '/connections/social/shopify'
  },
  {
    from: '/soundcloud-clientid',
    to: '/connections/social/soundcloud'
  },
  {
    from: '/thecity-clientid',
    to: '/connections/social/thecity'
  },
  {
    from: '/twitter-clientid',
    to: '/connections/social/twitter'
  },
  {
    from: '/vkontakte-clientid',
    to: '/connections/social/vkontakte'
  },
  {
    from: '/waad-clientid',
    to: '/connections/enterprise/azure-active-directory'
  },
  {
    from: '/weibo-clientid',
    to: '/connections/social/weibo'
  },
  {
    from: '/wordpress-clientid',
    to: '/connections/social/wordpress'
  },
  {
    from: '/yahoo-clientid',
    to: '/connections/social/yahoo'
  },
  {
    from: '/yandex-clientid',
    to: '/connections/social/yandex'
  },
  {
    from: '/instagram-clientid',
    to: '/connections/social/instagram'
  },
  {
    from: '/linkedin-clientid',
    to: '/connections/social/linkedin'
  },
  {
    from: '/mysql-connection-tutorial',
    to: '/connections/database/mysql'
  },
  {
    from: '/migrating',
    to: '/connections/database/migrating'
  },
  {
    from: '/ad',
    to: '/connections/enterprise/active-directory-ldap'
  },
  {
    from: '/connections/enterprise/ldap',
    to: '/connections/enterprise/active-directory-ldap'
  },
    {
    from: '/connections/enterprise/active-directory',
    to: '/connections/enterprise/active-directory-ldap'
  },
  {
    from: '/adfs',
    to: '/connections/enterprise/adfs'
  },
  {
    from: ['/passwordless','/dashboard/guides/connections/set-up-connections-passwordless'],
    to: '/connections/passwordless'
  },
  {
    from: '/connections/passwordless/ios-sms',
    to: '/connections/passwordless/ios-sms-objc'
  },

/* --- Clients --- */

  {
    from: '/clients',
    to: '/applications'
  },
  {
    from: '/clients/addons',
    to: '/applications/addons'
  },
  {
    from: '/clients/client-grant-types',
    to: '/applications/application-grant-types'
  },
  {
    from: '/applications/application-grant-types',
    to: '/applications/concepts/application-grant-types'
  },
  {
    from: '/applications/concepts/signing-algorithms',
    to: '/tokens/concepts/signing-algorithms'
  },
  {
    from: '/clients/client-types',
    to: '/applications/application-types'
  },
  {
    from: '/applications/application-types',
    to: '/applications'
  },
  {
    from: '/applications/concepts/connections',
    to: '/connections'
  },
  {
    from: '/applications/machine-to-machine',
    to: '/applications'
  },
  {
    from: '/applications/concepts/app-types-auth0',
    to: '/applications'
  },
  {
    from: '/clients/connections',
    to: '/connections'
  },
  {
    from: '/applications/connections',
    to: '/connections'
  },
  {
    from: '/clients/enable-android-app-links',
    to: '/applications/enable-android-app-links'
  },
  {
    from: '/applications/enable-android-app-links',
    to: '/applications/guides/enable-android-app-links-dashboard'
  },
  {
    from: '/applications/guides/enable-android-app-links-dashboard',
    to: '/dashboard/guides/applications/enable-android-app-links'
  },
  {
    from: '/clients/enable-universal-links',
    to: '/applications/enable-universal-links'
  },
  {
    from: '/applications/enable-universal-links',
    to: '/applications/guides/enable-universal-links-dashboard'
  },
  {
    from: '/applications/guides/enable-universal-links-dashboard',
    to: '/dashboard/guides/applications/enable-universal-links'
  },
  {
    from: '/clients/how-to-rotate-client-secret',
    to: '/dashboard/guides/applications/rotate-client-secret'
  },
  {
    from: '/applications/how-to-rotate-client-secret',
    to: '/dashboard/guides/applications/rotate-client-secret'
  },
  {
    from: '/applications/how-to-rotate-application-secret',
    to: '/dashboard/guides/applications/rotate-client-secret'
  },
  {
    from: '/clients/client-settings',
    to: '/applications/application-settings'
  },
  {
    from: '/applications/application-settings',
    to: '/reference/dashboard/settings-application'
  },

  /* --- Scenarios to Tutorials --- */

  {
    from: '/scenarios/amazon-cognito',
    to: '/tutorials/integrating-auth0-amazon-cognito-mobile-apps'
  },
  {
    from: '/scenarios/github',
    to: '/tutorials/using-auth0-as-an-identity-provider-with-github-enterprise'
  },
  {
    from: ['/scenarios/keenio', '/scenarios-keenio'],
    to: '/tutorials/sending-events-to-keenio'
  },
  {
    from: [
      '/scenarios-mixpanel-fullcontact-salesforce',
      '/scenarios/mixpanel-fullcontact-salesforce'
    ],
    to: '/tutorials/track-signups-enrich-user-profile-generate-leads'
  },
  {
    from: ['/scenarios-mqtt', '/scenarios/mqtt'],
    to: '/tutorials/authenticating-devices-using-mqtt'
  },
  {
    from: ['/scenarios-rapleaf-salesforce', '/scenarios/rapleaf-salesforce'],
    to: '/tutorials/tracking-new-leads-in-salesforce-and-raplead'
  },
  {
    from: ['/scenarios-segmentio', '/scenarios/segmentio'],
    to: '/tutorials/sending-events-to-segmentio'
  },
  {
    from: '/scenarios/slack',
    to: '/tutorials/integrating-with-slack'
  },
  {
    from: ['/scenarios-splunk', '/scenarios/splunk'],
    to: '/tutorials/sending-events-to-splunk'
  },
  {
    from: ['/scenarios-tessel', '/scenarios/tessel'],
    to: '/tutorials/authenticating-a-tessel-device'
  },
  {
    from: ['/scenarios-unbounce', '/scenarios/unbounce'],
    to: '/tutorials/get-user-information-with-unbounce-landing-pages'
  },
  {
    from: '/scenarios',
    to: '/tutorials'
  },

  /* --- Miscellaneous --- */

  {
    from: '/widget',
    to: '/login-widget2'
  },
  {
    from: '/adldap-auth',
    to: '/connector/install'
  },
  {
    from: '/adldap-x',
    to: '/connector/install-other-platforms'
  },
  {
    from: '/sharepoint-apps',
    to: '/integrations/sharepoint-apps'
  },
  {
    from: '/auth0js',
    to: '/libraries/auth0js'
  },
  {
    from: '/aws',
    to: '/integrations/aws'
  },
  {
    from: ['/lock', '/migrations/guides/legacy-lock-api-deprecation'],
    to: '/libraries/lock'
  },
  {
    from: ['/okta', '/saml/identity-providers/okta'],
    to: '/protocols/saml/identity-providers/okta'
  },
  {
    from: ['/onelogin', '/saml/identity-providers/onelogin'],
    to: '/protocols/saml/identity-providers/onelogin'
  },
  {
    from: ['/ping7', '/saml/identity-providers/ping7'],
    to: '/protocols/saml/identity-providers/ping7'
  },
  {
    from: ['/siteminder', '/saml/identity-providers/siteminder'],
    to: '/protocols/saml/identity-providers/siteminder'
  },
  {
    from: '/ssocircle',
    to: '/protocols/saml/identity-providers/ssocircle'
  },
  {
    from: '/wsfedwebapp-tutorial',
    to: '/tutorials/wsfed-web-app'
  },
  {
    from: '/api',
    to: '/api/info'
  },
  {
    from: ['/auth-api', '/api/authentication/reference'],
    to: '/api/authentication'
  },
  {
    from: '/api/v1',
    to: '/migrations/guides/management-api-v1-v2'
  },
  {
    from: ['/api-reference', '/api/v1/reference'],
    to: '/api/management/v1/reference'
  },
  {
    from: ['/apiv2', '/api/v2'],
    to: '/api/management/v2'
  },
  {
    from: ['/apiv2Changes', '/api/v2/changes'],
    to: '/api/management/v2/changes'
  },
  {
    from: ['/tokens/apiv2', '/api/v2/tokens', '/api/management/v2/concepts/tokens'],
    to: '/api/management/v2/tokens'
  },
  {
    from: ['/metadata-in-rules', '/metadata/rules'],
    to: '/rules/metadata-in-rules'
  },
  {
    from: [
      '/multi-factor-authentication',
      '/multi-factor-authentication2',
      '/multifactor-authentication/custom-provider',
      '/multifactor-authentication'
    ],
    to: '/mfa'
  },
  {
    from: [
      '/multifactor-authentication/google-auth/user-guide',
      '/multifactor-authentication/troubleshooting'
    ],
    to: '/mfa/references/troubleshoot-mfa'
  },
  {
    from: [
      '/multi-factor-authentication/yubikey',
      '/multifactor-authentication/yubikey'
    ],
    to: '/mfa'
  },
  {
    from: '/multifactor-authentication/api/email',
    to: '/mfa/guides/mfa-api/email'
  },
  {
    from: '/multifactor-authentication/api/oob',
    to: '/mfa/guides/mfa-api/oob'
  },
  {
    from: '/multifactor-authentication/api/otp',
    to: '/mfa/guides/mfa-api/otp'
  },
  {
    from: ['/multifactor-authentication/api', '/multifactor-authentication/api/faq'],
    to: '/mfa/concepts/mfa-api'
  },
  {
    from: '/multifactor-authentication/api/manage',
    to: '/mfa/guides/mfa-api/manage'
  },
  {
    from: '/multifactor-authentication/twilio-configuration',
    to: '/mfa/guides/configure-phone'
  },
  {
    from: '/multifactor-authentication/sms-templates',
    to: '/mfa/guides/customize-phone-messages'
  },
  {
    from: '/mfa/guides/guardian/customize-sms-messages',
    to: '/mfa/guides/customize-phone-messages'
  },
  {
    from: '/multifactor-authentication/reset-user',
    to: '/mfa/guides/reset-user-mfa'
  },
  {
    from: '/multifactor-authentication/step-up-authentication',
    to: '/mfa/concepts/step-up-authentication'
  },
  {
    from: '/multifactor-authentication/step-up-authentication/step-up-for-web-apps',
    to: '/mfa/guides/configure-step-up-web-apps'
  },
  {
    from: '/multifactor-authentication/step-up-authentication/step-up-for-apis',
    to: '/mfa/guides/configure-step-up-apis'
  },
  {
    from: '/multifactor-authentication/factors',
    to: '/mfa/concepts/mfa-factors'
  },
  {
    from: ['/multifactor-authentication/factors/sms','/mfa/guides/configure-sms'],
    to: '/mfa/guides/configure-phone'
  },
  {
    from: '/multifactor-authentication/factors/push',
    to: '/mfa/guides/configure-push'
  },
  {
    from: '/multifactor-authentication/factors/otp',
    to: '/mfa/guides/configure-otp'
  },
  {
    from: '/multifactor-authentication/factors/email',
    to: '/mfa/guides/configure-email'
  },
  {
    from: '/mfa/guides/configure-email-universal-login',
    to: '/mfa/guides/configure-email'
  },
  {
    from: '/multifactor-authentication/factors/duo',
    to: '/mfa/guides/configure-cisco-duo'
  },
  {
    from: '/multifactor-authentication/developer',
    to: '/mfa/concepts/developer-resources'
  },
  {
    from: '/multifactor-authentication/developer/sns-configuration',
    to: '/mfa/guides/configure-push'
  },
  {
    from: '/multifactor-authentication/developer/libraries/ios',
    to: '/mfa/guides/guardian/guardian-ios-sdk'
  },
  {
    from: '/multifactor-authentication/developer/libraries/android',
    to: '/mfa/guides/guardian/guardian-android-sdk'
  },
  {
    from: '/multifactor-authentication/developer/custom-enrollment-ticket',
    to: '/mfa/guides/guardian/create-enrollment-ticket'
  },
  {
    from: '/multifactor-authentication/custom',
    to: '/mfa/guides/customize-mfa-universal-login'
  },
  {
    from: '/quickstart',
    to: '/'
  },
  {
    from: ['/link-accounts/user-initiated', '/link-accounts/user-initiated-linking'],
    to: '/users/references/link-accounts-client-side-scenario'
  },
  {
    from: '/users/references/link-accounts-user-initiated-scenario',
    to: '/users/references/link-accounts-client-side-scenario'
  },
  {
    from: '/users/guides/link-user-accounts-auth-api',
    to: '/migrations/guides/account-linking'
  },
  {
    from: '/libraries/lock/using-refresh-tokens',
    to: '/libraries/lock/using-a-refresh-token'
  },
  {
    from: '/premium-support',
    to: '/support'
  },
  {
    from: '/password-strength',
    to: '/connections/database/password-strength'
  },
  {
    from: '/users-search',
    to: '/api/v2/user-search'
  },
  {
    from: '/api/v2/user-search',
    to: '/api/management/v2/user-search'
  },
  {
    from: '/users/normalized/auth0/retrieve-user-profiles',
    to: `/users/search`
  },
  {
    from: [
      '/appliance/checksum',
      '/appliance/proxy-updater',
      '/appliance/update',
      '/updating-appliance'
    ],
    to: '/private-cloud'
  },
  {
    from: '/enterprise-support',
    to: '/onboarding/enterprise-support'
  },
  {
    from: '/extensions/azure-blog-storage',
    to: '/extensions/azure-blob-storage'
  },
  {
    from: '/quickstart/backend/java',
    to: '/quickstart/backend/java-spring-security',
    status: 302
  },
  {
    from: ['/rate-limits', '/policies/rate-limit'],
    to: '/policies/rate-limits'
  },
  {
    from: '/i18n/password-strength',
    to: '/i18n/password-options'
  },
  {
    from: '/sso/single-sign-on',
    to: '/sso'
  },
  {
    from: '/libraries/lock/v10/installation',
    to: '/libraries/lock',
    status: 302
  },
  {
    from: '/libraries/lock/customization',
    to: '/libraries/lock/v11/configuration',
    status: 302
  },
  {
    from: '/libraries/lock/display-modes',
    to: '/libraries/lock/v11/customization#container-string-',
    status: 302
  },
  {
    from: '/cancel-paid-subscriptions',
    to: '/tutorials/cancel-paid-subscriptions'
  },
  {
    from: '/pricing-per-app-per-connection',
    to: '/tutorials/pricing-per-app-per-connection'
  },
  {
    from: '/local-testing-and-development',
    to: '/tutorials/local-testing-and-development'
  },
  {
    from: '/moving-out',
    to: '/tutorials/removing-auth0-exporting-data'
  },
  {
    from: '/lifecycle',
    to: '/tutorials/development-lifecycle-with-auth0'
  },
  {
    from: '/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp',
    to: '/tutorials/adding-scopes-for-an-external-idp'
  },
  {
    from: '/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api',
    to: '/tutorials/calling-an-external-idp-api'
  },
  {
    from: '/enable-simple-connection',
    to: '/tutorials/enabling-a-connection'
  },
  {
    from: '/oauth1',
    to: '/tutorials/adding-generic-oauth1-connection'
  },
  {
    from: '/oauth2-examples',
    to: '/tutorials/generic-oauth2-connection-examples'
  },
  {
    from: '/tutorials/setup-up-authentication',
    to: '/multifactor-authentication/step-up-authentication'
  },
  {
    from: ['/refresh-token', '/tokens/refresh_token', '/tokens/refresh-token'],
    to: '/tokens/concepts/refresh-tokens'
  },
  {
    from: '/update-client-secret',
    to: '/dashboard/guides/applications/rotate-client-secret'
  },
  {
    from: '/test-partner-connection',
    to: '/tutorials/how-to-test-partner-connection'
  },
  {
    from: '/bulk-import',
    to: '/tutorials/bulk-importing-users-into-auth0'
  },
  {
    from: '/creating-users',
    to: '/tutorials/creating-users-in-the-management-portal'
  },
  {
    from: ['/custom-signup', '/libraries/lock/v10/custom-signup', '/libraries/lock/v11/custom-signup'],
    to: '/libraries/custom-signup'
  },
  {
    from: '/google-admin-sdk',
    to: '/tutorials/configuration-to-query-users-from-google-apps'
  },
  {
    from: '/invite-only',
    to: '/tutorials/creating-invite-only-applications'
  },
  {
    from: '/saas-apps',
    to: '/tutorials/using-auth0-with-multi-tenant-apps'
  },
  {
    from: '/sla',
    to: '/support/sla'
  },
  {
    from: '/versioning',
    to: '/tutorials/how-auth0-versions-software'
  },
  {
    from: '/oidc-rs256-owin',
    to: '/tutorials/openid-connect-discovery'
  },
  {
    from: '/cli',
    to: '/tutorials/using-auth0-to-secure-a-cli'
  },
  {
    from: '/tutorials/using-auth0-to-secure-an-api',
    to: '/tutorials/using-auth0-to-secure-a-cli'
  },
  {
    from: '/apps-apis',
    to: '/tutorials/web-apps-vs-web-apis-cookies-vs-tokens'
  },
  {
    from: ['/har', '/tutorials/troubleshooting-with-har-files', '/troubleshoot/har', '/support/troubleshooting-with-har-files'],
    to: '/troubleshoot/guides/generate-har-files'
  },
  {
    from: '/hrd',
    to: '/libraries/lock/v11/selecting-the-connection-for-multiple-logins'
  },
  {
    from: ['/blacklist-attributes', '/security/blacklist-user-attributes'],
    to: '/security/blacklisting-attributes'
  },
  {
    from: '/office365-deprecated',
    to: '/tutorials/office365-connection-deprecation-guide'
  },
  {
    from: '/sequence-diagrams',
    to: '/architecture-scenarios/application/spa-api'
  },
  {
    from: '/architecture-scenarios/sequence-diagrams',
    'to:': '/architecture-scenarios/application/spa-api'
  },
  {
    from: '/deployment',
    to: '/overview/deployment-models'
  },
  {
    from: '/overview',
    to: '/getting-started/overview'
  },
  {
    from: '/overview/apis',
    to: '/api-auth/apis'
  },
  {
    from: '/overview/deployment-models',
    to: '/getting-started/deployment-models'
  },
  {
    from: '/java-overview',
    to: '/dev-centers/java'
  },
  {
    from: ['/oauth-web-protocol', '/protocols/oauth-web-protocol', '/protocols/oauth2/oauth-web-protocol'],
    to: '/application-auth/current/server-side-web'
  },
  {
    from: ['/application-auth/current/server-side-web'],
    to: '/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow'
  },
  {
    from: ['/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow'],
    to: '/flows/guides/auth-code/add-login-auth-code'
  },
  {
    from: ['/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow'],
    to: '/flows/guides/auth-code/call-api-auth-code'
  },
  {
    from: ['/application-auth/current/client-side-web'],
    to: '/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow'
  },
  {
    from: ['/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow'],
    to: '/flows/guides/implicit/add-login-implicit'
  },
  {
    from: ['/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow'],
    to: '/flows/guides/implicit/call-api-implicit'
  },
  {
    from: ['/application-auth/current/mobile-desktop'],
    to: '/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow'
  },
  {
    from: ['/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow'],
    to: '/flows/guides/auth-code-pkce/add-login-auth-code-pkce'
  },
  {
    from: ['/flows/guides/mobile-login-flow/call-api-using-mobile-login-flow'],
    to: '/flows/guides/auth-code-pkce/call-api-auth-code-pkce'
  },
  {
    from: ['/flows/guides/m2m-flow/call-api-using-m2m-flow'],
    to: '/flows/guides/client-credentials/call-api-client-credentials'
  },
  {
    from: ['/api-auth/grant/authorization-code-pkce'],
    to: '/flows/concepts/mobile-login-flow'
  },
    {
    from: ['/flows/concepts/mobile-login-flow'],
    to: '/flows/concepts/auth-code-pkce'
  },
    {
    from: ['/api-auth/grant/implicit'],
    to: '/flows/concepts/single-page-login-flow'
  },
  {
    from: ['/flows/concepts/single-page-login-flow'],
    to: '/flows/concepts/implicit'
  },
  {
    from: ['/api-auth/grant/authorization-code'],
    to: '/flows/concepts/regular-web-app-login-flow'
  },
  {
    from: ['/flows/concepts/regular-web-app-login-flow'],
    to: '/flows/concepts/auth-code'
  },
    {
    from: ['/api-auth/grant/client-credentials'],
    to: '/flows/concepts/m2m-flow'
  },
  {
    from: ['/flows/concepts/m2m-flow'],
    to: '/flows/concepts/client-credentials'
  },
  {
    from: ['/api-auth/restrict-requests-for-scopes'],
    to: '/api-auth/restrict-access-api'
  },
  {
    from: '/oauth-implicit-protocol',
    to: '/protocols/oauth2/oauth-implicit-protocol'
  },
  {
    from: '/protocols/oauth-state',
    to: '/protocols/oauth2/oauth-state'
  },
  {
    from: '/metadata/apiv2',
    to: '/metadata/management-api'
  },
  {
    from: '/saml-apps',
    to: '/protocols/saml/saml-apps'
  },
  {
    from: '/saml-configuration',
    to: '/protocols/saml/saml-configuration'
  },
  {
    from: '/saml-idp-generic',
    to: '/protocols/saml/saml-idp-generic'
  },
  {
    from: '/saml-sp-generic',
    to: '/protocols/saml/saml-sp-generic'
  },
  {
    from: '/saml2webapp-tutorial',
    to: '/protocols/saml/saml2webapp-tutorial'
  },
  {
    from: '/samlp-providers',
    to: '/protocols/saml/samlp-providers'
  },
  {
    from: '/samlp',
    to: '/protocols/saml/samlp'
  },
  {
    from: '/samlsso-auth0-to-auth0',
    to: '/protocols/saml/samlsso-auth0-to-auth0'
  },
  {
    from: '/saml/identity-providers/salesforce',
    to: '/protocols/saml/identity-providers/salesforce'
  },
  {
    from: '/saml-apps/cisco-webex',
    to: '/protocols/saml/saml-apps/cisco-webex'
  },
  {
    from: '/saml-apps/datadog',
    to: '/protocols/saml/saml-apps/datadog'
  },
  {
    from: '/saml-apps/freshdesk',
    to: '/protocols/saml/saml-apps/freshdesk'
  },
  {
    from: '/saml-apps/heroku-sso',
    to: '/protocols/saml/saml-apps/heroku'
  },
  {
    from: '/saml-apps/litmos',
    to: '/protocols/saml/saml-apps/litmos'
  },
  {
    from: '/saml-apps/sprout-video',
    to: '/protocols/saml/saml-apps/sprout-video'
  },
  {
    from: '/onboarding/appliance-outage',
    to: '/onboarding/enterprise-support'
  },
  {
    from: '/appliance/dashboard/instrumentation',
    to: '/appliance/instrumentation'
  },
  {
    from: '/tutorials/local-testing-and-development',
    to: '/dev-lifecycle/local-testing-and-development'
  },
  {
    from: '/tutorials/development-lifecycle-with-auth0',
    to: '/dev-lifecycle/setting-up-env'
  },
  {
    from: ['/tokens/id_token', '/tokens/id-token'],
    to: '/tokens/concepts/id-tokens'
  },
  {
    from: '/tokens/add-custom-claims',
    to: '/scopes/current/sample-use-cases#add-custom-claims-to-a-token'
  },
  {
    from: '/tokens/guides/update-signing-algorithm-application',
    to: '/dashboard/guides/applications/update-signing-algorithm'
  },
  {
    from: ['/scopes/current/custom-claims', '/tokens/jwt-claims#custom-claims'],
    to: '/tokens/concepts/jwt-claims'
  },
  {
    from: ['/tokens/guides/jwt/verify-jwt-signature-using-jwks', '/tokens/guides/jwt/use-jwks'],
    to: '/tokens/guides/locate-jwks'
  },
  {
    from: ['/tokens/guides/jwt/parse-validate-jwt-programmatically', '/tokens/guides/jwt/validate-jwt'],
    to: '/tokens/guides/validate-jwts'
  },
  {
    from: '/tokens/concepts/claims-namespacing',
    to: '/tokens/guides/create-namespaced-custom-claims'
  },
  {
    from: ['/tokens/concepts/why-use-jwt', '/tokens/jwt'],
    to: '/tokens/concepts/jwts'
  },
  {
    from: '/tokens/guides/id-token/get-id-tokens',
    to: '/tokens/guides/get-id-tokens'
  },
  {
    from: '/tokens/guides/id-token/validate-id-token',
    to: '/tokens/guides/validate-id-tokens'
  },
  {
    from: '/tokens/reference/jwt/jwks-properties',
    to: '/tokens/references/jwks-properties'
  },
  {
    from: '/tokens/reference/jwt/jwt-structure',
    to: '/tokens/references/jwt-structure'
  },
  {
    from: '/tokens/delegation',
    to: '/tokens/concepts/delegation-tokens'
  },
  {
    from: ['/tokens/jwks', '/jwks'],
    to: '/tokens/concepts/jwks'
  },
  {
    from: '/tokens/jwt-claims',
    to: '/tokens/concepts/jwt-claims'
  },
  {
    from: '/tokens/overview-idp-access-tokens',
    to: '/tokens/concepts/idp-access-tokens'
  },
  {
    from: '/connections',
    to: '/identityproviders'
  },
  {
    from: '/libraries/lock-android/error-messages',
    to: '/libraries/error-messages'
  },
  {
    from: '/api-auth/grant/using-rules',
    to: '/api-auth/tutorials/client-credentials/customize-with-hooks'
  },
  {
    from: '/libraries/lock-ios/delegation-api',
    to: '/libraries/lock-ios/v1/delegation-api'
  },
  {
    from: '/libraries/lock-ios/lock-ios-api',
    to: '/libraries/lock-ios/v1/lock-ios-api'
  },
  {
    from: '/libraries/lock-ios/logging',
    to: '/libraries/lock-ios/v1/logging'
  },
  {
    from: '/libraries/lock-ios/native-social-authentication',
    to: '/libraries/lock-ios/v1/native-social-authentication'
  },
  {
    from: '/libraries/lock-ios/password-reset-ios',
    to: '/libraries/lock-ios/v1/password-reset-ios'
  },
  {
    from: '/libraries/lock-ios/save-and-refresh-jwt-tokens',
    to: '/libraries/lock-ios/v1/save-and-refresh-jwt-tokens'
  },
  {
    from: '/libraries/lock-ios/sending-authentication-parameters',
    to: '/libraries/lock-ios/v1/sending-authentication-parameters'
  },
  {
    from: '/libraries/lock-ios/sms-lock-ios',
    to: '/libraries/lock-ios/v1/sms-lock-ios'
  },
  {
    from: '/libraries/lock-ios/swift',
    to: '/libraries/lock-ios/v1/swift'
  },
  {
    from: '/libraries/lock-ios/touchid-authentication',
    to: '/libraries/lock-ios/v1/touchid-authentication'
  },
  {
    from: '/libraries/lock-ios/use-your-own-ui',
    to: '/libraries/lock-ios/v1/use-your-own-uis'
  },
  {
    from: '/api-auth/config/asking-for-access-tokens',
    to: '/api-auth/tutorials/client-credentials'
  },
  {
    from: '/protocols/oauth2/oauth-implicit-protocol',
    to: '/api-auth/tutorials/implicit-grant'
  },
  {
    from: '/quickstart/native/ios',
    to: '/quickstart/native/ios-swift'
  },
  {
    from: '/rules/metadata-in-rules',
    to: '/rules/current/metadata-in-rules'
  },
  {
    from: '/quickstart/native/ionic/00-intro',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/02-custom-login',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/03-user-profile',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/04-linking-accounts',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/05-rules',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/06-authorization',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/08-mfa',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/native/ionic/09-customizing-lock',
    to: '/quickstart/native/ionic'
  },
  {
    from: '/quickstart/backend/nodejs/00-getting-started',
    to: '/quickstart/backend/nodejs'
  },
  {
    from: '/quickstart/backend/aspnet-core-webapi/00-getting-started',
    to: '/quickstart/backend/aspnet-core-webapi'
  },
  {
    from: '/quickstart/backend/falcor/00-getting-started',
    to: '/quickstart/backend/falcor'
  },
  {
    from: '/quickstart/backend/golang/00-getting-started',
    to: '/quickstart/backend/golang'
  },
  {
    from: '/quickstart/backend/hapi/00-getting-started',
    to: '/quickstart/backend/hapi'
  },
  {
    from: '/quickstart/backend/java-spring-security/00-getting-started',
    to: '/quickstart/backend/java-spring-security'
  },
  {
    from: '/quickstart/backend/laravel/00-getting-started',
    to: '/quickstart/backend/laravel'
  },
  {
    from: '/quickstart/backend/php/00-getting-started',
    to: '/quickstart/backend/php'
  },
  {
    from: '/quickstart/backend/python/00-getting-started',
    to: '/quickstart/backend/python'
  },
  {
    from: '/quickstart/backend/rails/00-getting-started',
    to: '/quickstart/backend/rails'
  },
  {
    from: '/quickstart/backend/ruby/00-getting-started',
    to: '/quickstart/backend/ruby'
  },
  {
    from: '/quickstart/backend/symfony/00-getting-started',
    to: '/quickstart/backend/symfony'
  },
  {
    from: '/quickstart/backend/webapi-owin/00-getting-started',
    to: '/quickstart/backend/webapi-owin'
  },
  {
    from: '/quickstart/webapp/rails/00-introduction',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/02-custom-login',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/03-session-handling',
    to: '/quickstart/webapp/rails/02-session-handling'
  },
  {
    from: '/quickstart/webapp/rails/04-user-profile',
    to: '/quickstart/webapp/rails/03-user-profile'
  },
  {
    from: '/quickstart/webapp/rails/05-linking-accounts',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/06-rules',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/07-authorization',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/08-mfa',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/rails/09-customizing-lock',
    to: '/quickstart/webapp/rails'
  },
  {
    from: '/quickstart/webapp/java/getting-started',
    to: '/quickstart/webapp/java'
  },
  {
    from: '/quickstart/webapp/java-spring-mvc/getting-started',
    to: '/quickstart/webapp/java-spring-mvc'
  },
  {
    from: '/quickstart/webapp/java-spring-security-mvc/00-intro',
    to: '/quickstart/webapp/java-spring-security-mvc'
  },
  {
    from: '/tutorials/step-up-authentication',
    to: '/multifactor-authentication/step-up-authentication'
  },
  {
    from: '/multifactor-authentication/developer/step-up-authentication',
    to: '/multifactor-authentication/step-up-authentication'
  },
  {
    from: '/multifactor-authentication/developer/step-up-authentication/step-up-for-apis',
    to: '/multifactor-authentication/step-up-authentication/step-up-for-apis'
  },
  {
    from: '/multifactor-authentication/developer/step-up-authentication/step-up-for-web-apps',
    to: '/multifactor-authentication/step-up-authentication/step-up-for-web-apps'
  },
  {
    from: '/quickstart/spa/angular2/00-login',
    to: '/quickstart/spa/angular2'
  },
  {
    from: '/quickstart/spa/angular2/03-user-profile',
    to: '/quickstart/spa/angular2/02-user-profile'
  },
  {
    from: '/quickstart/spa/angular2/04-calling-an-api',
    to: '/quickstart/spa/angular2/03-calling-an-api'
  },
  {
    from: '/quickstart/spa/angular2/05-authorization',
    to: '/quickstart/spa/angular2/04-authorization'
  },
  {
    from: '/quickstart/spa/angular2/06-token-renewal',
    to: '/quickstart/spa/angular2/05-token-renewal'
  },
  {
    from: '/security/token-exp',
    to: '/tokens'
  },
  {
    from: ['/hosted-pages/hosted-login-auth0js', '/hosted-pages/login/auth0js', '/hosted-pages/login/lock', '/hosted-pages/login/lock-passwordless', '/hosted-pages/hosted-login-auth0js', '/hosted-pages/hosted-login-auth0js/v7', '/hosted-pages/hosted-login-auth0js/v8', '/hosted-pages/login', '/hosted-pages'],
    to: '/universal-login'
  },
  {
    from: ['/error-pages', '/error-pages/generic', '/hosted-pages/error-pages'],
    to: '/universal-login/error-pages'
  },
  {
    from: ['/error-pages/custom', '/hosted-pages/custom-error-pages'],
    to: '/universal-login/custom-error-pages'
  },
  {
    from: '/hosted-pages/default-login-url',
    to: '/universal-login/default-login-url'
  },
  {
    from: '/hosted-pages/version-control',
    to: '/universal-login/version-control'
  },
  {
    from: '/hosted-pages/guardian',
    to: '/universal-login/multifactor-authentication'
  },
  {
    from: '/universal-login/guardian',
    to: '/universal-login/multifactor-authentication'
  },
  {
    from: '/hosted-pages/password-reset',
    to: '/universal-login/password-reset'
  },
  {
    from: '/connections/database/mysql',
    to: '/connections/database/custom-db'
  },
  {
    from: '/dashboard-account-settings',
    to: '/dashboard-tenant-settings'
  },
  // {
  //   from: '/metadata/lock',
  //   to: '/metadata#using-lock-to-manage-metadata'
  // },
  {
    from: ['/libraries/lock/v11/customization'],
    to: '/libraries/lock/v11/configuration',
  },
  {
    from: '/tutorials/azure-tutorial',
    to: '/integrations/azure-tutorial',
  },
  {
    from: '/tutorials/blacklisting-attributes',
    to: '/security/blacklisting-attributes',
  },
  {
    from: '/tutorials/integrating-with-slack',
    to: '/integrations/integrating-with-slack',
  },
  {
    from: '/tutorials/browser-based-vs-native-experience-on-mobile',
    to: '/design/browser-based-vs-native-experience-on-mobile',
  },
  {
    from: '/tutorials/using-auth0-with-multi-tenant-apps',
    to: '/design/using-auth0-with-multi-tenant-apps',
  },
  {
    from: '/tutorials/adding-generic-oauth1-connection',
    to: '/connections/adding-generic-oauth1-connection',
  },
  {
    from: '/tutorials/adding-scopes-for-an-external-idp',
    to: '/connections/adding-scopes-for-an-external-idp',
  },
  {
    from: '/tutorials/generic-oauth2-connection-examples',
    to: '/connections/generic-oauth2-connection-examples',
  },
  {
    from: '/tutorials/calling-an-external-idp-api',
    to: '/connections/calling-an-external-idp-api',
  },
  {
    from: '/tutorials/tracking-new-leads-in-salesforce-and-raplead',
    to: '/monitoring/guides/track-leads-salesforce',
  },
  {
    from: '/tutorials/track-signups-enrich-user-profile-generate-leads',
    to: '/monitoring/guides/track-signups-salesforce',
  },
  {
    from: '/tutorials/how-to-monitor-auth0',
    to: '/monitoring',
  },
  {
    from: '/tutorials/sending-events-to-splunk',
    to: '/monitoring/guides/send-events-to-splunk',
  },
  {
    from: '/tutorials/sending-events-to-segmentio',
    to: '/monitoring/guides/send-events-to-segmentio',
  },
  {
    from: '/tutorials/sending-events-to-keenio',
    to: '/monitoring/guides/send-events-to-keenio',
  },
  {
    from: '/tutorials/cancel-paid-subscriptions',
    to: '/support/cancel-paid-subscriptions',
  },
  {
    from: '/tutorials/reset-account-password',
    to: '/support/reset-account-password',
  },
  {
    from: '/tutorials/delete-reset-tenant',
    to: '/support/delete-reset-tenant',
  },
  {
    from: '/tutorials/how-to-test-partner-connection',
    to: '/connections/how-to-test-partner-connection',
  },
  {
    from: '/tutorials/how-auth0-versions-software',
    to: '/support/how-auth0-versions-software',
  },
  {
    from: '/tutorials/authenticating-a-tessel-device',
    to: '/integrations/authenticating-a-tessel-device',
  },
  {
    from: '/tutorials/authenticating-devices-using-mqtt',
    to: '/integrations/authenticating-devices-using-mqtt',
  },
  {
    from: '/tutorials/creating-users-in-the-management-portal',
    to: '/users/guides/create-users',
  },
  {
    from: '/tutorials/dashboard-tenant-settings',
    to: '/dashboard/dashboard-tenant-settings',
  },
  {
    from: '/dashboard/dashboard-tenant-settings',
    to: '/dashboard/reference/settings-tenant',  
  },
  {
    from: '/tutorials/manage-dashboard-admins',
    to: '/dashboard/manage-dashboard-admins',
  },
  {
    from: '/tutorials/web-apps-vs-web-apis-cookies-vs-tokens',
    to: '/design/web-apps-vs-web-apis-cookies-vs-tokens',
  },
  {
    from: '/tutorials/how-to-update-applications-client-secret',
    to: '/dashboard/guides/applications/rotate-client-secret',
  },
  {
    from: '/tutorials/using-auth0-to-secure-a-cli',
    to: '/integrations/using-auth0-to-secure-a-cli',
  },
  {
    from: '/tutorials/creating-invite-only-applications',
    to: '/design/creating-invite-only-applications',
  },
  {
    from: '/tutorials/google-cloud-platform',
    to: '/integrations/google-cloud-platform',
  },
  {
    from: '/tutorials/configuration-to-query-users-from-google-apps',
    to: '/integrations/configuration-to-query-users-from-google-apps',
  },
  {
    from: '/tutorials/integrating-auth0-amazon-cognito-mobile-apps',
    to: '/integrations/integrating-auth0-amazon-cognito-mobile-apps',
  },
  {
    from: '/tutorials/office365-connection-deprecation-guide',
    to: '/integrations/office365-connection-deprecation-guide',
  },
  {
    from: '/tutorials/redirecting-users',
    to: '/users/guides/redirect-users-after-login',
  },
  {
    from: '/tutorials/get-user-information-with-unbounce-landing-pages',
    to: '/users/guides/get-user-information-with-unbounce-landing-pages',
  },
  {
    from: ['/tutorials/bulk-importing-users-into-auth0', '/users/migrations/bulk-import', '/users/guides/bulk-user-import'],
    to: '/users/guides/bulk-user-imports',
  },
  {
    from: '/tutorials/using-auth0-as-an-identity-provider-with-github-enterprise',
    to: '/integrations/using-auth0-as-an-identity-provider-with-github-enterprise',
  },
  {
    from: '/tutorials/configure-wsfed-application',
    to: '/integrations/configure-wsfed-application',
  },
  {
    from: '/tutorials/openid-connect-discovery',
    to: '/protocols/oidc/openid-connect-discovery',
  },
  {
    from: '/tutorials/removing-auth0-exporting-data',
    to: '/support/removing-auth0-exporting-data',
  },
  {
    from: '/tutorials',
    to: '/',
  },
  {
    from: '/sso/current/single-page-apps-sso',
    to: '/sso/current/single-page-apps'
  },
  {
    from: '/sso/current/introduction',
    to: '/sso/current/sso-auth0'
  },
  {
    from: '/sso/legacy/single-page-apps-sso',
    to: '/sso/legacy/single-page-apps'
  },
  {
    from: '/integrations/slack',
    to: '/sso/current/integrations/slack'
  },
  {
    from: '/integrations/integrating-with-slack',
    to: '/sso/current/integrations/slack'
  },
  {
    from: '/integrations/ad-rms',
    to: '/sso/current/integrations/ad-rms'
  },
  {
    from: '/integrations/box',
    to: '/sso/current/integrations/box'
  },
  {
    from: '/integrations/cloudbees',
    to: '/sso/current/integrations/cloudbees'
  },
  {
    from: '/integrations/concur',
    to: '/sso/current/integrations/concur'
  },
  {
    from: '/integrations/disqus',
    to: '/sso/current/integrations/disqus'
  },
  {
    from: '/integrations/dropbox',
    to: '/sso/current/integrations/dropbox'
  },
  {
    from: '/integrations/dynamic-crm',
    to: '/sso/current/integrations/dynamics-crm'
  },
  {
    from: '/integrations/echosign',
    to: '/sso/current/integrations/echosign'
  },
  {
    from: '/integrations/egnyte',
    to: '/sso/current/integrations/egnyte'
  },
  {
    from: '/integrations/new-relic',
    to: '/sso/current/integrations/new-relic'
  },
  {
    from: '/integrations/salesforce',
    to: '/sso/current/integrations/salesforce'
  },
  {
    from: '/integrations/springcm',
    to: '/sso/current/integrations/springcm'
  },
  {
    from: '/integrations/zendesk',
    to: '/sso/current/integrations/zendesk'
  },
  {
    from: '/integrations/zoom',
    to: '/sso/current/integrations/zoom'
  },
  {
    from: '/analytics/integrations',
    to: '/analytics',
  },
  {
    from: '/analytics/integrations/facebook-analytics',
    to: '/analytics/guides/facebook-analytics',
  },
  {
    from: '/analytics/integrations/google-analytics',
    to: '/analytics/guides/google-analytics',
  },
  {
    from: '/clients/how-to-update-client-secret',
    to: '/dashboard/guides/applications/rotate-client-secret',
  },
  {
    from: '/i18n/i18n-custom-login-page',
    to: '/i18n'
  },
  {
    from: ['/users/bulk-importing-users-into-auth0', '/users/migrations/bulk-import'],
    to: '/users/guides/bulk-user-imports'
  },
  {
    from: ['/connections/database/migrating', '/users/migrations/automatic'],
    to: '/users/guides/configure-automatic-migration'
  },
  {
    from: ['/connections/database/migrating-okta', '/users/migrations/okta'],
    to: '/users/references/user-migration-scenarios'
  },
  {
    from: `/metadata/management-api`,
    to: `/metadata/apis`
  },
  {
    from: `/connections/grean/bankid-no`,
    to: `/connections/criipto/bankid-no`
  },
  {
    from: `/connections/grean/bankid-se`,
    to: `/connections/criipto/bankid-se`
  },
  {
    from: `/connections/grean/nemid`,
    to: `/connections/criipto/nemid`
  },
  {
    from: '/sso/current/integrations',
    to: '/integrations/sso'
  },
  {
    from: '/sso/current/integrations/ad-rms',
    to: '/integrations/sso/ad-rms'
  },
  {
    from: '/sso/current/integrations/box',
    to: '/integrations/sso/box'
  },
  {
    from: '/sso/current/integrations/cloudbees',
    to: '/integrations/sso/cloudbees'
  },
  {
    from: '/sso/current/integrations/concur',
    to: '/integrations/sso/concur'
  },
  {
    from: '/sso/current/integrations/disqus',
    to: '/integrations/sso/disqus'
  },
  {
    from: '/sso/current/integrations/dropbox',
    to: '/integrations/sso/dropbox'
  },
  {
    from: '/sso/current/integrations/dynamics-crm',
    to: '/integrations/sso/dynamics-crm'
  },
  {
    from: '/sso/current/integrations/echosign',
    to: '/integrations/sso/echosign'
  },
  {
    from: '/sso/current/integrations/egnyte',
    to: '/integrations/sso/egnyte'
  },
  {
    from: '/sso/current/integrations/new-relic',
    to: '/integrations/sso/new-relic'
  },
  {
    from: '/sso/current/integrations/office-365',
    to: '/integrations/sso/office-365'
  },
  {
    from: '/sso/current/integrations/salesforce',
    to: '/integrations/sso/salesforce'
  },
  {
    from: '/sso/current/integrations/slack',
    to: '/integrations/sso/slack'
  },
  {
    from: '/sso/current/integrations/springcm',
    to: '/integrations/sso/springcm'
  },
  {
    from: '/sso/current/integrations/zendesk',
    to: '/integrations/sso/zendesk'
  },
  {
    from: '/sso/current/integrations/zoom',
    to: '/integrations/sso/zoom'
  },
  {
    from: '/guides/login/centralized-vs-embedded',
    to: '/guides/login/universal-vs-embedded'
  },
  {
    from: '/guides/login/migration-embedded-centralized',
    to: '/guides/login/migration-embedded-universal'
  },
  {
    from: '/api/management/v2/user-search',
    to: '/users/search/v2'
  },
  {
    from: '/api/management/v2/query-string-syntax',
    to: '/users/search/v2/query-syntax'
  },
  {
    from: '/api-auth/dynamic-application-registration',
    to: '/api-auth/dynamic-client-registration'
  },
  {
    from: '/videos/rules',
    to: '/rules/current#video-using-rules'
  },
  {
    from: `/guides/login/migration-embedded-centralized`,
    to: `/guides/login/migration-embedded-universal`
  },
  {
    from: [`/link-accounts/auth-api`, `/link-accounts`],
    to: `/users/concepts/overview-user-account-linking`
  },
  {
    from: ['/videos/session-and-cookies', '/security/store-tokens', '/tokens/guides/store-tokens'],
    to: '/tokens/concepts/token-storage'
  },
  {
    from: '/support/sla',
    to: '/support/sld'
  },
  {
    from: '/architecture-scenarios/application/mobile-api',
    to: '/architecture-scenarios/mobile-api'
  },
  {
    from: '/architecture-scenarios/application/server-api',
    to: '/architecture-scenarios/server-api'
  },
  {
    from: '/architecture-scenarios/application/spa-api',
    to: '/architecture-scenarios/spa-api'
  },
  {
    from: '/architecture-scenarios/application/web-app-sso',
    to: '/architecture-scenarios/web-app-sso'
  },
  {
    from: '/architecture-scenarios/application/web-saml',
    to: '/architecture-scenarios/web-saml'
  },
  {
    from: '/architecture-scenarios/business/b2b-b2e',
    to: '/architecture-scenarios/b2b-b2e'
  },
  {
    from: '/architecture-scenarios/business/b2b',
    to: '/architecture-scenarios/b2b'
  },
  {
    from: '/architecture-scenarios/business/b2c',
    to: '/architecture-scenarios/b2c'
  },
  {
    from: '/architecture-scenarios/business/b2e',
    to: '/architecture-scenarios/b2e'
  },
  {
    from: '/architecture-scenarios/application/mobile-api/api-implementation-nodejs',
    to: '/architecture-scenarios/mobile-api/api-implementation-nodejs'
  },
  {
    from: '/architecture-scenarios/application/mobile-api/mobile-implementation-android',
    to: '/architecture-scenarios/mobile-api/mobile-implementation-android'
  },
  {
    from: '/architecture-scenarios/application/server-api/api-implementation-nodejs',
    to: '/architecture-scenarios/server-api/api-implementation-nodejs'
  },
  {
    from: '/architecture-scenarios/application/server-api/cron-implementation-python',
    to: '/architecture-scenarios/server-api/cron-implementation-python'
  },
  {
    from: '/architecture-scenarios/application/spa-api/spa-implementation-angular2',
    to: '/architecture-scenarios/spa-api/spa-implementation-angular2'
  },
  {
    from: '/architecture-scenarios/application/spa-api/api-implementation-nodejs',
    to: '/architecture-scenarios/spa-api/api-implementation-nodejs'
  },
  {
    from: '/architecture-scenarios/application/web-app-sso/implementation-aspnetcore',
    to: '/architecture-scenarios/web-app-sso/implementation-aspnetcore'
  },
  {
     from: '/applications/application-settings/non-interactive',
     to: '/applications/machine-to-machine#settings'
   },
   {
     from: '/applications/application-settings/machine-to-machine',
     to: '/applications/machine-to-machine#settings'
   },
   {
     from: '/applications/application-settings/native',
     to: '/applications/native#settings'
   },
   {
     from: '/applications/application-settings/regular-web-app',
     to: '/applications/webapps#settings'
   },
   {
     from: '/applications/application-settings/single-page-app',
     to: '/applications/spa#settings'
   },
   {
     from: '/protocols/saml/saml-configuration/selecting-between-multiple-idp',
     to: '/hrd'
   },
   {
     from: ['/tokens/overview-access-tokens','/tokens/access-token','/tokens/access_token', '/tokens/access-tokens'],
     to: '/tokens/concepts/access-tokens'
   },
   {
    from: ['/tokens/overview-id-tokens','/tokens/id-token', '/tokens/id-tokens'],
    to: '/tokens/concepts/id-tokens'
  },
   {
     from: ['/api-auth/tutorials/verify-access-token', '/tokens/guides/access-token/validate-access-token'],
     to: '/tokens/guides/validate-access-tokens'
   },
   {
     from: '/user-profile',
     to: '/users/concepts/overview-user-profile'
   },
  //  {
  //    from: '/user-profile#block-and-unblock-a-user',
  //    to: '/users/guides/block-and-unblock-users'
  //  },
   {
     from: '/user-profile/user-picture',
     to: '/users/guides/change-user-pictures'
   },
  //  {
  //    from: '/user-profile#create-a-user',
  //    to: '/users/guides/create-users'
  //  },
  //  {
  //    from: '/user-profile#delete-a-user',
  //    to: '/users/guides/delete-users'
  //  },
  //  {
  //    from: '/user-profile#user-access-to-applications',
  //    to: '/users/guides/manage-user-access-to-applications'
  //  },
  //  {
  //    from: '/user-profile#manage-users-using-the-dashboard',
  //    to: '/users/guides/manage-users-using-the-dashboard'
  //  },
  //  {
  //    from: '/user-profile#manage-users-using-the-management-api',
  //    to: '/users/guides/manage-users-using-the-management-api'
  //  },
   {
     from: '/user-profile/progressive-profiling',
     to: '/users/concepts/overview-progressive-profiling'
   },
   {
     from: '/user-profile/customdb.md',
     to: '/users/guides/update-user-profiles-using-your-database'
   },
  //  {
  //    from: '/user-profile#view-users',
  //    to: '/users/guides/view-users'
  //  },
   {
     from: '/user-profile/normalized/auth0',
     to: '/users/normalized/auth0'
   },
   {
     from: '/user-profile/normalized/oidc',
     to: '/users/normalized/oidc'
   },
   {
     from: '/users/search/best-practices',
     to: '/best-practices/search-best-practices'
   },
   {
     from: '/users/user-data-storage',
     to: '/best-practices/user-data-storage-best-practices'
   },
   {
     from: '/user-profile/user-profile-structure',
     to: '/users/references/user-profile-structure'
   },
   {
     from: '/metadata',
     to: '/users/concepts/overview-user-metadata'
   },
   {
     from: '/metadata/apis',
     to: '/users/guides/manage-user-metadata'
   },
   {
     from: '/metadata/lock',
     to: '/users/guides/manage-user-metadata'
   },
   {
     from: '/hooks/cli/edit',
     to: '/hooks/update'
   },
   {
     from: '/hooks/cli/enable-disable',
      to: '/hooks/enable-disable'
   },
   {
     from: '/hooks/cli/logs',
     to: '/hooks/view-logs'
   },
   {
     from: '/hooks/cli',
     to: '/hooks'
   },
   {
     from: ['/multifactor-authentication/yubikey', '/multifactor-authentication/guardian', '/multifactor-authentication/guardian/user-guide'],
     to: '/mfa'
   },
   {
     from: '/hooks/dashboard/create-delete',
     to: '/hooks/create'
   },
   {
     from: ['/libraries/lock/v10/auth0js', '/libraries/lock/v11/auth0js'],
     to: '/libraries/auth0js'
   },
  //  {
  //    from: '/metadata/lock',
  //    to: '/users/guides/manage-user-metadata'
  //  }
  { from: '/rules/current', to: '/rules' },
  { from: '/rules/legacy', to: '/rules/references/legacy' },
  { from: '/rules/current/context', to: '/rules/references/context-object' },
  { from: '/rules/context', to: '/rules/references/context-object' },
  { from: '/rules/current/redirect', to: '/rules/guides/redirect' },
  { from: '/rules/current/metadata-in-rules', to: '/rules/guides/metadata' },
  { from: '/rules/current/csharp', to: '/rules' },
  { from: '/rules/guides/csharp', to: '/rules' },
  { from: '/rules/current/management-api', to: '/rules/guides/management-api' },
  {
    from: '/hooks/cli/create-delete',
    to: '/hooks/create'
   },
   {
    from: '/hooks/cli/edit',
    to: '/hooks/update'
   },
   {
    from: '/hooks/cli/enable-disable',
    to: '/hooks/enable-disable'
   },
   {
    from: '/hooks/cli/index',
    to: '/hooks'
   },
   {
    from: '/hooks/cli/logs',
    to: '/hooks/view-logs'
   },
   {
    from: '/hooks/dashboard/create-delete',
    to: '/hooks/create'
   },
   {
    from: '/hooks/dashboard/edit',
    to: '/hooks/update'
   },
   {
    from: '/hooks/dashboard/enable-disable',
    to: '/hooks/enable-disable'
   },
   {
    from: '/hooks/dashboard/index',
    to: '/hooks'
   },
   {
    from: '/hooks/overview',
    to: '/hooks'
   },
   {
     from: '/users/redirecting-users',
     to: '/users/guides/redirect-users-after-login'
   },
   {
     from: '/applications/spa',
     to: '/dashboard/guides/applications/register-app-spa'
   },
   {
    from: [
      '/libraries/lock/v9/customization',
      '/libraries/lock/v9/configuration',
      '/libraries/lock/v10/customization',
      '/libraries/lock/v10/configuration'
    ],
    to: '/libraries/lock/v11/configuration'
    },
    {
      from: [
        '/libraries/lock/v10/popup-mode',
        '/libraries/lock/v10/authentication-modes',
        '/libraries/lock/v11/popup-mode'
      ],
      to: '/libraries/lock/v11/authentication-modes'
    },
    {
      from: [
        '/libraries/lock/v9',
        '/libraries/lock/v9/display-modes',
        '/libraries/lock/v9/types-of-applications',
        '/libraries/lock/v10'
      ],
      to: '/libraries/lock/v11'
    },
    {
      from: [
        '/libraries/auth0js/v7',
        '/libraries/auth0js/v8'
      ],
      to: '/libraries/auth0js/v9'
    },
    {
     from: '/rules/redirect',
     to: '/rules/guides/redirect'
    },
    {
      from: '/integrations/using-auth0-as-an-identity-provider-with-github-enterprise',
      to: '/protocols/saml/saml-apps/github-server'
    },
    {
      from: ['/tokens/get-access-tokens', '/tokens/guides/access-token/get-access-tokens'],
      to: '/tokens/guides/get-access-tokens'
    },
    {
      from: ['/tokens/use-access-tokens', '/tokens/guides/access-token/use-access-tokens'],
      to: '/tokens/guides/use-access-tokens'
    },
    {
      from: '/services/private-saas-configuration',
      to: '/services/private-cloud-configuration'
    },
    {
      from: '/services/private-saas-management',
      to: '/services/private-cloud-management'
    },
    {
      from: '/api-auth/intro',
      to: '/api-auth/tutorials/adoption'
    },
    {
      from: '/authorization/guides/dashboard/enable-rbac',
      to: '/dashboard/guides/apis/enable-rbac'
    },
    {
      from: '/users/references/user-data-storage-best-practices',
      to: '/best-practices/user-data-storage-best-practices'
    },
    {
      from: '/enterprise/private-cloud/overview',
      to: '/private-cloud'
    },
    {
      from: '/private-saas-deployment',
      to: '/private-cloud'
    },
    {
      from: '/topics/identity-glossary',
      to: '/glossary'
    },
    {
      from: '/topics/extensibility',
      to: '/extend-integrate'
    },
    {
      from: '/private-saas-deployment/managed-private-cloud', 
      to: '/private-cloud/managed-private-cloud'
    },
    {
      from: '/private-saas-deployment/onboarding/managed-private-cloud', 
      to: '/private-cloud/onboarding/managed-private-cloud'
    },
    {
      from: '/private-saas-deployment/onboarding/managed-private-cloud/infrastructure', 
      to: '/private-cloud/onboarding/managed-private-cloud/infrastructure'
    },
    {
      from: '/private-saas-deployment/onboarding/managed-private-cloud/ip-domain-port-list', 
      to: '/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list'
    },
    {
      from: '/private-saas-deployment/onboarding', 
      to: '/private-cloud/onboarding'
    },
    {
      from: '/private-saas-deployment/onboarding/private-cloud', 
      to: '/private-cloud/onboarding/private-cloud'
    },
    {
      from: '/private-saas-deployment/private-cloud', 
      to: '/private-cloud/standard-private-cloud'
    },
    {
      from: '/private-saas-deployment/add-ons', 
      to: '/private-cloud/add-ons'
    },
    {
      from: '/private-saas-deployment/custom-domain-migration', 
      to: '/private-cloud/custom-domain-migration'
    },
    {
      from: '/connections/passwordless/sms-gateway',
      to: '/connections/passwordless/guides/use-sms-gateway-passwordless'
    },
    {
      from: '/policies/requests',
      to: '/policies/unsupported-requests'
    },
    {
      from: '/rules/guides/create',
      to: '/dashboard/guides/rules/create-rules'
    },
    {
      from: '/connections/apple-setup',
      to: '/connections/apple-siwa/set-up-apple'
    },
    {
      from: '/connections/apple-siwa/add-siwa-web-app',
      to: '/connections/social/apple'
    },
    {
      from: '/connections/apple-siwa/add-siwa-to-native-app',
      to: '/connections/nativesocial/apple'
    },
    {
      from: '/connections/nativesocial/add-siwa-to-native-app',
      to: '/connections/nativesocial/apple'
    },
    {
      from: '/connections/passwordless/email',
      to: '/connections/passwordless/guides/email-otp'
    },
    {
      from: '/connections/passwordless/sms',
      to: '/connections/passwordless/guides/sms-otp'
    },
    {
      from: '/connections/passwordless/spa',
      to: '/connections/passwordless/guides/universal-login'
    },
    {
      from: '/connections/passwordless/regular-web-app',
      to: '/connections/passwordless/guides/universal-login'
    },
    {
      from: [
        '/connections/passwordless/faq',
        '/connections/passwordless/reference/troubleshoot'
      ],
      to: '/connections/passwordless/troubleshoot'
    },
    {
      from: '/best-practices/custom-db-connections-scripts',
      to: '/best-practices/custom-db-connections'
    },
    {
      from: '/errors/deprecation-errors',
      to: '/troubleshoot/guides/check-deprecation-errors'
    },
    {
    from: '/api/management/v1/use-cases',
    to: '/migrations/guides/management-api-v1-v2'
    },
    {
      from: '/logs/query-syntax',
      to: '/logs/references/query-syntax'
    },
    {
      from: '/tokens/concepts/token-best-practices',
      to: '/best-practices/token-best-practices'
    },
    {
      from: '/logs/references/log-event-data',
      to: '/logs/references/log-event-types-codes'
    },
    {
      from: '/anomaly-detection/references/anomaly-detection-faqs',
      to: '/anomaly-detection'
    },
    {
      from: '/anomaly-detection/references/anomaly-detection-restrictions-limitations',
      to: '/anomaly-detection/guides/set-anomaly-detection-preferences'
    },
    {      
      from: [
        '/hooks/concepts/credentials-exchange-extensibility-point',
        '/hooks/guides/use-the-credentials-exchange-extensibility-point'
      ],
      to: '/hooks/extensibility-points/client-credentials-exchange'
    },
    {
      from: [
        '/hooks/concepts/post-user-registration-extensibility-point',
        '/hooks/guides/use-the-post-user-registration-extensibility-point'
      ],
      to: '/hooks/extensibility-points/post-user-registration'
    },
    {
      from: [
        '/hooks/concepts/pre-user-registration-extensibility-point',
        '/hooks/guides/use-the-pre-user-registration-extensibility-point'
      ],
      to: '/hooks/extensibility-points/pre-user-registration'
    },
    {
      from: '/hooks/guides/post-change-password',
      to: '/hooks/extensibility-points/post-change-password'
    },
    {
      from: '/hooks/concepts/extensibility-points',
      to: '/hooks/extensibility-points'
    },
    {
      from: [
        '/hooks/guides/create-hooks-using-cli',
        '/hooks/guides/create-hooks-using-dashboard'
      ],
      to: '/hooks/create'
    },
    {
      from: [
        '/hooks/guides/delete-hooks-using-cli',
        '/hooks/guides/delete-hooks-using-dashboard'
      ],
      to: '/hooks/delete'
    },
    {
      from: [
        '/hooks/guides/edit-hooks-using-cli',
        '/hooks/guides/edit-hooks-using-dashboard'
      ],
      to: '/hooks/update'
    },
    {
      from: [
        '/hooks/guides/enable-disable-hooks-using-cli',
        '/hooks/guides/enable-disable-hooks-using-dashboard'
      ],
      to: '/hooks/enable-disable'
    },
    {
      from: '/hooks/guides/logging-hooks-using-cli',
      to: '/hooks/view-logs'
    },
    {
      from: '/hooks/client-credentials-exchange',
      to: '/hooks/extensibility-points/client-credentials-exchange'
    },
    {
      from: '/hooks/post-change-password',
      to: '/hooks/extensibility-points/post-change-password'
    },
    {
      from: '/hooks/post-user-registration',
      to: '/hooks/extensibility-points/post-user-registration'
    },
    {
      from: '/hooks/pre-user-registration',
      to: '/hooks/extensibility-points/pre-user-registration'
    },
    {
      from: '/hooks/logs',
      to: '/hooks/view-logs'
    },
    {
      from: ['/integrations/aws-eventbridge','/logs/streams/aws-eventbridge'],
      to: '/logs/streams/amazon-eventbridge'
    },
    {
      from: '/extensions/deploy-cli/references/whats-new-v2',
      to: 'articles/extensions/deploy-cli/references/whats-new'
    },
    {
      from: '/api/management/guides/retrieve-connection-options',
      to: '/api/management/guides/connections/retrieve-connection-options'
    },
    {
      from: '/product-lifecycle/deprecation-eol',
      to: '/product-lifecycle/migration-process'
    },
    {
      from: ['/mfa/reset-user-mfa','/mfa/reset-user-MFA'],
      to: '/mfa/guides/reset-user-mfa'
    },
    {
      from: '/connections/social/miicard',
      to: '/connections/identity-providers-social'
    },
    {
      from: '/mfa/references/troubleshooting',
      to: '/mfa/references/troubleshoot-mfa'
    },
    {
      from: '/line',
      to: '/connections/social/line'
    },
    {
      from: '/api-auth/tutorials/multifactor-resource-owner-password',
      to: '/mfa/guides/mfa-api/multifactor-resource-owner-password'
    },
  
    /* - - - - - - - - - - - - - - - - - - - 
       NOTHING SHOULD REMAIN ABOVE THIS LINE
       - - - - - - - - - - - - - - - - - - - */

    /* QUICKSTARTS */

    {
      from: ['/android-tutorial', '/native-platforms/android'],
      to: '/quickstart/native/android'
    },
    {
      from: [
        '/angular-tutorial',
        '/client-platforms/angularjs',
        '/quickstart/spa/angular/:client?'
      ],
      to: '/quickstart/spa/angularjs'
    },
    {
      from: '/client-platforms/angular2',
      to: '/quickstart/spa/angular2'
    },
    {
      from: ['/aspnet-tutorial', '/mvc3-tutorial'],
      to: '/quickstart/webapp/aspnet'
    },
    {
      from: ['/aspnet-owin-tutorial', '/aspnetwebapi-owin-tutorial'],
      to: '/quickstart/webapp/aspnet-owin'
    },
    {
      from: [
        '/aspnetwebapi-tutorial',
        '/tutorials/aspnet-mvc4-enterprise-providers',
        '/webapi'
      ],
      to: '/quickstart/backend/aspnet-webapi'
    },
    {
      from: '/quickstart/native/chrome-extension',
      to: '/quickstart/native/chrome'
    },
    {
      from: ['/ember-tutorial', '/client-platforms/emberjs'],
      to: '/quickstart/spa/emberjs'
    },
    {
      from: '/ionic-tutorial',
      to: '/quickstart/native/ionic'
    },
    {
      from: ['/ios-tutorial', '/native-platforms/ios-objc', '/quickstart/native/ios-objc'],
      to: '/quickstart/native/ios-swift'
    },
    {
      from: '/java-tutorial',
      to: '/quickstart/webapp/java'
    },
    {
      from: '/javaapi-tutorial',
      to: '/quickstart/backend/java'
    },
    {
      from: '/server-platforms/golang',
      to: '/quickstart/webapp/golang'
    },
    {
      from: '/laravel-tutorial',
      to: '/quickstart/webapp/laravel'
    },
    {
      from: '/laravelapi-tutorial',
      to: '/quickstart/backend/php-laravel'
    },
    {
      from: '/nodeapi-tutorial',
      to: '/quickstart/backend/nodejs'
    },
    {
      from: ['/nodejs-tutorial', '/server-platforms/nodejs'],
      to: '/quickstart/webapp/nodejs'
    },
    {
      from: '/phpapi-tutorial',
      to: '/quickstart/backend/php'
    },
    {
      from: '/pythonapi-tutorial',
      to: '/quickstart/backend/python'
    },
    {
      from: '/client-platforms/react',
      to: '/quickstart/spa/react'
    },
    {
      from: '/quickstart/native/ios-reactnative',
      to: '/quickstart/native/react-native'
    },
    {
      from: '/rubyapi-tutorial',
      to: '/quickstart/backend/rails'
    },
    {
      from: '/rails-tutorial',
      to: '/quickstart/webapp/rails'
    },
    {
      from: '/server-apis/ruby',
      to: '/quickstart/backend/ruby'
    },
    {
      from: '/python-tutorial',
      to: '/quickstart/webapp/python'
    },
    {
      from: ['/php-tutorial', '/server-platforms/php'],
      to: '/quickstart/webapp/php'
    },
    {
      from: '/phonegap-tutorial',
      to: '/quickstart/native/phonegap'
    },
    {
      from: '/servicestack-tutorial',
      to: '/quickstart/webapp/servicestack'
    },
    {
      from: [
        '/singlepageapp-tutorial',
        '/client-platforms/vanillajs',
        '/quickstart/spa/javascript/:client?'
      ],
      to: '/quickstart/spa/vanillajs'
    },
    {
      from: '/quickstart/webapp/play-2-scala',
      to: '/quickstart/webapp/scala'
    },
    {
      from: '/symfony-tutorial',
      to: '/quickstart/webapp/symfony'
    },
    {
      from: '/wcf-tutorial',
      to: '/quickstart/backend/wcf-service'
    },
    {
      from: [
        '/win8-cs-tutorial',
        '/windowsstore-auth0-tutorial',
        '/native-platforms/windows-store-csharp',
        '/quickstart/native-mobile/windows8-cp/:client?',
        '/quickstart/native/windows8-cp'
      ],
      to: '/quickstart/native/windows-uwp-csharp'
    },
    {
      from: [
        '/win8-tutorial',
        '/windowsstore-js-auth0-tutorial',
        '/native-platforms/windows-store-javascript',
        '/quickstart/native-mobile/windows8/:client'
      ],
      to: '/quickstart/native/windows-uwp-javascript'
    },
    {
      from: '/windowsphone-tutorial',
      to: '/quickstart/native/windowsphone'
    },
    {
      from: '/wpf-winforms-tutorial',
      to: '/quickstart/native/wpf-winforms'
    },
    {
      from: '/xamarin-tutorial',
      to: '/quickstart/native/xamarin'
    },
    {
      from: '/quickstart/:platform/reactnative-ios/:backend?',
      to: '/quickstart/native/react-native'
    },
    {
      from: '/quickstart/:platform/reactnative-android/:backend?',
      to: '/quickstart/native/react-native'
    },
    {
      from: '/quickstart/native/react-native-ios',
      to: '/quickstart/native/react-native'
    },
    {
      from: '/quickstart/native/react-native-android',
      to: '/quickstart/native/react-native'
    },
    {
      from: '/quickstart/spa/auth0-react',
      to: '/quickstart/spa/react'
    },
    {
      from: '/quickstart/spa/auth0-react/01',
      to: '/quickstart/spa/react'
    },
    {
      from: '/quickstart/spa/auth0-react/02',
      to: '/quickstart/spa/react/02-calling-an-api'
    },
    {
      from: '/quickstart/backend/webapi-owin/04-authentication-rs256-deprecated',
      to: '/quickstart/backend/webapi-owin/04-authentication-rs256-legacy'
    },
    {
      from: '/quickstart/backend/webapi-owin/05-authentication-hs256-deprecated',
      to: '/quickstart/backend/webapi-owin/05-authentication-hs256-legacy'
    },
    {
      from: '/quickstart/backend/webapi-owin/06-authorization-deprecated',
      to: '/quickstart/backend/webapi-owin/06-authorization-legacy'
    },
    {
      from: '/quickstart/backend/aspnet-core-webapi/04-authentication-rs256-deprecated',
      to: '/quickstart/backend/aspnet-core-webapi/04-authentication-rs256-legacy'
    },
    {
      from: '/quickstart/backend/aspnet-core-webapi/05-authentication-hs256-deprecated',
      to: '/quickstart/backend/aspnet-core-webapi/05-authentication-hs256-legacy'
    },
    {
      from: '/quickstart/backend/aspnet-core-webapi/06-authorization-deprecated',
      to: '/quickstart/backend/aspnet-core-webapi/06-authorization-legacy'
    },
    {
      from: '/quickstart/spa/react/03-user-profile',
      to: '/quickstart/spa/react/04-user-profile'
    },

    /* CONNECTIONS */


  
    /* MICROSITES */
 
  
  
    /* ARCHITECTURE SCENARIOS */

  

    /* CONTENTFUL REDIRECTS (ALL LIVE SITE PAGES NOT LISTED ABOVE) */
  
    {
        from: ['/email/spa-redirect'],
        to: '/auth0-email-services/spa-redirect'
    },
    {
        from: ['/extensions/deploy-cli/guides/call-deploy-cli-programmatically'],
        to: '/call-deploy-cli-tool-programmatically'
    },
    {
        from: ['/extensions/authorization-extension/v2/rules'],
        to: '/auth0-extensions/authorization-dashboard-extension/use-rules-with-the-authorization-extension'
    },
    {
        from: ['/extensions/authorization-extension/v2/import-export-data'],
        to: '/auth0-extensions/authorization-dashboard-extension/import-and-export-authorization-extension-data'
    },
    {
        from: ['/extensions/authorization-extension/v2/troubleshooting'],
        to: '/auth0-extensions/authorization-dashboard-extension/troubleshoot-authorization-extension'
    },
    {
        from: ['/extensions/authorization-extension/v2/implementation/setup'],
        to: '/auth0-extensions/authorization-dashboard-extension/set-up-authorization-extension-users'
    },
    {
        from: ['/extensions/authorization-extension/v2/implementation/configuration'],
        to: '/auth0-extensions/authorization-dashboard-extension/configure-authorization-extension'
    },
    {
        from: ['/extensions/sso-dashboard'],
        to: '/auth0-extensions/single-sign-on-dashboard-extension'
    },
    {
        from: ['/extensions'],
        to: '/auth0-extensions'
    },
    {
        from: ['/extensions/deploy-cli/guides/import-export-directory-structure'],
        to: '/import-export-tenant-configuration-to-directory-structure'
    },
    {
        from: ['/extensions/deploy-cli'],
        to: '/deploy-cli-tool'
    },
    {
        from: ['/extensions/deploy-cli/references/troubleshooting'],
        to: '/troubleshoot-the-deploy-cli-tool'
    },
    {
        from: ['/extensions/authorization-extension/v2'],
        to: '/auth0-extensions/authorization-dashboard-extension'
    },
    {
        from: ['/extensions/deploy-cli/references/deploy-cli-options'],
        to: '/deploy-cli-options'
    },
    {
        from: ['/extensions/deploy-cli/guides/create-deploy-cli-application-manually'],
        to: '/create-and-configure-the-deploy-cli-application-manually'
    },
    {
        from: ['/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment'],
        to: '/incorporate-deploy-cli-into-build-environment'
    },
    {
        from: ['/extensions/authorization-extension/v2/api-access'],
        to: '/auth0-extensions/authorization-dashboard-extension/enable-api-access-to-authorization-extension'
    },
    {
        from: ['/extensions/deploy-cli/guides/install-deploy-cli'],
        to: '/install-and-configure-the-deploy-cli-tool'
    },
    {
        from: ['/extensions/deploy-cli/references/environment-variables-keyword-mappings'],
        to: '/environment-variables-and-keyword-mappings'
    },
    {
        from: ['/cms/joomla/configuration'],
        to: '/cms/integrate-with-joomla'
    },
    {
        from: ['/cms/joomla/installation'],
        to: '/cms/joomla-installation'
    },
    {
        from: ['/cms/wordpress/configuration'],
        to: '/cms/wordpress-plugin/configure-login-by-auth0'
    },
    {
        from: ['/cms/wordpress/extending'],
        to: '/cms/wordpress-plugin/extend-login-by-auth0'
    },
    {
        from: ['/cms/wordpress'],
        to: '/cms/wordpress-plugin'
    },
    {
        from: ['/cms/wordpress/installation'],
        to: '/cms/wordpress-plugin/install-login-by-auth0'
    },
    {
        from: ['/cms/wordpress/invalid-state'],
        to: '/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors'
    },
    {
        from: ['/cms/wordpress/troubleshoot'],
        to: '/cms/wordpress-plugin/troubleshoot-login-by-auth0'
    },
    {
        from: ['/migrations/guides/calling-api-with-idtokens'],
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-calling-api-with-access-tokens'
    },
    {
        from: ['/migrations/guides/extensibility-node12'],
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12'
    },
    {
        from: ['/migrations/guides/management-api-v1-v2'],
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-management-api-v2'
    },
    {
        from: ['/migrations/guides/passwordless-start'],
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-passwordless'
    },
    {
        from: ['/cms/wordpress/user-migration'],
        to: '/cms/wordpress-plugin/user-migration-in-login-by-auth0'
    },
    {
        from: ['/troubleshoot/concepts/auth-issues'],
        to: '/troubleshoot/troubleshoot-authentication-issues'
    },
    {
        from: ['/troubleshoot/concepts/basics'],
        to: '/troubleshoot/basic-troubleshooting'
    },
    {
        from: ['/troubleshoot/concepts/integration-extensibility-issues'],
        to: '/troubleshoot/troubleshoot-integration-and-extensibility'
    },
    {
        from: ['/troubleshoot/guides/check-api-calls'],
        to: '/troubleshoot/troubleshoot-authentication-issues/check-api-calls'
    },
    {
        from: ['/troubleshoot/guides/check-deprecation-errors'],
        to: '/troubleshoot/troubleshoot-authentication-issues/check-deprecation-errors'
    },
    {
        from: ['/troubleshoot/guides/check-error-messages'],
        to: '/troubleshoot/check-error-messages'
    },
    {
        from: ['/troubleshoot/guides/check-login-logout-issues'],
        to: '/troubleshoot/troubleshoot-authentication-issues/check-login-and-logout-issues'
    },
    {
        from: ['/troubleshoot/guides/check-user-profiles'],
        to: '/troubleshoot/troubleshoot-authentication-issues/check-user-profiles'
    },
    {
        from: ['/troubleshoot/guides/generate-har-files'],
        to: '/troubleshoot/generate-and-analyze-har-files'
    },
    {
        from: ['/troubleshoot/guides/verify-connections'],
        to: '/troubleshoot/basic-troubleshooting/verify-connections'
    },
    {
        from: ['/troubleshoot/guides/verify-domain'],
        to: '/troubleshoot/basic-troubleshooting/verify-domain'
    },
    {
        from: ['/troubleshoot/guides/verify-platform'],
        to: '/troubleshoot/basic-troubleshooting/verify-platform'
    },
    {
        from: ['/troubleshoot/guides/verify-rules'],
        to: '/troubleshoot/verify-rules'
    },
    {
        from: ['/troubleshoot/references/invalid-token'],
        to: '/troubleshoot/invalid-token-errors'
    },
    {
        from: ['/pre-deployment/how-to-run-test'],
        to: '/pre-deployment/how-to-run-production-checks'
    },
    {
        from: ['/pre-deployment/prelaunch-tips'],
        to: '/pre-deployment/pre-launch-tips'
    },
    {
        from: ['/pre-deployment/tests/best-practice'],
        to: '/pre-deployment/how-to-run-production-checks/production-checks:-best-practices'
    },
    {
        from: ['/pre-deployment/tests/recommended'],
        to: '/pre-deployment/how-to-run-production-checks/production-checks:-recommended-fixes'
    },
    {
        from: ['/pre-deployment/tests/required'],
        to: '/pre-deployment/how-to-run-production-checks/production-checks:-required-fixes'
    },
    {
        from: ['/services'],
        to: '/auth0-professional-services'
    },
    {
        from: ['/i18n'],
        to: '/internationalization-and-multilingual-settings'
    },
    {
        from: ['/i18n/password-options'],
        to: '/password-options-translation'
    },
    {
        from: ['/logs/streams/amazon-eventbridge'],
        to: '/auth0-logs/export-log-events-with-log-streaming/stream-logs-to-amazon-eventbridge'
    },
    {
        from: ['/logs/streams/datadog'],
        to: '/auth0-logs/export-log-events-with-log-streaming/stream-logs-to-datadog'
    },
    {
        from: ['/logs/streams/http-event'],
        to: '/auth0-logs/export-log-events-with-log-streaming/stream-http-event-logs'
    },
    {
        from: ['/logs/streams'],
        to: '/auth0-logs/export-log-events-with-log-streaming'
    },
    {
        from: ['/compliance'],
        to: '/compliance-and-certifications'
    },
    {
        from: ['/best-practices/error-handling'],
        to: '/best-practices/error-handling-best-practices'
    },
    {
        from: ['/best-practices/rules'],
        to: '/best-practices/rules-best-practices'
    },
    {
        from: ['/logs'],
        to: '/auth0-logs/export-logs-with-extensions'
    },
    {
        from: ['/deploy/checklist'],
        to: '/deploy/deploy-checklist'
    },
    {
        from: ['/login/embedded'],
        to: '/login/embedded-login'
    },
    {
        from: ['/hooks/create'],
        to: '/hooks/create-hooks'
    },
    {
        from: ['/hooks/delete'],
        to: '/hooks/delete-hooks'
    },
    {
        from: ['/hooks/enable-disable'],
        to: '/hooks/enable-disable-hooks'
    },
    {
        from: ['/hooks/extensibility-points/post-change-password'],
        to: '/hooks/post-change-password'
    },
    {
        from: ['/hooks/extensibility-points/post-user-registration'],
        to: '/hooks/post-user-registration'
    },
    {
        from: ['/hooks/extensibility-points/pre-user-registration'],
        to: '/hooks/pre-user-registration'
    },
    {
        from: ['/hooks/extensibility-points/send-phone-message'],
        to: '/hooks/send-phone-message'
    },
    {
        from: ['/hooks/secrets/create'],
        to: '/hooks/hook-secrets/create-hook-secrets'
    },
    {
        from: ['/hooks/secrets/delete'],
        to: '/hooks/hook-secrets/delete-hook-secrets'
    },
    {
        from: ['/hooks/secrets'],
        to: '/hooks/hook-secrets'
    },
    {
        from: ['/hooks/secrets/update'],
        to: '/hooks/hook-secrets/update-hook-secrets'
    },
    {
        from: ['/hooks/secrets/view'],
        to: '/hooks/hook-secrets/view-hook-secrets'
    },
    {
        from: ['/hooks/update'],
        to: '/hooks/update-hooks'
    },
    {
        from: ['/hooks/view-logs'],
        to: '/hooks/view-logs-for-hooks'
    },
    {
        from: ['/hooks/view'],
        to: '/hooks/view-hooks'
    },
    {
        from: ['/protocols/oidc/identity-providers/okta'],
        to: '/protocols/configure-okta-as-oidc-identity-provider'
    },
    {
        from: ['/protocols/oidc/openid-connect-discovery'],
        to: '/protocols/configure-applications-with-oidc-discovery'
    },
    {
        from: ['/protocols/saml/adfs'],
        to: '/protocols/saml-configuration-options/configure-adfs-saml-connections'
    },
    {
        from: ['/protocols/saml/identity-providers/onelogin'],
        to: '/protocols/saml-configuration-options/configure-onelogin-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/identity-providers/ping7'],
        to: '/protocols/saml-configuration-options/configure-pingfederate-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/identity-providers/salesforce'],
        to: '/protocols/saml-configuration-options/configure-salesforce-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/identity-providers/siteminder'],
        to: '/protocols/saml-configuration-options/configure-siteminder-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/identity-providers/ssocircle'],
        to: '/protocols/saml-configuration-options/configure-ssocircle-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/idp-initiated-sso'],
        to: '/protocols/saml-configuration-options/configure-saml-identity-provider-initiated-single-sign-on'
    },
    {
        from: ['/protocols/saml/saml-apps/cisco-webex'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex'
    },
    {
        from: ['/protocols/saml/saml-apps/datadog'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog'
    },
    {
        from: ['/protocols/saml/saml-apps/egencia'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-egencia'
    },
    {
        from: ['/protocols/saml/saml-apps/freshdesk'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk'
    },
    {
        from: ['/protocols/saml/saml-apps/github-cloud'],
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-cloud'
    },
    {
        from: ['/protocols/saml/saml-apps/github-server'],
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-server'
    },
    {
        from: ['/protocols/saml/saml-apps/hosted-graphite'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-hosted-graphite'
    },
    {
        from: ['/protocols/saml/saml-apps/litmos'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos'
    },
    {
        from: ['/protocols/saml/saml-apps/pluralsight'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-pluralsight'
    },
    {
        from: ['/protocols/saml/saml-apps/sprout-video'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video'
    },
    {
        from: ['/protocols/saml/saml-apps/tableau-online'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-online'
    },
    {
        from: ['/protocols/saml/saml-apps/tableau-server'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-server'
    },
    {
        from: ['/protocols/saml/saml-apps/workday'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-workday'
    },
    {
        from: ['/protocols/saml/saml-apps/workpath'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-workpath'
    },
    {
        from: ['/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-service-and-identity-provider'
    },
    {
        from: ['/protocols/saml/saml-idp-generic'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-saml-identity-provider'
    },
    {
        from: ['/protocols/saml/saml2webapp-tutorial'],
        to: '/protocols/saml-configuration-options/configure-saml2-web-applications'
    },
    {
        from: ['/libraries/auth0-android/configuration'],
        to: '/auth0-libraries/auth0-android/auth0-android-configuration'
    },
    {
        from: ['/libraries/auth0-android'],
        to: '/auth0-libraries/auth0-android'
    },
    {
        from: ['/libraries/lock/v11/configuration'],
        to: '/auth0-libraries/lock-v11-for-web/lock-configuration'
    },
    {
        from: ['/applications/concepts/app-types-first-third-party'],
        to: '/auth0-applications/first-party-and-third-party-applications'
    },
    {
        from: ['/applications'],
        to: '/auth0-applications'
    },
    {
        from: ['/applications/reference/wildcard-subdomains'],
        to: '/auth0-applications/wildcards-for-subdomains'
    },
    {
        from: ['/email/custom'],
        to: '/auth0-email-services/manage-email-flow'
    },
    {
        from: ['/email'],
        to: '/auth0-email-services'
    },
    {
        from: ['/email/testing'],
        to: '/auth0-email-services/configure-external-smtp-email-providers/configure-test-smtp-email-servers'
    },
    {
        from: ['/sso/current/relevant-api-endpoints'],
        to: '/single-sign-on/api-endpoints-for-single-sign-on'
    },
    {
        from: ['/dev-lifecycle/local-testing-and-development'],
        to: '/development-lifecycle/work-with-auth0-locally'
    },
    {
        from: ['/dev-lifecycle/setting-up-env'],
        to: '/development-lifecycle/set-up-multiple-environments'
    },
    {
        from: ['/rules/guides/cache-resources'],
        to: '/rules/cache-expensive-resources-in-rules'
    },
    {
        from: ['/rules/guides/configuration'],
        to: '/rules/configuration'
    },
    {
        from: ['/rules/guides/debug'],
        to: '/rules/debug-rules'
    },
    {
        from: ['/rules/guides/management-api'],
        to: '/rules/use-management-api'
    },
    {
        from: ['/rules/guides/metadata'],
        to: '/rules/metadata'
    },
    {
        from: ['/rules/guides/redirect'],
        to: '/rules/redirect-users'
    },
    {
        from: ['/rules/references/context-object'],
        to: '/rules/context-object'
    },
    {
        from: ['/rules/references/samples'],
        to: '/rules/examples'
    },
    {
        from: ['/rules/references/use-cases'],
        to: '/rules/use-cases'
    },
    {
        from: ['/rules/references/user-object'],
        to: '/rules/user-object-in-rules'
    },
    {
        from: ['/custom-domains/additional-configuration'],
        to: '/custom-domains/configure-features-to-use-custom-domains'
    },
    {
        from: ['/universal-login/customization-classic'],
        to: '/universal-login/classic-experience/classic-experience-customization'
    },
    {
        from: ['/universal-login/classic'],
        to: '/universal-login/classic-experience'
    },
    {
        from: ['/universal-login/multifactor-authentication'],
        to: '/universal-login/classic-experience/mfa-classic-experience'
    },
    {
        from: ['/universal-login/new-experience-limitations'],
        to: '/universal-login/new-experience/new-experience-limitations'
    },
    {
        from: ['/universal-login/new'],
        to: '/universal-login/new-experience'
    },
    {
        from: ['/universal-login/password-reset'],
        to: '/universal-login/customize-password-reset-page'
    },
    {
        from: ['/universal-login/version-control'],
        to: '/universal-login/version-control-universal-login-pages'
    },
    {
        from: ['/sessions'],
        to: '/sessions-and-cookies'
    },
    {
        from: ['/design/creating-invite-only-applications'],
        to: '/auth0-email-services/send-email-invitations-for-application-signup'
    },
    {
        from: ['/design/using-auth0-with-multi-tenant-apps'],
        to: '/best-practices/multi-tenant-applications-best-practices'
    },
    {
        from: ['/logout/guides/logout-applications'],
        to: '/logout/log-users-out-of-applications'
    },
    {
        from: ['/logout/guides/logout-auth0'],
        to: '/logout/log-users-out-of-auth0'
    },
    {
        from: ['/tokens/concepts/delegation-tokens'],
        to: '/tokens/delegation-tokens'
    },
    {
        from: ['/tokens/concepts/jwks'],
        to: '/tokens/json-web-tokens/json-web-key-sets'
    },
    {
        from: ['/tokens/guides/disable-refresh-token-rotation'],
        to: '/tokens/access-tokens/refresh-tokens/disable-refresh-token-rotation'
    },
    {
        from: ['/tokens/guides/get-id-tokens'],
        to: '/tokens/id-tokens/get-id-tokens'
    },
    {
        from: ['/tokens/guides/use-refresh-token-rotation'],
        to: '/tokens/access-tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation'
    },
    {
        from: ['/tokens/references/jwt-structure'],
        to: '/tokens/json-web-tokens/json-web-token-structure'
    },
    {
        from: ['/scopes/current/api-scopes'],
        to: '/scopes/api-scopes'
    },
    {
        from: ['/scopes/current/guides/customize-consent-prompt'],
        to: '/scopes/customize-consent-prompts'
    },
    {
        from: ['/scopes/current'],
        to: '/scopes'
    },
    {
        from: ['/scopes/current/oidc-scopes'],
        to: '/scopes/openid-connect-scopes'
    },
    {
        from: ['/scopes/current/sample-use-cases'],
        to: '/scopes/sample-use-cases-scopes-and-claims'
    },
    {
        from: ['/anomaly-detection/concepts/breached-passwords'],
        to: '/anomaly-detection/breached-password-security'
    },
    {
        from: ['/anomaly-detection/guides/customize-blocked-account-emails'],
        to: '/anomaly-detection/customize-blocked-account-emails'
    },
    {
        from: ['/anomaly-detection/guides/prevent-credential-stuffing-attacks'],
        to: '/anomaly-detection-do-not-publish/automated-attack-and-credential-stuffing-protection-do-not-publish'
    },
    {
        from: ['/anomaly-detection/guides/set-anomaly-detection-preferences'],
        to: '/anomaly-detection/set-anomaly-detection-preferences-do-not-publish'
    },
    {
        from: ['/anomaly-detection/guides/use-tenant-data-for-anomaly-detection'],
        to: '/anomaly-detection/view-anomaly-detection-events'
    },
    {
        from: ['/dashboard/guides/apis/enable-rbac'],
        to: '/authorization/rbac/enable-role-based-access-control-for-apis'
    },
    {
        from: ['/dashboard/guides/apis/update-token-lifetime'],
        to: '/tokens/access-tokens/update-access-token-lifetime'
    },
    {
        from: ['/dashboard/guides/applications/enable-android-app-links'],
        to: '/auth0-applications/enable-android-app-links-support'
    },
    {
        from: ['/dashboard/guides/applications/enable-sso-app'],
        to: '/single-sign-on/enable-sso-for-applications'
    },
    {
        from: ['/dashboard/guides/applications/enable-universal-links'],
        to: '/enable-universal-links-support-in-apple-xcode'
    },
    {
        from: ['/dashboard/guides/applications/register-app-native'],
        to: '/auth0-applications/register-native-applications'
    },
    {
        from: ['/dashboard/guides/applications/register-app-regular-web'],
        to: '/auth0-applications/register-regular-web-applications'
    },
    {
        from: ['/dashboard/guides/applications/remove-app'],
        to: '/auth0-applications/remove-applications'
    },
    {
        from: ['/dashboard/guides/applications/set-up-addon-saml2-aws'],
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-aws'
    },
    {
        from: ['/dashboard/guides/applications/set-up-cors'],
        to: '/auth0-applications/set-up-cors'
    },
    {
        from: ['/dashboard/guides/applications/update-app-connections'],
        to: '/auth0-applications/update-application-connections'
    },
    {
        from: ['/dashboard/guides/applications/update-grant-types'],
        to: '/auth0-applications/update-grant-types'
    },
    {
        from: ['/dashboard/guides/applications/update-signing-algorithm'],
        to: '/auth0-applications/change-application-signing-algorithms'
    },
    {
        from: ['/dashboard/guides/applications/update-token-lifetime'],
        to: '/tokens/id-tokens/update-id-token-lifetime'
    },
    {
        from: ['/dashboard/guides/applications/view-app-type-confidential-public'],
        to: '/auth0-applications/check-an-applications-confidential-or-public-authentication-method'
    },
    {
        from: ['/dashboard/guides/connections/configure-connection-sync'],
        to: '/users/configure-connection-sync-with-auth0'
    },
    {
        from: ['/dashboard/guides/connections/disable-cache-ad-ldap'],
        to: '/ad-ldap-connector/disable-credential-caching'
    },
    {
        from: ['/dashboard/guides/connections/set-up-connections-database'],
        to: '/auth0-applications/set-up-database-connections'
    },
    {
        from: ['/dashboard/guides/extensions/delegated-admin-install-extension'],
        to: '/delegated-administration-extension/install-delegated-admin-extension'
    },
    {
        from: ['/dashboard/guides/extensions/sso-dashboard-add-apps'],
        to: '/auth0-extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard'
    },
    {
        from: ['/dashboard/guides/extensions/sso-dashboard-create-app'],
        to: '/get-started/auth0-dashboard-overview/create-sso-dashboard-application'
    },
    {
        from: ['/dashboard/guides/extensions/sso-dashboard-install-extension'],
        to: '/auth0-extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension'
    },
    {
        from: ['/dashboard/guides/extensions/sso-dashboard-update-apps'],
        to: '/auth0-extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard'
    },
    {
        from: ['/dashboard/guides/roles/add-permissions-roles'],
        to: '/authorization/rbac/roles/add-permissions-to-roles'
    },
    {
        from: ['/dashboard/guides/roles/create-roles'],
        to: '/authorization/rbac/roles/create-roles'
    },
    {
        from: ['/dashboard/guides/roles/delete-roles'],
        to: '/authorization/rbac/roles/delete-roles'
    },
    {
        from: ['/dashboard/guides/roles/edit-role-definitions'],
        to: '/authorization/rbac/roles/edit-role-definitions'
    },
    {
        from: ['/dashboard/guides/roles/remove-role-permissions'],
        to: '/authorization/rbac/roles/remove-permissions-from-roles'
    },
    {
        from: ['/dashboard/guides/roles/remove-role-users'],
        to: '/users/remove-users-from-roles'
    },
    {
        from: ['/dashboard/guides/roles/view-role-permissions'],
        to: '/authorization/rbac/roles/view-role-permissions'
    },
    {
        from: ['/dashboard/guides/roles/view-role-users'],
        to: '/authorization/rbac/roles/view-users-assigned-to-roles'
    },
    {
        from: ['/dashboard/guides/rules/configure-variables'],
        to: '/rules/configure-global-variables-for-rules'
    },
    {
        from: ['/dashboard/guides/rules/create-rules'],
        to: '/rules/create-rules'
    },
    {
        from: ['/dashboard/guides/tenants/configure-device-user-code-settings'],
        to: '/get-started/auth0-dashboard-overview/configure-device-user-code-settings'
    },
    {
        from: ['/dashboard/guides/tenants/configure-session-lifetime-settings'],
        to: '/get-started/auth0-dashboard-overview/configure-session-lifetime-settings'
    },
    {
        from: ['/dashboard/guides/tenants/enable-sso-tenant'],
        to: '/get-started/auth0-dashboard-overview/enable-sso-for-legacy-tenants'
    },
    {
        from: ['/dashboard/guides/tenants/revoke-signing-keys'],
        to: '/get-started/auth0-dashboard-overview/revoke-signing-keys'
    },
    {
        from: ['/dashboard/guides/tenants/rotate-signing-keys'],
        to: '/get-started/auth0-dashboard-overview/rotate-signing-keys'
    },
    {
        from: ['/dashboard/guides/tenants/view-signing-keys'],
        to: '/get-started/auth0-dashboard-overview/view-client-secrets-and-signing-keys'
    },
    {
        from: ['/dashboard/guides/universal-login/configure-login-page-passwordless'],
        to: '/universal-login/configure-universal-login-with-passwordless'
    },
    {
        from: ['/dashboard/guides/users/assign-permissions-users'],
        to: '/users/assign-permissions-to-users'
    },
    {
        from: ['/dashboard/guides/users/assign-roles-users'],
        to: '/users/assign-roles-to-users'
    },
    {
        from: ['/dashboard/guides/users/remove-user-permissions'],
        to: '/users/remove-permissions-from-users'
    },
    {
        from: ['/dashboard/guides/users/remove-user-roles'],
        to: '/users/remove-roles-from-users'
    },
    {
        from: ['/dashboard/guides/users/unlink-user-devices'],
        to: '/users/unlink-devices-from-users'
    },
    {
        from: ['/dashboard/guides/users/view-user-permissions'],
        to: '/users/view-user-permissions'
    },
    {
        from: ['/dashboard/guides/users/view-user-roles'],
        to: '/users/view-user-roles'
    },
    {
        from: ['/dashboard/manage-dashboard-admins'],
        to: '/get-started/auth0-dashboard-overview/manage-dashboard-users'
    },
    {
        from: ['/dashboard/reference/settings-api'],
        to: '/get-started/auth0-dashboard-overview/api-settings'
    },
    {
        from: ['/dashboard/reference/settings-application'],
        to: '/get-started/auth0-dashboard-overview/application-settings'
    },
    {
        from: ['/dashboard/reference/settings-tenant'],
        to: '/get-started/auth0-dashboard-overview/tenant-settings'
    },
    {
        from: ['/api/info'],
        to: '/auth0-apis'
    },
    {
        from: ['/api/management/guides/applications/update-ownership'],
        to: '/auth0-applications/update-application-ownership'
    },
    {
        from: ['/api/management/guides/connections/promote-connection-domain-level'],
        to: '/get-started/auth0-dashboard-overview/promote-connections-to-domain-level'
    },
    {
        from: ['/api/management/guides/connections/retrieve-connection-options'],
        to: '/get-started/auth0-dashboard-overview/retrieve-connection-options'
    },
    {
        from: ['/api/management/guides/users/set-root-attributes-user-import'],
        to: '/users/set-root-attributes-during-user-import'
    },
    {
        from: ['/api/management/guides/users/set-root-attributes-user-signup'],
        to: '/users/set-root-attributes-during-user-sign-up'
    },
    {
        from: ['/api/management/guides/users/update-root-attributes-users'],
        to: '/users/update-root-attributes-for-users'
    },
    {
        from: ['/api/management/v1/reference'],
        to: '/auth0-management-api-reference'
    },
    {
        from: ['/api/management/v2/get-access-tokens-for-spas'],
        to: '/get-management-api-tokens-for-single-page-applications'
    },
    {
        from: ['/api/management/v2/tokens-flows'],
        to: '/changes-in-auth0-management-apiv2-tokens'
    },
    {
        from: ['/api/postman'],
        to: '/use-auth0-apis-with-postman-collections'
    },
    {
        from: ['/application-auth/current'],
        to: '/authentication'
    },
    {
        from: ['/application-auth/legacy'],
        to: '/application-auth'
    },
    {
        from: ['/authorization/concepts/authz-and-authn'],
        to: '/authorization/authentication-and-authorization'
    },
    {
        from: ['/authorization/concepts/authz-rules'],
        to: '/authorization/rules-for-authorization-policies'
    },
    {
        from: ['/authorization/concepts/core-vs-extension'],
        to: '/authorization/authorization-core-vs-authorization-extension'
    },
    {
        from: ['/authorization/concepts/policies'],
        to: '/authorization/authorization-policies'
    },
    {
        from: ['/authorization/concepts/rbac'],
        to: '/authorization/rbac'
    },
    {
        from: ['/authorization/concepts/sample-use-cases-rbac'],
        to: '/authorization/sample-use-cases-role-based-access-control'
    },
    {
        from: ['/authorization/concepts/sample-use-cases-rules'],
        to: '/authorization/sample-use-cases-rules-with-authorization'
    },
    {
        from: ['/authorization/concepts/troubleshooting'],
        to: '/authorization/troubleshoot-role-based-access-control-and-authorization'
    },
    {
        from: ['/authorization/guides/how-to'],
        to: '/authorization/how-to-use-auth0s-core-authorization-feature-set'
    },
    {
        from: ['/authorization/guides/manage-permissions'],
        to: '/authorization/manage-permissions'
    },
    {
        from: ['/authorization/guides/manage-roles'],
        to: '/authorization/rbac/roles'
    },
    {
        from: ['/authorization/guides/manage-users'],
        to: '/authorization/rbac-users'
    },
    {
        from: ['/flows/concepts/auth-code'],
        to: '/authentication-and-authorization-flows/authorization-code-flow'
    },
    {
        from: ['/flows/concepts/client-credentials'],
        to: '/authentication-and-authorization-flows/client-credentials-flow'
    },
    {
        from: ['/flows/concepts/device-auth'],
        to: '/authentication-and-authorization-flows/device-authorization-flow'
    },
    {
        from: ['/flows/concepts/implicit'],
        to: '/authentication-and-authorization-flows/implicit-flow-with-form-post'
    },
    {
        from: ['/flows/guides/auth-code/add-login-auth-code'],
        to: '/authentication-and-authorization-flows/add-login-auth-code-flow'
    },
    {
        from: ['/flows/guides/auth-code/call-api-auth-code'],
        to: '/authentication-and-authorization-flows/call-your-api-using-the-authorization-code-flow'
    },
    {
        from: ['/flows/guides/auth-code-pkce/add-login-auth-code-pkce'],
        to: '/authentication-and-authorization-flows/add-login-using-the-authorization-code-flow-with-pkce'
    },
    {
        from: ['/flows/guides/auth-code-pkce/call-api-auth-code-pkce'],
        to: '/authentication-and-authorization-flows/call-your-api-using-the-authorization-code-flow-with-pkce'
    },
    {
        from: ['/flows/guides/client-credentials/call-api-client-credentials'],
        to: '/authentication-and-authorization-flows/call-your-api-using-the-client-credentials-flow'
    },
    {
        from: ['/flows/guides/device-auth/call-api-device-auth'],
        to: '/authentication-and-authorization-flows/call-your-api-using-the-device-authorization-flow'
    },
    {
        from: ['/flows/guides/implicit/add-login-implicit'],
        to: '/authentication-and-authorization-flows/add-login-using-the-implicit-flow-with-form-post'
    },
    {
        from: ['/flows'],
        to: '/authentication-and-authorization-flows'
    },
    {
        from: ['/api-auth/blacklists-vs-grants'],
        to: '/blacklists-vs-application-grants'
    },
    {
        from: ['/api-auth/config/using-the-auth0-dashboard'],
        to: '/set-up-client-credentials-grants-using-the-dashboard'
    },
    {
        from: ['/api-auth/config/using-the-management-api'],
        to: '/set-up-client-credentials-grants-using-the-management-api'
    },
    {
        from: ['/api-auth/dynamic-client-registration'],
        to: '/dynamic-client-registration'
    },
    {
        from: ['/api-auth/faq'],
        to: '/api-authentication-and-authorization-faq'
    },
    {
        from: ['/api-auth/grant/authorization-code-pkce'],
        to: '/call-apis-from-mobile-apps'
    },
    {
        from: ['/api-auth/grant/authorization-code'],
        to: '/call-apis-from-server-side-web-apps'
    },
    {
        from: ['/api-auth/grant/client-credentials'],
        to: '/client-credentials-grant'
    },
    {
        from: ['/api-auth/grant/hybrid'],
        to: '/call-apis-using-the-hybrid-flow'
    },
    {
        from: ['/api-auth/grant/implicit'],
        to: '/call-apis-from-client-side-web-apps'
    },
    {
        from: ['/api-auth/grant/password'],
        to: '/call-apis-from-highly-trusted-applications'
    },
    {
        from: ['/api-auth/passwordless'],
        to: '/oidc-conformant-passwordless-authentication'
    },
    {
        from: ['/api-auth/token-renewal-in-safari'],
        to: '/renew-tokens-when-using-safari'
    },
    {
        from: ['/api-auth/tutorials/adoption/api-tokens'],
        to: '/call-apis-with-auth0-tokens'
    },
    {
        from: ['/api-auth/tutorials/adoption/authorization-code'],
        to: '/authorization-code-grant'
    },
    {
        from: ['/api-auth/tutorials/adoption/delegation'],
        to: '/delegation-and-the-oidc-conformant-pipeline'
    },
    {
        from: ['/api-auth/tutorials/adoption/implicit'],
        to: '/implicit-grant'
    },
    {
        from: ['/api-auth/tutorials/adoption'],
        to: '/oidc-conformant-authentication-adoption-guide'
    },
    {
        from: ['/api-auth/tutorials/adoption/oidc-conformant'],
        to: '/oidc-conformant-applications'
    },
    {
        from: ['/api-auth/tutorials/adoption/password'],
        to: '/resource-owner-password-credentials-exchange'
    },
    {
        from: ['/api-auth/tutorials/adoption/scope-custom-claims'],
        to: '/user-profile-claims-and-the-scope-parameter'
    },
    {
        from: ['/api-auth/tutorials/authorization-code-grant-pkce'],
        to: '/execute-an-authorization-code-grant-flow-with-pkce'
    },
    {
        from: ['/api-auth/tutorials/authorization-code-grant'],
        to: '/execute-an-authorization-code-grant-flow'
    },
    {
        from: ['/api-auth/tutorials/client-credentials/customize-with-hooks'],
        to: '/use-hooks-with-client-credentials-grant'
    },
    {
        from: ['/api-auth/tutorials/client-credentials'],
        to: '/implement-the-client-credentials-grant'
    },
    {
        from: ['/api-auth/tutorials/hybrid-flow'],
        to: '/implement-the-hybrid-flow'
    },
    {
        from: ['/api-auth/tutorials/implicit-grant'],
        to: '/implement-the-implicit-grant'
    },
    {
        from: ['/api-auth/tutorials/nonce'],
        to: '/mitigate-replay-attacks-when-using-the-implicit-flow'
    },
    {
        from: ['/api-auth/tutorials/password-grant'],
        to: '/implement-the-resource-owner-password-grant'
    },
    {
        from: ['/api-auth/tutorials/represent-multiple-apis'],
        to: '/represent-multiple-apis-using-a-single-logical-api'
    },
    {
        from: ['/api-auth/tutorials/silent-authentication'],
        to: '/configure-silent-authentication'
    },
    {
        from: ['/api-auth/tutorials/using-resource-owner-password-from-server-side'],
        to: '/use-resource-owner-password-grant-from-the-server-side'
    },
    {
        from: ['/api-auth/user-consent'],
        to: '/user-consent-and-third-party-applications'
    },
    {
        from: ['/mfa/concepts/guardian'],
        to: '/mfa-in-auth0/auth0-guardian'
    },
    {
        from: ['/mfa/concepts/mfa-api'],
        to: '/mfa-in-auth0/mfa-api'
    },
    {
        from: ['/mfa/concepts/mfa-developer-resources'],
        to: '/mfa-in-auth0/mfa-developer-resources'
    },
    {
        from: ['/mfa/concepts/mfa-factors'],
        to: '/mfa-in-auth0/mfa-factors'
    },
    {
        from: ['/mfa/concepts/step-up-authentication'],
        to: '/mfa-in-auth0/step-up-authentication'
    },
    {
        from: ['/mfa/guides/configure-cisco-duo'],
        to: '/mfa-in-auth0/configure-cisco-duo-for-mfa'
    },
    {
        from: ['/mfa/guides/configure-otp'],
        to: '/mfa-in-auth0/configure-otp-notifications-for-mfa'
    },
    {
        from: ['/mfa/guides/configure-phone'],
        to: '/mfa-in-auth0/configure-sms-and-voice-notifications-for-mfa'
    },
    {
        from: ['/mfa/guides/configure-step-up-apis'],
        to: '/mfa-in-auth0/step-up-authentication/configure-step-up-authentication-for-apis'
    },
    {
        from: ['/mfa/guides/configure-step-up-web-apps'],
        to: '/mfa-in-auth0/step-up-authentication/configure-step-up-authentication-for-web-apps'
    },
    {
        from: ['/mfa/guides/customize-mfa-universal-login'],
        to: '/mfa-in-auth0/customize-mfa-user-pages'
    },
    {
        from: ['/mfa/guides/enable-mfa'],
        to: '/mfa-in-auth0/enable-mfa'
    },
    {
        from: ['/mfa/guides/guardian/create-enrollment-ticket'],
        to: '/mfa-in-auth0/auth0-guardian/create-custom-enrollment-tickets'
    },
    {
        from: ['/mfa/guides/guardian/guardian-ios-sdk'],
        to: '/mfa-in-auth0/auth0-guardian/guardian-for-ios-sdk'
    },
    {
        from: ['/mfa/guides/guardian/install-guardian-sdk'],
        to: '/mfa-in-auth0/auth0-guardian/install-guardian-sdk'
    },
    {
        from: ['/mfa/guides/import-user-mfa'],
        to: '/mfa-in-auth0/import-user-mfa-authenticator-enrollments'
    },
    {
        from: ['/mfa/guides/mfa-api/email'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/enroll-and-challenge-email-authenticators'
    },
    {
        from: ['/mfa/guides/mfa-api/manage'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api'
    },
    {
        from: ['/mfa/guides/mfa-api/otp'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/enroll-and-challenge-otp-authenticators'
    },
    {
        from: ['/mfa/guides/reset-user-mfa'],
        to: '/mfa-in-auth0/reset-user-mfa'
    },
    {
        from: ['/mfa'],
        to: '/mfa-in-auth0'
    },
    {
        from: ['/mfa/references/guardian-error-code-reference'],
        to: '/mfa-in-auth0/auth0-guardian/guardian-error-code-reference'
    },
    {
        from: ['/mfa/references/language-dictionary'],
        to: '/mfa-in-auth0/customize-mfa-user-pages/mfa-theme-language-dictionary'
    },
    {
        from: ['/mfa/references/mfa-widget-reference'],
        to: '/mfa-in-auth0/customize-mfa-user-pages/mfa-widget-theme-options'
    },
    {
        from: ['/mfa/references/troubleshoot-mfa'],
        to: '/mfa-in-auth0/troubleshoot-mfa-issues'
    },
    {
        from: ['/mfa/send-phone-message-hook-amazon-sns'],
        to: '/mfa-in-auth0/configure-amazon-sns-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-esendex'],
        to: '/mfa-in-auth0/configure-esendex-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-infobip'],
        to: '/mfa-in-auth0/configure-infobip-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-mitto'],
        to: '/mfa-in-auth0/configure-mitto-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-telesign'],
        to: '/mfa-in-auth0/configure-telesign-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-twilio'],
        to: '/mfa-in-auth0/configure-twilio-as-mfa-sms-provider'
    },
    {
        from: ['/mfa/send-phone-message-hook-vonage'],
        to: '/mfa-in-auth0/configure-vonage-as-mfa-sms-provider'
    },
    {
        from: ['/integrations/authenticating-a-tessel-device'],
        to: '/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0'
    },
    {
        from: ['/integrations/authenticating-devices-using-mqtt'],
        to: '/integrations/authenticate-devices-using-mqtt'
    },
    {
        from: ['/aws-api-setup'],
        to: '/integrations/how-to-set-up-aws-for-delegated-authentication'
    },
    {
        from: ['/integrations/aws/sso'],
        to: '/configure-amazon-web-services-for-sso'
    },
    {
        from: ['/integrations/aws/tokens'],
        to: '/integrations/call-aws-apis-and-resources-with-tokens'
    },
    {
        from: ['/integrations/aws-api-gateway/custom-authorizers'],
        to: '/integrations/aws-api-gateway-custom-authorizers'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation'],
        to: '/build-a-serverless-application-using-token-based-authentication-with-aws-api'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/part-1'],
        to: '/aws-api-gateway-tutorial-step-1'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/part-2'],
        to: '/aws-api-gateway-tutorial-step-2'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/part-3'],
        to: '/aws-api-gateway-tutorial-step-3'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/part-4'],
        to: '/aws-api-gateway-tutorial-step-4'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/part-5'],
        to: '/aws-api-gateway-tutorial-step-5'
    },
    {
        from: ['/integrations/aws-api-gateway/delegation/secure-api-with-cognito'],
        to: '/secure-aws-api-gateway-using-cognito'
    },
    {
        from: ['/integrations/configure-wsfed-application'],
        to: '/protocols/configure-ws-fed-applications'
    },
    {
        from: ['/integrations/google-cloud-platform'],
        to: '/integrations/google-cloud-endpoints'
    },
    {
        from: ['/integrations/integrating-auth0-amazon-cognito-mobile-apps'],
        to: '/integrations/integrate-with-amazon-cognito'
    },
    {
        from: ['/integrations/marketing/salesforce'],
        to: '/integrations/marketing/export-user-data-salesforce'
    },
    {
        from: ['/integrations/office-365-custom-provisioning'],
        to: '/office-365-custom-provisioning'
    },
    {
        from: ['/integrations/sharepoint-apps'],
        to: '/integrations/connecting-provider-hosted-apps-to-sharepoint-online'
    },
    {
        from: ['/integrations/sharepoint'],
        to: '/integrations/sharepoint-2010-2013'
    },
    {
        from: ['/integrations/using-auth0-to-secure-a-cli'],
        to: '/integrations/secure-a-cli-with-auth0'
    },
    {
        from: ['/identity-labs/01-web-sign-in'],
        to: '/auth0-identity-labs/lab-1-web-sign-in'
    },
    {
        from: ['/identity-labs/01-web-sign-in/exercise-01'],
        to: '/auth0-identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-1'
    },
    {
        from: ['/identity-labs/01-web-sign-in/exercise-02'],
        to: '/auth0-identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-2'
    },
    {
        from: ['/identity-labs/02-calling-an-api'],
        to: '/auth0-identity-labs/identity-lab-2-calling-api'
    },
    {
        from: ['/identity-labs/04-single-page-app'],
        to: '/auth0-identity-labs/lab-4-single-page-app'
    },
    {
        from: ['/identity-labs/02-calling-an-api/exercise-01'],
        to: '/auth0-identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-1'
    },
    {
        from: ['/identity-labs/02-calling-an-api/exercise-02'],
        to: '/auth0-identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-2'
    },
    {
        from: ['/identity-labs/02-calling-an-api/exercise-03'],
        to: '/auth0-identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-3'
    },
    {
        from: ['/identity-labs/03-mobile-native-app/exercise-01'],
        to: '/auth0-identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-1'
    },
    {
        from: ['/identity-labs/03-mobile-native-app/exercise-02'],
        to: '/auth0-identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-2'
    },
    {
        from: ['/identity-labs/03-mobile-native-app/exercise-03'],
        to: '/auth0-identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-3'
    },
    {
        from: ['/identity-labs/04-single-page-app/exercise-01'],
        to: '/auth0-identity-labs/lab-4-single-page-app/identity-lab-4-exercise-1'
    },
    {
        from: ['/identity-labs/04-single-page-app/exercise-02'],
        to: '/auth0-identity-labs/lab-4-single-page-app/identity-lab-4-exercise-2'
    },
    {
        from: ['/users/concepts/overview-progressive-profiling'],
        to: '/users/progressive-profiling'
    },
    {
        from: ['/users/concepts/overview-user-account-linking'],
        to: '/users/user-account-linking'
    },
    {
        from: ['/users/concepts/overview-user-metadata'],
        to: '/users/metadata'
    },
    {
        from: ['/users/concepts/overview-user-migration'],
        to: '/users/import-and-export-users'
    },
    {
        from: ['/users/concepts/overview-user-profile'],
        to: '/users/user-profiles'
    },
    {
        from: ['/users/guides/block-and-unblock-users'],
        to: '/users/block-and-unblock-users'
    },
    {
        from: ['/users/guides/bulk-user-exports'],
        to: '/users/bulk-user-exports'
    },
    {
        from: ['/users/guides/bulk-user-imports'],
        to: '/users/bulk-user-imports'
    },
    {
        from: ['/users/guides/change-user-pictures'],
        to: '/users/change-user-pictures'
    },
    {
        from: ['/users/guides/configure-automatic-migration'],
        to: '/users/configure-automatic-migration-from-your-database'
    },
    {
        from: ['/users/guides/create-users'],
        to: '/users/create-users'
    },
    {
        from: ['/users/guides/delete-users'],
        to: '/users/delete-users'
    },
    {
        from: ['/users/guides/email-verified'],
        to: '/users/verified-email-usage'
    },
    {
        from: ['/users/guides/get-user-information-with-unbounce-landing-pages'],
        to: '/users/get-user-information-on-unbounce-landing-pages'
    },
    {
        from: ['/users/guides/link-user-accounts'],
        to: '/users/link-user-accounts'
    },
    {
        from: ['/users/guides/manage-user-access-to-applications'],
        to: '/users/manage-user-access-to-applications'
    },
    {
        from: ['/users/guides/manage-user-metadata'],
        to: '/users/manage-user-metadata'
    },
    {
        from: ['/users/guides/manage-users-using-the-dashboard'],
        to: '/users/manage-users-using-the-dashboard'
    },
    {
        from: ['/users/guides/manage-users-using-the-management-api'],
        to: '/users/manage-users-using-the-management-api'
    },
    {
        from: ['/users/guides/read-metadata'],
        to: '/users/read-metadata'
    },
    {
        from: ['/users/guides/redirect-users-after-login'],
        to: '/users/redirect-users-after-login'
    },
    {
        from: ['/users/guides/set-metadata-properties-on-creation'],
        to: '/users/set-metadata-properties-on-creation'
    },
    {
        from: ['/users/guides/unlink-user-accounts'],
        to: '/users/unlink-user-accounts'
    },
    {
        from: ['/users/guides/update-metadata-properties-with-management-api'],
        to: '/users/update-metadata-with-the-management-api'
    },
    {
        from: ['/users/guides/update-user-profiles-using-your-database'],
        to: '/users/update-user-profiles-using-your-database'
    },
    {
        from: ['/users/guides/view-users'],
        to: '/users/view-users'
    },
    {
        from: ['/users/normalized/auth0/identify-users'],
        to: '/users/identify-users'
    },
    {
        from: ['/users/normalized/auth0'],
        to: '/users/normalized-user-profiles'
    },
    {
        from: ['/users/normalized/auth0/normalized-user-profile-schema'],
        to: '/users/normalized-user-profile-schema'
    },
    {
        from: ['/users/normalized/auth0/sample-user-profiles'],
        to: '/users/sample-user-profiles'
    },
    {
        from: ['/users/normalized/auth0/store-user-data'],
        to: '/users/store-user-data'
    },
    {
        from: ['/users/normalized/auth0/update-root-attributes'],
        to: '/users/updating-user-profile-root-attributes'
    },
    {
        from: ['/users/normalized/oidc'],
        to: '/users/user-profiles-returned-from-oidc-compliant-pipelines'
    },
    {
        from: ['/users/references/bulk-import-database-schema-examples'],
        to: '/users/bulk-user-import-database-schema-and-examples'
    },
    {
        from: ['/users/references/link-accounts-client-side-scenario'],
        to: '/users/user-initiated-account-linking-client-side-implementation'
    },
    {
        from: ['/users/references/link-accounts-server-side-scenario'],
        to: '/users/suggested-account-linking-server-side-implementation'
    },
    {
        from: ['/users/references/user-data-storage-scenario'],
        to: '/users/user-data-storage-scenario'
    },
    {
        from: ['/users/references/user-migration-scenarios'],
        to: '/users/user-migration-scenarios'
    },
    {
        from: ['/users/references/user-profile-structure'],
        to: '/users/user-profile-structure'
    },
    {
        from: ['/users/search/v3/get-users-by-email-endpoint'],
        to: '/users/user-search/retrieve-users-with-the-get-users-by-email-endpoint'
    },
    {
        from: ['/users/search/v3/get-users-by-id-endpoint'],
        to: '/users/user-search/retrieve-users-with-the-get-users-by-id-endpoint'
    },
    {
        from: ['/users/search/v3/get-users-endpoint'],
        to: '/users/user-search/retrieve-users-with-the-get-users-endpoint'
    },
    {
        from: ['/users/search/v3'],
        to: '/users/user-search'
    },
    {
        from: ['/users/search/v3/query-syntax'],
        to: '/users/user-search/user-search-query-syntax'
    },
    {
        from: ['/users/search/v3/sort-search-results'],
        to: '/users/user-search/sort-search-results'
    },
    {
        from: ['/users/search/v3/view-search-results-by-page'],
        to: '/users/user-search/view-search-results-by-page'
    },
    {
        from: ['/email/providers'],
        to: '/auth0-email-services/configure-external-smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider'
    },
    {
        from: ['/protocols/saml/saml-apps/atlassian'],
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-atlassian'
    },
    {
        from: ['/protocols/oauth2'],
        to: '/protocols/protocol-oauth2'
    },
    {
        from: ['/protocols/oidc'],
        to: '/protocols/openid-connect-protocol'
    },
    {
        from: ['/protocols/saml'],
        to: '/protocols/saml-protocol'
    },
    {
        from: ['/protocols/ws-fed'],
        to: '/protocols/ws-fed-protocol'
    },
    {
        from: ['/protocols/ldap'],
        to: '/protocols/ldap-protocol'
    },
    {
        from: ['/tokens/concepts/signing-algorithms'],
        to: '/tokens/signing-algorithms'
    },
    {
        from: ['/dashboard/guides/applications/register-app-spa'],
        to: '/auth0-applications/register-single-page-app'
    },
    {
        from: ['/universal-login/text-customization-prompts/consent'],
        to: '/universal-login/prompt-consent'
    },
    {
        from: ['/logs/streams/azure-event-grid'],
        to: '/auth0-logs/export-log-events-with-log-streaming/stream-logs-to-azure-event-grid'
    },
    {
        from: ['/logs/streams/http-event-to-slack'],
        to: '/auth0-logs/export-log-events-with-log-streaming/stream-auth0-log-events-to-slack'
    },
    {
        from: ['/mfa/guides/mfa-api/phone'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/enroll-and-challenge-sms-and-voice-authenticators'
    },
    {
        from: ['/mfa/guides/mfa-api/push'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/enroll-and-challenge-push-authenticators'
    },
    {
        from: ['/mfa/guides/mfa-api/recovery-code'],
        to: '/mfa-in-auth0/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api/challenge-with-recovery-codes'
    },
    {
        from: ['/anomaly-detection/references/brute-force-protection-triggers-actions'],
        to: '/anomaly-detection/brute-force-protection-triggers-and-actions'
    }
];
