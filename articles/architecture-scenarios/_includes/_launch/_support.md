## Review Auth0 Policies

When starting to prepare for your launch, be sure to read through [Auth0 Policies](/policies) and prepare your production operations accordingly for any required lead times or responsibilities on your part, according to the policies. 

## Review your Support plan, SLAs, Severity definitions and Support center documentation

You should review the specifics of the [support plan](/support#support-center) you’ve purchased and the [Service Level Agreements](/support#defect-responses) associated with it, to ensure it is adequate for your needs. If you haven’t already done so, explore the [support center](https://support.auth0.com/) and familiarize yourself with support features such as viewing suggested solutions to common issues and [filing tickets](/support/tickets) and viewing your quota usage. It will be helpful to review the [severity level definitions](/support#defect-resolution-procedures) for support tickets so that you file tickets with the correct severity. One important note is that it is not possible today in the Support Center to increase the severity of a support ticket. If you file a ticket for a medium-grade issue which later becomes a high severity issue, you should file a new urgent, high severity ticket that explains anything new that triggers the urgency and references the original ticket for details.

You should also ensure your development and support teams are familiar with the [Auth0 community forum](https://community.auth0.com/), discussed further below. Customers can often find answers there right away to common issues, avoiding the need to file a ticket, so it should be your first stop for technical questions.

## Review the Auth0 community forum

The [Auth0 community forum](https://community.auth0.com/) contains a wealth of information. If you have a question, chances are someone else has already asked the question on the forum. Answers are contributed by both Auth0 staff and the larger community of Auth0 users. 

Important notices are posted to the community forum to help you stay abreast of important news. Be sure to check out the “Community” and “FAQ” categories. The Community category contains pro-active posts on product announcements, roadmap information, How-To videos as well as important information about any upcoming feature deprecations. 

It’s a good idea to check out the Auth0 Community on a regular basis, not just when you have questions. While you are there, if you see a question you’ve already solved, please contribute your wisdom to help others!

## Gather Auth0 troubleshooting information needed for support tickets

We recommend your support team become familiar with our [troubleshooting guides](/troubleshoot) specific to identity protocols and Auth0. This includes the questions to research and information to collect before posting a question on the Auth0 forum or filing a support ticket. Authentication transactions often span multiple systems so there are some specialized troubleshooting techniques that are helpful to learn.

## Have troubleshooting tools ready

Your team will doubtless have already done some troubleshooting during the development of your application, but we recommend making sure your support team is also familiar with any tools below relevant to your project. If you need to file a ticket, the Auth0 support team may ask for a HAR (HTTP Archive) file to help analyze the issue so it’s helpful for your support staff to be familiar with how to do this.

### Capture HAR file

A [HAR file](/troubleshoot/guides/generate-har-files) captures a sequence of browser interactions and is a commonly used tool when debugging authentication issues. The process of authenticating a user often involves redirecting the user’s browser from an application to Auth0, and possibly to another remote Identity Provider, depending on the type of connection used.  You can capture the redirection and the responses and analyze it to find clues about the cause of an issue.

### Analyze HAR file 

Analyze the [HAR file](/troubleshoot/guides/generate-har-files#analyze-har-files) to obtain valuable troubleshooting information. It shows the sequence of browser redirects involved in an authentication transaction, along with the parameters used. The HAR file also shows if the authentication process stopped mid-stream and if so where, which helps to pinpoint the location of the issue. The HAR file contains tokens returned to the application front-end, and these can be pasted into appropriate viewers to see if they contain the expected contents.

### View JWT

The [jwt.io](https://jwt.io) tool was written by Auth0 and allows you to view the contents of a JWT-formatted token. Applications that delegate authentication to Auth0 via OIDC will receive an ID Token from Auth0. Depending on your type of application, the ID Token may be captured in a HAR file. The ID Token is in JWT format and can be pasted into jwt.io to view the contents of the ID Token.

### View SAML request/response

There are many SAML decoders available. The [samltool.io](https://samltool.io) decoder was written by Auth0 and allows you to view the contents of a SAML Request or Response. Applications that delegate authentication to Auth0 via SAML or use a SAML type of connection in Auth0 will use SAML Requests and Responses. These SAML Requests and Responses may be captured in a HAR file. The requests and responses can be pasted into samltool.io or other SAML decoders to view the contents of the SAML Request or Response.

## Review Auth0 support matrix

One potential cause of issues is using out of date versions of SDKs or libraries. We strongly recommend your team check your software stack, browsers, SDKs and libraries against the [Auth0 support matrix](/support/matrix) to ensure you are running on up-to-date, supported versions. In the event of an issue, the Auth0 support team may ask you to upgrade to a supported version. To avoid slowing down progress on issue resolution, be sure you are on up-to-date versions.

## Use Auth0 feedback portal

Auth0 welcomes feedback and ideas from Auth0 customers. If you have a suggestion for our product team, you can submit product feedback directly on the [Product Feedback portal](https://auth0.com/feedback). The [product feedback blog post](https://auth0.com/blog/improve-auth0-new-feedback-page/) explains the feedback process.

## Prepare real-time webtask log extension 

For debugging and supporting custom code in Auth0, including Rules, Hooks, Custom DB Scripts, and Custom OAuth Connections, knowledge of the [Realtime Webtask Log](/extensions/realtime-webtask-logs) is essential. This enables you to view output from your custom code, including output from console.log statements. 

::: panel Best Practice 
We recommend installing the real-time webtask log extension and getting familiar with using it to view log output from your custom code as a debugging and support tool. 
:::

## Troubleshooting

You should prepare to [troubleshoot issues](/troubleshoot/basics) both during your development as well as after your application or API goes live.  Make sure your development and support teams are prepared with knowledge of troubleshooting tools, and the list of common issues to check when troubleshooting an issue.
