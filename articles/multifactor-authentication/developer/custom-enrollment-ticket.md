---
description: Describes how to create an enrollment ticket from API
topics:
  - mfa
  - step-up-authentication
  - api
  - custom-enrollment
  - tickets
contentType:
  - how-to
  - concept
useCase:
  - customize-mfa
---
# Custom Enrollment

It is also possible to manage users' enrollments by creating _enrollment tickets_ via the [post_ticket API](/api/management/v2#!/Guardian/post_ticket).

This API will return an _enrollment ticket_ containing a `ticket_id` and a `ticket_url`, which can be used to enroll a user.

The `ticket_url` can be delivered to the user (for instance, via email) and used to kick off the enrollment process.

Alternatively, the ticket can be leveraged inside the [MFA Page](${manage_url}/#/guardian_mfa_page) to customize the Auth0 MFA widget's appearance:

```html
<!DOCTYPE html>
<html>
<head>
  <title>2nd Factor Authentication</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">

    html, body { padding: 0; margin: 0; }

    .table {
      display: table;
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #2b2b33;
    }

    .cell {
      display: table-cell;
      vertical-align: middle;
    }

    .content {
      padding: 25px 0px 25px 0px;
      margin-left: auto;
      margin-right: auto;
      width: 280px; /* login widget width */
    }

    .message {
      text-align: center;
      color: #fff;
      margin-bottom: 14px;
      font-size: 18px;
      font-weight: 500;
      font-family: "Avenir Next", Avenir, "Helvetica Neue", Hevetica, sans-serif;;
    }

  </style>
</head>

<body>

  <div class="table">
    <div class="cell">
      <h4 class="message">Welcome! {{ userData.email }} enroll your device</h4>
      <div class="content">

        <!-- WIDGET -->
        <div class="js-mfa-container mfa-container" id="container"></div>
      </div>
    </div>
  </div>

  <script src="//cdn.auth0.com/js/mfa-widget/mfa-widget-1.2.1.min.js"></script>

  <script>
    (function() {
      return new Auth0MFAWidget({
        container: "container",

        requesterErrors: [
          {% for error in errors %}
            { message: "{{ error.message }}" }
          {% endfor %}
        ],

        mfaServerUrl: "{{ mfaServerUrl }}",
        {% if ticket %}
        ticket: "{{ ticket }}",
        {% else %}
        requestToken: "{{ requestToken }}",
        {% endif %}
        postActionURL: "{{ postActionURL }}",

        userData: {
          userId: "{{ userData.userId }}",
          email: "{{ userData.email }}",
          friendlyUserId: "{{ userData.friendlyUserId }}",
          tenant: "{{ userData.tenant }}",
        },
        globalTrackingId: "{{ globalTrackingId }}"

      });
    })();
  </script>
</body>
</html>
```

This custom page displays the Auth0 MFA widget in both enrollment and standard <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> login scenarios. You can use the ticket variable to check which scenario is in use and control the content accordingly.

For example, the following code displays a different message depending on whether the user is enrolling or authenticating:

```html
{% if ticket %}
<h4 class="message">Welcome, {{ userData.email }}, enroll your device below</h4>
{% else %}
<h4 class="message">Welcome back, {{ userData.email }}, authenticate below</h4>
{% endif %}
````

Note that this conditional logic around the existence of the `ticket` variable is also used in the initialization of the `Auth0MFAWidget` above.
