Bulk Passwords Checking
=======================

In Auth0 we focus on bring you the tools you need to keep your systemas and your users safe. 
Bulk passwords checking is a tool that allows you to check your user's passwords against pre-defined list of 
passwords to test their stregth.

This tool together with our [Breached Password Security](/anomaly-detection/breached-passwords) helps you audit your
users security and take actions to protect them.

## Bulk Passwords Checking vs Breached Password Security
Breached Password Security tools verifies user passwords against our database of compromised passwords, those passwords usually
comes from security breached experienced by a third party application have been realeased by the attackers and so they might
have been accessed by attackers. If a compromised account is detected different actions may be taken based on your configuration.

On the other hand, bulk passwords checking aims to give you the power to audit your users security against your own
passwords database, those passwords may come from different sources, examples of possible sources might be list of passwords 
available on the Internet (also known as passwords-dictionaries), your own hand-made checking list, etc. 

Combined with other tools we offer, actively auditing your users' account passwords will help you to proactively 
protect them and take risk mitigation actions in case a weak password gets detected.

## Security considerations
This tool helps you audit and protect your users against weak passwords, however, if used innapropiately, it might allow
an attacker to brute force your users; because of this is really important for you to keep your credentials secure and not to 
issue tokens that allows to execute bulk passwords checking if not strictly necesary, also, make sure to include a token 
identifier and set a short expiration period on the tokens that allow this action, that way you will be able to blacklist them 
if they get compromised. Finally, delete the data once you have finished; that way you can be sure nobody else will be able to 
access it.

We also take explicit measures to protect your data:
- As everything in Auth0 all the data is transmited over TLS even in our internal systems.
- Your data will be in our systems as less time as possible, only the time needed to 
process and hand you in the results, then it is going to be deleted automatically in a short period of time. Even so, 
it is considered a good practice to manually delete the data once you have the results (see bellow).
- Input data will be processed in batches and every batch will be deleted as soon as it gets processed to minimize the risk of
exposure.
- Result won't include the actual matches but a reference to them.

To sum up:
- Don't issue tokens that allows this action if you are not absolutely sure this right is needed
- Set a short experiration on the issued tokens
- Add an identifier (jti) to your tokens. So you will be able to blacklist compromised tokens.
- If you think  a token might have been compromised black list it immediately.
- Delete the input data and results once finished.

## Usage



