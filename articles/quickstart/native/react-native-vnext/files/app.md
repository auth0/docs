---
name: app.js
language: javascript
---
```javascript
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('./auth0-configuration');
const auth0 = new Auth0(credentials);

const App = () => {

    let [accessToken, setAccessToken] = useState(null);

    const onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email'
            })
            .then(credentials => {
                Alert.alert('AccessToken: ' + credentials.accessToken);
                setAccessToken(credentials.accessToken);
            })
            .catch(error => console.log(error));
    };

    const onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert('Logged out!');
                setAccessToken(null);
            })
            .catch(error => {
                console.log('Log out cancelled');
            });
    };

    let loggedIn = accessToken !== null;
    return (
        <View>
            <Text> Auth0Sample - Login </Text>
            <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
            <Button onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Log Out' : 'Log In'} />
        </View >
    );
}

export default App;
```