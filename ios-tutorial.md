# Using Auth0 with iOS

[ADFS](adfs)

THIS DOC IS WORK IN PROGRESS

Integrating Auth0 with iOS based apps relies on the common method of instantiating a [UIWebView](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIWebView_Class/Reference/Reference.html) inside the native app to drive all interactions with the authentication providers, and then extracting security tokens once they become available. 

Because we are using the `implicit flow`, the access token is sent as an URL fragment in the final redirect:

	https://YOUR_CALLBACK_URL#access_token=123456789098765432

The sample works by intercepting the final redirect to the __CALLBACK URL__ and parsing the URL.

##Before you start

1. You will XCode 4.5.2
2. We also assume you have Google OpenID enabled. If you haven't done so, this [tutorial](enable-simple-connection) shows how to do it.

##Integrating Auth0 with iOS

To simplify integration we have included an `Auth0Client` class that encapsulates all interactions. `Auth0Client` relies on `Auth0WebViewController` for displaying the `UIWebView`.

####1. The `Auth0Client` class

#####Auth0Client.h
	#import <Foundation/Foundation.h>
	#import <UIKit/UIKit.h>

	@interface Auth0Client : NSObject
	{
	    NSString * _accessToken;
	@private
	    NSURL * _auth0BaseUrl;
	    NSString * _clientId;
	    NSString * _connection;
	    NSString * _returnUrl;
	    NSString * _tenant;
	}

	@property (readonly) NSString *connection;
	@property (readonly) NSString *clientId;
	@property (readonly) NSString *returnUrl;
	@property (readonly) NSString *tenant;
	@property (readonly) NSString *accessToken;

	+ (Auth0Client *)auth0ClientForClientIdAndConnection:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl connection:(NSString *)connection;

	+ (Auth0Client *)auth0ClientWithWidget:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl;

	- (UIViewController *)createViewControllerAllowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(BOOL authenticated))block;

	- (void)showInViewController:(UIViewController*)controller allowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(BOOL authenticated))block;

	@end

#####Auth0Client.m

	#import "Auth0Client.h"
	#import "Auth0WebViewController.h"

	@implementation Auth0Client

	@synthesize clientId = _clientId;
	@synthesize connection = _connection;
	@synthesize returnUrl = _returnUrl;
	@synthesize tenant = _tenant;
	@synthesize accessToken = _accessToken;


	- (id)auth0ClientForClientIdAndConnection:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl connection:(NSString *)connection
	{
	    if ((self = [super init])) {
	        _clientId = [clientId copy];
	        _connection = [connection copy];
	        _tenant = [tenant copy];
	        _returnUrl = [returnUrl copy];
	        
	        NSString *url = [NSString stringWithFormat:@"https://%@.auth0.com/authorize/?client_id=%@&response_type=token&redirect_uri=%@&connection=%@",
	                         _tenant,
	                         _clientId,
	                         _returnUrl,
	                         _connection];
	        _auth0BaseUrl = [[NSURL URLWithString:url] retain];
	    }
	    
	    return self;
	}

	- (id)auth0ClientWithWidget:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl
	{
	    if ((self = [super init])) {
	        _clientId = [clientId copy];
	        _tenant = [tenant copy];
	        _returnUrl = [returnUrl copy];
	        
	        NSString *url = [NSString stringWithFormat:@"https://%@.auth0.com/login/?client=%@&response_type=token&redirect_uri=%@",
	                         _tenant,
	                         _clientId,
	                         _returnUrl];
	        _auth0BaseUrl = [[NSURL URLWithString:url] retain];
	    }
	    
	    return self;
	}

	- (void)dealloc
	{
	    [_clientId release];
	    [_connection release];
	    [_auth0BaseUrl release];
	    [_tenant release];
	    [_returnUrl release];
	    [_accessToken release];
	    [super dealloc];
	}

	+ (Auth0Client*)auth0ClientForClientIdAndConnection:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl connection:(NSString *)connection
	{
	    return [[[Auth0Client alloc] auth0ClientForClientIdAndConnection:tenant clientId:clientId returnUrl:returnUrl connection:connection] autorelease];
	}

	+ (Auth0Client*)auth0ClientWithWidget:(NSString *)tenant clientId:(NSString *)clientId returnUrl:(NSString *)returnUrl
	{
	    return [[[Auth0Client alloc] auth0ClientWithWidget:tenant clientId:clientId returnUrl:returnUrl] autorelease];
	}

	- (Auth0WebViewController*)createViewControllerAllowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(BOOL authenticated))block
	{
	    
	    Auth0WebViewController *webController = [[Auth0WebViewController alloc] initWithAuthorizeUrl:_auth0BaseUrl returnUrl:_returnUrl allowsClose:allowsClose withCompletionHandler:^(NSString *token){
	                                                                                    if(token) {
	                                                                                        [_accessToken release];
	                                                                                        _accessToken = [token retain];
	                                                                                    }
	                                                                                    block(!!token);
	                                                                            }];
	    return [webController autorelease];
	}

	- (void)showInViewController:(UIViewController *)controller allowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(BOOL authenticated))block
	{
	    Auth0WebViewController * webController = (Auth0WebViewController *)[self createViewControllerAllowsClose:allowsClose withCompletionHandler:^(BOOL  authenticated) {
	                                                        block(authenticated);
	                                                        [controller dismissModalViewControllerAnimated:YES];
	                                                     }];
	    
	    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:webController];
	    navController.navigationBar.barStyle = UIBarStyleBlack;
	    
	    [controller presentModalViewController:navController animated:YES];
	    [navController release];
	}

	@end

#####`Auth0WebViewController.h`
	#import <UIKit/UIKit.h>

	@interface Auth0WebViewController : UIViewController <UIWebViewDelegate, NSURLConnectionDelegate> {
	@private   
	    UIWebView *_webView;
	    NSMutableData *_data;
	    NSURL *_url;
	    NSURL *_authzUrl;
	    NSString * _returnUrl;
	    void (^ _block)(NSString* token);
		BOOL _allowsClose;
	}

	- (id)initWithAuthorizeUrl:(NSURL *)authzUrl returnUrl:(NSString*)returnUrl allowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(NSString * token))block;

	@end

#####`Auth0WebViewController.m`

	#import "Auth0WebViewController.h"
	#import "Auth0Client.h"

	@interface Auth0Client (Private)
	@end

	@implementation Auth0WebViewController

	- (id)initWithAuthorizeUrl:(NSURL *)authzUrl returnUrl:(NSString*)returnUrl allowsClose:(BOOL)allowsClose withCompletionHandler:(void (^)(NSString* token))block
	{
	    if ((self = [super initWithNibName:nil bundle:nil]))
	    {
	        _authzUrl = [authzUrl retain];
	        _returnUrl = [returnUrl retain];
			_block = [block copy];
			_allowsClose = allowsClose;
	    }
	    return self;
	}

	- (void)dealloc
	{
	    [_authzUrl release];
	    [_data release];
	    [_url release];
	    [_block release];
	    
	    [super dealloc];
	}

	- (void)didReceiveMemoryWarning
	{
	    [super didReceiveMemoryWarning];
	}

	- (void)showProgress
	{
		UIActivityIndicatorView* view = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
		self.navigationItem.rightBarButtonItem = [[[UIBarButtonItem alloc] initWithCustomView:view] autorelease];
		[view startAnimating];
		[view release];
	}

	#pragma mark - View lifecycle

	- (void)loadView
	{
	    self.title = @"Auth0";

	    // create our web view
	    _webView = [[UIWebView alloc] init];
	    _webView.delegate = self;
	    _webView.scalesPageToFit = YES;
	    
	    self.view = _webView;
	    [_webView release];

	    // navigate to the login url
	    NSURLRequest *request = [NSURLRequest requestWithURL:_authzUrl];
	    [_webView loadRequest:request];
		
		[self showProgress];
	}

	- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
	{
	    // Return YES for supported orientations
	    return YES; //(interfaceOrientation == UIInterfaceOrientationPortrait);
	}

	#pragma mark UIWebViewDelegate

	- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
	{
	    NSLog(@"error %@", [error description]);
	}

	- (void)webViewDidFinishLoad:(UIWebView *)webView
	{
		self.navigationItem.rightBarButtonItem = nil;
	}

	- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
	{
	    NSString *requestURLString = request.URL.absoluteString;
	    
	    NSLog(@"HTTPMethod: %@\n", request.HTTPMethod);
	    NSLog(@"Fields: %@\n", [request.allHTTPHeaderFields description]);
	    NSLog(@"URL: %@\n", request.URL.absoluteString);
	    
	    // Checking if the URL is the redirect_url
	    if ([requestURLString rangeOfString:_returnUrl].location == 0)
	    {
	        //Quick and Dirty parsing of the return URL withe access_token in the URL fragment
	        NSArray * fragments = [requestURLString componentsSeparatedByString:@"#"];
	        NSString * url_access_token = [fragments lastObject];
	        NSArray * url_token = [url_access_token componentsSeparatedByString:@"&"];
	        NSString * accessToken = [url_token objectAtIndex:0];
	        _block(accessToken);
	        [accessToken release];
	        return NO;
	    }
	    
	    [NSURLConnection connectionWithRequest:request delegate:self];
		[self showProgress];

	    return YES;
	}

	#pragma mark -
	#pragma mark NSURLConnectionDelegate

	- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
	{
	    if(_data) {
	        [_data release];
	        _data = nil;
	    }
	}

	- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
	{
	    if (!_data) {
	        _data = [data mutableCopy];
	    } else {
	        [_data appendData:data];
	    }
	}

	- (void)connectionDidFinishLoading:(NSURLConnection *)connection
	{
	    if (_data) {
	        NSString *content = [[NSString alloc] initWithData:_data encoding:NSUTF8StringEncoding];
	        
	        [_data release];
	        _data = nil;
	        
	     	[content release];
			
			self.navigationItem.rightBarButtonItem = nil;
	    }
	}
	@end


####2. Using the library

Using the library is straight forward:

    Auth0Client *client = [Auth0Client auth0ClientWithWidget:tenant clientId:"@@account.clientId@@" returnUrl:YOUR_CALLBACK];
    
    [client showInViewController:self allowsClose:NO withCompletionHandler:^(BOOL authenticated) {
        if (!authenticated) {
            NSLog(@"Error authenticating");
        }
        else{
            self.accessTokenView.text = [client.accessToken copy];
        }
    }];

> Remember that the `returnUrl` parameter must also be efined in your Auth0 [settings](https://app.auth0.com/#/settings). This sample uses __https://localhost/client__

Congratulations!

