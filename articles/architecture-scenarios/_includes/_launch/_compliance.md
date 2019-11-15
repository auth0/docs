There are several requirements related to privacy and compliance. Auth0 cannot provide legal guidance on your privacy or other regulatory obligations, but we can provide a curated list of privacy requirements below for which Auth0 offers features that may help you meet your obligations. Prior to launch, you should check that you’ve met all your privacy obligations and review the features outlined below to ensure you’re leveraging all the available Auth0 features to help you meet your privacy and compliance requirements. 

## Publish privacy policy and obtain user consent 

If you collect or process personal data about users, you should have published a privacy policy and have established procedures to ensure your operations abide by the contents of the policy. You also need to obtain a user’s consent for the collection and processing of information. Auth0 provides options for [displaying a link to your privacy policy storing user consent](/compliance/gdpr/features-aiding-compliance#conditions-for-consent).

## Provide access to view, correct and erase data

Privacy legislation often requires that users have the right to view and correct any data held about them. If you are a data controller, you should  provide a mechanism for this. Auth0 customers can [build a self-service feature to access and correct data via the management API](/compliance/gdpr/features-aiding-compliance#right-to-access-correct-and-erase-data).

## Provide access to data portability

If you are a data controller, you may be obligated to provide users a means to export their data from your system in a transportable format. Auth0 provides [user data portability mechanisms](/compliance/gdpr/features-aiding-compliance#data-portability) to help you satisfy this obligation via both manual export capabilities and the Management API which enables you to implement a self-service feature for users.

## Take steps to minimize personal data

You should have reviewed the personal data you collect about users to ensure it is legitimately required for the purposes of the processing covered in the privacy policy and consent. You should also confirm you have [minimized the data you collect](/compliance/gdpr/features-aiding-compliance#data-minimization), and established a data retention policy. You can optionally elect to encrypt data you store in user metadata for additional protection. 

## Data retention policy enforcement automated

You should have a published data retention policy and automate the enforcement of it. The Auth0 management API or the Auth0 dashboard can be used to facilitate [erasure of user accounts](/compliance/gdpr/features-aiding-compliance/right-to-access-data).

## Protect personal data

Regardless of whether you are a data controller or a data processor, you have obligations to protect the personal data you hold about users. This includes use of encryption where possible, and implementing reasonable security measures to protect user accounts. Prior to launch, you should check if you are using all the security features available from Auth0 to help with this such as Brute Force Detection, Multi-Factor Authentication (for both users and administrators), and a strong password policy if using passwords. You should also ensure you have a process ready to respond to [Brute Force attacks](/compliance/gdpr/features-aiding-compliance#protect-and-secure-user-data).

## Supplier evaluation 

Another common compliance obligation is to perform due diligence review of the security of any third-party suppliers to which you expose personal data. For Auth0, you will find information to facilitate this task on the Auth0 [security and certifications](https://auth0.com/security/) page where you can view the security certifications Auth0 has obtained.

## Additional resources

Additional resurces that may be useful for your compliance requirements include:
* [Auth0 Privacy Policy](https://auth0.com/privacy)
* [Security and Compliance](https://auth0.com/security/)
* [GDPR and Compliance Frameworks](/compliance)
* [Auth0 support for customer requirements](/compliance/gdpr/features-aiding-compliance)
