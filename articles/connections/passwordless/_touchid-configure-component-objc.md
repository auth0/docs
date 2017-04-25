```objc
NSString *device = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
NSString *userId = profile.userId;

A0TouchIDAuthentication *authentication = [[A0TouchIDAuthentication alloc] init];
authentication.registerPublicKey = ^(NSData *pubKey, A0RegisterCompletionBlock completed, A0ErrorBlock errored) {
    void(^registerBlock)() = ^{
        [self.userClient registerPublicKey:pubKey device:device user:userId success:^{
            completed();
        } failure:^(NSError *error) {
            errored(error);
        }];
    };
    [self.userClient removePublicKeyOfDevice:device user:userId success:^{
        registerBlock();
    } failure:^(NSError *error) {
        registerBlock();
    }];
};

authentication.jwtPayload = ^{
    return @{
             @"iss": userId,
             @"device": device,
            };
};

authentication.authenticate = ^(NSString *jwt, A0ErrorBlock block) {
    A0AuthParameters *parameters = [A0AuthParameters newWithDictionary:@{      
       A0ParameterConnection: @"{NAME_OF_MY_DB_CONNECTION}",
       A0ScopeProfile: @"openid name email nickname"
    }];

    [client loginWithIdToken:jwt deviceName:deviceName parameters:parameters success:^(A0UserProfile *profile, A0Token *token) {
        // User is authenticated with Auth0 & Touch ID
    } failure:^(NSError *error){
        block(error);
    }];
};
authentication.onError = ^(NSError *error) {
    // Handle authentication error
};

self.authentication = authentication;
```
