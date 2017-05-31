---
  description: This doc covers the differences between a browser-based vs. native experience when implementing Auth0 on a mobile device.
---

# Browser-Based vs. Native Experience on Mobile Devices

When developing a native application, such as an app running on iOS or Android, you can choose between the following login flows:

* Native;
* Browser-based.

When using a **browser-based** login flow, iOS opens a SafariViewController, whereas Android opens up a Custom Chrome Tab. The user is redirected to the Auth0 login page, where they can either sign up or log in.

When using a **native** login flow, the user signs up or enters their credentials directly into the app.

## Choose Between Browser-Based and Native Login Flows

Here are some considerations to think about when deciding whether you want to implement a browser-based or native login flow.

* **SSO**: If you have a suite of mobile applications (such as Google Drive, Google Docs/Sheets, YouTube, and so on), you might want to automatically log the user into all of them if they log into any one app.

  If your suite uses a wholly native experience, your users have to enter their credentials for each of your apps. However, if you use a browser-based UX, you can implement SSO to reduce the number of times the user has to log in.
