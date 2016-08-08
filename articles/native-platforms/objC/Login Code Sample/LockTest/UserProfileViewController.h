//
//  UserProfileViewController.h
//  LockTest
//
//  Created by Sebastian Cancinos on 6/14/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

@class  A0UserProfile;

@interface UserProfileViewController : UIViewController

@property (nonatomic, strong) A0UserProfile *userProfile;


@property (nonatomic, weak) IBOutlet UIImageView *avatarImg;
@property (nonatomic, weak) IBOutlet UILabel    *userName;
@property (nonatomic, weak) IBOutlet UILabel    *userEmail;

@end
