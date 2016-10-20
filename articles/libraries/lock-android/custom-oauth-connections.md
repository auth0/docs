---
description: Lock for Android - Custom Oauth Connections
---

# Custom OAuth Connections

## Create the OAuth connection in the dashboard
First the user needs to create a new connection by using the `Custom Social Connections` [extension](https://manage.auth0.com/#/extensions), filling every required field before saving the changes.

The server will then send in the client info the connection inside the `oauth2` strategy.

```json
{
  "id": "Owu62gnGsRYhk1v9SfB3c6IUbIJcRIze",
  "tenant": "mytenant",
  "strategies": [
    {
      "name": "oauth2",
      "connections": [
        {
          "name": "slack",
          "scope": "identity.basic, identity.email, identity.avatar, identity.team"
        },
        //...
      ]
    }
  ],
  //...
}
```

## Customize the style in Lock
To customize OAuth connections you can call the builder passing both the `connectionName` and the `style` to use.

First create a custom style extending `Lock.Theme.AuthStyle` and define the logo, background color and name of the connection.

```xml
<style name="Style.Facebook" parent="Lock.Theme.AuthStyle">
    <item name="Auth0.BackgroundColor">@color/facebook_color</item>
    <item name="Auth0.Name">@string/facebook_name</item>
    <item name="Auth0.Logo">@drawable/facebook_logo</item>
</style>
```

Now in the builder's setup add the AuthStyle for the connection name that you want to override.

```java
builder.withAuthStyle("facebook", R.style.Style_Facebook)
        .build(...);
```

When *Lock* needs to display that connection in a SocialButton it will first search for user-overridden styles, and if none is found it will default to the Lock social defaults. This means that for "facebook" it will use facebook background color, facebook logo and "FACEBOOK" as name. 

As the builder method receives the `connectionName` you can now customize `oauth2` strategy type connections. The default values for this strategy are the same as in v1: Auth0 logo, Auth0 background color, and "OAUTH2" as name.
