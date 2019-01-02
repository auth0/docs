---
title: Anomaly Detection Restrictions and Limitations
description: Restrictions and limitations of Auth0 anomaly detection.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: reference
useCase: customize-anomaly-detection
v2: true
---
# Anomaly Detection Restrictions and Limitations

Both brute-force protection and breached password detection depend on the IP address of the user. Because of this, the following use cases are *not* supported:

* **Using the [Resource Owner](/api/authentication#resource-owner) from the backend of the application.** Using this call does not get the IP address of the user. See point 2 below as an alternative.

* **Using [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application.** Using this call does not get the IP address of the user, however, you can [configure your application and send the IP address of the user as part of the request](/api-auth/tutorials/using-resource-owner-password-from-server-side) to make brute-force protection work correctly.

* **Authenticating many users from the same IP address.** For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

## Keep reading

* Understand [how Auth0 detects anomalies](/anomaly-detection).
* Learn how to [set anomaly detection preferences](/anomaly-detection/guides/set-anomaly-detection-preferences) in the Dashboard.
