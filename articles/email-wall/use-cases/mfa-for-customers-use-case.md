---
description: "Multifactor authentication has become the new minimum level required to ensure that your customers are who they say they are, in light of the massive security breaches of usernames and passwords that appear in the headlines each week. Even if your Web site or mobile application does not perform financial transactions you should add multifactor authentication for customers. It's easier than you think with Auth0."
fourKeyConcepts: 
  - 
    icon: css-class-bud-icon
    text: "Challenge: Username/Password is No Longer Secure"
  - 
    icon: css-class-bud-icon
    text: "Solution: Add Multifactor Authentication"
  - 
    icon: css-class-bud-icon
    text: "Benefits: Provide True Security for Employees"
  - 
    icon: css-class-bud-icon
    text: "Result: Quick Implementation, Solid Foundation for Future"
hash: mfa-for-customers
logoUrl: "/media/articles/email-wall/use-cases/mfa-for-customers/logo.png"
iconUrl: "/media/articles/email-wall/use-cases/mfa-for-customers/logo.png"
bgColor: "#222228"
longDescription: "As username and password exploits continue to dominate the headlines and threaten the security of even the strongest global companies and brands, security experts agree that adding multifactor authentication (MFA) to login flows can help mitigate this vulnerability and strengthen their security posture. With Auth0, adding MFA capability and more for your customers is easier than you think.\n"
pdf: MFAforCustomersUseCase.pdf
sitemap: false
title: "Multifactor Authentication for Customers"
seo_description: "Protect your customers' privacy and safeguardi their personal data, by easily enabling multi-factor authentication."
type: case-study
---

# Multifactor Authentication for Customers
## THE PROBLEM
Unfortunately, people create weak passwords, but what’s worse is that they reuse their passwords across social and commercial Web sites. Should any of those Web sites be penetrated, one day an impostor who has your customer's username and password may login to your Web site. The only feasible defense is to implement multifactor authentication (MFA). But any MFA solution has to work for both older applications, for which there is no source code and new applications for which there is source. It has to be able work in a scenario where the customer’s identity is held elsewhere such as at Google, Microsoft, Facebook or Amazon, and it has to be easy to implement.

## THE SOLUTION
In a multifactor authentication scenario, additional “something you know”, “something you have” or “something you are” factors are requested by the application in addition to username/password. Popular methods include a fingerprint with Apple TouchID, retina scan, facial or voice recognition, a one-time password from a hardware or software token, an SMS texted code, an email delivered code, answering secret questions, or being in some physical location – the list goes on and on.

MFA can be requested at initial login to ensure the identity of the customer who wants to use a given application. Additionally, a technique known as contextual MFA is gaining in popularity, whereby requests for additional credential factors are based on the context of the customer’s interaction such as a group they are in, access from a new device or location, the resource being accessed or the time.

## THE BIG PICTURE
Auth0 can be used to enhance both existing applications, for which there may be no source code, and new applications, for which source code is available. For existing applications, change the setting that is used to get to the Identity Provider (IdP) for the customers from the existing identity provider to Auth0. This allows Auth0 to operate as a broker between the application and the original customer IdP or external user database. New applications will use the Auth0 APIs through the convenient SDKs that are specific to each mobile device or application framework, along with the renowned Auth0 code samples and customized step-by-step guidance for each specific scenario that developers rave about.

 ![Auth0 is introduced between the applications and existing employee IDP](/media/articles/email-wall/use-cases/mfa-for-customers/big-picture-how-auth0-fits-in.png) 

Auth0 adds MFA capability and more to both existing and new applications

Once the applications are using Auth0 as their IdP, Auth0 enables you to service existing customers without them having to change their passwords or take any action whatsoever. Customers can be given the choice to log in with any of the standards-based or popular social and commercial IdPs such as Windows Live, Google, Facebook, Amazon, Salesforce, as a few examples. 

 ![Auth0 is introduced between the applications and existing employee IDP](/media/articles/email-wall/use-cases/mfa-for-customers/mfa-for-customers-dashboard-switches.png) 

Auth0 federates with any OpenID Connect, OAuth or popular IdPs

Once in place, Auth0 provides the solid foundation required to add additional capabilities uniformly across all applications running on mobile devices or on the Web such as providing SSO, password-less authentication, multi-factor authentication, contextual MFA, logging user activity, and more. 

## MULTIFACTOR AUTHENTICATION OPTIONS
It is easy to add contextual multi-factor authentication where and when it is appropriate, on a per-application basis, for each user or group of users. Auth0 MFA features include:

(i) Use any of the dozens of MFA solutions that exist today including SMS Text, email, biometric, password-less and more, and be ready to add any new ones easily as they become available or necessary. Auth0 provides support for all MFA service providers through powerful authentication flow “rules”, which are described below.

(ii) Add contextual MFA which allows you to define arbitrary conditions that will trigger additional authentication challenges to your customers for increased security, for example, geographic location (geo-fencing), address or type of network used (IP filtering), time of day, day of the week or change in the location or device being used to log in as described here ([https://auth0.com/docs/multifactor-authentication](https://auth0.com/docs/multifactor-authentication)).

(iii) With the flip of a switch in the Auth0 dashboard, add the popular Google Authenticator MFA experience ([https://en.wikipedia.org/wiki/Google_Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator)) or the Duo Security MFA experience ([https://www.duosecurity.com/](https://www.duosecurity.com/)) into the authentication flow for any applications.

 
 ![Auth0 Dashboard method of adding or deleting Google Authenticator or Duo Security](/media/articles/email-wall/use-cases/mfa-for-customers/mfa-dashboard-switch.png)

Enable MFA for any application with the flip of a switch

## EXTENSIBILITY WITH RULES
Auth0 allows you to customize and extend the authentication flow through JavaScript functions called rules ([https://auth0.com/docs/rules](https://auth0.com/docs/rules)), which run in a secure sandbox and allow Auth0 to be extended easily. Rules run after the existing IdP has authenticated the customer and before control is returned to the application that called Auth0.

 ![After authenticating the user, Auth0 can run any number of custom rules](/media/articles/email-wall/use-cases/mfa-for-customers/auth-pipeline-with-rules-customers.png)


Rules are run after the customer is authenticated and before control is returned to the application

Many of our customers have found the Auth0 rules feature to be very helpful. Rules allow you to easily implement all kinds of customizations to the login process with just a little bit of JavaScript code. Some of the most popular uses for rules include:

- Adding multi-factor authentication
- Contextual MFA (context-aware, risk-based authentication)
- Adding, removing or enriching user attributes drawn from several IdPs or databases
- User enrollment
- Consent & legal terms acceptance
- Redirect to a page to consent to user claims being sent to the requestor
- Sending events to analytics tools like Mixpanel, Segment or KISSMetrics
- Enforce access control policies

Auth0 provides rule templates to speed the creation of new rules and a large number of useful rules are have been contributed by the active community on GitHUB ([https://github.com/auth0/rules](https://github.com/auth0/rules)).

## ADVANTAGES
Auth0 makes it easy to incorporate MFA and contextual MFA into the customer’s experience for both existing and new applications and provides the opportunity to add other capabilities such as password-less authentication, keeping user activity logs, single sign-on, login with social or commercial identities and more. With Auth0, getting MFA implemented for all of the applications your customers use is easier than you think.
