---
description: Describes how to configure Amazon SNS with Guardian Multifactor
---

## Configuring Amazon SNS 

In order to receive push notifications from Guardian, it's necessary to override Guardian's default SNS settings. To do this, use the following [Auth0 Management API](/api/management/v2) call.

```text
PUT https://${account.namespace}/api/v2/guardian/factors/push-notification/providers/sns

Content-Type: 'application/json'
Authorization: Bearer {API-TOKEN}

{
  "aws_access_key_id": "{YOUR-AWS-ACCESSKEY}",
  "aws_secret_access_key": "{YOUR-AWS-SECRET}",
  "aws_region": "{YOUR-AWS-REGION}",
  "sns_apns_platform_application_arn": "{YOUR-SNS-APNS-ARN}",
  "sns_gcm_platform_application_arn": "{YOUR-SNS-GCM-ARN}"
}
```

Substitute the appropriate values for your particular configuration. For instance, with Curl this could be accomplished with:

```curl
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {API-TOKEN}" \
  -d '{"aws_access_key_id":"{YOUR-AWS-ACCESSKEY}","aws_secret_access_key":"{YOUR-AWS-SECRET}","aws_region":"{YOUR-AWS-REGION}","sns_apns_platform_application_arn":"{YOUR-SNS-APNS-ARN}","sns_gcm_platform_application_arn":"{YOUR-SNS-GCM-ARN}"}' \
  https://${account.namespace}/api/v2/guardian/factors/push-notification/providers/sns
```

## Further reading

* [Auth0 Management API](/api/management/v2)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
* [Getting Started with Google Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-gcm.html)
