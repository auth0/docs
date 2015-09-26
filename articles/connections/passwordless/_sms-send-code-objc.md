```objc
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0APIClient *client = [lock apiClient];
[client startPasswordlessWithPhoneNumber:phoneNumber success:^{
    // SMS with code sent
} failure:^(NSError *error) {
    // Handle error
}];
```