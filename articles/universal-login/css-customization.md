---
description: Use the CSS Customization Tool to modify the UI of New Universal Login Experience prompts 
topics:
  - universal-login
toc: true
beta: true
---
# CSS Customization for Universal Login Prompts

The Auth0 CSS Customization Tool is a sandbox tool that was created to help you customize the CSS for your New Universal Login Experience prompts. Here, you will be able to easily edit the CSS as well as the template, and then login and upload changes to your Auth0 account when ready. On the left side is a live preview of the prompt you are working on and you will be able to visualize on hover which components match with each class as a tooltip will appear on the preview. It is currently in beta.

The default configuration will be used for every tenant that has no UI customization set previously. However, if you customize the UI for a particular application, it will no longer fall back to the "all applications" configuration.

::: warning
This tool is in beta, and is not ready for production use at this time!
:::

The customization of some of the CSS for Universal Login prompts, paired with the ability to modify the [page templates](/universal-login/page-templates), should allow for very flexible and reliable customization. The prompts were created with progressive enhancement in mind, so the prompts themselves do not require Javascript to be enabled and are very lightweight. 

## Supported Properties

The following is a list of CSS properties that can be used to safely customize Universal Login prompts. None of these properties, when used normally, impact the flow and interaction between components.

.background family (i.e. .background, .background-color .background-image)
.border family (i.e. .border, .border-radius)
.box-shadow
.color
.font-size
.font-family

## Prompt Layout Structure

All prompts have a standard set of layers that may be useful for the purposes of CSS customization. Note that it is a best practice to create customization classes, namespaced with `_`.

(image)

### .ulp-outer

Color: Red (solid)

Outer layer and root of all prompt content, allowing a full-screen standalone multi-platform experience. 

Used as background and prompt centering device.

### .ulp-box

Color: Blue (solid)

The boundary of the prompt box, sets the width to keep consistency.

Additionally, it is used to allow content outside the prompt, such as the Auth0 Badge.

### .ulp-box-inner

Color: Green (dashed)

Prompt content root and boundary of inner content. This is where all screens start to differ.

Also used to properly position footer and main content. Prevents anything from "leaking" out of the prompt by adding overflow:hidden.

### .ulp-main

Color: Yellow (dashed)

Most screens have a .ulp-main container which has all the prompt content other than the footer contained within it. 

Further in than the .ulp-main container, there are then primarily just the different compositions of components that make up that individual prompt.

## CSS Selectors

The following list is a fairly exhaustive one that is provided primarily for reference. The comments allow for the explanation of a few nuances in the layout of the prompts. In general, however, you should refer to the above list of supported properties to customize.

::: note
States like `:hover`, `:focus`, and so on, can be used as normally expected. Some of them are already used and can be overridden.
:::

```css
/*
---
  Layout
---
*/

html,
body {
  /*
    To use an image, you can upload it to a CDN, Auth0 does not host images for this use case yet.
  */
  background: url('path/to/your/image.format');

  /* Note:
    In case of an image background (image or gradient), make sure to choose a plain color that blends nicely with the image or gradient you're using, since it will bleed in elastic-scrolling platforms like any laptop with a trackpad or touch enabled devices (tablets and mobile phones).
    On some platforms (mostly not iOS) this bleeding-on-over-scroll effect is prevented by setting the overflow of <html> to "hidden".
  */
}

/* Background of the page for standalone full page login experience */
._page-background {
}

/* Outermost container for the whole prompt */
._prompt-box {
}

/* Content other than the footer and header */
._prompt-body {
}

._prompt-footer {
}

/*
---
  Containers
---
*/

._event-screen-container {
}
._event-image-container {
}
._event-container {
}
._fieldset-container {
}
._password-security-field-container {
}
._social-providers-container {
}
._store-buttons-container {
}

/*
---
  Inputs, checkboxes, other form controls
---
*/

._checkbox-code-input {
}
._input-container {
}
._input-container-code {
}
._input {
}
._input::placeholder {
}
._input._input-error {
}
._input._input-error:focus {
}
._input-username {
}
._input-password {
}
._input-code {
}
._input-email {
}
._input-password-reset {
}
._input-re-enter-password {
}
._input-organizationName {
}
._form-mfa-phone-challenge {
}
._form-mfa-phone-enrollment {
}
._form-mfa-push-welcome {
}
._form-mfa-recovery-code-enrollment {
}
._form-mfa-sms-enrollment {
}
._form-redeem-ticket {
}
._form-reset-password-request {
}
._form-signup {
}
._mfa-otp {
}
._checkbox-mfa-recovery-code-enrollment {
}

._option-mfa-phone {
}

/*
  There is an edge case with password inputs, where to accomodate some extensions' functionality,
the input needs to be offset.
  The input in this case, doesn't take the whole space, but has extra padding on the right, so any custom elements embedded
by extensions don't overlap with the "show/hide" password functionality.
  In order for it to look the same regardless, the border and other stylistic components are moved from "_input" to "_input-container".
  It can be targeted as described below.
*/
._input-container._password {
}

/*
  Note: Two classes are used to account for specificity
*/
._input._input-simple {
}
._input._input-simple:disabled {
}

._input._input-error:focus,
._input:focus,
._authenticator-selector:focus,
._authenticator-selector:focus-within {
  outline: 0; /* Overrides the user-agent outline */
}

._label {
}

._checkbox-container {
  /* Outer container of checkbox set (containing label and the input) */
}
._checkbox-label {
  /* Targets the text of the label */
}
._checkbox {
  /* The actual checkbox */
}

/*
---
  Buttons, links and lists
---
*/

._button {
}
._button:hover {
  box-shadow: inset 0 0 0 150px rgba(47, 70, 100, 0.08); /* You need to change this or remove it, since it will affect the background, this is the case for most if not all buttons */
}

/* Transparent background button with border */
._button-simple {
}
._button-default {
}
._button-success {
}
._button-error {
}
._button-radio {
}
._button-square {
}

._social-button {
}
._social-button-icon {
}
._social-button-provider-name {
}

._social-button-dropbox {
}
._social-button-google {
}
._social-button-twitter {
}
._social-button-apple {
}
._social-button-dwolla {
}
._social-button-daccount {
}
._social-button-github {
}
._social-button-box {
}
._social-button-amazon {
}
._social-button-aol {
}
._social-button-bitbucket {
}
._social-button-exact {
}
._social-button-baidu {
}
._social-button-ebay {
}
._social-button-evernote {
}
._social-button-googleplay {
}
._social-button-fitbit {
}
._social-button-instagram {
}
._social-button-vkontakte {
}
._social-button-line {
}
._social-button-linkedin {
}
._social-button-facebook {
}
._social-button-windowslive {
}
._social-button-miicard {
}
._social-button-paypal {
}
._social-button-thirtysevensignals {
}
._social-button-yammer {
}
._social-button-yandex {
}
._social-button-yahoo {
}
._social-button-renren {
}
._social-button-planningcenter {
}
._social-button-salesforce {
}
._social-button-shopify {
}
._social-button-soundcloud {
}
._social-button-thecity {
}
._social-button-wordpress {
}
._social-button-ad {
}
._social-button-adfs {
}
._social-button-office365 {
}
._social-button-sharepoint {
}
._social-button-waad {
}
._social-button-pingfederate {
}
._social-button-container-ip {
}
._social-button-ip {
}
._social-button-google-apps {
}
._social-button-samlp {
}
._social-button-auth0-oidc {
}
._social-button-line {
}
._button-device-code-activation {
}
._button-device-code-confirm {
}
._button-device-code-cancel {
}
._button-login {
}
._button-mfa-phone-challenge-continue {
}
._button-mfa-enrollment {
}
._mfa-phone-button-bar {
}
._phone-message-type-container {
}
._button-mfa-phone {
}
._button-mfa-enrollment-continue {
}
._button-mfa-push-challenge {
}
._button-mfa-push-enrollment {
}
._push-notification-accepted {
}
._button-mfa-push-success {
}
._button-apple-store {
}
._button-play-store {
}
._button-mfa-push-welcome {
}
._button-mfa-recovery-code-enrollment {
}
._button-mfa-sms-enrollment {
}
._button-pick-country-code {
}
._button-redeem-ticket {
}
._button-reset-password {
}
._button-reset-password-request {
}
._button-signup {
}
._button-decline {
}
._button-accept {
}
._consent-logos {
}

/* Re-send button is used in the Push login flow */
._mfa-push-resend-button {
}

/* Square button used to link to the correct app for push notification MFA */
._button-appstore {
}

/* Specifically the button used to copy a given code */
._copy-code-button {
}

/* Selector List and it's elements
  Note: This refers to all lists, including the country selector, device selector, phone number selector, etc. So make sure any changes work nicely for all of them.
*/
._selector-list {
}
._selector-item-wrapper {
}
._selector-item {
}
._selector-item-text {
}
._selector-item-icon {
}
._selector-item-arrow {
}

/* 
  Selector Button is the Button that lets you to change the country code (used only for SMS enrollment)
*/
._selector-button {
}

/* Note: The "._only-one-authenticator" class refers to a case where the user has only one way of authenticating to this application,
  and therefore the markup is simplified since there's no need to display an arrow to select any other authenticator (phone or device). In the case of SMS and Email, an alternate "Edit" buttons is shown to allow editing of that phone number or email. */
._authenticator-selector,
._authenticator-selector._only-one-authenticator {
}

._link {
}
._link-alert-dropdown {
}
._link-forgot-password {
}
._link-footer {
}
._link-resend-sms {
}
._link-resend-email {
}
._link-apple-store {
}
._link-play-store {
}
._link-pick-authenticator {
}
._link-pick-authenticators {
}
._link-pick-device {
}
._link-back-action {
}
._link-device-action {
}
._link-show-qr-code {
}
._link-pick-phone {
}
._link-phone-action {
}
._link-link-select {
}
._link-pick-email {
}
._link-recovery-code {
}
._link-push-notification {
}
._link-otp {
}
._link-sms {
}
._link-email {
}
._link-duo {
}
._link-apple-store {
}

/* Back Button is only used in the HeaderIntegrated */
._back-button {
}

/*
---
  Headers, Texts
---
*/

._prompt-header {
}
._header-title {
}

/* Header integrated refers to a smaller header used for selector screens that has just a title and a button to go back  */
._header-integrated-title {
}

._header-description {
  /* Extra content of the header (usually description or some sort of copy text). May or may not exist depending on the prompt */
}

/*
---
  Consent Screen
---
*/

._consent-scope-list-wrapper {
}
._consent-scope-list {
}
._consent-welcome-text {
}
._consent-scope-item {
}
._consent-scope-item-text {
}
._consent-logos {
}

/*
---
  Consent Screen
---
*/

._event-screen {
  /* Generic selector for Event screens (success message, error message, etc.) */
}
._event-text {
  /* Specifically main text in Event Screens */
}
._event-title {
  /* Specifically the title in Event Screens */
}

/*
---
  Other Components
---
*/

._captcha-container {
}
._captcha {
}

/* Alerts are global errors like server issues or timeouts, more specific problems would be noted using a PopOver */
._alert {
}
._alert-text {
}

/* Some alerts can be configured to be removed after a certain period */
._timed-alert {
}

/*
  Note: Two classes are used to account for one case of this element (error, danger, warning, etc.)
*/
._alert._danger {
}

._popover {
}
._popover._error,
._popover._info {
  background: #e55e3f;
}

/* Note: Make sure to match the small arrow in color by changing this border color  */
._popover._error::before,
._popover._error::after {
  border-bottom-color: #e55e3f;
}

/* This separator is used to separate Social from Database options for Login and Signup */
._vertical-separator {
}
/* Pseudo-elements are used to make the bars */
._vertical-separator::before,
._vertical-separator::after {
  border-color: #c2c8d0;
}

._qr-code {
  /* QR container */
}
._qr-code-image {
  /* QR image */
}

/* Can be changed by changing the border color */
._spinner {
}

._text {
  /* All loose texts */
}
```

> ## Media Queries and responsive design

```css
/*
  There's only one breakpoint in use: 480px for mobile devices.
*/

._page-background {
  background: url('path/to/your/image.format');
}

@media screen and (max-width: 480) {
  ._prompt-box {
    background: transparent;
  }
  ._page-background {
    /* Note:
      Not shown on mobile unless:
      - the prompt has transparent background.
      - "boxed-mobile" class is applied (not Generally Available for the moment).
    */
    background-image: url('path/to/your/image-for-mobile.format');
  }
}
```

> ## Screen selectors

```css
/*
  Every screen has a top level class (in ".ulp-outer") applied with its name.
*/
.consent {
}
.device-code-activation {
}
.device-code-activation-allowed {
}
.device-code-activation-denied {
}
.device-code-confirmation {
}
.email-verification-result {
}
.login {
}
.mfa-country-codes {
}
.mfa-email-challenge {
}
.mfa-email-list {
}
.mfa-enroll-result {
}
.mfa-login-options {
}
.mfa-otp-challenge {
}
.mfa-otp-enrollment-code {
}
.mfa-otp-enrollment-qr {
}
.mfa-push-list {
}
.mfa-push-success {
}
.mfa-push-welcome {
}
.mfa-recovery-code-challenge {
}
.mfa-recovery-code-enrollment {
}
.mfa-sms-challenge {
}
.mfa-sms-enrollment {
}
.mfa-sms-list {
}
.redeem-ticket {
}
.reset-password {
}
.reset-password-email {
}
.reset-password-error {
}
.reset-password-request {
}
.reset-password-success {
}
.signup {
}
.status {
}
```
