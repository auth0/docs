# Protect My API

So you’ve built a shiny new API and you want to share it with the world. On second thought, you don’t want to share it with the entire world, but right now, anyone can call it. Let’s fix this by protecting your endpoints with Auth0.

## What Auth0 can do for you?
Auth0 helps you authenticate your users and issue the appropriate Access Tokens. With Access Tokens in hand, your users can then call your API.

Auth0 also helps you:

- Perform step-up authentication for high-value transactions Ask for additional credentials from your users if necessary (e.g., multi-factor authentication)
Dynamically register, as needed, applications that can then call your API
Control access to your API by revoking permissions as needed
Manage all of your users in a single location

## Prerequisites
Before we begin, you will need to:

Know what scopes your API offers
Log in to the Auth0 Dashboard. If you don’t already have an Auth0 account, you should sign up for one now.

## To Do
Register your API with Auth0 using the Dashboard
Specify your API's scopes
Authorize any Machine-to-Machine applications that will call your API
Configure additional API settings

## Register your API with Auth0

Before you can use Auth0 to protect your API, you will need to register (configure) your API with Auth0 using the Dashboard. Below, we answer some questions that may arise as you register your API.

### Add your API in the Auth0 Dashboard
Before anyone can call your API, they will need to get an Access Token. Later, you will need to verify this Access Token to make sure that the sender of the token is who they say they are and to ensure that the message wasn't changed along the way. The information within this token can be verified and trusted because it is digitally signed. When you are adding your API, you will need to choose which signing algorithm to use for the tokens issued for your API.
