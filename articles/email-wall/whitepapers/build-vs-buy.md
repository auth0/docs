---
title: "Dollars and Sense: Why Buying Your Identity Infrastructure Is Good Busines"
type: whitepaper
description: It is tempting to build your own identity management. But it does not make good economic sense. This white paper looks in detail at the costs to build a trustworthy identity solution in today’s high-risk environment, what it costs to purchase a subscription to the developer-friendly Auth0 platform, and for several typical scenarios, determines the payback period for using Auth0.
hash: build-vs-buy
pdf: http://google.com/link-to.pdf
fourKeyConcepts:
  -
    text: Why Is Enterprise Identity So Hard?
    icon: css-class-bud-icon
  -
    text: Costs To Build an Identity Solution
    icon: css-class-bud-icon
  -
    text: Costs to Buy an Identity Solution from Auth0
    icon: css-class-bud-icon
  -
    text: Payback and ROI
    icon: css-class-bud-icon
longDescription: >
  Whether you’re a multi-billion dollar enterprise, an established web-native service, or a brand-new startup, you already know that you depend on secure identity management to protect your business. Identity management is a lot like database management: central to nearly all software, and rocket science to implement correctly. You wouldn’t engineer your own database - so why are you still building your own identity infrastructure?
  The case for buying your identity infrastructure ultimately comes down to risk, agility, and money. In this report we’ll look at what goes into a complete and trustworthy identity solution, and compare those costs and risks to a purchased solution from Auth0. and figure out the break-even payback period for some example scenarios. Finally, we will give you some ROI tools you can use to make the right decision for your organization.
shortTagline: You wouldn't build your own database, so why are you still building your own identity solution? 
---

OVERVIEW / EXECUTIVE SUMMARY
============================
Whether you’re a multi-billion dollar enterprise, an established web-native service, or a brand-new startup, you already know that you depend on secure identity management to protect your business. It’s the barricade that keeps the bad actors out while letting your employees, customers, and partners in. Identity management is a lot like database management: central to nearly all software, and rocket science to implement correctly. You wouldn’t engineer your own database - too hard, too costly, and would slow your development down to a crawl. So why are you still building your own identity infrastructure?

Your business is unique. You have a lot at stake, a lot to protect. With your own strategy, security and compliance requirements, resources and IT culture, it is easy to believe that you need your own custom identity management. But identity management is so specialized that a service embodying best practices and built by experts can achieve economies of scale that make it far more cost-effective to buy a great identity solution than build one.

The case for buying your identity infrastructure ultimately comes down to risk, agility, and money. In this report we’ll look at what goes into a full-service, complete and trustworthy identity solution, and the costs of building it. We’ll compare those costs and risks to a purchased solution from Auth0 and figure out the break-even payback period for some example scenarios. Finally, we’ll present some ROI calculation tools and templates that you can use in evaluating alternatives and making the right decisions for your organization.

WHY IS ENTERPRISE IDENTITY SO HARD?
===================================
Identity management has been a staple component of software since the dawn of computing: punch card batch jobs and early timesharing systems were protected by username/password authentication. With so much history, you’d think identity management would be a solved problem. But you would be wrong! In fact, it is much worse today:

SCOPE AND DIVERSITY
-------------------
Managing a small number of identities is a simple problem. But both small and large Internet-enabled companies have big ambitions and a worldwide user base to match. Your systems are just as diverse as your user base. A mix of custom applications used to run your business, and enterprise packaged applications and SaaS services that your employees and supply chain may need to access. While it is true that secure authentication is vital, you’ve got products and services to create and deliver, and customers to delight. Secure authentication is table stakes but not what you’re betting on to win.

* __Users:__ Your employees, partners and customers access your systems from both inside and outside your security perimeter, and that perimeter is exposed to the entire Internet.
* __Systems:__ Your systems include modern and legacy packaged software, SaaS subscription services, custom enterprise applications, and the latest web and mobile-based customer apps - even embedded code in IoT devices and endpoints.
* __Development:__ Your developers are leveraging all the latest languages, frameworks, technologies and paradigms, trying to keep up with extreme change - while under intense pressure to ship code.
* __Deployment:__ You’re deploying all of this on a dizzying array of your own data centers, private and public cloud instances, and a fragmented landscape of PCs and mobile gadgets.

SECURITY LANDSCAPE
------------------
With such a long history and so much industry investment over decades, it is hardly surprising that Identity Management has evolved from a simple operating system service into a complex thicket of competing and conflicting standards. 

==> Diagram of the current super-messy IdP landscape. <==

Federated and social identity and multi-factor authentication have evolved to add flexibility and security to this complicated environment, but in turn these technologies can be hard to understand - implementing it securely is best left to specialists.

Identity is an attractive attack target. In the U.S., the likelihood that any given enterprise will suffer a security breach resulting in millions of dollars of losses including direct mitigation costs, churn, and damage to reputation is approaching 25% per year for all kinds of attacks, including identity. Compliance and privacy laws and regulations are there to try and stem this tide, but the attackers are smart, and it is hard for even large enterprises to keep up. 

* __Standards, Federation:__ Identity standards are in flux, with complex, changing federated identity and SSO technologies and a confusing assortment of enterprise and social identity providers with which to connect.
* __Multi-factor:__ The weakness and hassle of name/password authentication in the Internet age is driving adoption of multi-factor authentication with all its complexity and user experience issues.
* __Attacks:_ Attackers are stealing credentials with zero-day exploits, brute-forcing weak passwords, phishing unsuspecting users - and all your software assets are a target, with huge financial and reputational costs for breaches.
* __Compliance:__ Regulations, compliance requirements, and expectations of privacy are complicating the picture even more, making it hard to know if you meet the rules.

FLAWLESS AT WEB-SCALE
---------------------
As if all these challenges were not enough, an enterprise identity solution is central to the whole IT infrastructure. It must deliver performance and availability with the scale and flexibility to be an asset, not a liability. Failure is not an option! 

* __Perfect Execution:__ The icing on the cake: all of this has to work flawlessly - with continuous availability, superior performance, and ironclad security - at web scale.
* __Under budget and on-time:__ Just because it is hard does not mean you get a pass on business imperatives - your Identity Management solution must match your organization’s financial and market needs first and foremost.

==> PULL QUOTE FROM CUSTOMER ON WHY THEIR IAM CHALLENGE IS A BIG PROBLEM. <==

No wonder Identity and Access Management (IAM) has grown into a large subsegment of the software business, and is such a critical concern of CTOs, CIOs, and even CEOs of organizations both large and small.

PUTTING IT TOGETHER: BUILD VS. BUY?
===================================
Costs To Build An Identity Management Solution
----------------------------------------------
So lets take a hard look at the costs to implement a secure, scalable IAM solution that can handle enterprise SSO for packaged applications and SaaS services, as well as authentication for custom business applications and web and mobile applications accessed by end user.

We’ll start with the cost of full-time developers, deployment engineers, IT staff and management to build out an IAM solution. Every organization will be different but we can look at some broad industry benchmarks to see overall patterns, then adjust these figures to better model the specifics of your organization.

### HEADCOUNT
Imagine a mid-sized company with:

* 5,000 employees / enterprise users
* 100,000 external users
* 10 custom applications built with 4 distinct technology stacks:
    * Enterprise - Enterprise Java/Oracle.
    * Analytics - Python/Hadoop.
    * Web front-end - Javascript, node.js, CSS and HTML
    * Mobile - IOS and Android
* 10 3rd party SSO applications - HR, ERP, CRM, etc.

Gartner staffing benchmarks show that IAM is typically about 20% of most organizations’ total IT security budget, and this percentage has been holding steady over the past several years. Typical staff ratios for IT security range from 1:500 to 1:3000, security specialists to overall organization size. So a company with 5,000 employees would have between .5 and 2 FTE resources under the IT budget devoted to IAM concerns such as configuring SSO for packaged applications and SaaS, everyday administration and monitoring,, setting and enforcing policies, and so on. Lets pick a midpoint number - one FTE equivalent for this work.

These are the folks maintaining IAM infrastructure, not the developers and deployment engineers actually building the IAM solution framework to be integrated into the company’s custom enterprise, web, and mobile applications. Such an enterprise might need one FTE senior development engineer and .5 of a DevOps engineer with security and identity expertise per development stack, plus .25 of a development engineer per application to build and maintain required IAM capabilities and integrations. Thats about 8.5 FTE resources, each at $150K to $200K per year, fully-burdened - lets split the difference at $175K per FTE per year.

### SYSTEMS COSTS
These IAM infrastructure resources must be deployed on servers either on-premise or in private cloud instances, architected, replicated and backed-up for required performance, HA and disaster resilience, and further replicated for testing. Benchmarks can give us some useful rules of thumb for estimating deployment budgets as well. Another study by the Society for Information Management (SIM) found that projected IT budgets in 2015 are allocated almost evenly between people and systems:
<table>
	<tr>
		<td>50.8%</td>
		<td>employee costs (FTEs, contractors and consultants)</td>
	</tr>
	<tr>
		<td>49.2%</td>
		<td>deployment costs (hardware, software, facilities, and services including SaaS, IaaS, PaaS)</td>
	</tr>
</table>
So lets assume for simplicity that people costs and deployment costs are equal, and once we know the FTE count and fully-burdened cost per year, we just double that to get the full picture.

So the approximate annual cost to build and maintain IAM infrastructure for this hypothetical 5,000 employee mid-sized corporation would be:

>> __( 9.5 FTEs  x $175K ) x 2 = $3.325M__

Large organizations can use the same methodology, and scale costs up as appropriate, depending on risk profile and the number of custom applications, but smaller companies cannot scale these resources down to near zero - there is a minimum investment needed to build and maintain baseline IAM infrastructure for any company.

Costs To Buy and Deploy the Auth0 Solution
------------------------------------------
Compare these costs to buying a comprehensive, developer-friendly IAM service from Auth0. An annual subscription for our hypothetical 5,000 employee company would depend on the specific options needed, but likely would run about $300K per year. While this isn’t a precise figure, it is the right order of magnitude for comparison purposes.

==> Diagram of earlier messy IdP landscape hidden behind Auth0, with one simple API for application, and with added rules and pipeline - driving MFA, analytics, etc. showing the full picture. <==

This subscription completely replaces the development cost of a home-grown IAM framework for the development stacks in use by our midsize company - both the headcount and deployment costs - __a savings of about $2.1M per year.__

The Auth0 solution doesn’t eliminate all headcount for IAM. There is the cost to integrate Auth0 into applications, and operate and administer the identity infrastructure. In addition, there is an initial cost to integrate the Auth0 platform into the company’s IAM strategy. Assume for this comparison that it costs as much to integrate Auth0 into applications as the home-grown IAM solution, and that there is an additional cost of one FTE in year one to initially deploy Auth0. 

Thus the cost of the Auth0 solution is as follows:
<table>
	<tr>
		<td><b>Costs</b></td>
		<td></td>
	</tr>
	<tr>
		<td>Auth0 Subscription including cloud deployment costs</td>
		<td>$300K / year</td>
	</tr>
	<tr>
		<td>Annual costs to integrate and administer Auth0: .25 engineers per application, plus 1 FTE IT admin to manage the IAM infrastructure.</td>
		<td>$612.5K / year</td>
	</tr>
	<tr>
		<td>One-time Deployment cost: 1 FTE.</td>
		<td>$175K in year 1</td>
	</tr>
</table>

### PAYBACK AND ROI
Since Auth0 allows the company to completely avoid the expense of building the home-grown IAM framework, if we assume that the benefits of Auth0 begin to accrue after the first year’s deployment, when the company can eliminate the parallel development expense, the payback for the company looks like this:
![Cumulative Investment vs. Benefit](https://photos-1.dropbox.com/t/2/AAArtq6CP3YD433S0iaL9yynIDebKACmQdaSOlIkUnHc6w/12/429369678/png/32x32/1/1438725600/0/2/Cum-Invest-v-Benefit.png/CM7S3swBIAEgAiADIAQgBSAGIAcoAigH/sYOaNaL0NpOR6jZcvnF97ux4zXmdvP7gs9XppkAP78w?size=2048x1536&size_mode=2)

The company will see a __payback period slightly under 2 years__ in this scenario, and a __3-year ROI of 44%__ for the Auth0 solution.

But the Auth0 platform brings additional efficiencies born of economies of scale, including:

* a unified API across stacks
* simplified configuration of enterprise SSO
* connections to all popular identity providers
* easy customization through a rules engine
* the security of full audits and rigorous penetration testing

all of which likely make these employees much more productive. For example, if the 3.5 FTEs at our midsize company are 50% more efficient with the Auth0 platform, the company would save about $150K additional - roughly half the cost of the subscription.

And if it turns out that integrating Auth0 with existing and new applications is much simpler than adapting a home-grown solution, then the payback period starts sooner, with less up-front investment to begin realizing benefits.

### VALUE OF SECURITY
In the end, security infrastructure is about reducing risk, and the potential for catastrophic losses.  The cost of data breaches keeps going up and up. According to the Poneman Institute’s 2015 study, the average cost of a data breach in the U.S. is $217 per record, and with the typical breach involving thousands of records, the average three year cost of a breach in the U.S. is $6.53 million. Typical companies in the U.S. have about a 22% chance that they’ll suffer a breach of at least 10,000 records in a 24-month period. 
 
![Data Breach Root Causes](https://photos-5.dropbox.com/t/2/AAB8EN1es9x5BRPcm6YvdvZ-U8bCykcyyLXn-h7lhjWfhg/12/429369678/png/32x32/1/_/1/2/Breach-Root-Causes-Pie-Percents%202.png/EJLg57kDGAwgAigC/EZPyJ3Ghy17GaiYkJH6zqVm-2TcTGZ4QfVP2_3CtzlE?size=2048x1536&size_mode=2)

That of course is the average cost - security measures are protecting against the worst case scenarios which can be many times this expense.

The Auth0 service has been architected and built by experts in identity management and security. It is carefully audited and continuously challenged by third party penetration testing specialists - another example of economies of scale in action. It makes sense for Auth0 to employ these experts and subject the platform to expensive, comprehensive testing, because this investment by Auth0 can be amortized across a large number of customers seeking the best IAM solution.

If the Auth0 service’s SSO features, support for multi-factor authentication, advanced logging and auditing through rules, and ease of development and deployment can prevent one 10,000 record breach, that represents an __additional benefit worth over $2.1M.__ While a home-grown solution can also be expected to improve security and lower the probability of a security breach, it is likely that the security of the Auth0 solution exceeds even sophisticated and costly home-grown IAM architectures. Not only is Auth0 substantially less expensive than building an IAM solution, Auth0 likely delivers substantially more benefit from preventing loss of data, customers, and reputation.

### AVOIDING OPPORTUNITY COSTS
Unless your business is building identity management solutions, your resources surely would be better spent on differentiating your business, rather than the specialized challenge of handcrafting an IAM solution. But it isn’t just the expense of hiring identity management developers that represents a lost opportunity cost. Because building and testing IAM solutions is such a labor-intensive and time-consuming effort, it can have the side effect of slowing down the pace of your other business-critical development. In fact, Gartner identified Time to Value as one of the most frequently cited drivers for IDaaS. Developer ease-of-use translates directly into faster implementations. Faster implementations in turn put business value into customers’ hands, accelerating revenue and establishing competitive advantage. It isn’t just cost avoidance - it is also about grabbing opportunity. 

Investment timing is another important factor in choosing IDaaS solutions such as Auth0. Hiring IAM specialists and investing in on-premise systems on which to deploy custom-built identity platforms entails capital costs up-front. Auth0 is pay-as-you go - an operating expense that helps an IT group remain flexible in the face of changing priorities. Capital investments always have opportunity costs built-in. Auth0’s service delivery approach avoids those opportunity costs.

CONCLUSION
==========

Conclusion of the white paper placeholder.
