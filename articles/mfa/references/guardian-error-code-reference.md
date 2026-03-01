---
title: Guardian Error Code Reference
description: Lists Guardian error codes and descriptions.
topics:
    - guardian
contentType:
  - reference
useCase:
  - customize-mfa
---
# Guardian Error Code Reference

Use the error codes to display informative messages and to distinguish between recoverable and unrecoverable errors. 

| Error Code |	Description |
| -- | -- |
| `invalid_token`	| Invalid request or transaction token
| `insufficient_scope` | You don't have enought grants to perform the requested operation
| `invalid_bearer_format`	| The bearer put in authentication header was not valid
| `enrollment_conflict`	| There is another enrollment for the same user. You cannot enroll twice.
| `tenant_not_found`	| The tenant associated cannot be found. Should not normally happen at least that you delete the tenant
| `login_transaction_not_found`	| The mfa auth transaction is not active or has already expired
| `error_sending_push_notification`	| Push notification delivery failed
| `push_notification_wrong_credentials`	| Push notification delivery failed because of wrong credentials
| `invalid_otp`	| Provided otp code was not valid
| `invalid_recovery_code`	| Provided recovery code was not valid
| `invalid_body`	| Body validation failed. Bad request.
| `invalid_query_string`	| Query string validation failed. Bad request.
| `enrollment_transaction_not_found`	| The mfa enrollment transaction is not active or has expired
| `invalid_phone_number`	| The provided phone number is invalid
| `error_sending_sms`	| SMS Delivery error
| `feature_disabled`	| The requested feature is currently globally not available (contact the provider)
| `feature_disabled_by_admin`	| The requested feature is currently disabled by your admin
| `pn_endpoint_disabled`	| We were unable to deliver the push notification after retrying many times. Try removing you account for the device and adding it again.
| `too_many_sms`	| You have exeed the amount of SMSs assigned to your user
| `too_many_pn`	| You have exeed the amount of push notifications assigned to your user
| `too_many_sms_per_tenant`	| You have exeed the amount of SMSs assigned to your tenant
| `too_many_pn_per_tenant`	| You have exeed the amount of push notifications assigned to your tenant
| `field_required`	| A field is required to perform the operation (this errors has a field attribute with a code for the field: `otpCode`, `recoveryCode`)
| `method_not_found`	| You have requested a method that is currently not supported (should not happen)
| `no_method_available`	| There is currently no method to enroll (all of them are disabled)
| `enrollment_method_disabled`	| The specified enrollment method is disabled, this error has also a .method field
| `auth_method_disabled`	| The specified authentication method is disabled, this error has also a .method field
| `invalid_otp_format`	| OTP format validation error
| `invalid_recovery_code_format`	| Recovery code format validation error
| `transaction_expired`	| The transaction has already expired
| `already_enrolled`	| You are already enrolled, cannot enroll again
| `not_enrolled`	| You not enrolled. Must enroll first
| `invalid_enrollment`	| The enrollment provided to transaction#requestAuth method is not valid or is null/undefined
