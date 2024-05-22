//  This is the list of APIs used in the old two-step quickstarts.
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
  'webapi-owin',
];

const apis = `:api(${apiNames.join('|')})`;

const redirects = [
  /* MISCELLANEOUS AND OUTDATED  */

  {
    from: [
      '/addons',
      '/firebaseapi-tutorial',
      '/salesforcesandboxapi-tutorial',
      '/salesforceapi-tutorial',
      '/sapapi-tutorial',
      '/clients/addons',
      '/applications/addons',
      '/addons/azure-blob-storage',
      '/addons/azure-mobile-services',
      '/addons/azure-sb',
    ],
    to: '/',
  },
  {
    from: '/topics/guides',
    to: '/',
  },
  {
    from: ['/design', '/design/web'],
    to: '/',
  },
  {
    from: [
      '/contentful-test-1',
      '/contentful-test-2',
      '/contentful-test-3',
      '/contentful-test-4',
    ],
    to: '/',
  },
  {
    from: [
      '/design/browser-based-vs-native-experience-on-mobile',
      '/tutorials/browser-based-vs-native-experience-on-mobile',
      '/best-practices/mobile-device-login-flow-best-practices',
      '/get-started/authentication-and-authorization-flow/mobile-device-login-flow-best-practices',
    ],
    to: '/get-started/authentication-and-authorization-flow/device-authorization-flow/mobile-device-login-flow-best-practices',
  },
  {
    from: '/topics/identity-glossary',
    to: '/glossary',
  },
  {
    from: ['/deploy/checklist', '/deploy/deploy-checklist'],
    to: '/deploy-monitor/deploy-checklist',
  },

  /* QUICKSTARTS */

  {
    from: [
      '/quickstart/hybrid/:platform',
      '/quickstart/native-mobile/:platform',
      `/quickstart/hybrid/:platform/${apis}`,
      `/quickstart/native-mobile/:platform/${apis}`,
      `/quickstart/native/:platform/${apis}`,
    ],
    to: '/quickstart/native/:platform',
  },
  {
    from: `/quickstart/spa/:platform/${apis}`,
    to: '/quickstart/spa/:platform',
  },
  {
    from: `/quickstart/backend/:platform/${apis}`,
    to: '/quickstart/backend/:platform',
  },
  {
    from: ['/quickstart/:platform/reactnative-ios/:backend?', '/quickstart/:platform/reactnative-android/:backend?'],
    to: '/quickstart/native/react-native',
  },
  {
    from: ['/android-tutorial', '/native-platforms/android', '/quickstart/native/android-vnext'],
    to: '/quickstart/native/android',
  },
  {
    from: [
      '/angular-tutorial',
      '/client-platforms/angularjs',
      '/client-platforms/angular2',
      '/quickstart/spa/angularjs',
      '/quickstart/spa/angular-next',
      '/quickstart/spa/angular2',
      '/quickstart/spa/angular2/00-login',
      '/quickstart/spa/angular2/03-user-profile',
      '/quickstart/spa/angular2/04-calling-an-api',
      '/quickstart/spa/angular2/05-authorization',
      '/quickstart/spa/angular2/06-token-renewal',
    ],
    to: '/quickstart/spa/angular',
  },
  {
    from: '/quickstarts/spa/vanillajs/01-login',
    to: '/quickstart/spa/vanillajs/01-login',
  },
  {
    from: [
      '/quickstart/webapp/aspnet',
      '/aspnet-tutorial',
      '/mvc3-tutorial',
      '/servicestack-tutorial',
      '/quickstart/webapp/servicestack',
      '/quickstart/webapp/play-2-scala',
      '/quickstart/webapp/scala',
      '/symfony-tutorial',
      '/quickstart/webapp/symfony',
    ],
    to: '/quickstart/webapp',
  },
  {
    from: ['/aspnet-owin-tutorial', '/aspnetwebapi-owin-tutorial'],
    to: '/quickstart/webapp/aspnet-owin',
  },
  {
    from: [
      '/aspnetwebapi-tutorial',
      '/tutorials/aspnet-mvc4-enterprise-providers',
      '/webapi',
      '/mvc-tutorial-enterprise',
      '/quickstart/backend/aspnet-webapi',
      '/wcf-tutorial',
      '/quickstart/backend/wcf-service',
      '/quickstart/backend/falcor/00-getting-started',
      '/quickstart/backend/falcor',
      '/quickstart/backend/hapi/00-getting-started',
      '/quickstart/backend/hapi',
      '/quickstart/backend/symfony/00-getting-started',
      '/quickstart/backend/symfony',
    ],
    to: '/quickstart/backend',
  },
  {
    from: [
      '/quickstart/native-mobile',
      '/quickstart/hybrid',
      '/quickstart/native/chrome-extension',
      '/quickstart/native/chrome',
      '/phonegap-tutorial',
      '/quickstart/native/phonegap',
      '/win8-tutorial',
      '/windowsstore-js-auth0-tutorial',
      '/native-platforms/windows-store-javascript',
      '/quickstart/native-mobile/windows8/:client',
      '/quickstart/native/windows-uwp-javascript',
      '/windowsphone-tutorial',
      '/quickstart/native/windowsphone',
    ],
    to: '/quickstart/native',
  },
  {
    from: [
      '/ionic-tutorial',
      '/quickstart/native/ionic',
      '/quickstart/native/ionic4',
      '/quickstart/native/ionic/00-intro',
      '/quickstart/native/ionic/02-custom-login',
      '/quickstart/native/ionic/03-user-profile',
      '/quickstart/native/ionic/04-linking-accounts',
      '/quickstart/native/ionic/05-rules',
      '/quickstart/native/ionic/06-authorization',
      '/quickstart/native/ionic/08-mfa',
      '/quickstart/native/ionic/09-customizing-lock',
    ],
    to: '/quickstart/native/ionic-angular',
  },
  {
    from: [
      '/ios-tutorial',
      '/quickstart/native/ios',
      '/quickstart/native/ios-objc',
      '/native-platforms/ios-objc',
      '/quickstart/native/ios-swift-facebook-login',
      '/quickstart/native/ios-swift-siwa',
      '/quickstart/native/ios-swift/00-login',
      '/quickstart/native/ios-swift/01-embedded-login',
      '/quickstart/native/ios-swift/02-custom-login-form',
      '/quickstart/native/ios-swift/03-user-sessions',
      '/quickstart/native/ios-swift/04-calling-apis',
      '/quickstart/native/ios-swift/05-authorization',
      '/quickstart/native/ios-swift/07-linking-accounts',
      '/quickstart/native/ios-swift/08-touch-id-authentication',
      '/quickstart/native/swift-beta',
    ],
    to: '/quickstart/native/ios-swift',
  },
  {
    from: '/server-platforms/golang',
    to: '/quickstart/webapp/golang',
  },
  {
    from: '/laravel-tutorial',
    to: '/quickstart/webapp/laravel',
  },
  {
    from: ['/laravelapi-tutorial', '/quickstart/backend/php-laravel', '/quickstart/backend/laravel/00-getting-started'],
    to: '/quickstart/backend/laravel',
  },
  {
    from: ['/nodeapi-tutorial', '/quickstart/backend/nodejs/00-getting-started'],
    to: '/quickstart/backend/nodejs',
  },
  {
    from: ['/phpapi-tutorial', '/quickstart/backend/php/00-getting-started'],
    to: '/quickstart/backend/php',
  },
  {
    from: ['/pythonapi-tutorial', '/quickstart/backend/python/00-getting-started'],
    to: '/quickstart/backend/python',
  },
  {
    from: [
      '/client-platforms/react',
      '/quickstart/spa/auth0-react',
      '/quickstart/spa/auth0-react/01',
      '/quickstart/spa/react/03-user-profile',
      '/quickstart/spa/react/04-user-profile',
    ],
    to: '/quickstart/spa/react',
  },
  {
    from: [
      '/quickstart/native/ios-reactnative',
      '/quickstart/native/react-native-ios',
      '/quickstart/native/react-native-android',
    ],
    to: '/quickstart/native/react-native',
  },
  {
    from: [
      '/rails-tutorial',
      '/quickstart/webapp/rails/00-introduction',
      '/quickstart/webapp/rails/02-custom-login',
      '/quickstart/webapp/rails/03-session-handling',
      '/quickstart/webapp/rails/02-session-handling',
      '/quickstart/webapp/rails/04-user-profile',
      '/quickstart/webapp/rails/03-user-profile',
      '/quickstart/webapp/rails/05-linking-accounts',
      '/quickstart/webapp/rails/06-rules',
      '/quickstart/webapp/rails/07-authorization',
      '/quickstart/webapp/rails/08-mfa',
      '/quickstart/webapp/rails/09-customizing-lock',
    ],
    to: '/quickstart/webapp/rails',
  },
  {
    from: [
      '/server-apis/ruby',
      '/quickstart/backend/ruby/00-getting-started',
      '/quickstart/backend/ruby',
      '/rubyapi-tutorial',
      '/quickstart/backend/rails/00-getting-started',
    ],
    to: '/quickstart/backend/rails',
  },
  {
    from: '/python-tutorial',
    to: '/quickstart/webapp/python',
  },
  {
    from: ['/php-tutorial', '/server-platforms/php'],
    to: '/quickstart/webapp/php',
  },
  {
    from: ['/singlepageapp-tutorial', '/client-platforms/vanillajs', '/quickstart/spa/javascript/:client?'],
    to: '/quickstart/spa/vanillajs',
  },
  {
    from: [
      '/win8-cs-tutorial',
      '/windowsstore-auth0-tutorial',
      '/native-platforms/windows-store-csharp',
      '/quickstart/native/windows8-cp',
      '/quickstart/native-mobile/windows8-cp/:client?',
    ],
    to: '/quickstart/native/windows-uwp-csharp',
  },
  {
    from: '/wpf-winforms-tutorial',
    to: '/quickstart/native/wpf-winforms',
  },
  {
    from: '/xamarin-tutorial',
    to: '/quickstart/native/xamarin',
  },
  {
    from: '/quickstart/native/xamarin',
    to: '/quickstart/native/net-android-ios',
  },
  {
    from: '/quickstart/native/xamarin/interactive',
    to: '/quickstart/native/net-android-ios/interactive',
  },
  {
    from: '/quickstart/spa/auth0-react/02',
    to: '/quickstart/spa/react/02-calling-an-api',
  },
  {
    from: [
      '/quickstart/backend/webapi-owin/04-authentication-rs256-deprecated',
      '/quickstart/backend/webapi-owin/04-authentication-rs256-legacy',
      '/quickstart/backend/webapi-owin/05-authentication-hs256-deprecated',
      '/quickstart/backend/webapi-owin/05-authentication-hs256-legacy',
      '/quickstart/backend/webapi-owin/06-authorization-deprecated',
      '/quickstart/backend/webapi-owin/06-authorization-legacy',
      '/quickstart/backend/webapi-owin/00-getting-started',
    ],
    to: '/quickstart/backend/webapi-owin',
  },
  {
    from: [
      '/quickstart/backend/aspnet-core-webapi/04-authentication-rs256-deprecated',
      '/quickstart/backend/aspnet-core-webapi/04-authentication-rs256-legacy',
      '/quickstart/backend/aspnet-core-webapi/05-authentication-hs256-deprecated',
      '/quickstart/backend/aspnet-core-webapi/05-authentication-hs256-legacy',
      '/quickstart/backend/aspnet-core-webapi/06-authorization-deprecated',
      '/quickstart/backend/aspnet-core-webapi/06-authorization-legacy',
      '/quickstart/backend/aspnet-core-webapi/00-getting-started',
      '/quickstart/backend/aspnet-core-webapi-2',
    ],
    to: '/quickstart/backend/aspnet-core-webapi',
  },
  {
    from: ['/quickstart/webapp/aspnet-core-3', '/quickstart/webapp/aspnet-core-2'],
    to: '/quickstart/webapp/aspnet-core',
  },
  {
    from: [
      '/quickstart/spa/aurelia',
      '/ember-tutorial',
      '/client-platforms/emberjs',
      '/quickstart/spa/emberjs',
      '/quickstart/spa/ember',
      '/quickstart/spa/jquery',
    ],
    to: '/quickstart/spa',
  },
  {
    from: ['/quickstart', '/quickstart/'],
    to: '/quickstarts',
  },
  {
    from: '/quickstart/backend/golang/00-getting-started',
    to: '/quickstart/backend/golang',
  },
  {
    from: [
      '/javaapi-tutorial',
      '/quickstart/backend/java',
      '/quickstart/backend/java-spring-security',
      '/quickstart/backend/java-spring-security/00-getting-started',
    ],
    to: '/quickstart/backend/java-spring-security5',
  },
  {
    from: ['/quickstart/webapp/java/getting-started', '/java-tutorial'],
    to: '/quickstart/webapp/java',
  },
  {
    from: [
      '/quickstart/webapp/java-spring-mvc/getting-started',
      '/quickstart/webapp/java-spring-mvc',
      '/quickstart/webapp/java-spring-security-mvc/00-intro',
      '/quickstart/webapp/java-spring-security-mvc',
    ],
    to: '/quickstart/webapp/java-spring-boot',
  },
  {
    from: [
      '/quickstart/webapp/nodejs',
      '/nodejs-tutorial',
      '/server-platforms/nodejs',
      '/quickstart/webapp/nodejs/02-user-profile',
      '/quickstart/webapp/nodejs/01-login',
    ],
    to: '/quickstart/webapp/express',
  },
  {
    from: ['/quickstart/native/cordova'],
    to: '/quickstart',
  },

  /* CONNECTIONS */

  {
    from: ['/37signals-clientid', '/connections/social/37signals', '/connections/social/basecamp'],
    to: 'https://marketplace.auth0.com/integrations/37signals-social-connection',
  },
  {
    from: ['/amazon-clientid', '/connections/social/amazon'],
    to: 'https://marketplace.auth0.com/integrations/amazon-social-connection',
  },
  {
    from: [
      '/connections/enterprise/azure-active-directory-classic',
      '/connections/enterprise/azure-active-directory/v1',
      '/connections/enterprise/azure-active-directory',
      '/connections/social/active-directory',
      '/waad-clientid',
      '/users/guides/azure-access-control',
      '/connections/enterprise/azure-active-directory/v2',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/azure-active-directory/v2',
  },
  {
    from: ['/connections/enterprise/google-apps'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/google-apps',
  },
  {
    from: [
      '/connections/enterprise/samlp',
      '/connections/enterprise/saml',
      '/connections/enterprise/sharepoint-online',
      '/connections/enterprise/ws-fed',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/saml',
  },
  {
    from: ['/dwolla-clientid', '/connections/social/dwolla'],
    to: 'https://marketplace.auth0.com/integrations/dwolla-social-connection',
  },
  {
    from: ['/baidu-clientid', '/connections/social/baidu'],
    to: 'https://marketplace.auth0.com/integrations/baidu-social-connection',
  },
  {
    from: ['/box-clientid', '/connections/social/box'],
    to: 'https://marketplace.auth0.com/integrations/box-social-connection',
  },
  {
    from: ['/evernote-clientid', '/connections/social/evernote'],
    to: 'https://marketplace.auth0.com/integrations/evernote-social-connection',
  },
  {
    from: ['/exact-clientid', '/connections/social/exact'],
    to: 'https://marketplace.auth0.com/integrations/exact-social-connection',
  },
  {
    from: ['/facebook-clientid', '/connections/social/facebook'],
    to: 'https://marketplace.auth0.com/integrations/facebook-social-connection',
  },
  {
    from: ['/fitbit-clientid', '/connections/social/fitbit'],
    to: 'https://marketplace.auth0.com/integrations/fitbit-social-connection',
  },
  {
    from: ['/github-clientid', '/connections/social/github'],
    to: 'https://marketplace.auth0.com/integrations/github-social-connection',
  },
  {
    from: ['/goog-clientid', '/connections/social/google'],
    to: 'https://marketplace.auth0.com/integrations/google-social-connection',
  },
  {
    from: ['/ms-account-clientid', '/connections/social/microsoft-account'],
    to: 'https://marketplace.auth0.com/integrations/microsoft-account-social-connection',
  },
  {
    from: [
      '/protocols/oidc/identity-providers/okta',
      '/protocols/configure-okta-as-oidc-identity-provider',
      '/protocols/configure-okta-as-oauth2-identity-provider',
      '/authorization/protocols/configure-okta-as-oauth2-identity-provider',
      '/connections/social/configure-okta-as-oauth2-identity-provider',
      '/authenticate/identity-providers/social-identity-providers/configure-okta-as-oauth2-identity-provider',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/okta',
  },
  {
    from: ['/connections/social/auth0-oidc', '/connections/enterprise/oidc'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/oidc',
  },
  {
    from: ['/connections/enterprise/okta'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/okta',
  },
  {
    from: ['/paypal-clientid', '/connections/social/paypal'],
    to: 'https://marketplace.auth0.com/integrations/paypal-social-connection',
  },
  {
    from: ['/planningcenter-clientid', '/connections/social/planning-center'],
    to: 'https://marketplace.auth0.com/integrations/planningcenter-social-connection',
  },
  {
    from: ['/salesforce-clientid', '/connections/social/salesforce'],
    to: 'https://marketplace.auth0.com/integrations/salesforce-social-connection',
  },
  {
    from: ['/renren-clientid', '/connections/social/renren'],
    to: 'https://marketplace.auth0.com/integrations/renren-social-connection',
  },
  {
    from: ['/shopify-clientid', '/connections/social/shopify'],
    to: 'https://marketplace.auth0.com/integrations/shopify-social-connection',
  },
  {
    from: ['/twitter-clientid', '/connections/social/twitter'],
    to: 'https://marketplace.auth0.com/integrations/twitter-social-connection',
  },
  {
    from: ['/vkontakte-clientid', '/connections/social/vkontakte'],
    to: 'https://marketplace.auth0.com/integrations/vkontakte-social-connection',
  },
  {
    from: ['/weibo-clientid', '/connections/social/weibo'],
    to: 'https://marketplace.auth0.com/integrations/weibo-social-connection',
  },
  {
    from: ['/wordpress-clientid', '/connections/social/wordpress'],
    to: 'https://marketplace.auth0.com/integrations/wordpress-social-connection',
  },
  {
    from: ['/yahoo-clientid', '/connections/social/yahoo'],
    to: 'https://marketplace.auth0.com/integrations/yahoo-social-connection',
  },
  {
    from: ['/yandex-clientid', '/connections/social/yandex'],
    to: 'https://marketplace.auth0.com/integrations/yandex-social-connection',
  },
  {
    from: ['/linkedin-clientid', '/connections/social/linkedin'],
    to: 'https://marketplace.auth0.com/integrations/linkedin-social-connection',
  },
  {
    from: '/connections/social/bitbucket',
    to: 'https://marketplace.auth0.com/integrations/bitbucket-social-connection',
  },
  {
    from: '/connections/social/digitalocean',
    to: 'https://marketplace.auth0.com/integrations/digitalocean-social-connection',
  },
  {
    from: '/connections/social/discord',
    to: 'https://marketplace.auth0.com/integrations/discord-social-connection',
  },
  {
    from: '/connections/social/docomo',
    to: 'https://marketplace.auth0.com/integrations/daccount-social-connection',
  },
  {
    from: '/connections/social/dribbble',
    to: 'https://marketplace.auth0.com/integrations/dribbble-social-connection',
  },
  {
    from: '/connections/social/dropbox',
    to: 'https://marketplace.auth0.com/integrations/dropbox-social-connection',
  },
  {
    from: '/connections/social/evernote-sandbox',
    to: 'https://marketplace.auth0.com/integrations/evernote-sandbox-social-connection',
  },
  {
    from: '/connections/social/figma',
    to: 'https://marketplace.auth0.com/integrations/figma-social-connection',
  },
  {
    from: '/connections/social/paypal-sandbox',
    to: 'https://marketplace.auth0.com/integrations/paypal-sandbox-social-connection',
  },
  {
    from: '/connections/social/quickbooks-online',
    to: 'https://marketplace.auth0.com/integrations/quickbooks-social-connection',
  },
  {
    from: ['/salesforce-community', '/connections/social/salesforce-community'],
    to: 'https://marketplace.auth0.com/integrations/salesforce-community-social-connection',
  },
  {
    from: '/connections/social/salesforce-sandbox',
    to: 'https://marketplace.auth0.com/integrations/salesforce-sandbox-social-connection',
  },
  {
    from: '/connections/social/slack',
    to: 'https://marketplace.auth0.com/integrations/sign-in-with-slack',
  },
  {
    from: '/connections/social/spotify',
    to: 'https://marketplace.auth0.com/integrations/spotify-social-connection',
  },
  {
    from: '/connections/social/stripe-connect',
    to: 'https://marketplace.auth0.com/integrations/stripe-connect-social-connection',
  },
  {
    from: '/connections/social/twitch',
    to: 'https://marketplace.auth0.com/integrations/twitch-social-connection',
  },
  {
    from: '/connections/social/vimeo',
    to: 'https://marketplace.auth0.com/integrations/vimeo-social-connection',
  },
  {
    from: '/connections/social/yammer',
    to: 'https://marketplace.auth0.com/integrations/yammer-social-connection',
  },
  {
    from: [
      '/ad',
      '/connections/enterprise/active-directory',
      '/connections/enterprise/ldap',
      '/connections/enterprise/active-directory-ldap',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap',
  },
  {
    from: ['/adfs', '/connections/enterprise/adfs'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/adfs',
  },
  {
    from: [
      '/passwordless',
      '/dashboard/guides/connections/set-up-connections-passwordless',
      '/api-auth/passwordless',
      '/connections/passwordless/ios',
      '/connections/passwordless/native-passwordless-universal',
      '/connections/passwordless/reference/troubleshoot',
      '/connections/passwordless/faq',
      '/connections/passwordless/spa-email-code',
      '/connections/passwordless/spa-email-link',
      '/connections/passwordless/spa-sms',
      '/connections/passwordless/guides/',
      '/connections/passwordless/ios-sms-objc',
      '/connections/passwordless/ios-sms',
      '/connections/passwordless',
    ],
    to: '/authenticate/passwordless',
  },
  {
    from: [
      '/connections/passwordless/guides/embedded-login',
      '/connections/passwordless/embedded-login',
      '/connections/passwordless/implement-login/embedded-login',
    ],
    to: '/authenticate/passwordless/implement-login/embedded-login',
  },
  {
    from: ['/password-strength', '/connections/database/password-strength'],
    to: '/authenticate/database-connections/password-strength',
  },
  {
    from: [
      '/identityproviders',
      '/applications/concepts/connections',
      '/applications/connections',
      '/clients/connections',
      '/connections',
    ],
    to: '/authenticate/identity-providers',
  },
  {
    from: [
      '/connections/database/mysql',
      '/mysql-connection-tutorial',
      '/connections/database/custom-db/custom-db-connection-overview',
      '/connections/database/custom-db',
    ],
    to: '/authenticate/database-connections/custom-db',
  },
  {
    from: ['/connections/database/password', '/connections/database/password-options'],
    to: '/authenticate/database-connections/password-options',
  },
  {
    from: [
      '/tutorials/adding-scopes-for-an-external-idp',
      '/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp',
      '/connections/adding-scopes-for-an-external-idp',
    ],
    to: '/authenticate/identity-providers/adding-scopes-for-an-external-idp',
  },
  {
    from: [
      '/tutorials/calling-an-external-idp-api',
      '/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api',
      '/connections/calling-an-external-idp-api',
    ],
    to: '/authenticate/identity-providers/calling-an-external-idp-api',
  },
  {
    from: [
      '/tutorials/how-to-test-partner-connection',
      '/test-partner-connection',
      '/connections/how-to-test-partner-connection',
      '/authenticate/identity-providers/how-to-test-partner-connection',
      '/dashboard/guides/connections/test-connections-social',
    ],
    to: '/authenticate/identity-providers/test-connections',
  },
  {
    from: '/connections/social/imgur',
    to: 'https://marketplace.auth0.com/integrations/imgur-social-connection',
  },
  {
    from: [
      '/connections/grean/bankid-no',
      '/connections/criipto/bankid-no',
      '/connections/grean/bankid-se',
      '/connections/criipto/bankid-se',
      '/connections/grean/nemid',
      '/connections/criipto/nemid',
    ],
    to: 'https://marketplace.auth0.com/integrations/criipto-verify-e-id',
  },
  {
    from: [
      '/connections/passwordless/sms-gateway',
      '/connections/passwordless/guides/use-sms-gateway-passwordless',
      '/connections/passwordless/use-sms-gateway-passwordless',
      '/connections/passwordless/authentication-methods/use-sms-gateway-passwordless',
    ],
    to: '/authenticate/passwordless/authentication-methods/use-sms-gateway-passwordless',
  },
  {
    from: [
      '/connections/apple-setup',
      '/connections/apple-siwa/set-up-apple',
      '/connections/apple-siwa/add-siwa-web-app',
      '/connections/apple-siwa/add-siwa-to-web-app',
      '/connections/social/apple',
      '/connections/apple-siwa/test-siwa-connection',
      '/connections/apple-siwa/troubleshooting',
    ],
    to: 'https://marketplace.auth0.com/integrations/apple-social-connection',
  },
  {
    from: [
      '/connections/apple-siwa/add-siwa-to-native-app',
      '/connections/nativesocial/add-siwa-to-native-app',
      '/connections/nativesocial/apple',
      '/connections/social/apple-native',
    ],
    to: '/authenticate/identity-providers/social-identity-providers/apple-native',
  },
  {
    from: [
      '/connections/nativesocial/facebook-native',
      '/connections/nativesocial/facebook',
      '/connections/social/facebook-native',
    ],
    to: '/authenticate/identity-providers/social-identity-providers/facebook-native',
  },
  {
    from: [
      '/connections/passwordless/email',
      '/connections/passwordless/guides/email-otp',
      '/connections/passwordless/email-otp',
    ],
    to: '/authenticate/passwordless/authentication-methods/email-otp',
  },
  {
    from: [
      '/connections/passwordless/sms',
      '/connections/passwordless/guides/sms-otp',
      '/connections/passwordless/sms-otp',
    ],
    to: '/authenticate/passwordless/authentication-methods/sms-otp',
  },
  {
    from: [
      '/connections/passwordless/spa',
      '/connections/passwordless/guides/universal-login',
      '/connections/passwordless/regular-web-app',
      '/connections/passwordless/universal-login',
      '/connections/passwordless/implement-login/universal-login',
    ],
    to: '/authenticate/passwordless/implement-login/universal-login',
  },
  {
    from: [
      '/connections/identity-providers-social',
      '/connections/social/identityproviders',
      '/connections/social/identity-providers',
      '/connections/social/aol',
      '/aol-clientid',
      '/connections/social/thecity',
      '/thecity-clientid',
      '/connections/social/miicard',
      '/miicard-clientid',
      '/connections/nativesocial/',
      '/connections/social',
    ],
    to: '/authenticate/identity-providers/social-identity-providers',
  },
  {
    from: [
      '/connections/identity-providers-enterprise',
      '/connections/enterprise/identityproviders',
      '/connections/enterprise/identity-providers',
      '/connections/enterprise/sharepoint-apps',
      '/sharepoint-clientid',
      '/connections/enterprise',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers',
  },
  {
    from: ['/connections/identity-providers-legal', '/connections/legal'],
    to: '/authenticate/identity-providers/legal',
  },
  {
    from: ['/line', '/connections/social/line'],
    to: 'https://marketplace.auth0.com/integrations/line-social-connection',
  },
  {
    from: [
      '/connections/passwordless/concepts/sample-use-cases-rules',
      '/connections/passwordless/sample-use-cases-rules',
    ],
    to: '/authenticate/passwordless/sample-use-cases-rules',
  },
  {
    from: ['/connections/azure-active-directory-native', '/connections/enterprise/azure-active-directory-native'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/azure-active-directory-native',
  },
  {
    from: ['/connections/passwordless/authentication-factors', '/connections/passwordless/authentication-methods'],
    to: '/authenticate/passwordless/authentication-methods',
  },
  {
    from: [
      '/connections/passwordless/email-otp',
      '/connections/passwordless/email',
      '/connections/passwordless/authentication-factors/email-otp',
      '/connections/passwordless/authentication-methods/email-otp',
    ],
    to: '/authenticate/passwordless/authentication-methods/email-otp',
  },
  {
    from: [
      '/connections/passwordless/email-magic-link',
      '/connections/passwordless/authentication-factors/email-magic-link',
      '/connections/passwordless/authentication-methods/email-magic-link',
      '/connections/passwordless/guides/email-magic-link',
    ],
    to: '/authenticate/passwordless/authentication-methods/email-magic-link',
  },
  {
    from: [
      '/connections/passwordless/sms-otp',
      '/connections/passwordless/sms',
      '/connections/passwordless/authentication-factors/sms-otp',
      '/connections/passwordless/authentication-methods/sms-otp',
    ],
    to: '/authenticate/passwordless/authentication-methods/sms-otp',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-spa',
      '/connections/passwordless/embedded-login/spa',
      '/connections/passwordless/implement-login/embedded-login/spa',
    ],
    to: '/authenticate/passwordless/implement-login/embedded-login/spa',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-webapps',
      '/connections/passwordless/embedded-login/webapps',
      '/connections/passwordless/implement-login/embedded-login/webapps',
    ],
    to: '/authenticate/passwordless/implement-login/embedded-login/webapps',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-native',
      '/connections/passwordless/guides/embedded-login-native',
      '/connections/passwordless/embedded-login/native',
      '/connections/passwordless/implement-login/embedded-login/native',
    ],
    to: '/authenticate/passwordless/implement-login/embedded-login/native',
  },
  {
    from: [
      '/connections/passwordless/relevant-api-endpoints',
      '/connections/passwordless/embedded-login/relevant-api-endpoints',
      '/connections/passwordless/implement-login/embedded-login/relevant-api-endpoints',
    ],
    to: '/authenticate/passwordless/implement-login/embedded-login/relevant-api-endpoints',
  },
  {
    from: ['/connections/azuread-adfs-email-verification', '/connections/enterprise/azuread-adfs-email-verification'],
    to: '/authenticate/identity-providers/enterprise-identity-providers/azuread-adfs-email-verification',
  },
  {
    from: ['/database/custom-db/templates/get-user', '/connections/database/custom-db/templates/get-user'],
    to: '/authenticate/database-connections/custom-db/templates/get-user',
  },
  {
    from: ['/connections/database/custom-db/templates/login'],
    to: '/authenticate/database-connections/custom-db/templates/login',
  },
  {
    from: ['/connections/database'],
    to: '/authenticate/database-connections',
  },
  {
    from: ['/connections/social/devkeys'],
    to: '/authenticate/identity-providers/social-identity-providers/devkeys',
  },
  {
    from: ['/connections/database/custom-db/overview-custom-db-connections'],
    to: '/authenticate/database-connections/custom-db/overview-custom-db-connections',
  },
  {
    from: ['/connections/passwordless/best-practices'],
    to: '/authenticate/passwordless/best-practices',
  },
  {
    from: ['/connections/database/custom-db/templates'],
    to: '/authenticate/database-connections/custom-db/templates',
  },
  {
    from: ['/connections/database/require-username'],
    to: '/authenticate/database-connections/require-username',
  },
  {
    from: ['/connections/database/custom-db/create-db-connection'],
    to: '/authenticate/database-connections/custom-db/create-db-connection',
  },
  {
    from: ['/connections/pass-parameters-to-idps'],
    to: '/authenticate/identity-providers/pass-parameters-to-idps',
  },
  {
    from: ['/connections/database/password-change'],
    to: '/authenticate/database-connections/password-change',
  },
  {
    from: ['/connections/pass-parameters-to-idps'],
    to: '/authenticate/identity-providers/pass-parameters-to-idps',
  },
  {
    from: ['/connections/database/custom-db/error-handling'],
    to: '/authenticate/database-connections/custom-db/error-handling',
  },
  {
    from: [`/authenticate/database-connections/test-custom-db`],
    to: `/authenticate/database-connections/custom-db/test-custom-database-connections`
  },

  /* MICROSITES */
  {
    from: ['/microsites/call-api/call-api-m2m-app'],
    to: '/get-started/authentication-and-authorization-flow/client-credentials-flow',

  },
  {
    from: ['/microsites/add-login/add-login-native-mobile-app'],
    to: '/quickstart/native',
  },
  {
    from: ['/microsites/add-login/add-login-regular-web-app'],
    to: '/quickstart/webapp',
  },
  {
    from: ['/microsites/add-login/add-login-single-page-app'],
    to: '/quickstart/spa',
  },
  {
    from: ['/microsites/call-api/call-api-device'],
    to: '/get-started/authentication-and-authorization-flow/device-authorization-flow/call-your-api-using-the-device-authorization-flow',
  },
  {
    from: ['/microsites/call-api/call-api-native-mobile-app'],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce/call-your-api-using-the-authorization-code-flow-with-pkce',
  },
  {
    from: ['/microsites/call-api/call-api-regular-web-app'],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow/call-your-api-using-the-authorization-code-flow',
  },
  {
    from: ['/microsites/call-api/call-api-single-page-app'],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce/call-your-api-using-the-authorization-code-flow-with-pkce',
  },
  {
    from: ['/microsites/manage-users/define-maintain-custom-user-data'],
    to: '/manage-users/user-accounts/metadata',
  },
  {
    from: ['/microsites/manage-users/manage-users-and-user-profiles'],
    to: '/manage-users/user-accounts/metadata',
  },

  /* ARCHITECTURE SCENARIOS */

  {
    from: ['/architecture-scenarios'],
    to: '/get-started/architecture-scenarios',
  },
  {
    from: ['/architecture-scenarios/application/mobile-api', '/architecture-scenarios/mobile-api'],
    to: '/get-started/architecture-scenarios/mobile-api',
  },
  {
    from: ['/architecture-scenarios/application/server-api', '/architecture-scenarios/server-api'],
    to: '/get-started/architecture-scenarios/server-application-api',
  },
  {
    from: [
      '/architecture-scenarios/application/spa-api',
      '/architecture-scenarios/sequence-diagrams',
      '/sequence-diagrams',
      '/architecture-scenarios/spa-api',
    ],
    to: '/get-started/architecture-scenarios/spa-api',
  },
  {
    from: ['/architecture-scenarios/spa-api/part-1'],
    to: '/get-started/architecture-scenarios/spa-api/part-1',
  },
  {
    from: ['/architecture-scenarios/spa-api/part-2'],
    to: '/get-started/architecture-scenarios/spa-api/part-2',
  },
  {
    from: ['/architecture-scenarios/spa-api/part-3'],
    to: '/get-started/architecture-scenarios/spa-api/part-3',
  },
  {
    from: ['/architecture-scenarios/application/web-app-sso', '/architecture-scenarios/web-app-sso'],
    to: '/get-started/architecture-scenarios/sso-for-regular-web-apps',
  },
  {
    from: ['/architecture-scenarios/business/b2b', '/architecture-scenarios/b2b'],
    to: '/get-started/architecture-scenarios/business-to-business',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-architecture',
      '/architecture-scenarios/implementation/b2b/b2b-architecture',
      '/architecture-scenarios/b2b/architecture',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/architecture',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-authentication',
      '/architecture-scenarios/implementation/b2b/b2b-authentication',
      '/architecture-scenarios/b2b/authentication',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/authentication',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-authorization',
      '/architecture-scenarios/implementation/b2b/b2b-authorization',
      '/architecture-scenarios/b2b/authorization',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/authorization',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-branding',
      '/architecture-scenarios/implementation/b2b/b2b-branding',
      '/architecture-scenarios/b2b/branding',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/branding',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-deployment',
      '/architecture-scenarios/implementation/b2b/b2b-deployment',
      '/architecture-scenarios/b2b/deployment',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/deployment',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch',
      '/architecture-scenarios/implementation/b2b/b2b-launch',
      '/architecture-scenarios/b2b/launch',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-compliance',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-compliance',
      '/architecture-scenarios/b2b/launch/compliance-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch/compliance-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-launch',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-launch',
      '/architecture-scenarios/b2b/launch/launch-day',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch/launch-day',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-operations',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-operations',
      '/architecture-scenarios/b2b/launch/operations-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch/operations-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-support',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-support',
      '/architecture-scenarios/b2b/launch/support-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch/support-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-testing',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-testing',
      '/architecture-scenarios/b2b/launch/testing',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/launch/testing',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-logout',
      '/architecture-scenarios/implementation/b2b/b2b-logout',
      '/architecture-scenarios/b2b/logout',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/logout',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-operations',
      '/architecture-scenarios/implementation/b2b/b2b-operations',
      '/architecture-scenarios/b2b/operations',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/operations',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-profile-mgmt',
      '/architecture-scenarios/implementation/b2b/b2b-profile-mgmt',
      '/architecture-scenarios/b2b/profile-management',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-provisioning',
      '/architecture-scenarios/implementation/b2b/b2b-provisioning',
      '/architecture-scenarios/b2b/provisioning',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/provisioning',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-qa',
      '/architecture-scenarios/implementation/b2b/b2b-qa',
      '/architecture-scenarios/b2b/quality-assurance',
    ],
    to: '/get-started/architecture-scenarios/business-to-business/quality-assurance',
  },
  {
    from: ['/architecture-scenarios/business/b2c', '/architecture-scenarios/b2c'],
    to: '/get-started/architecture-scenarios/business-to-consumer',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-architecture',
      '/architecture-scenarios/implementation/b2c/b2c-architecture',
      '/architecture-scenarios/b2c/architecture',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/architecture',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-authentication',
      '/architecture-scenarios/implementation/b2c/b2c-authentication',
      '/architecture-scenarios/b2c/authentication',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/authentication',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-authorization',
      '/architecture-scenarios/implementation/b2c/b2c-authorization',
      '/architecture-scenarios/b2c/authorization',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/authorization',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-branding',
      '/architecture-scenarios/implementation/b2c/b2c-branding',
      '/architecture-scenarios/b2c/branding',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/branding',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-deployment',
      '/architecture-scenarios/implementation/b2c/b2c-deployment',
      '/architecture-scenarios/b2c/deployment',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/deployment',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch',
      '/architecture-scenarios/implementation/b2c/b2c-launch',
      '/architecture-scenarios/b2c/launch',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-compliance',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-compliance',
      '/architecture-scenarios/b2c/launch/compliance-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch/compliance-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-launch',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-launch',
      '/architecture-scenarios/b2c/launch/launch-day',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch/launch-day',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-operations',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-operations',
      '/architecture-scenarios/b2c/launch/operations-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch/operations-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-support',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-support',
      '/architecture-scenarios/b2c/launch/support-readiness',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch/support-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-testing',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-testing',
      '/architecture-scenarios/b2c/launch/testing',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/launch/testing',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-logout',
      '/architecture-scenarios/implementation/b2c/b2c-logout',
      '/architecture-scenarios/b2c/logout',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/logout',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-operations',
      '/architecture-scenarios/implementation/b2c/b2c-operations',
      '/architecture-scenarios/b2c/operations',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/operations',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-profile-mgmt',
      '/architecture-scenarios/implementation/b2c/b2c-profile-mgmt',
      '/architecture-scenarios/b2c/profile-management',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-provisioning',
      '/architecture-scenarios/implementation/b2c/b2c-provisioning',
      '/architecture-scenarios/b2c/provisioning',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/provisioning',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-qa',
      '/architecture-scenarios/implementation/b2c/b2c-qa',
      '/architecture-scenarios/b2c/quality-assurance',
    ],
    to: '/get-started/architecture-scenarios/business-to-consumer/quality-assurance',
  },
  {
    from: ['/architecture-scenarios/business/b2e', '/architecture-scenarios/b2e'],
    to: '/get-started/architecture-scenarios/b2e',
  },
  {
    from: [
      '/architecture-scenarios/application/mobile-api/api-implementation-nodejs',
      '/architecture-scenarios/mobile-api/api-implementation-nodejs',
    ],
    to: '/get-started/architecture-scenarios/mobile-api/api-implementation-nodejs',
  },
  {
    from: [
      '/architecture-scenarios/application/mobile-api/mobile-implementation-android',
      '/architecture-scenarios/mobile-api/mobile-implementation-android',
    ],
    to: '/get-started/architecture-scenarios/mobile-api/mobile-implementation-android',
  },
  {
    from: ['/architecture-scenarios/mobile-api/part-1'],
    to: '/get-started/architecture-scenarios/mobile-api/part-1',
  },
  {
    from: ['/architecture-scenarios/mobile-api/part-2'],
    to: '/get-started/architecture-scenarios/mobile-api/part-2',
  },
  {
    from: ['/architecture-scenarios/mobile-api/part-3'],
    to: '/get-started/architecture-scenarios/mobile-api/part-3',
  },
  {
    from: [
      '/architecture-scenarios/application/server-api/api-implementation-nodejs',
      '/architecture-scenarios/server-api/api-implementation-nodejs',
    ],
    to: '/get-started/architecture-scenarios/server-application-api/api-implementation-nodejs',
  },
  {
    from: [
      '/architecture-scenarios/application/server-api/cron-implementation-python',
      '/architecture-scenarios/server-api/cron-implementation-python',
    ],
    to: '/get-started/architecture-scenarios/server-application-api/cron-implementation-python',
  },
  {
    from: ['/architecture-scenarios/server-api/part-1'],
    to: '/get-started/architecture-scenarios/server-application-api/part-1',
  },
  {
    from: ['/architecture-scenarios/server-api/part-2'],
    to: '/get-started/architecture-scenarios/server-application-api/part-2',
  },
  {
    from: ['/architecture-scenarios/server-api/part-3'],
    to: '/get-started/architecture-scenarios/server-application-api/part-3',
  },
  {
    from: [
      '/architecture-scenarios/application/spa-api/spa-implementation-angular2',
      '/architecture-scenarios/spa-api/spa-implementation-angular2',
    ],
    to: '/get-started/architecture-scenarios/spa-api/spa-implementation-angular2',
  },
  {
    from: [
      '/architecture-scenarios/application/spa-api/api-implementation-nodejs',
      '/architecture-scenarios/spa-api/api-implementation-nodejs',
    ],
    to: '/get-started/architecture-scenarios/spa-api/api-implementation-nodejs',
  },
  {
    from: [
      '/architecture-scenarios/application/web-app-sso/implementation-aspnetcore',
      '/architecture-scenarios/web-app-sso/implementation-aspnetcore',
    ],
    to: '/get-started/architecture-scenarios/sso-for-regular-web-apps/implementation-aspnetcore',
  },
  {
    from: ['/architecture-scenarios/web-app-sso/part-1'],
    to: '/get-started/architecture-scenarios/sso-for-regular-web-apps/part-1',
  },
  {
    from: ['/architecture-scenarios/web-app-sso/part-2'],
    to: '/get-started/architecture-scenarios/sso-for-regular-web-apps/part-2',
  },
  {
    from: ['/architecture-scenarios/web-app-sso/part-3'],
    to: '/get-started/architecture-scenarios/sso-for-regular-web-apps/part-3',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/provisioning',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/provisioning',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/provisioning',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/provisioning',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authentication',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/authentication',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/authentication',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authentication',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/branding',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/branding',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/branding',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/branding',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authorization',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/authorization',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/authorization',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authorization',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/profile-management',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/profile-management',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/profile-management',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/logout',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/logout',
      '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/logout',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/logout',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/multiple-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/multiple-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/multiple-idp-orgs',
    ],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture/multiple-idp-orgs',
  },
  {
    from: ['/architecture-scenarios/multiple-organization-architecture'],
    to: '/get-started/architecture-scenarios/multiple-organization-architecture',
  },
  {
    from: ['/architecture-scenarios/checklists'],
    to: '/get-started/architecture-scenarios/checklists',
  },
  {
    from: ['/architecture-scenarios/implementation-resources'],
    to: '/get-started/architecture-scenarios/implementation-resources',
  },

  /* CONTENTFUL REDIRECTS */

  /* Tenants */

  {
    from: [
      '/dashboard/tenant-settings',
      '/get-started/dashboard/tenant-settings',
      '/best-practices/tenant-settings-best-practices',
      '/best-practices/tenant-settings',
      '/dashboard/reference/settings-tenant',
      '/tutorials/dashboard-tenant-settings',
      '/dashboard-account-settings',
      '/dashboard/dashboard-tenant-settings',
      '/config/tenant-settings',
      '/configure/tenant-settings',
    ],
    to: '/get-started/tenant-settings',
  },
  {
    from: [
      '/tokens/manage-signing-keys',
      '/tokens/guides/manage-signing-keys',
      '/config/tenant-settings/signing-keys',
      '/configure/tenant-settings/signing-keys',
    ],
    to: '/get-started/tenant-settings/signing-keys',
  },
  {
    from: [
      '/config/tenant-settings/signing-keys/rotate-signing-keys',
      '/configure/tenant-settings/signing-keys/rotate-signing-keys',
    ],
    to: '/get-started/tenant-settings/signing-keys/rotate-signing-keys',
  },
  {
    from: [
      '/config/tenant-settings/signing-keys/revoke-signing-keys',
      '/configure/tenant-settings/signing-keys/revoke-signing-keys',
    ],
    to: '/get-started/tenant-settings/signing-keys/revoke-signing-keys',
  },
  {
    from: [
      '/config/tenant-settings/signing-keys/view-signing-certificates',
      '/configure/tenant-settings/signing-keys/view-signing-certificates',
    ],
    to: '/get-started/tenant-settings/signing-keys/view-signing-certificates',
  },
  {
    from: [
      '/get-started/dashboard/configure-device-user-code-settings',
      '/dashboard/guides/tenants/configure-device-user-code-settings',
      '/config/tenant-settings/configure-device-user-code-settings',
      '/configure/tenant-settings/configure-device-user-code-settings',
    ],
    to: '/get-started/tenant-settings/configure-device-user-code-settings',
  },
  {
    from: [
      '/get-started/dashboard/enable-sso-for-legacy-tenants',
      '/dashboard/guides/tenants/enable-sso-tenant',
      '/configure/tenant-settings/enable-sso-for-legacy-tenants',
    ],
    to: '/get-started/tenant-settings/enable-sso-for-legacy-tenants',
  },

  /* Applications */

  {
    from: [
      '/applications',
      '/application',
      '/applications/concepts/app-types-auth0',
      '/clients',
      '/api-auth/tutorials/adoption/oidc-conformant',
      '/api-auth/client-types',
      '/clients/client-types',
      '/applications/application-types',
      '/applications/concepts/client-secret',
      '/configure/applications',
    ],
    to: '/get-started/applications',
  },
  {
    from: [
      '/clients/client-settings',
      '/dashboard/reference/settings-application',
      '/get-started/dashboard/application-settings',
      '/best-practices/application-settings',
      '/best-practices/app-settings-best-practices',
      '/applications/application-settings',
      '/configure/applications/application-settings',
    ],
    to: '/get-started/applications/application-settings',
  },
  {
    from: [
      '/applications/dynamic-client-registration',
      '/api-auth/dynamic-client-registration',
      '/api-auth/dynamic-application-registration',
      '/configure/applications/dynamic-client-registration',
    ],
    to: '/get-started/applications/dynamic-client-registration',
  },
  {
    from: [
      '/dashboard/guides/applications/enable-android-app-links',
      '/clients/enable-android-app-links',
      '/applications/enable-android-app-links',
      '/applications/guides/enable-android-app-links-dashboard',
      '/applications/enable-android-app-links-support',
      '/configure/applications/enable-android-app-links-support',
    ],
    to: '/get-started/applications/enable-android-app-links-support',
  },
  {
    from: [
      '/dashboard/guides/applications/enable-universal-links',
      '/clients/enable-universal-links',
      '/applications/enable-universal-links',
      '/applications/guides/enable-universal-links-dashboard',
      '/enable-universal-links-support-in-apple-xcode',
      '/applications/enable-universal-links-support-in-apple-xcode',
      '/configure/applications/enable-universal-links-support-in-apple-xcode',
    ],
    to: '/get-started/applications/enable-universal-links-support-in-apple-xcode',
  },
  {
    from: [
      '/dashboard/guides/applications/enable-sso-app',
      '/sso/enable-sso-for-applications',
      '/configure/applications/enable-sso-for-applications',
    ],
    to: '/get-started/applications/enable-sso-for-applications',
  },
  {
    from: ['/applications/configure-application-metadata', '/configure/applications/configure-application-metadata'],
    to: '/get-started/applications/configure-application-metadata',
  },
  {
    from: [
      '/applications/reference/grant-types-available',
      '/applications/reference/grant-types-auth0-mapping',
      '/clients/client-grant-types',
      '/applications/concepts/application-grant-types',
      '/applications/concepts/grant-types-legacy',
      '/applications/application-grant-types',
      '/configure/applications/application-grant-types',
    ],
    to: '/get-started/applications/application-grant-types',
  },
  {
    from: ['/get-started/applications/how-to-rotate-application-secret'],
    to: '/get-started/applications/rotate-client-secret',
  },
  {
    from: [
      '/api-auth/config/using-the-auth0-dashboard',
      '/api-auth/config/using-the-management-api',
      '/api/management/guides/applications/update-grant-types',
      '/dashboard/guides/applications/update-grant-types',
      '/applications/update-grant-types',
      '/configure/applications/update-grant-types',
    ],
    to: '/get-started/applications/update-grant-types',
  },
  {
    from: [
      '/authorization/revoke-access-to-apis-using-blacklists-or-application-grants',
      '/api-auth/blacklists-vs-grants',
      '/blacklists-vs-application-grants',
      '/authorization/revoke-api-access',
      '/configure/applications/revoke-api-access',
    ],
    to: '/get-started/applications/revoke-api-access',
  },
  {
    from: [
      '/dashboard/guides/applications/rotate-client-secret',
      '/api/management/guides/applications/rotate-client-secret',
      '/get-started/dashboard/rotate-client-secret',
      '/applications/rotate-client-secret',
      '/configure/applications/rotate-client-secret',
      '/applications/how-to-rotate-application-secret',
    ],
    to: '/get-started/applications/rotate-client-secret',
  },
  {
    from: [
      '/tokens/signing-algorithms',
      '/applications/concepts/signing-algorithms',
      '/tokens/concepts/signing-algorithms',
      '/configure/applications/signing-algorithms',
    ],
    to: '/get-started/applications/signing-algorithms',
  },
  {
    from: [
      '/dashboard/guides/applications/update-signing-algorithm',
      '/tokens/guides/update-signing-algorithm-application',
      '/applications/change-application-signing-algorithms',
      '/configure/applications/change-application-signing-algorithms',
    ],
    to: '/get-started/applications/change-application-signing-algorithms',
  },
  {
    from: [
      '/applications/set-up-cors',
      '/dashboard/guides/applications/set-up-cors',
      '/configure/applications/set-up-cors',
    ],
    to: '/get-started/applications/set-up-cors',
  },
  {
    from: [
      '/tutorials/openid-connect-discovery',
      '/protocols/oidc/openid-connect-discovery',
      '/oidc-rs256-owin',
      '/protocols/configure-applications-with-oidc-discovery',
      '/configure/applications/configure-applications-with-oidc-discovery',
    ],
    to: '/get-started/applications/configure-applications-with-oidc-discovery',
  },
  {
    from: [
      '/protocols/configure-ws-fed-applications',
      '/integrations/configure-wsfed-application',
      '/tutorials/configure-wsfed-application',
      '/configure/applications/configure-ws-fed-applications',
    ],
    to: '/get-started/applications/update-application-connections',
  },
  {
    from: [
      '/applications/update-application-connections',
      '/dashboard/guides/applications/update-app-connections',
      '/configure/applications/update-application-connections',
    ],
    to: '/get-started/applications/update-application-connections',
  },
  {
    from: [
      '/applications/concepts/app-types-confidential-public',
      '/applications/confidential-and-public-applications',
      '/configure/applications/confidential-public-apps',
    ],
    to: '/get-started/applications/confidential-and-public-applications',
  },
  {
    from: [
      '/dashboard/guides/applications/view-app-type-confidential-public',
      '/applications/view-application-type',
      '/configure/applications/confidential-public-apps/view-application-type',
    ],
    to: '/get-started/applications/confidential-and-public-applications/view-application-type',
  },
  {
    from: [
      '/applications/first-party-and-third-party-applications',
      '/applications/concepts/app-types-first-third-party',
      '/configure/applications/confidential-public-apps/first-party-and-third-party-applications',
    ],
    to: '/get-started/applications/confidential-and-public-applications/first-party-and-third-party-applications',
  },
  {
    from: [
      '/applications/view-application-ownership',
      '/api/management/guides/applications/view-ownership',
      '/configure/applications/confidential-public-apps/view-application-ownership',
    ],
    to: '/get-started/applications/confidential-and-public-applications/view-application-ownership',
  },
  {
    from: [
      '/api/management/guides/applications/update-ownership',
      '/api/management/guides/applications/remove-app',
      '/applications/update-application-ownership',
      '/configure/applications/confidential-public-apps/update-application-ownership',
    ],
    to: '/get-started/applications/confidential-and-public-applications/update-application-ownership',
  },
  {
    from: [
      '/applications/guides/enable-third-party-applications',
      '/applications/guides/enable-third-party-apps',
      '/applications/enable-third-party-applications',
      '/configure/applications/confidential-public-apps/enable-third-party-applications',
    ],
    to: '/get-started/applications/confidential-and-public-applications/enable-third-party-applications',
  },
  {
    from: [
      '/api-auth/user-consent',
      '/authorization/user-consent-and-third-party-applications',
      '/configure/applications/confidential-public-apps/user-consent-and-third-party-applications',
    ],
    to: '/get-started/applications/confidential-and-public-applications/user-consent-and-third-party-applications',
  },
  {
    from: [
      '/applications/wildcards-for-subdomains',
      '/applications/reference/wildcard-subdomains',
      '/configure/applications/wildcards-for-subdomains',
    ],
    to: '/get-started/applications/wildcards-for-subdomains',
  },
  {
    from: [
      '/applications/remove-applications',
      '/dashboard/guides/applications/remove-app',
      '/configure/applications/remove-applications',
    ],
    to: '/get-started/applications/remove-applications',
  },
  {
    from: [
      '/dev-lifecycle/work-with-auth0-locally',
      '/dev-lifecycle/local-testing-and-development',
      '/applications/work-with-auth0-locally',
      '/configure/applications/work-with-auth0-locally',
    ],
    to: '/get-started/applications/work-with-auth0-locally',
  },
  {
    from: [
      '/applications/set-up-database-connections',
      '/dashboard/guides/connections/set-up-connections-database',
      '/configure/applications/set-up-database-connections',
    ],
    to: '/get-started/applications/set-up-database-connections',
  },
  {
    from: [
      '/get-started/dashboard/test-database-connections',
      '/dashboard/guides/connections/test-connections-database',
      '/configure/applications/test-database-connections',
    ],
    to: '/get-started/applications/test-database-connections',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams',
    ],
    to: '/get-started/auth0-teams',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams/tenant-management',
    ],
    to: '/get-started/auth0-teams/tenant-management',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams/team-member-management',
    ],
    to: '/get-started/auth0-teams/team-member-management',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams/tenant-member-management',
    ],
    to: '/get-started/auth0-teams/tenant-member-management',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams/configure-security-policies',
    ],
    to: '/get-started/auth0-teams/configure-security-policies',
  },
  {
    from: [
      '/get-started/tenant-settings/auth0-teams/troubleshoot-teams',
    ],
    to: '/get-started/auth0-teams/troubleshoot-teams',
  },

  /* APIs */

  {
    from: ['/authorization/apis', '/api-auth/apis', '/overview/apis', '/apis', '/configure/apis'],
    to: '/get-started/apis',
  },
  {
    from: [
      '/api-auth/references/dashboard/api-settings',
      '/dashboard/reference/settings-api',
      '/get-started/dashboard/api-settings',
      '/config/api-settings',
      '/configure/apis/api-settings',
    ],
    to: '/get-started/apis/api-settings',
  },
  {
    from: [
      '/dashboard/guides/apis/add-permissions-apis',
      '/api/management/guides/apis/update-permissions-apis',
      '/scopes/current/guides/define-scopes-using-dashboard',
      '/scopes/current/guides/define-api-scope-dashboard',
      '/get-started/dashboard/add-api-permissions',
      '/config/api-settings/add-api-permissions',
      '/configure/apis/add-api-permissions',
    ],
    to: '/get-started/apis/add-api-permissions',
  },
  {
    from: [
      '/dashboard/guides/apis/delete-permissions-apis',
      '/get-started/dashboard/delete-api-permissions',
      '/config/api-settings/delete-api-permissions',
      '/configure/apis/delete-api-permissions',
    ],
    to: '/get-started/apis/delete-api-permissions',
  },
  {
    from: ['/scopes', '/scopes/current', '/scopes/legacy', '/scopes/preview', '/configure/apis/scopes'],
    to: '/get-started/apis/scopes',
  },
  {
    from: ['/scopes/api-scopes', '/scopes/current/api-scopes', '/configure/apis/scopes/api-scopes'],
    to: '/get-started/apis/scopes/api-scopes',
  },
  {
    from: [
      '/scopes/current/oidc-scopes',
      '/api-auth/tutorials/adoption/scope-custom-claims',
      '/scopes/oidc-scopes',
      '/scopes/openid-connect-scopes',
      '/configure/apis/scopes/openid-connect-scopes',
    ],
    to: '/get-started/apis/scopes/openid-connect-scopes',
  },
  {
    from: [
      '/scopes/sample-use-cases-scopes-and-claims',
      '/scopes/current/sample-use-cases',
      '/configure/apis/scopes/sample-use-cases-scopes-and-claims',
    ],
    to: '/get-started/apis/scopes/sample-use-cases-scopes-and-claims',
  },
  {
    from: [
      '/authorization/set-logical-api',
      '/authorization/represent-multiple-apis-using-a-single-logical-api',
      '/api-auth/tutorials/represent-multiple-apis',
      '/configure/apis/set-logical-api',
    ],
    to: '/get-started/apis/set-logical-api',
  },
  {
    from: [
      '/api/management/guides/apis/enable-rbac',
      '/dashboard/guides/apis/enable-rbac',
      '/authorization/guides/dashboard/enable-rbac',
      '/authorization/rbac/enable-role-based-access-control-for-apis',
      '/authorization/auth-core-features/enable-role-based-access-control-for-apis',
      '/configure/apis/enable-role-based-access-control-for-apis',
    ],
    to: '/get-started/apis/enable-role-based-access-control-for-apis',
  },
  {
    from: [
      '/config/api-settings/create-m2m-app-test',
      '/api/management/v2/create-m2m-app',
      '/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application',
      '/configure/apis/create-m2m-app-test',
    ],
    to: '/get-started/apis/create-m2m-app-test',
  },

  /* Single Sign-On */

  {
    from: [
      '/api-auth/tutorials/adoption/single-sign-on',
      '/sso/legacy',
      '/sso/legacy/single-page-apps',
      '/sso/legacy/regular-web-apps-sso',
      '/sso/legacy/single-page-apps-sso',
      '/sso/current/single-page-apps-sso',
      '/sso/current/single-page-apps',
      '/sso/current/sso-auth0',
      '/sso/current/introduction',
      '/sso/single-sign-on',
      '/sso/current',
      '/sso/current/setup',
      '/sso/current/index_old',
      '/sso',
      '/configure/sso',
    ],
    to: '/authenticate/single-sign-on',
  },
  {
    from: ['/sso/inbound-single-sign-on', '/sso/current/inbound', '/configure/sso/inbound-single-sign-on'],
    to: '/authenticate/single-sign-on/inbound-single-sign-on',
  },
  {
    from: ['/sso/outbound-single-sign-on', '/sso/current/outbound', '/configure/sso/outbound-single-sign-on'],
    to: '/authenticate/single-sign-on/outbound-single-sign-on',
  },
  {
    from: [
      '/single-sign-on/api-endpoints-for-single-sign-on',
      '/sso/current/relevant-api-endpoints',
      '/sso/api-endpoints-for-single-sign-on',
      '/configure/sso/api-endpoints-for-single-sign-on',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on',
  },

  /* SAML */

  {
    from: [
      '/saml-apps',
      '/protocols/saml/identity-providers',
      '/samlp-providers',
      '/protocols/saml/samlp-providers',
      '/protocols/saml',
      '/protocols/saml-protocol',
      '/configure/saml-protocol',
      '/config/saml-protocol',
      '/protocols/saml/saml-apps',
      '/protocols/saml/saml-configuration/supported-options-and-bindings',
      '/protocols/saml/saml-configuration/design-considerations',
      '/protocols/saml/saml-configuration',
      '/saml-configuration',
      '/config/saml-configuration',
      '/configure/saml-configuration',
    ],
    to: '/authenticate/protocols/saml/saml-configuration',
  },
  {
    from: [
      '/protocols/saml-configuration-options',
      '/protocols/saml/saml-configuration-options',
      '/config/saml-configuration/saml-sso-integrations',
      '/config/saml-configuration/special-saml-configuration-scenarios',
      '/protocols/saml/saml-configuration/special-configuration-scenarios',
      '/protocols/saml-protocol/saml-configuration-options/special-saml-configuration-scenarios',
      '/protocols/saml-protocol/special-saml-configuration-scenarios',
      '/protocols/saml-protocol/saml-sso-integrations',
      '/configure/saml-configuration/saml-sso-integrations',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations',
  },
  {
    from: [
      '/protocols/saml/idp-initiated-sso',
      '/protocols/saml-configuration-options/identity-provider-initiated-single-sign-on',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/idp-initiated-sso',
      '/protocols/saml-protocol/saml-configuration-options/identity-provider-initiated-single-sign-on',
      '/protocols/saml-protocol/saml-sso-integrations/identity-provider-initiated-single-sign-on',
      '/configure/saml-configuration/saml-sso-integrations/identity-provider-initiated-single-sign-on',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/identity-provider-initiated-single-sign-on',
  },
  {
    from: [
      '/protocols/saml-configuration-options/sign-and-encrypt-saml-requests',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests',
      '/protocols/saml-protocol/saml-configuration-options/sign-and-encrypt-saml-requests',
      '/protocols/saml-protocol/saml-sso-integrations/sign-and-encrypt-saml-requests',
      '/configure/saml-configuration/saml-sso-integrations/sign-and-encrypt-saml-requests',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/sign-and-encrypt-saml-requests',
  },
  {
    from: [
      '/protocols/saml-protocol/saml-configuration-options/work-with-certificates-and-keys-as-strings',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/work-with-certificates-and-keys-as-strings',
      '/protocols/saml-protocol/saml-sso-integrations/work-with-certificates-and-keys-as-strings',
      '/configure/saml-configuration/saml-sso-integrations/work-with-certificates-and-keys-as-strings',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/work-with-certificates-and-keys-as-strings',
  },
  {
    from: [
      '/saml2webapp-tutorial',
      '/protocols/saml/saml2webapp-tutorial',
      '/protocols/saml-protocol/saml-configuration-options/enable-saml2-web-app-addon',
      '/configure/saml-configuration/saml-sso-integrations/enable-saml2-web-app-addon',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/enable-saml2-web-app-addon',
  },
  {
    from: [
      '/protocols/saml-configuration-options/configure-auth0-saml-service-provider',
      '/protocols/saml/saml-sp-generic',
      '/saml-sp-generic',
      '/protocols/saml/saml-configuration/auth0-as-service-provider',
      '/protocols/saml-protocol/configure-auth0-saml-service-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider',
  },
  {
    from: [
      '/protocols/saml/adfs',
      '/protocols/saml-protocol/saml-configuration-options/configure-adfs-saml-connections',
      '/protocols/saml-protocol/saml-sso-integrations/configure-adfs-saml-connections',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-adfs-saml-connections',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-adfs-saml-connections',
  },
  {
    from: [
      '/protocols/saml/identity-providers/okta',
      '/okta',
      '/saml/identity-providers/okta',
      '/protocols/saml-configuration-options/configure-okta-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-okta-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-okta-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-okta-as-saml-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-okta-as-saml-identity-provider',
  },
  {
    from: [
      '/onelogin',
      '/saml/identity-providers/onelogin',
      '/protocols/saml/identity-providers/onelogin',
      '/protocols/saml-configuration-options/configure-onelogin-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-onelogin-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-onelogin-as-saml-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-onelogin-as-saml-identity-provider',
  },
  {
    from: [
      '/ping7',
      '/saml/identity-providers/ping7',
      '/protocols/saml/identity-providers/ping7',
      '/protocols/saml-configuration-options/configure-pingfederate-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-pingfederate-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration/configure-pingfederate-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-pingfederate-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-pingfederate-as-saml-identity-provider',
      '/connections/enterprise/ping-federate',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-pingfederate-as-saml-identity-provider',
  },
  {
    from: [
      '/saml/identity-providers/salesforce',
      '/protocols/saml/identity-providers/salesforce',
      '/protocols/saml-configuration-options/configure-salesforce-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-salesforce-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-salesforce-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-salesforce-as-saml-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-salesforce-as-saml-identity-provider',
  },
  {
    from: [
      '/siteminder',
      '/saml/identity-providers/siteminder',
      '/protocols/saml/identity-providers/siteminder',
      '/protocols/saml-configuration-options/configure-siteminder-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-siteminder-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-siteminder-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-siteminder-as-saml-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-siteminder-as-saml-identity-provider',
  },
  {
    from: [
      '/ssocircle',
      '/saml/identity-providers/ssocircle',
      '/protocols/saml/identity-providers/ssocircle',
      '/protocols/saml-configuration-options/configure-ssocircle-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-ssocircle-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-ssocircle-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-ssocircle-as-saml-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-service-provider/configure-ssocircle-as-saml-identity-provider',
  },
  {
    from: [
      '/protocols/saml-configuration-options/configure-auth0-as-saml-identity-provider',
      '/saml-idp-generic',
      '/protocols/saml/saml-idp-generic',
      '/protocols/saml/saml-configuration/auth0-as-identity-provider',
      '/protocols/saml-protocol/configure-auth0-as-saml-identity-provider',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider',
  },
  {
    from: [
      '/configure/saml-configuration-options/configure-saml2-web-app-addon-for-aws',
      '/dashboard/guides/applications/set-up-addon-saml2-aws',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-aws',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-aws',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-aws',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-aws',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-aws',
  },
  {
    from: [
      '/protocols/saml/saml-apps/atlassian',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-atlassian',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-atlassian',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-atlassian',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-atlassian',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-atlassian',
  },
  {
    from: [
      '/saml-apps/cisco-webex',
      '/protocols/saml/saml-apps/cisco-webex',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-cisco-webex',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-cisco-webex',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-cisco-webex',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-cisco-webex',
  },
  {
    from: [
      '/saml-apps/datadog',
      '/protocols/saml/saml-apps/datadog',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-datadog',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-datadog',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-datadog',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-datadog',
  },
  {
    from: [
      '/protocols/saml/saml-apps/egencia',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-egencia',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-egencia',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-egencia',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-egencia',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-egencia',
  },
  {
    from: [
      '/protocols/saml/saml-idp-eloqua',
      '/protocols/saml/saml-apps/eloqua',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-addon-eloqua',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-addon-eloqua',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-addon-eloqua',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-saml2-addon-eloqua',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-saml2-addon-eloqua',
  },
  {
    from: [
      '/saml-apps/freshdesk',
      '/protocols/saml/saml-apps/freshdesk',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-freshdesk',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-freshdesk',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-freshdesk',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-freshdesk',
  },
  {
    from: [
      '/protocols/saml/saml-apps/github-cloud',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-cloud',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-github-enterprise-cloud',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-cloud',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-cloud',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-cloud',
  },
  {
    from: [
      '/integrations/using-auth0-as-an-identity-provider-with-github-enterprise',
      '/protocols/saml/saml-apps/github-server',
      '/tutorials/using-auth0-as-an-identity-provider-with-github-enterprise',
      '/scenarios/github',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-server',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-github-enterprise-server',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-server',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-server',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-server',
  },
  {
    from: [
      '/protocols/saml/saml-apps/google-apps',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-idp-for-google-g-suite',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-idp-for-google-g-suite',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-idp-for-google-g-suite',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-idp-for-google-g-suite',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-idp-for-google-g-suite',
  },
  {
    from: [
      '/protocols/saml/saml-apps/heroku',
      '/saml-apps/heroku-sso',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-heroku',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-heroku',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-heroku',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-heroku',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-heroku',
  },
  {
    from: [
      '/protocols/saml/saml-apps/hosted-graphite',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-hosted-graphite',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-hosted-graphite',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-hosted-graphite',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-hosted-graphite',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-hosted-graphite',
  },
  {
    from: [
      '/protocols/saml/saml-apps/litmos',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-litmos',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-litmos',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-litmos',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-litmos',
  },
  {
    from: [
      '/protocols/saml/saml-apps/pluralsight',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-pluralsight',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-pluralsight',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-pluralsight',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-pluralsight',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-pluralsight',
  },
  {
    from: [
      '/protocols/saml/saml-apps/sprout-video',
      '/saml-apps/sprout-video',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-sprout-video',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-sprout-video',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-sprout-video',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-sprout-video',
  },
  {
    from: [
      '/protocols/saml/saml-apps/tableau-online',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-online',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-tableau-online',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-online',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-online',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-online',
  },
  {
    from: [
      '/protocols/saml/saml-apps/tableau-server',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-server',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-tableau-server',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-server',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-server',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-server',
  },
  {
    from: [
      '/protocols/saml/saml-apps/workday',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-workday',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-workday',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workday',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workday',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workday',
  },
  {
    from: [
      '/protocols/saml/saml-apps/workpath',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-workpath',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-workpath',
      '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workpath',
      '/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workpath',
    ],
    to: '/authenticate/single-sign-on/outbound-single-sign-on/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workpath',
  },
  {
    from: [
      '/protocols/saml-configuration-options/saml-identity-provider-configuration-settings',
      '/samlp',
      '/protocols/saml/samlp',
      '/protocols/saml-protocol/saml-identity-provider-configuration-settings',
      '/configure/saml-configuration/saml-identity-provider-configuration-settings',
    ],
    to: '/authenticate/protocols/saml/saml-identity-provider-configuration-settings',
  },
  {
    from: [
      '/protocols/saml-configuration-options/customize-saml-assertions',
      '/protocols/saml/saml-configuration/saml-assertions',
      '/protocols/saml-protocol/customize-saml-assertions',
      '/configure/saml-configuration/customize-saml-assertions',
    ],
    to: '/authenticate/protocols/saml/saml-configuration/customize-saml-assertions',
  },
  {
    from: [
      '/protocols/saml-configuration-options/test-saml-sso-with-auth0-as-service-and-identity-provider',
      '/protocols/saml/samlsso-auth0-to-auth0',
      '/samlsso-auth0-to-auth0',
      '/protocols/saml-configuration-options/configure-auth0-as-service-and-identity-provider',
      '/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider',
      '/protocols/saml-protocol/configure-auth0-as-service-and-identity-provider',
      '/configure/saml-configuration/configure-auth0-as-service-and-identity-provider',
    ],
    to: '/authenticate/protocols/saml/saml-configuration/configure-auth0-as-service-and-identity-provider',
  },
  {
    from: [
      '/protocols/saml-configuration-options/deprovision-users-in-saml-integrations',
      '/protocols/saml/saml-configuration/deprovision-users',
      '/protocols/saml-protocol/deprovision-users-in-saml-integrations',
      '/configure/saml-configuration/deprovision-users-in-saml-integrations',
    ],
    to: '/authenticate/protocols/saml/saml-configuration/deprovision-users-in-saml-integrations',
  },
  {
    from: ['/authorization/protocols/scim'],
    to: '/authenticate/protocols/scim',
  },

  /* Actions */
  {
    from: ['/actions'],
    to: '/customize/actions',
  },
  {
    from: ['/actions/actions-overview'],
    to: '/customize/actions/actions-overview',
  },
  {
    from: [
      '/actions/build-actions-flows',
      '/actions/edit-actions',
      '/actions/troubleshoot-actions',
      '/actions/write-your-first-action',
    ],
    to: '/customize/actions/write-your-first-action',
  },
  {
    from: [
      '/actions/actions-context-object',
      '/actions/actions-event-object',
      '/actions/blueprints',
      '/actions/triggers',
      '/customize/actions/triggers',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: ['/actions/manage-action-versions', '/actions/manage-versions', '/customize/actions/manage-action-versions'],
    to: '/customize/actions/manage-versions',
  },
  {
    from: ['/actions/triggers/send-phone-message', '/customize/actions/triggers/send-phone-message'],
    to: '/customize/actions/flows-and-triggers/send-phone-message-flow',
  },
  {
    from: [
      '/actions/triggers/send-phone-message/event-object',
      '/customize/actions/triggers/send-phone-message/event-object',
    ],
    to: '/customize/actions/flows-and-triggers/send-phone-message-flow/event-object',
  },
  {
    from: ['/actions/programming-model-changes', '/customize/actions/programming-model-changes'],
    to: '/customize/actions/migrate/migrate-from-actions-beta-to-final',
  },
  {
    from: ['/customize/actions/migrate-from-rules-to-actions'],
    to: '/customize/actions/migrate/migrate-from-rules-to-actions',
  },
  {
    from: ['/actions/limitations'],
    to: '/customize/actions/limitations',
  },
  {
    from: ['/actions/triggers/post-change-password', '/customize/actions/triggers/post-change-password'],
    to: '/customize/actions/flows-and-triggers/post-change-password-flow',
  },
  {
    from: [
      '/actions/triggers/post-change-password/event-object',
      '/customize/actions/triggers/post-change-password/event-object',
    ],
    to: '/customize/actions/flows-and-triggers/post-change-password-flow/event-object',
  },
  {
    from: ['/actions/triggers/post-user-registration', '/customize/actions/triggers/post-user-registration'],
    to: '/customize/actions/flows-and-triggers/post-user-registration-flow',
  },
  {
    from: [
      '/actions/triggers/post-user-registration/event-object',
      '/customize/actions/triggers/post-user-registration/event-object',
    ],
    to: '/customize/actions/flows-and-triggers/post-user-registration-flow/event-object',
  },
  {
    from: ['/actions/triggers/pre-user-registration', '/customize/actions/triggers/pre-user-registration'],
    to: '/customize/actions/flows-and-triggers/pre-user-registration-flow',
  },
  {
    from: [
      '/actions/triggers/pre-user-registration/event-object',
      '/customize/actions/triggers/pre-user-registration/event-object',
    ],
    to: '/customize/actions/flows-and-triggers/pre-user-registration-flow/event-object',
  },
  {
    from: [
      '/actions/triggers/pre-user-registration/api-object',
      '/customize/actions/triggers/pre-user-registration/api-object',
    ],
    to: '/customize/actions/flows-and-triggers/pre-user-registration-flow/api-object',
  },
  {
    from: ['/actions/triggers/credentials-exchange', '/customize/actions/triggers/credentials-exchange'],
    to: '/customize/actions/flows-and-triggers/machine-to-machine-flow',
  },
  {
    from: [
      '/actions/triggers/credentials-exchange/event-object',
      '/customize/actions/triggers/credentials-exchange/event-object',
    ],
    to: '/customize/actions/flows-and-triggers/machine-to-machine-flow/event-object',
  },
  {
    from: [
      '/actions/triggers/credentials-exchange/api-object',
      '/customize/actions/triggers/credentials-exchange/api-object',
    ],
    to: '/customize/actions/flows-and-triggers/machine-to-machine-flow/api-object',
  },
  {
    from: ['/actions/triggers/post-login', '/customize/actions/triggers/post-login'],
    to: '/customize/actions/flows-and-triggers/login-flow',
  },
  {
    from: ['/actions/triggers/post-login/event-object', '/customize/actions/triggers/post-login/event-object'],
    to: '/customize/actions/flows-and-triggers/login-flow/event-object',
  },
  {
    from: ['/actions/triggers/post-login/api-object', '/customize/actions/triggers/post-login/api-object'],
    to: '/customize/actions/flows-and-triggers/login-flow/api-object',
  },
  {
    from: [
      '/actions/triggers/post-login/redirect-with-actions',
      '/customize/actions/triggers/post-login/redirect-with-actions',
    ],
    to: '/customize/actions/flows-and-triggers/login-flow/redirect-with-actions',
  },

  /* Attack Protection */

  {
    from: [
      '/anomaly-',
      '/anomaly',
      '/anomaly-detection/references/anomaly-detection-faqs',
      '/anomaly-detection/references/anomaly-detection-restrictions-limitations',
      '/anomaly-detection/guides/set-anomaly-detection-preferences',
      '/anomaly-detection/set-anomaly-detection-preferences',
      '/attack-protection/set-attack-protection-preferences',
      '/anomaly-detection',
      '/attack-protection',
      '/configure/attack-protection',
    ],
    to: '/secure/attack-protection',
  },
  {
    from: [
      '/anomaly-detection/references/breached-password-detection-triggers-actions',
      '/anomaly-detection/concepts/breached-passwords',
      '/anomaly-detection/breached-passwords',
      '/anomaly-detection/breached-password-security',
      '/attack-protection/breached-password-detection',
      '/configure/attack-protection/breached-password-detection',
    ],
    to: '/secure/attack-protection/breached-password-detection',
  },
  {
    from: [
      '/anomaly-detection/bot-protection',
      '/anomaly-detection/guides/prevent-credential-stuffing-attacks',
      '/anomaly-detection/bot-and-credential-stuffing-protection',
      '/anomaly-detection/bot-detection',
      '/attack-protection/bot-detection',
      '/configure/attack-protection/bot-detection',
    ],
    to: '/secure/attack-protection/bot-detection',
  },
  {
    from: [
      '/configure/anomaly-detection/bot-detection/configure-recaptcha-enterprise',
      '/anomaly-detection/bot-detection/configure-recaptcha-enterprise',
      '/attack-protection/bot-detection/configure-recaptcha-enterprise',
      '/configure/attack-protection/bot-detection/configure-recaptcha-enterprise',
      '/secure/attack-protection/bot-detection/configure-recaptcha-enterprise',
    ],
    to: '/secure/attack-protection/bot-detection/configure-captcha',
  },
  {
    from: [
      '/anomaly-detection/bot-detection/bot-detection-custom-login-pages',
      '/configure/anomaly-detection/bot-detection/bot-detection-custom-login-pages',
      '/attack-protection/bot-detection/bot-detection-custom-login-pages',
      '/configure/attack-protection/bot-detection/bot-detection-custom-login-pages',
    ],
    to: '/secure/attack-protection/bot-detection/bot-detection-custom-login-pages',
  },
  {
    from: [
      '/configure/anomaly-detection/bot-detection/bot-detection-native-apps',
      '/anomaly-detection/bot-detection/bot-detection-native-apps',
      '/configure/attack-protection/bot-detection/bot-detection-native-apps',
    ],
    to: '/secure/attack-protection/bot-detection/bot-detection-native-apps',
  },
  {
    from: [
      '/anomaly-detection/references/brute-force-protection-triggers-actions',
      '/anomaly-detection/guides/enable-disable-brute-force-protection',
      '/anomaly-detection/concepts/brute-force-protection',
      '/anomaly-detection/enable-and-disable-brute-force-protection',
      '/anomaly-detection/brute-force-protection',
      '/attack-protection/brute-force-protection',
      '/configure/attack-protection/brute-force-protection',
    ],
    to: '/secure/attack-protection/brute-force-protection',
  },
  {
    from: [
      '/configure/anomaly-detection/suspicious-ip-throttling',
      '/anomaly-detection/suspicious-ip-throttling',
      '/attack-protection/suspicious-ip-throttling',
      '/configure/attack-protection/suspicious-ip-throttling',
    ],
    to: '/secure/attack-protection/suspicious-ip-throttling',
  },
  {
    from: [
      '/anomaly-detection/guides/use-tenant-data-for-anomaly-detection',
      '/anomaly-detection/view-anomaly-detection-events',
      '/attack-protection/view-attack-protection-events',
      '/configure/attack-protection/view-attack-protection-events',
    ],
    to: '/secure/attack-protection/view-attack-protection-events',
  },
  {
    from: [
      '/protocols/oauth2/oauth-state',
      '/protocols/oauth-state',
      '/protocols/oauth2/mitigate-csrf-attacks',
      '/protocols/state-parameters',
      '/authorization/protocols/state-parameters',
      '/configure/attack-protection/state-parameters',
    ],
    to: '/secure/attack-protection/state-parameters',
  },

  /* API */

  {
    from: ['/auth-api', '/api/authentication/reference'],
    to: '/api/authentication',
  },
  {
    from: ['/apiv2', '/api/v2', '/api/management'],
    to: '/api/management/v2',
  },
  {
    from: ['/auth0-apis', '/api/info'],
    to: '/api',
  },
  {
    from: ['/api/use-auth0-apis-with-postman-collections', '/api/postman'],
    to: '/api',
  },

  /* Authorization */

  {
    from: ['/authorization/concepts/policies', '/authorization/authorization-policies'],
    to: '/manage-users/access-control/authorization-policies',
  },
  {
    from: [
      '/authorization/rules-for-authorization-policies',
      '/authorization/concepts/authz-rules',
      '/authorization/authorization-policies/rules-for-authorization-policies',
    ],
    to: '/manage-users/access-control/rules-for-authorization-policies',
  },
  {
    from: [
      '/api-auth/restrict-access-api',
      '/api-auth/restrict-requests-for-scopes',
      '/authorization/concepts/sample-use-cases-rules',
      '/authorization/restrict-access-api',
      '/authorization/sample-use-cases-rules-with-authorization',
      '/authorization/authorization-policies/sample-use-cases-rules-with-authorization',
    ],
    to: '/manage-users/access-control/sample-use-cases-rules-with-authorization',
  },
  {
    from: [
      '/api-auth',
      '/api-auth/tutorials',
      '/api/tutorials',
      '/authorization',
      '/flows',
      '/login/flows',
      '/flows/concepts/token-exchange',
      '/authorization/flows',
      '/authorization/authorization-flows',
    ],
    to: '/get-started/authentication-and-authorization-flow',
  },
  {
    from: [
      '/api-auth/which-oauth-flow-to-use',
      '/api-auth/faq',
      '/authorization/authentication-and-authorization-api-faq',
      '/authorization/which-oauth-2-0-flow-should-i-use',
      '/authorization/flows/which-oauth-2-0-flow-should-i-use',
    ],
    to: '/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use',
  },
  {
    from: [
      '/flows/concepts/auth-code',
      '/flows/concepts/regular-web-app-login-flow',
      '/api-auth/grant/authorization-code',
      '/api-auth/tutorials/adoption/authorization-code',
      '/api-auth/adoption/authorization-code',
      '/flows/authorization-code-flow',
      '/authorization/flows/authorization-code-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow',
  },
  {
    from: [
      '/flows/guides/auth-code/call-api-auth-code',
      '/flows/guides/auth-code/includes/authorize-user-call-api',
      '/flows/guides/auth-code/includes/sample-use-cases-call-api',
      '/flows/guides/auth-code/includes/call-api',
      '/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow',
      '/api-auth/tutorials/authorization-code-grant',
      '/flows/call-your-api-using-the-authorization-code-flow',
      '/authorization/flows/call-your-api-using-the-authorization-code-flow',
      '/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow/call-your-api-using-the-authorization-code-flow',
  },
  {
    from: [
      '/flows/concepts/auth-code-pkce',
      '/api-auth/grant/authorization-code-pkce',
      '/flows/concepts/mobile-login-flow',
      '/flows/concepts/single-page-login-flow',
      '/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce',
      '/authorization/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce',
      '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce',
  },
  {
    from: [
      '/flows/guides/auth-code-pkce/call-api-auth-code-pkce',
      '/flows/guides/auth-code-pkce/includes/sample-use-cases-call-api',
      '/flows/guides/auth-code-pkce/includes/call-api',
      '/flows/guides/auth-code-pkce/includes/authorize-user-call-api',
      '/flows/guides/mobile-login-flow/call-api-using-mobile-login-flow',
      '/api-auth/tutorials/authorization-code-grant-pkce',
      '/flows/call-your-api-using-the-authorization-code-flow-with-pkce',
      '/authorization/flows/call-your-api-using-the-authorization-code-flow-with-pkce',
      '/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce/call-your-api-using-the-authorization-code-flow-with-pkce',
  },
  {
    from: [
      '/flows/guides/implicit/call-api-implicit',
      '/flows/guides/implicit/includes/sample-use-cases-call-api',
      '/flows/guides/implicit/includes/call-api',
      '/flows/guides/implicit/includes/authorize-user-call-api',
      '/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow',
      '/api-auth/grant/implicit',
      '/api-auth/tutorials/adoption/implicit',
      '/api-auth/tutorials/implicit-grant',
      '/protocols/oauth2/oauth-implicit-protocol',
      '/flows/concepts/implicit',
      '/flows/implicit-flow-with-form-post',
      '/authorization/flows/implicit-flow-with-form-post',
    ],
    to: '/get-started/authentication-and-authorization-flow/implicit-flow-with-form-post',
  },
  {
    from: [
      '/api-auth/tutorials/nonce',
      '/authorization/mitigate-replay-attacks-when-using-the-implicit-flow',
      '/authorization/flows/mitigate-replay-attacks-when-using-the-implicit-flow',
      '/get-started/authentication-and-authorization-flow/mitigate-replay-attacks-when-using-the-implicit-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/implicit-flow-with-form-post/mitigate-replay-attacks-when-using-the-implicit-flow',
  },
  {
    from: ['/flows/hybrid-flow', '/api-auth/grant/hybrid', '/authorization/flows/hybrid-flow'],
    to: '/get-started/authentication-and-authorization-flow/hybrid-flow',
  },
  {
    from: [
      '/api-auth/tutorials/hybrid-flow',
      '/flows/call-api-hybrid-flow',
      '/authorization/flows/call-api-hybrid-flow',
      '/get-started/authentication-and-authorization-flow/call-api-hybrid-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/hybrid-flow/call-api-hybrid-flow',
  },
  {
    from: [
      '/flows/concepts/client-credentials',
      '/flows/concepts/m2m-flow',
      '/api-auth/grant/client-credentials',
      '/api-auth/tutorials/adoption/client-credentials',
      '/flows/client-credentials-flow',
      '/authorization/flows/client-credentials-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/client-credentials-flow',
  },
  {
    from: [
      '/flows/guides/client-credentials/call-api-client-credentials',
      '/flows/guides/client-credentials/includes/sample-use-cases',
      '/flows/guides/client-credentials/includes/call-api',
      '/flows/guides/client-credentials/includes/request-token',
      '/flows/guides/m2m-flow/call-api-using-m2m-flow',
      '/api-auth/tutorials/client-credentials',
      '/api-auth/config/asking-for-access-tokens',
      '/flows/call-your-api-using-the-client-credentials-flow',
      '/authorization/flows/call-your-api-using-the-client-credentials-flow',
      '/get-started/authentication-and-authorization-flow/call-your-api-using-the-client-credentials-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/client-credentials-flow/call-your-api-using-the-client-credentials-flow',
  },
  {
    from: [
      '/api-auth/tutorials/client-credentials/customize-with-hooks',
      '/api-auth/grant/using-rules',
      '/authorization/customize-tokens-using-hooks-with-client-credentials-flow',
      '/authorization/flows/customize-tokens-using-hooks-with-client-credentials-flow',
      '/get-started/authentication-and-authorization-flow/customize-tokens-using-hooks-with-client-credentials-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/client-credentials-flow/customize-tokens-using-hooks-with-client-credentials-flow',
  },
  {
    from: [
      '/flows/concepts/device-auth',
      '/flows/device-authorization-flow',
      '/authorization/flows/device-authorization-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/device-authorization-flow',
  },
  {
    from: [
      '/flows/guides/device-auth/call-api-device-auth',
      '/authorization/flows/call-your-api-using-the-device-authorization-flow',
      '/microsites/protect-api/protect-api',
      '/get-started/authentication-and-authorization-flow/call-your-api-using-the-device-authorization-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/device-authorization-flow/call-your-api-using-the-device-authorization-flow',
  },
  {
    from: [
      '/api-auth/grant/password',
      '/api-auth/tutorials/adoption/password',
      '/flows/resource-owner-password-flow',
      '/authorization/flows/resource-owner-password-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/resource-owner-password-flow',
  },
  {
    from: [
      '/flows/call-your-api-using-resource-owner-password-flow',
      '/api-auth/tutorials/password-grant',
      '/authorization/flows/call-your-api-using-resource-owner-password-flow',
      '/get-started/authentication-and-authorization-flow/call-your-api-using-resource-owner-password-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/resource-owner-password-flow/call-your-api-using-resource-owner-password-flow',
  },
  {
    from: [
      '/api-auth/tutorials/using-resource-owner-password-from-server-side',
      '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-anomaly-detection',
      '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
      '/authorization/flows/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
      '/get-started/authentication-and-authorization-flow/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
    ],
    to: '/get-started/authentication-and-authorization-flow/resource-owner-password-flow/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
  },
  {
    from: ['/authorization/concepts/rbac', '/authorization/rbac', '/rbac'],
    to: '/manage-users/access-control/rbac',
  },
  {
    from: [
      '/authorization/authorization-core-vs-authorization-extension',
      '/authorization/concepts/core-vs-extension',
      '/authorization/rbac/authorization-core-vs-authorization-extension',
    ],
    to: '/manage-users/access-control/authorization-core-vs-authorization-extension',
  },
  {
    from: [
      '/authorization/sample-use-cases-role-based-access-control',
      '/authorization/concepts/sample-use-cases-rbac',
      '/authorization/rbac/sample-use-cases-role-based-access-control',
    ],
    to: '/manage-users/access-control/sample-use-cases-role-based-access-control',
  },
  {
    from: [
      '/authorization/how-to-use-auth0s-core-authorization-feature-set',
      '/authorization/guides/how-to',
      '/authorization/auth-core-features',
      '/authorization/rbac/auth-core-features',
    ],
    to: '/manage-users/access-control/configure-core-rbac',
  },
  {
    from: ['/authorization/guides/manage-roles', '/authorization/rbac/roles', '/rbac/roles'],
    to: '/manage-users/access-control/configure-core-rbac/roles',
  },
  {
    from: [
      '/dashboard/guides/roles/create-roles',
      '/api/management/guides/roles/create-roles',
      '/authorization/rbac/roles/create-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/create-roles',
  },
  {
    from: [
      '/dashboard/guides/roles/edit-role-definitions',
      '/api/management/guides/roles/edit-role-definitions',
      '/authorization/guides/api/edit-role-definitions',
      '/authorization/rbac/roles/edit-role-definitions',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/edit-role-definitions',
  },
  {
    from: [
      '/dashboard/guides/roles/add-permissions-roles',
      '/api/management/guides/roles/add-permissions-roles',
      '/authorization/rbac/roles/add-permissions-to-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/add-permissions-to-roles',
  },
  {
    from: [
      '/dashboard/guides/roles/view-role-permissions',
      '/api/management/guides/roles/view-role-permissions',
      '/authorization/rbac/roles/view-role-permissions',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/view-role-permissions',
  },
  {
    from: [
      '/dashboard/guides/roles/remove-role-permissions',
      '/api/management/guides/roles/remove-role-permissions',
      '/authorization/rbac/roles/remove-permissions-from-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/remove-permissions-from-roles',
  },
  {
    from: [
      '/api/management/guides/roles/view-role-users',
      '/dashboard/guides/roles/view-role-users',
      '/authorization/rbac/roles/view-users-assigned-to-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/view-users-assigned-to-roles',
  },
  {
    from: [
      '/dashboard/guides/roles/delete-roles',
      '/api/management/guides/roles/delete-roles',
      '/authorization/rbac/roles/delete-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/roles/delete-roles',
  },
  {
    from: [
      '/authorization/auth-core-features/rbac-users',
      '/authorization/guides/manage-users',
      '/authorization/rbac/rbac-users',
      '/rbac/rbac-users',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users',
  },
  {
    from: [
      '/users/assign-roles-to-users',
      '/dashboard/guides/users/assign-roles-users',
      '/api/management/guides/users/assign-roles-users',
      '/authorization/rbac/rbac-users/assign-roles-to-users',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/assign-roles-to-users',
  },
  {
    from: [
      '/dashboard/guides/users/view-user-roles',
      '/api/management/guides/users/view-user-roles',
      '/users/view-user-roles',
      '/authorization/rbac/rbac-users/view-user-roles',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/view-user-roles',
  },
  {
    from: [
      '/dashboard/guides/users/remove-user-roles',
      '/dashboard/guides/roles/remove-role-users',
      '/api/management/guides/users/remove-user-roles',
      '/users/remove-roles-from-users',
      '/authorization/rbac/rbac-users/remove-roles-from-users',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/remove-roles-from-users',
  },
  {
    from: [
      '/dashboard/guides/users/assign-permissions-users',
      '/api/management/guides/users/assign-permissions-users',
      '/users/assign-permissions-to-users',
      '/authorization/rbac/rbac-users/assign-permissions-to-users',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/assign-permissions-to-users',
  },
  {
    from: [
      '/dashboard/guides/users/view-user-permissions',
      '/api/management/guides/users/view-user-permissions',
      '/users/view-user-permissions',
      '/authorization/rbac/rbac-users/view-user-permissions',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/view-user-permissions',
  },
  {
    from: [
      '/dashboard/guides/users/remove-user-permissions',
      '/api/management/guides/users/remove-user-permissions',
      '/users/remove-permissions-from-users',
      '/authorization/rbac/rbac-users/remove-permissions-from-users',
    ],
    to: '/manage-users/access-control/configure-core-rbac/rbac-users/remove-permissions-from-users',
  },
  {
    from: [
      '/authorization/manage-permissions',
      '/authorization/guides/manage-permissions',
      '/authorization/rbac/manage-permissions',
    ],
    to: '/manage-users/access-control/configure-core-rbac/manage-permissions',
  },

  /* Protocols */

  {
    from: ['/protocols', '/authorization/protocols'],
    to: '/authenticate/protocols',
  },
  {
    from: ['/protocols/protocol-oauth2', '/protocols/oauth2', '/authorization/protocols/protocol-oauth2'],
    to: '/authenticate/protocols/oauth',
  },
  {
    from: [
      '/protocols/openid-connect-protocol',
      '/protocols/oidc',
      '/api-auth/intro',
      '/api-auth/tutorials/adoption',
      '/authorization/protocols/openid-connect-protocol',
    ],
    to: '/authenticate/protocols/openid-connect-protocol',
  },
  {
    from: [
      '/protocols/ws-fed',
      '/tutorials/wsfed-web-app',
      '/wsfedwebapp-tutorial',
      '/protocols/ws-fed-protocol',
      '/authorization/protocols/ws-fed-protocol',
    ],
    to: '/authenticate/protocols/ws-fed-protocol',
  },

  /* Best Practices */

  {
    from: [
      '/best-practices/custom-db-connections',
      '/best-practices/custom-db-connections-scripts',
      '/best-practices/custom-database-connection-and-action-script-best-practices',
      '/best-practices/custom-database-connections-scripts',
    ],
    to: '/authenticate/database-connections/custom-db/custom-database-connections-scripts',
  },
  {
    from: [
      '/best-practices/custom-db-connections/anatomy',
      '/best-practices/custom-db-connections/size',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-anatomy-best-practices',
      '/best-practices/custom-database-connections-scripts/anatomy',
    ],
    to: '/authenticate/database-connections/custom-db/custom-database-connections-scripts/anatomy',
  },
  {
    from: [
      '/best-practices/custom-db-connections/environment',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-action-script-environment-best-practices',
      '/best-practices/custom-database-connections-scripts/environment',
    ],
    to: '/authenticate/database-connections/custom-db/custom-database-connections-scripts/environment',
  },
  {
    from: [
      '/best-practices/custom-db-connections/execution',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-database-action-script-execution-best-practices',
      '/best-practices/custom-database-connections-scripts/execution',
    ],
    to: '/authenticate/database-connections/custom-db/custom-database-connections-scripts/execution',
  },
  {
    from: [
      '/best-practices/custom-db-connections/security',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-security-best-practices',
      '/best-practices/custom-database-connections-scripts/connection-security',
    ],
    to: '/authenticate/database-connections/custom-db/custom-database-connections-scripts/connection-security',
  },
  {
    from: ['/best-practices/connection-settings', '/best-practices/connection-settings-best-practices'],
    to: '/authenticate/connection-settings-best-practices',
  },
  {
    from: ['/best-practices/debugging', '/best-practices/debugging-best-practices'],
    to: '/troubleshoot/debugging-best-practices',
  },
  {
    from: ['/best-practices/deployment', '/best-practices/deployment-best-practices'],
    to: '/deploy-monitor/deployment-best-practices',
  },
  {
    from: ['/best-practices/error-handling', '/best-practices/error-handling-best-practices'],
    to: '/troubleshoot/error-handling-best-practices',
  },
  {
    from: ['/best-practices/operations', '/best-practices/general-usage-and-operations-best-practices'],
    to: '/troubleshoot/general-usage-and-operations-best-practices',
  },
  {
    from: ['/best-practices/performance', '/best-practices/performance-best-practices'],
    to: '/troubleshoot/performance-best-practices',
  },
  {
    from: ['/best-practices/rules', '/best-practices/rules-best-practices', '/customize/rules/rules-best-practices'],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/best-practices/search-best-practices',
      '/users/search/best-practices',
      '/best-practices/user-search-best-practices',
    ],
    to: '/manage-users/user-search/user-search-best-practices',
  },
  {
    from: [
      '/best-practices/rules-best-practices/rules-anatomy-best-practices',
      '/customize/rules/rules-best-practices/rules-anatomy-best-practices',
    ],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/best-practices/rules-best-practices/rules-environment-best-practices',
      '/customize/rules/rules-best-practices/rules-environment-best-practices',
    ],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/best-practices/rules-best-practices/rules-execution-best-practices',
      '/customize/rules/rules-best-practices/rules-execution-best-practices',
    ],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/best-practices/rules-best-practices/rules-security-best-practices',
      '/customize/rules/rules-best-practices/rules-security-best-practices',
    ],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/best-practices/testing',
      '/best-practices/rules-best-practices/rules-testing-best-practices',
      '/customize/rules/rules-best-practices/rules-testing-best-practices',
    ],
    to: '/customize/actions/action-coding-guidelines',
  },
  {
    from: [
      '/tokens/concepts/token-best-practices',
      '/design/web-apps-vs-web-apis-cookies-vs-tokens',
      '/best-practices/token-best-practices',
    ],
    to: '/secure/tokens/token-best-practices',
  },
  {
    from: [
      '/design/using-auth0-with-multi-tenant-apps',
      '/applications/concepts/multiple-tenants',
      '/tutorials/using-auth0-with-multi-tenant-apps',
      '/saas-apps',
      '/best-practices/multi-tenant-apps-best-practices',
    ],
    to: '/get-started/auth0-overview/create-tenants/multi-tenant-apps-best-practices',
  },

  /* Brand and Customize */

  {
    from: ['/branding-customization', '/brand-and-customize'],
    to: '/customize',
  },
  {
    from: [
      '/sign-up-prompt-customizations',
      '/customize/universal-login-pages/customize-signup-and-login-prompts',
    ],
    to: '/customize/login-pages/universal-login/customize-signup-and-login-prompts',
},
{
  from: [
    '/universal-login/new-experience/universal-login-page-templates',
    '/universal-login/page-templates',
    '/universal-login/universal-login-page-customization',
    '/customize/universal-login-page-templates',
    '/brand-and-customize/universal-login-page-templates',
    '/customize/universal-login-pages',
  ],
  to: '/customize/login-pages',
},
{
  from: [
    '/universal-login/classic-experience/customization-classic',
    '/universal-login/customization-classic',
    '/universal-login/advanced-customization',
    '/brand-and-customize/customization-classic',
    '/customize/universal-login-pages/customization-classic',
  ],
  to: '/customize/login-pages/classic-login/customization-classic',
},
  {
    from: [
      '/universal-login/version-control-universal-login-pages',
      '/universal-login/version-control',
      '/hosted-pages/version-control',
      '/brand-and-customize/version-control-universal-login-pages',
      '/customize/universal-login-pages/version-control-universal-login-pages',
      '/customize/universal-login-pages/version-control',
    ],
    to: '/customize/login-pages/classic-login/version-control',
  },

  /* Custom Domains */

  {
    from: ['/custom-domains', '/brand-and-customize/custom-domains'],
    to: '/customize/custom-domains',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-auth0-managed-certificates',
      '/custom-domains/auth0-managed-certificates',
      '/brand-and-customize/custom-domains/auth0-managed-certificates',
    ],
    to: '/customize/custom-domains/auth0-managed-certificates',
  },
  {
    from: [
      '/custom-domains/self-managed-certificates',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates',
      '/brand-and-customize/custom-domains/self-managed-certificates',
    ],
    to: '/customize/custom-domains/self-managed-certificates',
  },
  {
    from: ['/custom-domains/tls-ssl', '/brand-and-customize/custom-domains/self-managed-certificates/tls-ssl'],
    to: '/customize/custom-domains/self-managed-certificates/tls-ssl',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-gcp-as-reverse-proxy',
      '/brand-and-customize/custom-domains/self-managed-certificates/configure-gcp-as-reverse-proxy',
    ],
    to: '/customize/custom-domains/self-managed-certificates/configure-gcp-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/set-up-cloudfront',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy',
      '/brand-and-customize/custom-domains/self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy',
    ],
    to: '/customize/custom-domains/self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/set-up-cloudflare',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy',
      '/brand-and-customize/custom-domains/self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy',
    ],
    to: '/customize/custom-domains/self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy',
      '/custom-domains/set-up-azure-cdn',
      '/brand-and-customize/custom-domains/self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy',
    ],
    to: '/customize/custom-domains/self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-akamai-for-use-as-reverse-proxy',
      '/brand-and-customize/custom-domains/self-managed-certificates/configure-akamai-for-use-as-reverse-proxy',
    ],
    to: '/customize/custom-domains/self-managed-certificates/configure-akamai-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/configure-features-to-use-custom-domains',
      '/custom-domains/additional-configuration',
      '/brand-and-customize/custom-domains/configure-features-to-use-custom-domains',
    ],
    to: '/customize/custom-domains/configure-features-to-use-custom-domains',
  },

  /* Email */

  {
    from: ['/email', '/auth0-email-services', '/brand-and-customize/email'],
    to: '/customize/email',
  },
  {
    from: [
      '/email/custom',
      '/auth0-email-services/manage-email-flow',
      '/email/manage-email-flow',
      '/brand-and-customize/email/manage-email-flow',
    ],
    to: '/customize/email/manage-email-flow',
  },
  {
    from: [
      '/email/templates',
      '/auth0-email-services/customize-email-templates',
      '/email/spa-redirect',
      '/auth0-email-services/spa-redirect',
      '/email/customize-email-templates',
      '/brand-and-customize/email/customize-email-templates',
    ],
    to: '/customize/email/email-templates',
  },
  {
    from: [
      '/email/customize-email-templates/email-template-descriptions',
      '/auth0-email-services/email-template-descriptions',
      '/brand-and-customize/email/email-template-descriptions',
    ],
    to: '/customize/email/email-templates/email-template-descriptions',
  },
  {
    from: [
      '/anomaly-detection/guides/customize-blocked-account-emails',
      '/anomaly-detection/customize-blocked-account-emails',
      '/attack-protection/customize-blocked-account-emails',
      '/brand-and-customize/email/customize-blocked-account-emails',
    ],
    to: '/customize/email/customize-blocked-account-emails',
  },
  {
    from: [
      '/email/liquid-syntax',
      '/auth0-email-services/customize-email-templates/use-liquid-syntax-in-email-templates',
      '/email/customize-email-templates/use-liquid-syntax-in-email-templates',
      '/brand-and-customize/email/use-liquid-syntax-in-email-templates',
    ],
    to: '/customize/email/email-templates/use-liquid-syntax-in-email-templates',
  },
  {
    from: [
      '/design/creating-invite-only-applications',
      '/invite-only',
      '/tutorials/creating-invite-only-applications',
      '/auth0-email-services/send-email-invitations-for-application-signup',
      '/email/send-email-invitations-for-application-signup',
      '/brand-and-customize/email/send-email-invitations-for-application-signup',
    ],
    to: '/customize/email/send-email-invitations-for-application-signup',
  },

  /* SAML */

  {
    from: [
      '/auth0-email-services/configure-external-smtp-email-providers',
      '/email/providers',
      '/email/configure-external-smtp-email-providers',
      '/brand-and-customize/email/smtp-email-providers',
    ],
    to: '/customize/email/smtp-email-providers',
  },
  {
    from: [
      '/email/configure-external-smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider',
  },
  {
    from: [
      '/email/configure-external-smtp-email-providers/configure-mandrill-as-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-mandrill-as-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-mandrill-as-external-smtp-email-provider',
  },
  {
    from: [
      '/email/configure-external-smtp-email-providers/configure-sendgrid-as-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-sendgrid-as-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-sendgrid-as-external-smtp-email-provider',
  },
  {
    from: [
      '/email/configure-external-smtp-email-providers/configure-sparkpost-as-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-sparkpost-as-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-sparkpost-as-external-smtp-email-provider',
  },
  {
    from: [
      '/email/configure-external-smtp-email-providers/configure-mailgun-as-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-mailgun-as-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-mailgun-as-external-smtp-email-provider',
  },
  {
    from: [
      '/auth0-email-services/configure-external-smtp-email-providers/configure-custom-external-smtp-email-provider',
      '/email/configure-custom-external-smtp-email-provider',
      '/brand-and-customize/email/smtp-email-providers/configure-custom-external-smtp-email-provider',
    ],
    to: '/customize/email/smtp-email-providers/configure-custom-external-smtp-email-provider',
  },
  {
    from: [
      '/email/testing',
      '/auth0-email-services/configure-external-smtp-email-providers/configure-test-smtp-email-servers',
      '/email/configure-test-smtp-email-servers',
      '/brand-and-customize/email/configure-test-smtp-email-servers',
    ],
    to: '/customize/email/configure-test-smtp-email-servers',
  },
  {
    from: [
      '/universal-login/new-experience/text-customization-new-universal-login',
      '/universal-login/text-customization',
      '/brand-and-customize/text-customization-new-universal-login',
      '/brand-and-customize/customize-login-text-prompts',
      '/customize/universal-login-pages/customize-login-text-prompts',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/login/universal-login/prompt-common',
      '/universal-login/prompt-common',
      '/universal-login/text-customization-prompts/common',
      '/brand-and-customize/text-customization-new-universal-login/prompt-common',
      '/brand-and-customize/customize-login-text-prompts/prompt-common',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-common',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-consent',
      '/universal-login/text-customization-prompts/consent',
      '/login/universal-login/prompt-consent',
      '/brand-and-customize/text-customization-new-universal-login/prompt-consent',
      '/brand-and-customize/customize-login-text-prompts/prompt-consent',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-consent',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-device-flow',
      '/universal-login/text-customization-prompts/device-flow',
      '/login/universal-login/prompt-device-flow',
      '/brand-and-customize/text-customization-new-universal-login/prompt-device-flow',
      '/brand-and-customize/customize-login-text-prompts/prompt-device-flow',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-device-flow',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-email-otp-challenge',
      '/brand-and-customize/text-customization-new-universal-login/prompt-email-otp-challenge',
      '/brand-and-customize/customize-login-text-prompts/prompt-email-otp-challenge',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-email-otp-challenge',
    ],
    to:  '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-email-verification',
      '/universal-login/text-customization-prompts/email-verification',
      '/login/universal-login/prompt-email-verification',
      '/brand-and-customize/text-customization-new-universal-login/prompt-email-verification',
      '/brand-and-customize/customize-login-text-prompts/prompt-email-verification',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-email-verification',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/univeral-login/prompt-accept-invitation',
      '/brand-and-customize/text-customization-new-universal-login/prompt-accept-invitation',
      '/brand-and-customize/customize-login-text-prompts/prompt-accept-invitation',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-accept-invitation',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/login/universal-login/prompt-login',
      '/universal-login/prompt-login',
      '/universal-login/text-customization-prompts/login',
      '/brand-and-customize/text-customization-new-universal-login/prompt-login',
      '/brand-and-customize/customize-login-text-prompts/prompt-login',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-login',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-login-email-verification',
      '/brand-and-customize/text-customization-new-universal-login/prompt-login-email-verification',
      '/brand-and-customize/customize-login-text-prompts/prompt-login-email-verification',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-login-email-verification',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-login-id',
      '/brand-and-customize/text-customization-new-universal-login/prompt-login-id',
      '/brand-and-customize/customize-login-text-prompts/prompt-login-id',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-login-id',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-login-password',
      '/brand-and-customize/text-customization-new-universal-login/prompt-login-password',
      '/brand-and-customize/customize-login-text-prompts/prompt-login-password',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-login-password',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa',
      '/universal-login/text-customization-prompts/mfa',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-email',
      '/universal-login/text-customization-prompts/mfa-email',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-email',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-email',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-email',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-otp',
      '/universal-login/text-customization-prompts/mfa-otp',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-otp',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-otp',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-otp',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-phone',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-phone',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-phone',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-phone',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-push',
      '/universal-login/text-customization-prompts/mfa-push',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-push',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-push',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-push',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-recovery-code',
      '/universal-login/text-customization-prompts/mfa-recovery-code',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-recovery-code',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-recovery-code',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-recovery-code',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-sms',
      '/universal-login/text-customization-prompts/mfa-sms',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-sms',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-sms',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-sms',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-voice',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-voice',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-voice',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-voice',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-mfa-webauthn',
      '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-webauthn',
      '/brand-and-customize/customize-login-text-prompts/prompt-mfa-webauthn',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-mfa-webauthn',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-organization-selection',
      '/brand-and-customize/text-customization-new-universal-login/prompt-organization-selection',
      '/brand-and-customize/customize-login-text-prompts/prompt-organization-selection',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-organization-selection',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-reset-password',
      '/universal-login/text-customization-prompts/reset-password',
      '/brand-and-customize/text-customization-new-universal-login/prompt-reset-password',
      '/brand-and-customize/customize-login-text-prompts/prompt-reset-password',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-reset-password',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-signup',
      '/universal-login/text-customization-prompts/signup',
      '/brand-and-customize/text-customization-new-universal-login/prompt-signup',
      '/brand-and-customize/customize-login-text-prompts/prompt-signup',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-signup',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-signup-id',
      '/brand-and-customize/text-customization-new-universal-login/prompt-signup-id',
      '/brand-and-customize/customize-login-text-prompts/prompt-signup-id',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-signup-id',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/universal-login/prompt-signup-password',
      '/brand-and-customize/text-customization-new-universal-login/prompt-signup-password',
      '/brand-and-customize/customize-login-text-prompts/prompt-signup-password',
      '/customize/universal-login-pages/customize-login-text-prompts/prompt-signup-password',
    ],
    to: '/customize/login-pages/universal-login/customize-text-elements',
  },
  {
    from: [
      '/scopes/customize-consent-prompts',
      '/scopes/current/guides/customize-consent-prompt',
      '/brand-and-customize/customize-consent-prompts',
      '/customize/universal-login-pages/customize-consent-prompts',
    ],
    to: '/customize/login-pages/customize-consent-prompts',
  },
  {
    from: [
      '/universal-login/custom-error-pages',
      '/error-pages/custom',
      '/hosted-pages/custom-error-pages',
      '/brand-and-customize/custom-error-pages',
      '/customize/universal-login-pages/custom-error-pages',
    ],
    to: '/customize/login-pages/custom-error-pages',
  },
  {
    from: [
      '/libraries/lock/customize-lock-error-messages',
      '/libraries/lock/v11/customizing-error-messages',
      '/libraries/lock/customizing-error-messages',
      '/brand-and-customize/customize-lock-error-messages',
      '/customize/customize-lock-error-messages',
    ],
    to: '/customize/login-pages/classic-login/customize-lock-error-messages',
  },
  {
    from: [
      '/universal-login/customize-password-reset-page',
      '/universal-login/password-reset',
      '/hosted-pages/password-reset',
      '/brand-and-customize/customize-password-reset-page',
      '/customize/universal-login-pages/customize-password-reset-page',
    ],
    to: '/customize/login-pages/classic-login/customize-password-reset-page',
  },
  {
    from: [
      '/multifactor-authentication/administrator/sms-templates',
      '/mfa/guides/guardian/customize-sms-messages',
      '/multifactor-authentication/sms-templates',
      '/mfa/guides/customize-phone-messages',
      '/mfa/customize-sms-or-voice-messages',
      '/brand-and-customize/customize-sms-or-voice-messages',
    ],
    to: '/customize/customize-sms-or-voice-messages',
  },
  {
    from: ['/login/adopt-oidc-conformant-authentication'],
    to: '/authenticate/login/oidc-conformant-authentication',
  },
  {
    from: [
      '/customize/universal-login-pages/customize-new-universal-login-with-the-no-code-editor',
    ],
    to: '/customize/login-pages/universal-login/customize-themes',
},

  {
    from: [
      '/customize/universal-login-pages/universal-login-page-templates',
    ],
    to: '/customize/login-pages/universal-login/customize-templates',
},

  {
    from: [
      '/customize/universal-login-pages/universal-login-page-customization',
    ],
    to: '/customize/login-pages/classic-login/customize-with-lock-sdk',
},

  /* Internationalization and Localization */

  {
    from: ['/i18n', '/i18n/i18n-custom-login-page', '/brand-and-customize/i18n'],
    to: '/customize/internationalization-and-localization',
  },
  {
    from: [
      '/i18n/universal-login-internationalization',
      '/universal-login/i18n',
      '/universal-login/universal-login-internationalization',
      '/brand-and-customize/i18n/universal-login-internationalization',
    ],
    to: '/customize/internationalization-and-localization/universal-login-internationalization',
  },
  {
    from: [
      '/libraries/lock/v11/i18n',
      '/libraries/lock/v10/i18n',
      '/libraries/lock/lock-internationalization',
      '/brand-and-customize/i18n/lock-internationalization',
    ],
    to: '/customize/internationalization-and-localization/lock-internationalization',
  },
  {
    from: [
      '/libraries/lock-swift/lock-swift-internationalization',
      '/i18n/i18n-guide-ios',
      '/libraries/lock-ios/v2/internationalization',
      '/libraries/lock-swift/lock-swift-internationalization',
      '/brand-and-customize/i18n/lock-swift-internationalization',
    ],
    to: '/customize/internationalization-and-localization/lock-swift-internationalization',
  },
  {
    from: [
      '/i18n/i18n-guide-android',
      '/libraries/lock-android/v2/internationalization',
      '/libraries/lock-android/v1/internationalization',
      '/libraries/lock-android/lock-android-internationalization',
      '/brand-and-customize/i18n/lock-android-internationalization',
    ],
    to: '/customize/internationalization-and-localization/lock-android-internationalization',
  },
  {
    from: [
      '/i18n/password-options-translation',
      '/i18n/password-options',
      '/i18n/password-strength',
      '/brand-and-customize/i18n/password-options-translation',
    ],
    to: '/customize/internationalization-and-localization/password-options-translation',
  },

  /* CMS */

  {
    from: ['/cms/wordpress', '/cms/wordpress/jwt-authentication', '/cms/wordpress-plugin'],
    to: '/customize/integrations/cms/wordpress-plugin',
  },
  {
    from: ['/cms/wordpress/installation', '/cms/wordpress-plugin/install-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/install-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/configuration', '/cms/wordpress-plugin/configure-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/configure-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/extending', '/cms/wordpress-plugin/extend-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/extend-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/troubleshoot', '/cms/wordpress-plugin/troubleshoot-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/troubleshoot-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/invalid-state', '/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors'],
    to: '/customize/integrations/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors',
  },
  {
    from: ['/cms/wordpress/user-migration', '/cms/wordpress-plugin/user-migration-in-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/user-migration-in-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/user-migration', '/cms/wordpress-plugin/user-migration-in-login-by-auth0'],
    to: '/customize/integrations/cms/wordpress-plugin/user-migration-in-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/how-does-it-work', '/cms/wordpress-plugin/integrate-with-wordpress'],
    to: '/customize/integrations/cms/wordpress-plugin/integrate-with-wordpress',
  },

  /* Compliance */

  {
    from: ['/compliance-and-certifications', '/compliance'],
    to: '/secure/data-privacy-and-compliance',
  },
  {
    from: ['/compliance/gdpr/data-processing', '/compliance/data-processing'],
    to: '/secure/data-privacy-and-compliance/data-processing',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance',
      '/compliance/gdpr/security-advice-for-customers',
      '/compliance/gdpr/roles-responsibilities',
      '/compliance/gdpr/gdpr-summary',
      '/compliance/gdpr/definitions',
      '/compliance/auth0-gdpr-compliance',
      '/compliance/gdpr',
    ],
    to: '/secure/data-privacy-and-compliance/gdpr',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/user-consent', '/compliance/gdpr/gdpr-conditions-for-consent'],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-conditions-for-consent',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/data-minimization', '/compliance/gdpr/gdpr-data-minimization'],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-data-minimization',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/data-portability', '/compliance/gdpr/gdpr-data-portability'],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-data-portability',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance/protect-user-data',
      '/compliance/gdpr/gdpr-protect-and-secure-user-data',
    ],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-protect-and-secure-user-data',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance/right-to-access-data',
      '/compliance/gdpr/gdpr-right-to-access-correct-and-erase-data',
    ],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-right-to-access-correct-and-erase-data',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-custom-ui',
      '/compliance/gdpr/gdpr-track-consent-with-custom-ui',
    ],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-track-consent-with-custom-ui',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock',
      '/compliance/gdpr/gdpr-track-consent-with-lock',
    ],
    to: '/secure/data-privacy-and-compliance/gdpr/gdpr-track-consent-with-lock',
  },

  /* Deploy */

  {
    from: [
      '/get-started/deployment-options',
      '/getting-started/deployment-models',
      '/overview/deployment-models',
      '/deployment',
      '/deploy',
    ],
    to: '/deploy-monitor',
  },
  {
    from: [
      '/private-cloud/private-cloud-deployments/private-cloud-addon-options',
      '/private-saas-deployment/add-ons',
      '/private-cloud/add-ons',
      '/appliance/infrastructure/internet-restricted-deployment',
      '/private-saas-deployment',
      '/private-cloud/managed-private-cloud',
      '/private-cloud',
      '/appliance',
      '/appliance/checksum',
      '/appliance/proxy-updater',
      '/appliance/update',
      '/updating-appliance',
      '/enterprise/private-cloud/overview',
      '/appliance/dashboard/instrumentation',
      '/appliance/instrumentation',
      '/appliance/appliance-overview',
      '/deploy/private-cloud',
    ],
    to: '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws',
  },
  {
    from: [
      '/services/private-cloud-configuration',
      '/services/private-saas-configuration',
      '/private-saas-deployment/onboarding',
      '/private-saas-deployment/onboarding/private-cloud',
      '/private-cloud/onboarding',
      '/private-cloud/onboarding/private-cloud',
      '/enterprise-support',
      '/onboarding/appliance-outage',
      '/onboarding/enterprise-support',
      '/private-cloud/managed-private-cloud/zones',
      '/private-cloud/managed-private-cloud/raci',
      '/private-cloud/private-cloud-onboarding',
      '/deploy/private-cloud/private-cloud-onboarding',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-onboarding',
      '/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list',
      '/private-saas-deployment/onboarding/managed-private-cloud/ip-domain-port-list',
      '/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list',
      '/appliance/infrastructure/ip-domain-port-list',
      '/deploy/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-onboarding/private-cloud-ip-domain-and-port-list',
      '/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements',
      '/private-saas-deployment/private-cloud',
      '/private-cloud/standard-private-cloud',
      '/private-saas-deployment/onboarding/managed-private-cloud/infrastructure',
      '/private-cloud/onboarding/managed-private-cloud/infrastructure',
      '/private-saas-deployment/managed-private-cloud',
      '/private-cloud/onboarding/managed-private-cloud',
      '/private-saas-deployment/onboarding/managed-private-cloud',
      '/private-cloud/onboarding/managed-private-cloud',
      '/appliance/infrastructure',
      '/appliance/infrastructure/security',
      '/deploy/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements',
      '/private-cloud/private-cloud-operations',
      '/services/private-saas-management',
      '/services/private-cloud-management',
      '/deploy/private-cloud/private-cloud-operations',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-operations',
      '/private-cloud/private-cloud-migrations',
      '/deploy/private-cloud/private-cloud-migrations',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-migrations',
      '/private-cloud/private-cloud-migrations/migrate-from-public-cloud-to-private-cloud',
      '/deploy/private-cloud/private-cloud-migrations/migrate-from-public-cloud-to-private-cloud',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-migrations/migrate-from-public-cloud-to-private-cloud',
      '/private-cloud/private-cloud-migrations/migrate-from-standard-private-cloud-to-managed-private-cloud',
      '/deploy/private-cloud/private-cloud-migrations/migrate-from-standard-private-cloud-to-managed-private-cloud',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-migrations/migrate-from-standard-private-cloud-to-managed-private-cloud',
      '/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains',
      '/appliance/custom-domains',
      '/private-saas-deployment/custom-domain-migration',
      '/private-cloud/custom-domain-migration',
      '/private-cloud/migrate-private-cloud-custom-domains',
      '/deploy/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains',
      '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws/private-cloud-migrations/migrate-private-cloud-custom-domains',
    ],
    to: '/deploy-monitor/deploy-private-cloud/private-cloud-on-aws',
  },
  {
    from: [
      '/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements',
      '/deploy/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements',
      '/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
      '/private-cloud/onboarding/managed-private-cloud/remote-access-options',
      '/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
      '/deploy/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
    ],
    to: '/deploy-monitor/deploy-private-cloud',
  },
  {
    from: ['/pre-deployment', '/deploy/pre-deployment'],
    to: '/deploy-monitor/pre-deployment-checks',
  },
  {
    from: [
      '/pre-deployment/how-to-run-production-checks',
      '/pre-deployment/how-to-run-test',
      '/deploy/pre-deployment/how-to-run-production-checks',
    ],
    to: '/deploy-monitor/pre-deployment-checks/how-to-run-production-checks',
  },
  {
    from: [
      '/deploy/pre-deployment/how-to-run-production-checks/production-check-required-fixes',
      '/pre-deployment/how-to-run-production-checks/production-check-required-fixes',
      '/pre-deployment/tests/required',
      '/deploy/pre-deployment/production-check-required-fixes',
    ],
    to: '/deploy-monitor/pre-deployment-checks/production-check-required-fixes',
  },
  {
    from: [
      '/pre-deployment/how-to-run-production-checks/production-check-recommended-fixes',
      '/pre-deployment/tests/recommended',
      '/deploy/pre-deployment/how-to-run-production-checks/production-check-recommended-fixes',
      '/deploy/pre-deployment/production-check-recommended-fixes',
    ],
    to: '/deploy-monitor/pre-deployment-checks/production-check-recommended-fixes',
  },
  {
    from: [
      '/pre-deployment/how-to-run-production-checks/production-checks-best-practices',
      '/pre-deployment/tests/best-practice',
      '/deploy/pre-deployment/how-to-run-production-checks/production-checks-best-practices',
      '/deploy/pre-deployment/production-checks-best-practices',
    ],
    to: '/deploy-monitor/pre-deployment-checks/production-checks-best-practices',
  },
  {
    from: ['/support/predeployment-tests', '/support/testing', '/deploy/pre-deployment/predeployment-tests'],
    to: '/deploy-monitor/pre-deployment-checks/predeployment-tests',
  },
  {
    from: [
      '/pre-deployment/pre-launch-tips',
      '/pre-deployment/prelaunch-tips',
      '/deploy/pre-deployment/pre-launch-tips',
    ],
    to: '/deploy-monitor/pre-deployment-checks/pre-launch-tips',
  },
  {
    from: [
      '/extensions/using-provided-extensions',
      '/topics/extensibility',
      '/extend-integrate',
      '/extensions/visual-studio-team-services-deploy',
      '/extensions/visual-studio-team-services-deployments',
      '/extensions',
    ],
    to: '/customize/extensions',
  },
  {
    from: [
      '/extensions/authorization-extension/v2',
      '/extensions/authorization-extension/v1',
      '/api/authorization-dashboard-extension',
      '/extensions/authorization-dashboard-extension',
      '/extensions/authorization-extension',
    ],
    to: '/customize/extensions/authorization-extension',
  },
  {
    from: ['/extensions/authorization-extension/install-authorization-extension'],
    to: '/customize/extensions/authorization-extension/install-authorization-extension',
  },
  {
    from: ['/extensions/authorization-extension/configure-authorization-extension'],
    to: '/customize/extensions/authorization-extension/configure-authorization-extension',
  },
  {
    from: ['/extensions/authorization-extension/enable-api-access-to-authorization-extension'],
    to: '/customize/extensions/authorization-extension/enable-api-access-to-authorization-extension',
  },
  {
    from: ['/extensions/authorization-extension/import-and-export-authorization-extension-data'],
    to: '/customize/extensions/authorization-extension/import-and-export-authorization-extension-data',
  },
  {
    from: ['/extensions/authorization-extension/use-rules-with-the-authorization-extension'],
    to: '/customize/extensions/authorization-extension/use-rules-with-the-authorization-extension',
  },
  {
    from: [
      '/extensions/authorization-extension/v2/implementation/setup',
      '/extensions/authorization-extension/set-up-authorization-extension-users',
    ],
    to: '/customize/extensions/authorization-extension/set-up-authorization-extension-users',
  },
  {
    from: [
      '/get-started/dashboard/create-sso-dashboard-application',
      '/dashboard/guides/extensions/sso-dashboard-create-app',
      '/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-install-extension',
      '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-add-apps',
      '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-update-apps',
      '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
  },
  {
    from: ['/deploy/private-cloud-on-azure'],
    to: '/deploy-monitor/deploy-private-cloud/private-cloud-on-azure',
  },

  /* Deploy CLI Tool */

  {
    from: ['/deploy-monitor/deploy-cli-tool/install-and-configure-the-deploy-cli-tool'],
    to: '/deploy-monitor/deploy-cli-tool',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/create-and-configure-the-deploy-cli-application'],
    to: '/deploy-monitor/deploy-cli-tool',
  },
  {
    from: ['/deploy-monitor/auth0-deploy-cli/configuring-the-deploy-cli',
          '/deploy-monitor/deploy-cli-tool/configuring-the-deploy-cli',
          ],
    to: '/deploy-monitor/deploy-cli-tool/configure-the-deploy-cli',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/call-deploy-cli-tool-programmatically',
          '/deploy-monitor/deploy-cli-tool/using-as-a-node-module',],
    to: '/deploy-monitor/deploy-cli-tool/use-as-a-node-module',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
          '/deploy-monitor/deploy-cli-tool/incorporating-into-multi-environment-workflows',
          ],
    to: '/deploy-monitor/deploy-cli-tool/incorporate-into-multi-environment-workflows',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file'],
    to: '/deploy-monitor/deploy-cli-tool/keyword-replacement',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure'],
    to: '/deploy-monitor/deploy-cli-tool/keyword-replacement',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/environment-variables-and-keyword-mappings'],
    to: '/deploy-monitor/deploy-cli-tool/keyword-replacement',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/deploy-cli-tool-options',
          '/deploy-monitor/deploy-cli-tool/using-as-a-cli',
          ],
    to: '/deploy-monitor/deploy-cli-tool/use-as-a-cli',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/auth0-terraform-provider'],
    to: '/deploy-monitor/auth0-terraform-provider',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/how-to-contribute'],
    to: '/deploy-monitor/deploy-cli-tool',
  },
  {
    from: ['/deploy-monitor/deploy-cli-tool/excluding-resources-from-management'],
    to: '/deploy-monitor/deploy-cli-tool/exclude-resources-from-management',
  },

  /* Extensions */

  {
    from: [
      '/connector',
      '/connector/overview',
      '/connector/considerations-non-ad',
      '/ad-ldap-connector',
      '/extensions/ad-ldap-connector',
      '/customize/extensions/ad-ldap-connector',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector',
  },
  {
    from: [
      '/extensions/ad-ldap-connector-health-monitor',
      '/extensions/ad-ldap-connector/ad-ldap-connector-health-monitor',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-health-monitor',
    ],
    to: '/customize/extensions/ad-ldap-connector-health-monitor',
  },
  {
    from: [
      '/extensions/delegated-admin/v3',
      '/extensions/delegated-admin/v2',
      '/extensions/delegated-admin',
      '/extensions/delegated-administration-extension',
    ],
    to: '/customize/extensions/delegated-administration-extension',
  },
  {
    from: ['/extensions/delegated-administration-extension/delegated-administration-manage-users'],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-manage-users',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks',
      '/extensions/delegated-admin/v2/hooks',
      '/extensions/delegated-admin/hooks',
      '/extensions/delegated-administration-extension/delegated-administration-hooks',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/access',
      '/extensions/delegated-admin/v2/hooks/access',
      '/extensions/delegated-admin/hooks/access',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-access-hook',
      '/extensions/delegated-administration-extension/delegated-administration-access-hook',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-access-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/filter',
      '/extensions/delegated-admin/v2/hooks/filter',
      '/extensions/delegated-admin/hooks/filter',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-filter-hook',
      '/extensions/delegated-administration-extension/delegated-administration-filter-hook',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-filter-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/membership',
      '/extensions/delegated-admin/v2/hooks/membership',
      '/extensions/delegated-admin/hooks/membership',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-memberships-query-hook',
      '/extensions/delegated-administration-extension/delegated-administration-memberships-query-hook',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-memberships-query-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/settings',
      '/extensions/delegated-admin/v2/hooks/settings',
      '/extensions/delegated-admin/hooks/settings',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-settings-query-hook',
      '/extensions/delegated-administration-extension/delegated-administration-settings-query-hook',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-settings-query-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/write',
      '/extensions/delegated-admin/v2/hooks/write',
      '/extensions/delegated-admin/hooks/write',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-write-hook',
      '/extensions/delegated-administration-extension/delegated-administration-write-hook',
    ],
    to: '/customize/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-write-hook',
  },
  {
    from: ['/extensions/sso-dashboard', '/extensions/single-sign-on-dashboard-extension'],
    to: '/customize/extensions/single-sign-on-dashboard-extension',
  },
  {
    from: [
      '/get-started/dashboard/create-sso-dashboard-application',
      '/dashboard/guides/extensions/sso-dashboard-create-app',
      '/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-install-extension',
      '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-add-apps',
      '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
  },
  {
    from: [
      '/dashboard/guides/extensions/sso-dashboard-update-apps',
      '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
    ],
    to: '/customize/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
  },

  /* LDAP Connector */

  {
    from: ['/protocols/ldap-protocol', '/protocols/ldap'],
    to: '/authenticate/protocols/ldap-protocol',
  },
  {
    from: [
      '/connector/prerequisites',
      '/ad-ldap-connector/ad-ldap-connector-requirements',
      '/extensions/ad-ldap-connector/ad-ldap-connector-requirements',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-requirements',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-connector-requirements',
  },
  {
    from: [
      '/adldap-x',
      '/connector/install-other-platforms',
      '/connector/install',
      '/adldap-auth',
      '/extensions/ad-ldap-connector/install-configure-ad-ldap-connector',
      '/customize/extensions/ad-ldap-connector/install-configure-ad-ldap-connector',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/install-configure-ad-ldap-connector',
  },
  {
    from: [
      '/connector/client-certificates',
      '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-client-certificates',
      '/extensions/ad-ldap-connector/configure-ad-ldap-connector-client-certificates',
      '/customize/extensions/ad-ldap-connector/configure-ad-ldap-connector-client-certificates',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/configure-ad-ldap-connector-client-certificates',
  },
  {
    from: [
      '/connector/kerberos',
      '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-kerberos',
      '/extensions/ad-ldap-connector/configure-ad-ldap-connector-with-kerberos',
      '/customize/extensions/ad-ldap-connector/configure-ad-ldap-connector-with-kerberos',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/configure-ad-ldap-connector-with-kerberos',
  },
  {
    from: [
      '/extensions/ad-ldap-connector/ad-ldap-connector-config-file-schema',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-config-file-schema',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-connector-config-file-schema',
  },
  {
    from: [
      '/extensions/ad-ldap-connector/import-export-ad-ldap-connector-configs',
      '/customize/extensions/ad-ldap-connector/import-export-ad-ldap-connector-configs',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/import-export-ad-ldap-connector-configs',
  },
  {
    from: [
      '/extensions/ad-ldap-connector/map-ad-ldap-profile-attributes-to-auth0',
      '/customize/extensions/ad-ldap-connector/map-ad-ldap-profile-attributes-to-auth0',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/map-ad-ldap-profile-attributes-to-auth0',
  },
  {
    from: [
      '/connector/high-availability',
      '/ad-ldap-connector/ad-ldap-high-availability',
      '/extensions/ad-ldap-connector/ad-ldap-high-availability',
      '/customize/extensions/ad-ldap-connector/ad-ldap-high-availability',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-high-availability',
  },
  {
    from: [
      '/dashboard/guides/connections/disable-cache-ad-ldap',
      '/extensions/ad-ldap-connector/disable-credential-caching',
      '/customize/extensions/ad-ldap-connector/disable-credential-caching',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/disable-credential-caching',
  },
  {
    from: [
      '/connector/scom-monitoring',
      '/ad-ldap-connector/ad-ldap-connector-scorm',
      '/extensions/ad-ldap-connector/ad-ldap-connector-scom',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-scom',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-connector-scom',
  },
  {
    from: [
      '/connector/modify',
      '/ad-ldap-connector/ad-ldap-connectors-to-auth0',
      '/extensions/ad-ldap-connector/ad-ldap-connector-to-auth0',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-to-auth0',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-connector-to-auth0',
  },
  {
    from: [
      '/connector/test-dc',
      '/ad-ldap-connector/ad-ldap-connector-test-environment',
      '/extensions/ad-ldap-connector/ad-ldap-connector-test-environment',
      '/customize/extensions/ad-ldap-connector/ad-ldap-connector-test-environment',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/ad-ldap-connector-test-environment',
  },
  {
    from: [
      '/connector/update',
      '/ad-ldap-connector/update-ad-ldap-connectors',
      '/extensions/ad-ldap-connector/update-ad-ldap-connectors',
      '/customize/extensions/ad-ldap-connector/update-ad-ldap-connectors',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/active-directory-ldap/ad-ldap-connector/update-ad-ldap-connectors',
  },
  {
    from: ['/extensions/account-link', '/extensions/account-link-extension'],
    to: '/customize/extensions/account-link-extension',
  },
  {
    from: [
      '/logs/export-log-events-with-extensions',
      '/logs/log-export-extensions',
      '/extensions/log-export-extensions',
      '/customize/extensions/export-log-events-with-extensions',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-application-insights',
      '/extensions/application-insight',
      '/extensions/log-export-extensions/export-logs-to-application-insights',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-application-insights',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-cloudwatch',
      '/extensions/cloudwatch',
      '/extensions/log-export-extensions/export-logs-to-cloudwatch',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-cloudwatch',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-azure-blob-storage',
      '/extensions/azure-blob-storage',
      '/extensions/log-export-extensions/export-logs-to-azure-blob-storage',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-azure-blob-storage',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-logentries',
      '/extensions/logentries',
      '/extensions/log-export-extensions/export-logs-to-logentries',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-logentries',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-loggly',
      '/extensions/loggly',
      '/extensions/log-export-extensions/export-logs-to-loggly',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-loggly',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-logstash',
      '/extensions/logstash',
      '/extensions/log-export-extensions/export-logs-to-logstash',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-logstash',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-mixpanel',
      '/extensions/mixpanel',
      '/extensions/log-export-extensions/export-logs-to-mixpanel',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-mixpanel',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-papertrail',
      '/extensions/papertrail',
      '/extensions/log-export-extensions/export-logs-to-papertrail',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-papertrail',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-segment',
      '/extensions/segment',
      '/extensions/log-export-extensions/export-logs-to-segment',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-segment',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/export-logs-to-splunk',
      '/extensions/splunk',
      '/extensions/log-export-extensions/export-logs-to-splunk',
      '/customize/extensions/export-log-events-with-extensions/export-logs-to-splunk',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/extensions/auth0-logs-to-sumo-logic',
      '/extensions/sumologic',
      '/extensions/log-export-extensions/auth0-logs-to-sumo-logic',
      '/customize/extensions/export-log-events-with-extensions/auth0-logs-to-sumo-logic',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: ['/extensions/authentication-api-debugger', '/extensions/authentication-api-debugger-extension'],
    to: '/customize/extensions/authentication-api-debugger-extension',
  },
  {
    from: [
      '/extensions/authentication-api-webhooks',
      '/extensions/auth0-authentication-api-webhooks',
      '/customize/extensions/auth0-authentication-api-webhooks',
    ],
    to: '/customize/extensions',
  },
  {
    from: ['/extensions/user-import-export', '/extensions/user-import-export-extension'],
    to: '/customize/extensions/user-import-export-extension',
  },
  {
    from: ['/extensions/bitbucket-deploy', '/extensions/bitbucket-deployments'],
    to: 'https://marketplace.auth0.com/integrations/bitbucket-pipeline',
  },
  {
    from: [
      '/extensions/custom-social-connections',
      '/extensions/custom-social-extensions',
      '/connections/adding-generic-oauth1-connection',
      '/oauth2',
      '/connections/social/oauth2',
    ],
    to: '/authenticate/identity-providers/social-identity-providers/oauth2',
  },
  {
    from: ['/extensions/github-deploy', '/extensions/github-deployments'],
    to: 'https://marketplace.auth0.com/integrations/github-actions',
  },
  {
    from: ['/extensions/gitlab-deploy', '/extensions/gitlab-deployments'],
    to: 'https://marketplace.auth0.com/integrations/gitlab-pipeline',
  },
  {
    from: [
      '/extensions/management-api-webhooks',
      '/extensions/auth0-management-api-webhooks',
      '/customize/extensions/auth0-management-api-webhooks',
    ],
    to: '/customize/extensions',
  },
  {
    from: ['/extensions/realtime-webtask-logs', '/extensions/real-time-webtask-logs'],
    to: '/customize/extensions/real-time-webtask-logs',
  },
  {
    from: [
      '/dashboard/guides/extensions/delegated-admin-create-app',
      '/extensions/delegated-administration-extension/create-delegated-admin-applications',
    ],
    to: '/customize/extensions/delegated-administration-extension/create-delegated-admin-applications',
  },
  {
    from: [
      '/dashboard/guides/extensions/delegated-admin-install-extension',
      '/dashboard/guides/extensions/delegated-admin-use-extension',
      '/extensions/delegated-administration-extension/install-delegated-admin-extension',
    ],
    to: '/customize/extensions/delegated-administration-extension/install-delegated-admin-extension',
  },

  /* Deploy CLI Tool */

  {
    from: [
      '/extensions/deploy-cli-tool',
      '/extensions/deploy-cli',
      '/extensions/deploy-cli/references/whats-new',
      '/extensions/deploy-cli/references/whats-new-v2',
      '/deploy/deploy-cli-tool/whats-new-in-deploy-cli-tool',
      '/deploy/deploy-cli-tool',
    ],
    to: '/deploy-monitor/deploy-cli-tool',
  },
  {
    from: [
      '/extensions/deploy-cli-tool/call-deploy-cli-tool-programmatically',
      '/extensions/deploy-cli/guides/call-deploy-cli-programmatically',
      '/deploy/deploy-cli-tool/call-deploy-cli-tool-programmatically',
    ],
    to: '/deploy-monitor/deploy-cli-tool/call-deploy-cli-tool-programmatically',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/create-deploy-cli-application-manually',
      '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application-manually',
      '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application',
      '/deploy/deploy-cli-tool/create-and-configure-the-deploy-cli-application',
    ],
    to: '/deploy-monitor/deploy-cli-tool/create-and-configure-the-deploy-cli-application',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/import-export-directory-structure',
      '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure',
      '/deploy/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure',
    ],
    to: '/deploy-monitor/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/import-export-yaml-file',
      '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file',
      '/deploy/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file',
    ],
    to: '/deploy-monitor/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment',
      '/extensions/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
      '/deploy/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
    ],
    to: '/deploy-monitor/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/install-deploy-cli',
      '/extensions/deploy-cli-tool/install-and-configure-the-deploy-cli-tool',
      '/deploy/deploy-cli-tool/install-and-configure-the-deploy-cli-tool',
    ],
    to: '/deploy-monitor/deploy-cli-tool/install-and-configure-the-deploy-cli-tool',
  },
  {
    from: [
      '/extensions/deploy-cli/references/deploy-cli-options',
      '/extensions/deploy-cli-tool/deploy-cli-tool-options',
      '/deploy/deploy-cli-tool/deploy-cli-tool-options',
    ],
    to: '/deploy-monitor/deploy-cli-tool/deploy-cli-tool-options',
  },
  {
    from: [
      '/extensions/deploy-cli/references/environment-variables-keyword-mappings',
      '/extensions/deploy-cli-tool/environment-variables-and-keyword-mappings',
      '/deploy/deploy-cli-tool/environment-variables-and-keyword-mappings',
    ],
    to: '/deploy-monitor/deploy-cli-tool/environment-variables-and-keyword-mappings',
  },

  /* Get Started */

  {
    from: ['/configuration-overview', '/config', '/configure', '/getting-started'],
    to: '/get-started',
  },
  {
    from: ['/overview', '/get-started/overview', '/getting-started/overview'],
    to: '/get-started/auth0-overview',
  },
  {
    from: ['/get-started/dashboard'],
    to: '/get-started/auth0-overview/dashboard',
  },
  {
    from: ['/get-started/dashboard/activity'],
    to: '/get-started/auth0-overview/dashboard/activity',
  },
  {
    from: [
      '/authorization/authentication-and-authorization',
      '/authorization/concepts/authz-and-authn',
      '/application-auth/current',
      '/application-auth/legacy',
      '/application-auth',
      '/get-started/authentication-and-authorization',
    ],
    to: '/get-started/identity-fundamentals/authentication-and-authorization',
  },
  {
    from: ['/getting-started/set-up-app', '/applications/set-up-an-application', '/get-started/create-apps'],
    to: '/get-started/auth0-overview/create-applications',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-m2m',
      '/applications/application-settings/non-interactive',
      '/applications/application-settings/machine-to-machine',
      '/applications/machine-to-machine',
      '/applications/set-up-an-application/register-machine-to-machine-applications',
      '/get-started/create-apps/machine-to-machine-apps',
    ],
    to: '/get-started/auth0-overview/create-applications/machine-to-machine-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-native',
      '/applications/application-settings/native',
      '/applications/native',
      '/applications/set-up-an-application/register-native-applications',
      '/get-started/create-apps/native-apps',
    ],
    to: '/get-started/auth0-overview/create-applications/native-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-regular-web',
      '/applications/application-settings/regular-web-app',
      '/applications/webapps',
      '/applications/register-regular-web-applications',
      '/applications/set-up-an-application/register-regular-web-applications',
      '/get-started/create-apps/regular-web-apps',
    ],
    to: '/get-started/auth0-overview/create-applications/regular-web-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-spa',
      '/applications/spa',
      '/applications/application-settings/single-page-app',
      '/applications/register-single-page-app',
      '/applications/set-up-an-application/register-single-page-app',
      '/get-started/create-apps/single-page-web-apps',
    ],
    to: '/get-started/auth0-overview/create-applications/single-page-web-apps',
  },
  {
    from: ['/getting-started/set-up-api', '/dashboard/reference/views-api', '/get-started/set-up-apis'],
    to: '/get-started/auth0-overview/set-up-apis',
  },
  {
    from: [
      '/dashboard',
      '/getting-started/dashboard-overview',
      '/get-started/dashboard/upcoming-dashboard-changes',
      '/get-started/dashboard',
    ],
    to: '/get-started/auth0-overview/dashboard',
  },
  {
    from: [
      '/get-started/learn-the-basics',
      '/getting-started/the-basics',
      '/getting-started/create-tenant',
      '/get-started/create-tenants',
    ],
    to: '/get-started/auth0-overview/create-tenants',
  },
  {
    from: ['/dev-lifecycle/child-tenants', '/get-started/create-tenants/child-tenants'],
    to: '/get-started/auth0-overview/create-tenants/child-tenants',
  },
  {
    from: [
      '/dev-lifecycle/set-up-multiple-environments',
      '/dev-lifecycle/setting-up-env',
      '/get-started/create-tenants/set-up-multiple-environments',
    ],
    to: '/get-started/auth0-overview/create-tenants/set-up-multiple-environments',
  },
  {
    from: [
      '/get-started/dashboard/create-multiple-tenants',
      '/dashboard/guides/tenants/create-multiple-tenants',
      '/get-started/create-tenants/create-multiple-tenants',
    ],
    to: '/get-started/auth0-overview/create-tenants/create-multiple-tenants',
  },
  {
    from: [
      '/dashboard/guides/connections/set-up-connections-social',
      '/get-started/dashboard/set-up-social-connections',
    ],
    to: 'https://marketplace.auth0.com/features/social-connections',
  },
  {
    from: [
      '/dashboard/guides/connections/test-connections-enterprise',
      '/get-started/dashboard/test-enterprise-connections',
      '/connections/enterprise/test-enterprise-connections',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/test-enterprise-connections',
  },
  {
    from: [
      '/dashboard/guides/connections/view-connections',
      '/get-started/dashboard/view-connections',
      '/connections/view-connections',
    ],
    to: '/authenticate/identity-providers/view-connections',
  },
  {
    from: [
      '/dashboard/guides/connections/enable-connections-enterprise',
      '/get-started/dashboard/enable-enterprise-connections',
      '/connections/enterprise/enable-enterprise-connections',
    ],
    to: '/authenticate/identity-providers/enterprise-identity-providers/enable-enterprise-connections',
  },
  {
    from: [
      '/api/management/guides/connections/promote-connection-domain-level',
      '/get-started/dashboard/promote-connections-to-domain-level',
      '/connections/promote-connections-to-domain-level',
    ],
    to: '/authenticate/identity-providers/promote-connections-to-domain-level',
  },
  {
    from: [
      '/api/management/guides/connections/retrieve-connection-options',
      '/api/management/guides/retrieve-connection-options',
      '/get-started/dashboard/retrieve-connection-options',
      '/connections/retrieve-connection-options',
    ],
    to: '/authenticate/identity-providers/retrieve-connection-options',
  },
  {
    from: [
      '/dashboard-access/dashboard-roles',
      '/dashboard-access/manage-dashboard-users',
      '/dashboard/manage-dashboard-admins',
      '/tutorials/manage-dashboard-admins',
      '/get-started/dashboard/manage-dashboard-users',
      '/dashboard-access',
    ],
    to: '/get-started/manage-dashboard-access',
  },
  {
    from: ['/dashboard-access/dashboard-roles/feature-access-by-role', '/dashboard-access/feature-access-by-role'],
    to: '/get-started/manage-dashboard-access/feature-access-by-role',
  },
  {
    from: ['/dashboard-access/add-change-remove-mfa/add-multi-factor-authentication-for-auth0-dashboard-access'],
    to: '/get-started/manage-dashboard-access/add-change-remove-mfa/add-mfa',
  },
  {
    from: ['/dashboard-access/add-dashboard-users'],
    to: '/get-started/manage-dashboard-access/add-dashboard-users',
  },

  /* Hooks */

  {
    from: [
      '/hooks/cli',
      '/auth0-hooks/cli',
      '/hooks/dashboard',
      '/hooks/overview',
      '/auth0-hooks',
      '/auth0-hooks/dashboard',
      '/hooks',
    ],
    to: '/customize/hooks',
  },
  {
    from: [
      '/hooks/concepts/extensibility-points',
      '/hooks/concepts/overview-extensibility-points',
      '/hooks/extensibility-points',
      '/customize/hooks/extensibility-points',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/hooks/concepts/credentials-exchange-extensibility-point',
      '/hooks/guides/use-the-credentials-exchange-extensibility-point',
      '/hooks/client-credentials-exchange',
      '/hooks/extensibility-points/credentials-exchange',
      '/hooks/extensibility-points/client-credentials-exchange',
      '/customize/hooks/extensibility-points/client-credentials-exchange',
    ],
    to: '/customize/hooks',
  },
  {
    from: [
      '/hooks/create',
      '/hooks/dashboard/create-delete',
      '/hooks/cli/create-delete',
      '/hooks/guides/create-hooks-using-cli',
      '/hooks/guides/create-hooks-using-dashboard',
      '/auth0-hooks/cli/create-delete',
      '/hooks/create-hooks',
      '/create-hooks',
    ],
    to: '/customize/hooks/create-hooks',
  },
  {
    from: [
      '/hooks/delete',
      '/hooks/guides/delete-hooks-using-cli',
      '/hooks/guides/delete-hooks-using-dashboard',
      '/hooks/delete-hooks',
    ],
    to: '/customize/hooks/delete-hooks',
  },
  {
    from: [
      '/hooks/enable-disable',
      '/hooks/cli/enable-disable',
      '/hooks/dashboard/enable-disable',
      '/hooks/guides/enable-disable-hooks-using-cli',
      '/hooks/guides/enable-disable-hooks-using-dashboard',
      '/auth0-hooks/cli/enable-disable',
      '/hooks/enable-disable-hooks',
    ],
    to: '/customize/hooks/enable-disable-hooks',
  },
  {
    from: [
      '/hooks/guides/post-change-password',
      '/hooks/post-change-password',
      '/hooks/extensibility-points/post-change-password',
      '/customize/hooks/extensibility-points/post-change-password',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/hooks/concepts/post-user-registration-extensibility-point',
      '/hooks/guides/use-the-post-user-registration-extensibility-point',
      '/hooks/post-user-registration',
      '/hooks/extensibility-points/post-user-registration',
      '/customize/hooks/extensibility-points/post-user-registration',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/hooks/concepts/pre-user-registration-extensibility-point',
      '/hooks/guides/use-the-pre-user-registration-extensibility-point',
      '/auth0-hooks/extensibility-points/pre-user-registration',
      '/hooks/pre-user-registration',
      '/hooks/extensibility-points/pre-user-registration',
      '/customize/hooks/extensibility-points/pre-user-registration',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: ['/hooks/secrets/create', '/hooks/hook-secrets/create-hook-secrets'],
    to: '/customize/hooks/hook-secrets/create-hook-secrets',
  },
  {
    from: ['/hooks/secrets/delete', '/hooks/hook-secrets/delete-hook-secrets'],
    to: '/customize/hooks/hook-secrets/delete-hook-secrets',
  },
  {
    from: ['/hooks/secrets', '/hooks/hook-secrets'],
    to: '/customize/hooks/hook-secrets',
  },
  {
    from: ['/hooks/secrets/update', '/hooks/hook-secrets/update-hook-secrets'],
    to: '/customize/hooks/hook-secrets/update-hook-secrets',
  },
  {
    from: ['/hooks/secrets/view', '/hooks/hook-secrets/view-hook-secrets'],
    to: '/customize/hooks/hook-secrets/view-hook-secrets',
  },
  {
    from: [
      '/hooks/update',
      '/hooks/cli/edit',
      '/hooks/dashboard/edit',
      '/hooks/guides/edit-hooks-using-cli',
      '/hooks/guides/edit-hooks-using-dashboard',
      '/hooks/update-hooks',
    ],
    to: '/customize/hooks/update-hooks',
  },
  {
    from: [
      '/hooks/view-logs',
      '/hooks/cli/logs',
      '/hooks/logs',
      '/hooks/guides/logging-hooks-using-cli',
      '/auth0-hooks/cli/logs',
      '/hooks/view-logs-for-hooks',
    ],
    to: '/customize/hooks/view-logs-for-hooks',
  },
  {
    from: ['/hooks/view', '/hooks/view-hooks'],
    to: '/customize/hooks/view-hooks',
  },
  {
    from: [
      '/hooks/extensibility-points/send-phone-message',
      '/customize/hooks/extensibility-points/send-phone-message',
    ],
    to: '/customize/actions/flows-and-triggers',
  },

  /* Identity Labs */

  {
    from: ['/labs', '/identity-labs'],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/01-web-sign-in', '/identity-labs/lab-1-web-sign-in'],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-01', '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-1'],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-02', '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-2'],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/02-calling-an-api', '/identity-labs/identity-lab-2-calling-api'],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/02-calling-an-api/exercise-01',
      '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-1',
    ],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/02-calling-an-api/exercise-02',
      '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-2',
    ],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/02-calling-an-api/exercise-03',
      '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-3',
    ],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/03-mobile-native-app', '/identity-labs/lab-3-mobile-native-app'],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/03-mobile-native-app/exercise-01',
      '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-1',
    ],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/03-mobile-native-app/exercise-02',
      '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-2',
    ],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/03-mobile-native-app/exercise-03',
      '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-3',
    ],
    to: '/get-started',
  },
  {
    from: ['/identity-labs/04-single-page-app', '/identity-labs/lab-4-single-page-app'],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/04-single-page-app/exercise-01',
      '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-1',
    ],
    to: '/get-started',
  },
  {
    from: [
      '/identity-labs/04-single-page-app/exercise-02',
      '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-2',
    ],
    to: '/get-started',
  },

  /* Integrations */

  {
    from: ['/integration', '/integrations'],
    to: '/customize/integrations',
  },
  {
    from: ['/aws-api-setup', '/integrations/how-to-set-up-aws-for-delegated-authentication'],
    to: '/customize/integrations/aws/how-to-set-up-aws-for-delegated-authentication',
  },
  {
    from: [
      '/integrations/aws/sso',
      '/configure-amazon-web-services-for-sso',
      '/integrations/aws/configure-amazon-web-services-for-sso',
    ],
    to: '/customize/integrations/aws/configure-amazon-web-services-for-sso',
  },
  {
    from: [
      '/integrations/aws/tokens',
      '/integrations/call-aws-apis-and-resources-with-tokens',
      '/integrations/aws-api-gateway-delegation',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation',
  },
  {
    from: [
      '/scenarios/amazon-cognito',
      '/tutorials/integrating-auth0-amazon-cognito-mobile-apps',
      '/integrations/integrating-auth0-amazon-cognito-mobile-apps',
      '/integrations/integrate-with-amazon-cognito',
      '/integrations/amazon-cognito',
    ],
    to: '/customize/integrations/aws/amazon-cognito',
  },
  {
    from: [
      '/scenarios-mqtt',
      '/tutorials/authenticating-devices-using-mqtt',
      '/integrations/authenticating-devices-using-mqtt',
      '/integrations/authenticate-devices-using-mqtt',
    ],
    to: '/customize/integrations/authenticate-devices-using-mqtt',
  },
  {
    from: [
      '/scenarios-tessel',
      '/tutorials/authenticating-a-tessel-device',
      '/integrations/authenticating-a-tessel-device',
      '/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0',
    ],
    to: '/customize/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0',
  },
  {
    from: ['/aws', '/awsapi-tutorial', '/integrations/aws'],
    to: '/customize/integrations/aws',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation',
      '/integrations/aws-api-gateway',
      '/integrations/aws-api-gateway-delegation',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-1',
      '/integrations/aws-api-gateway/part-1',
      '/integrations/aws-api-gateway/aws-api-gateway-step-1',
      '/integrations/aws-api-gateway-delegation-1',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation/aws-api-gateway-delegation-1',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-2',
      '/integrations/aws-api-gateway/part-2',
      '/integrations/aws-api-gateway/aws-api-gateway-step-2',
      '/integrations/aws-api-gateway-delegation-2',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation/aws-api-gateway-delegation-2',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-3',
      '/integrations/aws-api-gateway/part-3',
      '/integrations/aws-api-gateway/aws-api-gateway-step-3',
      '/integrations/aws-api-gateway-delegation-3',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation/aws-api-gateway-delegation-3',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-4',
      '/integrations/aws-api-gateway/part-4',
      '/integrations/aws-api-gateway/aws-api-gateway-step-4',
      '/integrations/aws-api-gateway-delegation-4',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation/aws-api-gateway-delegation-4',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-5',
      '/integrations/aws-api-gateway/part-5',
      '/integrations/aws-api-gateway/aws-api-gateway-step-5',
      '/integrations/aws-api-gateway-delegation-5',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-delegation/aws-api-gateway-delegation-5',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/secure-api-with-cognito',
      '/integrations/aws-api-gateway/secure-api-with-cognito',
      '/integrations/aws-api-gateway-cognito',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-cognito',
  },
  {
    from: [
      '/integrations/aws-api-gateway/custom-authorizers',
      '/integrations/aws-api-gateway/custom-authorizers/part-1',
      '/integrations/aws-api-gateway/custom-authorizers/part-2',
      '/integrations/aws-api-gateway/custom-authorizers/part-3',
      '/integrations/aws-api-gateway/custom-authorizers/part-4',
      '/integrations/aws-api-gateway-custom-authorizers',
    ],
    to: '/customize/integrations/aws/aws-api-gateway-custom-authorizers',
  },
  {
    from: [
      '/sharepoint-apps',
      '/integrations/sharepoint-apps',
      '/integrations/connecting-provider-hosted-apps-to-sharepoint-online',
    ],
    to: '/customize/integrations/connecting-provider-hosted-apps-to-sharepoint-online',
  },
  {
    from: [
      '/integrations/google-cloud-platform',
      '/tutorials/google-cloud-platform',
      '/integrations/google-cloud-endpoints',
    ],
    to: '/customize/integrations/google-cloud-endpoints',
  },
  {
    from: ['/integrations/marketing/salesforce', '/integrations/marketing/export-user-data-salesforce'],
    to: '/customize/integrations/marketing-tool-integrations/export-user-data-salesforce',
  },
  {
    from: [
      '/tutorials/office365-connection-deprecation-guide',
      '/integrations/office365-connection-deprecation-guide',
      '/office365-deprecated',
      '/integrations/migrate-office365-connections-to-windows-azure-ad',
    ],
    to: '/customize/integrations/migrate-office365-connections-to-windows-azure-ad',
  },
  {
    from: [
      '/tutorials/using-auth0-to-secure-a-cli',
      '/integrations/using-auth0-to-secure-a-cli',
      '/tutorials/using-auth0-to-secure-an-api',
      '/cli',
      '/integrations/secure-a-cli-with-auth0',
    ],
    to: '/customize/integrations/secure-a-cli-with-auth0',
  },
  {
    from: ['/integrations/sharepoint', '/integrations/sharepoint-2010-2013'],
    to: '/customize/integrations/sharepoint-2010-2013',
  },
  {
    from: ['/integrations/sso', '/sso/current/integrations', '/integrations/sso-integrations'],
    to: '/customize/integrations/sso-integrations',
  },
  {
    from: [
      '/integrations/sso-integrations/ad-rms',
      '/integrations/sso-integrations/ad-rms-sso-integration',
      '/sso/current/integrations/ad-rms',
      '/integrations/sso/ad-rms',
    ],
    to: 'https://marketplace.auth0.com/integrations/ad-rms-sso',
  },
  {
    from: ['/integrations/sso-integrations/box', '/sso/current/integrations/box', '/integrations/sso/box'],
    to: 'https://marketplace.auth0.com/integrations/box-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/cloudbees',
      '/sso/current/integrations/cloudbees',
      '/integrations/sso/cloudbees',
    ],
    to: 'https://marketplace.auth0.com/integrations/cloudbees-sso',
  },
  {
    from: ['/integrations/sso-integrations/concur', '/sso/current/integrations/concur', '/integrations/sso/concur'],
    to: 'https://marketplace.auth0.com/integrations/concur-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/disqus',
      '/sso/current/integrations/disqus',
      '/integrations/disqus',
      '/integrations/sso/disqus',
    ],
    to: 'https://marketplace.auth0.com/features/sso-integrations',
  },
  {
    from: [
      '/integrations/sso-integrations/dropbox',
      '/sso/current/integrations/dropbox',
      '/integrations/dropbox',
      '/integrations/sso/dropbox',
    ],
    to: 'https://marketplace.auth0.com/integrations/dropbox-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/dynamics-crm',
      '/sso/current/integrations/dynamics-crm',
      '/integrations/dynamics-crm',
      '/integrations/sso/dynamics-crm',
    ],
    to: 'https://marketplace.auth0.com/integrations/dynamics-crm-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/adobe-sign',
      '/integrations/sso-integrations/echosign',
      '/sso/current/integrations/echosign',
      '/integrations/echosign',
      '/integrations/sso/adobe-sign',
    ],
    to: 'https://marketplace.auth0.com/integrations/adobe-sign-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/egnyte',
      '/sso/current/integrations/egnyte',
      '/integrations/egnyte',
      '/integrations/sso/egnyte',
    ],
    to: 'https://marketplace.auth0.com/integrations/egnyte-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/new-relic',
      '/sso/current/integrations/new-relic',
      '/integrations/new-relic',
      '/integrations/sso/new-relic',
    ],
    to: 'https://marketplace.auth0.com/integrations/new-relic-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/office-365',
      '/sso/current/integrations/office-365',
      '/integrations/office-365',
      '/integrations/sso/office-365',
    ],
    to: 'https://marketplace.auth0.com/integrations/office-365-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/salesforce',
      '/sso/current/integrations/salesforce',
      '/integrations/salesforce',
      '/integrations/sso/salesforce',
    ],
    to: 'https://marketplace.auth0.com/integrations/salesforce-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/slack',
      '/sso/current/integrations/slack',
      '/integrations/integrating-with-slack',
      '/tutorials/integrating-with-slack',
      '/scenarios/slack',
      '/integrations/slack',
      '/integrations/sso/slack',
    ],
    to: 'https://marketplace.auth0.com/integrations/slack-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/sentry',
      '/sso/current/integrations/sentry',
      '/integrations/sentry',
      '/integrations/sso/sentry',
    ],
    to: 'https://marketplace.auth0.com/integrations/sentry-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/sharepoint',
      '/sso/current/integrations/sharepoint',
      '/integrations/sso/sharepoint',
    ],
    to: 'https://marketplace.auth0.com/integrations/sharepoint-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/springcm',
      '/sso/current/integrations/springcm',
      '/integrations/springcm',
      '/integrations/sso/springcm',
    ],
    to: 'https://marketplace.auth0.com/integrations/springcm-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/zendesk',
      '/sso/current/integrations/zendesk',
      '/integrations/zendesk',
      '/integrations/sso/zendesk',
    ],
    to: 'https://marketplace.auth0.com/integrations/zendesk-sso',
  },
  {
    from: [
      '/integrations/sso-integrations/zoom',
      '/sso/current/integrations/zoom',
      '/integrations/zoom',
      '/integrations/sso/zoom',
    ],
    to: 'https://marketplace.auth0.com/integrations/zoom-sso',
  },
  {
    from: ['/integrations/sso-integrations/cisco-webex', '/integrations/sso/cisco-webex'],
    to: 'https://marketplace.auth0.com/integrations/cisco-webex-sso',
  },
  {
    from: ['/integrations/sso-integrations/datadog', '/integrations/sso/datadog'],
    to: 'https://marketplace.auth0.com/integrations/datadog-sso',
  },
  {
    from: ['/integrations/sso-integrations/egencia', '/integrations/sso/egencia'],
    to: 'https://marketplace.auth0.com/integrations/egencia-sso',
  },
  {
    from: ['/integrations/sso-integrations/eloqua', '/integrations/sso/eloqua'],
    to: 'https://marketplace.auth0.com/integrations/eloqua-sso',
  },
  {
    from: ['/integrations/sso-integrations/freshdesk', '/integrations/sso/freshdesk'],
    to: 'https://marketplace.auth0.com/integrations/freshdesk-sso',
  },
  {
    from: ['/integrations/sso-integrations/g-suite', '/integrations/sso/g-suite'],
    to: 'https://marketplace.auth0.com/integrations/g-suite-sso',
  },
  {
    from: ['/integrations/sso-integrations/github-enterprise-cloud', '/integrations/sso/github-enterprise-cloud'],
    to: 'https://marketplace.auth0.com/integrations/github-enterprise-cloud-sso',
  },
  {
    from: ['/integrations/sso-integrations/github-enterprise-server', '/integrations/sso/github-enterprise-server'],
    to: 'https://marketplace.auth0.com/integrations/github-enterprise-server-sso',
  },
  {
    from: ['/integrations/sso-integrations/heroku', '/integrations/sso/heroku'],
    to: 'https://marketplace.auth0.com/integrations/heroku-sso',
  },
  {
    from: ['/integrations/sso-integrations/hosted-graphite', '/integrations/sso/hosted-graphite'],
    to: 'https://marketplace.auth0.com/integrations/hosted-graphite-sso',
  },
  {
    from: ['/integrations/sso-integrations/litmos', '/integrations/sso/litmos'],
    to: 'https://marketplace.auth0.com/integrations/litmos-sso',
  },
  {
    from: ['/integrations/sso-integrations/pluralsight', '/integrations/sso/pluralsight'],
    to: 'https://marketplace.auth0.com/integrations/pluralsight-sso',
  },
  {
    from: ['/integrations/sso-integrations/sprout-video', '/integrations/sso/sprout-video'],
    to: 'https://marketplace.auth0.com/integrations/sprout-video-sso',
  },
  {
    from: ['/integrations/sso-integrations/tableau-online', '/integrations/sso/tableau-online'],
    to: 'https://marketplace.auth0.com/integrations/tableau-online-sso',
  },
  {
    from: ['/integrations/sso-integrations/tableau-server', '/integrations/sso/tableau-server'],
    to: 'https://marketplace.auth0.com/integrations/tableau-server-sso',
  },
  {
    from: ['/integrations/sso-integrations/workday', '/integrations/sso/workday'],
    to: 'https://marketplace.auth0.com/integrations/workday-sso',
  },
  {
    from: ['/integrations/sso-integrations/workpath', '/integrations/sso/workpath'],
    to: 'https://marketplace.auth0.com/integrations/workpath-sso',
  },
  {
    from: [
      '/integrations/azure-tutorial',
      '/azure-tutorial',
      '/tutorials/azure-tutorial',
      '/integrations/azure-api-management/configure-auth0',
      '/integrations/azure-api-management/configure-azure',
      '/integrations/azure-api-management',
    ],
    to: '/customize/integrations/azure-api-management',
  },
  {
    from: ['/marketplace-partner-documentation', '/integrations/marketplace-partners'],
    to: '/customize/integrations/marketplace-partners',
  },
  {
    from: [
      '/redirect-rules-for-partners',
      '/marketplace-partner-documentation/redirect-rules-for-partners',
      '/integrations/marketplace-partners/redirect-rules-for-partners',
      '/integrations/marketplace-partners/redirect-actions-for-partners',
    ],
    to: '/customize/integrations/marketplace-partners/redirect-actions-for-partners',
  },
  {
    from: [
      '/social-connections-for-partners',
      '/marketplace-partner-documentation/social-connections-for-partners',
      '/integrations/marketplace-partners/social-connections-for-partners',
    ],
    to: '/customize/integrations/marketplace-partners/social-connections-for-partners',
  },
  {
    from: [
      '/sso-integrations-for-partners',
      '/marketplace-partner-documentation/sso-integrations-for-partners',
      '/integrations/marketplace-partners/sso-integrations-for-partners',
    ],
    to: '/customize/integrations/marketplace-partners/sso-integrations-for-partners',
  },
  {
    from: ['/integrations/marketing'],
    to: '/customize/integrations/marketing-tool-integrations',
  },

  /* Libraries */

  {
    from: '/sdks',
    to: '/libraries',
  },
  {
    from: ['/custom-signup', '/libraries/lock/v10/custom-signup', '/libraries/lock/v11/custom-signup'],
    to: '/libraries/custom-signup',
  },
  {
    from: [
      '/libraries/error-messages',
      '/libraries/lock-android/error-messages',
      '/errors/libraries/auth0-js/invalid-token',
    ],
    to: '/libraries/common-auth0-library-authentication-errors',
  },
  {
    from: [
      '/widget',
      '/login-widget2',
      '/lock',
      '/migrations/guides/legacy-lock-api-deprecation',
      '/libraries/lock/v9',
      '/libraries/lock/v9/display-modes',
      '/libraries/lock/v9/types-of-applications',
      '/libraries/lock/v10',
      '/libraries/lock/v10/installation',
      '/libraries/lock/v11',
      '/libraries/lock/using-refresh-tokens',
      '/libraries/lock/using-a-refresh-token',
      '/login/embedded-login/lock',
    ],
    to: '/libraries/lock',
  },
  {
    from: [
      '/libraries/lock/display-modes',
      '/libraries/lock/customization',
      '/libraries/lock/v9/customization',
      '/libraries/lock/v10/customization',
      '/libraries/lock/v11/customization',
      '/libraries/lock/v9/configuration',
      '/libraries/lock/v10/configuration',
      '/libraries/lock/v11/configuration',
    ],
    to: '/libraries/lock/lock-configuration',
  },
  {
    from: [
      '/libraries/lock/v10/popup-mode',
      '/libraries/lock/v10/authentication-modes',
      '/libraries/lock/v11/popup-mode',
      '/libraries/lock/v11/authentication-modes',
      '/libraries/lock/authentication-modes',
    ],
    to: '/libraries/lock/lock-authentication-modes',
  },
  {
    from: [
      '/hrd',
      '/libraries/lock/v11/selecting-the-connection-for-multiple-logins',
      '/protocols/saml/saml-configuration/selecting-between-multiple-idp',
      '/libraries/lock/v10/selecting-the-connection-for-multiple-logins',
    ],
    to: '/libraries/lock/selecting-from-multiple-connection-options',
  },
  {
    from: ['/libraries/lock/v11/api'],
    to: '/libraries/lock/lock-api-reference',
  },
  {
    from: [
      '/libraries/lock/v11/sending-authentication-parameters',
      '/libraries/lock/sending-authentication-parameters',
    ],
    to: '/libraries/lock/lock-authentication-parameters',
  },
  {
    from: ['/libraries/lock/v11/ui-customization', '/libraries/lock/v9/ui-customization'],
    to: '/libraries/lock/lock-ui-customization',
  },
  {
    from: [
      '/libraries/lock-ios/v2',
      '/libraries/lock-ios/delegation-api',
      '/libraries/lock-ios/v1/delegation-api',
      '/libraries/lock-ios',
      '/libraries/lock-ios/v1',
      '/libraries/lock-ios/lock-ios-api',
      '/libraries/lock-ios/v1/lock-ios-api',
      '/libraries/lock-ios/native-social-authentication',
      '/libraries/lock-ios/v1/native-social-authentication',
      '/libraries/lock-ios/password-reset-ios',
      '/libraries/lock-ios/v1/password-reset-ios',
      '/libraries/lock-ios/save-and-refresh-jwt-tokens',
      '/libraries/lock-ios/v1/save-and-refresh-jwt-tokens',
      '/libraries/lock-ios/sending-authentication-parameters',
      '/libraries/lock-ios/v1/sending-authentication-parameters',
      '/libraries/lock-ios/swift',
      '/libraries/lock-ios/v1/swift',
    ],
    to: '/libraries/lock-swift',
  },
  {
    from: ['/libraries/lock-ios/logging', '/libraries/lock-ios/v2/logging', '/libraries/lock-ios/v1/logging'],
    to: '/libraries/lock-swift/lock-swift-logging',
  },
  {
    from: [
      '/libraries/lock-ios/v2/passwordless',
      '/libraries/lock-ios/sms-lock-ios',
      '/libraries/lock-ios/v1/sms-lock-ios',
      '/libraries/lock-ios/touchid-authentication',
      '/libraries/lock-ios/v1/touchid-authentication',
      '/libraries/lock-ios/passwordless',
      '/libraries/lock-ios/v1/passwordless',
    ],
    to: '/libraries/lock-swift/lock-swift-passwordless',
  },
  {
    from: [
      '/libraries/lock-ios/v2/customization',
      '/libraries/lock-ios/use-your-own-ui',
      '/libraries/lock-ios/v1/use-your-own-uis',
      '/libraries/lock-ios/v1/use-your-own-ui',
      '/libraries/lock-ios/v1/customization',
    ],
    to: '/libraries/lock-swift/lock-swift-customization',
  },
  {
    from: ['/libraries/lock-ios/v2/custom-fields'],
    to: '/libraries/lock-swift/lock-swift-custom-fields-at-signup',
  },
  {
    from: ['/libraries/lock-ios/v2/configuration'],
    to: '/libraries/lock-swift/lock-swift-configuration-options',
  },
  {
    from: [
      '/auth0js',
      '/libraries/auth0js/v7',
      '/libraries/auth0js/v8',
      '/libraries/auth0js/v9',
      '/libraries/lock/v10/auth0js',
      '/libraries/lock/v11/auth0js',
      '/libraries/auth0js-v9-reference',
      '/login/embedded-login/auth0js',
    ],
    to: '/libraries/auth0js',
  },
  {
    from: ['/libraries/auth0-android/configuration'],
    to: '/libraries/auth0-android/auth0-android-configuration',
  },
  {
    from: [
      '/libraries/lock-android/v2',
      '/libraries/lock-android/v1',
      '/libraries/lock-android/v1/sending-authentication-parameters',
      '/libraries/lock-android/v1/use-your-own-ui',
    ],
    to: '/libraries/lock-android',
  },
  {
    from: [
      '/libraries/lock-android/v2/custom-authentication-providers',
      '/libraries/lock-android/v2/custom-oauth-connections',
    ],
    to: '/libraries/lock-android/lock-android-custom-authentication-providers',
  },
  {
    from: ['/tutorials/local-testing-and-development', '/local-testing-and-development'],
    to: '/libraries/secure-local-development',
  },
  {
    from: [
      '/libraries/lock-android/v2/delegation-api',
      '/libraries/lock-android/v1/delegation-api',
      '/libraries/lock-android/lock-android-delegation',
      '/libraries/lock-android/v2/refresh-jwt-tokens',
      '/libraries/lock-android/v1/refresh-jwt-tokens',
      '/libraries/lock-android/refresh-jwt-tokens',
      '/libraries/auth0-android/save-and-refresh-tokens',
    ],
    to: '/libraries/lock-android/lock-android-refresh-jwt',
  },
  {
    from: ['/libraries/lock-android/custom-fields', '/libraries/lock-android/v2/custom-fields'],
    to: '/libraries/lock-android/lock-android-custom-fields-at-signup',
  },
  {
    from: [
      '/libraries/auth0-android/passwordless',
      '/libraries/lock-android/passwordless',
      '/connections/passwordless/android-email',
      '/libraries/lock-android/v2/passwordless',
      '/libraries/lock-android/v1/passwordless',
    ],
    to: '/libraries/lock-android/lock-android-passwordless',
  },
  {
    from: ['/libraries/lock-android/v2/configuration', '/libraries/lock-android/v1/configuration'],
    to: '/libraries/lock-android/lock-android-configuration',
  },
  {
    from: ['/libraries/lock-android/v2/custom-theming'],
    to: '/libraries/lock-android/lock-android-custom-theming',
  },
  {
    from: [
      '/libraries/lock-android/v2/native-social-authentication',
      '/libraries/lock-android/v1/native-social-authentication',
    ],
    to: '/libraries/lock-android/lock-android-native-social-authentication',
  },
  {
    from: ['/libraries/lock-android/v2/passwordless-magic-link', '/libraries/lock-android/v1/passwordless-magic-link'],
    to: '/libraries/lock-android/lock-android-passwordless-with-magic-link',
  },
  {
    from: [
      '/libraries/lock-android/v2/keystore',
      '/libraries/lock-android/keystore',
      '/libraries/lock-android/android-development-keystores-hashes',
    ],
    to: '/libraries/auth0-android/android-development-keystores-hashes',
  },
  {
    from: ['/libraries/auth0-android/user-management'],
    to: '/libraries/auth0-android/auth0-android-user-management',
  },
  {
    from: ['/libraries/auth0-spa-js'],
    to: '/libraries/auth0-single-page-app-sdk',
  },
  {
    from: ['/libraries/auth0-android/database-authentication'],
    to: '/libraries/auth0-android/auth0-android-database-authentication',
  },
  {
    from: ['/libraries/auth0-spa-js/migrate-from-auth0js'],
    to: '/libraries/auth0-single-page-app-sdk/migrate-from-auth0-js-to-the-auth0-single-page-app-sdk',
  },
  {
    from: ['/libraries/auth0-swift/database-authentication'],
    to: '/libraries/auth0-swift/auth0-swift-database-connections',
  },
  {
    from: ['/libraries/auth0-swift/passwordless'],
    to: '/libraries/auth0-swift/auth0-swift-passwordless',
  },
  {
    from: ['/libraries/auth0-swift/save-and-refresh-jwt-tokens'],
    to: '/libraries/auth0-swift/auth0-swift-save-and-renew-tokens',
  },
  {
    from: ['/libraries/auth0-swift/touchid-authentication'],
    to: '/libraries/auth0-swift/auth0-swift-touchid-faceid',
  },
  {
    from: ['/libraries/auth0-swift/user-management'],
    to: '/libraries/auth0-swift/auth0-swift-user-management',
  },
  {
    from: ['/libraries/auth0-php/authentication-api'],
    to: '/libraries/auth0-php/using-the-authentication-api-with-auth0-php',
  },
  {
    from: ['/libraries/auth0-php/basic-use'],
    to: '/libraries/auth0-php/auth0-php-basic-use',
  },
  {
    from: ['/libraries/auth0-php/jwt-validation'],
    to: '/libraries/auth0-php/validating-jwts-with-auth0-php',
  },
  {
    from: ['/libraries/auth0-php/management-api'],
    to: '/libraries/auth0-php/using-the-management-api-with-auth0-php',
  },
  {
    from: ['/libraries/auth0-php/troubleshooting'],
    to: '/libraries/auth0-php/troubleshoot-auth0-php-library',
  },

  /* ORGANIZATIONS */

  {
    from: ['/organizations'],
    to: '/manage-users/organizations',
  },
  {
    from: ['/organizations/configure-organizations', '/organizations/configure/'],
    to: '/manage-users/organizations/configure-organizations',
  },
  {
    from: ['/organizations/create-organizations', '/organizations/configure/create-organizations'],
    to: '/manage-users/organizations/configure-organizations/create-organizations',
  },
  {
    from: ['/organizations/delete-organizations', '/organizations/configure/delete-organizations'],
    to: '/manage-users/organizations/configure-organizations/delete-organizations',
  },
  {
    from: ['/organizations/define-organization-behavior', '/organizations/configure/define-organization-behavior'],
    to: '/manage-users/organizations/configure-organizations/define-organization-behavior',
  },
  {
    from: ['/organizations/enable-connections', '/organizations/configure/enable-connections'],
    to: '/manage-users/organizations/configure-organizations/enable-connections',
  },
  {
    from: ['/organizations/disable-connections', '/organizations/configure/disable-connections'],
    to: '/manage-users/organizations/configure-organizations/disable-connections',
  },
  {
    from: ['/organizations/invite-members', '/organizations/configure/invite-members'],
    to: '/manage-users/organizations/configure-organizations/invite-members',
  },
  {
    from: ['/organizations/send-membership-invitations', '/organizations/configure/send-membership-invitations'],
    to: '/manage-users/organizations/configure-organizations/send-membership-invitations',
  },
  {
    from: ['/organizations/grant-just-in-time-membership', '/organizations/configure/grant-just-in-time-membership'],
    to: '/manage-users/organizations/configure-organizations/grant-just-in-time-membership',
  },
  {
    from: ['/organizations/assign-members', '/organizations/configure/assign-members'],
    to: '/manage-users/organizations/configure-organizations/assign-members',
  },
  {
    from: ['/organizations/remove-members', '/organizations/configure/remove-members'],
    to: '/manage-users/organizations/configure-organizations/remove-members',
  },
  {
    from: ['/organizations/add-member-roles', '/organizations/configure/add-member-roles'],
    to: '/manage-users/organizations/configure-organizations/add-member-roles',
  },
  {
    from: ['/organizations/remove-member-roles', '/organizations/configure/remove-member-roles'],
    to: '/manage-users/organizations/configure-organizations/remove-member-roles',
  },
  {
    from: ['/organizations/retrieve-organizations', '/organizations/configure/retrieve-organizations'],
    to: '/manage-users/organizations/configure-organizations/retrieve-organizations',
  },
  {
    from: ['/organizations/retrieve-connections', '/organizations/configure/retrieve-connections'],
    to: '/manage-users/organizations/configure-organizations/retrieve-connections',
  },
  {
    from: ['/organizations/retrieve-members', '/organizations/configure/retrieve-members'],
    to: '/manage-users/organizations/configure-organizations/retrieve-members',
  },
  {
    from: ['/organizations/retrieve-user-membership', '/organizations/configure/retrieve-user-membership'],
    to: '/manage-users/organizations/configure-organizations/retrieve-user-membership',
  },
  {
    from: ['/organizations/retrieve-member-roles', '/organizations/configure/retrieve-member-roles'],
    to: '/manage-users/organizations/configure-organizations/retrieve-member-roles',
  },
  {
    from: ['/organizations/using-tokens'],
    to: '/manage-users/organizations/using-tokens',
  },
  {
    from: ['/organizations/custom-development'],
    to: '/manage-users/organizations/custom-development',
  },
  {
    from: ['/organizations/create-first-organization'],
    to: '/manage-users/organizations/create-first-organization',
  },
  {
    from: ['/organizations/organizations-overview'],
    to: '/manage-users/organizations/organizations-overview',
  },

  /* LOGIN */

  {
    from: ['/flows/login', '/login'],
    to: '/authenticate/login',
  },
  {
    from: [
      '/hosted-pages/hosted-login-auth0js',
      '/hosted-pages/login/auth0js',
      '/hosted-pages/login/lock',
      '/hosted-pages/login/lock-passwordless',
      '/hosted-pages/hosted-login-auth0js/v7',
      '/hosted-pages/hosted-login-auth0js/v8',
      '/hosted-pages/login',
      '/hosted-pages',
      '/universal-login/customization-new',
      '/login_page',
      '/universal-login',
      '/login/universal-login',
    ],
    to: '/authenticate/login/auth0-universal-login',
  },
  {
    from: [
      '/universal-login/new-universal-login-vs-classic-universal-login',
      '/login/universal-login/new-universal-login-vs-classic-universal-login',
      '/authenticate/login/auth0-universal-login/new-universal-login-vs-classic-universal-login',
    ],
    to: '/authenticate/login/auth0-universal-login/universal-login-vs-classic-login',
  },
  {
    from: [
      '/universal-login/new-experience',
      '/universal-login/new',
      '/login/universal-login/new-experience',
      '/universal-login/new-experience-limitations',
      '/authenticate/login/auth0-universal-login/new-experience',
    ],
    to: '/authenticate/login/auth0-universal-login/universal-login-vs-classic-login/universal-experience',
  },
  {
    from: [
      '/universal-login/classic-experience',
      '/universal-login/classic',
      '/login/universal-login/classic-experience',
      '/authenticate/login/auth0-universal-login/classic-experience',
    ],
    to: '/authenticate/login/auth0-universal-login/universal-login-vs-classic-login/classic-experience',
  },
  {
    from: [
      '/dashboard/guides/universal-login/configure-login-page-passwordless',
      '/dashboard/guides/connections/configure-passwordless-sms',
      '/universal-login/configure-universal-login-with-passwordless',
      '/login/universal-login/passwordless-login/configure-universal-login-with-passwordless',
      '/login/universal-login/passwordless-login',
    ],
    to: '/authenticate/login/auth0-universal-login/passwordless-login',
  },
  {
    from: [
      '/universal-login/universal-vs-embedded-login',
      '/guides/login/universal-vs-embedded',
      '/guides/login/centralized-vs-embedded',
      '/login/universal-vs-embedded-login',
      '/libraries/when-to-use-lock',
    ],
    to: '/authenticate/login/universal-vs-embedded-login',
  },
  {
    from: [
      '/universal-login/configure-default-login-routes',
      '/universal-login/default-login-url',
      '/hosted-pages/default-login-url',
      '/login/universal-login/configure-default-login-routes',
    ],
    to: '/authenticate/login/auth0-universal-login/configure-default-login-routes',
  },
  {
    from: [
      '/universal-login/error-pages',
      '/error-pages',
      '/error-pages/generic',
      '/hosted-pages/error-pages',
      '/login/universal-login/error-pages',
    ],
    to: '/authenticate/login/auth0-universal-login/error-pages',
  },
  {
    from: ['/universal-login/identifier-first', '/login/universal-login/identifier-first'],
    to: '/authenticate/login/auth0-universal-login/identifier-first',
  },
  {
    from: ['/login/embedded', '/flows/login/embedded', '/flows/login/embedded-login', '/login/embedded-login'],
    to: '/authenticate/login/embedded-login',
  },
  {
    from: [
      '/cross-origin-authentication',
      '/flows/login/embedded-login/cross-origin-authentication',
      '/login/cross-origin-authentication',
    ],
    to: '/authenticate/login/cross-origin-authentication',
  },
  {
    from: [
      '/authorization/configure-silent-authentication',
      '/api-auth/tutorials/silent-authentication',
      '/login/configure-silent-authentication',
    ],
    to: '/authenticate/login/configure-silent-authentication',
  },
  {
    from: ['/authentication', '/login/authentication'],
    to: '/authenticate',
  },
  {
    from: [
      '/flows/guides/auth-code/add-login-auth-code',
      '/flows/guides/auth-code/includes/authorize-user-add-login',
      '/flows/guides/auth-code/includes/sample-use-cases-add-login',
      '/flows/guides/auth-code/includes/refresh-tokens',
      '/flows/guides/auth-code/includes/request-tokens',
      '/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow',
      '/oauth-web-protocol',
      '/protocols/oauth-web-protocol',
      '/protocols/oauth2/oauth-web-protocol',
      '/application-auth/current/server-side-web',
      '/client-auth/server-side-web',
      '/application-auth/legacy/server-side-web',
      '/flows/add-login-auth-code-flow',
      '/login/authentication/add-login-auth-code-flow',
      '/get-started/authentication-and-authorization-flow/add-login-auth-code-flow',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow/add-login-auth-code-flow',
  },
  {
    from: [
      '/flows/guides/auth-code-pkce/add-login-auth-code-pkce',
      '/flows/guides/auth-code-pkce/includes/sample-use-cases-add-login',
      '/flows/guides/auth-code-pkce/includes/request-tokens',
      '/flows/guides/auth-code-pkce/includes/refresh-tokens',
      '/flows/guides/auth-code-pkce/includes/create-code-verifier',
      '/flows/guides/auth-code-pkce/includes/create-code-challenge',
      '/flows/guides/auth-code-pkce/includes/authorize-user-add-login',
      '/application-auth/current/mobile-desktop',
      '/application-auth/legacy/mobile-desktop',
      '/application-auth/legacy/mobile-desktop',
      '/flows/guides/mobile-login-flow/add-login-using-mobile-login-flow',
      '/flows/add-login-using-the-authorization-code-flow-with-pkce',
      '/login/authentication/add-login-using-the-authorization-code-flow-with-pkce',
      '/get-started/authentication-and-authorization-flow/add-login-using-the-authorization-code-flow-with-pkce',
    ],
    to: '/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce/add-login-using-the-authorization-code-flow-with-pkce',
  },
  {
    from: [
      '/flows/guides/implicit/add-login-implicit',
      '/flows/guides/implicit/includes/sample-use-cases-add-login',
      '/flows/guides/implicit/includes/refresh-tokens',
      '/flows/guides/implicit/includes/request-tokens',
      '/flows/guides/implicit/includes/authorize-user-add-login',
      '/application-auth/current/client-side-web',
      '/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow',
      '/client-auth/client-side-web',
      '/application-auth/legacy/client-side-web',
      '/flows/add-login-using-the-implicit-flow-with-form-post',
      '/login/authentication/add-login-using-the-implicit-flow-with-form-post',
      '/get-started/authentication-and-authorization-flow/add-login-using-the-implicit-flow-with-form-post',
    ],
    to: '/get-started/authentication-and-authorization-flow/implicit-flow-with-form-post/add-login-using-the-implicit-flow-with-form-post',
  },
  {
    from: [
      '/tutorials/redirecting-users',
      '/users/redirecting-users',
      '/users/guides/redirect-users-after-login',
      '/protocols/oauth2/redirect-users',
      '/users/concepts/redirect-users-after-login',
      '/users/redirect-users-after-login',
      '/login/redirect-users-after-login',
    ],
    to: '/authenticate/login/redirect-users-after-login',
  },
  {
    from: [
      '/universal-login/configure-universal-login-with-passwordless/webauthn-device-biometrics',
      '/login/universal-login/passwordless-login/webauthn-device-biometrics',
    ],
    to: '/authenticate/login/auth0-universal-login/passwordless-login/webauthn-device-biometrics',
  },

  /* LOGOUT */

  {
    from: ['/logout', '/login/logout'],
    to: '/authenticate/login/logout',
  },
  {
    from: [
      '/logout/log-users-out-of-applications',
      '/logout/guides/logout-applications',
      '/login/logout/log-users-out-of-applications',
    ],
    to: '/authenticate/login/logout/log-users-out-of-applications',
  },
  {
    from: ['/logout/log-users-out-of-auth0', '/logout/guides/logout-auth0', '/login/logout/log-users-out-of-auth0'],
    to: '/authenticate/login/logout/log-users-out-of-auth0',
  },
  {
    from: ['/logout/log-users-out-of-idps', '/logout/guides/logout-idps', '/login/logout/log-users-out-of-idps'],
    to: '/authenticate/login/logout/log-users-out-of-idps',
  },
  {
    from: [
      '/logout/log-users-out-of-saml-idps',
      '/protocols/saml/saml-configuration/logout',
      '/logout/guides/logout-saml-idps',
      '/login/logout/log-users-out-of-saml-idps',
    ],
    to: '/authenticate/login/logout/log-users-out-of-saml-idps',
  },
  {
    from: [
      '/logout/redirect-users-after-logout',
      '/logout/guides/redirect-users-after-logout',
      '/login/logout/redirect-users-after-logout',
    ],
    to: '/authenticate/login/logout/redirect-users-after-logout',
  },
  {
    from: ['/back-channel-logout'],
    to: '/authenticate/login/logout/back-channel-logout',
  },
  {
    from: ['/configure-back-channel-logout'],
    to: '/authenticate/login/logout/back-channel-logout/configure-back-channel-logout',
  },

  /* Monitor - Logs */

  {
    from: ['/logs', '/logs/concepts/logs-admins-devs', '/monitor-auth0/logs'],
    to: '/deploy-monitor/logs',
  },
  {
    from: [
      '/logs/pii-in-logs',
      '/logs/personally-identifiable-information-pii-in-auth0-logs',
      '/monitor-auth0/logs/pii-in-logs',
    ],
    to: '/deploy-monitor/logs/pii-in-logs',
  },
  {
    from: ['/logs/log-data-retention', '/logs/references/log-data-retention', '/monitor-auth0/logs/log-data-retention'],
    to: '/deploy-monitor/logs/log-data-retention',
  },
  {
    from: [
      '/logs/view-log-events',
      '/logs/guides/view-log-data-dashboard',
      '/logs/view-log-events-in-the-dashboard',
      '/monitor-auth0/logs/view-log-events',
    ],
    to: '/deploy-monitor/logs/view-log-events',
  },
  {
    from: ['/logs/log-event-filters', '/logs/references/log-event-filters', '/monitor-auth0/logs/log-event-filters'],
    to: '/deploy-monitor/logs/log-event-filters',
  },
  {
    from: [
      '/logs/retrieve-log-events-using-mgmt-api',
      '/logs/guides/retrieve-logs-mgmt-api',
      '/monitor-auth0/logs/retrieve-log-events-using-mgmt-api',
    ],
    to: '/deploy-monitor/logs/retrieve-log-events-using-mgmt-api',
  },
  {
    from: [
      '/logs/log-event-type-codes',
      '/logs/references/log-event-data',
      '/logs/references/log-events-data',
      '/logs/references/log-event-type-codes',
      '/monitor-auth0/logs/log-event-type-codes',
    ],
    to: '/deploy-monitor/logs/log-event-type-codes',
  },
  {
    from: [
      '/logs/log-search-query-syntax',
      '/logs/references/query-syntax',
      '/logs/query-syntax',
      '/monitor-auth0/logs/log-search-query-syntax',
    ],
    to: '/deploy-monitor/logs/log-search-query-syntax',
  },
  {
    from: [
      '/monitoring/guides/send-events-to-splunk',
      '/monitoring/guides/send-events-to-keenio',
      '/monitoring/guides/send-events-to-segmentio',
      '/logs/export-log-events-with-rules',
      '/monitor-auth0/logs/export-log-events-with-rules',
    ],
    to: '/deploy-monitor/logs/export-log-events-with-rules',
  },
  {
    from: ['/logs/export-log-events-with-log-streaming', '/logs/streams', '/monitor-auth0/streams'],
    to: '/customize/log-streams',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-http-event-logs',
      '/logs/streams/http-event',
      '/logs/streams/stream-http-event-logs',
      '/monitor-auth0/streams/custom-log-streams',
    ],
    to: '/customize/log-streams/custom-log-streams',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-log-events-to-slack',
      '/logs/streams/http-event-to-slack',
      '/monitor-auth0/streams/stream-log-events-to-slack',
    ],
    to: 'https://marketplace.auth0.com/integrations/slack-log-streaming',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-logs-to-splunk',
      '/logs/streams/splunk',
      '/logs/streams/stream-logs-to-splunk',
      '/monitor-auth0/streams/stream-logs-to-splunk',
    ],
    to: 'https://marketplace.auth0.com/integrations/splunk-log-streaming',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-logs-to-amazon-eventbridge',
      '/logs/streams/aws-eventbridge',
      '/integrations/aws-eventbridge',
      '/logs/streams/amazon-eventbridge',
      '/logs/streams/stream-logs-to-amazon-eventbridge',
      '/monitor-auth0/streams/stream-logs-to-amazon-eventbridge',
    ],
    to: 'https://marketplace.auth0.com/integrations/amazon-log-streaming',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-logs-to-azure-event-grid',
      '/logs/streams/azure-event-grid',
      '/logs/streams/stream-logs-to-azure-event-grid',
      '/monitor-auth0/streams/stream-logs-to-azure-event-grid',
    ],
    to: 'https://marketplace.auth0.com/integrations/azure-log-streaming',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-logs-to-datadog',
      '/logs/streams/datadog',
      '/logs/streams/stream-logs-to-datadog',
      '/monitor-auth0/streams/stream-logs-to-datadog',
    ],
    to: 'https://marketplace.auth0.com/integrations/datadog-log-streaming',
  },
  {
    from: ['/monitor-auth0/streams/stream-logs-to-sumo-logic', '/logs/streams/stream-logs-to-sumo-logic'],
    to: 'https://marketplace.auth0.com/integrations/sumo-logic-log-streaming',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/datadog-dashboard-templates',
      '/logs/streams/datadog-dashboard-templates',
      '/monitor-auth0/streams/datadog-dashboard-templates',
    ],
    to: '/customize/log-streams/datadog-dashboard-templates',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/splunk-dashboard',
      '/logs/streams/splunk-dashboard',
      '/monitor-auth0/streams/splunk-dashboard',
    ],
    to: '/customize/log-streams/splunk-dashboard',
  },
  {
    from: ['/logs/streams/sumo-logic-dashboard', '/monitor-auth0/streams/sumo-logic-dashboard'],
    to: '/customize/log-streams/sumo-logic-dashboard',
  },
  {
    from: ['/logs/streams/event-filters', '/monitor-auth0/streams/event-filters'],
    to: '/customize/log-streams/event-filters',
  },

  /* MFA */

  {
    from: [
      '/multi-factor-authentication',
      '/multi-factor-authentication2',
      '/multifactor-authentication/custom-provider',
      '/multifactor-authentication',
      '/mfa-in-auth0',
      '/multifactor-authentication/yubikey',
      '/multifactor-authentication/guardian',
      '/multifactor-authentication/guardian/user-guide',
      '/multi-factor-authentication/yubikey',
      '/mfa',
      '/login/mfa',
    ],
    to: '/secure/multi-factor-authentication',
  },
  {
    from: ['/mfa/enable-mfa', '/mfa/guides/enable-mfa', '/login/mfa/enable-mfa'],
    to: '/secure/multi-factor-authentication/enable-mfa',
  },
  {
    from: [
      '/mfa/mfa-factors',
      '/multifactor-authentication/factors',
      '/mfa/concepts/mfa-factors',
      '/login/mfa/mfa-factors',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-factors',
  },
  {
    from: [
      '/multifactor-authentication/developer/sns-configuration',
      '/multifactor-authentication/factors/push',
      '/mfa/guides/configure-push',
      '/multifactor-authentication/administrator/push-notifications',
      '/mfa/configure-push-notifications-for-mfa',
      '/login/mfa/mfa-factors/configure-push-notifications-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa',
  },
  {
    from: [
      '/multifactor-authentication/administrator/twilio-configuration',
      '/multifactor-authentication/administrator/sms-notifications',
      '/multifactor-authentication/twilio-configuration',
      '/multifactor-authentication/factors/sms',
      '/mfa/guides/configure-sms',
      '/mfa/guides/configure-phone',
      '/mfa/configure-sms-voice-notifications-mfa',
      '/login/mfa/mfa-factors/configure-sms-voice-notifications-mfa',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa',
  },
  {
    from: [
      '/multifactor-authentication/factors/otp',
      '/mfa/guides/configure-otp',
      '/mfa/configure-otp-notifications-for-mfa',
      '/login/mfa/mfa-factors/configure-otp-notifications-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-otp-notifications-for-mfa',
  },
  {
    from: [
      '/mfa/guides/configure-email-universal-login',
      '/multifactor-authentication/factors/email',
      '/mfa/guides/configure-email',
      '/mfa/configure-email-notifications-for-mfa',
      '/login/mfa/mfa-factors/configure-email-notifications-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-email-notifications-for-mfa',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-amazon-sns',
      '/mfa/send-phone-message-hook-amazon-sns',
      '/mfa/configure-amazon-sns-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-amazon-sns-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-amazon-sns-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-amazon-sns-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-esendex',
      '/mfa/send-phone-message-hook-esendex',
      '/mfa/configure-esendex-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-esendex-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-esendex-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-esendex-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-infobip',
      '/mfa/send-phone-message-hook-infobip',
      '/mfa/configure-infobip-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-infobip-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-infobip-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-infobip-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-mitto',
      '/mfa/send-phone-message-hook-mitto',
      '/mfa/configure-mitto-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-mitto-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-mitto-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-mitto-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-telesign',
      '/mfa/send-phone-message-hook-telesign',
      '/mfa/configure-telesign-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-telesign-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-telesign-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-telesign-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: ['/mfa/webauthn-as-mfa'],
    to: '/secure/multi-factor-authentication/webauthn-as-mfa',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-twilio',
      '/mfa/send-phone-message-hook-twilio',
      '/mfa/configure-twilio-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-twilio-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-twilio-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-twilio-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-vonage',
      '/mfa/send-phone-message-hook-vonage',
      '/mfa/configure-vonage-as-mfa-sms-provider',
      '/login/mfa/mfa-factors/configure-vonage-as-mfa-sms-provider',
      '/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-vonage-as-mfa-sms-provider',
      '/customize/hooks/extensibility-points/send-phone-message/configure-vonage-as-mfa-sms-provider',
    ],
    to: '/customize/actions/flows-and-triggers',
  },
  {
    from: [
      '/multifactor-authentication/factors/duo',
      '/multifactor-authentication/duo',
      '/multifactor-authentication/duo/admin-guide',
      '/mfa/guides/configure-cisco-duo',
      '/multifactor-authentication/duo/dev-guide',
      '/multifactor-authentication/duo/user-guide',
      '/mfa/configure-cisco-duo-for-mfa',
      '/login/mfa/configure-cisco-duo-for-mfa',
      '/login/mfa/mfa-factors/configure-cisco-duo-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/configure-cisco-duo-for-mfa',
  },
  {
    from: ['/mfa/fido-authentication-with-webauthn', '/login/mfa/fido-authentication-with-webauthn'],
    to: '/secure/multi-factor-authentication/fido-authentication-with-webauthn',
  },
  {
    from: [
      '/mfa/configure-webauthn-security-keys-for-mfa',
      '/mfa/configure-webauthn-with-security-keys-for-mfa',
      '/login/mfa/fido-authentication-with-webauthn/configure-webauthn-security-keys-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-security-keys-for-mfa',
  },
  {
    from: [
      '/mfa/configure-webauthn-device-biometrics-for-mfa',
      '/login/mfa/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa',
    ],
    to: '/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa',
  },
  {
    from: ['/mfa/adaptive-mfa', '/login/mfa/adaptive-mfa'],
    to: '/secure/multi-factor-authentication/adaptive-mfa',
  },
  {
    from: ['/mfa/adaptive-mfa/enable-adaptive-mfa', '/login/mfa/adaptive-mfa/enable-adaptive-mfa'],
    to: '/secure/multi-factor-authentication/adaptive-mfa/enable-adaptive-mfa',
  },
  {
    from: [
      '/mfa/adpative-mfa/adaptive-mfa-rule-actions', 
      '/login/mfa/adaptive-mfa/adaptive-mfa-rule-actions', 
      '/secure/multi-factor-authentication/adaptive-mfa/adaptive-mfa-rule-actions',
      '/secure/multi-factor-authentication/adaptive-mfa/adaptive-mfa-rules',
      ],
    to: '/secure/multi-factor-authentication/adaptive-mfa/customize-adaptive-mfa',
  },
  {
    from: ['/mfa/adaptive-mfa/adaptive-mfa-log-events', '/login/mfa/adaptive-mfa/adaptive-mfa-log-events'],
    to: '/secure/multi-factor-authentication/adaptive-mfa/adaptive-mfa-log-events',
  },
  {
    from: [
      '/mfa/concepts/guardian',
      '/multifactor-authentication/guardian/dev-guide',
      '/multifactor-authentication/guardian/admin-guide',
      '/mfa/auth0-guardian',
      '/login/mfa/auth0-guardian',
    ],
    to: '/secure/multi-factor-authentication/auth0-guardian',
  },
  {
    from: [
      '/mfa/auth0-guardian/install-guardian-sdk',
      '/mfa/guides/guardian/install-guardian-sdk',
      '/login/mfa/auth0-guardian/install-guardian-sdk',
      '/secure/multi-factor-authentication/auth0-guardian/install-guardian-sdk',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/install-guardian-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/libraries/ios',
      '/mfa/guides/guardian/guardian-ios-sdk',
      '/mfa/guides/guardian/configure-guardian-ios',
      '/mfa/auth0-guardian/guardian-for-ios-sdk',
      '/login/mfa/auth0-guardian/guardian-for-ios-sdk',
    ],
    to: '/secure/multi-factor-authentication/auth0-guardian/guardian-for-ios-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/libraries/android',
      '/mfa/guides/guardian/guardian-android-sdk',
      '/mfa/auth0-guardian/guardian-for-android-sdk',
      '/login/mfa/auth0-guardian/guardian-for-android-sdk',
    ],
    to: '/secure/multi-factor-authentication/auth0-guardian/guardian-for-android-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/custom-enrollment-ticket',
      '/mfa/guides/guardian/create-enrollment-ticket',
      '/mfa/auth0-guardian/create-custom-enrollment-tickets',
      '/login/mfa/auth0-guardian/create-custom-enrollment-tickets',
      '/secure/multi-factor-authentication/auth0-guardian/create-custom-enrollment-tickets',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/create-custom-enrollment-tickets',
  },
  {
    from: [
      '/mfa/auth0-guardian/guardian-error-code-reference',
      '/mfa/references/guardian-error-code-reference',
      '/login/mfa/auth0-guardian/guardian-error-code-reference',
      '/secure/multi-factor-authentication/auth0-guardian/guardian-error-code-reference'
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/guardian-error-code-reference',
  },
  {
    from: [
      '/multifactor-authentication/custom',
      '/mfa/guides/customize-mfa-universal-login',
      '/multifactor-authentication/google-auth/dev-guide',
      '/mfa/customize-mfa-user-pages',
      '/login/mfa/customize-mfa-user-pages',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa',
  },
  {
    from: [
      '/secure/multi-factor-authentication/customize-mfa-selection-nul',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa/customize-mfa-selection-universal-login',
  },
  {
    from: [
      '/secure/multi-factor-authentication/customize-mfa-enrollments',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa/customize-mfa-enrollments-universal-login',
  },
  {
    from: [
      '/universal-login/multifactor-authentication',
      '/hosted-pages/guardian',
      '/universal-login/guardian',
      '/universal-login/classic-experience/mfa-classic-experience',
      '/login/mfa/customize-mfa-user-pages/mfa-classic-experience',
      '/secure/multi-factor-authentication/customize-mfa/mfa-classic-experience',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa/customize-mfa-classic-login',
  },
  {
    from: [
      '/mfa/customize-mfa-user-pages/mfa-theme-language-dictionary',
      '/mfa/references/language-dictionary',
      '/login/mfa/customize-mfa-user-pages/mfa-theme-language-dictionary',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa/mfa-theme-language-dictionary',
  },
  {
    from: [
      '/mfa/customize-mfa-user-pages/mfa-widget-theme-options',
      '/mfa/references/mfa-widget-reference',
      '/login/mfa/customize-mfa-user-pages/mfa-widget-theme-options',
    ],
    to: '/secure/multi-factor-authentication/customize-mfa/mfa-widget-theme-options',
  },
  {
    from: [
      '/api-auth/tutorials/multifactor-resource-owner-password',
      '/mfa/guides/mfa-api/authenticate',
      '/mfa/guides/mfa-api/multifactor-resource-owner-password',
      '/mfa/authenticate-with-ropg-and-mfa',
      '/login/mfa/ropg-mfa',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa',
  },
  {
    from: [
      '/mfa/guides/mfa-api/phone',
      '/multifactor-authentication/api/oob',
      '/mfa/guides/mfa-api/oob',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-challenge-sms-voice-authenticators',
      '/login/mfa/ropg-mfa/enroll-challenge-sms-voice-authenticators',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-challenge-sms-voice-authenticators',
  },
  {
    from: [
      '/mfa/guides/mfa-api/push',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-push-authenticators',
      '/login/mfa/ropg-mfa/enroll-and-challenge-push-authenticators',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-push-authenticators',
  },
  {
    from: [
      '/multifactor-authentication/api/otp',
      '/mfa/guides/mfa-api/otp',
      '/multifactor-authentication/google-authenticator',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-otp-authenticators',
      '/login/mfa/ropg-mfa/enroll-and-challenge-otp-authenticators',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-otp-authenticators',
  },
  {
    from: [
      '/multifactor-authentication/api/email',
      '/mfa/guides/mfa-api/email',
      '/multifactor-authentication/administrator/guardian-enrollment-email',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-email-authenticators',
      '/login/mfa/ropg-mfa/enroll-and-challenge-email-authenticators',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/enroll-and-challenge-email-authenticators',
  },
  {
    from: [
      '/mfa/import-user-mfa-authenticator-enrollments',
      '/mfa/guides/import-user-mfa',
      '/login/mfa/ropg-mfa/import-user-mfa-authenticator-enrollments',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/import-user-mfa-authenticator-enrollments',
  },
  {
    from: [
      '/mfa/guides/mfa-api/recovery-code',
      '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api/challenge-with-recovery-codes',
      '/login/mfa/ropg-mfa/challenge-with-recovery-codes',
    ],
    to: '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/challenge-with-recovery-codes',
  },
  {
    from: [
      '/mfa/guides/mfa-api/manage',
      '/multifactor-authentication/api/manage',
      '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api',
      '/login/mfa/ropg-mfa/manage-authenticator-factors-mfa-api',
      '/secure/multi-factor-authentication/authenticate-using-ropg-flow-with-mfa/manage-authenticator-factors-mfa-api',
    ],
    to: '/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authenticator-factors-mfa-api',
  },
  {
    from: [
      '/multifactor-authentication/developer/step-up-authentication',
      '/step-up-authentication',
      '/tutorials/step-up-authentication',
      '/tutorials/setup-up-authentication',
      '/multifactor-authentication/step-up-authentication',
      '/mfa/concepts/step-up-authentication',
      '/multifactor-authentication/developer/step-up-with-acr',
      '/mfa/step-up-authentication',
      '/login/mfa/step-up-authentication',
    ],
    to: '/secure/multi-factor-authentication/step-up-authentication',
  },
  {
    from: [
      '/multifactor-authentication/api/challenges',
      '/multifactor-authentication/developer/step-up-authentication/step-up-for-apis',
      '/multifactor-authentication/step-up-authentication/step-up-for-apis',
      '/mfa/guides/configure-step-up-apis',
      '/mfa/step-up-authentication/configure-step-up-authentication-for-apis',
      '/login/mfa/step-up-authentication/configure-step-up-authentication-for-apis',
    ],
    to: '/secure/multi-factor-authentication/step-up-authentication/configure-step-up-authentication-for-apis',
  },
  {
    from: [
      '/multifactor-authentication/developer/step-up-authentication/step-up-for-web-apps',
      '/multifactor-authentication/step-up-authentication/step-up-for-web-apps',
      '/mfa/guides/configure-step-up-web-apps',
      '/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps',
      '/login/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps',
    ],
    to: '/secure/multi-factor-authentication/step-up-authentication/configure-step-up-authentication-for-web-apps',
  },
  {
    from: [
      '/multifactor-authentication/reset-user',
      '/multifactor-authentication/administrator/reset-user',
      '/mfa/guides/reset-user-mfa',
      '/multifactor-authentication/administrator/disabling-mfa',
      '/mfa/reset-user-mfa',
      '/login/mfa/reset-user-mfa',
    ],
    to: '/secure/multi-factor-authentication/reset-user-mfa',
  },
  {
    from: [
      '/mfa/concepts/mfa-developer-resources',
      '/multifactor-authentication/developer',
      '/mfa/concepts/developer-resources',
      '/mfa/mfa-developer-resources',
      '/login/mfa/mfa-developer-resources',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-developer-resources',
  },
  {
    from: [
      '/multifactor-authentication/api',
      '/multifactor-authentication/api/faq',
      '/mfa/concepts/mfa-api',
      '/mfa/mfa-api',
      '/login/mfa/mfa-developer-resources/mfa-api',
    ],
    to: '/secure/multi-factor-authentication/multi-factor-authentication-developer-resources/mfa-api',
  },

  /* Monitoring */

  {
    from: ['/monitoring', '/tutorials/how-to-monitor-auth0', '/monitoring/how-to-monitor-auth0', '/monitor-auth0'],
    to: '/deploy-monitor/monitor',
  },
  {
    from: ['/monitoring/guides/check-external-services', '/monitor-auth0/check-external-services-status'],
    to: '/deploy-monitor/monitor/check-external-services-status',
  },
  {
    from: ['/monitoring/guides/check-status', '/monitor-auth0/check-auth0-status'],
    to: '/deploy-monitor/monitor/check-auth0-status',
  },
  {
    from: ['/monitoring/guides/monitor-applications', '/monitor-auth0/monitor-applications'],
    to: '/deploy-monitor/monitor/monitor-applications',
  },
  {
    from: ['/monitoring/guides/monitor-using-SCOM', '/monitor-auth0/monitor-using-scom'],
    to: '/deploy-monitor/monitor/monitor-using-scom',
  },

  /* Product-Lifecycle */

  {
    from: ['/lifecycle', '/product-lifecycle'],
    to: '/troubleshoot/product-lifecycle',
  },
  {
    from: ['/product-lifecycle/deprecation-eol', '/product-lifecycle/migration-process'],
    to: '/troubleshoot/product-lifecycle/migration-process',
  },
  {
    from: ['/product-lifecycle/product-release-stages'],
    to: '/troubleshoot/product-lifecycle/product-release-stages',
  },
  {
    from: ['/product-lifecycle/migrations', '/migrations', '/product-lifecycle/deprecations-and-migrations'],
    to: '/troubleshoot/product-lifecycle/deprecations-and-migrations',
  },
  {
    from: [
      '/deprecations-and-migrations/migrate-tenant-member-roles',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-manage-dashboard-new-roles',
      '/product-lifecycle/deprecations-and-migrations/migrate-tenant-member-roles',
      '/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-tenant-member-roles',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-tenant-member-roles',
  },
  {
    from: [
      '/guides/login/migration-embedded-universal',
      '/guides/login/migration-embedded-centralized',
      '/guides/login/migrating-lock-v10-webapp',
      '/guides/login/migrating-lock-v9-spa',
      '/guides/login/migrating-lock-v9-spa-popup',
      '/guides/login/migrating-lock-v9-webapp',
      '/guides/login/migrating-lock-v10-spa',
      '/guides/login/migrating-lock-v8',
      '/guides/login/migration-sso',
      '/product-lifecycle/deprecations-and-migrations/migrate-from-embedded-login-to-universal-login',
      '/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-from-embedded-login-to-universal-login',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-from-embedded-login-to-universal-login',
  },
  {
    from: [
      '/users/user-search/migrate-v2-v3',
      '/users/search/v3/migrate-search-v2-v3',
      '/users/user-search/migrate-search-v2-v3',
      '/product-lifecycle/deprecations-and-migrations/migrate-v2-v3',
      '/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-v2-v3',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-v2-v3',
  },
  {
    from: [
      '/migrations/guides/unpaginated-requests',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-paginated-queries',
      '/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-paginated-queries',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-paginated-queries',
  },
  {
    from: [
      '/migrations/guides/extensibility-node12',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12',
      '/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-nodejs-12',
  },
  {
    from: [
      '/api/management/v1',
      '/api-reference',
      '/api/v1/reference',
      '/api/management/v1/reference',
      '/api/management/v2/changes',
      '/apiv2Changes',
      '/api/v2/changes',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-management-api-v2',
      '/api/management-api-v1-deprecated',
      '/api/management-api-changes-v1-to-v2',
      '/migrations/guides/management-api-v1-v2',
      '/api/management/v1/use-cases',
      '/api/v1',
      '/migrations/past-migrations',
      '/product-lifecycle/deprecations-and-migrations/past-migrations',
      '/product-lifecycle/past-migrations',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations',
  },
  {
    from: [
      '/migrations/guides/passwordless-start',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-passwordless',
      '/product-lifecycle/past-migrations/migrate-to-passwordless',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-passwordless',
  },
  {
    from: [
      '/migrations/guides/clickjacking-protection',
      '/product-lifecycle/deprecations-and-migrations/clickjacking-protection-for-universal-login',
      '/product-lifecycle/past-migrations/clickjacking-protection-for-universal-login',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/clickjacking-protection-for-universal-login',
  },
  {
    from: [
      '/migrations/guides/calling-api-with-idtokens',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-calling-api-with-access-tokens',
      '/product-lifecycle/past-migrations/migrate-to-calling-api-with-access-tokens',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-calling-api-with-access-tokens',
  },
  {
    from: [
      '/migrations/guides/account-linking',
      '/users/guides/link-user-accounts-auth-api',
      '/product-lifecycle/deprecations-and-migrations/link-user-accounts-with-access-tokens-migration',
      '/product-lifecycle/past-migrations/link-user-accounts-with-access-tokens-migration',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/link-user-accounts-with-access-tokens-migration',
  },
  {
    from: [
      '/migrations/guides/migration-oauthro-oauthtoken',
      '/product-lifecycle/deprecations-and-migrations/migration-oauthro-oauthtoken',
      '/product-lifecycle/past-migrations/migration-oauthro-oauthtoken',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migration-oauthro-oauthtoken',
  },
  {
    from: [
      '/migrations/guides/instagram-deprecation',
      '/instagram-clientid',
      '/product-lifecycle/deprecations-and-migrations/instagram-connection-deprecation',
      '/product-lifecycle/past-migrations/instagram-connection-deprecation',
      '/connections/social/instagram',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/instagram-connection-deprecation',
  },
  {
    from: [
      '/migrations/guides/yahoo-userinfo-updates',
      '/product-lifecycle/deprecations-and-migrations/yahoo-api-changes',
      '/product-lifecycle/past-migrations/yahoo-api-changes',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/yahoo-api-changes',
  },
  {
    from: [
      '/migrations/guides/google_cloud_messaging',
      '/product-lifecycle/deprecations-and-migrations/google-firebase-migration',
      '/product-lifecycle/past-migrations/google-firebase-migration',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/google-firebase-migration',
  },
  {
    from: [
      '/migrations/guides/facebook-social-context',
      '/product-lifecycle/deprecations-and-migrations/facebook-social-context-field-deprecation',
      '/product-lifecycle/past-migrations/facebook-social-context-field-deprecation',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/facebook-social-context-field-deprecation',
  },
  {
    from: [
      '/migrations/guides/facebook-graph-api-deprecation',
      '/product-lifecycle/deprecations-and-migrations/facebook-graph-api-changes',
      '/product-lifecycle/past-migrations/facebook-graph-api-changes',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/facebook-graph-api-changes',
  },
  {
    from: [
      '/logs/guides/migrate-logs-v2-v3',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3',
      '/product-lifecycle/past-migrations/migrate-to-tenant-log-search-v3',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-tenant-log-search-v3',
  },
  {
    from: [
      '/migrations/guides/migration-oauthro-oauthtoken-pwdless',
      '/product-lifecycle/deprecations-and-migrations/resource-owner-passwordless-credentials-exchange',
      '/product-lifecycle/past-migrations/resource-owner-passwordless-credentials-exchange',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/resource-owner-passwordless-credentials-exchange',
  },
  {
    from: [
      '/product-lifecycle/deprecations-and-migrations/migrate-from-legacy-auth-flows',
      '/guides/migration-legacy-flows',
      '/product-lifecycle/past-migrations/migrate-from-legacy-auth-flows',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-from-legacy-auth-flows',
  },
  {
    from: [
        '/product-lifecycle/deprecations-and-migrations/tenant-hostname-migration',
        '/troubleshoot/product-lifecycle/deprecations-and-migrations/tenant-hostname-migration',
    ],
    to: '/troubleshoot/product-lifecycle/past-migrations/tenant-hostname-migration',
  },
  {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-from-edge-js-extensibility-features'],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-from-edge-js-extensibility-features',
  },
  
  {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-from-oracledb-extensibility-features'],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-from-oracledb-extensibility-features',
  },
  
  {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/custom-claims-migration'],
    to: '/troubleshoot/product-lifecycle/past-migrations/custom-claims-migration',
  },
  
  {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-actions-nodejs-16-to-nodejs-18'],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-actions-nodejs-16-to-nodejs-18',
  },
  
   {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-16'],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-nodejs-16',
  },
  
  {
    from: ['/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-from-log-extensions'],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-from-log-extensions',
  },
  {
    from: [`/troubleshoot/product-lifecycle/deprecations-and-migrations/migrate-to-1-hour-expiration`],
    to: '/troubleshoot/product-lifecycle/past-migrations/migrate-to-1-hour-expiration',
  },

  /* Professional Services */

  {
    from: [
      '/services',
      '/auth0-professional-services',
      '/services/auth0-advanced',
      '/services/auth0-introduction',
      '/services/discover-and-design',
      '/services/maintain-and-improve',
      '/professional-services',
      '/troubleshoot/professional-services',
    ],
    to: '/get-started/professional-services',
  },
  {
    from: [
      '/services/architectural-design',
      '/professional-services/architectural-design-services',
      '/professional-services/solution-design-services',
      '/services/solution-design',
      '/professional-services/discover-design',
      '/troubleshoot/professional-services/discover-design',
    ],
    to: '/get-started/professional-services/discover-design',
  },
  {
    from: [
      '/professional-services/custom-implementation-services',
      '/services/custom-implementation',
      '/services/implement',
      '/professional-services/implement',
      '/troubleshoot/professional-services/implement',
    ],
    to: '/get-started/professional-services/implement',
  },
  {
    from: [
      '/services/performance-scalability',
      '/professional-services/performance-and-scalability-services',
      '/professional-services/advisory-sessions',
      '/services/scenario-guidance',
      '/services/code-review',
      '/services/pair-programming',
      '/professional-services/maintain-improve',
      '/troubleshoot/professional-services/maintain-improve',
    ],
    to: '/get-started/professional-services/maintain-improve',
  },
  {
    from: ['/services/packages', '/professional-services/packages', '/troubleshoot/professional-services/packages', 
    '/get-started/professional-services/packages'],
    to: '/get-started/professional-services',
  },

  /* Rules */

  {
    from: [
      '/rules/current',
      '/rules/current/csharp',
      '/rules/guides/csharp',
      '/rules/legacy',
      '/rules/references/legacy',
      '/rules/references/modules',
      '/rule',
      '/rules',
    ],
    to: '/customize/rules',
  },
  {
    from: [
      '/rules/guides/automatically-generate-leads-in-shopify',
      '/rules/guides/automatically-generate-leads-shopify',
      '/rules/automatically-generate-leads-in-shopify',
      '/customize/rules/use-cases/automatically-generate-leads-in-shopify',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: ['/rules/guides/cache-resources', '/rules/cache-expensive-resources-in-rules', '/rules/cache-resources'],
    to: '/customize/rules/cache-resources',
  },
  {
    from: ['/rules/guides/configuration', '/rules/configuration'],
    to: '/customize/rules/configuration',
  },
  {
    from: ['/dashboard/guides/rules/configure-variables', '/rules/configure-global-variables-for-rules'],
    to: '/customize/rules/configure-global-variables-for-rules',
  },
  {
    from: [
      '/rules/current/context',
      '/rules/context',
      '/rules/references/context-object',
      '/rules/context-prop-authentication',
      '/rules/context-object',
    ],
    to: '/customize/rules/context-object',
  },
  {
    from: [
      '/api/management/guides/rules/create-rules',
      '/dashboard/guides/rules/create-rules',
      '/rules/guides/create',
      '/rules/create-rules',
    ],
    to: '/customize/rules/create-rules',
  },
  {
    from: ['/rules/guides/debug', '/rules/debug-rules'],
    to: '/customize/rules/debug-rules',
  },
  {
    from: ['/rules/references/samples', '/rules/examples', '/customize/rules/examples'],
    to: '/customize/actions/actions-overview',
  },
  {
    from: [
      '/rules/guides/integrate-user-id-verification',
      '/rules/integrate-user-id-verification',
      '/customize/rules/use-cases/integrate-user-id-verification',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-efm-solutions',
      '/rules/integrate-efm-solutions',
      '/customize/rules/use-cases/integrate-efm-solutions',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-erfm-solutions',
      '/rules/integrate-erfm-solutions',
      '/customize/rules/use-cases/integrate-erfm-solutions',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-hubspot',
      '/rules/integrate-hubspot',
      '/customize/rules/use-cases/integrate-hubspot',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-maxmind',
      '/rules/integrate-maxmind',
      '/customize/rules/use-cases/integrate-maxmind',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-mixpanel',
      '/rules/integrate-mixpanel',
      '/customize/rules/use-cases/integrate-mixpanel',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/rules/guides/integrate-salesforce',
      '/rules/integrate-salesforce',
      '/customize/rules/use-cases/integrate-salesforce',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: ['/rules/current/redirect', '/rules/redirect', '/rules/guides/redirect', '/rules/redirect-users'],
    to: '/customize/rules/redirect-users',
  },
  {
    from: ['/rules/references/use-cases', '/rules/use-cases', '/customize/rules/use-cases'],
    to: '/customize/actions/use-cases',
  },
  {
    from: ['/rules/current/management-api', '/rules/guides/management-api', '/rules/use-management-api'],
    to: '/customize/rules/use-management-api',
  },
  {
    from: ['/rules/references/user-object', '/rules/user-object-in-rules'],
    to: '/customize/rules/user-object-in-rules',
  },
  {
    from: [
      '/monitoring/guides/track-leads-salesforce',
      '/tutorials/tracking-new-leads-in-salesforce-and-raplead',
      '/scenarios-rapleaf-salesforce',
      '/scenarios/rapleaf-salesforce',
      '/monitor-auth0/track-new-leads-in-salesforce',
      '/rules/use-cases/track-new-leads-in-salesforce',
      '/customize/rules/use-cases/track-new-leads-in-salesforce',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: [
      '/monitoring/guides/track-signups-salesforce',
      '/tutorials/track-signups-enrich-user-profile-generate-leads',
      '/scenarios-mixpanel-fullcontact-salesforce',
      '/scenarios/mixpanel-fullcontact-salesforce',
      '/monitor-auth0/track-new-sign-ups-in-salesforce',
      '/rules/use-cases/track-new-sign-ups-in-salesforce',
      '/customize/rules/use-cases/track-new-sign-ups-in-salesforce',
    ],
    to: '/customize/actions/use-cases',
  },
  {
    from: ['/rules/raise-errors-from-rules'],
    to: '/customize/rules/raise-errors-from-rules',
  },

  /* Security */
  {
    from: ['/security'],
    to: '/secure',
  },
  {
    from: ['/security/general-security-tips', '/security/tips'],
    to: '/secure/security-guidance/tips',
  },
  {
    from: [
      '/security/blacklist-user-attributes',
      '/security/blacklisting-attributes',
      '/tutorials/blacklisting-attributes',
      '/blacklist-attributes',
      '/security/denylist-user-attributes',
      '/security/data-security/denylist',
    ],
    to: '/secure/security-guidance/data-security/denylist',
  },
  {
    from: [
      '/security/whitelist-ip-addresses',
      '/guides/ip-whitelist',
      '/security/allowlist-ip-addresses',
      '/security/data-security/allowlist',
    ],
    to: '/secure/security-guidance/data-security/allowlist',
  },
  {
    from: [
      '/users/normalized/auth0/store-user-data',
      '/users/store-user-data',
      '/users/references/user-data-storage-scenario',
      '/users/user-data-storage-scenario',
      '/best-practices/user-data-storage-best-practices',
      '/users/references/user-data-storage-best-practices',
      '/users/user-data-storage',
      '/user-profile/user-data-storage',
      '/security/data-security/user-data-storage',
    ],
    to: '/secure/security-guidance/data-security/user-data-storage',
  },
  {
    from: [
      '/tokens/concepts/token-storage',
      '/videos/session-and-cookies',
      '/security/store-tokens',
      '/tokens/guides/store-tokens',
      '/tokens/token-storage',
      '/security/data-security/token-storage',
    ],
    to: '/secure/security-guidance/data-security/token-storage',
  },
  {
    from: ['/security/common-threats', '/security/prevent-common-cybersecurity-threats', '/security/prevent-threats'],
    to: '/secure/security-guidance/prevent-threats',
  },

  /* Security Bulletins */
  {
    from: ['/security/bulletins', '/security/security-bulletins'],
    to: '/secure/security-guidance/security-bulletins',
  },
  {
    from: [
      '/security/bulletins/cve-2020-15259',
      '/security/cve-2020-15259',
      '/security/security-bulletins/cve-2020-15259',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2020-15259',
  },
  {
    from: [
      '/security/bulletin/cve-2020-15240',
      '/security/cve-2020-15240',
      '/security/security-bulletins/cve-2020-15240',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2020-15240',
  },
  {
    from: [
      '/security/bulletins/cve-2020-15125',
      '/security/cve-2020-15125',
      '/security/security-bulletins/cve-2020-15125',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2020-15125',
  },
  {
    from: [
      '/security/bulletins/cve-2020-15084',
      '/security/cve-2020-15084',
      '/security/security-bulletins/cve-2020-15084',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2020-15084',
  },
  {
    from: [
      '/security/bulletins/2020-03-31_wpauth0',
      '/security/2020-03-31-wpauth0',
      '/security/security-bulletins/2020-03-31-wpauth0',
    ],
    to: '/secure/security-guidance/security-bulletins/2020-03-31-wpauth0',
  },
  {
    from: [
      '/security/bulletins/cve-2020-5263',
      '/security/cve-2020-5263',
      '/security/security-bulletins/cve-2020-5263',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2020-5263',
  },
  {
    from: [
      '/security/bulletins/2019-01-10_rules',
      '/security/2019-01-10-rules',
      '/security/security-bulletins/2019-01-10-rules',
    ],
    to: '/secure/security-guidance/security-bulletins/2019-01-10-rules',
  },
  {
    from: [
      '/security/bulletins/2019-09-05_scopes',
      '/security/2019-09-05-scopes',
      '/security/security-bulletins/2019-09-05-scopes',
    ],
    to: '/secure/security-guidance/security-bulletins/2019-09-05-scopes',
  },
  {
    from: [
      '/security/bulletins/cve-2019-20174',
      '/security/cve-2019-20174',
      '/security/security-bulletins/cve-2019-20174',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2019-20174',
  },
  {
    from: [
      '/security/bulletins/cve-2019-20173',
      '/security/cve-2019-20173',
      '/security/security-bulletins/cve-2019-20173',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2019-20173',
  },
  {
    from: [
      '/security/bulletins/cve-2019-16929',
      '/security/cve-2019-16929',
      '/security/security-bulletins/cve-2019-16929',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2019-16929',
  },
  {
    from: [
      '/security/bulletins/cve-2019-13483',
      '/security/cve-2019-13483',
      '/security/security-bulletins/cve-2019-13483',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2019-13483',
  },
  {
    from: [
      '/security/bulletins/cve-2019-7644',
      '/security/cve-2019-7644',
      '/security/security-bulletins/cve-2019-7644',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2019-7644',
  },
  {
    from: [
      '/security/bulletins/cve-2018-15121',
      '/security/cve-2018-15121',
      '/security/security-bulletins/cve-2018-15121',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2018-15121',
  },
  {
    from: [
      '/security/bulletins/cve-2018-11537',
      '/security/cve-2018-11537',
      '/security/security-bulletins/cve-2018-11537',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2018-11537',
  },
  {
    from: [
      '/security/bulletins/cve-2018-7307',
      '/security/cve-2018-7307',
      '/security/security-bulletins/cve-2018-7307',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2018-7307',
  },
  {
    from: [
      '/security/bulletins/cve-2018-6874',
      '/security/cve-2018-6874',
      '/security/security-bulletins/cve-2018-6874',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2018-6874',
  },
  {
    from: [
      '/security/bulletins/cve-2018-6873',
      '/security/cve-2018-6873',
      '/security/security-bulletins/cve-2018-6873',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2018-6873',
  },
  {
    from: [
      '/security/bulletins/cve-2017-16897',
      '/security/cve-2017-16897',
      '/security/security-bulletins/cve-2017-16897',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2017-16897',
  },
  {
    from: [
      '/security/bulletins/cve-2017-17068',
      '/security/cve-2017-17068',
      '/security/security-bulletins/cve-2017-17068',
    ],
    to: '/secure/security-guidance/security-bulletins/cve-2017-17068',
  },
  {
    from: ['/security/incident-response-using-logs'],
    to: '/secure/security-guidance/incident-response-using-logs',
  },

  /* Tokens */

  {
    from: ['/tokens', '/security/token-exp', '/token', '/tokens/concepts', '/tokens/guides', '/security/tokens'],
    to: '/secure/tokens',
  },
  {
    from: [
      '/tokens/overview-id-tokens',
      '/tokens/id-token',
      '/tokens/concepts/id-tokens',
      '/tokens/id_token',
      '/tokens/id-tokens',
      '/security/tokens/id-tokens',
    ],
    to: '/secure/tokens/id-tokens',
  },
  {
    from: [
      '/tokens/id-tokens/validate-id-tokens',
      '/tokens/guides/validate-id-token',
      '/tokens/guides/validate-id-tokens',
      '/tokens/guides/id-token/validate-id-token',
      '/tokens/id-tokens/validate-id-tokens',
      '/security/tokens/id-tokens/validate-id-tokens',
    ],
    to: '/secure/tokens/id-tokens/validate-id-tokens',
  },
  {
    from: [
      '/tokens/id-tokens/get-id-tokens',
      '/tokens/guides/id-token/get-id-tokens',
      '/tokens/guides/get-id-tokens',
      '/security/tokens/id-tokens/get-id-tokens',
    ],
    to: '/secure/tokens/id-tokens/get-id-tokens',
  },
  {
    from: [
      '/tokens/id-tokens/id-token-structure',
      '/tokens/references/id-token-structure',
      '/security/tokens/id-tokens/id-token-structure',
    ],
    to: '/secure/tokens/id-tokens/id-token-structure',
  },
  {
    from: [
      '/tokens/id-tokens/update-id-token-lifetime',
      '/dashboard/guides/applications/update-token-lifetime',
      '/security/tokens/id-tokens/update-id-token-lifetime',
    ],
    to: '/secure/tokens/id-tokens/update-id-token-lifetime',
  },
  {
    from: [
      '/api-auth/tutorials/adoption/api-tokens',
      '/tokens/concepts/access-tokens',
      '/tokens/concepts/access-token',
      '/tokens/overview-access-tokens',
      '/tokens/access-token',
      '/tokens/access_token',
      '/api-auth/why-use-access-tokens-to-secure-apis',
      '/api-auth/asking-for-access-tokens',
      '/tokens/access-tokens',
      '/security/tokens/access-tokens',
    ],
    to: '/secure/tokens/access-tokens',
  },
  {
    from: [
      '/tokens/guides/validate-access-tokens',
      '/api-auth/tutorials/verify-access-token',
      '/tokens/guides/access-token/validate-access-token',
      '/tokens/access-tokens/validate-access-tokens',
      '/security/tokens/access-tokens/validate-access-tokens',
    ],
    to: '/secure/tokens/access-tokens/validate-access-tokens',
  },
  {
    from: [
      '/tokens/guides/get-access-tokens',
      '/tokens/get-access-tokens',
      '/tokens/guides/access-token/get-access-tokens',
      '/tokens/access-tokens/get-access-tokens',
      '/security/tokens/access-tokens/get-access-tokens',
    ],
    to: '/secure/tokens/access-tokens/get-access-tokens',
  },
  {
    from: [
      '/tokens/guides/use-access-tokens',
      '/tokens/use-access-tokens',
      '/tokens/guides/access-token/use-access-tokens',
      '/tokens/access-tokens/use-access-tokens',
      '/security/tokens/access-tokens/use-access-tokens',
    ],
    to: '/secure/tokens/access-tokens/use-access-tokens',
  },
  {
    from: [
      '/tokens/concepts/idp-access-tokens',
      '/tokens/overview-idp-access-tokens',
      '/tokens/idp',
      '/tokens/identity-provider-access-tokens',
      '/security/tokens/access-tokens/identity-provider-access-tokens',
    ],
    to: '/secure/tokens/access-tokens/identity-provider-access-tokens',
  },
  {
    from: [
      '/api/management/v2/tokens',
      '/tokens/apiv2',
      '/api/v2/tokens',
      '/api/management/v2/concepts/tokens',
      '/tokens/management-api-access-tokens',
      '/api/management/v2/faq-management-api-access-tokens',
      '/tokens/management-api-access-tokens/management-api-access-token-faqs',
      '/security/tokens/access-tokens/management-api-access-tokens',
    ],
    to: '/secure/tokens/access-tokens/management-api-access-tokens',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production',
      '/api/management/v2/get-access-tokens-for-production',
      '/security/tokens/access-tokens/get-management-api-access-tokens-for-production',
      '/secure/tokens/access-tokens/get-management-api-access-tokens-for-production',
    ],
    to: '/secure/tokens/access-tokens/management-api-access-tokens/get-management-api-access-tokens-for-production',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing',
      '/api/management/v2/get-access-tokens-for-test',
      '/security/tokens/access-tokens/get-management-api-access-tokens-for-testing',
      '/secure/tokens/access-tokens/get-management-api-access-tokens-for-testing',
    ],
    to: '/secure/tokens/access-tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications',
      '/api/management/v2/get-access-tokens-for-spas',
      '/security/tokens/access-tokens/get-management-api-tokens-for-single-page-applications',
      '/secure/tokens/access-tokens/get-management-api-tokens-for-single-page-applications',
    ],
    to: '/secure/tokens/access-tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications',
  },
  {
    from: [
      '/api/management/v2/tokens-flows',
      '/tokens/management-api-access-tokens/changes-in-auth0-management-apiv2-tokens',
      '/security/tokens/access-tokens/changes-in-auth0-management-apiv2-tokens',
      '/secure/tokens/access-tokens/changes-in-auth0-management-apiv2-tokens',
    ],
    to: '/secure/tokens/access-tokens/management-api-access-tokens/changes-in-auth0-management-apiv2-tokens',
  },
  {
    from: [
      '/tokens/access-tokens/update-access-token-lifetime',
      '/dashboard/guides/apis/update-token-lifetime',
      '/security/tokens/access-tokens/update-access-token-lifetime',
    ],
    to: '/secure/tokens/access-tokens/update-access-token-lifetime',
  },
  {
    from: [
      '/tokens/json-web-tokens',
      '/tokens/concepts/jwts',
      '/tokens/concepts/why-use-jwt',
      '/tokens/jwt',
      '/jwt',
      '/security/tokens/json-web-tokens',
    ],
    to: '/secure/tokens/json-web-tokens',
  },
  {
    from: [
      '/tokens/json-web-tokens/validate-json-web-tokens',
      '/tokens/guides/validate-jwts',
      '/tokens/guides/jwt/parse-validate-jwt-programmatically',
      '/tokens/guides/jwt/validate-jwt',
      '/security/tokens/json-web-tokens/validate-json-web-tokens',
    ],
    to: '/secure/tokens/json-web-tokens/validate-json-web-tokens',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-token-structure',
      '/tokens/references/jwt-structure',
      '/tokens/reference/jwt/jwt-structure',
      '/security/tokens/json-web-tokens/json-web-token-structure',
    ],
    to: '/secure/tokens/json-web-tokens/json-web-token-structure',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-token-claims',
      '/tokens/jwt-claims',
      '/tokens/concepts/jwt-claims',
      '/tokens/add-custom-claims',
      '/scopes/current/custom-claims',
      '/security/tokens/json-web-tokens/json-web-token-claims',
    ],
    to: '/secure/tokens/json-web-tokens/json-web-token-claims',
  },
  {
    from: [
      '/tokens/create-namespaced-custom-claims',
      '/tokens/guides/create-namespaced-custom-claims',
      '/tokens/concepts/claims-namespacing',
      '/security/tokens/json-web-tokens/create-namespaced-custom-claims',
      '/secure/tokens/json-web-tokens/create-namespaced-custom-claims',
    ],
    to: '/secure/tokens/json-web-tokens/create-custom-claims',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-key-sets',
      '/tokens/jwks',
      '/jwks',
      '/tokens/concepts/jwks',
      '/security/tokens/json-web-tokens/json-web-key-sets',
    ],
    to: '/secure/tokens/json-web-tokens/json-web-key-sets',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-key-sets/locate-json-web-key-sets',
      '/tokens/guides/locate-jwks',
      '/tokens/guides/jwt/verify-jwt-signature-using-jwks',
      '/tokens/guides/jwt/use-jwks',
      '/security/tokens/json-web-tokens/locate-json-web-key-sets',
    ],
    to: '/secure/tokens/json-web-tokens/locate-json-web-key-sets',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-key-set-properties',
      '/tokens/references/jwks-properties',
      '/tokens/reference/jwt/jwks-properties',
      '/security/tokens/json-web-tokens/json-web-key-set-properties',
    ],
    to: '/secure/tokens/json-web-tokens/json-web-key-set-properties',
  },
  {
    from: [
      '/api-auth/tutorials/adoption/refresh-tokens',
      '/refresh-token',
      '/tokens/refresh_token',
      '/tokens/refresh-token',
      '/tokens/refresh-token/legacy',
      '/tokens/refresh-token/current',
      '/tokens/concepts/refresh-tokens',
      '/tokens/access-tokens/refresh-tokens',
      '/tokens/preview/refresh-token',
      '/tokens/refresh-tokens',
      '/security/tokens/refresh-tokens',
    ],
    to: '/secure/tokens/refresh-tokens',
  },
  {
    from: [
      '/tokens/refresh-tokens/get-refresh-tokens',
      '/tokens/guides/get-refresh-tokens',
      '/security/tokens/refresh-tokens/get-refresh-tokens',
    ],
    to: '/secure/tokens/refresh-tokens/get-refresh-tokens',
  },
  {
    from: [
      '/tokens/refresh-tokens/use-refresh-tokens',
      '/tokens/guides/use-refresh-tokens',
      '/security/tokens/refresh-tokens/use-refresh-tokens',
    ],
    to: '/secure/tokens/refresh-tokens/use-refresh-tokens',
  },
  {
    from: [
      '/tokens/refresh-tokens/configure-refresh-token-expiration',
      '/security/tokens/configure-refresh-token-expiration',
      '/security/tokens/refresh-tokens/configure-refresh-token-expiration',
    ],
    to: '/secure/tokens/refresh-tokens/configure-refresh-token-expiration',
  },
  {
    from: [
      '/tokens/concepts/refresh-token-rotation',
      '/tokens/access-tokens/refresh-tokens/refresh-token-rotation',
      '/tokens/refresh-tokens/refresh-token-rotation',
      '/security/tokens/refresh-token-rotation',
      '/security/tokens/refresh-tokens/refresh-token-rotation',
    ],
    to: '/secure/tokens/refresh-tokens/refresh-token-rotation',
  },
  {
    from: [
      '/tokens/refresh-tokens/configure-refresh-token-rotation',
      '/tokens/guides/configure-refresh-token-rotation',
      '/security/tokens/refresh-tokens/configure-refresh-token-rotation',
    ],
    to: '/secure/tokens/refresh-tokens/configure-refresh-token-rotation',
  },
  {
    from: [
      '/tokens/guides/use-refresh-token-rotation',
      '/tokens/refresh-token-rotation/use-refresh-token-rotation',
      '/tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation',
      '/security/tokens/refresh-tokens/use-refresh-token-rotation',
    ],
    to: '/secure/tokens/refresh-tokens/use-refresh-token-rotation',
  },
  {
    from: [
      '/tokens/guides/disable-refresh-token-rotation',
      '/tokens/access-tokens/refresh-tokens/disable-refresh-token-rotation',
      '/tokens/refresh-tokens/disable-refresh-token-rotation',
      '/security/tokens/refresh-tokens/disable-refresh-token-rotation',
    ],
    to: '/secure/tokens/refresh-tokens/disable-refresh-token-rotation',
  },
  {
    from: [
      '/tokens/refresh-tokens/revoke-refresh-tokens',
      '/tokens/guides/revoke-refresh-tokens',
      '/security/tokens/refresh-tokens/revoke-refresh-tokens',
    ],
    to: '/secure/tokens/refresh-tokens/revoke-refresh-tokens',
  },
  {
    from: ['/tokens/revoke-tokens', '/tokens/guides/revoke-tokens', '/security/tokens/revoke-tokens'],
    to: '/secure/tokens/revoke-tokens',
  },
  {
    from: [
      '/api-auth/tutorials/adoption/delegation',
      '/tokens/delegation',
      '/tokens/concepts/delegation-tokens',
      '/tokens/delegation-tokens',
      '/security/tokens/delegation-tokens',
    ],
    to: '/secure/tokens/delegation-tokens',
  },

  /* Support */

  {
    from: ['/policies/requests', '/premium-support', '/support'],
    to: '/troubleshoot/customer-support',
  },
  {
    from: [
      '/support/support-overview',
      '/support/support-plans',
      '/support/support-procedures',
      '/troubleshoot/customer-support/support-procedures',
      '/support/support-hours-and-languages',
      '/troubleshoot/customer-support/support-hours-and-languages',
    ],
    to: '/troubleshoot/customer-support/support-plans',
  },
  {
    from: ['/support/matrix', '/support/product-support-matrix'],
    to: '/troubleshoot/customer-support/product-support-matrix',
  },
  {
    from: ['/sla', '/support/sla', '/support/sld', '/support/services-level-descriptions'],
    to: '/troubleshoot/customer-support/services-level-descriptions',
  },
  {
    from: ['/support/tickets', '/support/open-and-manage-support-tickets'],
    to: '/troubleshoot/customer-support/open-and-manage-support-tickets',
  },
  {
    from: ['/support/subscription', '/support/manage-subscriptions'],
    to: '/troubleshoot/customer-support/manage-subscriptions',
  },
  {
    from: [
      '/support/cancel-paid-subscriptions',
      '/tutorials/cancel-paid-subscriptions',
      '/cancel-paid-subscriptions',
      '/support/downgrade-or-cancel-subscriptions',
      '/support/manage-subscriptions/downgrade-or-cancel-subscriptions',
    ],
    to: '/troubleshoot/customer-support/manage-subscriptions/downgrade-or-cancel-subscriptions',
  },
  {
    from: [
      '/support/delete-or-reset-tenant',
      '/support/delete-reset-tenant',
      '/tutorials/delete-reset-tenant',
      '/support/manage-subscriptions/delete-or-reset-tenant',
    ],
    to: '/troubleshoot/customer-support/manage-subscriptions/delete-or-reset-tenant',
  },
  {
    from: [
      '/tutorials/removing-auth0-exporting-data',
      '/support/removing-auth0-exporting-data',
      '/moving-out',
      '/support/export-data',
      '/support/manage-subscriptions/export-data',
    ],
    to: '/troubleshoot/customer-support/manage-subscriptions/export-data',
  },
  {
    from: [
      '/support/how-auth0-versions-software',
      '/tutorials/how-auth0-versions-software',
      '/versioning',
      '/support/versioning-strategy',
    ],
    to: '/troubleshoot/customer-support/versioning-strategy',
  },
  {
    from: ['/support/reset-account-password', '/tutorials/reset-account-password', '/support/reset-account-passwords'],
    to: '/troubleshoot/customer-support/reset-account-passwords',
  },
  {
    from: ['/support/support-channels'],
    to: '/troubleshoot/customer-support/support-channels',
  },
  {
    from: ['/support/software-updates'],
    to: '/troubleshoot/customer-support/software-updates',
  },
  {
    from: ['/support/whitehat-security-support-tickets'],
    to: '/troubleshoot/customer-support/responsible-disclosure-program-security-support-tickets',
  },

  /* Policies */

  {
    from: [
      '/policies',
      '/policies/dashboard-authentication',
      '/policies/restore-deleted-tenant',
      '/policies/unsupported-requests',
      '/support/policies',
    ],
    to: '/troubleshoot/customer-support/operational-policies',
  },
  {
    from: ['/policies/billing-policy', '/policies/billing', '/support/policies/billing-policy'],
    to: '/troubleshoot/customer-support/operational-policies/billing-policy',
  },
  {
    from: [
      '/policies/public-cloud-service-endpoints',
      '/policies/endpoints',
      '/security/public-cloud-service-endpoints',
      '/support/policies/public-cloud-service-endpoints',
    ],
    to: '/troubleshoot/customer-support/operational-policies/public-cloud-service-endpoints',
  },
  {
    from: [
      '/policies/data-export-and-transfer-policy',
      '/policies/data-export',
      '/policies/data-transfer',
      '/support/policies/data-export-and-transfer-policy',
    ],
    to: '/troubleshoot/customer-support/operational-policies/data-export-and-transfer-policy',
  },
  {
    from: ['/policies/load-testing-policy', '/policies/load-testing', '/support/policies/load-testing-policy'],
    to: '/troubleshoot/customer-support/operational-policies/load-testing-policy',
  },
  {
    from: [
      '/policies/penetration-testing-policy',
      '/policies/penetration-testing',
      '/support/policies/penetration-testing-policy',
    ],
    to: '/troubleshoot/customer-support/operational-policies/penetration-testing-policy',
  },
  {
    from: [
      '/rate-limits',
      '/policies/rate-limit',
      '/policies/rate-limits',
      '/policies/legacy-rate-limits',
      '/policies/rate-limit-policy',
      '/support/policies/rate-limit-policy',
    ],
    to: '/troubleshoot/customer-support/operational-policies/rate-limit-policy',
  },
  {
    from: [
      '/policies/rate-limit-policy/authentication-api-endpoint-rate-limits',
      '/policies/rate-limits-auth-api',
      '/policies/rate-limits-api',
      '/policies/authentication-api-endpoint-rate-limits',
      '/support/policies/rate-limit-policy/authentication-api-endpoint-rate-limits',
      '/troubleshoot/customer-support/operational-policies/rate-limit-policy/authentication-api-endpoint-rate-limits',

    ],
    to: '/troubleshoot/customer-support/operational-policies/rate-limit-policy',
  },
  {
    from: [
      '/policies/rate-limit-policy/mgmt-api-endpoint-rate-limits-before-19-may-2020',
      '/policies/rate-limit-policy/management-api-endpoint-rate-limits',
      '/policies/rate-limits-mgmt-api',
      '/policies/management-api-endpoint-rate-limits',
      '/support/policies/rate-limit-policy/management-api-endpoint-rate-limits',
      '/troubleshoot/customer-support/operational-policies/rate-limit-policy/management-api-endpoint-rate-limits',
    ],
    to: '/troubleshoot/customer-support/operational-policies/rate-limit-policy',
  },
  {
    from: [
      '/policies/database-connections-rate-limits',
      '/policies/rate-limit-policy/database-connections-rate-limits',
      '/connections/database/rate-limits',
      '/support/policies/database-connections-rate-limits',
      '/support/policies/rate-limit-policy/database-connections-rate-limits',
      '/troubleshoot/customer-support/operational-policies/rate-limit-policy/database-connections-rate-limits',
    ],
    to: '/troubleshoot/customer-support/operational-policies/rate-limit-policy',
  },
  {
    from: [
      '/troubleshoot/customer-support/operational-policies/rate-limit-policy/understand-rate-limit-burst-capability',
    ],
    to: '/troubleshoot/customer-support/operational-policies/rate-limit-policy',
  },
  {
    from: [
      '/authorization/reference/rbac-limits',
      '/authorization/rbac/authorization-core-rbac-limits',
      '/policies/entity-limit-policy',
      '/policies/entity-limits',
      '/policies/global-limit',
      '/support/policies/entity-limit-policy',
    ],
    to: '/troubleshoot/customer-support/operational-policies/entity-limit-policy',
  },
  {
    from: ['/support/support-center-users', '/dashboard-access/support-center-users', '/get-started/manage-dashboard-access/support-center-users'],
    to: '/get-started/manage-dashboard-access/feature-access-by-role',
  },

  /* Troubleshoot */

  {
    from: ['/troubleshoot/basics'],
    to: '/troubleshoot',
  },
  {
    from: ['/troubleshoot/basic-troubleshooting', '/troubleshoot/concepts/basics', '/troubleshoot/troubleshoot-basic'],
    to: '/troubleshoot/basic-issues',
  },
  {
    from: [
      '/troubleshoot/basic-troubleshooting/verify-platform',
      '/troubleshoot/guides/verify-platform',
      '/troubleshoot/troubleshoot-basic/verify-platform',
    ],
    to: '/troubleshoot/basic-issues/verify-platform',
  },
  {
    from: [
      '/troubleshoot/basic-troubleshooting/verify-connections',
      '/troubleshoot/guides/verify-connections',
      '/troubleshoot/troubleshoot-basic/verify-connections',
    ],
    to: '/troubleshoot/basic-issues/verify-connections',
  },
  {
    from: [
      '/troubleshoot/basic-troubleshooting/verify-domain',
      '/troubleshoot/guides/verify-domain',
      '/troubleshoot/troubleshoot-basic/verify-domain',
    ],
    to: '/troubleshoot/basic-issues/verify-domain',
  },
  {
    from: [
      '/troubleshoot/guides/verify-rules',
      '/troubleshoot/verify-rules',
      '/troubleshoot/troubleshoot-basic/verify-rules',
    ],
    to: '/troubleshoot/basic-issues/verify-rules',
  },
  {
    from: [
      '/troubleshoot/guides/check-error-messages',
      '/troubleshoot/check-error-messages',
      '/troubleshoot/troubleshoot-basic/check-error-messages',
    ],
    to: '/troubleshoot/basic-issues/check-error-messages',
  },
  {
    from: [
      '/product-lifecycle/deprecations-and-migrations/search-logs-for-deprecation-errors',
      '/errors/deprecations-errors/',
      '/troubleshoot/troubleshoot-basic/search-logs-for-deprecation-errors',
    ],
    to: '/troubleshoot/basic-issues/search-logs-for-deprecation-errors',
  },
  {
    from: [
      '/troubleshoot/guides/check-deprecation-errors',
      '/troubleshoot/troubleshoot-authentication-issues/check-deprecation-errors',
      '/troubleshoot/troubleshoot-basic/check-deprecation-errors',
    ],
    to: '/troubleshoot/basic-issues/check-deprecation-errors',
  },
  {
    from: [
      '/troubleshoot/references/invalid-token',
      '/troubleshoot/invalid-token-errors',
      '/troubleshoot/troubleshoot-basic/invalid-token-errors',
    ],
    to: '/troubleshoot/basic-issues/invalid-token-errors',
  },
  {
    from: [
      '/troubleshoot/concepts/auth-issues',
      '/troubleshoot/troubleshoot-authentication-issues',
      '/troubleshoot/troubleshoot-authentication',
    ],
    to: '/troubleshoot/authentication-issues',
  },
  {
    from: [
      '/troubleshoot/guides/check-api-calls',
      '/troubleshoot/troubleshoot-authentication-issues/check-api-calls',
      '/troubleshoot/troubleshoot-authentication/check-api-calls',
    ],
    to: '/troubleshoot/authentication-issues/check-api-calls',
  },
  {
    from: [
      '/troubleshoot/guides/check-login-logout-issues',
      '/troubleshoot/troubleshoot-authentication-issues/check-login-and-logout-issues',
      '/troubleshoot/troubleshoot-authentication/check-login-and-logout-issues',
    ],
    to: '/troubleshoot/authentication-issues/check-login-and-logout-issues',
  },
  {
    from: [
      '/troubleshoot/guides/check-user-profiles',
      '/troubleshoot/troubleshoot-authentication-issues/check-user-profiles',
      '/troubleshoot/troubleshoot-authentication/check-user-profiles',
    ],
    to: '/troubleshoot/authentication-issues/check-user-profiles',
  },
  {
    from: [
      '/authorization/concepts/troubleshooting',
      '/authorization/troubleshoot-role-based-access-control-and-authorization',
      '/troubleshoot/troubleshoot-authentication/troubleshoot-rbac-authorization',
    ],
    to: '/troubleshoot/authentication-issues/troubleshoot-rbac-authorization',
  },
  {
    from: [
      '/troubleshoot/references/saml-errors',
      '/troubleshoot/troubleshoot-authentication-issues/saml-errors',
      '/troubleshoot/troubleshoot-authentication/saml-errors',
    ],
    to: '/troubleshoot/authentication-issues/saml-errors',
  },
  {
    from: [
      '/protocols/saml/saml-configuration/troubleshoot/auth0-as-idp',
      '/protocols/saml/saml-configuration/troubleshoot',
      '/protocols/saml/saml-configuration/troubleshoot/common-saml-errors',
      '/protocols/saml/saml-configuration/troubleshoot/auth0-as-sp',
      '/troubleshoot/troubleshoot-saml-configurations',
      '/protocols/saml-protocol/troubleshoot-saml-configurations',
      '/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations',
    ],
    to: '/troubleshoot/authentication-issues/troubleshoot-saml-configurations',
  },
  {
    from: [
      '/troubleshoot/self-change-password-errors',
      '/troubleshoot/references/self_change_password',
      '/troubleshoot/troubleshoot-authentication/self-change-password-errors',
    ],
    to: '/troubleshoot/authentication-issues/self-change-password-errors',
  },
  {
    from: [
      '/multifactor-authentication/google-auth/admin-guide',
      '/multifactor-authentication/google-auth/user-guide',
      '/multifactor-authentication/troubleshooting',
      '/mfa/references/troubleshoot-mfa',
      '/mfa/references/troubleshooting',
      '/mfa/troubleshoot-mfa-issues',
      '/troubleshoot/troubleshoot-authentication/troubleshoot-mfa-issues',
    ],
    to: '/troubleshoot/authentication-issues/troubleshoot-mfa-issues',
  },
  {
    from: [
      '/extensions/authorization-extension/v2/troubleshooting',
      '/extensions/authorization-dashboard-extension/troubleshoot-authorization-extension',
      '/extensions/authorization-extension/troubleshoot-authorization-extension',
      '/troubleshoot/troubleshoot-authentication/troubleshoot-authorization-extension',
    ],
    to: '/troubleshoot/authentication-issues/troubleshoot-authorization-extension',
  },
  {
    from: [
      '/authorization/renew-tokens-when-using-safari',
      '/api-auth/token-renewal-in-safari',
      '/troubleshoot/troubleshoot-authentication/renew-tokens-when-using-safari',
    ],
    to: '/troubleshoot/authentication-issues/renew-tokens-when-using-safari',
  },
  {
    from: [
      '/troubleshoot/concepts/integration-extensibility-issues',
      '/troubleshoot/troubleshoot-integration-and-extensibility',
    ],
    to: '/troubleshoot/integration-extensibility-issues',
  },
  {
    from: [
      '/custom-domains/troubleshoot-custom-domains',
      '/custom-domains/troubleshoot',
      '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-custom-domains',
    ],
    to: '/troubleshoot/integration-extensibility-issues/troubleshoot-custom-domains',
  },
  {
    from: [
      '/connector/troubleshooting',
      '/ad-ldap-connector/troubleshoot-ad-ldap-connector',
      '/extensions/ad-ldap-connector/troubleshoot-ad-ldap-connector',
      '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-ad-ldap-connector',
    ],
    to: '/troubleshoot/integration-extensibility-issues/troubleshoot-ad-ldap-connector',
  },
  {
    from: [
      '/extensions/troubleshoot-extensions',
      '/extensions/troubleshoot',
      '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-extensions',
    ],
    to: '/troubleshoot/integration-extensibility-issues/troubleshoot-extensions',
  },
  {
    from: [
      '/extensions/deploy-cli/references/troubleshooting',
      '/extensions/deploy-cli-tool/troubleshoot-the-deploy-cli-tool',
      '/deploy/deploy-cli-tool/troubleshoot-the-deploy-cli-tool',
      '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-the-deploy-cli-tool',
    ],
    to: '/troubleshoot/integration-extensibility-issues/troubleshoot-the-deploy-cli-tool',
  },
  {
    from: ['/troubleshoot/tools'],
    to: '/troubleshoot/troubleshooting-tools',
  },
  {
    from: [
      '/har',
      '/tutorials/troubleshooting-with-har-files',
      '/troubleshoot/har',
      '/support/troubleshooting-with-har-files',
      '/troubleshoot/guides/generate-har-files',
      '/troubleshoot/generate-and-analyze-har-files',
      '/troubleshoot/tools/generate-and-analyze-har-files',
      '/troubleshoot/troubleshooting-tools/sanitize-http-traces',
    ],
    to: '/troubleshoot/troubleshooting-tools/generate-and-analyze-har-files',
  },

  /* Tutorials */

  {
    from: ['/scenarios', '/tutorials'],
    to: '/',
  },

  /* Manage Users */

  {
    from: ['/users/concepts/overview-users', '/users'],
    to: '/manage-users',
  },
  {
    from: [
      '/user-profile/normalized',
      '/user-profile/normalized/oidc',
      '/user-profile',
      '/users/concepts/overview-user-profile',
      '/user-profile/user-profile-details',
      '/users/normalized/oidc',
      '/users/user-profiles-returned-from-oidc-compliant-pipelines',
      '/users/user-profiles',
    ],
    to: '/manage-users/user-accounts/user-profiles',
  },
  {
    from: [
      '/user-profile/user-profile-structure',
      '/users/references/user-profile-structure',
      '/users/user-profile-structure',
      '/users/user-profiles/user-profile-structure',
    ],
    to: '/manage-users/user-accounts/user-profiles/user-profile-structure',
  },
  {
    from: [
      '/users/sample-user-profiles',
      '/users/normalized/auth0/sample-user-profiles',
      '/users/user-profiles/sample-user-profiles',
    ],
    to: '/manage-users/user-accounts/user-profiles/sample-user-profiles',
  },
  {
    from: [
      '/users/normalized-user-profiles',
      '/users/normalized',
      '/user-profile/normalized/auth0',
      '/users/normalized/auth0',
      '/users/user-profiles/normalized-user-profiles',
    ],
    to: '/manage-users/user-accounts/user-profiles/normalized-user-profiles',
  },
  {
    from: [
      '/users/normalized-user-profile-schema',
      '/users/normalized/auth0/normalized-user-profile-schema',
      '/users/user-profiles/normalized-user-profile-schema',
    ],
    to: '/manage-users/user-accounts/user-profiles/normalized-user-profile-schema',
  },
  {
    from: [
      '/user-profile/progressive-profiling',
      '/users/concepts/overview-progressive-profiling',
      '/users/guides/implement-progressive-profiling',
      '/users/progressive-profiling',
      '/users/concepts/overview-progressive-profiling',
      '/users/user-profiles/progressive-profiling',
    ],
    to: '/manage-users/user-accounts/user-profiles/progressive-profiling',
  },
  {
    from: [
      '/users/updating-user-profile-root-attributes',
      '/users/normalized/auth0/update-root-attributes',
      '/users/user-profiles/root-attributes',
    ],
    to: '/manage-users/user-accounts/user-profiles/root-attributes',
  },
  {
    from: [
      '/users/set-root-attributes-during-user-import',
      '/api/management/guides/users/set-root-attributes-user-import',
      '/users/user-profiles/root-attributes/set-root-attributes-during-user-import',
    ],
    to: '/manage-users/user-accounts/user-profiles/root-attributes/set-root-attributes-during-user-import',
  },
  {
    from: [
      '/users/set-root-attributes-during-user-sign-up',
      '/api/management/guides/users/set-root-attributes-user-signup',
      '/users/user-profiles/root-attributes/set-root-attributes-during-user-sign-up',
    ],
    to: '/manage-users/user-accounts/user-profiles/root-attributes/set-root-attributes-during-user-sign-up',
  },
  {
    from: [
      '/users/update-root-attributes-for-users',
      '/api/management/guides/users/update-root-attributes-users',
      '/users/user-profiles/root-attributes/update-root-attributes-for-users',
    ],
    to: '/manage-users/user-accounts/user-profiles/root-attributes/update-root-attributes-for-users',
  },
  {
    from: ['/users/verified-email-usage', '/users/guides/email-verified', '/users/user-profiles/verified-email-usage'],
    to: '/manage-users/user-accounts/user-profiles/verified-email-usage',
  },
  {
    from: [
      '/users/configure-connection-sync-with-auth0',
      '/dashboard/guides/connections/configure-connection-sync',
      '/api/management/guides/connections/configure-connection-sync',
      '/users/user-profiles/configure-connection-sync-with-auth0',
    ],
    to: '/manage-users/user-accounts/user-profiles/configure-connection-sync-with-auth0',
  },
  {
    from: [
      '/users/update-user-profiles-using-your-database',
      '/user-profile/customdb',
      '/users/guides/update-user-profiles-using-your-database',
      '/users/user-profiles/update-user-profiles-using-your-database',
    ],
    to: '/manage-users/user-accounts/user-profiles/update-user-profiles-using-your-database',
  },
  {
    from: [
      '/users/concepts/overview-user-metadata',
      '/metadata',
      '/users/read-metadata',
      '/users/guides/read-metadata',
      '/users/guides/manage-user-metadata',
      '/users/manage-user-metadata',
      '/users/metadata',
    ],
    to: '/manage-users/user-accounts/metadata',
  },
  {
    from: [
      '/users/references/metadata-field-name-rules',
      '/best-practices/metadata-best-practices',
      '/users/metadata/metadata-fields-data',
    ],
    to: '/manage-users/user-accounts/metadata/metadata-fields-data',
  },
  {
    from: [
      '/users/guides/update-metadata-properties-with-management-api',
      '/update-metadata-with-the-management-api',
      '/users/update-metadata-with-the-management-api',
      '/metadata/management-api',
      '/metadata/apiv2',
      '/metadata/apis',
      '/users/guides/set-metadata-properties-on-creation',
      '/users/set-metadata-properties-on-creation',
      '/users/metadata/manage-metadata-api',
    ],
    to: '/manage-users/user-accounts/metadata/manage-metadata-api',
  },
  {
    from: ['/metadata/lock', '/users/metadata/manage-metadata-lock'],
    to: '/manage-users/user-accounts/metadata/manage-metadata-lock',
  },
  {
    from: [
      '/rules/current/metadata-in-rules',
      '/rules/guides/metadata',
      '/rules/metadata-in-rules',
      '/metadata-in-rules',
      '/metadata/rules',
      '/rules/metadata',
      '/users/metadata/manage-metadata-rules',
    ],
    to: '/manage-users/user-accounts/metadata/manage-metadata-rules',
  },
  {
    from: [
      '/sessions-and-cookies',
      '/sessions/concepts/session',
      '/sessions/concepts/session-lifetime',
      '/sessions/references/sample-use-cases-sessions',
      '/sessions-and-cookies/session-use-cases',
      '/sessions',
      '/users/sessions',
    ],
    to: '/manage-users/sessions',
  },
  {
    from: ['/sessions/session-layers', '/sessions/concepts/session-layers', '/users/sessions/session-layers'],
    to: '/manage-users/sessions/session-layers',
  },
  {
    from: ['/sessions/session-lifetime-limits', '/users/sessions/session-lifetime-limits'],
    to: '/manage-users/sessions/session-lifetime-limits',
  },
  {
    from: [
      '/get-started/dashboard/configure-session-lifetime-settings',
      '/dashboard/guides/tenants/configure-session-lifetime-settings',
      '/api/management/guides/tenants/configure-session-lifetime-settings',
      '/sso/current/configure-session-lifetime-limits',
      '/sessions/configure-session-lifetime-settings',
      '/users/sessions/session-lifetimes/configure-session-lifetime-settings',
      '/users/sessions/configure-session-lifetime-settings',
    ],
    to: '/manage-users/sessions/configure-session-lifetime-settings',
  },
  {
    from: [
      '/sessions/non-persistent-sessions',
      '/users/sessions/session-lifetimes/non-persistent-sessions',
      '/users/sessions/non-persistent-sessions',
    ],
    to: '/manage-users/sessions/non-persistent-sessions',
  },
  {
    from: [
      '/sessions/references/example-short-lived-session-mgmt',
      '/sessions-and-cookies/manage-multi-site-short-long-lived-sessions',
      '/users/sessions/manage-multi-site-sessions',
    ],
    to: '/manage-users/sessions/manage-multi-site-sessions',
  },
  {
    from: ['/sessions/cookies', '/sessions/concepts/cookies', '/sessions-and-cookies/cookies', '/users/cookies'],
    to: '/manage-users/cookies',
  },
  {
    from: ['/sessions/cookies/authentication-api-cookies', '/users/cookies/authentication-api-cookies'],
    to: '/manage-users/cookies/authentication-api-cookies',
  },
  {
    from: [
      '/sessions/spa-authenticate-with-cookies',
      '/login/spa/authenticate-with-cookies',
      '/sessions-and-cookies/spa-authenticate-with-cookies',
      '/sessions/cookies/spa-authenticate-with-cookies',
      '/users/cookies/spa-authenticate-with-cookies',
    ],
    to: '/manage-users/cookies/spa-authenticate-with-cookies',
  },
  {
    from: [
      '/sessions/concepts/cookie-attributes',
      '/sessions-and-cookies/samesite-cookie-attribute-changes',
      '/sessions/cookies/samesite-cookie-attribute-changes',
      '/users/cookies/samesite-cookie-attribute-changes',
    ],
    to: '/manage-users/cookies/samesite-cookie-attribute-changes',
  },
  {
    from: ['/users/guides/manage-users-using-the-dashboard', '/users/manage-users-using-the-dashboard'],
    to: '/manage-users/user-accounts/manage-users-using-the-dashboard',
  },
  {
    from: ['/users/guides/manage-users-using-the-management-api', '/users/manage-users-using-the-management-api'],
    to: '/manage-users/user-accounts/manage-users-using-the-management-api',
  },
  {
    from: [
      '/users/guides/link-user-accounts',
      '/link-accounts/suggested-linking',
      '/users/link-user-accounts',
      '/users/user-account-linking/link-user-accounts',
    ],
    to: '/manage-users/user-accounts/user-account-linking/link-user-accounts',
  },
  {
    from: [
      '/users/unlink-user-accounts',
      '/users/guides/unlink-user-accounts',
      '/users/user-account-linking/unlink-user-accounts',
    ],
    to: '/manage-users/user-accounts/user-account-linking/unlink-user-accounts',
  },
  {
    from: [
      '/link-accounts/user-initiated',
      '/link-accounts/user-initiated-linking',
      '/users/references/link-accounts-user-initiated-scenario',
      '/users/references/link-accounts-client-side-scenario',
      '/user/references/link-accounts-client-side-scenario',
      '/users/user-initiated-account-linking-client-side-implementation',
      '/users/user-account-linking/user-initiated-account-linking-client-side-implementation',
    ],
    to: '/manage-users/user-accounts/user-account-linking/user-initiated-account-linking-client-side-implementation',
  },
  {
    from: [
      '/users/suggested-account-linking-server-side-implementation',
      '/users/references/link-accounts-server-side-scenario',
      '/users/user-account-linking/suggested-account-linking-server-side-implementation',
    ],
    to: '/manage-users/user-accounts/user-account-linking/suggested-account-linking-server-side-implementation',
  },
  {
    from: ['/users/concepts/overview-user-migration', '/users/import-export-users', '/users/import-and-export-users'],
    to: '/manage-users/user-migration',
  },
  {
    from: [
      '/connections/database/migrating-okta',
      '/users/migrations/okta',
      '/users/references/user-migration-scenarios',
      '/users/migrations',
      '/users/user-migration-scenarios',
      '/users/import-and-export-users/user-migration-scenarios',
    ],
    to: '/manage-users/user-migration/user-migration-scenarios',
  },
  {
    from: [
      '/connections/database/migrating',
      '/migrating',
      '/users/migrations/automatic',
      '/users/guides/configure-automatic-migration',
      '/users/configure-automatic-migration-from-your-database',
      '/users/import-and-export-users/configure-automatic-migration-from-your-database',
    ],
    to: '/manage-users/user-migration/configure-automatic-migration-from-your-database',
  },
  {
    from: [
      '/tutorials/bulk-importing-users-into-auth0',
      '/users/guides/bulk-user-imports',
      '/users/guides/bulk-user-import',
      '/users/bulk-importing-users-into-auth0',
      '/users/migrations/bulk-import',
      '/bulk-import',
      '/users/bulk-user-imports',
      '/users/import-and-export-users/bulk-user-imports',
    ],
    to: '/manage-users/user-migration/bulk-user-imports',
  },
  {
    from: [
      '/users/bulk-user-import-database-schema-and-examples',
      '/users/references/bulk-import-database-schema-examples',
      '/users/import-and-export-users/bulk-user-import-database-schema-and-examples',
    ],
    to: '/manage-users/user-migration/bulk-user-import-database-schema-and-examples',
  },
  {
    from: [
      '/users/bulk-user-exports',
      '/users/guides/bulk-user-exports',
      '/users/import-and-export-users/bulk-user-exports',
    ],
    to: '/manage-users/user-migration/bulk-user-exports',
  },
  {
    from: ['/users/guides/block-and-unblock-users', '/users/block-and-unblock-users'],
    to: '/manage-users/user-accounts/block-and-unblock-users',
  },
  {
    from: ['/users/guides/manage-user-access-to-applications', '/users/manage-user-access-to-applications'],
    to: '/manage-users/user-accounts/manage-user-access-to-applications',
  },
  {
    from: ['/users/guides/delete-users', '/users/delete-users'],
    to: '/manage-users/user-accounts/delete-users',
  },
  {
    from: ['/dashboard/guides/users/unlink-user-devices', '/users/unlink-devices-from-users'],
    to: '/manage-users/user-accounts/unlink-devices-from-users',
  },
  {
    from: ['/user-profile/user-picture', '/users/guides/change-user-pictures', '/users/change-user-picture'],
    to: '/manage-users/user-accounts/change-user-picture',
  },
  {
    from: [
      '/tutorials/creating-users-in-the-management-portal',
      '/users/guides/create-users',
      '/creating-users',
      '/dashboard/guides/users/create-users',
      '/users/create-users',
    ],
    to: '/manage-users/user-accounts/create-users',
  },
  {
    from: [
      '/tutorials/get-user-information-with-unbounce-landing-pages',
      '/users/guides/get-user-information-with-unbounce-landing-pages',
      '/scenarios-unbounce',
      '/users/get-user-information-on-unbounce-landing-pages',
    ],
    to: '/manage-users/user-accounts/get-user-information-on-unbounce-landing-pages',
  },
  {
    from: ['/users/guides/view-users', '/users/view-user-details'],
    to: '/manage-users/user-accounts/view-user-details',
  },
  {
    from: ['/users/normalized/auth0/identify-users', '/users/identify-users'],
    to: '/manage-users/user-accounts/identify-users',
  },
  {
    from: [
      '/users/search/v3',
      '/users/normalized/auth0/retrieve-user-profiles',
      '/users/search',
      '/users-search',
      '/users/user-search',
    ],
    to: '/manage-users/user-search',
  },
  {
    from: ['/users/search/v3/query-syntax', '/users/user-search/user-search-query-syntax'],
    to: '/manage-users/user-search/user-search-query-syntax',
  },
  {
    from: ['/api/management/v2/user-search', '/users/search/v2', '/api/v2/user-search', '/users/user-search/v2'],
    to: '/manage-users/user-search/v2',
  },
  {
    from: [
      '/api/management/v2/query-string-syntax',
      '/users/search/v2/query-syntax',
      '/users/user-search/v2/query-syntax',
    ],
    to: '/manage-users/user-search/v2/query-syntax',
  },
  {
    from: [
      '/users/search/v3/get-users-by-email-endpoint',
      '/users/user-search/retrieve-users-with-get-users-by-email-endpoint',
    ],
    to: '/manage-users/user-search/retrieve-users-with-get-users-by-email-endpoint',
  },
  {
    from: [
      '/users/search/v3/get-users-by-id-endpoint',
      '/users/user-search/retrieve-users-with-get-users-by-id-endpoint',
    ],
    to: '/manage-users/user-search/retrieve-users-with-get-users-by-id-endpoint',
  },
  {
    from: [
      '/users/search/v3/get-users-endpoint',
      '/users/user-search/retrieve-users-with-the-get-users-endpoint',
      '/users/user-search/retrieve-users-with-get-users-endpoint',
    ],
    to: '/manage-users/user-search/retrieve-users-with-get-users-endpoint',
  },
  {
    from: ['/users/search/v3/sort-search-results', '/users/user-search/sort-search-results'],
    to: '/manage-users/user-search/sort-search-results',
  },
  {
    from: ['/users/search/v3/view-search-results-by-page', '/users/user-search/view-search-results-by-page'],
    to: '/manage-users/user-search/view-search-results-by-page',
  },
  {
    from: [
      '/link-accounts/auth-api',
      '/link-accounts',
      '/users/concepts/overview-user-account-linking',
      '/users/guide/concepts/overview-user-account-linking',
      '/users/user-account-linking',
    ],
    to: '/manage-users/user-accounts/user-account-linking',
  },
  {
    from: [
      '/users/guides/get-user-information-with-unbounce-landing-pages',
      '/users/get-user-information-on-unbounce-landing-pages',
    ],
    to: '/manage-users/user-accounts/get-user-information-on-unbounce-landing-pages',
  },
  {
    from: ['/users/verify-emails'],
    to: '/manage-users/user-accounts/verify-emails',
  },

  /* Videos */

  {
    from: [
      '/video-series/main/videos',
      '/videos',
  ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity',
      '/videos/learn-identity-series',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/01-introduction-to-identity',
      '/videos/learn-identity-series/learn-identity-series/introduction-to-identity',
      '/videos/learn-identity-series/introduction-to-identity',

    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/02-oidc-and-oauth',
      '/videos/learn-identity-series/openid-connect-and-oauth2',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/03-web-sign-in',
      '/videos/learn-identity-series/web-sign-in',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/04-calling-an-api',
      '/videos/learn-identity-series/calling-an-api',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/05-desktop-and-mobile-apps',
      '/videos/learn-identity-series/desktop-and-mobile-apps',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/learn-identity/06-single-page-apps',
      '/videos/learn-identity-series/single-page-apps',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started',
      '/videos/get-started-series',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/01-architecture-your-tenant',
      '/videos/get-started-series/architect-your-tenant',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/02-provision-user-stores',
      '/videos/get-started-series/provision-user-stores',
    ],
    to: '/articles',
    
  },
  {
    from: [
      '/videos/get-started/03-provision-import-users',
      '/videos/get-started-series/provision-import-users',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/04_01-authenticate-how-it-works',
      '/videos/get-started-series/authenticate-how-it-works',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/04_02-authenticate-spa-example', 
      '/videos/get-started/04_01-authenticate-spa-example',
      '/videos/get-started-series/authenticate-spa-example',
  ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/05_01-authorize-id-tokens-access-control',
      '/videos/get-started-series/authorize-id-tokens-and-access-control',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/05_02-authorize-get-validate-id-tokens',
      '/videos/get-started-series/authorize-get-and-validate-id-tokens',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/06-user-profiles',
      '/videos/get-started-series/learn-user-profiles',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/07_01-brand-how-it-works',
      '/videos/get-started-series/brand-how-it-works',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/07_02-brand-signup-login-pages',
      '/videos/get-started-series/brand-signup-and-login-pages',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/08-brand-emails-error-pages',
      '/videos/get-started-series/brand-emails-and-error-pages',
    ],
    to: '/articles',
  },
  {
    from: [
      '/videos/get-started/10-logout',
      '/videos/get-started-series/learn-logout',
    ],
    to: '/articles',
  },

/* Forms */

{
    from: [
      '/customize/forms/intro-to-forms',
      '/customize/forms/fields',
    ],
    to: '/customize/forms/nodes-and-components',
},
  
];

module.exports = redirects;
