---
description: Describes how to create an enrollment ticket from api
---

## Custom Enrollment 

In addition to [directly sending emails to enroll users](/multifactor-authentication/administrator/guardian-enrollment-email), it is also possible to directly managing users' enrollment by creating 'enrollment tickets' via the API found [here](/api/management/v2#!/Guardian/post_ticket). 

This API will return an 'enrollment ticket' containing a `ticket_id` and a `ticket_url`, which can be used to enroll a user.

The `ticket_url` can be delivered to the user -- for instance, via email -- and used to kick off the enrollment process.

Alternatively, the `ticket_id` can be leveraged inside the Guardian [Hosted Page](${manage_url}/#/guardian_mfa_page) to customize the Guardian widget's appearance: 

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

## Further reading

* [Sending Guardian Enrollment Emails](/multifactor-authentication/administrator/guardian-enrollment-email)
