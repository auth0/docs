# Using Auth0 with a native Windows Phone 8 app

This tutorial relies on the common method of instantiating a web browser in a native app to drive all interactions with the authentication providers, and then extracting security tokens once they become available. 

Because we are using the `implicit flow`, the access token is sent as an URL fragment in the final redirect:

	https://YOUR_CALLBACK_URL#access_token=123456789098765432

The sample works by intercepting the redirect to the __CALLBACK URL__ and parsing the URL.

> This same tutorial will not work on previous versions of Windows Phone because of bug in the Silverlight WebBrowser control that strips out URL fragments.

##Before you start

1. You will need Visual Studio 2012 with [Windows Phone 8 SDK development tools](http://go.microsoft.com/fwlink/?LinkId=265772)
2. We also assume you have a [connection](https://app.auth0.com/#/connections) named "MyNewConnection". If you don't have one, this [tutorial](createconnection) shows how to create one.

##Integrating Auth0 with a Windows Phone 8 App

####1. Create a new Application
Open Visual Studio and create new Windows Phone app:

![](img/wp8-step1.png)

####2. Add UI controls
Open the __MainPage.xaml__ file and replace the entire `<Grid>` definition with this one:

	<Grid x:Name="LayoutRoot" Background="Transparent">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="100"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        <StackPanel x:Name="TitlePanel" Grid.Row="0" Margin="12,17,0,28">
            <TextBlock Text="Connect to Auth0" Style="{StaticResource PhoneTextNormalStyle}" Margin="12,0"/>
            <TextBlock Text="Login" Margin="9,-7,0,0" Style="{StaticResource PhoneTextTitle1Style}"/>
        </StackPanel>
        <Button x:Name="Login" Grid.Row="1" Content="Login" Click="Login_Click" />
        <Grid x:Name="ContentPanel" Grid.Row="2">
            <phone:WebBrowser x:Name="LoginBrowser" Grid.Row="0" Grid.RowSpan="2" IsEnabled="true" IsScriptEnabled="True" />
            <TextBlock x:Name="UserInfo" Grid.Row="1" Grid.RowSpan="2" Visibility="Collapsed" TextWrapping="Wrap"/>
        </Grid>
    </Grid>

####2. Add code to initiate Authentication and retrieve User Profile
Open the __MAinPage.xaml.cs__ file and replace the class definition with this one:

	public partial class MainPage : PhoneApplicationPage
    {
        private string AccessToken;
        private const string Auth0UserInfo = @"https://@@account.namespace@@/userinfo/?{0}";
        private const string Auth0Authorize = @"https://@@account.namespace@@/authorize/?client_id={0}&redirect_uri={1}&response_type=token&connection={2}";

        private const string RedirectUri = @"https://localhost/client";
        private const string ClientId = @"@@account.clientId@@";
        private const string Connection = @"MyNewConnection";

        // Constructor
        public MainPage()
        {
            InitializeComponent();
            this.LoginBrowser.Navigating += LoginBrowser_Navigating;
        }

        void LoginBrowser_Navigating(object sender, NavigatingEventArgs e)
        {
            if (e.Uri.ToString().StartsWith(RedirectUri))
            {
                e.Cancel = true;

                //Quick and Dirty access_token parsing
                this.AccessToken = url.Fragment.Substring(1).Split('&')[0];

                this.UserInfo.Visibility = System.Windows.Visibility.Visible;
                this.LoginBrowser.Visibility = System.Windows.Visibility.Collapsed;

                GetUserInfo();
            }
        }

        //Start downloading User profile
        private void GetUserInfo()
        {
            WebClient c = new WebClient();
            c.DownloadStringCompleted += c_DownloadStringCompleted;
            c.DownloadStringAsync(new Uri(string.Format(Auth0UserInfo, this.AccessToken)));
        }

        void c_DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            this.UserInfo.Text = e.Result;
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            this.UserInfo.Visibility = System.Windows.Visibility.Collapsed;
            this.LoginBrowser.Visibility = System.Windows.Visibility.Visible;

            var auth0Endpoint = string.Format(Auth0Authorize, ClientId, RedirectUri, Connection);
            this.LoginBrowser.Navigate(new Uri(auth0Endpoint));
        }
    }


> Remember that the 'callBackUrl' must be defined in your Auth0 [settings](https://app.auth0.com/#/settings). This sample uses __https://localhost/client__

## Testing the app:

Compile the App and run it. Assuming your connection (__MyNewConnection__ in this turorial) is configured to use Google you will see the standard login screen:

![](img/win8-step3.png) 

After authentication the user profile will be displayed on the screen:

![](img/win8-step4.png) 

Congratulations! 
