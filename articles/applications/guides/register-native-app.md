---
description: Learn to register and configure native/mobile applications using the Auth0 Dashboard.
toc: true
topics:
  - applications
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register a Native/Mobile Application

To integrate Auth0 with mobile, desktop, or hybrid apps that run natively on deviced (e.g., Android, iOS, Windows, macOS), you must first register your app as a Native/Mobile App.

<%= include('./_configure', { application_type: 'Native', application_type_create: 'Native' }) %>

## Settings

For a Native/Mobile App, you must do the following:

- For **Application Type**, choose Native/Mobile Apps

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications). 

### Advanced Settings

If you're developing a mobile application, you can provide the necessary iOS/Android parameters in the Advanced Settings area:

- For iOS apps, provide your Team ID and App Bundle Identifier

- For Android apps, provide your App Package Name and your Key Hashes

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications-advanced). 

