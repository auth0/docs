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
      '/design/browser-based-vs-native-experience-on-mobile',
      '/tutorials/browser-based-vs-native-experience-on-mobile',
    ],
    to: '/best-practices/mobile-device-login-flow-best-practices',
  },
  {
    from: '/topics/identity-glossary',
    to: '/glossary',
  },
  {
    from: ['/deploy/checklist'],
    to: '/deploy/deploy-checklist',
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
    from: ['/ios-tutorial', '/quickstart/native/ios', '/quickstart/native/ios-objc', '/native-platforms/ios-objc'],
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
    from: ['/nodejs-tutorial', '/server-platforms/nodejs'],
    to: '/quickstart/webapp/nodejs',
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
    ],
    to: '/quickstart/backend/aspnet-core-webapi',
  },
  {
    from: '/quickstart/webapp/aspnet-core-3',
    to: '/quickstart/webapp/aspnet-core',
  },
  {
    from: '/quickstart/webapp/nodejs/02-user-profile',
    to: '/quickstart/webapp/nodejs/01-login',
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
    from: '/quickstart',
    to: '/',
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
    ],
    to: '/connections/enterprise/azure-active-directory/v2',
  },
  {
    from: '/connections/enterprise/samlp',
    to: '/connections/enterprise/saml',
  },
  {
    from: ['/connections/enterprise/sharepoint-online', '/connections/enterprise/ws-fed'],
    to: '/connections/enterprise/saml',
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
      '/connections/adding-generic-oauth1-connection',
      '/oauth2',
    ],
    to: '/connections/social/oauth2',
  },
  {
    from: [
      '/protocols/oidc/identity-providers/okta',
      '/protocols/configure-okta-as-oidc-identity-provider',
      '/protocols/configure-okta-as-oauth2-identity-provider',
      '/authorization/protocols/configure-okta-as-oauth2-identity-provider',
    ],
    to: '/connections/social/configure-okta-as-oauth2-identity-provider',
  },
  {
    from: '/connections/social/auth0-oidc',
    to: '/connections/enterprise/oidc',
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
    from: '/ad',
    to: '/connections/enterprise/active-directory-ldap',
  },
  {
    from: '/connections/enterprise/ldap',
    to: '/connections/enterprise/active-directory-ldap',
  },
  {
    from: '/connections/enterprise/active-directory',
    to: '/connections/enterprise/active-directory-ldap',
  },
  {
    from: '/adfs',
    to: '/connections/enterprise/adfs',
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
    ],
    to: '/connections/passwordless',
  },
  {
    from: [
      '/connections/passwordless/guides/embedded-login',
      '/connections/passwordless/embedded-login',
    ],
    to: '/connections/passwordless/implement-login/embedded-login',
  },
  {
    from: '/password-strength',
    to: '/connections/database/password-strength',
  },
  {
    from: [
      '/identityproviders',
      '/applications/concepts/connections',
      '/applications/connections',
      '/clients/connections',
    ],
    to: '/connections',
  },
  {
    from: [
      '/connections/database/mysql',
      '/mysql-connection-tutorial',
      '/connections/database/custom-db/custom-db-connection-overview',
    ],
    to: '/connections/database/custom-db',
  },
  {
    from: ['/connections/database/password'],
    to: '/connections/database/password-options',
  },
  {
    from: [
      '/tutorials/adding-scopes-for-an-external-idp',
      '/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp',
    ],
    to: '/connections/adding-scopes-for-an-external-idp',
  },
  {
    from: [
      '/tutorials/calling-an-external-idp-api',
      '/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api',
    ],
    to: '/connections/calling-an-external-idp-api',
  },
  {
    from: ['/tutorials/how-to-test-partner-connection', '/test-partner-connection'],
    to: '/connections/how-to-test-partner-connection',
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
      ],
    to: '/connections/passwordless/authentication-methods/use-sms-gateway-passwordless',
  },
  {
    from: [
      '/connections/apple-setup',
      '/connections/apple-siwa/set-up-apple',
      '/connections/apple-siwa/add-siwa-web-app',
      '/connections/apple-siwa/add-siwa-to-web-app',
      '/connections/social/apple',
      '/connections/apple-siwa/test-siwa-connection',
    ],
    to: 'https://marketplace.auth0.com/integrations/apple-social-connection',
  },
  {
    from: [
      '/connections/apple-siwa/add-siwa-to-native-app',
      '/connections/nativesocial/add-siwa-to-native-app',
      '/connections/nativesocial/apple',
    ],
    to: '/connections/social/apple-native',
  },
  {
    from: ['/connections/nativesocial/facebook-native', '/connections/nativesocial/facebook'],
    to: '/connections/social/facebook-native',
  },
  {
    from: ['/connections/passwordless/email', '/connections/passwordless/guides/email-otp'],
    to: '/connections/passwordless/email-otp',
  },
  {
    from: ['/connections/passwordless/sms', '/connections/passwordless/guides/sms-otp'],
    to: '/connections/passwordless/sms-otp',
  },
  {
    from: [
      '/connections/passwordless/spa', 
      '/connections/passwordless/guides/universal-login',
      '/connections/passwordless/regular-web-app',
      '/connections/passwordless/universal-login'
    ],
    to: '/connections/passwordless/implement-login/universal-login',
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
    ],
    to: '/connections/social',
  },
  {
    from: [
      '/connections/identity-providers-enterprise',
      '/connections/enterprise/identityproviders',
      '/connections/enterprise/identity-providers',
      '/connections/enterprise/sharepoint-apps',
      '/sharepoint-clientid',
    ],
    to: '/connections/enterprise',
  },
  {
    from: ['/connections/identity-providers-legal'],
    to: '/connections/legal',
  },
  {
    from: ['/line', '/connections/social/line'],
    to: 'https://marketplace.auth0.com/integrations/line-social-connection',
  },
  {
    from: ['/connections/passwordless/concepts/sample-use-cases-rules'],
    to: '/connections/passwordless/sample-use-cases-rules',
  },
  {
    from: ['/connections/azure-active-directory-native'],
    to: '/connections/enterprise/azure-active-directory-native',
  },
  {
    from: [
      '/connections/passwordless/authentication-factors',
      ],
    to: '/connections/passwordless/authentication-methods',
  },
  {
    from: [
      '/connections/passwordless/email-otp', 
      '/connections/passwordless/email',
      '/connections/passwordless/authentication-factors/email-otp',
      ],
    to: '/connections/passwordless/authentication-methods/email-otp',
  },
  {
    from: [
      '/connections/passwordless/email-magic-link',
      '/connections/passwordless/authentication-factors/email-magic-link',
      ],
    to: '/connections/passwordless/authentication-methods/email-magic-link',
  },
  {
    from: [
      '/connections/passwordless/sms-otp', 
      '/connections/passwordless/sms',
      '/connections/passwordless/authentication-factors/sms-otp'
      ],
    to: '/connections/passwordless/authentication-methods/sms-otp',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-spa',
      '/connections/passwordless/embedded-login/spa',
      ],
    to: '/connections/passwordless/implement-login/embedded-login/spa',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-webapps',
      '/connections/passwordless/embedded-login/webapps',
      ],
    to: '/connections/passwordless/implement-login/embedded-login/webapps',
  },
  {
    from: [
      '/connections/passwordless/embedded-login-native', 
      '/connections/passwordless/guides/embedded-login-native',
      '/connections/passwordless/embedded-login/native',
      ],
    to: '/connections/passwordless/implement-login/embedded-login/native',
  },
  {
    from: [
      '/connections/passwordless/relevant-api-endpoints',
      '/connections/passwordless/embedded-login/relevant-api-endpoints',
      ],
    to: '/connections/passwordless/implement-login/embedded-login/relevant-api-endpoints',
  },
  {
    from: ['/connections/azuread-adfs-email-verification'],
    to: '/connections/enterprise/azuread-adfs-email-verification',
  },
  {
    from: ['/database/custom-db/templates/get-user'],
    to: '/connections/database/custom-db/templates/get-user',
  },

  /* MICROSITES */

  /* ARCHITECTURE SCENARIOS */

  {
    from: '/architecture-scenarios/application/mobile-api',
    to: '/architecture-scenarios/mobile-api',
  },
  {
    from: '/architecture-scenarios/application/server-api',
    to: '/architecture-scenarios/server-api',
  },
  {
    from: [
      '/architecture-scenarios/application/spa-api',
      '/architecture-scenarios/sequence-diagrams',
      '/sequence-diagrams',
    ],
    to: '/architecture-scenarios/spa-api',
  },
  {
    from: '/architecture-scenarios/application/web-app-sso',
    to: '/architecture-scenarios/web-app-sso',
  },
  {
    from: '/architecture-scenarios/business/b2b',
    to: '/architecture-scenarios/b2b',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-architecture',
      '/architecture-scenarios/implementation/b2b/b2b-architecture',
    ],
    to: '/architecture-scenarios/b2b/architecture',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-authentication',
      '/architecture-scenarios/implementation/b2b/b2b-authentication',
    ],
    to: '/architecture-scenarios/b2b/authentication',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-authorization',
      '/architecture-scenarios/implementation/b2b/b2b-authorization',
    ],
    to: '/architecture-scenarios/b2b/authorization',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-branding', '/architecture-scenarios/implementation/b2b/b2b-branding'],
    to: '/architecture-scenarios/b2b/branding',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-deployment', '/architecture-scenarios/implementation/b2b/b2b-deployment'],
    to: '/architecture-scenarios/b2b/deployment',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-launch', '/architecture-scenarios/implementation/b2b/b2b-launch'],
    to: '/architecture-scenarios/b2b/launch',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-compliance',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-compliance',
    ],
    to: '/architecture-scenarios/b2b/launch/compliance-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-launch',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-launch',
    ],
    to: '/architecture-scenarios/b2b/launch/launch-day',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-operations',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-operations',
    ],
    to: '/architecture-scenarios/b2b/launch/operations-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-support',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-support',
    ],
    to: '/architecture-scenarios/b2b/launch/support-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-launch-testing',
      '/architecture-scenarios/implementation/b2b/b2b-launch/b2b-launch-testing',
    ],
    to: '/architecture-scenarios/b2b/launch/testing',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-logout', '/architecture-scenarios/implementation/b2b/b2b-logout'],
    to: '/architecture-scenarios/b2b/logout',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-operations', '/architecture-scenarios/implementation/b2b/b2b-operations'],
    to: '/architecture-scenarios/b2b/operations',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-profile-mgmt',
      '/architecture-scenarios/implementation/b2b/b2b-profile-mgmt',
    ],
    to: '/architecture-scenarios/b2b/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/b2b/b2b-provisioning',
      '/architecture-scenarios/implementation/b2b/b2b-provisioning',
    ],
    to: '/architecture-scenarios/b2b/provisioning',
  },
  {
    from: ['/architecture-scenarios/b2b/b2b-qa', '/architecture-scenarios/implementation/b2b/b2b-qa'],
    to: '/architecture-scenarios/b2b/quality-assurance',
  },
  {
    from: '/architecture-scenarios/business/b2c',
    to: '/architecture-scenarios/b2c',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-architecture',
      '/architecture-scenarios/implementation/b2c/b2c-architecture',
    ],
    to: '/architecture-scenarios/b2c/architecture',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-authentication',
      '/architecture-scenarios/implementation/b2c/b2c-authentication',
    ],
    to: '/architecture-scenarios/b2c/authentication',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-authorization',
      '/architecture-scenarios/implementation/b2c/b2c-authorization',
    ],
    to: '/architecture-scenarios/b2c/authorization',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-branding', '/architecture-scenarios/implementation/b2c/b2c-branding'],
    to: '/architecture-scenarios/b2c/branding',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-deployment', '/architecture-scenarios/implementation/b2c/b2c-deployment'],
    to: '/architecture-scenarios/b2c/deployment',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-launch', '/architecture-scenarios/implementation/b2c/b2c-launch'],
    to: '/architecture-scenarios/b2c/launch',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-compliance',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-compliance',
    ],
    to: '/architecture-scenarios/b2c/launch/compliance-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-launch',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-launch',
    ],
    to: '/architecture-scenarios/b2c/launch/launch-day',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-operations',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-operations',
    ],
    to: '/architecture-scenarios/b2c/launch/operations-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-support',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-support',
    ],
    to: '/architecture-scenarios/b2c/launch/support-readiness',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-launch-testing',
      '/architecture-scenarios/implementation/b2c/b2c-launch/b2c-launch-testing',
    ],
    to: '/architecture-scenarios/b2c/launch/testing',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-logout', '/architecture-scenarios/implementation/b2c/b2c-logout'],
    to: '/architecture-scenarios/b2c/logout',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-operations', '/architecture-scenarios/implementation/b2c/b2c-operations'],
    to: '/architecture-scenarios/b2c/operations',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-profile-mgmt',
      '/architecture-scenarios/implementation/b2c/b2c-profile-mgmt',
    ],
    to: '/architecture-scenarios/b2c/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/b2c/b2c-provisioning',
      '/architecture-scenarios/implementation/b2c/b2c-provisioning',
    ],
    to: '/architecture-scenarios/b2c/provisioning',
  },
  {
    from: ['/architecture-scenarios/b2c/b2c-qa', '/architecture-scenarios/implementation/b2c/b2c-qa'],
    to: '/architecture-scenarios/b2c/quality-assurance',
  },
  {
    from: '/architecture-scenarios/business/b2e',
    to: '/architecture-scenarios/b2e',
  },
  {
    from: '/architecture-scenarios/application/mobile-api/api-implementation-nodejs',
    to: '/architecture-scenarios/mobile-api/api-implementation-nodejs',
  },
  {
    from: '/architecture-scenarios/application/mobile-api/mobile-implementation-android',
    to: '/architecture-scenarios/mobile-api/mobile-implementation-android',
  },
  {
    from: '/architecture-scenarios/application/server-api/api-implementation-nodejs',
    to: '/architecture-scenarios/server-api/api-implementation-nodejs',
  },
  {
    from: '/architecture-scenarios/application/server-api/cron-implementation-python',
    to: '/architecture-scenarios/server-api/cron-implementation-python',
  },
  {
    from: '/architecture-scenarios/application/spa-api/spa-implementation-angular2',
    to: '/architecture-scenarios/spa-api/spa-implementation-angular2',
  },
  {
    from: '/architecture-scenarios/application/spa-api/api-implementation-nodejs',
    to: '/architecture-scenarios/spa-api/api-implementation-nodejs',
  },
  {
    from: '/architecture-scenarios/application/web-app-sso/implementation-aspnetcore',
    to: '/architecture-scenarios/web-app-sso/implementation-aspnetcore',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/provisioning',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/provisioning',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/provisioning',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authentication',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/authentication',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/authentication',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/branding',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/branding',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/branding',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/authorization',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/authorization',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/authorization',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/profile-management',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/profile-management',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/profile-management',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/single-identity-provider-organizations/logout',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/single-identity-provider-organizations/logout',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/single-idp-orgs/logout',
  },
  {
    from: [
      '/architecture-scenarios/multiple-organization-architecture/multiple-identity-provider-organizations',
      '/architecture-scenarios/multiple-organization-architecture/users-isolated-by-organization/multiple-identity-provider-organizations',
    ],
    to: '/architecture-scenarios/multiple-organization-architecture/multiple-idp-orgs',
  },

  /* CONTENTFUL REDIRECTS */

  /* Configure */

  {
    from: ['/configuration-overview', '/config'],
    to: '/configure',
  },

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
    ],
    to: '/configure/tenant-settings',
  },
  {
    from: ['/tokens/manage-signing-keys', '/tokens/guides/manage-signing-keys', '/config/tenant-settings/signing-keys'],
    to: '/configure/tenant-settings/signing-keys',
  },
  {
    from: '/config/tenant-settings/signing-keys/rotate-signing-keys',
    to: '/configure/tenant-settings/signing-keys/rotate-signing-keys',
  },
  {
    from: '/config/tenant-settings/signing-keys/revoke-signing-keys',
    to: '/configure/tenant-settings/signing-keys/revoke-signing-keys',
  },
  {
    from: '/config/tenant-settings/signing-keys/view-signing-certificates',
    to: '/configure/tenant-settings/signing-keys/view-signing-certificates',
  },
  {
    from: [
      '/get-started/dashboard/configure-device-user-code-settings',
      '/dashboard/guides/tenants/configure-device-user-code-settings',
      '/config/tenant-settings/configure-device-user-code-settings',
    ],
    to: '/configure/tenant-settings/configure-device-user-code-settings',
  },
  {
    from: ['/get-started/dashboard/enable-sso-for-legacy-tenants', '/dashboard/guides/tenants/enable-sso-tenant'],
    to: '/configure/tenant-settings/enable-sso-for-legacy-tenants',
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
    ],
    to: '/configure/applications',
  },
  {
    from: [
      '/clients/client-settings',
      '/dashboard/reference/settings-application',
      '/get-started/dashboard/application-settings',
      '/best-practices/application-settings',
      '/best-practices/app-settings-best-practices',
      '/applications/application-settings',
    ],
    to: '/configure/applications/application-settings',
  },
  {
    from: [
      '/applications/dynamic-client-registration',
      '/api-auth/dynamic-client-registration',
      '/api-auth/dynamic-application-registration',
    ],
    to: '/configure/applications/dynamic-client-registration',
  },
  {
    from: [
      '/dashboard/guides/applications/enable-android-app-links',
      '/clients/enable-android-app-links',
      '/applications/enable-android-app-links',
      '/applications/guides/enable-android-app-links-dashboard',
      '/applications/enable-android-app-links-support',
    ],
    to: '/configure/applications/enable-android-app-links-support',
  },
  {
    from: [
      '/dashboard/guides/applications/enable-universal-links',
      '/clients/enable-universal-links',
      '/applications/enable-universal-links',
      '/applications/guides/enable-universal-links-dashboard',
      '/enable-universal-links-support-in-apple-xcode',
      '/applications/enable-universal-links-support-in-apple-xcode',
    ],
    to: '/configure/applications/enable-universal-links-support-in-apple-xcode',
  },
  {
    from: ['/dashboard/guides/applications/enable-sso-app', '/sso/enable-sso-for-applications'],
    to: '/configure/applications/enable-sso-for-applications',
  },
  {
    from: '/applications/configure-application-metadata',
    to: '/configure/applications/configure-application-metadata',
  },
  {
    from: [
      '/applications/reference/grant-types-available',
      '/applications/reference/grant-types-auth0-mapping',
      '/clients/client-grant-types',
      '/applications/concepts/application-grant-types',
      '/applications/concepts/grant-types-legacy',
      '/applications/application-grant-types',
    ],
    to: '/configure/applications/application-grant-types',
  },
  {
    from: [
      '/api-auth/config/using-the-auth0-dashboard',
      '/api-auth/config/using-the-management-api',
      '/api/management/guides/applications/update-grant-types',
      '/dashboard/guides/applications/update-grant-types',
      '/applications/update-grant-types',
    ],
    to: '/configure/applications/update-grant-types',
  },
  {
    from: [
      '/authorization/revoke-access-to-apis-using-blacklists-or-application-grants',
      '/api-auth/blacklists-vs-grants',
      '/blacklists-vs-application-grants',
      '/authorization/revoke-api-access',
    ],
    to: '/configure/applications/revoke-api-access',
  },
  {
    from: [
      '/dashboard/guides/applications/rotate-client-secret',
      '/api/management/guides/applications/rotate-client-secret',
      '/get-started/dashboard/rotate-client-secret',
      '/applications/rotate-client-secret',
    ],
    to: '/configure/applications/rotate-client-secret',
  },
  {
    from: [
      '/tokens/signing-algorithms',
      '/applications/concepts/signing-algorithms',
      '/tokens/concepts/signing-algorithms',
    ],
    to: '/configure/applications/signing-algorithms',
  },
  {
    from: [
      '/dashboard/guides/applications/update-signing-algorithm',
      '/tokens/guides/update-signing-algorithm-application',
      '/applications/change-application-signing-algorithms',
    ],
    to: '/configure/applications/change-application-signing-algorithms',
  },
  {
    from: ['/applications/set-up-cors', '/dashboard/guides/applications/set-up-cors'],
    to: '/configure/applications/set-up-cors',
  },
  {
    from: [
      '/tutorials/openid-connect-discovery',
      '/protocols/oidc/openid-connect-discovery',
      '/oidc-rs256-owin',
      '/protocols/configure-applications-with-oidc-discovery',
    ],
    to: '/configure/applications/configure-applications-with-oidc-discovery',
  },
  {
    from: [
      '/protocols/configure-ws-fed-applications',
      '/integrations/configure-wsfed-application',
      '/tutorials/configure-wsfed-application',
    ],
    to: '/configure/applications/configure-ws-fed-applications',
  },
  {
    from: ['/applications/update-application-connections', '/dashboard/guides/applications/update-app-connections'],
    to: '/configure/applications/update-application-connections',
  },
  {
    from: [
      '/applications/concepts/app-types-confidential-public',
      '/applications/confidential-and-public-applications',
    ],
    to: '/configure/applications/confidential-public-apps',
  },
  {
    from: ['/dashboard/guides/applications/view-app-type-confidential-public', '/applications/view-application-type'],
    to: '/configure/applications/confidential-public-apps/view-application-type',
  },
  {
    from: [
      '/applications/first-party-and-third-party-applications',
      '/applications/concepts/app-types-first-third-party',
    ],
    to: '/configure/applications/confidential-public-apps/first-party-and-third-party-applications',
  },
  {
    from: ['/applications/view-application-ownership', '/api/management/guides/applications/view-ownership'],
    to: '/configure/applications/confidential-public-apps/view-application-ownership',
  },
  {
    from: [
      '/api/management/guides/applications/update-ownership',
      '/api/management/guides/applications/remove-app',
      '/applications/update-application-ownership',
    ],
    to: '/configure/applications/confidential-public-apps/update-application-ownership',
  },
  {
    from: [
      '/applications/guides/enable-third-party-applications',
      '/applications/guides/enable-third-party-apps',
      '/applications/enable-third-party-applications',
    ],
    to: '/configure/applications/confidential-public-apps/enable-third-party-applications',
  },
  {
    from: ['/api-auth/user-consent', '/authorization/user-consent-and-third-party-applications'],
    to: '/configure/applications/confidential-public-apps/user-consent-and-third-party-applications',
  },
  {
    from: ['/applications/wildcards-for-subdomains', '/applications/reference/wildcard-subdomains'],
    to: '/configure/applications/wildcards-for-subdomains',
  },
  {
    from: ['/applications/remove-applications', '/dashboard/guides/applications/remove-app'],
    to: '/configure/applications/remove-applications',
  },
  {
    from: [
      '/dev-lifecycle/work-with-auth0-locally',
      '/dev-lifecycle/local-testing-and-development',
      '/applications/work-with-auth0-locally',
    ],
    to: '/configure/applications/work-with-auth0-locally',
  },
  {
    from: ['/applications/set-up-database-connections', '/dashboard/guides/connections/set-up-connections-database'],
    to: '/configure/applications/set-up-database-connections',
  },
  {
    from: [
      '/get-started/dashboard/test-database-connections',
      '/dashboard/guides/connections/test-connections-database',
    ],
    to: '/configure/applications/test-database-connections',
  },

  /* APIs */

  {
    from: ['/authorization/apis', '/api-auth/apis', '/overview/apis', '/apis'],
    to: '/configure/apis',
  },
  {
    from: [
      '/api-auth/references/dashboard/api-settings',
      '/dashboard/reference/settings-api',
      '/get-started/dashboard/api-settings',
      '/config/api-settings',
    ],
    to: '/configure/apis/api-settings',
  },
  {
    from: [
      '/dashboard/guides/apis/add-permissions-apis',
      '/api/management/guides/apis/update-permissions-apis',
      '/scopes/current/guides/define-scopes-using-dashboard',
      '/scopes/current/guides/define-api-scope-dashboard',
      '/get-started/dashboard/add-api-permissions',
      '/config/api-settings/add-api-permissions',
    ],
    to: '/configure/apis/add-api-permissions',
  },
  {
    from: [
      '/dashboard/guides/apis/delete-permissions-apis',
      '/get-started/dashboard/delete-api-permissions',
      '/config/api-settings/delete-api-permissions',
    ],
    to: '/configure/apis/delete-api-permissions',
  },
  {
    from: ['/scopes', '/scopes/current', '/scopes/legacy', '/scopes/preview'],
    to: '/configure/apis/scopes',
  },
  {
    from: ['/scopes/api-scopes', '/scopes/current/api-scopes'],
    to: '/configure/apis/scopes/api-scopes',
  },
  {
    from: [
      '/scopes/current/oidc-scopes',
      '/api-auth/tutorials/adoption/scope-custom-claims',
      '/scopes/oidc-scopes',
      '/scopes/openid-connect-scopes',
    ],
    to: '/configure/apis/scopes/openid-connect-scopes',
  },
  {
    from: ['/scopes/sample-use-cases-scopes-and-claims', '/scopes/current/sample-use-cases'],
    to: '/configure/apis/scopes/sample-use-cases-scopes-and-claims',
  },
  {
    from: [
      '/authorization/set-logical-api',
      '/authorization/represent-multiple-apis-using-a-single-logical-api',
      '/api-auth/tutorials/represent-multiple-apis',
    ],
    to: '/configure/apis/set-logical-api',
  },
  {
    from: [
      '/api/management/guides/apis/enable-rbac',
      '/dashboard/guides/apis/enable-rbac',
      '/authorization/guides/dashboard/enable-rbac',
      '/authorization/rbac/enable-role-based-access-control-for-apis',
      '/authorization/auth-core-features/enable-role-based-access-control-for-apis',
    ],
    to: '/configure/apis/enable-role-based-access-control-for-apis',
  },
  {
    from: [
      '/config/api-settings/create-m2m-app-test',
      '/api/management/v2/create-m2m-app',
      '/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application',
    ],
    to: '/configure/apis/create-m2m-app-test',
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
    ],
    to: '/configure/sso',
  },
  {
    from: ['/sso/inbound-single-sign-on', '/sso/current/inbound'],
    to: '/configure/sso/inbound-single-sign-on',
  },
  {
    from: ['/sso/outbound-single-sign-on', '/sso/current/outbound'],
    to: '/configure/sso/outbound-single-sign-on',
  },
  {
    from: [
      '/single-sign-on/api-endpoints-for-single-sign-on',
      '/sso/current/relevant-api-endpoints',
      '/sso/api-endpoints-for-single-sign-on',
    ],
    to: '/configure/sso/api-endpoints-for-single-sign-on',
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
    ],
    to: '/configure/saml-configuration',
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
    ],
    to: '/configure/saml-configuration/saml-sso-integrations',
  },
  {
    from: [
      '/protocols/saml/idp-initiated-sso',
      '/protocols/saml-configuration-options/identity-provider-initiated-single-sign-on',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/idp-initiated-sso',
      '/protocols/saml-protocol/saml-configuration-options/identity-provider-initiated-single-sign-on',
      '/protocols/saml-protocol/saml-sso-integrations/identity-provider-initiated-single-sign-on',
    ],
    to: '/configure/saml-configuration/saml-sso-integrations/identity-provider-initiated-single-sign-on',
  },
  {
    from: [
      '/protocols/saml-configuration-options/sign-and-encrypt-saml-requests',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/signing-and-encrypting-saml-requests',
      '/protocols/saml-protocol/saml-configuration-options/sign-and-encrypt-saml-requests',
      '/protocols/saml-protocol/saml-sso-integrations/sign-and-encrypt-saml-requests',
    ],
    to: '/configure/saml-configuration/saml-sso-integrations/sign-and-encrypt-saml-requests',
  },
  {
    from: [
      '/protocols/saml-protocol/saml-configuration-options/work-with-certificates-and-keys-as-strings',
      '/protocols/saml/saml-configuration/special-configuration-scenarios/work-with-certificates-and-keys-as-strings',
      '/protocols/saml-protocol/saml-sso-integrations/work-with-certificates-and-keys-as-strings',
    ],
    to: '/configure/saml-configuration/saml-sso-integrations/work-with-certificates-and-keys-as-strings',
  },
  {
    from: [
      '/saml2webapp-tutorial',
      '/protocols/saml/saml2webapp-tutorial',
      '/protocols/saml-protocol/saml-configuration-options/enable-saml2-web-app-addon',
    ],
    to: '/configure/saml-configuration/saml-sso-integrations/enable-saml2-web-app-addon',
  },
  {
    from: [
      '/protocols/saml-configuration-options/configure-auth0-saml-service-provider',
      '/protocols/saml/saml-sp-generic',
      '/saml-sp-generic',
      '/protocols/saml/saml-configuration/auth0-as-service-provider',
      '/protocols/saml-protocol/configure-auth0-saml-service-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider',
  },
  {
    from: [
      '/protocols/saml/adfs',
      '/protocols/saml-protocol/saml-configuration-options/configure-adfs-saml-connections',
      '/protocols/saml-protocol/saml-sso-integrations/configure-adfs-saml-connections',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-adfs-saml-connections',
  },
  {
    from: [
      '/protocols/saml/identity-providers/okta',
      '/okta',
      '/saml/identity-providers/okta',
      '/protocols/saml-configuration-options/configure-okta-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-okta-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-okta-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-okta-as-saml-identity-provider',
  },
  {
    from: [
      '/onelogin',
      '/saml/identity-providers/onelogin',
      '/protocols/saml/identity-providers/onelogin',
      '/protocols/saml-configuration-options/configure-onelogin-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-onelogin-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-onelogin-as-saml-identity-provider',
  },
  {
    from: [
      '/ping7',
      '/saml/identity-providers/ping7',
      '/protocols/saml/identity-providers/ping7',
      '/protocols/saml-configuration-options/configure-pingfederate-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration/configure-pingfederate-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-pingfederate-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-pingfederate-as-saml-identity-provider',
  },
  {
    from: [
      '/saml/identity-providers/salesforce',
      '/protocols/saml/identity-providers/salesforce',
      '/protocols/saml-configuration-options/configure-salesforce-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-salesforce-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-salesforce-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-salesforce-as-saml-identity-provider',
  },
  {
    from: [
      '/siteminder',
      '/saml/identity-providers/siteminder',
      '/protocols/saml/identity-providers/siteminder',
      '/protocols/saml-configuration-options/configure-siteminder-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-siteminder-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-siteminder-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-siteminder-as-saml-identity-provider',
  },
  {
    from: [
      '/ssocircle',
      '/saml/identity-providers/ssocircle',
      '/protocols/saml/identity-providers/ssocircle',
      '/protocols/saml-configuration-options/configure-ssocircle-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-configuration-options/configure-ssocircle-as-saml-identity-provider',
      '/protocols/saml-protocol/saml-sso-integrations/configure-ssocircle-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-service-provider/configure-ssocircle-as-saml-identity-provider',
  },
  {
    from: [
      '/protocols/saml-configuration-options/configure-auth0-as-saml-identity-provider',
      '/saml-idp-generic',
      '/protocols/saml/saml-idp-generic',
      '/protocols/saml/saml-configuration/auth0-as-identity-provider',
      '/protocols/saml-protocol/configure-auth0-as-saml-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider',
  },
  {
    from: [
      '/configure/saml-configuration-options/configure-saml2-web-app-addon-for-aws',
      '/dashboard/guides/applications/set-up-addon-saml2-aws',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-aws',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-aws',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-aws',
  },
  {
    from: [
      '/protocols/saml/saml-apps/atlassian',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-atlassian',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-atlassian',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-atlassian',
  },
  {
    from: [
      '/saml-apps/cisco-webex',
      '/protocols/saml/saml-apps/cisco-webex',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-cisco-webex',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-cisco-webex',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-cisco-webex',
  },
  {
    from: [
      '/saml-apps/datadog',
      '/protocols/saml/saml-apps/datadog',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-datadog',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-datadog',
  },
  {
    from: [
      '/protocols/saml/saml-apps/egencia',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-egencia',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-egencia',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-egencia',
  },
  {
    from: [
      '/protocols/saml/saml-idp-eloqua',
      '/protocols/saml/saml-apps/eloqua',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-addon-eloqua',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-addon-eloqua',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-addon-eloqua',
  },
  {
    from: [
      '/saml-apps/freshdesk',
      '/protocols/saml/saml-apps/freshdesk',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-freshdesk',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-freshdesk',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-freshdesk',
  },
  {
    from: [
      '/protocols/saml/saml-apps/github-cloud',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-cloud',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-github-enterprise-cloud',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-cloud',
  },
  {
    from: [
      '/integrations/using-auth0-as-an-identity-provider-with-github-enterprise',
      '/protocols/saml/saml-apps/github-server',
      '/tutorials/using-auth0-as-an-identity-provider-with-github-enterprise',
      '/scenarios/github',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-github-enterprise-server',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-github-enterprise-server',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-github-enterprise-server',
  },
  {
    from: [
      '/protocols/saml/saml-apps/google-apps',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-idp-for-google-g-suite',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-idp-for-google-g-suite',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-idp-for-google-g-suite',
  },
  {
    from: [
      '/protocols/saml/saml-apps/heroku',
      '/saml-apps/heroku-sso',
      '/protocols/saml-protocol/saml-configuration-options/configure-saml2-web-app-addon-for-heroku',
      '/protocols/saml-protocol/saml-sso-integrations/configure-saml2-web-app-addon-for-heroku',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-saml2-web-app-addon-for-heroku',
  },
  {
    from: [
      '/protocols/saml/saml-apps/hosted-graphite',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-hosted-graphite',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-hosted-graphite',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-hosted-graphite',
  },
  {
    from: [
      '/protocols/saml/saml-apps/litmos',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-litmos',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-litmos',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-litmos',
  },
  {
    from: [
      '/protocols/saml/saml-apps/pluralsight',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-pluralsight',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-pluralsight',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-pluralsight',
  },
  {
    from: [
      '/protocols/saml/saml-apps/sprout-video',
      '/saml-apps/sprout-video',
      '/protocols/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-sprout-video',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-sprout-video',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-sprout-video',
  },
  {
    from: [
      '/protocols/saml/saml-apps/tableau-online',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-online',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-tableau-online',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-online',
  },
  {
    from: [
      '/protocols/saml/saml-apps/tableau-server',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-tableau-server',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-tableau-server',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-tableau-server',
  },
  {
    from: [
      '/protocols/saml/saml-apps/workday',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-workday',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-workday',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workday',
  },
  {
    from: [
      '/protocols/saml/saml-apps/workpath',
      '/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-workpath',
      '/protocols/saml-protocol/saml-sso-integrations/configure-auth0-as-identity-provider-for-workpath',
    ],
    to: '/configure/saml-configuration/configure-auth0-saml-identity-provider/configure-auth0-as-identity-provider-for-workpath',
  },
  {
    from: [
      '/protocols/saml-configuration-options/saml-identity-provider-configuration-settings',
      '/samlp',
      '/protocols/saml/samlp',
      '/protocols/saml-protocol/saml-identity-provider-configuration-settings',
    ],
    to: '/configure/saml-configuration/saml-identity-provider-configuration-settings',
  },
  {
    from: [
      '/protocols/saml-configuration-options/customize-saml-assertions',
      '/protocols/saml/saml-configuration/saml-assertions',
      '/protocols/saml-protocol/customize-saml-assertions',
    ],
    to: '/configure/saml-configuration/customize-saml-assertions',
  },
  {
    from: [
      '/protocols/saml-configuration-options/test-saml-sso-with-auth0-as-service-and-identity-provider',
      '/protocols/saml/samlsso-auth0-to-auth0',
      '/samlsso-auth0-to-auth0',
      '/protocols/saml-configuration-options/configure-auth0-as-service-and-identity-provider',
      '/protocols/saml/saml-configuration/auth0-as-identity-and-service-provider',
      '/protocols/saml-protocol/configure-auth0-as-service-and-identity-provider',
    ],
    to: '/configure/saml-configuration/configure-auth0-as-service-and-identity-provider',
  },
  {
    from: [
      '/protocols/saml-configuration-options/deprovision-users-in-saml-integrations',
      '/protocols/saml/saml-configuration/deprovision-users',
      '/protocols/saml-protocol/deprovision-users-in-saml-integrations',
    ],
    to: '/configure/saml-configuration/deprovision-users-in-saml-integrations',
  },

  /* Signing Keys */

  {
    from: ['/actions/build-actions-flows', '/actions/edit-actions', '/actions/troubleshoot-actions'],
    to: '/actions/write-your-first-action',
  },
  {
    from: ['/actions/actions-context-object', '/actions/actions-event-object', '/actions/blueprints'],
    to: '/actions/triggers',
  },
  {
    from: ['/actions/manage-action-versions'],
    to: '/actions/manage-versions',
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
    ],
    to: '/configure/attack-protection',
  },
  {
    from: [
      '/anomaly-detection/references/breached-password-detection-triggers-actions',
      '/anomaly-detection/concepts/breached-passwords',
      '/anomaly-detection/breached-passwords',
      '/anomaly-detection/breached-password-security',
      '/attack-protection/breached-password-detection',
    ],
    to: '/configure/attack-protection/breached-password-detection',
  },
  {
    from: [
      '/anomaly-detection/bot-protection',
      '/anomaly-detection/guides/prevent-credential-stuffing-attacks',
      '/anomaly-detection/bot-and-credential-stuffing-protection',
      '/anomaly-detection/bot-detection',
      '/attack-protection/bot-detection',
    ],
    to: '/configure/attack-protection/bot-detection',
  },
  {
    from: [
      '/configure/anomaly-detection/bot-detection/configure-recaptcha-enterprise',
      '/anomaly-detection/bot-detection/configure-recaptcha-enterprise',
      '/attack-protection/bot-detection/configure-recaptcha-enterprise',
    ],
    to: '/configure/attack-protection/bot-detection/configure-recaptcha-enterprise',
  },
  {
    from: [
      '/anomaly-detection/bot-detection/bot-detection-custom-login-pages',
      '/configure/anomaly-detection/bot-detection/bot-detection-custom-login-pages',
      '/attack-protection/bot-detection/bot-detection-custom-login-pages',
    ],
    to: '/configure/attack-protection/bot-detection/bot-detection-custom-login-pages',
  },
  {
    from: [
      '/configure/anomaly-detection/bot-detection/bot-detection-native-apps',
      '/anomaly-detection/bot-detection/bot-detection-native-apps',
    ],
    to: '/configure/attack-protection/bot-detection/bot-detection-native-apps',
  },
  {
    from: [
      '/anomaly-detection/references/brute-force-protection-triggers-actions',
      '/anomaly-detection/guides/enable-disable-brute-force-protection',
      '/anomaly-detection/concepts/brute-force-protection',
      '/anomaly-detection/enable-and-disable-brute-force-protection',
      '/anomaly-detection/brute-force-protection',
      '/attack-protection/brute-force-protection',
    ],
    to: '/configure/attack-protection/brute-force-protection',
  },
  {
    from: [
      '/configure/anomaly-detection/suspicious-ip-throttling',
      '/anomaly-detection/suspicious-ip-throttling',
      '/attack-protection/suspicious-ip-throttling',
    ],
    to: '/configure/attack-protection/suspicious-ip-throttling',
  },
  {
    from: [
      '/anomaly-detection/guides/use-tenant-data-for-anomaly-detection',
      '/anomaly-detection/view-anomaly-detection-events',
      '/attack-protection/view-attack-protection-events',
    ],
    to: '/configure/attack-protection/view-attack-protection-events',
  },
  {
    from: [
      '/protocols/oauth2/oauth-state',
      '/protocols/oauth-state',
      '/protocols/oauth2/mitigate-csrf-attacks',
      '/protocols/state-parameters',
      '/authorization/protocols/state-parameters',
    ],
    to: '/configure/attack-protection/state-parameters',
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
    from: ['/api/management/v1', '/api-reference', '/api/v1/reference', '/api/management/v1/reference'],
    to: '/api/management-api-v1-deprecated',
  },
  {
    from: ['/api/management/v2/changes', '/apiv2Changes', '/api/v2/changes'],
    to: '/api/management-api-changes-v1-to-v2',
  },
  {
    from: ['/api/use-auth0-apis-with-postman-collections', '/api/postman'],
    to: '/api',
  },

  /* Authorization */

  {
    from: ['/api-auth', '/api-auth/tutorials', '/api/tutorials'],
    to: '/authorization',
  },
  {
    from: ['/authorization/concepts/policies'],
    to: '/authorization/authorization-policies',
  },
  {
    from: ['/authorization/rules-for-authorization-policies', '/authorization/concepts/authz-rules'],
    to: '/authorization/authorization-policies/rules-for-authorization-policies',
  },
  {
    from: [
      '/api-auth/restrict-access-api',
      '/api-auth/restrict-requests-for-scopes',
      '/authorization/concepts/sample-use-cases-rules',
      '/authorization/restrict-access-api',
      '/authorization/sample-use-cases-rules-with-authorization',
    ],
    to: '/authorization/authorization-policies/sample-use-cases-rules-with-authorization',
  },
  {
    from: ['/flows', '/login/flows', '/flows/concepts/token-exchange'],
    to: '/authorization/flows',
  },
  {
    from: [
      '/api-auth/which-oauth-flow-to-use',
      '/api-auth/faq',
      '/authorization/authentication-and-authorization-api-faq',
      '/authorization/which-oauth-2-0-flow-should-i-use',
    ],
    to: '/authorization/flows/which-oauth-2-0-flow-should-i-use',
  },
  {
    from: [
      '/flows/concepts/auth-code',
      '/flows/concepts/regular-web-app-login-flow',
      '/api-auth/grant/authorization-code',
      '/api-auth/tutorials/adoption/authorization-code',
      '/api-auth/adoption/authorization-code',
      '/flows/authorization-code-flow',
    ],
    to: '/authorization/flows/authorization-code-flow',
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
    ],
    to: '/authorization/flows/call-your-api-using-the-authorization-code-flow',
  },
  {
    from: [
      '/flows/concepts/auth-code-pkce',
      '/api-auth/grant/authorization-code-pkce',
      '/flows/concepts/mobile-login-flow',
      '/flows/concepts/single-page-login-flow',
      '/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce',
    ],
    to: '/authorization/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce',
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
    ],
    to: '/authorization/flows/call-your-api-using-the-authorization-code-flow-with-pkce',
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
    ],
    to: '/authorization/flows/implicit-flow-with-form-post',
  },
  {
    from: ['/api-auth/tutorials/nonce', '/authorization/mitigate-replay-attacks-when-using-the-implicit-flow'],
    to: '/authorization/flows/mitigate-replay-attacks-when-using-the-implicit-flow',
  },
  {
    from: ['/flows/hybrid-flow', '/api-auth/grant/hybrid'],
    to: '/authorization/flows/hybrid-flow',
  },
  {
    from: ['/api-auth/tutorials/hybrid-flow', '/flows/call-api-hybrid-flow'],
    to: '/authorization/flows/call-api-hybrid-flow',
  },
  {
    from: [
      '/flows/concepts/client-credentials',
      '/flows/concepts/m2m-flow',
      '/api-auth/grant/client-credentials',
      '/api-auth/tutorials/adoption/client-credentials',
      '/flows/client-credentials-flow',
    ],
    to: '/authorization/flows/client-credentials-flow',
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
    ],
    to: '/authorization/flows/call-your-api-using-the-client-credentials-flow',
  },
  {
    from: [
      '/api-auth/tutorials/client-credentials/customize-with-hooks',
      '/api-auth/grant/using-rules',
      '/authorization/customize-tokens-using-hooks-with-client-credentials-flow',
    ],
    to: '/authorization/flows/customize-tokens-using-hooks-with-client-credentials-flow',
  },
  {
    from: ['/flows/concepts/device-auth', '/flows/device-authorization-flow'],
    to: '/authorization/flows/device-authorization-flow',
  },
  {
    from: ['/flows/guides/device-auth/call-api-device-auth'],
    to: '/authorization/flows/call-your-api-using-the-device-authorization-flow',
  },
  {
    from: ['/api-auth/grant/password', '/api-auth/tutorials/adoption/password', '/flows/resource-owner-password-flow'],
    to: '/authorization/flows/resource-owner-password-flow',
  },
  {
    from: ['/flows/call-your-api-using-resource-owner-password-flow', '/api-auth/tutorials/password-grant'],
    to: '/authorization/flows/call-your-api-using-resource-owner-password-flow',
  },
  {
    from: [
      '/api-auth/tutorials/using-resource-owner-password-from-server-side',
      '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-anomaly-detection',
      '/authorization/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
    ],
    to: '/authorization/flows/avoid-common-issues-with-resource-owner-password-flow-and-attack-protection',
  },
  {
    from: ['/authorization/concepts/rbac'],
    to: '/authorization/rbac',
  },
  {
    from: ['/authorization/authorization-core-vs-authorization-extension', '/authorization/concepts/core-vs-extension'],
    to: '/authorization/rbac/authorization-core-vs-authorization-extension',
  },
  {
    from: [
      '/authorization/sample-use-cases-role-based-access-control',
      '/authorization/concepts/sample-use-cases-rbac',
    ],
    to: '/authorization/rbac/sample-use-cases-role-based-access-control',
  },
  {
    from: [
      '/authorization/how-to-use-auth0s-core-authorization-feature-set',
      '/authorization/guides/how-to',
      '/authorization/auth-core-features',
    ],
    to: '/authorization/rbac/auth-core-features',
  },
  {
    from: '/authorization/guides/manage-roles',
    to: '/authorization/rbac/roles',
  },
  {
    from: ['/dashboard/guides/roles/create-roles', '/api/management/guides/roles/create-roles'],
    to: '/authorization/rbac/roles/create-roles',
  },
  {
    from: [
      '/dashboard/guides/roles/edit-role-definitions',
      '/api/management/guides/roles/edit-role-definitions',
      '/authorization/guides/api/edit-role-definitions',
    ],
    to: '/authorization/rbac/roles/edit-role-definitions',
  },
  {
    from: ['/dashboard/guides/roles/add-permissions-roles', '/api/management/guides/roles/add-permissions-roles'],
    to: '/authorization/rbac/roles/add-permissions-to-roles',
  },
  {
    from: ['/dashboard/guides/roles/view-role-permissions', '/api/management/guides/roles/view-role-permissions'],
    to: '/authorization/rbac/roles/view-role-permissions',
  },
  {
    from: ['/dashboard/guides/roles/remove-role-permissions', '/api/management/guides/roles/remove-role-permissions'],
    to: '/authorization/rbac/roles/remove-permissions-from-roles',
  },
  {
    from: ['/api/management/guides/roles/view-role-users', '/dashboard/guides/roles/view-role-users'],
    to: '/authorization/rbac/roles/view-users-assigned-to-roles',
  },
  {
    from: ['/dashboard/guides/roles/delete-roles', '/api/management/guides/roles/delete-roles'],
    to: '/authorization/rbac/roles/delete-roles',
  },
  {
    from: ['/authorization/auth-core-features/rbac-users', '/authorization/guides/manage-users'],
    to: '/authorization/rbac/rbac-users',
  },
  {
    from: [
      '/users/assign-roles-to-users',
      '/dashboard/guides/users/assign-roles-users',
      '/api/management/guides/users/assign-roles-users',
    ],
    to: '/authorization/rbac/rbac-users/assign-roles-to-users',
  },
  {
    from: [
      '/dashboard/guides/users/view-user-roles',
      '/api/management/guides/users/view-user-roles',
      '/users/view-user-roles',
    ],
    to: '/authorization/rbac/rbac-users/view-user-roles',
  },
  {
    from: [
      '/dashboard/guides/users/remove-user-roles',
      '/dashboard/guides/roles/remove-role-users',
      '/api/management/guides/users/remove-user-roles',
      '/users/remove-roles-from-users',
    ],
    to: '/authorization/rbac/rbac-users/remove-roles-from-users',
  },
  {
    from: [
      '/dashboard/guides/users/assign-permissions-users',
      '/api/management/guides/users/assign-permissions-users',
      '/users/assign-permissions-to-users',
    ],
    to: '/authorization/rbac/rbac-users/assign-permissions-to-users',
  },
  {
    from: [
      '/dashboard/guides/users/view-user-permissions',
      '/api/management/guides/users/view-user-permissions',
      '/users/view-user-permissions',
    ],
    to: '/authorization/rbac/rbac-users/view-user-permissions',
  },
  {
    from: [
      '/dashboard/guides/users/remove-user-permissions',
      '/api/management/guides/users/remove-user-permissions',
      '/users/remove-permissions-from-users',
    ],
    to: '/authorization/rbac/rbac-users/remove-permissions-from-users',
  },
  {
    from: ['/authorization/manage-permissions', '/authorization/guides/manage-permissions'],
    to: '/authorization/rbac/manage-permissions',
  },

  /* Protocols */

  {
    from: '/protocols',
    to: '/authorization/protocols',
  },
  {
    from: ['/protocols/protocol-oauth2', '/protocols/oauth2'],
    to: '/authorization/protocols/protocol-oauth2',
  },
  {
    from: ['/protocols/openid-connect-protocol', '/protocols/oidc', '/api-auth/intro', '/api-auth/tutorials/adoption'],
    to: '/authorization/protocols/openid-connect-protocol',
  },
  {
    from: ['/protocols/ws-fed', '/tutorials/wsfed-web-app', '/wsfedwebapp-tutorial', '/protocols/ws-fed-protocol'],
    to: '/authorization/protocols/ws-fed-protocol',
  },

  /* Best Practices */

  {
    from: [
      '/best-practices/custom-db-connections',
      '/best-practices/custom-db-connections-scripts',
      '/best-practices/custom-database-connection-and-action-script-best-practices',
    ],
    to: '/best-practices/custom-database-connections-scripts',
  },
  {
    from: [
      '/best-practices/custom-db-connections/anatomy',
      '/best-practices/custom-db-connections/size',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-anatomy-best-practices',
    ],
    to: '/best-practices/custom-database-connections-scripts/anatomy',
  },
  {
    from: [
      '/best-practices/custom-db-connections/environment',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-action-script-environment-best-practices',
    ],
    to: '/best-practices/custom-database-connections-scripts/environment',
  },
  {
    from: [
      '/best-practices/custom-db-connections/execution',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-database-action-script-execution-best-practices',
    ],
    to: '/best-practices/custom-database-connections-scripts/execution',
  },
  {
    from: [
      '/best-practices/custom-db-connections/security',
      '/best-practices/custom-database-connection-and-action-script-best-practices/custom-db-connection-security-best-practices',
    ],
    to: '/best-practices/custom-database-connections-scripts/connection-security',
  },
  {
    from: ['/best-practices/connection-settings'],
    to: '/best-practices/connection-settings-best-practices',
  },
  {
    from: ['/best-practices/debugging'],
    to: '/best-practices/debugging-best-practices',
  },
  {
    from: ['/best-practices/deployment'],
    to: '/best-practices/deployment-best-practices',
  },
  {
    from: ['/best-practices/error-handling'],
    to: '/best-practices/error-handling-best-practices',
  },
  {
    from: ['/best-practices/operations'],
    to: '/best-practices/general-usage-and-operations-best-practices',
  },
  {
    from: ['/best-practices/performance'],
    to: '/best-practices/performance-best-practices',
  },
  {
    from: ['/best-practices/rules'],
    to: '/best-practices/rules-best-practices',
  },
  {
    from: ['/best-practices/search-best-practices', '/users/search/best-practices'],
    to: '/best-practices/user-search-best-practices',
  },
  {
    from: ['/best-practices/testing'],
    to: '/best-practices/rules-best-practices/rules-testing-best-practices',
  },
  {
    from: ['/tokens/concepts/token-best-practices', '/design/web-apps-vs-web-apis-cookies-vs-tokens'],
    to: '/best-practices/token-best-practices',
  },
  {
    from: [
      '/design/using-auth0-with-multi-tenant-apps',
      '/applications/concepts/multiple-tenants',
      '/tutorials/using-auth0-with-multi-tenant-apps',
      '/saas-apps',
    ],
    to: '/best-practices/multi-tenant-apps-best-practices',
  },

  /* Brand and Customize */

  {
    from: ['/branding-customization'],
    to: '/brand-and-customize',
  },
  {
    from: [
      '/universal-login/new-experience/universal-login-page-templates',
      '/universal-login/page-templates',
      '/universal-login/universal-login-page-customization',
    ],
    to: '/brand-and-customize/universal-login-page-templates',
  },
  {
    from: [
      '/universal-login/classic-experience/customization-classic',
      '/universal-login/customization-classic',
      '/universal-login/advanced-customization',
    ],
    to: '/brand-and-customize/customization-classic',
  },
  {
    from: [
      '/universal-login/version-control-universal-login-pages',
      '/universal-login/version-control',
      '/hosted-pages/version-control',
    ],
    to: '/brand-and-customize/version-control-universal-login-pages',
  },

  /* Custom Domains */

  {
    from: '/custom-domains',
    to: '/brand-and-customize/custom-domains',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-auth0-managed-certificates',
      '/custom-domains/auth0-managed-certificates',
    ],
    to: '/brand-and-customize/custom-domains/auth0-managed-certificates',
  },
  {
    from: [
      '/custom-domains/self-managed-certificates',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates',
    ],
    to: '/brand-and-customize/custom-domains/self-managed-certificates',
  },
  {
    from: '/custom-domains/tls-ssl',
    to: '/brand-and-customize/custom-domains/self-managed-certificates/tls-ssl',
  },
  {
    from: '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-gcp-as-reverse-proxy',
    to: '/brand-and-customize/custom-domains/self-managed-certificates/configure-gcp-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/set-up-cloudfront',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy',
    ],
    to: '/brand-and-customize/custom-domains/self-managed-certificates/configure-aws-cloudfront-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/set-up-cloudflare',
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy',
    ],
    to: '/brand-and-customize/custom-domains/self-managed-certificates/configure-cloudflare-for-use-as-reverse-proxy',
  },
  {
    from: [
      '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy',
      '/custom-domains/set-up-azure-cdn',
    ],
    to: '/brand-and-customize/custom-domains/self-managed-certificates/configure-azure-cdn-for-use-as-reverse-proxy',
  },
  {
    from: '/custom-domains/configure-custom-domains-with-self-managed-certificates/configure-akamai-for-use-as-reverse-proxy',
    to: '/brand-and-customize/custom-domains/self-managed-certificates/configure-akamai-for-use-as-reverse-proxy',
  },
  {
    from: ['/custom-domains/configure-features-to-use-custom-domains', '/custom-domains/additional-configuration'],
    to: '/brand-and-customize/custom-domains/configure-features-to-use-custom-domains',
  },

  /* Email */

  {
    from: ['/email', '/auth0-email-services'],
    to: '/brand-and-customize/email',
  },
  {
    from: ['/email/custom', '/auth0-email-services/manage-email-flow', '/email/manage-email-flow'],
    to: '/brand-and-customize/email/manage-email-flow',
  },
  {
    from: [
      '/email/templates',
      '/auth0-email-services/customize-email-templates',
      '/email/spa-redirect',
      '/auth0-email-services/spa-redirect',
      '/email/customize-email-templates',
    ],
    to: '/brand-and-customize/email/customize-email-templates',
  },
  {
    from: [
      '/email/customize-email-templates/email-template-descriptions',
      '/auth0-email-services/email-template-descriptions',
    ],
    to: '/brand-and-customize/email/email-template-descriptions',
  },
  {
    from: [
      '/anomaly-detection/guides/customize-blocked-account-emails',
      '/anomaly-detection/customize-blocked-account-emails',
      '/attack-protection/customize-blocked-account-emails',
    ],
    to: '/brand-and-customize/email/customize-blocked-account-emails',
  },
  {
    from: [
      '/email/liquid-syntax',
      '/auth0-email-services/customize-email-templates/use-liquid-syntax-in-email-templates',
      '/email/customize-email-templates/use-liquid-syntax-in-email-templates',
    ],
    to: '/brand-and-customize/email/use-liquid-syntax-in-email-templates',
  },
  {
    from: [
      '/design/creating-invite-only-applications',
      '/invite-only',
      '/tutorials/creating-invite-only-applications',
      '/auth0-email-services/send-email-invitations-for-application-signup',
      '/email/send-email-invitations-for-application-signup',
    ],
    to: '/brand-and-customize/email/send-email-invitations-for-application-signup',
  },

  /* SAML */

  {
    from: '/email/send-email-invitations-for-application-signup',
    to: '/brand-and-customize/email/send-email-invitations-for-application-signup',
  },
  {
    from: [
      '/auth0-email-services/configure-external-smtp-email-providers',
      '/email/providers',
      '/email/configure-external-smtp-email-providers',
    ],
    to: '/brand-and-customize/email/smtp-email-providers',
  },
  {
    from: '/email/configure-external-smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider',
    to: '/brand-and-customize/email/smtp-email-providers/configure-amazon-ses-as-external-smtp-email-provider',
  },
  {
    from: '/email/configure-external-smtp-email-providers/configure-mandrill-as-external-smtp-email-provider',
    to: '/brand-and-customize/email/smtp-email-providers/configure-mandrill-as-external-smtp-email-provider',
  },
  {
    from: '/email/configure-external-smtp-email-providers/configure-sendgrid-as-external-smtp-email-provider',
    to: '/brand-and-customize/email/smtp-email-providers/configure-sendgrid-as-external-smtp-email-provider',
  },
  {
    from: '/email/configure-external-smtp-email-providers/configure-sparkpost-as-external-smtp-email-provider',
    to: '/brand-and-customize/email/smtp-email-providers/configure-sparkpost-as-external-smtp-email-provider',
  },
  {
    from: '/email/configure-external-smtp-email-providers/configure-mailgun-as-external-smtp-email-provider',
    to: '/brand-and-customize/email/smtp-email-providers/configure-mailgun-as-external-smtp-email-provider',
  },
  {
    from: ['/email', '/auth0-email-services'],
    to: '/brand-and-customize/email',
  },
  {
    from: ['/email/custom', '/auth0-email-services/manage-email-flow', '/email/manage-email-flow'],
    to: '/brand-and-customize/email/manage-email-flow',
  },
  {
    from: [
      '/auth0-email-services/configure-external-smtp-email-providers/configure-custom-external-smtp-email-provider',
      '/email/configure-custom-external-smtp-email-provider',
    ],
    to: '/brand-and-customize/email/smtp-email-providers/configure-custom-external-smtp-email-provider',
  },
  {
    from: [
      '/email/testing',
      '/auth0-email-services/configure-external-smtp-email-providers/configure-test-smtp-email-servers',
      '/email/configure-test-smtp-email-servers',
    ],
    to: '/brand-and-customize/email/configure-test-smtp-email-servers',
  },

  {
    from: [
      '/universal-login/new-experience/text-customization-new-universal-login',
      '/universal-login/text-customization',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login',
  },
  {
    from: [
      '/login/universal-login/prompt-common',
      '/universal-login/prompt-common',
      '/universal-login/text-customization-prompts/common',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-common',
  },
  {
    from: [
      '/universal-login/prompt-consent',
      '/universal-login/text-customization-prompts/consent',
      '/login/universal-login/prompt-consent',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-consent',
  },
  {
    from: [
      '/universal-login/prompt-device-flow',
      '/universal-login/text-customization-prompts/device-flow',
      '/login/universal-login/prompt-device-flow',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-device-flow',
  },
  {
    from: '/universal-login/prompt-email-otp-challenge',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-email-otp-challenge',
  },
  {
    from: [
      '/universal-login/prompt-email-verification',
      '/universal-login/text-customization-prompts/email-verification',
      '/login/universal-login/prompt-email-verification',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-email-verification',
  },
  {
    from: '/univeral-login/prompt-accept-invitation',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-accept-invitation',
  },
  {
    from: [
      '/login/universal-login/prompt-login',
      '/universal-login/prompt-login',
      '/universal-login/text-customization-prompts/login',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-login',
  },
  {
    from: '/universal-login/prompt-login-email-verification',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-login-email-verification',
  },
  {
    from: '/universal-login/prompt-login-id',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-login-id',
  },
  {
    from: '/universal-login/prompt-login-password',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-login-password',
  },
  {
    from: ['/universal-login/prompt-mfa', '/universal-login/text-customization-prompts/mfa'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa',
  },
  {
    from: ['/universal-login/prompt-mfa-email', '/universal-login/text-customization-prompts/mfa-email'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-email',
  },
  {
    from: ['/universal-login/prompt-mfa-otp', '/universal-login/text-customization-prompts/mfa-otp'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-otp',
  },
  {
    from: '/universal-login/prompt-mfa-phone',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-phone',
  },
  {
    from: ['/universal-login/prompt-mfa-push', '/universal-login/text-customization-prompts/mfa-push'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-push',
  },
  {
    from: [
      '/universal-login/prompt-mfa-recovery-code',
      '/universal-login/text-customization-prompts/mfa-recovery-code',
    ],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-recovery-code',
  },
  {
    from: ['/universal-login/prompt-mfa-sms', '/universal-login/text-customization-prompts/mfa-sms'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-sms',
  },
  {
    from: '/universal-login/prompt-mfa-voice',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-voice',
  },
  {
    from: '/universal-login/prompt-mfa-webauthn',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-mfa-webauthn',
  },
  {
    from: '/universal-login/prompt-organization-selection',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-organization-selection',
  },
  {
    from: ['/universal-login/prompt-reset-password', '/universal-login/text-customization-prompts/reset-password'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-reset-password',
  },
  {
    from: ['/universal-login/prompt-signup', '/universal-login/text-customization-prompts/signup'],
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-signup',
  },
  {
    from: '/universal-login/prompt-signup-id',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-signup-id',
  },
  {
    from: '/universal-login/prompt-signup-password',
    to: '/brand-and-customize/text-customization-new-universal-login/prompt-signup-password',
  },
  {
    from: ['/scopes/customize-consent-prompts', '/scopes/current/guides/customize-consent-prompt'],
    to: '/brand-and-customize/customize-consent-prompts',
  },
  {
    from: ['/universal-login/custom-error-pages', '/error-pages/custom', '/hosted-pages/custom-error-pages'],
    to: '/brand-and-customize/custom-error-pages',
  },
  {
    from: [
      '/libraries/lock/customize-lock-error-messages',
      '/libraries/lock/v11/customizing-error-messages',
      '/libraries/lock/customizing-error-messages',
    ],
    to: '/brand-and-customize/customize-lock-error-messages',
  },
  {
    from: [
      '/universal-login/customize-password-reset-page',
      '/universal-login/password-reset',
      '/hosted-pages/password-reset',
    ],
    to: '/brand-and-customize/customize-password-reset-page',
  },
  {
    from: [
      '/multifactor-authentication/administrator/sms-templates',
      '/mfa/guides/guardian/customize-sms-messages',
      '/multifactor-authentication/sms-templates',
      '/mfa/guides/customize-phone-messages',
      '/mfa/customize-sms-or-voice-messages',
    ],
    to: '/brand-and-customize/customize-sms-or-voice-messages',
  },

  /* Internationalization and Localization */

  {
    from: ['/i18n', '/i18n/i18n-custom-login-page'],
    to: '/brand-and-customize/i18n',
  },
  {
    from: [
      '/i18n/universal-login-internationalization',
      '/universal-login/i18n',
      '/universal-login/universal-login-internationalization',
    ],
    to: '/brand-and-customize/i18n/universal-login-internationalization',
  },
  {
    from: ['/libraries/lock/v11/i18n', '/libraries/lock/v10/i18n', '/libraries/lock/lock-internationalization'],
    to: '/brand-and-customize/i18n/lock-internationalization',
  },

  {
    from: [
      '/libraries/lock-swift/lock-swift-internationalization',
      '/i18n/i18n-guide-ios',
      '/libraries/lock-ios/v2/internationalization',
      '/libraries/lock-swift/lock-swift-internationalization',
    ],
    to: '/brand-and-customize/i18n/lock-swift-internationalization',
  },
  {
    from: [
      '/i18n/i18n-guide-android',
      '/libraries/lock-android/v2/internationalization',
      '/libraries/lock-android/v1/internationalization',
      '/libraries/lock-android/lock-android-internationalization',
    ],
    to: '/brand-and-customize/i18n/lock-android-internationalization',
  },
  {
    from: ['/i18n/password-options-translation', '/i18n/password-options', '/i18n/password-strength'],
    to: '/brand-and-customize/i18n/password-options-translation',
  },

  /* CMS */

  {
    from: ['/cms/joomla/configuration'],
    to: '/cms/integrate-with-joomla',
  },
  {
    from: ['/cms/joomla/installation'],
    to: '/cms/joomla-installation',
  },
  {
    from: ['/cms/wordpress', '/cms/wordpress/jwt-authentication'],
    to: '/cms/wordpress-plugin',
  },
  {
    from: ['/cms/wordpress/installation'],
    to: '/cms/wordpress-plugin/install-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/configuration'],
    to: '/cms/wordpress-plugin/configure-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/extending'],
    to: '/cms/wordpress-plugin/extend-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/troubleshoot'],
    to: '/cms/wordpress-plugin/troubleshoot-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/invalid-state'],
    to: '/cms/wordpress-plugin/troubleshoot-wordpress-plugin-invalid-state-errors',
  },
  {
    from: ['/cms/wordpress/user-migration'],
    to: '/cms/wordpress-plugin/user-migration-in-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/user-migration'],
    to: '/cms/wordpress-plugin/user-migration-in-login-by-auth0',
  },
  {
    from: ['/cms/wordpress/how-does-it-work'],
    to: '/cms/wordpress-plugin/integrate-with-wordpress',
  },

  /* Compliance */

  {
    from: ['/compliance-and-certifications'],
    to: '/compliance',
  },
  {
    from: ['/compliance/gdpr/data-processing'],
    to: '/compliance/data-processing',
  },
  {
    from: [
      '/compliance/gdpr/features-aiding-compliance',
      '/compliance/gdpr/security-advice-for-customers',
      '/compliance/gdpr/roles-responsibilities',
      '/compliance/gdpr/gdpr-summary',
      '/compliance/gdpr/definitions',
      '/compliance/auth0-gdpr-compliance',
    ],
    to: '/compliance/gdpr',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/user-consent'],
    to: '/compliance/gdpr/gdpr-conditions-for-consent',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/data-minimization'],
    to: '/compliance/gdpr/gdpr-data-minimization',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/data-portability'],
    to: '/compliance/gdpr/gdpr-data-portability',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/protect-user-data'],
    to: '/compliance/gdpr/gdpr-protect-and-secure-user-data',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/right-to-access-data'],
    to: '/compliance/gdpr/gdpr-right-to-access-correct-and-erase-data',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-custom-ui'],
    to: '/compliance/gdpr/gdpr-track-consent-with-custom-ui',
  },
  {
    from: ['/compliance/gdpr/features-aiding-compliance/user-consent/track-consent-with-lock'],
    to: '/compliance/gdpr/gdpr-track-consent-with-lock',
  },

  /* Deploy */

  {
    from: [
      '/get-started/deployment-options',
      '/getting-started/deployment-models',
      '/overview/deployment-models',
      '/deployment',
    ],
    to: '/deploy',
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
    ],
    to: '/deploy/private-cloud',
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
    ],
    to: '/deploy/private-cloud/private-cloud-onboarding',
  },
  {
    from: [
      '/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements',
      '/deploy/private-cloud/private-cloud-onboarding/customer-hosted-managed-private-cloud-infrastructure-requirements',
    ],
    to: '/deploy',
  },
  {
    from: [
      '/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list',
      '/private-saas-deployment/onboarding/managed-private-cloud/ip-domain-port-list',
      '/private-cloud/onboarding/managed-private-cloud/ip-domain-port-list',
      '/appliance/infrastructure/ip-domain-port-list',
    ],
    to: '/deploy/private-cloud/private-cloud-onboarding/private-cloud-ip-domain-and-port-list',
  },
  {
    from: [
      '/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
      '/private-cloud/onboarding/managed-private-cloud/remote-access-options',
      '/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
      '/deploy/private-cloud/private-cloud-onboarding/private-cloud-remote-access-options',
    ],
    to: '/deploy',
  },
  {
    from: [
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
    ],
    to: '/deploy/private-cloud/private-cloud-onboarding/standard-private-cloud-infrastructure-requirements',
  },
  {
    from: [
      '/private-cloud/private-cloud-operations',
      '/services/private-saas-management',
      '/services/private-cloud-management',
    ],
    to: '/deploy/private-cloud/private-cloud-operations',
  },
  {
    from: ['/private-cloud/private-cloud-migrations'],
    to: '/deploy/private-cloud/private-cloud-migrations',
  },
  {
    from: ['/private-cloud/private-cloud-migrations/migrate-from-public-cloud-to-private-cloud'],
    to: '/deploy/private-cloud/private-cloud-migrations/migrate-from-public-cloud-to-private-cloud',
  },
  {
    from: ['/private-cloud/private-cloud-migrations/migrate-from-standard-private-cloud-to-managed-private-cloud'],
    to: '/deploy/private-cloud/private-cloud-migrations/migrate-from-standard-private-cloud-to-managed-private-cloud',
  },
  {
    from: [
      '/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains',
      '/appliance/custom-domains',
      '/private-saas-deployment/custom-domain-migration',
      '/private-cloud/custom-domain-migration',
      '/private-cloud/migrate-private-cloud-custom-domains',
    ],
    to: '/deploy/private-cloud/private-cloud-migrations/migrate-private-cloud-custom-domains',
  },
  {
    from: ['/pre-deployment'],
    to: '/deploy/pre-deployment',
  },
  {
    from: ['/pre-deployment/how-to-run-production-checks', '/pre-deployment/how-to-run-test'],
    to: '/deploy/pre-deployment/how-to-run-production-checks',
  },
  {
    from: [
      '/deploy/pre-deployment/how-to-run-production-checks/production-check-required-fixes',
      '/pre-deployment/how-to-run-production-checks/production-check-required-fixes',
      '/pre-deployment/tests/required',
    ],
    to: '/deploy/pre-deployment/production-check-required-fixes',
  },
  {
    from: [
      '/pre-deployment/how-to-run-production-checks/production-check-recommended-fixes',
      '/pre-deployment/tests/recommended',
      '/deploy/pre-deployment/how-to-run-production-checks/production-check-recommended-fixes',
    ],
    to: '/deploy/pre-deployment/production-check-recommended-fixes',
  },
  {
    from: [
      '/pre-deployment/how-to-run-production-checks/production-checks-best-practices',
      '/pre-deployment/tests/best-practice',
      '/deploy/pre-deployment/how-to-run-production-checks/production-checks-best-practices',
    ],
    to: '/deploy/pre-deployment/production-checks-best-practices',
  },
  {
    from: ['/support/predeployment-tests', '/support/testing'],
    to: '/deploy/pre-deployment/predeployment-tests',
  },
  {
    from: ['/pre-deployment/pre-launch-tips', '/pre-deployment/prelaunch-tips'],
    to: '/deploy/pre-deployment/pre-launch-tips',
  },
  {
    from: [
      '/extensions/using-provided-extensions',
      '/topics/extensibility',
      '/extend-integrate',
      '/extensions/visual-studio-team-services-deploy',
      '/extensions/visual-studio-team-services-deployments',
    ],
    to: '/extensions',
  },
  {
    from: [
      '/extensions/authorization-extension/v2',
      '/extensions/authorization-extension/v1',
      '/api/authorization-dashboard-extension',
      '/extensions/authorization-dashboard-extension',
    ],
    to: '/extensions/authorization-extension',
  },
  {
    from: ['/extensions/authorization-extension/v2/implementation/setup'],
    to: '/extensions/authorization-extension/set-up-authorization-extension-users',
  },
  {
    from: [
      '/get-started/dashboard/create-sso-dashboard-application',
      '/dashboard/guides/extensions/sso-dashboard-create-app',
    ],
    to: '/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-install-extension'],
    to: '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-add-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-update-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
  },

  /* LDAP Connector */

  {
    from: [
      '/connector',
      '/connector/overview',
      '/connector/considerations-non-ad',
      '/ad-ldap-connector',
      '/protocols/ldap-protocol',
      '/protocols/ldap',
    ],
    to: '/extensions/ad-ldap-connector',
  },
  {
    from: ['/connector/prerequisites', '/ad-ldap-connector/ad-ldap-connector-requirements'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-requirements',
  },
  {
    from: ['/adldap-x', '/connector/install-other-platforms', '/connector/install', '/adldap-auth'],
    to: '/extensions/ad-ldap-connector/install-configure-ad-ldap-connector',
  },
  {
    from: ['/extensions/delegated-admin/v3', '/extensions/delegated-admin/v2', '/extensions/delegated-admin'],
    to: '/extensions/delegated-administration-extension',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks',
      '/extensions/delegated-admin/v2/hooks',
      '/extensions/delegated-admin/hooks',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-hooks',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/access',
      '/extensions/delegated-admin/v2/hooks/access',
      '/extensions/delegated-admin/hooks/access',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-access-hook',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-access-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/filter',
      '/extensions/delegated-admin/v2/hooks/filter',
      '/extensions/delegated-admin/hooks/filter',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-filter-hook',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-filter-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/membership',
      '/extensions/delegated-admin/v2/hooks/membership',
      '/extensions/delegated-admin/hooks/membership',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-memberships-query-hook',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-memberships-query-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/settings',
      '/extensions/delegated-admin/v2/hooks/settings',
      '/extensions/delegated-admin/hooks/settings',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-settings-query-hook',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-settings-query-hook',
  },
  {
    from: [
      '/extensions/delegated-admin/v3/hooks/write',
      '/extensions/delegated-admin/v2/hooks/write',
      '/extensions/delegated-admin/hooks/write',
      '/extensions/delegated-administration-extension/delegated-administration-hooks/delegated-administration-write-hook',
    ],
    to: '/extensions/delegated-administration-extension/delegated-administration-write-hook',
  },
  {
    from: ['/connector/update', '/ad-ldap-connector/update-ad-ldap-connectors'],
    to: '/extensions/ad-ldap-connector/update-ad-ldap-connectors',
  },
  {
    from: ['/extensions/sso-dashboard'],
    to: '/extensions/single-sign-on-dashboard-extension',
  },
  {
    from: [
      '/get-started/dashboard/create-sso-dashboard-application',
      '/dashboard/guides/extensions/sso-dashboard-create-app',
    ],
    to: '/extensions/single-sign-on-dashboard-extension/create-sso-dashboard-application',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-install-extension'],
    to: '/extensions/single-sign-on-dashboard-extension/install-sso-dashboard-extension',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-add-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/add-applications-to-the-sso-dashboard',
  },
  {
    from: ['/dashboard/guides/extensions/sso-dashboard-update-apps'],
    to: '/extensions/single-sign-on-dashboard-extension/update-applications-on-the-sso-dashboard',
  },

  /* LDAP Connector */

  {
    from: [
      '/connector',
      '/connector/overview',
      '/connector/considerations-non-ad',
      '/ad-ldap-connector',
      '/protocols/ldap-protocol',
      '/protocols/ldap',
    ],
    to: '/extensions/ad-ldap-connector',
  },
  {
    from: ['/connector/prerequisites', '/ad-ldap-connector/ad-ldap-connector-requirements'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-requirements',
  },
  {
    from: ['/adldap-x', '/connector/install-other-platforms', '/connector/install', '/adldap-auth'],
    to: '/extensions/ad-ldap-connector/install-configure-ad-ldap-connector',
  },
  {
    from: [
      '/connector/client-certificates',
      '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-client-certificates',
    ],
    to: '/extensions/ad-ldap-connector/configure-ad-ldap-connector-client-certificates',
  },
  {
    from: ['/connector/kerberos', '/ad-ldap-connector/configure-ad-ldap-connector-authentication-with-kerberos'],
    to: '/extensions/ad-ldap-connector/configure-ad-ldap-connector-with-kerberos',
  },
  {
    from: ['/connector/high-availability', '/ad-ldap-connector/ad-ldap-high-availability'],
    to: '/extensions/ad-ldap-connector/ad-ldap-high-availability',
  },
  {
    from: ['/extensions/adldap-connector', '/extensions/ad-ldap-connector-health-monitor'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-health-monitor',
  },
  {
    from: ['/dashboard/guides/connections/disable-cache-ad-ldap'],
    to: '/extensions/ad-ldap-connector/disable-credential-caching',
  },
  {
    from: ['/connector/scom-monitoring', '/ad-ldap-connector/ad-ldap-connector-scorm'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-scom',
  },
  {
    from: ['/connector/modify', '/ad-ldap-connector/ad-ldap-connectors-to-auth0'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-to-auth0',
  },
  {
    from: ['/connector/test-dc', '/ad-ldap-connector/ad-ldap-connector-test-environment'],
    to: '/extensions/ad-ldap-connector/ad-ldap-connector-test-environment',
  },
  {
    from: ['/connector/update', '/ad-ldap-connector/update-ad-ldap-connectors'],
    to: '/extensions/ad-ldap-connector/update-ad-ldap-connectors',
  },
  {
    from: ['/extensions/account-link'],
    to: '/extensions/account-link-extension',
  },
  {
    from: ['/logs/export-log-events-with-extensions', '/logs/log-export-extensions'],
    to: '/extensions/log-export-extensions',
  },
  {
    from: ['/extensions/export-logs-to-application-insights', '/extensions/application-insight'],
    to: '/extensions/log-export-extensions/export-logs-to-application-insights',
  },
  {
    from: ['/extensions/export-logs-to-cloudwatch', '/extensions/cloudwatch'],
    to: '/extensions/log-export-extensions/export-logs-to-cloudwatch',
  },
  {
    from: ['/extensions/export-logs-to-azure-blob-storage', '/extensions/azure-blob-storage'],
    to: '/extensions/log-export-extensions/export-logs-to-azure-blob-storage',
  },
  {
    from: ['/extensions/export-logs-to-logentries', '/extensions/logentries'],
    to: '/extensions/log-export-extensions/export-logs-to-logentries',
  },
  {
    from: ['/extensions/export-logs-to-loggly', '/extensions/loggly'],
    to: '/extensions/log-export-extensions/export-logs-to-loggly',
  },
  {
    from: ['/extensions/export-logs-to-logstash', '/extensions/logstash'],
    to: '/extensions/log-export-extensions/export-logs-to-logstash',
  },
  {
    from: ['/extensions/export-logs-to-mixpanel', '/extensions/mixpanel'],
    to: '/extensions/log-export-extensions/export-logs-to-mixpanel',
  },
  {
    from: ['/extensions/export-logs-to-papertrail', '/extensions/papertrail'],
    to: '/extensions/log-export-extensions/export-logs-to-papertrail',
  },
  {
    from: ['/extensions/export-logs-to-segment', '/extensions/segment'],
    to: '/extensions/log-export-extensions/export-logs-to-segment',
  },
  {
    from: ['/extensions/export-logs-to-splunk', '/extensions/splunk'],
    to: '/extensions/log-export-extensions/export-logs-to-splunk',
  },
  {
    from: ['/extensions/auth0-logs-to-sumo-logic', '/extensions/sumologic'],
    to: '/extensions/log-export-extensions/auth0-logs-to-sumo-logic',
  },
  {
    from: ['/extensions/authentication-api-debugger'],
    to: '/extensions/authentication-api-debugger-extension',
  },
  {
    from: ['/extensions/authentication-api-webhooks'],
    to: '/extensions/auth0-authentication-api-webhooks',
  },
  {
    from: ['/extensions/user-import-export'],
    to: '/extensions/user-import-export-extension',
  },
  {
    from: ['/extensions/bitbucket-deploy', '/extensions/bitbucket-deployments'],
    to: 'https://marketplace.auth0.com/integrations/bitbucket-pipeline',
  },
  {
    from: ['/extensions/custom-social-connections', '/extensions/custom-social-extensions'],
    to: '/connections/social/oauth2',
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
    from: ['/extensions/management-api-webhooks'],
    to: '/extensions/auth0-management-api-webhooks',
  },
  {
    from: ['/extensions/realtime-webtask-logs'],
    to: '/extensions/real-time-webtask-logs',
  },
  {
    from: ['/dashboard/guides/extensions/delegated-admin-create-app'],
    to: '/extensions/delegated-administration-extension/create-delegated-admin-applications',
  },
  {
    from: [
      '/dashboard/guides/extensions/delegated-admin-install-extension',
      '/dashboard/guides/extensions/delegated-admin-use-extension',
    ],
    to: '/extensions/delegated-administration-extension/install-delegated-admin-extension',
  },

  /* Deploy CLI Tool */

  {
    from: [
      '/extensions/deploy-cli-tool',
      '/extensions/deploy-cli',
      '/extensions/deploy-cli/references/whats-new',
      '/extensions/deploy-cli/references/whats-new-v2',
      '/deploy/deploy-cli-tool/whats-new-in-deploy-cli-tool',
    ],
    to: '/deploy/deploy-cli-tool',
  },
  {
    from: [
      '/extensions/deploy-cli-tool/call-deploy-cli-tool-programmatically',
      '/extensions/deploy-cli/guides/call-deploy-cli-programmatically',
    ],
    to: '/deploy/deploy-cli-tool/call-deploy-cli-tool-programmatically',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/create-deploy-cli-application-manually',
      '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application-manually',
      '/extensions/deploy-cli-tool/create-and-configure-the-deploy-cli-application',
    ],
    to: '/deploy/deploy-cli-tool/create-and-configure-the-deploy-cli-application',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/import-export-directory-structure',
      '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure',
    ],
    to: '/deploy/deploy-cli-tool/import-export-tenant-configuration-to-directory-structure',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/import-export-yaml-file',
      '/extensions/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file',
    ],
    to: '/deploy/deploy-cli-tool/import-export-tenant-configuration-to-yaml-file',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment',
      '/extensions/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
    ],
    to: '/deploy/deploy-cli-tool/incorporate-deploy-cli-into-build-environment',
  },
  {
    from: [
      '/extensions/deploy-cli/guides/install-deploy-cli',
      '/extensions/deploy-cli-tool/install-and-configure-the-deploy-cli-tool',
    ],
    to: '/deploy/deploy-cli-tool/install-and-configure-the-deploy-cli-tool',
  },
  {
    from: [
      '/extensions/deploy-cli/references/deploy-cli-options',
      '/extensions/deploy-cli-tool/deploy-cli-tool-options',
    ],
    to: '/deploy/deploy-cli-tool/deploy-cli-tool-options',
  },
  {
    from: [
      '/extensions/deploy-cli/references/environment-variables-keyword-mappings',
      '/extensions/deploy-cli-tool/environment-variables-and-keyword-mappings',
    ],
    to: '/deploy/deploy-cli-tool/environment-variables-and-keyword-mappings',
  },

  /* Get Started */

  {
    from: ['/getting-started'],
    to: '/get-started',
  },
  {
    from: ['/overview', '/get-started/overview', '/getting-started/overview'],
    to: '/get-started/auth0-overview',
  },
  {
    from: [
      '/authorization/authentication-and-authorization',
      '/authorization/concepts/authz-and-authn',
      '/application-auth/current',
      '/application-auth/legacy',
      '/application-auth',
    ],
    to: '/get-started/authentication-and-authorization',
  },
  {
    from: ['/getting-started/set-up-app', '/applications/set-up-an-application'],
    to: '/get-started/create-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-m2m',
      '/applications/application-settings/non-interactive',
      '/applications/application-settings/machine-to-machine',
      '/applications/machine-to-machine',
      '/applications/set-up-an-application/register-machine-to-machine-applications',
    ],
    to: '/get-started/create-apps/machine-to-machine-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-native',
      '/applications/application-settings/native',
      '/applications/native',
      '/applications/set-up-an-application/register-native-applications',
    ],
    to: '/get-started/create-apps/native-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-regular-web',
      '/applications/application-settings/regular-web-app',
      '/applications/webapps',
      '/applications/register-regular-web-applications',
      '/applications/set-up-an-application/register-regular-web-applications',
    ],
    to: '/get-started/create-apps/regular-web-apps',
  },
  {
    from: [
      '/dashboard/guides/applications/register-app-spa',
      '/applications/spa',
      '/applications/application-settings/single-page-app',
      '/applications/register-single-page-app',
      '/applications/set-up-an-application/register-single-page-app',
    ],
    to: '/get-started/create-apps/single-page-web-apps',
  },
  {
    from: ['/getting-started/set-up-api', '/dashboard/reference/views-api'],
    to: '/get-started/set-up-apis',
  },
  {
    from: ['/dashboard', '/getting-started/dashboard-overview', '/get-started/dashboard/upcoming-dashboard-changes'],
    to: '/get-started/dashboard',
  },
  {
    from: ['/get-started/learn-the-basics', '/getting-started/the-basics', '/getting-started/create-tenant'],
    to: '/get-started/create-tenants',
  },
  {
    from: ['/dev-lifecycle/child-tenants'],
    to: '/get-started/create-tenants/child-tenants',
  },
  {
    from: ['/dev-lifecycle/set-up-multiple-environments', '/dev-lifecycle/setting-up-env'],
    to: '/get-started/create-tenants/set-up-multiple-environments',
  },
  {
    from: ['/get-started/dashboard/create-multiple-tenants', '/dashboard/guides/tenants/create-multiple-tenants'],
    to: '/get-started/create-tenants/create-multiple-tenants',
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
    ],
    to: '/connections/enterprise/test-enterprise-connections',
  },
  {
    from: ['/dashboard/guides/connections/view-connections', '/get-started/dashboard/view-connections'],
    to: '/connections/view-connections',
  },
  {
    from: [
      '/dashboard/guides/connections/enable-connections-enterprise',
      '/get-started/dashboard/enable-enterprise-connections',
    ],
    to: '/connections/enterprise/enable-enterprise-connections',
  },
  {
    from: [
      '/api/management/guides/connections/promote-connection-domain-level',
      '/get-started/dashboard/promote-connections-to-domain-level',
    ],
    to: '/connections/promote-connections-to-domain-level',
  },
  {
    from: [
      '/api/management/guides/connections/retrieve-connection-options',
      '/api/management/guides/retrieve-connection-options',
      '/get-started/dashboard/retrieve-connection-options',
    ],
    to: '/connections/retrieve-connection-options',
  },
  {
    from: [
      '/dashboard-access/dashboard-roles',
      '/dashboard-access/manage-dashboard-users',
      '/dashboard/manage-dashboard-admins',
      '/tutorials/manage-dashboard-admins',
      '/get-started/dashboard/manage-dashboard-users',
    ],
    to: '/dashboard-access',
  },
  {
    from: ['/dashboard-access/dashboard-roles/feature-access-by-role'],
    to: '/dashboard-access/feature-access-by-role',
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
    ],
    to: '/hooks',
  },
  {
    from: ['/hooks/concepts/extensibility-points', '/hooks/concepts/overview-extensibility-points'],
    to: '/hooks/extensibility-points',
  },
  {
    from: [
      '/hooks/concepts/credentials-exchange-extensibility-point',
      '/hooks/guides/use-the-credentials-exchange-extensibility-point',
      '/hooks/client-credentials-exchange',
      '/hooks/extensibility-points/credentials-exchange',
    ],
    to: '/hooks/extensibility-points/client-credentials-exchange',
  },
  {
    from: [
      '/hooks/create',
      '/hooks/dashboard/create-delete',
      '/hooks/cli/create-delete',
      '/hooks/guides/create-hooks-using-cli',
      '/hooks/guides/create-hooks-using-dashboard',
      '/auth0-hooks/cli/create-delete',
    ],
    to: '/hooks/create-hooks',
  },
  {
    from: ['/hooks/delete', '/hooks/guides/delete-hooks-using-cli', '/hooks/guides/delete-hooks-using-dashboard'],
    to: '/hooks/delete-hooks',
  },
  {
    from: [
      '/hooks/enable-disable',
      '/hooks/cli/enable-disable',
      '/hooks/dashboard/enable-disable',
      '/hooks/guides/enable-disable-hooks-using-cli',
      '/hooks/guides/enable-disable-hooks-using-dashboard',
      '/auth0-hooks/cli/enable-disable',
    ],
    to: '/hooks/enable-disable-hooks',
  },
  {
    from: ['/hooks/guides/post-change-password', '/hooks/post-change-password'],
    to: '/hooks/extensibility-points/post-change-password',
  },
  {
    from: [
      '/hooks/concepts/post-user-registration-extensibility-point',
      '/hooks/guides/use-the-post-user-registration-extensibility-point',
      '/hooks/post-user-registration',
    ],
    to: '/hooks/extensibility-points/post-user-registration',
  },
  {
    from: [
      '/hooks/concepts/pre-user-registration-extensibility-point',
      '/hooks/guides/use-the-pre-user-registration-extensibility-point',
      '/auth0-hooks/extensibility-points/pre-user-registration',
      '/hooks/pre-user-registration',
    ],
    to: '/hooks/extensibility-points/pre-user-registration',
  },
  {
    from: ['/hooks/secrets/create'],
    to: '/hooks/hook-secrets/create-hook-secrets',
  },
  {
    from: ['/hooks/secrets/delete'],
    to: '/hooks/hook-secrets/delete-hook-secrets',
  },
  {
    from: ['/hooks/secrets'],
    to: '/hooks/hook-secrets',
  },
  {
    from: ['/hooks/secrets/update'],
    to: '/hooks/hook-secrets/update-hook-secrets',
  },
  {
    from: ['/hooks/secrets/view'],
    to: '/hooks/hook-secrets/view-hook-secrets',
  },
  {
    from: [
      '/hooks/update',
      '/hooks/cli/edit',
      '/hooks/dashboard/edit',
      '/hooks/guides/edit-hooks-using-cli',
      '/hooks/guides/edit-hooks-using-dashboard',
    ],
    to: '/hooks/update-hooks',
  },
  {
    from: [
      '/hooks/view-logs',
      '/hooks/cli/logs',
      '/hooks/logs',
      '/hooks/guides/logging-hooks-using-cli',
      '/auth0-hooks/cli/logs',
    ],
    to: '/hooks/view-logs-for-hooks',
  },
  {
    from: ['/hooks/view'],
    to: '/hooks/view-hooks',
  },

  /* Identity Labs */

  {
    from: ['/labs'],
    to: '/identity-labs',
  },
  {
    from: ['/identity-labs/01-web-sign-in'],
    to: '/identity-labs/lab-1-web-sign-in',
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-01'],
    to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-1',
  },
  {
    from: ['/identity-labs/01-web-sign-in/exercise-02'],
    to: '/identity-labs/lab-1-web-sign-in/identity-lab-1-exercise-2',
  },
  {
    from: ['/identity-labs/02-calling-an-api'],
    to: '/identity-labs/identity-lab-2-calling-api',
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-01'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-1',
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-02'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-2',
  },
  {
    from: ['/identity-labs/02-calling-an-api/exercise-03'],
    to: '/identity-labs/identity-lab-2-calling-api/identity-lab-2-exercise-3',
  },
  {
    from: ['/identity-labs/03-mobile-native-app'],
    to: '/identity-labs/lab-3-mobile-native-app',
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-01'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-1',
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-02'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-2',
  },
  {
    from: ['/identity-labs/03-mobile-native-app/exercise-03'],
    to: '/identity-labs/lab-3-mobile-native-app/identity-lab-3-exercise-3',
  },
  {
    from: ['/identity-labs/04-single-page-app'],
    to: '/identity-labs/lab-4-single-page-app',
  },
  {
    from: ['/identity-labs/04-single-page-app/exercise-01'],
    to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-1',
  },
  {
    from: ['/identity-labs/04-single-page-app/exercise-02'],
    to: '/identity-labs/lab-4-single-page-app/identity-lab-4-exercise-2',
  },

  /* Integrations */

  {
    from: ['/integration'],
    to: '/integrations',
  },
  {
    from: ['/aws-api-setup'],
    to: '/integrations/how-to-set-up-aws-for-delegated-authentication',
  },
  {
    from: ['/integrations/aws/sso', '/configure-amazon-web-services-for-sso'],
    to: '/integrations/aws/configure-amazon-web-services-for-sso',
  },
  {
    from: ['/integrations/aws/tokens', '/integrations/call-aws-apis-and-resources-with-tokens'],
    to: '/integrations/aws-api-gateway-delegation',
  },
  {
    from: [
      '/scenarios/amazon-cognito',
      '/tutorials/integrating-auth0-amazon-cognito-mobile-apps',
      '/integrations/integrating-auth0-amazon-cognito-mobile-apps',
      '/integrations/integrate-with-amazon-cognito',
    ],
    to: '/integrations/amazon-cognito',
  },
  {
    from: [
      '/scenarios-mqtt',
      '/tutorials/authenticating-devices-using-mqtt',
      '/integrations/authenticating-devices-using-mqtt',
    ],
    to: '/integrations/authenticate-devices-using-mqtt',
  },
  {
    from: [
      '/scenarios-tessel',
      '/tutorials/authenticating-a-tessel-device',
      '/integrations/authenticating-a-tessel-device',
    ],
    to: '/integrations/authenticating-and-authorizing-a-tessel-device-with-auth0',
  },
  {
    from: ['/aws', '/awsapi-tutorial'],
    to: '/integrations/aws',
  },
  {
    from: ['/integrations/aws-api-gateway/delegation', '/integrations/aws-api-gateway'],
    to: '/integrations/aws-api-gateway-delegation',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-1',
      '/integrations/aws-api-gateway/part-1',
      '/integrations/aws-api-gateway/aws-api-gateway-step-1',
    ],
    to: '/integrations/aws-api-gateway-delegation-1',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-2',
      '/integrations/aws-api-gateway/part-2',
      '/integrations/aws-api-gateway/aws-api-gateway-step-2',
    ],
    to: '/integrations/aws-api-gateway-delegation-2',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-3',
      '/integrations/aws-api-gateway/part-3',
      '/integrations/aws-api-gateway/aws-api-gateway-step-3',
    ],
    to: '/integrations/aws-api-gateway-delegation-3',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-4',
      '/integrations/aws-api-gateway/part-4',
      '/integrations/aws-api-gateway/aws-api-gateway-step-4',
    ],
    to: '/integrations/aws-api-gateway-delegation-4',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/part-5',
      '/integrations/aws-api-gateway/part-5',
      '/integrations/aws-api-gateway/aws-api-gateway-step-5',
    ],
    to: '/integrations/aws-api-gateway-delegation-5',
  },
  {
    from: [
      '/integrations/aws-api-gateway/delegation/secure-api-with-cognito',
      '/integrations/aws-api-gateway/secure-api-with-cognito',
    ],
    to: '/integrations/aws-api-gateway-cognito',
  },
  {
    from: [
      '/integrations/aws-api-gateway/custom-authorizers',
      '/integrations/aws-api-gateway/custom-authorizers/part-1',
      '/integrations/aws-api-gateway/custom-authorizers/part-2',
      '/integrations/aws-api-gateway/custom-authorizers/part-3',
      '/integrations/aws-api-gateway/custom-authorizers/part-4',
    ],
    to: '/integrations/aws-api-gateway-custom-authorizers',
  },
  {
    from: ['/sharepoint-apps', '/integrations/sharepoint-apps'],
    to: '/integrations/connecting-provider-hosted-apps-to-sharepoint-online',
  },
  {
    from: ['/integrations/google-cloud-platform', '/tutorials/google-cloud-platform'],
    to: '/integrations/google-cloud-endpoints',
  },
  {
    from: ['/integrations/marketing/salesforce'],
    to: '/integrations/marketing/export-user-data-salesforce',
  },
  {
    from: [
      '/tutorials/office365-connection-deprecation-guide',
      '/integrations/office365-connection-deprecation-guide',
      '/office365-deprecated',
    ],
    to: '/integrations/migrate-office365-connections-to-windows-azure-ad',
  },
  {
    from: [
      '/tutorials/using-auth0-to-secure-a-cli',
      '/integrations/using-auth0-to-secure-a-cli',
      '/tutorials/using-auth0-to-secure-an-api',
      '/cli',
    ],
    to: '/integrations/secure-a-cli-with-auth0',
  },
  {
    from: ['/integrations/sharepoint'],
    to: '/integrations/sharepoint-2010-2013',
  },
  {
    from: ['/integrations/sso', '/sso/current/integrations'],
    to: '/integrations/sso-integrations',
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
    ],
    to: '/integrations/azure-api-management',
  },
  {
    from: ['/marketplace-partner-documentation'],
    to: '/integrations/marketplace-partners',
  },
  {
    from: [
      '/redirect-rules-for-partners',
      '/marketplace-partner-documentation/redirect-rules-for-partners',
      '/integrations/marketplace-partners/redirect-rules-for-partners'
    ],
    to: '/integrations/marketplace-partners/redirect-actions-for-partners'
  },
  {
    from: ['/social-connections-for-partners', '/marketplace-partner-documentation/social-connections-for-partners'],
    to: '/integrations/marketplace-partners/social-connections-for-partners',
  },
  {
    from: ['/sso-integrations-for-partners', '/marketplace-partner-documentation/sso-integrations-for-partners'],
    to: '/integrations/marketplace-partners/sso-integrations-for-partners',
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
      '/libraries/lock-android/v2/refresh-jwt-tokens',
      '/libraries/lock-android/v1/refresh-jwt-tokens',
      '/libraries/lock-android/refresh-jwt-tokens',
      '/libraries/auth0-android/save-and-refresh-tokens',
    ],
    to: '/libraries/lock-android/lock-android-refresh-jwt',
  },
  {
    from: ['/libraries/lock-android/lock-android-delegation'],
    to: '/libraries/lock-android/v2/refresh-jwt-tokens',
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
    from: ['/libraries/lock-android/v2/delegation-api', '/libraries/lock-android/v1/delegation-api'],
    to: '/libraries/lock-android/lock-android-delegation',
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
    from: ['/organizations/configure-organizations'],
    to: '/organizations/configure/',
  },
  {
    from: ['/organizations/create-organizations'],
    to: '/organizations/configure/create-organizations',
  },
  {
    from: ['/organizations/delete-organizations'],
    to: '/organizations/configure/delete-organizations',
  },
  {
    from: ['/organizations/define-organization-behavior'],
    to: '/organizations/configure/define-organization-behavior',
  },
  {
    from: ['/organizations/enable-connections'],
    to: '/organizations/configure/enable-connections',
  },
  {
    from: ['/organizations/disable-connections'],
    to: '/organizations/configure/disable-connections',
  },
  {
    from: ['/organizations/invite-members'],
    to: '/organizations/configure/invite-members',
  },
  {
    from: ['/organizations/send-membership-invitations'],
    to: '/organizations/configure/send-membership-invitations',
  },
  {
    from: ['/organizations/grant-just-in-time-membership'],
    to: '/organizations/configure/grant-just-in-time-membership',
  },
  {
    from: ['/organizations/assign-members'],
    to: '/organizations/configure/assign-members',
  },
  {
    from: ['/organizations/remove-members'],
    to: '/organizations/configure/remove-members',
  },
  {
    from: ['/organizations/add-member-roles'],
    to: '/organizations/configure/add-member-roles',
  },
  {
    from: ['/organizations/remove-member-roles'],
    to: '/organizations/configure/remove-member-roles',
  },
  {
    from: ['/organizations/retrieve-organizations'],
    to: '/organizations/configure/retrieve-organizations',
  },
  {
    from: ['/organizations/retrieve-connections'],
    to: '/organizations/configure/retrieve-connections',
  },
  {
    from: ['/organizations/retrieve-members'],
    to: '/organizations/configure/retrieve-members',
  },
  {
    from: ['/organizations/retrieve-user-membership'],
    to: '/organizations/configure/retrieve-user-membership',
  },
  {
    from: ['/organizations/retrieve-member-roles'],
    to: '/organizations/configure/retrieve-member-roles',
  },

  /* LOGIN */

  {
    from: ['/flows/login'],
    to: '/login',
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
    ],
    to: '/login/universal-login',
  },
  {
    from: ['/universal-login/new-universal-login-vs-classic-universal-login'],
    to: '/login/universal-login/new-universal-login-vs-classic-universal-login',
  },
  {
    from: ['/universal-login/new-experience', '/universal-login/new'],
    to: '/login/universal-login/new-experience',
  },
  {
    from: ['/universal-login/classic-experience', '/universal-login/classic'],
    to: '/login/universal-login/classic-experience',
  },
  {
    from: [
      '/dashboard/guides/universal-login/configure-login-page-passwordless',
      '/dashboard/guides/connections/configure-passwordless-sms',
      '/universal-login/configure-universal-login-with-passwordless',
      '/login/universal-login/passwordless-login/configure-universal-login-with-passwordless',
    ],
    to: '/login/universal-login/passwordless-login',
  },
  {
    from: [
      '/universal-login/universal-vs-embedded-login',
      '/guides/login/universal-vs-embedded',
      '/guides/login/centralized-vs-embedded',
    ],
    to: '/login/universal-vs-embedded-login',
  },
  {
    from: [
      '/universal-login/configure-default-login-routes',
      '/universal-login/default-login-url',
      '/hosted-pages/default-login-url',
    ],
    to: '/login/universal-login/configure-default-login-routes',
  },
  {
    from: ['/universal-login/error-pages', '/error-pages', '/error-pages/generic', '/hosted-pages/error-pages'],
    to: '/login/universal-login/error-pages',
  },
  {
    from: ['/universal-login/identifier-first'],
    to: '/login/universal-login/identifier-first',
  },
  {
    from: ['/login/embedded', '/flows/login/embedded', '/flows/login/embedded-login'],
    to: '/login/embedded-login',
  },
  {
    from: ['/cross-origin-authentication', '/flows/login/embedded-login/cross-origin-authentication'],
    to: '/login/cross-origin-authentication',
  },
  {
    from: ['/authorization/configure-silent-authentication', '/api-auth/tutorials/silent-authentication'],
    to: '/login/configure-silent-authentication',
  },
  {
    from: '/authentication',
    to: '/login/authentication',
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
    ],
    to: '/login/authentication/add-login-auth-code-flow',
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
    ],
    to: '/login/authentication/add-login-using-the-authorization-code-flow-with-pkce',
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
    ],
    to: '/login/authentication/add-login-using-the-implicit-flow-with-form-post',
  },
  {
    from: [
      '/tutorials/redirecting-users',
      '/users/redirecting-users',
      '/users/guides/redirect-users-after-login',
      '/protocols/oauth2/redirect-users',
      '/users/concepts/redirect-users-after-login',
      '/users/redirect-users-after-login',
    ],
    to: '/login/redirect-users-after-login',
  },
  {
    from: ['/universal-login/configure-universal-login-with-passwordless/webauthn-device-biometrics'],
    to: '/login/universal-login/passwordless-login/webauthn-device-biometrics',
  },

  /* LOGOUT */

  {
    from: ['/logout'],
    to: '/login/logout',
  },
  {
    from: ['/logout/log-users-out-of-applications', '/logout/guides/logout-applications'],
    to: '/login/logout/log-users-out-of-applications',
  },
  {
    from: ['/logout/log-users-out-of-auth0', '/logout/guides/logout-auth0'],
    to: '/login/logout/log-users-out-of-auth0',
  },
  {
    from: ['/logout/log-users-out-of-idps', '/logout/guides/logout-idps'],
    to: '/login/logout/log-users-out-of-idps',
  },
  {
    from: [
      '/logout/log-users-out-of-saml-idps',
      '/protocols/saml/saml-configuration/logout',
      '/logout/guides/logout-saml-idps',
    ],
    to: '/login/logout/log-users-out-of-saml-idps',
  },
  {
    from: ['/logout/redirect-users-after-logout', '/logout/guides/redirect-users-after-logout'],
    to: '/login/logout/redirect-users-after-logout',
  },
  {
    from: ['/logout/redirect-users-after-logout', '/logout/guides/redirect-users-after-logout'],
    to: '/login/logout/redirect-users-after-logout',
  },

  /* Monitor - Logs */

  {
    from: ['/logs', '/logs/concepts/logs-admins-devs'],
    to: '/monitor-auth0/logs',
  },
  {
    from: ['/logs/pii-in-logs', '/logs/personally-identifiable-information-pii-in-auth0-logs'],
    to: '/monitor-auth0/logs/pii-in-logs',
  },
  {
    from: ['/logs/log-data-retention', '/logs/references/log-data-retention'],
    to: '/monitor-auth0/logs/log-data-retention',
  },
  {
    from: ['/logs/view-log-events', '/logs/guides/view-log-data-dashboard', '/logs/view-log-events-in-the-dashboard'],
    to: '/monitor-auth0/logs/view-log-events',
  },
  {
    from: ['/logs/log-event-filters', '/logs/references/log-event-filters'],
    to: '/monitor-auth0/logs/log-event-filters',
  },
  {
    from: ['/logs/retrieve-log-events-using-mgmt-api', '/logs/guides/retrieve-logs-mgmt-api'],
    to: '/monitor-auth0/logs/retrieve-log-events-using-mgmt-api',
  },
  {
    from: [
      '/logs/log-event-type-codes',
      '/logs/references/log-event-data',
      '/logs/references/log-events-data',
      '/logs/references/log-event-type-codes',
    ],
    to: '/monitor-auth0/logs/log-event-type-codes',
  },
  {
    from: ['/logs/log-search-query-syntax', '/logs/references/query-syntax', '/logs/query-syntax'],
    to: '/monitor-auth0/logs/log-search-query-syntax',
  },
  {
    from: [
      '/monitoring/guides/send-events-to-splunk',
      '/monitoring/guides/send-events-to-keenio',
      '/monitoring/guides/send-events-to-segmentio',
      '/logs/export-log-events-with-rules',
    ],
    to: '/monitor-auth0/logs/export-log-events-with-rules',
  },
  {
    from: ['/logs/export-log-events-with-log-streaming', '/logs/streams'],
    to: '/monitor-auth0/streams',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-http-event-logs',
      '/logs/streams/http-event',
      '/logs/streams/stream-http-event-logs',
    ],
    to: '/monitor-auth0/streams/custom-log-streams',
  },
  {
    from: [
      '/logs/export-log-events-with-log-streaming/stream-log-events-to-slack',
      '/logs/streams/http-event-to-slack',
    ],
    to: '/monitor-auth0/streams/stream-log-events-to-slack',
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
    ],
    to: '/monitor-auth0/streams/datadog-dashboard-templates',
  },
  {
    from: ['/logs/export-log-events-with-log-streaming/splunk-dashboard', '/logs/streams/splunk-dashboard'],
    to: '/monitor-auth0/streams/splunk-dashboard',
  },
  {
    from: ['/logs/streams/sumo-logic-dashboard'],
    to: '/monitor-auth0/streams/sumo-logic-dashboard',
  },
  {
    from: ['/logs/streams/event-filters'],
    to: '/monitor-auth0/streams/event-filters',
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
    ],
    to: '/login/mfa',
  },
  {
    from: ['/mfa/enable-mfa', '/mfa/guides/enable-mfa'],
    to: '/login/mfa/enable-mfa',
  },
  {
    from: ['/mfa/mfa-factors', '/multifactor-authentication/factors', '/mfa/concepts/mfa-factors'],
    to: '/login/mfa/mfa-factors',
  },
  {
    from: [
      '/multifactor-authentication/developer/sns-configuration',
      '/multifactor-authentication/factors/push',
      '/mfa/guides/configure-push',
      '/multifactor-authentication/administrator/push-notifications',
      '/mfa/configure-push-notifications-for-mfa',
    ],
    to: '/login/mfa/mfa-factors/configure-push-notifications-for-mfa',
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
    ],
    to: '/login/mfa/mfa-factors/configure-sms-voice-notifications-mfa',
  },
  {
    from: [
      '/multifactor-authentication/factors/otp',
      '/mfa/guides/configure-otp',
      '/mfa/configure-otp-notifications-for-mfa',
    ],
    to: '/login/mfa/mfa-factors/configure-otp-notifications-for-mfa',
  },
  {
    from: [
      '/mfa/guides/configure-email-universal-login',
      '/multifactor-authentication/factors/email',
      '/mfa/guides/configure-email',
      '/mfa/configure-email-notifications-for-mfa',
    ],
    to: '/login/mfa/mfa-factors/configure-email-notifications-for-mfa',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-amazon-sns',
      '/mfa/send-phone-message-hook-amazon-sns',
      '/mfa/configure-amazon-sns-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-amazon-sns-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-esendex',
      '/mfa/send-phone-message-hook-esendex',
      '/mfa/configure-esendex-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-esendex-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-infobip',
      '/mfa/send-phone-message-hook-infobip',
      '/mfa/configure-infobip-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-infobip-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-mitto',
      '/mfa/send-phone-message-hook-mitto',
      '/mfa/configure-mitto-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-mitto-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-telesign',
      '/mfa/send-phone-message-hook-telesign',
      '/mfa/configure-telesign-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-telesign-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-twilio',
      '/mfa/send-phone-message-hook-twilio',
      '/mfa/configure-twilio-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-twilio-as-mfa-sms-provider',
  },
  {
    from: [
      '/multifactor-authentication/send-phone-message-hook-vonage',
      '/mfa/send-phone-message-hook-vonage',
      '/mfa/configure-vonage-as-mfa-sms-provider',
    ],
    to: '/login/mfa/mfa-factors/configure-vonage-as-mfa-sms-provider',
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
    ],
    to: '/login/mfa/mfa-factors/configure-cisco-duo-for-mfa',
  },
  {
    from: '/mfa/fido-authentication-with-webauthn',
    to: '/login/mfa/fido-authentication-with-webauthn',
  },
  {
    from: ['/mfa/configure-webauthn-security-keys-for-mfa', '/mfa/configure-webauthn-with-security-keys-for-mfa'],
    to: '/login/mfa/fido-authentication-with-webauthn/configure-webauthn-security-keys-for-mfa',
  },
  {
    from: '/mfa/configure-webauthn-device-biometrics-for-mfa',
    to: '/login/mfa/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa',
  },
  {
    from: '/mfa/adaptive-mfa',
    to: '/login/mfa/adaptive-mfa',
  },
  {
    from: '/mfa/adaptive-mfa/enable-adaptive-mfa',
    to: '/login/mfa/adaptive-mfa/enable-adaptive-mfa',
  },
  {
    from: '/mfa/adpative-mfa/adaptive-mfa-rule-actions',
    to: '/login/mfa/adaptive-mfa/adaptive-mfa-rule-actions',
  },
  {
    from: '/mfa/adaptive-mfa/adaptive-mfa-log-events',
    to: '/login/mfa/adaptive-mfa/adaptive-mfa-log-events',
  },
  {
    from: [
      '/mfa/concepts/guardian',
      '/multifactor-authentication/guardian/dev-guide',
      '/multifactor-authentication/guardian/admin-guide',
      '/mfa/auth0-guardian',
    ],
    to: '/login/mfa/auth0-guardian',
  },
  {
    from: ['/mfa/auth0-guardian/install-guardian-sdk', '/mfa/guides/guardian/install-guardian-sdk'],
    to: '/login/mfa/auth0-guardian/install-guardian-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/libraries/ios',
      '/mfa/guides/guardian/guardian-ios-sdk',
      '/mfa/guides/guardian/configure-guardian-ios',
      '/mfa/auth0-guardian/guardian-for-ios-sdk',
    ],
    to: '/login/mfa/auth0-guardian/guardian-for-ios-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/libraries/android',
      '/mfa/guides/guardian/guardian-android-sdk',
      '/mfa/auth0-guardian/guardian-for-android-sdk',
    ],
    to: '/login/mfa/auth0-guardian/guardian-for-android-sdk',
  },
  {
    from: [
      '/multifactor-authentication/developer/custom-enrollment-ticket',
      '/mfa/guides/guardian/create-enrollment-ticket',
      '/mfa/auth0-guardian/create-custom-enrollment-tickets',
    ],
    to: '/login/mfa/auth0-guardian/create-custom-enrollment-tickets',
  },
  {
    from: ['/mfa/auth0-guardian/guardian-error-code-reference', '/mfa/references/guardian-error-code-reference'],
    to: '/login/mfa/auth0-guardian/guardian-error-code-reference',
  },
  {
    from: [
      '/multifactor-authentication/custom',
      '/mfa/guides/customize-mfa-universal-login',
      '/multifactor-authentication/google-auth/dev-guide',
      '/mfa/customize-mfa-user-pages',
    ],
    to: '/login/mfa/customize-mfa-user-pages',
  },
  {
    from: [
      '/universal-login/multifactor-authentication',
      '/hosted-pages/guardian',
      '/universal-login/guardian',
      '/universal-login/classic-experience/mfa-classic-experience',
    ],
    to: '/login/mfa/customize-mfa-user-pages/mfa-classic-experience',
  },
  {
    from: ['/mfa/customize-mfa-user-pages/mfa-theme-language-dictionary', '/mfa/references/language-dictionary'],
    to: '/login/mfa/customize-mfa-user-pages/mfa-theme-language-dictionary',
  },
  {
    from: ['/mfa/customize-mfa-user-pages/mfa-widget-theme-options', '/mfa/references/mfa-widget-reference'],
    to: '/login/mfa/customize-mfa-user-pages/mfa-widget-theme-options',
  },
  {
    from: [
      '/api-auth/tutorials/multifactor-resource-owner-password',
      '/mfa/guides/mfa-api/authenticate',
      '/mfa/guides/mfa-api/multifactor-resource-owner-password',
      '/mfa/authenticate-with-ropg-and-mfa',
    ],
    to: '/login/mfa/ropg-mfa',
  },
  {
    from: [
      '/mfa/guides/mfa-api/phone',
      '/multifactor-authentication/api/oob',
      '/mfa/guides/mfa-api/oob',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-challenge-sms-voice-authenticators',
    ],
    to: '/login/mfa/ropg-mfa/enroll-challenge-sms-voice-authenticators',
  },
  {
    from: ['/mfa/guides/mfa-api/push', '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-push-authenticators'],
    to: '/login/mfa/ropg-mfa/enroll-and-challenge-push-authenticators',
  },
  {
    from: [
      '/multifactor-authentication/api/otp',
      '/mfa/guides/mfa-api/otp',
      '/multifactor-authentication/google-authenticator',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-otp-authenticators',
    ],
    to: '/login/mfa/ropg-mfa/enroll-and-challenge-otp-authenticators',
  },
  {
    from: [
      '/multifactor-authentication/api/email',
      '/mfa/guides/mfa-api/email',
      '/multifactor-authentication/administrator/guardian-enrollment-email',
      '/mfa/authenticate-with-ropg-and-mfa/enroll-and-challenge-email-authenticators',
    ],
    to: '/login/mfa/ropg-mfa/enroll-and-challenge-email-authenticators',
  },
  {
    from: ['/mfa/import-user-mfa-authenticator-enrollments', '/mfa/guides/import-user-mfa'],
    to: '/login/mfa/ropg-mfa/import-user-mfa-authenticator-enrollments',
  },
  {
    from: [
      '/mfa/guides/mfa-api/recovery-code',
      '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api/challenge-with-recovery-codes',
    ],
    to: '/login/mfa/ropg-mfa/challenge-with-recovery-codes',
  },
  {
    from: [
      '/mfa/guides/mfa-api/manage',
      '/multifactor-authentication/api/manage',
      '/mfa/authenticate-with-ropg-and-mfa/manage-authenticator-factors-mfa-api',
    ],
    to: '/login/mfa/ropg-mfa/manage-authenticator-factors-mfa-api',
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
    ],
    to: '/login/mfa/step-up-authentication',
  },
  {
    from: [
      '/multifactor-authentication/api/challenges',
      '/multifactor-authentication/developer/step-up-authentication/step-up-for-apis',
      '/multifactor-authentication/step-up-authentication/step-up-for-apis',
      '/mfa/guides/configure-step-up-apis',
      '/mfa/step-up-authentication/configure-step-up-authentication-for-apis',
    ],
    to: '/login/mfa/step-up-authentication/configure-step-up-authentication-for-apis',
  },
  {
    from: [
      '/multifactor-authentication/developer/step-up-authentication/step-up-for-web-apps',
      '/multifactor-authentication/step-up-authentication/step-up-for-web-apps',
      '/mfa/guides/configure-step-up-web-apps',
      '/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps',
    ],
    to: '/login/mfa/step-up-authentication/configure-step-up-authentication-for-web-apps',
  },
  {
    from: [
      '/multifactor-authentication/reset-user',
      '/multifactor-authentication/administrator/reset-user',
      '/mfa/guides/reset-user-mfa',
      '/multifactor-authentication/administrator/disabling-mfa',
      '/mfa/reset-user-mfa',
    ],
    to: '/login/mfa/reset-user-mfa',
  },
  {
    from: [
      '/mfa/concepts/mfa-developer-resources',
      '/multifactor-authentication/developer',
      '/mfa/concepts/developer-resources',
      '/mfa/mfa-developer-resources',
    ],
    to: '/login/mfa/mfa-developer-resources',
  },
  {
    from: [
      '/multifactor-authentication/api',
      '/multifactor-authentication/api/faq',
      '/mfa/concepts/mfa-api',
      '/mfa/mfa-api',
    ],
    to: '/login/mfa/mfa-developer-resources/mfa-api',
  },

  /* Monitoring */

  {
    from: ['/monitoring', '/tutorials/how-to-monitor-auth0', '/monitoring/how-to-monitor-auth0'],
    to: '/monitor-auth0',
  },
  {
    from: ['/monitoring/guides/check-external-services'],
    to: '/monitor-auth0/check-external-services-status',
  },
  {
    from: ['/monitoring/guides/check-status'],
    to: '/monitor-auth0/check-auth0-status',
  },
  {
    from: ['/monitoring/guides/monitor-applications'],
    to: '/monitor-auth0/monitor-applications',
  },
  {
    from: ['/monitoring/guides/monitor-using-SCOM'],
    to: '/monitor-auth0/monitor-using-scom',
  },

  /* Product-Lifecycle */

  {
    from: '/lifecycle',
    to: '/product-lifecycle',
  },

  /* Product-Lifecycle */

  {
    from: ['/product-lifecycle/deprecation-eol'],
    to: '/product-lifecycle/migration-process',
  },
  {
    from: ['/product-lifecycle/migrations', '/migrations'],
    to: '/product-lifecycle/deprecations-and-migrations',
  },
  {
    from: [
      '/deprecations-and-migrations/migrate-tenant-member-roles',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-manage-dashboard-new-roles',
    ],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-tenant-member-roles',
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
    ],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-from-embedded-login-to-universal-login',
  },
  {
    from: [
      '/users/user-search/migrate-v2-v3',
      '/users/search/v3/migrate-search-v2-v3',
      '/users/user-search/migrate-search-v2-v3',
    ],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-v2-v3',
  },
  {
    from: ['/migrations/guides/unpaginated-requests'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-paginated-queries',
  },
  {
    from: ['/migrations/guides/extensibility-node12'],
    to: '/product-lifecycle/deprecations-and-migrations/migrate-to-nodejs-12',
  },
  {
    from: [
      '/product-lifecycle/deprecations-and-migrations/migrate-to-management-api-v2',
      '/api/management-api-v1-deprecated',
      '/api/management-api-changes-v1-to-v2',
      '/migrations/guides/management-api-v1-v2',
      '/api/management/v1/use-cases',
      '/api/v1',
      '/migrations/past-migrations',
      '/product-lifecycle/deprecations-and-migrations/past-migrations',
    ],
    to: '/product-lifecycle/past-migrations',
  },
  {
    from: [
      '/migrations/guides/passwordless-start',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-passwordless',
    ],
    to: '/product-lifecycle/past-migrations/migrate-to-passwordless',
  },
  {
    from: [
      '/migrations/guides/clickjacking-protection',
      '/product-lifecycle/deprecations-and-migrations/clickjacking-protection-for-universal-login',
    ],
    to: '/product-lifecycle/past-migrations/clickjacking-protection-for-universal-login',
  },
  {
    from: [
      '/migrations/guides/calling-api-with-idtokens',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-calling-api-with-access-tokens',
    ],
    to: '/product-lifecycle/past-migrations/migrate-to-calling-api-with-access-tokens',
  },
  {
    from: [
      '/migrations/guides/account-linking',
      '/users/guides/link-user-accounts-auth-api',
      '/product-lifecycle/deprecations-and-migrations/link-user-accounts-with-access-tokens-migration',
    ],
    to: '/product-lifecycle/past-migrations/link-user-accounts-with-access-tokens-migration',
  },
  {
    from: [
      '/migrations/guides/migration-oauthro-oauthtoken',
      '/product-lifecycle/deprecations-and-migrations/migration-oauthro-oauthtoken',
    ],
    to: '/product-lifecycle/past-migrations/migration-oauthro-oauthtoken',
  },
  {
    from: [
      '/migrations/guides/instagram-deprecation',
      '/instagram-clientid',
      '/product-lifecycle/deprecations-and-migrations/instagram-connection-deprecation',
    ],
    to: '/product-lifecycle/past-migrations/instagram-connection-deprecation',
  },
  {
    from: [
      '/migrations/guides/yahoo-userinfo-updates',
      '/product-lifecycle/deprecations-and-migrations/yahoo-api-changes',
    ],
    to: '/product-lifecycle/past-migrations/yahoo-api-changes',
  },
  {
    from: [
      '/migrations/guides/google_cloud_messaging',
      '/product-lifecycle/deprecations-and-migrations/google-firebase-migration',
    ],
    to: '/product-lifecycle/past-migrations/google-firebase-migration',
  },
  {
    from: [
      '/migrations/guides/facebook-social-context',
      '/product-lifecycle/deprecations-and-migrations/facebook-social-context-field-deprecation',
    ],
    to: '/product-lifecycle/past-migrations/facebook-social-context-field-deprecation',
  },
  {
    from: [
      '/migrations/guides/facebook-graph-api-deprecation',
      '/product-lifecycle/deprecations-and-migrations/facebook-graph-api-changes',
    ],
    to: '/product-lifecycle/past-migrations/facebook-graph-api-changes',
  },
  {
    from: [
      '/logs/guides/migrate-logs-v2-v3',
      '/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3',
    ],
    to: '/product-lifecycle/past-migrations/migrate-to-tenant-log-search-v3',
  },
  {
    from: [
      '/migrations/guides/migration-oauthro-oauthtoken-pwdless',
      '/product-lifecycle/deprecations-and-migrations/resource-owner-passwordless-credentials-exchange',
    ],
    to: '/product-lifecycle/past-migrations/resource-owner-passwordless-credentials-exchange',
  },
  {
    from: [
      '/product-lifecycle/deprecations-and-migrations/migrate-from-legacy-auth-flows',
      '/guides/migration-legacy-flows',
    ],
    to: '/product-lifecycle/past-migrations/migrate-from-legacy-auth-flows',
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
    ],
    to: '/professional-services',
  },
  {
    from: [
      '/services/architectural-design',
      '/professional-services/architectural-design-services',
      '/professional-services/solution-design-services',
      '/services/solution-design',
    ],
    to: '/professional-services/discover-design',
  },
  {
    from: [
      '/professional-services/custom-implementation-services',
      '/services/custom-implementation',
      '/services/implement',
    ],
    to: '/professional-services/implement',
  },
  {
    from: [
      '/services/performance-scalability',
      '/professional-services/performance-and-scalability-services',
      '/professional-services/advisory-sessions',
      '/services/scenario-guidance',
      '/services/code-review',
      '/services/pair-programming',
    ],
    to: '/professional-services/maintain-improve',
  },
  {
    from: ['/services/packages'],
    to: '/professional-services/packages',
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
    ],
    to: '/rules',
  },
  {
    from: [
      '/rules/guides/automatically-generate-leads-in-shopify',
      '/rules/guides/automatically-generate-leads-shopify',
    ],
    to: '/rules/automatically-generate-leads-in-shopify',
  },
  {
    from: ['/rules/guides/cache-resources', '/rules/cache-expensive-resources-in-rules'],
    to: '/rules/cache-resources',
  },
  {
    from: ['/rules/guides/configuration'],
    to: '/rules/configuration',
  },
  {
    from: ['/dashboard/guides/rules/configure-variables'],
    to: '/rules/configure-global-variables-for-rules',
  },
  {
    from: [
      '/rules/current/context',
      '/rules/context',
      '/rules/references/context-object',
      '/rules/context-prop-authentication',
    ],
    to: '/rules/context-object',
  },
  {
    from: ['/api/management/guides/rules/create-rules', '/dashboard/guides/rules/create-rules', '/rules/guides/create'],
    to: '/rules/create-rules',
  },
  {
    from: ['/rules/guides/debug'],
    to: '/rules/debug-rules',
  },
  {
    from: ['/rules/references/samples'],
    to: '/rules/examples',
  },
  {
    from: ['/rules/guides/integrate-user-id-verification', '/rules/integrate-user-id-verification'],
    to: 'https://marketplace.auth0.com/integrations/onfido-identity-verification',
  },
  {
    from: '/rules/guides/integrate-efm-solutions',
    to: '/rules/integrate-efm-solutions',
  },
  {
    from: '/rules/guides/integrate-erfm-solutions',
    to: '/rules/integrate-erfm-solutions',
  },
  {
    from: '/rules/guides/integrate-hubspot',
    to: '/rules/integrate-hubspot',
  },
  {
    from: '/rules/guides/integrate-maxmind',
    to: '/rules/integrate-maxmind',
  },
  {
    from: '/rules/guides/integrate-mixpanel',
    to: '/rules/integrate-mixpanel',
  },
  {
    from: '/rules/guides/integrate-salesforce',
    to: '/rules/integrate-salesforce',
  },
  {
    from: ['/rules/current/redirect', '/rules/redirect', '/rules/guides/redirect'],
    to: '/rules/redirect-users',
  },
  {
    from: ['/rules/references/use-cases'],
    to: '/rules/use-cases',
  },
  {
    from: ['/rules/current/management-api', '/rules/guides/management-api'],
    to: '/rules/use-management-api',
  },
  {
    from: ['/rules/references/user-object'],
    to: '/rules/user-object-in-rules',
  },
  {
    from: [
      '/monitoring/guides/track-leads-salesforce',
      '/tutorials/tracking-new-leads-in-salesforce-and-raplead',
      '/scenarios-rapleaf-salesforce',
      '/scenarios/rapleaf-salesforce',
      '/monitor-auth0/track-new-leads-in-salesforce',
    ],
    to: '/rules/use-cases/track-new-leads-in-salesforce',
  },
  {
    from: [
      '/monitoring/guides/track-signups-salesforce',
      '/tutorials/track-signups-enrich-user-profile-generate-leads',
      '/scenarios-mixpanel-fullcontact-salesforce',
      '/scenarios/mixpanel-fullcontact-salesforce',
      '/monitor-auth0/track-new-sign-ups-in-salesforce',
    ],
    to: '/rules/use-cases/track-new-sign-ups-in-salesforce',
  },

  /* Security */
  {
    from: ['/security/general-security-tips'],
    to: '/security/tips',
  },
  {
    from: [
      '/security/blacklist-user-attributes',
      '/security/blacklisting-attributes',
      '/tutorials/blacklisting-attributes',
      '/blacklist-attributes',
      '/security/denylist-user-attributes',
    ],
    to: '/security/data-security/denylist',
  },
  {
    from: ['/security/whitelist-ip-addresses', '/guides/ip-whitelist', '/security/allowlist-ip-addresses'],
    to: '/security/data-security/allowlist',
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
    ],
    to: '/security/data-security/user-data-storage',
  },
  {
    from: [
      '/tokens/concepts/token-storage',
      '/videos/session-and-cookies',
      '/security/store-tokens',
      '/tokens/guides/store-tokens',
      '/tokens/token-storage',
    ],
    to: '/security/data-security/token-storage',
  },
  {
    from: ['/security/common-threats', '/security/prevent-common-cybersecurity-threats'],
    to: '/security/prevent-threats',
  },

  /* Security Bulletins */
  {
    from: ['/security/bulletins'],
    to: '/security/security-bulletins',
  },
  {
    from: ['/security/bulletins/cve-2020-15259', '/security/cve-2020-15259'],
    to: '/security/security-bulletins/cve-2020-15259',
  },
  {
    from: ['/security/bulletin/cve-2020-15240', '/security/cve-2020-15240'],
    to: '/security/security-bulletins/cve-2020-15240',
  },
  {
    from: ['/security/bulletins/cve-2020-15125', '/security/cve-2020-15125'],
    to: '/security/security-bulletins/cve-2020-15125',
  },
  {
    from: ['/security/bulletins/cve-2020-15084', '/security/cve-2020-15084'],
    to: '/security/security-bulletins/cve-2020-15084',
  },
  {
    from: ['/security/bulletins/2020-03-31_wpauth0', '/security/2020-03-31-wpauth0'],
    to: '/security/security-bulletins/2020-03-31-wpauth0',
  },
  {
    from: ['/security/bulletins/cve-2020-5263', '/security/cve-2020-5263'],
    to: '/security/security-bulletins/cve-2020-5263',
  },
  {
    from: ['/security/bulletins/2019-01-10_rules', '/security/2019-01-10-rules'],
    to: '/security/security-bulletins/2019-01-10-rules',
  },
  {
    from: ['/security/bulletins/2019-09-05_scopes', '/security/2019-09-05-scopes'],
    to: '/security/security-bulletins/2019-09-05-scopes',
  },
  {
    from: ['/security/bulletins/cve-2019-20174', '/security/cve-2019-20174'],
    to: '/security/security-bulletins/cve-2019-20174',
  },
  {
    from: ['/security/bulletins/cve-2019-20173', '/security/cve-2019-20173'],
    to: '/security/security-bulletins/cve-2019-20173',
  },
  {
    from: ['/security/bulletins/cve-2019-16929', '/security/cve-2019-16929'],
    to: '/security/security-bulletins/cve-2019-16929',
  },
  {
    from: ['/security/bulletins/cve-2019-13483', '/security/cve-2019-13483'],
    to: '/security/security-bulletins/cve-2019-13483',
  },
  {
    from: ['/security/bulletins/cve-2019-7644', '/security/cve-2019-7644'],
    to: '/security/security-bulletins/cve-2019-7644',
  },
  {
    from: ['/security/bulletins/cve-2018-15121', '/security/cve-2018-15121'],
    to: '/security/security-bulletins/cve-2018-15121',
  },
  {
    from: ['/security/bulletins/cve-2018-11537', '/security/cve-2018-11537'],
    to: '/security/security-bulletins/cve-2018-11537',
  },
  {
    from: ['/security/bulletins/cve-2018-7307', '/security/cve-2018-7307'],
    to: '/security/security-bulletins/cve-2018-7307',
  },
  {
    from: ['/security/bulletins/cve-2018-6874', '/security/cve-2018-6874'],
    to: '/security/security-bulletins/cve-2018-6874',
  },
  {
    from: ['/security/bulletins/cve-2018-6873', '/security/cve-2018-6873'],
    to: '/security/security-bulletins/cve-2018-6873',
  },
  {
    from: ['/security/bulletins/cve-2017-16897', '/security/cve-2017-16897'],
    to: '/security/security-bulletins/cve-2017-16897',
  },
  {
    from: ['/security/bulletins/cve-2017-17068', '/security/cve-2017-17068'],
    to: '/security/security-bulletins/cve-2017-17068',
  },

  /* Tokens */

  {
    from: ['/tokens', '/security/token-exp', '/token', '/tokens/concepts', '/tokens/guides'],
    to: '/security/tokens',
  },
  {
    from: [
      '/tokens/overview-id-tokens',
      '/tokens/id-token',
      '/tokens/concepts/id-tokens',
      '/tokens/id_token',
      '/tokens/id-tokens',
    ],
    to: '/security/tokens/id-tokens',
  },
  {
    from: [
      '/tokens/id-tokens/validate-id-tokens',
      '/tokens/guides/validate-id-token',
      '/tokens/guides/validate-id-tokens',
      '/tokens/guides/id-token/validate-id-token',
      '/tokens/id-tokens/validate-id-tokens',
    ],
    to: '/security/tokens/id-tokens/validate-id-tokens',
  },
  {
    from: ['/tokens/id-tokens/get-id-tokens', '/tokens/guides/id-token/get-id-tokens', '/tokens/guides/get-id-tokens'],
    to: '/security/tokens/id-tokens/get-id-tokens',
  },
  {
    from: ['/tokens/id-tokens/id-token-structure', '/tokens/references/id-token-structure'],
    to: '/security/tokens/id-tokens/id-token-structure',
  },
  {
    from: ['/tokens/id-tokens/update-id-token-lifetime', '/dashboard/guides/applications/update-token-lifetime'],
    to: '/security/tokens/id-tokens/update-id-token-lifetime',
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
    ],
    to: '/security/tokens/access-tokens',
  },
  {
    from: [
      '/tokens/guides/validate-access-tokens',
      '/api-auth/tutorials/verify-access-token',
      '/tokens/guides/access-token/validate-access-token',
      '/tokens/access-tokens/validate-access-tokens',
    ],
    to: '/security/tokens/access-tokens/validate-access-tokens',
  },
  {
    from: [
      '/tokens/guides/get-access-tokens',
      '/tokens/get-access-tokens',
      '/tokens/guides/access-token/get-access-tokens',
      '/tokens/access-tokens/get-access-tokens',
    ],
    to: '/security/tokens/access-tokens/get-access-tokens',
  },
  {
    from: [
      '/tokens/guides/use-access-tokens',
      '/tokens/use-access-tokens',
      '/tokens/guides/access-token/use-access-tokens',
      '/tokens/access-tokens/use-access-tokens',
    ],
    to: '/security/tokens/access-tokens/use-access-tokens',
  },
  {
    from: [
      '/tokens/concepts/idp-access-tokens',
      '/tokens/overview-idp-access-tokens',
      '/tokens/idp',
      '/tokens/identity-provider-access-tokens',
    ],
    to: '/security/tokens/access-tokens/identity-provider-access-tokens',
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
    ],
    to: '/security/tokens/access-tokens/management-api-access-tokens',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production',
      '/api/management/v2/get-access-tokens-for-production',
    ],
    to: '/security/tokens/access-tokens/get-management-api-access-tokens-for-production',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-access-tokens-for-testing',
      '/api/management/v2/get-access-tokens-for-test',
    ],
    to: '/security/tokens/access-tokens/get-management-api-access-tokens-for-testing',
  },
  {
    from: [
      '/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications',
      '/api/management/v2/get-access-tokens-for-spas',
    ],
    to: '/security/tokens/access-tokens/get-management-api-tokens-for-single-page-applications',
  },
  {
    from: [
      '/api/management/v2/tokens-flows',
      '/tokens/management-api-access-tokens/changes-in-auth0-management-apiv2-tokens',
    ],
    to: '/security/tokens/access-tokens/changes-in-auth0-management-apiv2-tokens',
  },
  {
    from: ['/tokens/access-tokens/update-access-token-lifetime', '/dashboard/guides/apis/update-token-lifetime'],
    to: '/security/tokens/access-tokens/update-access-token-lifetime',
  },
  {
    from: ['/tokens/json-web-tokens', '/tokens/concepts/jwts', '/tokens/concepts/why-use-jwt', '/tokens/jwt', '/jwt'],
    to: '/security/tokens/json-web-tokens',
  },
  {
    from: [
      '/tokens/json-web-tokens/validate-json-web-tokens',
      '/tokens/guides/validate-jwts',
      '/tokens/guides/jwt/parse-validate-jwt-programmatically',
      '/tokens/guides/jwt/validate-jwt',
    ],
    to: '/security/tokens/json-web-tokens/validate-json-web-tokens',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-token-structure',
      '/tokens/references/jwt-structure',
      '/tokens/reference/jwt/jwt-structure',
    ],
    to: '/security/tokens/json-web-tokens/json-web-token-structure',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-token-claims',
      '/tokens/jwt-claims',
      '/tokens/concepts/jwt-claims',
      '/tokens/add-custom-claims',
      '/scopes/current/custom-claims',
    ],
    to: '/security/tokens/json-web-tokens/json-web-token-claims',
  },
  {
    from: [
      '/tokens/create-namespaced-custom-claims',
      '/tokens/guides/create-namespaced-custom-claims',
      '/tokens/concepts/claims-namespacing',
    ],
    to: '/security/tokens/json-web-tokens/create-namespaced-custom-claims',
  },
  {
    from: ['/tokens/json-web-tokens/json-web-key-sets', '/tokens/jwks', '/jwks', '/tokens/concepts/jwks'],
    to: '/security/tokens/json-web-tokens/json-web-key-sets',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-key-sets/locate-json-web-key-sets',
      '/tokens/guides/locate-jwks',
      '/tokens/guides/jwt/verify-jwt-signature-using-jwks',
      '/tokens/guides/jwt/use-jwks',
    ],
    to: '/security/tokens/json-web-tokens/locate-json-web-key-sets',
  },
  {
    from: [
      '/tokens/json-web-tokens/json-web-key-set-properties',
      '/tokens/references/jwks-properties',
      '/tokens/reference/jwt/jwks-properties',
    ],
    to: '/security/tokens/json-web-tokens/json-web-key-set-properties',
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
    ],
    to: '/security/tokens/refresh-tokens',
  },
  {
    from: ['/tokens/refresh-tokens/get-refresh-tokens', '/tokens/guides/get-refresh-tokens'],
    to: '/security/tokens/refresh-tokens/get-refresh-tokens',
  },
  {
    from: ['/tokens/refresh-tokens/use-refresh-tokens', '/tokens/guides/use-refresh-tokens'],
    to: '/security/tokens/refresh-tokens/use-refresh-tokens',
  },
  {
    from: [
      '/tokens/refresh-tokens/configure-refresh-token-expiration',
      '/security/tokens/configure-refresh-token-expiration',
    ],
    to: '/security/tokens/refresh-tokens/configure-refresh-token-expiration',
  },
  {
    from: [
      '/tokens/concepts/refresh-token-rotation',
      '/tokens/access-tokens/refresh-tokens/refresh-token-rotation',
      '/tokens/refresh-tokens/refresh-token-rotation',
      '/security/tokens/refresh-token-rotation',
    ],
    to: '/security/tokens/refresh-tokens/refresh-token-rotation',
  },
  {
    from: [
      '/tokens/refresh-tokens/configure-refresh-token-rotation',
      '/tokens/guides/configure-refresh-token-rotation',
    ],
    to: '/security/tokens/refresh-tokens/configure-refresh-token-rotation',
  },
  {
    from: [
      '/tokens/guides/use-refresh-token-rotation',
      '/tokens/refresh-token-rotation/use-refresh-token-rotation',
      '/tokens/refresh-tokens/refresh-token-rotation/use-refresh-token-rotation',
    ],
    to: '/security/tokens/refresh-tokens/use-refresh-token-rotation',
  },
  {
    from: [
      '/tokens/guides/disable-refresh-token-rotation',
      '/tokens/access-tokens/refresh-tokens/disable-refresh-token-rotation',
      '/tokens/refresh-tokens/disable-refresh-token-rotation',
    ],
    to: '/security/tokens/refresh-tokens/disable-refresh-token-rotation',
  },
  {
    from: ['/tokens/refresh-tokens/revoke-refresh-tokens', '/tokens/guides/revoke-refresh-tokens'],
    to: '/security/tokens/refresh-tokens/revoke-refresh-tokens',
  },
  {
    from: ['/tokens/revoke-tokens', '/tokens/guides/revoke-tokens'],
    to: '/security/tokens/revoke-tokens',
  },
  {
    from: [
      '/api-auth/tutorials/adoption/delegation',
      '/tokens/delegation',
      '/tokens/concepts/delegation-tokens',
      '/tokens/delegation-tokens',
    ],
    to: '/security/tokens/delegation-tokens',
  },

  /* Support */

  {
    from: ['/policies/requests', '/premium-support'],
    to: '/support',
  },
  {
    from: ['/support/support-overview'],
    to: '/support/support-plans',
  },
  {
    from: ['/support/matrix'],
    to: '/support/product-support-matrix',
  },
  {
    from: ['/sla', '/support/sla', '/support/sld'],
    to: '/support/services-level-descriptions',
  },
  {
    from: ['/support/tickets'],
    to: '/support/open-and-manage-support-tickets',
  },
  {
    from: ['/support/subscription'],
    to: '/support/manage-subscriptions',
  },
  {
    from: [
      '/support/cancel-paid-subscriptions',
      '/tutorials/cancel-paid-subscriptions',
      '/cancel-paid-subscriptions',
      '/support/downgrade-or-cancel-subscriptions',
    ],
    to: '/support/manage-subscriptions/downgrade-or-cancel-subscriptions',
  },
  {
    from: ['/support/delete-or-reset-tenant', '/support/delete-reset-tenant', '/tutorials/delete-reset-tenant'],
    to: '/support/manage-subscriptions/delete-or-reset-tenant',
  },
  {
    from: [
      '/tutorials/removing-auth0-exporting-data',
      '/support/removing-auth0-exporting-data',
      '/moving-out',
      '/support/export-data',
    ],
    to: '/support/manage-subscriptions/export-data',
  },
  {
    from: ['/support/how-auth0-versions-software', '/tutorials/how-auth0-versions-software', '/versioning'],
    to: '/support/versioning-strategy',
  },
  {
    from: ['/support/reset-account-password', '/tutorials/reset-account-password'],
    to: '/support/reset-account-passwords',
  },

  /* Policies */

  {
    from: [
      '/policies',
      '/policies/dashboard-authentication',
      '/policies/restore-deleted-tenant',
      '/policies/unsupported-requests',
    ],
    to: '/support/policies',
  },
  {
    from: ['/policies/billing-policy', '/policies/billing'],
    to: '/support/policies/billing-policy',
  },
  {
    from: [
      '/policies/public-cloud-service-endpoints',
      '/policies/endpoints',
      '/security/public-cloud-service-endpoints',
    ],
    to: '/support/policies/public-cloud-service-endpoints',
  },
  {
    from: ['/policies/data-export-and-transfer-policy', '/policies/data-export', '/policies/data-transfer'],
    to: '/support/policies/data-export-and-transfer-policy',
  },
  {
    from: ['/policies/load-testing-policy', '/policies/load-testing'],
    to: '/support/policies/load-testing-policy',
  },
  {
    from: ['/policies/penetration-testing-policy', '/policies/penetration-testing'],
    to: '/support/policies/penetration-testing-policy',
  },
  {
    from: [
      '/rate-limits',
      '/policies/rate-limit',
      '/policies/rate-limits',
      '/policies/legacy-rate-limits',
      '/policies/rate-limit-policy',
    ],
    to: '/support/policies/rate-limit-policy',
  },
  {
    from: [
      '/policies/rate-limit-policy/authentication-api-endpoint-rate-limits',
      '/policies/rate-limits-auth-api',
      '/policies/rate-limits-api',
      '/policies/authentication-api-endpoint-rate-limits',
    ],
    to: '/support/policies/rate-limit-policy/authentication-api-endpoint-rate-limits',
  },
  {
    from: [
      '/policies/rate-limit-policy/mgmt-api-endpoint-rate-limits-before-19-may-2020',
      '/policies/rate-limit-policy/management-api-endpoint-rate-limits',
      '/policies/rate-limits-mgmt-api',
      '/policies/management-api-endpoint-rate-limits',
    ],
    to: '/support/policies/rate-limit-policy/management-api-endpoint-rate-limits',
  },
  {
    from: [
      '/policies/database-connections-rate-limits',
      '/policies/rate-limit-policy/database-connections-rate-limits',
      '/connections/database/rate-limits',
      '/support/policies/database-connections-rate-limits',
    ],
    to: '/support/policies/rate-limit-policy/database-connections-rate-limits',
  },
  {
    from: [
      '/authorization/reference/rbac-limits',
      '/authorization/rbac/authorization-core-rbac-limits',
      '/policies/entity-limit-policy',
      '/policies/entity-limits',
      '/policies/global-limit',
    ],
    to: '/support/policies/entity-limit-policy',
  },
  {
    from: ['/support/support-center-users'],
    to: '/dashboard-access/support-center-users',
  },

  /* Troubleshoot */

  {
    from: ['/troubleshoot/basics'],
    to: '/troubleshoot',
  },
  {
    from: ['/troubleshoot/basic-troubleshooting', '/troubleshoot/concepts/basics'],
    to: '/troubleshoot/troubleshoot-basic',
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-platform', '/troubleshoot/guides/verify-platform'],
    to: '/troubleshoot/troubleshoot-basic/verify-platform',
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-connections', '/troubleshoot/guides/verify-connections'],
    to: '/troubleshoot/troubleshoot-basic/verify-connections',
  },
  {
    from: ['/troubleshoot/basic-troubleshooting/verify-domain', '/troubleshoot/guides/verify-domain'],
    to: '/troubleshoot/troubleshoot-basic/verify-domain',
  },
  {
    from: ['/troubleshoot/guides/verify-rules', '/troubleshoot/verify-rules'],
    to: '/troubleshoot/troubleshoot-basic/verify-rules',
  },
  {
    from: ['/troubleshoot/guides/check-error-messages', '/troubleshoot/check-error-messages'],
    to: '/troubleshoot/troubleshoot-basic/check-error-messages',
  },
  {
    from: [
      '/product-lifecycle/deprecations-and-migrations/search-logs-for-deprecation-errors',
      '/errors/deprecations-errors/',
    ],
    to: '/troubleshoot/troubleshoot-basic/search-logs-for-deprecation-errors',
  },
  {
    from: [
      '/troubleshoot/guides/check-deprecation-errors',
      '/troubleshoot/troubleshoot-authentication-issues/check-deprecation-errors',
    ],
    to: '/troubleshoot/troubleshoot-basic/check-deprecation-errors',
  },
  {
    from: ['/troubleshoot/references/invalid-token', '/troubleshoot/invalid-token-errors'],
    to: '/troubleshoot/troubleshoot-basic/invalid-token-errors',
  },
  {
    from: ['/troubleshoot/concepts/auth-issues', '/troubleshoot/troubleshoot-authentication-issues'],
    to: '/troubleshoot/troubleshoot-authentication',
  },
  {
    from: ['/troubleshoot/guides/check-api-calls', '/troubleshoot/troubleshoot-authentication-issues/check-api-calls'],
    to: '/troubleshoot/troubleshoot-authentication/check-api-calls',
  },
  {
    from: [
      '/troubleshoot/guides/check-login-logout-issues',
      '/troubleshoot/troubleshoot-authentication-issues/check-login-and-logout-issues',
    ],
    to: '/troubleshoot/troubleshoot-authentication/check-login-and-logout-issues',
  },
  {
    from: [
      '/troubleshoot/guides/check-user-profiles',
      '/troubleshoot/troubleshoot-authentication-issues/check-user-profiles',
    ],
    to: '/troubleshoot/troubleshoot-authentication/check-user-profiles',
  },
  {
    from: [
      '/authorization/concepts/troubleshooting',
      '/authorization/troubleshoot-role-based-access-control-and-authorization',
    ],
    to: '/troubleshoot/troubleshoot-authentication/troubleshoot-rbac-authorization',
  },
  {
    from: ['/troubleshoot/references/saml-errors', '/troubleshoot/troubleshoot-authentication-issues/saml-errors'],
    to: '/troubleshoot/troubleshoot-authentication/saml-errors',
  },
  {
    from: [
      '/protocols/saml/saml-configuration/troubleshoot/auth0-as-idp',
      '/protocols/saml/saml-configuration/troubleshoot',
      '/protocols/saml/saml-configuration/troubleshoot/common-saml-errors',
      '/protocols/saml/saml-configuration/troubleshoot/auth0-as-sp',
      '/troubleshoot/troubleshoot-saml-configurations',
      '/protocols/saml-protocol/troubleshoot-saml-configurations',
    ],
    to: '/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations',
  },
  {
    from: ['/troubleshoot/self-change-password-errors', '/troubleshoot/references/self_change_password'],
    to: '/troubleshoot/troubleshoot-authentication/self-change-password-errors',
  },
  {
    from: [
      '/multifactor-authentication/google-auth/admin-guide',
      '/multifactor-authentication/google-auth/user-guide',
      '/multifactor-authentication/troubleshooting',
      '/mfa/references/troubleshoot-mfa',
      '/mfa/references/troubleshooting',
      '/mfa/troubleshoot-mfa-issues',
    ],
    to: '/troubleshoot/troubleshoot-authentication/troubleshoot-mfa-issues',
  },
  {
    from: [
      '/extensions/authorization-extension/v2/troubleshooting',
      '/extensions/authorization-dashboard-extension/troubleshoot-authorization-extension',
      '/extensions/authorization-extension/troubleshoot-authorization-extension',
    ],
    to: '/troubleshoot/troubleshoot-authentication/troubleshoot-authorization-extension',
  },
  {
    from: ['/authorization/renew-tokens-when-using-safari', '/api-auth/token-renewal-in-safari'],
    to: '/troubleshoot/troubleshoot-authentication/renew-tokens-when-using-safari',
  },
  {
    from: ['/troubleshoot/concepts/integration-extensibility-issues'],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility',
  },
  {
    from: ['/custom-domains/troubleshoot-custom-domains', '/custom-domains/troubleshoot'],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-custom-domains',
  },
  {
    from: [
      '/connector/troubleshooting',
      '/ad-ldap-connector/troubleshoot-ad-ldap-connector',
      '/extensions/ad-ldap-connector/troubleshoot-ad-ldap-connector',
    ],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-ad-ldap-connector',
  },
  {
    from: ['/extensions/troubleshoot-extensions', '/extensions/troubleshoot'],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-extensions',
  },
  {
    from: [
      '/extensions/deploy-cli/references/troubleshooting',
      '/extensions/deploy-cli-tool/troubleshoot-the-deploy-cli-tool',
      '/deploy/deploy-cli-tool/troubleshoot-the-deploy-cli-tool',
    ],
    to: '/troubleshoot/troubleshoot-integration-and-extensibility/troubleshoot-the-deploy-cli-tool',
  },
  {
    from: '/troubleshoot/troubleshooting-tools',
    to: '/troubleshoot/tools',
  },
  {
    from: [
      '/har',
      '/tutorials/troubleshooting-with-har-files',
      '/troubleshoot/har',
      '/support/troubleshooting-with-har-files',
      '/troubleshoot/guides/generate-har-files',
      '/troubleshoot/generate-and-analyze-har-files',
    ],
    to: '/troubleshoot/tools/generate-and-analyze-har-files',
  },

  /* Tutorials */

  {
    from: ['/scenarios', '/tutorials'],
    to: '/',
  },

  /* Manage Users */

  {
    from: ['/users/concepts/overview-users'],
    to: '/users',
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
    ],
    to: '/users/user-profiles',
  },
  {
    from: [
      '/user-profile/user-profile-structure',
      '/users/references/user-profile-structure',
      '/users/user-profile-structure',
    ],
    to: '/users/user-profiles/user-profile-structure',
  },
  {
    from: ['/users/sample-user-profiles', '/users/normalized/auth0/sample-user-profiles'],
    to: '/users/user-profiles/sample-user-profiles',
  },
  {
    from: [
      '/users/normalized-user-profiles',
      '/users/normalized',
      '/user-profile/normalized/auth0',
      '/users/normalized/auth0',
    ],
    to: '/users/user-profiles/normalized-user-profiles',
  },
  {
    from: ['/users/normalized-user-profile-schema', '/users/normalized/auth0/normalized-user-profile-schema'],
    to: '/users/user-profiles/normalized-user-profile-schema',
  },
  {
    from: [
      '/user-profile/progressive-profiling',
      '/users/concepts/overview-progressive-profiling',
      '/users/guides/implement-progressive-profiling',
      '/users/progressive-profiling',
      '/users/concepts/overview-progressive-profiling',
    ],
    to: '/users/user-profiles/progressive-profiling',
  },
  {
    from: ['/users/updating-user-profile-root-attributes', '/users/normalized/auth0/update-root-attributes'],
    to: '/users/user-profiles/root-attributes',
  },
  {
    from: [
      '/users/set-root-attributes-during-user-import',
      '/api/management/guides/users/set-root-attributes-user-import',
    ],
    to: '/users/user-profiles/root-attributes/set-root-attributes-during-user-import',
  },
  {
    from: [
      '/users/set-root-attributes-during-user-sign-up',
      '/api/management/guides/users/set-root-attributes-user-signup',
    ],
    to: '/users/user-profiles/root-attributes/set-root-attributes-during-user-sign-up',
  },
  {
    from: ['/users/update-root-attributes-for-users', '/api/management/guides/users/update-root-attributes-users'],
    to: '/users/user-profiles/root-attributes/update-root-attributes-for-users',
  },
  {
    from: ['/users/verified-email-usage', '/users/guides/email-verified'],
    to: '/users/user-profiles/verified-email-usage',
  },
  {
    from: [
      '/users/configure-connection-sync-with-auth0',
      '/dashboard/guides/connections/configure-connection-sync',
      '/api/management/guides/connections/configure-connection-sync',
    ],
    to: '/users/user-profiles/configure-connection-sync-with-auth0',
  },
  {
    from: [
      '/users/update-user-profiles-using-your-database',
      '/user-profile/customdb',
      '/users/guides/update-user-profiles-using-your-database',
    ],
    to: '/users/user-profiles/update-user-profiles-using-your-database',
  },
  {
    from: [
      '/users/concepts/overview-user-metadata',
      '/metadata',
      '/users/read-metadata',
      '/users/guides/read-metadata',
      '/users/guides/manage-user-metadata',
      '/users/manage-user-metadata',
    ],
    to: '/users/metadata',
  },
  {
    from: ['/users/references/metadata-field-name-rules', '/best-practices/metadata-best-practices'],
    to: '/users/metadata/metadata-fields-data',
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
    ],
    to: '/users/metadata/manage-metadata-api',
  },
  {
    from: ['/metadata/lock'],
    to: '/users/metadata/manage-metadata-lock',
  },
  {
    from: [
      '/rules/current/metadata-in-rules',
      '/rules/guides/metadata',
      '/rules/metadata-in-rules',
      '/metadata-in-rules',
      '/metadata/rules',
      '/rules/metadata',
    ],
    to: '/users/metadata/manage-metadata-rules',
  },
  {
    from: [
      '/sessions-and-cookies',
      '/sessions/concepts/session',
      '/sessions/concepts/session-lifetime',
      '/sessions/references/sample-use-cases-sessions',
      '/sessions-and-cookies/session-use-cases',
      '/sessions',
    ],
    to: '/users/sessions',
  },
  {
    from: ['/sessions/session-layers', '/sessions/concepts/session-layers'],
    to: '/users/sessions/session-layers',
  },
  {
    from: '/sessions/session-lifetime-limits',
    to: '/users/sessions/session-lifetime-limits',
  },
  {
    from: [
      '/get-started/dashboard/configure-session-lifetime-settings',
      '/dashboard/guides/tenants/configure-session-lifetime-settings',
      '/api/management/guides/tenants/configure-session-lifetime-settings',
      '/sso/current/configure-session-lifetime-limits',
      '/sessions/configure-session-lifetime-settings',
      '/users/sessions/session-lifetimes/configure-session-lifetime-settings',
    ],
    to: '/users/sessions/configure-session-lifetime-settings',
  },
  {
    from: ['/sessions/non-persistent-sessions', '/users/sessions/session-lifetimes/non-persistent-sessions'],
    to: '/users/sessions/non-persistent-sessions',
  },
  {
    from: [
      '/sessions/references/example-short-lived-session-mgmt',
      '/sessions-and-cookies/manage-multi-site-short-long-lived-sessions',
    ],
    to: '/users/sessions/manage-multi-site-sessions',
  },
  {
    from: ['/sessions/cookies', '/sessions/concepts/cookies', '/sessions-and-cookies/cookies'],
    to: '/users/cookies',
  },
  {
    from: '/sessions/cookies/authentication-api-cookies',
    to: '/users/cookies/authentication-api-cookies',
  },
  {
    from: [
      '/sessions/spa-authenticate-with-cookies',
      '/login/spa/authenticate-with-cookies',
      '/sessions-and-cookies/spa-authenticate-with-cookies',
      '/sessions/cookies/spa-authenticate-with-cookies',
    ],
    to: '/users/cookies/spa-authenticate-with-cookies',
  },
  {
    from: [
      '/sessions/concepts/cookie-attributes',
      '/sessions-and-cookies/samesite-cookie-attribute-changes',
      '/sessions/cookies/samesite-cookie-attribute-changes',
    ],
    to: '/users/cookies/samesite-cookie-attribute-changes',
  },
  {
    from: ['/users/guides/manage-users-using-the-dashboard'],
    to: '/users/manage-users-using-the-dashboard',
  },
  {
    from: ['/users/guides/manage-users-using-the-management-api'],
    to: '/users/manage-users-using-the-management-api',
  },
  {
    from: ['/users/guides/link-user-accounts', '/link-accounts/suggested-linking', '/users/link-user-accounts'],
    to: '/users/user-account-linking/link-user-accounts',
  },
  {
    from: ['/users/unlink-user-accounts', '/users/guides/unlink-user-accounts'],
    to: '/users/user-account-linking/unlink-user-accounts',
  },
  {
    from: [
      '/link-accounts/user-initiated',
      '/link-accounts/user-initiated-linking',
      '/users/references/link-accounts-user-initiated-scenario',
      '/users/references/link-accounts-client-side-scenario',
      '/user/references/link-accounts-client-side-scenario',
      '/users/user-initiated-account-linking-client-side-implementation',
    ],
    to: '/users/user-account-linking/user-initiated-account-linking-client-side-implementation',
  },
  {
    from: [
      '/users/suggested-account-linking-server-side-implementation',
      '/users/references/link-accounts-server-side-scenario',
    ],
    to: '/users/user-account-linking/suggested-account-linking-server-side-implementation',
  },
  {
    from: ['/users/concepts/overview-user-migration', '/users/import-export-users'],
    to: '/users/import-and-export-users',
  },
  {
    from: [
      '/connections/database/migrating-okta',
      '/users/migrations/okta',
      '/users/references/user-migration-scenarios',
      '/users/migrations',
      '/users/user-migration-scenarios',
    ],
    to: '/users/import-and-export-users/user-migration-scenarios',
  },
  {
    from: [
      '/connections/database/migrating',
      '/migrating',
      '/users/migrations/automatic',
      '/users/guides/configure-automatic-migration',
      '/users/configure-automatic-migration-from-your-database',
    ],
    to: '/users/import-and-export-users/configure-automatic-migration-from-your-database',
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
    ],
    to: '/users/import-and-export-users/bulk-user-imports',
  },
  {
    from: [
      '/users/bulk-user-import-database-schema-and-examples',
      '/users/references/bulk-import-database-schema-examples',
    ],
    to: '/users/import-and-export-users/bulk-user-import-database-schema-and-examples',
  },
  {
    from: ['/users/bulk-user-exports', '/users/guides/bulk-user-exports'],
    to: '/users/import-and-export-users/bulk-user-exports',
  },
  {
    from: ['/users/guides/block-and-unblock-users'],
    to: '/users/block-and-unblock-users',
  },
  {
    from: ['/users/guides/manage-user-access-to-applications'],
    to: '/users/manage-user-access-to-applications',
  },
  {
    from: ['/users/guides/delete-users'],
    to: '/users/delete-users',
  },
  {
    from: ['/dashboard/guides/users/unlink-user-devices'],
    to: '/users/unlink-devices-from-users',
  },
  {
    from: ['/user-profile/user-picture', '/users/guides/change-user-pictures'],
    to: '/users/change-user-picture',
  },
  {
    from: [
      '/tutorials/creating-users-in-the-management-portal',
      '/users/guides/create-users',
      '/creating-users',
      '/dashboard/guides/users/create-users',
    ],
    to: '/users/create-users',
  },
  {
    from: [
      '/tutorials/get-user-information-with-unbounce-landing-pages',
      '/users/guides/get-user-information-with-unbounce-landing-pages',
      '/scenarios-unbounce',
    ],
    to: '/users/get-user-information-on-unbounce-landing-pages',
  },
  {
    from: ['/users/guides/view-users'],
    to: '/users/view-user-details',
  },
  {
    from: ['/users/normalized/auth0/identify-users'],
    to: '/users/identify-users',
  },
  {
    from: ['/users/search/v3', '/users/normalized/auth0/retrieve-user-profiles', '/users/search', '/users-search'],
    to: '/users/user-search',
  },
  {
    from: ['/users/search/v3/query-syntax'],
    to: '/users/user-search/user-search-query-syntax',
  },
  {
    from: ['/api/management/v2/user-search', '/users/search/v2', '/api/v2/user-search'],
    to: '/users/user-search/v2',
  },
  {
    from: ['/api/management/v2/query-string-syntax', '/users/search/v2/query-syntax'],
    to: '/users/user-search/v2/query-syntax',
  },
  {
    from: ['/users/search/v3/get-users-by-email-endpoint'],
    to: '/users/user-search/retrieve-users-with-get-users-by-email-endpoint',
  },
  {
    from: ['/users/search/v3/get-users-by-id-endpoint'],
    to: '/users/user-search/retrieve-users-with-get-users-by-id-endpoint',
  },
  {
    from: ['/users/search/v3/get-users-endpoint', '/users/user-search/retrieve-users-with-the-get-users-endpoint'],
    to: '/users/user-search/retrieve-users-with-get-users-endpoint',
  },
  {
    from: ['/users/search/v3/sort-search-results'],
    to: '/users/user-search/sort-search-results',
  },
  {
    from: ['/users/search/v3/view-search-results-by-page'],
    to: '/users/user-search/view-search-results-by-page',
  },
  {
    from: [
      '/link-accounts/auth-api',
      '/link-accounts',
      '/users/concepts/overview-user-account-linking',
      '/users/guide/concepts/overview-user-account-linking',
    ],
    to: '/users/user-account-linking',
  },
  {
    from: ['/users/guides/get-user-information-with-unbounce-landing-pages'],
    to: '/users/get-user-information-on-unbounce-landing-pages',
  },

  /* Videos */

  {
    from: ['/video-series/main/videos'],
    to: '/videos',
  },
  {
    from: ['/videos/learn-identity'],
    to: '/videos/learn-identity-series',
  },
  {
    from: [
      '/videos/learn-identity/01-introduction-to-identity',
      '/videos/learn-identity-series/learn-identity-series/introduction-to-identity',
    ],
    to: '/videos/learn-identity-series/introduction-to-identity',
  },
  {
    from: ['/videos/learn-identity/02-oidc-and-oauth'],
    to: '/videos/learn-identity-series/openid-connect-and-oauth2',
  },
  {
    from: ['/videos/learn-identity/03-web-sign-in'],
    to: '/videos/learn-identity-series/web-sign-in',
  },
  {
    from: ['/videos/learn-identity/04-calling-an-api'],
    to: '/videos/learn-identity-series/calling-an-api',
  },
  {
    from: ['/videos/learn-identity/05-desktop-and-mobile-apps'],
    to: '/videos/learn-identity-series/desktop-and-mobile-apps',
  },
  {
    from: ['/videos/learn-identity/06-single-page-apps'],
    to: '/videos/learn-identity-series/single-page-apps',
  },
  {
    from: ['/videos/get-started'],
    to: '/videos/get-started-series',
  },
  {
    from: ['/videos/get-started/01-architecture-your-tenant'],
    to: '/videos/get-started-series/architect-your-tenant',
  },
  {
    from: ['/videos/get-started/02-provision-user-stores'],
    to: '/videos/get-started-series/provision-user-stores',
  },
  {
    from: ['/videos/get-started/03-provision-import-users'],
    to: '/videos/get-started-series/provision-import-users',
  },
  {
    from: ['/videos/get-started/04_01-authenticate-how-it-works'],
    to: '/videos/get-started-series/authenticate-how-it-works',
  },
  {
    from: ['/videos/get-started/04_02-authenticate-spa-example', '/videos/get-started/04_01-authenticate-spa-example'],
    to: '/videos/get-started-series/authenticate-spa-example',
  },
  {
    from: ['/videos/get-started/05_01-authorize-id-tokens-access-control'],
    to: '/videos/get-started-series/authorize-id-tokens-and-access-control',
  },
  {
    from: ['/videos/get-started/05_02-authorize-get-validate-id-tokens'],
    to: '/videos/get-started-series/authorize-get-and-validate-id-tokens',
  },
  {
    from: ['/videos/get-started/06-user-profiles'],
    to: '/videos/get-started-series/learn-user-profiles',
  },
  {
    from: ['/videos/get-started/07_01-brand-how-it-works'],
    to: '/videos/get-started-series/brand-how-it-works',
  },
  {
    from: ['/videos/get-started/07_02-brand-signup-login-pages'],
    to: '/videos/get-started-series/brand-signup-and-login-pages',
  },
  {
    from: ['/videos/get-started/08-brand-emails-error-pages'],
    to: '/videos/get-started-series/brand-emails-and-error-pages',
  },
  {
    from: ['/videos/get-started/10-logout'],
    to: '/videos/get-started-series/learn-logout',
  },
];

module.exports = redirects;
