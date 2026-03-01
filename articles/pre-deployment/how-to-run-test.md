---
description: How to run the Auth0 Production Check to ensure that your Applications are production-ready
topics:
    - pre-deployment
    - pre-deployments-tests
    - tests
    - production-checks
contentType:
  - reference
  - how-to
useCase:
  - support
---

# How to Run the Production Checks

The Production Checks can be reviewed in the [Auth0 Support Center Tenants section](${env.DOMAIN_URL_SUPPORT}/tenants/public).

![](/media/articles/support/pre-deployment-tests/support-home.png)

Once you've logged in to your account, click **Tenants** in the navigation bar.

![](/media/articles/support/pre-deployment-tests/tenants.png)

You'll see a listing of all tenants associated with your Auth0 account. Each tenant displays in its own box. Identify the tenant for which you want to run the Production Checks, and click on the **gear icon** located in the top right-hand corner of its box.

![](/media/articles/support/pre-deployment-tests/tenants-tests.png)

Click **Run Production Check** to launch the testing interface.

At this point, you'll be able to select one or more [Applications](/applications) associated with this tenant for which you want checks run.

![](/media/articles/support/pre-deployment-tests/choose-applications.png)

Once you've selected your applications, click **Run Check**.

When the test is complete, your screen will automatically refresh to display your check results. 

![](/media/articles/support/pre-deployment-tests/results.png)


## Production Check Results

There are three types of check results: Required, Recommended, and Best Practices.

| Result Type | Description |
| ----------- | ----------- |
| Required | These checks see if you are missing any steps you **must** complete before deploying to Production; otherwise you'll see errors. |
| Recommended | These checks see if you are missing any steps **recommended** by Auth0. While you do not have to complete the steps suggested, we recommend that you at least review the results to see if any of them are helpful to your implementation.
| Best Practices | These areas are ones where Auth0 cannot use automated checks. We list areas of possible concern, and we suggest that you review your implementation to see if you're compliant with Auth0 recommendations. |

## How to Read Your Results Set

The following are possible results for your check: Passed, Failed, Unable to Verify.

Under each set of check results, Auth0 tells you how many checks your Application passed, as well as how many checks your Application failed.

![](/media/articles/support/pre-deployment-tests/reading-results.png)

If your Application **failed** one or more checks, Auth0 provides:

* The name of the check
* Information on what the check is looking for
* Details on the error thrown to and retrieved by the check
* Hyperlink to the appropriate area where you can make the required fixes so that your Application passes the check

![](/media/articles/support/pre-deployment-tests/detailed-results.png)

All of the checks that your Application **passed** are grouped together at the bottom of the results set. You can view the name of and information about the check, as well as review the associated documentation and use the hyperlink to go to the corresponding configuration area where you can make changes (if desired).
