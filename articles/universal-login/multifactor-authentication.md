---
description: Guide on how to customize the MFA page
topics:
  - mfa
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# Multi-factor Authentication with Classic Universal Login

::: note
For information about MFA with New Universal Login Experience, visit the [MFA docs](/multifactor-authentication#mfa-with-new-universal-login).
:::

You can enable [Multi-factor authentication](/multifactor-authentication) from the [Dashboard > Multifactor Auth](${manage_url}/#/mfa) section.

![Universal Login MFA Page](/media/articles/multifactor-authentication/mfa-dashboard-1.png)

## Customizing the MFA Pages

You can customize the MFA pages using the Universal Login's [basic customization features](universal-login#simple-customization). 

If you need further customizations, you can provide your own HTML for the MFA page. Note that this will use the Auth0 MFA Widget, which has the following limitations:
- It does not support MFA with Email.
- If users enrolled more than one factor, they cannot select which one to use, the MFA widget will ask them to login with the most secure factor.
- It does not use Universal Login's [internationalization](/universal-login/i18n) features

## Customizing the HTML for the MFA page

To customize the MFA page, go to [Dashboard > Universal Login > Guardian Multi-factor](${manage_url}/#/guardian_mfa_page) and enable the __Customize Guardian Page__ switch.

Once you do that, you'll be able to use the text editor built into the Auth0 Dashboard to change your HTML, style your page using CSS, and alter the JavaScript used to retrieve custom variables. Once you've made your changes, and make sure to click __Save__.

If you'd like to revert to an earlier design, you have two options:

* Reverting to the last saved template by clicking **Reset to Last**;
* Reverting to the default template provided by Auth0 by clicking **Reset to Default**.

Please note that MFA page works without customization (Auth0 will also update the included scripts as required). However, once you toggle the customization to **on**, you are responsible for the updating and maintaining the script (including changing version numbers, such as that for the MFA widget), since Auth0 can no longer update it automatically.

## Configuration Options

### defaultLocation

```js
return new Auth0MFAWidget({

...

  defaultLocation : ['United Kingdom', 'GB', '+44'],
  
...

})
```

### languageDictionary

The `languageDictionary` can be used to override the text for many areas of the MFA process on Universal Login Classic Experience. You do this with the following format:

```
languageDictionary:
  optionsCategory:
    option: value
```

Here is an example, modifying the `headerText` attribute in `smsEnrollmentConfirm`:

```js
return new Auth0MFAWidget({

...

  languageDictionary:{ // Use the Language Dictionary option
    smsEnrollmentConfirm:{  // Indicate which category/section you are modifying
      headerText: "Some custom text - In order to confirm enrollment we need to confirm your phone. Please enter the received code." // Provide the new value for the specific attribute you wish to modify
    }
  }

...

})
```

See below for a list of available categories and options.

#### languageDictionary options

```js
defaults: {
  iddleHelpUrl: '#',
  rememberBrowserCheckbox: 'Remember this browser',
  title: 'Login to {tenantName}'
},

downloadApp: {
  headerText: 'Download Auth0 Guardian for free:',
  pushEnrollmentAction: 'I\'ve already downloaded it',
  smsAndTotpEnrollmentActions: 'I\'d rather use <sms>SMS</sms> or <ga>Google Authenticator</ga>',
  pushAndTotpEnrollmentActions: 'I\'d rather use <push>Guardian</push> or <ga>Google Authenticator</ga>',
  pushAndSmsEnrollmentActions: 'I\'d rather use <push>Guardian</push> or <sms>SMS</sms>',
  totpEnrollmentActions: 'I\'d rather use <ga>Google Authenticator</ga>',
  smsEnrollmentActions: 'I\'d rather use <sms>SMS</sms>',
  pushEnrollmentActions: 'I\'d rather use <push>Guardian</push>',
  iosLabel: 'App Store',
  iosUrl: 'https://itunes.apple.com/us/app/auth0-guardian/id1093447833?ls=1&mt=8',
  iosImg: '<svg width="27px" height="33px" viewBox="37 22 27 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="auth0-mfa-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(37.000000, 22.000000)"><path d="M22.0964148,17.5965957 C22.0594667,13.4821277 25.4586963,11.4804255 25.6141333,11.387234 C23.6890074,8.57489362 20.7051259,8.1906383 19.656563,8.16 C17.1504593,7.89574468 14.7195259,9.66255319 13.4429037,9.66255319 C12.1408,9.66255319 10.1749037,8.18553191 8.05611852,8.22893617 C5.3296,8.27106383 2.7789037,9.85276596 1.37997037,12.3089362 C-1.50708148,17.3170213 0.646103704,24.6765957 3.41211852,28.7246809 C4.79576296,30.707234 6.41256296,32.9208511 8.5288,32.8429787 C10.5991704,32.7574468 11.3725333,31.5204255 13.8709926,31.5204255 C16.3465185,31.5204255 17.0727407,32.8429787 19.2310222,32.7931915 C21.4530074,32.7574468 22.8519407,30.8017021 24.1871704,28.8012766 C25.7861333,26.5289362 26.4282667,24.2910638 26.4537481,24.1761702 C26.4015111,24.1582979 22.1384593,22.5280851 22.0964148,17.5965957 L22.0964148,17.5965957 Z" fill="#FFFFFF"></path><path d="M18.0193778,5.49702128 C19.1329185,4.10170213 19.8948148,2.20340426 19.6833185,0.277021277 C18.0716148,0.348510638 16.0560296,1.39404255 14.8953481,2.7587234 C13.8684444,3.9612766 12.9511111,5.93234043 13.1880889,7.78595745 C14.9985481,7.9212766 16.8574222,6.8706383 18.0193778,5.49702128 L18.0193778,5.49702128 Z" fill="#FFFFFF"></path></g></svg>',
  androidLabel: 'Google Play',
  androidUrl: 'https://play.google.com/store/apps/details?id=com.auth0.guardian',
  androidImg: '<svg width="30px" height="34px" viewBox="35 22 30 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="auth0-mfa-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(35.000000, 22.000000)"><polygon fill="#ffffff" points="0.0311829399 32.9244984 0.0311829399 1.02956758 16.5681333 17.6173695"></polygon><polygon fill="#ffffff" points="0.60957618 0.0196753921 17.3854403 16.8471259 22.6948251 11.782715"></polygon><polygon fill="#ffffff" transform="translate(11.025248, 26.014581) scale(1, -1) translate(-11.025248, -26.014581)" points="0.60957618 18.1008562 17.3854403 33.9283067 21.4409189 29.8631472"></polygon><path d="M18.3964257,17.493946 L23.8211074,12.6992188 L28.7813766,15.7894686 C29.3871829,16.1668862 29.4042508,16.7930368 28.8086222,17.1953618 L22.3003286,21.5914726 L18.3964257,17.493946 Z" fill="#ffffff"></path></g></svg>'
},

pushAuth: {
  pushSent: {
    useTotpFallback: 'If you haven\'t received the notification,<br></br>just <manualInput>enter the code</manualInput> manually.'
  },

  pushTimeout: {
    resendAction: 'Resend push notification',
    timeoutText: 'Didn\'t receive the push notification?',
    useRecoveryCode: 'Lost your device? <recovery>Use the recovery code</recovery>',
    useTotpFallback: '<manualInput>Enter the code manually</manualInput>'
  }
},

totpAuth: {
  codePlaceholder: 'Enter the 6-digit code',
  headerText: 'Get a verification code from the Google Authenticator (or similar) app:',
  useRecoveryCode: 'Lost your device? <recovery>Use the recovery code</recovery>'
},

smsAuth: {
  codePlaceholder: 'Enter the 6-digit code',
  headerText: 'Enter the 6-digit code we\'ve just sent to your phone.',
  useRecoveryCode: 'Lost your device? <recovery>Use the recovery code</recovery>'
},

guardianTotpAuth: {
  codePlaceholder: 'Enter the 6-digit code',
  headerText: 'Get a verification code from the Auth0 Guardian app.'
},

recoveryCodeAuth: {
  codePlaceholder: 'Enter your code here',
  headerText: 'We will generate a new recovery code<br />once you\'ve logged in:'
},

pushEnrollment: {
  headerText: 'Scan this code with Auth0 Guardian:'
},

enrollmentCongrats: {
  congrats: 'Congratulations, you are all set.<br />In the future when logging in you\'ll want your device handy.',
  continueButtonText: 'Continue'
},

reportRecoveryCode: {
  headerText: 'In the event that you need to login without your device you\'ll need a recovery code. Take a note and keep this somewhere safe:',
  confirmationLabel: 'I have safely recorded this code'
},

generalError: {
  errorsRecoveryHelp: {
    default: 'Looks like something went wrong.<br />Please try logging in again from the application.',

    globalTransactionExpired: 'The login was not successful.<br />Please try again.',

    // Auth0 Server Errors
    guardianInvalidNonce: 'Please try logging in again from the application.',
    guardianInvalidToken: 'Please try logging in again from the application.',
    invalidLoginTokenStatus: 'Please try logging in again from the application.',
    loginTokenInvalidSignature: 'Please try logging in again from the application.',
    loginTokenTransactionExpired: 'Please try logging in again from the application.'
  }
},

smsEnrollmentConfirm: {
  codePlaceholder: 'Enter the 6-digit code',
  headerText: 'In order to confirm enrollment we need to confirm your phone. Please enter the received code.'
},

totpEnrollment: {
  codePlaceholder: 'Enter your passcode here',
  headerText: 'Scan this QR code with Google Authenticator (or similar) app:'
},

totpEnrollmentCode: {
  codePlaceholder: 'Enter your passcode here',
  headerText: 'Manually enter the following code into your preferred authenticator app and then enter the provided one-time code below.',
  copyCodeButton: 'Copy code'
},

smsEnrollmentAddPhoneNumber: {
  headerText: 'Please enter your phone<br />in order to enroll.',
  phoneNumberLabel: 'A code will be sent to this number:',
  phoneNumberPlaceholder: 'Your phone number'
  // countryCodes: { 'US': 'Translation of United States', ... '<country code>': '<translation>' }
},

authCongrats: {
  congrats: 'We have verified your identity. Redirecting...',
  congratsNoRedirect: 'We have verified your identity.',
  continueButtonText: 'Continue'
},

errorMessages: {
  alreadyEnrolled: 'You are already enrolled, cannot enroll again',
  authMethodDisabled: 'The specified authentication method is disabled',
  connectionError: 'Looks like we cannot contact our server. Please check your internet connection and retry.',
  default: 'Looks like something went wrong. Please retry.',
  defaultRequest: 'Looks like we found a problem contacting our server. Please retry.',
  enrollmentConflict: 'Seems that you have already enrolled. Try logging in again from the application.',
  enrollmentMethodDisabled: 'The specified enrollment method is disabled',
  enrollmentNotFound: 'We couldn\'t find your enrollment. You\'ve probably started enrollment from another device. Finish it there or try logging in again from the application.',
  enrollmentTransactionNotFound: 'The mfa enrollment transaction is not active or has expired. Please try again.',
  errorSendingPushNotification: 'We found an error sending your notification. Please try again.',
  errorSendingPushNotificationManualFallback: 'We could not send the push. Please enter the code manually.',
  errorSendingSms: 'We found an error sending your code. Please try again in a few seconds.',
  errorSendingSmsManualFallback: 'We could not send the sms. Please try the recovery code.',
  featureDisabled: 'This module is currently disabled.',
  featureDisabledByAdmin: 'This module was disabled by the admin.',
  fieldRequired: 'Please fill out required field.',
  globalTransactionExpired: 'Your login attempt has timed out.',
  guardianInvalidNonce: 'There was a problem authenticating your request origin. Have you started too many parallel logins?',
  guardianInvalidToken: 'There was a problem validating authentication request format.',
  insufficientScope: 'Seems that you are not authorized to perform this action.',
  invalidBearerFormat: 'Seems that you are not authorized to perform this action.',
  invalidLoginTokenStatus: 'Unexpected state validating your request.',
  invalidOtp: 'Seems that your code is not valid, please check and retry.',
  invalidOtpFormat: 'OTP Code must have 6 numeric characters',
  invalidPhoneNumber: 'Seems that your phone number is not valid. Please check and retry.',
  invalidRecoveryCode: 'Seems that your recovery code is not valid. Please check and try again.',
  invalidRecoveryCodeFormat: 'Recovery code must have 24 alphanumeric characters',
  invalidToken: 'Seems that you are not authorized to perform this action.',
  loginRejected: 'Auth has been rejected. Try again.',
  loginTokenInvalidSignature: 'We cannot verify who seems to be the issuer for this request',
  loginTokenTransactionExpired: 'Your authentication request is expired. Is your connection slow?',
  loginTransactionNotFound: 'Seems that your device has taken too long to login. Please try again.',
  noMethodAvailable: 'There is currently no authentication method available.',
  noPublicKeyAvailable: 'We cannot verify your identity. Contact tenant admin.',
  pnEndpointDisabled: 'Seems that we cannot deliver messages to your cell phone. Please try again.',
  pushNotificationNotConfigured: 'Seems that enrollment was not finished. Please try logging in again from the application.',
  pushNotificationWrongCredentials: 'Seems that your device credentials are outdated. Please re-enroll your device or wait for them to be updated.',
  smsNotConfigured: 'You cannot use this module because you\'ve enrolled with a different one.',
  socketError: 'We cannot connect to real time channel.',
  // tenant_not_found | The tenant associated cannot be found. Should not normally hapen at least that you delete the tenant
  tooManyPn: 'You have exceeded the amount of push notifications per minute. Please wait and try again.',
  tooManyPnPerTenant: 'There are too many push requests right now. Wait a few minutes and try again.',
  tooManySms: 'You have exceeded the amount of SMSs per hour. Wait a few minutes and try again.',
  tooManySmsPerTenant: 'There are too many SMSs right now.  Wait a few minutes and try again.'
  // | transaction_expired | The transaction has already expired |
},

successMessages: {
  auth: 'We have successfully verified your identity. Redirecting...',
  pushSent: 'We\'ve sent a push to: {enrollmentName}',
  smsSent: 'We\'ve sent an sms to: {phoneNumber}'
},

infoMessages: {
  iddle: 'Can we help you?<br></br><iddleHelp>Click here to learn more</iddleHelp>'
}
```

## Theming Options

There are a few theming options for the MFA Widget, namespaced under the `theme` property.

### icon

The value for `icon` is the URL for an image that will be used in the MFA Widget header, which defaults to the Auth0 logo. It has a recommended max height of `58px` for a better user experience.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png'
  },
  
...

})
```

### primaryColor

The `primaryColor` property defines the primary color of the MFA Widget. This option is useful when providing a custom `icon`, to ensure all colors go well together with the `icon`'s color palette. Defaults to `#ea5323`.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png',
    primaryColor: 'blue'
  },
  
...  
  
})
```

## Rendering "Invited Enrollments" vs. Standard Scenarios

There are two different possible scenarios in which the page is rendered. If a user has been directed to this page specifically for enrollment (for instance, from an email with an enrollment link) then the property **ticket** will be available. Otherwise, the property **requestToken** will be available.

## HTML + Liquid syntax

The hosted page uses [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax for templating.
The following parameters are available to assist in rendering your page:

* `userData.email` 
* `userData.friendlyUserId`
* `userData.tenant`
* `userData.tenantFriendlyName`
* `iconUrl`

Most of the parameters that are used in the MFA Widget need to be passed to Guardian as shown in the default template provided in the customization area.
If you need a higher level of customization you could use [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example).
