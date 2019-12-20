---
title: Verify Connections
description: Learn how to verify connection transactions and external service dependencies to troubleshoot issues. 
topics:
  - connections
contentType: how-to
useCase: troubleshooting
---

# Verify Connections

An authentication transaction often has several parts. Auth0 provides methods so you can try individual parts of the transaction to help you find the possible source of the problem.

Most identity provider connections have a **TRY** button to see if the connection is working. If that fails, you can debug the connection without involving the rest of the application. If the connection works, then you can start debugging the application.

1. Use the **TRY** button on a connection to test just the connection.  
2. If the test with the **TRY** button fails, you know it is not an issue with your application but rather something with the connection configuration or the connection provider.
3. Check the response from the test with the **TRY** button to see if the response contains a useful error message or other information.
4. Try logging into the same service through a different path.
5. If the same issue occurs you’ll know it’s some sort of issue with the account
6. If a test with the **TRY** button fails for a custom DB connection, it is frequently caused by an issue in the custom DB scripts. Putting console.log statements into them and viewing output in the Console Log can help debug them.

## Verify external service dependencies

1. If your authentication uses external services, like social identity providers, and it suddenly stops working, [check external services status](/monitoring/guides/check-external-services).
2. If a connection is not working, even with the **TRY** button, check the connection.

<%= include('../_includes/_log_events_link') %>

## Keep reading

* [Verify Platform](/troubleshoot/guides/verify-platform)
* [Verify Domain](/troubleshoot/guides/verify-domain)
* [Verify Rules](/troubleshoot/verify/rules)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check Supporting Services Status](/monitoring/guides/test-testall-endpoints)
* [Monitor Applications](/monitoring/guides/monitor-applications)
* [Monitor Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)