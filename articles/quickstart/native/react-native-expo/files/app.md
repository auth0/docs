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
r && <Text>{error.message}</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

const App = () => {
  return (
    <Auth0Provider domain={"{yourDomain}"} clientId={"{yourClientId}"}>
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default App;
```
