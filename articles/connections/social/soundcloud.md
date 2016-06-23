---
connection: SoundCloud
index: 5
image: /media/connections/soundcloud.png
seo_alias: soundcloud
---

# Obtaining a Client ID and Client Secret for SoundCloud

To configure SoundCloud OAuth2 connections you will need to register Auth0 with SoundCloud on their [developer portal](http://developers.soundcloud.com/).

## 1. Log in into the developer portal
Go to the [developer portal](http://developers.soundcloud.com/), and login with your SoundCloud credentials. Select __Your Apps__ and click on __Register a new app__:

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-1.png)

---

## 2. Complete information about your instance of Auth0

Create a new application and complete the form. Use this URL as your callback:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-2.png)

Enter your new `Client ID` and `Client Secret` into the connection settings in Auth0.
