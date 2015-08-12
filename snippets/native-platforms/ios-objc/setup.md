```objc
@class A0Lock;
@interface MyApplication : NSObject
@property (readonly, nonatomic) A0Lock *lock;
+ (MyApplication *)sharedInstance;
@end
```

```objc
#import "MyApplication.h"
#import <Lock/Lock.h>

@implementation MyApplication
+ (MyApplication*)sharedInstance {
    static MyApplication *sharedApplication = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedApplication = [[self alloc] init];
    });
    return sharedApplication;
}

- (id)init {
    self = [super init];
    if (self) {
        _lock = [A0Lock newLock];
    }
    return self;
}
@end
```
