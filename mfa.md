# Multi-factor Authentication in Auth0

> This feature is in __beta__. Please [contact us](mailto://support@auth0.com) if you have any questions or if you'd like integration with a specific system not listed here.

Auth0 ships with built-in support for popular, multi-factor authentication systems. We currently have these two systems enabled:

* [Google Authenticator](http://en.wikipedia.org/wiki/Google_Authenticator)
* [Duo Security](https://www.duosecurity.com/)

Multi-factor authentication is enabled through [Rules](rules). This gives you full control of what conditions trigger the process. Common conditions are: the destination application, the type of authentication used, the time of the day, the location, etc.

Once the user logged in using a second factor you will get back an extra property specifying that a second factor was used and which one.

```
"multifactor": [
  "google-authenticator"
]
```


## Google Authenticator 

```
function (user, context, callback) {
  
  if( conditionIsMet() ){ 
    context.multifactor = {
        provider: 'google-authenticator'
      };
  }

  callback(null, user, context);
}
```

## Duo Security

```
function (user, context, callback) {
  
  if( conditionIsMet() ){ 
    context.multifactor = {
        provider: 'duo',
        ikey: '{your Duo integration key}',
        skey: '{your Duo secret key}',
        host: '{your endpoint}.duosecurity.com'
      };
  }

  callback(null, user, context);
}
```

##Simple demo

This demo illustrates an app in which __Duo Security__ has been enabled. 

1. User logs in with Windows Live.
2. User is challenged with an additional authentication factor (in this example the enrollment process has been completed).
3. User accesses the app.


![](img/duo.gif)
