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
  'relay',
  'ruby',
  'salesforce-sandbox',
  'salesforce',
  'sap-odata',
  'wcf-service',
  'webapi-owin'
];

const apis = `:api(${apiNames.join('|')})`;

module.exports = [

  /* Quickstart aliases */

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
    from: '/awsapi-tutorial',
    to: '/integrations/aws'
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
    from: '/firebaseapi-tutorial',
    to: '/clients/addons'
  },
  {
    from: '/ionic-tutorial',
    to: '/quickstart/native/ionic'
  },
  {
    from: ['/ios-tutorial', '/native-platforms/ios-objc'],
    to: '/quickstart/native/ios-objc'
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
    from: '/mvc-tutorial-enterprise',
    to: '/tutorials/aspnet-mvc4-enterprise-providers'
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
    from: '/phonegap-plugin-tutorial',
    to: '/native-platforms/cordova'
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
    from: '/salesforcesandboxapi-tutorial',
    to: '/clients/addons'
  },
  {
    from: '/salesforceapi-tutorial',
    to: '/clients/addons'
  },
  {
    from: '/sapapi-tutorial',
    to: '/clients/addons'
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

  /* --- Renamed quickstart articles --- */

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

  /* --- Two-step quickstarts to single-step quickstarts --- */

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

  /* --- Connections --- */

  {
    from: '/37signals-clientid',
    to: '/connections/social/37signals'
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
    from: '/o365-clientid',
    to: '/connections/enterprise/o365-deprecated'
  },
  {
    from: '/oauth2',
    to: '/connections/social/oauth2'
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
    to: '/connections/enterprise/sharepoint-online'
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
    to: '/connections/enterprise/active-directory'
  },
  {
    from: '/adfs',
    to: '/connections/enterprise/adfs'
  },
  {
    from: '/passwordless',
    to: '/connections/passwordless'
  },
  {
    from: '/connections/passwordless/ios-sms',
    to: '/connections/passwordless/ios-sms-objc'
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
    from: '/scenarios/multi-tenant-saas-azure-ad',
    to: '/tutorials/building-multi-tenant-saas-applications-with-azure-active-directory'
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
    from: '/scenarios/zendesk-sso',
    to: '/tutorials/single-sign-on-with-zendesk-using-jwt'
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
    from: '/lock',
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
    to: '/api/management/v1'
  },
  {
    from: ['/api-reference', '/api/v1/reference'],
    to: '/api/management/v1/reference'
  },
  {
    from: '/api/v1/use-cases',
    to: '/api/management/v1/use-cases'
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
    from: ['/tokens/apiv2', '/api/v2/tokens'],
    to: '/api/management/v2/tokens'
  },
  {
    from: ['/metadata-in-rules', '/metadata/rules'],
    to: '/rules/metadata-in-rules'
  },
  {
    from: [
      '/mfa',
      '/multi-factor-authentication',
      '/multi-factor-authentication2',
      '/multifactor-authentication/custom-provider'
    ],
    to: '/multifactor-authentication'
  },
  {
    from: '/multi-factor-authentication/yubikey',
    to: '/multifactor-authentication/yubikey'
  },
  {
    from: '/quickstart',
    to: '/'
  },
  {
    from: '/link-accounts/user-initiated',
    to: '/link-accounts/user-initiated-linking'
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
    from: [
      '/appliance/checksum',
      '/appliance/proxy-updater',
      '/appliance/update',
      '/updating-appliance'
    ],
    to: '/appliance'
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
    from: '/libraries/lock/i18n',
    to: '/libraries/lock/v10/i18n',
    status: 302
  },
  {
    from: '/libraries/lock/migration-guide',
    to: '/libraries/lock/v10/migration-guide',
    status: 302
  },
  {
    from: '/libraries/lock/sending-authentication-parameters',
    to: '/libraries/lock/v10/sending-authentication-parameters',
    status: 302
  },
  {
    from: '/libraries/lock/v10/installation',
    to: '/libraries/lock#lock-10-installation',
    status: 302
  },
  {
    from: '/libraries/lock/customization',
    to: '/libraries/lock/v10/configuration',
    status: 302
  },
  {
    from: '/libraries/lock/display-modes',
    to: '/libraries/lock/v10/customization#container-string-',
    status: 302
  },
  {
    from: '/libraries/lock/ui-customization',
    to: '/libraries/lock/v10/ui-customization',
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
    to: '/multifactor-authentication/developer/step-up-with-acr'
  },
  {
    from: ['/refresh-token', '/tokens/refresh_token'],
    to: '/tokens/refresh-token'
  },
  {
    from: '/tokens/access_token',
    to: '/tokens/access-token'
  },
  {
    from: '/update-client-secret',
    to: '/tutorials/how-to-update-applications-client-secret'
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
    from: ['/custom-signup', '/libraries/lock/v10/custom-signup'],
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
    from: '/monitoring',
    to: '/tutorials/how-to-monitor-auth0'
  },
  {
    from: ['/har', '/tutorials/troubleshootings-with-har-files'],
    to: '/tutorials/troubleshooting-with-har-files'
  },
  {
    from: '/hrd',
    to: '/libraries/lock/v10/selecting-the-connection-for-multiple-logins'
  },
  {
    from: '/blacklist-attributes',
    to: '/tutorials/blacklisting-attributes'
  },
  {
    from: '/brute-force-protection',
    to: '/anomaly-detection/brute-force-protection'
  },
  {
    from: '/breached-password',
    to: '/anomaly-detection/breached-passwords'
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
    from: '/java-overview',
    to: '/dev-centers/java'
  },
  {
    from: ['/oauth-web-protocol', '/protocols/oauth-web-protocol'],
    to: '/protocols/oauth2/oauth-web-protocol'
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
    from: '/applications',
    to: '/clients'
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
    from: ['/error-pages', '/error-pages/generic'],
    to: '/hosted-pages/error-pages'
  },
  {
    from: '/error-pages/custom',
    to: '/hosted-pages/custom-error-pages'
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
    to: '/appliance/critical-issue'
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
    from: '/tokens/id_token',
    to: '/tokens/id-token'
  },
  {
    from: '/connections',
    to: '/identityproviders'
  },
  {
    from: '/anomaly-detection/brute-force-protection',
    to: '/anomaly-detection#brute-force-protection'
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
    from: '/auth0-hooks',
    to: '/hooks'
  },
  {
    from: '/auth0-hooks/cli/create-delete',
    to: '/hooks/cli/create-delete'
  },
  {
    from: '/auth0-hooks/cli/edit',
    to: '/hooks/cli/edit'
  },
  {
    from: '/auth0-hooks/cli/enable-disable',
    to: '/hooks/cli/enable-disable'
  },
  {
    from: '/auth0-hooks/cli',
    to: '/hooks/cli'
  },
  {
    from: '/auth0-hooks/cli/logs',
    to: '/hooks/cli/logs'
  },
  {
    from: '/auth0-hooks/dashboard',
    to: '/hooks/dashboard'
  },
  {
    from: '/auth0-hooks/dashboard/create-delete',
    to: '/hooks/dashboard/create-delete'
  },
  {
    from: '/auth0-hooks/dashboard/edit',
    to: '/hooks/dashboard/edit'
  },
  {
    from: '/auth0-hooks/dashboard/enable-disable',
    to: '/hooks/dashboard/enable-disable'
  },
  {
    from: '/auth0-hooks/extensibility-points',
    to: '/hooks/extensibility-points'
  },
  {
    from: '/auth0-hooks/extensibility-points/client-credentials-exchange',
    to: '/hooks/extensibility-points/client-credentials-exchange'
  },
  {
    from: '/auth0-hooks/extensibility-points/credentials-exchange',
    to: '/hooks/extensibility-points/credentials-exchange'
  },
  {
    from: '/auth0-hooks/extensibility-points/post-user-registration',
    to: '/hooks/extensibility-points/post-user-registration'
  },
  {
    from: '/auth0-hooks/extensibility-points/pre-user-registration',
    to: '/hooks/extensibility-points/pre-user-registration'
  },
  {
    from: '/auth0-hooks/overview',
    to: '/hooks/overview'
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
    from: '/libraries/auth0js',
    to: '/libraries/auth0js/v8'
  },
  {
    from: '/libraries/lock',
    to: '/libraries/lock/v10'
  },
  {
    from: '/libraries/lock-ios',
    to: '/libraries/lock-ios/v2'
  },
  {
    from: '/protocols/oauth2/oauth-implicit-protocol',
    to: '/api-auth/tutorials/implicit-grant'
  },
  {
    from: '/connections/passwordless/spa-sms',
    to: '/connections/passwordless/spa-sms/v8'
  },
  {
    from: '/connections/passwordless/spa-email-code',
    to: '/connections/passwordless/spa-email-code/v8'
  },
  {
    from: '/connections/passwordless/regular-web-app-sms',
    to: '/connections/passwordless/regular-web-app-sms/v8'
  },
  {
    from: '/connections/passwordless/regular-web-app-email-code',
    to: '/connections/passwordless/regular-web-app-email-code/v8'
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
    from: '/quickstart/backend/relay/00-getting-started',
    to: '/quickstart/backend/relay'
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
    to: '/multifactor-authentication/developer/step-up-with-acr'
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
    from: ['/hosted-pages/hosted-login-auth0js'],
    to: '/hosted-pages/login/auth0js'
  },
  {
    from: ['/hosted-pages/hosted-login-auth0js/v8'],
    to: '/hosted-pages/login/auth0js/v8'
  },
  {
    from: ['/hosted-pages/hosted-login-auth0js/v7'],
    to: '/hosted-pages/login/auth0js/v7'
  },
  {
    from: '/connections/database/mysql',
    to: '/connections/database/custom-db'
  },
  {
    from: '/dashboard-account-settings',
    to: '/dashboard-tenant-settings'
  },
  {
    from: '/metadata/lock',
    to: '/metadata#using-lock-to-manage-metadata'
  },
  {
    from: '/libraries/lock/v10/customization',
    to: '/libraries/lock/v10/configuration',
  },
  {
    from: '/libraries/lock/v9/customization',
    to: '/libraries/lock/v9/configuration',
  },
  {
    from: '/libraries/lock/v10/popup-mode',
    to: '/libraries/lock/v10/authentication-modes',
  },
  {
    from: '/libraries/lock/v9/display-modes',
    to: '/libraries/lock/v9/configuration#container-string-',
  },
  {
    from: '/libraries/lock/v9/types-of-applications',
    to: '/libraries/lock/v9/display-modes',
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
    to: '/monitoring/tracking-new-leads-in-salesforce-and-raplead',
  },
  {
    from: '/tutorials/track-signups-enrich-user-profile-generate-leads',
    to: '/monitoring/track-signups-enrich-user-profile-generate-leads',
  },
  {
    from: '/tutorials/how-to-monitor-auth0',
    to: '/monitoring/how-to-monitor-auth0',
  },
  {
    from: '/tutorials/sending-events-to-splunk',
    to: '/monitoring/sending-events-to-splunk',
  },
  {
    from: '/tutorials/sending-events-to-segmentio',
    to: '/monitoring/sending-events-to-segmentio',
  },
  {
    from: '/tutorials/sending-events-to-keenio',
    to: '/monitoring/sending-events-to-keenio',
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
    from: '/tutorials/troubleshooting-with-har-files',
    to: '/support/troubleshooting-with-har-files',
  },
  {
    from: '/tutorials/custom-mfa-rules',
    to: '/multifactor-authentication/custom-mfa-rules',
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
    from: '/tutorials/single-sign-on-with-zendesk-using-jwt',
    to: '/sso/single-sign-on-with-zendesk-using-jwt',
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
    from: '/tutorials/building-multi-tenant-saas-applications-with-azure-active-directory',
    to: '/integrations/building-multi-tenant-saas-applications-with-azure-active-directory',
  },
  {
    from: '/tutorials/creating-users-in-the-management-portal',
    to: '/dashboard/creating-users-in-the-management-portal',
  },
  {
    from: '/tutorials/dashboard-tenant-settings',
    to: '/dashboard/dashboard-tenant-settings',
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
    to: '/clients/how-to-update-client-secret',
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
    to: '/tutorials/google-cloud-platform',
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
    to: '/users/redirecting-users',
  },
  {
    from: '/tutorials/get-user-information-with-unbounce-landing-pages',
    to: '/users/get-user-information-with-unbounce-landing-pages',
  },
  {
    from: '/tutorials/bulk-importing-users-into-auth0',
    to: '/users/bulk-importing-users-into-auth0',
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
  }
];
