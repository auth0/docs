---
decription: How to open and manage tickets with Support Center.
tags:
    - support
    - support-tickets
    - tickets
---

# Open and Manage Support Tickets

With [Support Center](${env.DOMAIN_URL_SUPPORT}), you can create tickets for questions or issues you are experiencing. You can access Support Center if you are a full administrator of an Auth0 account, or have received an invitation to Support Center from an administrator. 

If you are an existing PSaaS Appliance customer, you will need to create an Auth0 cloud-based account to log in to the Support Center. This account can also be used for Dev/Test purposes at no additional cost. Please contact your Customer Success Manager or Sales Executive to associate your cloud-based account to your existing PSaaS Appliance subscription.

## Open a new ticket

1. From [Support Center](${env.DOMAIN_URL_SUPPORT}), click on the **Contact Support** button. If you don't see this button, then you do not have access to support (only paying and trial customers have). In this case you can use our [Community](https://community.auth0.com/) instead (click **Ask our Community**).
![Support Center](/media/articles/support/open-ticket.png)
1. Choose the **Affected Account** from the dropdown menu.
1.  Under **What can we help you with?** select the type of issue that best fits your case.
![Issue types](/media/articles/support/issue-types.png)
    * **Auth0 Service Issue** - Choose this if something isn’t working correctly or you need help using a feature or getting something working.
        * With Service Issues, you will be asked to select a severity:
            *  **Low: Product Question** - You have questions about how things work, whether we support something
            * **Normal: General Support Question** - You are in development and have a question about how to configure something or how to resolve an error
            * **High: Production Application Issue** - Your Production application is experiencing a minor outage impacting some users/feature(s)
            * **Urgent: Production Application Offline** - Your Production application is experiencing a critical outage impacting all users
        *  You will then be asked to choose an option under "What is the service issue related to?"
            *  _You may be prompted for additional information depending on your selection._
    * **Billing, Payments, or Account Issues** - You are experiencing issues such as incorrect billing, charges to the incorrect account, and so on
    * **Auth0 Service Feedback** - You would like to suggested product improvements or enhancement requests
    * **Vulnerability Reports or Legal Issues** - You would like to report security vulnerabilities or legal questions
    * **Other** - You have a question that does not fall under any of the above categories
1. Next, provide a clear summary of the question/issue in the **Subject** field.
1. In the **Description** box, provide as much detail as possible about the issue. When writing in this box, you can style your text with [Markdown](https://guides.github.com/features/mastering-markdown) and preview what you have written by clicking on **Preview**.
    When writing your description, please try to include (if applicable):
    * What were you trying to do?
    * What did you expect to happen?
    * Where did things go wrong?
    * Were there any error messages or screen shots showing the problem? If so, please include them.
    * Has this worked before, or are you trying a new configuration?
    * Does the problem occur for all users or just a few?
    * What troubleshooting steps have you tried?
1. When you have completed all the fields, click on the **SUBMIT** button.

## Update an existing ticket

1. You can view the existing tickets you have filed by going to the [Support Center](${env.DOMAIN_URL_SUPPORT}) page and clicking on the **Home** link. Select the ticket that you want to update by clicking on its subject.
![Select ticket](/media/articles/support/select-ticket.png)

1. Enter any additional details into the text box and then click the **REPLY** button. If you are the ticket requester and the ticket is assigned to an agent, but is not solved or closed, you have the option to change the status of your ticket to **Solved** by checking the **Submit as solved** box next to the **REPLY** button.
![Update ticket](/media/articles/support/update-ticket.png)

### Closed tickets

If your ticket has been closed, but you'd like to continue working with Auth0 on the issue, please create a new [Support Center ticket](${env.DOMAIN_URL_SUPPORT}). Be sure to include the reference number for the original ticket(s).
