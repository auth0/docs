//
//  MyApplication.m
//  LockTest
//
//  Created by Sebastian Cancinos on 6/6/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

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