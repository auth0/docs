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

  /* MISCELLANEOUS AND OUTDATED */

  {
    from: '/deployment',
    to: '/overview/deployment-models'
  },
  {
    from: '/java-overview',
    to: '/dev-centers/java'
  },
  {
    from: ['/firebaseapi-tutorial','/salesforcesandboxapi-tutorial','/salesforceapi-tutorial','/sapapi-tutorial','/clients/addons','/applications/addons'],
    to: '/addons'
  },
  {
    from: '/phonegap-plugin-tutorial',
    to: '/native-platforms/cordova'
  },
  {
    from: '/topics/identity-glossary',
    to: '/glossary'
  },
  {
    from: ['/enterprise-support','/onboarding/appliance-outage'],
    to: '/onboarding/enterprise-support'
  },
  {
    from: ['/i18n/i18n-custom-login-page'],
    to: '/i18n'
},
{
    from: ['/i18n/password-options', '/i18n/password-strength'],
    to: '/i18n/password-options-translation'
},
{
    from: ['/compliance'],
    to: '/compliance-and-certifications'
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
    from: ['/dev-lifecycle/local-testing-and-development'],
    to: '/development-lifecycle/work-with-auth0-locally'
},
{
    from: ['/dev-lifecycle/setting-up-env'],
    to: '/development-lifecycle/set-up-multiple-environments'
},
{
    from: ['/dashboard/guides/applications/view-app-type-confidential-public'],
    to: '/applications/check-an-applications-confidential-or-public-authentication-method'
},
{
    from: ['/authorization/guides/manage-users'],
    to: '/authorization/rbac-users'
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
      '/webapi',
      '/mvc-tutorial-enterprise'
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
  {
    from: [
      '/quickstart/spa/aurelia',
      '/quickstart/spa/ember',
      '/quickstart/spa/jquery'
    ],
    to: '/quickstart/spa'
  },
  {
    from: '/quickstart',
    to: '/'
  },
  {
    from: '/quickstart/backend/java',
    to: '/quickstart/backend/java-spring-security',
    status: 302
  },
  {
    from: '/quickstart/native/ios',
    to: '/quickstart/native/ios-swift'
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

  /* CONNECTIONS */

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
  {
    from: '/applications/concepts/connections',
    to: '/connections'
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
    from: '/password-strength',
    to: '/connections/database/password-strength'
  },
  {
    from: '/connections',
    to: '/identityproviders'
  },
  {
    from: '/connections/database/mysql',
    to: '/connections/database/custom-db'
  },
  {
    from: ['/tutorials/adding-generic-oauth1-connection','/oauth1'],
    to: '/connections/adding-generic-oauth1-connection',
  },
  {
    from: ['/tutorials/adding-scopes-for-an-external-idp','/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp'],
    to: '/connections/adding-scopes-for-an-external-idp',
  },
  {
    from: ['/tutorials/generic-oauth2-connection-examples','/oauth2-examples'],
    to: '/connections/generic-oauth2-connection-examples',
  },
  {
    from: ['/tutorials/calling-an-external-idp-api','/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api'],
    to: '/connections/calling-an-external-idp-api',
  },
  {
    from: ['/tutorials/how-to-test-partner-connection','/test-partner-connection'],
    to: '/connections/how-to-test-partner-connection',
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
    from: '/connections/passwordless/sms-gateway',
    to: '/connections/passwordless/guides/use-sms-gateway-passwordless'
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
    from: '/connections/social/miicard',
    to: '/connections/identity-providers-social'
  },
  {
    from: '/line',
    to: '/connections/social/line'
  },
  {
    from: ['/api-auth/passwordless'],
    to: '/connections/passwordless'
  },

  /* MICROSITES */

  /* ARCHITECTURE SCENARIOS */

  {
    from: '/sequence-diagrams',
    to: '/architecture-scenarios/application/spa-api'
  },
  {
    from: '/architecture-scenarios/sequence-diagrams',
    to: '/architecture-scenarios/application/spa-api'
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

  /* CONTENTFUL REDIRECTS */

  /* Anomaly Detection */

  {
    from: ['/anomaly-detection/references/anomaly-detection-faqs'],
    to: '/anomaly-detection'
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
    to: '/anomaly-detection/automated-attack-and-credential-stuffing-protection'
  },
  {
    from: ['/anomaly-detection/references/anomaly-detection-restrictions-limitations', '/anomaly-detection/guides/set-anomaly-detection-preferences'],
    to: '/anomaly-detection/set-anomaly-detection-preferences'
  },
  {
    from: ['/anomaly-detection/guides/use-tenant-data-for-anomaly-detection'],
    to: '/anomaly-detection/view-anomaly-detection-events'
  },
  {
    from: ['/anomaly-detection/references/brute-force-protection-triggers-actions'],
    to: '/anomaly-detection/brute-force-protection-triggers-and-actions'
  },

  /* API */

  {
    from: ['/auth-api', '/api/authentication/reference'],
    to: '/api/authentication'
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
    from: ['/auth0-apis', '/api/info'],
    to: '/api'
  },
  {
    from: ['/api/management/v1'],
    to: '/api/management-api-v1-deprecated'
  },
  {
    from: ['/api/management/v2/changes','/apiv2Changes', '/api/v2/changes'],
    to: '/api/management-api-changes-v1-to-v2'
  },
  {
    from: ['/api/postman'],
    to: '/api/use-auth0-apis-with-postman-collections'
  },

  /* Applications */

  {
    from: ['/api-auth/dynamic-client-registration','/api-auth/dynamic-application-registration'],
    to: '/applications/dynamic-client-registration'
  },
  {
    from: ['/applications/concepts/app-types-auth0','/clients','/applications/application-types','/api-auth/tutorials/adoption/oidc-conformant','/clients/client-types','/applications/application-types'],
    to: '/applications'
  },
  {
    from: ['/dashboard/guides/applications/enable-android-app-links','/clients/enable-android-app-links','/applications/enable-android-app-links','/applications/guides/enable-android-app-links-dashboard'],
    to: '/applications/enable-android-app-links-support'
  },
  {
    from: ['/dashboard/guides/applications/enable-universal-links','/clients/enable-universal-links','/applications/enable-universal-links','/applications/guides/enable-universal-links-dashboard'],
    to: '/applications/enable-universal-links-support-in-apple-xcode'
  },
  {
    from: ['/dashboard/guides/applications/register-app-m2m','/applications/application-settings/non-interactive','/applications/application-settings/machine-to-machine','/applications/machine-to-machine'],
    to: '/applications/set-up-an-application/register-machine-to-machine-applications'
  },
  {
    from: ['/dashboard/guides/applications/register-app-native','/applications/application-settings/native','/applications/native'],
    to: '/applications/set-up-an-application/register-native-applications'
  },
  {
    from: ['/dashboard/guides/applications/register-app-regular-web','/applications/application-settings/regular-web-app','/applications/webapps'],
    to: '/applications/set-up-an-application/register-regular-web-applications'
  },
  {
    from: ['/dashboard/guides/applications/register-app-spa','/applications/spa','/applications/application-settings/single-page-app','/applications/register-single-page-app'],
    to: '/applications/set-up-an-application/register-single-page-app'
  },
  {
    from: ['/dashboard/guides/applications/remove-app'],
    to: '/applications/remove-applications'
  },
  {
    from: ['/api/management/guides/applications/update-ownership','/api/management/guides/applications/remove-app'],
    to: '/applications/update-application-ownership'
  },
  {
    from: ['/api/management/guides/applications/view-ownership'],
    to: '/applications/view-application-ownership'
  },
  {
    from: ['/dashboard/guides/applications/view-app-type-confidential-public'],
    to: '/applications/check-an-applications-confidential-or-public-authentication-method'
  },
  {
    from: ['/dashboard/guides/applications/set-up-cors'],
    to: '/applications/set-up-cors'
  },
  {
    from: ['/dashboard/guides/applications/update-app-connections'],
    to: '/applications/update-application-connections'
  },
  {
    from: ['/api-auth/config/using-the-auth0-dashboard','/api-auth/config/using-the-management-api','/api/management/guides/applications/update-grant-types','/dashboard/guides/applications/update-grant-types'],
    to: '/applications/update-grant-types'
  },
  {
    from: ['/dashboard/guides/applications/update-signing-algorithm','/tokens/guides/update-signing-algorithm-application'],
    to: '/applications/change-application-signing-algorithms'
  },
  {
    from: ['/dashboard/guides/connections/set-up-connections-database'],
    to: '/applications/set-up-database-connections'
  },
  {
    from: ['/clients/client-grant-types','/applications/concepts/application-grant-types'],
    to: '/applications/application-grant-types'
  },
  {
    from: ['/applications/concepts/app-types-first-third-party'],
    to: '/applications/first-party-and-third-party-applications'
  },

  {
    from: ['/applications/reference/wildcard-subdomains'],
    to: '/applications/wildcards-for-subdomains'
  },
  
  {
    from: ['/dashboard/guides/applications/enable-android-app-links'],
    to: '/applications/enable-android-app-links-support'
  },

  /* Authorization */

  {
    from: ['/api-auth/blacklists-vs-grants','/blacklists-vs-application-grants'],
    to: '/authorization/revoke-access-to-apis-using-blacklists-or-application-grants'
  },
  {
    from: ['/dashboard/guides/roles/remove-role-users'],
    to: '/authorization/rbac/roles/remove-users-from-roles'
  },
  {
    from: ['/api/management/guides/roles/view-role-users','/dashboard/guides/roles/view-role-users'],
    to: '/authorization/rbac/roles/view-users-assigned-to-roles'
  },
  {
    from: ['/dashboard/guides/roles/delete-roles','/api/management/guides/roles/delete-roles'],
    to: '/authorization/rbac/roles/delete-roles'
  },
  {
    from: ['/dashboard/guides/roles/edit-role-definitions','/api/management/guides/roles/edit-role-definitions'],
    to: '/authorization/rbac/roles/edit-role-definitions'
  },
  {
    from: ['/dashboard/guides/roles/remove-role-permissions','/api/management/guides/roles/remove-role-permissions'],
    to: '/authorization/rbac/roles/remove-permissions-from-roles'
  },
  {
    from: ['/dashboard/guides/roles/view-role-permissions','/api/management/guides/roles/view-role-permissions'],
    to: '/authorization/rbac/roles/view-role-permissions'
  },
  {
    from: ['/api/management/guides/apis/enable-rbac','/dashboard/guides/apis/enable-rbac','/authorization/guides/dashboard/enable-rbac'],
    to: '/authorization/rbac/enable-role-based-access-control-for-apis'
  },
  {
    from: ['/api/management/guides/roles/add-permissions-roles'],
    to: '/authorization/rbac/roles/add-permissions-to-roles'
  },
  {
    from: ['/api/management/guides/roles/create-roles'],
    to: '/authorization/rbac/roles/create-roles'
  },
  {
    from: ['/authorization/concepts/authz-and-authn','/application-auth/current','/application-auth/legacy','/application-auth','/authentication'],
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
    from: ['/api-auth/apis','/overview/apis'],
    to: '/authorization/apis'
  },
  {
    from: ['/api-auth/faq'],
    to: '/authorization/authentication-and-authorization-api-faq'
  },
  {
    from: ['/api-auth'],
    to: '/authorization'
  },
  {
    from: ['/api-auth/restrict-access-api','/api-auth/restrict-requests-for-scopes','/authorization/concepts/sample-use-cases-rules'],
    to: '/authorization/sample-use-cases-rules-with-authorization'
  },
  {
    from: ['/api-auth/token-renewal-in-safari'],
    to: '/authorization/renew-tokens-when-using-safari'
  },
  {
    from: ['/api-auth/user-consent'],
    to: '/authorization/user-consent-and-third-party-applications'
  },
  {
    from: ['/api-auth/which-oauth-flow-to-use'],
    to: '/authorization/which-oauth-2-0-flow-should-i-use'
  },
  {
    from: ['/api-auth/tutorials/nonce'],
    to: '/authorization/mitigate-replay-attacks-when-using-the-implicit-flow'
  },
  {
    from: ['/api-auth/tutorials/represent-multiple-apis'],
    to: '/authorization/represent-multiple-apis-using-a-single-logical-api'
  },
  {
    from: ['/api-auth/tutorials/silent-authentication'],
    to: '/authorization/configure-silent-authentication'
  },
  {
    from: ['/api-auth/tutorials/using-resource-owner-password-from-server-side'],
    to: '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-anomaly-detection'
  },
  {
    from: ['/api-auth/tutorials/client-credentials/customize-with-hooks','/api-auth/grant/using-rules'],
    to: '/authorization/customize-tokens-using-hooks-with-client-credentials-flow'
  },

  /* Best Practices */

  {
    from: ['/best-practices/custom-db-connections','/best-practices/custom-db-connections-scripts'],
    to: '/best-practices/custom-database-connection-and-action-script-best-practices'
  },
  {
      from: ['/best-practices/custom-db-connections/anatomy'],
      to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-anatomy-best-practices'
  },
  {
      from: ['/best-practices/custom-db-connections/environment'],
      to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-action-script-environment-best-practices'
  },
  {
      from: ['/best-practices/custom-db-connections/execution'],
      to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-database-action-script-execution-best-practices'
  },
  {
      from: ['/best-practices/custom-db-connections/security'],
      to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-security-best-practices'
  },
  {
      from: ['/best-practices/custom-db-connections/size'],
      to: '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-anatomy-best-practices'
  },
  {
      from: ['/best-practices/application-settings'],
      to: '/best-practices/app-settings-best-practices'
  },
  {
      from: ['/best-practices/connection-settings'],
      to: '/best-practices/connection-settings-best-practices'
  },
  {
      from: ['/best-practices/debugging'],
      to: '/best-practices/debugging-best-practices'
  },
  {
      from: ['/best-practices/deployment'],
      to: '/best-practices/deployment-best-practices'
  },
  {
      from: ['/best-practices/error-handling'],
      to: '/best-practices/error-handling-best-practices'
  },
  {
      from: ['/best-practices/operations'],
      to: '/best-practices/general-usage-and-operations-best-practices'
  },
  {
      from: ['/best-practices/performance'],
      to: '/best-practices/performance-best-practices'
  },
  {
      from: ['/best-practices/rules'],
      to: '/best-practices/rules-best-practices'
  },
  {
    from: ['/best-practices/search-best-practices','/users/search/best-practices'],
    to: '/best-practices/user-search-best-practices'
  },
  {
    from: ['/best-practices/tenant-settings'],
    to: '/best-practices/tenant-settings-best-practices'
  },
  {
    from: ['/best-practices/testing'],
    to: '/best-practices/rules-testing-best-practices'
  },
  {
    from: ['/tokens/concepts/token-best-practices'],
    to: '/best-practices/token-best-practices'
  },
  {
    from: ['/users/references/user-data-storage-best-practices','/users/user-data-storage'],
    to: '/best-practices/user-data-storage-best-practices'
  },
  {
      from: ['/design/using-auth0-with-multi-tenant-apps','/tutorials/using-auth0-with-multi-tenant-apps','/saas-apps'],
      to: '/best-practices/multi-tenant-applications-best-practices'
  },

  /* Brand and Customize */

  {
    from: ['/branding-customization'],
    to: '/brand-and-customize'
  },

  /* CMS */

  {
    from: ['/cms/joomla/configuration'],
    to: '/cms/integrate-with-joomla'
  },
  {
    from: ['/cms/joomla/installation'],
    to: '/cms/joomla-installation'
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
    from: ['/cms/wordpress/configuration'],
    to: '/cms/wordpress-plugin/configure-login-by-auth0'
  },
  {
    from: ['/cms/wordpress/extending'],
    to: '/cms/wordpress-plugin/extend-login-by-auth0'
  },
  {
    from: ['/cms/wordpress/troubleshoot'],
    to: '/cms/wordpress-plugin/troubleshoot-login-by-auth0'
  },
  {
    from: ['/cms/wordpress/invalid-state'],
    to: '/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors'
  },
  {
    from: ['/cms/wordpress/user-migration'],
    to: '/cms/wordpress-plugin/user-migration-in-login-by-auth0'
  },

  /* Custom Domains */

  {
    from: ['/custom-domains/troubleshoot'],
    to: '/custom-domains/troubleshoot-custom-domains'
  },
  {
    from: ['/custom-domains/self-managed-certificates'],
    to: '/custom-domains/configure-custom-domains-with-self-managed-certificates'
  },
  {
    from: ['/custom-domains/auth0-managed-certificates'],
    to: '/custom-domains/configure-custom-domains-with-auth0-managed-certificates'
  },
  {
    from: ['/custom-domains/additional-configuration'],
    to: '/custom-domains/configure-features-to-use-custom-domains'
  },

  /* Email Services */

  {
    from: ['/email'],
    to: '/auth0-email-services'
  },
  {
    from: ['/email/providers'],
    to: '/auth0-email-services/configure-external-smtp-email-providers'
  },
  {
    from: ['/email/testing'],
    to: '/auth0-email-services/configure-external-smtp-email-providers/configure-test-smtp-email-servers'
  },
  {
    from: ['/email/custom'],
    to: '/auth0-email-services/manage-email-flow'
  },
  {
    from: ['/email/templates'],
    to: '/auth0-email-services/customize-email-templates'
  },
  {
    from: ['/email/liquid-syntax'],
    to: '/auth0-email-services/customize-email-templates/use-liquid-syntax-in-email-templates'
  },
  {
    from: ['/invite-only','/tutorials/creating-invite-only-applications','/design/creating-invite-only-applications'],
    to: '/auth0-email-services/send-email-invitations-for-application-signup'
  },
  {
    from: ['/email/spa-redirect'],
    to: '/auth0-email-services/spa-redirect'
  },
 
  /* Extensions */

  {
    from: ['/topics/extensibility','/extend-integrate'],
    to: '/auth0-extensions'
  },
  {
    from: ['/extensions/authorization-extension/v2','/extensions/authorization-extension'],
    to: '/auth0-extensions/authorization-extension'
  },
  {
    from: ['/extensions/authorization-extension/v2/implementation/configuration'],
    to: '/extensions/authorization-extension/configure-authorization-extension'
  },
  {
    from: ['/extensions/authorization-extension/v2/implementation/installation'],
    to: '/extensions/authorization-extension/install-authorization-extension'
  },
  {
    from: ['/extensions/authorization-extension/v2/implementation/setup'],
    to: '/extensions/authorization-extension/set-up-authorization-extension-users'
  },
  {
    from: ['/extensions/authorization-extension/v2/api-access'],
    to: '/extensions/authorization-extension/enable-api-access-to-authorization-extension'
  },
  {
    from: ['/extensions/authorization-extension/v2/import-export-data'],
    to: '/extensions/authorization-extension/import-and-export-authorization-extension-data'
  },
  { 
    from: ['/extensions/authorization-extension/v2/migration'],
    to: '/extensions/authorization-extension/migrate-to-authorization-extension-v2'
  },
  { 
    from: ['/extensions/authorization-extension/v2/rules'],
    to: '/extensions/authorization-extension/use-rules-with-the-authorization-extension'
  },
  {
    from: ['/extensions/authorization-extension/v2/troubleshooting'],
    to: '/extensions/authorization-extension/troubleshoot-authorization-extension'
  },
  {
    from: ['/extensions/delegated-admin/v3'],
    to: '/extensions/delegated-administration-extension'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks/access'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-access-hook'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks/filter'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-filter-hook'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks/membership'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-memberships-query-hook'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks/settings'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-settings-query-hook'
  },
  {
    from: ['/extensions/delegated-admin/v3/hooks/write'],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-write-hook'
  },
  {
    from: ['/extensions/delegated-admin/v3/manage-users'],
    to: '/extensions/delegated-administration-extension/delegated-administration-manage-users'
  },
  {
    from: ['/extensions/deploy-cli'],
    to: '/extensions/deploy-cli-tool'
  },
  {
    from: ['/extensions/deploy-cli/guides/call-deploy-cli-programmatically'],
    to: '/extensions/deploy-cli-tool/call-deploy-cli-tool-programmatically'
  },
  {
    from: ['/extensions/deploy-cli/guides/create-deploy-cli-application-manually'],
    to: '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application-manually'
  },
  {
    from: ['/extensions/deploy-cli/guides/import-export-directory-structure'],
    to: '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure'
  },
  {
    from: ['/extensions/deploy-cli/guides/import-export-yaml-file'],
    to: '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file'
  },
  {
    from: ['/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment'],
    to: '/extensions/deploy-cli-tool/incorporate-deploy-cli-into-build-environment'
  },
  {
    from: ['/extensions/deploy-cli/guides/install-deploy-cli'],
    to: '/extensions/deploy-cli-tool/install-and-configure-the-deploy-cli-tool'
  },
  {
    from: ['/extensions/deploy-cli/references/deploy-cli-options'],
    to: '/extensions/deploy-cli-tool/deploy-cli-tool-options'
  },
  {
    from: ['/extensions/deploy-cli/references/environment-variables-keyword-mappings'],
    to: '/extensions/deploy-cli-tool/environment-variables-and-keyword-mappings'
  },
  {
    from: ['/extensions/deploy-cli/references/troubleshooting'],
    to: '/extensions/deploy-cli-tool/troubleshoot-the-deploy-cli-tool'
  },
  {
    from: ['/extensions/deploy-cli/references/whats-new','/extensions/deploy-cli/references/whats-new-v2'],
    to: '/extensions/deploy-cli-tool/whats-new-in-deploy-cli-tool'
  },
  {
    from: ['/extensions/account-link'],
    to: '/extensions/account-link-extension'
  },
  {
    from: ['/extensions/adldap-connector'],
    to: '/extensions/ad-ldap-connector'
  },
  {
    from: ['/extensions/application-insight'],
    to: '/extensions/export-logs-to-application-insights'
  },
  {
    from: ['/extensions/authentication-api-debugger'],
    to: '/extensions/authentication-api-debugger-extension'
  },
  {
    from: ['/extensions/authentication-api-webhooks'],
    to: '/extensions/auth0-authentication-api-webhooks'
  },
  {
    from: ['/extensions/azure-blob-storage'],
    to: '/extensions/export-logs-to-azure-blob-storage'
  },
  {
    from: ['/extensions/bitbucket-deploy'],
    to: '/extensions/bitbucket-deployments'
  },
  {
    from: ['/extensions/cloudwatch'],
    to: '/extensions/export-logs-to-cloudwatch'
  },
  {
    from: ['/extensions/custom-social-extensions'],
    to: '/extensions/custom-social-connections'
  },
  {
    from: ['/extensions/github-deploy'],
    to: '/extensions/github-deployments'
  },
  {
    from: ['/extensions/gitlab-deploy'],
    to: '/extensions/gitlab-deployments'
  },
  {
    from: ['/extensions/logentries'],
    to: '/extensions/export-logs-to-logentries'
  },
  {
    from: ['/extensions/loggly'],
    to: '/extensions/export-logs-to-loggly'
  },
  {
    from: ['/extensions/logstash'],
    to: '/extensions/export-logs-to-logstash'
  },
  {
    from: ['/extensions/management-api-webhooks'],
    to: '/extensions/auth0-management-api-webhooks'
  },
  {
    from: ['/extensions/mixpanel'],
    to: '/extensions/export-logs-to-mixpanel'
  },
  {
    from: ['/extensions/papertrail'],
    to: '/extensions/export-logs-to-papertrail'
  },
  {
    from: ['/extensions/realtime-webtask-logs'],
    to: '/extensions/real-time-webtask-logs'
  },
  {
    from: ['/extensions/segment'],
    to: '/extensions/export-logs-to-segment'
  },
  {
    from: ['/extensions/splunk'],
    to: '/extensions/export-logs-to-splunk'
  },
  {
    from: ['/extensions/sso-dashboard'],
    to: '/extensions/single-sign-on-dashboard-extension'
  },
  {
    from: ['/extensions/sumologic'],
    to: '/extensions/auth0-logs-to-sumo-logic'
  },
  {
    from: ['/extensions/troubleshoot'],
    to: '/extensions/troubleshoot-extensions'
  },
  {
    from: ['/extensions/user-import-export'],
    to: '/extensions/user-import-export-extension'
  },
  {
    from: ['/extensions/using-provided-extensions'],
    to: '/extensions'
  },
  {
    from: ['/extensions/visual-studio-team-services-deploy'],
    to: '/extensions/visual-studio-team-services-deployments'
  },
  {
    from: ['/dashboard/guides/extensions/delegated-admin-create-app'],
    to: '/extensions/delegated-administration-extension/create-delegated-admin-applications'
  },
  {
    from: ['/dashboard/guides/extensions/delegated-admin-install-extension','/dashboard/guides/extensions/delegated-admin-use-extension'],
    to: '/extensions/delegated-administration-extension/install-delegated-admin-extension'
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-add-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard'
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-install-extension'],
    to: '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension'
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-update-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard'
  },

  /* Flows */

  {
    from: ['/api-auth/tutorials/password-grant'],
    to: '/flows/call-your-api-using-resource-owner-password-flow'
  },
  {
    from: ['/flows/concepts/auth-code','/flows/concepts/regular-web-app-login-flow','/api-auth/grant/authorization-code','/api-auth/tutorials/adoption/authorization-code'],
    to: '/flows/authorization-code-flow'
  },
  {
    from: ['/flows/concepts/auth-code-pkce','/api-auth/grant/authorization-code-pkce','/flows/concepts/mobile-login-flow','/flows/concepts/single-page-login-flow','/api-auth/grant/authorization-code-pkce'],
    to: '/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce'
  },
  {
    from: ['/flows/concepts/client-credentials','/flows/concepts/m2m-flow','/api-auth/grant/client-credentials','/api-auth/tutorials/adoption/client-credentials'],
    to: '/flows/client-credentials-flow'
  },
  {
    from: ['/flows/guides/auth-code/add-login-auth-code','/flows/guides/auth-code/includes/authorize-user-add-login','/flows/guides/auth-code/includes/sample-use-cases-add-login','/flows/guides/auth-code/includes/refresh-tokens','/flows/guides/auth-code/includes/request-tokens','/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow','/oauth-web-protocol', '/protocols/oauth-web-protocol', '/protocols/oauth2/oauth-web-protocol','/application-auth/current/server-side-web'],
    to: '/flows/add-login-auth-code-flow'
  },
  {
    from: ['/flows/guides/auth-code/call-api-auth-code','/flows/guides/auth-code/includes/authorize-user-call-api','/flows/guides/auth-code/includes/sample-use-cases-call-api','/flows/guides/auth-code/includes/call-api','/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow','/api-auth/tutorials/authorization-code-grant'],
    to: '/flows/call-your-api-using-the-authorization-code-flow'
  },
  {
    from: ['/flows/guides/auth-code-pkce/add-login-auth-code-pkce','/flows/guides/auth-code-pkce/includes/sample-use-cases-add-login','/flows/guides/auth-code-pkce/includes/request-tokens','/flows/guides/auth-code-pkce/includes/refresh-tokens','/flows/guides/auth-code-pkce/includes/create-code-verifier','/flows/guides/auth-code-pkce/includes/create-code-challenge','/flows/guides/auth-code-pkce/includes/authorize-user-add-login','/application-auth/current/mobile-desktop','/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow'],
    to: '/add-login-using-the-authorization-code-flow-with-pkce'
  },
  {
    from: ['/flows/guides/auth-code-pkce/call-api-auth-code-pkce','/flows/guides/auth-code-pkce/includes/sample-use-cases-call-api','/flows/guides/auth-code-pkce/includes/call-api','/flows/guides/auth-code-pkce/includes/authorize-user-call-api','/flows/guides/mobile-login-flow/call-api-using-mobile-login-flow','/api-auth/tutorials/authorization-code-grant-pkce'],
    to: '/flows/call-your-api-using-the-authorization-code-flow-with-pkce'
  },
  {
    from: ['/flows/guides/client-credentials/call-api-client-credentials','/flows/guides/client-credentials/includes/sample-use-cases','/flows/guides/client-credentials/includes/call-api','/flows/guides/client-credentials/includes/request-token','/flows/guides/m2m-flow/call-api-using-m2m-flow','/api-auth/tutorials/client-credentials','/api-auth/config/asking-for-access-tokens'],
    to: '/flows/call-your-api-using-the-client-credentials-flow'
  },
  {
    from: ['/flows/concepts/device-auth','/flows/guides/device-auth/call-api-device-auth'],
    to: '/flows/device-authorization-flow'
  },
  {
    from: ['/flows/guides/implicit/add-login-implicit','/flows/guides/implicit/includes/sample-use-cases-add-login','/flows/guides/implicit/includes/refresh-tokens','/flows/guides/implicit/includes/request-tokens','/flows/guides/implicit/includes/authorize-user-add-login','/application-auth/current/client-side-web','/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow'],
    to: '/flows/add-login-using-the-implicit-flow-with-form-post'
  },
  {
    from: ['/flows/guides/implicit/call-api-implicit','/flows/guides/implicit/includes/sample-use-cases-call-api','/flows/guides/implicit/includes/call-api','/flows/guides/implicit/includes/authorize-user-call-api','/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow','/api-auth/grant/implicit','/api-auth/tutorials/adoption/implicit','/api-auth/tutorials/implicit-grant','/protocols/oauth2/oauth-implicit-protocol','/flows/concepts/implicit'],
    to: '/flows/implicit-flow-with-form-post'
  },
  {
    from: ['/api-auth/grant/password','/api-auth/tutorials/adoption/password'],
    to: '/flows/resource-owner-password-flow'
  },

  /* Get Started */

  {
    from: ['/dashboard/guides/tenants/configure-device-user-code-settings'],
    to: '/get-started/dashboard/configure-device-user-code-settings'
  },
  {
    from: ['/dashboard/guides/tenants/create-multiple-tenants'],
    to: '/get-started/dashboard/create-multiple-tenants'
  },
  {
    from: ['/dashboard/guides/tenants/enable-sso-tenant'],
    to: '/get-started/dashboard/enable-sso-for-legacy-tenants'
  },
  {
    from: ['/api/management/guides/tenants/configure-session-lifetime-settings'],
    to: '/get-started/dashboard/configure-session-lifetime-settings'
  },
  {
    from: ['/overview','/get-started/overview','/getting-started','/getting-started/overview'],
    to: '/get-started'
  },
  {
    from: ['/dashboard'],
    to: '/get-started/dashboard'
  },
  {
    from: ['/dashboard/guides/apis/delete-permissions-apis'],
    to: '/get-started/dashboard/delete-api-permissions'
  },
  {
    from: ['/dashboard/guides/connections/set-up-connections-social'],
    to: '/get-started/dashboard/set-up-social-connections'
  },
  {
    from: ['/dashboard/guides/connections/test-connections-database'],
    to: '/get-started/dashboard/test-database-connections'
  },
  {
    from: ['/dashboard/guides/connections/test-connections-enterprise'],
    to: '/get-started/dashboard/test-enterprise-connections'
  },
  {
    from: ['/dashboard/guides/connections/test-connections-social'],
    to: '/get-started/dashboard/test-social-connections'
  },
  {
    from: ['/dashboard/guides/connections/view-connections'],
    to: '/get-started/dashboard/view-connections'
  },
  {
    from: ['/dashboard/guides/connections/enable-connections-enterprise'],
    to: '/get-started/dashboard/enable-enterprise-connections'
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-create-app'],
    to: '/get-started/dashboard/create-sso-dashboard-application'
  },
  {
    from: ['/dashboard/guides/apis/add-permissions-apis','/api/management/guides/apis/update-permissions-apis'],
    to: '/get-started/dashboard/add-api-permissions'
  },
  {
    from: ['/api/management/guides/connections/promote-connection-domain-level'],
    to: '/get-started/dashboard/promote-connections-to-domain-level'
  },
  {
    from: ['/api/management/guides/connections/retrieve-connection-options','/api/management/guides/retrieve-connection-options'],
    to: '/get-started/dashboard/retrieve-connection-options'
  },
  {
    from: ['/dashboard/reference/settings-api'],
    to: '/get-started/dashboard/api-settings'
  },
  {
    from: ['/dashboard/reference/settings-application','/clients/client-settings','/applications/application-settings'],
    to: '/get-started/dashboard/application-settings'
  },
  {
    from: ['/dashboard/reference/settings-tenant','/tutorials/dashboard-tenant-settings','/dashboard-account-settings','/dashboard/dashboard-tenant-settings'],
    to: '/get-started/dashboard/tenant-settings'
  },
  {
    from: ['/dashboard/manage-dashboard-admins','/tutorials/manage-dashboard-admins'],
    to: '/get-started/dashboard/manage-dashboard-users'
  },
  {
    from: ['/api/management/guides/applications/rotate-client-secret'],
    to: '/get-started/dashboard/rotate-client-secret'
  },

  /* Hooks */

  {
    from: ['/hooks/cli','/hooks/cli','/hooks/dashboard','/hooks/overview'],
    to: '/hooks'
  },
  {
    from: '/hooks/concepts/extensibility-points',
    to: '/hooks/extensibility-points'
  },
  {
    from: ['/hooks/concepts/credentials-exchange-extensibility-point','/hooks/guides/use-the-credentials-exchange-extensibility-point','/hooks/client-credentials-exchange'],
    to: '/hooks/extensibility-points/client-credentials-exchange'
  },
  {
    from: ['/hooks/create','/hooks/dashboard/create-delete','/hooks/cli/create-delete','/hooks/guides/create-hooks-using-cli','/hooks/guides/create-hooks-using-dashboard'],
    to: '/hooks/create-hooks'
  },
  {
    from: ['/hooks/delete','/hooks/guides/delete-hooks-using-cli','/hooks/guides/delete-hooks-using-dashboard'],
    to: '/hooks/delete-hooks'
  },
  {
    from: ['/hooks/enable-disable','/hooks/cli/enable-disable','/hooks/dashboard/enable-disable','/hooks/guides/enable-disable-hooks-using-cli','/hooks/guides/enable-disable-hooks-using-dashboard'],
    to: '/hooks/enable-disable-hooks'
  },
  {
    from: ['/hooks/guides/post-change-password'],
    to: '/hooks/extensibility-points/post-change-password'
  },
  {
    from: ['/hooks/concepts/post-user-registration-extensibility-point','/hooks/guides/use-the-post-user-registration-extensibility-point'],
    to: '/hooks/extensibility-points/post-user-registration'
  },
  {
    from: ['/hooks/concepts/pre-user-registration-extensibility-point','/hooks/guides/use-the-pre-user-registration-extensibility-point'],
    to: '/hooks/extensibility-points/pre-user-registration'
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
    from: ['/hooks/update','/hooks/cli/edit','/hooks/dashboard/edit','/hooks/guides/edit-hooks-using-cli','/hooks/guides/edit-hooks-using-dashboard'],
    to: '/hooks/update-hooks'
  },
  {
    from: ['/hooks/view-logs','/hooks/cli/logs','/hooks/logs','/hooks/guides/logging-hooks-using-cli'],
    to: '/hooks/view-logs-for-hooks'
  },
  {
    from: ['/hooks/view'],
    to: '/hooks/view-hooks'
  },

  /* Identity Labs */

  {
    from: ['/identity-labs/01-web-sign-in'],
    to: '/identity-labs/lab-1-web-sign-in'
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-01'],
    to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-1'
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-02'],
    to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-2'
  },
  {
    from: ['/identity-labs/02-calling-an-api'],
    to: '/identity-labs/identity-lab-2-calling-api'
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-01'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-1'
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-02'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-2'
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-03'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-3'
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-01'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-1'
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-02'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-2'
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-03'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-3'
  },
  {
    from: ['/identity-labs/04-single-page-app'],
    to: '/identity-labs/lab-4-single-page-app'
  },
  {
    from: ['/identity-labs/04-single-page-app/exercise-01'],
    to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-1'
  },
  {
    from: ['/identity-labs/04-single-page-app/exercise-02'],
    to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-2'
  },

  /* Integrations */

  {
    from: ['/aws-api-setup'],
    to: '/integrations/how-to-set-up-aws-for-delegated-authentication'
  },
  {
    from: ['/integrations/aws/sso'],
    to: '/integrations/configure-amazon-web-services-for-sso'
  },
  {
    from: ['/integrations/aws/tokens'],
    to: '/integrations/call-aws-apis-and-resources-with-tokens'
  },
  {
    from: ['/scenarios/amazon-cognito', '/tutorials/integrating-auth0-amazon-cognito-mobile-apps', '/integrations/integrating-auth0-amazon-cognito-mobile-apps', '/integrations/integrate-with-amazon-cognito'],
    to: '/integrations/amazon-cognito'
  },
  {
    from: ['/scenarios-mqtt','/tutorials/authenticating-devices-using-mqtt','/integrations/authenticating-devices-using-mqtt'],
    to: '/integrations/authenticate-devices-using-mqtt'
  },
  {
    from: ['/scenarios-tessel', '/tutorials/authenticating-a-tessel-device', '/integrations/authenticating-a-tessel-device'],
    to: '/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0'
  },
  {
    from: ['/aws', '/awsapi-tutorial'],
    to: '/integrations/aws'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation'],
    to: '/integrations/aws-api-gateway-delegation'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/part-1'],
    to: '/integrations/aws-api-gateway-delegation-1'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/part-2'],
    to: '/integrations/aws-api-gateway-delegation-2'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/part-3'],
    to: '/integrations/aws-api-gateway-delegation-3'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/part-4'],
    to: '/integrations/aws-api-gateway-delegation-4'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/part-5'],
    to: '/integrations/aws-api-gateway-delegation-5'
  },
  {
    from: ['/integrations/aws-api-gateway/delegation/secure-api-with-cognito'],
    to: '/aws-api-gateway-cognito'
  },
  {
    from: ['/integrations/aws-api-gateway/custom-authorizers', '/integrations/aws-api-gateway/custom-authorizers/part-1', '/integrations/aws-api-gateway/custom-authorizers/part-2', '/integrations/aws-api-gateway/custom-authorizers/part-3', '/integrations/aws-api-gateway/custom-authorizers/part-4'],
    to: '/integrations/aws-api-gateway-custom-authorizers'
  },
  {
    from: ['/sharepoint-apps', '/integrations/sharepoint-apps'],
    to: '/integrations/connecting-provider-hosted-apps-to-sharepoint-online'
  },
  {
    from: ['/integrations/google-cloud-platform', '/tutorials/google-cloud-platform'],
    to: '/integrations/google-cloud-endpoints'
  },
  {
    from: ['/integrations/marketing/salesforce'],
    to: '/integrations/marketing/export-user-data-salesforce'
  },
    {
    from: ['/tutorials/office365-connection-deprecation-guide', '/integrations/office365-connection-deprecation-guide','/office365-deprecated'],
    to: '/integrations/migrate-office365-connections-to-windows-azure-ad'
  },
  {
    from: ['/integrations/office-365-custom-provisioning'],
    to: '/integrations/office-365-custom-provisioning'
  },
  {
    from: ['/tutorials/using-auth0-to-secure-a-cli', '/integrations/using-auth0-to-secure-a-cli','/tutorials/using-auth0-to-secure-an-api','/cli'],
    to: '/integrations/secure-a-cli-with-auth0'
  },
  {
    from: ['/integrations/sharepoint'],
    to: '/integrations/sharepoint-2010-2013'
  },
  {
    from: ['/sso/current/integrations', '/integrations/sso'],
    to: '/integrations/sso-integrations'
  },
  {
    from: ['/sso/current/integrations/ad-rms', '/integrations/sso/ad-rms'],
    to: '/integrations/sso-integrations/ad-rms-sso-integration'
  },
  {
    from: ['/sso/current/integrations/box', '/integrations/sso/box'],
    to: '/integrations/sso-integrations/box'
  },
  {
    from: ['/sso/current/integrations/cloudbees', '/integrations/sso/cloudbees'],
    to: '/integrations/sso-integrations/cloudbees'
  },
  {
    from: ['/sso/current/integrations/concur', '/integrations/sso/concur'],
    to: '/integrations/sso-integrations/concur'
  },
  {
    from: ['/sso/current/integrations/disqus', '/integrations/sso/disqus'],
    to: '/integrations/sso-integrations/disqus'
  },
  {
    from: ['/sso/current/integrations/dropbox', '/integrations/sso/dropbox'],
    to: '/integrations/sso-integrations/dropbox'
  },
  {
    from: ['/sso/current/integrations/dynamics-crm', '/integrations/sso/dynamics-crm'],
    to: '/integrations/sso-integrations/dynamics-crm'
  },
  {
    from: ['/sso/current/integrations/echosign', '/integrations/sso/echosign'],
    to: '/integrations/sso-integrations/echosign'
  },
  {
    from: ['/sso/current/integrations/egnyte', '/integrations/sso/egnyte'],
    to: '/integrations/sso-integrations/egnyte'
  },
  {
    from: ['/sso/current/integrations/new-relic', '/integrations/sso/new-relic'],
    to: '/integrations/sso-integrations/new-relic'
  },
  {
    from: ['/sso/current/integrations/office-365', '/integrations/sso/office-365'],
    to: '/integrations/sso-integrations/office-365'
  },
  {
    from: ['/sso/current/integrations/salesforce', '/integrations/sso/salesforce'],
    to: '/integrations/sso-integrations/salesforce'
  },
  {
    from: ['/sso/current/integrations/slack', '/integrations/sso/slack','/integrations/integrating-with-slack','/tutorials/integrating-with-slack','/scenarios/slack'],
    to: '/integrations/sso-integrations/slack'
  },
  {
    from: ['/sso/current/integrations/sentry', '/integrations/sso/sentry'],
    to: '/integrations/sso-integrations/sentry'
  },
  {
    from: ['/sso/current/integrations/sharepoint', '/integrations/sso/sharepoint'],
    to: '/integrations/sso-integrations/sharepoint'
  },
  {
    from: ['/sso/current/integrations/springcm', '/integrations/sso/springcm'],
    to: '/integrations/sso-integrations/springcm'
  },
  {
    from: ['/sso/current/integrations/zendesk', '/integrations/sso/zendesk'],
    to: '/integrations/sso-integrations/zendesk'
  },
  {
    from: ['/sso/current/integrations/zoom', '/integrations/sso/zoom'],
    to: '/integrations/sso-integrations/zoom'
  },
  {
    from: ['/integrations/azure-tutorial','/tutorials/azure-tutorial'],
    to: '/integrations/azure-api-management'
  },

  /* LDAP Connector */

  {
    from: ['/connector'],
    to: '/ad-ldap-connector'
  },
  {
    from: ['/connector/prerequisites'],
    to: '/ad-ldap-connector/ad-ldap-connector-requirements'
  },
  {
    from: ['/connector/client-certificates'],
    to: '/ad-ldap-connector/configure-ad-ldap-connector-client-certificates'
  },
  {
    from: ['/connector/kerberos'],
    to: '/ad-ldap-connector/configure-ad-ldap-connector-with-kerberos'
  },
  {
    from: ['/connector/high-availability'],
    to: '/ad-ldap-connector/ad-ldap-high-availability'
  },
  {
    from: ['/dashboard/guides/connections/disable-cache-ad-ldap'],
    to: '/ad-ldap-connector/disable-credential-caching'
  },
  {
    from: ['/adldap-x','/connector/install-other-platforms','/connector/install','/adldap-auth'],
    to: '/ad-ldap-connector/install-configure-ad-ldap-connector'
  },
  {
    from: ['/connector/scom-monitoring'],
    to: '/ad-ldap-connector/ad-ldap-connector-scom'
  },
  {
    from: ['/connector/modify'],
    to: '/ad-ldap-connector/ad-ldap-connector-to-auth0'
  },
  {
    from: ['/connector/test-dc'],
    to: '/ad-ldap-connector/ad-ldap-connector-test-environment'
  },
  {
    from: ['/connector/troubleshooting'],
    to: '/ad-ldap-connector/troubleshoot-ad-ldap-connector'
  },
  {
    from: ['/connector/update'],
    to: '/ad-ldap-connector/update-ad-ldap-connectors'
  },

  /* Libraries */

  {
    from: ['/custom-signup', '/libraries/lock/v10/custom-signup', '/libraries/lock/v11/custom-signup'],
    to: '/libraries/custom-signup'
  },
  {
    from: '/libraries/lock-android/error-messages',
    to: '/libraries/error-messages'
  },
  {
    from: ['/widget','/login-widget2','/lock','/migrations/guides/legacy-lock-api-deprecation','/libraries/lock/v9','/libraries/lock/v9/display-modes','/libraries/lock/v9/types-of-applications','/libraries/lock/v10','/libraries/lock/v10/installation','/libraries/lock/v11','/libraries/lock/using-refresh-tokens','/libraries/lock/using-a-refresh-token'],
    to: '/libraries/lock'
  },
  {
    from: ['/libraries/lock/display-modes','/libraries/lock/customization','/libraries/lock/v9/customization','/libraries/lock/v10/customization','/libraries/lock/v11/customization','/libraries/lock/v9/configuration','/libraries/lock/v10/configuration','/libraries/lock/v11/configuration'],
    to: '/libraries/lock/lock-configuration'
  },
  {
    from: ['/libraries/lock/v10/popup-mode','/libraries/lock/v10/authentication-modes','/libraries/lock/v11/popup-mode','/libraries/lock/v11/authentication-modes'],
    to: '/libraries/lock/lock-authentication-modes'
  },
  {
    from: ['/hrd','/libraries/lock/v11/selecting-the-connection-for-multiple-logins'],
    to: '/libraries/lock/selecting-from-multiple-connection-options'
  },
  {
    from: ['/libraries/lock-ios/delegation-api','/libraries/lock-ios/v1/delegation-api','/libraries/lock-ios','/libraries/lock-ios/lock-ios-api','/libraries/lock-ios/v1/lock-ios-api','/libraries/lock-ios/native-social-authentication','/libraries/lock-ios/v1/native-social-authentication','/libraries/lock-ios/password-reset-ios','/libraries/lock-ios/v1/password-reset-ios','/libraries/lock-ios/save-and-refresh-jwt-tokens','/libraries/lock-ios/v1/save-and-refresh-jwt-tokens','/libraries/lock-ios/sending-authentication-parameters','/libraries/lock-ios/v1/sending-authentication-parameters','/libraries/lock-ios/swift','/libraries/lock-ios/v1/swift'],
    to: '/libraries/lock-swift'
  },
  {
    from: ['/libraries/lock-ios/logging','/libraries/lock-ios/v1/logging'],
    to: '/libraries/lock-swift/lock-swift-logging'
  },
  {
    from: ['/libraries/lock-ios/sms-lock-ios','/libraries/lock-ios/v1/sms-lock-ios','/libraries/lock-ios/touchid-authentication','/libraries/lock-ios/v1/touchid-authentication'],
    to: '/libraries/lock-swift/lock-swift-passwordless'
  },
  {
    from: ['/libraries/lock-ios/use-your-own-ui','/libraries/lock-ios/v1/use-your-own-uis'],
    to: '/libraries/lock-swift/lock-swift-customization'
  },
  {
    from: ['/auth0js','/libraries/auth0js/v7','/libraries/auth0js/v8','/libraries/auth0js/v9','/libraries/lock/v10/auth0js','/libraries/lock/v11/auth0js'],
    to: '/libraries/auth0js'
  },
  {
    from: ['/libraries/auth0-android'],
    to: '/libraries/auth0-android'
  },
  {
    from: ['/libraries/auth0-android/configuration'],
    to: '/libraries/auth0-android/auth0-android-configuration'
  },
  {
    from: ['/tutorials/local-testing-and-development','/local-testing-and-development'],
    to: 'libraries/secure-local-development'
  },

  /* Logout */

  {
    from: ['/logout/guides/logout-applications'],
    to: '/logout/log-users-out-of-applications'
  },
  {
    from: ['/logout/guides/logout-auth0'],
    to: '/logout/log-users-out-of-auth0'
  },
  {
    from: ['/logout/guides/logout-idps'],
    to: '/logout/log-users-out-of-idps'
  },
  {
    from: ['/logout/guides/logout-saml-idps'],
    to: '/logout/log-users-out-of-saml-idps'
  },
  {
    from: ['/logout/guides/redirect-users-after-logout'],
    to: '/logout/redirect-users-after-logout'
  },

  /* MFA */
  
  {
    from: ['/multi-factor-authentication','/multi-factor-authentication2','/multifactor-authentication/custom-provider','/multifactor-authentication','/mfa-in-auth0','/multifactor-authentication/yubikey','/multifactor-authentication/guardian','/multifactor-authentication/guardian/user-guide','/multi-factor-authentication/yubikey','/multifactor-authentication/yubikey'],
    to: '/mfa'
  },
  {
    from: ['/multifactor-authentication/api', '/multifactor-authentication/api/faq','/mfa/concepts/mfa-api'],
    to: '/mfa/mfa-api'
  },
  {
    from: ['/api-auth/tutorials/multifactor-resource-owner-password','/mfa/guides/mfa-api/multifactor-resource-owner-password'],
    to: '/mfa/authenticate-with-ropg-and-mfa'
  },
  {
    from: ['/mfa/guides/mfa-api/manage','/multifactor-authentication/api/manage'],
    to: '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api'
  },
  {
    from: ['/mfa/guides/mfa-api/phone','/multifactor-authentication/api/oob','/mfa/guides/mfa-api/oob'],
    to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-sms-and-voice-authenticators'
  },
  {
    from: ['/mfa/guides/mfa-api/push'],
    to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-push-authenticators'
  },
  {
    from: ['/multifactor-authentication/api/otp','/mfa/guides/mfa-api/otp'],
    to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-otp-authenticators'
  },
  {
    from: ['/multifactor-authentication/api/email','/mfa/guides/mfa-api/email'],
    to: '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-email-authenticators'
  },
  {
    from: ['/mfa/send-phone-message-hook-amazon-sns'],
    to: '/mfa/configure-amazon-sns-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-esendex'],
    to: '/mfa/configure-esendex-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-infobip'],
    to: '/mfa/configure-infobip-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-mitto'],
    to: '/mfa/configure-mitto-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-telesign'],
    to: '/mfa/configure-telesign-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-twilio'],
    to: '/mfa/configure-twilio-as-mfa-sms-provider'
  },
  {
    from: ['/mfa/send-phone-message-hook-vonage'],
    to: '/mfa/configure-vonage-as-mfa-sms-provider'
  },
  {
    from: ['/multifactor-authentication/factors','/mfa/concepts/mfa-factors'],
    to: '/mfa/mfa-factors'
  },
  {
    from: ['/multifactor-authentication/factors/duo','/mfa/guides/configure-cisco-duo'],
    to: '/mfa/configure-cisco-duo-for-mfa'
  },
  {
    from: ['/multifactor-authentication/factors/otp','/mfa/guides/configure-otp'],
    to: '/mfa/configure-otp-notifications-for-mfa'
  },
  {
    from: ['/mfa/guides/configure-email-universal-login','/multifactor-authentication/factors/email','/mfa/guides/configure-email'],
    to: '/mfa/configure-email-notifications-for-mfa'
  },
  {
    from: ['/multifactor-authentication/developer/sns-configuration','/multifactor-authentication/factors/push','/mfa/guides/configure-push'],
    to: '/mfa/configure-push-notifications-for-mfa'
  },
  {
    from: ['/multifactor-authentication/twilio-configuration','/multifactor-authentication/factors/sms','/mfa/guides/configure-sms','/mfa/guides/configure-phone'],
    to: '/mfa/configure-sms-and-voice-notifications-for-mfa'
  },
  {
    from: ['/mfa/guides/guardian/customize-sms-messages','/multifactor-authentication/sms-templates','/mfa/guides/customize-phone-messages'],
    to: '/mfa/customize-sms-or-voice-messages'
  },
  {
    from: ['/multifactor-authentication/google-auth/user-guide','/multifactor-authentication/troubleshooting','/mfa/references/troubleshoot-mfa','/mfa/references/troubleshooting','/mfa/references/troubleshoot-mfa'],
    to: '/mfa/troubleshoot-mfa-issues'
  },
  {
    from: ['/multifactor-authentication/developer/step-up-authentication','/tutorials/step-up-authentication','/tutorials/setup-up-authentication','/multifactor-authentication/step-up-authentication','/mfa/concepts/step-up-authentication','/mfa/concepts/step-up-authentication'],
    to: '/mfa/step-up-authentication'
  },
  {
    from: ['/multifactor-authentication/developer/step-up-authentication/step-up-for-apis','/multifactor-authentication/step-up-authentication/step-up-for-apis','/mfa/guides/configure-step-up-apis'],
    to: '/mfa/step-up-authentication/configure-step-up-authentication-for-apis'
  },
  {
    from: ['/multifactor-authentication/developer/step-up-authentication/step-up-for-web-apps','/multifactor-authentication/step-up-authentication/step-up-for-web-apps','/mfa/guides/configure-step-up-web-apps'],
    to: '/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps'
  },
  {
    from: ['/multifactor-authentication/reset-user','/mfa/guides/reset-user-mfa'],
    to: '/mfa/reset-user-mfa'
  },
  {
    from: ['/mfa/concepts/guardian'],
    to: '/mfa/auth0-guardian'
  },
  {
    from: ['/multifactor-authentication/developer/custom-enrollment-ticket','/mfa/guides/guardian/create-enrollment-ticket'],
    to: '/mfa/auth0-guardian/create-custom-enrollment-tickets'
  },
  {
    from: ['/multifactor-authentication/developer/libraries/ios','/mfa/guides/guardian/guardian-ios-sdk'],
    to: '/mfa/auth0-guardian/guardian-for-ios-sdk'
  },
  {
    from: ['/multifactor-authentication/developer/libraries/android','/mfa/guides/guardian/guardian-android-sdk'],
    to: '/mfa/auth0-guardian/guardian-for-android-sdk'
  },
  {
    from: ['/mfa/guides/guardian/install-guardian-sdk'],
    to: '/mfa/auth0-guardian/install-guardian-sdk'
  },
  {
    from: ['/mfa/references/guardian-error-code-reference'],
    to: '/mfa/auth0-guardian/guardian-error-code-reference'
  },
  {
    from: ['/mfa/guides/import-user-mfa'],
    to: '/mfa/import-user-mfa-authenticator-enrollments'
  },
  {
    from: ['/mfa/concepts/mfa-developer-resources','/multifactor-authentication/developer','/mfa/concepts/developer-resources'],
    to: '/mfa/mfa-developer-resources'
  },  
  {
    from: ['/mfa/guides/enable-mfa'],
    to: '/mfa/enable-mfa'
  },
  {
    from: ['/multifactor-authentication/custom','/mfa/guides/customize-mfa-universal-login'],
    to: '/mfa/customize-mfa-user-pages'
  },
  {
    from: ['/mfa/guides/mfa-api/recovery-code'],
    to: '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api/challenge-with-recovery-codes'
  },
  
  /* Monitoring */

  {
    from: ['/monitoring','/tutorials/how-to-monitor-auth0'],
    to: '/monitor-auth0'
  },
  {
    from: ['/monitoring/guides/check-external-services'],
    to: '/monitor-auth0/check-external-services-status'
  },
  {
    from: ['/monitoring/guides/check-status'],
    to: '/monitor-auth0/check-auth0-status'
  },
  {
    from: ['/monitoring/guides/monitor-applications'],
    to: '/monitor-auth0/monitor-applications'
  },
  {
    from: ['/monitoring/guides/monitor-using-SCOM'],
    to: '/monitor-auth0/monitor-using-scom'
  },
  {
    from: ['/monitoring/guides/track-leads-salesforce','/tutorials/tracking-new-leads-in-salesforce-and-raplead','/scenarios-rapleaf-salesforce', '/scenarios/rapleaf-salesforce'],
    to: '/monitor-auth0/track-new-leads-in-salesforce'
  },
  {
    from: ['/monitoring/guides/track-signups-salesforce','/tutorials/track-signups-enrich-user-profile-generate-leads','/scenarios-mixpanel-fullcontact-salesforce','/scenarios/mixpanel-fullcontact-salesforce'],
    to: '/monitor-auth0/track-new-sign-ups-in-salesforce'
  },

  /* Policies */

  {
    from: ['/policies/billing'],
    to: '/policies/billing-policy'
  },
  {
    from: ['/policies/dashboard-authentication'],
    to: '/policies/dashboard-authentication-policy'
  },
  {
    from: ['/policies/data-export'],
    to: '/policies/data-export-and-transfer-policy'
  },
  {
    from: ['/policies/entity-limits'],
    to: '/policies/entity-limit-policy'
  },
  {
    from: ['/policies/load-testing'],
    to: '/policies/load-testing-policy'
  },
  {
    from: ['/rate-limits', '/policies/rate-limit', '/policies/rate-limits'],
    to: '/policies/rate-limit-policy'
  },
  {
    from: ['/policies/rate-limits-api'],
    to: '/policies/rate-limit-policy/authentication-api-endpoint-rate-limits'
  },
  {
    from: ['/policies/rate-limits-mgmt-api'],
    to: '/policies/rate-limit-policy/management-api-endpoint-rate-limits'
  },
  {
    from: ['/policies/legacy-rate-limits'],
    to: '/policies/rate-limit-policy/mgmt-api-endpoint-rate-limits-before-19-may-2020'
  },
  {
    from: ['/policies/penetration-testing'],
    to: '/policies/penetration-testing-policy'
  },

  /* Pre-deployment */

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
      to: '/pre-deployment/how-to-run-production-checks/production-checks-best-practices'
  },
  {
      from: ['/pre-deployment/tests/recommended'],
      to: '/pre-deployment/how-to-run-production-checks/production-checks-recommended-fixes'
  },
  {
      from: ['/pre-deployment/tests/required'],
      to: '/pre-deployment/how-to-run-production-checks/production-checks-required-fixes'
  },

  /* Private Cloud */

  {
    from: ['/appliance/checksum','/appliance/proxy-updater','/appliance/update','/updating-appliance','/enterprise/private-cloud/overview','/appliance/dashboard/instrumentation','/appliance/instrumentation'],
    to: '/private-cloud'
  },
  {
    from: ['/services/private-cloud-configuration','/services/private-saas-configuration','/private-saas-deployment/onboarding','/private-saas-deployment/onboarding/private-cloud','/private-cloud/onboarding','/private-cloud/onboarding/private-cloud'], 
    to: '/private-cloud/private-cloud-onboarding'
  },
  {
    from: ['/private-saas-deployment/onboarding/managed-private-cloud/ip-domain-port-list','/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list'],
    to: '/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list'
  },
  {
    from: ['/private-saas-deployment/onboarding/managed-private-cloud/infrastructure','/private-cloud/onboarding/managed-private-cloud/infrastructure','/private-saas-deployment/managed-private-cloud','/private-cloud/onboarding/managed-private-cloud','/private-saas-deployment/onboarding/managed-private-cloud','/private-cloud/onboarding/managed-private-cloud'], 
    to: '/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements'
  },
  {
    from: ['/private-saas-deployment/private-cloud','/private-cloud/standard-private-cloud'], 
    to: '/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements'
  },
  {
    from: ['/private-saas-deployment'], 
    to: '/private-cloud/private-cloud-deployments'
  },
  {
    from: ['/private-saas-deployment/add-ons','/private-cloud/add-ons'], 
    to: '/private-cloud/private-cloud-deployments/private-cloud-addon-options'
  },
  {
    from: ['/private-saas-deployment/custom-domain-migration','/private-cloud/custom-domain-migration'], 
    to: '/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains'
  },
  {
    from: ['/services/private-saas-management','/services/private-cloud-management'],
    to: '/private-cloud/private-cloud-operations'
  },

  /* Product-Lifecycle */
  {
    from: '/lifecycle',
    to: '/product-lifecycle'
  },

  {
    from: ['/product-lifecycle/deprecation-eol'],
    to: '/product-lifecycle/migration-process'
  },
  {
    from: ['/product-lifecycle/migrations','/migrations'],
    to: '/product-lifecycle/deprecations-and-migrations'
  },
  {
    from: ['/migrations/guides/account-linking','/users/guides/link-user-accounts-auth-api'],
    to: '/product-lifecycle/deprecations-and-migrations/link-user-accounts-with-access-tokens-migration'
  },
  {
    from: ['/migrations/guides/calling-api-with-idtokens'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-calling-api-with-access-tokens'
  },
  {
    from: ['/guides/login/migration-embedded-universal','/guides/login/migration-embedded-centralized'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-from-embedded-login-to-universal-login'
  },
  {
    from: ['/guides/migration-legacy-flows'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-from-legacy-auth-flows'
  },
  {
    from: ['/migrations/guides/clickjacking-protection'],
    to: '/product-lifecycle/deprecations-and-migrations/clickjacking-protection-for-universal-login'
  },
  {
    from: ['/migrations/guides/extensibility-node12'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12'
  },
  {
    from: ['/migrations/guides/facebook-graph-api-deprecation'],
    to: '/product-lifecycle/deprecations-and-migrations/facebook-graph-api-changes'
  },
  {
    from: ['/migrations/guides/facebook-social-context'],
    to: '/product-lifecycle/deprecations-and-migrations/facebook-social-context-field-deprecation'
  },
  {
    from: ['/migrations/guides/google_cloud_messaging'],
    to: '/product-lifecycle/deprecations-and-migrations/google-firebase-migration'
  },
  {
    from: ['/migrations/guides/instagram-deprecation'],
    to: '/product-lifecycle/deprecations-and-migrations/instagram-connection-deprecation'
  },
  {
    from: ['/migrations/guides/management-api-v1-v2','/api/management/v1/use-cases','/api/v1'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-management-api-v2'
  },
  {
    from: ['/migrations/guides/migration-oauthro-oauthtoken'],
    to: '/product-lifecycle/deprecations-and-migrations/migration-oauthro-oauthtoken'
  },
  {
    from: ['/migrations/guides/migration-oauthro-oauthtoken-pwdless'],
    to: '/product-lifecycle/deprecations-and-migrations/resource-owner-passwordless-credentials-exchange'
  },
  {
    from: ['/migrations/guides/passwordless-start'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-passwordless'
  },
  {
    from: ['/migrations/guides/unpaginated-requests'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-paginated-queries'
  },
  {
    from: ['/migrations/guides/yahoo-userinfo-updates'],
    to: '/product-lifecycle/deprecations-and-migrations/yahoo-api-changes'
  },
  {
    from: ['/migrations/past-migrations'],
    to: '/product-lifecycle/deprecations-and-migrations/past-migrations'
  },

  /* Professional Services */

  {
    from: ['/services','/auth0-professional-services'],
    to: '/professional-services'
  },
  {
    from: ['/services/scenario-guidance'],
    to: '/professional-services/advisory-sessions'
  },
  {
    from: ['/services/architectural-design'],
    to: '/professional-services/architectural-design-services'
  },
  {
    from: ['/services/custom-implementation'],
    to: '/professional-services/custom-implementation-services'
  },
  {
    from: ['/services/performance-scalability'],
    to: '/professional-services/performance-and-scalability-services'
  },
  {
    from: ['/services/solution-design'],
    to: '/professional-services/solution-design-services'
  },

  /* Protocols */

  {
    from: ['/dashboard/guides/applications/set-up-addon-saml2-aws'],
    to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-aws'
  },
  {
    from: ['/tutorials/openid-connect-discovery','/protocols/oidc/openid-connect-discovery','/oidc-rs256-owin'],
    to: '/protocols/configure-applications-with-oidc-discovery'
  },
  {
    from: ['/protocols/oidc/identity-providers/okta'],
    to: '/protocols/configure-okta-as-oidc-identity-provider'
  },
  {
    from: ['/integrations/configure-wsfed-application','/tutorials/configure-wsfed-application'],
    to: '/protocols/configure-ws-fed-applications'
  },
  {
    from: ['/samlp-providers','/protocols/saml/samlp-providers', '/protocols/saml'],
    to: '/protocols/saml-protocol'
  },
  {
    from: ['/protocols/saml/saml-configuration/troubleshoot','/protocols/saml/saml-configuration/troubleshoot/common-saml-errors','/protocols/saml/saml-configuration/troubleshoot/auth0-as-sp'],
    to: '/protocols/saml-protocol/troubleshoot-saml-configurations'
  },
  {
    from: ['/protocols/oauth2/oauth-state','/protocols/oauth-state'],
    to: '/protocols/state-parameters'
  },
  {
    from: ['/saml-apps','/protocols/saml/saml-apps','/saml-configuration','/protocols/saml/saml-configuration'],
    to: '/protocols/saml-configuration-options'
  },
  {
    from: ['/protocols/saml/adfs'],
    to: '/protocols/saml-configuration-options/configure-adfs-saml-connections'
  },
  {
    from: ['/saml-apps/cisco-webex','/protocols/saml/saml-apps/cisco-webex'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex'
  },
  {
    from: ['/saml-apps/datadog','/protocols/saml/saml-apps/datadog'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog'
  },
  {
    from: ['/protocols/saml/saml-apps/egencia'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-egencia'
  },
  {
    from: ['/saml-apps/freshdesk','/protocols/saml/saml-apps/freshdesk'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk'
  },
  {
    from: ['/protocols/saml/saml-apps/google-apps'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-idp-for-google-g-suite'
  },
  {
    from: ['/saml-idp-generic','/protocols/saml/saml-idp-generic'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-saml-identity-provider'
  },
  {
    from: ['/protocols/saml/saml-sp-generic','/saml-sp-generic','/protocols/saml/saml-configuration/auth0-as-service-provider'],
    to: '/protocols/saml-configuration-options/configure-auth0-saml-service-provider'
  },
  {
    from: ['/protocols/saml/identity-providers/okta','/okta', '/saml/identity-providers/okta'],
    to: '/protocols/saml-configuration-options/configure-okta-as-saml-identity-provider'
  },
  {
    from: ['/onelogin', '/saml/identity-providers/onelogin','/protocols/saml/identity-providers/onelogin'],
    to: '/protocols/saml-configuration-options/configure-onelogin-as-saml-identity-provider'
  },
  {
    from: ['/ping7', '/saml/identity-providers/ping7','/protocols/saml/identity-providers/ping7'],
    to: '/protocols/saml-configuration-options/configure-pingfederate-as-saml-identity-provider'
  },
  {
    from: ['/saml/identity-providers/salesforce','/protocols/saml/identity-providers/salesforce'],
    to: '/protocols/saml-configuration-options/configure-salesforce-as-saml-identity-provider'
  },
  {
    from: ['/protocols/saml/saml-apps/github-cloud'],
    to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-cloud'
  },
  {
    from: ['/integrations/using-auth0-as-an-identity-provider-with-github-enterprise','/protocols/saml/saml-apps/github-server','/tutorials/using-auth0-as-an-identity-provider-with-github-enterprise','/scenarios/github'],
    to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-server'
  },
  {
    from: ['/protocols/saml/saml-apps/heroku','/saml-apps/heroku-sso'],
    to: '/protocols/saml-configuration-options/configure-saml2-web-app-addon-for-heroku'
  },
  {
    from: ['/protocols/saml/saml-apps/eloqua'],
    to: '/protocols/saml-configuration-options/configure-saml2-addon-eloqua'
  },
  {
    from: ['/protocols/saml/idp-initiated-sso'],
    to: '/protocols/saml-configuration-options/configure-saml-identity-provider-initiated-single-sign-on'
  },
  {
    from: ['/siteminder', '/saml/identity-providers/siteminder','/protocols/saml/identity-providers/siteminder'],
    to: '/protocols/saml-configuration-options/configure-siteminder-as-saml-identity-provider'
  },
  {
    from: ['/ssocircle','/protocols/saml/identity-providers/ssocircle'],
    to: '/protocols/saml-configuration-options/configure-ssocircle-as-saml-identity-provider'
  },
  {
    from: ['/protocols/saml/saml-configuration/saml-assertions'],
    to: '/protocols/saml-configuration-options/customize-saml-assertions'
  },
  {
    from: ['/protocols/saml/saml-configuration/deprovision-users'],
    to: '/protocols/saml-configuration-options/deprovision-users-in-saml-integrations'
  },
  {
    from: ['/saml2webapp-tutorial','/protocols/saml/saml2webapp-tutorial'],
    to: '/protocols/saml-configuration-options/enable-saml2-web-app-addon'
  },
  {
    from: ['/protocols/saml/saml-configuration/special-configuration-scenarios'],
    to: '/protocols/saml-configuration-options/special-saml-configuration-scenarios'
  },
  {
    from: ['/protocols/saml/saml-configuration/special-configuration-scenarios/idp-initiated-sso'],
    to: '/protocols/saml-configuration-options/identity-provider-initiated-single-sign-on'
  },
  {
    from: ['/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests'],
    to: '/protocols/saml-configuration-options/sign-and-encrypt-saml-requests'
  },
  {
    from: ['/samlp', '/protocols/saml/samlp'],
    to: '/protocols/saml-configuration-options/saml-identity-provider-configuration-settings'
  },
  {
    from: ['/protocols/saml/samlsso-auth0-to-auth0','/samlsso-auth0-to-auth0'],
    to: '/protocols/saml-configuration-options/test-saml-sso-with-auth0-as-service-and-identity-provider'
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
    from: ['/protocols/saml/saml-apps/sprout-video','/saml-apps/sprout-video'],
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
    from: ['/protocols/saml/saml-apps/atlassian'],
    to: '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-atlassian'
  },
  {
    from: ['/protocols/oauth2'],
    to: '/protocols/protocol-oauth2'
  },
  {
    from: ['/protocols/oidc','/api-auth/intro','/api-auth/tutorials/adoption'],
    to: '/protocols/openid-connect-protocol'
  },
  {
    from: ['/protocols/ws-fed','/tutorials/wsfed-web-app','/wsfedwebapp-tutorial'],
    to: '/protocols/ws-fed-protocol'
  },
  {
    from: ['/protocols/ldap'],
    to: '/protocols/ldap-protocol'
  },

  /* Rules */

  { 
    from: ['/rules/current', '/rules/current/csharp', '/rules/guides/csharp', '/rules/legacy', '/rules/references/legacy'],
    to: '/rules'
  },
  {
    from: '/rules/guides/automatically-generate-leads-in-shopify',
    to: '/rules/automatically-generate-leads-in-shopify'
  },
  {
    from: '/rules/guides/cache-resources',
    to: '/rules/cache-resources'
  },
  {
    from: ['/rules/guides/configuration'],
    to: '/rules/configuration'
  },
  {
    from: ['/dashboard/guides/rules/configure-variables'],
    to: '/rules/configure-global-variables-for-rules'
  },
  {
    from: ['/rules/current/context', '/rules/context', '/rules/references/context-object'],
    to: '/rules/context-object'
  },
  {
    from: ['/api/management/guides/rules/create-rules', '/dashboard/guides/rules/create-rules','/rules/guides/create'],
    to: '/rules/create-rules'
  },
  {
    from: ['/rules/guides/debug'],
    to: '/rules/debug-rules'
  },
  {
    from: ['/rules/references/samples'],
    to: '/rules/examples'
  },
  {
    from: '/rules/guides/integrate-user-id-verification',
    to: '/rules/integrate-user-id-verification'
  },
  {
    from: '/rules/guides/integrate-efm-solutions',
    to: '/rules/integrate-efm-solutions'
  },
  {
    from: '/rules/guides/integrate-erfm-solutions',
    to: '/rules/integrate-erfm-solutions'
  },
  {
    from: '/rules/guides/integrate-hubspot',
    to: '/rules/integrate-hubspot'
  },
  {
    from: '/rules/guides/integrate-maxmind',
    to: '/rules/integrate-maxmind'
  },
  {
    from: '/rules/guides/integrate-mixpanel',
    to: '/rules/integrate-mixpanel'
  },
  {
    from: '/rules/guides/integrate-salesforce',
    to: '/rules/integrate-salesforce'
  },
  {
    from: ['/rules/current/metadata-in-rules', '/rules/guides/metadata', '/rules/metadata-in-rules', '/metadata-in-rules', '/metadata/rules'],
    to: '/rules/metadata'
  },
  {
    from: ['/rules/current/redirect', '/rules/redirect', '/rules/guides/redirect'],
      to: '/rules/redirect-users'
  },
  {
    from: ['/rules/references/use-cases'],
    to: '/rules/use-cases'
  },
  {
    from: ['/rules/current/management-api', '/rules/guides/management-api'],
    to: '/rules/use-management-api'
  },
  {
    from: ['/rules/references/user-object'],
    to: '/rules/user-object-in-rules'
  },

  /* Scopes */

  {
    from: ['/scopes/current'],
    to: '/scopes'
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
    from: ['/scopes/current/oidc-scopes','/api-auth/tutorials/adoption/scope-custom-claims'],
    to: '/scopes/openid-connect-scopes'
  },
  {
    from: ['/scopes/current/sample-use-cases'],
    to: '/scopes/sample-use-cases-scopes-and-claims'
  },

  /* Security */

  {
    from: ['/security/blacklisting-attributes','/tutorials/blacklisting-attributes','/blacklist-attributes'],
    to: '/security/blacklist-user-attributes'
  },
  {
    from: ['/guides/ip-whitelist'],
    to: '/security/whitelist-ip-addresses'
  },
  {
    from: ['/security/common-threats'],
    to: '/security/prevent-common-cybersecurity-threats'
  },
  {
    from: ['/policies/endpoints'],
    to: '/security/public-cloud-service-endpoints'
  },

  /* Security Bulletins */

  {
    from: ['/security/bulletins/cve-2020-15125'],
    to: '/security/cve-2020-15125'
  },
  {
    from: ['/security/bulletins/cve-2020-15084'],
    to: '/security/cve-2020-15084'
  },
  {
    from: ['/security/bulletins/2020-03-31_wpauth0'],
    to: '/security/2020-03-31-wpauth0'
  },
  {
    from: ['/security/bulletins/cve-2020-5263'],
    to: '/security/cve-2020-5263'
  },
  {
    from: ['/security/bulletins/2019-01-10_rules'],
    to: '/security/2019-01-10-rules'
  },
  {
    from: ['/security/bulletins/2019-09-05_scopes'],
    to: '/security/2019-09-05-scopes'
  },
  {
    from: ['/security/bulletins/cve-2019-20174'],
    to: '/security/cve-2019-20174'
  },
  {
    from: ['/security/bulletins/cve-2019-20173'],
    to: '/security/cve-2019-20173'
  },
  {
    from: ['/security/bulletins/cve-2019-16929'],
    to: '/security/cve-2019-16929'
  },
  {
    from: ['/security/bulletins/cve-2019-13483'],
    to: '/security/cve-2019-13483'
  },
  {
    from: ['/security/bulletins/cve-2019-7644'],
    to: '/security/cve-2019-7644'
  },
  {
    from: ['/security/bulletins/cve-2018-15121'],
    to: '/security/cve-2018-15121'
  },
  {
    from: ['/security/bulletins/cve-2018-11537'],
    to: '/security/cve-2018-11537'
  },
  {
    from: ['/security/bulletins/cve-2018-7307'],
    to: '/security/cve-2018-7307'
  },
  {
    from: ['/security/bulletins/cve-2018-6874'],
    to: '/security/cve-2018-6874'
  },
  {
    from: ['/security/bulletins/cve-2018-6873'],
    to: '/security/cve-2018-6873'
  },
  {
    from: ['/security/bulletins/cve-2017-16897'],
    to: '/security/cve-2017-16897'
  },
  {
    from: ['/security/bulletins/cve-2017-17068'],
    to: '/security/cve-2017-17068'
  },

  /* Sessions */

  {
    from: ['/sessions', '/sessions/concepts/session', '/sessions/concepts/session-layers', '/sessions/concepts/session-lifetime'],
    to: '/sessions-and-cookies'
  },
  {
    from: ['/sessions/concepts/cookie-attributes'],
    to: '/sessions-and-cookies/samesite-cookie-attribute-changes'
  },
  {
    from: ['/sessions/references/sample-use-cases-sessions'],
    to: '/sessions-and-cookies/session-use-cases'
  },
  {
    from: ['/sessions/references/example-short-lived-session-mgmt'],
    to: '/sessions-and-cookies/manage-multi-site-short-long-lived-sessions'
  },
  {
    from: ['/sessions/concepts/cookies'],
    to: '/sessions-and-cookies/cookies'
  },

  /* SSO */

  {
    from: ['/api-auth/tutorials/adoption/single-sign-on','/sso/legacy','/sso/legacy/single-page-apps','/sso/legacy/regular-web-apps-sso','/sso/legacy/single-page-apps-sso','/sso/current/single-page-apps-sso','/sso/current/single-page-apps','/sso/current/sso-auth0','/sso/current/introduction','/sso/single-sign-on'],
    to: '/sso'
  },
  {
    from: ['/sso/current/inbound'],
    to: '/sso/inbound-single-sign-on'
  },
  {
    from: ['/sso/current/outbound'],
    to: '/sso/outbound-single-sign-on'
  },
  {
    from: ['/single-sign-on/api-endpoints-for-single-sign-on','/sso/current/relevant-api-endpoints'],
    to: '/sso/api-endpoints-for-single-sign-on'
  },
  {
    from: ['/dashboard/guides/applications/enable-sso-app'],
    to: '/sso/enable-sso-for-applications'
  },

  /* Support */

  {
    from: ['/policies/unsupported-requests','/policies/requests','/premium-support'],
    to: '/support'
  },
  {
    from: ['/sla', '/support/sla','/support/sld'],
    to: '/support/service-level-descriptions'
  },
  {
    from: ['/support/subscription'],
    to: '/support/manage-subscriptions'
  },
  {
    from: ['/tutorials/removing-auth0-exporting-data','/support/removing-auth0-exporting-data','/moving-out'],
    to: '/support/export-data'
  },
  {
    from: ['/support/testing'],
    to: '/support/predeployment-tests'
  },
  {
    from: ['/support/cancel-paid-subscriptions','/tutorials/cancel-paid-subscriptions','/cancel-paid-subscriptions'],
    to: '/support/downgrade-or-cancel-subscriptions'
  },
  {
    from: ['/support/how-auth0-versions-software','/tutorials/how-auth0-versions-software','/versioning'],
    to: '/support/versioning-strategy'
  },
  {
    from: ['/support/matrix'],
    to: '/support/product-support-matrix'
  },  
  {
    from: ['/support/reset-account-password','/tutorials/reset-account-password'],
    to: '/support/reset-account-passwords'
  },
  {
    from: ['/support/tickets'],
    to: '/support/open-and-manage-support-tickets'
  },
  {
    from: ['/tutorials/delete-reset-tenant'],
    to: '/support/delete-or-reset-tenant'
  },

  /* Tokens */

  {
    from: '/security/token-exp',
    to: '/tokens'
  },
  {
    from: ['/api-auth/tutorials/adoption/api-tokens','/tokens/concepts/access-tokens','/tokens/overview-access-tokens','/tokens/access-token','/tokens/access_token', '/tokens/access-tokens'],
    to: '/tokens/access-tokens'
  },
  {
    from: ['/tokens/guides/get-access-tokens','/tokens/get-access-tokens', '/tokens/guides/access-token/get-access-tokens'],
    to: '/tokens/access-tokens/get-access-tokens'
  },
  {
    from: ['/tokens/guides/use-access-tokens','/tokens/use-access-tokens', '/tokens/guides/access-token/use-access-tokens'],
    to: '/tokens/access-tokens/use-access-tokens'
  },
  {
    from: ['/tokens/guides/validate-access-tokens', '/api-auth/tutorials/verify-access-token', '/tokens/guides/access-token/validate-access-token'],
    to: '/tokens/access-tokens/validate-access-tokens'
  },
  {
    from: ['/tokens/guides/create-namespaced-custom-claims','/tokens/concepts/claims-namespacing'],
    to: '/tokens/create-namespaced-custom-claims'
  },
  {
    from: ['/tokens/concepts/idp-access-tokens', '/tokens/overview-idp-access-tokens'],
    to: '/tokens/identity-provider-access-tokens'
  },
  {
    from: ['/tokens/overview-id-tokens','/tokens/id-token', '/tokens/id-tokens', '/tokens/concepts/id-tokens'],
    to: '/tokens/id-tokens'
  },
  {
    from: ['/tokens/guides/id-token/get-id-tokens', '/tokens/guides/get-id-tokens'],
    to: '/tokens/id-tokens/get-id-tokens'
  },
  {
    from: ['/tokens/references/id-token-structure'],
    to: '/tokens/id-tokens/id-token-structure'
  },
  {
    from: ['/tokens/guides/validate-id-tokens','/tokens/guides/id-token/validate-id-token'],
    to: '/tokens/id-tokens/validate-id-tokens'
  },
  {
    from: ['/tokens/concepts/jwts', '/tokens/concepts/why-use-jwt', '/tokens/jwt'],
    to: '/tokens/json-web-tokens'
  },
  {
    from: ['/tokens/jwks', '/jwks','/tokens/concepts/jwks'],
    to: '/tokens/json-web-tokens/json-web-key-sets'
  },
  {
    from: ['/tokens/references/jwks-properties', '/tokens/reference/jwt/jwks-properties'],
    to: '/tokens/json-web-tokens/json-web-key-set-properties'
  },
  {
    from: ['/tokens/guides/locate-jwks', '/tokens/guides/jwt/verify-jwt-signature-using-jwks', '/tokens/guides/jwt/use-jwks'],
    to: '/tokens/json-web-tokens/json-web-key-sets/locate-json-web-key-sets'
  },
  {
    from: ['/tokens/jwt-claims', '/tokens/concepts/jwt-claims','/tokens/add-custom-claims','/scopes/current/custom-claims', '/tokens/jwt-claims'],
    to: '/tokens/json-web-tokens/json-web-token-claims'
  },
  {
    from: ['/tokens/references/jwt-structure','/tokens/reference/jwt/jwt-structure'],
    to: '/tokens/json-web-tokens/json-web-token-structure'
  },
  {
    from: ['/tokens/guides/validate-jwts', '/tokens/guides/jwt/parse-validate-jwt-programmatically', '/tokens/guides/jwt/validate-jwt'],
    to: '/tokens/json-web-tokens/validate-json-web-tokens'
  },
  {
    from: ['/tokens/guides/manage-signing-keys'],
    to: '/tokens/manage-signing-keys'
  },
  {
    from: ['/api-auth/tutorials/adoption/refresh-tokens','/refresh-token','/tokens/refresh_token', '/tokens/refresh-token/current','/tokens/concepts/refresh-tokens'],
    to: '/tokens/refresh-tokens'
  },
  {
    from: ['/tokens/guides/configure-refresh-token-rotation'],
    to: '/tokens/refresh-tokens/configure-refresh-token-rotation'
  },
  {
    from: ['/tokens/guides/disable-refresh-token-rotation','/tokens/access-tokens/refresh-tokens/disable-refresh-token-rotation'],
    to: '/tokens/refresh-tokens/disable-refresh-token-rotation'
  },
  {
    from: ['/tokens/guides/get-refresh-tokens'],
    to: '/tokens/refresh-tokens/get-refresh-tokens'
  },
  {
    from: ['/tokens/concepts/refresh-token-rotation'],
    to: '/tokens/refresh-tokens/refresh-token-rotation'
  },
  {
    from: ['/tokens/guides/use-refresh-token-rotation', '/tokens/refresh-token-rotation/use-refresh-token-rotation'],
    to: '/tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation'
  },
  {
    from: ['/tokens/guides/revoke-refresh-tokens'],
    to: '/tokens/refresh-tokens/revoke-refresh-tokens'
  },
  {
    from: ['/tokens/guides/use-refresh-tokens'],
    to: '/tokens/refresh-tokens/use-refresh-tokens'
  },
  {
    from: ['/dashboard/guides/tenants/revoke-signing-keys'],
    to: '/tokens/revoke-signing-keys'
  },
  {
    from: ['/tokens/guides/revoke-tokens'],
    to: '/tokens/revoke-tokens'
  },
  {
    from: ['/dashboard/guides/tenants/rotate-signing-keys'],
    to: '/tokens/rotate-signing-keys'
  },
  {
    from: ['/applications/concepts/signing-algorithms','/tokens/concepts/signing-algorithms'],
    to: '/tokens/signing-algorithms'
  },
  {
    from: ['/tokens/concepts/token-storage','/videos/session-and-cookies', '/security/store-tokens', '/tokens/guides/store-tokens'],
    to: '/tokens/token-storage'
  },
  {
    from: ['/get-started/auth0-dashboard-overview/view-client-secrets-and-signing-keys', '/dashboard/guides/tenants/view-signing-keys'],
    to: '/tokens/view-client-secrets-and-signing-keys'
  },
  {
    from: ['/api-auth/tutorials/adoption/delegation','/tokens/delegation','/tokens/concepts/delegation-tokens'],
    to: '/tokens/delegation-tokens'
  },
  {
    from: ['/tokens/guides/use-refresh-token-rotation'],
    to: '/tokens/access-tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation'
  },
  {
    from: ['/api/management/v2/get-access-tokens-for-production'],
    to: '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production'
  },
  {
    from: ['/api/management/v2/get-access-tokens-for-spas'],
    to: '/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications'
  },
  {
    from: ['/api/management/v2/get-access-tokens-for-test'],
    to: '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing'
  },
  {
    from: ['/api/management/v2/tokens','/tokens/apiv2', '/api/v2/tokens', '/api/management/v2/concepts/tokens'],
    to: '/tokens/management-api-access-tokens'
  },
  {
    from: ['/api/management/v2/tokens-flows'],
    to: '/tokens/management-api-access-tokens/changes-in-auth0-management-apiv2-tokens'
  },
  {
    from: ['/dashboard/guides/apis/update-token-lifetime'],
    to: '/tokens/access-tokens/update-access-token-lifetime'
  },
  {
    from: ['/dashboard/guides/applications/update-token-lifetime'],
    to: '/tokens/id-tokens/update-id-token-lifetime'
  },
  {
    from: ['/api/management/v2/create-m2m-app'],
    to: '/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application'
  },
  {
    from: ['/api/management/v2/faq-management-api-access-tokens'],
    to: '/tokens/management-api-access-tokens/management-api-access-token-faqs'
  },

  /* Troubleshoot */

  {
    from: ['/troubleshoot/guides/check-error-messages'],
    to: '/troubleshoot/check-error-messages'
  },
  {
    from: ['/har', '/tutorials/troubleshooting-with-har-files', '/troubleshoot/har', '/support/troubleshooting-with-har-files','/troubleshoot/guides/generate-har-files'],
    to: '/troubleshoot/generate-and-analyze-har-files'
  },
  {
    from: ['/troubleshoot/references/invalid-token'],
    to: '/troubleshoot/invalid-token-errors'
  },
  {
    from: ['/troubleshoot/concepts/auth-issues'],
    to: '/troubleshoot/troubleshoot-authentication-issues'
  },
  {
    from: ['/troubleshoot/guides/check-api-calls'],
    to: '/troubleshoot/troubleshoot-authentication-issues/check-api-calls'
  },
  {
    from: ['/errors/deprecation-errors','/troubleshoot/guides/check-deprecation-errors'],
    to: '/troubleshoot/troubleshoot-authentication-issues/check-deprecation-errors'
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
    from: ['/troubleshoot/references/saml-errors'],
    to: '/troubleshoot/troubleshoot-authentication-issues/saml-errors'
  },
  {
    from: ['/troubleshoot/basic-troubleshooting','/troubleshoot/concepts/basics'],
    to: '/troubleshoot/troubleshoot-basic'
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-connections','/troubleshoot/guides/verify-connections'],
    to: '/troubleshoot/troubleshoot-basic/verify-connections'
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-domain','/troubleshoot/guides/verify-domain'],
    to: '/troubleshoot/troubleshoot-basic/verify-domain'
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-platform','/troubleshoot/guides/verify-platform'],
    to: '/troubleshoot/troubleshoot-basic/verify-platform'
  },
  {
    from: ['/troubleshoot/concepts/integration-extensibility-issues'],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility'
  },
  {
    from: ['/troubleshoot/references/self_change_password'],
    to: '/troubleshoot/self-change-password-errors'
  },
  {
    from: ['/troubleshoot/guides/verify-rules'],
    to: '/troubleshoot/verify-rules'
  },

  /* Tutorials */

  {
    from: ['/scenarios', '/tutorials'],
    to: '/'
  },

  /* Universal Login */

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
    from: ['/hosted-pages/default-login-url'],
    to: '/universal-login/default-login-url'
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
    from: ['/universal-login/multifactor-authentication','/hosted-pages/guardian','/universal-login/guardian'],
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
    from: ['/universal-login/password-reset','/hosted-pages/password-reset'],
    to: '/universal-login/customize-password-reset-page'
  },
  {
    from: ['/universal-login/version-control','/hosted-pages/version-control'],
    to: '/universal-login/version-control-universal-login-pages'
  },
  {
    from: ['/dashboard/guides/universal-login/configure-login-page-passwordless'],
    to: '/universal-login/configure-universal-login-with-passwordless'
  },
  {
    from: ['/universal-login/text-customization-prompts/consent'],
    to: '/universal-login/prompt-consent'
  },
  {
    from: ['/guides/login/universal-vs-embedded','/guides/login/centralized-vs-embedded'],
    to: '/unversal-login/universal-vs-embedded'
  },

  /* Users */

  {
    from: ['/users/guides/block-and-unblock-users'],
    to: '/users/block-and-unblock-users'
  },
  {
    from: ['/users/guides/delete-users'],
    to: '/users/delete-users'
  },
  {
    from: ['/dashboard/guides/roles/remove-role-users'],
    to: '/users/remove-users-from-roles'
  },
  {
    from: ['/dashboard/guides/users/unlink-user-devices'],
    to: '/users/unlink-devices-from-users'
  },
  {
    from: ['/user-profile/progressive-profiling','/users/concepts/overview-progressive-profiling'],
    to: '/users/progressive-profiling'
  },
  {
    from: ['/link-accounts/auth-api','/link-accounts','/users/concepts/overview-user-account-linking'],
    to: '/users/user-account-linking'
  },
  {
    from: ['/users/concepts/overview-user-metadata', '/metadata'],
    to: '/users/metadata'
  },
  {
    from: ['/users/concepts/overview-user-migration'],
    to: '/users/import-and-export-users'
  },
  {
    from: ['/user-profile','/users/concepts/overview-user-profile'],
    to: '/users/user-profiles'
  },
  {
    from: ['/users/guides/bulk-user-exports'],
    to: '/users/bulk-user-exports'
  },
  {
    from: ['/tutorials/bulk-importing-users-into-auth0','/users/guides/bulk-user-imports', '/users/guides/bulk-user-import','/users/bulk-importing-users-into-auth0', '/users/migrations/bulk-import','/bulk-import'],
    to: '/users/bulk-user-imports'
  },
  {
    from: ['/user-profile/user-picture','/users/guides/change-user-pictures'],
    to: '/users/change-user-pictures'
  },
  {
    from: ['/connections/database/migrating', '/users/migrations/automatic','/users/guides/configure-automatic-migration'],
    to: '/users/configure-automatic-migration-from-your-database'
  },
  {
    from: ['/tutorials/creating-users-in-the-management-portal','/users/guides/create-users','/creating-users'],
    to: '/users/create-users'
  },
  {
    from: ['/users/guides/email-verified'],
    to: '/users/verified-email-usage'
  },
  {
    from: ['/tutorials/get-user-information-with-unbounce-landing-pages','/users/guides/get-user-information-with-unbounce-landing-pages','/scenarios-unbounce'],
    to: '/users/get-user-information-on-unbounce-landing-pages'
  },
  {
    from: [],
    to: '/tutorials/get-user-information-with-unbounce-landing-pages'
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
    from: ['/metadata/apiv2','/metadata/management-api','/metadata/apis','/metadata/lock','/users/guides/manage-user-metadata'],
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
    from: ['/tutorials/redirecting-users','/users/redirecting-users','/users/redirecting-users','/tutorials/redirecting-users','/users/guides/redirect-users-after-login','/protocols/oauth2/redirect-users'],
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
    from: ['/user-profile/customdb','/users/guides/update-user-profiles-using-your-database'],
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
    from: ['/user-profile/normalized/auth0','/users/normalized/auth0'],
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
    from: ['/link-accounts/user-initiated', '/link-accounts/user-initiated-linking','/users/references/link-accounts-user-initiated-scenario','/users/references/link-accounts-client-side-scenario'],
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
    from: ['/connections/database/migrating-okta', '/users/migrations/okta','/users/references/user-migration-scenarios'],
    to: '/users/user-migration-scenarios'
  },
  {
    from: ['/user-profile/user-profile-structure','/users/references/user-profile-structure'],
    to: '/users/user-profile-structure'
  },
  {
    from: ['/dashboard/guides/connections/configure-connection-sync','/api/management/guides/connections/configure-connection-sync'],
    to: '/users/configure-connection-sync-with-auth0'
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
    from: ['/api/management/v2/user-search','/users/search/v2','/users/search/v3','/users/normalized/auth0/retrieve-user-profiles','/users/search','/users-search','/api/v2/user-search'],
    to: '/users/user-search'
  },
  {
    from: ['/api/management/v2/query-string-syntax','/users/search/v2/query-syntax','/users/search/v3/query-syntax'],
    to: '/users/user-search/user-search-query-syntax'
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
    from: ['/users/search/v3/sort-search-results'],
    to: '/users/user-search/sort-search-results'
  },
  {
    from: ['/users/search/v3/view-search-results-by-page'],
    to: '/users/user-search/view-search-results-by-page'
  },
  {
    from: ['/dashboard/guides/users/assign-permissions-users','/api/management/guides/users/assign-permissions-users'],
    to: '/users/assign-permissions-to-users'
  },
  {
    from: ['/dashboard/guides/users/assign-roles-users','/api/management/guides/users/assign-roles-users'],
    to: '/users/assign-roles-to-users'
  },
  {
    from: ['/dashboard/guides/users/remove-user-permissions','/api/management/guides/users/remove-user-permissions'],
    to: '/users/remove-permissions-from-users'
  },
  {
    from: ['/dashboard/guides/users/remove-user-roles','/api/management/guides/users/remove-user-roles'],
    to: '/users/remove-roles-from-users'
  },
  {
    from: ['/dashboard/guides/users/view-user-permissions','/api/management/guides/users/view-user-permissions'],
    to: '/users/view-user-permissions'
  },
  {
    from: ['/dashboard/guides/users/view-user-roles','/api/management/guides/users/view-user-roles'],
    to: '/users/view-user-roles'
  },
  {
    from: ['/users/concepts/overview-progressive-profiling'],
    to: '/users/progressive-profiling'
  },
  {
    from: ['/link-accounts/auth-api','/link-accounts','/users/concepts/overview-user-account-linking'],
    to: '/users/user-account-linking'
  },
  {
    from: ['/users/concepts/overview-user-metadata'],
    to: '/users/metadata'
  },
  {
    from: ['/users/guides/get-user-information-with-unbounce-landing-pages'],
    to: '/users/get-user-information-on-unbounce-landing-pages'
  },

  /* Logs */

  {
    from: ['/logs/streams'],
    to: '/logs/export-log-events-with-log-streaming'
  },
  {
    from: ['/logs/streams/http-event-to-slack'],
    to: '/logs/export-log-events-with-log-streaming/stream-auth0-log-events-to-slack'
  },
  {
    from: ['/logs/streams/http-event'],
    to: '/logs/export-log-events-with-log-streaming/stream-http-event-logs'
  },
  {
    from: ['/logs/streams/aws-eventbridge','/integrations/aws-eventbridge','/logs/streams/amazon-eventbridge'],
    to: '/logs/export-log-events-with-log-streaming/stream-logs-to-amazon-eventbridge'
  },
  {
    from: ['/logs/streams/azure-event-grid'],
    to: '/logs/export-log-events-with-log-streaming/stream-logs-to-azure-event-grid'
  },
  {
    from: ['/logs/streams/datadog'],
    to: '/logs/export-log-events-with-log-streaming/stream-logs-to-datadog'
  },
  {
    from: ['/monitoring/guides/send-events-to-splunk','/monitoring/guides/send-events-to-keenio','/monitoring/guides/send-events-to-segmentio'],
    to: '/logs/export-log-events-with-rules'
  },
  {
    from: ['/logs/references/log-data-retention'],
    to: '/logs/log-data-retention'
  },
  {
    from: ['/logs/references/log-event-filters'],
    to: '/logs/log-event-filters'
  },
  {
    from: ['/logs/references/log-event-data','/logs/references/log-event-type-codes'],
    to: '/logs/log-event-type-codes'
  },
  {
    from: ['/logs/references/query-syntax','/logs/query-syntax'],
    to: '/logs/log-search-query-syntax'
  },
  {
    from: ['/logs/guides/retrieve-logs-mgmt-api'],
    to: '/logs/retrieve-log-events-using-mgmt-api'
  },
  {
    from: ['/logs/guides/view-log-data-dashboard'],
    to: '/logs/view-log-events-in-the-dashboard'
  },

];
