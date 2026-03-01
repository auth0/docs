---
name: app.json
language: json
---

```json
{
  "expo": {
    "name": "00-Login-Expo",
    "slug": "00-Login-Expo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "plugins": [
      [
        "react-native-auth0",
        {
          "domain": "${account.namespace}",
        }
      ]
    ],
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "android": {
      "package": "com.auth0samples"
    },
    "ios": {
      "bundleIdentifier": "com.auth0samples"
    }
  }
}
```