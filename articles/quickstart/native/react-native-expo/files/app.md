---
name: App.js
language: javascript
---

```javascript
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

const Home = () => {
  const {authorize, clearSession, user, error} = useAuth0();

  const onLogin = async () => {
    try {
      await authorize({scope: 'openid profile email'}, {customScheme: 'auth0.com.auth0samples'});
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession({customScheme: 'auth0.com.auth0samples'});
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

const App = () => {
  return (
    <Auth0Provider domain={"${account.namespace}"} clientId={"${account.clientId}"}>
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