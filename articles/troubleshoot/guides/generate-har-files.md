---
title: Generate HTTP Archive (HAR) Files
description: Learn how to troubleshoot with HAR files and steps to generate a HAR file.
topics:
  - troubleshoot
  - har-files
  - http-archive
contentType: how-to
useCase: troubleshoot
---

# Generate HTTP Archive (HAR) Files

An [HTTP Archive (HAR)](https://en.wikipedia.org/wiki/.har) file shows the sequence of redirects that happen during a login transaction. It's an excellent tool for debugging authentication issues, as it can identify where things get stuck. A HAR file is a JSON formatted log of a web browser's interactions with a web server. If authentication isn't working as expected, you can generate and analyze HAR files to find issues. Including a HAR file in your [support requests](${env.DOMAIN_URL_SUPPORT}) can help speed up the troubleshooting process.

::: warning
HAR files may contain sensitive data such as cookies, passwords, or client secrets. Obfuscate any sensitive data (using a text editor) before sending HAR files to support.
:::

## Generate HAR files with browsers

### Firefox

1. Close all __private__ windows in Firefox.
1. Open a __new private__ window in Firefox.
2. Go to __Tools > Web Developer > Network__
1. Visit the page and complete the steps that trigger the issue.
1. When complete, go back to the __Network__ tab, right click and then select **Save All As Har**.
1. Before sending the HAR file to us, make sure to obfuscate any sensitive information using a text editor (such as removing passwords, client secrets, and so on).

### Google Chrome

1. Close all __incognito__ windows in Google Chrome.
1. Open a __new incognito__ window in Google Chrome.
1. Go to __Developers Tools > Network__.
1. Check the __Preserve Log__ option to record all interactions.
1. Visit the page and complete the steps that trigger the issue.
1. When complete, go back to the __Network__ tab, right click and then select **Save as HAR with Content**: ![Google Dev Tools](/media/articles/tutorials/save-as-har-with-content.png)
1. Before sending the HAR file to us, make sure to obfuscate any sensitive information using a text editor (such as removing passwords, client secrets, and so on).

### Safari

1. Close all __private__ windows in Safari.
1. Open a __new private__ window in Safari.
1. Go to __Developer > Inspector > Network__
1. Check the __Preserve Log__ option to record all interactions.
1. Visit the page and complete the steps that trigger the issue.
1. When complete, go back to the __Network__ tab, click __Export__ and save the HAR file.
1. Before sending the HAR file to us, make sure to obfuscate any sensitive information using a text editor (such as removing passwords, client secrets, and so on).

## Analyze HAR files

To view the HAR file, you can use a tool such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/). Analyze the list of web requests captured in the HAR file. In particular, check the sequence of redirects to see how far you get in the authentication process. This helps identify where the issue is happening. Compare the sequence of redirects to the expected sequence for your authentication flow.

For example:

* There should be a call to the `/authorize` endpoint to start the authentication flow.
* There may be redirects to remote identity providers to prompt the user to log in.
* Then there should be a redirect back to Auth0 `/login/callback` (`https://login.auth0.com/login/callback`).
* Then there should be a redirect back to your application’s callback URL.

## Keep reading

* 