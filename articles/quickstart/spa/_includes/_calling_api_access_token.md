<!-- markdownlint-disable MD041 -->

To give the authenticated user access to secured resources in your API, include the user's Access Token in the requests you send to your API. One common way to do this is to send `access_token` in the `Authorization` header using the `Bearer` scheme. This is the method used in the examples below.