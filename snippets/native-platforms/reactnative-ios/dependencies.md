```ruby
source 'https://github.com/CocoaPods/Specs.git'
pod 'React', :subspecs => [
  'Core', 
  'RCTImage', 
  'RCTNetwork', 
  'RCTText', 
  'RCTWebSocket'
  ], :path => '../node_modules/react-native'
pod 'LockReactNative', :path => '../node_modules/react-native-lock-ios'
```
