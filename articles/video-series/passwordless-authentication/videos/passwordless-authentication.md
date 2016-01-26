---
name: "Setting up Passwordless Authentication using the Auth0 Dashboard"
description: "This screencast show users how to configure, from the Auth0 dashboard, many types of passwordless authentication, that can then be used with libraries like lock-passwordless"
timeInSeconds: 334
videoId: l8y4pxqehs
---
Hi, this is Kassandra with Auth0, and what we're going to do today is talk about passwordless authentication and show you how to configure that via the Auth0 Dashboard.

As for a demo, you can see in the video we have a login link that opens a window where the user enters their email and a one-time-use code is sent to that email address that can then be used to log in.

This is a screenshot of a sample email that is sent by Auth0, containing a code that allows the user to verify their identity. We can then take the code sent and use it in the login window in order to log in to our sample application.

We are then taken to a screen that shows a username and password, indicating that we have logged in without a password.

Auth0 allows people to log in with SMS one-time codes, Email via either one-time codes or magic links that log you in when clicked, and TouchID which is available for native iOS applications. Email and SMS are universally available, not just on iOS native.

So let's take a look at how to configure these services using the Auth0 Dashboard.

We'll start by implementing email. Click the toggle switch next to email, and if a list of your applications appears, click 'Continue' to reach the settings dialog. This settings screen contains many useful things, such as hover-over question marks for more explanation of given fields, and a link to the documentation for integrating a custom email provider if you'd rather not use Auth0 as an email provider. You can select your email template syntax-- either HTML + Liquid or Markdown. The ‘From’ and ‘Subject’ fields contain the variable application.name populated for you, which the template will replace with your application's name. The ‘From’ field also shows the email address that will be used as the sender for your emails.

The body already has a very nice template pre-populated for you-- but of course this is customizable and users should feel free to edit this template as they see fit.

Next, the ‘Authentication Parameters’ field-- you can use this with the Magic Link setting to add query parameters to your generated link. 

You can set Token Time to Live and length with ‘OTP Expiry’ field (configured in seconds) and the ‘OTP length’ field. You can also disable signups using passwordless authentication by toggling the 'Disable Signups' slider.

Once you have finished modifying your settings, click the ‘Save’ button and navigate to the 'Apps' tab using the link at the top of the window. You want to make sure that at least one app has this feature turned on in order for your users to be able to use it. Once you have turned on this feature for at least one of your apps using the toggle switches, hit the 'Save' button, then navigate to the 'Try' tab using the link at the top of the window.

Here, you can select your application, enter the email address of your test recipient, and select a mode-- code or link. Link will send a link which will log the user in when they click it. When you then hit the 'Try' button, you should receive your email containing your test code or link in a few seconds.

Next, we'll talk about how to configure SMS. To do this, click the toggle switch next to SMS in order to turn it on. Next, you'll want to add your Twilio SID and Twilio Auth Token into the fields provided in the settings window. There are links available to tutorials for how to get these keys-- for those reading the written version, [here is the Twilio SID tutorial](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid), and [here is the Twilio AuthToken tutorial](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). For those unfamiliar, Twilio is a service that allows users to programmatically send SMS messages and make phone calls. You can also learn more about SMS integrations [in our documentation](https://auth0.com/docs/connections/passwordless/sms). Finally, you'll want to include your Twilio number as your sending number in the 'From' field in the settings window.

You also have a template you can edit for your SMS messages. You can use [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax, or Markdown syntax. For those unfamiliar with Liquid syntax, there is a link in the settings window. You can change the Time to Live and length of your authentication codes just like with Email configuration, and you can also disable signups in this settings window.

After you're done configuring SMS, you'll want to navigate to the 'Apps' tab by clicking the link at the top of the window, and make sure this is turned on for one of your apps using the toggle switches.

Then, navigate to the 'Try' tab. You can enter a phone number here in order to test your new SMS configuration, and hit 'Try'. You should receive a test SMS message shortly.

Finally, let's talk about enable TouchID login from the dashboard. Click the toggle switch next to TouchID to turn it on, then click 'TouchID' to view the TouchID window. However, there aren't any settings for TouchID-- this is because all of the configuration for TouchID is done inside your native iOS application; you only need to turn it on in the dashboard. However, we do provide [a link to the Swift tutorial for enabling TouchID](https://auth0.com/docs/connections/passwordless/ios-touch-id-swift) right inside the window. 

So that's our tutorial for Passwordless Authentication. If you have any further questions, please feel free to [contact me](mailto:kassandra.perch@auth0.com) or [read even more in the Documentation](https://auth0.com/docs/connections/passwordless).
