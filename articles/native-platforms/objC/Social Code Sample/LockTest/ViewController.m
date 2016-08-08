//
//  ViewController.m
//  LockTest
//
//  Created by Sebastian Cancinos on 5/31/16.
//  Copyright © 2016 sebacancinos. All rights reserved.
//

#import "ViewController.h"
#import "UserProfileViewController.h"
#import <Lock/Lock.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
}

- (IBAction)showLogin:(id)sender
{
    A0Lock *lock = [A0Lock sharedLock];
    
    A0LockViewController *controller = [lock newLockViewController];
    controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
        // Do something with token & profile. e.g.: save them.
        // And dismiss the ViewController
        [self dismissViewControllerAnimated:YES completion:nil];
        [self performSegueWithIdentifier:@"UserProfile" sender:profile];
    };
    
    [self presentViewController:controller animated:YES completion:nil];
}

- (void) prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if([segue.identifier isEqualToString:@"UserProfile"])
    {
        UserProfileViewController *destViewController = segue.destinationViewController;
        destViewController.userProfile = sender;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
