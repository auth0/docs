```swift
let device = UIDevice.currentDevice().identifierForVendor().UUIDString()
let userId = profile!.userId

let authentication = A0TouchIDAuthentication()
authentication.registerPublicKey = { (pubKey, completed, errored) in
    let registerBlock = {
        self.userClient.registerPublicKey(pubKey, 
            device: device, 
            user: userId, 
            success: { completed() },
            failure: { error in errored(error) })
    }
    self.userClient.removePublicKeyOfDevice(device,
        user:userId,
        success: { registerBlock() },
        failure: { _ in registerBlock() })
}

authentication.jwtPayload = {
    return [
             "iss": userId,
             "device": device,
            ]
}

authentication.authenticate = { (jwt, block) in
    let parameters = A0AuthParameters.newWithDictionary([      
       A0ScopeProfile: "openid name email nickname"
    ])

    client.loginWithIdToken(jwt, 
        deviceName: device,
        parameters: parameters,
        success: { (profile, token) in
            // User is authenticated with Auth0 & TouchID
        },
        failure: { error in block(error) })
}
authentication.onError = { error in 
    // Handle authentication error
}

self.authentication = authentication;
```
