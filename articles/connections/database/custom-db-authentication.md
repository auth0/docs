---
toc: true
title: Client Certificates Authentication
description: How to use client certificate authentication with a protected resource and an Auth0 Custom Database
---
# Client Certificates Authentication

In this tutorial, we'll show you how you can authenticate an Auth0 Custom Database user seeking access to a protected resource (such as your server or API) using client certificates.

You will need to:

1. Generate the Client Certificates
2. Configure Auth0
3. Configure the Protected Resource

::: note
You can find a full sample application, as well as the code files, in the [Auth0 Samples](https://github.com/auth0-samples/auth0-custom-database-client-certs) repository on GitHub.
:::

## Step 1: Generate the Client Certificates

You'll need to create a Root Certificate Authority (CA) certificate. This will then be used as the root certificate for both the client *and* the server certificates.

### Certificate Authority

First, you'll need to generate a key file using `openssl` in the command line. Keep this key private.

```text
openssl genrsa -out myCompanyRootCA.key 4096
```

Next, generate the Root Certificate Authority.

```text
openssl req -x509 -new -nodes -key myCompanyRootCA.key -sha256 -days 3650 -out myCompanyRootCA.pem
```

You'll be prompted to answer questions that are similar to the following:

```text
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

### Create the Server Certificate

Again, generate another key file:

```text
openssl genrsa -out servercertificate.key 2048
```

Next, generate the Certificate Signing Request. Here, the Common Name is the most important property and it should match your API domain exactly (for example, `api.example.com`).

```text
openssl req -new -key servercertificate.key -out servercertificate.crs
```

You'll be prompted to answer questions that are similar to the following:

```text
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []: api.example.com
Email Address []:
```

At this point, you'll need to generate the certificate itself:

```text
openssl x509 -req -in servercertificate.crs -CA myCompanyRootCA.pem -CAkey myCompanyRootCA.key -CAcreateserial -out servercertificate.crt -days 3650 -sha256
```

Be sure to chain the root CA public key into the server certificate so that the certificate contains the full chain:

```text
cat servercertificate.crt myCompanyRootCA.pem > servercertificate-chained.crt
```

### Create the Client Certificate

Begin by generating your key file:

```text
openssl genrsa -out clientcertificate.key 2048
```

Generate the Certificate Signing Request. Here, the field you should pay particular attention to is the **Common Name**, which is used by the server to validate the certificate.

```text
openssl req -new -key clientcertificate.key -out clientcertificate.crs
```

You'll be prompted to answer questions that are similar to the following:

```text
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

Finally, generate your certificate:

```text
openssl x509 -req -in clientcertificate.crs -CA myCompanyRootCA.pem -CAkey myCompanyRootCA.key -CAcreateserial -out clientcertificate.crt -days 3650 -sha256
```

## Step 2: Configure Auth0

Log in to the [Dashboard](${manage_url}), and go to **Connections** > **Database**. Click **Create DB Connection**.

![](/db-connection.png)

Provide a name for your connection, and click **Create** to proceed.

![](/create-db-connection.png)

Once Auth0 has created your new connection, switch over to the **Custom Database** tab. Enable the **Use my own database** setting by clicking on the toggle so that it turns green.

![](/custom-db.png)

By default, you'll be on the tab where you can edit the **Login** Database Action Script. Copy the following into the script's body:

```js
module.exports = function(email, password, callback) {
    var request = require('request');

    // The keys are stored in the configuration as Base64
    // to avoid issues with format and encoding
    var base64Key = new Buffer(configuration.BASE64_CLIENT_KEY, 'base64');
    var base64Cert = new Buffer(configuration.BASE64_CLIENT_CERT, 'base64');
    var base64CA = new Buffer(configuration.BASE64_CA, 'base64');

    var options = {
        url: configuration.API_ENDPOINT,
        key: base64Key.toString(),
        cert: base64Cert.toString(),
        ca: base64CA.toString(),
        json: {
            email: email,
            password: password
        },
        method: "POST"
    };

    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        } else {
          callback(error || new Error("Received status code " + response.statusCode));
        }
    });
}
```

Below the code editor window is a **Settings** section. Add the following **keys** and their corresponding **values** (it may be helpful to have your API and client settings handy for this):

* `API_ENDPOINT`
* `BASE64_CLIENT_KEY`
* `BASE64_CLIENT_CERT`
* `BASE64_CA`

These values will be accessible via the global `configuration` object (for example, you'd use `configuration.API_ENDPOINT` to access the API endpoint).

## Step 3: Configure the Protected Resource

In the [samples repository](https://github.com/auth0-samples/auth0-custom-database-client-certs), there is an `.env.sample` file. Rename this file to `.env`, and populate the configuration values with the proper values for your API/client. 

Please note that:

* `BASE64_SERVER_KEY`, `BASE64_SERVER_CERT`, and `BASE64_CA` are Base64-encoded to avoid issues caused by formatting
* The value of `ALLOWED_CLIENT_SUBJECT_NAME` should match the `Common Name` of the Client Certificate

::: panel Local Testing
If you're testing your implementation locally on a computer running macOS, add the following entry to the `etc/hosts` file:

`127.0.0.1      api.mycompany.com`

Be sure that you replace the `api.mycompany.com` placeholder with the Common Name you provided on the server certificate.
:::

## Run the Setup

To run and test your setup, use the following commands:

`cd server` (replace `server` with the location of your sample app)
`npm install`
`npm start`

### Local Testing

When testing locally, the commands used to run are slightly different:

`cd client`
`npm install`
`npm run login`

You can change the email/password located in `/client/login.js` to trigger the unauthorized code path.

## Summary

In this tutorial, we covered how you can authenticate an Auth0 Custom Database user seeking access to a protected resource (such as your server or API) using client certificates.