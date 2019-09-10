---
description: How to open and manage tickets with Support Center.
topics:
    - support
    - support-tickets
    - tickets
contentType:
  - how-to
  - reference
useCase:
  - support
---

# Open and Manage Support Tickets

With [Support Center](${env.DOMAIN_URL_SUPPORT}), you can create tickets for questions or issues you are experiencing. You can access Support Center if you are a full administrator of an Auth0 account, or have received an invitation to Support Center from an administrator. 

If you are an existing Private Cloud customer, you will need to create an Auth0 cloud-based account to log in to the Support Center. This account can also be used for Dev/Test purposes at no additional cost. Please contact your Technical Account Manager or Sales Executive to associate your cloud-based account to your existing Private Cloud subscription.

## Open a new ticket

1. From [Support Center](${env.DOMAIN_URL_SUPPORT}), click on the **Open Ticket** button. If you don't see this button, then you do not have access to support (only paying and trial customers have access to Support). In this case you can use our [Community](https://community.auth0.com/) instead (click **Ask our Community**).
![Support Center](/media/articles/support/open-ticket.png)
1. Choose **Affected Tenant** from the dropdown menu.
1. Under **Issue Type** select the type of issue that best fits your case.
![Issue types](/media/articles/support/issue-types.png)
    * **Public Cloud Support Incident** or **Private Cloud Support Incident** - (the second option is only available to Private Cloud customers)
        * If you are not a Trial Tenant customer, you will be asked to select a severity:
            * **Low: Product Question** - You have questions about how things work, whether we support something
            * **Normal: General Support Question** - You are in development and have a question about how to configure something or how to resolve an error
            * **High: Production Application Issue** - Your Production application is experiencing a minor outage impacting some users/feature(s)
            * **Urgent: Production Application Offline** - Your Production application is experiencing a critical outage impacting all users
        *  Depending on the issue type you chose, after you select the severity you may need to answer the **What can we help you with?** question. Choose the answer that best matches your issue. 
![Customer Reason](/media/articles/support/customer-reason.png)
        * After you make your selection, you can choose to answer some follow-up questions to further refine your request. You can also choose to skip this step by clicking the toggle. 
![Follow-up questions](/media/articles/support/follow-up.png)
    * **Enhancement/Feature Request** - You would like to suggested product improvements or enhancement requests
    * **Billing or Payment** - You are experiencing issues such as incorrect billing, charges to the incorrect account, and so on
    * **Compliance/Legal** - You would like to report security vulnerabilities or legal questions
::: note
Selection of severity is not available to Trial Tenant customers or those who have selected any of the following issue types: **Enhancement/Feature Request**, **Billing or Payment**, **Compliance/Legal**.
:::
1. Next, provide a clear summary of the question/issue in the **Subject** field.
1. In the **Description** box, provide as much detail as possible about the issue. When writing in this box, you can style your text with [Markdown](https://guides.github.com/features/mastering-markdown) and preview what you have written by clicking on **Preview**.
    When writing your description, please try to include the following information (if applicable):
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
