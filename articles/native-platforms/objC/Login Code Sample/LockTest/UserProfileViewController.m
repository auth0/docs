//
//  UserProfileViewController.m
//  LockTest
//
//  Created by Sebastian Cancinos on 6/14/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Lock/Lock.h>
#import "UserProfileViewController.h"
#import <UIImageView+AFNetworking.h>

@implementation UserProfileViewController


- (void) viewWillAppear:(BOOL)animated
{
    
    self.userName.text = self.userProfile.name;
    self.userEmail.text = self.userProfile.email;
    [self.avatarImg setImageWithURL: self.userProfile.picture];
}

@end