# How to Run the Pre-Deployment Test

The Pre-Deployment Tests are available via the [Auth0 Support Center](https://support.auth0.com/).

![](support-home.png)

Once you've logged in to your account, click **Tenants** in the navigation bar.

![](tenants.png)

You'll see a listing of all tenants associated with your Auth0 account. Each tenant displays in its own box. Identify the tenant for which you want to run the Pre-Deployment Tests, and click on the **gear icon** located in the top right-hand corner of its box.

![](tenants-tests.png)

Click **Run Production Check** to launch the testing interface.

At this point, you'll be able to select one or more [Clients](/clients) associated with this tenant for which you want tests run.

![](/choose-clients.png)

Once you've selected your clients, click **Run Check**.

When the test is complete, your screen will automatically refresh to display your test results. 

![](results.png)

There are three types of test results: Required, Recommended, and Best Practices.

| Result Type | Description |
| ----------- | ----------- |
| Required | These tests check to see if you are missing any steps you **must** complete before deploying to Production, otherwise you'll see errors. |
| Recommended | These tests check to see if you are missing any steps **recommended** by Auth0. While you do not have to complete the steps suggested, we recommend that you at least review the results to see if any of them are helpful to your implementation.
| Best Practices | These areas are ones where Auth0 cannot check using automates tests. We list areas of possible concern, and we suggest that you review your implementation to see if you're compliant with Auth0 recommendations. |

## How to Read Your Results Set

Under each set of test results, Auth0 tells you how many tests your Client passed, as well as how many tests your Clients failed.

![](reading-results.png)

If your Clients **failed** one or more tests, Auth0 provides you:

* The name of the test
* Information on what the test is looking for
* Details on the error thrown to and retrieved by the test
* Hyperlink to the appropriate area where you can make the required fixes so that your Client passes the test

![](detailed-results.png)

All of the tests that your Client **passed** are group together at the bottom of the results set. You can view the name of and information about the test, as well as review the associated documentation and use the hyperlink to go to the corresponding configuration area where you can make changes (if desired).