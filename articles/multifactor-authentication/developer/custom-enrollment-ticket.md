---
description: Describes how to create an enrollment ticket from api
---

## Create an enrollment ticket

If you don't want that auth0 sent an email containing the link to enroll device new device for a particular user, you could use the following API [Create an enrollment ticket](/api/management/v2#!/Guardian/post_ticket).

To use this api, it is necessary to know the `user_id` for the user that is about to be enrolled, to do this you may use [List or search users](/api/management/v2#!/Users/#Get_users).

The response of this api will contain two properties, `ticket_id` and` ticket_url`. If you want, you can mail the content of `ticket_url` this link will start the enrollment process for `user_id`.

On the other hand, it is possible to use `ticket_id` to initialize from your backend app using our client library [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js).

If you only want only to *enroll users*, using tickets copy the following example in [Hosted Pages](${manage_url}/#/guardian_mfa_page):

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
        ticket: "{{ ticket }}",

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

Previous example will only allow you to setup new devices using enrollment tickets, change the following snippet if you want to use MFA capabilities:

```html
        ticket: "{{ ticket }}",
```

to:

```html
        {% if ticket %}
        ticket: "{{ ticket }}",
        {% else %}
        requestToken: "{{ requestToken }}",
        {% endif %}
        postActionURL: "{{ postActionURL }}",
```

Or also you could use the *RESET TO DEFAULT* in [Hosted Pages](${manage_url}/#/guardian_mfa_page).

## Further reading

* [Restricting user-initiated enrollments](/multifactor-authentication/administrator/guardian-enrollment-email#restricting-user-initiated-enrollments)

