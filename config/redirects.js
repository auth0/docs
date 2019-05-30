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
    to: '/applications/addons'
  },
  {
    from: '/applications/addons',
    to: '/addons'
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
      '/quickstart/spa/angularjs',
      '/quickstart/spa/aurelia',
      '/quickstart/spa/ember',
      '/quickstart/spa/jquery'
    ],
    to: '/quickstart/spa'
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
    from: '/clients/client-types',
    to: '/applications/application-types'
  },
 {
    from: '/applications/application-types',
    to: '/applications/concepts/app-types-auth0'
  },
  {
    from: '/applications/machine-to-machine',
    to: '/applications/concepts/app-types-auth0'
  },
  {
    from: '/clients/connections',
    to: '/applications/connections'
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
    from: ['/tokens/apiv2', '/api/v2/tokens', '/api/management/v2/concepts/tokens'],
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
    from: ['/refresh-token', '/tokens/refresh_token'],
    to: '/tokens/refresh-token'
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
    from: ['/har', '/tutorials/troubleshootings-with-har-files'],
    to: '/tutorials/troubleshooting-with-har-files'
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
    to: '/appliance/critical-issue'
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
    from: '/tokens/id_token',
    to: '/tokens/id-token'
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
    from: '/hosted-pages/guardian',
    to: '/universal-login/guardian'
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
    from: '/tutorials/troubleshooting-with-har-files',
    to: '/support/troubleshooting-with-har-files',
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
    from: `/link-accounts/auth-api`,
    to: `/link-accounts`
  },
  {
    from: '/videos/session-and-cookies',
    to: '/security/store-tokens'
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
     from: '/support/troubleshooting-with-har-files',
     to: '/troubleshoot/har'
   },
   {
     from: ['/tokens/access-token','/tokens/access_token'],
     to: '/tokens/overview-access-tokens'
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
     to: '/users/guides/implement-progressive-profiling'
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
     to: '/hooks/guides/edit-hooks-using-cli'
   },
   {
     from: '/hooks/cli/enable-disable',
      to: '/hooks/guides/enable-disable-hooks-using-cli'
   },
   {
     from: '/hooks/cli/logs',
     to: '/hooks/guides/logging-hooks-using-cli'
   },
   {
     from: '/hooks/cli',
     to: '/hooks'
   },
   {
     from: ['/multifactor-authentication/yubikey', '/multifactor-authentication/guardian', '/multifactor-authentication/guardian/user-guide'],
     to: '/multifactor-authentication'
   },
   {
     from: '/hooks/dashboard/create-delete',
     to: '/hooks/guides/create-hooks-using-dashboard'
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
  { from: '/rules/current/csharp', to: '/rules/guides/csharp' },
  { from: '/rules/current/management-api', to: '/rules/guides/management-api' },
  {
    from: '/hooks/cli/create-delete',
    to: '/hooks/guides/create-hooks-using-cli'
   },
   {
    from: '/hooks/cli/edit',
    to: '/hooks/guides/edit-hooks-using-cli'
   },
   {
    from: '/hooks/cli/enable-disable',
    to: '/hooks/guides/enable-disable-hooks-using-cli'
   },
   {
    from: '/hooks/cli/index',
    to: '/hooks'
   },
   {
    from: '/hooks/cli/logs',
    to: '/hooks/guides/logging-hooks-using-cli'
   },
   {
    from: '/hooks/dashboard/create-delete',
    to: '/hooks/guides/create-hooks-using-dashboard'
   },
   {
    from: '/hooks/dashboard/edit',
    to: '/hooks/guides/edit-hooks-using-dashboard'
   },
   {
    from: '/hooks/dashboard/enable-disable',
    to: '/hooks/guides/enable-disable-hooks-using-dashboard'
   },
   {
    from: '/hooks/dashboard/index',
    to: '/hooks'
   },
   {
    from: '/hooks/extensibility-points/credentials-exchange',
    to: '/hooks/concepts/credentials-exchange-extensibility-point'
   },
   {
    from: '/hooks/extensibility-points',
    to: '/hooks'
   },
   {
    from: '/hooks/extensibility-points/post-user-registration',
    to: '/hooks/concepts/post-user-registration-extensibility-point'
   },
   {
    from: '/hooks/extensibility-points/pre-user-registration',
    to: '/hooks/concepts/pre-user-registration-extensibility-point'
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
     from: ['/tokens/set-access-token-format','/tokens/access-token-formats'],
     to: '/tokens/reference/access-token/access-token-formats'
    },
    {
      from: '/integrations/using-auth0-as-an-identity-provider-with-github-enterprise',
      to: '/protocols/saml/saml-apps/github-server'
    },
    {
      from: '/tokens/get-access-tokens',
      to: '/tokens/guides/access-token/get-access-tokens'
    },
    {
      from: '/tokens/set-access-token-lifetime',
      to: '/tokens/guides/access-token/set-access-token-lifetime'
    },
    {
      from: '/tokens/use-access-tokens',
      to: '/tokens/guides/access-token/use-access-tokens'
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
      to: '/private-saas-deployment'
    },
    {
      from: '/private-cloud',
      to: '/private-saas-deployment'
    }
];
