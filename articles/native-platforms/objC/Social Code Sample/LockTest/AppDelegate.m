//
//  AppDelegate.m
//  LockTest
//
//  Created by Sebastian Cancinos on 5/31/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

#import "AppDelegate.h"
#import <Lock/Lock.h>
#import <Lock-Facebook/A0FacebookAuthenticator.h>
#import <Lock-Twitter/A0TwitterAuthenticator.h>

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    A0Lock *lock = [A0Lock sharedLock];
    [lock applicationLaunchedWithOptions:launchOptions];
    
    A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
    [lock registerAuthenticators:@[facebook]];

    NSString *twitterApiKey = @"oNgsATiexelDpvrTcVlfUg18p"; //Remember to obfuscate your api key
    NSString *twitterApiSecret = @"trqYolUkaT7gYEEFthBI9oVyPZ9O4iAvMPtYrM7oTvn4RlgSDo"; //Remember to obfuscate your api secret
    A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticatorWithKey:twitterApiKey andSecret:twitterApiSecret];
    [lock registerAuthenticators:@[twitter]];
    
    // Override point for customization after application launch.
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    A0Lock *lock = [A0Lock sharedLock];
    return [lock handleURL:url sourceApplication:sourceApplication];
}

@end
