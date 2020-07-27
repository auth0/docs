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
    from: '/mvc-tutorial-enterprise',
    to: '/tutorials/aspnet-mvc4-enterprise-providers'
  },
  {
    from: '/migrations',
    to: '/product-lifecycle/migrations'
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
    from: '/overview/apis',
    to: '/api-auth/apis'
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
      from: '/connections/passwordless/faq',
      to: '/connections/passwordless/reference/troubleshoot'
    },
    {
      from: '/best-practices/custom-db-connections-scripts',
      to: '/best-practices/custom-db-connections'
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
  
    /* Private Cloud Redirects */

    {
      from: [
      '/appliance/checksum',
      '/appliance/proxy-updater',
      '/appliance/update',
      '/updating-appliance',
      '/private-saas-deployment',
      '/enterprise/private-cloud/overview',
      '/appliance',
      '/appliance/appliance-overview'
      ],
      to: '/private-cloud'
    },
    {
      from: ['/private-cloud/managed-private-cloud', '/private-cloud/standard-private-cloud', '/private-cloud/managed-private-cloud/raci', '/private-cloud/managed-private-cloud/zones','/private-saas-deployment/private-cloud'],
      to: '/private-cloud/private-cloud-deployments'
    },
    {
      from: ['/appliance/admin', '/appliance/cli', '/appliance/custom-domains', '/appliance/dashboard', '/appliance/monitoring', '/appliance/webtasks'],
      to: '/private-cloud/private-cloud-operations'
    },
    {
      from: ['/private-cloud/onboarding', '/appliance/infrastructure', '/appliance/infrastructure/dns', '/appliance/infrastructure/extensions', '/appliance/infrastructure/faq', '/appliance/infrastructure/infrastructure-overview', '/appliance/infrastructure/installation', '/appliance/infrastructure/internet-restricted-deployment', '/appliance/infrastructure/network', '/appliance/infrastructure/security', '/appliance/infrastructure/virtual-machine'],
      to: '/private-cloud/private-cloud-onboarding'
    },
    {
      from: '/private-cloud/custom-domain-migration',
      to: '/private-cloud/migrate-private-cloud-custom-domains'
    },
    {
      from: ['/private-cloud/onboarding/private-cloud', '/appliance/private-cloud-requirements', '/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements'],
      to: '/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements'
    },
    {
      from: '/private/cloud/onboarding/managed-private-cloud/infrastructure', 
      to: '/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements'
    },
    {
      from: ['/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list', '/appliance/infrastructure/ip-domain-port-list'],
      to: '/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list'
    },
    {
      from: '/private-cloud/onboarding/managed-private-cloud/remote-access-options',
      to: '/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options'
    },

  
    /* Contentful Redirects */
  
    {
        from: '/troubleshoot/concepts/basics',
        to: '/troubleshoot/troubleshoot-basic'
    },
    {
        from: '/pre-deployment/tests/required',
        to: '/pre-deployment/how-to-run-production-checks/production-check-required-fixes'
    },
    {
        from: '/pre-deployment/tests/best-practice',
        to: '/pre-deployment/how-to-run-production-checks/production-checks-best-practices'
    },
    {
        from: '/pre-deployment/tests/recommended',
        to: '/pre-deployment/how-to-run-production-checks/production-check-fixes'
    },
    {
        from: '/identity-labs/01-web-sign-in/exercise-02',
        to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-2'
    },
    {
        from: '/identity-labs/02-calling-an-api',
        to: '/identity-labs/identity-lab-2-calling-api'
    },
    {
        from: '/identity-labs/02-calling-an-api/exercise-01',
        to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-1'
    },
    {
        from: '/identity-labs/02-calling-an-api/exercise-02',
        to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-2'
    },
    {
        from: '/identity-labs/02-calling-an-api/exercise-03',
        to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-3'
    },
    {
        from: '/identity-labs/03-mobile-native-app/exercise-01',
        to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-1'
    },
    {
        from: '/identity-labs/03-mobile-native-app/exercise-02',
        to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-2'
    },
    {
        from: '/identity-labs/03-mobile-native-app/exercise-03',
        to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-3'
    },
    {
        from: '/identity-labs/04-single-page-app/exercise-01',
        to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-1'
    },
    {
        from: '/identity-labs/04-single-page-app/exercise-02',
        to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-2'
    },
    {
        from: '/dev-lifecycle/setting-up-env',
        to: '/dev-lifecycle/set-up-multiple-environments'
    },
    {
        from: '/libraries/auth0js/v9',
        to: '/libraries/auth0js-v9-reference'
    },
    {
        from: '/policies/endpoints',
        to: '/security/public-cloud-service-endpoints'
    },
    {
        from: '/libraries/error-messages',
        to: '/libraries/common-auth0-library-authentication-errors'
    },
    {
        from: '/users/search/v3',
        to: '/users/user-search'
    },
    {
        from: '/users/guides/manage-users-using-the-dashboard',
        to: '/users/manage-users-using-the-dashboard'
    },
    {
        from: '/users/search/v3/get-users-by-email-endpoint',
        to: '/users/user-search/retrieve-users-with-get-users-by-email-endpoint'
    },
    {
        from: '/users/search/v3/get-users-by-id-endpoint',
        to: '/users/user-search/retrieve-users-with-get-users-by-id-endpoint'
    },
    {
        from: '/users/search/v3/query-syntax',
        to: '/users/user-search/user-search-query-syntax'
    },
    {
        from: '/users/concepts/overview-progressive-profiling',
        to: '/users/progressive-profiling'
    },
    {
        from: '/users/concepts/overview-user-account-linking',
        to: '/users/user-account-linking'
    },
    {
        from: '/users/concepts/overview-user-metadata',
        to: '/users/metadata'
    },
    {
        from: '/users/guides/block-and-unblock-users',
        to: '/users/block-and-unblock-users'
    },
    {
        from: '/users/guides/change-user-pictures',
        to: '/users/change-user-picture'
    },
    {
        from: '/users/search/v3/sort-search-results',
        to: '/users/user-search/sort-search-results'
    },
    {
        from: '/protocols/saml/saml-configuration/troubleshoot',
        to: '/troubleshoot/troubleshoot-saml-configurations'
    },
    {
        from: '/protocols/saml/saml2webapp-tutorial',
        to: '/protocols/saml-configuration-options/configure-saml2-web-applications'
    },
    {
        from: '/protocols/saml/saml-configuration/deprovision-users',
        to: '/protocols/saml-configuration-options/deprovision-users-in-saml-integrations'
    },
    {
        from: '/libraries/auth0-spa-js',
        to: '/libraries/auth0-single-page-app-sdk'
    },
    {
        from: '/libraries/auth0-spa-js/migrate-from-auth0js',
        to: '/libraries/auth0-single-page-app-sdk/migrate-from-auth0-js-to-the-auth0-single-page-app-sdk'
    },
    {
        from: '/libraries/lock/v11',
        to: '/libraries/lock'
    },
    {
        from: '/libraries/lock/v11/customizing-error-messages',
        to: '/libraries/lock/customize-lock-error-messages'
    },
    {
        from: '/libraries/lock/v11/authentication-modes',
        to: '/libraries/lock/lock-authentication-modes'
    },
    {
        from: '/libraries/lock/v11/sending-authentication-parameters',
        to: '/libraries/lock/lock-authentication-parameters'
    },
    {
        from: '/libraries/lock/v11/i18n',
        to: '/libraries/lock/lock-internationalization'
    },
    {
        from: '/libraries/lock/v11/api',
        to: '/libraries/lock/lock-api-reference'
    },
    {
        from: '/libraries/secure-local-development',
        to: '/libraries/secure-local-development'
    },
    {
        from: '/protocols/oauth2/oauth-state',
        to: '/protocols/state-parameters'
    },
    {
        from: '/protocols/saml/saml-apps/egencia',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-egencia'
    },
    {
        from: '/libraries/when-to-use-lock',
        to: '/universal-login/universal-login-page-customization'
    },
    {
        from: '/protocols/saml/saml-apps/google-apps',
        to: '/protocols/saml-configuration-options/configure-auth0-as-idp-for-google-g-suite'
    },
    {
        from: '/libraries/lock/v11/selecting-the-connection-for-multiple-logins',
        to: '/libraries/lock/selecting-from-multiple-connection-options'
    },
    {
        from: '/protocols/saml/saml-apps/heroku',
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-heroku'
    },
    {
        from: '/libraries/lock/v11/ui-customization',
        to: '/libraries/lock/lock-ui-customization'
    },
    {
        from: '/libraries/auth0-php/jwt-validation',
        to: '/libraries/auth0-php/validating-jwts-with-auth0-php'
    },
    {
        from: '/protocols/saml/saml-apps/hosted-graphite',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-hosted-graphite'
    },
    {
        from: '/protocols/saml/saml-apps/freshdesk',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk'
    },
    {
        from: '/protocols/saml/saml-apps/litmos',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos'
    },
    {
        from: '/protocols/saml/saml-apps/pluralsight',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-pluralsight'
    },
    {
        from: '/protocols/saml/saml-apps/sprout-video',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video'
    },
    {
        from: '/protocols/saml/saml-apps/tableau-online',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-online'
    },
    {
        from: '/libraries/auth0-php/authentication-api',
        to: '/libraries/auth0-php/using-the-authentication-api-with-auth0-php'
    },
    {
        from: '/protocols/saml/saml-apps/tableau-server',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-server'
    },
    {
        from: '/protocols/saml/saml-apps/workday',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-workday'
    },
    {
        from: '/protocols/saml/saml-apps/datadog',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog'
    },
    {
        from: '/protocols/saml/saml-apps/workpath',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-workpath'
    },
    {
        from: '/protocols/saml/saml-apps/eloqua',
        to: '/protocols/saml-configuration-options/configure-saml2-addon-eloqua'
    },
    {
        from: '/protocols/saml/saml-apps/cisco-webex',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex'
    },
    {
        from: '/libraries/auth0-php/basic-use',
        to: '/libraries/auth0-php/auth0-php-basic-use'
    },
    {
        from: '/protocols/saml/saml-apps/github-server',
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-server'
    },
    {
        from: '/protocols/saml/saml-apps/github-cloud',
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-cloud'
    },
    {
        from: '/libraries/auth0-php/management-api',
        to: '/libraries/auth0-php/using-the-management-api-with-auth0-php'
    },
    {
        from: '/protocols/saml/adfs',
        to: '/protocols/saml-configuration-options/configure-adfs-saml-connections'
    },
    {
        from: '/libraries/lock-android/v2/keystore',
        to: '/libraries/auth0-android/android-development-keystores-hashes'
    },
    {
        from: '/libraries/auth0-php/troubleshooting',
        to: '/libraries/auth0-php/troubleshoot-auth0-php-library'
    },
    {
        from: '/libraries/auth0-android/user-management',
        to: '/libraries/auth0-android/auth0-android-user-management'
    },
    {
        from: '/libraries/lock-android/v2/custom-fields',
        to: '/libraries/lock-android/lock-android-custom-fields-at-signup'
    },
    {
        from: '/users/concepts/overview-user-migration',
        to: '/users/import-and-export-users'
    },
    {
        from: '/libraries/auth0-android/database-authentication',
        to: '/libraries/auth0-android/auth0-android-database-authentication'
    },
    {
        from: '/libraries/auth0-android/passwordless',
        to: '/libraries/auth0-android/auth0-android-passwordless'
    },
    {
        from: '/users/guides/bulk-user-exports',
        to: '/users/bulk-user-exports'
    },
    {
        from: '/libraries/auth0-android/save-and-refresh-tokens',
        to: '/libraries/auth0-android/auth0-android-save-and-renew-tokens'
    },
    {
        from: '/users/guides/configure-automatic-migration',
        to: '/users/configure-automatic-migration-from-your-database'
    },
    {
        from: '/users/guides/create-users',
        to: '/users/create-users'
    },
    {
        from: '/users/guides/delete-users',
        to: '/users/delete-users'
    },
    {
        from: '/protocols/oidc/identity-providers/okta',
        to: '/protocols/configure-okta-as-oidc-identity-provider'
    },
    {
        from: '/integrations/configure-wsfed-application',
        to: '/protocols/configure-ws-fed-applications'
    },
    {
        from: '/protocols/saml/identity-providers/okta',
        to: '/protocols/saml-configuration-options/configure-okta-as-saml-identity-provider'
    },
    {
        from: '/libraries/auth0-swift/passwordless',
        to: '/libraries/auth0-swift/auth0-swift-passwordless'
    },
    {
        from: '/libraries/auth0-swift/save-and-refresh-jwt-tokens',
        to: '/libraries/auth0-swift/auth0-swift-save-and-renew-tokens'
    },
    {
        from: '/libraries/auth0-swift/touchid-authentication',
        to: '/libraries/auth0-swift/auth0-swift-touchid-faceid'
    },
    {
        from: '/libraries/auth0-swift/user-management',
        to: '/libraries/auth0-swift/auth0-swift-user-management'
    },
    {
        from: '/libraries/auth0-swift/database-authentication',
        to: '/libraries/auth0-swift/auth0-swift-database-connections'
    },
    {
        from: '/protocols/saml/idp-initiated-sso',
        to: '/protocols/saml-configuration-options/configure-saml-identity-provider-initiated-single-sign-on'
    },
    {
        from: '/protocols/saml/saml-configuration/saml-assertions',
        to: '/protocols/saml-configuration-options/customize-saml-assertions'
    },
    {
        from: '/protocols/saml/identity-providers/ssocircle',
        to: '/protocols/saml-configuration-options/configure-ssocircle-as-saml-identity-provider'
    },
    {
        from: '/protocols/saml/identity-providers/siteminder',
        to: '/protocols/saml-configuration-options/configure-siteminder-as-saml-identity-provider'
    },
    {
        from: '/libraries/lock-ios/v2/customization',
        to: '/libraries/lock-swift/lock-swift-customization'
    },
    {
        from: '/libraries/lock-ios/v2/passwordless',
        to: '/libraries/lock-swift/lock-swift-passwordless'
    },
    {
        from: '/libraries/lock-ios/v2/logging',
        to: '/libraries/lock-swift/lock-swift-logging'
    },
    {
        from: '/libraries/lock-ios/v2',
        to: '/libraries/lock-swift'
    },
    {
        from: '/protocols/saml/identity-providers/salesforce',
        to: '/protocols/saml-configuration-options/configure-salesforce-as-saml-identity-provider'
    },
    {
        from: '/protocols/saml/identity-providers/ping7',
        to: '/protocols/saml-configuration-options/configure-pingfederate-as-saml-identity-provider'
    },
    {
        from: '/protocols/saml/saml-configuration',
        to: '/protocols/saml-configuration-options'
    },
    {
        from: '/libraries/lock-ios/v2/internationalization',
        to: '/libraries/lock-swift/lock-swift-internationalization'
    },
    {
        from: '/protocols/saml/samlp',
        to: '/protocols/saml-configuration-options/saml-identity-provider-configuration-settings'
    },
    {
        from: '/libraries/lock-ios/v2/custom-fields',
        to: '/libraries/lock-swift/lock-swift-custom-fields-at-signup'
    },
    {
        from: '/protocols/saml/saml-idp-generic',
        to: '/protocols/saml-configuration-options/configure-auth0-as-saml-identity-provider'
    },
    {
        from: '/libraries/lock-ios/v2/configuration',
        to: '/libraries/lock-swift/lock-swift-configuration-options'
    },
    {
        from: '/protocols/saml/identity-providers/onelogin',
        to: '/protocols/saml-configuration-options/configure-onelogin-as-saml-identity-provider'
    },
    {
        from: '/libraries/lock-android/v2',
        to: '/libraries/lock-android'
    },
    {
        from: '/libraries/lock-android/v2/passwordless-magic-link',
        to: '/libraries/lock-android/lock-android-passwordless-with-magic-link'
    },
    {
        from: '/protocols/saml/saml-configuration/auth0-as-service-provider',
        to: '/protocols/saml-configuration-options/configure-auth0-saml-service-provider'
    },
    {
        from: '/libraries/lock-android/v2/passwordless',
        to: '/libraries/lock-android/lock-android-passwordless'
    },
    {
        from: '/libraries/lock-android/v2/internationalization',
        to: '/libraries/lock-android/lock-android-internationalization'
    },
    {
        from: '/libraries/lock-android/v2/delegation-api',
        to: '/libraries/lock-android/lock-android-delegation'
    },
    {
        from: '/libraries/lock-android/v2/custom-authentication-providers',
        to: '/libraries/lock-android/lock-android-custom-authentication-providers'
    },
    {
        from: '/libraries/lock-android/v2/refresh-jwt-tokens',
        to: '/libraries/lock-android/lock-android-refresh-jwt'
    },
    {
        from: '/libraries/lock-android/v2/custom-theming',
        to: '/libraries/lock-android/lock-android-custom-theming'
    },
    {
        from: '/libraries/lock-android/v2/configuration',
        to: '/libraries/lock-android/lock-android-configuration'
    },
    {
        from: '/libraries/lock-android/v2/native-social-authentication',
        to: '/libraries/lock-android/lock-android-native-social-authentication'
    },
    {
        from: '/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider',
        to: '/protocols/saml-configuration-options/configure-auth0-as-service-and-identity-provider'
    },
    {
        from: '/tokens/guides/validate-jwts',
        to: '/tokens/json-web-tokens/validate-json-web-tokens'
    },
    {
        from: '/tokens/concepts/jwks',
        to: '/tokens/json-web-tokens/json-web-key-sets'
    },
    {
        from: '/tokens/guides/validate-id-tokens',
        to: '/tokens/id-tokens/validate-id-tokens'
    },
    {
        from: '/tokens/guides/configure-refresh-token-rotation',
        to: '/tokens/access-tokens/refresh-tokens/configure-refresh-token-rotation'
    },
    {
        from: '/tokens/guides/create-namespaced-custom-claims',
        to: '/tokens/create-namespaced-custom-claims'
    },
    {
        from: '/tokens/concepts/delegation-tokens',
        to: '/tokens/delegation-tokens'
    },
    {
        from: '/tokens/guides/disable-refresh-token-rotation',
        to: '/tokens/access-tokens/refresh-tokens/disable-refresh-token-rotation'
    },
    {
        from: '/tokens/guides/get-access-tokens',
        to: '/tokens/access-tokens/get-access-tokens'
    },
    {
        from: '/tokens/guides/get-id-tokens',
        to: '/tokens/id-tokens/get-id-tokens'
    },
    {
        from: '/tokens/guides/get-refresh-tokens',
        to: '/tokens/access-tokens/refresh-tokens/get-refresh-tokens'
    },
    {
        from: '/tokens/concepts/idp-access-tokens',
        to: '/tokens/identity-provider-access-tokens'
    },
    {
        from: ['/tokens/overview-id-tokens','/tokens/id-token', '/tokens/concepts/id-tokens', '/tokens/id_token', '/tokens/id-token'],
        to: '/tokens/id-tokens'
    },
    {
        from: '/tokens/references/id-token-structure',
        to: '/tokens/id-tokens/id-token-structure'
    },
    {
        from: '/tokens/references/jwks-properties',
        to: '/tokens/json-web-tokens/json-web-key-set-properties'
    },
    {
        from: '/tokens/concepts/jwt-claims',
        to: '/tokens/json-web-tokens/json-web-token-claims'
    },
    {
        from: '/migrations/guides/account-linking',
        to: '/product-lifecycle/deprecations-and-migrations/link-user-accounts-with-access-tokens-migration'
    },
    {
        from: '/tokens/references/jwt-structure',
        to: '/tokens/json-web-tokens/json-web-token-structure'
    },
    {
        from: '/migrations/guides/calling-api-with-idtokens',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-calling-api-with-access-tokens'
    },
    {
        from: '/tokens/concepts/refresh-token-rotation',
        to: '/tokens/access-tokens/refresh-tokens/refresh-token-rotation'
    },
    {
        from: '/tokens/guides/revoke-refresh-tokens',
        to: '/tokens/access-tokens/refresh-tokens/revoke-refresh-tokens'
    },
    {
        from: '/tokens/guides/validate-access-tokens',
        to: '/tokens/access-tokens/validate-access-tokens'
    },
    {
        from: '/tokens/guides/revoke-tokens',
        to: '/tokens/revoke-tokens'
    },
    {
        from: '/tokens/concepts/jwts',
        to: '/tokens/json-web-tokens'
    },
    {
        from: '/tokens/guides/locate-jwks',
        to: '/tokens/json-web-tokens/json-web-key-sets/locate-json-web-key-sets'
    },
    {
        from: '/tokens/concepts/refresh-tokens',
        to: '/tokens/access-tokens/refresh-tokens'
    },
    {
        from: '/tokens/guides/use-access-tokens',
        to: '/tokens/access-tokens/use-access-tokens'
    },
    {
        from: '/tokens/guides/use-refresh-token-rotation',
        to: '/tokens/access-tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation'
    },
    {
        from: '/tokens/guides/use-refresh-tokens',
        to: '/tokens/access-tokens/refresh-tokens/use-refresh-tokens'
    },
    {
        from: '/tokens/concepts/access-tokens',
        to: '/tokens/access-tokens'
    },
    {
        from: '/protocols/oidc/openid-connect-discovery',
        to: '/protocols/configure-applications-with-oidc-discovery'
    },
    {
        from: '/design/using-auth0-with-multi-tenant-apps',
        to: '/best-practices/multi-tenant-apps-best-practices'
    },
    {
        from: '/design/browser-based-vs-native-experience-on-mobile',
        to: '/best-practices/mobile-device-login-flow-best-practices'
    },
    {
        from: '/best-practices/rules',
        to: '/best-practices/rules-best-practices'
    },
    {
        from: '/best-practices/custom-db-connections/security',
        to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-security-best-practices'
    },
    {
        from: '/best-practices/operations',
        to: '/best-practices/general-usage-and-operations-best-practices'
    },
    {
        from: '/best-practices/error-handling',
        to: '/best-practices/error-handling-best-practices'
    },
    {
        from: '/best-practices/custom-db-connections/environment',
        to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-action-script-best-practices'
    },
    {
        from: '/best-practices/custom-db-connections/anatomy',
        to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-anatomy-best-practices'
    },
    {
        from: '/best-practices/custom-db-connections/execution',
        to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-database-action-script-execution-best-practices'
    },
    {
        from: '/best-practices/deployment',
        to: '/best-practices/deployment-best-practices'
    },
    {
        from: '/best-practices/testing',
        to: '/best-practices/rules-testing-best-practices'
    },
    {
        from: '/best-practices/performance',
        to: '/best-practices/performance-best-practices'
    },
    {
        from: '/best-practices/search-best-practices',
        to: '/best-practices/user-search-best-practices'
    },
    {
        from: '/best-practices/debugging',
        to: '/best-practices/debugging-best-practices'
    },
    {
        from: '/best-practices/application-settings',
        to: '/best-practices/app-settings-best-practices'
    },
    {
        from: '/best-practices/connection-settings',
        to: '/best-practices/connection-settings-best-practices'
    },
    {
        from: '/best-practices/tenant-settings',
        to: '/best-practices/tenant-settings-best-practices'
    },
    {
        from: '/best-practices/custom-db-connections',
        to: '/best-practices/custom-database-connection-and-action-script-best-practices'
    },
    {
        from: '/compliance/gdpr/data-processing',
        to: '/compliance-and-certifications/data-processing'
    },
    {
        from: '/compliance/gdpr',
        to: '/compliance-and-certifications/auth0-gdpr-compliance'
    },
    {
        from: '/compliance',
        to: '/compliance-and-certifications'
    },
    {
        from: '/compliance/gdpr/features-aiding-compliance/data-minimization',
        to: '/compliance-and-certifications/auth0-gdpr-compliance/gdpr-data-minimization'
    },
    {
        from: '/compliance/gdpr/features-aiding-compliance/data-portability',
        to: '/compliance-and-certifications/auth0-gdpr-compliance/gdpr-data-portability'
    },
    {
        from: '/compliance/gdpr/features-aiding-compliance/right-to-access-data',
        to: '/compliance-and-certifications/auth0-gdpr-compliance/gdpr-right-to-access-correct-and-erase-data'
    },
    {
        from: '/compliance/gdpr/features-aiding-compliance/user-consent',
        to: '/compliance-and-certifications/auth0-gdpr-compliance/gdpr-conditions-for-consent'
    },
    {
        from: '/compliance/gdpr/features-aiding-compliance/protect-user-data',
        to: '/compliance-and-certifications/auth0-gdpr-compliance/gdpr-protect-and-secure-user-data'
    },
    {
        from: '/connector/client-certificates',
        to: '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-client-certificates'
    },
    {
        from: '/connector/kerberos',
        to: '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-kerberos'
    },
    {
        from: '/connector/troubleshooting',
        to: '/ad-ldap-connector/troubleshoot-ad-ldap-connector'
    },
    {
        from: '/connector/prerequisites',
        to: '/ad-ldap-connector/ad-ldap-connector-requirements'
    },
    {
        from: '/connector/install',
        to: '/ad-ldap-connector/install-configure-ad-ldap-connectors'
    },
    {
        from: '/connector/update',
        to: '/ad-ldap-connector/update-ad-ldap-connectors'
    },
    {
        from: '/connector/scom-monitoring',
        to: '/ad-ldap-connector/ad-ldap-connector-scorm'
    },
    {
        from: '/connector/modify',
        to: '/ad-ldap-connector/ad-ldap-connectors-to-auth0'
    },
    {
        from: '/connector/test-dc',
        to: '/ad-ldap-connector/ad-ldap-connector-test-environment'
    },
    {
        from: '/connector/high-availability',
        to: '/ad-ldap-connector/ad-ldap-high-availability'
    },
    {
        from: '/connector',
        to: '/ad-ldap-connector'
    },
    {
        from: '/guides/ip-whitelist',
        to: '/security/whitelist-ip-addresses'
    },
    {
        from: '/guides/login/universal-vs-embedded',
        to: '/universal-login/universal-vs-embedded-login'
    },
    {
        from: '/guides/migration-legacy-flows',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-from-legacy-auth-flows'
    },
    {
        from: '/guides/login/migration-embedded-universal',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-from-embedded-login-to-universal-login'
    },
    {
        from: '/guides/login/migrating-lock-v10-spa',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-spas-using-lock-10-to-universal-login'
    },
    {
        from: '/getting-started/the-basics',
        to: '/get-started/learn-the-basics'
    },
    {
        from: '/getting-started',
        to: '/get-started'
    },
    {
        from: '/logs/guides/retrieve-logs-mgmt-api',
        to: '/logs/retrieve-log-events-using-mgmt-api'
    },
    {
        from: '/logs/streams',
        to: '/logs/export-log-events-with-log-streaming'
    },
    {
        from: '/logs/streams/datadog',
        to: '/logs/export-log-events-with-log-streaming/stream-logs-to-datadog'
    },
    {
        from: '/logs/streams/amazon-eventbridge',
        to: '/logs/export-log-events-with-log-streaming/stream-logs-to-amazon-eventbridge'
    },
    {
        from: '/logs/streams/http-event',
        to: '/logs/export-log-events-with-log-streaming/stream-http-event-logs'
    },
    {
        from: '/logs/guides/migrate-logs-v2-v3',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3'
    },
    {
        from: '/logs/references/log-data-retention',
        to: '/logs/log-data-retention'
    },
    {
        from: '/migrations/guides/yahoo-userinfo-updates',
        to: '/product-lifecycle/deprecations-and-migrations/yahoo-api-changes'
    },
    {
        from: '/migrations/guides/extensibility-node12',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12'
    },
    {
        from: '/migrations/guides/migration-oauthro-oauthtoken',
        to: '/product-lifecycle/deprecations-and-migrations/migration-oauthro-oauthtoken'
    },
    {
        from: '/migrations/guides/management-api-v1-v2',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-management-api-v2'
    },
    {
        from: '/migrations/guides/passwordless-start',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-passwordless'
    },
    {
        from: '/migrations/guides/facebook-graph-api-deprecation',
        to: '/facebook-graph-api-changes'
    },
    {
        from: '/migrations/guides/instagram-deprecation',
        to: '/product-lifecycle/deprecations-and-migrations/instagram-connection-deprecation'
    },
    {
        from: '/sessions/concepts/cookie-attributes',
        to: '/sessions-and-cookies/samesite-cookie-attribute-changes'
    },
    {
        from: '/migrations/guides/facebook-social-context',
        to: '/product-lifecycle/deprecations-and-migrations/facebook-social-context-field-deprecation'
    },
    {
        from: '/migrations/guides/clickjacking-protection',
        to: '/product-lifecycle/deprecations-and-migrations/clickjacking-protection-for-universal-login'
    },
    {
        from: '/migrations/guides/migration-oauthro-oauthtoken-pwdless',
        to: '/product-lifecycle/deprecations-and-migrations/resource-owner-passwordless-credentials-exchange'
    },
    {
        from: '/monitoring/guides/monitor-using-SCOM',
        to: '/monitor-auth0/monitor-using-scom'
    },
    {
        from: '/monitoring/guides/check-external-services',
        to: '/monitor-auth0/check-external-services-status'
    },
    {
        from: '/monitoring/guides/monitor-applications',
        to: '/monitor-auth0/monitor-applications'
    },
    {
        from: '/monitoring/guides/track-leads-salesforce',
        to: '/monitor-auth0/track-new-leads-in-salesforce'
    },
    {
        from: '/monitoring/guides/test-testall-endpoints',
        to: '/monitor-auth0/check-auth-and-supporting-services'
    },
    {
        from: '/monitoring/guides/track-signups-salesforce',
        to: '/monitor-auth0/track-new-sign-ups-in-salesforce'
    },
    {
        from: '/monitoring/guides/check-status',
        to: '/monitor-auth0/check-auth0-status'
    },
    {
        from: '/monitoring',
        to: '/monitor-auth0'
    },
    {
        from: '/policies/legacy-rate-limits',
        to: '/policies/rate-limit-policy/mgmt-api-endpoint-rate-limits-before-19-may-2020'
    },
    {
        from: '/policies/rate-limits',
        to: '/policies/rate-limit-policy'
    },
    {
        from: '/policies/billing',
        to: '/policies/billing-policy'
    },
    {
        from: '/policies/rate-limits-auth-api',
        to: '/policies/rate-limit-policy/authentication-api-endpoint-rate-limits'
    },
    {
        from: '/policies/dashboard-authentication',
        to: '/policies/dashboard-authentication-policy'
    },
    {
        from: '/policies/data-export',
        to: '/policies/data-export-and-transfer-policy'
    },
    {
        from: '/policies/penetration-testing',
        to: '/policies/penetration-testing-policy'
    },
    {
        from: '/policies/load-testing',
        to: '/policies/load-testing-policy'
    },
    {
        from: '/policies/rate-limits-mgmt-api',
        to: '/policies/rate-limit-policy/management-api-endpoint-rate-limits'
    },
    {
        from: '/policies/entity-limits',
        to: '/policies/entity-limit-policy'
    },
    {
        from: '/errors/deprecation-errors',
        to: '/product-lifecycle/deprecations-and-migrations/search-logs-for-deprecation-errors'
    },
    {
        from: '/migrations/past-migrations',
        to: '/product-lifecycle/deprecations-and-migrations/past-migrations'
    },
    {
        from: '/product-lifecycle/migrations',
        to: '/product-lifecycle/deprecations-and-migrations'
    },
    {
        from: '/security/bulletins',
        to: '/security'
    },
    {
        from: '/security/bulletins/cve-2019-20174',
        to: '/security/security-update-for-auth0-lock-library'
    },
    {
        from: '/security/bulletins/cve-2020-5263',
        to: '/security/security-update-for-auth0-js-library'
    },
    {
        from: '/security/bulletins/cve-2019-20173',
        to: '/security/security-update-for-wordpress-plugin'
    },
    {
        from: '/security/common-threats',
        to: '/security/prevent-common-cybersecurity-threats'
    },
    {
        from: '/sessions/concepts/cookies',
        to: '/sessions-and-cookies/cookies'
    },
    {
        from: '/security/bulletins/cve-2019-13483',
        to: '/security/security-vulnerability-in-passport-sharepoint'
    },
    {
        from: '/security/bulletins/cve-2019-16929',
        to: '/security/security-vulnerability-in-auth0-net'
    },
    {
        from: '/security/bulletins/cve-2018-11537',
        to: '/security/security-update-for-angular-jwt-whitelist-bypass'
    },
    {
        from: '/security/bulletins/cve-2018-15121',
        to: '/security/security-vulnerability-in-auth0-aspnet-and-auth0-aspnet-owin'
    },
    {
        from: '/security/bulletins/cve-2019-7644',
        to: '/security/security-bulletins-cve-2019-7644'
    },
    {
        from: '/security/bulletins/cve-2018-7307',
        to: '/security/security-bulletin-cve-2018-7307'
    },
    {
        from: '/security/bulletins/cve-2017-17068',
        to: '/security/security-bulletins-cve-2017-17068'
    },
    {
        from: '/security/bulletins/2019-01-10_rules',
        to: '/security/auth0-security-bulletin-for-rules'
    },
    {
        from: '/security/bulletins/cve-2018-6874',
        to: '/security/security-bulletings-cve-2018-6874'
    },
    {
        from: '/security/bulletins/cve-2017-16897',
        to: '/security/security-bulletins-cve-2017-16897'
    },
    {
        from: '/security/bulletins/cve-2018-6873',
        to: '/security/security-bulletin-cve-2018-6873'
    },
    {
        from: '/security/bulletins/2020-03-31_wpauth0',
        to: '/security/security-bulletins-2020-03-31-wpauth0'
    },
    {
        from: '/security/bulletins/2019-09-05_scopes',
        to: '/security/security-bulletin-2019-09-05-scopes'
    },
    {
        from: '/services/performance-scalability',
        to: '/professional-services/performance-and-scalability-services'
    },
    {
        from: '/services/custom-implementation',
        to: '/professional-services/custom-implementation-services'
    },
    {
        from: '/services',
        to: '/professional-services'
    },
    {
        from: '/services/architectural-design',
        to: '/professional-services/architectural-design-services'
    },
    {
        from: '/services/solution-design',
        to: '/professional-services/solution-design-services'
    },
    {
        from: '/services/scenario-guidance',
        to: '/professional-services/advisory-sessions'
    },
    {
        from: '/sessions',
        to: '/sessions-and-cookies'
    },
    {
        from: '/sessions/references/sample-use-cases-sessions',
        to: '/sessions-and-cookies/session-use-cases'
    },
    {
        from: '/sessions/references/example-short-lived-session-mgmt',
        to: '/sessions-and-cookies/manage-multi-site-short-long-lived-sessions'
    },
    {
        from: '/support/delete-reset-tenant',
        to: '/support/delete-or-reset-tenant'
    },
    {
        from: '/support/removing-auth0-exporting-data',
        to: '/support/export-data'
    },
    {
        from: '/support/testing',
        to: '/support/predeployment-tests'
    },
    {
        from: '/support/sld',
        to: '/support/services-level-descriptions'
    },
    {
        from: '/support/cancel-paid-subscriptions',
        to: '/support/downgrade-or-cancel-subscriptions'
    },
    {
        from: '/support/how-auth0-versions-software',
        to: '/support/versioning-strategy'
    },
    {
        from: '/support/subscription',
        to: '/support/manage-subscriptions'
    },
    {
        from: '/support/matrix',
        to: '/support/product-support-matrix'
    },
    {
        from: '/support/reset-account-password',
        to: '/support/reset-account-passwords'
    },
    {
        from: '/support/tickets',
        to: '/support/open-and-manage-support-tickets'
    },
    {
        from: '/anomaly-detection/concepts/breached-passwords',
        to: '/anomaly-detection/breached-password-security'
    },
    {
        from: '/users/guides/get-user-information-with-unbounce-landing-pages',
        to: '/users/get-user-information-on-unbounce-landing-pages'
    },
    {
        from: '/users/guides/manage-user-access-to-applications',
        to: '/users/manage-user-access-to-applications'
    },
    {
        from: '/users/guides/manage-user-metadata',
        to: '/users/manage-user-metadata'
    },
    {
        from: '/users/guides/manage-users-using-the-management-api',
        to: '/users/manage-users-using-the-management-api'
    },
    {
        from: '/anomaly-detection/guides/customize-blocked-account-emails',
        to: '/anomaly-detection/customize-blocked-account-emails'
    },
    {
        from: '/users/search/v3/view-search-results-by-page',
        to: '/users/user-search/view-search-results-by-page'
    },
    {
        from: '/users/search/v3/get-users-endpoint',
        to: '/users/user-search/retrieve-users-with-the-get-users-endpoint'
    },
    {
        from: '/users/references/user-profile-structure',
        to: '/users/user-profile-structure'
    },
    {
        from: '/anomaly-detection/guides/use-tenant-data-for-anomaly-detection',
        to: '/anomaly-detection/view-anomaly-detection-events'
    },
    {
        from: '/email',
        to: '/auth0-email-services'
    },
    {
        from: '/users/concepts/overview-user-profile',
        to: '/users/user-profiles'
    },
    {
        from: '/email/providers',
        to: '/auth0-email-services/configure-external-smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider'
    },
    {
        from: '/users/references/user-data-storage-scenario',
        to: '/users/user-data-storage-scenario'
    },
    {
        from: '/users/guides/link-user-accounts',
        to: '/users/link-user-accounts'
    },
    {
        from: '/users/guides/read-metadata',
        to: '/users/read-metadata'
    },
    {
        from: '/users/guides/redirect-users-after-login',
        to: '/users/redirect-users-after-login'
    },
    {
        from: '/users/guides/set-metadata-properties-on-creation',
        to: '/users/set-metadata-properties-on-creation'
    },
    {
        from: '/users/guides/unlink-user-accounts',
        to: '/users/unlink-user-accounts'
    },
    {
        from: '/email/testing',
        to: '/auth0-email-services/configure-external-smtp-email-providers/configure-test-smtp-email-servers'
    },
    {
        from: '/email/custom',
        to: '/auth0-email-services/manage-email-flow'
    },
    {
        from: '/users/guides/email-verified',
        to: '/users/verified-email-usage'
    },
    {
        from: '/users/guides/update-metadata-properties-with-management-api',
        to: '/users/update-metadata-with-the-management-api'
    },
    {
        from: '/users/guides/update-user-profiles-using-your-database',
        to: '/users/update-user-profiles-using-your-database'
    },
    {
        from: '/users/guides/view-users',
        to: '/users/view-user-details'
    },
    {
        from: '/users/normalized/auth0',
        to: '/users/normalized-user-profiles'
    },
    {
        from: '/users/normalized/auth0/normalized-user-profile-schema',
        to: '/users/normalized-user-profile-schema'
    },
    {
        from: '/users/normalized/auth0/sample-user-profiles',
        to: '/users/sample-user-profiles'
    },
    {
        from: '/users/normalized/auth0/update-root-attributes',
        to: '/users/updating-user-profile-root-attributes'
    },
    {
        from: '/users/references/link-accounts-client-side-scenario',
        to: '/users/user-initiated-account-linking-client-side-implementation'
    },
    {
        from: '/email/templates',
        to: '/auth0-email-services/customize-email-templates'
    },
    {
        from: '/email/liquid-syntax',
        to: '/auth0-email-services/customize-email-templates/use-liquid-syntax-in-email-templates'
    },
    {
        from: '/users/references/link-accounts-server-side-scenario',
        to: '/users/suggested-account-linking-server-side-implementation'
    },
    {
        from: '/users/normalized/auth0/store-user-data',
        to: '/users/store-user-data'
    },
    {
        from: '/users/references/user-migration-scenarios',
        to: '/users/user-migration-scenarios'
    },
    {
        from: '/users/normalized/auth0/identify-users',
        to: '/users/identify-users'
    },
    {
        from: '/users/references/bulk-import-database-schema-examples',
        to: '/users/bulk-user-import-database-schema-and-examples'
    },
    {
        from: '/users/guides/bulk-user-imports',
        to: '/users/bulk-user-imports'
    },
    {
        from: '/logout/guides/logout-applications',
        to: '/logout/log-users-out-of-applications'
    },
    {
        from: '/logout/guides/logout-auth0',
        to: '/logout/log-users-out-of-auth0'
    },
    {
        from: '/logout/guides/logout-saml-idps',
        to: '/logout/log-users-out-of-saml-idps'
    },
    {
        from: '/logout/guides/logout-idps',
        to: '/logout/log-users-out-of-idps'
    },
    {
        from: '/logout/guides/redirect-users-after-logout',
        to: '/logout/redirect-users-after-logout'
    },
    {
        from: '/applications/concepts/app-types-confidential-public',
        to: '/applications/confidential-and-public-applications'
    },
    {
        from: '/applications/concepts/app-types-first-third-party',
        to: '/applications/first-party-and-third-party-applications'
    },
    {
        from: '/applications/concepts/application-grant-types',
        to: '/applications/application-grant-types'
    },
    {
        from: '/applications/reference/wildcard-subdomains',
        to: '/applications/wildcards-for-subdomains'
    },
    {
        from: '/applications/guides/enable-third-party-apps',
        to: '/applications/enable-third-party-applications'
    },
    {
        from: '/extensions/visual-studio-team-services-deploy',
        to: '/extensions/visual-studio-team-services-deployments'
    },
    {
        from: '/extensions/user-import-export',
        to: '/extensions/user-import-export-extension'
    },
    {
        from: '/extensions/troubleshoot',
        to: '/extensions/troubleshoot-extensions'
    },
    {
        from: '/extensions/sumologic',
        to: '/extensions/auth0-logs-to-sumo-logic'
    },
    {
        from: '/extensions/splunk',
        to: '/extensions/export-logs-to-splunk'
    },
    {
        from: '/extensions/segment',
        to: '/extensions/export-logs-to-segment'
    },
    {
        from: '/extensions/papertrail',
        to: '/extensions/export-logs-to-papertrail'
    },
    {
        from: '/extensions/mixpanel',
        to: '/extensions/export-logs-to-mixpanel'
    },
    {
        from: '/extensions/logstash',
        to: '/extensions/export-logs-to-logstash'
    },
    {
        from: '/extensions/loggly',
        to: '/extensions/export-logs-to-loggly'
    },
    {
        from: '/extensions/logentries',
        to: '/extensions/export-logs-to-logentries'
    },
    {
        from: '/extensions/cloudwatch',
        to: '/extensions/export-logs-to-cloudwatch'
    },
    {
        from: '/extensions/application-insight',
        to: '/extensions/export-logs-to-application-insights'
    },
    {
        from: '/extensions/azure-blob-storage',
        to: '/extensions/export-logs-to-azure-blob-storage'
    },
    {
        from: '/extensions/realtime-webtask-logs',
        to: '/extensions/real-time-webtask-logs'
    },
    {
        from: '/extensions/management-api-webhooks',
        to: '/extensions/auth0-management-api-webhooks'
    },
    {
        from: '/extensions/authentication-api-webhooks',
        to: '/extensions/auth0-authentication-api-webhooks'
    },
    {
        from: '/extensions/adldap-connector',
        to: '/extensions/ad-ldap-connector-health-monitor'
    },
    {
        from: '/extensions/authentication-api-debugger',
        to: '/extensions/authentication-api-debugger-extension'
    },
    {
        from: '/extensions/custom-social-extensions',
        to: '/extensions/custom-social-connections'
    },
    {
        from: '/extensions/bitbucket-deploy',
        to: '/extensions/bitbucket-deployments'
    },
    {
        from: '/extensions/github-deploy',
        to: '/extensions/github-deployments'
    },
    {
        from: '/extensions/gitlab-deploy',
        to: '/extensions/gitlab-deployments'
    },
    {
        from: '/branding-customization',
        to: '/brand-and-customize'
    },
    {
        from: '/custom-domains/additional-configuration',
        to: '/custom-domains/configure-features-to-use-custom-domains'
    },
    {
        from: '/custom-domains/troubleshoot',
        to: '/custom-domains/troubleshoot-custom-domains'
    },
    {
        from: '/hooks/view',
        to: '/hooks/view-hooks'
    },
    {
        from: '/hooks/view-logs',
        to: '/hooks/view-logs-for-hooks'
    },
    {
        from: '/sso/current/outbound',
        to: '/sso/outbound-single-sign-on'
    },
    {
        from: '/sso/current/relevant-api-endpoints',
        to: '/sso/api-endpoints-for-single-sign-on'
    },
    {
        from: '/sso/current/inbound',
        to: '/sso/inbound-single-sign-on'
    },
    {
        from: '/sso/current',
        to: '/sso'
    },
    {
        from: '/hooks/update',
        to: '/hooks/update-hooks'
    },
    {
        from: '/hooks/enable-disable',
        to: '/hooks/enable-disable-hooks'
    },
    {
        from: '/hooks/delete',
        to: '/hooks/delete-hooks'
    },
    {
        from: '/hooks/create',
        to: '/hooks/create-hooks'
    },
    {
        from: '/hooks/secrets',
        to: '/hooks/hook-secrets'
    },
    {
        from: '/hooks/secrets/view',
        to: '/hooks/hook-secrets/view-hook-secrets'
    },
    {
        from: '/hooks/secrets/update',
        to: '/hooks/hook-secrets/update-hook-secrets'
    },
    {
        from: '/hooks/secrets/delete',
        to: '/hooks/hook-secrets/delete-hook-secrets'
    },
    {
        from: '/hooks/secrets/create',
        to: '/hooks/hook-secrets/create-hook-secrets'
    },
    {
        from: '/rules/guides/cache-resources',
        to: '/rules/cache-expensive-resources-in-rules'
    },
    {
        from: '/rules/guides/debug',
        to: '/rules/debug-rules'
    },
    {
        from: '/rules/references/user-object',
        to: '/rules/user-object-in-rules'
    },
    {
        from: '/hooks/extensibility-points/send-phone-message',
        to: '/hooks/send-phone-message'
    },
    {
        from: '/custom-domains/set-up-cloudfront',
        to: '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy'
    },
    {
        from: '/custom-domains/set-up-cloudflare',
        to: '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy'
    },
    {
        from: '/custom-domains/set-up-azure-cdn',
        to: '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy'
    },
    {
        from: '/custom-domains/self-managed-certificates',
        to: '/custom-domains/configure-custom-domains-with-self-managed-certificates'
    },
    {
        from: '/custom-domains/auth0-managed-certificates',
        to: '/custom-domains/configure-custom-domains-with-auth0-managed-certificates'
    },
    {
        from: '/dashboard/guides/extensions/sso-dashboard-create-app',
        to: '/get-started/dashboard/create-sso-dashboard-application'
    },
    {
        from: '/dashboard',
        to: '/get-started/dashboard'
    },
    {
        from: '/dashboard/guides/apis/add-permissions-apis',
        to: '/get-started/dashboard/add-api-permissions'
    },
    {
        from: '/dashboard/guides/apis/delete-permissions-apis',
        to: '/get-started/dashboard/delete-api-permissions'
    },
    {
        from: '/dashboard/guides/apis/enable-rbac',
        to: '/authorization/rbac/enable-role-based-access-control-for-apis'
    },
    {
        from: '/getting-started/deployment-models',
        to: '/get-started/deployment-options'
    },
    {
        from: '/dashboard/reference/settings-api',
        to: '/get-started/dashboard/api-settings'
    },
    {
        from: '/getting-started/set-up-api',
        to: '/get-started/set-up-apis'
    },
    {
        from: '/dashboard/guides/apis/update-token-lifetime',
        to: '/tokens/access-tokens/update-access-token-lifetime'
    },
    {
        from: '/protocols/oauth2',
        to: '/protocols/protocol-oauth2'
    },
    {
        from: '/protocols/oidc',
        to: '/protocols/openid-connect-protocol'
    },
    {
        from: '/protocols/saml',
        to: '/protocols/saml-protocol'
    },
    {
        from: '/flows',
        to: '/authorization/flows'
    },
    {
        from: '/protocols/ws-fed',
        to: '/protocols/ws-fed-protocol'
    },
    {
        from: '/protocols/ldap',
        to: '/protocols/ldap-protocol'
    },
    {
        from: '/dashboard/guides/applications/enable-android-app-links',
        to: '/applications/enable-android-app-links-support'
    },
    {
        from: '/dashboard/guides/applications/enable-sso-app',
        to: '/sso/enable-sso-for-applications'
    },
    {
        from: '/videos/get-started',
        to: '/videos/get-started-series'
    },
    {
        from: '/videos/learn-identity',
        to: '/videos/learn-identity-series'
    },
    {
        from: '/dashboard/guides/tenants/enable-sso-tenant',
        to: '/get-started/dashboard/enable-sso-for-legacy-tenants'
    },
    {
        from: '/videos/learn-identity/01-introduction-to-identity',
        to: '/videos/learn-identity-series/introduction-to-identity'
    },
    {
        from: '/videos/learn-identity/02-oidc-and-oauth',
        to: '/videos/learn-identity-series/openid-connect-and-oauth2'
    },
    {
        from: '/videos/learn-identity/03-web-sign-in',
        to: '/videos/learn-identity-series/web-sign-in'
    },
    {
        from: '/videos/learn-identity/04-calling-an-api',
        to: '/videos/learn-identity-series/calling-an-api'
    },
    {
        from: '/videos/learn-identity/05-desktop-and-mobile-apps',
        to: '/videos/learn-identity-series/desktop-and-mobile-apps'
    },
    {
        from: '/videos/learn-identity/06-single-page-apps',
        to: '/videos/learn-identity-series/single-page-apps'
    },
    {
        from: '/videos/get-started/01-architecture-your-tenant',
        to: '/videos/get-started-series/architect-your-tenant'
    },
    {
        from: '/videos/get-started/02-provision-user-stores',
        to: '/videos/get-started-series/provision-user-stores'
    },
    {
        from: '/videos/get-started/03-provision-import-users',
        to: '/videos/get-started-series/provision-import-users'
    },
    {
        from: '/videos/get-started/04_01-authenticate-how-it-works',
        to: '/videos/get-started-series/authenticate-how-it-works'
    },
    {
        from: '/logs/references/log-event-type-codes',
        to: '/logs/log-event-type-codes'
    },
    {
        from: '/videos/get-started/04_02-authenticate-spa-example',
        to: '/videos/get-started-series/authenticate-spa-example'
    },
    {
        from: '/dashboard/reference/settings-application',
        to: '/get-started/dashboard/application-settings'
    },
    {
        from: '/dashboard/reference/settings-tenant',
        to: '/get-started/dashboard/tenant-settings'
    },
    {
        from: '/logs/guides/view-log-data-dashboard',
        to: '/logs/view-log-events-in-the-dashboard'
    },
    {
        from: '/logs/references/log-event-filters',
        to: '/logs/log-event-filters'
    },
    {
        from: '/logs/references/query-syntax',
        to: '/logs/log-search-query-syntax'
    },
    {
        from: '/design/creating-invite-only-applications',
        to: '/auth0-email-services/send-email-invitations-for-application-signup'
    },
    {
        from: '/videos/get-started/05_01-authorize-id-tokens-access-control',
        to: '/videos/get-started-series/authorize-id-tokens-and-access-control'
    },
    {
        from: '/videos/get-started/05_02-authorize-get-validate-id-tokens',
        to: '/videos/get-started-series/authorize-get-and-validate-id-tokens'
    },
    {
        from: '/dashboard/guides/tenants/view-signing-keys',
        to: '/get-started/dashboard/view-client-secrets-and-signing-keys'
    },
    {
        from: '/dashboard/guides/applications/update-signing-algorithm',
        to: '/applications/change-application-signing-algorithms'
    },
    {
        from: '/videos/get-started/06-user-profiles',
        to: '/videos/get-started-series/learn-user-profiles'
    },
    {
        from: '/videos/get-started/07_01-brand-how-it-works',
        to: '/videos/get-started-series/brand-how-it-works'
    },
    {
        from: '/videos/get-started/07_02-brand-signup-login-pages',
        to: '/videos/get-started-series/brand-signup-and-login-pages'
    },
    {
        from: '/videos/get-started/08-brand-emails-error-pages',
        to: '/videos/get-started-series/brand-emails-and-error-pages'
    },
    {
        from: '/videos/get-started/10-logout',
        to: '/videos/get-started-series/learn-logout'
    },
    {
        from: '/dashboard/guides/tenants/rotate-signing-keys',
        to: '/get-started/dashboard/rotate-signing-keys'
    },
    {
        from: '/dashboard/guides/tenants/revoke-signing-keys',
        to: '/get-started/dashboard/revoke-signing-keys'
    },
    {
        from: '/dashboard/guides/applications/set-up-addon-saml2-aws',
        to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-aws'
    },
    {
        from: '/dashboard/guides/applications/update-token-lifetime',
        to: '/tokens/id-tokens/update-id-token-lifetime'
    },
    {
        from: '/dashboard/guides/tenants/create-multiple-tenants',
        to: '/get-started/dashboard/create-multiple-tenants'
    },
    {
        from: '/dashboard/manage-dashboard-admins',
        to: '/get-started/dashboard/manage-dashboard-users'
    },
    {
        from: '/dashboard/guides/users/view-user-roles',
        to: '/users/view-user-roles'
    },
    {
        from: '/dashboard/guides/roles/view-role-users',
        to: '/authorization/rbac/roles/view-users-assigned-to-roles'
    },
    {
        from: '/dashboard/guides/users/view-user-permissions',
        to: '/users/view-user-permissions'
    },
    {
        from: '/dashboard/guides/users/unlink-user-devices',
        to: '/users/unlink-devices-from-users'
    },
    {
        from: '/dashboard/guides/users/remove-user-roles',
        to: '/users/remove-roles-from-users'
    },
    {
        from: '/dashboard/guides/roles/remove-role-users',
        to: '/users/remove-users-from-roles'
    },
    {
        from: '/dashboard/guides/users/remove-user-permissions',
        to: '/users/remove-permissions-from-users'
    },
    {
        from: '/tokens/concepts/signing-algorithms',
        to: '/tokens/signing-algorithms'
    },
    {
        from: '/dashboard/guides/applications/rotate-client-secret',
        to: '/get-started/dashboard/rotate-client-secret'
    },
    {
        from: '/dashboard/guides/users/assign-roles-users',
        to: '/users/assign-roles-to-users'
    },
    {
        from: '/dashboard/guides/users/assign-permissions-users',
        to: '/users/assign-permissions-to-users'
    },
    {
        from: '/dashboard/guides/universal-login/configure-login-page-passwordless',
        to: '/universal-login/configure-universal-login-with-passwordless'
    },
    {
        from: '/dashboard/guides/tenants/configure-session-lifetime-settings',
        to: '/get-started/dashboard/configure-session-lifetime-settings'
    },
    {
        from: '/dashboard/guides/tenants/configure-device-user-code-settings',
        to: '/get-started/dashboard/configure-device-user-code-settings'
    },
    {
        from: '/dashboard/guides/rules/create-rules',
        to: '/rules/create-rules'
    },
    {
        from: '/dashboard/guides/rules/configure-variables',
        to: '/rules/configure-global-variables-for-rules'
    },
    {
        from: '/dashboard/guides/roles/view-role-permissions',
        to: '/authorization/rbac/roles/view-role-permissions'
    },
    {
        from: '/dashboard/guides/roles/remove-role-permissions',
        to: '/authorization/rbac/roles/remove-permissions-from-roles'
    },
    {
        from: '/dashboard/guides/roles/edit-role-definitions',
        to: '/authorization/rbac/roles/edit-role-definitions'
    },
    {
        from: '/dashboard/guides/roles/delete-roles',
        to: '/authorization/rbac/roles/delete-roles'
    },
    {
        from: '/dashboard/guides/roles/create-roles',
        to: '/authorization/rbac/roles/create-roles'
    },
    {
        from: '/dashboard/guides/roles/add-permissions-roles',
        to: '/authorization/rbac/roles/add-permissions-to-roles'
    },
    {
        from: '/dashboard/guides/connections/set-up-connections-database',
        to: '/applications/set-up-database-connections'
    },
    {
        from: '/dashboard/guides/extensions/sso-dashboard-update-apps',
        to: '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard'
    },
    {
        from: '/integrations/marketing/salesforce',
        to: '/integrations/marketing/export-user-data-salesforce'
    },
    {
        from: '/dashboard/guides/extensions/sso-dashboard-install-extension',
        to: '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension'
    },
    {
        from: '/dashboard/guides/extensions/sso-dashboard-add-apps',
        to: '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard'
    },
    {
        from: '/dashboard/guides/extensions/delegated-admin-install-extension',
        to: '/extensions/delegated-administration-extension/install-delegated-admin-extension'
    },
    {
        from: '/dashboard/guides/extensions/delegated-admin-create-app',
        to: '/extensions/delegated-administration-extension/create-delegated-admin-applications'
    },
    {
        from: '/dashboard/guides/connections/configure-connection-sync',
        to: '/users/configure-connection-sync-with-auth0'
    },
    {
        from: '/dashboard/guides/connections/view-connections',
        to: '/get-started/dashboard/view-connections'
    },
    {
        from: '/dashboard/guides/connections/test-connections-social',
        to: '/get-started/dashboard/test-social-connections'
    },
    {
        from: '/dashboard/guides/connections/test-connections-enterprise',
        to: '/get-started/dashboard/test-enterprise-connections'
    },
    {
        from: '/dashboard/guides/connections/test-connections-database',
        to: '/get-started/dashboard/test-database-connections'
    },
    {
        from: '/dashboard/guides/connections/set-up-connections-social',
        to: '/get-started/dashboard/set-up-social-connections'
    },
    {
        from: '/dashboard/guides/connections/enable-connections-enterprise',
        to: '/get-started/dashboard/enable-enterprise-connections'
    },
    {
        from: '/dashboard/guides/connections/disable-cache-ad-ldap',
        to: '/ad-ldap-connector/disable-credential-caching'
    },
    {
        from: '/dashboard/guides/applications/view-app-type-confidential-public',
        to: '/applications/view-application-type'
    },
    {
        from: '/dashboard/guides/applications/update-grant-types',
        to: '/applications/update-grant-types'
    },
    {
        from: '/dashboard/guides/applications/remove-app',
        to: '/applications/remove-applications'
    },
    {
        from: '/dashboard/guides/applications/enable-universal-links',
        to: '/enable-universal-links-support-in-apple-xcode'
    },
    {
        from: '/dashboard/guides/applications/register-app-spa',
        to: '/applications/register-single-page-app'
    },
    {
        from: '/dashboard/guides/applications/register-app-regular-web',
        to: '/applications/register-regular-web-applications'
    },
    {
        from: '/authorization/concepts/authz-and-authn',
        to: '/authorization/authentication-and-authorization'
    },
    {
        from: '/authorization/concepts/authz-rules',
        to: '/authorization/rules-for-authorization-policies'
    },
    {
        from: '/authorization/concepts/core-vs-extension',
        to: '/authorization/authorization-core-vs-authorization-extension'
    },
    {
        from: '/authorization/concepts/policies',
        to: '/authorization/authorization-policies'
    },
    {
        from: '/dashboard/guides/applications/register-app-native',
        to: '/applications/set-up-an-application/register-native-applications'
    },
    {
        from: '/authorization/concepts/rbac',
        to: '/authorization/rbac'
    },
    {
        from: '/authorization/concepts/sample-use-cases-rbac',
        to: '/authorization/sample-use-cases-role-based-access-control'
    },
    {
        from: '/authorization/concepts/sample-use-cases-rules',
        to: '/authorization/sample-use-cases-rules-with-authorization'
    },
    {
        from: '/dashboard/guides/applications/register-app-m2m',
        to: '/applications/set-up-an-application/register-machine-to-machine-applications'
    },
    {
        from: '/dashboard/guides/applications/update-app-connections',
        to: '/applications/update-application-connections'
    },
    {
        from: '/dashboard/guides/applications/set-up-cors',
        to: '/applications/set-up-cors'
    },
    {
        from: '/authorization/concepts/troubleshooting',
        to: '/authorization/troubleshoot-role-based-access-control-and-authorization'
    },
    {
        from: '/authorization/guides/how-to',
        to: '/authorization/how-to-use-auth0s-core-authorization-feature-set'
    },
    {
        from: '/universal-login/i18n',
        to: '/universal-login/universal-login-internationalization'
    },
    {
        from: '/universal-login/default-login-url',
        to: '/universal-login/configure-default-login-routes'
    },
    {
        from: '/universal-login/text-customization',
        to: '/universal-login/new-experience/text-customization-new-universal-login'
    },
    {
        from: '/universal-login/text-customization-prompts/common',
        to: '/universal-login/prompt-common'
    },
    {
        from: '/universal-login/text-customization-prompts/device-flow',
        to: '/universal-login/prompt-device-flow'
    },
    {
        from: '/universal-login/text-customization-prompts/email-verification',
        to: '/universal-login/prompt-email-verification'
    },
    {
        from: '/universal-login/text-customization-prompts/login',
        to: '/universal-login/prompt-login'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa-email',
        to: '/universal-login/prompt-mfa-email'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa-otp',
        to: '/universal-login/prompt-mfa-otp'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa-push',
        to: '/universal-login/prompt-mfa-push'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa-recovery-code',
        to: '/universal-login/prompt-mfa-recovery-code'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa-sms',
        to: '/universal-login/prompt-mfa-sms'
    },
    {
        from: '/universal-login/text-customization-prompts/mfa',
        to: '/universal-login/prompt-mfa'
    },
    {
        from: '/application-auth/current',
        to: '/authentication'
    },
    {
        from: '/universal-login/text-customization-prompts/reset-password',
        to: '/universal-login/prompt-reset-password'
    },
    {
        from: '/universal-login/text-customization-prompts/signup',
        to: '/universal-login/prompt-signup'
    },
    {
        from: '/rules/references/use-cases',
        to: '/rules/use-cases'
    },
    {
        from: '/rules/references/samples',
        to: '/rules/examples'
    },
    {
        from: '/rules/references/context-object',
        to: '/rules/context-object'
    },
    {
        from: '/rules/guides/redirect',
        to: '/rules/redirect-users'
    },
    {
        from: '/rules/guides/configuration',
        to: '/rules/configuration'
    },
    {
        from: '/logs/streams/azure-event-grid',
        to: '/logs/export-log-events-with-log-streaming/stream-logs-to-azure-event-grid'
    },
    {
        from: '/integrations/aws/sso',
        to: '/configure-amazon-web-services-for-sso'
    },
    {
        from: '/universal-login/new',
        to: '/universal-login/new-experience'
    },
    {
        from: '/universal-login/classic',
        to: '/universal-login/classic-experience'
    },
    {
        from: '/universal-login/new-experience-limitations',
        to: '/universal-login/new-experience/new-experience-limitations'
    },
    {
        from: '/universal-login/multifactor-authentication',
        to: '/universal-login/classic-experience/mfa-classic-experience'
    },
    {
        from: '/mfa/send-phone-message-hook-amazon-sns',
        to: '/mfa/configure-amazon-sns-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-vonage',
        to: '/mfa/configure-vonage-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-mitto',
        to: '/mfa/configure-mitto-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-esendex',
        to: '/mfa/configure-esendex-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-infobip',
        to: '/mfa/configure-infobip-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-telesign',
        to: '/mfa/configure-telesign-as-mfa-sms-provider'
    },
    {
        from: '/mfa/send-phone-message-hook-twilio',
        to: '/mfa/configure-twilio-as-mfa-sms-provider'
    },
    {
        from: '/universal-login/password-reset',
        to: '/universal-login/customize-password-reset-page'
    },
    {
        from: '/universal-login/version-control',
        to: '/universal-login/version-control-universal-login-pages'
    },
    {
        from: '/mfa/concepts/guardian',
        to: '/mfa/auth0-guardian'
    },
    {
        from: ['/mfa/guides/reset-user-mfa','/multifactor-authentication/reset-user'],
        to: '/mfa/reset-user-mfa'
    },
    {
        from: '/mfa/references/troubleshoot-mfa',
        to: '/mfa/troubleshoot-mfa-issues'
    },
    {
        from: '/identity-labs/03-mobile-native-app',
        to: '/identity-labs/lab-3-mobile-native-app'
    },
    {
        from: '/identity-labs/01-web-sign-in',
        to: '/identity-labs/lab-1-web-sign-in'
    },
    {
        from: '/identity-labs/04-single-page-app',
        to: '/identity-labs/lab-4-single-page-app'
    },
    {
        from: '/identity-labs/01-web-sign-in/exercise-01',
        to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-1'
    },
    {
        from: '/login/embedded',
        to: '/login/embedded-login'
    },
    {
        from: '/mfa/guides/enable-mfa',
        to: '/mfa/enable-mfa'
    },
    {
        from: '/mfa/concepts/mfa-api',
        to: '/mfa/mfa-api'
    },
    {
        from: '/mfa/concepts/mfa-developer-resources',
        to: '/mfa/mfa-developer-resources'
    },
    {
        from: '/mfa/concepts/mfa-factors',
        to: '/mfa/mfa-factors'
    },
    {
        from: '/mfa/concepts/step-up-authentication',
        to: '/mfa/step-up-authentication'
    },
    {
        from: '/mfa/guides/guardian/create-enrollment-ticket',
        to: '/mfa/auth0-guardian/create-custom-enrollment-tickets'
    },
    {
        from: '/mfa/guides/guardian/guardian-android-sdk',
        to: '/mfa/auth0-guardian/guardian-for-android-sdk'
    },
    {
        from: '/mfa/guides/guardian/guardian-ios-sdk',
        to: '/mfa/auth0-guardian/guardian-for-ios-sdk'
    },
    {
        from: '/mfa/guides/guardian/install-guardian-sdk',
        to: '/mfa/auth0-guardian/install-guardian-sdk'
    },
    {
        from: '/cross-origin-authentication',
        to: '/login/embedded-login/cross-origin-authentication'
    },
    {
        from: '/cms/wordpress',
        to: '/cms/wordpress-plugin'
    },
    {
        from: '/cms/wordpress/installation',
        to: '/cms/wordpress-plugin/install-login-by-auth0'
    },
    {
        from: '/cms/wordpress/configuration',
        to: '/cms/wordpress-plugin/configure-login-by-auth0'
    },
    {
        from: '/dev-lifecycle/local-testing-and-development',
        to: '/dev-lifecycle/work-with-auth0-locally'
    },
    {
        from: '/troubleshoot/references/invalid-token',
        to: '/troubleshoot/invalid-token-errors'
    },
    {
        from: '/cms/wordpress/invalid-state',
        to: '/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors'
    },
    {
        from: '/libraries/auth0-android/configuration',
        to: '/libraries/auth0-android/auth0-android-configuration'
    },
    {
        from: '/scopes/current',
        to: '/scopes'
    },
    {
        from: '/pre-deployment/prelaunch-tips',
        to: '/pre-deployment/pre-launch-tips'
    },
    {
        from: '/scopes/current/api-scopes',
        to: '/scopes/api-scopes'
    },
    {
        from: '/troubleshoot/guides/verify-connections',
        to: '/troubleshoot/troubleshoot-basic/verify-connections'
    },
    {
        from: '/troubleshoot/guides/verify-platform',
        to: '/troubleshoot/troubleshoot-basic/verify-platform'
    },
    {
        from: '/troubleshoot/guides/verify-rules',
        to: '/troubleshoot/verify-rules'
    },
    {
        from: '/troubleshoot/concepts/integration-extensibility-issues',
        to: '/troubleshoot/troubleshoot-integration-and-extensibility'
    },
    {
        from: '/pre-deployment/how-to-run-test',
        to: '/pre-deployment/how-to-run-production-checks'
    },
    {
        from: '/scopes/current/sample-use-cases',
        to: '/scopes/sample-use-cases-scopes-and-claims'
    },
    {
        from: '/mfa/guides/mfa-api/authenticate',
        to: '/mfa/authenticate-with-ropg-and-mfa'
    },
    {
        from: '/mfa/guides/mfa-api/push',
        to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-push-authenticators'
    },
    {
        from: '/mfa/guides/mfa-api/otp',
        to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-otp-authenticators'
    },
    {
        from: '/email/spa-redirect',
        to: '/auth0-email-services/spa-redirect'
    },
    {
        from: '/integrations/sso',
        to: '/integrations/sso-integrations'
    },
    {
        from: '/scopes/current/oidc-scopes',
        to: '/scopes/openid-connect-scopes'
    },
    {
        from: '/mfa/guides/mfa-api/manage',
        to: '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api'
    },
    {
        from: '/troubleshoot/guides/check-error-messages',
        to: '/troubleshoot/check-error-messages'
    },
    {
        from: '/troubleshoot/guides/check-api-calls',
        to: '/troubleshoot/troubleshoot-authentication-issues/check-api-calls'
    },
    {
        from: '/troubleshoot/guides/check-user-profiles',
        to: '/troubleshoot/troubleshoot-authentication-issues/check-user-profiles'
    },
    {
        from: '/troubleshoot/guides/check-deprecation-errors',
        to: '/troubleshoot/troubleshoot-authentication-issues/check-deprecation-errors'
    },
    {
        from: '/troubleshoot/guides/check-login-logout-issues',
        to: '/troubleshoot/troubleshoot-authentication-issues/check-login-and-logout-issues'
    },
    {
        from: '/troubleshoot/guides/generate-har-files',
        to: '/troubleshoot/generate-and-analyze-har-files'
    },
    {
        from: '/troubleshoot/concepts/auth-issues',
        to: '/troubleshoot/troubleshoot-authentication-issues'
    },
    {
        from: '/cms/wordpress/troubleshoot',
        to: '/cms/wordpress-plugin/troubleshoot-login-by-auth0'
    },
    {
        from: '/cms/joomla/configuration',
        to: '/cms/integrate-with-joomla'
    },
    {
        from: '/cms/wordpress/user-migration',
        to: '/cms/wordpress-plugin/user-migration-in-login-by-auth0'
    },
    {
        from: '/mfa/guides/mfa-api/recovery-code',
        to: '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api/challenge-with-recovery-codes'
    },
    {
        from: '/troubleshoot/guides/verify-domain',
        to: '/troubleshoot/troubleshoot-basic/verify-domain'
    },
    {
        from: '/universal-login/text-customization-prompts/consent',
        to: '/universal-login/prompt-consent'
    },
    {
        from: '/libraries/lock/v11/configuration',
        to: '/libraries/lock/lock-configuration'
    },
    {
        from: '/cms/joomla/installation',
        to: '/cms/joomla-installation'
    },
    {
        from: '/deploy/checklist',
        to: '/deploy/deploy-checklist'
    },
    {
        from: '/cms/wordpress/extending',
        to: '/cms/wordpress-plugin/extend-login-by-auth0'
    },
    {
        from: '/scopes/current/guides/customize-consent-prompt',
        to: '/scopes/customize-consent-prompts'
    },
    {
        from: '/integrations/sso/zoom',
        to: '/integrations/sso-integrations/zoom'
    },
    {
        from: '/integrations/sso/zendesk',
        to: '/integrations/sso-integrations/zendesk'
    },
    {
        from: '/integrations/sso/slack',
        to: '/integrations/sso-integrations/slack'
    },
    {
        from: '/integrations/sso/sharepoint',
        to: '/integrations/sso-integrations/sharepoint'
    },
    {
        from: '/mfa/guides/mfa-api/email',
        to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-email-authenticators'
    },
    {
        from: '/integrations/google-cloud-platform',
        to: '/integrations/google-cloud-endpoints'
    },
    {
        from: '/mfa/guides/configure-otp',
        to: '/mfa/configure-otp-notifications-for-mfa'
    },
    {
        from: '/integrations/using-auth0-to-secure-a-cli',
        to: '/integrations/secure-a-cli-with-auth0'
    },
    {
        from: '/integrations/sso/sentry',
        to: '/integrations/sso-integrations/sentry'
    },
    {
        from: '/integrations/sso/salesforce',
        to: '/integrations/sso-integrations/salesforce'
    },
    {
        from: '/integrations/sso/office-365',
        to: '/integrations/sso-integrations/office-365'
    },
    {
        from: '/integrations/sso/egnyte',
        to: '/integrations/sso-integrations/egnyte'
    },
    {
        from: '/integrations/sso/echosign',
        to: '/integrations/sso-integrations/echosign'
    },
    {
        from: '/integrations/sso/dynamics-crm',
        to: '/integrations/sso-integrations/dynamics-crm'
    },
    {
        from: '/integrations/sso/new-relic',
        to: '/integrations/sso-integrations/new-relic'
    },
    {
        from: '/mfa/guides/configure-push',
        to: '/mfa/configure-push-notifications-for-mfa'
    },
    {
        from: '/integrations/sso/dropbox',
        to: '/integrations/sso-integrations/dropbox'
    },
    {
        from: '/mfa/guides/configure-cisco-duo',
        to: '/mfa/configure-cisco-duo-for-mfa'
    },
    {
        from: '/integrations/sso/disqus',
        to: '/integrations/sso-integrations/disqus'
    },
    {
        from: '/integrations/sso/concur',
        to: '/integrations/sso-integrations/concur'
    },
    {
        from: '/integrations/sso/cloudbees',
        to: '/integrations/sso-integrations/cloudbees'
    },
    {
        from: '/integrations/sso/box',
        to: '/integrations/sso-integrations/box'
    },
    {
        from: '/integrations/sso/ad-rms',
        to: '/integrations/sso-integrations/ad-rms-sso-integration'
    },
    {
        from: '/mfa/guides/configure-email',
        to: '/mfa/configure-email-notifications-for-mfa'
    },
    {
        from: '/mfa/guides/import-user-mfa',
        to: '/mfa/import-user-mfa-authenticator-enrollments'
    },
    {
        from: '/mfa/guides/customize-mfa-universal-login',
        to: '/mfa/customize-mfa-user-pages'
    },
    {
        from: '/mfa/references/mfa-widget-reference',
        to: '/mfa/customize-mfa-user-pages/mfa-widget-theme-options'
    },
    {
        from: '/mfa/references/language-dictionary',
        to: '/mfa/customize-mfa-user-pages/mfa-theme-language-dictionary'
    },
    {
        from: '/mfa/references/guardian-error-code-reference',
        to: '/mfa/auth0-guardian/guardian-error-code-reference'
    },
    {
        from: ['/mfa/guides/guardian/customize-sms-messages','/mfa/guides/customize-phone-messages'],
        to: '/mfa/customize-sms-or-voice-messages'
    },
    {
        from: '/mfa/guides/configure-step-up-web-apps',
        to: '/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps'
    },
    {
        from: '/mfa/guides/configure-step-up-apis',
        to: '/mfa/step-up-authentication/configure-step-up-authentication-for-apis'
    },
    {
        from: '/integrations/sharepoint',
        to: '/integrations/sharepoint-2010-2013'
    },
    {
        from: '/authorization/guides/manage-permissions',
        to: '/authorization/manage-permissions'
    },
    {
        from: '/authorization/guides/manage-users',
        to: '/authorization/rbac-users'
    },
    {
        from: '/flows/guides/auth-code/call-api-auth-code',
        to: '/authorization/flows/call-your-api-using-the-authorization-code-flow'
    },
    {
        from: '/flows/guides/auth-code-pkce/call-api-auth-code-pkce',
        to: '/authorization/flows/call-your-api-using-the-authorization-code-flow-with-pkce'
    },
    {
        from: '/flows/guides/client-credentials/call-api-client-credentials',
        to: '/authorization/flows/call-your-api-using-the-client-credentials-flow'
    },
    {
        from: '/flows/guides/auth-code-pkce/add-login-auth-code-pkce',
        to: '/authorization/flows/add-login-using-the-authorization-code-flow-with-pkce'
    },
    {
        from: '/flows/guides/auth-code/add-login-auth-code',
        to: '/authorization/flows/add-login-auth-code-flow'
    },
    {
        from: '/flows/guides/implicit/add-login-implicit',
        to: '/authorization/flows/add-login-using-the-implicit-flow-with-form-post'
    },
    {
        from: '/flows/guides/device-auth/call-api-device-auth',
        to: '/authorization/flows/call-your-api-using-the-device-authorization-flow'
    },
    {
        from: '/flows/concepts/device-auth',
        to: '/authorization/flows/device-authorization-flow'
    },
    {
        from: '/flows/concepts/implicit',
        to: '/authorization/flows/implicit-flow-with-form-post'
    },
    {
        from: '/extensions/authorization-extension/v2/implementation/configuration',
        to: '/extensions/authorization-dashboard-extension/configure-authorization-extension'
    },
    {
        from: '/extensions/authorization-extension/v2/migration',
        to: '/extensions/authorization-dashboard-extension/migrate-to-authorization-extension-v2'
    },
    {
        from: '/extensions/authorization-extension/v2/implementation/installation',
        to: '/extensions/authorization-dashboard-extension/install-authorization-extension'
    },
    {
        from: '/extensions/authorization-extension/v2/implementation/setup',
        to: '/extensions/authorization-dashboard-extension/set-up-authorization-extension-users'
    },
    {
        from: '/extensions/authorization-extension/v2/api-access',
        to: '/extensions/authorization-dashboard-extension/enable-api-access-to-authorization-extension'
    },
    {
        from: '/extensions/authorization-extension/v2/import-export-data',
        to: '/extensions/authorization-dashboard-extension/import-and-export-authorization-extension-data'
    },
    {
        from: '/extensions/authorization-extension/v2/troubleshooting',
        to: '/extensions/authorization-dashboard-extension/troubleshoot-authorization-extension'
    },
    {
        from: '/extensions/authorization-extension/v2',
        to: '/extensions/authorization-dashboard-extension'
    },
    {
        from: '/integrations/aws-api-gateway/custom-authorizers',
        to: '/integrations/aws-api-gateway-custom-authorizers'
    },
    {
        from: '/extensions/authorization-extension/v2/rules',
        to: '/extensions/authorization-dashboard-extension/use-rules-with-the-authorization-extension'
    },
    {
        from: '/integrations/aws/tokens',
        to: '/integrations/call-aws-apis-and-resources-with-tokens'
    },
    {
        from: '/flows/concepts/auth-code',
        to: '/authorization/flows/authorization-code-flow'
    },
    {
        from: '/flows/concepts/auth-code-pkce',
        to: '/authorization/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce'
    },
    {
        from: '/flows/concepts/client-credentials',
        to: '/authorization/flows/client-credentials-flow'
    },
    {
        from: '/api/management/guides/users/set-root-attributes-user-import',
        to: '/users/set-root-attributes-during-user-import'
    },
    {
        from: '/api/management/guides/users/set-root-attributes-user-signup',
        to: '/users/set-root-attributes-during-user-sign-up'
    },
    {
        from: '/api/management/guides/users/update-root-attributes-users',
        to: '/users/update-root-attributes-for-users'
    },
    {
        from: '/api/management/guides/connections/promote-connection-domain-level',
        to: '/get-started/dashboard/promote-connections-to-domain-level'
    },
    {
        from: '/api/management/guides/connections/retrieve-connection-options',
        to: '/get-started/dashboard/retrieve-connection-options'
    },
    {
        from: '/api/management/guides/applications/update-ownership',
        to: '/applications/update-application-ownership'
    },
    {
        from: '/api/management/guides/applications/view-ownership',
        to: '/applications/view-application-ownership'
    },
    {
        from: '/extensions/sso-dashboard',
        to: '/extensions/single-sign-on-dashboard-extension'
    },
    {
        from: ['/hooks/extensibility-points/pre-user-registration','/hooks/concepts/pre-user-registration-extensibility-point','/hooks/guides/use-the-pre-user-registration-extensibility-point'],
        to: '/hooks/pre-user-registration'
    },
    {
        from: ['/hooks/extensibility-points/post-user-registration','/hooks/concepts/post-user-registration-extensibility-point','/hooks/guides/use-the-post-user-registration-extensibility-point'],
        to: '/hooks/post-user-registration'
    },
    {
        from: ['/hooks/extensibility-points/post-change-password','/hooks/guides/post-change-password','/hooks/extensibility-points/post-change-password'],
        to: '/hooks/post-change-password'
    },
    {
        from: '/integrations/sharepoint-apps',
        to: '/integrations/connecting-provider-hosted-apps-to-sharepoint-online'
    },
    {
        from: '/integrations/authenticating-a-tessel-device',
        to: '/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0'
    },
    {
        from: '/integrations/authenticating-devices-using-mqtt',
        to: '/integrations/authenticate-devices-using-mqtt'
    },
    {
        from: '/integrations/sso/springcm',
        to: '/integrations/sso-integrations/springcm'
    },
    {
        from: '/anomaly-detection/guides/enable-disable-brute-force-protection',
        to: '/anomaly-detection/enable-and-disable-brute-force-protection'
    },
    {
        from: '/anomaly-detection/guides/set-anomaly-detection-preferences',
        to: '/anomaly-detection/set-anomaly-detection-preferences'
    },
    {
        from: '/anomaly-detection/guides/prevent-credential-stuffing-attacks',
        to: '/anomaly-detection/prevent-credential-stuffing-attacks'
    },
    {
        from: '/api-auth/tutorials/silent-authentication',
        to: '/authorization/configure-silent-authentication'
    },
    {
        from: '/apis',
        to: '/authorization/apis'
    },
    {
        from: '/api-auth/tutorials/represent-multiple-apis',
        to: '/authorization/represent-multiple-apis-using-a-single-logical-api'
    },
    {
        from: '/api-auth/blacklists-vs-grants',
        to: '/authorization/revoke-access-to-apis-using-blacklists-or-application-grants'
    },
    {
        from: '/api/management/v2/faq-management-api-access-tokens',
        to: '/management-api-access-token-faqs'
    },
    {
        from: '/api/management/v2/create-m2m-app',
        to: '/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application'
    },
    {
        from: '/api/management/v2/get-access-tokens-for-test',
        to: '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing'
    },
    {
        from: '/api/management/v2/get-access-tokens-for-production',
        to: '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production'
    },
    {
        from: '/api/management/v2/get-access-tokens-for-spas',
        to: '/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications'
    },
    {
        from: '/api/management/v2/tokens',
        to: '/tokens/management-api-access-tokens'
    },
    {
        from: '/api/management/v2/tokens-flows',
        to: '/tokens/management-api-access-tokens/changes-in-auth0-management-apiv2-tokens'
    },
    {
        from: '/api/management/v2/changes',
        to: '/auth0-apis/management-api-changes-v1-to-v2'
    },
    {
        from: '/api/info',
        to: '/auth0-apis'
    },
    {
        from: '/api/postman',
        to: '/auth0-apis/use-auth0-apis-with-postman-collections'
    },
    {
        from: '/api-auth/faq',
        to: '/authorization/authentication-and-authorization-api-faq'
    },
    {
        from: '/api-auth/dynamic-client-registration',
        to: '/applications/dynamic-client-registration'
    },
    {
        from: '/api-auth/token-renewal-in-safari',
        to: '/authorization/renew-tokens-when-using-safari'
    },
    {
        from: '/api-auth/which-oauth-flow-to-use',
        to: '/authorization/which-oauth-2-0-flow-should-i-use'
    },
    {
        from: '/api-auth/user-consent',
        to: '/authorization/user-consent-and-third-party-applications'
    },
    {
        from: '/api-auth/tutorials/nonce',
        to: '/authorization/mitigate-replay-attacks-when-using-the-implicit-flow'
    },
    {
        from: '/getting-started/set-up-app',
        to: '/applications/set-up-an-application'
    },
    {
        from: '/protocols/saml/samlsso-auth0-to-auth0',
        to: '/protocols/saml-configuration-options/test-saml-sso-with-auth0-as-service-and-identity-provider'
    },
    {
        from: '/api-auth/tutorials/client-credentials/customize-with-hooks',
        to: '/authorization/customize-tokens-using-hooks-with-client-credentials-flow'
    },
    {
        from: '/api-auth/tutorials/using-resource-owner-password-from-server-side',
        to: '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-anomaly-detection'
    },
    {
        from: '/api-auth/tutorials/password-grant',
        to: '/authorization/flows/call-your-api-using-resource-owner-password-flow'
    },
    {
        from: '/api-auth/grant/password',
        to: '/authorization/flows/resource-owner-password-flow'
    },
    {
        from: '/extensions/deploy-cli/references/troubleshooting',
        to: '/extensions/deploy-cli-tool/troubleshoot-the-deploy-cli-tool'
    },
    {
        from: '/extensions/deploy-cli/references/environment-variables-keyword-mappings',
        to: '/extensions/deploy-cli-tool/environment-variables-and-keyword-mappings'
    },
    {
        from: '/extensions/deploy-cli/references/deploy-cli-options',
        to: '/extensions/deploy-cli-tool/deploy-cli-tool-options'
    },
    {
        from: '/extensions/deploy-cli/guides/install-deploy-cli',
        to: '/extensions/deploy-cli-tool/install-and-configure-the-deploy-cli-tool'
    },
    {
        from: '/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment',
        to: '/extensions/deploy-cli-tool/incorporate-deploy-cli-into-build-environment'
    },
    {
        from: '/extensions/deploy-cli/guides/import-export-yaml-file',
        to: '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file'
    },
    {
        from: '/extensions/deploy-cli/guides/import-export-directory-structure',
        to: '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure'
    },
    {
        from: '/extensions/deploy-cli/guides/create-deploy-cli-application-manually',
        to: '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application-manually'
    },
    {
        from: '/extensions/deploy-cli/guides/call-deploy-cli-programmatically',
        to: '/extensions/deploy-cli-tool/call-deploy-cli-tool-programmatically'
    },
    {
        from: '/extensions/deploy-cli',
        to: '/extensions/deploy-cli-tool'
    },
    {
        from: '/extensions/delegated-admin/v3',
        to: '/extensions/delegated-administration-extension'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks/access',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-access-hook'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks/filter',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-filter-hook'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks/membership',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-memberships-query-hook'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks/settings',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-settings-query-hook'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks/write',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-write-hook'
    },
    {
        from: '/extensions/delegated-admin/v3/hooks',
        to: '/extensions/delegated-administration-extension/delegated-administration-hooks'
    },
    {
        from: '/extensions/delegated-admin/v3/manage-users',
        to: '/extensions/delegated-administration-extension/delegated-administration-manage-users'
    },
    {
        from: '/i18n/password-options',
        to: '/i18n/password-options-translation'
    },
    {
        from: '/cms/wordpress/how-does-it-work',
        to: '/cms/wordpress-plugin/integrate-with-wordpress'
    },
    {
        from: '/integrations/integrating-auth0-amazon-cognito-mobile-apps',
        to: '/integrations/amazon-cognito'
    },
    {
        from: '/aws-api-setup',
        to: '/integrations/how-to-set-up-aws-for-delegated-authentication'
    },
    {
        from: '/integrations/office365-connection-deprecation-guide',
        to: '/integrations/migrate-office365-connections-to-windows-azure-ad'
    },
    {
        from: '/extensions/account-link',
        to: '/extensions/account-link-extension'
    },
    {
        from: '/authorization/guides/manage-roles',
        to: '/authorization/rbac/roles'
    },
    {
        from: '/rules/guides/management-api',
        to: '/rules/use-management-api'
    },

    /* Contentful Manual Additions */

    {
        from: '/troubleshoot/references/self_change_password',
        to: '/troubleshoot/self-change-password-errors'
    },
    {
        from: '/migrations/guides/google_cloud_messaging',
        to: '/product-lifecycle/deprecations-and-migrations/google-firebase-migration'
    },
    {
        from: '/tokens/guides/manage-signing-keys',
        to: '/tokens/signing-algorithms-and-keys'
    },
    {
        from: '/migrations/guides/unpaginated-requests',
        to: '/product-lifecycle/deprecations-and-migrations/migrate-to-paginated-queries'
    },
    {
        from: '/logs/streams/http-event-to-slack',
        to: '/logs/export-log-events-with-log-streaming/stream-log-events-to-slack'
    },
    {
        from: '/universal-login/customization-classic',
        to: '/universal-login/classic-experience/customization-classic'
    },
    {
        from: '/troubleshoot/references/saml-errors',
        to: '/troubleshoot/troubleshoot-authentication/saml-errors'
    },
    {
        from: '/mfa/guides/configure-phone.md',
        to: '/mfa/configure-sms-voice-notifications-mfa'
    },
    {
        from: '/mfa/guides/mfa-api/phone',
        to: '/mfa/authenticate-with-ropg-and-mfa/enroll-challenge-sms-voice-authenticators'
    },
    {
        from: '/extensions/deploy-cli/references/whats-new',
        to: '/extensions/deploy-cli-tool/whats-new-in-deploy-cli-tool'
    },
    {
        from: '/protocols/saml/saml-apps/atlassian.md',
        to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-atlassian'
    },
    {
        from: '/integrations/aws-api-gateway/delegation',
        to: '/integrations/aws-api-gateway'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/part-1',
        to: '/integrations/aws-api-gateway/aws-api-gateway-step-1'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/part-2',
        to: '/integrations/aws-api-gateway/aws-api-gateway-step-2'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/part-3',
        to: '/integrations/aws-api-gateway/aws-api-gateway-step-3'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/part-4',
        to: '/integrations/aws-api-gateway/aws-api-gateway-step-4'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/part-5',
        to: '/integrations/aws-api-gateway/aws-api-gateway-step-5'
    },
    {
        from: '/integrations/aws-api-gateway/delegation/secure-api-with-cognito',
        to: '/integrations/aws-api-gateway-cognito'
    },
    {
        from: '/rules/guides/metadata',
        to: '/rules/metadata'
    }
];
