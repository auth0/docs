---
title: Generate and Analyze HAR Files
description: Learn how to troubleshoot with HAR files and steps to generate a HAR file.
topics:
  - troubleshoot
  - har-files
  - http-archive
contentType: how-to
useCase: troubleshoot
---

# Generate and Analyze HAR Files

A [HAR](https://en.wikipedia.org/wiki/.har) (HTTP Archive) file shows the sequence of redirects that happen during a login transaction. It's an excellent tool for debugging authentication issues, as it can identify where things get stuck. A HAR file is a JSON formatted log of a web browser's interactions with a web server. If authentication isn't working as expected, you can generate and analyze HAR files to find issues. Including a HAR file in your [support requests](${env.DOMAIN_URL_SUPPORT}) can help speed up the troubleshooting process.

::: warning
Before sending the HAR file to Auth0, ensure that you remove or obfuscate any sensitive information (such as passwords and client secrets) using a text editor. 
:::

## Generate HAR files with browsers

### Google Chrome

1. Close all __incognito__ windows in Google Chrome.
2. Open a __new incognito__ window in Google Chrome.
3. Go to **View > Developer > Developers Tools**.
4. In the Developer Tools pane, choose the **Network** tab. 
5. Check the __Preserve Log__ checkbox to record all interactions.
6. Visit the page and complete the steps that trigger the issue.
7. Choose the __Network__ tab.
8. Click the down arrow to export the HAR file.
9. Save the HAR file. 

### Safari

1. Ensure that **Show Develop menu in menu bar** checkbox is checked under **Safari > Preferences > Advanced**.
2. Choose **File > Open New Private Window**.
3. Visit the web page where the issue occurs. 
4. Choose **Develop > Show Web Inspector**. The Web Inspector window appears.
5. Complete the steps on the page that trigger the issue.
6. Select the **Network** tab.
7. Click **Export** on the upper right side of the pane. 
8. Save the HAR file. 

### Firefox

1. Close all __private__ windows in Firefox.
2. Open a __new private__ window in Firefox.
3. Go to __Tools > Developer > Network__ or **ctrl-shift-E**.
4. Visit the page and complete the steps that trigger the issue.
5. Choose the __Network__ tab and right click and then select **Save All As Har**.
6. Save the HAR file.


### Internet Explorer

1. Close all __InPrivate__ windows in Internet Explorer.
2. Open a __new InPrivate__ window in Internet Explorer (**ctrl-shift-P**.)
3. Go to __Tools > F12 Developer Options > Network__.
4. Ensure **Clear entries on navigate** is switched off.
5. Visit the page and complete the steps that trigger the issue.
6. Choose the __Network__ tab and select **Export as HAR (Ctrl+S)**.
7. Save the HAR file.

## Analyze HAR files

1. To view the HAR file, use a tool such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/). 
2. Analyze the list of web requests captured in the HAR file. In particular, check the sequence of redirects to see how far you get in the authentication process. This helps identify where the issue is happening. 
3. Compare the sequence of redirects to the expected sequence for your authentication flow.

    For example:

    * There should be a call to the `/authorize` endpoint to start the authentication flow.
    * There may be redirects to remote identity providers to prompt the user to log in.
    * Then there should be a redirect back to Auth0 `/login/callback` (`https://login.auth0.com/login/callback`).
    * Then there should be a redirect back to your application’s callback URL.

<%= include('../_includes/_log_events_link') %>
