# Common Threats and How to Prevent Them

## Man-in-the-Middle(MiM or MitM) Attacks 

One common type of threat is a Man-in-the-middle attack, sometimes called a bucket brigade attack. In this type of attack the attacker gets between two parties, where each party thinks they are interacting over a private connection, but it is actually being controlled by the third-party attacker. For this type of attack to succeed the attacker must create mutual authentication between both parties. 

Usually MiM attacks involve the attacker using a WiFi router to intercept a user's communication. The user connects to the attacker's router then visits a website and logs in with their confidential credentials. The attacker saves that user's login credentials for which they can then use to impersonate the user.

To help defend against this type of attack it is important to use strong encryption and authentication between the client and the server. Using encryption the server authenticates the client's request by presenting a digital certificate, and only then can the connection be established. 

For example, HTTPS uses the secure sockets layer (SSL) capability the browser to mask web traffic. To decrypt HTTPS, a man-in-the-middle attacker would have to obtain the keys used to encrypt the network traffic.

