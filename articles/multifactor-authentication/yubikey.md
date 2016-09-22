# Multifactor Authentication with YubiKey-NEO

This tutorial shows how to implement Multifactor Authentication with [YubiKey-NEO](https://www.yubico.com/products/yubikey-hardware/yubikey-neo/).

Enabling this functionality relies on three core features available in Auth0:

* [Rules](/rules)
* The [redirect protocol](/protocols#redirect-protocol-in-rules)
* [Auth0 Webtask](https://webtask.io)

**Rules** are used to evaluate a condition that will trigger the multifactor challenge. The **redirect protocol** is used to direct the user to a website that will perform the 2nd authentication factor with YubiKey. **Webtask** hosts that website.

## Configure the Webtask

Auth0 Webtask allows you to run arbitrary code on the Auth0 sandbox. It is the same underlying technology used for *rules* and *custom db connections*.

This sample uses a single Webtask to handle 3 states:

* **Render** the UI with the `otpForm` function.
* **Capture** the YubiKey-NEO code and validate it with the Yubico API.
* **Return** the result to Auth0. If validation succeeds, the result is returned to Auth0 to continue the login transaction.

Save this code locally in a file named `yubico-mfa-wt.js`. The full source code is also available [here](https://github.com/auth0/rules/blob/master/redirect-rules/yubico-mfa.md).

::: panel-info
The styling of the HTML form below was omitted for brevity.
Please check the [full source code for a styled example](https://github.com/auth0/rules/blob/master/redirect-rules/yubico-mfa.md)
:::

```JS
var request = require('request');
var qs = require('qs');
var jwt = require('jsonwebtoken');

return function (context, req, res) {

    require('async').series([
    /*
     * We only care about POST and GET
     */
        function(callback) {
            if (req.method !== 'POST' && req.method !== 'GET') {
                res.writeHead(404);
                return res.end('Page not found');
            }
            return callback();
        },

    /*
     * 1. GET: Render initial View with OTP.
     */
        function(callback) {
            console.log('get callback is ', callback);
            if (req.method === 'GET') {
                renderOtpView();
            }
            return callback();
        },

    /*
     * 2. Validate OTP
     */
        function(callback) {
            if (req.method === 'POST') {
                yubico_validate(context.data.yubikey_clientid, context.data.otp, function(err,resp) {
                    if (err) {
                        return callback(err);
                    }

                    if(resp.status==='OK'){
          //Return result to Auth0 (includes OTP and Status. Only when OK)
                        var token = jwt.sign({
                            status: resp.status,
                            otp: resp.otp
                        },
                new Buffer(context.data.yubikey_secret, 'base64'),
                            {
                                subject: context.data.user,
                                expiresIn: 60,
                                audience: context.data.yubikey_clientid,
                                issuer: 'urn:auth0:yubikey:mfa'
                            });
                        res.writeHead(301, {Location: context.data.returnUrl + "?id_token=" + token + "&state=" + context.data.state});
                        res.end();
                        callback();
                    } else {
                        return callback([resp.status]);
                    }
                });

      //return callback();
            }
        },
    ], function(err) {
        if (Array.isArray(err)) {
            return renderOtpView(err);
        }

        if (typeof err === 'string') {
            return renderOtpView([err]);
        }

        if (err !== null && typeof err === 'object') {
            var errors = [];
            errors.push(err.message || err);
            return renderOtpView(errors);
        }
    });

    function yubico_validate(clientId, otp, done){
        var params = {
            id: clientId,
            otp: otp,
            nonce: uid(16)
        };

        request.get('http://api.yubico.com/wsapi/2.0/verify',
            {
                qs: params
            },function(e,r,b){
                if (e) { return done(e); }
                if (r.statusCode !== 200) { return done(new Error('Error: ' + r.statusCode)); }
                var yubico_response = qs.parse(b.replace(/\r\n/g, '&'));
                if (yubico_response.nonce !== params.nonce) {
                  return done(new Error('Invalid response - nonce doesn\'t match'));
                }
                done(null,yubico_response);
            });
    }

    function uid(len) {
        var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function renderOtpView(errors) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(require('ejs').render(otpForm.toString().match(/[^]*\/\*([^]*)\*\/\s*\}$/)[1], {
            user: context.data.user,
            errors: errors || []
        }));
    }

    function otpForm() {
    /*
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <title>Auth0 - Yubikey MFA</title>
        <style>

        <!--

        All styling of this HTML form is omitted for brevity. Please see the full source code here: https://github.com/auth0/rules/blob/master/redirect-rules/yubico-mfa.md
        -->

        </style>
      </head>
      <body>
        <div class="modal-wrapper">
          <div class="modal-centrix">
            <div class="modal">
              <form onsubmit="showSpinner();" action="" method="POST" enctype="application/x-www-form-urlencoded">
                <div class="head"><img src="https://cdn.auth0.com/styleguide/2.0.9/lib/logos/img/badge.png" class="logo auth0"><span class="first-line">Yubikey 2FA</span></div>
                <div class="errors ${"<%- (errors.length === 0 ? 'hidden' : '') %>"}">
                  ${"<% errors.forEach(function(error){ %>"}
                  <div class="p">${"<%= error %>"}</div>
                  ${"<%"}})${"%>"}
                </div>
                <div class="body"><span class="description">Hi <strong>${'<%- user || "" %>'}</strong>, please tap your Yubikey.</span><span class="description domain"><span>Yubikey OTP:</span>
                    <input type="text" autocomplete="off" name="otp" required autofocus id="otp"></span></div>
                <div id="ok-button" class="ok-cancel">
                  <button class="ok full-width">
                    <div class="icon icon-budicon-509"></div>
                    <div class="spinner"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <script>
            function showSpinner() {
              document.getElementById('ok-button').className += " auth0-spinner";
            }
          </script>
        </div>
      </body>
    </html>
    */
  }
}
```

**NOTE:** The redirect to Auth0 contains two querystring parameters: `id_token` and `state`. `id_token` is a convenient and secure way of transferring information back to Auth0. `state` is mandatory to protect against CSRF attacks.

**NOTE:** No keys are hard-coded into the Webtask code. They are referred to by the variables `context.data.yubico_clientid` and `context.data.yubico_secret`. These parameters are securely embedded in the Webtask token when the Webtask is created.

### 1. Initialize Webtask CLI

*Rules* code is automatically packaged as Webtasks by Auth0. Since this is a custom Webtask, it must be created with the Webtask CLI.

Follow the instructions for installing Webtask CLI under [Account Settings > Webtasks](${manage_url}/#/account/webtasks) on the Auth0 dashboard.

Once the Webtask CLI is installed, run:

```txt
wt create --name yubikey-mfa --secret yubikey_secret={YOUR YUBIKEY SECRET} --secret yubikey_clientid={YOUR YUBIKEY CLIENT ID} --secret returnUrl=https://${account.namespace}/continue --profile {WEBTASK PROFILE} yubico-mfa-wt.js
```

**NOTE:** Replace `WEBTASK PROFILE` in the code above with the value of the -p parameter shown at the end of the code in Step 2 of the [Account Settings > Webtasks](${manage_url}/#/account/webtasks) page.

The `create` command will generate a URL that will look like:

```txt
https://sandbox.it.auth0.com/api/run/${account.tenant}/yubikey-mfa?webtask_no_cache=1
```

Keep a copy of this URL.

## Configure the Rule

This sample uses a single rule that handles both the initial redirect to the Webtask, and the returned result.

 * The `context.redirect` statement instructs Auth0 to redirect the user to the Webtask URL instead of calling back to the app.

 * Returning is indicated by the `protocol` property of the `context` object.

```JS
function (user, context, callback) {
  var jwt = require('jsonwebtoken@5.7.0');
  var yubikey_secret = configuration.YUBIKEY_SECRET;

  //Returning from OTP validation
  if(context.protocol === 'redirect-callback') {
    var decoded = jwt.verify(
      context.request.query.id_token,
      new Buffer(yubikey_secret,'base64')
    );
    if (!decoded) { return callback(new Error('Invalid OTP')); }
    if (decoded.status !== 'OK') { return callback(new Error('Invalid OTP Status')); }

    return callback(null,user,context);
  }

  //Trigger MFA
  context.redirect = {
        url: config.WEBTASK_URL + "?user=" + user.name
  }

  callback(null,user,context);
}
```

**NOTE:** The returning section of the rule validates the JWT issued by the Webtask. This prevents the result of the MFA part of the transaction from being tampered with because the payload is digitally signed with a shared secret.

Every time the user logs in they will be redirected to the Webtask and will see something like:

![](/media/articles/mfa/yubico-mfa.png)


### Rule customizations
You can add logic to the rule to decide under which  conditions the challenge will be triggered based on:

* The IP address or location of the user
* The application the user is logging into
* The type of authentication used (e.g. AD, LDAP, social, etc.)

## Additional Information:

* [Rules](/rules)
* [Multi-factor in Auth0](/multifactor-authentication)
* [Auth0 Webtask](https://webtask.io/)
