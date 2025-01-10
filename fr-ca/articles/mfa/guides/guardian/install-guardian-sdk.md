---
description: Learn how to install, use and configure options for the Guardian SDKs. 
topics:
  - mfa
  - guardian
  - ios
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Install Guardian SDK

The Guardian SDK provides a UI-less client for Guardian.

```text
npm install auth0-guardian-js
```

## Source files

* [Full Version](https://cdn.auth0.com/js/guardian-js/1.3.3/guardian-js.js)
* [Minified Version](https://cdn.auth0.com/js/guardian-js/1.3.3/guardian-js.min.js)

## Configure Guardian

```js
var auth0GuardianJS = require('auth0-guardian-js')({
	// For US tenants: https://{name}.guardian.auth0.com
 	// For AU tenants: https://{name}.au.guardian.auth0.com
 	// For EU tenants: https://{name}.eu.guardian.auth0.com
	serviceUrl: "https://{{ userData.tenant }}.guardian.auth0.com",
	requestToken: "{{ requestToken }}", // or ticket: "{{ ticket }}" - see below

	issuer: {
		// The issuer name to show in OTP Generator apps
		label: "{{ userData.tenantFriendlyName }}",
		name: "{{ userData.tenant }}",
	},

	// The account label to show in OTP Generator apps
	accountLabel: "{{ userData.friendlyUserId }}",

	// Optional, for debugging purpose only,
	// ID that allows to associate a group of requests
	// together as belonging to the same "transaction" (in a wide sense)
	globalTrackingId: "{{ globalTrackingId }}"
});
```

Use of `requestToken` or `ticket` depends on the authentication method. Ticket corresponds to a previously generated [enrollment ticket](/mfa/guides/guardian/create-enrollment-ticket).

## Enroll devices

Enrolling devices consists of the following steps:

1. Start the transaction.
2. (optional) Chck if the user is already enrolled. You cannot enroll twice.
3. Send the information needed to enroll.
4. Confirm enrollment.
5. Show recovery code.

Some steps can be omitted depending on the method, we provide the same interface for all methods so you can write uniform code. Some of the methods end up completing the authentication, whereas some others need an extra authentication step. You can know that by listening to the `enrollment-complete` event. 

```js
function enroll(transaction, method) {
	if (transaction.isEnrolled()) {
		console.log('You are already enrolled');
		return;
	}

	var enrollData = {};

	if (method === 'sms') {
		enrollData.phoneNumber = prompt('Phone number'); // Collect phone number
	}

	return transaction.enroll(method, enrollData, function (err, otpEnrollment) {
		if (err) {
			console.error(err);
			return;
		}

		var uri = otpEnrollment.getUri();
		if (uri) {
			showQR(uri);
		}

		var confirmData = {};
		if (method === 'otp' || method === 'sms') {
			confirmData.otpCode = prompt('Otp code'); // Collect verification otp
		}

		otpEnrollment.confirm(confirmData);
	});
}

auth0GuardianJS.start(function(err, transaction) {
	if (err) {
		console.error(err);
		return;
	}

	transaction.on('error', function(error) {
		console.error(error);
	});

	transaction.on('timeout', function() {
		console.log('Timeout');
	});

	transaction.on('enrollment-complete', function(payload) {
		if (payload.recoveryCode) {
			alert('Recovery code is ' + payload.recoveryCode);
		}

		if (payload.authRequired) {
			showAuthenticationFor(transaction, payload.enrollment);
			return;
		}
	});

	transaction.on('auth-response', function(payload) {
		if (payload.recoveryCode) {
			alert('The new recovery code is ' + payload.recoveryCode);
		}

		if (!payload.accepted) {
			alert('Authentication has been rejected');
			return;
		}

		auth0GuardianJS.formPostHelper('{{ postActionURL }}', { signature: payload.signature });
	});

	var availableEnrollmentMethods = transaction.getAvailableEnrollmentMethods();

	method = prompt('What method do you want to use, select one of '
		+ availableEnrollmentMethods.join(', '));

	enroll(transaction, method) // For sms
});
```

## Authenticate

To authenticate with a method you need to execute the following steps:

1. Start the transaction.
2. (optional) Check if the user is already enrolled. You need to be enrolled to authenticate.
3. Request the auth (the push notification / sms). Request is a noop for OTP.
4. Verify the otp (`.verify` is a noop for push)

Some steps can be omitted depending on the method, we provide the same interface for all methods so you can write uniform code. After the factor is verified or the push accepted you will receive an `auth-response` event with the payload to send to the server, you can use the `auth0GuardianJS.formPostHelper('{{ postActionURL }}', payload)` to post back the message to the server.

You may also receive `auth-rejected` if the push notification was received.

```js
function authenticate(method) {
	auth0GuardianJS.start(function (err, transaction) {
		if (err) {
			console.error(err);
			return;
		}

		if (!transaction.isEnrolled()) {
			console.log('You are not enrolled');
			return;
		}

		transaction.on('error', function(error) {
			console.error(error);
		});

		transaction.on('timeout', function() {
			console.log('Timeout');
		});

		transaction.on('auth-response', function(payload) {
			if (payload.recoveryCode) {
				alert('The new recovery code is ' + payload.recoveryCode);
			}

			if (!payload.accepted) {
				alert('Authentication has been rejected');
				return;
			}

			auth0GuardianJS.formPostHelper('{{ postActionURL }}', { signature: payload.signature });
		});

		var enrollment = transaction.getEnrollments()[0];

		if (enrollment.getAvailableAuthenticatorTypes().length === 0) {
			alert('Somethings went wrong, seems that there is no authenticators');
			return;
		}

		transaction.requestAuth(enrollment, { method: method } function(err, auth) {
			if (err) {
				console.error(err);
				return;
			}

			var data = {};
			if (method === 'sms' || method === 'otp') {
				data.otpCode = prompt('Otp code');
			} else if (method === 'recovery-code') {
				data.recoveryCode = prompt('Recovery code');
			}

			return auth.verify(data);
		});
	});
}
```

## Keep reading

* [Full Guardian API](https://github.com/auth0/auth0-guardian.js#full-api)
* [Guarding SDK Error Code Reference](/mfa/references/guardian-error-code-reference)
