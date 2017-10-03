---
description: How to run the Auth0 Pre-Deployment Tests to ensure that your Clients are production-ready
---

# How to Run the Pre-Deployment Test

The Pre-Deployment Tests are available via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}).

![](/media/articles/support/pre-deployment-tests/support-home.png)

Once you've logged in to your account, click **Domains** in the navigation bar.

![](/media/articles/support/pre-deployment-tests/tenants.png)

You'll see a listing of all domains associated with your Auth0 account. Each domain displays in its own box. Identify the domain for which you want to run the Pre-Deployment Tests, and click on the **gear icon** located in the top right-hand corner of its box.

![](/media/articles/support/pre-deployment-tests/tenants-tests.png)

Click **Run Production Check** to launch the testing interface.

At this point, you'll be able to select one or more [Clients](/clients) associated with this domain for which you want tests run.

![](/media/articles/support/pre-deployment-tests//choose-clients.png)

Once you've selected your clients, click **Run Check**.

When the test is complete, your screen will automatically refresh to display your test results. 

![](/media/articles/support/pre-deployment-tests/results.png)

There are three types of test results: Required, Recommended, and Best Practices.

| Result Type | Description |
| ----------- | ----------- |
| Required | These tests check to see if you are missing any steps you **must** complete before deploying to Production, otherwise you'll see errors. |
| Recommended | These tests check to see if you are missing any steps **recommended** by Auth0. While you do not have to complete the steps suggested, we recommend that you at least review the results to see if any of them are helpful to your implementation.
| Best Practices | These areas are ones where Auth0 cannot check using automates tests. We list areas of possible concern, and we suggest that you review your implementation to see if you're compliant with Auth0 recommendations. |

## How to Read Your Results Set

The following are possible results for your test: Passed, Failed, Unable to Verify.

Under each set of test results, Auth0 tells you how many tests your Client passed, as well as how many tests your Clients failed.

![](/media/articles/support/pre-deployment-tests/reading-results.png)

If your Clients **failed** one or more tests, Auth0 provides you:

* The name of the test
* Information on what the test is looking for
* Details on the error thrown to and retrieved by the test
* Hyperlink to the appropriate area where you can make the required fixes so that your Client passes the test

![](/media/articles/support/pre-deployment-tests/detailed-results.png)

All of the tests that your Client **passed** are grouped together at the bottom of the results set. You can view the name of and information about the test, as well as review the associated documentation and use the hyperlink to go to the corresponding configuration area where you can make changes (if desired).