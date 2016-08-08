//
//  MyApplication.h
//  LockTest
//
//  Created by Sebastian Cancinos on 6/2/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

#import <Foundation/Foundation.h>

@class A0Lock;

@interface MyApplication : NSObject
@property (readonly, nonatomic) A0Lock *lock;
+ (MyApplication *)sharedInstance;

@end