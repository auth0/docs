## Notifications / announcements

It helps a launch go smoothly if all stakeholders are aware of the impending launch and understand the launch plan as well as their role and responsibilities. In addition to notifying teams that will be actively involved, it can help to notify teams that might be needed if anything goes wrong. Having someone on standby during a launch can help expedite response. Be sure to identify and notify any team that might need to answer questions from customers, including on social media.

### Parties to notify

* Customers
* Business parters, if applicable
* Application team(s) impacted by launch
* Support teams
* Network teams (network changes, on standby, in case of issues)
* Security teams (on standby, in case of issues)
* Marketing teams (ready for announcements, response to issues)
* Social media teams (ready to monitor social media, respond)
* Sales teams (prepared to answer questions from customers)
* Customer success teams (prepared to answer questions from customers)

## Notification plan

Your notification plan should include elements such as the target audience, the key takeaways for the audience, the message content, the plans for distributing the notification and how to test the messaging.

A list of elements to include in the plan are:

* Target audience (consider both internal & external audiences)
* Message
* Timing
* Dependencies
* Responsible parties (who will send it)
* Mechanism (how it will be communicated)
* Test message and delivery (if applicable - test to ensure notifications sent)

## Notification distribution

A common tactic is to release notifications in batches to spread out the initial onslaught of load and reduce the scope of confusion if there are any unforeseen glitches. It’s easier to correct issues with a small group than during a big-bang launch. 

* One approach is to start with a relatively small batch of notifications, and if no issues are identified, increase the size of the batches over time. 
* You can also send out batches on a rolling schedule around the globe to spread out load hitting the system at once and have notifications arrive at an optimal time within each timezone to increase the likelihood of the messages being read. 
* You can do a soft-launch to a portion of users, such as individual customers, regions or some other grouping that makes sense for your application.

## Outage windows (if needed)

Some organizations require a formal request for an outage window if any outages or downtime is required for a launch. If your organization requires this, be sure to identify if any downtime is required for the cutover or launch (or other dependent systems) and file the necessary outage or change requests in advance of any lead-time requirements.

## Cutover plan (if needed)

Some launches involve cutover from a previous solution to a new solution. If your project fits this scenario, you should be sure to identify everything that needs to happen as well as any dependencies, the responsible party for each task, and necessary timing. You may wish to plan alternates for all important roles or in each region in case anyone is unexpectedly sick or otherwise unavailable. A checklist of items to consider for the cutover plan is:

* Have you documented the cutover plan and rollback plan if needed?
* Are backups needed of anything prior to change?
* Are any preparatory data changes required?
* Any DNS records to be changed?
* Any Firewall changes?
* Any new monitoring targets?
* Any software to be deployed?

## Go / no-go criteria

In your overall launch plan, it is helpful to have go/no-go criteria and to have discussed in advance the types of issues which could occur and which could be worked through vs would require reverting. A launch plan can specify periodic check-in timeframes with criteria of what to assess at each checkpoint and how long to allow an issue to continue unresolved.

For each stage of the launch, it helps to have success criteria defined, that indicate the launch is proceeding as planned and can continue. Some example criteria could be:

* User signups growing with minimal errors
* User logins at expected rate, minimal errors
* Reported support issues below a certain threshold
* No issues identified that could lead to corrupted data

It’s also helpful to have identified criteria which could trigger a “no-go” decision to halt the launch. The risk tolerance for each environment varies, but a few example criteria might include:

* High percent of user signup or login resulting in errors that cannot be resolved quickly
* High number of support issues that cannot be resolved quickly
* Condition identified that could lead to data corruption
* High severity security issue discovered

## Rollback

It is always wise to have a plan for how to rollback or revert a launch, just in case something unforeseeable occurs which cannot be resolved. Reviewing the launch plan for every step which involves a change can help identify the tasks or changes requires to revert a launch or cutover.

The rollback plan should include the steps to take, the sequence, how long each is likely to take and the responsible party. Understanding the cumulative time required to roll back can help to determine the timing of the final go/no-go decision to fit within any required outage window.

If any data is migrated or changed for the launch, the plan should include how to revert it, if needed. Reverting may require running scripts to undo operational changes or restoring a data store from a backup taken before the launch process began. 

It is also necessary to plan for the case where some data is entered into a new system before it has to be reverted. Will such data / transactions need to be abandoned with the rollback or will you have a way to capture and apply them elsewhere so they aren’t lost?

If the resolution of issues or process to revert could potentially take longer than one shift, you’ll want to ensure you have a primary and perhaps a secondary person available and prepared to handle things during each work shift. If an issue results in the need for prolonged response, significantly beyond one shift, there are limits for how long people can realistically function without a break. It can help to be prepared with resources for a follow-the-sun issue response effort if needed.

## Standby contacts

As the launch day approaches, it’s a good idea to identify all contacts who might be needed for troubleshooting or resolving issues and request them to be on standby and ready to help if needed. The launch leader should have contact information for each person on the standby list to expedite communications.

If there is a physical or virtual "launch room", the people on standby should know where it is and be ready to join if needed. Having a central room or video conference prepared can expedite communications and troubleshooting across all parties if an issue occurs.

## Success Criteria

A lot of planning goes into a launch in order to be successful, but will you know how to evaluate the launch? If you define success criteria before the launch, you can determine what to monitor and if any additional monitoring or checks need to be in place to evaluate the launch.
For example - if one element of the success criteria is the number of sign-ups or logins - do you have a way of monitoring that and has it been tested to ensure it is accurate?

You’ll want statistics to be able to trumpet the success of your launch. You don’t want to find out after the launch that you didn’t capture any data to quantify all the hard work your team put into the launch.

## Risks & mitigations plan

It’s no fun to think of things that could go wrong, but if anything happens, you’ll be glad you did as having a plan can expedite response. A few examples to plan for include:

* Software application bug
* Application incompatibility with user browser settings
* Network failure/outage
* DoS attack
* Hosting environment failure
* Load / capacity issues
* Data / corruption issues
* Security vulnerability discovered

If you had a beta period, it may help to review the results of the beta to identify additional possible failure scenarios.
